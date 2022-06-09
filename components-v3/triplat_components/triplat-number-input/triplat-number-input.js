/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../@polymer/paper-input/paper-input.js";
import { TriPlatNumberBehaviorImpl, TriPlatNumberBehavior } from "./triplat-number-behavior.js";
import { TriBlockScrollFieldIntoViewBehavior } from "../triblock-scroll-field-into-view-behavior/triblock-scroll-field-into-view-behavior.js";
import "../triplat-uom/triplat-uom.js";
import { importJs, assertParametersAreDefined } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs(
	["../number-formatter/lib/format.js"],
"triplat-number-input/triplat-number-input.js"
);

importJsPromise.then(() => {

	window.format = numberFormatter;
/*
triplat-number-input is a custom element for displaying formatted numbers. 

	<triplat-number-input 
		value="{{value}}" 
		user="{{user}}" 
		uom="{{uom}}" 
		uom-list="{{uom-list}}">
	</triplat-number-input>

### Styling

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
	<b>Deprecated:</b> <br> 
	Custom property `--triplat-uom-symbol-style` is deprecated. <br>
	Custom property `--triplat-uom-value-style` is deprecated, instead use `--triplat-uom-value`. <br>
	Custom property `--triplat-uom-abbr-style` is deprecated, instead use `--triplat-uom-abbr`. <br>
  </div>
</div>

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-uom-value` | Style for the UOM value part of the input field | `margin-top: 2.45em; font-size: medium; font-weight: lighter;`
`--triplat-uom-abbr` | Style for the abbreviation part of the input field | `margin-top: 2.45em; font-size: medium; font-weight: lighter;`
`--triplat-paper-input` | Style for the paper-input part of the input field | `{}`
`--triplat-paper-input-container-invalid-color` | Label and underline color when the input value is invalid | `--error-color`
`--triplat-paper-input-container-input` | Mixin applied to the input field of paper-input | `{}`

See `TriPlatNumberBehavior` for more API docs.

@demo demo/index.html
*/
	Polymer({
		_template: html`
			<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">

				#triUomValue {
					margin-bottom: 0.60em;
					margin-left: 5px;
					display: flex;
					align-self: flex-end;
					font-size: medium;  
					font-weight: lighter;
					@apply --triplat-uom-value-style;
					@apply --triplat-uom-value;
				}
				#triUomAbbr {
					margin-bottom: 0.75em;
					margin-left: 5px;
					display: flex;
					align-self: flex-end;
					font-size: medium;
					font-weight: lighter;
					@apply --triplat-uom-abbr-style;
					@apply --triplat-uom-abbr;
				}
				#triUomValueReadonly {
					margin-left: 5px;
					@apply --triplat-uom-value-style;
					@apply --triplat-uom-value;
				}
				#triUomAbbrReadonly {
					margin-left: 5px;
					@apply --triplat-uom-abbr-style;
					@apply --triplat-uom-abbr;
				}

				paper-input {
					--paper-input-container-invalid-color: var(--triplat-paper-input-container-invalid-color, var(--error-color));
					--paper-input-container-input: {
						@apply --triplat-paper-input-container-input;
					};

					@apply --triplat-paper-input;
				}

				.input {
					@apply --layout-horizontal;
					@apply --layout-center;
				}

			</style>

			<div class="input">
				<template is="dom-if" if="[[_readonlyNoDisabledNoLabel(disabled,readonly,label)]]">
					<span _style="{{_setStyle(style)}}" class="{{_setClass(class)}}">{{_formatNumber(unformattedValue, _decimal, _delimiter, uom, uomList, displaySymbol)}}</span>
					<template is="dom-if" if="{{displayUom}}">
						<triplat-uom id="triUomValueReadonly" uom="{{uom}}" uom-list="{{uomList}}" display="uom">
						</triplat-uom>
					</template>
					<template is="dom-if" if="{{displayAbbr}}">
						<triplat-uom id="triUomAbbrReadonly" uom="{{uom}}" uom-list="{{uomList}}" display="abbr">
						</triplat-uom>
					</template>
				</template>
				<paper-input
					hidden\$="[[_readonlyNoDisabledNoLabel(disabled,readonly,label)]]"
					id="triNumberInput"
					label="[[label]]"
					_style="{{_setStyle(style)}}"
					class="{{_setClass(class)}}"
					value="[[_formatNumber(unformattedValue, _decimal, _delimiter, uom, uomList, displaySymbol)]]"
					on-change="_valueChanged"
					disabled="[[disabled]]"
					readonly="[[readonly]]"
					tri-scroll-into-view
					auto-validate="[[autoValidate]]"
					allowed-pattern="[0-9.,-\\s]"
					pattern="[[_validationPattern]]"
					error-message="[[invalidInputMessage]]"
					invalid="{{invalid}}"
					no-label-float="[[noLabelFloat]]"
					>
				</paper-input>
				<template is="dom-if" if="[[!_readonlyNoDisabledNoLabel(disabled,readonly,label)]]">
					<template is="dom-if" if="{{displayUom}}">
						<triplat-uom id="triUomValue" uom="{{uom}}" uom-list="{{uomList}}" display="uom">
						</triplat-uom>
					</template>
					<template is="dom-if" if="{{displayAbbr}}">
						<triplat-uom id="triUomAbbr" uom="{{uom}}" uom-list="{{uomList}}" display="abbr">
						</triplat-uom>
					</template>
				</template>
			</div>
		`,

			is: "triplat-number-input",

			behaviors: [
				TriPlatNumberBehavior,
				TriBlockScrollFieldIntoViewBehavior
			],

		properties: {
			/**
				* Style property to be applied to this element and its children.
				*
				**/
			style: {
				type: String,
				value: ""
			},

			/**
				* Class property to be applied to this element and its children.
				*
				**/
			class: String,

			/**
				* Description property to be applied to aria-label for assistive tool to read out description for this icon.
				*
				**/
			description: String,

			/**
				* Numeric value without any formatting (e.g. no thousand delimiter, no decimal separator).
				*
				**/
			unformattedValue: {
				type: String,
				value: 0,
				notify: true
			},

			/**
				* Unit-of-Measure value, typically from the datasource field (e.g. "Metric Ton CO2", "square feet").
				**/
			uom: {
				type: String,
				value: null,
				notify: true
			},

			/**
				* Unit-of-Measure datasource which contains the value specified in uom. If the uom value is an
				* area, then this should be a UOM datasource that represents Area.
				**/
			uomList: {
				type: Object,
				value: null
			},

			/**
				* User object which contains the decimal and delimiter.
				**/
			user: {
				type: Object,
				value: null
			},

			/**
			 * Set to true to disable the floating label.
			 */
			noLabelFloat: {
				type: Boolean,
				value: false
			},

			/**
				* Character to use as the decimal separator. This is derived from the user.
				**/
			_decimal: {
				type: String,
				computed: '_computeDecimal(user)'
			},

			/**
				* Character to use as the thousands delimiter. This is derived from the user.
				**/
			_delimiter: {
				type: String,
				computed: '_computeDelimiter(user)'
			},

			/**
				* Show the value of the UOM at its default location which is after the input number.
				* Use 'triplat-uom' component for displaying this information in a preferred location on the page. 
				*
				**/
			displayUom: {
				type: Boolean,
				value: false
			},

			/**
				* Show the abbreviation of the UOM at its default location which is after the input number.
				* Use 'triplat-uom' component for displaying this information in a preferred location on the page. 
				*
				**/
			displayAbbr: {
				type: Boolean,
				value: false
			},

			/**
				* Show the currency symbol of the UOM at its default location which is before the input number.
				* Use 'triplat-uom' component for displaying this information in a preferred location on the page. 
				*
				**/
			displaySymbol: {
				type: Boolean,
				value: false
			},

			/**
				* Disable the field. The field cannot be selected nor can the value be changed.
				*
				**/
			disabled: {
				type: Boolean,
				value: false
			},

			/**
				* Make the field read only. The field can be selected, but the value cannot be changed.
				* To show only the value without the input field, enable this property and don't set a label.
				*
				**/
			readonly: { 
				type: Boolean,
				value: false
			},

			/**
				* String value to be used for the label.
				*/
			label: {
				type: String,
				value: null
			},

			/*
			* Optional minimum allowed for the input. If a value is smaller than minimum, the value will immediately be set to the defined min.
			*/
			min: {
				type: Number
			},

			/*
			* Optional maximum allowed for the input. If a value is greater than maximum, the value will immediately be set to the defined max.
			*/
			max: {
				type: Number
			},

			/**
				* Set to true to auto-validate the input value.
				* If a `uom` is set, the validation format will be based on the UOM. Otherwise, it will validate a regular number.
				**/
			autoValidate: {
				type: Boolean,
				value: false
			},

			/**
				* Returns true if the value is invalid.
				* If `autoValidate` is true, the `invalid` attribute is managed
				* automatically (in the component), which can negate attempts to 
				* manage it manually (in the app).
				*/
			invalid: {
				type: Boolean,
				value: false,
				notify: true
			},

			/**
				* The error message to display when the input is invalid.
				*/
			invalidInputMessage: {
				type: String,
				value: function() {
					var __dictionary__invalidInputMessage = "Invalid input.";
					return __dictionary__invalidInputMessage;
				}
			}
		},

		observers: [
			"_generateValidationPattern(_delimiter, _decimal, uom, uomList, displaySymbol)",
			"_setAllowedPattern(uomList, uom)"
		],

		get paperInputElement() {
			return this.$.triNumberInput;
		},

		attached: function() {
			// if the width is not set (no one would set to to less than 10px), then set it to flex 
			if (this.$.triNumberInput.offsetWidth < 10) {
				this.$.triNumberInput.classList.add("flex");
			}
		},
		
		_setAllowedPattern(uomList, uom) {
			if (uomList && uomList.length > 0 && uom) {
				const uomValue = this._getUomValue(uomList, uom);
				const currencySymbol = this.displaySymbol ? uomValue._Currency_Symbol : "";
				if (this.paperInputElement) {
					this.paperInputElement.allowedPattern = `[${currencySymbol}0-9.,-\\s]`;
					this.paperInputElement.autoValidate = this.autoValidate;
				}
			}
		},

		_setStyle: function(style) {
				if (!assertParametersAreDefined(arguments)) {
					return;
			}

			this.$.triNumberInput.style.cssText = style;
		},

		_resetClassMap: function() {
			for (var myclass in this.$.triNumberInput._classMap) {
				this.$.triNumberInput._classMap[myclass] = false;
			}
		},

		_cleanClassMap: function() {
			var returnClassArray = [];
			for (var myclass in this.$.triNumberInput._classMap) {
				if (!this.$.triNumberInput._classMap[myclass]) {
					returnClassArray.push(myclass);
					delete this.$.triNumberInput._classMap[myclass];
				}
			}
			return returnClassArray;
		},

		_isNewClassInMap: function(newclass) {
			if (typeof this.$.triNumberInput._classMap == 'undefined') {
				this.$.triNumberInput._classMap = {};
				this.$.triNumberInput._classMap[newclass] = true;
				return true;
			} else {
				if (newclass in this.$.triNumberInput._classMap) {
					this.$.triNumberInput._classMap[newclass] = true;
					return false;
				} else {
					this.$.triNumberInput._classMap[newclass] = true;
					return true;
				}
			}
		},

		_setClass: function(myclass){
			if (!assertParametersAreDefined(arguments)) {
				return;
			}

			if (!myclass) {
				return;
			}

			this._resetClassMap();
			var arr = myclass.split(" ");

			// add in new addition class
			for (var i=0; i < arr.length; i++) {
				if (this._isNewClassInMap(arr[i])) {
					this.$.triNumberInput.classList.add(arr[i]);
				}
			}

			// remove unused class
			var deleteClasses = this._cleanClassMap();

			for (var i=0; i < deleteClasses.length; i++) {
				this.$.triNumberInput.classList.remove(deleteClasses[i]);
			}
		},

		_valueChanged: function(e) {
			var input = e.target.value;
			var newValue = parseFloat(this.unformatNumber(input));
			if (input == "" || input === null) {
				this.set("unformattedValue", null);
			} else if (isNaN(newValue)) {
				this.$.triNumberInput.value = this._formatNumber(this.unformattedValue, this._decimal, this._delimiter, this.uom, this.uomList, this.displaySymbol);
			} else if (this.min != null && this.min > newValue) {
				if (this.unformattedValue == this.min.toString()) 
					this.$.triNumberInput.value = this._formatNumber(this.unformattedValue, this._decimal, this._delimiter, this.uom, this.uomList, this.displaySymbol);
				else
					this.set("unformattedValue", this.min.toString());
			} else if (this.max != null && this.max < newValue) {
				if (this.unformattedValue == this.max.toString())
					this.$.triNumberInput.value = this._formatNumber(this.unformattedValue, this._decimal, this._delimiter, this.uom, this.uomList, this.displaySymbol);
				else
					this.set("unformattedValue", this.max.toString());
			} else
				this.set("unformattedValue", newValue);
		},

		_computeDecimal: function() {
				if (!assertParametersAreDefined(arguments)) {
					return;
			}

			if (typeof this.user != 'undefined' && this.user != null) {
				return this.user._Decimal;
			}

			return null;
		},

		_computeDelimiter: function() {
				if (!assertParametersAreDefined(arguments)) {
					return;
			}

			if (typeof this.user != 'undefined' && this.user != null) {
				return this.user._Delimiter;
			}

			return null;
		},

		_readonlyNoDisabledNoLabel: function(disabled,readonly,label) {
				if (!assertParametersAreDefined(arguments)) {
					return;
			}

			return !disabled && readonly && !label;
		}
	});

});