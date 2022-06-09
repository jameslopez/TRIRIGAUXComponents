/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-radio-button/paper-radio-button.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
A custom element to define a **filter by** row in a graphic legend component. 

When a **filter by** row is selected, it gets the spaces that satisfy the selected **show by** criteria and filters out the spaces that does not satisfy this filter by criteria.

A **filter by** alone cannot select which spaces will be highlighted. It only works on the spaces that already satisfy the selected **show by** criteria.

This element should be used as an inner element of **triplat-graphic-legend**. Zero, one or more **triplat-graphic-legend-filter-by** elements can be defined inside **triplat-graphic-legend**. Only one **filter by** row can be selected.

There are two possible configurations for a **filter by**:
 - Filter by attribute
 - Filter by spaces

### Filter by attribute

To filter by attribute, the **attribute** property must be defined. A **filter by attribute** row contains a list of one or more criteria that the user can select.

The criteria for a **filter by attribute** are dynamically defined based on the content of a particular space attribute. Possible space attributes that can be used are the "Occupancy Status", "Spaces Class", among others.

Each row has a **show all** check box that allows the user to check or uncheck all criteria at one time.

Example:

	<triplat-graphic-legend spaces="[[spaces]]" 
		legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-filter-by attribute="ClassName" 
			label="Space Class">
		</triplat-graphic-legend-filter-by>
		...
	</triplat-graphic-legend>

In this example, each object in the **spaces** array property of the legend element must have the following attribute:
 - **ClassName**: Contains the value to create the criteria for the "Space Class" row.

For example, the "Space Class" row could contain the following criteria:
 - Dedicated Enclosed Workstation
 - Dedicated Open Workstation

The list of criteria shown for a particular row may differ between two distinct set of spaces. That happens because this component only shows the criteria that are satisfied by at least one space.

### Filter by spaces

To filter by spaces, the **spaces** property must be defined. A **filter by space** row does not have a list of criteria.

When a **filter by space** is selected, it gets the spaces that satisfies the selected **show by** criteria and filters out only the spaces that are also contained in the **spaces** property of this row.

Example:

	<triplat-graphic-legend spaces="[[spaces]]" 
		legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-filter-by spaces="[[JohnEntitledSpaces]]" 
			label="Entitlements">
		</triplat-graphic-legend-filter-by>
		...
	</triplat-graphic-legend>

In this example, the **spaces** property of the "Entitlements" row receives an array of spaces that John is entitled to use. When the user selects this row, the legend will filter out only the spaces that John is entitled to use.

### Styling

