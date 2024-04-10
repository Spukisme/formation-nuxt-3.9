import {fileURLToPath} from 'url'
import path, {join} from 'path'

const MAIN_FOLDER = 'src'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename).replace('scripts', MAIN_FOLDER)
const PROJECT_FOLDER = join(__dirname, '..').replace(/^.+\\/, '.\\')
const SHORT_SOURCE = __dirname.replace(/^.+\\/, '.\\')

export const directories = {
  project: PROJECT_FOLDER,
  domains: {
    base: join(__dirname, 'domains'),
    short: join(SHORT_SOURCE, 'domains'),
  },
  types: {
    base: join(__dirname, 'types'),
    short: join(SHORT_SOURCE, 'types'),
  }
}
