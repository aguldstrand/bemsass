rootScope -> (block _):* {% p => {
    return {
       type: 'root',
       content: p[0].map(pp => pp[0])
    }
} %}

attribute -> "@" identifier _ ":" _ .:+ ";" {% p => { return { type: 'attribute', name: p[1], value: p[5].join("").trim() } } %}

block -> (attribute:*) _ "block" __ identifier _ "{" _ blockContent:* _ "}" {%

    p => {
        return {
            type:'block',
            name:p[4],
            attributes: p[0],
            content:p[8].filter(p => p)
        }
    }

%}

blockContent ->
      cssRule {% p => { return p[0] } %}
    | modifier {% p => { return p[0] } %}
    | element {% p => { return p[0] } %}
    | __ {% p => { return null } %}



modifier -> "modifier" __ identifier _ "{" _ modifierContent:* _ "}" {%

    p => {
        return {
            type:'modifier',
            name:p[2],
            content:p[6].filter(p => p)
        }
    }

%}

modifierContent -> 
      cssRule {% p => { return p[0] } %}
    | modifierValue {% p => { return p[0] } %}
    | __ {% p => { return null } %}



modifierValue -> "value" __ identifier __ "{" __ cssRule:* __ "}" {%

    p => {
        return {
            type:'modifierValue',
            name:p[2],
            content:p[6].filter(p => p)
        }
    }

%}


element -> (attribute:*) _ "element" __ identifier __ "{" __ elementContent:* __ "}" {%

    p => {
        return {
            type:'element',
            name:p[4],
            attributes: p[0],
            content:p[8].filter(p => p)
        }
    }

%}

elementContent -> 
      cssRule {% p => { return p[0] } %}
    | modifier {% p => { return p[0] } %}
    | __ {% p => { return null } %}


identifier -> [a-za-z0-9-]:+ {% p => { return p[0].join("") } %}

cssRule -> identifier _ ":" _ .:+ ";" {% p => { return { type:'rule', name: p[0], value:p[4].join("").trim() + ';' } } %}

_  -> wschar:* {% function(d) {return null;} %}
__ -> wschar:+ {% function(d) {return null;} %}

wschar -> [ \r\t\n\v\f] {% id %}
