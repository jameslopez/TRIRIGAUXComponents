/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { pathFromUrl, resolveCss, resolveUrl } from "../@polymer/polymer/lib/utils/resolve-url.js";

export function assertParametersAreDefined(pArguments) {
	if (!pArguments) {
		return true;
	}
	if (pArguments.length == 1) {
		/*
		 * For a single property, it always return true because in Polymer 1 the observer is called each time an observable change 
		 * is made to one of the dependencies, even if the new value for the path is undefined.
		 */
		return true;
	}
	for (let i = 0, l = pArguments.length; i < l; i++) {
		l
		if (pArguments[i] === undefined || (
			pArguments[i] && pArguments[i].hasOwnProperty('value') && pArguments[i].hasOwnProperty('base') && pArguments[i].value === undefined && pArguments[i].base === undefined)) {
			return false;
		}
	}
	return true;
};

export function getResourceUrl() {
	var resourceUrlInputElement = document.querySelector("#resourceUrl");
	if (resourceUrlInputElement) {
		return window.location.origin + resourceUrlInputElement.getAttribute("value");
	} else {
		const match = window.location.href.match(/\/l\/(?!p)/);
		if (match) {
			return window.location.href.substring(0, match.index+2);
		}
	}
}

export function getModuleUrl(modulePath) {
	if (!modulePath) {
		return null;
	}
	modulePath = modulePath.replace("../", "").replace("./", "");
	if (modulePath[0] == "/") {
		modulePath = modulePath.slice(1);
	}
	return { 
		url: getResourceUrl() + "/" + modulePath
	};
}

let importedJsFiles = {};

export function importJs(jsImportPathList, hostComponentRelativePath) {
	if (!jsImportPathList || !hostComponentRelativePath) {
		return Promise.reject()
	}
	if (!Array.isArray(jsImportPathList)) {
		jsImportPathList = [jsImportPathList];
	}
	return new Promise(_doImportJs.bind(null, jsImportPathList, hostComponentRelativePath));
}

function _doImportJs(jsImportPathList, hostComponentRelativePath, resolve, reject, index) {
	if (!index) {
		index = 0;
	}
	if (index >= jsImportPathList.length) {
		resolve();
		return;
	}
	const jsImportPath = jsImportPathList[index];
	
	_createScriptTag(jsImportPath, hostComponentRelativePath)
		.then(() => { _doImportJs(jsImportPathList, hostComponentRelativePath, resolve, reject, ++index); })
		.catch((error) => { reject(error) });
}

function _createScriptTag(jsImportPath, hostComponentRelativePath) {
	const resolvedUrl = resolveUrl(jsImportPath, getModuleUrl(hostComponentRelativePath).url);
	if (importedJsFiles[resolvedUrl]) {
		return importedJsFiles[resolvedUrl];
	}
	
	let promiseResolve, promiseReject;
	let scriptPromise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});

	const scriptTag = document.createElement("script");
	scriptTag.onload = (event) => { promiseResolve(event); };
	scriptTag.onerror = (event) => { promiseReject(event.error); };
	scriptTag.setAttribute("async", false);
	scriptTag.setAttribute("src", resolvedUrl);
	importedJsFiles[resolvedUrl] = scriptPromise;
	document.head.appendChild(scriptTag);
	
	return scriptPromise;
}

let importedCssFiles = {};

export function importCss(cssImportList, hostComponentRelativePath) {
	if (!cssImportList) {
		return Promise.reject();
	}
	if(!Array.isArray(cssImportList)) {
		cssImportList = [cssImportList];
	}
	return new Promise(_doImportCss.bind(null, cssImportList, hostComponentRelativePath));
}

function _doImportCss(cssImportList, hostComponentRelativePath, resolve, reject, index) {
	if (!index) {
		index = 0;
	}
	if (index >= cssImportList.length) {
		resolve();
		return;
	}
	const cssImport = cssImportList[index];

	_createCssTag(cssImport, hostComponentRelativePath)
		.then(() => { _doImportCss(cssImportList, hostComponentRelativePath, resolve, reject, ++index); })
		.catch((error) => { reject(error) });
}

function _createCssTag(cssImport, hostComponentRelativePath) {
	const importPath = cssImport.search(/http/) == -1 ? pathFromUrl(getModuleUrl(hostComponentRelativePath).url) : "";
	const fullPath = `${importPath}${cssImport}`;
	if (importedCssFiles[fullPath]) {
		return importedCssFiles[fullPath];
	}

	let promiseResolve, promiseReject;
	let cssPromise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});

	const linkTag = document.createElement("link");
	linkTag.onload = (event) => { promiseResolve(event); };
	linkTag.onerror = (event) => { promiseReject(event.error); };
	linkTag.setAttribute("rel", "stylesheet");
	linkTag.setAttribute("type", "text/css");
	linkTag.setAttribute("href", fullPath);
	importedCssFiles[fullPath] = cssPromise;
	document.head.appendChild(linkTag);

	return cssPromise;
}


export function addCustomStyle(customStyleSource) {
	const customStyleTag = document.createElement("template");
	customStyleTag.setAttribute("style", "display: none;");
	customStyleTag.innerHTML = customStyleSource;
	document.head.appendChild(customStyleTag.content);
}

export function addDomStyleModule(domModuleSource, hostComponentRelativePath) {
	const importPath = pathFromUrl(getModuleUrl(hostComponentRelativePath).url);
	const templateTag = document.createElement("template");
	templateTag.setAttribute("style", "display: none;");
	templateTag.innerHTML = resolveCss(domModuleSource, importPath);
	document.head.appendChild(templateTag.content);
}

export function addDomNodes(domNodesSource) {
	const domNodesContainer = document.createElement("template");
	domNodesContainer.setAttribute("style", "display: none;");
	domNodesContainer.innerHTML = domNodesSource;
	document.head.appendChild(domNodesContainer.content);
}

export function formatMarkupForDemo(source) {
	let index = source.innerHTML.search("<template");
	return source.innerHTML.substring(0, index);
}
