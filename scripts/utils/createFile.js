import {join} from 'path'
import {writeFileSync} from 'fs'

/**
 * Creates a file in the specified directory
 * @param {Object} file - The file object containing fileName and content
 * @param {string} directory - The directory path where the file will be created
 */
export const createFile = (file, directory) => {
  // Construct the full file path
  const filePath = join(directory, file.fileName)
  // Write the file content to the specified path
  writeFileSync(filePath, file.content)
  // Log the creation of the file
  console.log(`Created ${filePath}`)
}
