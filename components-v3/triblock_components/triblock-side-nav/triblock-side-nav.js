/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "./triblock-side-nav-item.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../triblock-animation/triblock-slide-animation.js";
import { TriBlockSlideAnimationBehavior } from "../triblock-animation/triblock-slide-animation-behavior.js";
import { TriBlockBadgeContainerBehavior } from "../triblock-badge-behavior/triblock-badge-container-behavior.js";
import { TriBlockNavSelectContainerBehavior } from "../triblock-nav-behavior/triblock-nav-select-container-behavior.js";
import { TriBlockNavIronPagesContainerBehavior } from "../triblock-nav-behavior/triblock-nav-iron-pages-container-behavior.js";
import "../@polymer/paper-badge/paper-badge.js";
import "../@polymer/paper-listbox/paper-listbox.js";
import "../@polymer/paper-item/paper-item.js";
import "../@polymer/iron-icons/iron-icons.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { getModuleUrl, assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
`triblock-side-nav` is a component which provides a group of navigation items that will be rendered vertically on the page.
  
  Use the `triblock-side-nav-item` component and `side-nav-item` slot attribute to configure the navigation items that will be rendered in the side navigation.  This is the only supported component that can be used inside the `triblock-side-nav`.  See <a href="?active=triblock-side-nav-item">triblock-side-nav-item</a> for more information.

  Example:

	<triblock-side-nav>
	  <triblock-side-nav-item 
		icon="activity" 
		label="Activity"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		icon="admin" 
		label="Admin"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		icon="applications" 
		label="Application"
		slot="side-nav-item"></triblock-side-nav-item>
	</triblock-side-nav>
  
  
  ### Default maximum badge number
  
  It implements badge container behavior which propagates its `badge-max-number` value to its navigation items that do not have a value for its `badge-max-number` property.  See <a href="?active=TriBlockBadgeContainerBehavior">TriBlockBadgeContainerBehavior</a> for more information.
  
  Example:
  
	<triblock-side-nav badge-max-number="99">
	  <triblock-side-nav-item 
		icon="activity" 
		label="Activity" 
		badge-max-number="50"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		icon="admin" 
		label="Admin"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		icon="applications" 
		label="Application"
		slot="side-nav-item"></triblock-side-nav-item>
	</triblock-side-nav>
  
  The `Activity` navigation item above will have a maximum badge number of 50 while the other two navigation items will have 99 as their maximum badge number which comes from the `triblock-side-nav`.

  
  ### Default id for `iron-pages` 
  
  It implements iron pages container behavior which propagates its `iron-pages-id` value to its navigation items that do not have a value for its `iron-pages-id` property.  When the `triblock-side-nav` component is used as a `nav` component inside the `triblock-side-nav-layout` component the `iron-pages-id` property will be automatically assigned a value from the `id` of the `iron-pages` component that is marked as `page` inside the layout component.  In this usage, you do not need to set a value for the `iron-pages-id` property.  See <a href="?active=TriBlockNavIronPagesContainerBehavior">TriBlockNavIronPagesContainerBehavior</a> for more information. 
  
  
  ### Selection
  
  It implements navigation selection behavior which maintains the currently selected navigation item based on the `id` or `attr-for-selected` property of its navigation items.  Use the `selected` property to get or set the selected side navigation item.  The index of the navigation item is not supported as a value for the `selected` property.  See <a href="?active=TriBlockNavSelectContainerBehavior">TriBlockNavSelectContainerBehavior</a> for more information.
  
  `id` example:
  
	<triblock-side-nav selected="activityNav">
	  <triblock-side-nav-item 
		id="activityNav" 
		icon="activity" 
		label="Activity"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		id="adminNav" 
		icon="admin" 
		label="Admin"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		id="applicationNav" 
		icon="applications" 
		label="Application"
		slot="side-nav-item"></triblock-side-nav-item>
	</triblock-side-nav>
	
  The `Activity` navigation item will be selected by default.

  `attr-for-selected` example:
  
	<triblock-side-nav selected="adminNav" attr-for-selected="route-to">
	  <triblock-side-nav-item 
		route-to="activityNav" 
		icon="activity" 
		label="Activity"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		route-to="adminNav" 
		icon="admin" 
		label="Admin"
		slot="side-nav-item"></triblock-side-nav-item>
	  <triblock-side-nav-item 
		route-to="applicationNav" 
		icon="applications" 
		label="Application"
		slot="side-nav-item"></triblock-side-nav-item>
	</triblock-side-nav>
	
  The `Admin` navigation item will be selected by default.
  
  
  ### Default styling
  
  The `triblock-side-nav` component comes with default TRIRIGA application styling such as:
  <ul>
	  <li>On hover or focus, a band appears from the right side of the navigation item and follows the cursor between navigation items.</li>
	  <li>On hover or focus or selected, the navigation item label and icon change its opacity so that navigation item appears prominent.</li>
	  <li>When selected, the navigation band slides right to left and the navigation item color changes.</li>
	  <li>When unselected, the navigation band slides left to right and returns to its unselected or default state.</li>
	  <li>Rectangular shape for text and number badges.</li>
  </ul>
  
  
  ### Styling
  
  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-side-nav-container` | Mixin applied to the side navigation container  | `{}`
  `--triblock-side-nav` | Mixin applied to the side navigation | `{}`
  `--triblock-side-nav-item` | Mixin applied to the navigation item  | `{}`
  `--triblock-side-nav-item-selected` | Mixin applied to the selected navigation item  | `opacity:1`
  `--triblock-side-nav-item-focused-after` | Mixin applied to the after pseudo element of the focused navigation item | `opacity:0`
  `--triblock-side-nav-item-hover` | Mixin applied to the navigation item when it is hovered on | `{}`    
  `--triblock-side-nav-item-min-height` | Minimum height applied to the navigation item | `80px`
  `--triblock-side-nav-item-selected-weight` | Weight applied to the selected navigation item | `{}`
  `--triblock-side-nav-item-disabled` | Mixin applied to the disabled navigation item | `{}`  
  `--triblock-side-nav-item-focused-band-width` | Width applied to the band when navigation item is focused or hovered on  | `5px`, 
  `--triblock-side-nav-width` | Width applied to the side navigation | `80px`
  `--triblock-side-nav-item-focused-band` | Mixin applied to the band that appears when the navigation item is focused or hovered on | `{}`
  `--triblock-side-nav-bg-color` | Background color applied to the side navigation | `--tri-header-background-color`, 
  `--triblock-side-nav-item-icon-height` | Height applied to the icon of the navigation item | `32px`
  `--triblock-side-nav-item-icon-width` | Width applied to the icon of the navigation item  | `32px`
  `--triblock-side-nav-icon` | Mixin applied to the icon of the navigation item | `{}`
  `--triblock-side-nav-item-label-icon-selected-color` | Color applied to the icon and label when the navigation item is selected | `white`
  `--triblock-side-nav-item-content-selected` | Mixin applied to the icon and label when the navigation item is selected | `{}`  
  `--triblock-side-nav-item-label-icon-color` | Color applied to the label and icon when the navigation item is not selected | `white`  
  `--triblock-side-nav-item-label-font-size` | Font size applied to the label when the navigation item is not selected | `12px`
  `--triblock-side-nav-item-unselected` | Mixin applied to the label and icon when the navigation item is not selected  | `{}`
  `--triblock-side-nav-item-content-focused` | Mixin applied to the label and icon when the navigation item is focused or hovered on | `{}`
  `--triblock-side-nav-item-label` | Mixin applied to the label of the navigation item | `{}`
  `--triblock-side-nav-badge` | Mixin applied to the badge of the navigation item | `{}`
  `--triblock-side-nav-item-selected-color` | Background color applied to the slider when navigation item is selected. | `--tri-primary-color-60`
  `--triblock-side-nav-badge-label-background-color` | Background color applied to the badge label of the navigation item | `white`
  `--triblock-side-nav-badge-text-color` | Color applied to the text of the badge of the navigation item | `--ibm-gray-70`
  `--triblock-side-nav-badge-label` | Mixin applied to the badge label of the navigation item | `{}`
  `--triblock-side-nav-badge-label-width` | Width applied to the badge of the navigation item | `24px`
  `--triblock-side-nav-badge-label-height` | Height applied to the badge of the navigation item | `17px`
  `--triblock-side-nav-badge-label-margin-left` | Left margin applied to the badge of the navigation item | `10px`
  `--triblock-side-nav-badge-label-margin-bottom` | Bottom margin applied to the badge of the navigation item | `{}`
  `--triblock-side-nav-badge-icon` | Mixin applied to the badge icon of the navigation item | `{}`
  `--triblock-side-nav-badge-icon-width` | Width applied to the badge icon circle of the navigation item | `20px`
  `--triblock-side-nav-badge-icon-height` | Height applied to the badge icon circle of the navigation item  | `20px`
  `--triblock-side-nav-badge-icon-icon-width` | Width applied to the badge icon's inner icon of the navigation item | `12px`
  `--triblock-side-nav-badge-icon-icon-height` | Height applied to the badge icon's inner icon of the navigation item  | `12px`

  
@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					display: flex;

					@apply --triblock-side-nav-container;
				};

				paper-listbox {
					--paper-listbox: {
						@apply --triblock-side-nav;
					};

					--paper-item:focus:after: {
						opacity: 0;

						@apply --triblock-side-nav-item-focused-after;
					};

					--paper-item-selected: {
						opacity: 1;

						@apply --triblock-side-nav-item-selected;
					};

				}

				paper-item {
					@apply --layout-vertical;
					@apply --layout-center-justified;
					/* padding: 15px 0px 15px 0px; */
					--paper-item-min-height: var(--triblock-side-nav-item-min-height, 80px);
					--paper-item-selected-weight: var(--triblock-side-nav-item-selected-weight);
					--paper-item-disabled: {
						opacity: 0.5;
						@apply --triblock-side-nav-item-disabled;
					};

					@apply --triblock-side-nav-item;
				}

				paper-item:hover {
					cursor: pointer;
					opacity: 1;
					
					@apply --triblock-side-nav-item-hover;
				}

				paper-item:focus {
					outline: 3px double var(--tri-secondary-color) !important;
				}

				paper-item:hover:before, 
				paper-item:focus:before {
					@apply --layout-fit; 
					width: var(--triblock-side-nav-item-focused-band-width, 5px);
					background: var(--triblock-side-nav-item-selected-color, var(--tri-primary-color-60));
					opacity: 1;
					content: '';
					pointer-events: auto;
					transform: translateX(calc(var(--triblock-side-nav-width, 80px) - var(--triblock-side-nav-item-focused-band-width, 5px)));

					@apply --triblock-side-nav-item-focused-band;
				}

				paper-item.rtl:hover:before,
				paper-item.rtl:focus:before {
					@apply --layout-fit; 
					width: var(--triblock-side-nav-item-focused-band-width, 5px);
					background: var(--triblock-side-nav-item-selected-color, var(--tri-primary-color-60));
					opacity: 1;
					content: '';
					pointer-events: auto; 
					transform: translateX(calc(var(--triblock-side-nav-item-focused-band-width, 5px) - var(--triblock-side-nav-width, 80px)));

					@apply --triblock-side-nav-item-focused-band;
				}

				#triMenu {
					background-color: var(--triblock-side-nav-bg-color, var(--tri-header-background-color));
					width: var(--triblock-side-nav-width, 80px);
					text-align: center;
					overflow-x: hidden;

					@apply --triblock-side-nav;
				}

				#triMenu paper-item iron-icon{
					height: var(--triblock-side-nav-item-icon-height, 32px);
					width: var(--triblock-side-nav-item-icon-width, 32px);

					@apply --triblock-side-nav-icon;
				}

				#triMenu paper-item.iron-selected {
					opacity: 1;

					@apply --triblock-side-nav-item-selected;
				}

				#triMenu paper-item.iron-selected iron-icon,
				#triMenu paper-item.iron-selected label{
					color: var(--triblock-side-nav-item-label-icon-selected-color, white);
					opacity: 1;
					font-weight: normal;

					@apply --triblock-side-nav-item-content-selected;	
				}

				#triMenu paper-item iron-icon,
				#triMenu paper-item label{
					color: var(--triblock-side-nav-item-label-icon-color, white);
					opacity: 0.8;
					font-size: var(--triblock-side-nav-item-label-font-size, 12px);
					line-height:1;
					z-index: 1;

					@apply --triblock-side-nav-item-unselected;
				}

				#triMenu paper-item:focus iron-icon,
				#triMenu paper-item:hover iron-icon,
				#triMenu paper-item:focus label,
				#triMenu paper-item:hover label{
					opacity: 1;
					font-weight: normal;
					
					@apply --triblock-side-nav-item-content-focused;
				}
				
				#triMenu paper-item label{ 
					z-index: 1;
					cursor: pointer;
					padding-top: 7px;
					
					@apply --triblock-side-nav-item-label;
				}

				triblock-slide-animation {
					--triblock-slide-animation-width: var(--triblock-side-nav-width, 80px);
					--triblock-slide-animation-background-color: var(--triblock-side-nav-item-selected-color, var(--tri-primary-color-60));
				}

				paper-badge {
					--paper-badge: {
						font-family: var(--tri-font-family);
						
						@apply --triblock-side-nav-badge;
					};
				}

				.badge-label {
					--paper-badge-background: var(--triblock-side-nav-badge-label-background-color, white);
					--paper-badge-text-color: var(--triblock-side-nav-badge-text-color, var(--ibm-gray-70));
					--paper-badge: {
						border: 1px solid var(--ibm-blue-60);
						border-radius: 20%;
						font-size: 12px;
						
						@apply --triblock-side-nav-badge-label;
					};
					--paper-badge-width: var(--triblock-side-nav-badge-label-width, 24px);
					--paper-badge-height: var(--triblock-side-nav-badge-label-height, 17px);
					--paper-badge-margin-left: var(--triblock-side-nav-badge-label-margin-left, 10px);
					--paper-badge-margin-bottom: var(--triblock-side-nav-badge-label-margin-bottom);

					z-index: 1;

					@apply --triblock-side-nav-badge-label;
				}

				.badge-icon {
					--paper-badge-background: transparent;
					--paper-badge-width: var(--triblock-side-nav-badge-icon-width, 20px);
					--paper-badge-height: var(--triblock-side-nav-badge-icon-height, 20px);
					--paper-badge-icon-width: var(--triblock-side-nav-badge-icon-icon-width, 12px);
					--paper-badge-icon-height: var(--triblock-side-nav-badge-icon-icon-height, 12px);
					z-index: 1;

					@apply --triblock-side-nav-badge-icon;
				}

				.badge-label.rtl {
					transform: translateX(calc((var(--triblock-side-nav-item-icon-width, 32px) + var(--triblock-side-nav-badge-label-margin-left, 10px)) * -1));
				}
				
				.badge-icon.rtl {
					transform: translateX(calc(var(--triblock-side-nav-item-icon-width, 32px) * -1)) scaleX(-1);
				}
			
		</style>

		<slot style="display: none;" name="side-nav-item"></slot>
		<paper-listbox id="triMenu" selected="{{selected}}" attr-for-selected="select-id" on-iron-select="_handleIronSelected" on-iron-deselect="_handleIronDeselected" tabindex="0">
			<template id="menuTemplate" is="dom-repeat" items="{{_menuItems}}" as="menuItem">
				<paper-item select-id\$="{{_computeSelectAttr(menuItem, attrForSelected, _menuItems.length)}}" menu-item="{{menuItem}}" role="menuitem" disabled="{{_computeDisabled(menuItem, _menuItems.length)}}" aria-label\$="[[_computeLabel(menuItem)]]">
					<triblock-slide-animation></triblock-slide-animation>
					<iron-icon id="{{_computeIconId(menuItem, index, _menuItems.length)}}" icon="{{menuItem.icon}}" mirror="[[_isRTL]]"></iron-icon>
					<label for="{{_computeIconId(menuItem, index, _menuItems.length)}}">[[_computeLabel(menuItem)]]</label>
					<paper-badge id="{{_computeBadgeId(menuItem, index, _menuItems.length)}}" class\$="{{_computeBadgeClass(menuItem, _menuItems.length)}}" hidden\$="{{!_computeBadgeHidden(menuItem, index, _menuItems.length)}}" for="{{_computeIconId(menuItem, index, _menuItems.length)}}" label="{{_computeBadgeLabel(menuItem, _menuItems.length)}}" icon="{{_computeBadgeIcon(menuItem, _menuItems.length)}}"></paper-badge>
				</paper-item>
			</template>
		</paper-listbox>
	`,

    is: "triblock-side-nav",

    /**
	 * @polymerBehavior
	 */
	behaviors: [TriBlockSlideAnimationBehavior, 
				TriBlockBadgeContainerBehavior, 
				TriBlockNavIronPagesContainerBehavior,
				TriBlockNavSelectContainerBehavior],

    properties: {
		_menuItems: [],
		_isRTL: Boolean,
		selected: {
			type: String,
			notify: true
		}
	},

    listeners: {
		'update': '_menuItemUpdated',
		'badge-update': '_menuItemUpdated',
		'dom-change': '_handleRTL'
	},

    observers: [
		'_handleBadgeMaxNumberAndMenuItems(badgeMaxNumber, _menuItems)'
	],

    _getElementsToApplyIronPagesId: function() {
		if (!this._menuItems) {
			this._retrieveMenuItems();
		}
	
		return this._menuItems;
	},

    _menuItemUpdated: function() {
		this._refreshMenu();
	},

    ready: function() {
		if (!this._menuItems) {
			this._retrieveMenuItems();
		}
	},

    attached: function() {
		this._refreshMenu(); // needed to fire dom-change again
	},

    _handleRTL: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if (textDirectionValue==="rtl") {
			this.set('_isRTL', true);
			var paperBadges = Array.from(dom(this.root).querySelectorAll("paper-badge"));
			paperBadges.forEach(function(paperBadge) {
				dom(paperBadge).classList.add("rtl");
			});
			var paperItems = Array.from(dom(this.root).querySelectorAll("paper-item"));
			paperItems.forEach(function(paperItem) {
				dom(paperItem).classList.add("rtl");
			});
		}
	},

    _setIndividualBadgeStyles: function() {
		var badges = Array.from(dom(this.root).querySelectorAll("paper-badge.badge-icon"));
		var menuItemsWithBadge = this._menuItems.filter(function(item) {
			return item.badgeIcon;
		});

		for (var i=0; i < badges.length; i++) {
			var menuItem = this._menuItems[0];
			var badge = badges[i];

			var color = menuItemsWithBadge[i].getComputedStyleValue("color");
			var marginLeft = menuItemsWithBadge[i].getComputedStyleValue("margin-left");

			badge.dataColor = color;
			badge.dataMarginLeft = marginLeft;
		}
	},

    _handleBadgeMaxNumberAndMenuItems: function(badgeMaxNumber, _menuItems) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._setBadgeMaxNumber(_menuItems);
	},

    _computeIconId: function(item, index, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(this._menuItemsLoaded() && index != undefined) { 
			return "icon" + index;
		}

		return null;
	},

    _computeLabel: function(item) {
		return item.label;
	},

    _computeDisabled: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.disabled;
	},

    _computeBadgeId: function(item, index, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(this._menuItemsLoaded() && index != undefined) {
			return "badge" + index;
		}

		return null;
	},

    _computeBadgeClass: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (item.badgeIcon) {
			return "badge-icon";
		} else if (item.badgeLabel) {
			return "badge-label";
		}
	},

    _computeBadgeLabel: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.badgeLabel;
	},

    _computeBadgeIcon: function(item, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return item.badgeIcon ? item.badgeIcon : "";
	},

    _computeBadgeHidden: function(item, index, length) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this._menuItemsLoaded() && (item._hasBadgeLabel() || item.badgeIcon)) {
			return true;
		}

		return false;
	},

    _menuItemsLoaded: function() {
		return (this._menuItems && this._menuItems.length > 0);
	},

    _refreshMenu: function() {
		this.debounce("refreshMenu", function() {
			this._retrieveMenuItems();
			this._updateMenuItemStyles();
			this._computeInitialSelection(this._menuItems);
			this._setIndividualBadgeStyles();
			this._updateBadgeStylesAndPosition();
		});
	},

    _updateMenuItemStyles: function() {
		this._menuItems.forEach(function(item) {
			item.updateStyles();
			var selectValue = this._computeSelectAttr(item, this.attrForSelected);
			if (selectValue != this.selected) {
				this._slideRight(dom(this.root).querySelector(`paper-item[select-id="${selectValue}"]`));
			}
		}.bind(this));
	},

    _retrieveMenuItems: function() {
		var menuItems = Array.from(dom(this).querySelectorAll("[slot=side-nav-item]"));
		this.set('_menuItems', menuItems);
	},

    _updateBadgeStylesAndPosition: function() {
		var badges = Array.from(dom(this.root).querySelectorAll("paper-badge"));
		if (badges && badges.length > 0) {
			badges.forEach(function(badge) {
				//update styles first before updating the position
				if (badge.dataColor && badge.dataMarginLeft) {
					badge.updateStyles({
						"--paper-badge-text-color": badge.dataColor,
						"--paper-badge-margin-left": badge.dataMarginLeft
					});
				}
				badge.updatePosition();
			});
		}
	},

    _handleIronSelected: function(e) {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		this._slideLeft(e.detail.item);
		this._navigate(e);
	},

    _handleIronDeselected: function(e) {
		this._slideRight(e.detail.item);
	},

	_navigate: function(e) {
		let menuItem = e.detail.item.menuItem;
		setTimeout(()=> menuItem._navigate());
	}
});