import {existsSync, mkdirSync} from 'fs'
import {bgInfo, bgSuccess} from '../cliColors.config.js'

/**
 * Creates a directory if it does not exist
 * @param {string} base - The directory path to create
 * @param {string} short - A short description of the directory
 */
export const createDirectory = ({base, short}) => {
  if (!existsSync(base)) {
    console.log(bgSuccess(' CREATE ') + ` ${short}...`)
    mkdirSync(base)
  } else {
    console.log(bgInfo(' INFO ') + ` ${short} already exists`)
  }
}
