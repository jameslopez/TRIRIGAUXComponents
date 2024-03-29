/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriplatQueryPageBehaviorImpl, TriplatQueryPageBehavior } from "./triplat-query-page-behavior.js";
import { flush } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
A component to indicate that the data should be retrieved from the server by using scrolling pagination for a triplat-query component. 
Filtering and sorting will be done on the server.

Additional information including examples can be found on the triplat-query documentation page.
*/
Polymer({

	is: "triplat-query-scroll-page",

	properties: {

		/**
		 * This element contains the data items on the page, whose scroll event is responsible for triggering this pagination request.
		 */
		scroller: {
			type: Object,
			notify: false,
			readOnly: false,
			observer: "_initScroller"
		},

		/**
		  * The number of pixels from the current scroll position to the bottom of the scroller that will trigger a pagination request. 
		  */ 
		threshold: {
			type: Number,
			notify: false,
			readOnly: false,
			value: 250
		},

		/**
		  * The total number of records that have been retrieved from the server.
		  */ 
		dataSize: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		  * The total number of records available from the server.
		  */ 
		totalSize: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		 * The number of records that you want to represent a page.
		 */
		size: {
			type: Number
		},
		
		/**
		 * By default, the triplat-query-scroll-page will listen to dom-change events from 
		 * the scroller container. When a dom-change from a dom-repeat occurs, it will check if the 
		 * currently retrieved records activated the scrollbar on the scroller container. 
		 * If there is no scrollbar yet and there are more records to be retrieved, the 
		 * triplat-query-scroll-page will trigger the triplat-ds to fetch more records until the 
		 * scrollbar is activated on the scroller or all records have been retrieved.
		 * This logic prevents the scenario where the first page of records are retrieved and there are more 
		 * records to be retrieved, but the scroller container does not have a scrollbar to trigger 
		 * the retrieval of remaining records.
		 * If <b>disableAutoFetch</b> is true it will disable this auto-fetch logic.
		 */
		disableAutoFetch: {
			type: Boolean,
			value: false
		},
		
		/**
		 * Deprecated. Use the <b>disableAutoFetch</b> property instead.
		 */
		acceptModernSearch: {
			type: Boolean,
			value: false
		},

		/**
		 * If true, the <b>triplat-query-scroll-page</b> will react to the movement of scroller's horizontal 
		 * scrollbar. Otherwise, it will react to the movement of scroller's vertical scrollbar.
		 */
		horizontalScroll: {
			type: Boolean,
			value: false
		}
	},

	behaviors: [
		TriplatQueryPageBehavior
	],

	listeners: {
		"triplat-ds-change": "_onDsChanged"
	},

	/**
	 * Sets the scroller to null.
	 */
	detached: function() {
		this.set("scroller", null);
	},

	_initScroller: function(newScroller, oldScroller) {
		if (oldScroller) {
			this.unlisten(oldScroller, "scroll", "_onScroll");
		}
		if (newScroller) {
			if (this._isAutoFetchEnabled()) {
				this.listen(newScroller, "dom-change", "_scrollerDataPopulationComplete");
			}
			this.set("from", 0); // TODO this might cause problems if the scroller is switched
			this.listen(newScroller, "scroll", "_onScroll");
		}
	},

	_onScroll: function(e) {
		if (this._disable) {
			return;
		}

		if (this.horizontalScroll) {
			var initial = this.scroller.scrollLeft;
			var opposite = initial + this.scroller.offsetWidth;
			var size = this.scroller.scrollWidth;
		} else {
			var initial = this.scroller.scrollTop;
			var opposite = initial + this.scroller.offsetHeight;
			var size = this.scroller.scrollHeight;
		}

		if ((size - opposite) < this.threshold) {
			this._nextPage();
		}
	},

	_onDsChanged: function(e) {
		this._disable = false;
		this._setTotalSize(e.detail.totalSize);
		this._setDataSize(e.detail.size);
		if (this.scroller && this._isAutoFetchEnabled()) {
			this.listen(this.scroller, "dom-change", "_scrollerDataPopulationComplete");
		}
	},

	/**
	 * Sets the 'from' to zero.
	 */
	reset: function() {
		this.set("from", 0);
	},

	_scrollerDataPopulationComplete: function(event) {
		if (event.target != null &&  event.target.is !== undefined && event.target.is == "dom-repeat") {
			var canScroll = true;
			flush();
			if (this.horizontalScroll) {
				if (this.scroller &&
					this.scroller.clientWidth > 0 &&
					this.scroller.scrollWidth > 0 &&
					this.scroller.scrollWidth <= this.scroller.clientWidth) {
					canScroll = false;
				}
			} else {
				if (this.scroller &&
					this.scroller.clientHeight > 0 &&
					this.scroller.scrollHeight > 0 &&
					this.scroller.scrollHeight <= this.scroller.clientHeight) {
					canScroll = false;
				}
			}

			if (canScroll) {
				this.unlisten(this.scroller, "dom-change", "_scrollerDataPopulationComplete");
			} else {
				this._nextPage();
			}
		}
	},

	_nextPage: function() {
		this._disable = true;
		if (this.totalSize != null && this.dataSize != null && this.dataSize < this.totalSize) {
			this.set("from", this.from + this.size);
		}
	},

	_isAutoFetchEnabled: function() {
		return !this.disableAutoFetch && !this.acceptModernSearch;
	}

});