/**
 * Returns a file object with table header constants based on the given headers array.
 * @param {Array} headers - An array of objects containing title and key properties for each header.
 * @returns {Object} - An object with fileName and content properties.
 */
export const getHeadersFile = (headers) => {
  // Generate the header strings
  const headersStr = headers
    .map(
      (header) =>
        `\t{title: '${header.title}', align: 'start', sortable: false, key: '${header.key}'},\n`,
    )
    .join('')

  // Return the file object
  return {
    fileName: 'tableHeaders.const.ts',
    content:
      "import type {ReadonlyHeaders} from '~/types/headers.js'\n" +
      '\n' +
      'export const tableHeadersConst = [\n' +
      headersStr +
      "\t{title: 'Actions', key: 'actions', sortable: false},\n" +
      '] satisfies ReadonlyHeaders',
  }
}
