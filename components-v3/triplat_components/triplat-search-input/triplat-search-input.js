/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../triplat-icon/triplat-icon.js";
import "../@polymer/iron-input/iron-input.js";
import { IronResizableBehavior } from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { TriplatKeyboardBehavior } from "../triplat-keyboard-behavior/triplat-keyboard-behavior.js";
import "./triplat-search-menu.js";
import "./triplat-search-mobile-filters.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
A styled input box that has a search icon and a clear button.

	 <triplat-search-input value="{{searchValue}}" placeholder="Search people">
	 </triplat-search-input>

There is also an enhanced search input, which provides new functionalities. In order to use it, refer to this following code. Make sure you are defining proper "data", "aliases" and "append-filters" properties. They are required for the enhanced search input. The "max-header-children" property is optional (Default is 3).

	 <triplat-search-input value="{{searchValue}}" placeholder="Search people"
		data="{{searchData}}" aliases="{{aliases}}" append-filters="{{appendFilters}}" 
		max-header-children="2"></triplat-search-input>

### Best Practices
<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
  <b>Note:</b> You may want to refer to the `triplat-ds` and `triplat-query` documentation pages if you're not sure how to differentiate client-side and server-side filtering. The following best practices assume that you have some prior knowledge of data sources, queries and filters.
  </div>
</div>
#### 1. Think about the way you want to manage data.
Assigning data directly from `triplat-ds` to `triplat-search-input` is fine. However, handling large data sets (100k+) will become slow if you use <b>client-side</b> filtering since it is the <b>only filtering method supported</b> by `triplat-search-input`. If that is the case, you should try rethinking your design to make sure you really need that much data loaded at once and <b>you are willing to accept a slower performance</b>.

Example:
	
	<triplat-ds id="peopleDs" name="people"
		data="{{people}}"
		filtered-data="{{filteredPeople}}">
		<triplat-query append-filters="{{appendFilters}}">
		</triplat-query>
	</triplat-ds>

	<triplat-search-input
		placeholder="Search Employee"
		data="{{people}}"
		aliases="{{aliases}}"
		append-filters="{{appendFilters}}"
		max-header-children="3">
	</triplat-search-input>

	<template is="dom-repeat" items="{{filteredPeople}}">
		<div>Name: {{item.firstName}}</div>
	</template>

#### 2. <b>Server-side filters</b> can help you.
If your data is big enough, you should consider using <b>server-side</b> filters to paginate the data and perform initial filtering. Then, you need to create `triplat-query` outside of `triplat-ds` to consume the data from `triplat-ds` and handle <b>client-side</b> filtering. This way, `triplat-query` will provide the filtered data you want to show while `triplat-ds` will provide the input data (filtered on the server side already) for `triplat-search-input`.

Example:
	
	<triplat-ds id="peopleDs" name="people"
		data="{{people}}">
		<triplat-query>
			<triplat-query-page id="peopleDsPage" 
				size="50"
				current-page="{{currentPage}}"
				total-pages="[[totalPages]]">
			</triplat-query-page>
			<triplat-query-filter 
				name="title"
				operator="contains"
				value="Software Engineer"
				ignore-if-blank>
			</triplat-query-filter>
			<triplat-query-sort name="firstName"></triplat-query-sort>
		</triplat-query>
	</triplat-ds>

	<triplat-query append-filters="{{appendFilters}}"
		data="{{people}}" filtered-data-out="{{filteredPeopleClientSide}}">
	</triplat-query>

	<triplat-search-input
		placeholder="Search Employee"
		data="{{people}}"
		aliases="{{aliases}}"
		append-filters="{{appendFilters}}"
		max-header-children="3">
	</triplat-search-input>

	<template is="dom-repeat" items="{{filteredPeopleClientSide}}">
		<div>Name: {{item.firstName}}</div>
	</template>

#### 3. Use <b>aliases</b> wisely for fine-tuned user search.
Sometimes, you don't need all of the fields in the data source to be used during the search. Make sure the <b>aliases</b> object contains only the properties/columns you would like to search against. This way, you will create useful headers for the user and increase performance significantly.

