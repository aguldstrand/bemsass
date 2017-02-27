export interface Root {
    mediaDeclarations: MediaDeclaration[],
    blocks: Block[]
}

export interface MediaDeclaration {
    name: string,
    attributes: Attribute[],
    value: string,
    documentOrder: number
}

export interface Media {
    name: string,
    rules: RuleGroup[]
}

export interface Block {
    name: string,
    attributes: Attribute[],
    rules: RuleGroup[],
    modifiers: Modifier[],
    elements: Element[],
    medias: Media[]
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
    modifierValues: ModifierValue[],
    medias: Media[]
}

export interface ModifierValue {
    name: string,
    rules: RuleGroup[],
    medias: Media[]
}

export interface Element {
    name: string,
    attributes: Attribute[],
    rules: RuleGroup[],
    modifiers: Modifier[],
    medias: Media[]
}