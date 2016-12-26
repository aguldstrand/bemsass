// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "rootScope$ebnf$1", "symbols": []},
    {"name": "rootScope$ebnf$1$subexpression$1", "symbols": ["block", "_"]},
    {"name": "rootScope$ebnf$1", "symbols": ["rootScope$ebnf$1$subexpression$1", "rootScope$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "rootScope", "symbols": ["rootScope$ebnf$1"], "postprocess":  p => {
            return {
               type: 'root',
               content: p[0].map(pp => pp[0])
            }
        } },
    {"name": "attribute$ebnf$1", "symbols": [/./]},
    {"name": "attribute$ebnf$1", "symbols": [/./, "attribute$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "attribute", "symbols": [{"literal":"@"}, "identifier", "_", {"literal":":"}, "_", "attribute$ebnf$1", {"literal":";"}], "postprocess": p => { return { type:'attribute', name: p[1], value:p[5].join("").trim() } }},
    {"name": "block$subexpression$1$ebnf$1", "symbols": []},
    {"name": "block$subexpression$1$ebnf$1", "symbols": ["attribute", "block$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "block$subexpression$1", "symbols": ["block$subexpression$1$ebnf$1"]},
    {"name": "block$string$1", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "block$ebnf$1", "symbols": []},
    {"name": "block$ebnf$1", "symbols": ["blockContent", "block$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "block", "symbols": ["block$subexpression$1", "_", "block$string$1", "__", "identifier", "_", {"literal":"{"}, "_", "block$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'block',
                name:p[4],
                attributes: p[0],
                content:p[8].filter(p => p)
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
    {"name": "element$subexpression$1$ebnf$1", "symbols": []},
    {"name": "element$subexpression$1$ebnf$1", "symbols": ["attribute", "element$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "element$subexpression$1", "symbols": ["element$subexpression$1$ebnf$1"]},
    {"name": "element$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"e"}, {"literal":"m"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "element$ebnf$1", "symbols": []},
    {"name": "element$ebnf$1", "symbols": ["elementContent", "element$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "element", "symbols": ["element$subexpression$1", "_", "element$string$1", "__", "identifier", "__", {"literal":"{"}, "__", "element$ebnf$1", "__", {"literal":"}"}], "postprocess": 
        
        p => {
            return {
                type:'element',
                name:p[4],
                attributes: p[0],
                content:p[8].filter(p => p)
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
  , ParserStart: "rootScope"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
