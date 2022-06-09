/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-collapse/iron-collapse.js";
import "../@polymer/paper-radio-button/paper-radio-button.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				
				.filterByContainer {
					@apply --layout-vertical;
				}

				.filterByHeader {
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

				.filterByList {
					@apply --layout-vertical;
				}

				:host([dir="ltr"]) .legendSpacer {
				padding-right: 20px;
			}

			:host([dir="rtl"]) .legendSpacer {
				padding-left: 20px;
			}
			
		</style>

		<div class="filterByContainer">
			<div class="filterByHeader legendSpacer">Filter By</div>
			<div class="filterByList">
				<slot id="filterByListContent"></slot>
			</div>
		</div>
	`,

    is: "triplat-graphic-legend-filter-by-section",

    properties: {

		selected: {
			type: String,
			notify: true,
			observer: "_handleSelectedChange"
		},

		selectedItem: {
			type: Object,
			readOnly: true,
			notify: true
		}
	},

    listeners: {
		"filter-by-change": "_handleFilterByChange"
	},

    ready: function() {
		this._observer = dom(this).observeNodes(
			function(info) {
				this._handleSelectedChange();
			}
		);
	},

    _handleFilterByChange: function(event) {
		var filterBy = event.detail.filterBy;
		if (filterBy.checked) {
			if(this.selectedItem != filterBy) {
				this._setSelectedItem(filterBy);
				this._uncheckOthers();
				this.selected = filterBy.label;
			}
		} else {
			this._setSelectedItem(null);
			this.selected = null;
		}
	},

    _uncheckOthers: function(radioButton) {
		var allCriterias = this.getContentChildren();
		if (allCriterias && Array.isArray(allCriterias)) {
			for (var i = 0; i < allCriterias.length; i++) {
				if (allCriterias[i] != this.selectedItem) {
					allCriterias[i].checked = false;
				}
			}
		}
	},

    _handleSelectedChange: function() {
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