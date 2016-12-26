var fs = require('fs')
var grammar = require('./grammar')
var nearley = require('nearley')
var generator = require('./ts/generator')

var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

fs.readFile("src/styles/main.scss", 'utf8', (err, data) => {

    parser.feed(data)

    fs.writeFile("dist/schema.json", JSON.stringify(parser.results[0], null, 4), (err) => {
    })

    let sass = generator.root(parser.results[0])
    fs.writeFile("dist/main.scss", JSON.stringify(sass, null, 4), (err) => {

    })

})

let generators = {
    root: {
        order: 0,
        handler: function rootHandler(data, prefix, indentation) {
            return data.content.map(d => generate(d, data.name, indentation)).join("\n")
        }
    },
    attribute: function attributeHandler(data, prefix, indentation) {
        return `${indent(indentation)}// ${data.name}: ${data.value}\n`
    },
    block: {
        order: 0,
        handler: function blockHandler(data, prefix, indentation) {
            let content = data.content
            content.sort(p => {
                return `${generators[p.type].order}|${p.name}`
            })

            return `${indent(indentation)}.${data.name} {\n\n` +
                `${indent(indentation + 1)}&.${data.name} {\n` +
                `${content.filter(d => d.type === 'rule').map(d => generate(d, data.name, indentation + 2)).join("")}` +
                `${indent(indentation + 1)}}\n\n` +

                `${content.filter(d => d.type !== 'rule').map(d => generate(d, data.name, indentation + 1)).join("")}` +
                `${indent(indentation)}}\n`
        }
    },
    rule: {
        order: 0,
        handler: function ruleHandler(data, prefix, indentation) {
            return `${indent(indentation)}${data.name}: ${data.value};\n`
        }
    },
    modifier: {
        order: 1,
        handler: function modifierHandler(data, prefix, indentation) {
            let content = data.content
            content.sort(p => {
                return `${generators[p.type].order}|${p.name}`
            })

            return `${indent(indentation)}&.${prefix}--${data.name} {\n` +
                `${content.map(d => generate(d, `${prefix}--${data.name}`, indentation + 1)).join("")}` +
                `${indent(indentation)}}\n`
        }
    },
    modifierValue: {
        order: 2,
        handler: function modifierValueHandler(data, prefix, indentation) {
        }
    },
    element: {
        order: 3,
        handler: function elementHandler(data, prefix, indentation) {
            let content = data.content
            content.sort(p => {
                return `${generators[p.type].order}|${p.name}`
            })

            return `${indent(indentation)}& .${prefix}__${data.name} {\n` +
                `${content.map(d => generate(d, `${prefix}__${data.name}`, indentation + 1)).join("")}` +
                `${indent(indentation)}}\n\n`
        }
    }
}

function indent(indentation) {
    let outp = '';
    for (let i = 0; i < indentation; i++) {
        outp += '    '
    }
    return outp
}

function generate(data, prefix, indentation) {

    if (!data.type) {
        console.log(JSON.stringify(data, null, 2))
    }

    return generators[data.type].handler(data, prefix, indentation);

}