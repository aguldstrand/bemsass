var fs = require('fs')
var grammar = require('./grammar')
var nearley = require('nearley')

var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

fs.readFile("sample.scss", 'utf8', (err, data) => {

    parser.feed(data)

    console.log(generate(parser.results[0], "", 0))
})

let generators = {
    block: {
        order: 0,
        handler: function blockHandler(data, prefix, indentation) {
            let content = data.content
            content.sort(p => {
                return `${generators[p.type].order}|${p.name}`
            })

            return `${indent(indentation)}.${data.name} {\n` +
                `${indent(indentation + 1)}&.${data.name} {\n` +
                `${content.filter(d => d.type === 'rule').map(d => generate(d, data.name, indentation + 2)).join("\n")}` +
                `${indent(indentation + 1)}}\n\n` +

                `${content.filter(d => d.type !== 'rule').map(d => generate(d, data.name, indentation + 1)).join("\n")}` +
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
                `${content.map(d => generate(d, `${prefix}--${data.name}`, indentation + 1)).join("\n")}` +
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
                `${content.map(d => generate(d, `${prefix}__${data.name}`, indentation + 1)).join("\n")}` +
                `${indent(indentation)}}\n`
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

    return generators[data.type].handler(data, prefix, indentation);

}