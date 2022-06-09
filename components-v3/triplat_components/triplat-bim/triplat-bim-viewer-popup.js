/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/paper-button/paper-button.js";
import "./triplat-bim-viewer.js";
import "../triblock-popup/triblock-popup.js";

/*
Common component that displays the BIM viewer in a triblock-popup

### Examples

```html
  <triplat-bim-thumbnail buildingspec="[[_selectedBuildingId]]" height="64px" width="64px"
						 on-select="_onModelSelect">
  </triplat-bim-thumbnail>

  <triplat-bim-viewer-popup id="bimviewer" on-space-changed="_onModelSpaceSelect" >
```

  _onModelSelect : function(
	event
  ) {
	this.$.bimviewer.openPopup( event.detail.buildingId ); 
  }
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

				triblock-popup {
					padding : 0; 
					height  : calc(100% - 50px); 
					width   : calc(100% - 50px);
				}
			
		</style>

		<triblock-popup id="triBIMViewerPopup">
		</triblock-popup>
		<triblock-popup id="triBIMViewerPopup" manual-close="true" title="[[title]]">
			<div>
				<slot id="titleSlot" name="title" style="width:100%;"></slot>
			</div>
			<div style="width:100%; height: 100%">
				<triplat-bim-viewer id="viewer" model="[[model]]" urn="[[modelurl]]" buildingid="[[buildingid]]" recordkey="[[recordkey]]" spaceid="{{spaceid}}" value="{{value}}" on-select="_onSelect">
				 <triplat-bim-viewer>
			</triplat-bim-viewer></triplat-bim-viewer></div>
			<div>
				<slot id="buttonSlot" name="buttons" style="width:100%;"></slot>
			</div>
		</triblock-popup>
	`,

    is: "triplat-bim-viewer-popup",

    /*
	 * Fired when an element in the viewer with a GUID matching a TRIRIGA space is selected.  Or when a space was
	 * selected and becomes unselected.
	 *
	 * @event on-space-changed
	 *
	 * @param {string} spec ID of selected space 
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

	properties: {

		/**
		 * ID of building to load model for 
		 */
		buildingid:{
			type     : String,
		},
		
		/**
		  * Set to true this, will prevent the popup from closing when the applicaiton implements 
		  * `triblock-app-layout-banner-popup-behavior` behavior. It can be used to handle the banner back button when it is clicked.  
		  */
		manualClose: {
			type: Boolean,
			value: false
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

		/*
		 * This is an opaque string created by viewer vendor specific tools which instructs the
		 * underlying viewer to load a specific model; For the Forege viewer, this is the Forge
		 * viewer service URN
		 */
		modelurl : {
			type     : String,
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
			readOnly : false,
		},
		
		/**
		  * The title that will be displayed in the `triblock-app-layout` component banner label when the `smallScreenWidth` 
		  * property is true. 
		  */
		title: String,

		/*
		 * The GUID of a model element.  For the Forege viewer, this is the Autodesk Export GUID
		 */
		value : {
			type     : String,
			notify   : true,
			readOnly : false,
		},
	},

    ready: function() 
	{
		this.title = "title";
	},

    /**
	 * Display the viewer popup with the specified model.
	 *
	 * @param {object/string} Either a model record for Example for the on-select event of triplat-bim-thumbnail or a buildingid
	 *                        in either case, the value is passed to the embedded triplat-bim-viewer
	 */
	openPopup: function(
		value
	) {
		if( value )
		{
			if( value.urn )	// assume its a model record
			{
				this.set( "model", value );
			}
			else
			{
				this.set( "buildingid", value );
			}
		}
		this.$.triBIMViewerPopup.openPopup();
	},

    /**
	 * Selects a room in the model from a TRIRIGA space and places the camera rougly in the center of the space bounding box.
	 * For irregular spaces, the camera may not actaully be in the space.
	 *
	 * @param {string} TRIRIGA space id
	 */
	setSpace(
		spaceId
	) {
		this.$.viewer.setSpace( spaceId );
	},

    _onSelect : function(
		event
	) {
		event.stopPropagation();
		this.dispatchEvent( new CustomEvent( 'select', { bubbles: false, composed: true, 
														 detail: { urn        : this.modelurl, 
																   buildingId : this.buildingid,
																   selection  : this.value }} ));
	}
});