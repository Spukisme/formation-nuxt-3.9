import {join} from 'path'
import {success, bgError, bgInfo, warning} from './cliColors.config.js'
import {askForStr} from './utils/askForStr.js'
import {updateDomains} from './utils/updateDomains.js'
import {isExistingEntity} from './utils/isExistingEntity.js'
import {configureFile} from './utils/configureFile.js'
import {createDirectory} from './utils/createDirectory.js'
import {getEntityFiles} from './utils/getEntityFiles.js'
import {createFile} from './utils/createFile.js'
import {getHeadersFile} from './utils/getHeadersFile.js'
import {getTypeFile} from './utils/getTypeFile.js'
import {getFormatedNames} from './utils/getFormatedNames.js'
import {directories} from './directories.config.js'
import {optionsConfigureFileConfig} from './optionsConfigureFile.config.js'

// Utilisation du script makeCrud.js : makeCrud [nom de l'entité] [nom du route]
async function main() {
  console.log(bgInfo(' INFO ') + ' CTRL + C to exit.')
  console.log(bgInfo(' INFO ') + ' The default value is always in UPPERCASE when there are multiple choices.')
  console.log(bgInfo(' INFO ') + ' When a default value is available, you can press ENTER to validate it or TAB for autocomplete.\n')

  /** get the name of the entity from the command line or ask the user **/
  const entityName =
    process.argv[2] || (await askForStr(success('Enter the name of the entity from the API') + '\n> '))
  /** if no entity name is provided, exit the script with an error message **/
  if (!entityName) {
    console.error(bgError(' ERROR ') + ' Please provide the name of the entity.')
    process.exit(1)
  }
  /**
   * get the name of the route from the command line or ask the user
   * with a default value to the entity name
   **/
  const routeName =
    process.argv[3] ||
    (await askForStr(
      success(`Enter the Route for this entity`) + ` (default: ${warning(entityName)})` + '\n> ',
      entityName,
    )) ||
    entityName

  /** Name to use **/
  const {lowercaseName} = getFormatedNames(entityName)
  /** File & Directory **/
  const domainsFile = join(directories.domains.base, 'index.ts')
  const directoriesWithEntity = {
    ...directories,
    entity: {
      base: join(directories.domains.base, lowercaseName),
      short: join(directories.domains.short, lowercaseName),
    },
  }

  /** Check if the entity already exists in the domains file **/
  const entityExists = isExistingEntity(domainsFile, entityName)
  if (!!entityExists) {
    console.log(bgError(' ERROR ') + ` Entity ${entityName} already exists in ${entityExists}.`)
    process.exit(1)
  } else {
    console.log('') // Make the separation between the entity and the crud config
    console.log(bgInfo(' INFO ') + ` Creating Crud for ${entityName}...`)
    /** Populate the header file with the columns **/
    const tableHeaders = await configureFile(
      'table',
      optionsConfigureFileConfig.table,
    )
    console.log('') // Make the separation between the header and the type
    /** Populate the type file with the properties **/
    const tableTypes = await configureFile(
      'interface',
      optionsConfigureFileConfig.type,
    )

    console.log('\n' + bgInfo(' INFO ') + ` Creating files in project ${directories.project}` + '\n')

    /** Create the directories **/
    console.log(bgInfo('    CREATING DIRECTORIES    '))
    Object.values(directoriesWithEntity).filter(dir => dir.base).forEach(createDirectory)

    console.log('') // Make the separation between the directories and the files

    /** Create the files **/
    console.log(bgInfo('       CREATING FILES       '))
    getEntityFiles(entityName, routeName).forEach((file) =>
      createFile(file, directoriesWithEntity.entity),
    )

    createFile(getHeadersFile(tableHeaders), directoriesWithEntity.entity)
    createFile(getTypeFile(entityName, tableTypes), directories.types)

    /** Update the domains file with the new entity **/
    updateDomains(directories.domains, entityName, routeName)
  }
}

await main()
