/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { IronMeta } from "../@polymer/iron-meta/iron-meta.js";
import "../triplat-icon/ibm-icons.js";
import "./triplat-graphic-pin-tooltip.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { Base } from "../@polymer/polymer/polymer-legacy.js";

export const PinWorker = Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>


	`,

    is: 'triplat-graphic-pin-worker',

    ready: function() {
		this._createTooltip();
		this.listen(this._graphic, "svg-loaded", "_handleSvgLoadedChanged");
	},

    properties: {
		_graphic: Object,

		multiplePinSize: {
			type: Number,
			value: 32
		},

		multiplePinIconsetName: {
			type: String,
			value: "ibm"
		},

		multiplePinIconName: {
			type: String,
			value: "pin-multiples"
		},

		preserveMultiplePinSizeRatio: {
			type: Boolean,
			value: false
		},

		multiplePinShowLabelOnhover: {
			type: Boolean,
			value: false
		},

		multiplePinClassNumber: {
			type: Number,
			value: 1
		},

		_pinnedSpaces: {
			type: Array,
			value: []
		},

		_internalPins: {
			type: Array,
			value: []
		},

		_svgLoaded: {
			type: Boolean,
			readOnly: true,
			value: false
		},

		_lastViewPortScale: {
			type: Number,
			value: 0
		},

		_tooltip: Object,

		_svgElement: Object,

		/**
		 * @type {!Polymer.IronMeta}
		 */
		_meta: {
			value: Base.create('iron-meta', {type: 'iconset'})
		}
	},

    _handleSvgLoadedChanged: function(e) {
		this._lastViewPortScale=0;
		if (!this._graphic._lastPinScale) {
			this._graphic._lastPinScale=1;
		}
		this._pinnedSpaces = [];
		this._internalPins = [];
		if (this._tooltip) {
			this._hideTooltip();
			this._tooltip.status = "hidden";
		}
		this._svgElement = this._graphic.svgElement;
		this._set_svgLoaded(e.detail);
	},

    _findSpace: function (internalPin) {
		var space = this._graphic.attachedElementsByRecordId[internalPin.spaceId];
		return space;
	},

    _findInternalPinIndex: function (internalPinsArray, internalPin) {
		var index = -1;
		if(internalPinsArray) {
			for (var i = 0; i < internalPinsArray.length && index < 0; i++) {
				if (internalPinsArray[i].key == internalPin.key) {
					index = i;
				}
			}
		}
		return index;
	},

    /********************************************
	 *            TOOLTIP FUNCTIONS             *
	 ********************************************/

	/**
	 * Creates the tooltip for showing the pin labels.
	 */
	_createTooltip: function() {
		if (!this._tooltip && !this._graphic._tooltip ) {
			var tooltip = this.create("triplat-graphic-pin-tooltip");
			this.toggleClass("tri-pin-tooltip", true, tooltip);
			dom(this._graphic.root).appendChild(tooltip);
			this.listen(tooltip, "tri-pin-tooltip-close", "_handleTooltipClose");
			this._graphic._tooltip = tooltip;
			tooltip.graphic = this._graphic;
		}
		this._tooltip = this._graphic._tooltip;
	},

    _configSvgPinEvents: function(space, showLabelOnhover) {
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute("id", space._svgPinGroup.id+"Hover");
		rect.setAttribute("display", "inline");
		rect.setAttribute("fill", "white");
		rect.setAttribute("fill-opacity", "0");
		rect.setAttribute("width", space._pinIcon.viewBox.baseVal.width);
		rect.setAttribute("height", space._pinIcon.viewBox.baseVal.height);
		rect.space = space;
		if (showLabelOnhover) {
			this.listen(rect, 'mouseenter', '_handleSvgPinEvents');
			this.listen(rect, 'mouseleave', '_handleSvgPinEvents');        		
		}
		this.listen(rect, 'tap', '_handleSvgPinEvents');
		dom(space._pinIcon).appendChild(rect);
		space._pinIcon.rect = rect;
	},

    _handleSvgPinEvents: function(event) {
		var rect = event.currentTarget;
		var space = rect.space;
		this._processTooltipEvent(event.type, space);
	},

    _handleTooltipClose: function(event) {
		this._processTooltipEvent("close");
	},

    _processTooltipEvent: function(eventType, space, internalPin) {
		switch (this._tooltip.status) {
			case "hidden":
				switch (eventType) {
					case "mouseenter":
						this._tooltip.status = "showing-by-mouse-hover";
						this._showTooltip(space);
						break;
					case "tap":
						this._tooltip.status = "showing";
						this._showTooltip(space);
						if (space._internalPins.length == 1) {
							this._tooltip.selected = space._internalPins[0];
							this.fire("pin-selected-change", space._internalPins[0]);
						}
						break;
					case "select":
						this._tooltip.status = "showing";
						this._showTooltip(space);
						this._tooltip.selected = internalPin;
						this.fire("pin-selected-change", internalPin);
						break;
				}
				break;
			case "showing-by-mouse-hover":
				switch (eventType) {
					case "mouseleave":
						this._tooltip.status = "hidden";
						this._hideTooltip();
						break;
					case "tap":
						this._tooltip.status = "showing";
						if (this._tooltip.space != space) {
							this._hideTooltip();
							this._showTooltip(space);
						}
						if (space._internalPins.length == 1) {
							this._tooltip.selected = space._internalPins[0];
							this.fire("pin-selected-change", space._internalPins[0]);
						}	
						break;
					case "select":
						this._tooltip.status = "showing";
						if (this._tooltip.space != space) {
							this._hideTooltip();
							this._showTooltip(space);
						}
						this._tooltip.selected = internalPin;
						this.fire("pin-selected-change", internalPin);				
						break;
				}
				break;
			case "showing":
				switch (eventType) {
					case "close":
						this._tooltip.status = "hidden";
						this._hideTooltip();
						this.fire("pin-selected-change", null);
						break;
					case "tap":
						if (this._tooltip.space != space) {
							this._hideTooltip();
							this._showTooltip(space);
							if (space._internalPins.length == 1) {
								this._tooltip.selected = space._internalPins[0];
								this.fire("pin-selected-change", space._internalPins[0]);
							} else {
								this.fire("pin-selected-change", null);
							}
						}							
						break;
					case "select":
						if (this._tooltip.space != space) {
							this._hideTooltip();
							this._showTooltip(space);
						}
						this._tooltip.selected = internalPin;
						this.fire("pin-selected-change", internalPin);						
						break;
					case "deselect":
						if (this._tooltip.space == space && this._tooltip.selected && this._tooltip.selected.key == internalPin.key) {
							this._tooltip.status = "hidden";
							this._hideTooltip();
							this.fire("pin-selected-change", null);
						}					
						break;
					case "removed":
						if (this._tooltip.space == space) {
							if ( this._tooltip.selected && this._tooltip.selected.key == internalPin.key) {
								this._tooltip.selected = null;
							}
							if (!space._internalPins) {
								this._tooltip.status = "hidden";
								this._hideTooltip();
							} else {
								var selected = this._tooltip.selected;
								this._hideTooltip();
								this._showTooltip(space);
								this._tooltip.selected = selected; 							
							}
						}
						break;
					case "added":
						if (this._tooltip.space == space) {
							var selected = this._tooltip.selected;
							this._hideTooltip();
							this._showTooltip(space);
							this._tooltip.selected = selected;
						}
						break;
				}
				break;
		}
	},

    _showTooltip: function(space) {
		if (space) {
			dom(this._svgElement).removeChild(space._svgPinGroup);
			dom(this._svgElement).appendChild(space._svgPinGroup);
			space._pinIcon.outlineLayer.setAttribute("selected","");
			this._tooltip.addItems(space._internalPins);
			this._tooltip.target=space._pinIcon.rect;
			this._tooltip.space = space;
			this._tooltip.title = space._internalPins[0].spaceName;
			this._tooltip.show();
		}
	},

    _hideTooltip: function() {
		this._tooltip.hide();
		this._tooltip.for="";
		if (this._tooltip.space) {
			if (this._tooltip.space._pinIcon && this._tooltip.space._pinIcon.outlineLayer) {
				this._tooltip.space._pinIcon.outlineLayer.removeAttribute("selected");
			}
			this._tooltip.space = null;
		}		
	},

    _selectPin: function(internalPin) {
		var internalIndex = this._findInternalPinIndex(this._internalPins,internalPin)
		if (internalIndex >=0) {
			var space = this._findSpace(internalPin);
			if (space) {
				this._processTooltipEvent("select", space, internalPin);
			}
		}
	},

    _deselectPin: function(internalPin) {
		var internalIndex = this._findInternalPinIndex(this._internalPins,internalPin)
		if (internalIndex >=0) {
			var space = this._findSpace(internalPin);
			if (space) {
				this._processTooltipEvent("deselect", space, internalPin);
			}
		}
	},

    /********************************************
	 *      ADD AND REMOVE PIN FUNCTIONS        *
	 ********************************************/

	_addInternalPin: function(internalPin) {
		var space = this._findSpace(internalPin);
		if (space) {        		
			this._addPinToSpace(space, internalPin);
			this._updatePins();
			if (this._internalPins.length == 1 ) {
				this.listen(this._graphic, "view-port-change", "_handleViewPortChanged");
				this.listen(this._graphic, "iron-resize", "_handleGraphicSizeChanged");
			}
			this._processTooltipEvent("added", space, internalPin);
		} else {
			console.log("Space not found: [Space id= " + internalPin.spaceId + "]");
		}
	},

    _addPinToSpace: function(space, internalPin) {
		if (!space._internalPins) {
			space._internalPins = [];
		}
		switch (space._internalPins.length) {
			case 0:
				this._addFirstPinToSpace(space, internalPin);
				break;
			case 1: 
				this._addMultiplePinToSpace(space, internalPin);
				break;
			default:
				space._internalPins.push(internalPin);
				this._internalPins.push(internalPin);
				this._updateMultiplePinCounter(space);
		}
	},

    _addFirstPinToSpace: function(space, internalPin) {
		this._addSvgPinGroup(space);
		var pinIcon = this._addSvgPinIcon(space, 
										  internalPin.iconsetName, 
										  internalPin.iconName, 
										  internalPin.classNumber);
		if (pinIcon) {
			space._internalPins.push(internalPin);
			this._pinnedSpaces.push(space);
			this._internalPins.push(internalPin);
			this._configSvgPinEvents(space, internalPin.showLabelOnhover);
		} else {
			this._unpinSpace(space);
		}
	},

    _addMultiplePinToSpace: function(space, internalPin) {
		var oldPinIcon = space._pinIcon;
		dom(space._svgPinGroup).removeChild(oldPinIcon);
		space._pinIcon = null;
		var pinIcon = this._addSvgPinIcon(space, 
										  this.multiplePinIconsetName, 
										  this.multiplePinIconName, 
										  this.multiplePinClassNumber);
		if (pinIcon) {
			space._internalPins.push(internalPin);
			this._internalPins.push(internalPin);
			this._addMultiplePinCounter(space);
			this._configSvgPinEvents(space, this.multiplePinShowLabelOnhover);
		} else {
			dom(space._svgPinGroup).appendChild(oldPinIcon);
			space._pinIcon = oldPinIcon;
		}
	},

    _addSvgPinGroup: function(space) {
		var svgPinGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		svgPinGroup.id = "svgPinGroup" + space.getAttribute("tri-record-id");
		dom(this._svgElement).appendChild(svgPinGroup);
		space._svgPinGroup = svgPinGroup;
	},

    _addSvgPinIcon: function(space, iconsetName, iconName, classNumber) {
		var iconset = null;
		if (this._meta) {
			iconset = this._meta.byKey(iconsetName);
			if (iconset) {
				var icon = iconset._createIconMap()[iconName];
				if (icon) {
					var pinIcon = icon.cloneNode(true);
					/*
					 * IBM icons are svg tags, iron-icons are g tags. 
					 * Here we normalize all icons to be svg tags.
					 */
					if (pinIcon.nodeName != "svg") {
						var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
						var viewBox = '0 0 ' + iconset.size + ' ' + iconset.size;
						svg.setAttribute('viewBox', viewBox);
						svg.appendChild(pinIcon).removeAttribute('id');
						pinIcon = svg;
					}
					pinIcon.setAttribute("id", space._svgPinGroup.id + "Icon" );
					pinIcon.setAttribute("class", "tri-pin-icon-" + classNumber);
					pinIcon.setAttribute("width", pinIcon.viewBox.baseVal.width);
					pinIcon.setAttribute("height", pinIcon.viewBox.baseVal.height);

					// Add space for the outline line that is shown when the pin is selected
					pinIcon.viewBox.baseVal.width += 2;
					pinIcon.viewBox.baseVal.height += 2;
					pinIcon.viewBox.baseVal.x -= 1;
					pinIcon.viewBox.baseVal.y -= 1;

					dom(space._svgPinGroup).appendChild(pinIcon);
					//this._updatePinIconPosition(pinIcon, space);
					space._pinIcon = pinIcon;
					space._pinIcon.outlineLayer = dom(pinIcon).querySelector("[fill]");
					this.toggleClass("tri-pin-outline", true, space._pinIcon.outlineLayer);
				}
			} else {
				console.log("Icon not found.[icon=" + this.icon + "]");	
			}
		}
		return space._pinIcon;
	},

    _addMultiplePinCounter: function(space) {
		var counterText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		counterText.setAttribute("class", "tri-pin-counter");
		counterText.setAttribute("text-anchor", "middle");
		counterText.setAttribute("font-size", "14");
		counterText.setAttribute("x", space._pinIcon.viewBox.baseVal.width/2 -1);
		counterText.setAttribute("y", space._pinIcon.viewBox.baseVal.height/2 + 1);			
		dom(space._pinIcon).appendChild(counterText);
		space._counter = counterText;
		this._updateMultiplePinCounter(space);
	},

    _updateMultiplePinCounter: function(space) {
		space._counter.textContent = space._internalPins.length;
	},

    _unpinSpace: function(space) {
		if (space._svgPinGroup) {
			dom(this._svgElement).removeChild(space._svgPinGroup);
		}
		space._svgPinGroup = null;
		space._pinIcon = null;
		space._counter = null;
		space._internalPins = null;
		var index = this._pinnedSpaces.indexOf(space);
		if (index >=0) {
			this._pinnedSpaces.splice(index,1);
		}
	},

    _removeInternalPin: function(internalPin) {
		var space = this._findSpace(internalPin);
		//Remove the internal pin from the space
		if (space) {
			var internalPinIndex = this._findInternalPinIndex(space._internalPins,internalPin);
			if (internalPinIndex >= 0 ) {
				space._internalPins.splice(internalPinIndex,1);
				switch (space._internalPins.length) {
					case 0: 
						this._unpinSpace(space);
						break;
					case 1:
						this._removeMultiplePinFromSpace(space);
						break;
					default:
						this._updateMultiplePinCounter(space);
				}
				this._processTooltipEvent("removed", space, internalPin);
			}
		}

		//Remove the internal pin from this component
		var internalIndex = this._findInternalPinIndex(this._internalPins,internalPin)
		if (internalIndex >=0) {
			this._internalPins.splice(internalIndex,1);
		}
		if (this._internalPins.length == 0 ) {
			this.unlisten(this._graphic, "view-port-change", "_handleViewPortChanged");
			this.unlisten(this._graphic, "iron-resize", "_handleGraphicSizeChanged");
		}
	},

    _removeInternalPins: function(iconName) {
		if(this._internalPins) {
			var pinsToRemove = this._internalPins.filter (
				function(internalPin) {
					return internalPin.iconName === iconName;
				}
			);
			for (var i = 0; i < pinsToRemove.length; i++) {
				this._removeInternalPin(pinsToRemove[i]);
			}
		}
	},

    _removeMultiplePinFromSpace: function(space) {
		var internalPin = space._internalPins[0];
		var oldPinIcon = space._pinIcon;
		dom(space._svgPinGroup).removeChild(oldPinIcon);
		space._pinIcon = null;
		var pinIcon = this._addSvgPinIcon(space, 
										  internalPin.iconsetName, 
										  internalPin.iconName, 
										  internalPin.classNumber);
		this._configSvgPinEvents(space, internalPin.showLabelOnhover);
		this._updatePins();	
	},

    /********************************************
	 *    SCALING AND POSITIONING FUNCTIONS     *
	 ********************************************/
	_handleViewPortChanged: function(e) {
	   if (e.detail.base.width == 0 || e.detail.base.height == 0) {
		   return;
	   }
	   if (e.detail.base.scale != this._lastViewPortScale) {
		   this._updatePins();
		   this._lastViewPortScale = e.detail.base.scale;
	   } else if (this._tooltip) {
		   this._tooltip.updatePosition();
	   }
   },

    _handleGraphicSizeChanged: function() {
		if (!this._svgLoaded) {
			return;
		}
		if (this._graphic._calculatedWidth > 0 && this._graphic._calculatedHeight > 0 ) {
			this._updatePins();
		}
	},

    _updatePins: function() {
		if (this._updatePinsHandle) {
			this.cancelAsync(this._updatePinsHandle);
		}
		this._updatePinsHandle = this.async(this._updatePinsExecute, 20);
	},

    _updatePinsExecute: function(centerPointsByRecordId) {
		if (centerPointsByRecordId) {
			if (!this._svgLoaded || this._svgElement.getBoundingClientRect().width == 0 || this._svgElement.getBoundingClientRect().height == 0) {
				return;
			}

			var widthScale = this._svgElement.viewBox.baseVal.width / this._svgElement.getBoundingClientRect().width;
			var heightScale = this._svgElement.viewBox.baseVal.height / this._svgElement.getBoundingClientRect().height;
			/* 
			 * The svg has the preserveAspectRatio attribute equals to "xMidYMid meet". In this case the the entire 
			 * viewBox is visible within the viewport and the viewBox is scaled up as much as possible. So, we will use
			 * the highest between the width and height scale. 
			 */
			var calculatedScale = widthScale > heightScale ? widthScale : heightScale;

			for (var i = 0; i < this._pinnedSpaces.length; i++) {
				var space = this._pinnedSpaces[i];
				var multiplePin = space._internalPins.length > 1;
				var pinIcon = space._pinIcon;
				var scale = space._internalPins[0].preservePinSizeRatio ? 1 : calculatedScale;
				var pinSize = space._internalPins[0].pinSize;
				if (multiplePin) {
					scale = this.preserveMultiplePinSizeRatio ? 1 : calculatedScale;
					pinSize = this.multiplePinSize;
				}
				this._scalePinIcon(pinIcon, space, scale, pinSize, centerPointsByRecordId);
				if (this._tooltip && this._tooltip.space==space) {
					this._tooltip.updatePosition();
				}
			}

			this._graphic._lastPinScale = scale;
			this._updatePinsHandle = null;
		} else {
			this._graphic.getCenterPointsByRecordId().then(
				this._updatePinsExecute.bind(this)
			).catch(
				this._updatePinsExecute.bind(this, {})
			);
		}
	},

    _scalePinIcon: function (pinIcon, space, scale, pinSize, centerPointsByRecordId) {
		var pinScaledSize = pinSize*scale;
		var currentX = pinIcon.x.baseVal.value;
		var currentY = pinIcon.y.baseVal.value;
		var currentWidth = pinIcon.width.baseVal.value;
		var currentHeight = pinIcon.height.baseVal.value;
		pinIcon.setAttribute("width", pinScaledSize);
		pinIcon.setAttribute("height", pinScaledSize);
		this._updatePinIconPosition(pinIcon, space, centerPointsByRecordId);
	},

    /**
	 * Put the pin icon at the center of the space.
	 * It first tries to use the center point returned from the server. If the center point is not
	 * available it will place the pin in the centroid of the space.
	 * The icon's bottom and icon's middle width are aligned with the center of the space.
	 */
	_updatePinIconPosition: function (pinIcon, space, centerPointsByRecordId) {
		var centerX, centerY = 0;
		var spaceId = space.getAttribute("tri-record-id");
		if (centerPointsByRecordId && centerPointsByRecordId[spaceId]) {
			centerX = centerPointsByRecordId[spaceId].x;
			centerY = centerPointsByRecordId[spaceId].y;
		} else if (!space.points) {
			var spaceBBox = space.getBBox();
			centerX = spaceBBox.x + spaceBBox.width/2;
			centerY = spaceBBox.y + spaceBBox.height/2
		} else {
			var centroid = this._calculateSpaceCentroid(space.points);
			centerX = centroid.x;
			centerY = centroid.y;
		}
		pinIcon.setAttribute("x", centerX - pinIcon.width.baseVal.value/2);
		pinIcon.setAttribute("y", centerY - pinIcon.height.baseVal.value);
	},

    /**
	 *	Calculate the centroid of a non-self-intersecting closed polygon
	 */
	_calculateSpaceCentroid: function (points) {
		var x = 0,
			y = 0,
			signedArea = 0,
			i,
			j,
			f,
			point1,
			point2;

		for (i = 0, j = points.numberOfItems - 1; i < points.numberOfItems; j=i,i++) {
			point1 = points.getItem(j);
			point2 = points.getItem(i);
			f = (point1.x * point2.y) - (point2.x * point1.y)
			signedArea += f;
			x += (point1.x + point2.x) * f;
			y += (point1.y + point2.y) * f;
		}

		signedArea /= 2;

		return {
			x: x / (signedArea * 6),
			y: y / (signedArea * 6)
		};
	}
});