"use strict";
function generateDocs(root) {
}
exports.generateDocs = generateDocs;
var DocumentationGenerator = (function () {
    function DocumentationGenerator() {
    }
    DocumentationGenerator.root = function (root) {
        return root.content
            .map(this.block);
    };
    DocumentationGenerator.block = function (block) {
        var rules = [];
        var modifiers = [];
        var elements = [];
        for (var i = 0; i < block.content.length; i++) {
            var el = block.content[i];
            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el));
                    break;
                case "modifier":
                    modifiers.push(this.modifier(el));
                    break;
                case "element":
                    elements.push(this.element(el));
                    break;
                default:
                    var _ = el;
            }
        }
        return {
            name: block.name,
            attributes: block.attributes,
            rules: rules,
            modifiers: modifiers,
            elements: elements
        };
    };
    DocumentationGenerator.rule = function (rule) {
        return {
            name: rule.name,
            value: rule.value
        };
    };
    DocumentationGenerator.modifier = function (modifier) {
        var rules = [];
        var modifierValues = [];
        for (var i = 0; i < modifier.content.length; i++) {
            var el = modifier.content[i];
            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el));
                    break;
                case "modifierValue":
                    modifierValues.push(this.modifierValue(el));
                    break;
                default:
                    var _ = el;
            }
        }
        return {
            name: modifier.name,
            rules: rules,
            modifierValues: modifierValues
        };
    };
    DocumentationGenerator.modifierValue = function (modifier) {
        var rules = [];
        for (var i = 0; i < modifier.content.length; i++) {
            var el = modifier.content[i];
            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el));
                    break;
                default:
                    var _ = el;
            }
        }
        return {
            name: modifier.name,
            rules: rules
        };
    };
    DocumentationGenerator.element = function (element) {
        var rules = [];
        var modifiers = [];
        for (var i = 0; i < element.content.length; i++) {
            var el = element.content[i];
            switch (el.type) {
                case "rule":
                    rules.push(this.rule(el));
                    break;
                case "modifier":
                    modifiers.push(this.modifier(el));
                    break;
                default:
                    var _ = el;
            }
        }
        return {
            name: element.name,
            attributes: element.attributes,
            rules: rules,
            modifiers: modifiers
        };
    };
    return DocumentationGenerator;
}());
