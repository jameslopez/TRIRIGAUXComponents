/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-image/iron-image.js";
import "../@polymer/paper-button/paper-button.js";
import "../triplat-ds-core/triplat-ds-core.js";

/*
This a common component queries the BIM model linked to a building.  If provides a selector indicating if a model
exists, and if a model does exist, the record required by the viewer to display the model

### Examples

Example of a simple usage:
```html
  <triplat-bim-model buildingid="{{selectedRow.buildingId}}" hasmodel="{{hasModel}}" model="{{model}}">
	 <triplat-bim-viewer  model="{{model}}" class="viewer"></triplat-bim-viewer>
```
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

		</style>

		<triplat-ds-core id="datasource" context="/triBIMViewer/-1/modelList" type="GET">
		</triplat-ds-core>
	`,

    is: "triplat-bim-model",

    /**
	 * Fires when an update to the buildingid or buildingspec property results in a change in the active model.
	 *
	 * @event on-model
	 *
	 * @param {object}  triBIMModelLink The BO that links a building a model URN and thumbnail. 
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

	properties : {
	   
		/**
		* ID of building to which the model is associated. 
		* Set only one of buildingid or buildingspec
		*/
	   buildingid:{
		   type     : String,
		   observer : "_onBuildingIdChange"
	   },
	   
		/**
		* Spec ID of building to which model is associated. 
		* Set only one of buildingid or buildingspec
		*/
	   buildingspec:{
		   type     : String,
		   observer : "_onBuildingSpecChange"
	   },
	   
	   /**
		* Flag indicating if the buildingid or buildingspec value (whichever is specified) is currently 
		* associated with a BIM model. 
		*/
	   hasmodel : {
		   type     : Boolean,
		   value    : "false",
		   notify   : true,
		   readOnly : false,
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
		   notify   : true,
		   readOnly : false,
	   },

	   /**
		* Record ID of the business process record that sets the viewer context.  For example, a
		* work task record.  This is used for associating markup with the context.  Its value is opaque
		* to the viewer.  When markup is created, it is associated with this value.  When it is 
		* displayed, only records that match this context are displayed.
		* This value is passed out in the model object.
		*/
	   recordkey : {
		   type : String,
		   notify   : true
	   },

	   /**
		* URL of the model thumbnail. 
		*/
	   thumbnailurl : {
		   type     : String,
		   notify   : true,
		   readOnly : false,
	   },
	   
	   /*
		* This is an opaque string created by viewer vendor specific tools which instructs the
		* underlying viewer to load a specific model; For the Forege viewer, this is the Forge
		* viewer service URN
		*/
	   modelurl : {
		   type     : String,
		   notify   : true,
		   readOnly : false,
	   },
   },

    // Start as true in case a building is specified before the lookup returns.
	_forgeAuth : true,

    ready : function()
	{
		// Have to start with true becasue the building may be set before the auth returns
		this.currentBuildinId = "";
		this.currentBuildinSpec = "";
		if( !this.contextroot )
		{
			var path = location.pathname;
			var idx = path.lastIndexOf( "/p/web" );
			if( idx > 0 )
			{
				this.contextroot = path.substring( 0, idx );  		    		
			}
		}
		this._getKey();
	},

    _getKey : function()
	{
		fetch( this.contextroot + "/api/p/v1/forge/auth/token",
		{ 
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'same-origin' 
		} 
		).then(
			( request  )=> { this._onAppKey( request ); },
			function( err ) { console.error( err ); } );
		},

    _onAppKey : function(
		response 
	) {
		if( response.redirected )
		{
			location.href = response.url;
			return;
		}
		if( !response.ok )
		{
			this._forgeAuth = false;
			this.set( "hasmodel", false );
			this.set( "modelurl", null  );
			return;	
		}
		response.json().then(
			( json ) => { 
				if( json.access_token )
				{
					this._forgeAuth = true;
				} 
				else
				{
					this._forgeAuth = false;
					this.set( "hasmodel", false );
					this.set( "modelurl", null  );
				}
			},
			function( err ) { console.error( err ); }
		);
	},

    _getModelLink(
		query
	) {
		this.$.datasource.query = query;
		this.$.datasource.webContextId = "dummy_value";		// Needed to avoid null reference error
		this.$.datasource.generateRequest().then(
			( link ) => { 
				if(    link
					&& link.data 
					&& link.data.length > 0 
					&& link.data[0].urn 
					&& link.data[0].urn.length > 0 )
				{
					this.currentBuildinId   = link.data[0].buildingId;  // Don't notify and cause a second query
					this.currentBuildinSpec = link.data[0]._bldgSpec;  // Don't notify and cause a second query
					this.set( "hasmodel", true );
					this.set( "modelurl", link.data[0].urn );
					this.set( "thumbnailurl", link.data[0].thumbnail );
					link.data[0].recordkey = this.recordkey;
					this.set( "model", link.data[0] );
				}
				else
				{
					this.currentBuildinId   = "";  // Don't notify and cause a second query
					this.currentBuildinSpec = "";  // Don't notify and cause a second query
					this.set( "hasmodel", false );
					this.set( "modelurl", "" );
					this.set( "thumbnailurl", "" );
					this.set( "model", {} );
				}
				this.dispatchEvent( 
						new CustomEvent('model',{ bubbles: true, composed: true, detail : this.model })
					);
			},
			( err )  => { console.error( err ); }
		);
	},

    //============================================================================
	// Observers
	//============================================================================
	_onBuildingIdChange: function(
		value
	) {
		if( !this._forgeAuth ) return;
		if( this.currentBuildinId == value ) return;

		if( !value || value == "" )
		{
			this.currentBuildinId   = "";  // Don't notify and cause a second query
			this.currentBuildinSpec = "";  // Don't notify and cause a second query
			this.set( "hasmodel", false );
			this.set( "modelurl", "" );
			this.set( "thumbnailurl", "" );
			return;
		}

		var query = {
			"page":	{"from":0,"size":50},
			"filters":[
					{
						"name"         :"buildingId",
						"operator"     :"equals",
						"value"        : value,
						"ignoreIfBlank": false,
					 }
			]
		}
		this._getModelLink( query );
	},

    _onBuildingSpecChange: function(
		value
	) {
		if( !this._forgeAuth ) return;
		if( this.currentBuildinSpec == value ) return;
		
		if( !value || value == "" )
		{
			this.set( "hasmodel", false );
			this.set( "buildingid", "" );
			this.set( "buildingspec", "" );
			this.set( "modelurl", "" );
			this.set( "thumbnailurl", "" );
			return;
		}

		var query = {
			"page":	{"from":0,"size":50},
			"filters":[
					{
						"name"         :"_bldgSpec",
						"operator"     :"equals",
						"value"        : value,
						"ignoreIfBlank": false,
					 }
			]
		}
		this._getModelLink( query );
	}
});