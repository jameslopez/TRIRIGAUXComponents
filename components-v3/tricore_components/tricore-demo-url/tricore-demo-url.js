/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../tricore-relative-url/tricore-relative-url.js";
import { IronMeta } from "../@polymer/iron-meta/iron-meta.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A utility component for helping inject your own json file for demo pages. This allows
a demo page to not really make a true request to the TRIRIGA server, but still 
retrieve data.

Example: If you want to first "mock" a request to 
/p/webapi/someModelAndViewName/startSession, add the tricore-demo-url as the first tag.

	 <tricore-demo-url></tricore-demo-url>

Then create a file in your component's demo directory named 
demo.p.webpai.someModelAndViewName.startSession with any return value you want (normally json).

Now any use of <tricore-url> will use this url and retrieve the json from that file.

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<iron-meta id="meta" type="tri" key="demoBaseUrl"></iron-meta>
		<tricore-relative-url id="relativeUrl" relative-url="" relative-host="{{_dataHost}}" bind-url="{{_url}}"></tricore-relative-url>
	`,

    is: "tricore-demo-url",

    properties: {
		_dataHost: {
			type: Object
		}
	},

    observers: [
		"_handleUrlChange(_url)"
	],

	ready: function() {
		this.set("_dataHost", this.domHost ? this.domHost : this.__dataHost);
	},

    _handleUrlChange: function(_url) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.$.meta.value = _url;
	}
});