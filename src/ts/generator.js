"use strict";
var propertyGroups_1 = require("./propertyGroups");
function groupAndSortRules(rules) {
    var outp = [];
    var lookup = {};
    var rulesLen = rules.length;
    for (var i = 0; i < rulesLen; i++) {
        var rule_1 = rules[i];
        var groupName = propertyGroups_1.getGroupName(rule_1.name);
        var group = lookup[groupName];
        if (group === undefined) {
            lookup[groupName] = group = {
                name: groupName,
                rules: []
            };
            outp.push(group);
        }
        group.rules.push(rule_1);
    }
    outp.sort(function (a, b) { return a.name.localeCompare(b.name); });
    var outpLen = outp.length;
    for (var i = 0; i < outp.length; i++) {
        outp[i].rules.sort(function (a, b) { return propertyGroups_1.compareProperties(a.name, b.name); });
    }
    return outp;
}
function root(root) {
    return root.content
        .map(block);
}
exports.root = root;
function block(block) {
    var rules = [];
    var modifiers = [];
    var elements = [];
    for (var i = 0; i < block.content.length; i++) {
        var el = block.content[i];
        switch (el.type) {
            case "rule":
                rules.push(rule(el));
                break;
            case "modifier":
                modifiers.push(modifier(el));
                break;
            case "element":
                elements.push(element(el));
                break;
            default:
                var _ = el;
        }
    }
    modifiers.sort(function (a, b) { return a.name.localeCompare(b.name); });
    elements.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return {
        name: block.name,
        attributes: block.attributes,
        rules: groupAndSortRules(rules),
        modifiers: modifiers,
        elements: elements
    };
}
exports.block = block;
function rule(rule) {
    return {
        name: rule.name,
        value: rule.value
    };
}
exports.rule = rule;
function modifier(modifier) {
    var rules = [];
    var modifierValues = [];
    for (var i = 0; i < modifier.content.length; i++) {
        var el = modifier.content[i];
        switch (el.type) {
            case "rule":
                rules.push(rule(el));
                break;
            case "modifierValue":
                modifierValues.push(modifierValue(el));
                break;
            default:
                var _ = el;
        }
    }
    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        modifierValues: modifierValues
    };
}
exports.modifier = modifier;
function modifierValue(modifier) {
    var rules = [];
    for (var i = 0; i < modifier.content.length; i++) {
        var el = modifier.content[i];
        switch (el.type) {
            case "rule":
                rules.push(rule(el));
                break;
            default:
        }
    }
    return {
        name: modifier.name,
        rules: groupAndSortRules(rules)
    };
}
exports.modifierValue = modifierValue;
function element(element) {
    var rules = [];
    var modifiers = [];
    for (var i = 0; i < element.content.length; i++) {
        var el = element.content[i];
        switch (el.type) {
            case "rule":
                rules.push(rule(el));
                break;
            case "modifier":
                modifiers.push(modifier(el));
                break;
            default:
                var _ = el;
        }
    }
    return {
        name: element.name,
        attributes: element.attributes,
        rules: groupAndSortRules(rules),
        modifiers: modifiers
    };
}
exports.element = element;
