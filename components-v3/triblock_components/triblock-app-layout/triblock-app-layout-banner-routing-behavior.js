/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { TriBlockAppLayoutBannerBehavior } from "./triblock-app-layout-banner-behavior.js";

/**
 * Implement `triblock-app-layout-banner-routing-behavior` on your main view element that that contains `triblock-app-layout`. This helps with configuration concerning the mobile page label and back button based on `triplat-routing` behaviors. Additional configuration is as follows: 
 *
 * First, listen for `triplat-route`'s `route-active` event.
 * ```html
 *	<triplat-route id="newRoute" name="new" path="/new" on-route-active="_handleNewRouteActive"></triplat-route>
 * ```
 * 
 * Then, set up the custom event needed for the `manageBannerOnRouteChange` function where "New" and `true` values are defined by you.
 * ```javascript
 *   _handleNewRouteActive: function (e) {
 *      var routedPageBannerDetails = { active: e.detail.active, pageLabel: "New", hasBackButton: true };
 *      this.manageBannerOnRouteChange(routedPageBannerDetails);
 *   }
 * ```
 * @polymerBehavior
 */
export const TriBlockAppLayoutBannerRoutingBehaviorImpl = {
	/**
	* Sets `showMobileBackButton` and `mobilePageLabel` properties based on custom event
	* 
	* @param {object} routedPageBannerDetails must have `active`, `hasBackButton` and `pageLabel` properties (see above documentation for more details)
	*/
	manageBannerOnRouteChange: function(routedPageBannerDetails) {
		if (routedPageBannerDetails.active) {
			this.set('showMobileBackButton', routedPageBannerDetails.hasBackButton);
			this.set('mobilePageLabel', routedPageBannerDetails.pageLabel);
		}
	},

	/**
	* Navigates to the previous routed page in the browser's history
	*/
	navigateToPreviousRoutedPage: function(e) {
		window.history.back();
	},
};

export const TriBlockAppLayoutBannerRoutingBehavior = [ TriBlockAppLayoutBannerBehavior, TriBlockAppLayoutBannerRoutingBehaviorImpl ];