/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriplatSearchDropdownBehaviorImpl, TriplatSearchDropdownBehavior } from "../triplat-search-dropdown-behavior/triplat-search-dropdown-behavior.js";
import { TriplatDsSearchDropdownBehavior } from "./triplat-ds-search-dropdown-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

			
			:host {
				position: relative;
				top: 0px;
				left: 0px;
			}
			
			#main {
				font-size: 12px;
				position: absolute;
				outline: none;
				z-index: 1;
				overflow: auto; 
				max-height: 50vh;
				background-color: var(--triplat-ds-search-input-expand-filters-background-color, var(--tri-primary-color-10));
			}
			
			.filters {
				@apply --layout;
				@apply --layout-vertical; 
				@apply --triplat-ds-search-input-expand-filters-container;
			}

			.single {
				@apply --layout;
				@apply --layout-horizontal; 
				background-color: var(--triplat-ds-search-input-expand-filters-background-color, var(--tri-primary-color-10));
				color: var(--triplat-ds-search-input-filter-text-color, var(--tri-primary-content-color));
				margin: 0px 10px;
				padding: 5px 0px;
				border-bottom: 1px solid white;
			}
			
			.group {
				@apply --layout-flex;
				@apply --layout-self-center;
				padding: 0px;
				margin: 0px;
				font-size: 0;
			}
			
			.filter-text{
				font-size: 12px;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}
			
			.filter-text-divider{
				margin: 1px;
			}

			.operator {
				background-color: var(--triplat-ds-search-input-filter-operator-background-color, var(--tri-primary-color));
				min-width: 44px;
				min-height: 44px;
				@apply --layout-flex-1;
				@apply --layout-vertical;
				@apply --layout-center-justified;
			}
			
			:host-context([dir="ltr"]) .operator {
				margin-left: 0px;
				margin-right: 5px;  
			}

			:host-context([dir="rtl"]) .operator {
				margin-left: 5px;
				margin-right: 0px; 
			}

			iron-icon.equals-icon{
				min-width: 24px; 
				min-height: 24px;
				color: var(--triplat-ds-search-input-operator-equals-icon-color, white);
				margin: 10px;
			}

			.clearfilter {
				min-width: 44px;
				min-height: 44px;
				margin-right: 0; 
			}

			.clear-filter-icon{
				min-width: 32px; 
				min-height: 32px;
				margin: 3px;
				color: var(--triplat-ds-search-input-expand-filters-remove-icon-color, var(--tri-primary-color));
				cursor: pointer; 
			}

			triplat-icon iron-icon:focus{
				background-color:rgba(0, 0, 0, 0.07);
			}
			
			.footer {
				@apply --layout;
				@apply --layout-horizontal;
				min-height: 54px;
				margin: 0px;
				background-color: var(--triplat-ds-search-input-dropdown-footer-background-color, var(--tri-primary-dark-color));
				color: white;
				text-align: right;
			}
			
			.footer-container {
				@apply --layout-flex;
				@apply --layout-self-center;
				font-size: 14px;
				color: var(--triplat-ds-search-input-dropdown-footer-deselect-text-color, var(--tri-primary-dark-color));
				margin-right: 12px;
			}
			
			.clear-all-button {
				padding-left: 24px;
				padding-right: 24px;
				border: 2px solid rgba(255,255,255,0.8);
				color: rgb(255,255,255);
				text-transform: none;
				margin-left: 12px;
				text-align: center;
				background-color: none;
			}
			
			.clear-all-button:hover{
				border: 2px solid rgba(255,255,255,1);
				background-color: var(--tri-primary-color);
			}
			
		
		</style>

		<div id="main">
			<div class="filters" id="filtersContainer">
				<template is="dom-repeat" items="{{filters}}" as="filter">
					<div class="single">
						<div class="operator" title="Equals">
							<triplat-icon class="equals-icon" icon="ibm-glyphs:equals"></triplat-icon>
						</div>
						<div class="group">
							<template is="dom-repeat" items="{{filter.value}}" as="value" index-as="idx">
								<span class="filter-text filter-text-divider" hidden\$="{{_computeHidden(idx)}}">,</span>
								<span class="filter-text">{{value}}</span>
							</template>
						</div>
						<div class="clearfilter">
							<triplat-icon icon="remove-delete" tabindex="0" class="clear-filter-icon" description="Clear filter" on-tap="_handleFilterDelete" on-keydown="_handleActionKeyDown"></triplat-icon>
						</div>
					</div>
				</template>
				<div class="footer">
					<div class="footer-container">
						<paper-button class="clear-all-button tri-disable-theme" noink="" on-tap="_handleClearAll">Remove All</paper-button>
					</div>
				</div>
			</div>
		</div>
	`,

    is: "triplat-ds-search-filters-dropdown",
    behaviors: [TriplatSearchDropdownBehavior, TriplatDsSearchDropdownBehavior],

    properties: {
		filters: {
			type: Array,
			value: [] 
		}
	},

    _computeHidden: function(index){
		return (index == 0);   
	},

    _handleFilterDelete: function(e){
		var filter = e.model.filter;
		this.fire("triplat-search-filters-delete", {filter: filter});
	},

    _handleActionKeyDown: function(e){
		if(e.keyCode == 13 || e.keyCode == 32) { //ENTER(13) || SPACE(32)
			e.target.click();
			e.preventDefault();   
		}
	},

    _handleClearAll: function(){
		this.fire("triplat-search-filters-delete-all");
	},

    openDropdown: function(inputWidth){
		this.resizeDropdown(inputWidth);
		this.open();
		this._handleFFOpenPositionDelay();
	},

    resizeDropdown: function(inputWidth){
		this._resizeDropdown(inputWidth);
	}
});