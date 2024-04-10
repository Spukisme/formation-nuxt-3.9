import {readFileSync, writeFileSync} from 'fs'
import {join} from 'path'
import {bgUpdate} from '../cliColors.config.js'

/**
 * Update domains with new entity and route
 * @param {string} base - The base path object
 * @param {string} short - The short path object
 * @param {string} entityName - The name of the entity
 * @param {string} routeName - The name of the route
 */
export const updateDomains = ({base, short}, entityName, routeName) => {
  // Construct the full file path
  const filePath = join(base, 'index.ts')
  // Read content from the file
  let content = readFileSync(filePath, 'utf8')

  // Extract existing imports and add new import
  const newImports = content
    .split('\n')
    .filter((line) => line.includes('import'))
  newImports.push(`import * as ${entityName} from './${entityName}'`)

  // Extract existing domains and add new domain
  const newDomains = content
    .slice(content.indexOf('{') + 2, content.lastIndexOf('}') - 1)
    .split('\n')
  newDomains.push(
    routeName !== entityName
      ? `  '${routeName}': ${entityName},`
      : `  ${entityName},`,
  )

  // Generate new content and write it back to the file
  const newContent = `${newImports.join('\n')}\n\nexport const domains = {\n${newDomains.join('\n')}\n}\n`
  writeFileSync(filePath, newContent)
  console.log(bgUpdate(` UPDATE `) + ` ${join(short, 'index.ts')}`)
}
