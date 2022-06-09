/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { importJs } from "../tricore-util/tricore-util.js";
import { TriInteract, importJsPromise as TriInteractReady } from "./triplat-interact.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

TriInteractReady.then(() => {
/*
A component used to set up the drop zone.

### Example of setting up each space item in the list to be a drop target
	<template is="dom-repeat" items="{{allSpaces}}">
		<triplat-drop selector=".space-item" accept-selector=".user">
			<div tri-record-id$="{{item._id}}" class="space-item">
				<span class="id">
					<label>ID:</label>
					<span class="value">{{item.id}}</span>
				</span>
				<span class="id">
					<label>Name:</label>
					<span class="value">{{item.space}}</span>
				</span>
				<span class="id">
					<label>Type:</label>
					<span class="value">{{item.spaceClass}}</span>
				</span>
			</div>
		</triplat-drop>
	</template>
 */
	Polymer({
		is: "triplat-drop",
	
		/**
		 * Fired when drag target enters drop target.
		 *
		 * @event drag-enter
		 * @param {{dropTarget:Object, dragTarget:Object}} detail -
		 *     dropTarget: drop target object info.
		 *     dragTarget: drag target object info.
		 */
		 
		/**
		 * Fired when drag target leaves drop target.
		 *
		 * @event drag-leave
		 * @param {{dropTarget:Object, dragTarget:Object}} detail -
		 *     dropTarget: drop target object info.
		 *     dragTarget: drag target object info.
		 */
		 
		/**
		 * Fired when drag target drops into drop target. This event is different from `drop` event for triplat-graphic-drag-drop
		 *
		 * @event _drop
		 * @param {{dropTarget:Object, dragTarget:Object}} detail -
		 *     dropTarget: drop target object info.
		 *     dragTarget: drag target object info.
		 */
		properties: {
			/*
			 * Required CSS selector for the element(s) to interact as drop target. The value syntax is based on the CSS selector. 
			 * For example, a CSS class `space-item` is specified by `.space-item`, while a CSS id `drop-zone` is specified by `#drop-zone`.
			 */
			selector: {
				type: String,
				value: null,
				observer: '_updateSelector'
			},
			/*
			 * Required CSS selector for the accept element(s). The value syntax is based on the CSS selector.
			 * For example, to accept class `class-1` and id `id-2` to the drop zone, the value is `.class-1,#id-2`.
			 */
			acceptSelector: {
				type: String,
				value: null,
				reflectToAttribute: true,
				observer: '_updateAcceptSelector'
			},
			/*
			 * Flag to enable or disable dropzone.
			 */
			disabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				observer: '_updateDisabled'
			},
			/*
			 * Flag to prevent setup in polymer attached method.
			 * This is useful when planning to call setupDropZone() programmatically.
			 */
			noSetup: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				observer: '_updateNoSetup'
			},
			/*
			 * Flag to turn on debug info.
			 */
			debug: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				observer: '_updateDebug'
			},
			/*
			 * It is used by triplat-graphic-drag-drop. For internal usage.
			 */
			inGraphic : {
				type: Boolean,
				value: false
			},
		
			_triInteract: {
				type: Object,
				value: null
			},
			
			_svgContainer: {
				type: Object,
				value: null
			}
		},
		
		// options keep in local to prevent mix-up drag options
		_options: {
		},
		
		_updateSelector: function(newValue, oldValue) {
			if (!this._triInteract) {
				this._triInteract = new TriInteract.Dropzone();
				this._triInteract.setSelector(newValue);
			} else {
				this._triInteract.setSelector(newValue);
				if ((typeof newValue != 'undefined') && (typeof oldValue != 'undefined')) {
					this.setupDropZone(this.element);
				}
			}
		},
		
		_updateNoSetup: function(newValue, oldValue) {
			if (!this._triInteract)
				this._triInteract = new TriInteract.Dropzone();
			this._triInteract.setSetup(!newValue);
		},
		
		_updateDebug: function(newValue, oldValue) {
			if (!this._triInteract)
				this._triInteract = new TriInteract.Dropzone();
			this._triInteract.setDebug(newValue);
		},
		
		_updateAcceptSelector: function(newValue, oldValue) {
			if (!this._triInteract) {
				this._triInteract = new TriInteract.Dropzone();
				this._triInteract.updateOption("accept", newValue);
			} else {
				this._triInteract.updateOption("accept", newValue);
				if ((typeof newValue != 'undefined') && (typeof oldValue != 'undefined')) {
					this.setupDropZone(this.element);
				}
			}	
		},
		
		_updateDisabled: function(newValue, oldValue) {
			if (!this._triInteract)
				this._triInteract = new TriInteract.Dropzone();
			this._triInteract.updateOption("enabled", !newValue);
			if ((typeof newValue != 'undefined') && (typeof oldValue != 'undefined')) {
				this.setupDropZone(this.element);
			}
		},
		/*
		 * Programmatically enable/disable drop interaction.
		 * Parameter value is true to enable, false to disable
		 */
		updateEnabled: function(value) {
			if (this._triInteract) {
				this._triInteract.updateOption("enabled", value);
				this.setupDropZone(this.element);
			}
		},
		
		/*
		 * This method is used by <b>triplat-graphic-drag-drop</b> to provide container info.
		 */
		setSvgContainer: function(container) {
			this._svgContainer = container;
		},
		
		get element() {
			return dom(this).querySelector(this.selector);
		},
		
		attached: function() {
			this.setupDropZone(this.element);
		},
		
		_setupDefaultOptions: function() {
			this._triInteract.updateOption("overlap", "pointer");
			// dropChecker for triplat-graphic-drag-drop
			// dropChecker is the extra checking used in tri-interact.js for drop zone
			if (this.inGraphic) {
				var dropChecker = function(dragEvent, event, dropped, dropzone, dropElement, draggable, draggableElement) {
					if (dropped) {
						var parentElm = dropElement.parentElement || dropElement.parentNode;
						if (parentElm) {
							var parentId = parentElm.getAttribute("id");
							if (parentId) {
								// space needs to be in either triSpaceLayer or triSubSpaceLayer grouping
								if (parentId.localeCompare("triSpaceLayer") != 0 && parentId.localeCompare("triSubSpaceLayer") != 0) {
									return false;
								}
							} else
								return false;
						} else
							return false;
					}
					return dropped;
				}
				// generate random id with starting alphabetical character
				var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				var triplatGraphicId = randLetter + Date.now();
				
				// adding id as class in the selector will make this selector string unique 
				// when there are multiple triplat-graphic in the same page, so that
				// interact-js management map (based on selector) will not have collision
				var selector = this.selector + "," + triplatGraphicId;
				this._triInteract.setSelector(selector);
				this._triInteract.updateOption("checker", dropChecker);
				// use polygon stratgy when identifying drop zone for svg floor plan
				this._triInteract.updateOption("strategy", "polygon");
				this._triInteract.updateOption("svgContainer", this._svgContainer);
			};
			var findTriplatDrop;
			if (this.inGraphic) {
				findTriplatDrop = this._triInteract.findTriplatDropInGraphic;
			} else {
				findTriplatDrop = this._triInteract.findTriplatDrop;
			}
	
			// fire event handlers
			var onDragEnterHandler = function(event) {
				var triplatDrop = findTriplatDrop(event.target);
				if (triplatDrop) {
					triplatDrop.fire('drag-enter', {dropTarget: event.target,
													dragTarget: event.relatedTarget});
				}
			};
			this._triInteract.updateOption("ondragenter", onDragEnterHandler);
			var onDragLeaveHandler = function(event) {
				var triplatDrop = findTriplatDrop(event.target);
				if (triplatDrop) {
					triplatDrop.fire('drag-leave', {dropTarget: event.target,
													dragTarget: event.relatedTarget});
				}
			};
			this._triInteract.updateOption("ondragleave", onDragLeaveHandler);
			var onDropHandler = function(event) {
				var triplatDrop = findTriplatDrop(event.target);
				if (triplatDrop) {
					triplatDrop.fire('_drop', {dropTarget: event.target,
											  dragTarget: event.relatedTarget});
				}
			};
			this._triInteract.updateOption("ondrop", onDropHandler);
		},
		
		/*
		 * The element can be DOM element (object) or CSS selector (string).
		 * If setup is successfully, return interactable object. 
		 * Otherwise, return false.
		 */
		setupDropZone: function(element) {
			this._setupDefaultOptions();
			return this._triInteract.dropzone(element);
		},
		
		ready: function() {
		}
	});
});