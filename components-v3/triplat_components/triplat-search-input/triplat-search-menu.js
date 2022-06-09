/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { Debouncer } from "../@polymer/polymer/lib/utils/debounce.js";
import { microTask } from "../@polymer/polymer/lib/utils/async.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-scroll-threshold/iron-scroll-threshold.js";
import { TriplatSearchDropdownBehaviorImpl, TriplatSearchDropdownBehavior } from "../triplat-search-dropdown-behavior/triplat-search-dropdown-behavior.js";
import "../triplat-word-highlight/triplat-word-highlight.js";
import { TriplatSearchMenuBehavior } from "./triplat-search-menu-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			
			:host {
				--triplat-search-input-hover-border-color: var(--triplat-search-input-dropdown-item-hover-border-color, white);
				position: relative;
				top: 0px;
				left: 0px;
			}
			
			#main {
				padding-bottom: 3px;
				font-size: 12px;
				position: absolute;
				outline: none;
			}
			
			.results {
				overflow: auto; 
			}
			
			ul {
				margin: 0;
				padding: 0;
				background-color: var(--triplat-search-input-dropdown-item-background-color, var(--tri-primary-color));
			}
			
			li{
				list-style: none;
			}
			
			.header {
				@apply --layout;
				@apply --layout-horizontal;
				@apply --layout-flex;
				min-height: 44px;
				background-color: var(--triplat-search-input-dropdown-header-background-color, var(--tri-primary-color-60));
				@apply --triplat-search-input-dropdown-header;
			}
			
			.header-text {
				position: relative;
				font-weight: 200;
				@apply --layout-self-center;
				margin: 9px;
			}
			
			.header-title {
				@apply --layout-flex-10;
				color: var(--triplat-search-input-dropdown-header-text-color, var(--tri-primary-light-color));
				text-transform: uppercase;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.header-counter {
				position: absolute;
				color: var(--triplat-search-input-text-color);
				font-weight: bold;
				margin-left: 5px;
				margin-right: 0px;
			}
			
			:host([dir="rtl"]) .header-counter {
				margin-left: 0px;
				margin-right: 5px;
			}
			
			.header-option {
				@apply --layout-flex-1;
				color: var(--triplat-search-input-text-color);
				margin-right: 9px;
			}
			
			.header-option:hover, .header-option:focus{
				text-decoration: underline;
				cursor: pointer;
				outline: none;
			}

			.child {
				@apply --layout-horizontal;
				@apply --layout-flex;
				min-height: 54px;
				margin: 0 9px;
				background-color: var(--triplat-search-input-dropdown-item-background-color, var(--tri-primary-color));
				border-bottom: 1px solid var(--triplat-search-input-dropdown-item-border-color, var(--tri-primary-color-40)); 
				@apply --triplat-search-input-dropdown-item;
			}
			
			.child-text{
				@apply --layout-flex-11;
				font-size: 14px;
				color: var(--triplat-search-input-text-color);
				@apply --layout-self-center;
				vertical-align: middle;
				font-weight: 200;
				overflow: hidden;
				text-overflow: ellipsis;
				pointer-events: none;
			}
			
			.child-checkbox{
				@apply --layout-flex-1;
				@apply --layout-self-center;
				margin-left: 9px;
				margin-right: 0px;
				--paper-checkbox-unchecked-color: var(--triplat-search-input-text-color);
				--paper-checkbox-checked-color: var(--tri-primary-dark-color);
			}
			
			:host([dir="rtl"]) .child-checkbox {
				margin-left: 0px;
				margin-right: 9px;
			}
			
			.child:hover, .child:focus {
				outline: none;
				margin: 0;
				margin-top: -1px;
				padding: 0 9px;
				cursor: pointer;
				border-bottom: 1px solid var(--triplat-search-input-hover-border-color);
				border-top: 1px solid var(--triplat-search-input-hover-border-color);  
			}
			
			li:last-of-type{
				border-bottom: 1px solid rgba(0,0,0,0);   
			}
			
			.footer-container{
				@apply --layout-horizontal;
				@apply --layout-flex;
				@apply --layout-end-justified;
				height: 54px;
				padding-right: 10px;
				background-color: var(--triplat-search-input-dropdown-footer-background-color, var(--tri-primary-dark-color));
				@apply --triplat-search-input-dropdown-footer-container;
			}

			:host([dir="rtl"]) .footer-container {
				padding-right: 0px;
				padding-left: 10px;
			}
			
			.footer-text {
				line-height: 44px;
				margin: 5px 0;
			}
			
			.footer-selected-text{
				font-size: 14px;
				color: var(--triplat-search-input-text-color);
				margin-right: 24px;
				margin-left: 0px; 
			}
			
			:host([dir="rtl"]) .footer-selected-text {
				margin-right: 0px;
				margin-left: 24px;   
			}
			
			.footer-deselect-option {
				font-size: 14px;
				color: var(--triplat-search-input-dropdown-footer-deselect-text-color, var(--tri-primary-light-color));
				margin-right: 12px;
			}
			
			:host([dir="rtl"]) .footer-deselect-option {
				margin-left: 12px;
				margin-right: 0px;
			}
			
			.footer-deselect-option:hover,
			.footer-deselect-option:focus{
				text-decoration: underline;
				outline: none;
				cursor: pointer;
			}
			
			.footer-divider {
				color: var(--tri-primary-light-color);
				font-size: 20px;  
				font-weight:lighter;
			}
			
			.done-button {
				@apply --layout-self-center; 
				padding-left: 24px;
				padding-right: 24px;
				height: 40px;
				border: 2px solid rgba(255,255,255,0.8);
				font-size: 14px;
				color: rgb(255,255,255);
				text-transform: none;
				margin-left: 12px;
				text-align: center;
			}
			
			:host([dir="rtl"]) .done-button {
				margin-right: 12px;
				margin-left: 0px;
			}
			
			.done-button:hover{
				border: 2px solid rgba(255,255,255,1);
				background-color: var(--tri-primary-color);
			}
			
		
		</style>

		<div id="main">
			<template is="dom-if" if="{{_singleHeaderMode}}" id="singleHeaderTemplate" restamp="">
				<div class="header" id="singleHeader">
					<span class="header-text header-title">
						{{_currentHeader.value}}<span class="header-counter">{{_currentHeader.count}}
							<span hidden="{{_isSelectedItemsHidden(_currentHeader, _selected.length, _currentSelected.length)}}">
								({{_computeSelected(_currentHeader.value, _selected.length, _currentSelected.length)}} selected)
								<span hidden="{{_toggleHidden}}">&nbsp;</span>
							</span>
							<span hidden="{{_toggleHidden}}">&nbsp;</span>
						</span>
					</span>
					<span class="header-text header-option" on-tap="_handleBackToAllResults" aria-label="Back to all results">&lt; Back to all results...</span>
				</div>
			</template>
			<div class="results" id="results">
				<template is="dom-repeat" items="{{_fields}}" as="field" id="repeater" filter="{{_filterHeader(_currentHeader)}}">
					<ul role="listbox">
						<template is="dom-if" if="{{!_singleHeaderMode}}">
							<li class="header" role="option" tabindex="0">
								<span class="header-text header-title">
									{{field.value}}<span class="header-counter">{{field.children.length}} 
										<span hidden="{{_isSelectedItemsHidden(field, _currentSelected.length, _selected.length)}}">
											({{_computeSelected(field.value, _currentSelected.length, _selected.length)}} selected)
											<span hidden="{{_toggleHidden}}">&nbsp;</span>
										</span>
										<span hidden="{{_toggleHidden}}">&nbsp;</span>
									</span>
								</span>
								<span class="header-text header-option" hidden="{{_isShowMoreHidden(field.children.length)}}" on-tap="_handleShowMore" aria-label="Show More">Show more...</span>
							</li>
						</template>
						<iron-scroll-threshold on-lower-threshold="_handleThreshold" scroll-target="results" lower-threshold="0" id="threshold">
							<template is="dom-repeat" id="childRepeater" items="{{field.children}}" as="child" filter="{{_limitChildren(_currentHeader, _currentAllowedMax)}}">
								<li class="child" role="option" on-tap="_handleItemSelected">
									<paper-checkbox noink="" tabindex="-1" class="child-checkbox" on-change="_handleItemChange" checked="{{child.checked}}" on-iron-change="_handleIronChange"></paper-checkbox>
									<triplat-word-highlight class="child-text" value="{{child.value}}" search-value="{{value}}"></triplat-word-highlight>
								</li>
							</template>
						</iron-scroll-threshold>
					</ul>
				</template>
			</div>
			<div class="footer-container" id="footerContainer" hidden\$="{{_isFooterHidden(_fields)}}">
				<span class="footer-text footer-selected-text" hidden\$="{{_smallFooter}}">{{_selectedTotal}} SELECTED</span>
				<span class="footer-text footer-deselect-option" on-tap="_handleDeselectAll" tabindex="0" hidden\$="{{_smallFooter}}">Deselect All</span>
				<span class="footer-text footer-divider" hidden\$="{{_smallFooter}}">|</span>
				<paper-button class="done-button tri-disable-theme" noink="" on-tap="_handleDone">Done</paper-button>
			</div>
		</div>
	`,

    is: "triplat-search-menu",
    behaviors: [TriplatSearchDropdownBehavior, TriplatSearchMenuBehavior, TriDirBehavior],

    properties: {
		value: {
			type: String,
			readOnly: false,
			observer: "_handleValueChanged"
		}, 
		
		aliases: {
			type: Object,
			value: () => { return {};},
			readOnly: false
		},
		
		data: {
			type: Object
		},
		
		maxHeaderChildren: {
			type: Number,
			value: 3
		},
		
		delay: {
			type: Number,
			notify: false,
		},
		
		_singleHeaderMode: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_selected: {
			type: Array,
			value: () => { return [];}
		},
		
		_currentSelected: {
			type: Array,
			value: () => { return [];}
		},
		
		_selectedLookup: {
			type: Object,
			value: () => { return {};}
		},
		
		_dataLookup: {
			type: Object,
			value: () => { return {};},
			readOnly: true
		},
		
		_fieldsList: {
			type: Array,
			value: () => { return [];},
			readOnly: true
		},
		
		_fields: {
			type: Array,
			value: () => { return [];},
			readOnly: true
		},
		
		_currentHeader: {
			type: Object, 
			readOnly: true,
			value: function(){
				return {value:""};   
			}
		},
		
		_selectedTotal: {
			type: Number,
			value: 0,
			readOnly: true
		},
		
		 _selectedByField: {
			type: Object,
			value: () => { return {};}
		},
		
		_checkboxesLookup: {
			type: Object,
			value: () => { return {};}
		},
		
		_stringWithIdFields: {
			type: Array,
			value: () => { return [];}
		},
		
		_focusedByKeyboard: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_scrollTopController: {
			type: Number,
			readOnly: true
		},

		_toggleHidden: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
		_matchFields: {
			type: Array,
			value: () => { return [];},
			readOnly: true
		},
		
		_currentAllowedMax: {
			type: Number,
			value: 50,
			readOnly: true
		}
		
	},
	
	observers: ["_handleDataChanged(data.*)"],

    ready: function(){
		this.listen(this, "iron-overlay-canceled", "_handleCancel");
		this.listen(this.$.main, "keydown", "_handleKeyDown");
		this.listen(this.$.singleHeaderTemplate, "dom-change", "_handleDomChange");
		this.closeMenu();
	},

    _forceCounterRender: function(){
		/*
		 * In Microsoft Edge the header counters dont display the new calculated count as the browser does not render them. Hidden/displaying elements within 
		 * the counts elements, effects their sizing and forces the browser to render.
		 */
		this._set_toggleHidden(!this._toggleHidden);
	},

    _handleDomChange: function(e){
		if(this._focusedByKeyboard){
			if(this._singleHeaderMode){
				this._focusFirstElementSingleHeader();
			} else {
				this.async(this.focusFirstElement);
			}
		}
		this.async(this._adjustScroll);
	},

    _filterHeader: function(current){
		if(!current.value){
			return null;   
		}
		return function(header){
			return header.value == current.value;  
		};
	},

    _limitChildren: function(currentHeader, currentAllowedMax){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(!currentHeader.value == ""){
			return function(item){
				return this.items.indexOf(item) < currentAllowedMax;
			};
		}

		var maxHeader = this.maxHeaderChildren;

		return function(item){
			return this.items.indexOf(item) < maxHeader;
		};
	},

    _handleThreshold: function(){
		if(this._singleHeaderMode){
			var max = this._currentAllowedMax;
			this._set_currentAllowedMax(max*2);
		}
		this.$$("#threshold").clearTriggers();
	},

    _isSelectedItemsHidden: function(field){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(this._selectedByField[field.value] > 0){
			return false;
		}

		return true;
	},

    _computeSelected: function(value){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return this._selectedByField[value];
	},

    _isShowMoreHidden: function(childrenLength){
		return childrenLength <= this.maxHeaderChildren;
	},

    _isFooterHidden: function(fields){
		return fields ? fields.length == 0 : true; 
	},

    _handleShowMore: function(e){
		// Open issue - https://github.com/Polymer/polymer/issues/1865
		// e.model is returning the dom-if no the dom-repeat model.
		// Only way to get the model at the moment is this:
		var model = this.$$("#repeater").modelForElement(e.target);
		this._set_currentHeader({value: model.field.value, count: model.field.children.length});
		this._set_singleHeaderMode(true);
		this._set_scrollTopController(this.$.results.scrollTop);
		this.$.results.scrollTop = 0;
		this.fire("iron-resize");
	},

    _handleBackToAllResults: function(e){
		this._set_currentHeader({value:""});
		this._set_singleHeaderMode(false);
		this._set_currentAllowedMax(50);
	},

    _adjustScroll: function(scrollTop){
		this.$.results.scrollTop = this._singleHeaderMode ? 0 : this._scrollTopController;    
	},

    _handleValueChanged: function(value){
		if (this._delayHandle != undefined && this._delayHandle != null) {
			this.cancelAsync(this._delayHandle);
		}
		if(!(value == "")){
			this._delayHandle = this.async(this._doValueChanged, this._intDelay);
		}
	},

    _doValueChanged: function(){
		var value = this.value;
		var fields = [];
		var matchFields = [];
		var selectedTotal = 0;
		if (this._dataLookup) {
			this._fieldsList.forEach(function(field){
				var fieldObj = {value: this.aliases[field], children: [], checked: 0};
				var selectedByField = 0;
				this._dataLookup[field].forEach(function(child){
					if(child.toLowerCase().indexOf(value.toLowerCase()) != -1){
						var checked = this._selectedLookup[field+"_"+child] ? true : false;
						if(checked){
							fieldObj.checked++;
							selectedByField++;
						}
						fieldObj.children.push({value: child, field: field, checked: checked});
					}
				}, this);
				if(fieldObj.children.length > 0){
					fields.push(fieldObj);
					this._selectedByField[this.aliases[field]] = selectedByField;
					selectedTotal += selectedByField;
					matchFields.push(field);
				}
			}, this);
		}
		this._set_selectedTotal(selectedTotal);
		this._set_fields(fields);
		this._set_matchFields(matchFields);
		this.fire("triplat-search-menu-value-changed");
		
		this._forceCounterRender();
		this._handleFFOpenPositionDelay();
	},

	_handleDataChanged: function(){
		this._debounceHandleDataChanged = Debouncer.debounce(
			this._debounceHandleDataChanged, 
			microTask, 
			() => this._set_dataLookup(this._buildDataLookup)
		);

	},

    get _buildDataLookup() {
		if(!this.data || this.data.length == 0){
			return;    
		}
		var fields = Object.keys(this.data[0]);
		var mappedResults = {};
		var fieldsList = [];
		for(var field in fields){
			var fieldName = fields[field];
			if(this.aliases[fieldName]){
				var fieldResults = [];
				this.data.forEach(function(dataRow){
					if(dataRow[fieldName]){
						var fieldValue = dataRow[fieldName];
						var actualValue = fieldValue;
						if(actualValue.value){
							actualValue = actualValue.value;
							if(this._stringWithIdFields.indexOf(fieldName) == -1){
								this._stringWithIdFields.push(fieldName);
							}
						}
						if(typeof actualValue == "string" && fieldResults.indexOf(actualValue) == -1){
							fieldResults.push(actualValue);
						}
					}
				}, this);
				fieldsList.push({"fieldName":fieldName, "alias": this.aliases[fieldName]});
				
				//sorted field results
				mappedResults[fieldName] = fieldResults.sort();
			}
		}
		
		//sort fields list by aliases
		fieldsList.sort(function(field1,field2){
			var alias1 = field1.alias.toLowerCase();
			var alias2 = field2.alias.toLowerCase();
			if(alias1>alias2){
				return 1;
			} else if (alias1<alias2) {
				return -1;
			} else {
				return 0;
			}
		});
		
		// create array of fields names (sorted by their aliases)
		var sortedFieldsNames = [];
		fieldsList.forEach(function(field){
				sortedFieldsNames.push(field.fieldName);
		});
		
		this._set_fieldsList(sortedFieldsNames);
		return mappedResults;
	},

    _handleItemSelected: function(e){
		/* Event propagation is not working as expect. 
		* should find another way out to do this
		*/
		if(e.target.tagName == "LI"){
			dom(e.target).firstElementChild.fire("tap");
		}
	},

    _handleItemChange: function(e){
		var child = e.model.child;
		var lookup = child.field+"_"+child.value;
		if(e.target.checked){
			this.buildSelection(lookup, child);
			this._selectedByField[this.aliases[child.field]]++;
			this._set_selectedTotal(++this._selectedTotal);
			this._checkboxesLookup[lookup] = e.target;
			this.push("_currentSelected", child);
		} else {
			this._selectedByField[this.aliases[child.field]]--;
			this.removeSelected(lookup);
			this._set_selectedTotal(--this._selectedTotal);
			var index = this._searchSelected(child, this._selected);
			if(index != -1){
				this.splice("_selected", index, 1);
			}
			index = this._searchSelected(child, this._currentSelected);
			if(index != -1){
				this.splice("_currentSelected", index, 1);
			}
		}

		this._forceCounterRender();
	},

    _searchSelected: function(child, selected){
		for(var i = 0; i < selected.length; i++){
			var selection = selected[i];
			if(selection.name == child.name && selection.value == child.value) {
				return i;   
			}
		}
		return -1;
	},

    _handleCancel: function(){
		this._currentSelected.forEach(function(selected){
			var lookup = selected.field+"_"+selected.value;
			this._selectedByField[this.aliases[selected.field]]--;
			this.removeSelected(lookup);
			this._set_selectedTotal(--this._selectedTotal);
		}, this);
		this._currentSelected = [];
		this._handleBackToAllResults();
		this._set_focusedByKeyboard(false);
	},

    _handleIronChange: function(e){
		var child = e.model.child;
		if(child && child.checked){
			var lookup = child.field+"_"+child.value;
			this._checkboxesLookup[lookup] = e.target;
		}
	},

    _handleDeselectAll: function(){
		this._deselectSelected(this._selected);
		this._deselectSelected(this._currentSelected);
		this._updateSelections();
		var aux = this.value;
		this.value = "";
		this.value = aux;
	},

    _deselectSelected: function(selected){
		selected.forEach(function(selection){
		var lookup = selection.field+"_"+selection.value;
			if(this._selectedLookup[lookup]){
				this.removeSelected(lookup);
				this._selectedByField[this.aliases[selection.field]]--;
				this._set_selectedTotal(--this._selectedTotal);
				this._checkboxesLookup[lookup].checked = false;   
			}
		}, this); 
	},

    _handleDone: function(){
		var filters = {};
		this._currentSelected.forEach(function(selected){
			this._selected.push(selected);
		}, this);
		this._selected.forEach(function(selection){
			if(!filters[selection.field]){
				filters[selection.field] = [];   
			}
			filters[selection.field].push(selection.value);   
		});
		
		//sort the values in each filter
		var fields = Object.keys(filters);
		for(var field in fields){
			var fieldName = fields[field];
			if(filters[fieldName]!=null && filters[fieldName].length>1){
				filters[fieldName].sort();
			}
		}

		this.fire("triplat-search-menu-items-selected", {
				filters: filters, 
				stringWithId: this._stringWithIdFields});
		
		this._selected = [];
		this._currentSelected = [];
		this._handleBackToAllResults();
		this._set_focusedByKeyboard(false);
		this.close();
	},

    _updateSelections: function(){
		this._currentSelected = [];
		this._selected = [];
		var selections = Object.keys(this._selectedLookup);
		for(var selection in selections){
			var selectedObj = this._selectedLookup[selections[selection]];
			if(this._selected.indexOf(selectedObj) == -1){
				this._selected.push(selectedObj);
			}
		}
	},

    buildSelection: function(lookup, selection){
		this._selectedLookup[lookup] = selection;    
	},

    removeSelected: function(lookup){
		delete this._selectedLookup[lookup];
	},

    removeAllSelected: function(lookup){
		this._selectedLookup = {};
	},

    openMenu: function(inputWidth){
		this._updateSelections();
		this.$.results.scrollTop = 0;
		this._handleBackToAllResults();
		this.resizeDropdown(inputWidth);
		this.open();
		this._handleFFOpenPositionDelay();
	},

    resizeDropdown: function(inputWidth){
		this._resizeDropdown(inputWidth);
		if (this._singleHeaderMode) {
			this.async(() => {
				let singleHeader = this.$$("#singleHeader");
				let headerHeight = singleHeader ? singleHeader.getBoundingClientRect().height : 44;
				this._adjustFooter(inputWidth, headerHeight);
			},10);
		} else {
			this._adjustFooter(inputWidth);
		}
		
	},

    closeMenu: function(inputWidth){
		this.close();
	},

    handleUniversalSearch: function(){
		this.fire("triplat-search-menu-universal-search", {fields: this._matchFields, stringWithId: this._stringWithIdFields}); 
		this.close();
	}
});