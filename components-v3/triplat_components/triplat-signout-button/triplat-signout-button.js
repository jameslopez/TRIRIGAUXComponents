/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "./triplat-signout.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../triplat-icon/ibm-icons.js";

/*
A signout button that will signout the current user from TRIRIGA when tapped.

	 <triplat-signout-button></triplat-signout-button>

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			.rtl-icon-mirror {
				transform: scaleX(-1);
			}
	
		</style>

		<triplat-signout id="signout"></triplat-signout>
		<paper-icon-button id="signoutIcon" icon="ibm:sign-out" on-tap="_handleTap" alt="signout" on-keypress="_keyPressHandler"></paper-icon-button>
	`,

    is: "triplat-signout-button",

    attached: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if(textDirectionValue==="rtl"){
			this.$.signoutIcon.classList.add('rtl-icon-mirror');
		}
	},

    _handleTap: function() {
		this.$.signout.signout();
	},

    _keyPressHandler: function(event) {
		var keyCode = event.keyCode;
		// accept Enter or Spacebar
		if (code == 13 || code == 32) {
			this._handlerTap();
		}
	}
});