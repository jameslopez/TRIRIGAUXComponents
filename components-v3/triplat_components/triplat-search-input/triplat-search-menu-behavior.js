/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

export const TriplatSearchMenuBehavior = {
	
	properties: {
		_focusedByKeyboard: {
			type: Boolean,
			value: false,
			readOnly: true
		}   
	},
	
	_handleKeyDown: function(e){
		var target = e.target;
		if(e.keyCode == 40) { // Arrow Down
			if(e.target.tagName == "LI"){
				var aux = dom(target).firstElementChild;
				if(aux.tagName == "PAPER-CHECKBOX"){
					target = this._nextLine(target);
					this._focusElement(target);
				} else {
					this._focusElement(aux);
				}
			} 
			if(e.target.tagName == "SPAN"){
				var aux = dom(target).nextElementSibling;
				if(aux && aux.hidden){
					aux = dom(aux).nextElementSibling;
				}
				if(aux){
					this._focusElement(aux); 
				} else {
					target = dom(target).parentNode;
					target = this._nextLine(target);
					this._focusElement(target);
				}
			}
			e.preventDefault();
			return;
		}
		if(e.keyCode == 38) { // Arrow Up
			if(e.target.tagName == "LI"){
				var aux = dom(target).previousElementSibling;
				if(!aux && dom(target).parentNode.tagName == "IRON-SCROLL-THRESHOLD"){
					aux = dom(dom(target).parentNode).previousElementSibling;
				}
				if(aux && aux.tagName == "TEMPLATE"){
					aux = dom(aux).previousElementSibling;
					if(this._singleHeaderMode){
						target = dom(this.$$("#singleHeader")).lastElementChild;
						this._focusElement(target);
						e.preventDefault();
						return;
					}
				}
				if(aux){
					target = dom(aux).lastElementChild;
					if(target.hidden){
						target = dom(target).previousElementSibling;
					} else if(dom(target).previousElementSibling.tagName == "PAPER-CHECKBOX"){
						target = aux;    
					}
				} else {
					target = this._previousLine(target);
				}
				this._focusElement(target);
			} 
			if(e.target.tagName == "SPAN"){
				var aux = dom(target).previousElementSibling;
				if(aux){
					this._focusElement(aux); 
				} else {
					target = dom(target).parentNode;
					target = this._previousLine(target);
					this._focusElement(target);
				}
			}
			e.preventDefault();
			return;
		}
		if(e.keyCode == 13) { // ENTER
			if(target.tagName == "PAPER-BUTTON"){
				return;
			}
			target.click();
			e.preventDefault(); 
			return;
		}
		
		if(e.keyCode == 9 || e.keyCode == 16) { // TAB, SHIFT
			return;    
		}
		
		this.fire("triplat-search-menu-user-typed");
	},
	
	_nextLine: function(elem){
		var next = dom(elem).nextElementSibling;
		if(next.tagName == "TEMPLATE" && next.id != "childRepeater"){
			next = dom(next).nextElementSibling;    
		}
		if(next.tagName == "IRON-SCROLL-THRESHOLD"){
			next = dom(next).firstElementChild;
		}
		if(next.tagName == "DIV"){
			next = dom(next).firstElementChild;
			next = dom(next).firstElementChild;
			next = dom(next).nextElementSibling;
			next = dom(next).nextElementSibling;
		}
		if(!(next.tagName == "LI")){
			next = dom(next).parentNode;
			if(next.tagName == "IRON-SCROLL-THRESHOLD"){
				next = dom(next).parentNode;
			}
			next = dom(next).nextElementSibling;
			if(next.tagName == "UL"){
				next = dom(next).firstElementChild;
				next = dom(next).firstElementChild;
			}
		}
		return next;
	},
	
	_previousLine: function(elem){
		var previous = elem;
		previous = dom(previous).previousElementSibling;
		if(!previous){
			previous = dom(elem).parentNode;
			if(previous.tagName == "IRON-SCROLL-THRESHOLD"){
				previous = dom(previous).parentNode;
			}
			previous = dom(previous).previousElementSibling;
			if(!previous){
				this._handleBackToAllResults();
				this.close();
				return;
			}
			if(previous.tagName == "UL"){
				previous = dom(previous).lastElementChild;
				if(previous.tagName == "IRON-SCROLL-THRESHOLD"){
					previous = dom(previous).lastElementChild;
				}
				if(!(previous.tagName == "LI")){
					previous = dom(previous).previousElementSibling;
				}
			}
		}
		return previous;
	},
	
	_focusElement: function(elem){
		if(elem){
			elem.tabIndex = -1;
			elem.focus();
			this._set_focusedByKeyboard(true);
		}
	},
	
	focusFirstElement: function(){
		var firstList = dom(this.$.main).firstElementChild.nextElementSibling.firstElementChild;
		var firstLine = dom(firstList).firstElementChild;
		this._focusElement(dom(firstLine).firstElementChild);
	},
	
	_focusFirstElementSingleHeader: function(){
		var firstLine = dom(this.$$("#singleHeader")).firstElementChild;
		this._focusElement(firstLine);
	},
	
	get _isIEOrFFOrEdge(){
		// TODO: This is not good.
		// We should find out another way of fixing bidi mirroing
		// without doing this!
		var isFF = typeof InstallTrigger !== 'undefined';
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		var isEdge = !isIE && !!window.StyleMedia;
		
		return isFF || isIE || isEdge;
	},
};