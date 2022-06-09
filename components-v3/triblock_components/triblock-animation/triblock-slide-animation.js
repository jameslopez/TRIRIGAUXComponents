/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/* 
`triblock-slide-animation` is a component which provides overlay to an element so that a slide animation can be applied on it.

See `triblock-side-nav` and `triblock-tabs` components for sample usage of this component.


### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--triblock-slide-animation-background-color` | Background color applied to the overlay element when slide animation is applied | `{}`
`--triblock-slide-animation-width` | Width applied to the overlay element  | `{}`
`--triblock-slide-animation-height` | Height applied to the overlay element | `{}`
`--triblock-slide-animation` | Mixin applied to the overlay container | `{}`	

*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				:host {
					@apply --layout-fit;
					display: block;
					overflow: hidden;
					
					@apply --triblock-slide-animation;
				}

				#background {
					width: 100%;
					height: 100%;
					background-color: var(--triblock-slide-animation-background-color);
					transform: translateX(var(--triblock-slide-animation-width));
					transform: translateY(var(--triblock-slide-animation-height));
				}

				#background.rtl {
					transform: translateX(calc(var(--triblock-slide-animation-width) * -1));
				}

				#background.slide-up {
					transform: translateY(0);
					-webkit-transition: 0.25s;
					-moz-transition: 0.25s;
					-ms-transition: 0.25s;
					-o-transition: 0.25s;
					transition: 0.25s;
				}

				#background.slide-down {
					transform: translateY(var(--triblock-slide-animation-height));
					-webkit-transition: 0.25s;
					-moz-transition: 0.25s;
					-ms-transition: 0.25s;
					-o-transition: 0.25s;
					transition: 0.25s;
				}

				#background.slide-left {
					transform: translateX(0);
					-webkit-transition: 0.25s;
					-moz-transition: 0.25s;
					-ms-transition: 0.25s;
					-o-transition: 0.25s;
					transition: 0.25s;
				}

				#background.slide-right {
					transform: translateX(var(--triblock-slide-animation-width));
					-webkit-transition: 0.25s;
					-moz-transition: 0.25s;
					-ms-transition: 0.25s;
					-o-transition: 0.25s;
					transition: 0.25s;
				}
			
		</style>

		<div id="background"></div>
	`,

    is: "triblock-slide-animation",

    attached: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if (textDirectionValue==="rtl") {
			this.$.background.classList.add("rtl");
		}
	},

    /**
	 * Applies animation so that element will slide up.
	 */
	slideUp: function() {
		var slider = dom(this.root).querySelector("#background");
		dom(slider).classList.remove("slide-down");
		dom(slider).classList.add("slide-up");
	},

    /**
	 * Applies animation so that element will slide down.
	 */
	slideDown: function() {
		var slider = dom(this.root).querySelector("#background");
		dom(slider).classList.remove("slide-up");
		dom(slider).classList.add("slide-down");
	},

    /**
	 * Applies animation so that element will slide to the left.
	 */
	slideLeft: function() {
		var slider = dom(this.root).querySelector("#background");
		dom(slider).classList.remove("slide-right");
		dom(slider).classList.add("slide-left");
	},

    /**
	 * Applies animation so that element will slide to the right.
	 */
	slideRight: function() {
		var slider = dom(this.root).querySelector("#background");
		dom(slider).classList.remove("slide-left");
		dom(slider).classList.add("slide-right");
	}
});