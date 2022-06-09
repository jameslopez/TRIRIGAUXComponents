/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 * `TriBlockNavIronPagesContainerBehavior` propagates the value of the `iron-pages-id` property to all the navigation items.
 *	
 *	<div style="background-color:#FFFFCC">
 *	    <div style="padding:20px;">
 *	        <b>Note:</b> Implementors of this behavior should override `_getElementsToApplyIronPagesId()` method to return a list of navigation items to apply the value of `iron-pages-id` property.
 *	    </div>
 *	</div>
 * 
 * @polymerBehavior
 */
export const TriBlockNavIronPagesContainerBehavior = {

	properties: {
		/**
		 * The ID of the `iron-pages` used by all of the navigation items when switching different views in it.
		 */
		ironPagesId: String
	},

	observers: [
		'_handleIronPagesIdChanged(ironPagesId)'
	],

	/**
	 * Sets the value of the `iron-pages-id` property of all the navigation items based of the value of the `iron-pages-id` property in this container behavior. 
	 * 
	 * @param {string} ironPagesId The id of the `iron-pages` to set to. 
	 */
	_handleIronPagesIdChanged: function(ironPagesId) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var children = this._getElementsToApplyIronPagesId();

		children.forEach(function(child){
			child.ironPagesId = ironPagesId;
		});
	},
	
	/**
	 * Returns the navigation items to apply the default value of the `iron-pages-id` property. </br>
	 * 
	 *	<div style="background-color:#FFFFCC">
	 *	    <div style="padding:20px;">
	 *	        <b>Note:</b> Implementors of this behavior should override this method to return a list of navigation items to apply the value of `iron-pages-id` property.
	 *	    </div>
	 *	</div>
	 * 
	 * @return {Array<HTMLElement>} 
	 */
	_getElementsToApplyIronPagesId: function() {
		console.error("_getElementsToApplyIronPagesId method should be implemented.  The method is expected to return an array of elements that has ironPagesId attribute and which value of this.ironPagesId attribute be set to.");
	}

};