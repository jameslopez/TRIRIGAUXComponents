/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import "./triblock-slide-animation.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * `TriBlockSlideAnimationBehavior` provides animation to a `triblock-slide-animation` overlay component which can slide up, down, left or right. 
 *
 * @polymerBehavior
 */
export const TriBlockSlideAnimationBehavior = {

	/**
	 * Slides up the `triblock-slide-animation` overlay component.
	 *
	 * @param {Element} el Contains the `triblock-slide-animation` overlay component to apply the slide up animation.
	 */
	_slideUp: function(el) {
		var slider = dom(el).querySelector("triblock-slide-animation");
		slider.slideUp();
	},

	/**
	 * Slides down the `triblock-slide-animation` overlay component.
	 * 
	 * @param {Element} el Contains the `triblock-slide-animation` overlay component to apply the slide down animation.
	 */
	_slideDown: function(el) {
		var slider = dom(el).querySelector("triblock-slide-animation");
		slider.slideDown();
	},

	/**
	 * Slides the `triblock-slide-animation` overlay component to the left.
	 *
	 * @param {Element} el Contains the `triblock-slide-animation` overlay component to apply the slide to the left animation.
	 */
	_slideLeft: function(el) {
		var slider = dom(el).querySelector("triblock-slide-animation");
		slider.slideLeft();
	},

	/**
	 * Slides the `triblock-slide-animation` overlay component to the right.
	 *
	 * @param {Element} el Contains the `triblock-slide-animation` overlay component to apply the slide to the right animation.
	 */
	_slideRight: function(el) {
		var slider = dom(el).querySelector("triblock-slide-animation");
		slider.slideRight();
	}
};