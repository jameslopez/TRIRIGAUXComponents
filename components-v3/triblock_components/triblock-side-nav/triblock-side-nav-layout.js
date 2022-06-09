/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../@polymer/polymer/polymer-legacy.js";
import { TriBlockNavLayoutBehavior } from "../triblock-nav-behavior/triblock-nav-layout-behavior.js";

/*
`triblock-side-nav-layout` is a container component that positions the side navigation and the area for switching pages.  It determines the side navigation content if the `nav` attribute is present in one of its child components.  Similarly, it determines the area for pages if the `page` attribute is present in one of its child components.  The `nav` and `page` attributes should not be set to the same child component.  It applies the horizontal layout to position the `nav` and `page` components.  The `nav` component does not flex while the `page` does.
  
  Use the `triblock-side-nav` component as the `nav` component in the container.  See <a href="?active=triblock-side-nav">triblock-side-nav</a> for more information.
  
  Example:
	
	  <triblock-side-nav-layout>
		<triblock-side-nav nav>
		  <triblock-side-nav-item 
			iron-pages-id="myIronPages" 
			iron-page-id="activityPage" 
			icon="activity" 
			label="Activity"></triblock-side-nav-item>
		  <triblock-side-nav-item 
			iron-pages-id="myIronPages" 
			iron-page-id="adminPage" 
			icon="admin" 
			label="Admin"></triblock-side-nav-item>
		  <triblock-side-nav-item 
			iron-pages-id="myIronPages" 
			iron-page-id="applicationPage" 
			icon="applications" 
			label="Application"></triblock-side-nav-item>
		</triblock-side-nav>
		
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
	  </triblock-side-nav-layout>
  
	
  In the example above, the `nav` content appears first on the page, and is then followed by the `iron-pages` content which takes up the rest of the horizontal space.  
	
  
  ### Default `iron-pages-id`
  
  If you use the `triblock-side-nav` component as the `nav` content in this container, you do not need to specify the `iron-pages-id` in the individual `triblock-side-nav-item` but you will need to provide `id` to the `iron-pages` element.  The `iron-pages-id` property will be populated by the container after it is attached to the document.
  
  Example:
	
	  <triblock-side-nav-layout>
		<triblock-side-nav nav>
		  <triblock-side-nav-item 
			iron-page-id="activityPage" 
			icon="activity" 
			label="Activity"></triblock-side-nav-item>
		  <triblock-side-nav-item 
			iron-page-id="adminPage" 
			icon="admin" 
			label="Admin"></triblock-side-nav-item>
		  <triblock-side-nav-item 
			iron-page-id="applicationPage" 
			icon="applications" 
			label="Application"></triblock-side-nav-item>
		</triblock-side-nav>
		
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
	  </triblock-side-nav-layout>


  ### Styling
  
  The following custom properties and mixins are available for styling:

  Custom property | Description | Default
  ----------------|-------------|----------
  `--triblock-side-nav-layout` | Mixin applied to the container | `{}`
  `--triblock-side-nav-layout-nav` | Mixin applied to the navigation content marked as `nav` | `{}`
  `--triblock-side-nav-layout-page` | Mixin applied to the navigation content marked as `page` | `{}`

@demo demo/layout.html
*/
Polymer({
    _template: html`
		<style include="tristyles-theme">

			:host {
				@apply --layout-flex;
				@apply --layout-horizontal;

				@apply --triblock-side-nav-layout;
			};

			:host ::slotted([page]) {
				position: relative;
				@apply --layout-flex;

				@apply --triblock-side-nav-layout-page;	
			};

			:host ::slotted([nav]) {
				position: relative;

				@apply --triblock-side-nav-layout-nav;	
			};

		
		</style>

		<slot></slot>
	`,

    is: "triblock-side-nav-layout",
    behaviors: [TriBlockNavLayoutBehavior]
});