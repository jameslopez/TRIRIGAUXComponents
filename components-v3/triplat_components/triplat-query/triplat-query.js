/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2015-2019 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/
import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";

import { html } from "../@polymer/polymer/lib/utils/html-tag.js";
import "../@polymer/polymer/polymer-legacy.js";
import "./triplat-query-page.js";
import "./triplat-query-scroll-page.js";
import "./triplat-query-sort.js";
import "./triplat-query-resource-calendar.js";
import "./triplat-query-work-planner.js";
import "./triplat-query-reserve-context.js";
import "./triplat-query-filter.js";
import { dom } from "../@polymer/polymer/lib/legacy/polymer.dom.js";
import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

export const TriplatQuery = {

	getFieldValueByName: function(record, fieldName) {
		var fieldNameParts = fieldName.split(".");
		var currentValue = record;
		for (var i = 0; i < fieldNameParts.length; i++) {
			if (currentValue == null || currentValue == undefined) {
				return null;
			}
			var fieldNamePart = fieldNameParts[i];
			currentValue = currentValue[fieldNamePart];
		}
		return currentValue;
	},

	castValue: function(value, type) {
		var result = value;
		if (type !== undefined && type != null && value !== undefined && value != null) {
			switch (type) {
				case "DATE":
					var date = new Date(value.substring(0,10));
					if (!isNaN(date)) {
						result = date.getTime();
					}
					break;
				case "DATE_TIME":
					var dateTime = new Date(value);
					if (!isNaN(dateTime)) {
						result = dateTime.getTime();
					}
					break;
				case "STRING_WITH_ID":
					result = typeof value === 'object' ? value.value : value;
					break;
			}
		}	
		return result;
	}

};

TriplatQuery.FilterToken = function() {
	this.leaf = true;
	this.precedence = 4;
};

TriplatQuery.FilterToken.prototype.execute = function(record) {
	console.warn("woops, token needs implementing");
};

TriplatQuery.RecordValue = function(fieldName) {
	TriplatQuery.FilterToken.call(this);
	this.fieldName = fieldName;
};

TriplatQuery.RecordValue.prototype = Object.create(TriplatQuery.FilterToken.prototype);
TriplatQuery.RecordValue.constructor = TriplatQuery.RecordValue;

TriplatQuery.RecordValue.prototype.execute = function(record, type) {
	var value = TriplatQuery.getFieldValueByName(record, this.fieldName);
	return TriplatQuery.castValue(value, type);
};

TriplatQuery.LiteralValue = function(value) {
	TriplatQuery.FilterToken.call(this);
	this.value = value;
};

TriplatQuery.LiteralValue.prototype = Object.create(TriplatQuery.FilterToken.prototype);
TriplatQuery.LiteralValue.constructor = TriplatQuery.LiteralValue;

TriplatQuery.LiteralValue.prototype.execute = function(record, type) {
	return TriplatQuery.castValue(this.value, type);
};

TriplatQuery.Operator = function() {
	TriplatQuery.FilterToken.call(this);
	this.leaf = false;
	this.precedence = 3;
};

TriplatQuery.Operator.prototype = Object.create(TriplatQuery.FilterToken.prototype);
TriplatQuery.Operator.constructor = TriplatQuery.Operator;

TriplatQuery.Operator.prototype.execute = function(record) {
	console.warn("woops, operator needs implementing");
};

TriplatQuery.OrOperator = function() {
	TriplatQuery.Operator.call(this);
	this.precedence = 1;
};

TriplatQuery.OrOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.OrOperator.constructor = TriplatQuery.OrOperator;

TriplatQuery.OrOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record);
	if (leftSideValue == null) { 
		return false; // we want to ignore the filter, so when the parent is an OR, that means treating the filter as FALSE
	}
	if (leftSideValue == true) {
		return true;
	}
	var rightSideValue = this.rightSideOperator.execute(record);
	if (rightSideValue == null) { 
		return false; // we want to ignore the filter, so when the parent is an OR, that means treating the filter as FALSE
	}
	if (rightSideValue == true) {
		return true;
	} else {
		return false;
	}
};

TriplatQuery.AndOperator = function() {
	TriplatQuery.Operator.call(this);
	this.precedence = 2;
};

TriplatQuery.AndOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.AndOperator.constructor = TriplatQuery.AndOperator;

TriplatQuery.AndOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record);
	if (leftSideValue == null) { 
		return true; // we want to ignore the filter, so when the parent is an AND, that means treating the filter as TRUE
	}
	if (leftSideValue == false) {
		return false;
	}
	var rightSideValue = this.rightSideOperator.execute(record);
	if (rightSideValue == null) { 
		return true; // we want to ignore the filter, so when the parent is an AND, that means treating the filter as TRUE
	}
	if (rightSideValue == true) {
		return true;
	} else {
		return false;
	}
};

TriplatQuery.OpenParenthesisOperator = function() {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.OpenParenthesisOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.OpenParenthesisOperator.constructor = TriplatQuery.OpenParenthesisOperator;

TriplatQuery.OpenParenthesisOperator.prototype.execute = function(record) {
	//TBD
	return true;
};

TriplatQuery.CloseParenthesisOperator = function() {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.CloseParenthesisOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.CloseParenthesisOperator.constructor = TriplatQuery.CloseParenthesisOperator;

TriplatQuery.CloseParenthesisOperator.prototype.execute = function(record) {
	//TBD
	return true;
};

TriplatQuery.ContainsOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.ContainsOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.ContainsOperator.constructor = TriplatQuery.ContainsOperator;

TriplatQuery.ContainsOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type) || "";
	var rightSideValue = this.rightSideOperator.execute(record, this.type) || "";
	leftSideValue = typeof leftSideValue == "string" ? leftSideValue : leftSideValue + "";
	rightSideValue = typeof rightSideValue == "string" ? rightSideValue : rightSideValue + "";
	if (rightSideValue === "" && leftSideValue != "") {
		return false; // return false if the filter value is blank to match server side filtering
	}
	return leftSideValue.toLowerCase().indexOf(rightSideValue.toLowerCase()) >= 0;
};

