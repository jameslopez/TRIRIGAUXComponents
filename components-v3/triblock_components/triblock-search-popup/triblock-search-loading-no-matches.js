/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/paper-spinner/paper-spinner.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
`triblock-search-loading-no-matches` displays the loading and "no-matches" items from the `triblock-search` component.
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">

				:host {
					flex: 1;
				}

				.box-no-matches,
				.box-no-results {
					font-style: italic;
					padding: 15px;
				}

				.box-loading {
					@apply --layout-horizontal;
					@apply --layout-center-center;
					flex: 1;
					padding: 5px;
				}
			
		</style>

		<div class="box-no-matches" hidden="[[_hideNoMatches(noMatches, loading)]]">No matches</div>
		<div class="box-no-results" hidden="[[_hideNoResults(noResults, loading)]]">[[noResultsText]]</div>
		<div class="box-loading" hidden="[[!loading]]"><paper-spinner active=""></paper-spinner></div>
	`,

    is: "triblock-search-loading-no-matches",

    properties: {
		// Loading from the data source.
		loading: {
			type: Boolean,
			value: false
		},

		// True when the "no matches" container is displayed.
		noMatches: {
			type: Boolean,
			value: true
		},

		// True when the "no results" container is displayed.
		noResults: {
			type: Boolean,
			value: false
		},

		// Text displayed inside the "no results" container.
		noResultsText: String
	},

    _hideNoMatches: function(noMatches, loading) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return loading || !noMatches;
	},

    _hideNoResults: function(noResults, loading) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		return loading || !noResults;
	}
});