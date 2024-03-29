/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-collapse/iron-collapse.js";
import "../@polymer/paper-radio-button/paper-radio-button.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
A custom element to define a **show by** row in a graphic legend component. A **show by** row contains a list of one or more criteria that the user can select.

When a **show by** row is selected, it controls the spaces that are highlighted in a graphic. It will highlight only the spaces that satisfy the selected criteria.

The criteria for a **show by** are dynamically defined based on the content of a particular space attribute. Possible space attributes that can be used are the "Occupancy Status", "Charge To Organization", "Spaces Class", among others.

Each row has a **show all** check box that allows the user to check or uncheck all criteria at one time.

This element should be used as an inner element of **triplat-graphic-legend**. One or more **tripat-graphic-legend-show-by** elements can be defined inside **triplat-graphic-legend**. Only one **show by** row can be selected.

Example

	<triplat-graphic-legend spaces="[[spaces]]"
		available-spaces="[[availableSpaces]]"
		legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-show-by attribute="OccupancyStatus" 
			color-by="OccupancyColor" label="Occupancy Status">
		</triplat-graphic-legend-show-by>

		<triplat-graphic-legend-show-by attribute="OrgName" 
			color-by="OrgColor" label="Organization"
			show-empty-criterion mask-unavailable-spaces>
		</triplat-graphic-legend-show-by>
		...
	</triplat-graphic-legend>

In this example, each object in the **spaces** array property must have the following attributes:
 - **OccupancyStatus**: Contains the value to create the criteria for the "Occupancy Status" row.
 - **OccupancyColor**: Contains the color value for each criterion of the "Occupancy Status" row.
 - **OrgName**: Contains the value to create the criteria for the "Organization" row.
 - **OrgColor**: Contains the color value for each criterion of the "Organization" row.

For example, the "Occupancy Status" row could contain the following criteria:
 - Occupied
 - Vacant

The list of criteria shown for a particular row may differ between two distinct set of spaces. That happens because this component  only shows the criteria that are satisfied by at least one space.

### Styling

