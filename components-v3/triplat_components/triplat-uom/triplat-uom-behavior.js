/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 * Use `TriPlatUomBehavior` to get support for retrieving information of a UOM.
 *
 * @polymerBehavior TriPlatUomBehavior
 */
export const TriPlatUomBehaviorImpl = {

	/**
	  * Retrieves the information of a UOM based from the type of information to display.
	  * 
	  * @param {string} uom The unit-of-measure associated with this number (e.g. square-feet). 
	  *
	  * @param {array} uomList An array of unit-of-measure object for a specific type (e.g. Area, Carbon Emission).
	  *
	  * @param {string} display Type of information to retrieve for display: uom | symbol | abbr.
	  *							Use 'uom' to display the value of the UOM in the language of the current user (e.g. "square-feet").  
	  *							Use 'symbol' to display the currency symbol of the UOM if it is of type Currency.
	  * 						Use 'abbr' to display the abbreviation of the UOM (e.g. ft2).
	  *
	  * @return {string} The information to display from the UOM.
	  **/		
	getUomInfo: function(uom, uomList, display) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}
		if (uom && uomList) {
			if (display == "uom") {
				return this._getUomValue(uomList, uom)._UOM_Display_Value;
			} else if (display == "abbr") {
				return this._getUomValue(uomList, uom)._UOM_Abbreviation;
			} else if (display == "symbol") {
				var uomVal =this._getUomValue(uomList, uom);
				if (uomVal._Currency_Symbol) {
					return uomVal._Currency_Symbol;
				} else {
					return "";
				}
			}
		} else {
			return "";
		}
	},

	_getUomValue: function(uomValues, uom) {
		if (typeof uomValues == 'undefined' || typeof uom == 'undefined' || !uomValues || !uom ) {
			return null;
		}

		for (var i=0; i < uomValues.length; i++) {
			if (uomValues[i]._UOM_Value == uom) {
				return uomValues[i];
			}
		}
		console.log("ERROR: expected to find " + uom + " on the UOM datasource but did not find it.");
		return null;

	}

};

export const TriPlatUomBehavior = [
	TriPlatUomBehaviorImpl
];