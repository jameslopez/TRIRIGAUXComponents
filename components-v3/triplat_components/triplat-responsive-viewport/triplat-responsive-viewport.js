/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../triplat-icon/ibm-icons.js";
import "../@polymer/iron-media-query/iron-media-query.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../@polymer/paper-dialog/paper-dialog.js";
import "../@polymer/paper-icon-button/paper-icon-button.js";
import "../@polymer/neon-animation/animations/slide-down-animation.js";
import "../@polymer/neon-animation/animations/slide-up-animation.js";
import { assertParametersAreDefined, importJs } from "../tricore-util/tricore-util.js";

const importJsPromise = importJs(
    ["../web-animations-js/web-animations-next-lite.min.js"],
	"triplat-responsive-viewport/triplat-responsive-viewport.js"
);

importJsPromise.then(() => {
/*
A component used for mobile devices to dynamically disable or allow viewport scalability.

This is useful if you want an application to not scale (page zoom) on a tablet, but then scale if 
it is being used on a phone. Of course it would be better to have the app responsive and render 
properly on a phone, but not all applications are meant to be used on a phone.

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
    <b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
  </div>
</div>

# Examples

Example: If you want an application to not scale for a tablet in portrait, but to scale in 
landscape and on phones. In this example we will use the min-width of 1024 as that is a common 
width of a tablet.

	 <triplat-responsive-viewport min-width="1024"></triplat-responsive-viewport>

In general this component should be used only once in an application at the top level (main view 
component).

You can also optionally provide a message, so when the device is less then the minWidth, as 
dialog will show with the given message.

Example: This will show a message to the user whenever the device width is less than 1024.
	 
	 <triplat-responsive-viewport min-width="1024" 
			   message="This application was not designed for a small device.">
	 </triplat-responsive-viewport>

# Styling

Custom property | Description | Default
----------------|-------------|----------
`--triplat-responsive-viewport-dialog-background-color`  | Dialog background color           | `#FDE876`
`--triplat-responsive-viewport-dialog-warn-icon-color`   | Dialog warning icon color         | `black`
`--triplat-responsive-viewport-dialog-message-color`     | Dialog message color              | `black`
`--triplat-responsive-viewport-dialog-message-font-size` | Dialog message font size          | `2.0em`
`--triplat-responsive-viewport-dialog-close-icon-color`  | Dialog close icon color           | `black`
`--triplat-responsive-viewport-dialog`                   | Mixin applied to the dialog       | `{}`
`--triplat-responsive-viewport-dialog-warn-icon`         | Mixin applied to the warning icon | `{}`
`--triplat-responsive-viewport-dialog-message`           | Mixin applied to the message      | `{}`
`--triplat-responsive-viewport-dialog-close-icon`        | Mixin applied to the close icon   | `{}`
*/
    Polymer({
	    _template: html`
		<style include="tristyles-theme">

				paper-dialog {
					--paper-dialog: {
						top: 0px;
						left: 0px;
						right: 0px;
						margin: 0px 10px;
						padding: 30px 20px;
						background-color: var(--triplat-responsive-viewport-dialog-background-color, #FDE876);
						position: fixed;
						@apply --triplat-responsive-viewport-dialog;
					}
				}
				.container {
					margin: 0px;
					padding: 0px;
					@apply --layout;
					@apply --layout-horizontal;
					@apply --layout-center;
				}
				iron-icon {
					width: 100px;
					height: 100px;
					color: var(--triplat-responsive-viewport-dialog-warn-icon-color, black);
					@apply --triplat-responsive-viewport-dialog-warn-icon;
				}
				.message {
					@apply --layout-flex;
					font-weight: bold;
					font-size: var(--triplat-responsive-viewport-dialog-message-font-size, 2.0em);
					vertical-align: middle;
					text-align: center;
					color: var(--triplat-responsive-viewport-dialog-message-color, black);
					@apply --triplat-responsive-viewport-dialog-message;
				}
				paper-icon-button {
					--paper-icon-button: {
						width: 100px;
						height: 100px;
						color: var(--triplat-responsive-viewport-dialog-close-icon-color, black);
						@apply --triplat-responsive-viewport-dialog-close-icon;
					}
				}
			
		</style>

		<iron-media-query query="{{_computeQuery(minWidth)}}" query-matches="{{noScale}}"></iron-media-query>
		<iron-media-query query="(orientation: portrait)" query-matches="{{portrait}}"></iron-media-query>
		<paper-dialog id="dialog" class="dialog" no-cancel-on-outside-click="" entry-animation="slide-down-animation" exit-animation="slide-up-animation">
			<div class="container">
				<iron-icon icon="ibm:warning"></iron-icon>
				<div class="message">{{message}}</div>
				<paper-icon-button id="closeButton" icon="ibm:close-cancel-error"></paper-icon-button>
			</div>
		</paper-dialog>
	`,

	    is: "triplat-responsive-viewport",

	    properties: {

			/**
			 * The threshold value to switch between scalable or not. Any device width greater 
			 * than or equal to this minWidth will be non-scalable, and any device width less 
			 * than this minWidth will be scalable.
			 */
			minWidth: {
				type: Number,
				notify: false,
				readOnly: false
			},

			/**
			 * An optional message. If this property is set, this message will be shown to the 
			 * user if the device width is less than the given minWidth.
			 */
			message: {
				type: String,
				notify: false,
				readOnly: false
			},

			_dialogClosed: {
				type: Boolean,
				value: false
			},

			_scalePortrait: Boolean

		},

	    observers: [
			"_onNoScaleChange(noScale, portrait)"
		],

	    listeners: {
			"tap": "_onCloseButtonTap"
		},

	    _computeQuery: function(minWidth) {
			return "(min-width: " + minWidth + "px)";
		},

	    _onNoScaleChange: function(noScale, portrait) {
		    if (!assertParametersAreDefined(arguments)) {
			    return;
			}

			var viewPortEl = document.querySelector("meta[name=viewport]");

			if (noScale || (this._scalePortrait != undefined && portrait !== this._scalePortrait)) {
				viewPortEl.setAttribute("content", "initial-scale=1.0, user-scalable=no");
				this.$.dialog.close();
			} else {
				viewPortEl.setAttribute("content", "initial-scale=1.0, user-scalable=yes, width=" + (this.minWidth - 1));
				this._scalePortrait = portrait;
				if (this.message && !this._dialogClosed) {
					this.async(function() {
						this.$.dialog.open();
					}, 1000);
				}
			}
		},

	    _onCloseButtonTap: function() {
			this.set("_dialogClosed", true);
			this.$.dialog.close();
		}
	});
});