#### 4. Identify the best <b>max-header-children</b> number for your use case.
Ensure you're using the property according to your needs, taking into account the most common screen size so that you can provide a friendly user experience, with minimal user scroll actions. Also, defining a smaller number will give a faster performance when searching. Keep in mind that you will always have the <b>Show More</b> option if there are more records than the number you define for <b>max-header-children</b> so that the user will still have control over all records for a header.

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-search-input-primary-text-color` | Primary text color | `white`
`--triplat-search-input-border-color` | Input border bottom color | `--tri-primary-color`
`--triplat-search-input-border-height` | Input border bottom height | `2px`
`--triplat-search-input-search-icon-color` | Input search icon color | `--tri-primary-content-label-color`
`--triplat-search-input-clear-icon-color` | Input clear icon color | `--tri-primary-content-label-color`
`--triplat-search-input-filter-background-color` | Background color of a filter element | `--ibm-neutral-2`
`--triplat-search-input-filter-text-color` | Text color of a filter element | `--tri-primary-content-color`
`--triplat-search-input-operator-equals-icon-color` | Operator equals color | `--tri-primary-color`
`--triplat-search-input-filter-operator-background-color` | Operator background color of a filter element | `--tri-primary-color`
`--triplat-search-input-filter-remove-icon-color` | Remove icon color of a filter element | `--tri-primary-content-label-color`
`--triplat-search-input-dropdown-header-background-color` | Background color of a header in the dropdown | `--tri-primary-color-60`
`--triplat-search-input-dropdown-header-text-color` | Text color of a header in the dropdown | `--tri-primary-light-color`
`--triplat-search-input-dropdown-item-background-color` | Background color of an item in the dropdown | `--tri-primary-color`
`--triplat-search-input-dropdown-item-border-color` | Border color of an item in the dropdown | `--tri-primary-color-40`
`--triplat-search-input-hover-border-color` | Border color when hovering over an item in the dropdown | `white`
`--triplat-search-input-dropdown-footer-background-color` | Background color of the footer in the dropdown | `--tri-primary-dark-color`
`--triplat-search-input-dropdown-footer-deselect-text-color` | Text color of the 'deselect all' option in the dropdown | `--tri-primary-light-color`
`--triplat-search-input-filters-icon-color` | Filters icon color | `--tri-primary-color`
`--triplat-search-input-expand-filters-number-color` | Filters number color | `--ibm-orange-50`
`--triplat-search-input-expand-filters-icon-color` | Expand filters icon color | `--tri-primary-color`
`--triplat-search-input-close-filters-icon-color` | Close filters icon color | `--tri-primary-color`
`--triplat-search-input-expand-filters-remove-icon-color` | Remove filter icon color | `--tri-primary-color`
`--triplat-search-input-expand-filters-background-color` | Background color of a filter in the expand filters container | `--tri-primary-color-10`
`--triplat-search-input-dropdown-footer-deselect-text-color` | Text color of the 'deselect all' option in the dropdown | `--tri-primary-light-color`
`--triplat-search-input` | Mixin applied to the search input | `{}`
`--triplat-search-input-filter-elements-container` | Mixin applied to the filter elements container | `{}`
`--triplat-search-input-dropdown-header` | Mixin applied to a header in the dropdown | `{}`
`--triplat-search-input-dropdown-item` | Mixin applied to an item in the dropdown | `{}`
`--triplat-search-input-dropdown-footer-container` | Mixin applied to the footer container in the dropdown | `{}`
`--triplat-search-input-expand-filters-container` | Mixin applied to the expand filters container | `{}`
`--triplat-search-input-input` | Mixin applied to the input field | `{}`
`--triplat-search-input-placeholder` | Mixin applied to the placeholder | `{}`

Styling the button in the dropdown footer is also possible. Refer to the 3rd party `--paper-button` mixin.


@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment tristyles-theme">

		
		:host {
			--triplat-search-input-text-color: var(--triplat-search-input-primary-text-color, white);      
		}
		
		#inputContainer {
			@apply --layout;
				@apply --layout-horizontal;
			@apply --layout-flex;
			padding-left: 5px;
				background-color: rgb(255,255,255);
				border-bottom: var(--triplat-search-input-border-height, 2px) solid var(--triplat-search-input-border-color, var(--tri-primary-color));
			height: 44px;
			font-size: 12px;
			font-family: var(--tri-font-family);
			@apply --triplat-search-input;
		}

			triplat-icon.search-icon {
				min-width: 22px; 
				min-height: 22px;
				padding: 11px;
				color: var(--triplat-search-input-search-icon-color, var(--tri-primary-content-label-color));
			}
		
			triplat-icon.clear-icon {
				min-width: 22px; 
				min-height: 22px;
				padding: 11px;
				color: var(--triplat-search-input-clear-icon-color, var(--tri-primary-content-label-color));
				cursor: pointer;
			}
		
		triplat-icon.filters-icon {
				min-width: 24px; 
				min-height: 24px;
				color: var(--triplat-search-input-filters-icon-color, var(--tri-primary-color));
			}
		
		triplat-icon.filters-expand-icon {
				width: 16px; 
				height: 16px;
				color: var(--triplat-search-input-expand-filters-icon-color, var(--tri-primary-color));
				cursor: pointer;
			}
		
		triplat-icon.filters-close-icon {
				width: 16px; 
				height: 16px;
				color: var(--triplat-search-input-close-filters-icon-color, var(--tri-primary-color));
				cursor: pointer;
			}
		
		:host([dir="rtl"]) triplat-icon.filters-icon,
		:host([dir="rtl"]) triplat-icon.filters-expand-icon,
		:host([dir="rtl"]) triplat-icon.filters-close-icon{
			transform: scaleX(-1);
		}
		
		triplat-icon.equals-icon {
			min-width: 24px; 
			min-height: 24px;
			color: var(--triplat-search-input-operator-equals-icon-color, white);
			margin: 10px;
		}
		
			.search-input {
				@apply --layout-flex;
				border: none;
				background-color: inherit;
				width: 100%;
				min-width: 20px;
				color: var(--tri-primary-content-label-color);
				font-size: 12px;
				height: 44px;
				padding: 0;
				margin: 0;
				outline: none;
				@apply --triplat-search-input-input;
			}

			input::placeholder {
				@apply --triplat-search-input-placeholder;
			}

			.search-input::-ms-clear, .search-input::-ms-reveal {  
				display: none; 
				width : 0; 
				height: 0; 
			}
		
		.filters {
			@apply --layout;
				@apply --layout-horizontal; 
			margin-bottom: 3px;
			@apply --triplat-search-input-filter-elements-container;
		}
		
		.group {
			@apply --layout;
				@apply --layout-horizontal; 
			background-color: var(--triplat-search-input-filter-background-color, var(--ibm-neutral-2));
			color: var(--triplat-search-input-filter-text-color, var(--tri-primary-content-color));
		}
		
		:host([dir="ltr"]) .group {
			margin-left: 0px;
			margin-right: 10px;  
		}
		
		:host([dir="rtl"]) .group {
			margin-left: 10px;
			margin-right: 0px;  
		}
		
		.filters div span {
			margin-left: 1px;
			vertical-align: middle;
			line-height: 40px;
			word-break: break-all;
			overflow: hidden;
		}
		
		.operator {
			background-color: var(--triplat-search-input-filter-operator-background-color, var(--tri-primary-color));
			min-width: 40px;
			min-height: 40px;
		}
		
		:host([dir="ltr"]) .operator {
			margin-left: 0px;
			margin-right: 5px;  
		}
		
		:host([dir="rtl"]) .operator {
			margin-left: 5px;
			margin-right: 0px; 
		}
		
		.filters div div.clearfilter {
			min-width: 40px;
			min-height: 40px;
			margin-right: 0; 
		}
		
		.filters div div.clearfilter triplat-icon {
			min-width: 24px; 
			min-height: 24px;
			margin: 8px;
			color: var(--triplat-search-input-filter-remove-icon-color, var(--tri-primary-content-label-color));
			cursor: pointer; 
		}
		
		.filters div triplat-icon:focus{
			background-color:rgba(0, 0, 0, 0.07);
		}
		
		.filters-action {
			@apply --layout-horizontal;
			height: 24px;
			margin: 10px 0px;
		}
		
		:host([dir="ltr"]) .filters-action {
			border-left: 1px solid var(--ibm-gray-10);
			border-right: none;
			padding: 0px 0px 0px 10px;
		}
		
		:host([dir="rtl"]) .filters-action {
			border-left: none;
			border-right: 1px solid var(--ibm-gray-10);
			padding: 0px 10px 0px 0px;
		}
		
		.filters-number-badge {
			margin-top: -5px;
		}
		
		.filters-number-badge-text {
			font-family: var(--tri-font-family);
			font-size: 16px;
			color: var(--triplat-search-input-expand-filters-number-color, var(--ibm-orange-50));
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;    
		}
		
			
			input {
		
			@apply --paper-input-container-shared-input-style;
		
		}
		
		
		</style>

		<div id="inputContainer">
			<template is="dom-if" if="{{searchIconPrecede}}">
				<triplat-icon class="search-icon" icon="search"></triplat-icon>
			</template>
			<template is="dom-if" if="{{!_mobileView}}">
				<div class="filters" id="filtersContainer">
					<template is="dom-repeat" items="{{_filters}}" as="filter" on-dom-change="_controlView">
						<div class="group">
							<div class="operator" title="Equals">
								<triplat-icon class="equals-icon" icon="ibm-glyphs:equals"></triplat-icon>
							</div>
							<template is="dom-repeat" items="{{filter.value}}" as="value">
								<span hidden\$="{{_computeHidden(index)}}">,</span>
								<span>{{value}}</span>
							</template>
							<div class="clearfilter">
								<triplat-icon icon="remove-delete" tabindex="0" on-keydown="_handleActionKeyDown" on-tap="_handleFilterDelete" description="Clear filter"></triplat-icon>
							</div>
						</div>
					</template>
				</div>
			</template>
			<iron-input id="inputField" class="search-input" bind-value="{{_value}}">
				<input id="input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="search-input" placeholder="{{placeholder}}" aria-label\$="{{placeholder}}">
			</iron-input>
			<triplat-icon class="clear-icon" icon="ibm-glyphs:clear-input" hidden="{{!_showClear}}" on-tap="_clearSearch" tabindex="0" on-keydown="_handleActionKeyDown" description="Clear all filters"></triplat-icon>
			<template is="dom-if" if="{{!searchIconPrecede}}">
				<triplat-icon class="search-icon" icon="search"></triplat-icon>
			</template>
			<template is="dom-if" if="{{_mobileView}}">
				<div class="filters-action">
					<triplat-icon class="filters-icon" icon="ibm-glyphs:filter" id="filters-icon"></triplat-icon>
					<div class="filters-number-badge">
						<span class="filters-number-badge-text">{{_selectedTotal}}</span>
					</div>
					<triplat-icon class="filters-expand-icon" icon="ibm-glyphs:expand-open" tabindex="0" hidden\$="{{_filtersOpen}}" on-tap="_openFiltersMenu" description="Open all filters" on-keydown="_handleActionKeyDown" id="expandIcon"></triplat-icon>
					<triplat-icon class="filters-close-icon" icon="ibm-glyphs:expand-close" tabindex="0" hidden\$="{{!_filtersOpen}}" on-tap="_closeFiltersMenu" description="Close all filters" on-keydown="_handleActionKeyDown" id="closeIcon"></triplat-icon>
				</div>
			</template>
		</div>
		<triplat-search-menu id="searchMenu" value="{{_value}}" data="{{data}}" aliases="{{aliases}}" max-header-children="{{maxHeaderChildren}}" delay="{{delay}}"></triplat-search-menu>
		<triplat-search-mobile-filters id="mobileFilters" filters="{{_filters}}"></triplat-search-mobile-filters>
	`,

    is: "triplat-search-input",
    behaviors: [TriplatKeyboardBehavior, IronResizableBehavior, TriDirBehavior],

    properties: {
		
		/**
		 * Value of the search box.
		 */
		value: {
			type: String,
			notify: true,
			readOnly: false
		}, 

		/**
		 * Label to display when no search value has been entered. The default value is 'Type to search'
		 */
		placeholder: {
			type: String
		},
		
		/**
		 * Flag to indicate that you want the search icon precede the input field. 
		 * If not specified, the icon will succeed the input field. 
		 */
		searchIconPrecede: {
			type: Boolean,
			value: false
		},
		
		/**
		 * Object containing the data you would like to filter against. It is the
		 * "filtered-data" returned by "triplat-ds" or the "data" returned by "triplat-query".
		 */
		data: Object,
		
		/**
		 * This object holds information about the headers in the
		 * search menu. If an alias is not provided for any of the
		 * available fields in a data source, that field will be skipped
		 * from the display.
		 */
		aliases: {
			type: Object,
			value: () => { return {};},
			readOnly: false
		},
		
		/**
		 * This array represents all filters that will be
		 * automatically created into the "triplat-ds" or 
		 * "triplat-query". The same binding should exist in the
		 * "triplat-query" element associated to this search.
		 */
		appendFilters: {
			type: Array,
			notify: true,
			value: () => { return [];}
		},
		
		/**
		* Number of maximum children under each header in
		* the search input dropdown.
		*/
		maxHeaderChildren: {
			type: Number,
			value: 3
		},
		
	   /**
		 * The amount of delay between the time (milliseconds) a single letter is typed, 
		 * and the time the dropdown show results.
		 * 
		 * This delay is needed so we can wait a bit after presenting the results list in 
		 * the dropdown. This way we can achieve better performance, skipping searchs against
		 * single letters.
		 */
		delay: {
			type: Number,
			notify: false,
			readOnly: false,
			value: 200
		},
		
		/**
		 * Set to true to scroll the search input element into view (on focus). If scroll is available, it will align the element to the top of the browser window (if possible).
		 * The scroll into view is applied on mobile devices only, where screens are small and the virtual keyboard takes much of the screen area.
		 */
		 scrollElementIntoView: {
		  type: Boolean,
		  value: false
		},
		
		_value: {
			type: String,
			readOnly: false,
			observer: "_handleInternalValueChanged"
		}, 
		
		_placeholder: {
			type: String,
			readOnly: true
		},
		
		_filters: {
			type: Array,
			value: () => { return [];}
		},
		
		_showClear: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_mobileView: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_filtersOpen: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_selectedTotal: {
			type: Number,
			value: 0,
			readOnly: true
		},
		
		_focusedByKeyboard: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_focused: {
			type: Boolean, 
			value: false
		},
		
		_boundOnFocus: {
			type: Function,
			value: function() {
				return this._onFocus.bind(this);
			}
		},

		_boundOnBlur: {
			type: Function,
			value: function() {
				return this._onBlur.bind(this);
			}
		}
	},

    listeners : {
		"triplat-search-menu-value-changed" : "_handleValueChanged",
		"triplat-search-menu-items-selected" : "_handleItemsSelected",
		"triplat-search-menu-user-typed" : "_handleUserTyped",
		"triplat-search-menu-universal-search": "_handleUniversalSearch",
		"triplat-search-mobile-filters-delete": "_handleFilterDeleteFromOverlay",
		"triplat-search-mobile-filters-delete-all": "_clearSearch",
		"iron-resize": "_controlView"
	},

    observers: ["_filtersChanged(_filters.*)"],

    ready: function() {
		var __dictionary__default_placeholder =  "Type to search";
		if (this.placeholder == null || this.placeholder.length == 0) {
			this.placeholder = __dictionary__default_placeholder;
		}
		this._set_placeholder(this.placeholder);
		this.listen(this.$.inputField, "keydown", "_handleInputKeyDown");
		this.listen(this.$.mobileFilters, "iron-overlay-canceled", "_handleFiltersOverlayCancel");
		this.addEventListener("focus", this._boundOnFocus, true);
	    this.addEventListener("blur", this._boundOnBlur, true);
	},

    _computeHidden: function(index){
		return (index == 0);   
	},

    _handleInputKeyDown: function(e){
		if(e.keyCode == this._ARROW_DOWN) {
			this.$.searchMenu.focusFirstElement();
			e.preventDefault();
		}
		
		if(e.keyCode == this._ENTER){
			this.$.searchMenu.handleUniversalSearch();  
			e.preventDefault();
		}
		
	},

    _handleActionKeyDown: function(e){
		this._set_focusedByKeyboard(true);
		if(e.keyCode == this._ENTER || e.keyCode == this._SPACE) {
			e.target.click();
			e.preventDefault();   
		}
	},

    _handleUserTyped: function(){
		this.$.inputField.focus();
	},

    /**
	 * Clears all filters and values in the search input. It will also refresh
	 * the list of records associated to this component.
	 */
	clearSearch: function(){
		this._clearSearch();    
	},

    _clearSearch: function() {
		this.value = "";
		this._filters = [];
		this.splice("appendFilters", 0, this.appendFilters.length);
		this._set_showClear(false);
		this._resetFiltersState(this._placeholder);
		this.$.searchMenu.removeAllSelected();
		this._set_mobileView(false);
	},

    _handleValueChanged: function(e){
		if(!this._mobileView){
			this._set_showClear(true);
		}
		this.$.searchMenu.openMenu(this.$.inputContainer.getBoundingClientRect().width);
	},

    _handleInternalValueChanged: function(value){
		this.value = value;
		// For old search compatibility
		if(value != "" && !this._mobileView){
			this._set_showClear(true);   
		} else {
			this._set_showClear(false);
			if(this._filters.length > 0 && !this._mobileView){
				this._set_showClear(true);
			}
			this.$.searchMenu.closeMenu();
		}
	},

    _handleItemsSelected: function(e){
		this.splice("appendFilters", 0, this.appendFilters.length);
		this._set_mobileView(false);
		var filters = e.detail.filters;
		var stringWithId = e.detail.stringWithId;
		this._filters = [];
		var fields = Object.keys(filters);
		for(var field in fields){
			var isStringWithId = (stringWithId.indexOf(fields[field]) != -1);
			this.push("_filters", { field: fields[field], value: filters[fields[field]],
								  isStringWithId: isStringWithId});
		}
		this._resetFiltersState("");
		if(fields.length > 0){
			this._set_showClear(true);
		}
		
		this._set_selectedTotal(this._filters.length)
	},

    _controlView: function(e){
    	e.stopPropagation();
		if(this._filters.length > 0){
			this._set_mobileView(false);
			this._set_showClear(true);
			this.async(this._handleMobileView);
		} else {
			this.$.mobileFilters.close();
			this._set_filtersOpen(false);
			if(this._mobileView){
				this._set_mobileView(false);
			}
		}
		let delay = this._isMobileDevice() ? 400 : 0;
		this.async(() => {
			var newWidth = this.$.inputContainer.getBoundingClientRect().width;
			if (this.$.searchMenu.opened) this.$.searchMenu.resizeDropdown(newWidth);
			if (this.$.mobileFilters.opened) this.$.mobileFilters.resizeDropdown(newWidth);
			if (this._focused && this._isMobileDevice() && this.scrollElementIntoView) this.$.input.scrollIntoView(true);
		}, delay);
	},
	
	_isMobileDevice: function () {
		return navigator.userAgent.match(/Android/i)
			 || navigator.userAgent.match(/iPhone/i)
			 || navigator.userAgent.match(/iPad/i)
			 || navigator.userAgent.match(/iPod/i);
	},

    _handleMobileView: function(){
		var inputWidth = this.$.inputContainer.offsetWidth;
		var filtersWidth = this.$$("#filtersContainer").offsetWidth;
		var remainingWidth = inputWidth - filtersWidth;
		if(remainingWidth < 150){
			this._set_mobileView(true);
			this._set_showClear(false);
		} else {
			this.$.mobileFilters.close();
			this._set_filtersOpen(false);
			this.$.inputField.focus();
		}
	},

    _resetFiltersState: function(placeholder){
		this._value = "";
		this.placeholder = placeholder;
		this.$.inputField.focus();
	},

    _handleFilterDelete: function(e){
		var filter = e.model.filter;
		this._doFilterDelete(filter);
	},

    _handleFilterDeleteFromOverlay: function(e){
		var filter = e.detail.filter;
		if (this._filters.length == 1) {
			this._clearSearch();
		} else {
			this._doFilterDelete(filter);
			this.$$("#closeIcon").focus();
		}
	},

    _doFilterDelete: function(filter){
		var index = this._filters.indexOf(filter);
		if(index != -1){
			this.splice("_filters", index, 1);
		}
		if(this._filters.length == 0){
			this.placeholder = this._placeholder;   
			this._set_showClear(false);
		}
		this.$.inputField.focus();
		this._set_selectedTotal(this._filters.length)
	},

    _filtersChanged: function(change){
		if(change.path == "_filters.splices"){
			var indexSplice = change.value.indexSplices[0];
			indexSplice.removed.forEach(function(removed) {
				this._removeFilter({
					name: removed.field,
					operator: "equals",
					value: removed.value
				});
				removed.value.forEach(function(elem){
					this.$.searchMenu.removeSelected(removed.field+"_"+elem);
				}, this);
			}, this);
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				this._addFilter({
					name: added.field,
					operator: "equals",
					value: added.value,
					isStringWithId: added.isStringWithId,
					appendWithAnd: true
				});
			}
		}
	},

    _addFilter: function(filter){
		this.push("appendFilters", filter);  
	},

    _removeFilter: function(filterOut){
		var index = -1;
		this.appendFilters.forEach(function(filterIn){
			if(filterIn.name == filterOut.name &&
			   filterIn.operator == filterOut.operator &&
			   filterIn.value == filterOut.value){
				   index = this.appendFilters.indexOf(filterIn);
			}
		}, this);
		if(index > -1){
			this.splice("appendFilters", index, 1);
		}
	},

    _handleUniversalSearch: function(e){
		this._removeUniversalFilter();
		if(this._value != ""){
			var universalFilter = { isUniversal: true, filters: [] };
			var columns = Object.keys(this.aliases);
			var stringWithId = e.detail.stringWithId;
			columns.forEach(function(column, index){
				var isStringWithId = (stringWithId.indexOf(column) != -1);
				var appendWithAnd = (index == 0) ? true : false;
				universalFilter.filters.push({
					name: column,
					operator: "contains",
					value: this._value,
					isStringWithId: isStringWithId,
					appendWithAnd: appendWithAnd
				});
			}, this);
			this._addFilter(universalFilter);
		}
	},

    _removeUniversalFilter: function(){
		var index = this._universalFilterIndex;
		if(index != -1){
			this.splice("appendFilters", index, 1);    
		}
	},

    get _universalFilterIndex(){
		for(var i = 0; i < this.appendFilters.length; i++){
			if(this.appendFilters[i].isUniversal){
				return i;    
			}
		}
		return -1;
	},

    _openFiltersMenu: function(){
		this.$.mobileFilters.openDropdown(this.$.inputContainer.getBoundingClientRect().width); 
		this._set_filtersOpen(true);
		if(this._focusedByKeyboard){
			this.$$("#closeIcon").focus();
		}
	},

    _closeFiltersMenu: function(){
		this.$.mobileFilters.close();
		if(this._focusedByKeyboard){
			this.$$("#expandIcon").focus();
		}
	},

    _handleFiltersOverlayCancel: function(){
		this._set_filtersOpen(false);
	},

    /**
	 * Restores a previous state of the search input. It will create filter containers in the field again
	 * and will refresh the list of records.
	 * 
	 * @param {Array} filters The filters we want to restore in this component.
	 * Usually, it is the "append-filters" value stored before we clear the search.
	 */
	restoreFilters: function(filters){
		this._clearSearch();
		var noFilters = true;
		filters.forEach(function(filter){
			if(!filter.isUniversal){
				noFilters = false;
				this.push("_filters", { field: filter.name, value: filter.value,
						  isStringWithId: filter.isStringWithId});
				filter.value.forEach(function(filterValue){
					var lookup = filter.name+"_"+filterValue;
					this.$.searchMenu.buildSelection(lookup, {field:filter.name, value: filterValue, checked: true});
				}, this);
			}
		}, this);
		if(!noFilters){
			this._resetFiltersState("");
			this._set_showClear(true);
		}
	},
	
	_onFocus: function() {
		this._focused = true;
	},

	_onBlur: function() {
		this._focused = false;
	}
});