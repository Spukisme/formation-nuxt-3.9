import {createInterface} from 'readline'
import {bgInfo} from '../cliColors.config.js'

/**
 * Function to ask the user for input and return a trimmed string.
 * @param {string} question - The question to ask the user.
 * @param {string?} defaultAnswer - The default answer if the user enters nothing.
 * @returns {Promise<string>} A promise that resolves with the user's input trimmed.
 */
export const askForStr = (question, defaultAnswer) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: line => {
      if (!defaultAnswer) {
        return []
      }
      const completions = [defaultAnswer]
      return [defaultAnswer.startsWith(line) && defaultAnswer !== line ? completions : [], line]
    }
  })

  return new Promise((resolve) => {
    rl.question(question, (response) => {
      if (response === '' && defaultAnswer) {
        console.log(bgInfo(' INFO ') + ` Using default value : ${defaultAnswer}`)
      }
      rl.close()
      resolve(response.trim())
    })
  })
}
