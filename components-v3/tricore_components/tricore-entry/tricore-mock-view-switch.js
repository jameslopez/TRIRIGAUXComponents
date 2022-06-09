/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
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

		<tricore-url raw-url="/p/webapi/mockprops" bind-url="{{url}}"></tricore-url>
		<iron-ajax auto="" url="{{url}}" on-response="_handleGetResposne"></iron-ajax>
		<iron-ajax id="putAjax" url="{{url}}" content-type="application/json" method="PUT"></iron-ajax>
		<div class="container">
			<span class="title">Mock View</span>
			<paper-toggle-button id="enabledMockButton" checked?="{{props}}" on-change="_handleEnabledChanged"></paper-toggle-button>
		</div>
	`,

    is: "tricore-mock-view-switch",

    properties: {

		props: {
			type: Object,
			notify: true,
			readOnly: false
		}

	},

    _handleGetResposne: function(e) {
		this.set("props", e.detail.response);
		this.$.enabledMockButton.checked = this.props;
	},

    _handleEnabledChanged: function() {
		this.set("props", this.$.enabledMockButton.checked);
		this.$.putAjax.body = JSON.stringify(this.props);
		this.$.putAjax.generateRequest();
		alert("Reload the page to reflect the change, you do not need to clear your browser's cache.");
	}
});