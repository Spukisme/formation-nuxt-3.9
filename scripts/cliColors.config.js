import chalk from 'chalk'

// Declaration des couleurs de texte dans le terminal
const success = chalk.green
const warning = chalk.yellow
const info = chalk.blue
const update = chalk.cyan
const error = chalk.red

// Delcaration des couleurs de fond dans le terminal
const bgSuccess = chalk.bgGreen
const bgWarning = chalk.bgYellow
const bgInfo = chalk.bgBlue
const bgUpdate = chalk.bgCyan
const bgError = chalk.bgRed

export {success, warning, info, update, error, bgSuccess, bgWarning, bgInfo, bgUpdate, bgError}