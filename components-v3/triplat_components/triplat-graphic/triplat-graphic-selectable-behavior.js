/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2016-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
/**
 * A behavior to support defining the selectable spaces in a graphic. 
 *
 * @polymerBehavior TriplatGraphicSelectableBehavior
 *
 */
export const TriplatGraphicSelectableBehavior = {
	
	properties: {
		/**
		 * An array of shapes that can be selected by the user.
		 * 
		 * The SVG document generated will add the attached ID to the spaces.
		 * This selected array must contain a value of _id that matches the 
		 * attached ID.
		 */
		selectable: {
			type: Array,
			notify: false,
			readOnly: false,
			observer: "_handleSelectableChanged"
		},

		_selectableById: {
			type: Object,
			notify: false,
			readOnly: true
		}
	},

	_handleSelectableChanged: function(selectable) {
		if(selectable){
			var selectableById = {};
			selectable.forEach(function(select) {
				selectableById[select._id] = select;
			});
			this._set_selectableById(selectableById);
		} else {
			this._set_selectableById(null);
		}
	}
};