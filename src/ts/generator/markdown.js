"use strict";
var sass_1 = require("./sass");
var nodeSass = require('node-sass');
function generateMarkdown(blocks) {
    var sass = sass_1.generateSass(blocks);
    var css = nodeSass.renderSync({
        data: sass
    });
    var outp = "<style>.preview { position: relative; } " + css.css + "</style>\n\n";
    var ind = 0;
    var blocksLen = blocks.length;
    for (var i = 0; i < blocksLen; i++) {
        var block = blocks[i];
        // open block
        outp += "# Block: " + block.name + "\n";
        ind++;
        outp += '\n';
        outp += "<div class=\"preview\">\n";
        outp += "    <div class=\"" + block.name + "\">\n";
        var elements = block.elements;
        var elementsLen = elements.length;
        for (var j = 0; j < elementsLen; j++) {
            var element = elements[j];
            // Open element
            outp += "        <div class=\"" + block.name + "__" + element.name + "\">\n";
            outp += "        </div>\n";
        }
        outp += '    </div>\n';
        outp += '</div>\n';
        outp += '\n';
        if (block.ruleGroups !== undefined && block.ruleGroups.length !== 0) {
            // Print block properties
            outp += rules("." + block.name, block.ruleGroups, ind);
        }
        // Elements
        for (var j = 0; j < elementsLen; j++) {
            var element = elements[j];
            // Open element
            outp += "## Element: " + element.name + " \n\n";
            outp += rules("." + block.name + " ." + block.name + "__" + element.name, element.rules, ind);
            outp += modifiers(element.modifiers, block.name + "__" + element.name, 3);
        }
        outp += modifiers(block.modifiers, block.name, 2);
    }
    return outp;
}
exports.generateMarkdown = generateMarkdown;
function modifiers(modifiers, namePrefix, ind) {
    var outp = '';
    var modifiersLen = modifiers.length;
    for (var i = 0; i < modifiersLen; i++) {
        var modifier = modifiers[i];
        outp += indent(ind, '#') + " Modifier: " + modifier.name + "\n\n";
        outp += rules("." + namePrefix + "--" + modifier.name, modifier.rules, ind);
    }
    return outp;
}
function rules(selector, ruleGroups, ind) {
    var outp = '```css\n';
    outp += selector + " {\n";
    var ruleGroupsLen = ruleGroups.length;
    for (var i = 0; i < ruleGroupsLen; i++) {
        var ruleGroup = ruleGroups[i];
        outp += indent(1) + "/* " + ruleGroup.name + " */\n";
        var rules_1 = ruleGroup.rules;
        var rulesLen = rules_1.length;
        for (var j = 0; j < rulesLen; j++) {
            var rule = rules_1[j];
            outp += "" + indent(1) + rule.name + ": " + rule.value + " \n";
        }
        if (i != ruleGroupsLen - 1) {
            outp += "\n";
        }
    }
    outp += '}\n';
    outp += '```\n\n';
    return outp;
}
function comment(comment, ind) {
    var outp = '';
    outp = indent(ind) + "//\n";
    outp += indent(ind) + "// " + comment + "\n";
    outp += indent(ind) + "//\n";
    return outp;
}
function indent(indentation, char) {
    if (char === void 0) { char = '    '; }
    var outp = '';
    for (var i = 0; i < indentation; i++) {
        outp += char;
    }
    return outp;
}
