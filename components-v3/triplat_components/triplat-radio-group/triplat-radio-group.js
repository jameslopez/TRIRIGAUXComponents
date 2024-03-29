/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-radio-group/paper-radio-group.js";

/*
triplat-radio-group is a custom element that extends paper-radio-group. It accepts an input data list and displays it as radio buttons. Each object in the list contains string value property name. It returns the selected value. 
If None option is selected the return value is null.

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
    <b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
  </div>
</div>

Example:
  
	 <triplat-ds name="peopleDS" data="{{data}}"></triplat-ds>
	 <triplat-ds name="personPrefixDS" data="{{personPrefix}}"></triplat-ds>
  
	 <triplat-radio-group 
	   description="Prefixes options" 
	   value="{{data.triPrefixLI}}" 
	   select-src="{{personPrefix}}"></triplat-radio-group>

### Styling

<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
		<b>Deprecated:</b> The use of style and class properties to style the radio group is deprecated and will be removed in a future release. Use mixins instead. <br>
		Custom property `--triplat-radio-group-style` is deprecated, instead use `--triplat-radio-group`. <br>
		Custom property `--triplat-radio-button-style` is deprecated, instead use `--triplat-radio-button`. <br>
	</div>
</div>

Mixins and style/class are mutually exclusive and using both will produce indeterminate results.

The following custom properties are available for styling:

Custom property               | Description                                                    | Default
------------------------------|----------------------------------------------------------------|----------
`--triplat-radio-group` | Mixin applied to the paper-radio-group contained within this component | ``
`--triplat-radio-group-item-padding` | The padding of the item | `4px`
`--triplat-radio-button` | Mixin applied to the paper-radio-button contained within this component | ``
`--triplat-radio-button-unchecked-background-color` | Radio button background color when the input is not checked | ``
`--triplat-radio-button-unchecked-color` | Radio button color when the input is not checked | ``
`--triplat-radio-button-unchecked-ink-color` | Selected/focus ripple color when the input is not checked | ``
`--triplat-radio-button-checked-color` | Radio button color when the input is checked | ``
`--triplat-radio-button-checked-ink-color` | Selected/focus ripple color when the input is checked | ``
`--triplat-radio-button-size` | Size of the radio button | ``
`--triplat-radio-button-label-color` | Label color | ``
`--triplat-radio-button-label-spacing` | Spacing between the label and the button | ``

@demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			paper-radio-button {
				display: block;
			--paper-radio-button-unchecked-background-color: var(--triplat-radio-button-unchecked-background-color);
			--paper-radio-button-unchecked-color: var(--triplat-radio-button-unchecked-color);
			--paper-radio-button-unchecked-ink-color: var(--triplat-radio-button-unchecked-ink-color);
			--paper-radio-button-checked-color: var(--triplat-radio-button-checked-color);
			--paper-radio-button-checked-ink-color: var(--triplat-radio-button-checked-ink-color);
			--paper-radio-button-size: var(--triplat-radio-button-size);
			--paper-radio-button-label-color: var(--triplat-radio-button-label-color);
			--paper-radio-button-label-spacing: var(--triplat-radio-button-label-spacing);
			@apply --triplat-radio-button-style;
			@apply --triplat-radio-button;
			}

			paper-radio-group {
			--paper-radio-group-item-padding: var(--triplat-radio-group-item-padding, 4px);
			@apply --triplat-radio-group-style;
			@apply --triplat-radio-group;
			}
 
		</style>

	<paper-radio-group id="radioGroup" style="{{_setStyle(style)}}" class="{{_setClass(class)}}" selected="{{_computedValue(value)}}" aria-label\$="{{description}}">
	<template is="dom-if" if="{{!removeNone}}">
	  <paper-radio-button name="" disabled\$="[[disabled]]">None</paper-radio-button>
	</template>
		<template id="radioGroupTemplate" is="dom-repeat" items="{{selectSrc}}">
			<paper-radio-button name="{{item.value}}" disabled\$="[[disabled]]">{{item.value}}</paper-radio-button>
		</template>
	</paper-radio-group>
	`,

    is: "triplat-radio-group",

    properties: {
		/**
		  * Style property to be applied to this element and its children
		  *
		  **/
		style: String,
		/**
		  * Class property to be applied to this element and its children
		  *
		  **/
		class: String,
		/*
		 * String for the selected value bind to a data source field.
		 */
		value: {
			type: String,
			notify: true,
			readOnly: false
		},

		/*
		 * List data source.
		 */
		selectSrc: {
			type: Array,
			notify: false,
			readOnly: false
		},

		/*
		 * Disable input mode. Display value only.
		 */
		disabled: {
			type: Boolean,
			value: false
		},

		/**
		  * Description of the radio group (used for accessibility).
		  *
		  **/
		description: {
			type: String,
			value: "radio group"
		},

  /*
   * Set to true to remove the "None" option.
   */      
  removeNone: {
	type: Boolean,
	value: false
  }
		
	},

    listeners: {
		"paper-radio-group-changed": "_onRadioSelect"
	},

    _onRadioSelect: function() {
		var selected = this.$.radioGroup.selected;
		if(selected == "") {
			this.set("value", null);
		} else {
			this.set("value", selected);
		}
	},

    _computedValue: function(value) {
		if(value != null) {
			return value;
		}
		return "";
	},

    _setStyle: function(style){
		this.$.radioGroup.style.cssText = style;
	},

    _resetClassMap: function() {
		for (var myclass in this.$.radioGroup._classMap) {
			this.$.radioGroup._classMap[myclass] = false;
		}
	},

    _cleanClassMap: function() {
		var returnClassArray = [];
		for (var myclass in this.$.radioGroup._classMap) {
			if (!this.$.radioGroup._classMap[myclass]) {
				returnClassArray.push(myclass);
				delete this.$.radioGroup._classMap[myclass];
			}
		}
		return returnClassArray;
	},

    _isNewClassInMap: function(newclass) {
		if (typeof this.$.radioGroup._classMap == 'undefined') {
			this.$.radioGroup._classMap = {};
			this.$.radioGroup._classMap[newclass] = true;
			return true;
		} else {
			if (newclass in this.$.radioGroup._classMap) {
				this.$.radioGroup._classMap[newclass] = true;
				return false;
			} else {
				this.$.radioGroup._classMap[newclass] = true;
				return true;
			}
		}
	},

    _setClass: function(myclass){
		if (!myclass) {
			return;
		}
		this._resetClassMap();
		var arr = myclass.split(" ");
		// add in new addition class
		for (var i=0; i < arr.length; i++) {
			if (this._isNewClassInMap(arr[i])) {
				this.$.radioGroup.classList.add(arr[i]);
			}
		}
		// remove unused class
		var deleteClasses = this._cleanClassMap();
		for (var i=0; i < deleteClasses.length; i++) {
			this.$.radioGroup.classList.remove(deleteClasses[i]);
		}
	}
});