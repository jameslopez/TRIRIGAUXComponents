/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

Polygon = {
	/*
	 * retrieve points in polyline element
	 */
	_getPolylinePoints: function(element) {
		var points = element.getAttribute("points");
		if (points != null) {
			var polygon = [];
			var arrayOfPoints = points.split(' ');
			arrayOfPoints.forEach(function(pair) {
				if (pair !== "") {
					var xy = pair.split(',');
					var pairArray = [];
					pairArray.push(parseFloat(xy[0]));
					pairArray.push(parseFloat(xy[1]));
					polygon.push(pairArray);
				}	
			});
			return polygon;
		} else
			return null;
	},
	
	_getSVGCoordinate: function(x, y, svgElement) {
		var svgPoint = null;
		var screenCTM = svgElement.getScreenCTM();
		if (screenCTM) {
			var screenPoint = svgElement.createSVGPoint();
			screenPoint.x = x;
			screenPoint.y = y;
			svgPoint = screenPoint.matrixTransform(screenCTM.inverse());
		}
		return svgPoint;
	},
	
	/*
	 * ray-casting algorithm based on
	 * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	 */
	_pointInPolygon: function(point, vs) {
	    var x = point.x, y = point.y;

	    var inside = false;
	    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
	        var xi = vs[i][0], yi = vs[i][1];
	        var xj = vs[j][0], yj = vs[j][1];

	        var intersect = ((yi > y) != (yj > y))
	            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
	        if (intersect) inside = !inside;
	    }

	    return inside;
	},
	
	pointInPolyline: function(x, y, dropElement, svgElement, svgPosition) {
		var vs = this._getPolylinePoints(dropElement);
		if (vs) {
			var svgPoint = this._getSVGCoordinate(x, y, svgElement);
			if (svgPoint) {
				return this._pointInPolygon(svgPoint, vs);
			}
		}
		return false;
	},
	
	/*
	 * return true or false if rec1 (x1, y1, w1, h1) contains rec2 (x2, y2, w2, h2)
	 * x, y the base coordinate, w is the width, h is the height
	 * reference from java.awt.Rectangle.java
	 */
	recContains: function(x1, y1, w1, h1, x2, y2, w2, h2) {
	    if (w1 < 0 || h1 < 0 || w2 < 0 || h2 < 0) return false;
	    if (x2 < x1 || y2 < y1) return false;
	    w1 += x1;
	    w2 += x2;
	    if (w2 <= x2) {
	    	if (w1 >= x1 || w2 > w1) return false;
	    } else {
	    	if (w1 >= x1 && w2 > w1) return false;
	    }
	    h1 += y1;
	    h2 += y2;
	    if (h2 <= y2) {
	    	if (h1 >= y1 || h2 > h1) return false;
	    } else {
	    	if (h1 >= y1 && h2 > h1) return false;
	    }
	    return true;
	}

};