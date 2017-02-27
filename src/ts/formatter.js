"use strict";
exports.__esModule = true;
var propertyGroups_1 = require("./propertyGroups");
function root(root) {
    var mediaDeclarations = [];
    var blocks = [];
    for (var i = 0; i < root.content.length; i++) {
        var el = root.content[i];
        switch (el.type) {
            case 'mediaDeclaration':
                mediaDeclarations.push(mediaDeclaration(el, i));
                break;
            case 'block':
                blocks.push(block(el));
                break;
        }
    }
    blocks.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return {
        mediaDeclarations: mediaDeclarations,
        blocks: blocks
    };
}
exports.root = root;
function mediaDeclaration(mediaDeclaration, index) {
    return {
        attributes: [],
        name: mediaDeclaration.name,
        value: mediaDeclaration.value,
        documentOrder: index
    };
}
exports.mediaDeclaration = mediaDeclaration;
function media(media) {
    var rules = media.content.map(function (c) { return rule(c); });
    return {
        name: media.name,
        rules: groupAndSortRules(rules)
    };
}
exports.media = media;
function block(block) {
    var rules = [];
    var modifiers = [];
    var elements = [];
    var medias = [];
    for (var i = 0; i < block.content.length; i++) {
        var el = block.content[i];
        switch (el.type) {
            case 'rule':
                rules.push(rule(el));
                break;
            case 'modifier':
                modifiers.push(modifier(el));
                break;
            case 'element':
                elements.push(element(el));
                break;
            case 'media':
                medias.push(media(el));
                break;
            default:
                var _ = el;
        }
    }
    modifiers.sort(function (a, b) { return a.name.localeCompare(b.name); });
    elements.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return {
        name: block.name,
        attributes: block.attributes.sort(function (a, b) { return a.name.localeCompare(b.name); }),
        rules: groupAndSortRules(rules),
        modifiers: modifiers,
        elements: elements,
        medias: medias
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
    var medias = [];
    for (var i = 0; i < modifier.content.length; i++) {
        var el = modifier.content[i];
        switch (el.type) {
            case 'rule':
                rules.push(rule(el));
                break;
            case 'modifierValue':
                modifierValues.push(modifierValue(el));
                break;
            case 'media':
                medias.push(media(el));
                break;
            default:
                var _ = el;
        }
    }
    modifierValues.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        modifierValues: modifierValues,
        medias: medias
    };
}
exports.modifier = modifier;
function modifierValue(modifier) {
    var rules = [];
    var medias = [];
    for (var i = 0; i < modifier.content.length; i++) {
        var el = modifier.content[i];
        switch (el.type) {
            case 'rule':
                rules.push(rule(el));
                break;
            case 'media':
                medias.push(media(el));
                break;
            default:
                var _ = el;
        }
    }
    return {
        name: modifier.name,
        rules: groupAndSortRules(rules),
        medias: medias
    };
}
exports.modifierValue = modifierValue;
function element(element) {
    var rules = [];
    var modifiers = [];
    var medias = [];
    for (var i = 0; i < element.content.length; i++) {
        var el = element.content[i];
        switch (el.type) {
            case 'rule':
                rules.push(rule(el));
                break;
            case 'modifier':
                modifiers.push(modifier(el));
                break;
            case 'media':
                medias.push(media(el));
                break;
            default:
                var _ = el;
        }
    }
    modifiers.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return {
        name: element.name,
        attributes: element.attributes.sort(function (a, b) { return a.name.localeCompare(b.name); }),
        rules: groupAndSortRules(rules),
        modifiers: modifiers,
        medias: medias
    };
}
exports.element = element;
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
