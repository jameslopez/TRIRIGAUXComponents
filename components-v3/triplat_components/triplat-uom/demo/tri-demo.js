import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';

import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import '../../triplat-number-input/triplat-number-input.js';
import '../../triplat-uom/triplat-uom.js';
import { TriPlatNumberBehavior } from '../../triplat-number-input/triplat-number-behavior.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import "../../triplat-theme/triplat-theme.js";
import { mixinBehaviors } from '../../@polymer/polymer/lib/legacy/class.js';
import '../../tricore-demo-url/tricore-demo-url.js';
import '../../tricore-url/tricore-url.js';
import { importJs } from "../../tricore-util/tricore-util.js";

const importJsPromise = importJs(
	["../web-animations-js/web-animations-next-lite.min.js"],
	"triplat-uom/triplat-uom.js"
);

class TriDemo extends mixinBehaviors([TriPlatNumberBehavior], PolymerElement) {
	static get template() {
		return html `
		<style include="tristyles-theme">
			div.line span.info {
				align-self: flex-end;
				margin: 0px 30px;
				font-weight: bold;
			}
			span {
				font-size:12px;
			}

			.line {
				padding: 0px;
				margin: 0px;
			}
	
			#example {
				margin-left: 30px;
				margin-top: 10px;
				margin-bottom: 10px;
				font-size:large;
				font-weight: bold;
			}

			#codeTop {
				margin-left: 30px;
				margin-top: 10px;
				margin-bottom: 0px;
				font-size:medium;
				font-weight: bold;
			}
	
			#codeBottom {
				margin-left: 30px;
				margin-top: 0px;
				margin-bottom: 10px;
				font-size:medium;
				font-weight: bold;
			}

			#withComponent {
				margin-top: 1.8em;
				margin-left: 5px;
				font-size: large;	
				font-weight: lighter;
			}

		</style>
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning"></style>

		<tricore-demo-url></tricore-demo-url>
		<tricore-url id="tricoreUrl" raw-url="/p/uom/uomList" bind-url="{{_uomListUrl}}"></tricore-url>
		<iron-ajax url="{{_uomListUrl}}" last-response="{{_uomList}}" auto></iron-ajax>
		<section>
			<h2>Displaying UOM value (by default)</h2>
			<div class="layout vertical"> 
				<div class="layout horizontal">
					<span>User locale=<span>
					<span>{{currentUser._Locale}}<span>
				</div>
				<div class="layout horizontal"> 
					<div id="example">
						<span>{{numberValue}}</span>
						<triplat-uom
							uom="square-feet"
							uom-list="{{uomAreaList}}">
						</triplat-uom>
					</div>
				</div>
			</div>
			<div class="layout vertical">
				<span>Example code snippet:</span>
				<code id="codeTop">{{_getCodeValue()}}</code>
				<code id="codeBottom">{{_getCodeDefault()}}</code>
			</div>
			<div class="layout vertical" >
				<div class="layout horizontal">
					<span>User locale=<span>
					<span>{{danishUser._Locale}}<span>
				</div>
				<div id="example" class="layout vertical">
					<span>{{numberValue}}</span>
					<triplat-uom
						uom="square-meters"
						uom-list="{{uomAreaListWithTranslation}}">
					</triplat-uom>
				</div>
			</div>
			<div class="layout vertical">
				<span>Example code snippet:</span>
				<code id="codeTop">{{_getCodeValue()}}</code>
				<code id="codeBottom">{{_getCodeDefaultTranslation()}}</code>
			</div>
		</section>
		<hr>
		<section>
			<h2>Displaying UOM abbreviation</h2>
			<div class="layout vertical" >
				<div class="layout horizontal">
					<span>User locale=<span>
					<span>{{currentUser._Locale}}<span>
				</div>
				<div class="layout horizontal">
					<div id="example">
					<div>
					<span>{{numberValue}}</span>
					<triplat-uom
						display="abbr"
						uom="square-feet"
						uom-list="{{uomAreaList}}">
					</triplat-uom>
					</div>
					</div>
				</div>
			</div>
			<div class="layout vertical">
				<span>Example code snippet:</span>
				<code id="codeTop">{{_getCodeValue()}}</code>
				<code id="codeBottom">{{_getCodeAbbr()}}</code>
			</div>
		</section>
		<hr>
		<section>
			<h2>Displaying UOM with triplat-number-input component</h2>
			<div class="layout horizontal">
				<div id="example">
				<div class="layout horizontal">
					<div>
					<triplat-number-input label="Number" 
					unformatted-value="{{numberValue}}"
					user="[[currentUser]]">
					</triplat-number-input>
					</div>
					<div id="withComponent">
					<triplat-uom
					display="uom"
					uom="square-feet"
					uom-list="{{uomAreaList}}">
					</triplat-uom>
					</div>
					</div>
				</div>
			</div>
			<div class="layout vertical">
				<span>Example code snippet:</span>
				<code id="codeTop">{{_getCodeNumberInput()}}</code>
				<code id="codeBottom">{{_getCodeUom()}}</code>
			</div>
		</section>
		<section>
			<h2>Displaying UOM as drop down list with triplat-number-input component</h2>
			<div class="layout horizontal">
				<div id="example">
				<div class="layout horizontal">
						<triplat-number-input label="Number" 
						unformatted-value="{{numberValue}}"
						user="[[currentUser]]"
						uom="{{_uomValue}}">
						</triplat-number-input>&nbsp
						<triplat-uom label="uom"
							uom-list="{{_uomList}}"
							uom-value="{{_uomValue}}">
						</triplat-uom>
				</div>
				</div>
			</div>
			<div class="layout vertical">
				<span>Example code snippet:</span>
				<code id="codeTop">{{_getCodeNumberWithUom()}}</code>
			</div>
		</section>
		`;
	}
	
	static get behaviors() {
		return [
			TriPlatNumberBehavior
		]
	}

	static get properties() {
		return {
			numberValue: {
				type: String,
				value: "123"
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

			_uomListUrl: {
				type: String
			},

			_uomList: {
				type: Array,
			},

			_uomValue: {
				type: String,
				value: "lot"
			}
		}
	}

	_getCodeValue() {
		return '<span>{{numberValue}}</span>';
	}

	_getCodeDefault() {
		return '<triplat-uom uom="square-feet" uom-list="{{uomAreaList}}"></triplat-uom>';
	}

	_getCodeDefaultTranslation() {
		return '<triplat-uom uom="square-meters" uom-list="{{uomAreaListWithTranslation}}"></triplat-uom>';
	}
	
	_getCodeAbbr() {
		return '<triplat-uom display="abbr" uom="square-feet" uom-list="{{uomAreaList}}"></triplat-uom>';
	}

	_getCodeAbbrTranslation() {
		return '<triplat-uom display="abbr" uom="square-meters" uom-list="{{uomAreaListWithTranslation}}"></triplat-uom>';
	}
	_getCodeNumberInput() {
		return '<triplat-number-input label="Number" unformatted-value="{{numberValue}}"></triplat-number-input>';
	}
	_getCodeUom() {
		return '<triplat-uom display="uom" uom="square-feet" uom-list="{{uomAreaList}}"></triplat-uom>';
	}
	_getCodeNumberWithUom(){
		return `
			<triplat-number-input label="Number" 
				unformatted-value="{{numberValue}}"
				user="[[currentUser]]"
				uom="{{_uomValue}}">
			</triplat-number-input>
			\n
			<triplat-uom label="uom"
				uom-list="{{_uomList}}"
				uom-value="{{_uomValue}}">
			</triplat-uom>
		`;
	}
}

window.customElements.define('tri-demo', TriDemo);