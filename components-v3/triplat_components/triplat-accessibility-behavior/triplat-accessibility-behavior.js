/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * `TriPlatAccessibilityBehavior` can be used to improve accessibility of some elements.
 *
 * @polymerBehavior
 */
export const TriPlatAccessibilityBehavior = {

	/**
	 * This function will set to "true" or "false" the ARIA property for a given element.
	 * @param {Object} element Element that will receive the ARIA property
	 * @param {Boolean} value Either "true" or "false"
	 * @param {String} ariaProperty The Name of the ARIA property
	 */
	setAriaProperty: function(element, value, ariaProperty) {
		if (value) {
			element.setAttribute('aria-' + ariaProperty, 'true');
		} else {
			element.setAttribute('aria-' + ariaProperty, 'false');
		}
	},

	/**
	 * Creates an HTML element with an `aria-live` attribute, to set a live area for screen readers.
	 * This live container will not be visible on the page, so it should only be used to improve the accessibility of screen readers.
	 * It returns the live element.
	 * @param {Object} parentElement Element where the ARIA live container will be appended.
	 * @param {String} containerId The ID of the live container. If blank, the default value will be "liveArea".
	 * @param {String} ariaLiveValue The value for the **aria-live** attribute. Can be set to "assertive" or "polite". If blank, the default value will be "polite".
	 * @return {Element}
	 */
	setAriaLiveContainer: function(parentElement, containerId, ariaLiveValue) {
		// Check if the live area already exists
		var liveArea = parentElement.querySelector("#" + (containerId ? containerId : "liveArea"));
		if (!liveArea) {
			// If don't, create the live area
			var ariaLiveContainer = document.createElement("div");
			ariaLiveContainer.setAttribute('id', (containerId ? containerId : "liveArea"));
			ariaLiveContainer.setAttribute('aria-live', (ariaLiveValue ? ariaLiveValue : "polite"));
			ariaLiveContainer.setAttribute('style', 'height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;');
			parentElement.appendChild(ariaLiveContainer);

			liveArea = parentElement.querySelector("#" + (containerId ? containerId : "liveArea"));
		}

		return liveArea;
	}

};