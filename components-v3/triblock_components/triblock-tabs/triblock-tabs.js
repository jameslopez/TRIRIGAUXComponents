/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { afterNextRender } from "../@polymer/polymer/lib/utils/render-status.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-badge/paper-badge.js";
import "../@polymer/paper-tabs/paper-tabs.js";
import "../@polymer/iron-icons/iron-icons.js";
import "../@polymer/iron-icon/iron-icon.js";
import "./triblock-tab.js";
import "../triblock-animation/triblock-slide-animation.js";
import { TriBlockSlideAnimationBehavior } from "../triblock-animation/triblock-slide-animation-behavior.js";
import { TriBlockBadgeContainerBehavior } from "../triblock-badge-behavior/triblock-badge-container-behavior.js";
import { TriBlockNavSelectContainerBehavior } from "../triblock-nav-behavior/triblock-nav-select-container-behavior.js";
import { TriBlockNavIronPagesContainerBehavior } from "../triblock-nav-behavior/triblock-nav-iron-pages-container-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";

/*
`triblock-tabs` is a component which provides a group of navigation items that will be rendered horizontally on the page.
  
  Use the `triblock-tab` component to configure the navigation items that will be rendered in the tabs.  This is the only supported component that can be used inside the `triblock-tabs`.  To properly insert `triblock-tab` within `triblock-tabs`, add the `slot` property with a value of `tab`. See <a href="?active=triblock-tab">triblock-tab</a> for more information.
  
  You can define static and dynamic tabs using data binding or mixed of both.
  
  <div style="background-color:#FFFFCC">
	<div style="padding:20px;">
	   <b>Note:</b> Currently, only data from the `triplat-ds` and the `iron-ajax` components are supported by dynamic tabs.  You should call `refreshTabs` after the tabs are dynamically changed or updated.
	</div>
  </div>
  

  Example:

	<triblock-tabs>
	  <triblock-tab 
		icon="activity"
		slot="tab" 
		label="Activity"></triblock-tab>
	  <triblock-tab 
		icon="admin" 
		slot="tab"
		label="Admin"></triblock-tab>
	  <triblock-tab 
		icon="applications" 
		slot="tab"
		label="Application"></triblock-tab>
	</triblock-tabs>
  
  
  ### Default maximum badge number
  
  It implements badge container behavior which propagates its `badge-max-number` value to its navigation items that do not have a value for its `badge-max-number` property.  See <a href="?active=TriBlockBadgeContainerBehavior">TriBlockBadgeContainerBehavior</a> for more information.
  
  Example:
  
	<triblock-tabs badge-max-number="99">
	  <triblock-tab 
		icon="activity" 
		slot="tab"
		label="Activity" 
		badge-max-number="50"></triblock-tab>
	  <triblock-tab 
		icon="admin" 
		slot="tab"
		label="Admin"></triblock-tab>
	  <triblock-tab 
		icon="applications" 
		slot="tab"
		label="Application"></triblock-tab>
	</triblock-tabs>
  
  The `Activity` navigation item above will have a maximum badge number of 50 while the other two navigation items will have 99 as their maximum badge number which comes from the `triblock-side-nav`.

  
  ### Default id for `iron-pages` 
  
  It implements iron pages container behavior which propagates its `iron-pages-id` value to its navigation items that do not have a value for its `iron-pages-id` property.  When the `triblock-side-nav` component is used as a `nav` component inside the `triblock-side-nav-layout` component the `iron-pages-id` property will be automatically assigned a value from the `id` of the `iron-pages` component that is marked as `page` inside the layout component.  In this usage, you do not need to set a value for the `iron-pages-id` property.  See <a href="?active=TriBlockNavIronPagesContainerBehavior">TriBlockNavIronPagesContainerBehavior</a> for more information. 
  
  
  ### Selection
  
  It implements navigation selection behavior which maintains the currently selected navigation item based on the `id` or `attr-for-selected` property of its navigation items.  Use the `selected` property to get or set the selected side navigation item.  The index of the navigation item is not supported as a value for the `selected` property.  See <a href="?active=TriBlockNavSelectContainerBehavior">TriBlockNavSelectContainerBehavior</a> for more information.
  
  `id` example:
  
	<triblock-tabs selected="activityNav">
	  <triblock-tab 
		id="activityNav" 
		icon="activity" 
		slot="tab"
		label="Activity"></triblock-tab>
	  <triblock-tab 
		id="adminNav" 
		icon="admin" 
		slot="tab"
		label="Admin"></triblock-tab>
	  <triblock-tab 
		id="applicationNav" 
		icon="applications" 
		slot="tab"
		label="Application"></triblock-tab>
	</triblock-tabs>
	
  The `Activity` navigation item will be selected by default.

  `attr-for-selected` example:
  
	<triblock-tabs selected="adminNav" attr-for-selected="route-to">
	  <triblock-tab 
		route-to="activityNav" 
		icon="activity" 
		slot="tab"
		label="Activity"></triblock-tab>
	  <triblock-tab 
		route-to="adminNav" 
		icon="admin" 
		slot="tab"
		label="Admin"></triblock-tab>
	  <triblock-tab 
		route-to="applicationNav" 
		icon="applications" 
		slot="tab"
		label="Application"></triblock-tab>
	</triblock-tabs
	
  The `Admin` navigation item will be selected by default.
  
  
  ### Default styling
  
  The `triblock-tabs` component comes with default TRIRIGA application styling such as:
  <ul>
	  <li>On hover or focus, a band appears from the bottom of the tab and follows the cursor between tabs.</li>
	  <li>On hover or focus or selected, the primary tab label and icon change its opacity so that tab appears prominent.</li>
	  <li>When selected, the primary tab band slides up and the tab color changes.</li>
	  <li>When unselected, the tab band slides down and returns to its unselected or default state.</li>
	  <li>Badges are positioned right next to the label with a bold font setting. </li>
  </ul>

  
  ### Styling
  
  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-tabs-container` | Mixin applied to the tabs container | `{}`
  `--triblock-tabs-height` | Height applied to the tabs  | `50px`
  `--triblock-tabs-min-width` | Minimum width applied to the tabs  | `200px`  
  `--triblock-tabs-background-color` | Background color applied to tabs | `primary --tri-header-background-color, secondary white`
  `--triblock-tabs-color` | Color applied to the tabs | `primary --tri-header-color, secondary --tri-primary-color`
  `--triblock-tabs-tricontent` | Mixin applied to the tabs tri-content container | `{}`
  `--triblock-tabs` | Mixin applied to the tabs | `{}`
  `--triblock-tab` | Mixin applied to the tab | `{}`
  `--triblock-tabs-icon` | Mixin applied to the icon  | `{}`  
  `--triblock-tab-focused` | Mixin applied when a tab is focused or hovered on | `{}`
  `--triblock-tab-focused-band` | Mixin applied to the band when tab is focused or hovered on | `{}`
  `--triblock-tab-focused-band-background-color` | Background color applied to the band when tab is focused or hovered on | `primary --ibm-blue-60, secondary --tri-primary-color`
  `--triblock-tab-focused-band-height` | Height applied to the band when tab is focused or hovered on | `primary 5px, secondary 4px`
  `--triblock-tab-focused-tricontent` | Mixin applied to the tabs tri-content container when the tab is focused | `{}`
  `--triblock-tab-color` | Color applied to the tab | `primary --tri-secondary-content-color, secondary --tri-primary-dark-color`
  `--triblock-tab-unselected-background-color` | Background color applied to the tab when it is not selected | `primary --tri-primary-dark-color`  
  `--triblock-tab-unselected-color` | Color applied to the tab when it is not selected |`primary --tri-secondary-content-color, secondary --tri-primary-color`
  `--triblock-tab-unselected` | Mixin applied to the tab when it is not selected | `{}`
  `--triblock-tab-background-color` | Background color applied to the tab | `secondary white`
  `--triblock-tab-selected-background-color` | Background color applied to the overlay animation of the tab when it is selected | `--ibm-blue-60`
  `--triblock-tab-selected-band-height` | Height applied to the band when the secondary tab is selected | `4px`  
  `--triblock-tab-selected-band-color` | Color applied to the band when the secondary tab is selected | `--tri-primary-dark-color`
  `--triblock-tab-selected-band` | Mixin applied to the band when the secondary tab is selected | `{}`
  `--triblock-tab-selected` | Mixin applied to the tab when it is selected | `{}`
  `--triblock-tab-badge` | Mixin applied to the badge on the tab | `{}`
  `--triblock-tab-paper-badge-icon-width` | Width applied to the iron-icon inside paper-badge on the tab | `16px`
  `--triblock-tab-paper-badge-icon-height` | Height applied to the iron-icon inside paper-badge on the tab | `16px`
  `--triblock-tab-paper-badge-icon` | Mixin applied to the iron-icon inside paper-badge on the tab | `{}`
  `--triblock-tab-paper-badge-icon-color` | Color applied to the icon in paper-badge | `var(--tri-primary-color)`
  `--triblock-tab-paper-badge-background` | Background color applied to the paper-badge | `none`
  
  
@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">


				:host {
					display: flex;
					@apply --layout-vertical;
					
					@apply --triblock-tabs-container;
				};
				
				.tri-content {
					font-weight: normal;
				}

				paper-tabs {
					height: var(--triblock-tabs-height, 50px);
					min-width: var(--triblock-tabs-min-width, 200px);
									
					@apply --triblock-tabs;
				}

				paper-tab:focus,
				paper-tab:hover {
					opacity: 1;
					@apply --triblock-tab-focused;
				}

				paper-tab:focus:before,
				paper-tab:hover:before {
					@apply --layout-fit;
					opacity: 1;
					content: "";
					z-index: 1;

					@apply --triblock-tab-focused-band;
				}

				paper-tabs.primary paper-tab:hover:before,
				paper-tabs.primary paper-tab:focus:before {
					background-color: var(--triblock-tab-focused-band-background-color, var(--ibm-blue-60));
					height: var(--triblock-tab-focused-band-height, 5px);
					transform: translateY(calc(var(--triblock-tabs-height, 50px) - var(--triblock-tab-focused-band-height, 5px)));
					
					@apply --triblock-tab-focused-band;
				}

				paper-tabs.secondary paper-tab:hover:before,
				paper-tabs.secondary paper-tab:focus:before {
					background-color: var(--triblock-tab-focused-band-background-color, var(--tri-primary-color));
					height: var(--triblock-tab-focused-band-height, 4px);
					transform: translateY(calc(var(--triblock-tabs-height, 50px) - var(--triblock-tab-focused-band-height, 4px)));

					@apply --triblock-tab-focused-band;
				}

				paper-tab:focus > ::slotted(.tri-content) {
					@apply --triblock-tab-focused-tricontent;
				}

				paper-tabs.primary {
					--paper-tabs: {
						background-color: var(--triblock-tabs-background-color, var(--tri-header-background-color));
						color: var(--triblock-tabs-color, var(--tri-header-color));
						
						@apply --triblock-tabs;
					};
				}

				paper-tabs.primary paper-tab {
					--paper-tab: {
						padding: 0;
						font-size: 18px;

						@apply --triblock-tab;
					};
					--paper-tab-content: {
						color: var(--triblock-tab-color, var(--tri-secondary-content-color));
						
						@apply --triblock-tab;
					};
					--paper-tab-content-unselected: {
						background-color: var(--triblock-tab-unselected-background-color, var(--tri-primary-dark-color));
						color: var(--triblock-tab-unselected-color, var(--tri-secondary-content-color));
						
						@apply --triblock-tab-unselected;
					};
				}

				paper-tabs.primary .tri-content {
					padding: 0 24px;
					
					@apply --triblock-tabs-tricontent;
				}

				paper-tabs.secondary {
					--paper-tabs: {
						background-color: var(--triblock-tabs-background-color, white);
						color: var(--triblock-tabs-color, var(--tri-primary-color));
						font-size: 18px;
						
						@apply --triblock-tabs;
					};
				}

				paper-tabs.secondary paper-tab {
					padding-left: 10px;
					padding-right: 10px;
					--paper-tab: {
						@apply --layout-end;
						padding: 0px;
						padding-bottom: 12px;
						box-sizing: border-box;

						@apply --triblock-tab;
					};
					--paper-tab-content: {
						@apply --layout-end;
						background-color: var(--triblock-tab-background-color, white);
						color: var(--triblock-tab-color, var(--tri-primary-dark-color));
						
						@apply --triblock-tab;
					};
					--paper-tab-content-unselected: {
						/*by default, paper-tab opacity: 0.8 and on select, 1.0*/
						opacity: 1.0;
						color: var(--triblock-tab-unselected-color, var(--tri-primary-color));
						
						@apply --triblock-tab-unselected;
					};
				}

				paper-tabs.secondary .tri-content {
					@apply --layout-horizontal;
					@apply --layout-center;
					
					
					@apply --triblock-tabs-tricontent;
				}
				
				iron-icon {
					padding-right: 5px;
					height: 22px;
					width: 22px;
					@apply --triblock-tabs-icon;
				}

				:host([dir="rtl"]) iron-icon {
					transform: scaleX(-1);
				}

				triblock-slide-animation {
					z-index: -1;
					--triblock-slide-animation-height: var(--triblock-tabs-height, 50px);
					--triblock-slide-animation-background-color: var(--triblock-tab-selected-background-color, var(--ibm-blue-60));
				}
				
				paper-tabs.secondary paper-tab.iron-selected:before {
					@apply --layout-fit;
					height: var(--triblock-tab-selected-band-height, 4px);
					background-color: var(--triblock-tab-selected-band-color, var(--tri-primary-dark-color));
					content: "";
					transform: translateY(calc(var(--triblock-tabs-height, 50px) - var(--triblock-tab-selected-band-height, 4px))); 
					
					@apply --triblock-tab-selected-band;
				}

				paper-tab.iron-selected {
					opacity: 1;
					font-weight: normal;
					
					@apply --triblock-tab-selected;
				}

				paper-tab {
					font-weight: normal;
					font-family: var(--tri-font-family);
					
					@apply --triblock-tab;
				}

				.badge {
					font-weight: bold;
					
					@apply --triblock-tab-badge;
				}

				.primary .badge {
					color: white;

					@apply --triblock-tab-badge;
				}

				.secondary .badge {
					padding-left: 5px;

					@apply --triblock-tab-badge;
				}

				paper-badge {
					margin-top: 4px;
					--paper-badge-background: var(--triblock-tab-paper-badge-background, none);
					--paper-badge-text-color: var(--triblock-tab-paper-badge-icon-color, var(--tri-primary-color));
					--iron-icon: {
						height: var(--triblock-tab-paper-badge-icon-height, 16px);
						width: var(--triblock-tab-paper-badge-icon-width, 16px);
						@apply --triblock-tab-paper-badge-icon;
					}
				}

				:host([dir="ltr"]) paper-badge {
					padding-right: 12px;
 				}

				:host([dir="rtl"]) paper-badge {
					left: -3px !important;
 				}

				:host([dir="ltr"]) span#badge span.has-badge-label-icon {
					padding: 0px 16px 0px 10px;
				}

				:host([dir="ltr"]) span#badge span.has-badge-label {
					padding-left: 10px;
				}

				:host([dir="ltr"]) span#badge span.has-badge-icon {
					padding: 0 10px 0 6px;
				}

				:host([dir="rtl"]) span#badge span.has-badge-label-icon {
					padding: 0px 10px 0px 16px;
				}

				:host([dir="rtl"]) span#badge span.has-badge-label {
					padding-right: 10px;
				}

				:host([dir="rtl"]) span#badge span.has-badge-icon {
					padding: 0 6px 0 10px;
				}
		</style>

		<slot id="tabsContent" style="display:none" name="tab"></slot>

		<paper-tabs id="triTab" selected="{{selected}}" on-iron-select="_handleIronSelected" on-iron-deselect="_handleIronDeselected" attr-for-selected="select-id" hide-scroll-buttons="{{hideScrollButtons}}" fit-container="{{fitContainer}}" class\$="[[_computePaperTabsClass(primary)]]" no-bar="" noink="" no-slide="" scrollable="">
			<template id="tabsTemplate" is="dom-repeat" items="{{_tabElements}}" as="item">
				<paper-tab id="triTabItem" select-id\$="{{_computeSelectAttr(item, attrForSelected, _tabElements.length)}}" tab-item="{{item}}">
					<div class="tri-content">
						<iron-icon hidden\$="{{!item.icon}}" icon="{{item.icon}}"></iron-icon>
						<span hidden\$="{{!item.label}}" dir="[[dir]]">{{_computeLabel(item, _tabElements.length)}}</span>
						<span id="badge">
							<span id\$="{{_computeId(index)}}" class\$="[[_computeBadgeLabelClass(item, _tabElements.length)]]" hidden\$="{{!_hasBadge(item, _tabElements.length)}}" dir="ltr">{{_computeBadgeLabel(item, _tabElements.length)}}</span>
						</span>
						<template is="dom-if" if="[[_computeBadgeIcon(item, _tabElements.length)]]" restamp>
							<paper-badge class="tri-badge-item" icon\$="{{_computeBadgeIcon(item, _tabElements.length)}}" for\$="{{_computeId(index)}}"></paper-badge>
						</template>
					</div>
					<triblock-slide-animation hidden="{{!primary}}"></triblock-slide-animation>
				</paper-tab>
			</template>
		</paper-tabs>
	`,

    is: "triblock-tabs",

    behaviors: [
	    TriBlockSlideAnimationBehavior,
	    TriBlockBadgeContainerBehavior,
	    TriBlockNavIronPagesContainerBehavior,
	    TriBlockNavSelectContainerBehavior,
	    TriDirBehavior
	],

    properties: {
		/**
		 * If true, tabs are created with primary tabs styles.
		 */
		primary: {
			type: Boolean,
			value: false
		},
		_tabElements: Array,
		/**
		 * Specifies the text direction of the component's content.
		 */
		dir: {
			type: String,
			value: "ltr"
		},
		/**
		 * Number of milliseconds until tabs are refreshed on the page.
		 */
		refreshDelay: {
			type: Number,
			value: 0
		},
		/**
		 * paper-tabs: If true, scroll buttons (left/right arrow) will be hidden for scrollable tabs.
		 */
		hideScrollButtons: {
			type: Boolean,
			value: false
		},
		/**
		 * paper-tabs: If true, tabs expand to fit their container. This currently only applies when scrollable is true.
		 * By default, triblock-tabs is scrollable.
		 */
		fitContainer: {
			type: Boolean,
			value: false
		},
	},

    listeners: {
		'update': '_tabsUpdated',
		'badge-update': '_tabsUpdated'
	},

    observers: [
		'_handleBadgeMaxNumberAndTabs(badgeMaxNumber, _tabElements)'
	],

    attached: function() {
		if (!this._tabElementsLoaded()) {
		this._retrieveTabs();
		}
		var boundHandler = this._handleContentNodesChanged.bind(this);
		this._observer = dom(this.$.tabsContent).observeNodes(boundHandler);
		
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if (textDirectionValue==="rtl") {
			this.set('dir', "rtl");
		}
	},

    ready: function() {
		if (!this._tabElementsLoaded()) {
			this._retrieveTabs();
		}
	},

	_computeBadgeLabelClass: function(item, length) {
		let badgeLabel = (item.badgeLabel || item.badgeNumber > 0);
		let badgeIcon = !!item.badgeIcon;
		if(badgeLabel && badgeIcon) return "has-badge-label-icon";
		else if(badgeLabel && !badgeIcon) return "has-badge-label";
		else if(!badgeLabel && badgeIcon) return "has-badge-icon";
		else return "";
	},

    _handleContentNodesChanged: function(info) {
		this.async(function() {
			this.refreshTabs();
		}, this.refreshDelay);
	},

    _getElementsToApplyIronPagesId: function() {
		if (!this._tabElements) {
			this._retrieveTabs();
		}
	
		return this._tabElements;
	},

    _retrieveTabs: function() {
		var tabs = Array.from(dom(this).querySelectorAll("[slot=tab]"));
		this.set('_tabElements', tabs);
	},

    _handleBadgeMaxNumberAndTabs: function(badgeMaxNumber, _tabElements) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setBadgeMaxNumber(_tabElements);
	},

    _handleIronSelected: function(e) {
		this._slideUp(e.detail.item);
		this._navigate(e);
	},

    _handleIronDeselected: function(e) {
		this._slideDown(e.detail.item);
	},

    _computePaperTabsClass: function(primary) {
		return primary ? "primary" : "secondary";
	},

    _computeId: function(index) {
		return "tab-content-" + index;
	},

    _computeLabel: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.label;
	},

    _computeBadgeIcon: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
				return;
		}

		return item.badgeIcon;
	},

    _computeBadgeLabel: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.badgeLabel;
	},

    _tabElementsLoaded: function() {
		return (this._tabElements && this._tabElements.length > 0);
	},

    _navigate: function(e) {
    	let tabItem = e.detail.item.tabItem;
    	setTimeout(() => tabItem._navigate());
	},

    _hasBadge: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this._tabElementsLoaded() && (item._hasBadgeLabel() || item.badgeIcon)) {
			return true;
		}

		return false;
	},

    _tabsUpdated: function() {
		this.refreshTabs();
	},

    /**
	 * Refreshes the tabs with the latest configuration.  You should call this after the tabs are dynamically changed or updated.
	 */
	refreshTabs: function() {
		this.debounce("refreshTabs", function() {
			this._retrieveTabs();
			this._computeInitialSelection(this._tabElements);
			setTimeout(() => this.refreshBadges(), 100);
		});
	},

	refreshBadges: function() {
		var badgeElements = this.shadowRoot.querySelectorAll(".tri-badge-item");
		if(badgeElements && badgeElements.length > 0) {
			for(var i = 0; i < badgeElements.length; i++) {
				badgeElements[i].updatePosition();
			}
		}
	},

    _computeSelectAttr: function(item, attrForSelected, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.getAttribute(attrForSelected);
	}
});