/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import "../@polymer/polymer/polymer-legacy.js";

export const TriplatDsChangeBehavior = {

	listeners: {
		"triplat-ds-request-change-notification": "_onTriplatDsRequestChangeNotification"
	},

	created: function() {
		this._parentDsChange = null;
		this._interestedDescendants = [];
	},

	attached: function() {
		this.fire("triplat-ds-request-change-notification", null, {
			node: this,
			bubbles: true,
			cancelable: true
		});
	},

	detached: function() {
		if (this._parentDsChange) {
			this._parentDsChange.stopResizeNotificationsFor(this);
		}
	},

	notifyDsInfoChanged: function(dsInfo) {
		this._interestedDescendants.forEach(function(interestedDescendant) {
			interestedDescendant.notifyDsInfoChanged(dsInfo);
		});

		this.fire("triplat-ds-change", dsInfo, {
			node: this,
			bubbles: false
		});
	},

	assignParentDsChange: function(parentDsChange) {
		this._parentDsChange = parentDsChange;
	},

	stopResizeNotificationsFor: function(target) {
		var index = this._interestedDescendants.indexOf(target);

		if (index > -1) {
			this._interestedDescendants.splice(index, 1);
		}
	},

	_onTriplatDsRequestChangeNotification: function(event) {
		var target = event.path ? event.path[0] : event.target;

		if (target === this) {
			return;
		}

		if (this._interestedDescendants.indexOf(target) === -1) {
			this._interestedDescendants.push(target);
		}

		target.assignParentDsChange(this);

		event.stopPropagation();
	}

};