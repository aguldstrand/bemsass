// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "block$string$1", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "block$ebnf$1", "symbols": []},
    {"name": "block$ebnf$1", "symbols": ["blockContent", "block$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "block", "symbols": ["block$string$1", "__", "identifier", "_", {"literal":"{"}, "_", "block$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'block',
                name:p[2],
                content:p[6].filter(p => p)
            }
        }
        
        },
    {"name": "blockContent", "symbols": ["cssRule"], "postprocess": p => { return p[0] }},
    {"name": "blockContent", "symbols": ["modifier"], "postprocess": p => { return p[0] }},
    {"name": "blockContent", "symbols": ["element"], "postprocess": p => { return p[0] }},
    {"name": "blockContent", "symbols": ["__"], "postprocess": p => { return null }},
    {"name": "modifier$string$1", "symbols": [{"literal":"m"}, {"literal":"o"}, {"literal":"d"}, {"literal":"i"}, {"literal":"f"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "modifier$ebnf$1", "symbols": []},
    {"name": "modifier$ebnf$1", "symbols": ["modifierContent", "modifier$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "modifier", "symbols": ["modifier$string$1", "__", "identifier", "_", {"literal":"{"}, "_", "modifier$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'modifier',
                name:p[2],
                content:p[6].filter(p => p)
            }
        }
        
        },
    {"name": "modifierContent", "symbols": ["cssRule"], "postprocess": p => { return p[0] }},
    {"name": "modifierContent", "symbols": ["modifierValue"], "postprocess": p => { return p[0] }},
    {"name": "modifierContent", "symbols": ["__"], "postprocess": p => { return null }},
    {"name": "modifierValue$string$1", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"l"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "modifierValue$ebnf$1", "symbols": []},
    {"name": "modifierValue$ebnf$1", "symbols": ["cssRule", "modifierValue$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "modifierValue", "symbols": ["modifierValue$string$1", "__", "identifier", "__", {"literal":"{"}, "__", "modifierValue$ebnf$1", "__", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'modifierValue',
                name:p[2],
                content:p[6].filter(p => p)
            }
        }
        
        },
    {"name": "element$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"e"}, {"literal":"m"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "element$ebnf$1", "symbols": []},
    {"name": "element$ebnf$1", "symbols": ["elementContent", "element$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "element", "symbols": ["element$string$1", "__", "identifier", "__", {"literal":"{"}, "__", "element$ebnf$1", "__", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'element',
                name:p[2],
                content:p[6].filter(p => p)
            }
        }
        
        },
    {"name": "elementContent", "symbols": ["cssRule"], "postprocess": p => { return p[0] }},
    {"name": "elementContent", "symbols": ["modifier"], "postprocess": p => { return p[0] }},
    {"name": "elementContent", "symbols": ["__"], "postprocess": p => { return null }},
    {"name": "identifier$ebnf$1", "symbols": [/[a-za-z0-9-]/]},
    {"name": "identifier$ebnf$1", "symbols": [/[a-za-z0-9-]/, "identifier$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"], "postprocess": p => { return p[0].join("") }},
    {"name": "cssRule$ebnf$1", "symbols": [/./]},
    {"name": "cssRule$ebnf$1", "symbols": [/./, "cssRule$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "cssRule", "symbols": ["identifier", "_", {"literal":":"}, "_", "cssRule$ebnf$1", {"literal":";"}], "postprocess": p => { return { type:'rule', name: p[0], value:p[4].join("").trim() } }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \r\t\n\v\f]/], "postprocess": id}
]
  , ParserStart: "block"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
