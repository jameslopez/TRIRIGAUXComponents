/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-toggle-button/paper-toggle-button.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				.container {
					@apply --layout-flex;
					@apply --layout-horizontal;
					@apply --layout-center;
				}

				.title {
					@apply --layout-flex;
				}
			
		</style>

		<tricore-url raw-url="/p/webapi/devmodeprops" bind-url="{{url}}"></tricore-url>
		<iron-ajax auto="" url="{{url}}" on-response="_handleGetResposne"></iron-ajax>
		<iron-ajax id="putAjax" url="{{url}}" content-type="application/json" method="PUT"></iron-ajax>
		<div class="container">
			<span class="title">Development Mode</span>
			<paper-toggle-button id="enabledDevModeButton" checked?="{{props}}" on-change="_handleEnabledChanged"></paper-toggle-button>
		</div>
	`,

    is: "tricore-dev-mode-switch",

    properties: {

		props: {
			type: Object,
			notify: true,
			readOnly: false
		}

	},

    _handleGetResposne: function(e) {
		this.set("props", e.detail.response);
		this.$.enabledDevModeButton.checked = this.props;
	},

    _handleEnabledChanged: function() {
		this.set("props", this.$.enabledDevModeButton.checked);
		this.$.putAjax.body = JSON.stringify(this.props);
		this.$.putAjax.generateRequest();
		if (this.$.enabledDevModeButton.checked) {
			alert("You are now running in Development mode.  Individual view files will be loaded in the browser.");
		} else {
			alert("You are now running in Production mode.  The production file which is usually a vulcanized view file will be loaded in the browser.  Make sure the vulcanized view file is generated recently with the latest platform component and view file changes.");
		}
	}
});