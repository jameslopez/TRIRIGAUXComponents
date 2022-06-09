/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * `TriBlockNavLayoutBehavior` detects `iron-pages` component used as `page` in the container and sets the `iron-pages-id` property of the `nav` component based from the `id` of the `iron-pages`. 
 *
 * @polymerBehavior
 */
export const TriBlockNavLayoutBehavior = {
	
	attached: function() {
		var page = dom(this).querySelector("[page]");
		var nav = dom(this).querySelector("[nav]");
		if (page && page.tagName == "IRON-PAGES") {
			nav.ironPagesId = page.id;
		}
	}
};