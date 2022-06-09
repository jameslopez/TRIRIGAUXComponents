/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { importJs } from "../tricore-util/tricore-util.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

export const importJsPromise = importJs([
	"./tri-interact.js",
	"./polygon.js"
], "triplat-drag-drop/triplat-interact.js");

export const TriInteract = function() {
	this.interactables = null;
	this.selector = null;
	this.options = {};
	this.debug = false;
	this.context = null;
	this.setup = true;
};

TriInteract.constructor = TriInteract;

TriInteract.prototype.setSelector = function(selector) {
	this.selector = selector;
};

TriInteract.prototype.updateOption = function(key, value) {
	this.options[key] = value;
};

TriInteract.prototype.deleteOption = function(key) {
	delete this.options[key];
};

TriInteract.prototype.getOption = function(key) {
	return this.options[key];
};

TriInteract.prototype.setDebug = function(debug) {
	this.debug = debug;
};

TriInteract.prototype.setContext = function(context) {
	this.context = context;
};

TriInteract.prototype.setSetup = function(setup) {
	this.setup = setup;
};

TriInteract.prototype.findParentByName = function(element, name) {
	if (element.tagName.toUpperCase() == name.toUpperCase()) {
		return element;
	}	
	// traverse upward to search element matching the name
	while(element.parentNode) {
		element = element.parentNode;
		if (element.tagName) {
			if (element.tagName.toUpperCase() == name.toUpperCase()) return element;
		} else if (element.host.tagName.toUpperCase() == name.toUpperCase()) {
			return element.host;
		} else {
			console.warn("triplat-interact.findParentByName: can't find " + name);
		}
	}
	return null;
};

TriInteract.prototype.findAttributeValue = function(element, attr, boundary) {
	var original = element;
	var value = element.getAttribute(attr);
	if (value) {
		return value;
	}	
	// traverse upward to search element has attr value
	while(element.parentNode) {
		if (document.body === element.parentNode) return null;
		element = element.parentNode;
		value = element.getAttribute(attr)
		if (value) return value;
		if (element.tagName.toUpperCase() == boundary.toUpperCase()) {
			console.warn(original.tagName + " does not have data-info attribute");
			return null;
		}
	}
	return null;
};

TriInteract.prototype.getInteractables = function(element) {
	if (!this.selector && !element) {
		if (this.debug)
			console.warn("no selector value or element parameter in TriInteract.getInteractables")
		return null;
	}
	if (element) {
		if (typeof element == "object") {
			this.interactables = interact(element);
			return this.interactables;
		} else {
			if (this.debug)
				console.warn("unknown parameter in TriInteract.getInteractables()");
			return null;
		}
	}
};

TriInteract.Draggable = function() {
	TriInteract.call(this);
};

TriInteract.Draggable.prototype = Object.create(TriInteract.prototype);
TriInteract.Draggable.constructor = TriInteract.Draggable;

TriInteract.Draggable.prototype.dragMoveListener = function(event, styleTarget) {
	// keep the dragged position in the data-x/data-y attributes
	var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,  
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// translate the element
	styleTarget.style.webkitTransform =
	styleTarget.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
};

TriInteract.Draggable.prototype.draggable = function(element) {
	if (this.setup) {
		if (this.interactables = this.getInteractables(element)) {
			return this.interactables.draggable(this.options);
		}
	}
	return false;
};

TriInteract.Draggable.prototype.findTriplatDrag = function(element) {
	return TriInteract.prototype.findParentByName(element, 'triplat-drag');
};

TriInteract.Draggable.prototype.findAttributeValue = function(element, attr) {
	return TriInteract.prototype.findAttributeValue(element, attr, 'triplat-drag');
};

TriInteract.Dropzone = function() {
	TriInteract.call(this);
};

TriInteract.Dropzone.prototype = Object.create(TriInteract.prototype);
TriInteract.Dropzone.constructor = TriInteract.Dropzone;

TriInteract.Dropzone.prototype.dropzone = function(element) {
	if (this.setup) {
		if (this.interactables = this.getInteractables(element)) {
			return this.interactables.dropzone(this.options);
		}
	}
	return false;
};

TriInteract.Dropzone.prototype.findTriplatDrop = function(element) {
	return TriInteract.prototype.findParentByName(element, 'triplat-drop');
};

TriInteract.Dropzone.prototype.findTriplatDropInGraphic = function(element) {
	var graphicBase = TriInteract.prototype.findParentByName(element, 'triplat-graphic-base');
	if (graphicBase) {
		let graphicDragDrop = dom(graphicBase.domHost).querySelector("triplat-graphic-drag-drop");
		return graphicDragDrop.$.triDrop;
	}
};

self.TriInteract = TriInteract;