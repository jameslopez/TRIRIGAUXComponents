import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../triplat-number-input/triplat-number-input.js';
import { TriPlatNumberBehavior } from '../../triplat-number-input/triplat-number-behavior.js';
import { mixinBehaviors } from '../../@polymer/polymer/lib/legacy/class.js';
import { importJs } from "../../tricore-util/tricore-util.js";
import '../../triplat-theme/triplat-theme.js';

const importJsPromise = importJs(
	["../number-formatter/lib/format.js"],
	"triplat-number-input/triplat-number-input.js"
);

importJsPromise.then(() => {

	window.format = numberFormatter;

	class TriDemo extends mixinBehaviors([TriPlatNumberBehavior], PolymerElement) {
		static get template() {
			return html `
				<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning"></style>
				<h2>Disabled and Readonly flags</h2>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=<span>
						<span>{{value1}}</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											user="{{currentUser}}"
											unformatted-value="{{value1}}" >
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=<span>
						<span>{{value1}}</span>
						<span>&nbsp;readonly</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											user="{{currentUser}}"
											unformatted-value="{{value1}}" 
											readonly>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=<span>
						<span>{{value1}}</span>
						<span>&nbsp;readonly with no label</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" 
											user="{{currentUser}}"
											unformatted-value="{{value1}}" 
											readonly>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=<span>
						<span>{{value6}}</span>
						<span>&nbsp;disabled</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{_setValue6()}}" 
											user="{{currentUser}}"
											disabled>
						</triplat-number-input>
					</div>
				</div>
				<h2>Formatting when there is no UOM</h2>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value2}}</span>
						<span>&nbsp;and (US) decimal=<span>
						<span>{{currentUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{currentUser._Delimiter}}</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value2}}" 
											user="{{currentUser}}">
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value2}}</span>
						<span>&nbsp;and (Danish) decimal=<span>
						<span>{{danishUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{danishUser._Delimiter}}</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value2}}" 
											user="{{danishUser}}">
						</triplat-number-input>
					</div>
				</div>
				<h2>Formatting when there is no UOM using formatNumberWithoutUom with a displaymask</h2>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value2}}</span>
						<span>&nbsp;and (US) decimal=<span>
						<span>{{currentUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{currentUser._Delimiter}}</span>
						<span>&nbsp;and mask=<span>
						<span>{{myDisplayMask}}</span>
					</div>
					<div class="layout horizontal flex">
						<paper-input class="flex"
							label="Number"
							value="{{formatNumberWithoutUom(value2, currentUser, myDisplayMask)}}">
						</paper-input>
					</div>
				</div>
				
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value2}}</span>
						<span>&nbsp;and (Danish) decimal=<span>
						<span>{{danishUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{danishUser._Delimiter}}</span>
						<span>&nbsp;and mask=<span>
						<span>{{myDisplayMask}}</span>
					</div>
					<div class="layout horizontal flex">
						<paper-input class="flex" label="Number" value="{{formatNumberWithoutUom(value2, danishUser, myDisplayMask)}}" ></paper-input>
					</div>
				</div>
				<h2>Formatting with a UOM (UOM is Area)</h2>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value3}}</span>
						<span>&nbsp;and uom=square-feet<span>
						<span>&nbsp;and user locale=<span>
						<span>{{currentUser._Locale}}<span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value3}}" 
											user="{{currentUser}}"
											uom="square-feet"
											uom-list="{{uomAreaList}}"
											display-uom>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value4}}</span>
						<span>&nbsp;and uom=square-feet<span>
						<span>&nbsp;and user locale=<span>
						<span>{{currentUser._Locale}}<span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="fixedwidthinput" label="Number" 
											unformatted-value="{{value4}}" 
											user="{{currentUser}}"
											uom="square-feet"
											uom-list="{{uomAreaList}}"
											display-abbr>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value3}}</span>
						<span>&nbsp;and uom=square-meters<span>
						<span>&nbsp;and (Danish) decimal=<span>
						<span>{{danishUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{danishUser._Delimiter}}</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value3}}" 
											uom="square-meters"
											uom-list="{{uomAreaListWithTranslation}}"
											user="{{danishUser}}"
											display-uom>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>unformatted-value=</span>
						<span>{{value5}}</span>
						<span>&nbsp;and uom=square-meters<span>
						<span>&nbsp;and (Danish) decimal=<span>
						<span>{{danishUser._Decimal}}</span>
						<span>&nbsp;and delimiter=<span>
						<span>{{danishUser._Delimiter}}</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="fixedwidthinput" label="Number" 
											unformatted-value="{{value5}}" 
											uom="square-meters"
											uom-list="{{uomAreaListWithTranslation}}"
											user="{{danishUser}}"
											display-abbr>
						</triplat-number-input>
					</div>
				</div>
				<h2>Formatting with a UOM (UOM is Currency)</h2>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>Note: Mask is displayed base on the user's local.</span>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>US user, unformatted-value=<span>{{value5}}</span> and display-uom and display-symbol and uom=US Dollars and currency symbol=$ and display mask=###,###.00</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value5}}" 
											uom="US Dollars"
											uom-list="{{uomCurrencyList}}"
											user="{{currentUser}}"
											display-uom
											display-symbol>
						</triplat-number-input>
					</div>
				</div>
				<div class="layout horizontal center-justified" >
					<div class="layout horizontal flex">
						<span>US user, unformatted-value=<span>{{value5}}</span> and display-abbr and uom=Hungarian Forint and uom abbreviation=HUF and display mask=### ###,00</span>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											unformatted-value="{{value5}}" 
											uom="Hungarian Forint"
											uom-list="{{uomCurrencyList}}"
											user="{{currentUser}}"
											display-abbr>
						</triplat-number-input>
					</div>
				</div>
				<h2>Auto-validate input</h2>
				<div class="layout horizontal center-justified">
					<div class="layout vertical flex">
						<span class="note">
							The validation will happen according to the uom mask format. For this field the uom is US Dollars and display mask is ###,###.00.
							It's important to note that the validation will accept inputs like "1,1,1", but it will not accept inputs with more than one decimal symbol like "1.1.1".
						</span>

						<div>
							<span><b>Invalid Input Message:</b> Use it to change the error message when validating the field</span>
							<paper-input class="flex" label="Invalid Input Message" value="{{_invalidInputMessage}}"></paper-input>
						</div>
					</div>
					<div class="layout horizontal flex">
						<triplat-number-input class="flex" label="Number" 
											uom="US Dollars"
											uom-list="[[uomCurrencyList]]"
											user="[[currentUser]]"
											display-uom
											display-symbol
											auto-validate
											invalid-input-message="[[_invalidInputMessage]]">
						</triplat-number-input>
					</div>
				</div>
			`;
		}

		static get properties() {
			return {
				value1: {
					type: Number,
					value: 123456
				},
				value2: {
					type: Number,
					value: 123456.99
				},
				value3: {
					type: Number,
					value: 7895.911
				},
				value4: {
					type: Number,
					value: 7895
				},
				value5: {
					type: Number,
					value: 1237895
				},

				value6: {
					type: Number,
					value: 123.45
				},

				myDisplayMask: {
					type: String,
					value: "###,###.####"
				},

				currentUser : {
					type: Object,
					value: function() {
						return {
							firstName: "Stephen",
							lastName: "Curry",
							_Admin: true,
							_Currency: "US Dollars",
							_DateFormat: "MM/dd/yyyy",
							_DateTimeFormat: "MM/dd/yyyy HH:mm:ss",
							_Decimal: ".",
							_Delimiter: ",",
							_Language: "US English",
							_Locale: "en-US",
							_TimeZoneId: "US/Pacific",
							_id: 127575299
						}
					}
				},

				danishUser : {
					type: Object,
					value: {
						_Currency: "Danish Krone",
						_Decimal: ",",
						_Delimiter: ".",
						_Locale: "da-DK"
					}
				},

				uomCurrencyList : {
					type: Array,
					value: [{_Display_Mask: "###,###.00", _Rounding_Rule: null, _UOM_Abbreviation: "USD", _UOM_Decimal: ".", _UOM_Delimiter: ",", _UOM_Type: "Currency", _UOM_Value: "US Dollars", _UOM_Display_Value: "US Dollars", _Currency_Symbol: "$", _id: "1457125"},
					{_Display_Mask: "### ###,00", _Rounding_Rule: null, _UOM_Abbreviation: "HUF", _UOM_Decimal: ",", _UOM_Delimiter: ",", _UOM_Type: "Currency", _UOM_Value: "Hungarian Forint", _UOM_Display_Value: "Hungarian Forint", _Currency_Symbol: "", _id: "1457126"},
					{_Display_Mask: "##,##,###.00", _Rounding_Rule: null, _UOM_Abbreviation: "INR", _UOM_Decimal: ".", _UOM_Delimiter: ",", _UOM_Type: "Currency", _UOM_Value: "Indian Rupees", _UOM_Display_Value: "Indian Rupees", _Currency_Symbol: "Rs", _id: "1649130"},
					{_Display_Mask: "###,###.00", _Rounding_Rule: null, _UOM_Abbreviation: "DKK", _UOM_Decimal: ",", _UOM_Delimiter: ".", _UOM_Type: "Currency", _UOM_Value: "Danish Krone", _UOM_Display_Value: "Danish Krone", _Currency_Symbol: "", _id: "1649131"}]
				},

				uomAreaList : {
					type: Array,
					value: [{_Display_Mask: "#.####", _Rounding_Rule: null, _UOM_Type: "Area", _UOM_Value: "square-feet", _UOM_Display_Value: "square-feet", _UOM_Abbreviation: "ft2", _id: "1457126"},
							{_Display_Mask: "#.####", _Rounding_Rule: null, _UOM_Type: "Area", _UOM_Value: "square-meters", _UOM_Display_Value: "square-meters", _UOM_Abbreviation: "m2", _id: "1649131"}]
				},
				uomAreaListWithTranslation : {
					type: Array,
					value: [{_Display_Mask: "#.####", _Rounding_Rule: null, _UOM_Type: "Area", _UOM_Value: "square-feet", _UOM_Display_Value: "square-feet-DANISH", _UOM_Abbreviation: "ft2", _id: "1457126"},
							{_Display_Mask: "#.####", _Rounding_Rule: null, _UOM_Type: "Area", _UOM_Value: "square-meters", _UOM_Display_Value: "square-meters-DANISH", _UOM_Abbreviation: "m2", _id: "1649131"}]
				},

				_invalidInputMessage: {
					type: String,
					value: "Invalid input."
				}
			}
		}

		_setValue6 (){
			this.set("value6", 123.45);
			return this.value6;
		}

		_getBrowserLocale (){
			return navigator.language;
		}
	}

	window.customElements.define('tri-demo', TriDemo);

});