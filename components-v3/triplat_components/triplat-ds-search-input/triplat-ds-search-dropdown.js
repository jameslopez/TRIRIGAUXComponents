/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-scroll-threshold/iron-scroll-threshold.js";
import { TriPlatDs } from "../triplat-ds/triplat-ds.js";
import { TriplatSearchDropdownBehaviorImpl, TriplatSearchDropdownBehavior } from "../triplat-search-dropdown-behavior/triplat-search-dropdown-behavior.js";
import "../triplat-word-highlight/triplat-word-highlight.js";
import { TriplatDsSearchDropdownBehavior } from "./triplat-ds-search-dropdown-behavior.js";
import { TriplatDsSearchDatasourceBehavior } from "./triplat-ds-search-datasource-behavior.js";
import { TriplatDsSearchLoadingBehavior } from "./triplat-ds-search-loading-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			
			:host {
				--triplat-ds-search-input-hover-border-color: var(--triplat-ds-search-input-dropdown-item-hover-border-color, white);
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
				background-color: var(--triplat-ds-search-input-dropdown-item-background-color, var(--tri-primary-color));
			}
			
			li{
				list-style: none;
			}
			
			.header {
				@apply --layout-horizontal;
				@apply --layout-flex;
				min-height: 44px;
				background-color: var(--triplat-ds-search-input-dropdown-header-background-color, var(--tri-primary-color-60));
				@apply --triplat-ds-search-input-dropdown-header;
			}
			
			.header-text {
				@apply --layout-self-center;
				position: relative;
				font-weight: 200;
				margin: 9px;
			}
			
			.header-title {
				@apply --layout-flex-10;
				color: var(--triplat-ds-search-input-dropdown-header-text-color, var(--tri-primary-light-color));
				text-transform: uppercase;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.header-counter {
				position: absolute;
				color: var(--triplat-ds-search-input-text-color);
				font-weight: bold;
				margin-left: 5px;
				margin-right: 0px;
			}
			
			:host-context([dir="rtl"]) .header-counter {
				margin-left: 0px;
				margin-right: 5px;
			}
			
			.header-option {
				@apply --layout-flex-1;
				color: var(--triplat-ds-search-input-text-color);
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
				background-color: var(--triplat-ds-search-input-dropdown-item-background-color, var(--tri-primary-color));
				border-bottom: 1px solid var(--triplat-ds-search-input-dropdown-item-border-color, var(--tri-primary-color-40)); 
				@apply --triplat-ds-search-input-dropdown-item;
			}
			
			.child-text{
				@apply --layout-flex-11;
				@apply --layout-self-center;
				font-size: 14px;
				color: var(--triplat-ds-search-input-text-color);
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
				--paper-checkbox-unchecked-color: var(--triplat-ds-search-input-text-color);
				--paper-checkbox-checked-color: var(--tri-primary-dark-color);
			}
			
			:host-context([dir="rtl"]) .child-checkbox {
				margin-left: 0px;
				margin-right: 9px;
			}
			
			.child:hover, .child:focus {
				outline: none;
				margin: 0;
				margin-top: -1px;
				padding: 0 9px;
				cursor: pointer;
				border-bottom: 1px solid var(--triplat-ds-search-input-hover-border-color);
				border-top: 1px solid var(--triplat-ds-search-input-hover-border-color);  
			}
			
			li:last-of-type{
				border-bottom: 1px solid rgba(0,0,0,0);   
			}
			
			.footer-container {
				@apply --layout-horizontal;
				@apply --layout-flex;
				@apply --layout-end-justified;
				height: 54px;
				padding-right: 10px;
				background-color: var(--triplat-ds-search-input-dropdown-footer-background-color, var(--tri-primary-dark-color));
				@apply --triplat-ds-search-input-dropdown-footer-container;
			}
			
			:host-context([dir="rtl"]) .footer-container {
				padding-right: 0px;
				padding-left: 10px;
			}
			
			.footer-text {
				line-height: 44px;
				margin: 5px 0;
			}
			
			.footer-loading-text, .footer-loading-dots {
				color: var(--triplat-ds-search-input-text-color);
			}
			
			.footer-loading-dots {
				width: 20px;
				padding-left: 3px;
			}
			
			.footer-selected-text{
				font-size: 14px;
				color: var(--triplat-ds-search-input-text-color);
				margin-right: 24px;
				margin-left: 0px; 
			}
			
			:host-context([dir="rtl"]) .footer-selected-text {
				margin-right: 0px;
				margin-left: 24px;   
			}
			
			.footer-deselect-option {
				font-size: 14px;
				color: var(--triplat-ds-search-input-dropdown-footer-deselect-text-color, var(--tri-primary-light-color));
				margin-right: 12px;
			}
			
			:host-context([dir="rtl"]) .footer-deselect-option {
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
			
			:host-context([dir="rtl"]) .done-button {
				margin-right: 12px;
				margin-left: 0px;
			}
			
			.done-button:hover{
				border: 2px solid rgba(255,255,255,1);
				background-color: var(--tri-primary-color);
			}
			
		
		</style>

		<div id="main">
			<div class="results" id="results">
				<template is="dom-repeat" items="{{_results}}" as="header">
						<ul role="listbox" id="list">
							<li class="header" role="option" tabindex="0">
								<span class="header-text header-title">
									{{header.alias}}
									<span class="header-counter">
										{{header.total}}
										<span hidden="{{_isSelectedItemsHidden(header, _currentSelected.length, _selected.length)}}">
											({{_computeSelected(header.name, _currentSelected.length, _selected.length)}} selected)
										</span>
									</span>
								</span>
								<span class="header-text header-option" hidden\$="{{_isHeaderOptionHidden(header.total, _isSingleHeader)}}" on-tap="_handleHeaderOption" aria-label="{{_headerOptionText}}">{{_headerOptionText}}...</span>
							</li>
							<iron-scroll-threshold on-lower-threshold="_handleThreshold" scroll-target="results" lower-threshold="0" id="threshold">
								<template is="dom-repeat" id="childRepeater" items="{{header.children}}" as="child">
									<li class="child" role="option" on-tap="_handleItemSelected">
										<paper-checkbox noink="" tabindex="-1" class="child-checkbox" on-change="_handleItemChange" checked="{{child.checked}}"></paper-checkbox>
										<triplat-word-highlight class="child-text" value="{{child.value}}" search-value="{{_value}}"></triplat-word-highlight>
									</li>
								</template>
							</iron-scroll-threshold>
						</ul>
				</template>
			</div>
				<div class="footer-container">
					<template is="dom-if" if="{{!_dataLoaded}}">
						<span class="footer-text footer-loading-text">{{_loadingResultsText}}</span>
						<span class="footer-text footer-loading-dots">{{_loadingDotsText}}</span>
					</template>
					<template is="dom-if" id="footerLoadedTemplate" if="{{_dataLoaded}}">
						<span class="footer-text footer-selected-text" hidden\$="{{_smallFooter}}">{{_selectedTotal}} SELECTED</span>
						<span class="footer-text footer-deselect-option" on-tap="_handleDeselectAll" tabindex="0" hidden\$="{{_smallFooter}}">Deselect All</span>
						<span class="footer-text footer-divider" hidden\$="{{_smallFooter}}">|</span>
						<paper-button class="done-button tri-disable-theme" noink="" on-tap="_handleDone">Done</paper-button>
					</template>
				</div>
		</div>
	`,

    is: "triplat-ds-search-dropdown",

    behaviors: [ TriplatSearchDropdownBehavior,
				 TriplatDsSearchLoadingBehavior,
				 TriplatDsSearchDatasourceBehavior, 
				 TriplatDsSearchDropdownBehavior],

    properties: {
		
		value: {
			type: String,
			readOnly: false,
			observer: "_handleValueChanged"
		},
		
		_value: {
			type: String,
			readOnly: true
		},
		
		aliases: {
			type: Object,
			value: {},
			readOnly: false
		},
		
		maxHeaderChildren: {
			type: Number,
			value: 3
		},
		
		delay: {
			type: Number,
			notify: false,
		},

		_results: {
			type: Array,
			value: []
		},
		
		_selected: {
			type: Array,
			value: []
		},
		
		_currentSelected: {
			type: Array,
			value: []
		},
		
		_selectedLookup: {
			type: Object,
			value: {}
		},
		
		_selectedTotal: {
			type: Number,
			value: 0,
			readOnly: true
		},
		
		_isSingleHeader: {
			type: Boolean,
			readOnly: true,
			value: false
		},
		
		_headerOptionText: {
			type: String,
			readOnly: true
		},
		
		_userFilter: {
			type: Boolean,
			readOnly: true,
			value: false
		}
	},

    listeners: { "iron-overlay-canceled": "_handleCancel",
				 "triplat-ds-search-single-datasource-complete": "_handleSingleDsComplete",
				 "triplat-ds-search-datasource-complete": "_handleDsComplete",
				 "triplat-ds-search-datasource-create": "_initSelectedByField"},

    ready: function(){
		var __dictionary__show_more =  "Show More";
		var __dictionary__back_to_all_results =  "Back to All Results";
		this._showMore = __dictionary__show_more;
		this._backToAllResults = __dictionary__back_to_all_results;
		this._set_headerOptionText(this._showMore);
		this.listen(this.$.main, "keydown", "_handleKeyDown");
		this.listen(this.$.footerLoadedTemplate, "dom-change", "_handleDomLoadedChange");
   },

    _isHeaderOptionHidden: function(childrenLength, isSingleHeader){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return (childrenLength <= this.maxHeaderChildren) && !isSingleHeader;
	},

    setupDatasources: function(contexts, filters){
		this._selectedByField = {};
		this._createDatasources(Object.keys(this.aliases), contexts, filters);
	},

    _handleDomLoadedChange: function(e){
		if(this._focusedByKeyboard && this._dataLoaded){
		   this.async(this.focusFirstElement);
		}
	},

    _handleHeaderOption: function(e){
		if(this._isSingleHeader){
			this._changeQueryPageSize(this._currentHeader, this.maxHeaderChildren, this._dataLoaded);
			this._repaintResults();
			this._setHeaderInfo(this._showMore, false);
		} else {
			this._startLoading();
			this._backupInitHeaderQuery(e.model.header.name);
			this._setHeaderInfo(this._backToAllResults, true);
		}
	},

    _backupInitHeaderQuery: function(header){
		this._currentHeader = header;
		this._changeQueryPageSize(this._currentHeader, 50, false);
		this._resultsBkp = this._results;
		this.set("_results", []);
	},

    _setHeaderInfo: function(optionText, singleHeader){
		this._set_headerOptionText(optionText);
		this._set_isSingleHeader(singleHeader);
	},

    _handleBackToAllResults: function(){
		this._setHeaderInfo(this._showMore, false);
	},

    _repaintResults: function(){
		this.set("_results", []);
		this._resultsBkp.forEach(function(result){
			result.children.forEach(function(child){
				child.checked = this._selectedLookup[child.column+"_"+child.value] ? true : false;
			}, this);  
		}, this);
		this.set("_results", this._resultsBkp);
		this._set_selectedTotal(this._calculateSelections);
	},

    get _calculateSelections(){
		var selectedFields = Object.keys(this._selectedByField);
		for(var selected in selectedFields){
			this._selectedByField[selectedFields[selected]] = 0;
		}
		
		var selectedTotal = 0;
		var selections = Object.keys(this._selectedLookup);
		for(var selection in selections){
			var column = selections[selection].split("_")[0];
			this._selectedByField[column]++;
			selectedTotal++;
		}
		return selectedTotal;
	},

    _initSelectedByField: function(e){
		this._selectedByField[e.detail] = 0;    
	},

    _handleThreshold: function(e){
		if(this._isSingleHeader && !(e.target.offsetHeight == 0)){
			this._goToNextPage(this._currentHeader);
		}
		this.$$("#threshold").clearTriggers();
	},

    _computeSelected: function(value){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return this._selectedByField[value];
	},

    _isSelectedItemsHidden: function(header){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(this._selectedByField[header.name] > 0){
			return false;
		}

		return true;
	},

    _handleValueChanged: function(value){
		if (this._delayHandle != undefined && this._delayHandle != null) {
			this.cancelAsync(this._delayHandle);
		}
		if(!(value.trim() == "")){
			this._delayHandle = this.async(this._doValueChanged, this._intDelay);
		}
	},

    _doValueChanged: function(){
		this._set_userFilter(true);
		this._startLoading();
		this._results = [];
		this._set_selectedTotal(0);
		this._set_value(this.value.trim());
		this._startDataLoading(this._value);
		// We need to indicate something is happening
		this.open();
		this._handleFFOpenPositionDelay();
	},

    _handleItemSelected: function(e){
		if(e.target.tagName == "LI"){
			dom(e.target).firstElementChild.fire("tap");
		}
	},

    _handleItemChange: function(e){
		var child = e.model.child;
		var lookup = child.column+"_"+child.value;
		if(e.target.checked){
			this._selectedLookup[lookup] = child;
			this._selectedByField[child.column]++;
			this._set_selectedTotal(++this._selectedTotal);
			this.push("_currentSelected", child);
		} else {
			this._selectedByField[child.column]--;
			this.removeSelected(lookup);
			this._set_selectedTotal(--this._selectedTotal);
			this._searchAndSplice("_selected", child, this._selected);
			this._searchAndSplice("_currentSelected", child, this._currentSelected);
		}
	},

    _searchAndSplice: function(arrayName, child, selected){
		var index = this._searchSelected(child, selected);
		if(index != -1){
			this.splice(arrayName, index, 1);
		} 
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

    _handleSingleDsComplete: function(e){
		var results = e.detail.results;
		if(this._isSingleHeader && this._results.length > 0){
			for(var i=0; i<this._results.length; i++){
				var header = this._results[i];
				if(header.name == results.name){
					this.set("_results."+i, results);
				}
			}
		} else {
			this.push("_results", results);
		}
		this._set_selectedTotal(this._calculateSelections);
	},

    _handleDsComplete: function(e){
		if(this._userFilter){
			this._cancelLoading();
			if(this._dataLoaded && this._results.length == 0){
				this._showNoResults();
			}
			this.fire("triplat-ds-search-dropdown-value-changed");
		}
	},

    _handleCancel: function(){
		this._currentSelected.forEach(function(selected){
			var lookup = selected.column+"_"+selected.value;
			this._selectedByField[selected.column]--;
			this.removeSelected(lookup);
			this._set_selectedTotal(--this._selectedTotal);
		}, this);
		this._currentSelected = [];
		if(this._currentHeader){
			this._changeQueryPageSize(this._currentHeader, this.maxHeaderChildren, this._dataLoaded);
			this._setHeaderInfo(this._showMore, false)
		}
		this._set_focusedByKeyboard(false);
	},

    _handleDeselectAll: function(){
		var checkboxes = Array.from(dom(this.root).querySelectorAll(".child-checkbox"));
		checkboxes.forEach(function(checkbox){
			if(checkbox.checked){
				checkbox.fire("tap");
			}    
		});
	},

    _handleDone: function(){
		var filters = {};
		this._currentSelected.forEach(function(selected){
			this._selected.push(selected);
		}, this);
		
		this._selected.forEach(function(selection){
			if(!filters[selection.column]){
				filters[selection.column] = [];   
			}
			filters[selection.column].push(selection.value);   
		});
		
		this._selected = [];
		this._currentSelected = [];
		this.closeDropdown();
		if(this._currentHeader){
			this._setHeaderInfo(this._showMore, false);
			this._changeQueryPageSize(this._currentHeader, this.maxHeaderChildren, this._dataLoaded);
		}
		this.fire("triplat-ds-search-dropdown-filters-selected",
				  { filters: filters });
		this._set_focusedByKeyboard(false);
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

    removeSelected: function(lookup){
		delete this._selectedLookup[lookup];
	},

    removeAllSelected: function(lookup){
		this._set_userFilter(false);
		this._selectedLookup = {};
	},

    buildSelection: function(lookup, selection){
		this._selectedLookup[lookup] = selection;    
	},

    openDropdown: function(inputWidth){
		this._updateSelections();
		if(!this.opened){
			this.resizeDropdown(inputWidth);
			this.open();
			this._handleFFOpenPositionDelay();
		}
	},

    resizeDropdown: function(inputWidth){
		this._resizeDropdown(inputWidth);
		this._adjustFooter(inputWidth);
	},

    closeDropdown: function(){
		this.close();
	}
});