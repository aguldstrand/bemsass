export interface ParsedRoot {
    type: "root",
    content: (ParsedBlock | ParsedMediaDeclaration)[]
}

export interface ParsedMediaDeclaration {
    type: "mediaDeclaration",
    attributes: ParsedAttribute[],
    name: string,
    value: string
}

export interface ParsedMedia {
    type: "media",
    attributes: ParsedAttribute[],
    name: string,
    content: (ParsedRule)[]
}

export interface ParsedBlock {
    type: "block",
    attributes: ParsedAttribute[],
    name: string,
    content: (ParsedRule | ParsedModifier | ParsedElement | ParsedMedia)[]
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
    content: (ParsedRule | ParsedModifier | ParsedMedia)[]
}

export interface ParsedModifier {
    type: "modifier",
    name: string,
    content: (ParsedRule | ParsedModifierValue | ParsedMedia)[]
}

export interface ParsedModifierValue {
    type: "modifierValue",
    name: string,
    content: (ParsedRule | ParsedMedia)[]
}
