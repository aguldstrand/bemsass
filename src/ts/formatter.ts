import * as input from './input'
import { getGroupName, compareProperties } from './propertyGroups'
import { Block, Attribute, RuleGroup, Rule, Modifier, ModifierValue, Element } from './dom'

export function root(root: input.ParsedRoot) {
    return root.content
        .map(block)
        .sort((a, b) => a.name.localeCompare(b.name))
}

export function block(block: input.ParsedBlock): Block {

    let rules: Rule[] = []
    let modifiers: Modifier[] = []
    let elements: Element[] = []

    for (let i = 0; i < block.content.length; i++) {
        let el = block.content[i]

        switch (el.type) {
            case "rule":
                rules.push(rule(el))
                break

            case "modifier":
                modifiers.push(modifier(el))
                break

            case "element":
                elements.push(element(el))
                break

            default:
                const _: never = el;
        }
    }

    modifiers.sort((a, b) => a.name.localeCompare(b.name))
    elements.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: block.name,
        attributes: block.attributes.sort((a, b) => a.name.localeCompare(b.name)),
        ruleGroups: groupAndSortRules(rules),
        modifiers: modifiers,
        elements: elements
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

    for (let i = 0; i < modifier.content.length; i++) {
        let el = modifier.content[i]

        switch (el.type) {
            case "rule":
                rules.push(rule(el))
                break

            case "modifierValue":
                modifierValues.push(modifierValue(el))
                break

            default:
                const _: never = el;
        }
    }

    modifierValues.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        modifierValues: modifierValues
    }

}


export function modifierValue(modifier: input.ParsedModifierValue): ModifierValue {

    let rules: Rule[] = []

    for (let i = 0; i < modifier.content.length; i++) {
        let el = modifier.content[i]

        switch (el.type) {
            case "rule":
                rules.push(rule(el))
                break

            default:
            // const _: never = el;
        }
    }


    return {
        name: modifier.name,
        rules: groupAndSortRules(rules)
    }

}

export function element(element: input.ParsedElement): Element {

    let rules: Rule[] = []
    let modifiers: Modifier[] = []

    for (let i = 0; i < element.content.length; i++) {
        let el = element.content[i]

        switch (el.type) {
            case "rule":
                rules.push(rule(el))
                break

            case "modifier":
                modifiers.push(modifier(el))
                break

            default:
                const _: never = el;
        }
    }

    modifiers.sort((a, b) => a.name.localeCompare(b.name))

    return {
        name: element.name,
        attributes: element.attributes.sort((a, b) => a.name.localeCompare(b.name)),
        rules: groupAndSortRules(rules),
        modifiers: modifiers
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