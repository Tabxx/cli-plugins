const shell = require('shelljs')
const original = JSON.parse(process.env.npm_config_argv).original
const commit = original[3]

shell.exec('git status')
shell.exec('git add .')
shell.exec(`git commit -m "${commit}"`)
shell.exec('git push')
