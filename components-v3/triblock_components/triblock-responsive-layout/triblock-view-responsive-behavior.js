/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import "../@polymer/iron-media-query/iron-media-query.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * `TriBlockViewResponsiveBehavior` can be used to detect when a device is on a certain screen width.
 * @polymerBehavior
 */

export const TriBlockViewResponsiveBehavior = {

	properties:{
		/**
		 * `(Deprecated)` True if the screen width is less than or equal to the size specified by the <b>smallScreenMaxWidth</b> property.
		 */
		smallScreen:  {
			type: Boolean,
			notify: true,
			value: false,
			reflectToAttribute: true
		},
		/**
		 * True if the screen width is less than or equal to the size specified by the <b>smallScreenMaxWidth</b> property.
		 */
		smallScreenWidth:  {
			type: Boolean,
			notify: true,
			value: false,
			reflectToAttribute: true
		},
		/**
		 * The maximum width of a small screen.
		 */
		smallScreenMaxWidth: {
			type: String,
			value: "600px",
		},
		/**
		 * True if the screen height is less than or equal to the size specified by the <b>smallScreenMaxHeight</b> property.
		 */
		 smallScreenHeight:  {
			type: Boolean,
			notify: true,
			value: false,
			reflectToAttribute: true
		},
		/**
		 * The maximum height of a small screen.
		 */
		smallScreenMaxHeight: {
			type: String,
			value: "800px",
		}, 
		/**
		 * True if the screen width is greater than or equal to the size specified by the <b>mediumScreenMinWidth</b> property, 
		 * and less than or equal to the size specified by the <b>mediumScreenMaxWidth</b> property.
		 */
		mediumScreenWidth: {
			type: Boolean,
			notify: true,
			value: false,
			reflectToAttribute: true
		}, 
		/**
		 * The maximum width of a medium screen.
		 */
		mediumScreenMaxWidth: {
			type: String,
			value: "1024px",
		},
		/**
		 * The minimum width of a medium screen.
		 */
		mediumScreenMinWidth: {
			type: String,
			value: "601px",
		},
		
		/**
		 * Disable the automatic detection of screen size changes. 
		 * If true, the properties smallScreenWidth, smallScreenHeight and mediumScreenWidth will not be set by this behavior.
		 * This can be used when a parent component already computed the responsive properties and it will propagate those properties to its children.
		 */
		disableScreenSizeDetection: {
			type: Boolean,
			value: false
		}
	},

	attached: function(){
		this._setMediaQuery();
	},

	_setMediaQuery: function(){
		if(!this._mediaQueryIsSet && !this.disableScreenSizeDetection){
			this._mediaQuery = document.createElement("iron-media-query");
			dom(this.root).appendChild(this._mediaQuery);
			this._mediaQuery.addEventListener("query-matches-changed", this._handleSmallScreen.bind(this));
			this._mediaQuery.query = this.smallScreenMaxWidth ?  "(max-width:"+ this.smallScreenMaxWidth + ")" : "(max-width: 600px)";
			
			this._heightMediaQuery = document.createElement("iron-media-query");
			dom(this.root).appendChild(this._heightMediaQuery);
			this._heightMediaQuery.addEventListener("query-matches-changed", this._handleSmallScreenHeight.bind(this));
			this._heightMediaQuery.query = this.smallScreenMaxHeight ?  "(max-height:"+ this.smallScreenMaxHeight + ")" : "(max-height: 800px)";

			this._mediumMediaQuery = document.createElement("iron-media-query");
			dom(this.root).appendChild(this._mediumMediaQuery);
			this._mediumMediaQuery.addEventListener("query-matches-changed", this._handleMediumScreenWidth.bind(this));
			this._mediumMediaQuery.query = this.mediumScreenMinWidth && this.mediumScreenMaxWidth ?  "(min-width:"+ this.mediumScreenMinWidth + ") and (max-width:" + this.mediumScreenMaxWidth + ")"  : "(max-width: 601px) and (max-width: 1024px)";
			this._mediaQueryIsSet = true;
		}	
	},

	_handleSmallScreen: function(e){
		var isSmallScreen = e.detail.value;
		this.smallScreen = isSmallScreen;
		this.smallScreenWidth = isSmallScreen;
	},
	
	_handleSmallScreenHeight: function(e){
		var isSmallScreenHeight = e.detail.value;
		this.smallScreenHeight = isSmallScreenHeight;
	},

	_handleMediumScreenWidth: function(e){
		var isMediumScreenWidth = e.detail.value;
		this.mediumScreenWidth = isMediumScreenWidth;
	},    
};