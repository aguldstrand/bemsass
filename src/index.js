var { generateMarkdown } = require('./ts/generator/markdown')
var { generateSass } = require('./ts/generator/sass')
var formatter = require('./ts/formatter')
var fs = require('fs')
var grammar = require('./grammar')
var nearley = require('nearley')
var nodeSass = require('node-sass');

var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

fs.readFile("src/styles/main.scss", 'utf8', (err, data) => {

    parser.feed(data)

    fs.writeFile("dist/schema.json", JSON.stringify(parser.results[0], null, 4), (err) => { })

    const ast = parser.results[0]
    const dom = formatter.root(ast)
    fs.writeFile("dist/main.json", JSON.stringify(dom, null, 4), (err) => { })

    const sass = generateSass(dom)
    fs.writeFile("dist/main.scss", sass, (err) => { })

    const markdown = generateMarkdown(dom)
    fs.writeFile("dist/main.md", markdown, (err) => { })

    nodeSass.render({
        data: sass
    }, function (err, result) {
        fs.writeFile("dist/main.css", result.css, (err) => { })
    });


})
