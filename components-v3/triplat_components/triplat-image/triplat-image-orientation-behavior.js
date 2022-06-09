/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

/**
 * A behavior to fix the orientation of jpeg images.
 * The camera does not rotate the image according to the camera position/orientation. 
 * The camera just adds an EXIF header that indicates the orientation of the image on the moment it was taken.
 * The program showing the image is responsible to rotate the image according to the orientation field.
 * The HTML img element does not read this orientation field.
 * So the solution is to read the image before uploading, and if it has an orientation field then 
 * rotate the image before sending to the server.
 * @polymerBehavior TriplatImageOrientationBehavior
 *
 */
export const TriplatImageOrientationBehavior = {
		
	/**
	 * If the file parameter is a jpeg and if it has an orientation metadata then 
	 * this method returns a promise resolved to the image rotated according to its orientation.
	 * Otherwise returned a rejected promise.
	 */
	_fixImageOrientation: function(file) {
		if (file.type === undefined || file.type != "image/jpeg") {
			return Promise.reject("Image type has no orientation");
		}
		return this._readImageHeader(file)
				.then(this._readOrientation.bind(this))
				.then(this._readImage.bind(this, file))
				.then(this._rotateImage.bind(this));
	},

	_readImageHeader: function(file) {
		return new Promise(
			function(resolve, reject) {
				var reader = new FileReader();
				reader.onload = function() {
					resolve(reader.result);
				};
				reader.onerror = reject;
				/*
				 * Pull out the first 128kb of the image to limit load.
				 * EXIF should exist in the first 128kb.
				 */
				reader.readAsArrayBuffer(file.slice(0, 131072));
			}.bind(this)
		);
	},

	_readImage: function(file, orientation) {
		return new Promise(
			function(resolve, reject) {
				var reader = new FileReader();
				reader.onload = function() {
					var img = document.createElement("img");
					img.onload = function() {
						resolve({img: img, orientation: orientation});
					};
					img.src = reader.result;
					img.onerror = reject;
				};
				reader.onerror = reject;
				reader.readAsDataURL(file);					
			}.bind(this)
		);
	},

	/**
	 * Read the orientation of the image from the EXIF metadata.
	 * It will return rejected promise if the image is not a JPEG.
	 * It Will return rejected promise if cannot find the EXIF marker.
	 * Ref: https://www.media.mit.edu/pia/Research/deepview/exif.html
	 */
	_readOrientation: function(arrayBuffer) {
		try {
			var dataView = new DataView(arrayBuffer);

			if (dataView.getUint16(0) != 0xFFD8 /*SOI Marker*/) {
				throw "Is is not a JPEG image";
			}

			var offset = 2;
			var length = arrayBuffer.byteLength;
			var marker;

			while (offset < length) {
				marker = dataView.getUint16(offset);
				offset += 2; //Skip current marker

				if ((marker & 0xFF00) != 0xFF00) {
					throw "Image has an invalid marker";
				}

				if (marker == 0xFFE1) {
					// Found the APP1 EXIF marker
					return this._readOrientationFromEXIF({dataView:dataView, offset:offset});
				} else {
					offset += dataView.getUint16(offset);//Skip current marker data
				}
			}
		} catch (err) {
			return Promise.reject(err);
		}
	},

	_readOrientationFromEXIF: function(exif) {
		exif.offset += 2; // Skip EXIFDataSize
		this._isValidEXIFHeader(exif);
		this._readByteAlignment(exif);
		this._moveToFirstIFDOffset(exif);
		this._readNumberOfDirectoryEntries(exif);
		return this._getOrientationTagData(exif);
	},

	/*
	 * Exif data is starts by an EXIF header composed by ASCII characters "Exif" and 2 bytes of 0x00.
	 * Which gives a 6 byte sequence: 0x45786966 + 0x0000
	 */
	_isValidEXIFHeader: function(exif) {
		if(exif.dataView.getUint32(exif.offset) != 0x45786966) {
			throw "Invalid EXIF Header";
		};
		exif.offset += 6;// Skip EXIF header
	},

	/**
	 * Read the byte alignment for the TIFF data.
	 */
	_readByteAlignment: function(exif) {
		// Read the first two bytes of the TIFF header to determine the byte align of TIFF data.
		var littleEndian = false;
		var byteAlignment = exif.dataView.getUint16(exif.offset);
		if (byteAlignment == 0x4949 || byteAlignment == 0x4D4D) {
			littleEndian = byteAlignment == 0x4949;
		} else {
			throw "Invalid TIFF byte align"; 
		}
		exif.offset += 2;// Skip TIFF byte align

		// Next 2 bytes are always the value of 0x002A
		if (exif.dataView.getUint16(exif.offset, littleEndian) != 0x002A) {
			throw "Invalid TIFF data";
		}
		exif.offset += 2;// Skip TIFF 0x002A
		exif.littleEndian = littleEndian;
	},

	/**
	 * Move the EXIF offset to the first Image File Directory.
	 */
	_moveToFirstIFDOffset: function(exif) {
		// The last 4bytes of TIFF header are an offset to the first Image File Directory
		var firstIFDOffset = exif.dataView.getUint32(exif.offset, exif.littleEndian);
		if (firstIFDOffset < 8) {
			throw "Invalid TIFF First IFD Offset";
		}
		exif.offset += 4;// Skip TIFF firstIFDOffset

		exif.offset += firstIFDOffset - 8;// Go to the firstIFDOffset.
	},

	/**
	 * Read the number of directory entries
	 */
	_readNumberOfDirectoryEntries: function(exif) {
		// The first 2 bytes has the number of directory entries.
		exif.entries = exif.dataView.getUint16(exif.offset, exif.littleEndian);
		exif.offset += 2;// Skip the number of directory entries
	},

	/**
	 * Get the orientation tag from the exif metadata
	 */
	_getOrientationTagData: function(exif) {
		for (var i = 0; i < exif.entries; i++) {
			// Each entry has 12 bytes
			// First 2 bytes is the tag number
			// Look for the orientation tag.
			if (exif.dataView.getUint16(exif.offset, exif.littleEndian) == 0x0112) {
				return exif.dataView.getUint16(exif.offset + 8, exif.littleEndian);
			}
			exif.offset += 12;// Skip current entry.
		}
		return false;
	},

	/**
	 * Rotate the image occording to its orientation.
	 */ 
	_rotateImage: function(image) {
		var img = image.img;
		var canvas = document.createElement("canvas");

		if (image.orientation > TriplatImageOrientation.BOTTOM_LEFT) {
			canvas.width = img.height;
			canvas.height = img.width;
		} else {
			canvas.width = img.width;
			canvas.height = img.height;
		}

		var ctx = canvas.getContext("2d");

		// The orientation of the camera relative to the scene, when the image was captured. 
		// The relation of the '0th row' and '0th column' to visual position is shown as below:
		// Value	0th Row		0th Column
		//	1		top			left 
		//	2		top			right 
		//	3		bottom		right 
		//	4		bottom		left 
		//	5		left 		top
		//	6		right 		top
		//	7		right 		bottom
		//	8		left 		bottom
		switch (image.orientation) {
			case TriplatImageOrientation.TOP_RIGHT:
				// horizontal flip
				ctx.translate(img.width, 0);
				ctx.scale(-1, 1);
				break;
			case TriplatImageOrientation.BOTTOM_RIGHT:
				// 180 rotate left
				ctx.translate(img.width, img.height);
				ctx.rotate(Math.PI);
				break;
			case TriplatImageOrientation.BOTTOM_LEFT:
				// vertical flip
				ctx.translate(0, img.height);
				ctx.scale(1, -1);
				break;
			case TriplatImageOrientation.LEFT_TOP:
				// vertical flip + 90 rotate right
				ctx.rotate(0.5 * Math.PI);
				ctx.scale(1, -1);
				break;
			case TriplatImageOrientation.RIGHT_TOP:
				// 90 rotate right
				ctx.rotate(0.5 * Math.PI);
				ctx.translate(0, -img.height);
				break;
			case TriplatImageOrientation.RIGHT_BOTTOM:
				// horizontal flip + 90 rotate right
				ctx.rotate(0.5 * Math.PI);
				ctx.translate(img.width, -img.height);
				ctx.scale(-1, 1);
				break;
			case TriplatImageOrientation.LEFT_BOTTOM:
				// 90 rotate left
				ctx.rotate(-0.5 * Math.PI);
				ctx.translate(-img.width, 0);
				break;
		}

		ctx.drawImage(img, 0, 0, img.width, img.height);
		return this._convertDataURLtoBlob(canvas.toDataURL("image/jpeg"));
	},

	_convertDataURLtoBlob: function(dataURL) {
		var byteString = atob(dataURL.split(',')[1]);
		var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
		
		var buffer = new ArrayBuffer(byteString.length);
		var dataView = new DataView(buffer);
		for(var i = 0; i < byteString.length; i++) {
			dataView.setUint8(i, byteString.charCodeAt(i));
		}
		return new Blob([buffer], {type:mimeString});
	}
};

export const TriplatImageOrientation = function(){};
TriplatImageOrientation.TOP_LEFT = 1;
TriplatImageOrientation.TOP_RIGHT = 2;
TriplatImageOrientation.BOTTOM_RIGHT = 3;
TriplatImageOrientation.BOTTOM_LEFT = 4;
TriplatImageOrientation.LEFT_TOP = 5;
TriplatImageOrientation.RIGHT_TOP = 6;
TriplatImageOrientation.RIGHT_BOTTOM = 7;
TriplatImageOrientation.LEFT_BOTTOM = 8;