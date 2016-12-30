var { generateMarkdown } = require('./ts/generator/markdown')
var { generateSass } = require('./ts/generator/sass')
var File = require('vinyl')
var formatter = require('./ts/formatter')
var fs = require('fs')
var grammar = require('./grammar')
var nearley = require('nearley')
var nodeSass = require('node-sass');
var path = require('path')
var through2 = require('through2')


var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

module.exports = function bemsass() {

    return through2.obj(function (file, enc, next) {

        const bemsass = file.contents.toString('utf8')
        const base = path.join(file.base, '..')

        parser.feed(data)

        fs.writeFile("dist/schema.json", JSON.stringify(parser.results[0], null, 4), (err) => { })

        const ast = parser.results[0]
        const dom = formatter.root(ast)
        this.push(new File({
            base: base,
            path: path.join(base, 'main.json'),
            contents: new Buffer(JSON.stringify(dom, null, 4))
        }))

        const sass = generateSass(dom)
        this.push(new File({
            base: base,
            path: path.join(base, 'main.scss'),
            contents: new Buffer(sass)
        }))

        const markdown = generateMarkdown(dom)
        this.push(new File({
            base: base,
            path: path.join(base, 'main.md'),
            contents: new Buffer(markdown)
        }))

        const sassResult = nodeSass.renderSync({
            data: sass
        })

        this.push(new File({
            base: base,
            path: path.join(base, 'main.css'),
            contents: new Buffer(sassResult.css)
        }))

    })

}
