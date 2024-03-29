/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../@polymer/paper-toast/paper-toast.js";
import "../triplat-icon/ibm-icons.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A component that provides a toast box with a message.

Example of a simple usage:
```html
<triblock-toast 
  type="error" 
  title="Error title"
  text="Error message"
  duration="10000">
</triblock-toast>
```

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triblock-toast-paper-toast` | Mixin applied to the `paper-toast` component | `{}`
`--triblock-toast-icon` | Mixin applied to the icon | `{}`
`--triblock-toast-message-container` | Mixin applied to the message container | `{}`
`--triblock-toast-title` | Mixin applied to the title text | `{}`
`--triblock-toast-message` | Mixin applied to the message text | `{}`

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				#toast {
					@apply --layout-horizontal;
					--paper-toast-color: var(--tri-primary-content-color);
					font-size: 14px;
					max-width: 250px;
					min-width: 100px;
					padding: 0px;

					@apply --triblock-toast-paper-toast;
				}

				:host([type="success"]) #toast {
					background-color: var(--tri-success-color);
				}

				:host([type="warning"]) #toast {
					background-color: var(--tri-warning-color);
				}

				:host([type="major-warning"]) #toast {
					background-color: var(--tri-major-warning-color);
				}

				:host([type="error"]) #toast {
					background-color: var(--tri-error-color);
				}

				:host([type="info"]) #toast {
					background-color: var(--tri-info-color);
				}

				.icon-container {
					@apply --layout-center-justified;
					@apply --layout-vertical;
					padding: 6px;
				}

				.icon {
					padding: 0px;
					width: 22px;
					height: 22px;
					margin-left: 0px;
					color: white;

					@apply --triblock-toast-icon;
				}

				.message-container {
					@apply --layout-flex;
					@apply --layout-vertical;
					@apply --layout-center-justified;
					background-color: rgba(255,255,255,0.8);
					min-width: 100px;
					padding: 6px;

					@apply --triblock-toast-message-container;
				}

				.title {
					font-weight: bold;

					@apply --triblock-toast-title;
				}

				.message {
					display: flex;

					@apply --triblock-toast-message;
				}
			
		</style>

		<paper-toast id="toast" duration="[[duration]]" fit-into="[[fitInto]]" 
			horizontal-align="[[horizontalAlign]]" opened="{{opened}}" allow-click-through="[[allowClickThrough]]">
			<div class="icon-container">
				<iron-icon class="icon" icon="[[_getIcon(type)]]"></iron-icon>
			</div>
			<div class="message-container">
				<template is="dom-if" if="[[title]]">
					<span class="title">[[title]]</span>
				</template>
				<template is="dom-if" if="[[text]]">
					<span class="message">[[text]]</span>
				</template>
			</div>
		</paper-toast>
	`,

    is: "triblock-toast",

    properties : {
		/**
		* The types of the toast.
		* The valid values are:
		*  - success
		*  - warning
		*  - major-warning
		*  - error
		*  - info
		*/
		type: {
			type: String,
			reflectToAttribute: true,
			value: "info"
		},

		/**
		* The element to fit `this` into. For more details, see paper-toast.
		*/
		fitInto: {
			type: Object,
			value: window
		},

		/**
		* The duration in milliseconds to show the toast.
		* To disable the toast auto-closing, set to `0`, a negative number, or `Infinity`.
		*/
		duration: {
			type: Number,
			value: 5000
		},

		/**
		* The orientation against which to align the toast content
		* horizontally relative to `positionTarget`. For more details, see paper-toast.
		*/
		horizontalAlign: {
			type: String,
			value: "left"
		},

		/**
		* The message to display in the toast.
		*/
		text: {
			type: String,
			value: ""
		},

		/**
		* The title to display in the toast.
		*/
		title: {
			type: String,
			reflectToAttribute: true,
			value: ''
		},

		/**
		* True if the toast is currently displayed.
		*/
		opened: {
			type: Boolean,
			value: false,
			notify: true
		},
		
		/**
		 * Set to true to allow clicks outside this toast message to
		 * close the overlay below.
		 */
		allowClickThrough: {
			type: Boolean,
		},

		/**
		* The icon to display in the toast.
		*/
		_icon: {
			type: String
		}
	},

    /**
	* Opens the toast box.
	*/
	open: function() {
		this.$.toast.open();
	},

    /**
	* Closes the toast box.
	*/
	close: function() {
		this.$.toast.close();
	},

    _getIcon: function(type) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var icon = "status-info";

		switch (type) {
			case "success":
				icon = "ibm:status-success";
				break;
			case "warning":
				icon = "ibm:status-warning";
				break;
			case "major-warning":
				icon = "ibm:status-warning-major";
				break;
			case "error":
				icon = "ibm:status-error";
				break;
			case "info":
				icon = "ibm:status-info";
		}

		return icon;
	}
});