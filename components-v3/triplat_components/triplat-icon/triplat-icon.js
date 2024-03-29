/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import "../@polymer/iron-icon/iron-icon.js";
import "./ibm-icons.js";
import "./ibm-icons-medium.js";
import "./ibm-icons-large.js";
import "./ibm-icons-glyphs.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { IronMeta } from "../@polymer/iron-meta/iron-meta.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
A custom element for displaying an icon from the IBM icon set. 
It works similar to iron-icon element in polymer, except this assumes the IBM
icon set, automatically importing that icon set and removing the need to prefix the icon with the icon set name. 

	 <triplat-icon icon="icon" ></triplat-icon>

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
		<b>Note:</b> This element uses the IBM icon set. This icon set can be used directly, for example by paper-button-icon, by importing ../triplat-icon/ibm-icons.html and using 'ibm:' as the prefix to specify the iconset.
	</div>
</div>

### Styling

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
		<b>Deprecated:</b> The use of style and class properties to style the icon is deprecated and will be removed in a future release. Use mixins instead.<br>
		Custom property `--triplat-icon-style` is deprecated, instead use `--triplat-icon-iron-icon`. 
	</div>
</div>

Mixins and style/class are mutually exclusive and using both will produce indeterminate results.

The following custom properties are available for styling:

Custom property               | Description                                                    | Default
------------------------------|----------------------------------------------------------------|----------
`--triplat-icon-iron-icon`    | Mixin applied to the iron-iron contained within this component | ``
`--triplat-icon-width`        | Width of the icon                                              | ``
`--triplat-icon-height`       | Height of the icon                                             | ``
`--triplat-icon-fill-color`   | Fill color for the icon                                        | ``
`--triplat-icon-stroke-color` | Stroke color for the icon                                      | ``

### Supported icons

See demo for supported icons and the value you should use for the 'icon' property to get that icon.


@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		:host {
			@apply --layout-inline;
			@apply --layout-center-center;
			position: relative;
			vertical-align: middle;
		}
		iron-icon {
			--iron-icon-height: var(--triplat-icon-height);
			--iron-icon-width: var(--triplat-icon-width);
			--iron-icon-fill-color: var(--triplat-icon-fill-color);
			--iron-icon-stroke-color: var(--triplat-icon-stroke-color);
			@apply --triplat-icon-style;
			@apply --triplat-icon-iron-icon;
		}

 
	
		</style>

		<iron-meta type="iconset"></iron-meta>

		<iron-icon id="triCustomIcon" icon="{{_setIcon(icon,iconsets)}}" class="{{_setClass(class)}}" tabindex\$="[[tabIndex]]" role="button" aria-label\$="{{description}}" on-keypress="_keyPressHandler"></iron-icon>
	`,

    is: "triplat-icon",

    properties: {
	    /**
		 * Class property to be applied to this element and its children.
		 *
		 **/
		class: String,

	    /**
		  * Description property to be applied to aria-label for assistive tool to read out description for this icon.
		  *
		  **/
		description: String,

	    /**
		  * Icon from the icon set to be displayed. See demo page for list of valid values. The icon set prefix does not 
		  * need to be specified unless the same icon exists in multiple icon sets. 
		  *
		  **/
		icon: {
			type: String,
			reflectToAttribute: true
		},

	    /**
		  * Mirror property which acts as a flag. When used it will mirror the icon.
		  *
		  **/
		mirror: {
			type: Boolean,
			value: false
		},

	    /**
		  * Value to be applied to the tabindex attribute.
		  *
		  */
		tabIndex: Number,

	    iconsets: {
		    type: Array,

		    value: new IronMeta({
			    type: "iconset"
			}).list
		}
	},

    attached: function(){
		if(this.mirror && document.querySelector('body').getAttribute('dir')=="rtl"){
			this._setStyle("transform: scaleX(-1)");
		}
		
		var svgElement = this.$.triCustomIcon.querySelector("svg");
		if(svgElement){
			//Microsoft Edge cause unnecessary tabing on svg elements that inside the triplat-icon.
			//Setting svg to not focusable avoid duplicated tabbing
			dom(svgElement).setAttribute("focusable", "false");
		}
	},

    _setIcon: function(val,iconsets) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!val) {
			return "";
		}

		if(!this.description) {
			this.set("description", val.replace(/-/g," "));
		}

		// if the user already specified an icon set, then just use that
		if (val.indexOf(":") != -1) {
			return val;
		}

		var fulliconname = "ibm:" + val;

		for (var i=0; i < this.iconsets.length; i++) {
			//NOTE: precedent of the search is based on the import order
			if (this.iconsets[i].name.indexOf("ibm") != -1) {
				var names = this.iconsets[i].getIconNames();
				var fqval = this.iconsets[i].name + ":" + val;
				if (names.indexOf(fqval) != -1) {
					fulliconname = fqval;
					break;
				}
			}
		}

		return fulliconname;
	},

    _setStyle: function(style){
		this.$.triCustomIcon.style.cssText = style;
	},

    _resetClassMap: function() {
		for (var myclass in this.$.triCustomIcon._classMap) {
			this.$.triCustomIcon._classMap[myclass] = false;
		}
	},

    _cleanClassMap: function() {
		var returnClassArray = [];
		for (var myclass in this.$.triCustomIcon._classMap) {
			if (!this.$.triCustomIcon._classMap[myclass]) {
				returnClassArray.push(myclass);
				delete this.$.triCustomIcon._classMap[myclass];
			}
		}
		return returnClassArray;
	},

    _isNewClassInMap: function(newclass) {
		if (typeof this.$.triCustomIcon._classMap == 'undefined') {
			this.$.triCustomIcon._classMap = {};
			this.$.triCustomIcon._classMap[newclass] = true;
			return true;
		} else {
			if (newclass in this.$.triCustomIcon._classMap) {
				this.$.triCustomIcon._classMap[newclass] = true;
				return false;
			} else {
				this.$.triCustomIcon._classMap[newclass] = true;
				return true;
			}
		}
	},

    _setClass: function(myclass){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!myclass) {
			return;
		}

		this._resetClassMap();
		var arr = myclass.split(" ");

		// add in new addition class
		for (var i=0; i < arr.length; i++) {
			if (this._isNewClassInMap(arr[i])) {
				this.$.triCustomIcon.classList.add(arr[i]);
			}
		}

		// remove unused class
		var deleteClasses = this._cleanClassMap();

		for (var i=0; i < deleteClasses.length; i++) {
			this.$.triCustomIcon.classList.remove(deleteClasses[i]);
		}

		this.$.triCustomIcon.classList.remove("flex");

		for (var i=1; i < 13; i++) {
			this.$.triCustomIcon.classList.remove("flex-" + i);
		}
	},

    _keyPressHandler: function(event) {
		var code = event.keyCode;
		// accept enter or spacebar
		if (code == 13 || code == 32) {
			this.fire("tap", event.currentTarget, event);
		}
	}
});