/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
/**
 * `triblock-app-layout-banner-behavior` contains 2 properties that help with `triblock-app-layout` configuration concerning the mobile page label and back button. 
 *   
 * This behavior is specifically used in `triblock-app-layout-banner-routing-behavior` and `triblock-app-layout-banner-popup-behavior` which both manipulate the properties of the same name. 
 *
 * Example:
 * ```html
 *       <triblock-app-layout
 *           mobile-page-label="[[mobilePageLabel]]"
 *           show-mobile-back-button="[[showMobileBackButton]]">
 *           <triblock-banner-button back></triblock-banner-button>
 *           ...
 *       </triblock-app-layout>
 * ```
 * @polymerBehavior
 */

export const TriBlockAppLayoutBannerBehavior = {
	properties: {
		/** 
		* Boolean value that shows or hides the mobile back button
		*/
		showMobileBackButton: {
			type: Boolean,
			value: false
		},
		/** 
		* Boolean value that shows or hides the mobile back button
		*/
		mobilePageLabel: {
			type: String,
			value: null
		}
	}
};