Custom property                                       | Description                                                        | Default
------------------------------------------------------|--------------------------------------------------------------------|-------------------
`--triplat-graphic-legend-secondary-border-color`     | The secondary border color                                         | --ibm-gray-20
`--triplat-graphic-legend-border-width`               | The border width                                                   | 1px
`--triplat-graphic-legend-border-style`               | The border style                                                   | solid
`--triplat-graphic-legend-row`                        | Mixin applied to the "show by" row                                 | {}
`--triplat-graphic-legend-checkbox-size`              | The size of the check box                                           | 24px
`--triplat-graphic-legend-checkbox-color`             | The color of the check box                                          | --tri-primary-color
`--triplat-graphic-legend-checkbox-margin`            | The margin around the check box                                    | 10px 
`--triplat-graphic-legend-checkbox`                   | Mixin applied to the check box                                     | {}
`--triplat-graphic-legend-radio-size`                 | The size of the radio button                                       | 24px
`--triplat-graphic-legend-radio-color`                | The color of the radio button                                      | --tri-primary-color
`--triplat-graphic-legend-radio-margin`               | The margin around the radio button                                 | 10px 
`--triplat-graphic-legend-radio`                      | Mixin applied to the radio button                                  | {}
`--triplat-graphic-legend-secondary-background-color` | The secondary background color of the legend                       | #f7f7f7
`--triplat-graphic-legend-show-all`                   | Mixin applied to the "show all" row                                | {}
`--triplat-graphic-legend-show-all-button`            | Mixin applied to the "show all" button                             | {} 
`--triplat-graphic-legend-criterion`                  | Mixin applied to the criterion row                                 | {}
`--triplat-graphic-legend-criterion-text`             | Mixin applied to the criterion text                                | {}
`--triplat-graphic-legend-vertical-divider-line`      | Mixin applied to the divider line between the check box/radio button and its label | {} 
`--triplat-graphic-legend-color-box-size`             | The size of box that shows the color of each criterion             | 22px
`--triplat-graphic-legend-show-by-availability`       | Mixin applied to the "available/unavailable" text                  | {}
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				--legend-secondary-border-color: var(--triplat-graphic-legend-secondary-border-color, var(--ibm-gray-20));
				--legend-border-width: var(--triplat-graphic-legend-border-width, 1px);
				--legend-border-style: var(--triplat-graphic-legend-border-style, solid);
				--legend-checkbox-size: var(--triplat-graphic-legend-checkbox-size, 24px);
				--legend-checkbox-color: var(--triplat-graphic-legend-checkbox-color, var(--tri-primary-color));
				--legend-checkbox-margin: var(--triplat-graphic-legend-checkbox-margin, 10px);
				--legend-radio-size: var(--triplat-graphic-legend-radio-size, 24px);
				--legend-radio-color: var(--triplat-graphic-legend-radio-color, var(--tri-primary-color));
				--legend-radio-margin: var(--triplat-graphic-legend-radio-margin, 10px);
				--legend-secondary-background-color: var(--triplat-graphic-legend-secondary-background-color, #f7f7f7);
				--legend-color-box-size: var(--triplat-graphic-legend-color-box-size, 22px);               
			}

			.showByItemContainer {
				min-height: 54px;
				border-bottom-width: var(--legend-border-width);
				border-bottom-style: var(--legend-border-style);    
				border-bottom-color: var(--legend-secondary-border-color);
				@apply --layout-vertical;
				@apply --triplat-graphic-legend-row;
			}

			.showByItemRadio {
				--paper-radio-button-size: var(--legend-radio-size);
				--paper-radio-button-label-spacing: var(--legend-radio-margin);
				--paper-radio-button-checked-color: var(--legend-radio-color);
				--paper-radio-button-unchecked-color: var(--legend-radio-color);
				padding-top: 15px;
				padding-bottom: 15px;
				@apply --triplat-graphic-legend-radio;
			}

			:host([dir="ltr"]) .showByItemRadio {
				padding-left: var(--legend-radio-margin);
			} 

			:host([dir="rtl"]) .showByItemRadio {
				padding-right: var(--legend-radio-margin);
			}

			.showByItem {
				@apply --layout-horizontal;
				@apply --layout-center;
			}

			:host([dir="ltr"]) .showByItemDivider {
				border-left-width: var(--legend-border-width);
				border-left-style: var(--legend-border-style);   
				border-left-color: var(--legend-secondary-border-color);
				padding-left: 10px;
				height: var(--legend-radio-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			:host([dir="rtl"]) .showByItemDivider {
				border-right-width: var(--legend-border-width);
				border-right-style: var(--legend-border-style);  
				border-right-color: var(--legend-secondary-border-color);
				padding-right: 10px;
				height: var(--legend-radio-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			.showByItemText {
				vertical-align: middle;
			}

			:host([dir="ltr"]) .legendSpacer {
				padding-right: 20px;
			}

			:host([dir="rtl"]) .legendSpacer {
				padding-left: 20px;
			}

			.showAllContainer {
				height: 44px;
				background-color: var(--legend-secondary-background-color);
				@apply --layout-horizontal;
				@apply --layout-center;
				@apply --triplat-graphic-legend-show-all;
			}

			.showAllCheckbox {
				--paper-checkbox-size: var(--legend-checkbox-size);
				--paper-checkbox-margin: var(--legend-checkbox-margin);
				--paper-checkbox-label-spacing: 0px;
				--paper-checkbox-checked-color: var(--legend-checkbox-color);
				--paper-checkbox-unchecked-color: var(--legend-checkbox-color);
				@apply --layout-flex;
				@apply --triplat-graphic-legend-checkbox;
			}

			.showAll {
				height: var(--legend-checkbox-size);
				line-height: var(--legend-checkbox-size);
			}

			.showAllText {
				vertical-align: middle;
			}

			.showAllButton {
				color: var(--tri-primary-color);
				transform: rotate(270deg);
				@apply --triplat-graphic-legend-show-all-button;
			}

			.showAllButton[active] {
				transform: rotate(90deg);
			}

			.availabilityContainer {
				font-size: 12px;
				color: var(--ibm-gray-40);
				padding-top: 5px;
				@apply --triplat-graphic-legend-show-by-availability;
			}

			:host([dir="ltr"]) .availabilityContainer { 
				padding-left: 24px;
			}

			:host([dir="rtl"]) .availabilityContainer { 
				padding-right: 9px;
			}

			.criterionList {
				background-color: var(--legend-secondary-background-color);
				border-top-width: var(--legend-border-width);
				border-top-style: var(--legend-border-style);    
				border-top-color: var(--legend-secondary-border-color);
			}

			.criterionContainer {
				height: 54px;
				overflow: hidden;
				@apply --triplat-graphic-legend-criterion;
				@apply --layout-vertical;
			}

			.criterionCheckbox {
				--paper-checkbox-size: var(--legend-checkbox-size);
				--paper-checkbox-margin: var(--legend-checkbox-margin);
				--paper-checkbox-label-spacing: 0px;
				--paper-checkbox-checked-color: var(--legend-checkbox-color);
				--paper-checkbox-unchecked-color: var(--legend-checkbox-color);
				padding-top: 5px;
				padding-bottom: 5px;
				--paper-checkbox-label: {
					width: 100%;
				};
				@apply --layout-horizontal;
				@apply --layout-center;
				@apply --triplat-graphic-legend-checkbox;
			}

			.criterion {
				@apply --layout-horizontal;
				@apply --layout-center;
			}

			.readonly-criterion {
				@apply --layout-horizontal;
				@apply --layout-center;
				padding-top: 20px;
			}

			:host([readonly-criterion]) .criterionList {
				background-color: white;

			}

			:host([dir="ltr"]) .criterionDivider {
				border-left-width: var(--legend-border-width);
				border-left-style: var(--legend-border-style);   
				border-left-color: var(--legend-secondary-border-color);
				padding-left: 10px;
				height: var(--legend-checkbox-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			:host([dir="rtl"]) .criterionDivider {
				border-right-width: var(--legend-border-width);
				border-right-style: var(--legend-border-style);  
				border-right-color: var(--legend-secondary-border-color);
				padding-right: 10px;
				height: var(--legend-checkbox-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			.criterionColorBox { 
				height: var(--legend-color-box-size); 
				width: var(--legend-color-box-size); 
				@apply --layout-flex-1;
			}

			:host([dir="rtl"]) .criterionColorBox { 
				margin-left: 1px;
			}

			:host([dir="ltr"]) .criterionColorBox { 
				margin-right: 1px;
			}

			.criterionText {
				@apply --layout-flex;
				@apply --triplat-graphic-legend-criterion-text;
			}

			:host([dir="ltr"]) .criterionText {
				margin-left: 9px;
			}

			:host([dir="rtl"]) .criterionText {
				margin-right: 9px;
			}   
		
		</style>

		<div class="showByItemContainer">
			<paper-radio-button class="showByItemRadio legendSpacer" checked="{{checked}}" on-change="_handleItemChange">
				<div class="showByItem">
					<div class="showByItemDivider"></div>
					<span class="showByItemText">[[label]]</span>
				</div>
			</paper-radio-button>
			<div hidden\$="[[_hideShowAllAndCriterions(checked, _criterions)]]">
				<div class="showAllContainer legendSpacer">
					<paper-checkbox on-change="_handleShowAllChange" class="showAllCheckbox" checked="{{_showAll}}">
						<div class="showAll">
							<span class="showAllText">Show All</span>
						</div>
					</paper-checkbox>
					<paper-icon-button class="showAllButton" icon="ibm-glyphs:back" active="{{_showCriterions}}" toggles="">
					</paper-icon-button>
				</div>
				<iron-collapse class="criterionList legendSpacer" opened="{{_showCriterions}}">
					<template is="dom-if" if="[[maskUnavailableSpaces]]">
						<div class="availabilityContainer">
						Available | Unavailable
						</div>
					</template>
					<template is="dom-repeat" items="[[_criterions]]" as="criterion" on-dom-change="_handleCriterionsDomChange">
						<div class="criterionContainer">
							<paper-checkbox on-change="_handleCriterionChange" class="criterionCheckbox" hidden\$="[[readonlyCriterion]]" checked="{{criterion.checked}}" criterion="[[criterion]]">
								<div class="criterion">
									<div class="criterionDivider"></div>
									<div class="criterionColorBox" style\$="background-color: [[criterion.color]];opacity: [[opacity]];"></div>
									<template is="dom-if" if="[[maskUnavailableSpaces]]">
										<div class="criterionColorBox" style\$="background-color: [[criterion.color]];opacity: [[opacityForUnavailableSpaces]];"></div>
									</template>
									<span class="criterionText" title="[[criterion.name]]">[[criterion.name]]</span>
								</div>
							</paper-checkbox>
							<div class="readonly-criterion" hidden\$="[[!readonlyCriterion]]">
								<div class="criterionColorBox" style\$="background-color: [[criterion.color]];opacity: [[opacity]];"></div>
								<template is="dom-if" if="[[maskUnavailableSpaces]]">
									<div class="criterionColorBox" style\$="background-color: [[criterion.color]];opacity: [[opacityForUnavailableSpaces]];"></div>
								</template>
								<span class="criterionText" title="[[criterion.name]]">[[criterion.name]]</span>
							</div>
						</div>
					</template>
				</iron-collapse>
			</div>
		</div>
	`,

    is: "triplat-graphic-legend-show-by",

    /**
	 * Fired when the checked state of this row or the checked state of one the criteria changes due to user interaction.
	 *
	 * @event show-by-change
	 */

	properties: {

		/**
		 * The name of a space attribute whose content will be used to create the criteria that will be shown on the
		 * legend when this row is selected.
		 */
		attribute: {
			type: String,
		},

		/**
		 * The name of a space attribute that provides the color value for each criterion.
		 */
		colorBy: {
			type: String,
		},

		/**
		 * A label for the row.
		 */
		label: {
			type: String,
		},

		/**
		 * By default, the user will not be able to highlight the spaces that do not satisfy any criterion.
		 * If this property is true, an empty criterion will be shown on the legend. 
		 * The empty criterion can be customized by the **emptyCriterionText** and **emptyCriterionColor** properties.
		 * When the empty criterion is selected, the legend will highlight the spaces that do not satisfy any other criterion.
		 */
		showEmptyCriterion: {
			type: Boolean,
			value: false
		},

		/**
		 * The name for the empty criterion. It is only used if the **showEmptyCriterion** property is true.
		 */
		emptyCriterionText: {
			type: String,
			value: "Undefined"
		},

		/**
		 * The color for the empty criterion. It is only used if the **showEmptyCriterion** property is true.
		 */
		emptyCriterionColor: {
			type: String,
			value: "gray"
		},

		/**
		 * If true, the spaces that satisfy the criteria will be highlighted on the graphic using different opacities
		 * to indicate their availability. The available spaces will have the opacity defined by the **opacity** property. 
		 * The unavailable spaces will have the opacity defined by the **opacityForUnavailableSpaces** property.
		 * The available spaces are defined by the **availableSpaces** on the **triplat-graphic-legend** element.
		 */
		maskUnavailableSpaces: {
			type: Boolean,
			value: false
		},

		/**
		 * The opacity used to highlight the spaces. If **maskUnavailableSpaces** is true, this property is used only for 
		 * the available spaces. Otherwise, it is used for all spaces.
		 */
		opacity: {
			type: Number,
			value: 0.95
		},

		/**
		 * The opacity used to highlight the unavailable spaces. 
		 * It is only used if the **maskUnavailableSpaces** property is true.
		 */
		opacityForUnavailableSpaces: {
			type: Number,
			value: 0.3
		},

		/**
		 * The number used by **triplat-graphic-highlight-group** to style the spaces when this row is selected. 
		 * To style the spaces, create a CSS mixin **--triplat-graphic-highlight-group-(classNumber)** on the 
		 * **triplat-graphic** element. It must be a number between 1 and 5 inclusive.  
		 */
		classNumber: {
			type: Number,
			readOnly: false,
			notify: false,
			value: 1
		},

		/**
		 * Gets or sets the state of this row, where true is checked and false is unchecked.
		 */
		checked: {
			type: Boolean,
			value: false,
			notify: true
		},

		/**
		 * Gets or sets the first state of the **Show all** check box when this row is selected by the user.
		 */
		showAllChecked: {
			type: Boolean,
			value: false
		},

		/**
		 * Gets or sets the selected criteria for this row. 
		 * The value of this property is an array of the names of the selected criteria.
		 */
		selectedCriterions: {
			type: Array,
			notify: true
		},

		/**
		 * Sets criterion list to read-only. 
		 */
		readonlyCriterion: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},

		_criterions: {
			type: Array
		},

		_showCriterions: {
			type: Boolean,
			value: false
		},

		_showAll: {
			type: Boolean,
			value: false
		}
	},

    observers: [
		"_handleSelectedCriterionsChange(selectedCriterions.*)"
	],

    /**
	 * Sets the state of the show all check box.
	 * @param {Boolean} showAllState true is checked and false is unchecked.
	 */
	setShowAll: function(showAllState) {
		if (this.checked) {
			if (showAllState && this._criterions) {
				this._selectAllCriterions();
			} else {
				this.selectedCriterions = null;
			}
			this.fire("show-by-change", {showBy: this});
		}
	},

    _handleSelectedCriterionsChange: function(change) {
		if (change.path == "selectedCriterions" || change.path == "selectedCriterions.splices") {
			this._checkSelected();
		}
	},

    _checkSelected: function() {
		var allCheckboxes = Array.from(dom(this.root).querySelectorAll("paper-checkbox.criterionCheckbox"));
		var showAll = allCheckboxes &&  allCheckboxes.length > 0;
		if (allCheckboxes) {
			for (var i = 0; i < allCheckboxes.length; i++) {
				allCheckboxes[i].checked = this.selectedCriterions && 
										   this.selectedCriterions.indexOf(allCheckboxes[i].criterion.name) >= 0;
				showAll = showAll && allCheckboxes[i].checked;                    
			}
		}
		this._showAll = showAll;
	},

    _handleCriterionsDomChange: function(event) {
		if (this.checked) {
			if (this.showAllChecked && (!this.selectedCriterions || this.selectedCriterions.length == 0)) {
				this._selectAllCriterions();
			} else {
				this._checkSelected();
			}
			
			if (this._criterions && this._criterions.length > 0) {
				this.fire("show-by-change", {showBy: this});
			}
		}
	},

    _handleItemChange: function(event) {
		var targetRadioButton = event.target;
		if (targetRadioButton.checked) {
			this._showCriterions = true;
			if(this.showAllChecked) {
				this._selectAllCriterions();
			} else {
				this.selectedCriterions = null;
			}
		}
		this.fire("show-by-change", {showBy: this});
	},

    _satisfyShowBy: function(space) {
		var criterionName = this._getCriterionName(space);
		var result = false;
		for (var i = 0; this._criterions && i < this._criterions.length && !result; i++) {
			result = this._criterions[i].checked && this._criterions[i].name == criterionName;
		}
		return result;
	},

    _getCriterionName: function(space) {
		if (!this.attribute) {
			return null;
		} else {
			var criterionName = this.get(this.attribute, space);
			if (!criterionName || criterionName.toString().length == 0) {
				criterionName = null;
				if (this.showEmptyCriterion) {
					criterionName = this.emptyCriterionText;
				}
			}
			return criterionName;
		}
	},

    _hideShowAllAndCriterions: function(checked, criterions) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return !checked || !criterions || criterions.length == 0;
	},

    _handleShowAllChange: function(event) {
		var showAllCheckBox = event.target;
		if (showAllCheckBox.checked && this._criterions) {
			this._selectAllCriterions();
		} else {
			this.selectedCriterions = null;
		}
		this.fire("show-by-change", {showBy: this});
	},

    _selectAllCriterions: function() {
		var selectedCriterions = new Array();
		for (var i = 0; this._criterions && i < this._criterions.length; i++) {
			selectedCriterions.push(this._criterions[i].name);
		}
		this.selectedCriterions = selectedCriterions;
	},

    _handleCriterionChange: function(event) {
		var criterionCheckBox = event.target;
		if (criterionCheckBox.checked) {
			if (!this.selectedCriterions) {
				this.selectedCriterions = new Array();
			}
			this.push("selectedCriterions", criterionCheckBox.criterion.name);
		} else {
			this.splice("selectedCriterions", this.selectedCriterions.indexOf(criterionCheckBox.criterion.name), 1);
		}
		this.fire("show-by-change", {showBy: this});
	},

    _selectItem: function(checked) {
		this.checked = checked;
		if (checked) {
			this._showCriterions = true;
		}
	},

    _getShowByColor: function(space) {
		var showByColor = null;            
		if (this.colorBy) {
			showByColor = this.get(this.colorBy, space);
		}
		if (!showByColor || showByColor.toString().length == 0) {
			showByColor = this.emptyCriterionColor;
		}
		return showByColor;
	},

    behaviors: [TriDirBehavior]
});