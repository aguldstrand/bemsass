"use strict";
function generateSass(blocks) {
    var outp = '';
    var ind = 0;
    var blocksLen = blocks.length;
    for (var i = 0; i < blocksLen; i++) {
        var block = blocks[i];
        // open block
        outp += comment("Block: " + block.name, ind);
        outp += indent(ind) + "." + block.name + " {\n\n";
        ind++;
        if (block.ruleGroups !== undefined && block.ruleGroups.length !== 0) {
            // open inner block
            outp += indent(ind) + "&." + block.name + " {\n\n";
            ind++;
            // Print block properties
            outp += rules(block.ruleGroups, ind);
            // Close inner block
            ind--;
            outp += indent(ind) + "}\n\n";
        }
        // Elements
        var elements = block.elements;
        var elementsLen = elements.length;
        for (var j = 0; j < elementsLen; j++) {
            var element = elements[j];
            // Open element
            outp += comment("Element: " + element.name, ind);
            outp += indent(ind) + "& ." + block.name + "__" + element.name + " {\n\n";
            ind++;
            outp += rules(element.rules, ind);
            outp += modifiers(element.modifiers, block.name + "__" + element.name, ind);
            // Close element
            ind--;
            outp += indent(ind) + "}\n\n";
        }
        outp += modifiers(block.modifiers, block.name, ind);
        // modifiers: Modifier[],
        // elements: Element[]
        // outp += `${content.filter(d => d.type !== 'rule').map(d => generate(d, data.name, ind + 1)).join(')}`
        // Close block
        ind--;
        outp += indent(ind) + "}\n\n";
    }
    return outp;
}
exports.generateSass = generateSass;
function modifiers(modifiers, namePrefix, ind) {
    var outp = '';
    var modifiersLen = modifiers.length;
    for (var i = 0; i < modifiersLen; i++) {
        var modifier = modifiers[i];
        outp += comment("Modifier: " + modifier.name, ind);
        outp += indent(ind) + "&." + namePrefix + "--" + modifier.name + " {\n\n";
        ind++;
        outp += rules(modifier.rules, ind);
        ind--;
        outp += indent(ind) + "}\n\n";
    }
    return outp;
}
function rules(ruleGroups, ind) {
    var outp = '';
    var ruleGroupsLen = ruleGroups.length;
    for (var i = 0; i < ruleGroupsLen; i++) {
        var ruleGroup = ruleGroups[i];
        outp += indent(ind) + "/* " + ruleGroup.name + " */\n";
        var rules_1 = ruleGroup.rules;
        var rulesLen = rules_1.length;
        for (var j = 0; j < rulesLen; j++) {
            var rule = rules_1[j];
            outp += "" + indent(ind) + rule.name + ": " + rule.value + " \n";
        }
        outp += "\n";
    }
    return outp;
}
function comment(comment, ind) {
    var outp = '';
    outp = indent(ind) + "/*\n";
    outp += indent(ind) + " * " + comment + "\n";
    outp += indent(ind) + " *" + new Array(Math.ceil(comment.length / 2) + 2).join(' *') + "/\n";
    return outp;
}
function indent(indentation) {
    var outp = '';
    for (var i = 0; i < indentation; i++) {
        outp += '    ';
    }
    return outp;
}
