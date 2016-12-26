"use strict";
function generateSass(blocks) {
    var outp = '';
    var ind = 0;
    var blocksLen = blocks.length;
    for (var i = 0; i < blocksLen; i++) {
        var block = blocks[i];
        // open block
        outp += indent(ind) + "." + block.name + " {\n\n";
        ind++;
        // open inner block
        outp += indent(ind) + "&." + block.name + " {\n\n";
        ind++;
        // Print block properties
        var ruleGroups = block.ruleGroups;
        var ruleGroupsLen = ruleGroups.length;
        for (var j = 0; j < ruleGroupsLen; j++) {
            var ruleGroup = ruleGroups[j];
            outp += indent(ind) + "/* " + ruleGroup.name + " */\n";
            var rules = ruleGroup.rules;
            var rulesLen = rules.length;
            for (var j = 0; j < rulesLen; j++) {
                var rule = rules[j];
                outp += "" + indent(ind) + rule.name + ": " + rule.value + " \n";
            }
            outp += "\n";
        }
        // close inner block
        ind--;
        outp += indent(ind) + "}\n\n";
        outp += "" + content.filter(function (d) { return d.type !== 'rule'; }).map(function (d) { return generate(d, data.name, ind + 1); }).join("");
        // close block
        ind--;
        outp += indent(ind) + "}\n";
    }
}
exports.__esModule = true;
exports["default"] = generateSass;
function indent(indentation) {
    var outp = '';
    for (var i = 0; i < indentation; i++) {
        outp += '    ';
    }
    return outp;
}
