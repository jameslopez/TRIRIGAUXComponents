/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import { TriBlockNavBehavior } from "../triblock-nav-behavior/triblock-nav-behavior.js";
import { TriBlockNavSelectBehavior } from "../triblock-nav-behavior/triblock-nav-select-behavior.js";
import { TriBlockBadgeBehavior } from "../triblock-badge-behavior/triblock-badge-behavior.js";

/*

`triblock-tab` is a component that can be used to define and configure the navigation items to be rendered inside the `triblock-tabs` component.

It can navigate to any combination or all of the following targets:
	<ul>
		<li>Routing page inside a `triplat-route-selector` component</li>
		<li>Page inside an `iron-pages` component</li>
		<li>Tap handler</li>
		<li>Event handler</li>
	</ul>

See <a href="?active=TriBlockNavBehavior">TriBlockNavBehavior</a> for more information about the properties to set for the different targets that a navigation item can be configured for.

	
### Route page

Use this component to navigate to one of the routing pages inside the `triplat-route-selector` component by setting the `triplat-route-id` and/or `triplat-route-params` properties.  Optionally, you can provide parameters to your target route.

	Example: 

		<triplat-route 
			id="activityRoute" 
			name="activityPage" 
			path="/activity"></triplat-route>
		<triplat-route 
			id="adminRoute" 
			name="adminPage" 
			path="/admin"></triplat-route>
		<triplat-route 
			id="applicationRoute" 
			name="applicationPage" 
			path="/application"></triplat-route>
		
		<triblock-tabs>
			<triblock-tab 
				triplat-route-id="activityRoute" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				triplat-route-id="adminRoute" 
				triplat-route-params="{{routeParams}}" 
				icon="admin" 
				slot="tab"
				label="Admin"></triblock-tab>
			<triblock-tab 
				triplat-route-id="applicationRoute" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>
		
		<triplat-route-selector>
			<iron-pages>
				<section route="activityPage" default-route>
					<span>Activity Page</span>
				</section>
				<section route="adminPage">
					<span>Administrator Page</span>
				</section>
				<section route="applicationPage">
					<span>Application Page</span>
				</section>
			</iron-pages>
		</triplat-route-selector> 


### Iron page

Use this component to navigate to one of the iron pages inside the `iron-pages` component by setting the `iron-pages-id` and `iron-page-id` properties.

	Default `id` example: 

		<triblock-tabs>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="activityPage" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="adminPage" 
				icon="admin" 
				slot="tab" 
				label="Admin"></triblock-tab>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="applicationPage" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>
		
		<iron-pages id="myIronPages">
			<section id="activityPage">
				<span>Activity Page</span>
			</section>
			<section id="adminPage">
				<span>Administrator Page</span>
			</section>
			<section id="applicationPage">
				<span>Application Page</span>
			</section>
		</iron-pages>

	`attr-for-selected` example: 

		<triblock-tabs>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="activityPage" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="adminPage" 
				slot="tab"
				icon="admin" label="Admin"></triblock-tab>
			<triblock-tab 
				iron-pages-id="myIronPages" 
				iron-page-id="applicationPage" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>
		
		<iron-pages id="myIronPages" attr-for-selected="page-id">
			<section page-id="activityPage">
				<span>Activity Page</span>
			</section>
			<section page-id="adminPage">
				<span>Administrator Page</span>
			</section>
			<section page-id="applicationPage">
				<span>Application Page</span>
			</section>
		</iron-pages>

### Tap handler

Use this component to invoke an action through a tap handler by setting the name of the handler to the `tap-handler` property.  The tapped `triblock-tab` will be passed to the handler. 

	Example: 

		<triblock-tabs>
			<triblock-tab 
				tap-handler="_myActivityHandler" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				tap-handler="_myAdminHandler" 
				icon="admin" 
				slot="tab"
				label="Admin"></triblock-tab>
			<triblock-tab 
				tap-handler="_myApplicationHandler" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>
		
		<script>
			_myActivityHandler: function(e) {
				alert("My activity tap handler is called! Navigation label: " + e.label);
			}, 
			_myAdminHandler: function(e) {
				alert("My admin tap handler is called! Navigation label: " + e.label);
			},
			_myApplicationHandler: function(e) {
				alert("My application tap handler is called! Navigation label: " + e.label);
			}
		</script>

### Event handler

Use this component to invoke an action by listening to a `navigate` event.  The `triblock-tab` element will be passed to the event listener and can be accessed as an item to the event, like `e.detail.item`. 

	Example: 

		<triblock-tabs>
			<triblock-tab 
				on-navigate="_myActivityListener" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				on-navigate="_myAdminListener" 
				icon="admin" 
				slot="tab"
				label="Admin"></triblock-tab>
			<triblock-tab 
				on-navigate="_myApplicationListener" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>
		
		<script>
			_myActivityListener: function(e) {
				alert("My activity event listener is called! Navigation label: " + 
						e.detail.item.label);
			},
			_myAdminListener: function(e) {
				alert("My admin event listener is called! Navigation label: " + 
						e.detail.item.label);
			},
			_myApplicationListener: function(e) {
				alert("My application event listener is called! Navigation label: " + 
						e.detail.item.label);
			}
		</script>


### Badges

You can configure the navigation item to have a badge shown by default at the upper right corner of the component.  You can show the badge as an icon or as a label which can be a text or a number.  	See <a href="?active=TriBlockBadgeBehavior">TriBlockBadgeBehavior</a> for more information about the properties to set for the different type of badges on the navigation item.

	Example: 

		<triblock-tabs>
			<triblock-tab 
				badge-number="5" 
				icon="activity" 
				slot="tab"
				label="Activity"></triblock-tab>
			<triblock-tab 
				badge-label="*" 
				icon="admin" 
				slot="tab"
				label="Admin"></triblock-tab>
			<triblock-tab 
				badge-icon="check" 
				icon="applications" 
				slot="tab"
				label="Application"></triblock-tab>
		</triblock-tabs>

See demo page of <a href="?active=triblock-tabs">triblock-tabs</a> for sample usages.	
	
*/
Polymer({

	is: "triblock-tab",

	behaviors: [TriBlockNavBehavior, 
				TriBlockBadgeBehavior,
				TriBlockNavSelectBehavior],

	properties: {
		/**
		 * Gets or sets the label of the navigation item.
		 */
		label: String,
		/**
		 * Gets or sets the name of the icon of the navigation item.  See demo pages of `triplat-icon` and `iron-icons` to see the list of available icons to use.
		 */
		icon: String,
		/**
		 * Gets or sets the name of the badgeIcon of the navigation item.  See demo pages of `triplat-icon` and `iron-icons` to see the list of available icons to use.
		 */
		badgeIcon: String
	},

	observers: [
		'_handleLabelBadgeIconChanged(label, badgeIcon)'
	],

	_handleLabelBadgeIconChanged: function(label, badgeIcon) {
		this._refreshTabs();
	},
	
	_refreshTabs: function() {
		/**
		 * Fired when navigation item's properties get updated.  The element is passed to the event listener as item, like `e.detail.item`.
		 *
		 * @event update
		 */
		this.fire("update", {item: this});
	}
});