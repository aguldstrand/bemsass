import { Block, Attribute, RuleGroup, Rule, Modifier, ModifierValue, Element } from '../dom'

export function generateMarkdown(blocks: Block[]) {

    let outp = ''

    let ind = 0

    const blocksLen = blocks.length;
    for (let i = 0; i < blocksLen; i++) {
        const block = blocks[i]

        // open block
        outp += `# Block: ${block.name}\n\n`
        ind++

        if (block.ruleGroups !== undefined && block.ruleGroups.length !== 0) {

            // Print block properties
            outp += rules(`.${block.name}`, block.ruleGroups, ind)

        }

        // Elements
        const elements = block.elements
        const elementsLen = elements.length

        for (let j = 0; j < elementsLen; j++) {
            const element = elements[j]

            // Open element
            outp += `## Element: ${element.name} \n\n`

            outp += rules(`.${block.name} .${block.name}__${element.name}`, element.rules, ind)

            outp += modifiers(element.modifiers, `${block.name}__${element.name}`, 3)

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

        outp += rules(`.${namePrefix}--${modifier.name}`, modifier.rules, ind)

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
