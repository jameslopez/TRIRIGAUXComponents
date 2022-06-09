/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import { TriPlatChangeTrackerBehavior } from "./triplat-change-tracker-behavior.js";
import "../@polymer/paper-dialog/paper-dialog.js";

/*
triplat-change-tracker is a component to display warning message when user is exiting current page without saving modified data.

### Example for setting up data tracking

This example has data source name 'employeeDS' and 'employee' as data name for the modified record.

In the custom element script block observer data -

	 observers:[ "myTrackChange(employee.*)"],
	 
	 myTrackChange: function(value) {
		 this.trackChange("employeeDS", "employee", value);
	 }

To customize message -

	 <triplat-change-tracker message-label="My custom message...">
	 </triplat-change-tracker>
	 
To disable warning message -

	 <triplat-change-tracker disabled></triplat-change-tracker>
	 
To programmatically clean the dirty page, use forceClean() method provided from triplat-change-tracker-behavior

	 // javascript to clean dirty page status
	 this.forceClean();

### Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triplat-change-tracker-ok-button` | Mixin applied to the ok button | `{}`
`--triplat-change-tracker-cancel-button` | Mixin applied to the cancel button | `{}`
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			#confirm {
			  @apply --tri-primary-button;
			  -moz-border-radius: 0px;
			  -webkit-border-radius: 0px;
			  border-radius: 0px;
			  text-transform: none;
			  @apply --triplat-change-tracker-ok-button;  
			}

			#dismiss {
			  color: var(--ibm-gray-60);
			  background-color: rgb(255, 255, 255);
			  font-weight: bold;
			  border-style: solid;
			  border-color: var(--ibm-gray-60);
			  border-width: 1px;
			  -moz-border-radius: 0px;
			  -webkit-border-radius: 0px;
			  border-radius: 0px;
			  text-transform: none;
			  --paper-button-flat-keyboard-focus: {
				  border-width: 3px !important;
				};
			  @apply --triplat-change-tracker-cancel-button;  
			}
		
		</style>

		<paper-dialog modal="" id="alertDialog" role="alertdialog">
		  <h2>Alert</h2>
		  <p id="messageDiv"></p>
		  <div class="buttons">
			<paper-button id="dismiss" dialog-dismiss="">Cancel</paper-button>
			<paper-button id="confirm" dialog-confirm="" autofocus="">OK</paper-button>
		  </div>
		</paper-dialog>
	`,

    is: "triplat-change-tracker",
    behaviors: [TriPlatChangeTrackerBehavior],

    properties: {
		/*
		 * Disable change tracking.
		 */
		disabled: {
			type: Boolean,
			value: false
		},
		
		/*
		 * Custom Confirmation Message
		 */
		messageLabel: {
			type: String,
			value: "Discard unsaved data?",
			observer: "customMessageChanged"
		},
		
		_dialogPromise: {
			type: Object,
			notify: false,
			readOnly: true
		}
	},

    customMessageChanged: function(message) {
		this._setCustomMessage(message);
		this.$.messageDiv.innerHTML = message;
	},

    detached: function() {
		console.log("detached at triplat-change-tracker");
	}
});