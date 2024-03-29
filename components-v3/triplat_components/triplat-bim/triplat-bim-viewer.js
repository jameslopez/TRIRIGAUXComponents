/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or 
otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import { IronResizableBehavior } from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js";
import "../forge-viewer/forge-viewer.js";
import "./triplat-bim-message-box.js";
var __dictionary__RESTError = "REST Error";
var __dictionary__Viewer    = "Forge Viewer";

/*
Display the Autodesk Forge viewer.
https://developer.autodesk.com/en/docs/viewer/v2/overview/
The viewer is linked to TRIRIGA data and provide bi-directional in-context navigation between model elements and TRIRIRGA records.
Typically the TRIRIGA records must have been created via the TRIRIGA Revit connector to link to a model displayed in the Forge viewer.

There is a viewer plug-in API so is is possible that this component uses addition or other viewers.

Example
	<triplat-bim-model buildingid="{{buildingId}}" hasmodel="{{hasModel}}" model="{{model}}">
	</triplat-bim-model>

	  <template is="dom-if" if="{{hasModel}}">
		<triplat-bim-viewer id="viewer" recordkey="[[recordId]]" model="{{model}}" class="viewer"></triplat-bim-viewer>
	</template>
*/
Polymer(
{
    _template: html`
		<style include="tristyles-theme">

				html, body {
					margin   : 0;
					padding  : 0;
					height   : 100%;
					width    : 100%;
					overflow : none;
				}
				.toastAnchor
				{
					position         : relative;
					padding          : 0;
					margin           : 0;
					top              : 0;
					left             : 0;
				}
				.toast
				{
					background-color : rgba(102, 140, 165,0.7 );
					border-radius    : 2px;
					color            : white;
					position         : absolute;
					padding          : 12px;
					z-index          : 1000;
					top              : 12px;
					display          : none;
				}
				.viewer {
					height  : 100%;
					width   : 100%;
				}
				
			
		</style>

		<triplat-ds-core id="datasource"> </triplat-ds-core>
		
		<div class="toastAnchor">
			<div id="selection" class="toast"></div>
		</div>
	
		<forge-viewer id="viewer" urn="[[urn]]" autozoom="[[autozoom]]" contextroot="[[contextroot]]" authurl="[[authurl]]" features="[[features]]" locale="[[locale]]" model="[[forgeModel]]" recordkey="[[recordkey]]" value="{{value}}" on-select="_onSelect" on-forge-message="_displayMessage" class"viewer"=""><forge-viewer>
	</forge-viewer></forge-viewer>
	`,

    is: 'triplat-bim-viewer',

    behaviors : [ 
		IronResizableBehavior 
	],

    listeners : { 
	   'iron-resize': '_onIronResize' 
	},

    /*
	 * Fired when an element in the viewer with a GUID matching a TRIRIGA space is selected.  Or when a space was
	 * selected and becomes unselected.
	 *
	 * @event on-space-changed
	 *
	 * @param {string} spec ID of selected space 
	 */

	/*
	 * Fired when an element in the viewer with a GUID matching a TRIRIGA asset is selected.  Or when asset was
	 * selected and becomes unselected.
	 *
	 * @event on-asset-changed
	 *
	 * @param {object} Data about the selected asset.  It contains the following fields:
	 * - GUID
	 * - assetId
	 * - assetName
	 * - buildingId
	 * - description
	 * - spaceName
	 * - _id
	*/

	/*
	 * Fired when the underlying viewer surfaces a message For the Forge viewer, this is typically a 
	 * REST communication problem with the Forge service.
	 *
	 * @event on-forge-message
	 *
	 * @param {string} Message text, typically errors, from the underlying viewer implementation.  
	 *                 This may or may not be localized or suitable for user display depending on the
	 *                 Underlying viewer implementation. 
	 */

	/*
	 * Fired when the selected element in the viewer changed
	 *
	 * @event on-select
	 *
	 * @param {string} Model GUID of the newly selected elment or null if no element is selected  
	 */

	properties : {
   /**
	* _id of the asset.  Setting selects the model eleement, selecting an asset in the viewer sets it. 
	*/
   assetid : {
	   type     : String,
	   notify   : true,
	   readOnly : false,
	   observer : "_onAssetChange",
   },

   /**
	* Overrid for the REST URL used to authenicate with the Autodesk Forge service 
	*/
   authurl : {
	   type     : String,
   },

  /**
	* Controls auto zoom on select behavior 
	*/
   autozoom : {
	   type     : Boolean,
	   value    : true,
   },

  /**
	* ID of building to load model for 
	*/
   buildingid:{
	   type     : String,
	   observer : "_onBuildingChange",
   },
   
  /**
	* _id of building to load model for
	*/
   buildingspec:{
	   type     : String,
	   observer : "_onBuildingSpecChange",
   },
   
   /**
	 * A list of features expressed as toolbar icons to enable or disable.  Supported values are:
	 * - camera      : Autodesk camera submenu
	 *                 Default = true
	 * - explode     : Autodesk explode tool.
	 *                 Default = false
	 * - fullscreen  : Autodesk viewer full screen toggle
	 *                 Default = true
	 * - markup      : Loads the markup extensions and displayes markup tools on the toolbar
	 *                 Default = false
	 * - measure     : Autodesk measure tool.
	 *                 Default = false
	 * - modelTree   : Autodesk Model Tree viewer
	 *                 Default = true
	 * - multiselect : TRIRIGA single select/multi select toggle.
	 *                 Default = false
	 * - properties  : AUtodesk pproperty viewer
	 *                 Default = true
	 * - search      : TRIRIGA search bar
	 *                 Default = true
	 * - section     : TRIRIGA selection submenu: Isolate Selectiom, Hide Selection, Auto Zoom, MUlti-select
	 *                 Default = true
	 * - selection   : TRIRIGA selection submenu
	 *                 Default = true
	 * - settings    : Autodesk viewer settings.
	 *                 Default = false
	 * - view        : Displays the save and restore view tools on the toolbar.
	 *                 Default = false
	 */
   features : {
	   type     : Object,
	   value    : { views : true }
   },

   /**
	* The triBIMModelLink BO linking building to model URN and thumbnail. 
	*	- binding:       Model specific instructions to the viewer. Used by the Forge viewer and NavisWorks models to specify the NavisWOrks attribute that has the uniqueId.
	*	- buildingId:    TRIRIGA building Id 
	*	- description
	*	- displayOrder:  When linking multiple models ro a single building is supported, it will specify sort order of the list of models
	*	- linkType:      The name of the BO linked to this record. Currently only triBuilding is supported.
	*	- objectKey:     The Forge service Object key, May be redefined by other viewers
	*	- thumbnail:     URN of model thumbnail
	*	- title:         Title to use when displaying the model definition to a user.
	*	- urn: 		     URN required to launch the BIM viewer with the model associated with the thumbnail 
	*	- viewer:        Name of the viewer to used to display the model.  Currently only Forge is supported
	*	- _bldgSpec:     TRIRIGA Spec ID (_id) of the associated building
	*	- _id:           TRIRIGA ID of this record
	*/
   model : {
	   type     : Object,
	   observer : "_onModelChange",
   },
   
   /**
	* Record ID of the business process record that sets the viewer context.  For example, a
	* work task record.  This is used for associating markup with the context.  Its value is opaque
	* to the viewer.  When markup is created, it is associated with this value.  When it is 
	* displayed, only records that match this context are displayed.
	*/
   recordkey : {
	   type     : String,
   },

   /**
	* ID of a TRIRIGA space.  Setting selects the Room or Space in the viewer and places the camera near 
	* the center of the room. Selecting a room in the viewer sets it. 
	*/
   spaceid : {
	   type     : String,
	   notify   : true,
	   readOnly : false,
	   observer : "_onSpaceChange",
   },

   /*
	* This is an opaque string created by viewer vendor specific tools which instructs the
	* underlying viewer to load a specific model; For the Forege viewer, this is the Forge
	* viewer service URN
	*/
   urn : {
	   type     : String,
   },

   /*
	* The GUID of a model element.  For the Forege viewer, this is thw Autodesk Export GUID
	*/
   value : {
	   type     : String,
	   notify   : true,
   },
},

    // Internal value that can be set without triger update logic
	_buildingId : null,

    attached: function() 
	{
		if( !this.contextroot )
		{
			this.contextroot = "";
			var path = location.pathname;
			var idx = path.lastIndexOf( "/p/web" );
			if( idx >= 0 )
			{
				this.contextroot = path.substring( 0, idx );  		    		
			}
		}
		this.locale = null;
		this.authurl = this.contextroot + "/api/p/v1/forge";
		this._getCurrentUser();
	},

    /**
	 * Selects a room in the model from a TRIRIGA space and places the camera rougly in the center of the space bounding box.
	 * For irregular spaces, the camera may not actaully be in the space.
	 *
	 * @param {string} TRIRIGA space id
	 */
	setSpace( spaceId ) 
	{
		if( spaceId == this.spaceId && this.GUID )
		{
			this.$.viewer.select( this.GUID, "center" );
			return;
		}
		this.spaceId = spaceId;
		this._onSpaceChange( spaceId );
	},

    _displayMessage : function(	event ) 
	{
		var messageBox = document.createElement( 'triplat-bim-message-box' );
		messageBox.value = event.detail;
		this.parentNode.appendChild( messageBox );
		messageBox.open();
	},

    /**
	  * Selects a model element by GUID or the configured search parameter
	  *
	  * @param {string} GUID of target model element
	  * @param {boolean} if true, the view is zoomed and centered to show the selected element
	  */
	select : function(
		value, zoomMode
	) {
		this.$.viewer.select( value, zoomMode );
	},

    _onSelect : function( event	) 
	{
		var guid = event.detail.selection;
		if( !guid || guid == "" )
		{
			this.set( "spaceid", null );
			this.set( "assetid", null );
			return;
		}
		
		var query = {
			"page":	{"from":0,"size":50},
			"filters":[
					{
						"name"         :"buildingId",
						"operator"     :"equals",
						"value"        : this._buildingId,
						"ignoreIfBlank": false,
					 },
					 {
						"operator":"and"
					 },
					 {
						"name"         : "GUID",
						"operator"     : "equals",
						"value"        : guid,
						"ignoreIfBlank": false,
					 }
			]
		}
		
		/*
		 * The viewer GUID could map to any of several TRIRIGA record types.  Try all of them to 
		 * see which matches
		 */

		this.$.datasource.context      = "/triBIMViewer/-1/lookupSpace"
		this.$.datasource.type         = "GET";
		this.$.datasource.query        = query;
		this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
		this.$.datasource.generateRequest().then(
			( result ) => { 
				this._onSpaceLookup( result );
			},
			( err )  => { console.error( err ); }
		);
		
		query = {
				"page":	{"from":0,"size":50},
				"filters":[
						 {
							"name"         : "GUID",
							"operator"     : "equals",
							"value"        : guid,
							"ignoreIfBlank": true,
						 },
						 {	"operator":"and" },
						 {operator: "open parenthesis"},
							{
								"name"         :"buildingId",
								"operator"     :"equals",
								"value"        : this._buildingId,
								"ignoreIfBlank": true,
							 },
						 {operator: "or"},
							{
								"name"         :"spaceBuildingId",
								"operator"     :"equals",
								"value"        : this._buildingId,
								"ignoreIfBlank": true,
							 },
						 {operator: "or"},
							{
								"name"         :"floorBuildingId",
								"operator"     :"equals",
								"value"        : this._buildingId,
								"ignoreIfBlank": true,
							 },
						 {operator: "close parenthesis"}
					]
				}

		
		this.$.datasource.context      = "/triBIMViewer/-1/lookupAsset"
			this.$.datasource.type         = "GET";
			this.$.datasource.query        = query;
			this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
			this.$.datasource.generateRequest().then(
				( result ) => { 
					this._onAssetookup( result );
				},
				( err )  => { console.error( err ); }
			);
	},

    _onSpaceLookup(	result ) 
	{
		if(    result 
			&& result.data
			&& result.data.length > 0 )
		{
			var space = result.data[0];
			var s = this.space;
			if( space._id != this.spaceid )
			{
				this.set( "spaceid", space._id );
				this.dispatchEvent( new CustomEvent('space-changed', { bubbles: true, composed: true, 
													 detail: space } ) );
				this._displayToast( space.spaceName, space.description );
			}
		}
	},

    _onAssetookup( result ) 
	{
		if( !result  || !result.data ) return;
		var asset;
		if( Array.isArray( result.data ) )
		{
			if( result.data.length == 0 ) return;
			data = result.data[0];
		}
		else
		{
			data = result.data;			
		}
		
		var asset = {
			 GUID        : data.GUID,
			 assetId     : data.assetId,
			 assetName   : data.assetName,
			 buildingId  : data.buildingId,
			 description : data.description,
			 spaceName   : data.spaceName,
			 _id         : data._id
		};
		
		if( data.floorBuildingId )
		{
			asset.buildingId = data.floorBuildingId;
		}
		else if( data.spaceBuildingId )
		{
			asset.buildingId = data.spaceBuildingId;
		}
		
		if( !this.assetId || asset != this.assetId )
		{
			this.set( "assetid", asset._id );
			this.dispatchEvent( new CustomEvent('asset-changed', { bubbles: true, composed: true, 
												 detail: asset } ) );
			this._displayToast( asset.assetName, asset.description );
		}
	},

    _getCurrentUser : function() 
	{
		this.$.datasource.context      = "/triBIMViewer/-1/user?query=true"
		this.$.datasource.type         = "GET";
		this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
		this.$.datasource.generateRequest().then(
			( result ) => { 
				this._onCurrentUser( result );
			},
			( err )  => { console.error( err ); }
		);
	},

    _onCurrentUser( result ) 
	{
		if( !result  || !result.data ) return;
		this.locale = result.data._Locale;
	},

    _displayToast : function( name, description ) 
	{
		var text = "";
		if( name )
		{
			text = name;
			if( description )
			{
				text += " : ";
			}								
		}                                     
		if( description )
		{
			text += description;
		}								

		if( !text || text.trim() == "" ) return;

		this.$.selection.innerHTML = text;
		this.$.selection.style.display = "block";
		var width = this.$.selection.clientWidth;
		this.$.selection.style.left = "calc( 50% - " + (width/2) + "px )";
		window.setTimeout( ()=> { this.$.selection.style.display = "none"; }, 3000 );
	},

    _resize : function( evt )
	{
		var h = document.body.clientHeight;
		var w = document.body.clientWidth;
		var offsetTop = 0;
		var offsetLeft = 0;
		var node = this.$.scrollPane;
		while( node != null )
		{ 
			if( node.offsetTop ) offsetTop += node.offsetTop;
			if( node.offsetLeft ) offsetLeft += node.offsetLeft;
			node = node.offsetParent;
		}
		h -= offsetTop;
		w -= offsetLeft

		if( h < 0 ) h = 0;
		if( w < 0 ) w = 0;
		
		this.$.viewer.style.height = "" + h + "px";
		this.$.viewer.style.width  = "" + w + "px";
	},

    //============================================================================
	// Observers
	//============================================================================
	_onBuildingChange: function( buildingid	) 
	{
		this._buildingId = buildingid;
		if( !this._buildingId || this._buildingId == "" )
		{
			this.set( "urn", null );
			return;
		}
		var query = {
			"page":	{"from":0,"size":50},
			"filters":[
					{
						"name"         :"buildingId",
						"operator"     :"equals",
						"value"        : this._buildingId,
						"ignoreIfBlank": false,
					 },
			]
			}
			this.$.datasource.context      = "/triBIMViewer/-1/modelList"
			this.$.datasource.type         = "GET";
			this.$.datasource.query        = query;
			this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
			this.$.datasource.generateRequest().then(
				( link ) => { 
					if(    link
						&& link.data 
						&& link.data.length > 0 
						&& link.data[0].urn 
						&& link.data[0].urn.length > 0 )
					{
						this.set( "urn", link.data[0].urn );
					}
					else
					{
						this.set( "urn", null );
					}
				},
				( err )  => { console.error( err ); }
			);
		},

    _onBuildingSpecChange: function( _id ) 
	{
		this._buildingspec = _id;
		if( !this._buildingspec || this._buildingspec == "" )
		{
			this.set( "urn", null );
			return;
		}
		var query = {
			"page":	{"from":0,"size":50},
			"filters":[
					{
						"name"         :"_bldgSpec",
						"operator"     :"equals",
						"value"        : this._buildingspec,
						"ignoreIfBlank": false,
					 },
			]
		}

	this.$.datasource.context      = "/triBIMViewer/-1/modelList"
	this.$.datasource.type         = "GET";
	this.$.datasource.query        = query;
	this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
	this.$.datasource.generateRequest().then(
		( link ) => { 
			if(    link
				&& link.data 
				&& link.data.length > 0 
				&& link.data[0].urn 
				&& link.data[0].urn.length > 0 )
			{
				this.set( "urn", link.data[0].urn );
			}
			else
			{
				this.set( "urn", null );
			}
		},
		( err )  => { console.error( err ); }
	);
},

    _onAssetChange(	assetId ) 
	{
		if( !assetId || assetId == ""  ) 
		{
			this.set( "value", null );
			return;
		}
		
		var _id = assetId.trim(); 

		this.$.datasource.context      = "/triBIMViewer/" + _id + "/asset";
		this.$.datasource.type         = "GET";
		this.$.datasource.query        = null;
		this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
		this.$.datasource.generateRequest().then(
			( result ) => { 
				if(    result 
					&& result.data )
				{
					this.GUID = result.data.GUID;
					this.$.viewer.select( result.data.GUID, "true" );
				}
			},
			( err )  => { console.error( err ); }
		);
	},

    _onIronResize : function( event )
	{
		setTimeout( ( event ) => { this._resize( event ) }, 100 );
	},

    _onSpaceChange(	spaceId ) 
	{
		if( !spaceId || spaceId == "" ) 
		{
			this.set( "value", null );
			return;
		}

		this.$.datasource.context      = "/triBIMViewer/" + spaceId + "/space";
		this.$.datasource.type         = "GET";
		this.$.datasource.query        = null;
		this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
		this.$.datasource.generateRequest().then(
			( result ) => { 
				if(    result 
					&& result.data )
				{
					this.GUID = result.data.GUID;
					this.$.viewer.select( result.data.GUID, "center" );
				}
			},
			( err )  => { console.error( err ); }
		);
	},

    _onModelChange(	model ) 
	{
		this._buildingId          = model.buildingId;
		
		var forgeModel = {};
		forgeModel.modelId        = model._id;
		forgeModel.location       = model.buildingId;
		forgeModel.binding        = model.binding;
		forgeModel.title          = model.objectKey;
		forgeModel.url            = model.urn;
		forgeModel.viewer         = model.viewer;
		if( model.recordkey )
		{
			forgeModel.mboKey     = model.recordkey;
		}
		else if( this.recordkey )
		{
			forgeModel.mboKey     = this.recordkey;
		}
//	        	forgeModel.selectionMode  = this.multiSelect;
		forgeModel.autozoom       = this.autozoom;
		
		this.set( "forgeModel", forgeModel );
	}
});