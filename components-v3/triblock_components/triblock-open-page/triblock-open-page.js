/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../triplat-search-input/triplat-search-input.js";
import "../@polymer/paper-button/paper-button.js";
import "../@polymer/iron-pages/iron-pages.js";
import "../@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../triplat-routing/triplat-routing.js";
import { TriBlockPageContainerBehavior } from "../triblock-page-container-behavior/triblock-page-container-behavior.js";
import { TriBlockOpenPageBehavior } from "./triblock-open-page-behavior.js";
import "./triblock-list.js";
import "./triblock-create.js";
import "./triblock-open.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 *	<div style="background-color:#FFFFCC">
 *  	<div style="padding:20px;">
 *			<b>Caution:</b> This component was upgraded to Polymer 3, but was not fully tested. Please use this component with caution.
 *		</div>
 *	</div>
 */

Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">


			main {
				@apply --main-container-class;
			}

			triplat-search-input {
				@apply --search-input-class;
			}

			paper-button {
				@apply --create-button-class;
			}
		
		</style>

		<triplat-route id="home" name="list" path="/"></triplat-route>
		<triplat-route name="create" id="createRoute" path="/new"></triplat-route>
		<triplat-route name="open" id="openRoute" path="/:_id" params="{{recordParams}}"></triplat-route>

		<main class="layout vertical flex">
			<triplat-route-selector>
				<iron-pages>
					<section class="layout vertical" route="list" default-route="" is="open-page-section" on-page-attached="_handleListPageAttached" on-page-detached="_handleListPageDetached" on-page-loaded="_handleListPageLoaded">
						<div class="layout horizontal">
							<triplat-search-input value="{{_currentFilter}}"></triplat-search-input>
							<paper-button on-tap="_handleCreateNew">{{_listBlock.createLabel}}</paper-button>
						</div>
						<slot id="triblock-list" name="list"></slot>
					</section>
					<section route="create" is="open-page-section" on-page-attached="_handleCreatePageAttached" on-page-detached="_handleCreatePageDetached" on-page-loaded="_handleCreatePageLoaded">
						<slot id="triblock-create" name="create"></slot>
					</section>
					<section route="open" is="open-page-section" on-page-attached="_handleOpenPageAttached" on-page-detached="_handleOpenPageDetached" on-page-loaded="_handleOpenPageLoaded">
						<slot id="triblock-open" name="open"></slot>
					</section>
				</iron-pages>
			</triplat-route-selector>
		</main>
	`,

    is: "triblock-open-page",

    properties: {
		_currentFilter: {
			type: String,
			readOnly: false
		},

		datasourceId: String,

		filteredData: {
			type: Object,
			readOnly: false,
			notify: true,
			computed: "_computedFilteredData(_unfilteredData, _currentFilter)",
		},
		
		_shouldPerformQuerying: {
			type: Boolean,
			readOnly: true,
			value: false
		},
		
		_datasource : {
			type: Object,
			readOnly: true,
			observer: "_datasourceChanged"
		},
		
		_unfilteredData: {
			type: Object,
			readOnly: true
		}
	},

    behaviors: [TriBlockOpenPageBehavior],

    attached: function(){
		var parentNode = dom(this).parentNode;
		this._set_datasource(dom(parentNode).querySelector("#"+this.datasourceId));
	},

    _datasourceChanged: function(changed){
		this.listen(changed, "ds-get-complete", "_handleGetComplete");
		this.listen(changed, "ds-create-complete", "_handleCreateComplete");
		this.listen(changed, "ds-delete-complete", "_handleDeleteComplete");
	},

    _handleGetComplete: function(){
		this._set_unfilteredData(this._datasource.data);
	},

    _handleCreateComplete: function(e){
		this._createBlock.createData = {};
		this.fire("create-complete");
	},

    _handleUpdateComplete: function(e){
		this.fire("update-complete");
	},

    _handleDeleteComplete: function(e){
		this.fire("delete-complete");
	},

    _computedFilteredData: function(unfilteredData, currentFilter) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (!currentFilter || currentFilter == "" || !unfilteredData[0]) {
			return unfilteredData;
		}

		var fields = Object.keys(unfilteredData[0]);
		var lowerFilter = currentFilter.toLowerCase();

		return unfilteredData.filter(function(data) {
			for(var field in fields){
				if (data[fields[field]] && data[fields[field]].toLowerCase().indexOf(lowerFilter) != -1) {
					return true;
				}
			}
			return false;
		});
	},

    _handleCreateNew: function(){
		this.$.createRoute.navigate();
	},

    _backButtonTap: function(){
		this.navigateHome();
	},

    navigateHome: function(){
		this.$.home.navigate();
	},

    _openButtonTap: function(recordId){
		this.$.openRoute.navigate({_id: recordId});
	}
});

export const OpenPageSection = Polymer({

	is: "open-page-section",
	extends: "section",
	behaviors: [TriBlockPageContainerBehavior],
	
	_pageAttached: function(params){
		this.fire("page-attached", {params: params});
	},
	
	_pageDetached: function(){
		this.fire("page-detached");
	},
	
	_pageLoaded: function(){
		this.fire("page-loaded");
	}

});