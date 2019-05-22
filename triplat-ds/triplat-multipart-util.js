/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

TriplatMultipartUtil = function () {};

TriplatMultipartUtil.prototype.stringToBinary = function(s) {
	var escstr = encodeURIComponent(s);
	var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
		return String.fromCharCode('0x' + p1);
	});
	var data = new Uint8Array(binstr.length);
	Array.prototype.forEach.call(binstr, function (ch, i) {
		data[i] = ch.charCodeAt(0);
	});
	return data;
};

TriplatMultipartUtil.prototype.handleUnsavedFiles = function(data) {
	if (data == null) {
		return null;
	}
	var recordList = Array.isArray(data) ? data : [data];
	var usavedFiles = {
		files: [],
		imageFieldMap: [],
		fileFieldMap: []
	};
	var fileIndex = 0;
	
	for (var i = 0; i < recordList.length; i++) {
		usavedFiles.imageFieldMap[i] = {};
		usavedFiles.fileFieldMap[i] = {};
		var record = recordList[i];
		for (var propName in record) {
			var prop = record[propName];
			if (prop != null && typeof prop === "object" && prop.isUnsavedImage && prop.image != null) {
				var imageKey = "image" + fileIndex;
				var imageContent = this.readDataURL(prop.image);
				usavedFiles.files[fileIndex] = {key: imageKey, binary: imageContent.binary, contentType: imageContent.contentType, filename: prop.filename};
				usavedFiles.imageFieldMap[i][propName] = imageKey;
				delete record[propName];
				++fileIndex;
			} else if (prop != null && typeof prop === "object" && prop.isUnsavedFile && prop.file != null) {
				var fileKey = "file" + fileIndex;
				var fileContent = this.readDataURL(prop.file);
				usavedFiles.files[fileIndex] = {key: fileKey, binary: fileContent.binary, contentType: fileContent.contentType, filename: prop.fileName};
				usavedFiles.fileFieldMap[i][propName] = fileKey;
				delete record[propName];
				++fileIndex;
			}
		}
	}
	
	return fileIndex > 0 ? usavedFiles : null;	
};

TriplatMultipartUtil.prototype.readDataURL = function(dataUrl) {
	var dataSplit = dataUrl.split(',');
	var contentType = dataSplit[0].split(':')[1].split(';')[0]
	
	var byteCharacters = atob(dataSplit[1]);
	var data = new Uint8Array(byteCharacters.length);

	for (var i = 0; i < byteCharacters.length; i++) {
		data[i] = byteCharacters.charCodeAt(i);
	}
	return {binary: data, contentType: contentType};
};

TriplatMultipartUtil.prototype.buildMultipartFormData = function(contentType, boundary, dto, imageFieldMap, fileFieldMap, files) {
	var buffers = [];
	buffers.push(this.encodeFormData(boundary, "dto", "dto", "application/json", dto));
	buffers.push(this.encodeFormData(boundary, "imageFieldMap", "imageFieldMap", "application/json", imageFieldMap));
	buffers.push(this.encodeFormData(boundary, "fileFieldMap", "fileFieldMap", "application/json", fileFieldMap));
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		buffers.push(this.encodeFormData(boundary, file.key, file.filename, file.contentType, file.binary));
	}
	buffers.push(this.stringToBinary("--" + boundary + "--\r\n"));
	return new Blob(buffers, {type: contentType });
};

TriplatMultipartUtil.prototype.encodeFormData = function(boundary, name, filename, contentType, value) {
	var header = "";
	header += "--" + boundary + "\r\n";
	header += 'Content-Disposition: form-data; name="' + name + '"; filename="' + filename + '"\r\n';
	header += "Content-Type: " + contentType + "\r\n";
	header += "\r\n";// There is a blank line between the header and the data of the part
	header = this.stringToBinary(header);

	var body = null;
	if (value instanceof Uint8Array) {
		body = value;
	} else {
		body = this.stringToBinary(value);
	}
	var size = header.byteLength + body.byteLength + 2; // header + data + new line
	var data = new Uint8Array(size);
	data.set(header, 0);
	data.set(body, header.byteLength);
	data.set([13,10], size-2);// Add a new line in the end of the part
	return data;
};

TriplatMultipartUtil.prototype.generateMultipartFormDataBoundary = function() {
	var MULTIPART_CHARS = "-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var buffer = "--triplatds";
	var boundarySize = Math.trunc(Math.random() * 11 + 30);
	for (var i = 0; i < boundarySize; i++) {
		buffer += MULTIPART_CHARS[Math.trunc(Math.random() * MULTIPART_CHARS.length)];
	}
	return buffer;
};

var triplatMultipartUtil = new TriplatMultipartUtil();