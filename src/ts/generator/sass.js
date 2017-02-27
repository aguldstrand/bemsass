"use strict";
exports.__esModule = true;
function generateSass(root) {
    // Index media Declarations
    var mediaDeclarations = indexMediaDeclarations([root]);
    // Generate output
    var outp = '';
    var ind = 0;
    var blocks = root.blocks;
    var blocksLen = blocks.length;
    for (var i = 0; i < blocksLen; i++) {
        var block = blocks[i];
        // open block
        outp += comment("Block: " + block.name, ind);
        outp += indent(ind) + "." + block.name + " {\n\n";
        ind++;
        if (block.rules !== undefined && block.rules.length !== 0) {
            // open inner block
            outp += indent(ind) + "&." + block.name + " {\n\n";
            ind++;
            // Print block properties
            outp += rules(block.rules, ind);
            // Close inner block
            ind--;
            outp += indent(ind) + "}\n\n";
        }
        // Media queries
        outp += media(block.medias, mediaDeclarations, ind);
        // Modifiers
        outp += modifiers(block.modifiers, block.name, mediaDeclarations, ind);
        // Elements
        outp += elements(block.elements, mediaDeclarations, ind);
        // Close block
        ind--;
        outp += indent(ind) + "}\n\n";
    }
    return outp;
}
exports.generateSass = generateSass;
function elements(elements, mediaDeclarations, ind) {
    var outp = '';
    var elementsLen = elements.length;
    for (var j = 0; j < elementsLen; j++) {
        var element = elements[j];
        // Open element
        outp += comment("Element: " + element.name, ind);
        outp += indent(ind) + "& > ." + element.name + " {\n\n";
        ind++;
        // Rules
        outp += rules(element.rules, ind);
        // Media queries
        outp += media(element.medias, mediaDeclarations, ind);
        // Modifiers
        outp += modifiers(element.modifiers, "" + element.name, mediaDeclarations, ind);
        // Close element
        ind--;
        outp += indent(ind) + "}\n\n";
    }
    return outp;
}
function media(medias, mediaDeclarations, ind) {
    var outp = '';
    var mediasLen = medias.length;
    for (var i = 0; i < mediasLen; i++) {
        var media_1 = medias[i];
        var mediaDeclaration = mediaDeclarations[media_1.name];
        outp += comment("Media query: " + media_1.name, ind);
        outp += indent(ind) + "@media (" + mediaDeclaration.value + ") {\n\n";
        ind++;
        outp += rules(media_1.rules, ind);
        ind--;
        outp += indent(ind) + "}\n\n";
    }
    return outp;
}
function modifiers(modifiers, namePrefix, mediaDeclarations, ind) {
    var outp = '';
    var modifiersLen = modifiers.length;
    for (var i = 0; i < modifiersLen; i++) {
        var modifier = modifiers[i];
        outp += comment("Modifier: " + modifier.name, ind);
        outp += indent(ind) + "&." + modifier.name + " {\n\n";
        ind++;
        outp += rules(modifier.rules, ind);
        // Media queries
        outp += media(modifier.medias, mediaDeclarations, ind);
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
        var ruleValueCol = 0;
        var rules_1 = ruleGroup.rules;
        var rulesLen = rules_1.length;
        for (var j = 0; j < rulesLen; j++) {
            var rule = rules_1[j];
            ruleValueCol = Math.max(ruleValueCol, rule.name.length + 2);
        }
        outp += indent(ind) + "// " + ruleGroup.name + "\n";
        for (var j = 0; j < rulesLen; j++) {
            var rule = rules_1[j];
            var padd = padding(ruleValueCol - rule.name.length - 1);
            outp += "" + indent(ind) + rule.name + ":" + padd + rule.value + " \n";
        }
        outp += "\n";
    }
    return outp;
}
function comment(comment, ind) {
    var outp = '';
    outp = indent(ind) + "//\n";
    outp += indent(ind) + "// " + comment + "\n";
    outp += indent(ind) + "//\n";
    return outp;
}
function indexMediaDeclarations(roots) {
    var outp = {};
    var rootsLen = roots.length;
    for (var i = 0; i < rootsLen; i++) {
        var root = roots[i];
        var mediaDeclarationsLen = root.mediaDeclarations.length;
        for (var j = 0; j < mediaDeclarationsLen; j++) {
            var mediaDeclaration = root.mediaDeclarations[j];
            outp[mediaDeclaration.name] = mediaDeclaration;
        }
    }
    return outp;
}
function padding(padding) {
    var outp = '';
    for (var i = 0; i < padding; i++) {
        outp += ' ';
    }
    return outp;
}
function indent(indentation) {
    var outp = '';
    for (var i = 0; i < indentation; i++) {
        outp += '    ';
    }
    return outp;
}
