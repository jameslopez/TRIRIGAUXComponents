/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { TriBlockNavLayoutBehavior } from "../triblock-nav-behavior/triblock-nav-layout-behavior.js";

/*
`triblock-tab-nav-layout` is a container component that positions the tabs navigation and the area for switching pages.  It determines the tabs content if the `nav` attribute is present in one of its child components.  Similarly, it determines the area for pages if the `page` attribute is present in one of its child components.  The `nav` and `page` attributes should not be set to the same child component.  It applies the vertical layout to position the `nav` and `page` components.  The `nav` component does not flex while the `page` does.
  
  Use the `triblock-tabs` component as the `nav` component in the container.  See <a href="?active=triblock-tabs">triblock-tabs</a> for more information.
  
  Example:
	
	<triblock-tab-nav-layout>
	  <triblock-tabs nav>
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
	  
	   <iron-pages id="myIronPages" page>
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
	</triblock-tab-nav-layout>
  
	
  In the example above, the `nav` content appears on top of the `iron-pages` content which takes up the rest of the vertical space.  
	
  
  ### Default `iron-pages-id`
  
  If you use the `triblock-tabs` component as the `nav` content in this container, you do not need to specify the `iron-pages-id` in the individual `triblock-tab` but you will need to provide `id` to the `iron-pages` element.  The property will be populated by the container after it is attached to the document.
  
  Example:
	
	<triblock-tab-nav-layout>
	  <triblock-tabs nav>
		<triblock-tab 
		  iron-page-id="activityPage" 
			icon="activity"
			slot="tab"
		  label="Activity"></triblock-tab>
		<triblock-tab 
		  iron-page-id="adminPage" 
		  icon="admin" 
			slot="tab"
		  label="Admin"></triblock-tab>
		<triblock-tab 
		  iron-page-id="applicationPage" 
		  icon="applications" 
			slot="tab"
		  label="Application"></triblock-tab>
	  </triblock-tabs>
	  
	   <iron-pages id="myIronPages" page>
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
	</triblock-tab-nav-layout>


  ### Styling
  
  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-tab-nav-layout` | Mixin applied to the container | `{}`
  `--triblock-tab-nav-layout-nav` | Mixin applied to the navigation content marked as `nav` | `{}`
  `--triblock-tab-nav-layout-page` | Mixin applied to the navigation content marked as `page` | `{}`


@demo demo/layout.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				@apply --layout-flex;
				@apply --layout-vertical;

				@apply --triblock-tab-nav-layout;
			};

			:host ::slotted([page]) {
				position: relative;
				@apply --layout-flex;

				@apply --triblock-tab-nav-layout-page;
			};

			:host ::slotted([nav]) {
				position: relative;

				@apply --triblock-tab-nav-layout-nav;
			};

		
		</style>

		<slot></slot>
	`,

    is: "triblock-tab-nav-layout",
    behaviors: [TriBlockNavLayoutBehavior]
});