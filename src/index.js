var { generateMarkdown } = require('./ts/generator/markdown')
var { generateSass } = require('./ts/generator/sass')
var formatter = require('./ts/formatter')
var fs = require('fs')
var grammar = require('./grammar')
var nearley = require('nearley')
// var nodeSass = require('node-sass');
var path = require('path')

var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
const bemsass = fs.readFileSync('sample.scss', 'utf8')

parser.feed(bemsass)
// fs.writeFile("dist/schema.json", JSON.stringify(parser.results[0], null, 4), (err) => { })

const ast = parser.results[0]
const dom = formatter.root(ast)

const sass = generateSass(dom)
console.log(sass)