import {bgSuccess, success, warning} from '../cliColors.config.js'
import {askForStr} from './askForStr.js'

export const configureFile = async (type, {question, defaultAnswer, errorMessage}) => {
  let configToAdd = await askForStr(
    success(`Do you want to configure the ${type} ?`) + ' [' + warning('Y') + '/n]\n> ',
    'Y',
  )
  const tableHeaders = []

  while (configToAdd !== 'N') {
    configToAdd = await askForStr(question, defaultAnswer) || defaultAnswer
    if (configToAdd !== 'N') {
      const responseArray = configToAdd.trim().split(':')
      if (responseArray.length !== 2) {
        console.error(errorMessage.format)
      } else {
        const [key, title] = responseArray
        if (key.length <= 0 || title.length <= 0) {
          console.error(errorMessage.missingElement)
        } else {
          tableHeaders.push({key, title})
          console.log(bgSuccess(' ADD ') + ` Adding ${key}: ${title}`)
        }
      }
    }
  }
  return tableHeaders
}
