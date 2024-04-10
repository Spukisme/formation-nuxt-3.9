import {bgError, success, warning} from './cliColors.config.js'

export const optionsConfigureFileConfig = {
  table: {
    question: success(`Create a new column for the CRUDtable`) + ' [key:title/' + warning('N') + ']\n> ',
    defaultAnswer: 'N',
    errorMessage: {
      format: bgError(' ERROR ') + ' Column must be in key:title format. Please provide a key and a title',
      missingElement: bgError(' ERROR ') + ' The key or the title is missing. Please provide a key and a title',
    },
  },
  type: {
    question: success(`Add property`) + ' [name(?):types/' + warning('N') + ']\n> ',
    defaultAnswer: 'N',
    errorMessage: {
      format: bgError(' ERROR ') + 'Property must be in name(?):types format. Please provide a name and a types',
      missingElement: bgError(' ERROR ') + 'The name or the types is missing. Please provide a name and a types',
    }
  },
}
