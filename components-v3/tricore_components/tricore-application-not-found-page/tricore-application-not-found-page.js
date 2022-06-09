/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/paper-card/paper-card.js";

/**
 *	<div style="background-color:#FFFFCC">
 *  	<div style="padding:20px;">
 *			<b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
 *		</div>
 *	</div>
 */

Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					@apply --layout-fit;
					@apply --layout;
					@apply --layout-vertical;
					@apply --layout-center-center;
				}

				paper-card {
					--paper-card-header: {
						background-color: #AD1625;
						font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
					};
					--paper-card-header-color: white;
				}

				.card-content {
					color: #464646;
					font-size: 1.2em;
					padding: 22px;
					font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
				}
			
		</style>

		<paper-card heading="Application Not Found">
			<div class="card-content">You don't have an application at this URL.<br>Verify that you have entered the correct URL.</div>
		</paper-card>
	`,

    is: "tricore-application-not-found-page"
});