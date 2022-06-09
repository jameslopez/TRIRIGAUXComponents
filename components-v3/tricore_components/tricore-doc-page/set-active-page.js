	/**
	 * Use this script if you want to link a doc page of another component used by the components in a folder.
	 * Example:
	 * 	<a href="?active=triblock-side-nav-item">triblock-side-nav-item</a>
	 * This does not work if the component is never used or referenced by any of the components in a folder.
	 * 
	 * To use this script (see triblock-side-nav.html for example of the usage):
	 *	- import this script to your document index.html 
	 *	- provide an id="doc"" to the iron-component-page component in your index.html
	 *  - call onLoadDocPage function in the <body> element of your document index.html like, onload="onLoadDocPage()"
	 */
	
	function onLoadDocPage(defaultPage) {
		document.getElementById('doc').active = getActivePage(defaultPage);
	}
	
	function getActivePage(defaultPage) {
	    var url = window.location.search.substring(1);
	    var params = url.split("&");
	    for (i=0;i<params.length;i++) {
	        var paramPair = params[i].split("=");
	        if (paramPair[0] == "active") {
	            return paramPair[1];
	        }
	    }
	    return defaultPage;
	}
		
