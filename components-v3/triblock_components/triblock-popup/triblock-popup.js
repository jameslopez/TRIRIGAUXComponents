/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import { NeonAnimationRunnerBehaviorImpl, NeonAnimationRunnerBehavior } from "../@polymer/neon-animation/neon-animation-runner-behavior.js";
import { PaperDialogBehaviorImpl, PaperDialogBehavior } from "../@polymer/paper-dialog-behavior/paper-dialog-behavior.js";
import "../@polymer/paper-dialog-behavior/paper-dialog-shared-styles.js";
import { IronOverlayBehaviorImpl, IronOverlayBehavior } from "../@polymer/iron-overlay-behavior/iron-overlay-behavior.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/paper-styles/shadow.js";
import { TriBlockViewResponsiveBehavior } from "../triblock-responsive-layout/triblock-view-responsive-behavior.js";
import "../triplat-icon/triplat-icon.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import { TriDirBehavior } from "../tricore-dir-behavior/tricore-dir-behavior.js";
import { importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs(
    ["../web-animations-js/web-animations-next-lite.min.js"],
	"triblock-popup/triblock-popup.js"
);

importJsPromise.then(() => {
/*
`triblock-popup` is a pop-up component that handles the responsive pop-up display on the small screen width and the large screen width. The component implements `triBlockViewResponsiveBehavior` and `paperDialogBehavior`. Similar to `paper-dialog`, the component pops up at the center of the page by default. However, when the component is opened in the small screen width, the component covers the whole page. 

  Example:

  ```html
  <triblock-popup>
	<h2>Header</h2>
	<div class="body">
	  Lorem ipsum...
	</div>  
  </triblock-popup>
  ```

  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-popup-background-color` | Pop-up background color |  --tri-primary-content-background-color
  `--triblock-popup` | Mixin applied to the pop-up | `{}`
  `--triblock-popup-close-button` | Mixin applied to the pop-up close button | `{}`
  
  @demo demo/index.html
*/
    Polymer({
	    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">

				:host{
					background: var(--triblock-popup-background-color, var(--tri-primary-content-background-color));
					@apply --shadow-elevation-16dp;
					padding: 30px;
					@apply --triblock-popup;
				}

				:host([small-screen-width]){
					height: auto !important;
					width: auto !important;
					position: absolute;
					top:0;
					right:0;
					bottom:0;
					left:0;
				}

				paper-icon-button {
					--paper-icon-button: {
						padding: 0px;
					};
				}

				#xbtn {
					position: absolute;
					right: -11px;
					top: -11px;
					z-index: 999;
					height: 22px;
					width: 22px;
					@apply --triblock-popup-close-button;
				}

				:host([dir="rtl"]) #xbtn{
					right: auto;
					left: -11px;
				}

				:host([small-screen-width]) #xbtn {
					display: none;
				}

				#xbtn[focused] {
					color: var(--tri-primary-icon-button-hover-color);
				}
			
		</style>

		<paper-icon-button id="xbtn" icon="ibm-glyphs:popup-close-filled" on-tap="cancel" alt="Close popup"></paper-icon-button>

		<slot></slot>
	`,

	    is: "triblock-popup",
	    behaviors: [TriBlockViewResponsiveBehavior, PaperDialogBehavior, TriDirBehavior],

	    properties: {
			/**
			  * The last node inside the popup that can receive focus.
			  * It is used to cycle the focus from the last node to the first node when `with-backdrop` or `modal` is true.
			  */
			lastNode: {
				type: Object
			},

			/**
			  * The title that will be displayed in the `triblock-app-layout` component banner label when the `smallScreenWidth` property is true. 
			  */
			title: {
				type: String,
				reflectToAttribute: true,
			},

			/**
			  * Set to true, will prevent the popup from close when the application is implemented `triblock-app-layout-banner-popup-behavior` behavior. It can be used to handle the banner back button when is clicked.  
			  */
			manualClose: {
				type: Boolean,
				value: false
			}
		},

	    observers: [
			'_onSmallScreenChanged(smallScreenWidth)',
			'_popupClosed(opened)'
		],

	    attached: function(){
			this._noCancelOnOutsideClick = this.noCancelOnOutsideClick;
			this._noCancelOnEscKey = this.noCancelOnEscKey;
			this._withBackdrop = this.withBackdrop;
			if(navigator.userAgent.match('CriOS')) this._chromeiOS = true;
		},

	    get _focusableNodes() {
			if (this.lastNode) {
				return [
					this.$.xbtn, this.lastNode
				];
			} else {
				// Get the original focusableNodes from IronOverlayBehaviorImpl.
				var propertyDescriptor = Object.getOwnPropertyDescriptor(IronOverlayBehaviorImpl, "_focusableNodes");
				var focusableNodes = propertyDescriptor.get.apply(this);
				
				// If there is at least 1 node, add the close button as the first item of the focusableNodes array.
				if (!focusableNodes || focusableNodes.length == 0) {
					return this.$.xbtn;
				} else {
					focusableNodes.unshift(this.$.xbtn);
					return focusableNodes;
				}
			}
		},

	    /**
		  * Open the pop-up.
		  **/
		openPopup: function(){
			if(this.smallScreenWidth){
				this._openOnSmallScreen();
			}else{
				this._openOnNotSmallScreen();
			}
		},

	    _onSmallScreenChanged: function(){
			if(this.smallScreenWidth){
				if (this.opened){
					this._openOnSmallScreen();
				}
			}else{
				if(this.opened){
					this._openOnNotSmallScreen();
				}
			}
		},

	    _openOnSmallScreen: function(){
			if(this.modal){ 
				this.set('modal', false); 
				this._modalIsUsed = true;
			}
			this.set('noCancelOnOutsideClick', true);
			this.set('noCancelOnEscKey', true);
			this.set('withBackdrop', false);
			this.open();
			this._handleChomeiOS();
		},

	    _openOnNotSmallScreen: function(){
			if(this._modalIsUsed){
				this.set('modal', true);
			}
			this.set('noCancelOnOutsideClick', this._noCancelOnOutsideClick);
			this.set('noCancelOnEscKey', this._noCancelOnEscKey);
			this.set('withBackdrop', this._withBackdrop);
			this.open();
			this._handleChomeiOS();
		},

	    _handleChomeiOS: function(){
			if(this._chromeiOS){
				this.close();
				this.async(function(){
					this.open();
				});
			}
		},

	    /**
		  * Close the pop-up.
		  **/
		closePopup: function(){
			this.close();
		},

	    _popupClosed: function(e){
			if(!this.opened){
				this.closePopup();
				this.fire("popup-opened", {element:null});
			} else {
				this.fire("popup-opened", {element:this});
			}
		},

	    _addDisablePopupMoveClass: function() {
			var css = '.__triBlockPopupDisablePopupMove {display: relative !important; overflow: hidden !important;}';
			var head = document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet){
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);
			this._disablePopupMoveClassAdded = true;
		}
	});


});