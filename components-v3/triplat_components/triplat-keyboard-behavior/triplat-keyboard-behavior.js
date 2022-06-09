/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

export const TriplatKeyboardBehavior = {
	
	properties: {
		_ENTER: {
			type: Number,
			value: 13
		},
		_SPACE: {
			type: Number,
			value: 32
		},
		_ARROW_DOWN: {
			type: Number,
			value: 40
		}
	},
	
	_handleKeyDown: function(keyEvent){
		if(keyEvent.keyCode == this._ENTER){
			keyEvent.preventDefault();
			this.fire("triplat-keyboard-enter"); 
		}
	}
};