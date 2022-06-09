/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2020 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { FlattenedNodesObserver } from "../@polymer/polymer/lib/utils/flattened-nodes-observer.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import { TriBlockNavIronPagesContainerBehavior } from "../triblock-nav-behavior/triblock-nav-iron-pages-container-behavior.js";
import "../@polymer/paper-toolbar/paper-toolbar.js";
import "../@polymer/paper-drawer-panel/paper-drawer-panel.js";
import "../@polymer/paper-header-panel/paper-header-panel.js";
import "../@polymer/paper-listbox/paper-listbox.js";
import "../@polymer/paper-item/paper-item.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../@polymer/iron-icons/iron-icons.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import "../triplat-icon/triplat-icon.js";
import "../triplat-signout-button/triplat-signout.js";
import "./triblock-banner-button.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
`triblock-app-layout` is a component that provides a basic application layout with a responsive banner.  The banner contains a toolbar for navigation items or banner buttons.
  On small-screen devices, the banner buttons are moved to a mobile menu drawer where their labels are displayed together with their icons.
  
  There are 3 pre-defined banner buttons in the `triblock-app-layout` component:  Back, Home, and Sign Out.  Use the `triblock-banner-button` component to configure the Home, Back, and any custom banner buttons. See <a href="?active=triblock-banner-button">triblock-banner-button</a> for more information.
	
  The Sign Out banner button has its own pre-defined navigation behavior, so there is no need to define a `triblock-banner-button` element for this.
  However, you will need to enable the Back and Home banner buttons by providing `triblock-banner-button` elements with an attribute of `back` and `home` respectively and provide navigation properties if you need to display them on the banner.
  If there are no labels provided, these banner buttons will have their default labels as `Back` and `Home` respectively. 
  For banner buttons that are not defined as `back` or `home`, they are considered as custom banner buttons.
  All banner buttons should have a slot attribute with a value of `banner-button`.
  
  The content of your application will need the `content` attribute to apply the necessary styles for the application layout. 
  
  Example:

	<triblock-app-layout app-label="Group Move">
	  <triblock-banner-button 
		tap-handler="_navigateToHome" slot="banner-button" home></triblock-banner-button>
	  <triblock-banner-button 
		tap-handler="_navigateToBack" slot="banner-button" back></triblock-banner-button>
	  <triblock-banner-button 
		icon="ibm:world-globe" 
		label="Watson Analytics" 
		tap-handler="_navigateToWatson" slot="banner-button"></triblock-banner-button>
	  <iron-pages content>
		  <div id="page1">Page 1 Content</div>
		  <div id="page2">Page 2 Content</div>
		  <div id="page3">Page 3 Content</div>
	  </iron-pages>
	</triblock-app-layout>
  

  ### Default positioning of the banner buttons
  
  If enabled, the Back button appears first in the banner, followed by the custom buttons in the order they are defined, then the Home button, and lastly the Sign Out button.
  The same order is used when rendering these buttons on the mobile drawer.
  
  
  ### Override banner title
  
  The `triblock-app-layout` component has a default title of `IBM TRIRIGA <app-label>`.  You can override this by providing an element containing a slot attribute with a value of `app-title`.
  The text content of the `app-title` slot element is set as the title of the current document.  You can override this by providing a value to the `title` attribute of the `app-title` slot element. 
  
  Example:

	<triblock-app-layout>
	  <div slot="app-title" title="My Company">
		<span>My Company</span> <b>Reports</b>
	  </div>
	  <triblock-banner-button 
		tap-handler="_navigateToHome" home></triblock-banner-button>
	  <triblock-banner-button 
		tap-handler="_navigateToBack" back></triblock-banner-button>
	  <triblock-banner-button 
		icon="ibm:world-globe" 
		label="Watson Analytics" 
		tap-handler="_navigateToWatson"></triblock-banner-button>
	  <iron-pages content>
		  <div id="page1">Page 1 Content</div>
		  <div id="page2">Page 2 Content</div>
		  <div id="page3">Page 3 Content</div>
	  </iron-pages>
	</triblock-app-layout>
  
  In the example above, the title of the banner and page is `My Company Reports`.


  ### Styling
  
  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-app-layout-banner-background-color` | Background color applied to the banner | `--tri-header-background-color`
  `--triblock-app-layout-banner-color` | Color applied to the banner text and buttons | `--tri-header-color`
  `--triblock-app-layout-banner-height` | Height applied to the banner | `50px`
  `--triblock-app-layout-banner-mobile-back-button` | Mixin applied to mobile back button | `{}`
  `--triblock-app-layout-banner-mobile-back-label` | Mixin applied to mobile back label | `{}`
  `--triblock-app-layout-banner-mobile-page-label` | Mixin applied to mobile page label | `{}`
  `--triblock-app-layout-banner` | Mixin applied to the banner | `{}`
  `--triblock-app-layout-banner-button-color` | Color applied to banner buttons | `--tri-header-color`
  `--triblock-app-layout-banner-button-hover-color` | Color applied to banner buttons on hover | `--tri-footer-icon-button-hover-color`
  `--triblock-app-layout-banner-button-press-color` | Color applied to banner buttons on press | `--tri-footer-icon-button-press-color`
  `--triblock-app-layout-banner-button-label` | Mixin applied to banner button labels | `{}`
  `--triblock-app-layout-mobile-drawer-background-color` | Background color applied to the mobile drawer | `--tri-primary-color-70`
  `--triblock-app-layout-mobile-drawer-color` | Color applied to the mobile drawer text and icons | `--tri-header-color`
  `--triblock-app-layout-mobile-drawer-icon-color` | Color applied to the mobile drawer icons | `--tri-header-color`
  `--triblock-app-layout-mobile-drawer-hover-background-color` | Background color applied to the mobile drawer menu items on hover and focus | `--tri-primary-color-80`
  `--triblock-app-layout-mobile-drawer-z-index` | z-index applied to mobile drawer | `104`
  `--triblock-app-layout-paper-drawer-panel` | Mixin applied to paper-drawer-panel | `{}`
  `--triblock-app-layout-scrim-z-index` | z-index applied to scrim (dark overlay when drawer opens) | `3`
  `--triblock-app-layout-content-max-width` | Maximum width applied to the content | `1100px`
  `--triblock-app-layout-body-background-color` | Color applied to the background of the body | `--tri-body-background-color`
  
@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">


				paper-header-panel {
					background-color: var(--triblock-app-layout-body-background-color, var(--tri-body-background-color));
					--paper-header-panel-container: {
						-webkit-overflow-scrolling: auto; 
					}
				}

				paper-toolbar {
					background-color: var(--triblock-app-layout-banner-background-color, var(--tri-header-background-color));
					color: var(--triblock-app-layout-banner-color, var(--tri-header-color));
					--paper-toolbar-height: var(--triblock-app-layout-banner-height, 50px);
					--paper-toolbar-sm-height: var(--triblock-app-layout-banner-height, 50px);
					--paper-toolbar-content: {
						padding: 0 0 0 0;
						max-width: var(--triblock-app-layout-content-max-width, 1440px);
						width: 100%;
						margin: 0 auto;
					};
					@apply --triblock-app-layout-banner;
				}
				
				.ibm {
					font-weight: lighter;
				}

				.app-title {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
					@apply --paper-font-common-nowrap;
					font-size: 18px;
				}
				
				.app-title-padding {
					padding-left: 15px;
				}
				
				.app-title-padding[dir="rtl"] {
					padding-right: 15px;
				}

				.back-placeholder {
					min-width: 44px;
				}

				.back-button {
					@apply --triblock-app-layout-banner-mobile-back-button;
				}
				
				.back-label {
					font-size: 18px;
					@apply --triblock-app-layout-banner-mobile-back-label;
				}
				
				.page-label {
					@apply --layout-flex;
					@apply --paper-font-common-nowrap;
					text-align: center;
					font-size: 18px;

					@apply --triblock-app-layout-banner-mobile-page-label;
				}

				.toolbar-buttons {
					@apply --layout-horizontal;
					@apply --layout-center;
				}
				
				.toolbar-button {
					color: var(--triblock-app-layout-banner-button-color, var(--tri-header-color));
					padding: 8px;
					height: 44px;
					margin: 0px;
					min-width: 0px;
					margin-right: 3px;
				}
				
				.toolbar-button[dir="rtl"]{
					margin: 0px;
					margin-left: 3px;
				}
				
				.toolbar-button:hover {
					color: var(--triblock-app-layout-banner-button-hover-color, var(--tri-footer-icon-button-hover-color));
				}
				
				.toolbar-button[pressed] {
					color: var(--triblock-app-layout-banner-button-press-color, var(--tri-footer-icon-button-press-color));
				}
				
				.toolbar-button > iron-icon {
					width: 28px;
					height: 28px;
					padding: 0px;
					color: inherit;
				}
				
				.toolbar-button > span {
					padding: 0px 0px 0px 10px;
					@apply --triblock-app-layout-banner-button-label;
				}
				
				.toolbar-button[dir="rtl"] > span {
					padding: 0px 10px 0px 0px;
				}
					
				iron-icon[dir="rtl"] {
					transform: scaleX(-1);		
				}
				
				iron-icon {
					flex-shrink: 0;
					padding-right: 10px;
					color: var(--triblock-app-layout-mobile-drawer-icon-color, var(--tri-header-color));
				}
				
				paper-drawer-panel {
					--paper-drawer-panel-scrim: {
						z-index: var(--triblock-app-layout-scrim-z-index, 3);
					};
					--paper-drawer-panel-drawer-container: {
						z-index: var(--triblock-app-layout-mobile-drawer-z-index, 104);
						background-color: var(--triblock-app-layout-mobile-drawer-background-color, var(--tri-primary-color-70));
					};

					@apply --triblock-app-layout-paper-drawer-panel;
				}

				paper-listbox {
					--paper-listbox-background-color: var(--triblock-app-layout-mobile-drawer-background-color, var(--tri-primary-color-70));
					--paper-listbox-color: var(--triblock-app-layout-mobile-drawer-color, var(--tri-header-color));
					--paper-item-selected: {
						opacity: 1;
						font-weight: normal;
					};
					--paper-item-focused: {
						background-color: var(--triblock-app-layout-mobile-drawer-hover-background-color, var(--tri-primary-color-80));
					};
					--paper-item:focus:after: {
						background-color: var(--triblock-app-layout-mobile-drawer-background-color, var(--tri-primary-color-70));
					};
					--paper-listbox: {
						padding: 0 0;
					};
				}

				paper-item {
					--paper-item: {
						cursor: pointer;
						padding: 10px 16px;
					};
					--paper-item-min-height: 40px;
				}
			
				paper-item:hover {
					background-color: var(--triblock-app-layout-mobile-drawer-hover-background-color, var(--tri-primary-color-80));
				}
				
				paper-item:focus:before {
					background-color: var(--triblock-app-layout-mobile-drawer-hover-background-color, var(--tri-primary-color-80));
				}

				.drawer-close-container {
					@apply --layout-horizontal;
					@apply --layout-end-justified;
				}
				
				.content > ::slotted([content]) {
					@apply --layout-fit;
					max-width: var(--triblock-app-layout-content-max-width, 1440px);
					margin: 0 auto;
					width: 100%;
				}

				.page-label, .back-label{
					text-overflow: ellipsis;
				} 
				
				.app-title > b{
					overflow:hidden;
					text-overflow: ellipsis;
				}

			
		</style>

		<template is="dom-if" if="[[disable]]">
			<div class="content">
				<slot></slot>
			</div>
		</template>
		
		<template id="notDisabledIf" is="dom-if" if="[[!disable]]">
			
		<iron-media-query query="{{_computeMediaQuery(responsiveWidth)}}" query-matches="{{_responsiveWidthMet}}"></iron-media-query>

		<slot id="bannerButtonSlot" name="banner-button"></slot>
		<triplat-signout id="signout" home-app="[[homeApp]]"></triplat-signout>

		<paper-drawer-panel id="mobileDrawer" right-drawer="[[_computeDrawerPosition(_dir)]]" force-narrow="" disable-swipe="[[_responsiveWidthMet]]" disable-edge-swipe="[[_disableEdgeSwipeDrawer(_responsiveWidthMet, disableEdgeSwipe)]]" drawer-width="[[drawerWidth]]">
			<paper-header-panel main="" mode="seamed" slot="main">
				<paper-toolbar slot="header">
					<div slot="top">
						<template is="dom-repeat" items="{{_bannerButtonElements}}" filter="_isHomeButton">
							<paper-button dir="[[_dir]]" noink="" class="toolbar-button tri-disable-theme" on-tap="_handleHomeButtonTapped" aria-label\$="[[_computeHomeLabel(item)]]" alt\$="[[_computeHomeLabel(item)]]" banner-item="[[item]]" hidden="[[_computeShowBackButton(_responsiveWidthMet, showMobileBackButton)]]">
								<iron-icon dir="[[_dir]]" icon\$="[[_computeHomeIcon(item)]]"></iron-icon><span hidden\$="[[_computeHideButtonLabel(item, displayButtonLabel)]]">[[item.label]]</span>
							</paper-button>
						</template>
					</div>
					<div class\$="[[_computeAppTitleStyleClass(_hasHomeButton)]]" dir="[[_dir]]" hidden\$="[[_computeShowBackButton(_responsiveWidthMet, showMobileBackButton)]]" slot="top">
						<template is="dom-if" if="{{!_hasAppTitle}}">
							<div><span class="ibm">IBM&nbsp;</span><b>TRIRIGA [[appLabel]]</b></div>
						</template>
						<slot name="app-title"></slot>
					</div>
					<div class="back-placeholder" hidden\$="{{!_computeShowBackButton(_responsiveWidthMet, showMobileBackButton)}}" slot="top">
						<template is="dom-repeat" items="{{_bannerButtonElements}}" filter="_isBackButton">
							<paper-button dir="[[_dir]]" noink="" class="back-button toolbar-button tri-disable-theme" on-tap="_handleBackButtonTapped" aria-label\$="{{_computeBackLabel(item)}}" alt\$="[[_computeBackLabel(item)]]" banner-item="[[item]]">
								<iron-icon dir="[[_dir]]" icon\$="[[_computeBackIcon(item)]]"></iron-icon><span class="back-label" hidden\$="[[!_computeShowBackLabel(mobilePageLabel)]]">[[item.label]]</span>
							</paper-button>
						</template>
					</div>
					<div class="page-label" hidden\$="{{!_computeShowBackButton(_responsiveWidthMet, showMobileBackButton)}}" slot="top">
						[[mobilePageLabel]]
					</div>
					<div class="toolbar-buttons" hidden\$="{{!_responsiveWidthMet}}" slot="top">
						<template is="dom-repeat" items="{{_bannerButtonElements}}" filter="_isCustomButton">
							<paper-button dir="[[_dir]]" noink="" class="toolbar-button tri-disable-theme" on-tap="_handleCustomButtonTapped" banner-item="[[item]]" aria-label\$="[[item.label]]" alt\$="[[item.label]]">
								<iron-icon dir="[[_dir]]" icon\$="[[item.icon]]"></iron-icon><span hidden\$="[[_computeHideButtonLabel(item, displayButtonLabel)]]">[[item.label]]</span>
							</paper-button>
						</template>
						<paper-button dir="[[_dir]]" noink="" class="toolbar-button tri-disable-theme" on-tap="_signout" aria-label="Sign Out" alt="Sign Out" hidden="[[hideSignoutButton]]">
							<iron-icon dir="[[_dir]]" icon="ibm:sign-out"></iron-icon><span hidden\$="[[!displayButtonLabel]]">Sign Out</span>
						</paper-button>
					</div>
					<paper-button dir="[[_dir]]" noink="" class="dropdown-trigger toolbar-button tri-disable-theme" on-tap="_openMobileDrawer" banner-item="[[item]]" aria-label="Menu" alt="Menu" hidden\$="[[_responsiveWidthMet]]" slot="top">
						<iron-icon dir="[[_dir]]" icon="ibm-glyphs:menu"></iron-icon>
					</paper-button>
				</paper-toolbar>
				<div class="content">
					<slot></slot>
				</div>
			</paper-header-panel>
			<div drawer="" slot="drawer">
				<paper-listbox id="mobileMenu" selected="1">
					<paper-item class="drawer-close-container" on-tap="_closeMobileDrawer" role="menuitemradio">
						<iron-icon icon="ibm:close-cancel-error" class="drawer-close-icon"></iron-icon>
					</paper-item>
					<template is="dom-repeat" items="{{_bannerButtonElements}}" filter="_isCustomButton">
						<paper-item on-tap="_handleCustomButtonDrawerTapped" banner-item="{{item}}" aria-label\$="[[item.label]]" role="menuitemradio">
							<iron-icon dir="[[_dir]]" icon\$="[[item.icon]]"></iron-icon><span>[[item.label]]</span>
						</paper-item>
					</template>
					<template is="dom-repeat" items="{{_bannerButtonElements}}" filter="_isHomeButton">
						<paper-item on-tap="_handleHomeButtonDrawerTapped" banner-item="{{item}}" aria-label\$="{{_computeHomeLabel(item)}}" role="menuitemradio">
							<iron-icon dir="[[_dir]]" icon\$="{{_computeHomeIcon(item)}}"></iron-icon><span>{{_computeHomeLabel(item)}}</span>
						</paper-item>
					</template>
					<paper-item hidden\$="[[hideSignoutButton]]" on-tap="_signout" aria-label="Sign Out" role="menuitemradio">
						<div class="menu-item-container">
							<iron-icon dir="[[_dir]]" icon="ibm:sign-out"></iron-icon><span class="menu-item-label">Sign Out</span>
						</div>
					</paper-item>
				</paper-listbox>
			</div>
		</paper-drawer-panel>
	</template>
	`,

    is: "triblock-app-layout",

    /**
	 * @polymerBehavior
	 */
	behaviors: [TriBlockNavIronPagesContainerBehavior],

    properties: {
		/**
		 * The name of the home application. 
		 * This is used to redirect the user to the home application after signing out from the current application.  
		 */
		homeApp: String,
		/**
		 * Application label displayed in the toolbar after "IBM TRIRIGA". 
		 * You can override this if you have an element containing a slot attribute with a value of `app-title`.
		 */
		appLabel: {
			type: String,
			observer: '_handleAppLabelChanged'
		},
		/**
		 * Hides the Sign Out button.
		 */
		hideSignoutButton: {
			type: Boolean,
			value: false
		},
		/**
		 * Specifies drawer width. 
		 */
		drawerWidth: {
			type: String,
			value: "256px"
		},
		/**
		 * Shows the Back button in mobile view and replaces the application label.
		 */
		showMobileBackButton: {
			type: Boolean,
			value: false
		},
		/**
		 * Max width to enable mobile drawer.
		 */
		responsiveWidth: {
			type: String,
			value: "600px"
		},
		/**
		 * Page label for mobile view. Only shown when showMobileBackButton is true. Note that the back label will be hidden if a page label is provided.
		 */
		mobilePageLabel: {
			type: String,
			value: null
		},
		_hasAppTitle: {
			type: Boolean,
			value: false
		},
		_bannerButtonElements: Array,
		_dir: String,
		/**
		 * If true, swipe from the edge to open the mobile drawer is disabled.
		 */
		disableEdgeSwipe: {
			type: Boolean,
			value: false
		},
		
		/**
		 * If true, this app layout will not be applied to the `content`.
		 */
		disable: {
			type: Boolean,
			value: false
		},
		/**
		 * If true, It displays the button labels in the toolbar.
		 */
		displayButtonLabel: {
			type: Boolean,
			value: false
		},
		_hasHomeButton: {
			type: Boolean,
			value: false
		}
	},

    _escKeyDownHandler: null,

    attached: function() {
		this._escKeyDownHandler = this._escKeyHandler.bind(this);
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		this.set('_dir', textDirectionValue ? textDirectionValue : "ltr");
		if(!this.disable) {
			this.$.notDisabledIf.render();
			this._retrieveBannerButtonItems();
			this._handleAppTitleContent();
			this._observer = new FlattenedNodesObserver(this.$$("#bannerButtonSlot"), () => {
				this._retrieveBannerButtonItems();
				this._handleAppTitleContent();
			});
		}
	},

	detached: function() {
		if (this._observer != null) {
			this._observer.disconnect();
			this._observer = null;
		}
	},

    _retrieveBannerButtonItems: function() {
		const bannerButtonElements = Array.from(dom(this).querySelectorAll("[slot=banner-button]"));
		this.set('_bannerButtonElements', bannerButtonElements);
		const homeButton = dom(this).querySelector("triblock-banner-button[home]");
		if (homeButton) {
			this.set('_hasHomeButton', true);
		} else {
			this.set('_hasHomeButton', false);
		}
	},

    _getElementsToApplyIronPagesId: function() {
		if (!this._bannerButtonElements) {
			this._retrieveBannerButtonItems();
		}
	
		return this._bannerButtonElements;
	},

    _computeDrawerPosition: function(dir) {
		if (dir==="rtl") {
			return false;
		} else {
			return true;
		}
	},

    _computeMediaQuery: function(responsiveWidth) {
		return "min-width: " + responsiveWidth;
	},

    _escKeyHandler: function(e) {
		if (e.keyCode === 27) {
			e.preventDefault();
			this._closeMobileDrawer();
		}
	},

    _handleAppTitleContent: function() {
		var appTitleContent = dom(this).querySelector("[slot=app-title]");
		if (appTitleContent) {
			this.set('_hasAppTitle', true);
			document.title = appTitleContent.title ? appTitleContent.title : appTitleContent.textContent;
		}
	},

    _isCustomButton: function(item) {
		return !this._isBackButton(item) && !this._isHomeButton(item);
	},

    _isHomeButton: function(item) {
		return item.home;
	},

    _isBackButton: function(item) {
		return item.back;
	},

    _computeBackIcon: function(item) {
		return item.icon ? item.icon : "ibm-glyphs:back";
	},

    _computeHomeIcon: function(item) {
		return item.icon ? item.icon : "ibm:home";
	},

    _computeHomeLabel: function(item) {
		var __dictionary__home = "Home";
		return item.label ? item.label : __dictionary__home;
	},

    _computeBackLabel: function(item) {
		var __dictionary__back = "Back";
		return item.label ? item.label : __dictionary__back;
	},

    _computeShowBackButton: function(responsiveWidthMet, showMobileBackButton) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return !responsiveWidthMet && showMobileBackButton;
	},

    _computeShowBackLabel: function(pageLabel) {
		return !pageLabel;
	},

    _handleAppLabelChanged: function(appLabel) {
		if (!this._hasAppTitle) {
			document.title = "IBM TRIRIGA " + appLabel;
		}
	},

    _handleBackButtonTapped: function(e) { 
		if (e.currentTarget.bannerItem){
			this._navigate(e.currentTarget.bannerItem); 
		}
	},

    _handleHomeButtonTapped: function(e) {
		this._navigate(e.currentTarget.bannerItem); 
	},

    _handleHomeButtonDrawerTapped: function(e) {
		this._handleHomeButtonTapped(e);
		this._closeMobileDrawer(); 
	},

    _handleCustomButtonTapped: function(e) {
		this._navigate(e.currentTarget.bannerItem); 
	},

    _handleCustomButtonDrawerTapped: function(e) {
		this._handleCustomButtonTapped(e);
		this._closeMobileDrawer();
	},

    _navigate: function(item) {
		item._navigate(); 
	},

    _openMobileDrawer: function() {
		this._removeEscKeyListener(); //clean-up previous listener before adding
		this._addEscKeyListener();
		this.$$('#mobileDrawer').openDrawer();
	},

    _closeMobileDrawer: function() {
		this._removeEscKeyListener();
		this.$$('#mobileDrawer').closeDrawer();
	},

    _addEscKeyListener: function() {
		this.$$('#mobileMenu').addEventListener('keydown', this._escKeyDownHandler);
	},

    _removeEscKeyListener: function() {
		this.$$('#mobileMenu').removeEventListener('keydown', this._escKeyDownHandler);
	},

    _signout: function() {
		this.$$('#signout').signout();
	},

    _disableEdgeSwipeDrawer: function(responsiveWidthMet, disableEdgeSwipe) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return !responsiveWidthMet && disableEdgeSwipe;
	},

    _computeAppTitleStyleClass: function(_hasHomeButton) {
		return _hasHomeButton ? "app-title" : "app-title app-title-padding";
	},

    _computeHideButtonLabel: function(item, displayButtonLabel) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return !item.label || item.label == "" || !displayButtonLabel;
	}
});