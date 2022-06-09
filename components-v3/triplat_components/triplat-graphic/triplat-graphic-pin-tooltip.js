/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/paper-tooltip/paper-tooltip.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../triplat-icon/triplat-icon.js";
import { dom, flush } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				#tooltip {
					@apply --internal-pin-tooltip-container;
					--paper-tooltip: { 
						padding: 0px;
						font-size: 14px;
						@apply --internal-pin-tooltip;
					};
					--paper-tooltip-background: var(--internal-pin-tooltip-bg-color);
					--paper-tooltip-text-color: var(--internal-pin-tooltip-text-color);
					white-space: nowrap;
				}

				.tooltipContent {
					border-width: 2px;
					border-style: solid; 
					padding-top: 10px;
					padding-bottom: 10px;
					border-radius: 3px;
					border-color: var(--internal-pin-tooltip-border-color);
					@apply --layout-vertical;
				}

				.tooltipContent::after {
					content: '';
					position: absolute;
					border-style: solid;
					border-top-color: transparent;
					border-bottom-color: transparent;
					border-right-color: var(--internal-pin-tooltip-bg-color);
					border-left-color: var(--internal-pin-tooltip-bg-color);
					display: block;
					width: 0;
					z-index: 1;
					margin-top: -7px;
					top: 50%;
				}

				:host([position="left"]) .tooltipContent::after {
					border-width: 7px 0px 7px 7px;
					right: -4px;
				}

				:host([position="right"]) .tooltipContent::after {
					border-width: 7px 7px 7px 0px;
					left: -4px;
				}

				.tooltipContent::before {
					content: '';
					position: absolute;
					border-style: solid;
					border-top-color: transparent;
					border-bottom-color: transparent;
					border-right-color: var(--internal-pin-tooltip-border-color);
					border-left-color: var(--internal-pin-tooltip-border-color);
					display: block;
					width: 0;
					z-index: 0;
					margin-top: -8px;
					top: 50%;
				}

				:host([position="left"]) .tooltipContent::before {
					border-width: 8px 0px 8px 8px;
					right: -7px;
				}

				:host([position="right"]) .tooltipContent::before {
					border-width: 8px 8px 8px 0px;
					left: -7px;
				}

				.tooltipTitle {
					height: 22px;
					font-weight: bold;
					border-bottom-style: solid;
					border-bottom-width: 1px;
					border-bottom-color: var(--internal-pin-tooltip-divider-line-color);
					margin-right: 10px;
					margin-left: 10px;
					@apply --layout-horizontal;
					@apply --layout-center;
				}

				.tooltipItem {
					height: 22px;
					padding-right: 8px;
					padding-left: 8px;
					margin-right: 2px;
					margin-left: 2px;
					@apply --layout-horizontal;
					@apply --layout-center;
				}

				.tooltipItem[selected] {
					background-color: var(--internal-pin-tooltip-border-color);
				}
				
				.tooltipItemText {
					pointer-events: none;
				}

				.closeButton {
					top: calc(18px / -2 );
					right: calc(18px / -2 );
					justify-content: flex-end;
				position: absolute;
				min-width: 18px;
				min-height: 18px;
				--paper-button: {
					padding: 0px;
					position: relative;
					margin: 0px;
				};
				}

				triplat-icon {
					--triplat-icon-fill-color: var(--internal-pin-tooltip-close-button-color);
				--triplat-icon-iron-icon: {
					width: 18px;
					height: 18px;
				};
			}

			
		</style>

		<paper-tooltip id="tooltip" offset="5" position="[[position]]" manual-mode="" animation-delay="100">
			<paper-button class="closeButton tri-disable-theme" noink="" on-tap="_handleCloseButtonTap">
				<triplat-icon icon="ibm-glyphs:close-cancel-error"></triplat-icon>
			</paper-button>
			<div class="tooltipContent">
				<div class="tooltipTitle" hidden\$="[[!_hasTitle]]">
					<span class="tooltipTitleText">[[title]]</span>
				</div>
				<template id="domRepeat" is="dom-repeat" items="{{items}}">
					<div on-tap="_handleItemTap" class="tooltipItem" item="[[item]]">
						<span class="tooltipItemText">[[item.label]]</span>
					</div>
				</template>
			</div>           	
		</paper-tooltip>
	`,

    is: "triplat-graphic-pin-tooltip",

    properties: {
		graphic: Object,

		title: {
			type: String,
			value: ""
		},

		items: {
			type: Array,
			value: []
		},

		target: {
			type: Object
		},

		position : {
			type: String,
			reflectToAttribute: true,
			value: "left"
		},

		selected: {
			type: Object,
			observer: "_handleSelectedChange"
		},

		status : {
			type: String,
			value: "hidden"
		},

		_hasTitle: {
			type: Boolean,
			computed: "_computeHasTitle(title)"
		}
	},

    show: function() {
		this.updatePosition();
		//Do not close the tooltip on mouse enter.
		this.$.tooltip.unlisten(this.$.tooltip, 'mouseenter', 'hide');
		this.$.tooltip.show();
	},

    hide: function() {
		this.$.tooltip.hide();
		this.selected = null;
	},

    updatePosition: function() {
		this._calculateTooltipPosition();
		this.$.tooltip._target = this.target;
		this.$.tooltip.updatePosition();
	},

    addItems: function(items) {
		var newItems = null;
		if (items) {
			newItems = items.slice(0);
		}
		this.items = newItems;
		this.$.domRepeat.render();
		flush();			
	},

    _handleItemTap: function(event) {
		if(this.items.length == 1) {
			return;
		}
		var targetDiv = event.target;
		var item = this.$.domRepeat.modelForElement(targetDiv).item;
		if (targetDiv.hasAttribute("selected")) {
			this.selected = null;
		} else {
			this.selected = item;
		}
		this.fire("pin-selected-change", this.selected);
	},

    _computeHasTitle: function(title) {
		return title != null && title.length > 0;
	},

    _handleSelectedChange: function(newValue , oldVAlue) {
		if(this.items.length == 1) {
			return;
		}
		this._unselect(oldVAlue);
		this._select(newValue);
	},

    _select: function(item) {
		if(!item || this.items.length == 1) {
			return;
		}
		var tooltipItems = Array.from(dom(this.root).querySelectorAll(".tooltipItem"));
		if (tooltipItems) {
			var found = false;
			for (var i = 0; i < tooltipItems.length && ! found; i++) {
				if (tooltipItems[i].item.label == item.label) {
					tooltipItems[i].setAttribute("selected","");
					found = true;
				}
			}
		}
	},

    _unselect: function(item) {
		if(!item) {
			return;
		}
		var tooltipItems = Array.from(dom(this.root).querySelectorAll(".tooltipItem[selected]"));
		if (tooltipItems) {
			var found = false;
			for (var i = 0; i < tooltipItems.length && ! found; i++) {
				if (tooltipItems[i].item.label == item.label) {
					tooltipItems[i].removeAttribute("selected");
					found = true;
				}
			}
		}
	},

    _handleCloseButtonTap: function(event) {
		this.fire("tri-pin-tooltip-close");
	},

    /**
	 * Determines if the tooltip should be positioned to the left or to the right of the target pin.
	 * It considers that the graphic has two parts, one to the left of the graphic center and another 
	 * to the right of the graphic center.
	 * Returns 'left' if the target pin is located in the right part of the graphic.
	 * Returns 'right' if the target pin is located in the left part of the graphic.
	 */
	_calculateTooltipPosition: function() {
		if (this.graphic && this.target) {
			var graphicRect = this.graphic.getBoundingClientRect();
			var targetRect = this.target.getBoundingClientRect();
			var graphicCenterX = graphicRect.width / 2;
			this.position = (targetRect.left - graphicRect.left) <= graphicCenterX ? "right" : "left";
		}
	}
});