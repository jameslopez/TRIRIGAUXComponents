/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

/**
 * `TriBlockBadgeBehavior` configures a badge to be shown on a navigation item.  Value shown on the badge can either be value explicitly set on `badge-number` or `badge-label` property, it cannot be from both.
 *
 * @polymerBehavior
 */
export const TriBlockBadgeBehavior = { 

	properties: {
		/**
		 * Gets or sets number to the badge.  Value is calculated if `badge-max-number` is available then the calculated value is set to the `badge-label` property as text (see `badge-max-number` for details).  If value is 0, badge will not be shown.
		 */
		badgeNumber: Number,
		/**
		 * Gets or sets the maximum number that can be shown on the badge.  If `badge-number` is greater than the `badge-max-number`, the number to show on the badge will only show up to the `badge-max-number` followed by a plus (+) sign.
		 * For example, if the `badge-number` is 100 with `badge-max-number` equals to 50, the badge number to show is 50+.
		 */
		badgeMaxNumber: Number,
		/**
		 * Gets or sets label as text to the badge.  Calculated value of the `badge-number`, if available, will also be set to this property as text.
		 */
		badgeLabel: String
	},

	observers: [
		'_handleBadgeNumber(badgeNumber)',
		'_handleBadgeMaxNumber(badgeMaxNumber)',
		'_handleBadgeNumberAndMaxNumberChanged(badgeNumber, badgeMaxNumber)',
		'_handleBadgeLabelChanged(badgeLabel)',
	],

	_handleBadgeNumber: function(badgeNumber) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._handleBadgeNumberAndMaxNumberChanged(badgeNumber, this.badgeMaxNumber);
	},

	_handleBadgeMaxNumber: function(badgeMaxNumber) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._handleBadgeNumberAndMaxNumberChanged(this.badgeNumber, badgeMaxNumber);
	},

	_handleBadgeNumberAndMaxNumberChanged: function(badgeNumber, badgeMaxNumber) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		var badgeLabel = badgeNumber + "";

		if (badgeMaxNumber && badgeNumber > badgeMaxNumber) {
			badgeLabel = badgeMaxNumber + "+";
		}

		if (badgeNumber > 0 && badgeLabel != "undefined") {
			this.set('badgeLabel', badgeLabel);
		} else if (badgeNumber < 1 && this.badgeLabel) {
			this.set('badgeLabel', undefined);
		}
	},

	_handleBadgeLabelChanged: function(badgeLabel) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		this._refreshBadge();
	},

	_refreshBadge: function() {
		/**
		 * Fired when badge properties are updated.  The element is passed to the event listener as item, like `e.detail.item`.
		 */
		this.fire("badge-update", {item: this});
	},

	/**
	 * Returns true if there is a valid value calculated or set to the badge label.
	 * @return {boolean}
	 */
	_hasBadgeLabel: function() {
		if (this.badgeLabel) {
			return true;
		} 
		return false;
	}
};