import {
    Root,
    MediaDeclaration,
    Media,
    Block,
    Attribute,
    RuleGroup,
    Rule,
    Modifier,
    ModifierValue,
    Element
} from '../dom'

export interface Dictionary<TValue> {
    [key: string]: TValue
}

export function generateSass(root: Root) {

    // Index media Declarations
    const mediaDeclarations = indexMediaDeclarations([root])

    // Generate output
    let outp = ''

    let ind = 0

    const blocks = root.blocks
    const blocksLen = blocks.length
    for (let i = 0; i < blocksLen; i++) {
        const block = blocks[i]

        // open block
        outp += comment(`Block: ${block.name}`, ind)
        outp += `${indent(ind)}.${block.name} {\n\n`
        ind++

        if (block.rules !== undefined && block.rules.length !== 0) {
            // open inner block
            outp += `${indent(ind)}&.${block.name} {\n\n`
            ind++

            // Print block properties
            outp += rules(block.rules, ind)

            // Close inner block
            ind--
            outp += `${indent(ind)}}\n\n`
        }

        // Media queries
        outp += media(block.medias, mediaDeclarations, ind)

        // Modifiers
        outp += modifiers(block.modifiers, block.name, mediaDeclarations, ind)

        // Elements
        outp += elements(block.elements, mediaDeclarations, ind)

        // Close block
        ind--
        outp += `${indent(ind)}}\n\n`

    }

    return outp
}

function elements(elements: Element[], mediaDeclarations: Dictionary<MediaDeclaration>, ind: number) {

    let outp = ''

    const elementsLen = elements.length
    for (let j = 0; j < elementsLen; j++) {
        const element = elements[j]

        // Open element
        outp += comment(`Element: ${element.name}`, ind)
        outp += `${indent(ind)}& > .${element.name} {\n\n`
        ind++

        // Rules
        outp += rules(element.rules, ind)

        // Media queries
        outp += media(element.medias, mediaDeclarations, ind)

        // Modifiers
        outp += modifiers(element.modifiers, `${element.name}`, mediaDeclarations, ind)

        // Close element
        ind--
        outp += `${indent(ind)}}\n\n`

    }

    return outp
}

function media(medias: Media[], mediaDeclarations: Dictionary<MediaDeclaration>, ind: number) {

    let outp = ''

    const mediasLen = medias.length
    for (let i = 0; i < mediasLen; i++) {
        const media = medias[i]

        const mediaDeclaration = mediaDeclarations[media.name]

        outp += comment(`Media query: ${media.name}`, ind)
        outp += `${indent(ind)}@media (${mediaDeclaration.value}) {\n\n`
        ind++

        outp += rules(media.rules, ind)

        ind--
        outp += `${indent(ind)}}\n\n`
    }

    return outp
}

function modifiers(modifiers: Modifier[], namePrefix: string, mediaDeclarations: Dictionary<MediaDeclaration>, ind: number) {

    let outp = ''

    const modifiersLen = modifiers.length
    for (let i = 0; i < modifiersLen; i++) {
        const modifier = modifiers[i]

        outp += comment(`Modifier: ${modifier.name}`, ind)
        outp += `${indent(ind)}&.${modifier.name} {\n\n`
        ind++

        outp += rules(modifier.rules, ind)

        // Media queries
        outp += media(modifier.medias, mediaDeclarations, ind)

        ind--
        outp += `${indent(ind)}}\n\n`

    }

    return outp
}

function rules(ruleGroups: RuleGroup[], ind: number) {

    let outp = ''

    const ruleGroupsLen = ruleGroups.length
    for (let i = 0; i < ruleGroupsLen; i++) {
        const ruleGroup = ruleGroups[i]

        let ruleValueCol = 0

        const rules = ruleGroup.rules
        const rulesLen = rules.length
        for (let j = 0; j < rulesLen; j++) {
            const rule = rules[j]

            ruleValueCol = Math.max(ruleValueCol, rule.name.length + 2)
        }


        outp += `${indent(ind)}// ${ruleGroup.name}\n`

        for (let j = 0; j < rulesLen; j++) {
            const rule = rules[j]

            const padd = padding(ruleValueCol - rule.name.length - 1)
            outp += `${indent(ind)}${rule.name}:${padd}${rule.value} \n`
        }

        outp += `\n`
    }

    return outp
}

function comment(comment: string, ind: number) {

    let outp = ''

    outp = `${indent(ind)}//\n`
    outp += `${indent(ind)}// ${comment}\n`
    outp += `${indent(ind)}//\n`

    return outp

}

function indexMediaDeclarations(roots: Root[]) {

    const outp: Dictionary<MediaDeclaration> = {}

    const rootsLen = roots.length
    for (let i = 0; i < rootsLen; i++) {
        const root = roots[i]

        const mediaDeclarationsLen = root.mediaDeclarations.length
        for (let j = 0; j < mediaDeclarationsLen; j++) {
            const mediaDeclaration = root.mediaDeclarations[j]

            outp[mediaDeclaration.name] = mediaDeclaration

        }

    }

    return outp

}

function padding(padding) {
    let outp = ''
    for (let i = 0; i < padding; i++) {
        outp += ' '
    }
    return outp
}

function indent(indentation) {
    let outp = ''
    for (let i = 0; i < indentation; i++) {
        outp += '    '
    }
    return outp
}
