/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-collapse/iron-collapse.js";
import "../@polymer/paper-checkbox/paper-checkbox.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				.locationPinContainer {
					@apply --layout-vertical;
				}

				.locationPinHeader {
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

				.locationPinList {
					border-bottom-width: var(--legend-border-width);
					border-bottom-style: var(--legend-border-style);	
					border-bottom-color: var(--legend-secondary-border-color);
					background-color: var(--legend-secondary-background-color);
					@apply --layout-vertical;
				}

				:host([dir="ltr"]) .legendSpacer {
					padding-right: 20px;
				}

				:host([dir="rtl"]) .legendSpacer {
					padding-left: 20px;
				}

				.showAllContainer {
					height: 44px;
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
					border-top-width: var(--legend-border-width);
					border-top-style: var(--legend-border-style);	
					border-top-color: var(--legend-secondary-border-color);
				}			
			
		</style>

		<div class="locationPinContainer">
			<div class="locationPinHeader legendSpacer">Location Pins</div>
			<div class="locationPinList">
				<div class="showAllContainer legendSpacer">
					<paper-checkbox on-change="_showAllChange" class="showAllCheckbox" checked="{{_showAll}}">
						<div class="showAll">
							<span class="showAllText">Show All</span>
						</div>
					</paper-checkbox>
					<paper-icon-button class="showAllButton" icon="ibm-glyphs:back" active="{{_showAllPins}}" toggles="">
					</paper-icon-button>
				</div>
				<iron-collapse class="criterionList legendSpacer" opened="{{_showAllPins}}">
					<slot id="pinsList"></slot>
				</iron-collapse>
			</div>
		</div>
	`,

    is: "triplat-graphic-legend-pin-section",

    properties: {
		_showAllPins: {
			type: Boolean,
			value: false
		},

		_showAll: {
			type: Boolean,
			value: false
		}
	},

    listeners: {
		"legend-pin-change": "_handleLegendPinChange"
	},

    ready: function() {
		this._observer = dom(this).observeNodes(
			function(info) {
				this._handleLegendPinChange();
			}
		);
	},

    _showAllChange: function(event) {
		this._handlingShowAllChange = true;
		var showAllCheckBox = event.target;
		var allLegendPins = this.getContentChildren();
		if (allLegendPins) {
			for (var i = 0; i < allLegendPins.length; i++) {
				allLegendPins[i].checked = showAllCheckBox.checked;
			}
		}
		this._handlingShowAllChange = false;
	},

    _handleLegendPinChange: function(event) {
		if (this._handlingShowAllChange) {
			return;
		}
		var allLegendPins = this.getContentChildren();
		var showAll = allLegendPins &&  allLegendPins.length > 0;
		if (allLegendPins) {
			for (var i = 0; i < allLegendPins.length; i++) {
				showAll = showAll && allLegendPins[i].checked;
			}
		}
		this._showAll = showAll;
	},

    behaviors: [TriDirBehavior]
});