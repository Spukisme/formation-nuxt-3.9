import {join} from 'path'
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
  /** get the name of the entity from the command line or ask the user **/
  const entityName =
    process.argv[2] || (await askForStr('Enter the name of the entity: '))
  /** if no entity name is provided, exit the script with an error message **/
  if (!entityName) {
    console.error('Please provide the name of the entity.')
    process.exit(1)
  }
  /**
   * get the name of the route from the command line or ask the user
   * with a default value to the entity name
   **/
  const routeName =
    process.argv[3] ||
    (await askForStr(
      `Enter the Route for this entity: (default: ${entityName}) `,
    )) ||
    entityName

  /** Name to use **/
  const {lowercaseName} = getFormatedNames(entityName)
  /** File & Directory **/
  const domainsFile = join(directories.domains, 'index.ts')
  const directoriesWithEntity = {
    ...directories,
    entity: join(directories.domains, lowercaseName),
  }

  /** Check if the entity already exists in the domains file **/
  const entityExists = isExistingEntity(domainsFile, entityName)
  if (!!entityExists) {
    console.log(`Entity ${entityName} already exists in ${entityExists}.`)
    process.exit(1)
  } else {
    console.log(`Creating Crud for ${entityName}...`)
    /** Populate the header file with the columns **/
    const tableHeaders = await configureFile(
      'table',
      optionsConfigureFileConfig.table,
    )

    /** Populate the type file with the properties **/
    const tableTypes = await configureFile(
      'interface',
      optionsConfigureFileConfig.type,
    )

    /** Create the directories and files **/
    Object.values(directoriesWithEntity).forEach(createDirectory)

    getEntityFiles(entityName, routeName).forEach((file) =>
      createFile(file, directoriesWithEntity.entity),
    )

    createFile(getHeadersFile(tableHeaders), directoriesWithEntity.entity)
    createFile(getTypeFile(entityName, tableTypes), directories.types)

    /** Update the domains file with the new entity **/
    updateDomains(domainsFile, entityName, routeName)
  }
}

await main()
