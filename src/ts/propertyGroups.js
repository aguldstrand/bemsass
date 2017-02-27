"use strict";
exports.__esModule = true;
var propertyPattern = /^(--[^-]+-){0,1}([^:]+)$/;
function getGroupName(name) {
    return lookup[propertyPattern.exec(name)[2]] || 'Other properties';
}
exports.getGroupName = getGroupName;
function compareProperties(a, b) {
    var aMatch = propertyPattern.exec(a);
    var bMatch = propertyPattern.exec(b);
    var nameCmp = aMatch[2].localeCompare(bMatch[2]);
    if (nameCmp !== 0) {
        return nameCmp;
    }
    var aPrefix = aMatch[1];
    var bPrefix = bMatch[1];
    if (aPrefix === undefined && bPrefix === undefined) {
        return 0;
    }
    if (aPrefix === undefined && bPrefix !== undefined) {
        return -1;
    }
    if (aPrefix !== undefined && bPrefix === undefined) {
        return 1;
    }
    return aPrefix.localeCompare(bPrefix);
}
exports.compareProperties = compareProperties;
var grouping = [{
        "name": "Color Properties",
        "properties": [
            "color",
            "opacity"
        ]
    }, {
        "name": "Background and Border Properties",
        "properties": [
            "background",
            "background-attachment",
            "background-blend-mode",
            "background-color",
            "background-image",
            "background-position",
            "background-repeat",
            "background-clip",
            "background-origin",
            "background-size",
            "border",
            "border-bottom",
            "border-bottom-color",
            "border-bottom-left-radius",
            "border-bottom-right-radius",
            "border-bottom-style",
            "border-bottom-width",
            "border-color",
            "border-image",
            "border-image-outset",
            "border-image-repeat",
            "border-image-slice",
            "border-image-source",
            "border-image-width",
            "border-left",
            "border-left-color",
            "border-left-style",
            "border-left-width",
            "border-radius",
            "border-right",
            "border-right-color",
            "border-right-style",
            "border-right-width",
            "border-style",
            "border-top",
            "border-top-color",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-top-style",
            "border-top-width",
            "border-width",
            "box-decoration-break",
            "box-shadow"
        ]
    }, {
        "name": "Basic Box Properties",
        "properties": [
            "bottom",
            "clear",
            "clip",
            "display",
            "float",
            "height",
            "left",
            "margin",
            "margin-bottom",
            "margin-left",
            "margin-right",
            "margin-top",
            "max-height",
            "max-width",
            "min-height",
            "min-width",
            "overflow\n",
            "overflow-x",
            "overflow-y",
            "padding",
            "padding-bottom",
            "padding-left",
            "padding-right",
            "padding-top",
            "position",
            "right",
            "top",
            "visibility",
            "width",
            "vertical-align",
            "z-index"
        ]
    }, {
        "name": "Flexible Box Layout",
        "properties": [
            "align-content",
            "align-items",
            "align-self",
            "flex",
            "flex-basis",
            "flex-direction",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",
            "justify-content",
            "order"
        ]
    }, {
        "name": "Text Properties",
        "properties": [
            "hanging-punctuation",
            "hyphens",
            "letter-spacing",
            "line-break",
            "line-height",
            "overflow-wrap",
            "tab-size",
            "text-align",
            "text-align-last",
            "text-combine-upright",
            "text-indent",
            "text-justify",
            "text-transform",
            "white-space",
            "word-break",
            "word-spacing",
            "word-wrap"
        ]
    }, {
        "name": "Text Decoration Properties",
        "properties": [
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-style",
            "text-shadow",
            "text-underline-position"
        ]
    }, {
        "name": "Font Properties",
        "properties": [
            "@font-face",
            "@font-feature-values",
            "font",
            "font-family",
            "font-feature-settings",
            "font-kerning",
            "font-language-override",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-synthesis",
            "font-variant",
            "font-variant-alternates",
            "font-variant-caps",
            "font-variant-east-asian",
            "font-variant-ligatures",
            "font-variant-numeric",
            "font-variant-position",
            "font-weight"
        ]
    }, {
        "name": "Writing Modes Properties",
        "properties": [
            "direction",
            "text-orientation",
            "text-combine-upright",
            "unicode-bidi",
            "writing-mode"
        ]
    }, {
        "name": "Table Properties",
        "properties": [
            "border-collapse",
            "border-spacing",
            "caption-side",
            "empty-cells",
            "table-layout"
        ]
    }, {
        "name": "Lists and Counters Properties",
        "properties": [
            "counter-increment",
            "counter-reset",
            "list-style",
            "list-style-image",
            "list-style-position",
            "list-style-type"
        ]
    }, {
        "name": "Animation Properties",
        "properties": [
            "@keyframes",
            "animation",
            "animation-delay",
            "animation-direction",
            "animation-duration",
            "animation-fill-mode",
            "animation-iteration-count",
            "animation-name",
            "animation-play-state",
            "animation-timing-function"
        ]
    }, {
        "name": "Transform Properties",
        "properties": [
            "backface-visibility",
            "perspective",
            "perspective-origin",
            "transform",
            "transform-origin",
            "transform-style"
        ]
    }, {
        "name": "Transitions Properties",
        "properties": [
            "transition",
            "transition-property",
            "transition-duration",
            "transition-timing-function",
            "transition-delay"
        ]
    }, {
        "name": "Basic User Interface Properties",
        "properties": [
            "box-sizing",
            "content",
            "cursor",
            "ime-mode",
            "nav-down",
            "nav-index",
            "nav-left",
            "nav-right",
            "nav-up",
            "outline",
            "outline-color",
            "outline-offset",
            "outline-style",
            "outline-width",
            "resize",
            "text-overflow"
        ]
    }, {
        "name": "Multi-column Layout Properties",
        "properties": [
            "break-after",
            "break-before",
            "break-inside",
            "column-count",
            "column-fill",
            "column-gap",
            "column-rule",
            "column-rule-color",
            "column-rule-style",
            "column-rule-width",
            "column-span",
            "column-width",
            "columns",
            "widows"
        ]
    }, {
        "name": "Paged Media",
        "properties": [
            "orphans",
            "page-break-after",
            "page-break-before",
            "page-break-inside"
        ]
    }, {
        "name": "Generated Content for Paged Media",
        "properties": [
            "marks",
            "quotes"
        ]
    }, {
        "name": "Filter Effects Properties",
        "properties": [
            "filter"
        ]
    }, {
        "name": "Image Values and Replaced Content",
        "properties": [
            "image-orientation",
            "image-rendering",
            "image-resolution",
            "object-fit",
            "object-position"
        ]
    }, {
        "name": "Masking Properties",
        "properties": [
            "mask",
            "mask-type"
        ]
    }, {
        "name": "Speech Properties",
        "properties": [
            "mark",
            "mark-after",
            "mark-before",
            "phonemes",
            "rest",
            "rest-after",
            "rest-before",
            "voice-balance",
            "voice-duration",
            "voice-pitch",
            "voice-pitch-range",
            "voice-rate",
            "voice-stress",
            "voice-volume"
        ]
    }, {
        "name": "Marquee Properties",
        "properties": [
            "marquee-direction",
            "marquee-play-count",
            "marquee-speed",
            "marquee-style"
        ]
    }];
var lookup = {};
grouping.forEach(function (g) {
    g.properties.forEach(function (p) {
        lookup[p] = g.name;
    });
});
