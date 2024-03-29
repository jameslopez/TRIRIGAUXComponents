/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import { TriplatQuery } from "../triplat-query/triplat-query.js";
import { TriplatDsChangeBehavior } from "../triplat-ds-change-behavior/triplat-ds-change-behavior.js";
import "./triplat-ds-context.js";
import "./triplat-ds-instance.js";
import "../@polymer/paper-dialog/paper-dialog.js";
import "../@polymer/paper-button/paper-button.js";
import "../tricore-error/tricore-error.js";
import "../tricore-context-path/tricore-context-path.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
export const TriPlatDs = {};
TriPlatDs.RefreshType = function() {};
TriPlatDs.RefreshType.NONE = new TriPlatDs.RefreshType();
TriPlatDs.RefreshType.SERVER = new TriPlatDs.RefreshType();
TriPlatDs.RefreshType.CLIENT = new TriPlatDs.RefreshType();
TriPlatDs.RefreshType.BOTH = new TriPlatDs.RefreshType();

/*
triplat-ds is a component that is used to access data source on the TRIRIGA server.

### Declaring Examples

The below examples will use this data source structure:

	 - people (multiple records)
		  - spacesForPerson (multiple records)
			   - assetsForSpace (multiple records)
	 - assetsForPerson (multiple records)

Example of accessing a top level data source. This will retrieve the data in the people data source.

	 <triplat-ds id="peopleDs" name="people" data="{{people}}"></triplat-ds>

Example of accessing a child data source. This will retrieve all the spaces for a single person.

	 <triplat-ds name="spacesForPerson" data="{{spacesForPerson}}">
		  <triplat-ds-context name="people" 
					context-id="{{person._id}}"></triplat-ds-context>
	 </triplat-ds>

Example of accessing a deeper child data source. This will retrieve all the assets for a space.

	 <triplat-ds name="assetsForSpace" data="{{assetsForSpace}}">
		  <triplat-ds-context name="people" 
					context-id="{{person._id}}"></triplat-ds-context>
		  <triplat-ds-context name="spacesForPerson" 
					context-id="{{space._id}}"></triplat-ds-context>
	 </triplat-ds>

Example of accessing a single record of a multiple record data source. This will retrieve only 
one space record with the ID specified in the triplat-ds-instance tag.

	 <triplat-ds name="spacesForPerson" data="{{spacesForPerson}}">
		  <triplat-ds-context name="people" 
					context-id="{{person._id}}"></triplat-ds-context>
		  <triplat-ds-instance instance-id="{{space._id}}"></triplat-ds-instance>
	 </triplat-ds>

Example of accessing a top level data source with a different context. This will retrieve all assets 
for a single person. This data source would probably be a query data source that has a $$RECORDID$$ filter 
using a supplied person ID.

	 <triplat-ds name="assetForPerson" data="{{assetForPerson}}" ignore-app-context>
		  <triplat-ds-context context-id="{{person._id}}"></triplat-ds-context>
	 </triplat-ds>

Example of accessing a child data source for several context IDs. This will retrieve all of the spaces for the selected people. Both BUSINESS_OBJECT and QUERY data source types support 
multiple context IDs. For BUSINESS_OBJECT type the data source will include related association. If QUERY type is used, the  data source query would probably have a $$RECORDID$$ filter using a supplied person ID.
When providing several context IDs for the parent data source, a single request is sent to the server. The server executes the request against
each of the context IDs and returns the appended results. Be advised that the number of context IDs should be limited because the server executes the 
query for each context ID. Also, data source pagination should not be used with multiple context IDs.

	 <triplat-ds name="spacesForPeople" data="{{spacesForPeople}}">
		  <triplat-ds-context name="people" 
					context-id="{{selectedPeople}}"></triplat-ds-context>
	 </triplat-ds>


### Update Examples

Example of creating a record in a data source. This will create a single person record for the people data 
source. It will also fire the "create" action. This will also append the new record to the end of the data 
source because we specified CLIENT refresh type.

	 // create a single person
	 var newPerson = {firstName: "Pete", lastName: "Carroll"};
	 this.$.peopleDs.createRecord(newPerson, TriPlatDs.RefreshType.CLIENT, 
		 "actions", "create");

Example of creating multiple people.

	 // create multiple people records
	 var newPeople = [
		 {firstName: "Pete", lastName: "Carroll"}, 
		 {firstName: "Marshawn", lastName: "Lynch"}
	 ];
	 this.$.peopleDs.createRecord(newPeople, TriPlatDs.RefreshType.CLIENT, 
		 "actions", "create");

Example of deleting a record in a data source. This will delete that record from the data source and trigger the 
action BEFORE the delete is done. You can also pass in an array of ID's to delete multiple records.

	 // find the person to delete
	 var personToDelete = this._findPersonToDelete() // this is just an example
	 this.$.peopleDs.deleteRecord(personToDelete._id, TriPlatDs.RefreshType.CLIENT, 
		 "actions", "delete");

Example of updating an existing record in the data source. This finds a record in the data source, makes a change 
to it, then sends the updated data to the server. We can also pass an array of instance ID's to update multiple 
records.

	 // get a handle to a record that you want to update
	 var personToUpdate = this._findPersonToUpdate();

	 // make a change to the person record
	 personToUpdate.firstName = "changed name";

	 // now that the change was made to the record in the data source
	 // we just need to tell the data source which record to send to 
	 // the server.
	 this.$.peopleDs.updateRecord(personToUpdate._id, TriPlatDs.RefreshType.CLIENT, 
		 "actions", "update");

Example of performing an action on an existing record in the data source. This finds a person in the data source, 
then sends the data to the server to perform the action. Optionally, we can pass workflow parameters for the key and value to the workflow that is been executed.
The key is the same parameter name as is defined in the workflow itself. The value can be a single instance ID, an array of instance IDs, 
an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.

	 // get a handle to a person record you want to move
	 var personToUpdate = this._findPersonToUpdate();

	 // Example of defining workflow parameters instance IDs values
	 // space (a single instance ID)
	 var spaceForPerson = 15843402; 
	 // assets (an array of instance IDs)
	 var assetsForSpace = [15855623, 15860809, 15820111, 15860895]; 
	 // department (a single object with '_id' property)
	 var department = {_id:15820333, name:"Accounting", 
					   description:"Accounting department"}; 
	 // contracts (an array of objects with '_id' properties)
	 var contracts = [{_id:15820111}, {_id:15860895}]; 

	 // create a workflow parameters map for the key and value
	 var wfParams = {};
	 wfParams.space = spaceForPerson;
	 wfParams.assets = assetsForSpace;
	 wfParams.department = department;
	 wfParams.contracts = contracts;

	 // we just need to tell the data source which record to send to 
	 // the server and optionally pass the workflow parameters.
	 this.$.peopleDs.performAction(personToUpdate._id, TriPlatDs.RefreshType.BOTH, 
		 "actions", "move", wfParams);

Example of adding an existing record to a data source. This can also be thought of as "associating" records. We can 
also pass an array of records to be added here.  You can specify an action here also, but this is an example of how actions
are optional.

	 // get the person to add to the data source
	 var personToAdd = this._findPersonToAdd();
	 this.$.peopleDs.addRecord(personToAdd, TriPlatDs.RefreshType.CLIENT);

Example of removing an existing record from a data source. This can also be thought of as "de-associating" records. We can 
also pass an array of records to be removed here.  You can specify an action here also, but this is an example of how actions
are optional.

	 // get the person to add to the data source
	 var personToRemove = this._findPersonToRemove();
	 this.$.peopleDs.removeRecord(personToRemove, TriPlatDs.RefreshType.CLIENT);

### Reusing Components

You can declare the same data source in multiple areas of your application. If the data source is accessing the same information,
it will be shared across all instances.

Take this example:

	 <triplat-ds id="peopleDs1" name="people" data="{{people}}"></triplat-ds>
	 <triplat-ds id="peopleDs2" name="people" data="{{people}}"></triplat-ds>

Even though we are declaring two data sources for the same info, only one request will be made to the server. Also any changes to
one of the data sources will automatically be reflected in the other.

### Refreshing

All methods take a refresh type argument that allows you to control how the data source is updated because of the action.

RefreshType | Description
------------|------------
TriPlatDs.RefreshType.NONE | No refresh will be done.
TriPlatDs.RefreshType.SERVER | The server will return the FULL data source on completion of the action.
TriPlatDs.RefreshType.CLIENT | The client will attempt to update the model value with what was supplied in the method call.
TriPlatDs.RefreshType.BOTH | Both server and client strategies will be applied.

### Retrieving the total number of results without the data

You can retrieve the total number of results of a multiple records query data source without retrieving the data. To do that, declare the data source with <b>count-only</b>. The server will return the query total size without the data.
When you need the data, change the data source <b>countOnly</b> property to false and the data will be loaded.
This is useful when several data sources are loaded at once but only the total number of results of a data source is needed at that point.
  
Example:

	<triplat-ds id="employeesDS" name="employees" data="{{employeesData}}" 
	  count-only query-total-size="{{employeesTotalSize}}">
	</triplat-ds>
	
	...

	getEmployeesData: function(){
		this.$.employeesDS.countOnly = false; 
	},

### Retrieving metadata of fields in Datasource

You can retrieve metadata of the fields in Datasource. Only default value and size defined in Data Modeler is accessible at this point, and supports both primary and non primary data sources.  
Other metadata will be added in future.

Example:

	<triplat-ds metadata="{{myCustomDsFields}}" include-metadata id="peopleDs1" name="people" data="{{people}}"></triplat-ds>
  
If triNameTX is the Field Name of one of the fields in datasource, it's default value (if defined in Data Modeler) can be accessed in html context:

	<paper-input label="Size" value="{{myCustomDsFields.fieldMetaData.triFirstNameTX.size}}"></paper-input>
	<paper-input label="Default Value" value="{{myCustomDsFields.fieldMetaData.triFirstNameTX.defaultValue}}"></paper-input>
   
or in Javascript context as:

	validateField: function(){
	  alert("Input value of size" + this.myCustomDsFields.fieldMetaData.triFirstNameTX.size + " is not allowed"); 
	},

Note: Only Text, List, Number, Date and Datetime fields are supported at this time. Support for other field types will be added later.     
	

### Paging, Filtering and Sorting

See triplat-query documentation for detail.

### Best Practices
<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
  <b>Note:</b> You may want to refer to the `triplat-query` documentation page if you're not sure how to differentiate client-side and server-side filtering. The following best practices assume that you have some prior knowledge of data sources, queries, filters, and pagination.
  </div>
</div>
#### 1. Think about the way you want to manage data.
Handling large data sets (100k+) will become slow because of the resources loaded onto the network. If that is the case, you should try 
rethinking your design to make sure you really need that much data loaded at once and <b>you are willing to accept a slower performance</b>.

<b>Server-side filters</b> can help you.
If your data is big enough, you should consider using <b>server-side</b> filters and <b>paginate</b> the data.
Use filters to fine-tune the data set, which reduces the number of records handled by the query and processed, and only get the data that is necessary for your application. This improves the execution time on the server.

Use <b>pagination</b> to only retrieve a subset of the filtered data (not all at once). This is useful when displaying data in the page, rendering a small set of records at a time and displaying more records when needed.
There are two ways to paginate data: traditional pagination (triplat-query-page) and scrolling pagination (triplat-query-scroll-page).
See examples of a server query with traditional pagination and a server query with scrolling pagination in the triplat-query documentation.

#### 2. Loading data.
By default, the data source retrieves the data when the page is loaded. You can avoid initial loading by setting the data source to <b>disable</b>. 
When you need the data, change the data source <b>disable</b> property to false and the data will be loaded. This is useful when several pages are loaded at once but not all of the data sources are needed at that point.

Example:
	
	<triplat-ds id="spaceDs" name="space" data="{{space}}" disable>
	</triplat-ds>
	
	...

	loadSpaceDS: function() {
		this.$.spaceDs.disable = false;
	}

#### 3. Data sources and defined fields. 
The data source should only define fields that are necessary for the application. 
While the number of fields and field types should not impact the performance with a small data set, it can decrease performance with a large data set. 
Retrieving large data sets (100k+) with tens of fields for each record will slow performance.

#### 4. Defining data source reports   . 
Be careful when you define a report for your data source query and tune it up for best performance. Add filters when possible. Be aware of joined tables.

*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<tricore-context-path get-path="{{_contextPath}}"></tricore-context-path>
		<slot></slot>
		<paper-dialog id="triPlatDsErrorDialog">
			<tricore-error id="triPlatDsErrorMsg" elevation="0"></tricore-error>
			<div class="buttons">
				<paper-button id="triPlatDsCloseButton" dialog-dismiss="">Close</paper-button>
			</div>
		</paper-dialog>
	`,

    is: "triplat-ds",

    /**
	 * Fired after a get or refresh is complete.
	 *
	 * @event ds-get-complete
	 */

	/**
	 * Fired if a get or refresh results in an error.
	 *
	 * @event ds-get-error
	 */

	/**
	 * Fired after a create is complete.
	 * If wfParameters parameter is not provided in the createRecord(), then the event detail only includes the created record ID(s). Otherwise, 
	 * the event detail includes the created record ID(s) and action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-create-complete
	 */

	/**
	 * Fired if a create results in an error.
	 *
	 * @event ds-create-error
	 */

	/**
	 * Fired after a delete is complete.
	 * The event detail includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-delete-complete
	 */

	/**
	 * Fired if a delete results in an error.
	 *
	 * @event ds-delete-error
	 */

	/**
	 * Fired after an update is complete.
	 * The event detail includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-update-complete
	 */

	/**
	 * Fired if an update results is an error.
	 *
	 * @event ds-update-error
	 */

	/**
	 * Fired after a perform action is complete.
	 * The event detail includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-perform-action-complete
	 */

	/**
	 * Fired if a perform action results in an error.
	 *
	 * @event ds-perform-action-error
	 */

	/**
	 * Fired after an add is complete.
	 * The event detail includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-add-complete
	 */

	/**
	 * Fired if an add results in an error.
	 *
	 * @event ds-add-error
	 */

	/**
	 * Fired after a remove is complete.
	 * The event detail includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @event ds-remove-complete
	 */

	/**
	 * Fired if a remove results in an error.
	 *
	 * @event ds-remove-error
	 */

	behaviors: [
		TriplatDsChangeBehavior
	],

    properties: {

		/**
		 * The data source name that will be retrieved.
		 */
		name: {
			type: String,
			nofity: true,
			readOnly: false
		},
		
		/**
		 * A flag to enable the data source from requesting field metadata properies set in Data Modeler.
		 */
		includeMetadata:{
			type: Boolean,
			value: false,
			notify: true
		},
		
		/*
		 * The data object to which the metadata of the fields in data source values can be bound.
		 */
		metadata:{
			type: Object,
			notify: true,
			readOnly: true
		},

		/**
		 * The data object which the query metadata will be set after calling getQueryMetadata().
		*/
		queryMetadata: {
			type: Object,
			notify: true,
			readOnly: false
		},

		/*
		 * The data object to which the data source values can be bound.
		 */
		data: {
			type: Object,
			notify: true,
			readOnly: false
		},

		/*
		 * The transition information object provides information about the available state transition actions and sub actions for the current state of the record.<br>
		 * If the data source type is BUSINESS_OBJECT for a single record, then this transition information is populated for that record.
		 * If the data source type is BUSINESS_OBJECT or QUERY for multiple records, then this transition information is populated for a given record from that data source.
		 */
		 transitionInfo: {
			type: Object,
			notify: true,
			readOnly: false
		},

		/**
		 * When using a triplat-query that does not paginate, this is 
		 * populated with the filtered and sorted values.
		 */
		filteredData: {
			type: Object,
			notify: true,
			readOnly: true
		},

		/**
		 * Used to access the currently applied query if a 
		 * triplat-query is used.
		 */
		query: {
			type: Object,
			notify: true,
			readOnly: true,
			observer: "_handleQueryChanged"
		},

		/**
		 * A flag to disable the retrieval of records.
		 */
		disable: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false,
			observer: "_onDisableChanged"
		},

		/**
		 * A flag to prevent the data source from requesting data when the context or the query changes.
		 */
		manual: {
			type: Boolean,
			value: false
		},

		/**
		 * When using a paginated query, this flag will tell you whether 
		 * the pages will append to the result or not.
		 */
		appendPage: {
			type: Boolean,
			notify: true,
			readOnly: true
		},

		/**
		 * This will give you the total number of results of a multiple records query data source.
		 */
		queryTotalSize: {
			type: Number,
			notify: true,
			readOnly: true
		},

		/**
		 * A flag that can be used to be notified when this data 
		 * source is requesting data from the server.
		 */
		loading: {
			type: Boolean,
			notify: true,
			readOnly: true,
			value: false
		},

		/**
		 * Can be used to get the context path for this data source.
		 */
		context: {
			type: String,
			notify: true,
			readOnly: true,
			observer: "_handleContextStringChanged"
		},

		/**
		 * Can be used to get the parent path for this data source 
		 * when an instance is specified.
		 */
		parentContext: {
			type: String,
			notify: true,
			readOnly: true
		},

		/**
		 * Use this flag to tell the data source you will providing 
		 * your own application instance ID instead of using the ID 
		 * configured in metadata.
		 */
		ignoreAppContext: {
			type: Boolean,
			notify: false,
			readOnly: false
		},

		/**
		 * Use this flag to indicate that you want server-side filtering
		 * even though pagination is not being used.
		 */
		forceServerFiltering: {
			type: Boolean,
			value: false
		},

		/** 
		 * This flag should only be used when the query called by the data source is of type RESERVE.
		 * Use this flag to indicate that you want both available and unavailable resources. 
		 */
		reserveIncludeUnavailable: {
			type: Boolean,
			value: false
		},

		_serverFiltering: {
			type: Boolean,
			value: false
		},

		_container: {
			type: Object,
			notify: true,
			readOnly: false
		},

		_contexts: {
			type: Array,
			notify: true,
			readOnly: true
		},

		_instanceId: {
			type: Number
		},

		_hasInstance: {
			type: Boolean
		},

		_hasQuery: {
			type: Boolean,
			notify: false,
			readOnly: true
		},

		_isQueryPaginated: {
			type: Boolean,
			notify: false,
			readOnly: true
		},

		_registered: {
			type: Boolean,
			notify: false,
			readOnly: true,
			value: false
		},
		
		_offlineMode: {
			type: String
		},

		/**
		 * Use this flag to indicate that you only want to retrieve the total number of results of a multiple records query data source without retrieving the data.
		 */
		countOnly: {
			type: Boolean,
			notify: false,
			readOnly: false,
			value: false,
			observer: "_onCountOnlyChanged"
		}
	},

    observers: [
		"_handleContextChanged(name, _contexts.*)",
		"_handleDataChange(data.*)",
		"_dsInfoChanged(queryTotalSize, data.length)"
	],

    listeners: {
		"triplat-ds-context-changed": "_handleChildDsContextChanged",
		"triplat-ds-instance-changed": "_handleChildDsInstanceChanged"
	},

    _getBoFieldsMetaData: function(){
		var self = this;
		if(this.includeMetadata===true){
			var returnValue;
			 var boFieldsAjax = this._boFieldsAjax;
				if (!boFieldsAjax) {
					boFieldsAjax = document.createElement("iron-ajax");
					boFieldsAjax.url = this._contextPath + "/p/webapi/rest/v2/meta/dsfieldmeta";
					boFieldsAjax.addEventListener("response", function(resp){
							self._setMetadata(boFieldsAjax.lastResponse);	
						});
					boFieldsAjax.addEventListener("error", function(err){
							console.log("Error occured while retrieving datasourse metadata");	
						});		
					boFieldsAjax.method = "GET";
					boFieldsAjax.contentType = "application/json";
					boFieldsAjax.generateRequest();
				} 
			
		}
	},

    attached: function() {
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
			console.warn("No triplat-ds container found.");
			console.warn(this);
			return;
		}

		this.set("_container", container);

		this.async(this._initContext);

		this.set("_serverFiltering", this.forceServerFiltering);

		var serverFilteringElement = dom(this).querySelector("triplat-query-page,triplat-query-scroll-page,triplat-query-resource-calendar, triplat-query-work-planner, triplat-query-reserve-context");
		if(serverFilteringElement) {
			this.set("_serverFiltering", true);
		}
		this._getBoFieldsMetaData();
	},

    detached: function() {
		if (this._container && this.context) {
			this._unregister(this.context);
		}

		this.set("_context", null);
	},

    /**
	 * Refreshes the data for this data source and returns a promise that can be used to be notified when the request is complete.
	 *
	 * @return {Promise} 
	 */
	refresh: function() {
		return new Promise(function(resolve, reject) {
			this._container.refresh(this, this.context, resolve, reject, this._getOfflineMode());
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onGetComplete: function(e) {
		this.fire("ds-get-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onGetError: function(e) {
		this.fire("ds-get-error", e);
	},

	/**
	 * Get the query metadata for this data source and returns a promise that can be used to be notified when the request is complete.
	 * 
	 * @return {Promise}
	 */
	getQueryMetadata: function() {
		return new Promise(function(resolve, reject) {
			this._container.getQueryMetadata(this, this.context, resolve, reject, this._getOfflineMode());
		}.bind(this));
	},
	
    // Called by triplat-ds-container-behavior
	_onGetQueryMetadataComplete: function(e) {
		this.fire("ds-get-query-metadata-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onGetQueryMetadataError: function(e) {
		this.fire("ds-get-query-metadata-error", e);
	},
	
    /**
	 * Creates a record for this data source and returns a promise that can be used to be notified when the request is complete. 
	 * If wfParameters parameter is not provided in the createRecord(), then the return promise only includes the created record ID(s). Otherwise, 
	 * the return promise includes the created record ID(s) and action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @param {Object | Array} data The data that will be created.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise}
	 */
	createRecord: function(data, refreshType, actionGroup, action, wfParameters, appContext) {
		if (this._hasInstance) {
			console.warn("createRecord is not suppored for instance triplat-ds elements.");
			return;
		}

		var wfParametersMap = this._getWFParametersMap(wfParameters);

		return new Promise(function(resolve, reject) {
			this._container.createRecord(
				this, 
				this.context, 
				data, 
				refreshType, 
				actionGroup, 
				action, 
				resolve, 
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onCreateComplete: function(detail) {
		this.fire("ds-create-complete", detail);
	},

    // Called by triplat-ds-container-behavior
	_onCreateError: function(e) {
		this.fire("ds-create-error", e);
	},

    /**
	 * Deletes a record for this data source and returns a promise that can be used to be notified when the request is complete. 
	 * The return promise includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 *
	 * @param {Number | Array} instanceId The ID(s) to be deleted.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise}
	 */
	deleteRecord: function(instanceId, refreshType, actionGroup, action, wfParameters, appContext) {
		if (this._hasInstance) {
			console.warn("deleteRecord is not suppored for instance triplat-ds elements.");
			return;
		}
		var wfParametersMap = this._getWFParametersMap(wfParameters);

		return new Promise(function(resolve, reject) {
			this._container.deleteRecord(
				this,
				this.context,
				instanceId,
				refreshType,
				actionGroup,
				action,
				resolve,
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onDeleteComplete: function(e) {
		this.fire("ds-delete-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onDeleteError: function(e) {
		this.fire("ds-delete-error", e);	
	},

    /**
	 * Updates a record for this data source and returns a promise that can be used to be notified when the request is complete. 
	 * The return promise includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 * 
	 * @param {Number | Array} instanceId (Optional) The ID(s) to be updated. Can be omitted if this is a single 
	 * record datasource.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * Defaults to TriPlat.RefreshType.NONE.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise} 
	 */
	updateRecord: function(instanceId, refreshType, actionGroup, action, wfParameters, appContext) {
		var args = this._getUpdateInstanceIdArguments(arguments);
		if (args == null) {
			console.warn("Can't perform update as no Instance ID was found or supplied.");
			return;
		}

		var wfParametersMap = this._getWFParametersMap(args.wfParameters);
		
		return new Promise(function(resolve, reject) {
			this._container.updateRecord(
				this, 
				this.context, 
				args.instanceId, 
				args.refreshType, 
				args.actionGroup, 
				args.action, 
				"_onUpdateComplete",
				"_onUpdateError",
				false, /* not ID's only */
				resolve,
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onUpdateComplete: function(e) {
		this.fire("ds-update-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onUpdateError: function(e) {
		this.fire("ds-update-error", e);
	},

    /**
	 * Performs an action on one or more records in this data source and returns a promise that can be used to be notified when the request is complete. 
	 * The return promise includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 * 
	 * @param {Number | Array} instanceId (Optional) The ID(s) to fire actions on. Can be omitted if this is a single 
	 * record datasource.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * Defaults to TriPlat.RefreshType.NONE.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise} 
	 */
	performAction: function(instanceId, refreshType, actionGroup, action, wfParameters, appContext) {
		var args = this._getUpdateInstanceIdArguments(arguments);
		if (args == null) {
			console.warn("Can't perform action as no Instance ID was found or supplied.");
			return;
		}

		var wfParametersMap = this._getWFParametersMap(args.wfParameters);
		
		return new Promise(function(resolve, reject) {
			this._container.updateRecord(
				this, 
				this.context, 
				args.instanceId, 
				args.refreshType, 
				args.actionGroup, 
				args.action, 
				"_onPerformActionComplete",
				"_onPerformActionError",
				true, /* ID's only */
				resolve,
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onPerformActionComplete: function(e) {
		this.fire("ds-perform-action-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onPerformActionError: function(e) {
		this.fire("ds-perform-action-error", e);
	},

    /**
	 * Adds a record to this data source and returns a promise that can be used to be notified when the request is complete. 
	 * The return promise includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 * 
	 * @param {Object | Array} data The records to be added to this data source.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise} 		 
	 */
	addRecord: function(data, refreshType, actionGroup, action, wfParameters, appContext) {
		if (this._hasInstance) {
			console.warn("addRecord is not suppored for instance triplat-ds elements.");
			return;
		}
		var wfParametersMap = this._getWFParametersMap(wfParameters);
		
		return new Promise(function(resolve, reject) {
			this._container.addRecord(
				this,
				this.context,
				data,
				refreshType,
				actionGroup,
				action,
				resolve,
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onAddComplete: function(e) {
		this.fire("ds-add-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onAddError: function(e) {
		this.fire("ds-add-error", e);
	},

    /**
	 * Removes a record from this data source and returns a promise that can be used to be notified when the request is complete. 
	 * The return promise includes action information such as the action group, action, and workflow parameters map.
	 * The workflow parameters map includes parameters that are sent to the server (wfParameters) and parameters that are returned by the workflow (if any exist).
	 * 
	 * @param {Object | Array} data The records to be removed from this data source.
	 * @param {TriPlatDs.RefreshType} refreshType (Optional) The refresh type used to refresh after the operation.
	 * @param {String} actionGroup (Optional) The action group name for triggering an action with this operation.
	 * @param {String} action (Optional) The action name for triggering an action with this operation.
	 * @param {Map <String, Object>} wfParameters (Optional) The workflow parameters map for the key and value.
	 * Each key-and-value pair represents a workflow parameter.
	 * The key is the workflow parameter name.
	 * The value can be a single instance ID, an array of instance IDs, an object with the '_id' property that holds the instance ID, or an array of objects that each have the '_id' property.
	 * @return {Promise} 
	 */
	removeRecord: function(data, refreshType, actionGroup, action, wfParameters, appContext) {
		if (this._hasInstance) {
			console.warn("removeRecord is not suppored for instance triplat-ds elements.");
			return;
		}
		var wfParametersMap = this._getWFParametersMap(wfParameters);
		
		return new Promise(function(resolve, reject) {
			this._container.removeRecord(
				this,
				this.context,
				data,
				refreshType,
				actionGroup,
				action,
				resolve,
				reject,
				wfParametersMap,
				this._getOfflineMode(),
				appContext);
		}.bind(this));
	},

    // Called by triplat-ds-container-behavior
	_onRemoveComplete: function(e) {
		this.fire("ds-remove-complete", e);
	},

    // Called by triplat-ds-container-behavior
	_onRemoveError: function(e) {
		this.fire("ds-remove-error", e);
	},

    _initContext: function() {
		var queryElement = dom(this).querySelector("triplat-query");
		if (queryElement) {
			this._set_hasQuery(true);
			if (queryElement.query) {
				this._setQuery(queryElement.query);
			}
			if (queryElement.appendPage) {
				this._setAppendPage(true);
			} else {
				this._setAppendPage(false);
			}
			this.listen(queryElement, "triplat-query-changed", "_handleQueryChangedEvent");
		} else {
			this._set_hasQuery(false);
		}

		var dsInstances = Array.from(dom(this).querySelectorAll("triplat-ds-instance"));
		var hasInstance;
		if (dsInstances.length == 0) {
			// means not an instance
			hasInstance = false;
		} else if (dsInstances.length == 1) {
			hasInstance = true;
			this.set("_instanceId", dsInstances[0].instanceId);
		} else {
			hasInstance = false;
			console.warn("Only one triplat-ds-instance can be defined for a triplat-ds.");
		}
		this.set("_hasInstance", hasInstance);

		var index = 0;
		var dsContexts = Array.from(dom(this).querySelectorAll("triplat-ds-context"));
		this._set_contexts(new Array(dsContexts.length));
		dsContexts.forEach(function(dsContext) {
			dsContext.set("_index", index);
			index++;
		});
	},

    _handleQueryChangedEvent: function(e) {
		this._set_isQueryPaginated(e.detail.paginated);
		this._setAppendPage(e.detail.append);
		this._setQuery(e.detail.query);
	},

    _handleQueryChanged: function(query) {
		this._doUpdateDsIfNeeded();
		this._applyQuery();
	},

    _handleChildDsContextChanged: function(e) {
		e.stopPropagation();
		var dsContext = e.target;
		
		if (dsContext.contextId) {
			//dsContext.contextId is an object and can hold a single contextId or an array of contextIds
			var contextIds = this._getContextIdsFromObject(dsContext.contextId);
			var contextId = null;
			if(contextIds != null && contextIds.length > 0){
				contextId = contextIds[0];
				if(this.context != null && this.context.indexOf(""+contextId) > -1){
					//set a different contextId from the array in order to generate a different url (context) as array values can changed
					contextId = contextIds[contextIds.length-1];
				}
			}
			this._contexts[dsContext._index] = {name: dsContext.name, contextId: contextId, contextIds: contextIds};
			this._handleContextChanged();
		} else {
			this._contexts[dsContext._index] = null;
			this._handleContextChanged();
		}
	},

    _handleChildDsInstanceChanged: function(e) {
		e.stopPropagation();

		if (!this._hasInstance) {
			return;
		}

		this.set("_instanceId", e.detail.instanceId);
		this._handleContextChanged();
	},

    _handleContextChanged: function() {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var context = "";

		if (!this.ignoreAppContext) {
			context += "/" + this._container.modelAndView + "/" + this._container.instanceId;
		}

		for (var i = 0; i < this._contexts.length; i++) {
			var contextObject = this._contexts[i];
			if (contextObject == null || contextObject.contextId==null) {
				this._setParentContext(null);
				this._setContext(null);
				this._setLoading(false);
				return;
			}
			var name = i == 0 && this.ignoreAppContext ? this._container.modelAndView : contextObject.name;
			context += "/" + name + "/" + contextObject.contextId;
		}

		context += "/" + this.name;

		if (this._hasInstance) {
			if (this._instanceId == undefined || this._instanceId == null) {
				this._setParentContext(null);
				this._setContext(null);
				this._setLoading(false);
				return;
			}
			this._setParentContext(context);
			context += "/" + this._instanceId;
		}

		this._setContext(context);
	},

    _handleContextStringChanged: function(newValue, oldValue) {
		if (oldValue) {
			this._unregister(oldValue);
		}
		if (newValue) {
			this._doUpdateDsIfNeeded();
		}
	},

    _onDisableChanged: function(disable) {
		if (disable) {
			this._unregister(this.context);
		} else {
			this._doUpdateDsIfNeeded();
		}
	},

    _onCountOnlyChanged: function(newValue, oldValue) {
		if(this._container){
			this._container.updateCountOnly(this, this.context, newValue);
			if(!this.disable && !this.manual){
				this.refresh();
			}
		}
	},

    _unregister: function(context) {
		this._setDsDataInternal(null);
		if (this._container) {
			this._container.unregisterContext(this, context);
		}
		this._set_registered(false);
	},

    _doUpdateDsIfNeeded: function() {
		if (this.context == undefined || this.context == null || this.context.length <= 0) {
			return;
		}
		if (this.disable) {
			return;
		}
		if (!this._container) {
			return;
		}
		if (this._hasQuery && this._isQueryPaginated == undefined) {
			return;
		}
		if (!this._hasQuery || (!this._serverFiltering && !this._isQueryPaginated)) {
			if (this._registered) {
				// already register... so just skip
			} else {
				this._container.registerContext(this, this.context, this.parentContext, this.manual, null, null, this._getOfflineMode(), this.countOnly);
				this._set_registered(true);
			}
			return;
		}

		if (!this.query) {
			return;
		}

		if (!this._registered) {
			this._container.registerContext(this, this.context, this.parentContext, this.manual, this.query, this.appendPage, this._getOfflineMode(), this.countOnly);
			this._set_registered(true);
		} else {
			this._container.updateQuery(this, this.context, this.query, this.manual, this._getOfflineMode());
		}
	},

    _applyQuery: function() {
		if (!this._serverFiltering && (!this._hasQuery || this._isQueryPaginated)) {
			return;
		}
		if (!this.data) {
			if (this.filteredData) {
				this._setFilteredData(null);
			}
			return;
		}
		if (!this.query) {
			return;
		}

		this._setFilteredData(this.query.applyQuery(this.data));
	},

    // Called by triplat-ds-container-behavior
	_setDsData: function(data) {
		this._setDsDataInternal(data);
	},

    _setDsTransitionInfo: function(transitionInfo) {
		this.set("transitionInfo", transitionInfo);
	},

    _setDsDataInternal: function(data) {
		this._internalSetData = true;
		this.set("data", data);
		this._internalSetData = false;
	},

	_setDsQueryMetadata: function(data) {
		this.set("queryMetadata", data);
	},

    _notifyDsDataAppended: function(records) {
		var data = this.get("data");            
		if (records.length > 0) {
			this.notifySplices(
				"data", 
				[{
					index: data.length - records.length, 
					removed: [], 
					addedCount: records.length, 
					object: data, 
					type: 'splice'
				}]
			);
		}            
	},

    _handleDataChange: function(change) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._applyQuery();

		if (change.path === "data") {
			// do nothing
			if (!this._internalSetData) {
				this._container.dsChanged(this, this.context, this.data);
			}
		} else if (change.path === "data.splices") {
			this._container.dataChanged(this, this.context, change);	
		} else {
			this._container.dataChanged(this, this.context, change);
		}
	},

    _notifyDsDataChange: function(change) {
		if (change.path === "data") {
			// do nothing
		} else if (change.path === "data.splices") {
			this.notifyPath(change.path, this.get(change.path));
		} else {
			this.notifyPath(change.path, this.get(change.path));
		}
	},

    _canFindInstanceIdForUpdate: function() {
		if (!this.data) {
			return false;
		}
		if (Array.isArray(this.data)) {
			return false;
		}
		return this._isNumber(this.data._id);
	},

    _isNumber: function(value) {
		var numberValue = parseInt(value);
		return !isNaN(numberValue);
	},

    _isNumberOrArray: function(value) {
		if (Array.isArray(value)) {
			return true;
		}
		if (this._isNumber(value)) {
			return true;
		}
		return false
	},

    _getUpdateInstanceIdArguments: function(args) {
		var instanceId = this._getInstanceIdFromArgs(args);
		if (instanceId == null) {
			return null;
		}

		var returnArgs = {
			instanceId: instanceId
		};
		returnArgs.refreshType = this._getRefreshTypeFromArgs(args);

		var actionArgs = this._getActionArgsFromArgs(args);
		if (actionArgs.length >= 2) {
			returnArgs.actionGroup = actionArgs[0];
			returnArgs.action = actionArgs[1];
			returnArgs.wfParameters = actionArgs[2];
		}

		return returnArgs;
	},

    _getInstanceIdFromArgs: function(args) {
		if (args.length > 0 && this._isNumberOrArray(args[0])) {
			return args[0];
		}

		if (!this._canFindInstanceIdForUpdate()) {
			return null;
		}

		return this.data._id;
	},

    _getRefreshTypeFromArgs: function(args) {
		var refreshType = null;
		for (var i = 0; i < args.length; i++) {
			if (i > 1) {
				break;
			}
			if (args[i] instanceof TriPlatDs.RefreshType) {
				refreshType = args[i];
				break;
			}
		}
		return refreshType == null ? TriPlatDs.RefreshType.NONE : refreshType;
	},

    _getActionArgsFromArgs: function(args) {
		//The first two strings variables that can not be numeric are the actionGroup and action variables.
		//The next variable after the action variable is the wfParameters. wfParameters variable is optional and can be string, numeric, array or object.
		var actionArgs = [];
		for (var i = 0; i < args.length; i++) {
			if (actionArgs.length==2){
				//wfParameters variable
				actionArgs.push(args[i]);
				break;
			}
			if (typeof args[i] !== "string") {
				continue;
			}
			if (this._isNumberOrArray(args[i])) {
				continue;
			}
			actionArgs.push(args[i]);
		}
		return actionArgs;
	},

    _getWFParametersMap: function(wfParameters) {
		if(wfParameters==undefined || wfParameters==null) {
			return null;
		}
		
		var keys = Object.keys(wfParameters);
		if(keys.length == 0) {
			return null;
		}

		var wfParametersMap = {};

		for(var indexKey in keys){
			var paramName = keys[indexKey];
			var paramObject = wfParameters[paramName];
			if(paramObject==null) {
				continue;
			} else if (Array.isArray(paramObject)) {
				var numberValues = [];
				for(var indexValue in paramObject) {
					var value = paramObject[indexValue];
					if (value == null) {
						continue;
					} else if(typeof value === 'object' && value._id != null) {
						var numberValue = parseInt(value._id);
						numberValues.push(numberValue);
					} else if (this._isNumber(value)) {
						var numberValue = parseInt(value);
						numberValues.push(numberValue);
					} else {
						console.warn("Skip non integer workflow parameter value: "+value);
					}
				}
				if(numberValues.length > 0) {
					wfParametersMap[paramName] = numberValues;
				}
			} else if (typeof paramObject === 'object' && paramObject._id != null) {
				var numberValue = parseInt(paramObject._id);
				wfParametersMap[paramName] = numberValue;
			} else if (this._isNumber(paramObject)) {
				var numberValue = parseInt(paramObject);
				wfParametersMap[paramName] = numberValue;
			} else {
				console.warn("Skip mapping workflow parameter name '"+ paramName + "' as its value '" + paramObject + "' is not an instance id integer.");
			}
		}
		
		return wfParametersMap;
	},

    _dsInfoChanged: function(queryTotalSize, dataLength) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.notifyDsInfoChanged({totalSize: queryTotalSize, size: dataLength});
	},

    _getContextIdsFromObject: function(contextIdObject) {
		if(contextIdObject==undefined || contextIdObject==null) {
			return null;
		}

		var contextIds = [];
		var single = !Array.isArray(contextIdObject);

		if(single){
			if(typeof contextIdObject === 'object' && contextIdObject._id != null) {
				contextIds.push(parseInt(contextIdObject._id));
			} else if (this._isNumber(contextIdObject)) {
				contextIds.push(parseInt(contextIdObject));
			} else {
				console.warn("Non numeric context id value: "+contextId);
			}
		} else {
			for(var indexContext in contextIdObject) {
				var contextId = contextIdObject[indexContext];
				if (contextId == null) {
					continue;
				} else if(typeof contextId === 'object' && contextId._id != null) {
					contextIds.push(parseInt(contextId._id));
				} else if (this._isNumber(contextId)) {
					contextIds.push(parseInt(contextId));
				} else {
					console.warn("Skip non numeric context id value: "+contextId);
				}
			}
		}
		
		return contextIds;
	},

    //Called by triplat-ds-offline
	_getHierarchyPath: function() {
		var hierarchyPath = "";
		var dsContexts = Array.from(dom(this).querySelectorAll("triplat-ds-context"));
		for (var i = 0; i < dsContexts.length; i++) {
			var contextObject = dsContexts[i];
			hierarchyPath += "/" + contextObject.name ;
		}
		hierarchyPath += "/" + this.name;
		return hierarchyPath;
	},

    //Called by triplat-ds-offline
	_getModelAndView: function() {
		return this._container.modelAndView;
	},

    //Called by triplat-ds-offline
	_getDSContext: function(instanceId) {
		var context = "/" + this._container.modelAndView + "/" + this._container.instanceId;
		context += this._getDSPath();			
		if (instanceId != null) {
			context += "/" + instanceId;
		}
		return context;
	},

    //Called by triplat-ds-offline
	_getDSPath: function() {
		var dsPath = "";
		for (var i = 0; i < this._contexts.length; i++) {
			var contextObject = this._contexts[i];
			if (contextObject == null || contextObject.contextId == null) {
				return null;
			}
			var name = i == 0 && this.ignoreAppContext ? this._container.modelAndView : contextObject.name;
			dsPath += "/" + name + "/" + contextObject.contextId;
		}
		dsPath += "/" + this.name;
		return dsPath;
	},

    _getOfflineMode: function() {
		if (!this._offlineMode) {
			var dsOfflineElement = this.queryEffectiveChildren("triplat-ds-offline");
			if (dsOfflineElement) {
				this._offlineMode = dsOfflineElement.mode;
			}
		}
		return this._offlineMode;
	}
});