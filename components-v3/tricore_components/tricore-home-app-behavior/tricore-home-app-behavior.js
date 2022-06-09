/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * `TriHomeAppBehavior` keeps track of the home app configuration like the app name, label and URL when the app is launched from another app.
 *
 *	<div style="background-color:#FFFFCC">
 *	    <div style="padding:20px;">
 *	        <b>Note:</b> When you implement this behavior, you should include `_getDefaultAppLabel()` method to return the default app label when the home app label is not available.  Otherwise, no label will be set.
 *	    </div>
 *	</div>
 * 
 * @polymerBehavior
 */
export const TriHomeAppBehavior = { 

	properties: {
		/**
		 * The name of the home app from the `homeApp` parameter in the URL.
		 */	
		homeApp: {
			type: String,
			value: null
		},
		/**
		 * The label of the home app from the local storage based on the key from the `homeApp` parameter in the URL plus `AppLabel`.
		 */	
		homeAppLabel: {
			type: String,
			value: null
		},
		/**
		 * The calculated URL of the home app based from the `homeApp` parameter in the URL.
		 */	
		homeUrl: {
			type: String,
			value: null
		},
	},

	ready: function() {
		//retain the call order	
		this._setHomeApp();
		this._setHomeAppLabel();
	},

	_setHomeApp: function() {
		var homeApp = this._getURLParameter('homeApp');
		if (homeApp) {
			this.set("homeApp", homeApp);
			var homeUrl = this.$.triurl.getUrl('/p/web/' + homeApp);
			if (homeUrl) {
				this.set("homeUrl", homeUrl);
			}
		}
	},

	_setHomeAppLabel: function() {
		var homeAppLabel = null;
		if (this.homeApp) {
			homeAppLabel = this._getAppLabelFromStorage();
			if (homeAppLabel) {
				this.set("homeAppLabel", homeAppLabel);
			}
		} 

		if (!homeAppLabel) {
			this.set("homeAppLabel", this._getDefaultAppLabel());				
		}			
	},

	_getAppLabelFromStorage: function() {
		try {
			var appLabel = sessionStorage.getItem(this.homeApp + "AppLabel");
			return appLabel;
		} catch (ex) {
			console.error("Could not retrieve item from sessionStorage.  Enable cookies for this page.", ex);
		};
		return null;			
	},

	_getDefaultAppLabel: function() {
		console.error("_getDefaultAppLabel method should be implemented.  The method is expected to return the default label of the application.");
		return "";
	},
	
	_getURLParameter: function(getParam) {
		var url = window.location.search.substring(1);
		var urlParameters = url.split('&');
		for (var i = 0; i < urlParameters.length; i++)  {
			var parameterName = urlParameters[i].split('=');
			if (parameterName[0] == getParam)  {
				return decodeURIComponent(parameterName[1]);
			}
		}
	},

};