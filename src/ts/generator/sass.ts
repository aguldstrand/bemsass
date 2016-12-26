import { Block, Attribute, RuleGroup, Rule, Modifier, ModifierValue, Element } from '../dom'

export default function generateSass(blocks: Block[]) {

    let outp = ''

    let ind = 0

    const blocksLen = blocks.length;
    for (let i = 0; i < blocksLen; i++) {
        const block = blocks[i]

        // open block
        outp += `${indent(ind)}.${block.name} {\n\n`
        ind++

        // open inner block
        outp += `${indent(ind)}&.${block.name} {\n\n`
        ind++

        // Print block properties
        const ruleGroups = block.ruleGroups
        const ruleGroupsLen = ruleGroups.length
        for (var j = 0; j < ruleGroupsLen; j++) {
            const ruleGroup = ruleGroups[j]

            outp += `${indent(ind)}/* ${ruleGroup.name} */\n`

            const rules = ruleGroup.rules
            const rulesLen = rules.length
            for (var j = 0; j < rulesLen; j++) {
                const rule = rules[j]

                outp += `${indent(ind)}${rule.name}: ${rule.value} \n`
            }

            outp += `\n`
        }

        // close inner block
        ind--
        outp += `${indent(ind)}}\n\n`


        outp += `${content.filter(d => d.type !== 'rule').map(d => generate(d, data.name, ind + 1)).join("")}`


        // close block
        ind--
        outp += `${indent(ind)}}\n`

    }

}

function indent(indentation) {
    let outp = '';
    for (let i = 0; i < indentation; i++) {
        outp += '    '
    }
    return outp
}
