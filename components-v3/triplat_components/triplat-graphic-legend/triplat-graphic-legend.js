/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import "./triplat-graphic-legend-pin-section.js";
import "./triplat-graphic-legend-pin.js";
import "./triplat-graphic-legend-show-by-section.js";
import "./triplat-graphic-legend-show-by.js";
import "./triplat-graphic-legend-filter-by-section.js";
import "./triplat-graphic-legend-filter-by.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
A custom element that shows a legend for controlling the spaces that are highlighted and the pins that are shown in a graphic.

This component delegates the responsibility for highlighting the spaces on a graphic to a **triplat-graphic-highlight-group** plugin. The **legendSpaces** property connects these two elements. The legend can also be connected to one or more **triplat-graphic-pin** plugins to control the visibility of the pins. Example of a basic legend configuration:

	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		<triplat-graphic-legend-show-by attribute="ClassName" color-by="ClassColor" 
			label="Space Class"
			slot="graphic-legend-show-by">
		</triplat-graphic-legend-show-by>
	</triplat-graphic-legend>

	<triplat-graphic record-id="[[floorId]]">
		<triplat-graphic-highlight-group legend-spaces="[[legendSpaces]]">
		</triplat-graphic-highlight-group>
	</triplat-graphic>

The legend can be opened by clicking on the bar or using a swipe movement on touch devices.

The legend contains three graphical sections:
 - Location Pins
 - Show By 
 - Filter By

### Location Pins section

This section controls the visibility of the pins that are shown in a graphic. It is composed of a list of pin rows, and each pin row  controls the visibility of one pin type.

Each pin row is defined by a **triplat-graphic-legend-pin** element defined as an inner element of the legend. If no **triplat-graphic-legend-pin** is defined, the pin section is not displayed.

This section is also not displayed if the **showLocationPin** property of this legend is true.
For more details, see the documentation page for **triplat-graphic-legend-pin**.

Example:

	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-pin label="Person" icon="ibm:pin-person"                                   
			checked="{{personsPinEnabled}}"
			slot="graphic-legend-pin">
		</triplat-graphic-legend-pin>
		...
	</triplat-graphic-legend>

	<triplat-graphic record-id="[[floorId]]">
		...   
		<triplat-graphic-pin pins="[[selectedPersons]]" icon="ibm:pin-person" 
			pin-size="32" badge-size="20" show-label-onhover 
			enabled="{{personsPinEnabled}}" class-number="1">
		</triplat-graphic-pin>
		...
	</triplat-graphic>

### Show By section

This section controls the spaces that are highlighted in a graphic. It is composed of a list of **show by** rows, and each row highlights the spaces based on the content of a particular space attribute. Possible space attributes that can be used are the "Occupancy Status", "Charge to Organization", "Space Class", among others.

Each **show by** row is defined by a **triplat-graphic-legend-show-by** element defined as an inner element of this legend. Only one **show by** row can be selected. For more details, see the documentation page for **triplat-graphic-legend-show-by**.

Example:

	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-show-by attribute="OccupancyStatus" 
			color-by="OccupancyColor" label="Occupancy Status"
			slot="graphic-legend-show-by">
		</triplat-graphic-legend-show-by>

		<triplat-graphic-legend-show-by attribute="OrgName" 
			color-by="OrgColor" label="Organization" show-empty-criterion
			slot="graphic-legend-show-by">
		</triplat-graphic-legend-show-by>
		...
	</triplat-graphic-legend> 

### Filter By section

This section filters the spaces that are highlighted in a graphic. It is composed of a list of **filter by** rows.
When a **filter by** row is selected, it gets the spaces that satisfy the selected **show by** and filters out the spaces that does not satisfy the **filter by**.

A **filter by** alone cannot determine which spaces will be highlighted. It only works on the spaces that satisfy a selected **show by**. 

Each **filter by** row is defined by a **triplat-graphic-legend-filter-by** element defined as an inner element of the legend. If no **triplat-graphic-legend-filter-by** is defined, the filter section is not displayed.