TriplatQuery.EqualsOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.EqualsOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.EqualsOperator.constructor = TriplatQuery.EqualsOperator;

TriplatQuery.EqualsOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);
	if (this.ignoreIfBlank == true && rightSideValue === "") {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null && rightSideValue === "") {
		return true; // return true if the comparison is null = blank to match server side filtering
	}
	return leftSideValue == rightSideValue;
};

TriplatQuery.NotEqualsOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.NotEqualsOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.NotEqualsOperator.constructor = TriplatQuery.NotEqualsOperator;

TriplatQuery.NotEqualsOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);
	if (this.ignoreIfBlank == true && rightSideValue === "") {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null) { leftSideValue = ""; }
	if (rightSideValue == null) { rightSideValue = ""; }
	return leftSideValue != rightSideValue;
};

TriplatQuery.StartsWithOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.StartsWithOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.StartsWithOperator.constructor = TriplatQuery.StartsWithOperator;

TriplatQuery.StartsWithOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type) || "";
	var rightSideValue = this.rightSideOperator.execute(record, this.type) || "";
	leftSideValue = typeof leftSideValue == "string" ? leftSideValue : leftSideValue + "";
	rightSideValue = typeof rightSideValue == "string" ? rightSideValue : rightSideValue + "";
	if (rightSideValue === "" && leftSideValue != "") {
		return false; // return false if the filter value is blank to match server side filtering
	}
	return leftSideValue.toLowerCase().startsWith(rightSideValue.toLowerCase());
};

TriplatQuery.LessThanOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.LessThanOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.LessThanOperator.constructor = TriplatQuery.LessThanOperator;

TriplatQuery.LessThanOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);
	if ((this.type == "DATE" || this.type == "DATE_TIME") && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (this.ignoreIfBlank == true && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null) {
		return false; // return false if the value is null to match the server side filtering
	}
	if (typeof leftSideValue == "number" && typeof rightSideValue != "number") {
		rightSideValue = parseFloat(rightSideValue);
	}
	return leftSideValue < rightSideValue;
};

TriplatQuery.LessThanOrEqualsOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.LessThanOrEqualsOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.LessThanOrEqualsOperator.constructor = TriplatQuery.LessThanOrEqualsOperator;

TriplatQuery.LessThanOrEqualsOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);
	if ((this.type == "DATE" || this.type == "DATE_TIME") && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (this.ignoreIfBlank == true && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null && rightSideValue != null) {
		return false; // return false to match the server side filtering
	}
	if (typeof leftSideValue == "number" && typeof rightSideValue != "number") {
		rightSideValue = parseFloat(rightSideValue);
	}
	return leftSideValue <= rightSideValue;
};

TriplatQuery.GreaterThanOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.GreaterThanOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.GreaterThanOperator.constructor = TriplatQuery.GreaterThanOperator;

TriplatQuery.GreaterThanOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);
	if ((this.type == "DATE" || this.type == "DATE_TIME") && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (this.ignoreIfBlank == true && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null) {
		return false; // return false to match the server side filtering
	}
	if (typeof leftSideValue == "number" && typeof rightSideValue != "number") {
		rightSideValue = parseFloat(rightSideValue);
	}
	return leftSideValue > rightSideValue;
};

TriplatQuery.GreaterThanOrEqualsOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.GreaterThanOrEqualsOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.GreaterThanOrEqualsOperator.constructor = TriplatQuery.GreaterThanOrEqualsOperator;

TriplatQuery.GreaterThanOrEqualsOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, this.type);

	if ((this.type == "DATE" || this.type == "DATE_TIME") && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (this.ignoreIfBlank == true && ((rightSideValue == null || rightSideValue === ""))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (leftSideValue == null && rightSideValue != null) {
		return false; // return false to match the server side filtering
	}
	if (typeof leftSideValue == "number" && typeof rightSideValue != "number") {
		rightSideValue = parseFloat(rightSideValue);
	}
	return leftSideValue >= rightSideValue;
};

TriplatQuery.InOperator = function(precedence) {
	TriplatQuery.Operator.call(this);
};

TriplatQuery.InOperator.prototype = Object.create(TriplatQuery.Operator.prototype);
TriplatQuery.InOperator.constructor = TriplatQuery.InOperator;

TriplatQuery.InOperator.prototype.execute = function(record) {
	var leftSideValue = this.leftSideOperator.execute(record, this.type);
	var rightSideValue = this.rightSideOperator.execute(record, null);
	if (this.ignoreIfBlank == true && (rightSideValue == null || rightSideValue === "" || (Array.isArray(rightSideValue) && rightSideValue.length == 0))) {
		if (this.isRoot) {
			return true; // this is the only filter, so return TRUE to ignore it (matching server-side filtering)
		} else {
			return null; // null will cause the 'and' or 'or' operator to ignore this filter
		}
	}
	if (!Array.isArray(rightSideValue)) {
		return leftSideValue == TriplatQuery.castValue(rightSideValue, this.type);
	}
	for (let i = 0; i < rightSideValue.length; i++) {
		if (leftSideValue == TriplatQuery.castValue(rightSideValue[i], this.type)) {
			return true;
		}
	}
	return false;
};

TriplatQuery.Operators = {
	"or": TriplatQuery.OrOperator,
	"and": TriplatQuery.AndOperator,
	"open parenthesis": TriplatQuery.OpenParenthesisOperator,
	"close parenthesis": TriplatQuery.CloseParenthesisOperator,
	"contains": TriplatQuery.ContainsOperator,
	"equals": TriplatQuery.EqualsOperator,
	"not equals": TriplatQuery.NotEqualsOperator,
	"starts with": TriplatQuery.StartsWithOperator,
	"less than": TriplatQuery.LessThanOperator,
	"less than or equals": TriplatQuery.LessThanOrEqualsOperator,
	"greater than": TriplatQuery.GreaterThanOperator,
	"greater than or equals": TriplatQuery.GreaterThanOrEqualsOperator,
	"in": TriplatQuery.InOperator
};

TriplatQuery.Query = function(page, filters, sorts, calendar, searchColumn, workPlanner, reserveContext) {
	this.page = page;
	this.filters = filters;
	this.sorts = sorts;
	this.calendar = calendar;
	this.searchColumn = searchColumn;
	this.workPlanner = workPlanner;
	this.reserveContext = reserveContext
};

TriplatQuery.Query.prototype.buildOperationTree = function() {
	if (!this.operationTree) {
		var root = null;
		var parenthesisOpen = 0;
		for (var i = 0; i < this.filters.length; i++) {
			var filter = this.filters[i];
			var operatorType = TriplatQuery.Operators[filter.operator];
			var operator = new operatorType();
			if (filter.operator == "open parenthesis") {
				parenthesisOpen++;
				continue; // no additional processing is needed for the parenthesis
			}
			if (filter.operator == "close parenthesis") {
				parenthesisOpen--;
				continue; // no additional processing is needed for the parenthesis
			}
			if (parenthesisOpen > 0) {
				// if we are within parenthesis, then make this operator a higher precedence. 
				// use this formula to ensure within the  parenthesis the relatve precedence is honored
				operator.precedence = operator.precedence + (parenthesisOpen * 5);
			}

			if (filter.name) {
				operator.leftSideOperator = new TriplatQuery.RecordValue(filter.name);
				operator.rightSideOperator = new TriplatQuery.LiteralValue(filter.value);
				operator.type = filter.type;
				operator.isRoot = false;
				operator.ignoreIfBlank = filter.ignoreIfBlank;
			}

			if (root == null) {
				root = operator;
				continue;
			}

			var parentOperator = null;
			var visitingOperator = root;
			while (true) {
				if (!visitingOperator) {
					parentOperator.rightSideOperator = operator;
					break;
				}

				if (operator.precedence < visitingOperator.precedence) {
					if (parentOperator) {
						parentOperator.rightSideOperator = operator;
					} else {
						root = operator;
					}
					operator.leftSideOperator = visitingOperator;
					break;
				}

				parentOperator = visitingOperator;
				visitingOperator = visitingOperator.rightSideOperator;
			}
		}

		if (root != null) {
			root.isRoot = true;
		}
		this.operationTree = root;
	}

	return this.operationTree;
};

TriplatQuery.Query.prototype.filterRecords = function(records) {
	if (!records) {
		return null;
	}
	
	var operationTree = this.buildOperationTree();
	if (operationTree == null) {
		return records.slice();
	}

	return records.filter(function(record) {
		var result = operationTree.execute(record);
		return result;
	});
};

TriplatQuery.Query.prototype.sortRecords = function(records) {
	if (!records) {
		return;
	}

	var sorts = this.sorts;
	if (!sorts || sorts.length == 0) {
		return;
	}

	records.sort(function(a, b) {
		for (var i = 0; i < sorts.length; i++) {
			var sort = sorts[i];
			var x1 = sort.desc ? TriplatQuery.getFieldValueByName(b, sort.name) : TriplatQuery.getFieldValueByName(a, sort.name);
			var x2 = sort.desc ? TriplatQuery.getFieldValueByName(a, sort.name) : TriplatQuery.getFieldValueByName(b, sort.name);

			x1 = TriplatQuery.castValue(x1, sort.type);
			x2 = TriplatQuery.castValue(x2, sort.type);

			if (x1 != undefined && x1 != null && typeof x1 == "string") {
				x1 = x1.toLowerCase();
			} else if (x1 == null || x1 == undefined) {
				if (typeof x2 == "string") x1 = "";
				if (typeof x2 == "number") x1 = 0;	
			}

			if (x2 != undefined && x2 != null && typeof x2 == "string") {
				x2 = x2.toLowerCase();
			} else if (x2 == null || x2 == undefined){
				if (typeof x1 == "string") x2 = "";
				if (typeof x1 == "number") x2 = 0;
			}

			if (x1 < x2) {
				return -1;
			}
			if (x1 > x2) {
				return 1;
			}
		}
		return 0;
	});
};

TriplatQuery.Query.prototype.applyQuery = function(records) {
	if (!records) {
		return null;
	}
	var appliedRecords = this.filterRecords(records);
	this.sortRecords(appliedRecords);
	return appliedRecords
};

TriplatQuery.Query.prototype.areFiltersEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.filters && !that.filters) {
		// both filters are null
		return true;
	}

	if (!this.filters || !that.filters) {
		// only one is null
		return false;
	}

	if (this.filters.length != that.filters.length) {
		// the number of filters are different
		return false;
	}

	for (var i = 0; i < this.filters.length; i++) {
		var thisFilter = this.filters[i];
		var thatFilter = that.filters[i];

		if (thisFilter.name != thatFilter.name) {
			return false;
		}

		if (thisFilter.operator != thatFilter.operator) {
			return false;
		}

		if (thisFilter.value != thatFilter.value) {
			// TODO this works fine for string... could be an object in the future?
			if (Array.isArray(thisFilter) && Array.isArray(thatFilter) && !this.areArraysEqual(thisFilter, thatFilter)) {
				return false;
			}
			return false;
		}
	}

	return true;
};

TriplatQuery.Query.prototype.areArraysEqual = function(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
};

