var fs = require('fs')
var postcss = require('postcss')
var annotation = require('./')

var css = fs.readFileSync('sample.css', 'utf-8').trim()

annotation.parse(css)
