/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
export const TriplatDsSearchLoadingBehavior = {
	
	properties: {
		_loadingDots: {
			type: Number,
			value: 0
		},
		
		_loadingResultsText: {
			type: String,
			readOnly: true
		},
		
		_loadingResultsStr: {
			type: String,
			readOnly: true
		},
		
		_noResultsStr: {
			type: String,
			readOnly: true
		},
		
		_loadingDotsText: {
			type: String,
			readOnly: true
		}
	},
	
	ready: function(){
		var __dictionary__loading_results =  "Loading results";
		this._set_loadingResultsStr(__dictionary__loading_results);
		var __dictionary__no_results =  "No results were found.";
		this._set_noResultsStr(__dictionary__no_results);
		
		this._set_loadingResultsText(this._loadingResultsStr);
	},
	
	_doLoadingText: function(){
		this._loadingDots = (this._loadingDots == 3) ? 0 : this._loadingDots + 1;
		var loadingDotsText = "";
		for(var i=0; i<=this._loadingDots; i++){
			loadingDotsText += ".";
		}
		this._set_loadingDotsText(loadingDotsText);
		this._delayLoading = this.async(this._doLoadingText, 500);
	},
	
	_startLoading: function(){
		this._set_loadingResultsText(this._loadingResultsStr);
		if (this._delayLoading != undefined && this._delayLoading != null) {
			this.cancelAsync(this._delayLoading);
		}
		this._delayLoading = this.async(this._doLoadingText, 500);
	},
	
	_showNoResults: function(){
		this._set_loadingResultsText(this._noResultsStr);
		this._set_loadingDotsText("");
		this._loadingDots = 0;
		this._set_dataLoaded(false);
	},
	
	_cancelLoading: function(){
		this._loadingDots = 0;
		this.cancelAsync(this._delayLoading);
	}
};