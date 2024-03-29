import {getFormatedNames} from './getFormatedNames.js'

/**
 * Given an entity name and an array of table types, this function generates a TypeScript file content.
 * The file content includes an interface definition for the entity with the provided types.
 * @param {string} entityName - The name of the entity.
 * @param {Array<Object>} tableTypes - Array of objects containing keys and titles for the types.
 * @returns {Object} An object containing the generated file name and content.
 */
export const getTypeFile = (entityName, tableTypes) => {
  // Destructuring the formatted names from the entityName
  const {lowercaseSingularName, capitalizedSingularName} =
    getFormatedNames(entityName)

  // Creating a string representation of the types
  const typesStr = tableTypes
    .map((type) => `${type.key}: ${type.title}`)
    .join('\n\t')

  // Generating the file name and content
  return {
    fileName: `${lowercaseSingularName}.ts`,
    content:
      "import type {EntityInterface} from '~/types/entity'\n" +
      '\n' +
      `export interface ${capitalizedSingularName}Interface extends EntityInterface {\n` +
      `\t${typesStr || 'exemple: string'}\n` +
      '}',
  }
}
