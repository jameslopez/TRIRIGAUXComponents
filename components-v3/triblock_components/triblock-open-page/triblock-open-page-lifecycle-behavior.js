export const TriBlockOpenPageLifecycleBehavior = {
	
	properties: {
		_componentPage: {
			type: Object,
			readOnly: true
		}    
	},
	
	doPageAttached: function(params){
		if(this._componentPage && this._componentPage._pageAttached){
			this._componentPage._pageAttached(params);
		}
	},
	
	doPageDetached: function(){
		if(this._componentPage && this._componentPage._pageDetached){
			this._componentPage._pageDetached();
		}
	},
	
	doPageLoaded: function(){
		if(this._componentPage && this._componentPage._pageLoaded){
			this._componentPage._pageLoaded();
		}
	},
};