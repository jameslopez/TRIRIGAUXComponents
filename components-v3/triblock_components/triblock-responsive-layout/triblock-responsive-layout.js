/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import "../@polymer/iron-flex-layout/iron-flex-layout.js";
import { TriBlockViewResponsiveBehavior } from "./triblock-view-responsive-behavior.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";

/*
`triblock-responsive-layout` is a wrapper component that can be used to handle a responsive layout behavior. The component implements `TriBlockViewResponsiveBehavior` behavior. The child components are stacked to display vertically in a small screen width (`smallScreenWidth` is true) and horizontally in a large screen width (`smallScreenWidth` is false). The Boolean value of the `smallScreenWidth` property changes based on the width that is specified in the `smallScreenMaxWidth` property. 

  ```html
  <triblock-responsive-layout>
	<tricomp-left-column id="left-column"></tricomp-left-column>
	<tricomp-middle-column id="middle-column"></tricomp-middle-column>
	<tricomp-right-column id="right-column"></tricomp-right-column>
  </triblock-responsive-layout>
  ```
  Use the `stack-reverse` attribute to reverse the order of the stacked child components in a small screen width. 

  Sometimes, stacking the child components in a small screen width is not ideal. This component provides a switch view ability, `switchView`. When this property is set to true, all child components will be hidden except the child component `id` that has been assigned to the `currentViewId` property.

  ```html
  <triblock-responsive-layout switch-view current-view-id="middle-column">
	<tricomp-left-column id="left-column"></tricomp-left-column>
	<tricomp-middle-column id="middle-column"></tricomp-middle-column>
	<tricomp-right-column id="right-column"></tricomp-right-column>
  </triblock-responsive-layout>
  ```
  In the example above, this component only displays the `tricomp-middle-column` component in a small screen width.

  To switch to a different view (child component), use the `switchToViewId` method by passing the `id` value of the child component (for example, id="right-column")).

  @demo demo/index.html
*/
Polymer({
    _template: html`
		<style include="iron-flex iron-flex-alignment iron-flex-factors iron-positioning">

				
				:host{
					@apply --layout;
					@apply --layout-flex;
					@apply --layout-horizontal;
				}

				:host ::slotted(*) {
					@apply --layout-flex;
				}

				:host([small-screen-width]){
					-ms-flex-direction: column !important;
					-webkit-flex-direction: column !important;
					flex-direction: column !important;
				}

				:host([stack-reverse][small-screen-width]){
					-ms-flex-direction: column-reverse !important;
					-webkit-flex-direction: column-reverse !important;
					flex-direction: column-reverse !important;
				}

				:host([small-screen-width][switch-view]) ::slotted(:not(.displayed-view)){
					display: none !important;
				}

			
		</style>

		<slot></slot>
	`,

    /**
	 * Fired when a switched view is displayed.
	 *
	 * @event responsive-layout-switch-view-display
	 * @param {{view:Object, index:Number}} detail -
	 *     currentView: the currentView object.
	 *     index: the index of the child component.
	 */


	is: "triblock-responsive-layout",

    behaviors: [TriBlockViewResponsiveBehavior],

    properties: {
	  /**
	   * If set to true, all the child components will be hidden when the `smallScreenWidth` property is true. A child component can be displayed by assigning the `currentViewId` property to one of the child components `id` (for example, current-view-id="left-column").
	   */
		switchView: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},

		/**
		* The child components.
		*/
		views: {
			type: Array,
			readOnly: true,
			notify: true,
			value: function() {
				return [];
			}
		},

		/**
		 * The child component `id` to display when the `switchView` and `smallScreenWidth` properties are true.
		 */
		currentViewId: {
			type: String,
			notify: true,
			value: null,
			observer: "_currentViewIdChanged"
		},

		/**
		 * Returns the element of the currently displayed view when `switchView` is true.
		 */
		currentView: {
			type: Object,
			readOnly: true,
			notify: true
		}
	},

    attached: function(){
		this._updateViews();
	},

    /**
	  * Switches to a view based on the given `id`.  
	  * 
	  * @param {string} viewId The `id` of the child component to display. 
	  *
	  **/
	switchToViewId: function(viewId){
		this.set('currentViewId', viewId);
		
	},

    _updateViews: function() {
	  var nodes = dom(this).queryDistributedElements('*');
	  this._setViews(nodes);
	},

    _currentViewIdChanged: function(e){
		var self = this;	    	
		if(this.views.length === 0) this._updateViews();
		Array.prototype.forEach.call(this.views, function(view){
			var isDisplayedView = (view.id === e) ? true : false;
			self.toggleClass('displayed-view', isDisplayedView, view);
			if(isDisplayedView && self.smallScreenWidth) {
				self._setCurrentView(view);
				self.fire("responsive-layout-switch-view-display", {currentView: view, index: self.views.indexOf(view)});
			}
		});
	},

    /**
	  * Switches to a view based on the given `index`.
	  * 
	  * @param {Number} index The index of the child component to display. 
	  *
	  **/
	switchToViewIndex: function(index){
		this.set('currentViewId', this.views[index].id);
	}
});