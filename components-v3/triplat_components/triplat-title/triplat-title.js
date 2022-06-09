/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";

/*
A component to set the title of the html page.

	 <triplat-title title-label="Space Assessment"></triplat-title>
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: "triplat-title",

    properties: {

		/**
		 * This value will be used to set the title on the page.
		 */
		titleLabel: {
			type: String,
			readOnly: false
		}

	},

    ready: function() {
		document.title = this.titleLabel;
	}
});