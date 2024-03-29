import {createInterface} from 'readline'

/**
 * Function to ask the user for input and return a trimmed string.
 * @param {string} question - The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's input trimmed.
 */
export const askForStr = (question) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (response) => {
      rl.close()
      resolve(response.trim())
    })
  })
}
