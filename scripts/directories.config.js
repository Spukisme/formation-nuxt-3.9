import {fileURLToPath} from 'url'
import path, {join} from 'path'

const MAIN_FOLDER = 'src'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename).replace('scripts', MAIN_FOLDER)

export const directories = {
  domains: join(__dirname, 'domains'),
  types: join(__dirname, 'types'),
}
