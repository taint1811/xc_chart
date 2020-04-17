'use strict'

const path  = require('path')
const pkg   = require(path.resolve(__dirname, '../package.json'))
const year  = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Plugins - Chart.js
  * Copyright ${year} ${pkg.author.name}
  * Licensed under MIT Premium)
  */`
}

module.exports = getBanner
