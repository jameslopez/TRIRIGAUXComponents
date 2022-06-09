/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../tricore-url/tricore-url.js";
import "../tricore-properties/tricore-properties.js";

/*
An element that will enable the user to sign out of TRIRIGA.

	 <triplat-signout></triplat-signout>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<tricore-url id="homeUrl" bind-url="{{homeUrl}}"></tricore-url>
		<tricore-url raw-url="/p/websignon/signout" bind-url="{{url}}"></tricore-url>
		<tricore-url raw-url="/p/websignon/sso/signout" bind-url="{{ssoUrl}}"></tricore-url>
		<iron-ajax id="ajax" url="{{url}}" method="POST" on-response="_handleRespone" on-error="_handleRespone"></iron-ajax>
		<tricore-properties id="properties" sso="{{sso}}"></tricore-properties>
	`,

    is: "triplat-signout",

    properties: {
		/**
		 * The name of the home application. 
		 * This is used to redirect the user to the home application after signing out from the current application.  
		 */
		homeApp: String,	
	},

    signout: function() {
		if (this.sso) {
			window.location.href = this.ssoUrl;
		} else {
			this.$.ajax.generateRequest();
		}
	},

    /**
	 * Call this method to sign out of TRIRIGA.
	 */
	_handleRespone: function() {
		if (this.homeApp) {
			var homeUrl = this.$.homeUrl.getUrl("/p/web/" + this.homeApp);
			window.location.href = homeUrl; 
		} else {
	
			// Regular expression that matches everything from the start of the current url
			// until the first # or / after the UX app context path (/p/web/).
			var rootOfCurrentApp = /.*\/p\/web\/[^\/#]*(?=[\/#])/.exec(window.location.href);
			if (rootOfCurrentApp && rootOfCurrentApp.length > 0) {
				window.location.href = rootOfCurrentApp[0];
			} else {
				//If there is no match then it is already in the application root, so just reload it
				window.location.reload();
			}
		
		}
	}
});