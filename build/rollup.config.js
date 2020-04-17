'use strict'

const path = require('path')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const banner  = require('./banner.js')

const BUNDLE = process.env.BUNDLE === 'true'
const ESM = process.env.ESM === 'true'

let fileDest  = `xcodi-chartjs${ESM ? '.esm' : ''}`
const external = ['chart.js']
const plugins = [
  babel(ESM ? {
    // Only transpile our source code
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      [
        '@babel/env',
        {
          loose: true,
          modules: false,
          targets: {
            browsers: [
              'Chrome >= 60',
              'Safari >= 10.1',
              'iOS >= 10.3',
              'Firefox >= 54',
              'Edge >= 15'
            ]
          }
        }
      ]
    ]
  } : {
    // Only transpile our source code
    exclude: 'node_modules/**',
    // Include only required helpers
    externalHelpersWhitelist: [
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread'
    ]
  })
]
const globals = {
  'chart.js': 'Chart'
}

if (BUNDLE) {
  fileDest += '.bundle'
  // Remove last entry in external array to bundle Popper and Perfect Scrollbar
  external.pop()
  delete globals['chart.js']
  plugins.push(resolve())
}

const rollupConfig = {
  input: path.resolve(__dirname, `../js/index.${ESM ? 'esm' : 'umd'}.js`),
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/js/${fileDest}.js`),
    format: ESM ? 'esm' : 'umd',
    globals
  },
  external,
  plugins
}

if (!ESM) {
  rollupConfig.output.name = 'xcodi.ChartJS'
}

module.exports = rollupConfig
