import {existsSync, mkdirSync} from 'fs'

/**
 * Creates a directory if it does not exist
 * @param {string} directory - The directory path to create
 */
export const createDirectory = (directory) => {
  if (!existsSync(directory)) {
    console.log(`Creating ${directory}...`)
    mkdirSync(directory)
  } else {
    console.log(`${directory} already exists`)
  }
}
