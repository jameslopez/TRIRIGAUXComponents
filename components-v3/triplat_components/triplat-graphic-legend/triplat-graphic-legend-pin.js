/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../triplat-icon/triplat-icon.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
A custom element to define a pin row in a graphic legend component. A pin row is composed of a check box, a pin icon and a label. It controls the visibility of one pin type.

This element should be used as an inner element of **triplat-graphic-legend**. Zero, one or more **triplat-graphic-legend-pin** elements can be defined inside a **triplat-graphic-legend**.

This component delegates the responsibility for hiding or showing the pins on a graphic to a **triplat-graphic-pin** plugin. The **checked** and **enabled** properties connect these two elements. 

Example:

	<triplat-graphic-legend spaces="[[spaces]]" 
		legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-pin label="Person" icon="ibm:pin-person" 
			checked="{{personsPinEnabled}}">
		</triplat-graphic-legend-pin>

		<triplat-graphic-legend-pin label="Asset" icon="ibm:pin-asset" 
			checked="{{assetsPinEnabled}}">
		</triplat-graphic-legend-pin>
		...
	</triplat-graphic-legend>

	<triplat-graphic record-id="[[floorId]]">
		...   
		<triplat-graphic-pin pins="[[selectedPersons]]" icon="ibm:pin-person" 
			pin-size="32" badge-size="20" show-label-onhover
			enabled="{{personsPinEnabled}}" class-number="1">
		</triplat-graphic-pin>

		<triplat-graphic-pin pins="[[selectedPins]]" icon="ibm:pin-asset" 
			pin-size="32" badge-size="20" show-label-onhover
			enabled="{{assetsPinEnabled}}" class-number="2">
		</triplat-graphic-pin>
		...
	</triplat-graphic> 

### Styling

Custom property                                       | Description                                                        | Default
------------------------------------------------------|--------------------------------------------------------------------|-------------------
`--triplat-graphic-legend-pin-fill-color`             | The fill color of the pin icon                                     | --ibm-gray-60
`--triplat-graphic-legend-pin-size`                   | The size of the pin icon                                           | 32px
`--triplat-graphic-legend-secondary-border-color`     | The secondary border color                                         | --ibm-gray-20
`--triplat-graphic-legend-border-width`               | The border width                                                   | 1px
`--triplat-graphic-legend-border-style`               | The border style                                                   | solid
`--triplat-graphic-legend-row`                        | Mixin applied to the legend pin row                                | {}
`--triplat-graphic-legend-criterion-text`             | Mixin applied to the pin text                                      | {}
`--triplat-graphic-legend-checkbox-size`              | The size of the check box                                          | 24px
`--triplat-graphic-legend-checkbox-color`             | The color of the check box                                         | --tri-primary-color
`--triplat-graphic-legend-checkbox-margin`            | The margin around the check box                                    | 10px 
`--triplat-graphic-legend-checkbox`                   | Mixin applied to the check box                                     | {}
`--triplat-graphic-legend-vertical-divider-line`      | Mixin applied to the divider line between the check box and its label | {}
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				--legend-secondary-border-color: var(--triplat-graphic-legend-secondary-border-color, var(--ibm-gray-20));
				--legend-border-width: var(--triplat-graphic-legend-border-width, 1px);
				--legend-border-style: var(--triplat-graphic-legend-border-style, solid);
				--legend-pin-size: var(--triplat-graphic-legend-pin-size, 32px);
				--legend-checkbox-size: var(--triplat-graphic-legend-checkbox-size, 24px);
				--legend-checkbox-color: var(--triplat-graphic-legend-checkbox-color, var(--tri-primary-color));
				--legend-checkbox-margin: var(--triplat-graphic-legend-checkbox-margin, 10px);             
			}

			.legendPinRow {
				height: 54px;
				overflow: hidden;
				@apply --triplat-graphic-legend-row;
			}

			.legendPinCheckbox {
				--paper-checkbox-size: var(--legend-checkbox-size);
				--paper-checkbox-margin: var(--legend-checkbox-margin);
				--paper-checkbox-label-spacing: 0px;
				--paper-checkbox-checked-color: var(--legend-checkbox-color);
				--paper-checkbox-unchecked-color: var(--legend-checkbox-color);
				padding-top: 5px;
				padding-bottom: 5px;
				@apply --triplat-graphic-legend-checkbox;
			}

			.legendPin {
				height: var(--legend-checkbox-size);
				line-height: var(--legend-checkbox-size);
				@apply --layout-horizontal;
			}

			:host([dir="ltr"]) .legendPinDivider {
				border-left-width: var(--legend-border-width);
				border-left-style: var(--legend-border-style);    
				border-left-color: var(--legend-secondary-border-color);
				padding-left: 7px;
				height: var(--legend-checkbox-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			:host([dir="rtl"]) .legendPinDivider {
				border-right-width: var(--legend-border-width);
				border-right-style: var(--legend-border-style); 
				border-right-color: var(--legend-secondary-border-color);
				padding-right: 7px;
				height: var(--legend-checkbox-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			.legendPinText {
				margin-left: 10px;
				vertical-align: middle;
				@apply --layout-flex;
				@apply --triplat-graphic-legend-criterion-text;
			}

			.legendPinIcon {
				--triplat-icon-iron-icon: {
					width: var(--legend-pin-size);
					height: var(--legend-pin-size);
					top: -4px;
				};
				--triplat-icon-fill-color: var(--triplat-graphic-legend-pin-fill-color, var(--ibm-gray-60));
				width: var(--legend-pin-size);
				height: var(--legend-pin-size);
			}
		
		</style>

		<div class="legendPinRow">
			<paper-checkbox class="legendPinCheckbox" checked="{{checked}}">
				<div class="legendPin">
					<div class="legendPinDivider"></div>
					<triplat-icon class="legendPinIcon" icon="[[icon]]"></triplat-icon>
					<span class="legendPinText">[[label]]</span>
				</div>
			</paper-checkbox>
		</div>
	`,

    is: "triplat-graphic-legend-pin",

    properties: {
		/**
		 * The name of the icon to use for the pin row. 
		 * The name should have the format: "iconset_name:icon_name". The iconset_name: can be omitted for the IBM icon set.
		 */
		icon: {
			type: String,
			value: "ibm:pin-multiples"
		},

		/**
		 * A label for the pin row.
		 */
		label: {
			type: String,
		},

		/**
		 * Gets or sets the state of the pin row, where true is checked and false is unchecked.
		 */
		checked: {
			type: Boolean,
			value: false,
			notify: true,
			observer: "_legendPinChange"
		}
	},

    _legendPinChange: function() {
		this.fire("legend-pin-change", {checked: this.checked});
	},

    behaviors: [TriDirBehavior]
});