Custom property                                       | Description                                                        | Default
------------------------------------------------------|--------------------------------------------------------------------|-------------------
`--triplat-graphic-legend-secondary-border-color`     | The secondary border color                                         | --ibm-gray-20
`--triplat-graphic-legend-border-width`               | The border width                                                   | 1px
`--triplat-graphic-legend-border-style`               | The border style                                                   | solid
`--triplat-graphic-legend-row`                        | Mixin applied to the "filter by" row                               | {}
`--triplat-graphic-legend-checkbox-size`              | The size of the check box                                          | 24px
`--triplat-graphic-legend-checkbox-color`             | The color of the check box                                         | --tri-primary-color
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

			.filterByItemContainer {
				min-height: 54px;
				border-bottom-width: var(--legend-border-width);
				border-bottom-style: var(--legend-border-style); 
				border-bottom-color: var(--legend-secondary-border-color);
				@apply --layout-vertical;
				@apply --triplat-graphic-legend-row;

			}

			.filterByItemRadio {
				--paper-radio-button-size: var(--legend-radio-size);
				--paper-radio-button-label-spacing: var(--legend-radio-margin);
				--paper-radio-button-checked-color: var(--legend-radio-color);
				--paper-radio-button-unchecked-color: var(--legend-radio-color);
				padding-top: 15px;
				padding-bottom: 15px;
				@apply --triplat-graphic-legend-radio;
			}

			:host([dir="ltr"]) .filterByItemRadio {
				padding-left: var(--legend-radio-margin);
			} 

			:host([dir="rtl"]) .filterByItemRadio {
				padding-right: var(--legend-radio-margin);
			}

			.filterByItem {
				@apply --layout-horizontal;
				@apply --layout-center;
			}

			:host([dir="ltr"]) .filterByItemDivider {
				border-left-width: var(--legend-border-width);
				border-left-style: var(--legend-border-style);   
				border-left-color: var(--legend-secondary-border-color);
				padding-left: 10px;
				height: var(--legend-radio-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			:host([dir="rtl"]) .filterByItemDivider {
				border-right-width: var(--legend-border-width);
				border-right-style: var(--legend-border-style);  
				border-right-color: var(--legend-secondary-border-color);
				padding-right: 10px;
				height: var(--legend-radio-size);
				@apply --triplat-graphic-legend-vertical-divider-line;
			}

			.filterByItemText {
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

			.criterionText {
				@apply --layout-flex;
				@apply --triplat-graphic-legend-criterion-text;
			}
		
		</style>

		<div class="filterByItemContainer">
			<paper-radio-button class="filterByItemRadio legendSpacer" checked="{{checked}}" on-change="_handleItemChange">
				<div class="filterByItem">
					<div class="filterByItemDivider"></div>
					<span class="filterByItemText">[[label]]</span>
				</div>
			</paper-radio-button>
			<div hidden\$="[[_hideShowAllAndCriterions(checked, _criterions)]]">
				<div class="showAllContainer legendSpacer">
					<paper-checkbox on-change="_handleShowAllChange" class="showAllCheckbox" checked="{{_showAll}}">
						<div class="showAll">
							<span class="showAllText">Filter All</span>
						</div>
					</paper-checkbox>
					<paper-icon-button class="showAllButton" icon="ibm-glyphs:back" active="{{_showCriterions}}" toggles="">
					</paper-icon-button>
				</div>
				<iron-collapse class="criterionList legendSpacer" opened="{{_showCriterions}}">
					<template is="dom-repeat" items="[[_criterions]]" as="criterion" on-dom-change="_handleCriterionsDomChange">
						<div class="criterionContainer">
							<paper-checkbox on-change="_handleCriterionChange" class="criterionCheckbox" checked="{{criterion.checked}}" criterion="[[criterion]]">
								<div class="criterion">
									<div class="criterionDivider"></div>
									<span class="criterionText" title="[[criterion.name]]">[[criterion.name]]</span>
								</div>
							</paper-checkbox>
						</div>
					</template>
				</iron-collapse>
			</div>
		</div>
	`,

    is: "triplat-graphic-legend-filter-by",

    /**
	 * Fired when the checked state of this row or the checked state of one the criteria changes due to user interaction.
	 *
	 * @event filter-by-change
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
		 * A label for the row.
		 */
		label: {
			type: String,
		},

		/**
		 * An array of spaces that is used to filter the legend spaces.
		 * If this property is defined, the **filter by** row will have no criteria. 
		 * When it is selected, only the legend spaces contained in this array will be highlighted on the graphic. 
		 * This property and the attribute property cannot be used together.
		 */
		spaces: {
			type: Array
		},

		/**
		 * By default, the user will not be able to filter the spaces that do not satisfy any criterion.
		 * If this property is true, an empty criterion will be shown on the legend. 
		 * The empty criterion can be customized by the **emptyCriterionText** property.
		 * When the empty criterion is selected, the legend will filter out the spaces that do not satisfy any other criterion.
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
		 * The name of the attribute that contains the ID of each space in the **spaces** array property of this row.
		 */
		spaceIdAttributeName: {
			type: String,
			value: "_id"
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
		 * Gets or sets the first state of the **Filter all** check box when this row is selected by the user.
		 */
		filterAllChecked: {
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
		},

		_hasSpaces: {
			type: Boolean,
			value: false
		}
	},

    observers: [
		"_handleSelectedCriterionsChange(selectedCriterions.*)",
		"_handleSpacesChange(spaces.*)"
	],

    /**
	 * Sets the state of the filter all check box.
	 * @param {Boolean} filterAllState true is checked and false is unchecked.
	 */
	setFilterAll: function(filterAllState) {
		if (this.checked && !this.spaces) {
			if (filterAllState && this._criterions) {
				this._selectAllCriterions();
			} else {
				this.selectedCriterions = null;
			}
			this.fire("filter-by-change", {filterBy: this});
		}
	},

    _handleSpacesChange: function(change) {
		if (this.attribute) {
			console.log("The 'spaces' property and the 'attribute' property cannot be used together. [FilterBy label=" + this.label + "]");
			return;
		}
		if (this.checked) {
			this.fire("filter-by-change", {filterBy: this});
		}
	},

    _handleSelectedCriterionsChange: function(change) {
		if (this.spaces) {
			console.log("The 'selectedCriterions' property and the 'spaces' property cannot be used together. [FilterBy label=" + this.label + "]");
			return;
		}
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
			if (!this.spaces) {
				if (this.filterAllChecked && (!this.selectedCriterions || this.selectedCriterions.length == 0)) {
					this._selectAllCriterions();
				} else {
					this._checkSelected();
				}
				
				if (this._criterions && this._criterions.length > 0) {
					this.fire("filter-by-change", {filterBy: this});
				}  
			} else {
				this.fire("filter-by-change", {filterBy: this});
			}
		}
	},

    _handleItemChange: function(event) {
		var targetRadioButton = event.target;
		if (!this.spaces) { 
			if (targetRadioButton.checked) {
				this._showCriterions = true;
				if(this.filterAllChecked) {
					this._selectAllCriterions();
				} else {
					this.selectedCriterions = null;
				}
			}
		}            
		this.fire("filter-by-change", {filterBy: this});
	},

    _satisfyFilterBy: function(space, spaceId) {
		var result = false;
		if (this.spaces) {
			for (var i = 0; i < this.spaces.length && !result; i++) {
				result = spaceId == this.get(this.spaceIdAttributeName, this.spaces[i]);
			}
		} else {
			var criterionName = this._getCriterionName(space);
			for (var i = 0; this._criterions && i < this._criterions.length && !result; i++) {
				result = this._criterions[i].checked && this._criterions[i].name == criterionName;
			}
		}
		
		return result;
	},

    _getCriterionName: function(space) {
		if (this.spaces || !this.attribute) {
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
		if (!this.spaces) {
			if (showAllCheckBox.checked && this._criterions) {
				this._selectAllCriterions();
			} else {
				this.selectedCriterions = null;
			}
		}
		this.fire("filter-by-change", {filterBy: this});
	},

    _selectAllCriterions: function() {
		var selectedCriterions = new Array();
		for (var i = 0; i < this._criterions.length; i++) {
			selectedCriterions.push(this._criterions[i].name);
		}
		this.selectedCriterions = selectedCriterions;
	},

    _handleCriterionChange: function(event) {
		var criterionCheckBox = event.target;
		if (!this.spaces) {
			if (criterionCheckBox.checked) {
				if (!this.selectedCriterions) {
					this.selectedCriterions = new Array();
				}
				this.push("selectedCriterions", criterionCheckBox.criterion.name);
			} else {
				this.splice("selectedCriterions", this.selectedCriterions.indexOf(criterionCheckBox.criterion.name), 1);
			}
		}
		this.fire("filter-by-change", {filterBy: this});
	},

    _selectItem: function(checked) {
		this.checked = checked;
		if (checked) {
			this._showCriterions = true;
		}
	},

    _getShowByColor: function(space) {
		return null;
	},

    _show: function(show) {
		this.hidden = !show;
		if (this.hidden && this.checked) {
			this.checked = false;
			this.fire("filter-by-change", {filterBy: this});
		}
	},

    behaviors: [TriDirBehavior]
});