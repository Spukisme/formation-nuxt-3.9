import {readFileSync, writeFileSync} from 'fs'

/**
 * Update domains with new entity and route
 * @param {string} filePath - Path to the file to be updated
 * @param {string} entityName - Name of the entity
 * @param {string} routeName - Name of the route
 */
export const updateDomains = (filePath, entityName, routeName) => {
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
  console.log(`Updated ${filePath}`)
}
