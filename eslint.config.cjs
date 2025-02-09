/* eslint-disable sonarjs/no-duplicate-string */
const sonarjs = require("eslint-plugin-sonarjs");
const globals = require("globals");

module.exports = [
	{
		plugins: {
			sonarjs,
		},

		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: 11,
			sourceType: "commonjs",
		},

		settings: {
			"import/docstyle": [
				"jsdoc",
				"tomdoc",
			],
		},

		rules: {
			"prefer-spread": "error",

			"max-len": [
				"warn",
				{
					code: 150,
					ignoreRegExpLiterals: false,
					ignoreStrings: false,
					ignoreUrls: false,
					ignoreTemplateLiterals: false,
					ignoreComments: false,
					comments: 150,
				},
			],

			"no-empty": "error",
			"wrap-regex": "error",
			"prefer-numeric-literals": "warn",
			"radix": "error",
			"no-new-object": "error",
			"accessor-pairs": "error",
			"no-else-return": "warn",
			"dot-location": [
				"error",
				"property",
			],
			"valid-typeof": "error",
			"space-unary-ops": "error",
			"comma-style": "error",
			"no-extra-bind": "warn",

			"consistent-return": [
				"warn",
				{
					treatUndefinedAsUnspecified: true,
				},
			],

			"no-useless-call": "warn",

			"array-bracket-newline": [
				"error",
				{
					minItems: 2,
					multiline: true,
				},
			],

			"no-dupe-keys": "error",
			"no-return-await": "error",
			"keyword-spacing": "error",
			"consistent-this": [
				"error",
				"that",
				"self",
				"me",
				"executionContext",
			],
			"implicit-arrow-linebreak": "error",

			"space-infix-ops": [
				"error",
				{
					int32Hint: true,
				},
			],

			"brace-style": [
				"error",
				"stroustrup",
			],

			"no-implicit-coercion": [
				"error",
				{
					allow: ["!!"],
					string: false,
				},
			],

			"object-curly-newline": [
				"error",
				{
					multiline: true,
					minProperties: 1,
					consistent: true,
				},
			],

			"default-case": "error",
			"no-dupe-class-members": "error",
			"no-lonely-if": "error",
			"no-multi-str": "warn",
			"prefer-const": "error",

			"dot-notation": [
				"error",
				{
					allowPattern: "^_*[a-zA-Z]+(_[A-Za-z]*)*$",
				},
			],

			"no-unreachable": "error",
			"no-eq-null": "error",
			"no-negated-condition": "warn",
			"yoda": "error",

			"no-unused-expressions": [
				"error",
				{
					allowTaggedTemplates: true,
				},
			],

			"no-octal": "warn",
			"no-useless-rename": "error",

			"func-name-matching": [
				"warn",
				"always",
				{
					considerPropertyDescriptor: true,
				},
			],

			"constructor-super": "error",
			"comma-spacing": "error",

			"array-bracket-spacing": [
				"error",
				"always",
				{
					singleValue: false,
				},
			],

			"no-func-assign": "error",
			"guard-for-in": "error",

			"space-before-function-paren": [
				"error",
				{
					asyncArrow: "always",
					anonymous: "never",
					named: "never",
				},
			],

			"no-sparse-arrays": "error",
			"no-mixed-spaces-and-tabs": [
				"error",
				"smart-tabs",
			],

			"no-extend-native": [
				"error",
				{
					exceptions: [
						"Array",
						"String",
					],
				},
			],

			"no-delete-var": "error",
			"require-yield": "error",
			"no-multiple-empty-lines": "error",
			"no-empty-function": "warn",
			"no-script-url": "warn",
			"func-call-spacing": "error",
			"block-scoped-var": "error",
			"yield-star-spacing": "error",
			"space-in-parens": "error",
			"generator-star-spacing": [
				"error",
				"after",
			],
			"no-useless-constructor": "error",

			"array-element-newline": [
				"error",
				{
					multiline: true,
					minItems: 1,
				},
			],

			"semi": "error",
			"prefer-arrow-callback": "error",
			"operator-assignment": "error",
			"no-throw-literal": "warn",

			"no-extra-parens": [
				"error",
				"all",
				{
					enforceForArrowConditionals: false,
					conditionalAssign: false,
					nestedBinaryExpressions: false,
				},
			],

			"linebreak-style": "error",
			"no-class-assign": "error",
			"padded-blocks": [
				"error",
				"never",
			],
			"newline-per-chained-call": "error",
			"lines-between-class-members": [
				"error",
				"never",
			],
			"quote-props": [
				"error",
				"consistent",
			],
			"no-compare-neg-zero": "error",
			"no-global-assign": "error",
			"no-floating-decimal": "error",
			"require-unicode-regexp": "warn",
			"spaced-comment": "error",
			"no-eval": "error",
			"no-invalid-this": "error",
			"no-inner-declarations": "error",
			"template-tag-spacing": "error",
			"operator-linebreak": [
				"error",
				"before",
			],
			"no-const-assign": "error",
			"no-empty-character-class": "error",
			"func-names": [
				"error",
				"as-needed",
			],

			"indent": [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],

			"no-cond-assign": [
				"error",
				"except-parens",
			],
			"no-proto": "error",
			"no-array-constructor": "error",
			"one-var": [
				"error",
				"never",
			],
			"key-spacing": "error",
			"no-new-func": "error",
			"multiline-ternary": [
				"error",
				"always-multiline",
			],
			"block-spacing": "error",
			"no-unneeded-ternary": "error",
			"no-whitespace-before-property": "error",
			"no-extra-label": "warn",

			"no-undef": [
				"error",
				{
					typeof: true,
				},
			],

			"semi-spacing": [
				"error",
				{
					after: true,
					before: false,
				},
			],

			"object-curly-spacing": [
				"error",
				"always",
			],
			"no-obj-calls": "error",
			"for-direction": "error",
			"prefer-template": "error",
			"no-invalid-regexp": "error",
			"semi-style": "error",
			"no-alert": "warn",
			"no-extra-boolean-cast": "warn",

			"no-irregular-whitespace": [
				"error",
				{
					skipStrings: false,
					skipComments: true,
				},
			],

			"use-isnan": "error",
			"no-duplicate-case": "error",
			"no-octal-escape": "error",
			"no-dupe-args": "error",
			"no-unmodified-loop-condition": "error",
			"no-caller": "error",
			"getter-return": "error",
			"eol-last": "error",
			"new-parens": "error",
			"no-self-assign": "error",
			"no-iterator": "error",
			"object-shorthand": "error",
			"no-self-compare": "error",

			"no-constant-condition": [
				"error",
				{
					checkLoops: false,
				},
			],

			"no-undefined": "warn",
			"no-with": "error",
			"no-fallthrough": "error",
			"arrow-parens": [
				"error",
				"as-needed",
			],

			"no-tabs": [
				"error",
				{
					allowIndentationTabs: true,
				},
			],

			"no-trailing-spaces": "error",
			"no-var": "error",

			"no-confusing-arrow": [
				"error",
				{
					allowParens: true,
				},
			],

			"no-sequences": "error",
			"no-useless-computed-key": "error",
			"no-prototype-builtins": "warn",
			"no-multi-assign": "error",
			"no-useless-concat": "error",
			"function-paren-newline": [
				"error",
				"multiline-arguments",
			],

			"no-redeclare": [
				"error",
				{
					builtinGlobals: true,
				},
			],

			"no-unused-vars": [
				"warn",
				{
					args: "after-used",
					vars: "local",
				},
			],

			"comma-dangle": [
				"error",
				{
					imports: "always-multiline",
					arrays: "always-multiline",
					exports: "always-multiline",
					objects: "always-multiline",
					functions: "never",
				},
			],

			"no-implied-eval": "error",
			"no-use-before-define": "error",
			"no-extra-semi": "warn",
			"arrow-body-style": [
				"error",
				"as-needed",
			],
			"prefer-rest-params": "error",
			"no-unused-labels": "error",
			"no-debugger": "error",
			"no-loop-func": "error",
			"computed-property-spacing": "error",
			"no-label-var": "error",
			"arrow-spacing": "error",
			"class-methods-use-this": "warn",

			"prefer-promise-reject-errors": [
				"warn",
				{
					allowEmptyReject: true,
				},
			],

			"symbol-description": "error",
			"no-this-before-super": "error",

			"camelcase": [
				"error",
				{
					allow: [
						"^INTERNAL_",
						"^GM_",
					],
				},
			],

			"no-regex-spaces": "error",
			"no-case-declarations": "error",
			"no-template-curly-in-string": "error",
			"no-useless-catch": "error",
			"no-shadow": "error",
			"no-ex-assign": "error",
			"no-shadow-restricted-names": "error",
			"no-return-assign": "error",
			"rest-spread-spacing": "error",
			"switch-colon-spacing": "error",
			"no-unexpected-multiline": "error",
			"no-useless-escape": "warn",
			"no-unsafe-finally": "error",
			"no-new": "error",
			"no-lone-blocks": "error",

			"object-property-newline": [
				"error",
				{
					allowAllPropertiesOnSameLine: false,
				},
			],

			"no-new-wrappers": "error",
			"no-unsafe-negation": "error",
			"no-new-symbol": "error",

			"wrap-iife": [
				"error",
				"any",
				{
					functionPrototypeMethods: true,
				},
			],

			"array-callback-return": "error",
			"curly": "error",
			"space-before-blocks": "error",
			"template-curly-spacing": "error",
			"no-useless-return": "error",
			"no-misleading-character-class": "error",
			"sonarjs/no-element-overwrite": "error",
			"sonarjs/no-extra-arguments": "error",
			"sonarjs/no-identical-conditions": "error",
			"sonarjs/no-identical-expressions": "error",
			"sonarjs/no-one-iteration-loop": "error",
			"sonarjs/no-use-of-empty-return-value": "error",
			"sonarjs/no-collapsible-if": "error",
			"sonarjs/no-collection-size-mischeck": "error",
			"sonarjs/no-duplicate-string": "warn",
			"sonarjs/no-duplicated-branches": "error",
			"sonarjs/no-identical-functions": "warn",
			"sonarjs/no-inverted-boolean-check": "error",
			"sonarjs/no-redundant-boolean": "error",
			"sonarjs/no-redundant-jump": "error",
			"sonarjs/no-same-line-conditional": "error",
			"sonarjs/no-small-switch": "warn",
			"sonarjs/no-unused-collection": "warn",
			"sonarjs/no-useless-catch": "error",
			"sonarjs/prefer-immediate-return": "error",
			"sonarjs/prefer-object-literal": "error",
			"sonarjs/prefer-single-boolean-return": "error",
			"sonarjs/prefer-while": "error",
		},
	},
	{
		files: ["**/*.webpack.js"],

		languageOptions: {
			globals: {
				...globals.commonjs,
				...Object.fromEntries(Object.entries(globals.node).map(([key]) => [
					key,
					"off",
				])),
			},

			ecmaVersion: 5,
			sourceType: "module",
		},
	},
	{
		files: ["**/*.browser.js"],

		languageOptions: {
			globals: {
				...globals.browser,
				...Object.fromEntries(Object.entries(globals.node).map(([key]) => [
					key,
					"off",
				])),
			},
		},
	},
	{
		files: ["**/jquery.*.js"],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jquery,
				...Object.fromEntries(Object.entries(globals.node).map(([key]) => [
					key,
					"off",
				])),
			},
		},
	},
	{
		files: ["**/*.user.js"],

		languageOptions: {
			globals: {
				...globals.greasemonkey,
				...globals.browser,
				...Object.fromEntries(Object.entries(globals.node).map(([key]) => [
					key,
					"off",
				])),
			},
		},

		rules: {
			camelcase: [
				"error",
				{
					allow: [
						"^INTERNAL_",
						"^GM_",
					],
				},
			],
		},
	},
];
