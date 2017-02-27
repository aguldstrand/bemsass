declare const require: any

import { generateSass } from './sass'
import { Root, MediaDeclaration, Block, Attribute, RuleGroup, Rule, Modifier, ModifierValue, Element } from '../dom'
// var nodeSass = require('node-sass');

export function generateMarkdown(root: Root) {

    let sass = generateSass(root)
    /*
    let css = nodeSass.renderSync({
        data: sass
    })
    */

    var css = { css: "" }

    let outp = `<style>.preview { position: relative; } ${css.css}</style>\n\n`

    let ind = 0

    const blocks = root.blocks
    const blocksLen = blocks.length;
    for (let i = 0; i < blocksLen; i++) {
        const block = blocks[i]

        // open block
        outp += `# Block: ${block.name}\n`
        ind++

        outp += '\n'
        outp += `<div class="preview">\n`
        outp += `    <div class="${block.name}">\n`

        const elements = block.elements
        const elementsLen = elements.length

        for (let j = 0; j < elementsLen; j++) {
            const element = elements[j]

            // Open element
            outp += `        <div class="${element.name}">\n`
            outp += `        </div>\n`
        }

        outp += '    </div>\n'
        outp += '</div>\n'
        outp += '\n'

        if (block.rules !== undefined && block.rules.length !== 0) {

            // Print block properties
            outp += rules(`.${block.name}`, block.rules, ind)

        }

        // Elements
        for (let j = 0; j < elementsLen; j++) {
            const element = elements[j]

            // Open element
            outp += `## Element: ${element.name} \n\n`

            outp += rules(`.${block.name} .${element.name}`, element.rules, ind)

            outp += modifiers(element.modifiers, `${element.name}`, 3)

        }

        outp += modifiers(block.modifiers, block.name, 2)

    }

    return outp;
}

function modifiers(modifiers: Modifier[], namePrefix: string, ind: number) {

    let outp = ''

    const modifiersLen = modifiers.length

    for (let i = 0; i < modifiersLen; i++) {
        const modifier = modifiers[i]

        outp += `${indent(ind, '#')} Modifier: ${modifier.name}\n\n`

        outp += rules(`.${modifier.name}`, modifier.rules, ind)

    }

    return outp
}

function rules(selector: string, ruleGroups: RuleGroup[], ind: number) {

    let outp = '```css\n'
    outp += `${selector} {\n`

    const ruleGroupsLen = ruleGroups.length
    for (var i = 0; i < ruleGroupsLen; i++) {
        const ruleGroup = ruleGroups[i]

        outp += `${indent(1)}/* ${ruleGroup.name} */\n`

        const rules = ruleGroup.rules
        const rulesLen = rules.length
        for (var j = 0; j < rulesLen; j++) {
            const rule = rules[j]

            outp += `${indent(1)}${rule.name}: ${rule.value} \n`
        }

        if (i != ruleGroupsLen - 1) {
            outp += `\n`
        }
    }

    outp += '}\n'
    outp += '```\n\n'

    return outp
}

function comment(comment: string, ind: number) {

    let outp = ''

    outp = `${indent(ind)}//\n`
    outp += `${indent(ind)}// ${comment}\n`
    outp += `${indent(ind)}//\n`

    return outp

}

function indent(indentation, char: string = '    ') {
    let outp = '';
    for (let i = 0; i < indentation; i++) {
        outp += char
    }
    return outp
}
