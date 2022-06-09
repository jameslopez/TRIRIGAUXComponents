/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * `TriBlockBadgeContainerBehavior` manages the badge configuration of the navigation items as per badge settings of the parent or container element.
 *
 * @polymerBehavior
 */
export const TriBlockBadgeContainerBehavior = { 

	properties: {
		/**
		 * Sets the maximum number to show on the badge of a navigation item.  If the badge number set to the navigation item exceeds the maximum number specified in this property, the actual number will not be shown to the badge, instead it will show the maximum number and a plus sign.
		 * For example, if the `badge-number` is 100 with `badge-max-number` equals to 50, the badge number to show on the navigation item is 50+. 		
		 */
		badgeMaxNumber: Number
	},

	/**
	 * Sets the value of the `badge-max-number` property of all the navigation items based of the value of the `badge-max-number` property in this container behavior. 
	 * 
	 * @param {Array<HTMLElement>} items Navigation items to set the value of the `badge-max-number` property. 
	 */
	_setBadgeMaxNumber: function(items) {
		if (this.badgeMaxNumber) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (!item.badgeMaxNumber && item.badgeNumber) {
					item.badgeMaxNumber = this.badgeMaxNumber;
				}
			}
		}
	}
};