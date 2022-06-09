/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { PolymerElement } from "../@polymer/polymer/polymer-element.js";

/**
 * `TriLazyLoadingBehavior` is a utility for lazy-loading Javascript modules.
 * 
 *	To lazy-load a Javascript module, you must do the following:
 *
 *	- Do not import the module using import statement.
 *	- When you want to load the resource, call the `loadResource` function and pass in the instance of the resource to load in the DOM and its filename.
 *	
 * 				
 *	Example:
 *
 *		//import "./module-to-load.js";
 *		import { getModuleUrl } from "../tricore-util/tricore-util.js";
 *
 *		<dom-module id="my-module">
 *			<template>
 *				<module-to-load id="myResource"></module-to-load>
 *				<triplat-graphic id="myGraphic"></triplat-graphic>
 *			</template>
 *		</dom-module>
 *		<script>
 *			...
 *		    attached: function() {
 *				RenderStatus.afterNextRender(this, function(){
 *					this.loadResource(this.$.myModule, 
 *										"module-to-load.js");
 *					this.loadResource(this.$.myGraphic, 
 *										"../triplat-graphic/triplat-graphic.js");
 *				});
 *			},
 *
 *			importMeta: getModuleUrl("my-module/my-module.js")
 *		<script>
 * 
 *	The `module-to-load` and `triplat-graphic` will be loaded after the `my-module` is loaded.
 *
 * @polymerBehavior
 */
export const TriLazyLoadingBehavior = { 

	/**
	 * Loads the resource by importing it imperatively.
	 *
	 * @param {HTMLElement} resourceInstance The instance of the resource to load in the DOM. 
	 * @param {string} resourceFilename The filename of the resource to load.
	 * @return {Object} Promise object after the resource is loaded.
	 */	
	 loadResource: function(resourceInstance, resourceFilename) {
		return new Promise(function(resolve, reject) {
			if (!(resourceInstance instanceof PolymerElement)) {
				const script = document.createElement("script");
				script.onload = (event) => { resolve(event); };
				script.onerror = (event) => { reject(event.error); };
				script.setAttribute("type", "module");
				script.setAttribute("src", this.resolveUrl(resourceFilename));
				script.setAttribute("crossorigin", "use-credentials");
				document.head.appendChild(script);
			} else {
				resolve();
			}
		}.bind(this));
	},
};