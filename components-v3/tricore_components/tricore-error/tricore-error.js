/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-material/paper-material.js";
import "../triplat-signout-button/triplat-signout.js";

/*
A utility component for displaying error messages up to 2 lines.

	 <tricore-error 
	   title="Security Warning" 
	   message_line1-label="You do not have permission to access this page." 
	   message_line2-label="Contact your TRIRIGA administrator for assistance." 
	   elevation="1"></tricore-error>

Example of including a sign in link. The "Go back to Sign In." link will be displayed at the third line.

	 <tricore-error 
	   title="Security Warning" 
	   message_line1-label="You do not have permission to access this page." 
	   message_line2-label="Contact your TRIRIGA administrator for assistance." 
	   include-signin
	   elevation="1"></tricore-error>
*/
Polymer({
    _template: html`
		<style>

			:host {
				font-family: "Helvetica Neue";
				@apply --layout;
				@apply --layout-horizontal;
				@apply --layout-center-justified;
			}
			
			@media (min-width: 500px) {
				.container {
					width: 400px;
				}
			}

			@media (max-width: 499px) {
				.container {
					@apply --layout-flex;
					padding: 0px 30px;
				}
			}
			
			paper-material {
				padding: 20px;
				margin-left: 10px;
			}
			
		
		</style>

	<triplat-signout id="signout"></triplat-signout>	
	<paper-material elevation="[[elevation]]">
		<div class="layout vertial container" tabindex="0">
			<h2>[[title]]</h2>
			<p>[[message_line1Label]]</p>
			<p>[[message_line2Label]]</p>
			<p hidden\$="{{!includeSignin}}"><a on-tap="_signout" href="">[[_signIn]]</a></p>
		</div>
	</paper-material>
	`,

    is: "tricore-error",

    properties: {

		/**
		 * The title of the error message.
		 */
		title: {
			type: String,
			reflectToAttribute: true
		},

		/**
		 * The first line of the error message.
		 */
		message_line1Label: String,

		/**
		 * The second line of the error message.
		 */
		message_line2Label: String,

		/** 
		  * Optional. Boolean value to indicate whether to include a sign in link. The "Go back to Sign In." link will be displayed at the third line.
		  */
		includeSignin: {
			type: Boolean,
			value: false
		}, 

		/**
		 * Whether or not the message panel is elevated. "1" for elevated and "0" for not elevated.
		 */
		elevation: {
			type: String,
			notify: false,
			readOnly: false,
			value: "1"
		}
	},

    ready: function() {
		var __dictionary__signin = "Go back to Sign In.";
		this.set("_signIn",__dictionary__signin);
	},

    _signout: function() {
		this.$.signout.signout();
	}
});