TriplatQuery.Query.prototype.areSortsEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.sorts && !that.sorts) {
		// both filters are null
		return true;
	}

	if (!this.sorts || !that.sorts) {
		// only one is null
		return false;
	}

	if (this.sorts.length != that.sorts.length) {
		// the number of sorts are different
		return false;
	}

	for (var i = 0; i < this.sorts.length; i++) {
		var thisSort = this.sorts[i];
		var thatSort = that.sorts[i];

		if (thisSort.name != thatSort.name) {
			return false;
		}

		if (thisSort.desc != thatSort.desc) {
			return false;
		}

		if (thisSort.type != thatSort.type) {
			return false;
		}
	}

	return true;
};

TriplatQuery.Query.prototype.isPageEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.page && !this.page) {
		return true;
	}

	if (!this.page || !that.page) {
		return false;
	}

	return this.page.from == that.page.from && this.page.size == that.page.size;
};

TriplatQuery.Query.prototype.isCalendarEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.calendar && !that.calendar) {
		return true;
	}

	if (!this.calendar || !that.calendar) {
		return false;
	}

	return this.calendar.startDate == that.calendar.startDate && 
		   this.calendar.endDate == that.calendar.endDate && 
		   this.calendar.id == that.calendar.id &&
		   this.calendar.name == that.calendar.name;
};

TriplatQuery.Query.prototype.isWorkPlannerEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.workPlanner && !that.workPlanner) {
		return true;
	}

	if (!this.workPlanner || !that.workPlanner) {
		return false;
	}
	
	let isContextIdEqual = false;
	if (Array.isArray(this.workPlanner.contextId) && Array.isArray(that.workPlanner.contextId)) {
		if (this.workPlanner.length != that.workPlanner.length) {
			isContextIdEqual = false;
		} else {
			isContextIdEqual = true;
			for (let i = 0; i < this.workPlanner.length && isContextIdEqual; ++i) {
				if (this.workPlanner[i] !== that.workPlanner[i]) {
					isContextIdEqual = false
				}
			}
		}
	} else {
		isContextIdEqual = this.workPlanner.contextId == that.workPlanner.contextId;
	}

	return this.workPlanner.startDate == that.workPlanner.startDate && 
		   this.workPlanner.endDate == that.workPlanner.endDate && 
		   isContextIdEqual;
};

TriplatQuery.Query.prototype.isReserveContextEqual = function(that) {
	if (!that || !(that instanceof TriplatQuery.Query)) {
		return false;
	}

	if (!this.reserveContext && !that.reserveContext) {
		return true;
	}

	if (!this.reserveContext || !that.reserveContext) {
		return false;
	}

	return this.reserveContext.startDate == that.reserveContext.startDate && 
		   this.reserveContext.endDate == that.reserveContext.endDate && 
		   this.reserveContext.resultsLimit == that.reserveContext.resultsLimit &&
		   this.reserveContext.availabilityThreshold == that.reserveContext.availabilityThreshold &&
		   JSON.stringify(this.reserveContext.recurrence) == JSON.stringify(that.reserveContext.recurrence);
};

