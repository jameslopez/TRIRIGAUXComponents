/* 
* Copyright Wipro 2017-2018
*
* Licensed under the Eclipse Public License - v 1.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* https://www.eclipse.org/legal/epl-v10.html
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
* @Author Doug Wood
 */

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { getModuleUrl } from "../tricore-util/tricore-util.js";
import { IronResizableBehavior } from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js";
var __dictionary__RESTError = "REST Error";
var __dictionary__Error     = "Error";
var __dictionary__Viewer    = "Forge Viewer";
var __dictionary__NotFound  = "Target not found";
var __dictionary__AccessDenied     = "Access Denied";
var __dictionary__AccessDenied_1   = "The operation requires {scope} access";

/*
Polymer wrapper around the BIM viewer plug-in API.  The default viewer is the Autodesk Forge viewer,
but other viewers may replace the Forge viewer. This component manages an iFrame the encapsulates the actual viewer.
The iFrame dynamically loads a JavaScript file named {viewer}ViewerWrapper.js. Where viewer is the value of the viewer 
property and should generally be the name of the viewer implementation. Forge is used for the Autodesk Forge viewer.
The ViwerWrapper.js file must expose the viewer wrapper interface defined here: 
https://github.com/IBM/MaximoForgeViewerPlugin/blob/master/Doc/Maximo%20BIM%20-%20Viewer%20Integration%20Framework.pdf   
All viewer functions are delegated to the viewer wrapper.
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
			
		</style>

	  <iframe id="viewer" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" height="[[height]]" width="[[width]]" marginwidth="0" marginheight="0" scrolling="no" on-load="_onViewerFrameLoad">
	  </iframe>
	`,

    is: 'forge-viewer',

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
	 * Fired when the selected element in the viewer changes
	 *
	 * @event on-select
	 *
	 * @param {string} Model GUID of the newly selected element or null if no element is selected.  
	 */

	behaviors : [ 
		IronResizableBehavior 
	],

    listeners : { 
	   'iron-resize': '_onIronResize' 
	},

    properties : {
	   /**
		 * Override for the REST URL used to authenticate with the Autodesk Forge service. 
		 */
		authurl : {
			type     : String,
		},
	
	   /**
		 * Controls auto zoom on select behavior. 
		 */
		autozoom : {
			type     : Boolean,
			value    : false,
			observer : '_zoomChanged'
		},

		/**
		 * Override of the context root used for the Forge service Auth REST call.
		 */
		contextroot : {
			type     : String,
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
			type     : Object
		},

	   /**
		 * Override for the URL for the src value of the viewer iFrame.  It should be the 
		 * path to ForgeViewer.html.
		 */
		frameurl : {
			type     : String,
			observer : '_frameChanged'
		},
		
		/**
		  * Viewerheight, default to 100%.
		  */
		height : {
			type     : String,
			value    : "100%",
		},

		/**
		  * One of:
		  *     Chinese Simplified: zh-cn
		  *     Chinese Traditional: zh-tw
		  *     Czech: cs
		  *     English: en
		  *     French: fr
		  *     German: de
		  *     Italian: it
		  *     Japanese: ja
		  *     Korean: ko
		  *     Polish: pl
		  *     Portuguese Brazil: pt-br
		  *     Russian: ru
		  *     Spanish: es
		  *     Turkish: tr
		  * If it is unset, the viewer attempts to determin the locale from thge browser context
		  */
		locale : {
			type     : String,
		},

	   /**
		 * For non-Revit models: The name of the model property that contains the unique ID used to bind
		 * application data to model elements. 
		 */
		mapping : {
			type     : String,
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
			type     : String,
			observer : '_modelChanged'
		},

		/**
		 * Record ID of the business process record that sets the viewer context.  For example, a
		 * work task record.  This is used for associating markup with the context.  Its value is opaque
		 * to the viewer.  When markup is created, it is associated with this value.  When it is 
		 * displayed, only records that match this context are displayed.
		 */
		recordkey : {
			type : String,
			observer : '_recordKeyChanged'
		},
		
		/*
		 * This is an opaque string created by viewer vendor specific tools which instructs the
		 * underling viewer to load a specific model; For the Forege viewer, this is the Forge
		 * viewer service URN
		 */
		urn : {
			type     : String,
			observer : '_urnChanged'
		},
		
		/*
		 * The GUID of a model element.  For the Forege viewer, this is the Autodesk Export GUID
		 */
		value : {
			type     : String,
			observer : '_valueChanged'
		},

	   /**
		 * Name of the viewer implementation to use to display a specific model 
		 * Ex: "Forge" for the Autodesk Forge viewer
		 */
		viewer : {
			type     : String,
			value    : "Forge"
		},

		/**
		  * Viewer width, default to 100%
		  */
		  width : {
			type     : String,
			value    : "100%",
		},

	},

    ready : function()
	{
		this._viewerInit    = false;
		this._viewerWrapper = null;
		this._activeURN     = "";

		if( !this.frameurl || this.frameurl == "" )
		{
			if( this.importPath )
			{
				this.set( "frameurl", this.importPath + "ForgeViewer.html" );
			}
			else
			{
				this.frameurl = this.resolveUrl("../forge-viewer/ForgeViewer.html");
			}
		}
	},

    attached: function() 
	{
		this._forceSizeforIOS();
	},

    // This is a HACK! to working around the following iOS issue:
	// https://github.com/mrdoob/three.js/issues/9195
	// If assumes that th view extends to the bottom and right of the screen
	_forceSizeforIOS()
	{
		var userAgent = window.navigator.userAgent;
		if( !userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i) ) 
		{
			return;
		}

		var node = this.$.viewer;
		var x = 0;
		var y = 0;
		while( node != null )
		{
			if( node.offsetTop ) y += node.offsetTop;
			if( node.offsetLeft ) x += node.offsetLeft;
			if( node.offsetParent != null )
			{
				node = node.offsetParent;
			}
			else
			{
				node = node.parentNode;
			}
		}
		var h = window.innerHeight - y;
		var w = window.innerWidth - x;
		var vh = this.$.viewer.height;
		var vw = this.$.viewer.width;
		if( this.$.viewer.height == "100%" || this.forceHeight )	
		{
			this.$.viewer.height = "" + h + "px";
			this.forceHeight = true;
		}
		if( this.$.viewer.width == "100%" || this.forceWidth )	
		{
			this.$.viewer.width = "" + w + "px";
			this.forceWidth = true;
		}
	},

    _fakeFullScreen(
		mode
	) {
		if( mode )
		{
			this.savePosition = this.$.viewer.style.position;
			this.saveTop      = this.$.viewer.style.top;
			this.saveLeft     = this.$.viewer.style.left;
			
			this.$.viewer.style.position = "absolute";
			this.$.viewer.style.top = 0;
			this.$.viewer.style.left = 0;
			this.$.viewer.style.zIndex = 1000;
		}
		else
		{
			this.$.viewer.style.position = this.savePosition;
			this.$.viewer.style.top      = this.saveTop;
			this.$.viewer.style.left     = this.saveLeft;
		}
		this._forceSizeforIOS();
	},

    _onIronResize : function( event )
	{
		setTimeout( ( event ) => { this._forceSizeforIOS( event ) }, 100 );
	},

    /**
	* Restores a saved view to the AUtodesk Forge vieweru
	*
	* @param {object} The Forge viewer state object in JSON format as returned by viewer.getState
	*                 It is also stored in the triForgeViews BO by the Save Viewe UI in the viewer.
	*/
	displayView : function(
		view
	) {
		if( this.$.viewer.contentWindow.ViewerWrapper )
		{
			this._viewerWrapper.displayView( view );
		}
	},

    /**
	  * Selects a model element by GUID or the configured search parameter.
	  *
	  * @param {string} GUID of target model element
	  * @param {boolean} if true, the view is zoomed and centered to show the selected element
	  */
	select : function(
		value, zoomMode
	) {
		if( this.deferredValue  && !value ) return;
		
		if( !zoomMode ) zoomMode = this.autozoom;
		if( this.$.viewer.contentWindow.ViewerWrapper )
		{
			this._loadWrapper();
			this._viewerWrapper.selectValue( value, zoomMode );
		}
		else
		{
			this.deferredValue = value;	  			
			this.deferredZoomMode = zoomMode;
		}
	},

    // Called when iFrame source is loaded
	_onViewerFrameLoad : function()
	{
		this._viewerInit = false;
		setTimeout( ()=>{ this._loadWrapper(); }, 100 );	// Spin until loaded
	},

    _loadWrapper : function()
	{
		if( this._viewerInit ) return;
		if( !this.$.viewer.contentWindow ) return; 
		if( !this.$.viewer.contentWindow.loadWrapper ) return;
		this._viewerInit = true;

		this.$.viewer.contentWindow.loadWrapper(
				this.viewer,
				()=> { this._initializeViewer(); }
			);
	},

    _initializeViewer : function()
	{
		var modelMgr = this.$.viewer.contentWindow.initModelManager(
					( ctrl,	selectionList, selection, count, index ) => { 
						this._selectionChanged( ctrl,	selectionList, selection, count, index ); 
					},
					this.locale,
					this.autozoom,
					this.features,
					this.contextroot
					);
		this._viewerWrapper = modelMgr.viewer;
		this._viewerWrapper.setErrorHandlers( 
			( msg ) => { this._displayError( msg ) }, 
			( status, source, responseText, component ) => { this._RESTError( status, source, responseText, component ) } 
		);
		if( this.authurl )
		{
			 this._viewerWrapper.setRestURL( this.contextroot, this.authurl + "/auth/token" );
		}

		if( this.model && this.model.url && this.model.url != "" )
		{
			this._viewerWrapper.setCurrentModel( this.model );
			this._viewerWrapper.loadFile( this.model.url, this.model.binding );
			if( this.deferredValue )
			{
				this._viewerWrapper.selectValue( this.deferredValue, this.deferredZoomMode );
				this._viewerWrapper.setAutoZoom( this.deferredZoomMode );
				this._viewerWrapper.setRecordKey( this.recordkey )
				this.deferredZoomMode = null;
				this.deferredValue = null;
			}
		}
		this._viewerWrapper.setAutoZoom( this.autozoom );
		this._viewerWrapper.onFakeFullScreen = ( mode )=>{ this._fakeFullScreen( mode ); };
	},

    _displayError : function( 
		msg, title, source 
	) {
		if( !msg || msg.length == 0 ) return;
		
		if( !title ) title = __dictionary__Error;
		
		var message = {
			"title"        : title,
			"messages"     : [
				__dictionary__Viewer 
			]
		};
		
		this._makeMessage( message, msg, source );
	},

    _RESTError : function(
		status, 			// HTTP Status
		source, 			// Text identifying operation that generated the error
		responseText,		// HTTP Error text
		component			// Component or dialog generating the error
	) {
		if( !component )
		{
			component = __dictionary__Viewer;
		}
		var message = {
			"title"        : __dictionary__RESTError,
			"label"        : status,
			"messages"     : [
				component
			]
		};

		var json;
		try
		{
			json = JSON.parse( responseText );
		} 
		catch( e ) {}

		if( status == 404 )
		{
			message.messages.push( __dictionary__NotFound );
		}
		else if( status == 403  )
		{
			message.title = __dictionary__AccessDenied;
			if( json )
			{
				responseText = null;
				component = null;
				if( json.ErrorCode == -4 )
				{
					message.messages.push( __dictionary__AccessDenied_1.replace( "{scope}", json.ErrorMessage ) );
				}
				else if( json.errorType == "SecurityException" )
				{
					message.messages.push( __dictionary__AccessDenied_1.replace( "{scope}", json.action ) );
				}
				else
				{
					for( msg in json )
					{
						message.messages.push( msg + ":" + json[msg] );
					}
				}
			}
		}
		this._makeMessage( message, responseText, component );
	},

    _makeMessage : function(
		message, body, source
	) {
		if( source && source != "" )
		{
			message.messages.push( source );
		}

		if( body )
		{
			var msg = body.toUpperCase();
			if(    msg.startsWith( "<HTML") 
				|| msg.startsWith( "<H1>") 
				|| msg.startsWith( "<!DOCTYPE" ) )
			{
				message.body = body;
			}
			else
			{
				message.messages.push( body );
			}
		}

		this.dispatchEvent( 
			new CustomEvent('forge-message',{ bubbles: true, composed: true, detail : message })
		);
	},

    _selectionChanged : function( 
		ctrl,
		selectionList,
		selection,
		count,
		index 
	) {
		this.dispatchEvent( new CustomEvent('select', { bubbles: true, composed: true, 
											 detail: { selection : selection }} ) );
	},

    //============================================================================
	// Observers
	//============================================================================
	_frameChanged : function(
		value
	) {
		if( this.$.viewer.src != value )
		{
			this.$.viewer.src = value;
		}
	},

    _modelChanged : function( model ) 
	{
		if( model.url == this._activeURN ) return;

		if( !model.mboKey )
		{
			model.mboKey = this.recordkey;
		}
		
		// See if iFrame is fullly loaded, if not, wait on load event
		if(    this.$.viewer.contentWindow 
			&& this.$.viewer.contentWindow.ViewerWrapper )
		{
			if( !this._viewerWrapper )
			{
				this._loadWrapper();
				return;
			}
			
			this._activeURN = model.url;
			
			if( !model || !model.url || model.url == "" )
			{
				this._viewerWrapper.setCurrentModel( null );
				this._viewerWrapper.loadFile( "" );
				return;
			}
			this._viewerWrapper.setCurrentModel( model );
			this._viewerWrapper.loadFile( model.url, model.binding );
		}
	},

    _recordKeyChanged : function( value ) 
	{
		if(    this.$.viewer.contentWindow 
			&& this.ViewerWrapper )
		{
			this._viewerWrapper.setRecordKey( value );
		}
	},

    _urnChanged : function(	urn	) 
	{
		if( urn == this._activeURN ) return;
		
		this.set( "model", {
				binding  : this.mapping,
				mboKey   : this.recordkey,
				url      : urn,
				viewer   : this.viewer,
				autozoom : this.autozoom
			} );
	},

    _valueChanged : function(
		value
	) {
		this.select( value, this.autozoom );
	},

    _zoomChanged : function(
		value
	) {
		if(    this.$.viewer.contentWindow 
			&& this.$.viewer.contentWindow.ViewerWrapper )
		{
			this._loadWrapper();
			this._viewerWrapper.setAutoZoom( value );
		}
	},

    importMeta: getModuleUrl("forge-viewer/forge-viewer.js")
})