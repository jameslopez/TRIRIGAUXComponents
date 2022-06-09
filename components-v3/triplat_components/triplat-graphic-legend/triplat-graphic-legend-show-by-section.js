/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "./triplat-graphic-legend-pin-toggle.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				
				.showByContainer {
					@apply --layout-vertical;
				}

				.showByHeader {
					border-bottom-width: var(--legend-border-width);
					border-bottom-style: var(--legend-border-style);	
					border-bottom-color: var(--legend-primary-border-color);
					min-height: 44px;
					font-size: 18px;
					font-weight: bold;
					@apply --layout-horizontal;
					@apply --layout-center;
					@apply --triplat-graphic-legend-section-header;				
				}

				.showByHeaderText {
					height: 24px;
					@apply --layout-flex;
				}

				:host([dir="ltr"]) .showByHeaderText[pin] {
					border-right-width: var(--legend-border-width);
					border-right-style: var(--legend-border-style);	
					border-right-color: var(--legend-secondary-border-color);
					margin-right: 7px;
				}

				:host([dir="rtl"]) .showByHeaderText[pin] {
					border-left-width: var(--legend-border-width);
					border-left-style: var(--legend-border-style);	
					border-left-color: var(--legend-secondary-border-color);
					margin-left: 7px;
				}

				.showByList {
					@apply --layout-vertical;
				}

				:host([dir="ltr"]) .legendSpacer {
				padding-right: 20px;
			}

			:host([dir="rtl"]) .legendSpacer {
				padding-left: 20px;
			}
			
		</style>

		<div class="showByContainer">
			<div class="showByHeader legendSpacer">
				<span class="showByHeaderText" pin\$="[[showLocationPin]]">Show By</span>
				<template is="dom-if" if="[[showLocationPin]]">
					<triplat-graphic-legend-pin-toggle icon="[[locationPinIcon]]" active="{{locationPinChecked}}">
					</triplat-graphic-legend-pin-toggle>
				</template>
			</div>
			<div class="showByList">
				<slot id="showByListContent"></slot>
			</div>
		</div>
	`,

    is: "triplat-graphic-legend-show-by-section",

    properties: {

		selected: {
			type: String,
			notify: true,
			observer: "_handleSelectedChanged"
		},

		selectedItem: {
			type: Object,
			readOnly: true,
			notify: true
		},

		showLocationPin: {
			type: Boolean,
			value: false
		},

		locationPinChecked: {
			type: Boolean,
			value: false,
			notify: true
		},

		locationPinIcon: {
			type: String
		}
	},

    listeners: {
		"show-by-change": "_handleShowByChange"
	},

    ready: function() {
		this._observer = dom(this).observeNodes(
			function(info) {
				this._handleSelectedChanged();
			}
		);
	},

    _handleShowByChange: function(event) {
		var showBy = event.detail.showBy;
		if (showBy.checked) {
			if(this.selectedItem != showBy) {
				this._setSelectedItem(showBy);
				this._uncheckOthers();
				this.selected = showBy.label;
			}
		} else {
			this._setSelectedItem(null);
			this.selected = null;
		}
	},

    _uncheckOthers: function() {
		var allCriterias = this.getContentChildren();
		if (allCriterias && Array.isArray(allCriterias)) {
			for (var i = 0; i < allCriterias.length; i++) {
				if (allCriterias[i] != this.selectedItem) {
					allCriterias[i].checked = false;
				}
			}
		}
	},

    _handleSelectedChanged: function() {
		if (!this.selected || this.selected.length == 0) {
			if (this.selectedItem) {
				this.selectedItem._selectItem(false);
				this._setSelectedItem(null);
			}
		} else if (!this.selectedItem || !this._isEqual(this.selectedItem.label, this.selected)) {
			var allCriterias = this.getContentChildren();
			if (allCriterias && Array.isArray(allCriterias)) {
				var found = false;
				for (var i = 0; i < allCriterias.length && !found; i++) {
					if (this._isEqual(allCriterias[i].label, this.selected)) {
						allCriterias[i]._selectItem(true);
						this._setSelectedItem(allCriterias[i]);
						this._uncheckOthers();
						found = true;
					}
				}
			}
		}
	},

    _isEqual: function(stringA, stringB) {
		if (!stringA || ! stringB) {
			return false;
		}
		return stringA.toUpperCase() === stringB.toUpperCase();
	},

    behaviors: [TriDirBehavior]
});