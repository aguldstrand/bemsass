export interface ParsedRoot {
    type: "root",
    content: ParsedBlock[]
}

export interface ParsedBlock {
    type: "block",
    attributes: ParsedAttribute[],
    name: string,
    content: (ParsedRule | ParsedModifier | ParsedElement)[]
}

export interface ParsedAttribute {
    type: "attribute",
    name: string,
    value: string
}

export interface ParsedRule {
    type: "rule",
    name: string,
    value: string
}

export interface ParsedElement {
    type: "element",
    attributes: ParsedAttribute[],
    name: string,
    content: (ParsedRule | ParsedModifier)[]
}

export interface ParsedModifier {
    type: "modifier",
    name: string,
    content: (ParsedRule | ParsedModifierValue)[]
}

export interface ParsedModifierValue {
    type: "modifierValue",
    name: string,
    content: (ParsedRule | ParsedModifier)[]
}
