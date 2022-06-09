/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../triblock-popup/triblock-popup.js";

/*
`triblock-confirmation-popup` is a component that provides a confirmation popup.

Example:
```html
<triblock-confirmation-popup id="confirmationPopup" on-confirm-tapped="confirmTapped">
  <p slot="text">Your changes were not saved. Are you sure you want to discard them?</p>
</triblock-confirmation-popup>
```

Since this is a confirmation dialog box, it displays two buttons: **Yes** and **No**. If **Yes** is tapped the `confirm-tapped` event is fired.

The text content displayed inside the popup should be inside an HTML element containing a slot property with `text` as the value:
```html
<triblock-confirmation-popup>
  <div slot="text">
	<p>The text goes here.</p>
  </div>
</triblock-confirmation-popup>
```


### Events

Event Name | Description
-----------|------------
`confirm-tapped` | Fired when the Confirm button is tapped.

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				triblock-popup {
					max-width: 90%;
				}

				.popup-action-bar {
					@apply --layout-horizontal;
					@apply --layout-end-justified;
					margin-top: 2em;
				}
			
		</style>

		<triblock-popup id="confirmationPopup" modal="" small-screen-max-width="0px" aria-label\$="[[ariaLabel]]">

			<slot name="text"></slot>

			<div class="popup-action-bar">
				<paper-button secondary="" dialog-dismiss="">No</paper-button>
				<paper-button dialog-confirm="" on-tap="_confirm">Yes</paper-button>
			</div>
		</triblock-popup>
	`,

    is: "triblock-confirmation-popup",

    properties: {
		/**
		 * Specifies the aria-label text for accessibility.
		 */
		ariaLabel: {
			type: String
		}
	},

    /**
	* Open the confirmation popup.
	**/
	openPopup: function() {
		this.$.confirmationPopup.openPopup();
	},

    /**
	* Close the confirmation popup.
	**/
	closePopup: function() {
		this.$.confirmationPopup.closePopup();
	},

    _confirm: function() {
		this.fire("confirm-tapped");
	}
});