Only one **filter by** row can be selected. For more details, see the documentation page for **triplat-graphic-legend-filter-by**.

Example:

	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		...
		<triplat-graphic-legend-filter-by attribute="ClassName" label="Space Class"
			slot="graphic-legend-filter-by">
		</triplat-graphic-legend-filter-by>
		...
	</triplat-graphic-legend>

### Styling

Custom property                                       | Description                                                 | Default
------------------------------------------------------|-------------------------------------------------------------|----------------------------
`--triplat-graphic-legend-min-width`                  | The minimum width of the legend when it is not collapsed    | 350px
`--triplat-graphic-legend-transition-duration`| The duration of the animation transition for collapsing or expanding the legend | 300ms
`--triplat-graphic-legend-pin-fill-color` | The fill color of the location pin icon, it is used when the **showLocationPin** property is true.| --ibm-gray-60
`--triplat-graphic-legend-pin-size`       | The size of the location pin icon, it is used when the **showLocationPin** property is true.      | 32px
`--triplat-graphic-legend-bar`                        | Mixin applied to the legend bar                             | {}
`--triplat-graphic-legend-bar-width`                  | The width of the legend bar.                                | 20px
`--triplat-graphic-legend-show-button`                | Mixin applied to the show/hide button on the legend bar     | {}
`--triplat-graphic-legend-container`                  | Mixin applied to the legend container                       | {}
`--triplat-graphic-legend-primary-background-color`   | The primary background color of the legend                  | --tri-primary-content-background-color
`--triplat-graphic-legend-secondary-background-color` | The secondary background color of the location pin section  | #f7f7f7
`--triplat-graphic-legend-primary-border-color`       | The primary border color                                    | --ibm-gray-30
`--triplat-graphic-legend-secondary-border-color`     | The secondary border color                                  | --ibm-gray-20
`--triplat-graphic-legend-border-width`               | The border width                                            | 1px
`--triplat-graphic-legend-border-style`               | The border style                                            | solid
`--triplat-graphic-legend-section-header`             | Mixin applied to the section header                         | {}
`--triplat-graphic-legend-show-all`                   | Mixin applied to the "show all" row of the location pin section | {}
`--triplat-graphic-legend-show-all-button`            | Mixin applied to the "show all" expand and collapse button of the location pin section | {}   
`--triplat-graphic-legend-checkbox-size`              | The size of the "show all" check box of the location pin section | 24px
`--triplat-graphic-legend-checkbox-color`             | The color of the "show all" check box of the location pin section| --tri-primary-color
`--triplat-graphic-legend-checkbox-margin`            | The margin around the "show all" check box of the location pin section  | 10px 
`--triplat-graphic-legend-checkbox`                   | Mixin applied to the "show all" check box of the location pin section   | {}


There are some CSS properties that are shared between the **triplat-graphic-legend-legend**, **triplat-graphic-legend-pin**, **triplat-graphic-legend-show-by** and **triplat-graphic-legend-filter-by** elements. Because these properties have the same name, they can be defined once in a :host rule and they will applied to the legend and its children.

Example of applying a CSS property to the legend and its children:
	
	<style>
		:host {
			--triplat-graphic-legend-checkbox-color: red;
		}
	</style>
	
	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		...
	</triplat-graphic-legend> 

In this example all the check boxes inside the legend will be red.

Example of applying a CSS property to the legend only:
	
	<style>
		triplat-graphic-legend {
			--triplat-graphic-legend-checkbox-color: red;
		}
	</style>
	
	<triplat-graphic-legend spaces="[[spaces]]" legend-spaces="{{legendSpaces}}">
		...
	</triplat-graphic-legend> 

In this example, only the **show all** check box of the location pin section will be red.

The CSS properties shared between the legend and its children are listed bellow:

