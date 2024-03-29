import {askForStr} from './askForStr.js'

export const configureFile = async (type, {question, errorMessage}) => {
  let configToAdd = await askForStr(
    `Do you want to configure the ${type} [Y/n]?`,
  )
  const tableHeaders = []

  while (configToAdd !== 'n') {
    configToAdd = await askForStr(question)
    if (configToAdd !== 'n') {
      const responseArray = configToAdd.trim().split(':')
      if (responseArray.length !== 2) {
        console.error(errorMessage)
      } else {
        const [key, title] = responseArray
        tableHeaders.push({key, title})
      }
    }
  }
  return tableHeaders
}
