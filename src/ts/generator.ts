import * as input from './input'

export function generateDocs(root: input.ParsedRoot) {
}

export default class DocumentationGenerator {
 
    public static root(root: input.ParsedRoot) {
        return root.content
            .map(this.block)
    }

    public static block(block: input.ParsedBlock) {

        let rules: input.ParsedRule[] = []
        let modifiers: input.ParsedModifier[] = []
        let elements: input.ParsedElement[] = []

        for (let i = 0; i < block.content.length; i++) {
            let el = block.content[i]

            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el))
                    break

                case "modifier":
                    modifiers.push(this.modifier(el))
                    break

                case "element":
                    elements.push(this.element(el))
                    break

                default:
                    const _: never = el;
            }
        }


        return {
            name: block.name,
            attributes: block.attributes,
            rules: rules,
            modifiers: modifiers,
            elements: elements
        }

    }

    public static rule(rule: input.ParsedRule) {
        return {
            name: rule.name,
            value: rule.value
        }
    }

    public static modifier(modifier: input.ParsedModifier) {

        let rules: input.ParsedRule[] = []
        let modifierValues: input.ParsedModifierValue[] = []

        for (let i = 0; i < modifier.content.length; i++) {
            let el = modifier.content[i]

            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el))
                    break

                case "modifierValue":
                    modifierValues.push(this.modifierValue(el))
                    break

                default:
                    const _: never = el;
            }
        }


        return {
            name: modifier.name,
            rules: rules,
            modifierValues: modifierValues
        }

    }


    public static modifierValue(modifier: input.ParsedModifierValue) {

        let rules: input.ParsedRule[] = []

        for (let i = 0; i < modifier.content.length; i++) {
            let el = modifier.content[i]

            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el))
                    break

                default:
                    const _: never = el;
            }
        }


        return {
            name: modifier.name,
            rules: rules
        }

    }

    public static element(element: input.ParsedElement) {

        let rules: input.ParsedRule[] = []
        let modifiers: input.ParsedModifier[] = []

        for (let i = 0; i < element.content.length; i++) {
            let el = element.content[i]

            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el))
                    break

                case "modifier":
                    modifiers.push(this.modifier(el))
                    break

                default:
                    const _: never = el;
            }
        }


        return {
            name: element.name,
            attributes: element.attributes,
            rules: rules,
            modifiers: modifiers
        }

    }

}
