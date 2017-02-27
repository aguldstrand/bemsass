import * as input from './input'

import {
    getGroupName,
    compareProperties
} from './propertyGroups'

import {
    MediaDeclaration,
    Media,
    Block,
    Attribute,
    RuleGroup,
    Rule,
    Modifier,
    ModifierValue,
    Element
} from './dom'

export function root(root: input.ParsedRoot) {

    let mediaDeclarations: MediaDeclaration[] = []
    let blocks: Block[] = []

    for (let i = 0; i < root.content.length; i++) {
        let el = root.content[i]

        switch (el.type) {
            case 'mediaDeclaration':
                mediaDeclarations.push(mediaDeclaration(el, i))
                break;

            case 'block':
                blocks.push(block(el))
                break;
        }
    }

    blocks.sort((a, b) => a.name.localeCompare(b.name))

    return {
        mediaDeclarations: mediaDeclarations,
        blocks: blocks
    }
}

export function mediaDeclaration(mediaDeclaration: input.ParsedMediaDeclaration, index: number): MediaDeclaration {
    return {
        attributes: [],
        name: mediaDeclaration.name,
        value: mediaDeclaration.value,
        documentOrder: index
    }
}

export function media(media: input.ParsedMedia): Media {
    var rules = media.content.map(c => rule(c))

    return {
        name: media.name,
        rules: groupAndSortRules(rules),
    }
}

export function block(block: input.ParsedBlock): Block {

    let rules: Rule[] = []
    let modifiers: Modifier[] = []
    let elements: Element[] = []
    let medias: Media[] = []

    for (let i = 0; i < block.content.length; i++) {
        let el = block.content[i]

        switch (el.type) {
            case 'rule':
                rules.push(rule(el))
                break

            case 'modifier':
                modifiers.push(modifier(el))
                break

            case 'element':
                elements.push(element(el))
                break

            case 'media':
                medias.push(media(el))
                break;

            default:
                const _: never = el;
        }
    }

    modifiers.sort((a, b) => a.name.localeCompare(b.name))
    elements.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: block.name,
        attributes: block.attributes.sort((a, b) => a.name.localeCompare(b.name)),
        rules: groupAndSortRules(rules),
        modifiers: modifiers,
        elements: elements,
        medias: medias
    }

}

export function rule(rule: input.ParsedRule): Rule {
    return {
        name: rule.name,
        value: rule.value
    }
}

export function modifier(modifier: input.ParsedModifier): Modifier {

    let rules: Rule[] = []
    let modifierValues: ModifierValue[] = []
    let medias: Media[] = []

    for (let i = 0; i < modifier.content.length; i++) {
        let el = modifier.content[i]

        switch (el.type) {
            case 'rule':
                rules.push(rule(el))
                break

            case 'modifierValue':
                modifierValues.push(modifierValue(el))
                break

            case 'media':
                medias.push(media(el))
                break;

            default:
                const _: never = el;
        }
    }

    modifierValues.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        modifierValues: modifierValues,
        medias: medias
    }

}


export function modifierValue(modifier: input.ParsedModifierValue): ModifierValue {

    let rules: Rule[] = []
    let medias: Media[] = []

    for (let i = 0; i < modifier.content.length; i++) {
        let el = modifier.content[i]

        switch (el.type) {
            case 'rule':
                rules.push(rule(el))
                break

            case 'media':
                medias.push(media(el))
                break;

            default:
                const _: never = el;
        }
    }


    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        medias: medias
    }

}

export function element(element: input.ParsedElement): Element {

    let rules: Rule[] = []
    let modifiers: Modifier[] = []
    let medias: Media[] = []

    for (let i = 0; i < element.content.length; i++) {
        let el = element.content[i]

        switch (el.type) {
            case 'rule':
                rules.push(rule(el))
                break

            case 'modifier':
                modifiers.push(modifier(el))
                break

            case 'media':
                medias.push(media(el))
                break;

            default:
                const _: never = el;
        }
    }

    modifiers.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: element.name,
        attributes: element.attributes.sort((a, b) => a.name.localeCompare(b.name)),
        rules: groupAndSortRules(rules),
        modifiers: modifiers,
        medias: medias
    }

}

function groupAndSortRules(rules: Rule[]): RuleGroup[] {

    const outp: RuleGroup[] = []
    const lookup: { [groupName: string]: RuleGroup } = {}

    const rulesLen = rules.length;
    for (let i = 0; i < rulesLen; i++) {
        const rule = rules[i];

        const groupName = getGroupName(rule.name);

        let group = lookup[groupName]
        if (group === undefined) {
            lookup[groupName] = group = {
                name: groupName,
                rules: []
            }
            outp.push(group)
        }

        group.rules.push(rule)

    }

    outp.sort((a, b) => a.name.localeCompare(b.name))
    const outpLen = outp.length;
    for (let i = 0; i < outp.length; i++) {
        outp[i].rules.sort((a, b) => compareProperties(a.name, b.name))
    }

    return outp;

}
