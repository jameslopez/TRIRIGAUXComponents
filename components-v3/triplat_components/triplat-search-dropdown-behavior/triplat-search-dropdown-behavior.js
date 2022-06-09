/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { IronOverlayBehaviorImpl, IronOverlayBehavior } from "../@polymer/iron-overlay-behavior/iron-overlay-behavior.js";

export const TriplatSearchDropdownBehaviorImpl = {

properties: {
  _smallFooter: {
	type: Boolean,
	readOnly: true,
	value: false
  }
},

_resizeDropdown: function(inputWidth){
  if(!(inputWidth == 0)){
	var dropdownWidth = 600;
	if(inputWidth > dropdownWidth){
	  dropdownWidth += inputWidth*0.1;
		if(dropdownWidth > inputWidth){
		  dropdownWidth = inputWidth;
		}
	}else{
	  dropdownWidth = inputWidth;
	}
	this.$.main.style.width = dropdownWidth+'px';
	if(document.querySelector('body').getAttribute('dir') == 'rtl'){
	  if(!this._isIEOrFFOrEdge) {
		this.$.main.style.right = '-'+inputWidth+'px';
	  }else if(this._isFF){
		this.$.main.style.right = '0px';
	  }
	}
  }
},

_adjustFooter: function(inputWidth, headerHeight){
  // 320 is the minimum possible footer.
  this._set_smallFooter((inputWidth < 320) ? true : false);
  
  var footerHeight = 54;
  headerHeight = headerHeight ? headerHeight : 0;
  // Cross-browser pure JS way of getting half of the viewing height
  var half_vh = document.documentElement.clientHeight/2;
  // The max height calculated automatically by iron-fit-behavior
  var rootMaxHeight = Number(this.style.maxHeight.replace(/[^\d\.\-]/g, ''));
  
  // Apply rootMaxHeight if needed
  var isRootMaxHeightLess = rootMaxHeight < half_vh + footerHeight + headerHeight;
  var resultsMaxHeight = isRootMaxHeightLess ? rootMaxHeight - footerHeight - headerHeight : half_vh;
  // Do the actual height changing
  this.$.results.style.maxHeight = resultsMaxHeight+'px';
},

_handleFFOpenPositionDelay: function(){
  if(this._isFF){
	//FF, resetFit the dropdown so CSS absolute position is reflected
	this.async(function(){
	  this.resetFit();
	}, 20);
  }
},

get _isFF(){
  return typeof InstallTrigger !== 'undefined';
},
	
get _isIEOrFFOrEdge() {
  // TODO: This is not good.
  // We should find out another way of fixing bidi mirroing
  // without doing this!
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  var isEdge = !isIE && !!window.StyleMedia;
  return isIE || isEdge || this._isFF;
},

get _intDelay() {
  return parseInt(this.delay);
}
};

export const TriplatSearchDropdownBehavior = [IronOverlayBehavior, TriplatSearchDropdownBehaviorImpl];