/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import { IronMeta } from "../@polymer/iron-meta/iron-meta.js";

Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					display: none;
				}
			
		</style>

		<iron-meta id="meta" type="tri" key="sso"></iron-meta>
	`,

    is: "tricore-properties",

    properties: {

		ssoSet: {
			type: Boolean,
			notify: false,
			readOnly: false,
			observer: "_initSso"
		},

		sso: {
			type: Boolean,
			notify: true,
			readOnly: true
		}

	},

    ready: function() {
		this._setSso(this.$.meta.byKey("sso"));
	},

    _initSso: function(sso) {
		this.$.meta.set("value", sso);
	}
});