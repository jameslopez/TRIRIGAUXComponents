/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

export const TriplatDsSearchDatasourceBehavior = {
	
	properties: {

		currentOperator: String,

		_queryPagesLookup: {
			type: Object,
			value: {}
		},
		
		_queryFilters: {
			type: Array,
			value: []
		},
		
		_datasources: {
			type: Array,
			value: []
		},
		
		_disableDatasources: {
			type: Boolean, 
			value: true,
			readOnly: true
		},
		
		_dsDoneController: {
			type: Number,
			value: 0
		},
		
		_dataLoaded: {
			type: Boolean,
			value: false,
			readOnly: true
		},
		
	},
	
	listeners: { "ds-get-complete" : "_onDsGetComplete" },
	
	_createDatasources: function(columns, contexts, filters){
		
		this._queryPagesLookup = {};
		this._queryFilters = [];
		this._datasources = [];
		
		columns.forEach(function(column){
		
			var datasource = document.createElement("triplat-ds");
			datasource.name = this.aliases[column].datasource;
			datasource.disable = true;
			contexts.forEach(function(context){
				dom(datasource)
					.appendChild(this._createContext(context.datasource, context.contextId));             
			}, this);
			
			var query = document.createElement("triplat-query");
			query.searchColumn = column;
			filters.forEach(function(filter){
				dom(query).appendChild(this._createQueryChild(filter));             
			}, this);
			
			var queryPage = document.createElement("triplat-query-page");
			queryPage.size = this.maxHeaderChildren;
			dom(query).appendChild(queryPage);
			this._queryPagesLookup[column] = queryPage;

			var queryFilter = document.createElement("triplat-query-filter");
			queryFilter.name = column;
			queryFilter.operator = this.currentOperator;
			this._queryFilters.push(queryFilter);
			if(filters.length > 0){
				var queryAnd = document.createElement("triplat-query-and");
				dom(query).appendChild(queryAnd);
			}
			dom(query).appendChild(queryFilter);
			
			var querySort = document.createElement("triplat-query-sort");
			querySort.name = column;
			dom(query).appendChild(querySort);
			
			dom(datasource).appendChild(query);
			dom(this.root).appendChild(datasource);
			this._datasources.push(datasource);
			
			this.fire("triplat-ds-search-datasource-create", column);
			
		}, this);
	},
	
	_createQueryChild: function(filter){
		var queryFilter = document.createElement(filter.tagName);
		if(!filter.name){
			return queryFilter;
		}
		queryFilter.name = filter.name;
		queryFilter.operator = filter.operator;
		queryFilter.value = filter.value;
		if(filter.ignoreIfBlank){
			queryFilter.ignoreIfBlank = filter.ignoreIfBlank;
		}
		if(filter.required){
			queryFilter.required = filter.required;
		}
		return queryFilter;
	},
	
	_onDsGetComplete: function(e){
		this._dsDoneController++;
		var datasource = e.composedPath()[0];
		
		var index = this._datasources.indexOf(datasource);
		var columnName = this._queryFilters[index].name;
		
		var resultsForColumn = [];
		datasource.data.forEach(function(result){
			var value = result[columnName];
			var checked = this._selectedLookup[columnName+"_"+value] ? true : false;
			resultsForColumn.push({column: columnName, value: value, checked: checked});
		}, this);
		
		if(resultsForColumn.length > 0){
			var list = { name: columnName,
						 alias: this.aliases[columnName].alias,
						 total: datasource.queryTotalSize, 
						 children: resultsForColumn };
			this.fire("triplat-ds-search-single-datasource-complete", 
					  { results: list });
		}
		
		if(this._dsDoneController >= this._queryFilters.length){
			this._set_dataLoaded(true);
			this.fire("triplat-ds-search-datasource-complete");
		}
	},
	
	_enableDss: function(){
		this._datasources.forEach(function(datasource){
			datasource.disable = false;
		});
		this._set_disableDatasources(false);
	},
	
	_disableDss: function(){
		this._datasources.forEach(function(datasource){
			datasource.disable = true;
		});
		this._set_disableDatasources(true);
	},
	
	_startDataLoading: function(value){
		this._disableDss();
		this._set_dataLoaded(false);
		this._dsDoneController = 0;
		this._queryFilters.forEach(function(filter){
			filter.value = value;  
		});
		if(this._disableDatasources){
			this.async(this._enableDss, this._intDelay);
		}
	},
	
	_changeQueryPageSize: function(header, size, loaded){
		this._set_dataLoaded(loaded);
		this._queryPagesLookup[header].size = size;
	},
	
	_goToNextPage: function(header){
		this._queryPagesLookup[header].next();
	},
	
	addContext: function(name, contextId){
		this._disableDss();
		this._datasources.forEach(function(datasource){
			var newContext = true;
			var currentContexts = Array.from(dom(datasource).querySelectorAll("triplat-ds-context"));
			currentContexts.forEach(function(context){
				if(context.name == name){
					context.contextId = contextId;
					newContext = false;
				}
			});
			if(newContext) {
				dom(datasource).appendChild(this._createContext(name, contextId));
			}
		});
	},
	
	_createContext: function(name, contextId){
		var dsContext = document.createElement("triplat-ds-context");
		dsContext.name = name;
		dsContext.contextId = contextId;
		return dsContext;
	}
};