/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2017-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { TriBlockAppLayoutBannerBehavior } from "./triblock-app-layout-banner-behavior.js";

/**
 * Implement `triblock-app-layout-banner-responsive-layout-behavior` on your main view element that that contains `triblock-app-layout`. This helps with configuration concerning the mobile page label and back button based on `triblock-responsive-layout` when `swtichView` and `smallScreenWidth` properties are true behaviors. 
 *
 * @polymerBehavior
 */
export const TriBlockAppLayoutBannerResponsiveLayoutBehaviorImpl = {
	/**
	* Sets `showMobileBackButton` and `mobilePageLabel` properties based on custom event
	* 
	* @param {object} responsiveLayoutView The `triblock-responsive-layout` currentView component (The component must have `hasBackButton` and `pageLabel` properties or attributes).
	*/
	manageBannerOnResponsiveLayoutChange: function(responsiveLayoutView) {
		if (responsiveLayoutView) {
			var hasBackButton = responsiveLayoutView.hasBackButton;
			hasBackButton = !hasBackButton ? responsiveLayoutView.hasAttribute("has-back-button") : hasBackButton;
			var pageLabel = responsiveLayoutView.pageLabel;
			pageLabel = !pageLabel ? responsiveLayoutView.getAttribute("page-label") : pageLabel;

			this.set('showMobileBackButton', hasBackButton);
			this.set('mobilePageLabel', pageLabel);
		}
	},

	/**
	* Navigates to the previous view
	* @param {object} responsiveLayoutView The `triblock-responsive-layout` currentView component (The component must have `hasBackButton` and `pageLabel` properties or attributes).
	*/
	navigateToPreviousView: function(responsiveLayoutView) {
	   if(responsiveLayoutView){
			//Get the backTo of the view
			var backTo = responsiveLayoutView.backTo;
			// For the component that doesn't have backTo property 
			backTo = !backTo ? responsiveLayoutView.getAttribute("back-to") : backTo;
			var responsiveLayout = responsiveLayoutView.parentNode;
			if (backTo){
				responsiveLayout.switchToViewId(backTo);
				this.manageBannerOnResponsiveLayoutChange(responsiveLayout.currentView);
			}else {
				this._handleNoPreviousView();
			}
	   }
	},

	/**
	  * Switches to a view based on the given `index`.
	  *
	  * @param {Object} responsiveLayout The `triblock-responsive-layout` component.  
	  * @param {Number} index The index of the child component to display. 
	  *
	  **/
	switchToViewIndex: function(responsiveLayout, index){
		if(responsiveLayout && index !== undefined){
			responsiveLayout.switchToViewIndex(index);
		}
	},

	/**
	  * Switches to a view based on the given `id`.  
	  * 
	  * @param {Object} responsiveLayout The `triblock-responsive-layout` component.  
	  * @param {string} viewId The `id` of the child component to display. 
	  *
	  **/
	switchToViewId: function(responsiveLayout, viewId){
		if(this.responsiveLayout && viewId){
			this.responsiveLayout.switchToViewId(viewId);
		}
	},

	_handleNoPreviousView: function(){
		console.warn("_handleNoPreviousView method should be implemented. The method allows applying the logic when there is no previous view.");
		return "";
	},
};

export const TriBlockAppLayoutBannerResponsiveLayoutBehavior = [ TriBlockAppLayoutBannerBehavior, TriBlockAppLayoutBannerResponsiveLayoutBehaviorImpl ];