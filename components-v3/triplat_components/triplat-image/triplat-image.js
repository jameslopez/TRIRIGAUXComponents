/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-image/iron-image.js";
import "../tricore-url/tricore-url.js";
import "../@polymer/iron-ajax/iron-ajax.js";
import "../@polymer/iron-ajax/iron-request.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../triplat-icon/triplat-icon.js";
import { TriplatFileSizeValidationBehavior } from "../triplat-file/triplat-file-size-validation-behavior.js";
import { TriplatServerStatus } from "../triplat-offline-manager/triplat-server-status.js";
import { TriplatImageOrientationBehavior, TriplatImageOrientation } from "./triplat-image-orientation-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";
var getExtensionsPromise = null;

/*
A custom element for displaying an image that provides useful image sizing. It works similar to iron-image element in Polymer.
The sizing option allows the image to be either cropped (cover) or letterboxed (contain) to fill a fixed user-size placed on the element.

	 <triplat-image height="250px" width="150px" sizing="contain"></triplat-image>

The image can be editable and user can upload a new image.
	
	<triplat-image label="Building" src="{{data.buildingImage}}" 
	  editable 
	  height="250px" width="250px" sizing="cover"></triplat-image>

Default placeholder icon can be set. In that case, if there is no URL image, the specified icon will be displayed as a placeholder.
	
	<triplat-image class="person" src="{{data.personImage}}" 
	  placeholder-icon="user-profile"
	  height="30px" width="30px" sizing="cover"></triplat-image>

	<triplat-image class="asset" src="{{data.assetImage}}" 
	  placeholder-icon="hardware:laptop-mac"
	  height="30px" width="30px" sizing="cover"></triplat-image>

Placholder icon mixin style example:
	
	.person {
	--triplat-image-placeholder-icon: {
	  color: blue;
	  height: 30px;
	  width: 30px;
	};
  }

Example of using custom label. In order for an element to be considered as a label, it must have the `label` attribute.

	<triplat-image editable>
	  <iron-icon label icon="image:photo"></iron-icon>
	  <span label>Building</span>
	</triplat-image>

Note: The 'label' property value will be overridden when using a custom 'label'. <br/>

The <b>triplat-image</b> element rotates the images according to the orientation of the camera relative to the scene, when the image was captured. 
It will rotate only JPEG files that contain the orientation metadata in its header.
The rotation of JPEG file occurs before the file is uploaded to the TRIRIGA server.

### Styling


The following custom properties and mixins are also available for styling:

Custom property                       | Description                                                | Default
--------------------------------------|------------------------------------------------------------|----------------------------------------------
`--triplat-image-wrap`                | Mixin applied to the div that wraps the image components        | `{--layout-vertical; --layout-center-center}`
`--triplat-image-label`               | Mixin applied to the label                                      | `padding-bottom: 2px`
`--triplat-image-iron-image`          | Mixin applied to the iron-image contained within this component | `{}`
`--triplat-image-placeholder-icon`    | Mixin applied to the placeholder icon                           | `{}`
`--triplat-image-action-icons`        | Mixin applied to the action-icons section                       | `{margin-left: 4px; margin-right: 4px;}`
`--triplat-image-upload-icon`         | Mixin applied to the upload icon                                | `{color: var(--tri-primary-color); background-color: white; cursor: pointer;}`
`--triplat-image-clear-icon`          | Mixin applied to the clear icon                                 | `{color: var(--tri-primary-color); background-color: white; cursor: pointer;}`
`--triplat-image-focused-action-icon` | Mixin applied to the action icon when it is in focus            | `{outline: 1px dotted var(--tri-primary-color)}`
`--tri-actionable-color`              | Color for the upload and clear icons                            | `--tri-primary-color`
`--tri-actionable-color-contrast`     | Color for the background of the upload and clear icons          | `white`
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			.image-wrap {
				@apply --layout;
				@apply --layout-vertical;
				@apply --layout-center-center;
				@apply --triplat-image-wrap;   
			}

			.image-label {
				padding-bottom: 2px;
				@apply --triplat-image-label;   
			}
			
			iron-image {
				@apply --triplat-image-iron-image;   
			}

			.placeholder-icon {
				@apply --triplat-image-placeholder-icon;   
			}

			.action-icons{
				margin: 4px;
				@apply --triplat-image-action-icons;   
			}
			
			.upload-icon{
				color: var(--tri-actionable-color, var(--tri-primary-color));
				background-color: var(--tri-actionable-color-contrast, white);  
				cursor: pointer;
				@apply --triplat-image-upload-icon;   
			}

			.clear-icon{
				color: var(--tri-actionable-color, var(--tri-primary-color));
				background-color: var(--tri-actionable-color-contrast, white);  
				cursor: pointer;
				@apply --triplat-image-clear-icon;   
			}
			
			.upload-icon:focus, .clear-icon:focus{
				outline-color: var(--tri-actionable-color, var(--tri-primary-color));
				outline-style: dotted;
				outline-width: 1px;
				@apply --triplat-image-focused-action-icon;   
			}

			.rtl{
				direction: rtl;
			}

		
		</style>

		<tricore-url id="tricoreUrl" raw-url="/p/fileupload/uploadimage" bind-url="{{_fileUrl}}"></tricore-url>
		<iron-ajax id="getFileUrlIdAjax" url="{{_fileUrl}}" on-response="_handleGetFileUploadResponse" on-error="_handleGetFileUploadError">
		</iron-ajax>

		<tricore-url raw-url="/p/fileupload/validImageExtensions" bind-url="{{_validImageExtensionsUrl}}"></tricore-url>
		<iron-ajax id="validImageExtensionsAjax" url="[[_validImageExtensionsUrl]]"></iron-ajax>

		<input type="file" id="fileInput" on-change="_fileSelected" hidden="" accept="image/*">
		
		<div class="image-wrap">
		
			<template is="dom-if" if="{{_showLabel(label)}}">
			  <label class="image-label">{{label}}</label>
			</template>
			<label><slot id="labelContent" name="label"></slot></label>
			<iron-image id="triCustomImage" height="{{height}}" width="{{width}}" style="{{_setImageStyle(style)}}" sizing="{{sizing}}" position="{{position}}" hidden\$="{{_showPlaceholder}}" data-info\$="[[data-info]]"></iron-image>
	
			<iron-icon class="placeholder-icon" icon="{{placeholderIcon}}" hidden="{{!_showPlaceholder}}"></iron-icon>

			<template is="dom-if" if="{{editable}}">
			  <div class="action-icons">
				
			  
				<iron-icon icon="upload-export" id="uploadIcon" class="upload-icon" title="Upload image" on-tap="openFileSelection" tabindex="0" on-keypress="_keyPressHandlerUpload"></iron-icon>
				
				<iron-icon icon="close-cancel-error" class="clear-icon" title="Clear image" on-tap="clearImage" hidden\$="{{!_showClearIcon}}" tabindex="0" on-keypress="_keyPressHandlerClear"></iron-icon>
			  
				
			  </div>        
			</template>
		
		</div>
	`,

    is: "triplat-image",

    behaviors: [
		TriplatImageOrientationBehavior,
		TriplatFileSizeValidationBehavior
	],

    /**
	 * Fired after the upload file is submitted and a response is received.<br>
	 * Error Messages:<br>
	 *	<b>invalidExcludeExtension</b> - Selected file has an extension that is not allowed (as defined in the TRIRIGAWEB.properties file).<br>
	 *	<b>invalidIncludeExtension</b> - Selected file has an extension that is not listed in the restricted included extension list (as defined in the TRIRIGAWEB.properties file).<br>
	 *  <b>invalidEmptyExtension</b> - Selected file has an empty extension.
	 *	<b>invalidToSaveFile</b> - Selected file is not valid for saving (hard-coded restriction).<br>
	 *	<b>failAntiVirusScanResult</b> - Selected file fail on antivirus Scan.<br>
	 *	<b>fileNotFound</b> - Fail to load the selected file for unknown reason.<br>
	 *	<b>invalidImageSize</b> - The size of the image file exceeds the maximum allowed by the MAXIMUM_UPLOAD_FILE_SIZE_MEGABYTES parameter.<br>
	 *  <b>uploadFailed</b> - The upload request failed.<br>
	 *
	 * @event image-uploadfile-response
	 */

	properties : {
	   
	   /**
		* Height in pixels. 
		*/
	   height:{
		   type: Object,
		},     
	   
		/**
		* Width in pixels. 
		*/
	   width:{
		   type: Object,
	   },

	   /**
		* Sizing can be either contain or cover. 
		*/
	   sizing:{
		   type: String,
	   },
	   
		/**
		* Set style of the image.
		*/
	   style:{
		   type: String,
	   },
	   
		/**
		* URL of the image. 
		*/
	   src:{
		   type: String,
		   notify: true,
		   readOnly: false,
		   observer: "_handleImageChange"
	   },

	   /**
		* Label of the image.
		*/
	   label:{
		   type: String,
	   },

	   /**
		* When a sizing option is used (`cover` or `contain`), this determines
		* how the image is aligned within the element bounds.
		*/
	   position: {
		 type: String,
		 value: 'center'
	   },

	   /**
		* Make the image editable. User can upload new image or delete the image.
		*/
	   editable: {
		   type: Boolean,
		   value: false
		 },
	   
		/**
		* If true, it displays a thumbnail version of the image (a smaller file size).
		*/
	   thumbnail: {
		   type: Boolean,
		   value: false
		 },
	   
	   /**
		* This icon will be used as a placeholder until URL image is provided.
		*/
	   placeholderIcon:{
		   type: String,
		   observer: "_handleImageChange"
		 },

	   /**
		* It indicates if uploading is in progress.
		*/
	   uploading: {
		   type: Boolean,
		   value: false,
		   notify: true,
		   readOnly: true
	   },
	   
	   /**
		* If true, the image will be uploaded only when the record that contains this image is saved or updated.
		* When running in offline mode, this property is ignored and the image upload is always postponed.
		*/
	   postponeUpload: {
		   type: Boolean,
		   value: false
	   },
	   
	   /**
		* If true, the images displayed by this component will be saved to the offline cache.
		*/
	   cache: {
		   type: Boolean,
		   value: false
	   },
		
	   _showPlaceholder: {
		   type: Boolean,
		   value: false
	   },
	   
	   _showClearIcon: {
		   type: Boolean,
		   value: false
	   },

	   _validImageExtensionsUrl: {
		   type: String
	   }
   },

    _handleImageChange: function() {
		this.$.triCustomImage.src = this._computeImageSrc(this.src, this.thumbnail, this.cache);
		if(this._hasValue(this.placeholderIcon)){
			if(this._hasValue(this.src)) {
				this.set('_showPlaceholder', false);
			} else {
				this.set('_showPlaceholder', true);
			}
		}
		
		if(this.editable){
			if(this._hasValue(this.src)) {
				this.set('_showClearIcon', true);
			} else {
				this.set('_showClearIcon', false);
			}
		}
	},

    _setImageStyle: function(style){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this.$.triCustomImage.style.cssText = style;
	},

    _computeImageSrc: function(src, thumbnail, cache) {
		if (!this._hasValue(src)) {
			return "";
		} else {
			if (typeof src === "object" && src.isUnsavedImage) {
				return src.image;
			} else {
				src = cache ? src + "&offlineCache=true" : src;
				if (thumbnail) {
					return this.$.tricoreUrl.getUrl("/html/en/default/images/getImageThumbnail.jsp?fileLoc=" + src);
				} else {
					return this.$.tricoreUrl.getUrl("/getCompanyFile.jsp?fileLoc=" + src);
				}
			}
		}
	},

    attached: function() {
		var textDirectionValue = document.querySelector('body').getAttribute('dir');
		if(textDirectionValue==="rtl"){
			var imageWrapElement = Array.from(dom(this).querySelectorAll(".image-wrap"))[0];
			if(imageWrapElement != undefined && imageWrapElement != null){
				imageWrapElement.classList.add('rtl');
			}
		}
		if(dom(this.$$('#labelContent')).getDistributedNodes().length >0){
			this.label=" ";
		}
	},

    ready: function(){
		this.$.triCustomImage.sizing = this.sizing;
	},

    /**
	 * Shows a file selection dialog box to the user, so that the user can search and select an image to upload.
	 */
	openFileSelection: function() {
	  var elem = this.$$("#fileInput");
	  if (elem && document.createEvent) {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, false);
		elem.dispatchEvent(evt);
	  }
	},

    _fileSelected: function(e) {
	  var length = e.target.files.length;
	  if(length>0) {
		var file = e.target.files[0];
		this._uploadFile(file);
	  }
	},

    /**
	 * Clears the value of the image field bound to this element.
	 */
	clearImage: function() {
		this.src = "";
		this.$$("#fileInput").value = "";
		
		var uploadIconEl = this.$$("#uploadIcon");
		if (uploadIconEl) {
			uploadIconEl.focus();
		}
	},

    /**
	 * Cache an image field to the local browser storage.
	 * @param {String} scr URL of the image to be cached. It defaults to the value of the `src` property.
	 */
	cacheImage: function(src, cacheThumbnail, cacheFullImage) {
		var imageUrl = this._computeImageSrc(src || this.src, false, true);
		var thumbnailUrl = this._computeImageSrc(src || this.src, true, true);
		return this._doCacheImage(imageUrl, cacheFullImage)
			.then(this._doCacheImage.bind(this, thumbnailUrl, cacheThumbnail));
	},

    _doCacheImage: function(imageSrc, cache) {
		if (!cache || !imageSrc || (typeof imageSrc === "object" && imageSrc.isUnsavedImage)) {
			return Promise.resolve();
		}
		var request = document.createElement('iron-request');
		var requestOptions = {
			url: imageSrc,
			method: "GET"
		};
		request.send(requestOptions);
		return request.completes.then(function() {
			var cacheError = request.xhr.getResponseHeader("trisw-cache-error");
			if (cacheError && cacheError != "") {
				return Promise.reject({cause: cacheError})
			}
			return request.response;
		});
	},

    _handleGetFileUploadResponse: function(e) {
		this._setUploading(false);
		this.$$("#fileInput").value = "";
		var newSrc = e.detail.response.fileURL;
		if(newSrc) {
			this.src = newSrc;
		}
		
		this.fire("image-uploadfile-response", e.detail.response);
	},

    _handleGetFileUploadError: function(e) {
		this._fireError("uploadFailed", this.$$("#fileInput").files[0].name);
	},

    _fireError: function(errorMessage, fileSelected) {
		this._setUploading(false);
		this.$$("#fileInput").value = "";
		this.fire(
			"image-uploadfile-response", 
			{
				errorMessage: errorMessage,
				isFileLoaded: "FALSE",
				fileSelected: fileSelected
			}
		);
	},

    _uploadFile: function(file) {
		if (!file) {
		  return;
		}
		this._setUploading(true);
		this._checkImageFileSize(file)
			.then(this._checkFileExtension.bind(this, file.name))
			.then(function() {
				this._fixImageOrientation(file)
					.then(this._doUploadFile.bind(this, file.name))
					.catch(this._doUploadFile.bind(this, file.name, file));
			}.bind(this))		
			.catch(function(error) {
				this._fireError(error, file.name);
			}.bind(this));
	},

    _doUploadFile: function(filename, image) {
		if (this.postponeUpload || !TriplatServerStatus.getInstance().isServerOnline()) {
			this.$$("#fileInput").value = "";
			this._readImageAsDataURL(image)
				.then(
					function(dataUrl) {
						this.src = {
							isUnsavedImage: true,
							image: dataUrl,
							filename: filename,
							length: image.size 
						};
						this._setUploading(false);
					}.bind(this)
				)
				.catch(this._fireError.bind(this, "uploadFailed", filename));
		} else {
			var formData = new FormData();
			formData.append("file", image, filename);

			var ironAjax = this.$$("#getFileUrlIdAjax");
			ironAjax.body = formData;
			ironAjax.method = "POST";
			ironAjax.contentType = undefined;
			ironAjax.generateRequest();
		}
	},

    _readImageAsDataURL: function(image) {
		return new Promise(
			function(resolve, reject) {
				var reader  = new FileReader();
				reader.addEventListener(
					"loadend", 
					function () {
						resolve(reader.result);
					}
				);
				reader.addEventListener("error",reject);
				reader.readAsDataURL(image);
			}
		);
	},

    _hasValue: function(elem) {
		return elem != undefined && elem != null && (typeof elem === "object" && elem.isUnsavedImage || elem.length > 0);
	},

    _showLabel: function(label) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return this._hasValue(label);
	},

    _keyPressHandlerUpload: function(event) {
		var code = event.keyCode;
		// accept enter or spacebar
		if (code == 13 || code == 32) {
			this.openFileSelection();
		}
	},

    _keyPressHandlerClear: function(event) {
		var code = event.keyCode;
		// accept enter or spacebar
		if (code == 13 || code == 32) {
			this.clearImage();
		}
	},

    _getValidImageExtensions: function() {
		if (getExtensionsPromise) {
			return getExtensionsPromise;
		}

		var request = this.$.validImageExtensionsAjax.generateRequest();
		getExtensionsPromise = request.completes
			.then(function() {
				return request.response;
			}.bind(this))
			.catch(function(error) {
				getExtensionsPromise = null;
				console.err(error);
				return null;
			}.bind(this));
		return getExtensionsPromise;
	},

    _checkFileExtension: function(fileName) {
		var lastIndex = fileName.lastIndexOf('.');
		if (lastIndex == -1) {
			return Promise.reject("invalidEmptyExtension");
		}
		var fileNameExtension = fileName.substring(lastIndex).toLowerCase();

		return this._getValidImageExtensions().then(function(validExtensions) {
			if(validExtensions && validExtensions.includedExtensions != null && validExtensions.includedExtensions.length > 0) {
				if (validExtensions.includedExtensions.indexOf(fileNameExtension) == -1) {
					return Promise.reject("invalidIncludeExtension");
				}
			} else if (validExtensions && validExtensions.excludedExtensions != null && validExtensions.excludedExtensions.indexOf(fileNameExtension) >= 0) {
				return Promise.reject("invalidExcludeExtension");
			}
		}.bind(this));
	},

    _checkImageFileSize: function(file) {
		return this.checkFileSize(file).catch(function() {
			return Promise.reject("invalidImageSize");
		});
	}
});