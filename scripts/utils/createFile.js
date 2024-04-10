import {join} from 'path'
import {writeFileSync} from 'fs'
import {bgSuccess} from '../cliColors.config.js'

/**
 * Function to create a file at a specified location
 * @param {Object} file - The file object containing fileName and content
 * @param {Object} options - The options object containing base and short paths
 */
export const createFile = (file, {base, short}) => {
  // Construct the full file path
  const filePath = join(base, file.fileName)
  // Write the file content to the specified path
  writeFileSync(filePath, file.content)
  // Log the creation of the file
  console.log(bgSuccess(` CREATE `) + ` ${join(short, file.fileName)}`)
}