/*
A component for paging, filtering and sorting triplat-ds component data.

There are two main ways that the filtering and sorting are performed: client and server. If there 
is a page specified, then the filtering and sorting are performed on the server. If there is no 
page specified or if triplat-ds is not the parent, then the filtering and sorting are performed on the client.

### Server query with traditional pagination

	 <triplat-ds id="peopleDs" name="people" data="{{people}}">
	   <triplat-query>
		 <triplat-query-page id="peopleDsPage" 
			 size="50" 
			 current-page="{{currentPage}}" 
			 total-pages="[[totalPages]]"></triplat-query-page>
		 <triplat-query-filter 
			 name="firstName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-sort name="firstName"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

	 <div id="peopleContent" class="people-content">
		<template id="itemsTemplate" is="dom-repeat" items="{{people}}">
		   <span style="padding-left: 5px;">{{item.name}}</span>
		</template>
	 </div>

	 ...

	 // go to the next page
	 this.$.peopleDsPage.next();

	 // go to the previous page
	 this.$.peopleDsPage.prev();

### Server query with scrolling pagination

	 <triplat-ds id="peopleDs" name="people" data="{{people}}">
	   <triplat-query>
		 <triplat-query-scroll-page 
			 scroller="{{scrollerPeople}}" 
			 size="50"></triplat-query-scroll-page>
		 <triplat-query-filter 
			 name="firstName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-sort name="firstName"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

	 <div id="peopleContent" class="people-scroll-content">
		<template id="itemsTemplate" is="dom-repeat" items="{{people}}">
		   <span style="padding-left: 5px;">{{item.name}}</span>
		</template>
	 </div>

	 ...
	 
	 attached : function() {
		//Bind the scroller to the element that has the scroll. 
		//As user scroll this element, the next data is retrieved.
		this.set('scrollerPeople', this.$.peopleContent);
	 }
	 
### Client query

Note that for client filtering/sorting, bind to filtered-data.

	 <triplat-ds id="peopleDs" name="people" filtered-data="{{people}}">
	   <triplat-query>
		 <triplat-query-filter 
			 name="firstName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-sort name="firstName"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

### Client query - complex filtering

Note that for client filtering/sorting, bind to filtered-data.

	 <triplat-ds id="peopleDs" name="people" filtered-data="{{people}}">
	   <triplat-query>
		 <triplat-query-filter 
			 name="org" 
			 operator="contains" 
			 value="development"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-and></triplat-query-and>
		 <triplat-query-filter 
			 name="firstName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-sort name="firstName"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

### Client query - complex filtering with parentheses

Note that for client filtering/sorting, bind to filtered-data.

This code represents the following expression:

org contains development AND (firstName contains {{searchValue}} OR lastName contains {{searchValue}})

	 <triplat-ds id="peopleDs" name="people" filtered-data="{{people}}">
	   <triplat-query>
		 <triplat-query-filter 
			 name="org" 
			 operator="contains" 
			 value="development"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-and></triplat-query-and>
		 <triplat-query-open-paren></triplat-query-open-paren>
		 <triplat-query-filter 
			 name="firstName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-or></triplat-query-or>
		 <triplat-query-filter 
			 name="lastName" 
			 operator="contains" 
			 value="{{searchValue}}"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-close-paren></triplat-query-close-paren>
		 <triplat-query-sort name="firstName"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

### Client query without a triplat-ds parent

Note that for filtering independent of triplat-ds, the 'data' is the input and 'filtered-data-out' is the output/filtered data.
'data' does not have to be a data source, it can be any array. 'triplat-query-page' and 'triplat-query-scroll-page' are ignored.

	<triplat-ds id="peopleDs" name="people" data="{{people}}"></triplat-ds>

	<triplat-query data="{{people}}" filtered-data-out="{{filteredResults}}">
	  <triplat-query-filter 
		name="firstName" 
		operator="contains" 
		value="{{searchValue}}"
		ignore-if-blank></triplat-query-filter>
	  <triplat-query-sort name="firstName"></triplat-query-sort>
	</triplat-query>

### Client query - specifying the data type 

Note that for client filtering/sorting, bind to filtered-data.
<div style="background-color:#FFFFCC">
	<div style="padding:20px;">
		<b>Important:</b> Note that for client filtering of date, datetime and String_With_ID fields, it is important to set the type of the values being compared. If the <b>type</b> property is not specified, the comparison will be held between String types and may return unexpected results.
	</div>
</div>

	 <triplat-ds id="assetDs" name="asset" filtered-data="{{asset}}">
	   <triplat-query>
		 <triplat-query-filter 
			 name="serviceDate" 
			 operator="greater than or equals" 
			 value="{{initialServiceDate}}"
			 type="DATE"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-and></triplat-query-and>
		 <triplat-query-filter 
			 name="assignedDateTime" 
			 operator="greater than" 
			 value="{{initialAssignedDateTime}}"
			 type="DATE_TIME"
			 ignore-if-blank></triplat-query-filter>
		 <triplat-query-filter 
			 name="status" 
			 operator="equals" 
			 value="Active"
			 type="STRING_WITH_ID"
			 ignore-if-blank></triplat-query-filter>
	   <triplat-query-sort name="firstName"></triplat-query-sort>
	   <triplat-query-sort name="status" type="STRING_WITH_ID"></triplat-query-sort>
	   </triplat-query>
	 </triplat-ds>

### Resource Calendar Query

See the triplat-query-resource-calendar documentation

### Work Planner Query

See the triplat-query-work-planner documentation

### Reserve Query

See the triplat-query-reserve-context documentation

### Filter Types (specified in the operator property)

Filter Name | Description
------------|------------
contains | Case insensitive contains filter.
equals | Equals filter.
not equals | Not equals filter.
starts with | Case insensitive starts with filter.
less than | Less than filter.
less than or equals | Less than or equals filter.
greater than | Greater than filter.
greater than or equals | Greater than or equals filter.
in | In filter that allows you to test whether a specified value matches any value in an array.
*/
Polymer({
    _template: html`
		<style>

			:host {
				display: none;
			}
		
		</style>

		<slot></slot>
	`,

    is: "triplat-query",

    /**
	 * Fired when the query changes. This event is deprecated, use triplat-query-changed.
	 *
	 * @event trplat-query-changed
	 */
	/**
	 * Fired when the query changes.
	 *
	 * @event triplat-query-changed
	 */
	properties: {

		/**
		 * An object that has all the query information. This includes the page, filters and 
		 * sorting.
		 */
		query: {
			type: Object,
			notify: true,
			readOnly: true
		},

		/**
		 * The amount of delay between the time (milliseconds) a filter value, sort order or 
		 * page is changed and the time the query changed event is fired.
		 * 
		 * This delay is needed so we can wait a bit after a change in case there are more 
		 * changes. For example as a user types a filter, we don't need to immediately send a 
		 * new request for each character typed.
		 */
		delay: {
			type: Number,
			notify: false,
			readOnly: false,
			value: 100
		},

		/**
		 * Whether this query is paginated or not.
		 */
		paginated: {
			type: Boolean,
			notify: true,
			readOnly: true
		},

		/**
		 * When triplat-query is not a child of triplat-ds, then this represents the data that 
		 * you want to be filtered.
		 */
		data: {
			type: Object,
			notify: true
		},

		/**
		 * When triplat-query is not a child of triplat-ds, then this represents the data that 
		 * has been filtered.
		 */ 
		filteredDataOut: {
			type: Object,
			notify: true,
			readOnly: true
		},

		/**
		 * If this is a paginated query, appendPage tells you whether the pagination should 
		 * append or not.
		 */
		appendPage: {
			type: Boolean,
			notify: true,
			readOnly: true
		},
		
		/**
		 * If this query is used for doing search by using the new search input, 
		 * this binding is needed. Make sure it is bound to the same property as
		 * the related "triplat-search-input".
		 */
		appendFilters: {
			type: Array
		},

		/**
		 * If this is server-side filter without pagination, this tells you the maximum number of entries returned.
		 */
		forceServerFilteringSize: {
			type: Number,
			value: 10000
		},
		
		/**
		 * If the query is used for a search, this tells the column name
		 */
		searchColumn: {
			type: String
		},

		_filterMeta: {
			type: Array,
			notify: false,
			readOnly: true
		},

		_query: {
			type: Object,
			notify: false,
			readOnly: true
		},

		_deferredHandleDataChange: {
			type: Boolean,
			value: false
		}, 
		
		_appendFilterIndexLookup: {
			type: Object,
			value: () => { return {};}
		}

	},

    get _intDelay() {
		return parseInt(this.delay);
	},

    listeners: {
		"triplat-query-page-change": "_pageChanged",
		"triplat-query-sort-changed": "_sortChanged",
		"triplat-query-resource-calendar-changed": "_resourceCalendarChanged",
		"triplat-query-work-planner-changed": "_workPlannerChanged",
		"triplat-query-reserve-context-changed": "_reserveContextChanged",
		"triplat-query-filter-change": "_filterChanged"
	},

    observers: [
		"_queryChanged(_query.*)",
		"_handleDataChange(data.*)",
		"_appendFiltersChanged(appendFilters.*)"
	],

    get _validPage() {
		if (!this._query.page) {
			return false;
		}
		var page = this._query.page;
		
		var from = parseInt(page.from);
		if (isNaN(from)) {
			return false;
		}
		
		var size = parseInt(page.size);
		if (isNaN(size)) {
			return false;
		}

		return true;
	},

    attached: function() {
		this.async(function() {
			this._init();
			if (this._deferredHandlDataChange) {
				this._handleDataChange();
				this._deferredHandlDataChange = false;
			}
		});
	},

    _init: function() {
		var query = {};
		var pageElement = dom(this).querySelector("triplat-query-page,triplat-query-scroll-page");
		var paginated = pageElement != undefined;
		if (pageElement) {
			if (pageElement.page) {
				query.page = pageElement.page;
			}
			if (pageElement.tagName == "TRIPLAT-QUERY-SCROLL-PAGE") {
				this._setAppendPage(true);
			} else {
				this._setAppendPage(false);
			}
		}

		var sortElements = dom(this).querySelectorAll("triplat-query-sort");
		query.sorts = new Array(sortElements.length);
		for (var i = 0; i < sortElements.length; i++) {
			var sortElement = sortElements[i];
			this._setIndex(sortElement, i);
			if (sortElement.sort) {
				query.sorts[i] = sortElement.sort;
			}
		}

		var filterElements = dom(this).querySelectorAll("triplat-query-filter,triplat-query-and,triplat-query-or,triplat-query-open-paren,triplat-query-close-paren");
		query.filters = new Array(filterElements.length);
		this._set_filterMeta([]);
		for (var i = 0; i < filterElements.length; i++) {
			var filterElement = filterElements[i];
			this._buildFilterMeta(filterElement, i, query);
		}

		var calendarElement = dom(this).querySelector("triplat-query-resource-calendar");
		if (calendarElement) {
			query.calendar = new Object;
			if (calendarElement.availability) {
				query.calendar = calendarElement.availability;
			}
		}
		
		var workPlannerElement = dom(this).querySelector("triplat-query-work-planner");
		if (workPlannerElement) {
			if (workPlannerElement.config) {
				query.workPlanner = workPlannerElement.config;
			}
		}
		
		var reserveContextElement = dom(this).querySelector("triplat-query-reserve-context");
		if (reserveContextElement) {
			if (reserveContextElement.config) {
				query.reserveContext = reserveContextElement.config;
			}
		}

		this._setPaginated(paginated);
		this._set_query(query);
	},

    _setIndex: function(element, index) {
		dom(element).setAttribute("triplat-query-index", index);
	},

    _getIndex: function(element) {
		return element.getAttribute("triplat-query-index");
	},

    _pageChanged: function(e) {
		e.stopPropagation();
		this.set("_query.page", e.detail);
	},

    _sortChanged: function(e) {
		e.stopPropagation();
		var index = this._getIndex(e.target);
		this.set("_query.sorts." + index, e.detail);
	},

    _resourceCalendarChanged: function(e) {
		e.stopPropagation();
		this.set("_query.calendar", e.detail);
	},
	
	_workPlannerChanged: function(e) {
		e.stopPropagation();
		this.set("_query.workPlanner", e.detail);
	},
	
	_reserveContextChanged: function(e) {
		e.stopPropagation();
		this.set("_query.reserveContext", e.detail);
	},

    _filterChanged: function(e) {
		e.stopPropagation();
		var index = this._getIndex(e.target);
		if (this._query != undefined && this._query.filters != undefined) {
			this.set("_query.filters." + index, e.detail);
		} 
	},

    _queryChanged: function(change) {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this._delayHandle != undefined && this._delayHandle != null) {
			this.cancelAsync(this._delayHandle);
		}

		if (change.path.indexOf("_query.filters") == 0) {
			this._delayHandle = this.async(this._doQueryChanged, this._intDelay);
		} else if (change.path.indexOf("_query.page") == 0 && this.appendPage == true) {
			// the page was updated and is in append page mode, so don't delay the update
			this._doQueryChanged();
		} else if (change.path.indexOf("_query.calendar") == 0) {
			this._doQueryChanged();
		} else if (change.path.indexOf("_query.workPlanner") == 0) {
			this._doQueryChanged();
		} else if (change.path.indexOf("_query.reserveContext") == 0) {
			this._doQueryChanged();
		} else {
			// TODO should we only delay for filter changes?
			// this._doQueryChanged();
			this._delayHandle = this.async(this._doQueryChanged, this._intDelay);
		}
	},

    _handleDataChange: function() {
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if (this.query == undefined || this.query == null) {
			this._deferredHandleDataChange = true;
			return;
		}

		if (this.data) {
			this._setFilteredDataOut(this.query.applyQuery(this.data));
		} else {
			this._setFilteredDataOut(null);
		}
	},

    _doQueryChanged: function() {
		var page = null;
		if (this.paginated) {
			if (!this._validPage) {
				return;
			}
			page = this._query.page;
		}

		var filters = [];
		for (var i = 0; i < this._query.filters.length; i++) {
			var filter = this._query.filters[i];

			if (filter == undefined) {
				//return;
				continue;
			}

			var meta = this._filterMeta[i];
			filters.push(filter);
			if (!meta.required && !meta.ignoreIfBlank) {
				continue;
			}
			
			var blankValue = false;
			if (filter.value === undefined || filter.value === "" || (filter.value != null && Array.isArray(filter.value) && filter.value.length == 0)) {
				blankValue = true;
			}

			if (meta.required && blankValue) {
				return;
			}

			if (meta.ignoreIfBlank && blankValue) {
				filters.pop(); // remove the filter

				// if this is the last filter, then remove the boolean operator to its left
				if (i == this._query.filters.length - 1) {
					filters.pop();
				} else {
					let nextFilter = this._query.filters[i+1];
					if (nextFilter.operator == "and" || nextFilter.operator == "or") i++; // skip the boolean operator that would have been to the right of this ignored filter
				}
			}
			
		}

		var filterIndex = 0;
		while (filterIndex < filters.length) {
			var currentFilter = filters[filterIndex];
			
			var nextFilter = null;
			if (filterIndex < filters.length -1) {
				nextFilter = filters[filterIndex+1];
			}
			
			// 1) cannot start with operator nor close parenthesis
			if (filterIndex == 0) {
				if (currentFilter.operator == "close parenthesis" || currentFilter.operator == "and" || currentFilter.operator == "or") {
					filters.splice(0,1); 
					continue; 
				}
			}

			// 2) cannot end with operator nor open parenthesis
			if (nextFilter == null) {
				if (currentFilter.operator == "or" || currentFilter.operator == "and" || currentFilter.operator == "open parenthesis") {
					filters.splice(filterIndex,1);
					filterIndex = 0;
					continue;
				} else {
					// must be a valid filter to end the statement, like close paren or a condition
					break;
				}
			}

			// 3) operator and must have condition following it
			if (currentFilter.operator == "and" || currentFilter.operator == "or") {
				if (nextFilter.operator == "and" || nextFilter.operator == "or" || nextFilter.operator == "close parenthesis") {
					filters.splice(filterIndex,1);
					filterIndex = 0;
					continue;
				}
			}

			// 4) close parenthesis must have operator following it
			if (currentFilter.operator == "close parenthesis") {
				if (nextFilter.operator == "and" || nextFilter.operator == "or") {
					// valid
				} else {
					filters.splice(filterIndex,1);
					filterIndex = 0;
					continue;
				}
			}
			if (currentFilter.operator == "open parenthesis") {
				if (nextFilter != null && (nextFilter.operator == "and" || nextFilter.operator == "or")) { 
					// remove open and the following boolean operator
					filters.splice(filterIndex,2);
					filterIndex = 0;
					continue;
				}
			}
			
			// 6) open parenthesis must have a non 'close parenthesis' operator right after it
			if (currentFilter.operator == "open parenthesis") {
				if (nextFilter != null && nextFilter.operator == "close parenthesis") { 
					// if there is no operator between the parenthesis then remove the parenthesis
					filters.splice(filterIndex,2);
					filterIndex = 0;
					continue;
				}
			}
			filterIndex++;
		}

		var sorts = this._query.sorts == null ? null : this._query.sorts.slice();

		if (page == undefined || page == null) {
			page = new Object;
			page.from = 0;
			page.size = this.forceServerFilteringSize;
		}

		var calendar = this._query.calendar == null ? null : this._query.calendar;
		var workPlanner = this._query.workPlanner == null ? null : this._query.workPlanner;
		var reserveContext = this._query.reserveContext == null ? null : this._query.reserveContext;

		var query = new TriplatQuery.Query(page, filters, sorts, calendar, this.searchColumn, workPlanner, reserveContext);

		if (this.query 
				&& this.query.page 
				&& this.query.page.from != 0 
				&& (!this.query.areFiltersEqual(query) || !this.query.areSortsEqual(query))) {
			var pageElement = dom(this).querySelector("triplat-query-page,triplat-query-scroll-page");
			this.async(function() {
				pageElement.reset();
			});
			this._setQuery(query);
		} else {
			this._setQuery(query);
			if (this.data) {
				this._setFilteredDataOut(this.query.applyQuery(this.data));
			} else {
				this.fire("trplat-query-changed", {query: query, append: this.appendPage, paginated: this.paginated});
				this.fire("triplat-query-changed", {query: query, append: this.appendPage, paginated: this.paginated});
			}
		}
	},

    _appendFiltersChanged: function(change){
	    if (!assertParametersAreDefined(arguments)) {
		    return;
		}

		if(change.path == "appendFilters.splices"){
			// Should clone for assignment later
			var queryJson = JSON.parse(JSON.stringify(this.query));
			var pageElement = this.queryEffectiveChildren("triplat-query-page,triplat-query-scroll-page");
			if(pageElement){
				this.async(function() {
					pageElement.reset();
				});
			}
			var query = new TriplatQuery.Query(queryJson.page, 
											   queryJson.filters, 
											   queryJson.sorts, 
											   queryJson.calendar,
											   queryJson.searchColumn,
											   queryJson.workPlanner,
											   queryJson.reserveContext);
			var indexSplice = change.value.indexSplices[0];
			var removed = indexSplice.removed;
			if(removed.length > 1){
				this._removeFilters(query);   
			}
			else if(removed.length == 1) {
				var lookup = (removed[0].isUniversal) ? "_universalFilter" : removed[0].name;
				this._removeFilter(lookup, query);
			}
			for (var i = 0; i < indexSplice.addedCount; i++) {
				var added = indexSplice.object[indexSplice.index + i];
				var currentIndex = query.filters.length;
				if(added.isUniversal){
					this._addUniversalFilter(added.filters, currentIndex, query);
				} else {
					this._appendFilterIndexLookup[added.name] = { start: currentIndex, elemStart: currentIndex};
					if(currentIndex > 0){
						var filterElementName = (added.appendWithAnd) ? "triplat-query-and" : "triplat-query-or";
						this._addFilterElement(filterElementName, currentIndex, query);
						currentIndex++;
					}
					this._addFilterElement("triplat-query-filter", currentIndex, query, added);
				}
			}
			this._set_query(query);
			this._setQuery(query);
		}
	},

    _addUniversalFilter: function(filters, currentIndex, query){
		this._appendFilterIndexLookup["_universalFilter"] = { start: currentIndex, elemStart: currentIndex};
		if(currentIndex > 0){
			this._addFilterElement("triplat-query-and", currentIndex, query);
			currentIndex++;
		}
		this._addFilterElement("triplat-query-open-paren", currentIndex, query);
		currentIndex++;
		for(var i = 0; i < filters.length; i++){
			var filter = filters[i];
			if(!filter.appendWithAnd){
				this._addFilterElement("triplat-query-or", currentIndex, query);
				currentIndex++;
			}
			var filterElement = this._createFilterElement("triplat-query-filter", filter, filter.value, currentIndex);
			this._buildFilterMeta(filterElement, currentIndex, query);
			currentIndex++;
		}
		this._addFilterElement("triplat-query-close-paren", currentIndex, query);
		currentIndex++;
		this._appendFilterIndexLookup["_universalFilter"].end = currentIndex;
		this._appendFilterIndexLookup["_universalFilter"].elemEnd = currentIndex;
	},

    _adjustFilterLookup: function(filterRemoved){
		var filters = Object.keys(this._appendFilterIndexLookup);
		for(var filter in filters){
			var filterObj = this._appendFilterIndexLookup[filters[filter]];
			if(filterObj.end <= filterRemoved.start){
				continue;
			}
			var amountToAdjust = (filterRemoved.end - filterRemoved.start);
			filterObj.start -= amountToAdjust;
			filterObj.end -= amountToAdjust;
		}    
	},

    _removeFilter: function(lookup, query){
		var indexRemoved = this._appendFilterIndexLookup[lookup];
		query.filters.splice(indexRemoved.start, (indexRemoved.end - indexRemoved.start));
		this._removeFilterElement(lookup);
		delete this._appendFilterIndexLookup[lookup];
		this._adjustFilterLookup(indexRemoved)           
	},

    _removeFilters: function(query){
		var start = query.filters.length;
		var filters = Object.keys(this._appendFilterIndexLookup);
		for(var filter in filters){
			var lookup = filters[filter];
			var candidate = this._appendFilterIndexLookup[lookup].start;
			if(candidate < start){
				start = candidate;    
			}
			this._removeFilterElement(lookup);
		}
		query.filters.splice(start, query.filters.length - start);
	},

    _removeFilterElement: function(lookup){
		var filterStart = this._appendFilterIndexLookup[lookup].elemStart;
		var filterEnd = this._appendFilterIndexLookup[lookup].elemEnd;
		for(var i = filterStart; i < filterEnd; i++){
			this._removeChildQueryElement(i);    
		}    
	},

    _removeChildQueryElement: function(removeIndex){
		var tagElem = dom(this).querySelector("[triplat-query-index='"+removeIndex+"']:not(triplat-query-sort)");
		if(tagElem){
			dom(this).removeChild(tagElem);
		}
	},

    _addFilterElement: function(elementName, currentIndex, query, filterProps){
		if(filterProps){
			var isGroup = filterProps.value.length > 1;
			if(isGroup){
				this._addFilterElement("triplat-query-open-paren", currentIndex, query);
				currentIndex++;
			}
			filterProps.value.forEach(function(value, index){
				if(index > 0){
					this._addFilterElement("triplat-query-or", currentIndex, query);
					currentIndex++;
				}
				var filterElement = this._createFilterElement(elementName, filterProps, value, currentIndex);
				this._buildFilterMeta(filterElement, currentIndex, query);
				currentIndex++;
			}, this);
			if(isGroup){
				this._addFilterElement("triplat-query-close-paren", currentIndex, query);
				currentIndex++;
			}
			this._appendFilterIndexLookup[filterProps.name].end = currentIndex;
			this._appendFilterIndexLookup[filterProps.name].elemEnd = currentIndex;
		} else {
			var filterElement = document.createElement(elementName); 
			dom(this).appendChild(filterElement);
			this._buildFilterMeta(filterElement, currentIndex, query);
		}
	},

    _createFilterElement: function(elementName, filterProps, value, currentIndex){
		var filterElement = document.createElement(elementName);
		var name = filterProps.isStringWithId ? filterProps.name+".value" : filterProps.name;
		filterElement.name = name;
		filterElement.operator = filterProps.operator;
		filterElement.value = value;
		dom(this).appendChild(filterElement);
		return filterElement;
	},

    _buildFilterMeta: function(filterElement, currentIndex, query){
		this._setIndex(filterElement, currentIndex);
		var meta = {required: false, ignoreIfBlank: false};
		if (filterElement.tagName === "TRIPLAT-QUERY-AND") {
			query.filters[currentIndex] = {operator: "and"};
		} else if (filterElement.tagName === "TRIPLAT-QUERY-OR") {
			query.filters[currentIndex] = {operator: "or"};
		} else if (filterElement.tagName === "TRIPLAT-QUERY-OPEN-PAREN") {
			query.filters[currentIndex] = {operator: "open parenthesis", required: true};
		} else if (filterElement.tagName === "TRIPLAT-QUERY-CLOSE-PAREN") {
			query.filters[currentIndex] = {operator: "close parenthesis", required: true};
		} else {
			if (filterElement.ignoreIfBlank) {
				meta.ignoreIfBlank = true;
			}
			if (filterElement.required) {
				meta.required = true;
			}
			if (filterElement.filter) {
				query.filters[currentIndex] = filterElement.filter;
			}
		}
		this.push("_filterMeta", meta);  
	}
});