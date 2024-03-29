/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

export const TriplatSelectInputScrollBehavior = {
	
	properties: {
		/**
		 * Last vertical touch position.
		 */
		_lastTouchPageY: {
			type: Number,
			value: 0
		},
		
		/**
		 * Indicates if new items are being added to the dropdown.
		 */
		_addingItems: {
			type: Boolean,
			value: false
		}
	},
	
	listeners: {
		"wheel": "_onScroll",
		"touchstart": "_onScroll",
		"touchmove": "_onScroll",
		"dom-change": "_handleItemsTemplateDomChange"
	},
	
	_onScroll: function(event) {
		if (!this.$.dropdown.opened) {
			return;
		}
		if (event.type === 'touchstart') {
			this._storeLastTouch(event);
			return;
		}
		if (!event.cancelable) {
			return;
		}
		var deltaY = this._getScrollDeltaY(event);
		
		if (deltaY > 0) {
			var distanceToBottom = this.scroller.scrollHeight - this.scroller.clientHeight - this.scroller.scrollTop;
			var canScrollDown =  distanceToBottom > 65;//loading spinner height
		
			if (!canScrollDown || this._addingItems) {
				event.preventDefault();
				this.scroller.scrollTop = this.scroller.scrollHeight;//Move the scrollbar to the bottom
			}
		}
		
	},
	
	_storeLastTouch: function(event) {
		if (event.targetTouches) {
			this._lastTouchPageY = event.targetTouches[0].pageY;
		}
	},
	
	_getScrollDeltaY: function(event) {
		var deltaY = event.deltaY;
		if (event.targetTouches) {
			deltaY = this._lastTouchPageY - event.targetTouches[0].pageY;
		}
		this._storeLastTouch(event);
		return deltaY;
	},
	
	_handleItemsTemplateDomChange: function(event) {
		if (event.target != null && event.target.is == "dom-repeat") {
			this._addingItems = true;
			this.debounce('triplat-select-input-adding-items',
				this.set.bind(this, "_addingItems", false), 
				500
			);
		}
	}
};