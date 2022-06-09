/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import { TriplatRequiresWebContextIdBehavior } from "../triplat-ds/triplat-requires-web-context-id-behavior.js";
import "./triplat-availability-layout.js";
import "./triplat-availability-data.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined, importCss } from "../tricore-util/tricore-util.js";
import "./styles/tristyles-availability.js";
import "./styles/tristyles-gantt.js";
import "./styles/tristyles-grid.js";

window.ScrollToNext = function(){
	Grids.triplatElement.nextOccurrence();
}

window.ScrollToPrevious = function() {
	Grids.triplatElement.previousOccurrence();
}

window.ScrollToHome = function() {
	Grids.triplatElement.scrollToHome();
}

window.NextDisabled = function() {
	return !Grids.triplatElement.hasNextOccurrence();
}

window.PreviousDisabled = function() {
	return !Grids.triplatElement.hasPreviousOccurrence();
}

window.HandleResourceLink = function(resourceId) {
	if(resourceId != null){
		Grids.triplatElement.fire("resource-click", {resourceId: resourceId});
	}
}

window.TRIGanttdependencyerrors = function() {
	// not used but prevents exception in TextXML processing because TextXML is shared with Gantt
	return "";	
}

/*
This is component is used to verify the availability of reservation resources. It shows unavailable, available and busy time for each resource.

> **Caution: This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.**

### Declaring Example

The following example shows how the component can be used, how the events can be handled, and which inner elements are needed. For more information, refer to the documentation page of `triplat-availability-layout`, `triplat-availability-data` and `triplat-availability-data-context`.

	<triplat-availability on-resource-click="_handleResourceClick"
	  on-row-limit="_handleRowLimit" selected="{{_selectedResources}}"
	  loading="{{_availabilityLoading}}">

	  <triplat-availability-layout default-view-mode="day"
		max-view-mode="month" columns="[[_columns]]" home-only-toolbar>
	  </triplat-availability-layout>

	  <triplat-availability-data datasource="lookupRoom" 
		calendar-set-name="triResourceAvailability" include-unavailable>

		<triplat-availability-data-context name="myReservationManagers"
		  context-id="[[specId]]">
		</triplat-availability-data-context>

	  </triplat-availability-data>

	</triplat-availability>

#### Script code

	_handleResourceClick: function(e){
	  var resourceId = e.detail.resourceId;
	  // Do something with the resourceId
	  // You can open a popup to show the resource's detail.
	},

	_handleRowLimit: function(e){
	  // There is a default message provided by the component
	  var alertMessage = e.detail;
	  // You can use the message to show a warning

	  // Or you can start any processing that depends on this condition
	}
*/
	Polymer({
		_template: html`
			<style include="tristyles-theme grid-styles gantt-styles availability-styles">
	
					:host {
						@apply --layout-vertical;
					}
	
					#treeGridContainer {
						@apply --layout-flex;
					}
				
			</style>
	
			<tricore-url id="treeGridUrl" hidden="" raw-url="/html/en/default/js/lib/TreeGrid/Grid/GridE.js">
			</tricore-url>
	
			<tricore-url hidden="" raw-url="/p/availability/layout" bind-url="{{_layoutUrl}}">
			</tricore-url>
	
			<tricore-url hidden="" raw-url="/p/availability/data" bind-url="{{_dataUrl}}">
			</tricore-url>
	
			<tricore-url hidden="" raw-url="/p/availability/text" bind-url="{{_textUrl}}">
			</tricore-url>
	
			<div id="treeGridContainer" hidden\$="[[loading]]">
			</div>
	
			<slot name="availability-layout"></slot>
			<slot name="availability-data"></slot>
		`,
	
		is: "triplat-availability",
	
		/**
	  * Fired when the maximum number of rows to be
	  * displayed is reached.
	  * The row limit can be set
	  * by changing the AVAILABILITY_SECTION_ROW_LIMIT
	  * in TRIRIGAWEB.properties.
	  *
	  * @event row-limit
	  */
	
		/**
		* Fired every time the user clicks
		* a resource detail.
		*
		* @event resource-click
		*/
	
		properties: {
	
			/**
			 * An array containing the resources 
			 * that are selected through this component.
			 */
			selected: {
				type: Array,
				value: [],
				notify: true
			},
	
			/**
			 * A flag that can notify the user when this 
			 * component is requesting data from the server.
			 */
			loading: {
				type: Boolean,
				value: false,
				notify: true,
				readOnly: true
			},
	
			/**
			 * If this property is set, the availability component will display only the resources that are contained in this array.
			 */
			visibleResources: {
				type: Array
			},
	
			_layout: {
				type: Object,
				readOnly: true,
			},
	
			_data: {
				type: Object,
				readOnly: true,
			},
	
			_modelAndView: {
				type: String,
				readOnly: true
			},
	
			_instanceId: {
				type: String,
				readOnly: true
			},
	
			_layoutAjax: {
				type: Object,
				notify: false,
				readOnly: true
			},
	
			_dataAjax: {
				type: Object,
				notify: false,
				readOnly: true
			},
	
			_textAjax: {
				type: Object,
				notify: false,
				readOnly: true
			},
	
			_layoutRequestBody: {
				type: Object,
				readOnly: true
			},
	
			_dataRequestBody: {
				type: Object,
				readOnly: true
			},
	
			_refresh: {
				type: Boolean,
				readOnly: true
			},
	
			_layoutLoaded: {
				type: Boolean,
				readOnly: true
			},
	
			_dataLoaded: {
				type: Boolean,
				readOnly: true
			},
	
			_textLoaded: {
				type: Boolean,
				readOnly: true
			},
	
			_dataXml: {
				type: String,
				notify: false,
				readOnly: true,
			},
	
			_layoutXml: {
				type: String,
				notify: false,
				readOnly: true,
			},
	
			_textXml: {
				type: String,
				notify: false,
				readOnly: true,
			},
			
			_warningMessage:{
				type: String,
				computed: '_computeWarningMessage(_rowLimit)'
			},
	
			_dateRangeStart: {
				type: Number,
				value: 0
			},
	
			_dateRangeEnd: {
				type: Number,
				value: 0
			},
	
			_occurrenceCount: {
				type: Number,
				value: 0
			},
	
			_currentOccurrence: {
				type: Number,
				value: 0
			},
			
			_treeGridLoaded: {
				type: Boolean,
				value: false
			},
			
			_treeGridLoading: {
				type: Boolean,
				value: false
			}
		},
	
		behaviors: [TriplatRequiresWebContextIdBehavior],
	
		observers: [
			'_buildLayoutRequestBody(_modelAndView, _instanceId, _data, _layout)',
			'_buildDataRequestBody(_modelAndView, _instanceId, _data, _layout)',
			'_triggerAvailabilityRequests(_layoutRequestBody, _dataRequestBody, _refresh, _treeGridLoaded)',
			'_handleLoading(_layoutLoaded, _dataLoaded, _textLoaded)',
			'_handleVisibleResourcesChange(visibleResources.*)'
		],
	
		listeners: {
			'triplat-availability-layout-change': '_layoutChanged',
			'triplat-availability-data-change': '_dataChanged'
		},
	
		attached: function(){
			var node = this;
			var container = null;
			while (node) {
				node = dom(node).parentNode;
				if (node && node.nodeType !== Node.ELEMENT_NODE) {
					node = node.host;
				}
				if (node && node.isTriplatDsContainer === true) {
					container = node;
					break;
				}
			}
	
			if (!container) {
				console.warn("No view container found.");
				console.warn(this);
				return;
			}
			this._set_modelAndView(container.modelAndView);
			this._set_instanceId(container.instanceId);
		},
	
		_loadTreeGridLib: function() {
			if (window.Grids === undefined && !this._treeGridLoaded && !this._treeGridLoading) {
				this._treeGridLoading = true;
				var treegridLib = document.createElement('script');
				treegridLib.addEventListener("load", this._handleTreeGridLibLoaded.bind(this))
				treegridLib.setAttribute('src', this.$.treeGridUrl.bindUrl);
				document.body.appendChild(treegridLib);
			}
		},
	
		_handleTreeGridLibLoaded: function() {
			this._treeGridLoading = false;
			this._treeGridLoaded = true;
		},
	
		/**
		 * Refreshes the component.
		 */
		refresh: function() {
			this._loadTreeGridLib();
			this._dateRangeStart = 0;
			this._dateRangeEnd = 0;
			this._occurrenceCount = 0;
			this._currentOccurrence = 0;
			this._set_refresh(true);
		},
	
		/**
		 * Scrolls to the initial date range.
		 */
		scrollToHome: function() {
			this._scrollToOccurrence(0);
		},
	
		/**
		 * Scrolls to the current occurrence of 
		 * a recurring meeting.
		 */
		scrollToCurrentOccurrence: function() {
			this._scrollToOccurrence(this._currentOccurrence);
		},
	
		/**
		 * Scrolls to the next occurrence of 
		 * a recurring meeting.
		 */
		nextOccurrence: function() {
			if (this._currentOccurrence < (this._occurrenceCount - 1)) {
				this._scrollToOccurrence(this._currentOccurrence + 1);
			}
		},
	
		/**
		 * Scrolls to the previous occurrence of 
		 * a recurring meeting.
		 */
		previousOccurrence: function() {
			if (this._currentOccurrence  > 0) {
				this._scrollToOccurrence(this._currentOccurrence - 1);
			}
		},
	
		_scrollToOccurrence: function(occurrence) {
			var grid = this._getDefaultGrid();
			var index = occurrence * 3;
			var line = grid.GetGanttLine(index);
			if (line != null && line[0] > 0) {
				this._currentOccurrence = occurrence;
				this._recalculateRecurrenceButtons();
				if (line[0] < this._dateRangeStart || line[1] > this._dateRangeEnd) {
					this.async(this._getDataForOccurrence.bind(this, line[0], line[1]));
				} else {
					grid.ScrollToDate(line[0]);
				}
			}
		},
	
		/**
		 * Whether there is a next occurrence for a 
		 * recurring meeting.
		 * @return {Boolean}
		 */
		hasNextOccurrence: function() {
			return this._currentOccurrence < (this._occurrenceCount - 1);
		},
	
		/**
		 * Whether there is a previous occurrence for a 
		 * recurring meeting.
		 * @return {Boolean}
		 */
		hasPreviousOccurrence: function() {
			return this._currentOccurrence > 0;
		},
	
		_layoutChanged: function(e){
			e.stopPropagation();
			this._set_layout(e.detail);
		},
	
		_dataChanged: function(e){
			e.stopPropagation();
			this._set_data(e.detail);
		},
	
		_buildLayoutRequestBody: function(modelAndView, instanceId, data, layout){
			if (!assertParametersAreDefined(arguments)) {
				return;
			}
	
			var requestBody = {
				layout: layout,
				modelAndView: modelAndView,
				instanceId: instanceId,
				data: data
			};
	
			this._set_layoutRequestBody(requestBody);
		},
	
		_buildDataRequestBody: function(modelAndView, instanceId, data, layout){
			if (!assertParametersAreDefined(arguments)) {
				return;
			}
	
			var requestBody = {
				modelAndView: modelAndView,
				instanceId: instanceId,
				data: data,
				columns: layout.columns,
				singleSelect: layout.singleSelect,
				defaultViewMode: layout.defaultViewMode
			};
	
			this._set_dataRequestBody(requestBody);
		},
	
		_triggerAvailabilityRequests: function(layoutRequestBody, dataRequestBody, refresh, treeGridLoaded){
			if (!assertParametersAreDefined(arguments)) {
				return;
			}
	
			if(refresh) {
				this._setLoading(true);
				
				if (!treeGridLoaded) {
					return;
				}
				
				this._createLayoutRequest(layoutRequestBody).then(
					function(response){
						this._set_layoutXml(response);
						this._set_layoutLoaded(true);
					}.bind(this) 
				);
	
				this._createDataRequest(dataRequestBody).then(
					function(response){
						this._set_dataXml(response);
						this._set_dataLoaded(true);
					}.bind(this)
				);
	
				this._createTextRequest().then(
					function(response){
						this._set_textXml(response);
						this._set_textLoaded(true);
					}.bind(this)
				);
	
				this._set_refresh(false);
			}
		},
	
		_getDataForOccurrence: function(occurrenceStart, occurrenceEnd) {
			var dataRequestBody = Object.assign({}, this._dataRequestBody);
			dataRequestBody.occurrenceStart = occurrenceStart;
			dataRequestBody.occurrenceEnd = occurrenceEnd;
			var layoutRequestBody = Object.assign({}, this._layoutRequestBody);
			layoutRequestBody.occurrenceStart = occurrenceStart;
			layoutRequestBody.occurrenceEnd = occurrenceEnd;
			this._triggerAvailabilityRequests(layoutRequestBody, dataRequestBody, true, this._treeGridLoaded);
		},
	
		_createLayoutRequest: function(requestBody){
			return new Promise(function(resolve, reject) {
				this._doLayoutRequest(requestBody, resolve, reject);
			}.bind(this));
		},
	
		_createDataRequest: function(requestBody){
			return new Promise(function(resolve, reject) {
				this._doDataRequest(requestBody, resolve, reject);
			}.bind(this));
		},
	
		_createTextRequest: function(){
			return new Promise(function(resolve, reject) {
				this._doTextRequest(resolve, reject);
			}.bind(this));
		},
	
		_doLayoutRequest: function(requestBody, resolve, reject){
			var layoutAjax = this._layoutAjax;
			if (!layoutAjax) {
				layoutAjax = document.createElement("iron-ajax");
				layoutAjax.url = this._layoutUrl;
				layoutAjax.addEventListener("response", 
					this._handleLayoutResponse.bind(this));
				layoutAjax.addEventListener("error", 
					this._onError.bind(this, "_onLayoutRequestError"));
				layoutAjax.method = "POST";
				layoutAjax.contentType = 'application/json';
				layoutAjax.handleAs = 'text';
				this._set_layoutAjax(layoutAjax);
			}
	
			layoutAjax.body = JSON.stringify(requestBody);
			var request = layoutAjax.generateRequest();
			request._promiseResolve = resolve;
			request._promiseReject = reject;
		},
	
		_handleLayoutResponse: function(e) {
			var response = e.detail.response;
			e.detail._promiseResolve(response);
		},
	
		_doDataRequest: function(requestBody, resolve, reject){
			var dataAjax = this._dataAjax;
			if (!dataAjax) {
				dataAjax = document.createElement("iron-ajax");
				dataAjax.url = this._dataUrl;
				dataAjax.addEventListener("response", 
					this._handleDataResponse.bind(this));
				dataAjax.addEventListener("error", 
					this._onError.bind(this, "_onDataRequestError"));
				dataAjax.method = "POST";
				dataAjax.contentType = 'application/json';
				dataAjax.handleAs = 'text';
				this._set_dataAjax(dataAjax);
			}
	
			var headers = { "triWebContextId": this.webContextId };
			dataAjax.headers = headers;
			dataAjax.body = JSON.stringify(requestBody);
			var request = dataAjax.generateRequest();
			request._promiseResolve = resolve;
			request._promiseReject = reject;
		},
	
		_handleDataResponse: function(e) {
			var response = e.detail.response;
			var xhr = e.detail.xhr;
			var rowLimit = xhr.getResponseHeader("Tri-Availability-Row-Limit");
			if(rowLimit){
				this._rowLimit = rowLimit;
				this.async(function(){
					this.fire("row-limit", this._warningMessage);
				});
			}
			this._dateRangeStart = Number(xhr.getResponseHeader("Tri-Availability-Date-Range-Start"));
			this._dateRangeEnd = Number(xhr.getResponseHeader("Tri-Availability-Date-Range-End"));
			e.detail._promiseResolve(response);
		},
	
		_doTextRequest: function(resolve, reject){
			var textAjax = this._textAjax;
			if (!textAjax) {
				textAjax = document.createElement("iron-ajax");
				textAjax.url = this._textUrl;
				textAjax.addEventListener("response", 
					this._handleTextResponse.bind(this));
				textAjax.addEventListener("error", 
					this._onError.bind(this, "_onTextRequestError"));
				textAjax.method = "GET";
				textAjax.handleAs = 'text';
				this._set_textAjax(textAjax);
			}
			var request = textAjax.generateRequest();
			request._promiseResolve = resolve;
			request._promiseReject = reject;
		},
	
		_handleTextResponse: function(e) {
			var response = e.detail.response;
			e.detail._promiseResolve(response);
		},
	
		_onError: function(functionName, e) {
			console.log("fName: "+functionName+"  e: "+e);
		},
	
		_handleLoading: function(layoutLoaded, dataLoaded, textLoaded){
			if (!assertParametersAreDefined(arguments)) {
				return;
			}
	
			this.async(function(){
				if(layoutLoaded && dataLoaded && textLoaded){
					this._set_layoutLoaded(false);
					this._set_dataLoaded(false);
					this._set_textLoaded(false);
					this._buildTreeGrid(this._layoutXml, this._dataXml, this._textXml);
				}
			}, 1000)
		},
	
		_buildTreeGrid: function(layoutXml, dataXml, textXml){
			var grid = this._getDefaultGrid();
			if(grid){
				grid.Source.Layout.Data = layoutXml;
				grid.Source.Data.Data = dataXml;
				if(textXml.length > 0){
					grid.Source.Text.Data = textXml;
				}
				grid.Reload();
			} else {
				this.async(function(){
					Grids.triplatElement = this;
					
					var treeGridProps = {};
					treeGridProps.Layout = { Data: layoutXml };
					treeGridProps.Data = { Data: dataXml };
					if(textXml.length > 0){
						treeGridProps.Text = { Data: textXml };
					}
					treeGridProps.Debug = "";
					let treeGridContainer = this.shadowRoot.querySelector("#treeGridContainer");
					TreeGrid(treeGridProps, treeGridContainer);
	
					Grids.OnLoadCfg = function(grid, cfg) {
						return true;
					}
	
					Grids.OnLinkClick = function(grid, row, col, url, target) {
						if(row && row.id){
							this.fire("resource-click", {resourceId: row.id});
						}
						return true;
					}.bind(this);
	
					Grids.OnRenderStart = function(grid) {
						//This will hide the "EJS TreeGrid 12.0" link...
						grid.Toolbar.EmptyVisible = 0;
						this.set("selected", []);
					}.bind(this);
	
					Grids.OnRenderFinish = this._handleGridRenderFinish.bind(this);
	
					/* When clicking/dragging on Gantt headers, we don't
					 * want to do anything. Returning true will tell
					 * tree grid to do nothing .
					 */
					var doNothing = function(){
						return true;
					}
					Grids.OnClickGanttHeader = doNothing;
					Grids.OnRightClickGanttHeader = doNothing;
					Grids.OnDragGanttHeader = doNothing;
					Grids.OnDrag2GanttHeader = doNothing;
	
					Grids.OnValueChanged = function(grid, row, col, val, oldval, errors) {
						if (row && row.id && row.id > 0 && col == 'SELECT') {
							var selection = (val == 1 ? true : false);
							var resourceId = row.id;
						}
						return val;
					}
	
					Grids.OnSelect = function(grid, row, deselect, cols) {
						if(row && row.id){
							//TODO: Multi Select - BUG
							if(!deselect){
								this.push("selected", row.id);
							} else {
								this.shift("selected");
							}
						}
					}.bind(this);
				}, 1000);
			}
		},
	
		_handleGridRenderFinish: function(grid) {
			this._filterVisibleResources(grid);
			this._setLoading(false);
			this._computeOccurenceCount();
			this.async(this.scrollToCurrentOccurrence, 300);
		},
	
		_filterVisibleResources: function(grid) {
			if (grid != null) {
				if (this.visibleResources != null) {
					for (var rowId in grid.Rows) {
						var row = grid.Rows[rowId];
						if (row.Kind == "Data") {
							grid.HideRow(row);
						}
					}
					for (var index = 0; index < this.visibleResources.length; index++) {
						var available = this.visibleResources[index];
						var row = grid.Rows[available._id];
						if (row != null) {
							grid.ShowRow(row);
						}
					}
				} else {
					for (var rowId in grid.Rows) {
						var row = grid.Rows[rowId];
						if (row.Kind == "Data") {
							grid.ShowRow(row);
						}
					}
				}
			}
		},
	
		_handleVisibleResourcesChange: function(visibleResources) {
			var grid = this._getDefaultGrid();
			if (grid == null) {
				return;
			}
			if (visibleResources.path == "visibleResources") {
				this._filterVisibleResources(grid);
			} else if (visibleResources.path == "visibleResources.splices") {
				var indexSplice = visibleResources.value.indexSplices[0];
				indexSplice.removed.forEach(
					function(removed) {
						var row = this._grid.Rows[removed._id];
						if (row != null) {
							this._grid.HideRow(row);
						}
					}, 
					this
				);
				for (var i = 0; i < indexSplice.addedCount; i++) {
					var added = indexSplice.object[indexSplice.index + i];
					var row = this._grid.Rows[added._id];
					if (row != null) {
						this._grid.ShowRow(row);
					}
				}
			}
		},
	
		_getDefaultGrid: function() {
			return window.Grids != null ? window.Grids["IbmTririgaAvailability"] : null;
		},
	
		_computeWarningMessage: function(rowLimit){
			var __dictionary__warningMsg = "The number of rows to be shown in availability exceeds the maximum allowable of ${rowLimit}. Additional rows will not be rendered.";
			var _temp = __dictionary__warningMsg.replace("${rowLimit}", rowLimit);
			__dictionary__warningMsg = _temp;
			return __dictionary__warningMsg;
		},
	
		_computeOccurenceCount: function() {
			var grid = this._getDefaultGrid();
			var index = 0;
			var occurrenceCount = 0;
			var line = grid.GetGanttLine(index);
			while (line != null &&  line[0] > 0) {
				++occurrenceCount;
				index = index + 3;
				line = grid.GetGanttLine(index);
			}
			this._occurrenceCount = occurrenceCount;
		},
	
		_recalculateRecurrenceButtons: function() {
			if (this._occurrenceCount > 1) {
				var grid = this._getDefaultGrid();
				grid.Recalculate(grid.Toolbar, 'Next');
				grid.Recalculate(grid.Toolbar, 'Previous');
				grid.RefreshRow(grid.Toolbar);
			}
		}
	});
