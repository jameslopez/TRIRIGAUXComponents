/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * `TriBlockNavSelectBehavior` handles selection of a navigation item.  Currently, it supports initial selection.   
 *
 * @polymerBehavior
 */
export const TriBlockNavSelectBehavior = {

	properties: {
	/**
	 * If true, the item is navigated when the component is initially rendered on the page.
	 */
	  initialSelection: Boolean
	},
};