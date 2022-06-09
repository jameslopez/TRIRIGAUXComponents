/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { TriPlatUomBehaviorImpl, TriPlatUomBehavior } from "../triplat-uom/triplat-uom-behavior.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 * Use `TriPlatNumberBehavior` to get support for formatting numbers for display.
 *
 
<div style="background-color:#FFFFCC">
    <div style="padding:20px;">
 		<b>Note:</b> To use this behavior, the component extending this behavior will need to import the Javascript Number Formatter library. See `triplat-number.js` for an example.
 	</div>
</div>

 * 
 * @polymerBehavior TriPlatNumberBehavior
 */
export const TriPlatNumberBehaviorImpl = {

	properties: {
		/**
		  * The character used for the thousands separator/delimiter.
		  **/
		_delimiter: String,

		/**
		  * The character used for the decimal separator.
		  **/
		_decimal: String,

		/**
		  * The symbol used for the currency.
		  **/
		_currencySymbol: String,

		/**
		  * The default display mask to be used when formatting numbers without a UOM and without an explicitly specified display mask.
		  **/
		_defaultDisplayMask: {
			type: String,
			value: "0.####",
			readOnly: true
		},

		_isRtl: {
			type: Boolean,
			value: false,
			readOnly: true
		},

		/**
		  * A regular expression that will be used to validate the user input.
		  * It will be create according to mask set for the input field./
		  **/
		_validationPattern: {
			type: String,
			value: ""
		}
	},

	attached: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if(textDirectionValue==="rtl"){
			this._set_isRtl(true);
		}
	},

	_createMissingParameterErrorMsg: function(method, param) {
		return "ERROR: You invoked " + method + " without specifying a " + param + ". No formatting will be done.";
	},

	/**
	  * Take a number as it is stored internally and format it for display, including 
	  * locale-specific thousands delimiter and decimal character based on the user.
	  * 
	  * @param {string} value The string representation of the unformatted number (e.g. 5999.12).
	  *
	  * @param {object} user The object representing the Current User. The decimal separator and 
	  *                      thousands delimiter will be properties of this object. 
	  *
	  * @param {object} mask (optional) The display mask which specifies the pattern, using the Java convention, e.g. ###,###.##
	  *                      If not specified, then ###,###.#### will be used.
	  *
	  * @return {string} val The string representation of the formatted number (e.g. 5,999.12).
	  *
	  **/
	formatNumberWithoutUom: function(value, user, mask) {
		if (typeof value == 'undefined' || value == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithoutUom", "value"));
			return value;
		}
		if (typeof user == 'undefined' || user == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithoutUom", "user"));
			return value;
		}
		return this._formatNumber(value, user._Decimal, user._Delimiter, null, null, null, mask);
	},

	/**
	  * Take a number as it is stored internally and format it for display, including 
	  * locale specific thousands delimiter and decimal character based on the user, and currency symbol and
	  * display mask based on the TRIRIGA unit-of-measure (UOM).
	  * 
	  * @param {string} value The string representation of the unformatted number (e.g. 5999.12).
	  *
	  * @param {string} uom The unit-of-measure associated with this number (e.g. square-feet). 
	  *
	  * @param {array} uomValues An array of unit-of-measure object for a specific type (e.g. Area, Carbon Emission).
	  *
	  * @param {object} user The object representing the Current User. The decimal separator and 
	  *                      thousands delimiter will be properties of this object. 
	  *
	  * @return {string} val The string representation of the formatted number (e.g. 5,999.12).
	  *
	  **/
	formatNumberWithUom: function(value, uom, uomValues, user) {
		if (typeof value == 'undefined' || value == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithUom", "value"));
			return value;
		}
		if (typeof uom == 'undefined' || uom == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithUom", "uom"));
			return value;
		}
		if (typeof uomValues == 'undefined' || uomValues == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithUom", "uomValues"));
			return value;
		}
		if (typeof user == 'undefined' || user == null) { 
			console.log(this._createMissingParameterErrorMsg("formatNumberWithUom", "user"));
			return value;
		}
		return this._formatNumber(value, user._Decimal, user._Delimiter, uom, uomValues);
	},

	_formatNumber: function(value, decimal, delimiter, uom, uomValues, displaySymbol, mask) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}
		if (typeof value == 'undefined' || value === null)
			return null;

		var val = Number(value);
		if (isNaN(val)) {
			return val;
		}

		var uomValue = this._getUomValue(uomValues, uom);

		var formattedValue = null;

		if (!decimal && !delimiter) {
			console.log(this._createMissingParameterErrorMsg("triplat-number-input", "user"));
			return value;
		} else {
			this._decimal = decimal;
			this._delimiter = delimiter;
		}

		var displayMask = this._generateMask(this._decimal, this._delimiter, uom, uomValues, mask);

		if (uom != null && uomValue != null) {
			if (uomValue._UOM_Type == "Currency") {
				//Following classic form design, the currency is masked with the user local (decimal and delimiter)
				var uomUser = this.user ? this.user._Currency : "";

				if (!this.currencySymbol) { this._computeCurrencySymbol(displaySymbol, uomValue); }

				if (uomUser == "Indian Rupees") {
					formattedValue = (this._formatIndianRupee(val) == "") ? this._formatIndianRupee(0) : this._formatIndianRupee(val);
				} else {
					formattedValue = (format(displayMask, val) == "") ? format(displayMask, 0) : format(displayMask, val);
				}
				if (this._isRtl) {
					if (formattedValue.startsWith(".") || formattedValue.startsWith(",")) {
						//For some reason RTL input will display ".34$" value as "34$." Solve this problem by adding a leading zero.
						formattedValue = "0" + formattedValue;
					}
					formattedValue = formattedValue + this.currencySymbol;
				} else {
					formattedValue = this.currencySymbol + formattedValue;
				}
			} else {
				formattedValue = (format(displayMask, val) == "") ? format(displayMask, 0) : format(displayMask, val);
			}
		} else {
			formattedValue = (format(displayMask, val) == "") ? format(displayMask, 0) : format(displayMask, val);
		}

		this._generateValidationPattern(this._delimiter, this._decimal, uom, uomValues, displaySymbol);
		return formattedValue;
	},

	/**
	  * Convert a formatted number to an unformatted number suitable for TRIRIGA and the database. 
	  * triplat-number-input, formatNumberWithUom, or formatNumberWithoutUom must have been used to format the number.
	  * 
	  * @param {string} val The string representation of the formatted number (e.g. 5,999.12).
	  *
	  * @return {string} val The string representation of the unformatted number (e.g. 5999.12).
	  **/
	unformatNumber: function(val) {
		var delimiter = this._delimiter;
		var decimal = this._decimal;
		if (typeof delimiter == 'undefined' || delimiter == null) {
			return val;
		}

		if (typeof decimal == 'undefined' || decimal == null) {
			return val;
		}

		while (val.indexOf(delimiter) != -1) {
			val = val.replace(delimiter,"");
		}

		val = val.replace(decimal,".");

		val = val.replace(/\s/g,""); //remove all spaces

		val = val.replace(/[^\d.-]/g,""); //remove non-numeric characters except for period and negative sign

		return val;
	},

	_applyLocaleSeparatorsToMask: function(displayMask, uom_decimal, uom_delimiter, user_decimal, user_delimiter) {
		if (typeof uom_decimal == 'undefined' || uom_decimal == null ) {
			uom_decimal = "."; // default to Java format
		}
		if (typeof uom_delimiter == 'undefined' || uom_delimiter == null ) {
			uom_delimiter = ","; // default to Java format
		}

		if (uom_decimal == uom_delimiter) {
			//Safeguard, should not happen (default delimiter "," is used if uom delimiter is not set)
			return displayMask;
		}

		uom_decimal = this._addEscapeChar(uom_decimal);
		uom_delimiter = this._addEscapeChar(uom_delimiter);

		var newMask = displayMask.replace(new RegExp(uom_delimiter, 'g'), "x");
		newMask = newMask.replace(new RegExp(uom_decimal,'g'), user_decimal);
		newMask = newMask.replace(new RegExp("x", 'g'), user_delimiter);

		return newMask;
	},

	_addEscapeChar: function(val) {
		if (val == ".") {
			val = "\\" + val;
		} 
		return val;
	},

	_useDelimiter: function(uom) {
		if (typeof uom == 'undefined' || uom == null || uom._UOM_Delimiter != null) {
			return true;
		}
		return false;
	},

	_formatIndianRupee: function(val) {
		if (val < 100000) {
			return format("##,##,###.00", val);
		}
		//Need to handle value that is more then 5 digits since format() does not handle it well. For example, format("##,##,###.00", 100000.00) return "100,000.00" and not "1,00,000.00"
		var number = format("#,##0.##", val);
		var group = number.split(",");
		var p1 = "";
		for (i=0;i<group.length-1;i++) {
			p1 +=group[i];
		}
		var p2 = group[group.length-1];
		return format("#0,#0.##", p1) + "," + format("#000.00", p2);
	},

	_computeCurrencySymbol: function(displaySymbol, uomValue) {
		if (displaySymbol && uomValue) {
			this.currencySymbol = uomValue._Currency_Symbol || "";
		} else {
			this.currencySymbol = "";
		}
	},

	_generateMask: function(decimal, delimiter, uom, uomValues, mask) {
		var displayMask = "";
		var uomValue = this._getUomValue(uomValues, uom);

		if (uom != null && uomValue != null) {
			if (uomValue._UOM_Type == "Currency") {
				//Following classic form design, the currency is masked with the user local (decimal and delimiter)
				var uomUser = this.user ? this.user._Currency : "";
				var uomValueUser = this._getUomValue(uomValues, uomUser);

				if (uomValueUser) {
					displayMask = this._applyLocaleSeparatorsToMask(uomValueUser._Display_Mask, uomValueUser._UOM_Decimal, uomValueUser._UOM_Delimiter, decimal, delimiter);
				} else {
					displayMask = this._applyLocaleSeparatorsToMask(uomValue._Display_Mask, uomValue._UOM_Decimal, uomValue._UOM_Delimiter, decimal, delimiter);
				}
			} else {
				displayMask = uomValue._Display_Mask;
				displayMask = this._applyLocaleSeparatorsToMask(displayMask, uomValue._UOM_Decimal, uomValue._UOM_Delimiter, decimal, delimiter);
			}
		} else {
			displayMask = this._defaultDisplayMask;
			if (mask != null) {
				displayMask = mask;
			}
			displayMask = this._applyLocaleSeparatorsToMask(displayMask, null, null, decimal, delimiter);
		}

		return displayMask;
	},

	_generateValidationPattern: function(delimiter, decimal, uom, uomValues, displaySymbol) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		var uomValue = this._getUomValue(uomValues, uom);
		this._computeCurrencySymbol(displaySymbol, uomValue);

		var uomFactor = (displaySymbol && this.currencySymbol && this.currencySymbol != "") ? "(.{" + this.currencySymbol.length + "})?" : "";
		var negativeFactor = "([-])?";
		var mask = this._generateMask(decimal, delimiter, uom, uomValues);
		var uomUser = this.user ? this.user._Currency : "";
		var pattern = "";

		if (uomUser == "Indian Rupees") {
			var indianNumFactor = "([0-9]{1,2})?([,])?([0-9]{1,2})?([,])?([0-9]{1,3})?";
			var indianNumThousandFactor = "([0-9]{1,2})?([,])?([0-9]{1,2})?([,])?([0-9]{1,3})";

			pattern = negativeFactor + "(" + indianNumThousandFactor + "([,])?" + ")*" +
						indianNumFactor + "([.])?" + 
						"([0-9]{1,2})?";
		} else {
			var splitFormat = mask.split(decimal);
			var decimalLength = splitFormat[splitFormat.length - 1].length;

			var numFactor = "([0-9]{1,3})?";
			var numThousandFactor = "([0-9]{1,3})";
			var delimiterFactor = (delimiter && delimiter != "") ? 
									((delimiter == " ") ? "(\\s)" : "([" + delimiter + "])?") : 
									"";
			var decimalFactor = (decimal && decimal != "") ? "([" + decimal + "])?" : "";
			var decimalNumFactor = (decimalLength && decimalLength > 0) ? "([0-9]{1," + decimalLength + "})?" : "";

			pattern = negativeFactor + "(" + numThousandFactor + delimiterFactor + ")*" +
						numFactor + decimalFactor +
						decimalNumFactor;
		}

		var validationPattern = (this._isRtl) ? pattern + uomFactor : uomFactor + pattern;

		this.set("_validationPattern", validationPattern);
	}

};

export const TriPlatNumberBehavior = [
	TriPlatNumberBehaviorImpl,
	TriPlatUomBehaviorImpl
];