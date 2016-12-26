export interface Block {
    name: string,
    attributes: Attribute[],
    ruleGroups: RuleGroup[],
    modifiers: Modifier[],
    elements: Element[]
}

export interface Attribute {
    name: string,
    value: string
}

export interface RuleGroup {
    name: string,
    rules: Rule[]
}

export interface Rule {
    name: string,
    value: string
}

export interface Modifier {
    name: string,
    rules: RuleGroup[],
    modifierValues: ModifierValue[]
}

export interface ModifierValue {
    name: string,
    rules: RuleGroup[],
}

export interface Element {
    name: string,
    attributes: Attribute[],
    rules: RuleGroup[],
    modifiers: Modifier[]
}