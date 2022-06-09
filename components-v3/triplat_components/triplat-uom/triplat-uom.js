/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "../@polymer/paper-listbox/paper-listbox.js";
import "../@polymer/paper-item/paper-item.js";
import { TriPlatAccessibilityBehavior } from "../triplat-accessibility-behavior/triplat-accessibility-behavior.js";
import { TriPlatUomBehaviorImpl, TriPlatUomBehavior } from "./triplat-uom-behavior.js";
import { importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs(
    ["../web-animations-js/web-animations-next-lite.min.js"],
	"triplat-uom/triplat-uom.js"
);

importJsPromise.then(() => {
/*
The triplat-uom is a custom element for displaying unit-of-measure (UOM) information such as symbol, value, and abbreviation.

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
	<b>Note:</b> The triplat-uom component does not support currency UOM at this time.
  </div>
</div>

	<triplat-uom uom="{{uom}}" uom-list="{{uom-list}}" display="symbol|uom|abbr"/>

### Displaying UOM as a drop down list   

  The uom-value property can be used to display UOM values as drop down list against a number with UOM field in the datasource. See triplat-number-input for more detail.
  
<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
	<b>Note:</b> Only use uom-value and uom-list to implement drop down list. The display property will be ignored and will always display in uom.
  </div>
</div>
   
	<triplat-uom label="Unit" uom-value="{{datasourse.numberFieldWithUom.uom}}" uom-list="{{uom-list}}"/>
	

### Styling

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
	<b>Deprecated:</b> Custom property `--triplat-uom-style` is deprecated, instead use `--triplat-uom-info`.
  </div>
</div>

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-uom-info` | Style for the UOM information to display | `{}`
`--triplat-uom-dropdown` | Style for the UOM dropdown | `{}`
`--triplat-uom-dropdown-content` | Style for the UOM dropdown content | `{}`
`--triplat-uom-dropdown-icon-fill-color` | Color for the dropdown icon | `var(--tri-secondary-color)`


@demo demo/index.html
*/
	Polymer({
	    _template: html`
		<style include="tristyles-theme">


			#triUom {
				@apply --triplat-uom-style;
				@apply --triplat-uom-info;
			}

			.triplat-uom-dropdown {
				@apply --triplat-uom-dropdown;
			}
			
			.dropdown-content {
				@apply --triplat-uom-dropdown-content;
			}

			paper-dropdown-menu {
				--iron-icon-fill-color: var(--triplat-uom-dropdown-icon-fill-color, var(--tri-secondary-color));
			}

			paper-item {
				padding: 0px 16px;
			}

		
		</style>

		<template is="dom-if" if="[[_showString(uom)]]">
			<span id="triUom">{{getUomInfo(uom, uomList, display)}}</span>
		</template>
		<template is="dom-if" if="[[!_showString(uom)]]" notifydomchange="">
			<paper-dropdown-menu id="dropdownMenu" class="triplat-uom-dropdown" label="[[label]]"
				on-iron-overlay-canceled="_handleOverlayCancel" opened="{{_menuOpened}}"
				aria-label\$="[[label]]" tabindex="0">
				<paper-listbox class="dropdown-content" selected="{{uomValue}}" attr-for-selected="name" slot="dropdown-content">
					<template is="dom-repeat" items="{{uomList}}">
						<paper-item name="{{item._UOM_Value}}">{{item._UOM_Display_Value}}</paper-item>
					</template>
				</paper-listbox>
			</paper-dropdown-menu>
		</template>
	`,

	    is: "triplat-uom",

	    behaviors: [
			TriPlatAccessibilityBehavior,
			TriPlatUomBehavior
		],

	    properties: {
			/**
			  * Optional. If omitted, displays the value of the UOM.  If exists, the value can be any of the following: uom, symbol, abbr.
			  *	Use 'uom' to display the value of the UOM in the language of the current user (e.g. "square-feet").  
			  *	Use 'symbol' to display the currency symbol of the UOM if it is of type Currency.
			  * Use 'abbr' to display the abbreviation of the UOM (e.g. ft2).
			  *
			  **/
			display: {
				type: String,
				value: "uom"
			},

			/**
			 * String value to be used for the drop down list label.
			 **/
			label: {
				type: String,
				value: null
			},

			/**
			  * Unit-of-Measure value, typically from the datasource field (e.g. "Metric Ton CO2", "square-feet").
			  **/
			uom: {
				type: String,
				notify: true,
				value: null
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
			  *  Show all the Unit-of-Measure as an editable drop down list. 
			  **/
			uomValue:{
				type: String,
				value: null,
				notify: true
			},

			_menuOpened: {
				type: Boolean,
				observer: "_setAriaExpanded"
			}
		},

	    listeners: {
			"dom-change": "_setAriaExpanded"
		},

	    _showString: function(uom) {
			return uom ? true : false;
		},

	    attached: function() {
			this.setAttribute("role" , "application");
		},

	    _handleOverlayCancel: function(e) {
			e.stopPropagation();
		},

	    _setAriaExpanded: function() {
			if (this.$$("#dropdownMenu")) {
				this.setAriaProperty(this.$$("#dropdownMenu"), this._menuOpened, "expanded")
			}
		}
	});
});