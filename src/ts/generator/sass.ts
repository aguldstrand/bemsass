import { Block, Attribute, RuleGroup, Rule, Modifier, ModifierValue, Element } from '../dom'

export function generateSass(blocks: Block[]) {

    let outp = ''

    let ind = 0

    const blocksLen = blocks.length;
    for (let i = 0; i < blocksLen; i++) {
        const block = blocks[i]

        // open block
        outp += comment(`Block: ${block.name}`, ind)
        outp += `${indent(ind)}.${block.name} {\n\n`
        ind++

        if (block.ruleGroups !== undefined && block.ruleGroups.length !== 0) {
            // open inner block
            outp += `${indent(ind)}&.${block.name} {\n\n`
            ind++

            // Print block properties
            outp += rules(block.ruleGroups, ind)

            // Close inner block
            ind--
            outp += `${indent(ind)}}\n\n`
        }

        // Elements
        const elements = block.elements
        const elementsLen = elements.length
        for (let j = 0; j < elementsLen; j++) {
            const element = elements[j]

            // Open element
            outp += comment(`Element: ${element.name}`, ind)
            outp += `${indent(ind)}& .${block.name}__${element.name} {\n\n`
            ind++

            outp += rules(element.rules, ind)

            outp += modifiers(element.modifiers, `${block.name}__${element.name}`, ind)

            // Close element
            ind--
            outp += `${indent(ind)}}\n\n`

        }

        outp += modifiers(block.modifiers, block.name, ind)


        // modifiers: Modifier[],
        // elements: Element[]

        // outp += `${content.filter(d => d.type !== 'rule').map(d => generate(d, data.name, ind + 1)).join(')}`


        // Close block
        ind--
        outp += `${indent(ind)}}\n\n`

    }

    return outp;
}

function modifiers(modifiers: Modifier[], namePrefix: string, ind: number) {

    let outp = ''

    const modifiersLen = modifiers.length

    for (let i = 0; i < modifiersLen; i++) {
        const modifier = modifiers[i]

        outp += comment(`Modifier: ${modifier.name}`, ind)
        outp += `${indent(ind)}&.${namePrefix}--${modifier.name} {\n\n`
        ind++

        outp += rules(modifier.rules, ind)

        ind--
        outp += `${indent(ind)}}\n\n`

    }

    return outp
}

function rules(ruleGroups: RuleGroup[], ind: number) {

    let outp = ''

    const ruleGroupsLen = ruleGroups.length
    for (var i = 0; i < ruleGroupsLen; i++) {
        const ruleGroup = ruleGroups[i]

        outp += `${indent(ind)}/* ${ruleGroup.name} */\n`

        const rules = ruleGroup.rules
        const rulesLen = rules.length
        for (var j = 0; j < rulesLen; j++) {
            const rule = rules[j]

            outp += `${indent(ind)}${rule.name}: ${rule.value} \n`
        }

        outp += `\n`
    }

    return outp
}

function comment(comment: string, ind: number) {

    let outp = ''

    outp = `${indent(ind)}/*\n`
    outp += `${indent(ind)} * ${comment}\n`
    outp += `${indent(ind)} *${new Array(Math.ceil(comment.length / 2) + 2).join(' *')}/\n`

    return outp

}

function indent(indentation) {
    let outp = '';
    for (let i = 0; i < indentation; i++) {
        outp += '    '
    }
    return outp
}
