import {existsSync, readFileSync} from 'fs'
import {directories} from '../directories.config.js'
import {getFormatedNames} from './getFormatedNames.js'
import {join} from 'path'

/**
 * Check if the entity exists in the specified file path
 * @param {string} filePath - The path of the file to check
 * @param {string} entityName - The name of the entity to search for
 * @returns {string} - The type of the entity if found ('domains' or 'types'), otherwise undefined
 */
export const isExistingEntity = (filePath, entityName) => {
  // Read the content of the file
  let content = readFileSync(filePath, 'utf8')

  // Check if the entity is in the content and return the type
  return (
    (content.includes(`${entityName},`) && 'domains') ||
    // Check if the file with the formatted entity name exists and return the type
    (existsSync(
      join(
        directories.types.base,
        getFormatedNames(entityName).lowercaseSingularName,
      ),
    ) &&
      'types')
  )
}
