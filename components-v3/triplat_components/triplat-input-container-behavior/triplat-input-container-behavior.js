/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

export const TriplatInputContainerBehavior = {

	properties: {
		/**
	 * Internally set to a unique value so that aria will work properly
	 */
		_labelId: {
		type: String,
		readOnly: true
	},
		/**
	 * Internally set to a unique value so that label will work properly
	 */
	_inputId: {
		type: String,
		readOnly: true
	}
	},

	ready: function() {
		this._set_labelId(this._generateInputId());
		this._set_inputId(this._generateInputId());
	},

	_generateInputId: function(){ 
	var d = new Date().getTime();
	var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
		function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c == 'x' ? r : (r&0x7|0x8)).toString(16);
	});
	return 'input'+uid;
	}
};