- --triplat-graphic-legend-pin-fill-color
- --triplat-graphic-legend-pin-size
- --triplat-graphic-legend-secondary-background-color
- --triplat-graphic-legend-secondary-border-color   
- --triplat-graphic-legend-border-width
- --triplat-graphic-legend-border-style
- --triplat-graphic-legend-show-all 
- --triplat-graphic-legend-show-all-button
- --triplat-graphic-legend-checkbox-size
- --triplat-graphic-legend-checkbox-color
- --triplat-graphic-legend-checkbox-margin
- --triplat-graphic-legend-checkbox        


@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					font-size: 14px;
					@apply --layout-flex;
					--legend-secondary-background-color: var(--triplat-graphic-legend-secondary-background-color, #f7f7f7);
					--legend-primary-border-color: var(--triplat-graphic-legend-primary-border-color, var(--ibm-gray-30));
					--legend-secondary-border-color: var(--triplat-graphic-legend-secondary-border-color, var(--ibm-gray-20));
					--legend-border-width: var(--triplat-graphic-legend-border-width, 1px);
					--legend-border-style: var(--triplat-graphic-legend-border-style, solid);
					--legend-pin-size: var(--triplat-graphic-legend-pin-size, 32px);
					--legend-pin-fill-color: var(--triplat-graphic-legend-pin-fill-color, var(--ibm-gray-60));
					--legend-checkbox-size: var(--triplat-graphic-legend-checkbox-size, 24px);
				--legend-checkbox-color: var(--triplat-graphic-legend-checkbox-color, var(--tri-primary-color));
				--legend-checkbox-margin: var(--triplat-graphic-legend-checkbox-margin, 10px);
				--legend-bar-width: var(--triplat-graphic-legend-bar-width, 20px);
				--legend-min-width: var(--triplat-graphic-legend-min-width, 350px);
				--legend-sections-width: calc(var(--legend-min-width) - var(--legend-bar-width));
				height: 100%;
				max-height: 100%;
				overflow: hidden;
				user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					position: relative;
				/*
					 * On Microsoft Edge, the width of the legend does not update when we hide it.
					 * So we force it to be the same as the legend bar width.
					 */
				width: var(--legend-bar-width);
				}

				:host(.legend-expanded) {
					width: var(--legend-min-width);
				}

				:host(:not([dragging])) {
					transition-property: width;
				transition-duration:  var(--triplat-graphic-legend-transition-duration, 300ms);
				}

				.legendBar {				
					background-color: var(--ibm-gray-30);
					width: var(--legend-bar-width);
					min-width: var(--legend-bar-width);
					cursor: pointer;
					/* Disables the tap highlight color on Android devices */
					-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
					position: absolute;
					top: 0px;
					bottom: 0px;
					@apply --layout-horizontal;
					@apply --layout-center-center;
					@apply --triplat-graphic-legend-bar
				}

				:host([dir="rtl"]) .legendBarRight.legendBar, :host([dir="ltr"]) .legendBarLeft.legendBar {
					left: 0px;	
				}

				:host([dir="rtl"]) .legendBarLeft.legendBar, :host([dir="ltr"]) .legendBarRight.legendBar {
					right: 0px;
				}

				.showLegendButton {
					color: var(--tri-primary-color);
					--triplat-icon-width: 20px;
					--triplat-icon-height: 20px;
			
					@apply --triplat-graphic-legend-show-button
				}

				:host([dir="ltr"]) .legendBarLeft .showLegendButton,
				:host([dir="rtl"]) .legendBarLeft .showLegendButton[active],
				:host([dir="ltr"]) .legendBarRight .showLegendButton[active],
				:host([dir="rtl"]) .legendBarRight .showLegendButton {
					transform: rotate(0deg);  
				}

				:host([dir="ltr"]) .legendBarLeft .showLegendButton[active],
				:host([dir="rtl"]) .legendBarLeft .showLegendButton,
				:host([dir="ltr"]) .legendBarRight .showLegendButton,
				:host([dir="rtl"]) .legendBarRight .showLegendButton[active] {
					transform: rotate(180deg);  
				}			 

				.legendSections {
					border-width: var(--legend-border-width);
					border-style: var(--legend-border-style);	
					border-color: var(--legend-primary-border-color);
					background-color: var(--triplat-graphic-legend-primary-background-color, var(--tri-primary-content-background-color));
					box-sizing: border-box;
					width: var(--legend-sections-width);
					min-width: var(--legend-sections-width);
					overflow-y: auto;
					position: absolute;
					top: 0px;
					bottom: 0px;
					@apply --triplat-graphic-legend-container
				}

				:host([dir="rtl"]) .legendBarRight.legendSections, 
				:host([dir="ltr"]) .legendBarLeft.legendSections {
					left: var(--legend-bar-width);			
				}

				:host([dir="rtl"]) .legendBarLeft.legendSections, 
				:host([dir="ltr"]) .legendBarRight.legendSections {
					right: var(--legend-bar-width);
				}

				:host([dir="ltr"]) .legendSections {
					padding-left: 15px;
				}

				:host([dir="rtl"]) .legendSections {
					padding-right: 15px;
				}
				
			
		</style>

		<div id="legendSections" class="legendSections">
			<template is="dom-if" if="[[_showPinSection]]">
				<triplat-graphic-legend-pin-section>
					<slot name="graphic-legend-pin"></slot>
				</triplat-graphic-legend-pin-section>
			</template>
			<triplat-graphic-legend-show-by-section id="showBySection" class="showBySection" selected-item="{{_showBySelectedItem}}" selected="{{showBySelected}}" on-show-by-change="_handleShowByChanged" show-location-pin="[[showLocationPin]]" location-pin-icon="[[locationPinIcon]]" location-pin-checked="{{locationPinChecked}}">
				<slot name="graphic-legend-show-by"></slot>
			</triplat-graphic-legend-show-by-section>
			<template is="dom-if" if="[[_showFilterBySection]]">
				<triplat-graphic-legend-filter-by-section class="filterBySection" selected-item="{{_filterBySelectedItem}}" selected="{{filterBySelected}}" on-filter-by-change="_handleFilterByChanged">
					<slot name="graphic-legend-filter-by"></slot>
				</triplat-graphic-legend-filter-by-section>
			</template>
		</div>

		<div id="legendBar" class="legendBar" on-tap="_handleBarTap">
			<iron-icon active\$="[[opened]]" class="showLegendButton" icon="ibm-glyphs:back">
			</iron-icon>
		</div>
	`,

    is: "triplat-graphic-legend",

    properties: {

		/**
		 * An array of all spaces that can be highlighted using this legend.
		 */
		spaces: {
			type: Array,
			notify: false,
			readOnly: false
		},

		/**
		 * An array of available spaces, and it must be a subset of the **spaces** property. 
		 * This array is used to differentiate the available spaces from the unavailable ones. 
		 * This property must be defined if any **triplat-graphic-legend-show-by** child of the legend has the 
		 * **mask-unavailable-spaces** property set.
		 */
		availableSpaces: {
			type: Array,
			notify: false,
			readOnly: false
		},

		/**
		 * Returns an array of highlighted spaces grouped and filtered by the criteria selected in the legend.
		 * This array must be passed to the **legend-spaces** of the **triplat-graphic-highlight-group** plugin.
		 */
		legendSpaces: {
			type: Array,
			notify: true,
			readOnly: true
		},

		/**
		 * The name of the attribute that contains the ID of each space in the **spaces** and 
		 * **availableSpaces** arrays.
		 */
		spaceIdAttributeName: {
			type: String,
			value: "_id"
		},

		/**
		 * If true, the **Location Pins** section is not shown in the legend and the pins visibility is toggled via a
		 * pin icon on the right end of the **Show By** section header.
		 */
		showLocationPin: {
			type: Boolean,
			value: false
		},

		/**
		 * If the **showLocationPin** property is true, this property gets or sets the state of the location pin icon,
		 * where true is checked and false is unchecked.
		 */
		locationPinChecked: {
			type: Boolean,
			value: false,
			notify: true
		},

		/**
		 * The name of the icon to use for the location pin. 
		 * The name should have the format: "iconset_name:icon_name". The iconset_name: can be omitted for the IBM icon set.
		 */
		locationPinIcon: {
			type: String,
			value: "ibm:pin-multiples"
		},

		/**
		 * Gets or sets the selected **triplat-graphic-legend-show-by**. 
		 * The value of this property is the label of the selected element.
		 */
		showBySelected: {
			type: String,
			notify: true
		},

		/**
		 * Gets or sets the selected **triplat-graphic-legend-filter-by** label.
		 * The value of this property is the label of the selected element.
		 */
		filterBySelected: {
			type: String,
			notify: true
		},

		/**
		 * Positions the legends bar to the right or left of the legend.
		 * The bar controls whether the legend is collapsed or not.
		 */
		position: {
			type: String,
			value: "left",
			observer: "_handlePositionChange"
		},

		/**
		 * Set opened to true to expand the legend and to false collapse it.
		 */
		opened: {
			type: Boolean,
			notify: true,
			value: false,
			reflectToAttribute: true,
			observer: "_handleOpenedChange"
		},

		/**
		 * If true, swipe to open/close the legend is disabled.
		 */
		disableSwipe: {
			type: Boolean,
			value: false,
			observer: "_disableSwipeChanged"
		},

		/**
		 * Whether the user is dragging the legend interactively.
		 */
		dragging: {
			type: Boolean,
			value: false,
			readOnly: true,
			notify: true,
			reflectToAttribute: true
		},

		/**
		 * The minimum number of pixels that the user must move their finger by before it is considered a swipe.
		 */
		swipeThreshold: {
			type: Number,
			value: 100,
		},

		/**
		 * Indicates that the swipe movement was started on the legend bar.
		 */
		_dragStartedOnBar: {
			type: Boolean,
			value: false,
			readOnly: true
		},

		/**
		 *	When attached, this property contains the legend bar width.
		 */
		_legendMinWidth: {
			type: Number,
			value: 0,
			readOnly: true
		},

		/**
		 *	When attached, this property contains the legend width when it is opened.
		 */
		_legendMaxWidth: {
			type: Number,
			value: 0,
			readOnly: true
		},

		_showBySelectedItem: {
			type: Object
		},

		_filterBySelectedItem: {
			type: Object
		},

		_showFilterBySection: {
			type: Boolean,
			value: false
		},

		_showPinSection: {
			type: Boolean,
			value: false
		}
	},

    observers: [
		"_handleSpacesChange(spaces.*)",
		"_handleAvailableSpacesChange(availableSpaces.*)"
	],

    ready: function() {
		this._observer = dom(this).observeNodes(
			function(info) {
				this._addShowByCriterions();
				this._addFilterByCriterions();
				this._computePinSectionVisibility();
				this._computeFilterByVisibility();
			}
		);
	},

    attached: function() {
		this._isRTL = window.getComputedStyle(this).direction == 'rtl';
		var legendBar = this.$.legendBar;
		if (legendBar) {
			this._set_legendMinWidth(parseInt(window.getComputedStyle(legendBar).width));
		}
		var legendSections =this.$.legendSections;
		if (legendSections) {
			this._set_legendMaxWidth(this._legendMinWidth + parseInt(window.getComputedStyle(legendSections).width));
		}
	},

    _handleSpacesChange: function(change) {
		if(change.path == "spaces" || change.path == "spaces.splices") {
			this._addShowByCriterions();
			this._addFilterByCriterions();
			this._computeFilterByVisibility();
		}
	},

    _handleAvailableSpacesChange: function(change) {
		if(change.path == "availableSpaces" || change.path == "availableSpaces.splices") {
			this._generateLegendSpacesList();
		}
	},

    _computePinSectionVisibility: function() {
		var pinsList = this.queryAllEffectiveChildren("triplat-graphic-legend-pin");
		this._showPinSection = !this.showLocationPin && pinsList && pinsList.length > 0;
	},

    _computeFilterByVisibility: function() {
		var filterByList = this.queryAllEffectiveChildren("triplat-graphic-legend-filter-by");
		var filterByListCount = 0;
		for (var i = 0; filterByList && i < filterByList.length; i++) {
			if (this._isEqual(this.showBySelected, filterByList[i].label)) {
				filterByList[i]._show(false);
			} else {
				filterByList[i]._show(true);
				++filterByListCount;
			}
		}
		this._showFilterBySection = filterByList.length > 0;
	},

    _addShowByCriterions: function() {
		var showByList = this.queryAllEffectiveChildren("triplat-graphic-legend-show-by");
		this._addCriterions(showByList);
	},

    _addFilterByCriterions: function() {
		var filterByList = this.queryAllEffectiveChildren("triplat-graphic-legend-filter-by");
		this._addCriterions(filterByList);
	},

    _addCriterions: function(children) {
		if (children) {
			for (var index = 0; index < children.length; index++) {
				var criteria = children[index];
				var criterionsByName = {};
				for (var i = 0; this.spaces && i < this.spaces.length; i++) {
					var space = this.spaces[i];
					var criterionName = criteria._getCriterionName(space);
					if (criterionName) {
						if (!(criterionName in criterionsByName)) {
							criterionsByName[criterionName] = {name: criterionName,
															   color: criteria._getShowByColor(space),
															   checked: false};
						}
					}
				}

				var criterions = new Array();
				for (var name in criterionsByName) {
					criterions.push(criterionsByName[name]);
				}

				criteria._criterions = criterions.sort(
					function(criterionA, criterionB) {
						return criterionA.name.localeCompare(criterionB.name);
					}    
				);
			}
		}
	},

    _handleShowByChanged: function(event) {
		this._computeFilterByVisibility();
		this._generateLegendSpacesList();
	},

    _handleFilterByChanged: function(event) {
		this._generateLegendSpacesList();
	},

    _generateLegendSpacesList: function() {
		if (!this._showBySelectedItem || !this.spaces) {
			this._setLegendSpaces(new Array());
			return;
		}

		var showBy = this._showBySelectedItem;
		var filterBy = this._filterBySelectedItem;
		var legendSpacesById = {};

		for (var i = 0; i < this.spaces.length; i++) {
			var space = this.spaces[i];
			
			var spaceId = this._getSpaceId(space);
			if (!spaceId) {
				continue;
			}

			if (!showBy._satisfyShowBy(space)) {
				continue;
			}

			if (filterBy) {
				if (!filterBy._satisfyFilterBy(space, spaceId)) {
					continue;
				}
			}
			
			if (!(spaceId in legendSpacesById)) {
				legendSpacesById[spaceId] = {};
				legendSpacesById[spaceId].id = spaceId;
				legendSpacesById[spaceId].classNumber = showBy.classNumber;
				legendSpacesById[spaceId].fillOpacity = this._getOpacity(showBy, spaceId);
				legendSpacesById[spaceId].color = {values:new Array(),direction:"horizontal"};
			}
			legendSpacesById[spaceId].color.values.push(showBy._getShowByColor(space));
		}

		var _legendSpaces = new Array();
		for (var recordId  in legendSpacesById) {
			_legendSpaces.push(legendSpacesById[recordId]);
		}
		this._setLegendSpaces(_legendSpaces);
	},

    _getSpaceId: function(space) {
		var spaceId = this.get(this.spaceIdAttributeName, space);
		if (!spaceId) {
			console.log("Space id not found.[space=" + space + ", spaceIdAttributeName:" + this.spaceIdAttributeName + "]");
		}
		
		return spaceId;
	},

    _getOpacity: function(showBy, spaceId) {
		if (showBy.maskUnavailableSpaces) {
			var availableSpace = null;
			if (this.availableSpaces) {
				availableSpace = this.availableSpaces.find(
									function(space) {
										return spaceId == this._getSpaceId(space);
									}, this
								 );
			}
			return availableSpace ? showBy.opacity : showBy.opacityForUnavailableSpaces;
		} else {
			return showBy.opacity;
		}
	},

    _isEqual: function(stringA, stringB) {
		if (!stringA || ! stringB) {
			return false;
		}
		return stringA.toUpperCase() === stringB.toUpperCase();
	},

    _handleOpenedChange: function() {
		this.toggleClass("legend-expanded", this.opened, this);	
	},

    _handleBarTap: function () {
		this.opened = !this.opened;
	},

    /**
	 * Listen for track events on the legend if the swipe is not disabled.
	 */
	_disableSwipeChanged: function(newDisableSwipe, oldDisableSwipe) {
		if(newDisableSwipe){
			this.unlisten(this, "track", "_onTrack");
		} else {
			this.listen(this, "track", "_onTrack");
		} 
	},

    /**
	 * Handles track events for controlling swipe movements.
	 */
	_onTrack: function(event) {
		switch (event.detail.state) {
			case 'start':
			  this._trackStart(event);
			  break;
			case 'track':
			  this._trackX(event);
			  break;
			case 'end':
			  this._trackEnd(event);
			  break;
		}
	},

    _trackStart: function(event) {
		this._set_dragStartedOnBar(event.target == this.$.legendBar);
		this._setDragging(true);
		this.width = this.offsetWidth;
	},

    /**
	 * Changes the legend width only if the swipe movement started on the legend bar.
	 */
	_trackX: function(event) {
		if (this.dragging && this._dragStartedOnBar) {
			var dx = event.detail.dx;
			this._changeLegendSize(this._calculateWidth(dx));
		}
	},

    /**
	 * Calculates the legend width based on the horizontal distance of the swipe movement.
	 * The returned width will be between the legend min and max width.
	 */
	_calculateWidth: function(dx) {
		var width = this.width;
		if (this._isLeftBar()) {
			width += this._isRTL ? dx : -dx;
		} else {
			width += this._isRTL ? -dx : dx;
		}
		return Math.max(this._legendMinWidth, Math.min(this._legendMaxWidth, width));
	},

    _changeLegendSize: function(width) {
		if (width) {
			this.style.width = width+"px";
		} else {
			this.style.width = null;
		}
	},

    /**
	 * Completes the swipe movement if it was bigger than the swipe threshold.
	 * Otherwise, cancels the swipe.
	 */
	_trackEnd: function(event) {
		if (this.dragging) {
			this._setDragging(false);
			this._set_dragStartedOnBar(false);
			this._changeLegendSize(null);

			if (this._validateSwipeDistance(event.detail.dx)) {
				var positiveDirection = this._isRTL ? event.detail.dx < 0 : event.detail.dx > 0;
				this.opened = this._isLeftBar() ? !positiveDirection : positiveDirection;
			}
		}
	},

    _isLeftBar: function() {
		return this.position === 'left';
	},

    /**
	 * Checks if the user has swipe far enough
	 * Returns true if the threshold was met, otherwise returns false.
	 */
	_validateSwipeDistance: function(dx) {
		return Math.abs(dx) >= this.swipeThreshold;
	},

    _handlePositionChange: function(newPosition , oldPosition) {
		this.toggleClass("legendBarRight", newPosition == "right", this.$.legendBar);
		this.toggleClass("legendBarLeft", newPosition == "left", this.$.legendBar);
		this.toggleClass("legendBarRight", newPosition == "right", this.$.legendSections);
		this.toggleClass("legendBarLeft", newPosition == "left", this.$.legendSections);
	},

    behaviors: [TriDirBehavior]
});