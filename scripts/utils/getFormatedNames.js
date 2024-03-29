import pluralize from 'pluralize'

/**
 * Takes an entity name and returns various formatted versions of the name.
 * @param {string} entityName - The name of the entity to format.
 * @returns {object} - An object containing different formatted versions of the entity name.
 */
export const getFormatedNames = (entityName) => {
  // Convert entityName to lowercase
  const lowercaseName = entityName.toLowerCase()

  // Convert lowercaseName to camelCase
  const camelCaseName =
    lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1)

  // Get singular and plural forms of entityName
  const singularName = pluralize.singular(entityName)
  const pluralName = pluralize.plural(entityName)

  // Convert singular and plural names to lowercase
  const lowercaseSingularName = singularName.toLowerCase()
  const lowercasePluralName = pluralName.toLowerCase()

  // Capitalize singular and plural names
  const capitalizedSingularName =
    lowercaseSingularName.charAt(0).toUpperCase() +
    lowercaseSingularName.slice(1)
  const capitalizedPluralName =
    lowercasePluralName.charAt(0).toUpperCase() + lowercasePluralName.slice(1)

  // Create a formatted form name
  const formName = `Form${capitalizedSingularName}`

  return {
    lowercaseName,
    camelCaseName,
    singularName,
    pluralName,
    lowercaseSingularName,
    lowercasePluralName,
    capitalizedSingularName,
    capitalizedPluralName,
    formName,
  }
}
