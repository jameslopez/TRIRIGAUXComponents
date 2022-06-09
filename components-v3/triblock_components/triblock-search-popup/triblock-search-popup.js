/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../triblock-popup/triblock-popup.js";
import { TriBlockViewResponsiveBehavior } from "../triblock-responsive-layout/triblock-view-responsive-behavior.js";
import "./triblock-search.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/*
`triblock-search-popup` is similar to a `triblock-popup` with a search component.

Example:
```html
<triblock-search-popup>
</triblock-search-popup>
```

The `title` property can be used to set a title for the popup:
```html
<triblock-search-popup title="Title">
</triblock-search-popup>
```

The `placeholder` property can be used to set a placeholder message for the input field:
```html
<triblock-search-popup placeholder="Placeholder">
</triblock-search-popup>
```

The `scroller` property can be used to set a scrollable container for a data source. It must be used with a two-way binding:
```html
<triblock-search-popup scroller="{{scroller}}">
</triblock-search-popup>
```

The `searchValue` property is the value of the input field that will be used to filter a data source. It must be used with a two-way binding:
```html
<triblock-search-popup search-value="{{value}}">
</triblock-search-popup>
```

The `searchResult` property is the list of results after a data source is filtered:
```html
<triblock-search-popup search-result="[[result]]">
</triblock-search-popup>
```

The `loading` property can be used to display a loading indicator in the list of results:
```html
<triblock-search-popup loading="[[loading]]">
</triblock-search-popup>
```

<div style="background-color:#FFFFCC">
  <div style="padding:20px;">
    <b>Info:</b> The children within triblock-search cannot be styled from the the host. They should be styled using the style attribute if it’s an element or within the component itself.
  </div>
</div>

### Accessibility

The user can press keyboard keys to interact with the list of results:
- Press the `Down Arrow` key to unfocus the search input field and navigate to the next item.
- Press the `Up Arrow` key to navigate to the previous item.
- Press the `Tab` key to focus on the search input field.


### Events

Event Name | Description
-----------|------------
`search-item-selected` | Fired when an item in the list of results is selected.


### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--search-popup-small-screen-width` | Mixin applied to the popup for small screen widths (such as smartphones) | `{}`
`--search-popup-not-small-screen-width` | Mixin applied to the popup for medium and larger screen widths (such as tablets and desktop monitors) | `{}`
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning tristyles-theme">

				triblock-popup {
					@apply --layout-vertical;
				}
				triblock-popup[small-screen-width] {
					padding: 10px;

					@apply --search-popup-small-screen-width;
				}
				triblock-popup:not([small-screen-width])  {
					top: 15%;
					bottom: 15%;
					width: 50%;

					@apply --search-popup-not-small-screen-width;
				}
				triblock-popup[small-screen-height]:not([small-screen-width]) {
					top: 5%;
					bottom: 5%;
					padding-top: 5px;
					padding-bottom: 5px;
				}
				triblock-popup[medium-screen-width] {
					width: 70%;
				}

				.title {
					font-weight: lighter;
				}
			
		</style>

		<triblock-popup id="searchPopup" with-backdrop="" title="[[_computeTitle(title)]]" small-screen-max-height="300px" on-iron-overlay-opened="_onPopupOpen" aria-label\$="[[_computeTitle(title)]]">

			<span class="title tri-h2" hidden\$="[[smallScreen]]">[[_computeTitle(title)]]</span>

			<triblock-search id="searchComponent" placeholder="[[placeholder]]" search-value="{{searchValue}}" scroller="{{scroller}}" search-result="[[searchResult]]" loading="[[loading]]" on-item-selected="_selectItem" row-aria-label-callback="[[rowAriaLabelCallback]]">
				<slot></slot>
			</triblock-search>

		</triblock-popup>
	`,

    is: "triblock-search-popup",

    behaviors: [
		TriBlockViewResponsiveBehavior
	],

    properties: {
		// Title message of the popup.
		title: {
			type: String,
			reflectToAttribute: true,
			value: null
		},

		// Placeholder message for the search input field.
		placeholder: {
			type: String,
			value: null
		},

		// Scrollable container.
		scroller: {
			type: Object,
			notify: true
		},

		// Value of the search field. It will be used by an external data source to filter.
		searchValue: {
			type: String,
			notify: true
		},

		// Array of results from the search.
		searchResult: Array,

		// Loading from the data source.
		loading: {
			type: Boolean,
			value: false
		},

		// If true it will only provide the search, without the popup.
		searchOnly: {
			type: Boolean,
			value: false
		},

		/**
		 * Callback function used to determine the aria-label value of each row from the table of results.
		 */
		rowAriaLabelCallback: {
			type: Object
		}
	},

    listeners: {
		'iron-overlay-opened': '_popupOpen',
		'iron-overlay-closed': '_popupClose'
	},

    // Open triblock-search-popup.
	open: function() {
		this.$.searchPopup.lastNode = this.$.searchComponent.table;
		this.$.searchPopup.openPopup();
	},

    // Close triblock-search-popup.
	close: function() {
		this.$.searchPopup.closePopup();
	},

    // Clear search field.
	clearSearch: function() {
		this.$.searchComponent.clearSearch();
	},

    _computeTitle: function(title) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var __dictionary__title = "Locate a Building";
		return title ? title : __dictionary__title;
	},

    // Listen for popup open.
	_popupOpen: function() {
		this.clearSearch();
	},

    // Listen for popup close.
	_popupClose: function() {
		this.clearSearch();
	},

    // Handle select item from the list.
	_selectItem: function(e) {
		e.stopPropagation();

		// Selected Data
		var selectedData = e.detail;

		// Fire the selected item
		this.fire("search-item-selected", selectedData);

		// Close triblock-popup
		if (!this.searchOnly) {
			this.close();
		}
	},

    // Focus on the search field when the popup opened.
	_onPopupOpen: function() {
		this.$.searchComponent.focusSearchField();
	}
});