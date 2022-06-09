/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { addDomStyleModule } from "../../tricore-util/tricore-util.js";

const styles = `
<dom-module id="gantt-styles">
	<template>
		<style>
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                              TreeGrid CSS style for Gantt chart                                         */
			
			/*                                                        TRIRIGA style                                                    */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --- Gantt type cell base class for <TD> tag, used with other cell classes from Grid.css like GSCell --- */
			.TUXGantt { border-left:1px solid white; border-top:0px none!important; border-bottom:0px none!important; padding:0px!important; cursor:default; background:transparent!important; -webkit-user-select:none; -moz-user-select:none; }
			.TUXRowHeightGantt { }
			.TUXRowHeightGanttTouch { }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Gantt bar                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Gantt bar is used for Main bar and for Run bar, except the Milestone and Stop types
			
			Gantt bar is composed from three div tags as <div SIZE><div OUTER><div INNER>TEXT</div></div></div>
			
			a) div SIZE tag controls only the bar position and width and has not set any CSS class
			b) div OUTER tag controls border, margin and outer padding of the bar by CSS classes
			c) div INNER tag controls background, inner padding and text attributes
			d) the TEXT is inner text or bar HTML. But for incomplete bar it consists of three div tags as <div GAUGE></div><div TEXT>TEXT</div><div END></div>
			
			OUTER and INNER tag can contain these CSS classes. The classes are defined in below order, the latter class overrides all the previous classes:
			OUTER class name contains flag "Out", INNER class name containt flag "In"
			
			
			If set <Cfg FastGantt = "1"/> , all run bars are composed only from one tag that contains all the classes. Now implemented only for run bar.
			For the 1), 2) and 5) uses special class with ..F prefix instead of the two ..In and ..Out classes
			For the 3) and 4) the one div tag has set both the ..In and ..Out classes
			All FastGantt bars must have the same outer height as border+padding+height!
			
			
			1) One base class
			..MainOut,       ..MainIn        Main bar
			..BoxOut,        ..BoxIn         Run Box type box
			..SolidOut,      ..SolidIn       Run Solid type box (not resizable)
			..FixedOut,      ..FixedIn       Run Fixed type box (not movable, not resizable)
			..LeftOut,       ..LeftIn        Run Left fixed type box (not movable, but resizable to the right)
			..RightOut,      ..RightIn       Run Right fixed type box (not movable, but resizable to the left)
			..EndOut,        ..EndIn         Run End type box
			..BoundOut,      ..BoundIn       Run Bound fixed type box
			..EndStartOut,   ..EndStartIn    Run End type box placed as the first box
			..BoundStartOut, ..BoundStartIn  Run Bound fixed type box placed as the first box
			..EmptyOut,      ..EmptyIn       Run Empty type. Shown only if it has defined Text or Class attribute
			..NbspOut,       ..NbspIn        Run Nbsp type
			
			1F) One base class used instead of 1) for FastGantt=1 
			..FMain                          Main bar
			..FBox                           Run Box type box
			..FSolid                         Run Solid type box (not resizable)
			..FFixed                         Run Fixed type box (not movable, not resizable)
			..FLeft                          Run Left fixed type box (not movable, but resizable to the right)
			..FRight                         Run Right fixed type box (not movable, but resizable to the left)
			..FEnd                           Run End type box
			..FBound                         Run Bound fixed type box
			..FEndStart                      Run End type box placed as the first box
			..FBoundStart                    Run Bound fixed type box placed as the first box
			..FEmpty                         Run Empty type. Shown only if it has defined Text or Class attribute
			..FNbsp                          Run Nbsp type
			
			2) One complete class, set only if the Complete >=0 OR the bar is critical, error or disabled
			..Out0,          ..In0           Not started task
			..Out50,         ..In50          Incomplete task. It contains the three inner divs like as <div GAUGE></div><div TEXT>TEXT</div><div END></end>
												..CompleteGauge      Shows the percentage completion state
												..CompleteText       Shows the bar inner text or html
												..CompleteEnd        Internal class, should not be changed
			..Out100,        ..In100         Complete task
			..Out0Crit,      ..In0Crit       Not started task on critical path. Used also when Complete is null.
			..Out50Crit,     ..In50Crit      Incomplete task on critical path. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
			..Out100Crit,    ..In100Crit     Complete task on critical path
			..Out0Err,       ..In0Err        Not started task beyond critical path. Used also when Complete is null.
			..Out50Err,      ..In50Err       Incomplete task beyond critical path. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
			..Out100Err,     ..In100Err      Complete task beyond critical path
			..OutDisabled,   ..InDisabled    Disabled bar
			..OutError,      ..InError       Run bar error (overlaid). Used only if set GanttRunErrors>=1
			
			2F) One complete class used instead of 2) for FastGantt=1, set only if the Complete >=0 OR the bar is critical, error or disabled
			..F0                             Not started task
			..F50                            Incomplete task. It contains the three inner divs like as <div GAUGE></div><div TEXT>TEXT</div><div END></end>
												..FCompleteGauge      Shows the percentage completion state
												..FCompleteText       Shows the bar inner text or html
			..F100                           Complete task
			..F0Crit                         Not started task on critical path. Used also when Complete is null.
			..F50Crit                        Incomplete task on critical path. It contains the three inner divs, ..FCompleteGauge, ..FCompleteText and ..CompleteEnd
			..F100Crit                       Complete task on critical path
			..F0Err                          Not started task beyond critical path. Used also when Complete is null.
			..F50Err                         Incomplete task beyond critical path. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
			..F100Err                        Complete task beyond critical path
			..FDisabled                      Disabled bar
			..FError                         Run bar error (overlaid). Used only if set GanttRunErrors>=1
			..FErrorIE                       Run bar error used for IE9 and below to avoid bugs in these versions
			
			3) One custom class, set only if GanttClass or Run Class is set
			..XXXOut,        ..XXXIn         where XXX is the custom class name, predefined are one Group class and 17 color classes. For backward compatibility there are also Flow and FlowG classes.
			
			4) One custom complete class, set only if GanttClass or Run Class is set and only if the Complete >=0 OR the bar is critical, error or disabled
			..XXXOut0,       ..XXXIn0        Not started task
			..XXXOut50,      ..XXXIn50       Incomplete task. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
												..XXXCompleteGauge      Shows the percentage completion state
												..XXXCompleteText       Shows the bar inner text or html
			..XXXOut100,     ..XXXIn100      Complete task
			..XXXOut0Crit,   ..XXXIn0Crit    Not started task on critical path. Used also when Complete is null.
			..XXXOut50Crit,  ..XXXIn50Crit   Incomplete task on critical path. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
			..XXXOut100Crit, ..XXXIn100Crit  Complete task on critical path
			..XXXOut0Err,    ..XXXIn0Err     Not started task beyond critical path. Used also when Complete is null.
			..XXXOut50Err,   ..XXXIn50Err    Incomplete task beyond critical path. It contains the three inner divs, ..CompleteGauge, ..CompleteText and ..CompleteEnd
			..XXXOut100Err,  ..XXXIn100Err   Complete task beyond critical path
			..XXXOutDisabled,..XXXInDisabled Disabled bar
			..XXXOutError,   ..XXXInError    Run bar error (overlaid)
			
			5) Run bar special classes
			..JoinLeft                       OUTER class only. The bar is joined on left side       
			..JoinRight                      OUTER class only. The bar is joined on right side
			..MoveOut,       ..MoveIn        Set to box that is being dragged by action GanttRunMove='Move'
			..RemoveOut,     ..RemoveIn      Set to box that is being dragged by action GanttRunMove='Remove'
			..CopyOut,       ..CopyIn        Set to box that is being dragged by action GanttRunMove='Copy'
			..UnknownOut,    ..UnknownIn     Replaces custom class. Set for box with unknown Type
			..NoneOut,       ..NoneIn        Custom class for box without style
			..SelectedOut,   ..SelectedIn    Selected box
			
			5F) Run bar special classes used instead of 5) for FastGantt=1
			..FJoinLeft                      The bar is joined on left side       
			..FJoinRight                     The bar is joined on right side
			..FMove,                         Set to box that is being dragged by action GanttRunMove='Move'
			..FRemove,                       Set to box that is being dragged by action GanttRunMove='Remove'
			..FCopy,                         Set to box that is being dragged by action GanttRunMove='Copy'
			..FUnknown,                      Replaces custom class. Set for box with unknown Type
			..FNone,                         Custom class for box without style
			..FSelected,                     Selected box
			
			6) Main bar special classes
			..LockedOut,     ..LockedIn      Locked main bar
								..OuterIcons    INNER class only. The main bar contains side outer icons set by GanttIcons
								..InnerIcons    INNER class only. The main bar contains side inner icons set by GanttIcons
			
			7) Adjacent class
			..Adjacent                       OUTER class only. Set only for GanttAdjacentBars='1' to remove space between boxes
			
			8) Hover classes, added when the bar is hovered (under mouse cursor)
			It adds all the classes already set with the Hover suffix. OUTER classes only.
			For example, if the bar has CSS: "GSGanttMainOut GSGanttOut0Crit" the hovered CSS will be: "GSGanttMainOut GSGanttOut0Crit GSGanttMainOutHover GSGanttOut0CritHover"
			There are special hover classes: ..HoverGroup         Class added to all Run boxes in the same Group, if some box from the group is hovered
												..AdjacentHoverGroup Class added instead of HoverGroup when set GanttAdjacentBars='1'
			For FastGantt=1 the classes have the GSF prefix.
			
			*/
			
			/* --- Main bar base --- */
			.TUXGanttMainOut { 
			border:1px solid #888899; margin:1px; margin-bottom:0px; padding:1px; background:white; overflow:hidden;
			}
			.TUXGanttMainIn { 
			overflow:hidden; font:bold 11px Arial; line-height:11px; width:100%!IE; white-space:nowrap; padding-left:1px; background:#777; color:white;
			}
			
			/* --- Run bar base according to Type --- */
			.TUXGanttEmptyOut,.TUXGanttBoxOut,.TUXGanttSolidOut,.TUXGanttLeftOut,.TUXGanttRightOut,.TUXGanttFixedOut,
			.TUXGanttBoundOut,.TUXGanttBoundStartOut,.TUXGanttEndOut,.TUXGanttEndStartOut,.TUXGanttNbspOut {
			border:1px solid #888899; margin:1px; margin-bottom:0px; padding:1px; overflow:hidden;
			}
			.TUXGanttEmptyIn,.TUXGanttBoxIn,.TUXGanttSolidIn,.TUXGanttLeftIn,.TUXGanttRightIn,.TUXGanttFixedIn,
			.TUXGanttBoundIn,.TUXGanttBoundStartIn,.TUXGanttEndIn,.TUXGanttEndStartIn,.TUXGanttNbspIn {
			overflow:hidden; font:bold 11px Arial; line-height:11px; width:100%!IE; white-space:nowrap; padding-left:1px;
			}
			.TUXGanttEmptyOut { border:none; }
			.TUXGanttEmptyIn { }
			.TUXGanttNbspOut { border:none; border-top:1px dotted red; border-bottom:1px dotted red; margin-left:0px; margin-right:0px; padding-left:3px; padding-right:3px; }
			.TUXGanttNbspIn { }
			.TUXGanttBoxOut { background:white; }
			.TUXGanttBoxIn { background:#FFFFFF; }
			.TUXGanttSolidOut { background:white; }
			.TUXGanttSolidIn { background:#CCCCCC; }
			.TUXGanttFixedOut,.TUXGanttLeftOut,.TUXGanttBoundOut,.TUXGanttBoundStartOut { 
			border-color:#888899; border-left-style:solid!important; border-left-width:3px!important; margin-left:0px!important; padding-left:1px!important; background:white; 
			}
			.TUXGanttFixedOut,.TUXGanttRightOut,.TUXGanttBoundOut,.TUXGanttBoundStartOut { 
			border-color:#888899; border-right-style:solid!important; border-right-width:3px!important; padding-right:1px!important; background:white; background:white; 
			}
			.TUXGanttFixedIn,.TUXGanttLeftIn,.TUXGanttRightIn { background:#CCC; }
			.TUXGanttBoundStartIn,.TUXGanttEndStartIn { background:#C0FFC0; color:black; }
			.TUXGanttBoundIn,.TUXGanttEndIn { background:#FFE0C0; color:black; }
			
			/* --- Run bar error (overlaid) --- */
			.TUXGanttOutError { background:transparent; }
			.TUXGanttInError { background:#FAA; opacity:0.7; filter:alpha(opacity=70); }
			
			/* --- Bar complete --- */
			.TUXGanttOut0 { }
			.TUXGanttIn0 { background:#8BD; color: black; }
			.TUXGanttOut0Err { }
			.TUXGanttIn0Err { background:#F66; color: black; }
			.TUXGanttOut0Crit { }
			.TUXGanttIn0Crit { background:#EB8; color: black; }
			.TUXGanttOut50 { }
			.TUXGanttIn50 { background:#69B; padding-left:0px; color: black; }
			.TUXGanttOut50Err { }
			.TUXGanttIn50Err { background:#F66; padding-left:0px; color: black; }
			.TUXGanttOut50Crit { }
			.TUXGanttIn50Crit { background:#D95; padding-left:0px; color: black; }
			.TUXGanttOut100,.TUXGanttOut100Err,.TUXGanttOut100Crit { }
			.TUXGanttIn100,.TUXGanttIn100Err,.TUXGanttIn100Crit { background:#7E7; color: black; }
			.TUXGanttCompleteGauge { margin-left:-2px; background:#5B5; height:250px; margin-bottom:-250px; overflow:hidden; }
			.TUXGanttCompleteText { padding-left:1px; overflow:hidden; width:100%; font:bold 11px Arial; line-height:11px; white-space:nowrap; }
			.TUXGanttCompleteEnd { height:250px; margin-bottom:-250px; overflow:hidden; }
			
			/* --- Red should match the TUXGanttIn0Err, etc. background colors to be consistent with error styling.  The red class here is used for a few other error scenarios and should match --- */
			.TUXGanttRedOut { border-color:red; } .TUXGanttRedIn { background:#F66; color:black; } .TUXGanttRedIn0,.TUXGanttRedIn50 { background:#F66; }
			.TUXGanttRedIn0Crit,.TUXGanttRedIn50Crit { background:#F66; }
			.TUXGanttRedIn0Err,.TUXGanttRedIn50Err { background:#F66; }
			/* --- This should match TUXGanttCompleteGauge --- */
			.TUXGanttRedCompleteGauge { background:#5B5; }
			.TUXGanttRedOutHover { border-color:#800!important; }
			
			/* --- This is the style class used for TRIRIGA Umbrella task styling. --- */
			.TUXGanttOliveOut { border-color:olive; } .TUXGanttOliveIn { background:olive; color:white; } .TUXGanttOliveIn0,.TUXGanttOliveIn50 { background:#CC8; }
			.TUXGanttOliveIn0Crit,.TUXGanttOliveIn50Crit { background:#CC8; }
			.TUXGanttOliveIn0Err,.TUXGanttOliveIn50Err { background:#CC8; }
			.TUXGanttOliveCompleteGauge { background:olive; } .TUXGanttOliveCompleteText { color:white; }
			
			
			/* --- Run bar base FastGantt ---  */
			.TUXFGanttBase { height:47px; overflow:hidden; } /* Used only for calculations, all FastGantt bars must have the same outer height as border+padding+height */
			
			.TUXFGanttEmpty,.TUXFGanttBox,.TUXFGanttSolid,.TUXFGanttLeft,.TUXFGanttRight,.TUXFGanttFixed,
			.TUXFGanttBound,.TUXFGanttBoundStart,.TUXFGanttEnd,.TUXFGanttEndStart,.TUXFGanttNbsp { 
			overflow:hidden; font:bold 11px Arial; line-height:11px; white-space:nowrap;
			}
			.TUXFGanttEmpty { border:0px solid white; padding:2px; padding-left:3px; padding-right:3px; }
			.TUXFGanttNbsp { border:0px solid white; border-top:1px dotted red; border-bottom:1px dotted red; padding-left:3px; padding-right:3px; }
			.TUXFGanttBox { background:#FFFFFF; }
			.TUXFGanttSolid { background:#CCC; }
			.TUXFGanttFixed,.TUXFGanttLeft,.TUXFGanttBound,.TUXFGanttBoundStart { padding-left:0px;}
			.TUXFGanttFixed,.TUXFGanttRight,.TUXFGanttBound,.TUXFGanttBoundStart { padding-right:0px; }
			.TUXFGanttFixed,.TUXFGanttLeft,.TUXFGanttRight { background:#CCC; }
			.TUXFGanttBound,.TUXFGanttEnd { background:#C0FFC0; }
			.TUXFGanttBoundStart,.TUXFGanttEndStart { background:#C0FFC0; }
			
			/* --- Run bar Error (overlaid) FastGantt --- */
			.TUXFGanttError { background:#FAA; opacity:0.7; filter:alpha(opacity=70); }
			.TUXFGanttErrorIE { background:#FAA; filter:alpha(opacity=70); } /* Used in Internet explorer 9 and below to avoid problems in IE9 */
			
			/* --- Run bar complete FastGantt --- */
			.TUXFGantt0 { background:#8BD; }
			.TUXFGantt0Err { background:#F66; color:black; }
			.TUXFGantt0Crit { background:#EB8; color:black; }
			.TUXFGantt50 { background:#AAE; color:black; }
			.TUXFGantt50Err { background:#F66; color:black; }
			.TUXFGantt50Crit { background:#D95; color:black; }
			.TUXFGantt100,.TUXFGantt100Err,.TUXFGantt100Crit { background:#7E7; color:black; }
			.TUXFGanttCompleteGauge { margin-left:-2px; background:#5B5; height:250px; margin-bottom:-250px; overflow:hidden; }
			.TUXFGanttCompleteText { padding-left:0px; overflow:hidden; width:100%; font:bold 11px Arial; line-height:11px; white-space:nowrap; }
			
			/* --- Bar group color --- */
			.TUXGanttGroupIn { background:#777; color:black; }
			.TUXGanttGroupIn0 { background:#777; color:black; }
			.TUXGanttGroupIn0Err { background:#F88; color:black; }
			.TUXGanttGroupIn0Crit { background:#CC0; color:black; }
			.TUXGanttGroupIn50 { background:#EEE; color:black; }
			.TUXGanttGroupIn50Err { background:#F88; color:black; }
			.TUXGanttGroupIn50Crit { background:#CC0; color:black; }
			.TUXGanttGroupIn100,.TUXGanttGroupIn100Err,.TUXGanttGroupIn100Crit { background:#777; color:yellow; }
			.TUXGanttGroupCompleteGauge { background:#AAA; }
			.TUXGanttGroupCompleteText { color:yellow; } 
			
			/* --- Bar custom colors --- */
			
			.TUXGanttBlueOut { border-color:blue; } .TUXGanttBlueIn { background:blue; color:white; } .TUXGanttBlueIn0,.TUXGanttBlueIn50 { background:#88F; }
			.TUXGanttBlueIn0Crit,.TUXGanttBlueIn50Crit { background:#88F; }
			.TUXGanttBlueIn0Err,.TUXGanttBlueIn50Err { background:#88F; }
			.TUXGanttBlueCompleteGauge { background:blue; } .TUXGanttBlueCompleteText { color:white; }
			
			.TUXGanttGreenOut { border-color:green; } .TUXGanttGreenIn { background:green; color:white; } .TUXGanttGreenIn0,.TUXGanttGreenIn50 { background:#6D6; }
			.TUXGanttGreenIn0Crit,.TUXGanttGreenIn50Crit { background:#6D6; }
			.TUXGanttGreenIn0Err,.TUXGanttGreenIn50Err { background:#6D6; }
			.TUXGanttGreenCompleteGauge { background:green; } .TUXGanttGreenCompleteText { color:white; }
			
			.TUXGanttFuchsiaOut { border-color:fuchsia; } .TUXGanttFuchsiaIn { background:fuchsia; color:black; } .TUXGanttFuchsiaIn0,.TUXGanttFuchsiaIn50 { background:#F8F; }
			.TUXGanttFuchsiaIn0Crit,.TUXGanttFuchsiaIn50Crit { background:#F8F; }
			.TUXGanttFuchsiaIn0Err,.TUXGanttFuchsiaIn50Err { background:#F8F; }
			.TUXGanttFuchsiaCompleteGauge { background:fuchsia; }
			
			.TUXGanttAquaOut { border-color:aqua; } .TUXGanttAquaIn { background:aqua; color:black; } .TUXGanttAquaIn0,.TUXGanttAquaIn50 { background:#AFF; }
			.TUXGanttAquaIn0Crit,.TUXGanttAquaIn50Crit { background:#AFF; }
			.TUXGanttAquaIn0Err,.TUXGanttAquaIn50Err { background:#AFF; }
			.TUXGanttAquaCompleteGauge { background:aqua; }
			
			.TUXGanttLimeOut { border-color:lime; } .TUXGanttLimeIn { background:lime; color:black; } .TUXGanttLimeIn0,.TUXGanttLimeIn50 { background:#CFC; }
			.TUXGanttLimeIn0Crit,.TUXGanttLimeIn50Crit { background:#CFC; }
			.TUXGanttLimeIn0Err,.TUXGanttLimeIn50Err { background:#CFC; }
			.TUXGanttLimeCompleteGauge { background:lime; }
			
			.TUXGanttMaroonOut { border-color:maroon; } .TUXGanttMaroonIn { background:maroon; color:white; } .TUXGanttMaroonIn0,.TUXGanttMaroonIn50 { background:#C88; }
			.TUXGanttMaroonIn0Crit,.TUXGanttMaroonIn50Crit { background:#C88; }
			.TUXGanttMaroonIn0Err,.TUXGanttMaroonIn50Err { background:#C88; }
			.TUXGanttMaroonCompleteGauge { background:maroon; } .TUXGanttMaroonCompleteText { color:white; }
			
			.TUXGanttNavyOut { border-color:navy; } .TUXGanttNavyIn { background:navy; color:white; } .TUXGanttNavyIn0,.TUXGanttNavyIn50 { background:#88C; }
			.TUXGanttNavyIn0Crit,.TUXGanttNavyIn50Crit { background:#88C; }
			.TUXGanttNavyIn0Err,.TUXGanttNavyIn50Err { background:#88C; }
			.TUXGanttNavyCompleteGauge { background:navy; } .TUXGanttNavyCompleteText { color:white; }
			
			.TUXGanttOrangeOut { border-color:orange; } .TUXGanttOrangeIn { background:orange; color:black; } .TUXGanttOrangeIn0,.TUXGanttOrangeIn50 { background:#FFCC88; }
			.TUXGanttOrangeIn0Crit,.TUXGanttOrangeIn50Crit { background:#FFCC88; }
			.TUXGanttOrangeIn0Err,.TUXGanttOrangeIn50Err { background:#FFCC88; }
			.TUXGanttOrangeCompleteGauge { background:orange; } .TUXGanttOrangeCompleteText { color:black; }
			
			.TUXGanttPurpleOut { border-color:purple; } .TUXGanttPurpleIn { background:purple; color:white; } .TUXGanttPurpleIn0,.TUXGanttPurpleIn50 { background:#C8C; }
			.TUXGanttPurpleIn0Crit,.TUXGanttPurpleIn50Crit { background:#C8C; }
			.TUXGanttPurpleIn0Err,.TUXGanttPurpleIn50Err { background:#C8C; }
			.TUXGanttPurpleCompleteGauge { background:purple; } .TUXGanttPurpleCompleteText { color:white; }
			
			.TUXGanttSilverOut { border-color:silver; } .TUXGanttSilverIn { background:silver; color:black; } .TUXGanttSilverIn0,.TUXGanttSilverIn50 { background:#E0E0E0; }
			.TUXGanttSilverIn0Crit,.TUXGanttSilverIn50Crit { background:#E0E0E0; }
			.TUXGanttSilverIn0Err,.TUXGanttSilverIn50Err { background:#E0E0E0; }
			.TUXGanttSilverCompleteGauge { background:silver; }
			
			.TUXGanttTealOut { border-color:teal; } .TUXGanttTealIn { background:teal; color:white; } .TUXGanttTealIn0,.TUXGanttTealIn50 { background:#8CC; }
			.TUXGanttTealIn0Crit,.TUXGanttTealIn50Crit { background:#8CC; }
			.TUXGanttTealIn0Err,.TUXGanttTealIn50Err { background:#8CC; }
			.TUXGanttTealCompleteGauge { background:teal; } .TUXGanttTealCompleteText { color:white; }
			
			.TUXGanttYellowOut { border-color:#AA0; } .TUXGanttYellowIn { background:yellow; color:black; } .TUXGanttYellowIn0,.TUXGanttYellowIn50 { background:#FFA; }
			.TUXGanttYellowIn0Crit,.TUXGanttYellowIn50Crit { background:#FFA; }
			.TUXGanttYellowIn0Err,.TUXGanttYellowIn50Err { background:#FFA; }
			.TUXGanttYellowCompleteGauge { background:yellow; }
			
			.TUXGanttBlackOut { border-color:black; } .TUXGanttBlackIn { background:black; color:white; } .TUXGanttBlackIn0,.TUXGanttBlackIn50 { background:#666; }
			.TUXGanttBlackIn0Crit,.TUXGanttBlackIn50Crit { background:#666; }
			.TUXGanttBlackIn0Err,.TUXGanttBlackIn50Err { background:#666; }
			.TUXGanttBlackCompleteGauge { background:black; } .TUXGanttBlackCompleteText { color:white; }
			
			.TUXGanttGrayOut { border-color:gray; } .TUXGanttGrayIn { background:#535353; color:black; } .TUXGanttGrayIn0,.TUXGanttGrayIn50 { background:#BBB; }
			.TUXGanttGrayIn0Crit,.TUXGanttGrayIn50Crit { background:#BBB; }
			.TUXGanttGrayIn0Err,.TUXGanttGrayIn50Err { background:#BBB; }
			.TUXGanttGrayCompleteGauge { background:#999; }
			
			.TUXGanttWhiteOut { border-color:black; } .TUXGanttWhiteIn { background:#EEE; color:black; } .TUXGanttWhiteIn0,.TUXGanttWhiteIn50 { background:white; }
			.TUXGanttWhiteIn0Crit,.TUXGanttWhiteIn50Crit { background:white; }
			.TUXGanttWhiteIn0Err,.TUXGanttWhiteIn50Err { background:white; }
			.TUXGanttWhiteCompleteGauge { background:#E0E0E0; border-right:2px solid black; }
			
			/* --- Special classes --- */
			.TUXGanttNoneOut { margin:0px!important; border-color:transparent; border-width:2px!important; border-left:0px none!important; border-right:0px none!important; padding:0px!important; }
			.TUXGanttNoneIn { height: auto; padding:0px!important; background:none; color:inherit; }
			.TUXGanttHtmlOut { }
			.TUXGanttHtmlIn { height: auto; padding:0px!important; background:none; color:inherit; }
			.TUXGanttVoidOut { border-color:transparent; }
			.TUXGanttVoidIn { height: auto; padding:0px!important; background:none; color:inherit; }
			
			/* --- Main bar special classes --- */
			.TUXGanttOuterIcons,.TUXGanttInnerIcons { padding-left:4px; }  /* Main bar with side icons, inner class only, useful to set different left padding */
			
			/* --- Run bar special classes --- */
			.TUXGanttJoinLeft { border-left-style:dotted; border-left-color:#888; }
			.TUXGanttJoinRight { border-right-style:dotted; border-right-color:#888; }
			.TUXGanttJoinLeftNbsp { border-left-style:dotted; border-left-color:red; }
			.TUXGanttJoinRightNbsp { border-right-style:dotted; border-right-color:red; }
			.TUXGanttUnknownOut { }
			.TUXGanttUnknownIn { background:black; color:white; }
			.TUXGanttMoveOut { border:2px solid #DDD; margin:0px; padding:0px; }
			.TUXGanttMoveIn { background:#F0F0F0; color:black; }
			.TUXGanttRemoveOut { border:2px solid #DDD; margin:0px; padding:0px; }
			.TUXGanttRemoveIn { background:red; color:black; }
			.TUXGanttCopyOut { border:2px solid blue; margin:0px; padding:0px; }
			.TUXGanttCopyIn { }
			.TUXGanttSelectedIn { }
			.TUXGanttSelectedOut { border-style:dashed; border-color:blue!important; border-width:2px; margin-top:0px; margin-left:0px; padding-left:1px!important; padding-right:1px!important; }
			
			/* --- Run bar special classes FastGantt --- */
			.TUXFGanttNone { border-color:transparent; background:none; color:inherit; }
			.TUXFGanttHtml { background:none; color:inherit; }
			.TUXFGanttVoid { border-color:transparent; background:none; color:inherit; }
			.TUXFGanttJoinLeft { border-left-style:dotted; border-left-color:#888; }
			.TUXFGanttJoinRight { border-right-style:dotted; border-right-color:#888; }
			.TUXFGanttJoinLeftNbsp { border-left-style:dotted; border-left-color:red; }
			.TUXFGanttJoinRightNbsp { border-right-style:dotted; border-right-color:red; }
			.TUXFGanttUnknown { background:black; color:white; }
			.TUXFGanttMove { border:2px solid #DDD; padding:0px; padding-left:1px; padding-right:1px; background:#F0F0F0; color:black; }
			.TUXFGanttRemove { border:2px solid #DDD; padding:0px; padding-left:1px; padding-right:1px; background:red; color:black; }
			.TUXFGanttCopy { border:2px solid blue; padding:0px; padding-left:1px; padding-right:1px; }
			.TUXFGanttSelected { border-style:dashed; border-color:blue!important; border-width:2px; padding:1px; padding-top:0px; padding-bottom:0px; }
			
			/* --- Flow backward compatibility --- */
			.TUXGanttFlowOut,.TUXGanttGFlowOut { margin-top:5px!important; margin-left:0px!important; border:1px solid black; border-width:1px!important; overflow:hidden; padding:0px!important; }
			.TUXGanttFlowIn,.TUXGanttGFlowIn { height:3px; overflow:hidden; background:#DDDDDD; }
			.TUXGanttGFlowIn { background:white; }
			.TUXGanttFlow0InErr,.TUXGanttGFlow0InErr { background:#F55; }
			.TUXGanttFlow0InCrit,.TUXGanttGFlow0InCrit { background:#FA0; }
			
			/* --- Main bar locked, all colors (for Run bar is used Fixed box instead) --- */
			.TUXGanttLockedOut { 
			border-left-style:solid!important; border-left-width:3px!important; border-right-style:solid!important; border-right-width:3px!important; 
			margin-left:0px!important; padding-left:1px!important;
			}
			.TUXGanttLockedIn { }
			
			/* --- Bar disabled,  all colors, used instead of Complete classes --- */
			.TUXGanttOutDisabled { }
			.TUXGanttInDisabled { background:#DDD; }
			.TUXFGanttDisabled { background:#DDD; } /* FastGantt version */
			
			/* --- GanttAdjacentBars, outer class --- */
			.TUXGanttAdjacent { margin-left:0px; margin-right:0px; }
			
			/* --- Bar hover --- */
			.TUXGanttMainOutHover,.TUXGanttBoxOutHover,.TUXGanttSolidOutHover,.TUXGanttLeftOutHover,.TUXGanttRightOutHover,.TUXGanttFixedOutHover,
			.TUXGanttBoundOutHover,.TUXGanttBoundStartOutHover,.TUXGanttEndOutHover,.TUXGanttEndStartOutHover,.TUXGanttNbspOutHover,.TUXGanttEmptyOutHover {
			border:2px solid red; margin:0px; padding:1px; overflow:hidden;
			}
			.TUXGanttHoverGroup,.TUXGanttAdjacentHoverGroup { border:2px solid #fa4; margin-top:0px; margin-left:0px; margin-right:0px; padding:1px; overflow:hidden; }
			.TUXGanttAdjacentHover,.TUXGanttAdjacentHoverGroup { padding-left:0px; padding-right:0px; }
			
			/* --- Bar hover FastGantt --- */
			.TUXFGanttMainHover,.TUXFGanttBoxHover,.TUXFGanttSolidHover,.TUXFGanttLeftHover,.TUXFGanttRightHover,.TUXFGanttFixedHover,
			.TUXFGanttBoundHover,.TUXFGanttBoundStartHover,.TUXFGanttEndHover,.TUXFGanttEndStartHover,.TUXFGanttNbspHover,.TUXFGanttEmptyHover {
			border:2px solid red; padding:0px; padding-left:1px; padding-right:1px; overflow:hidden; 
			}
			.TUXFGanttHoverGroup { border:2px solid #fa4; padding:0px; padding-left:1px;padding-right:1px; overflow:hidden; }
			
			/* --- Set for FastGantt when browser has zoom!=100% to ensure all boxes have the same border height --- */
			.TUXFGanttZoom { border-top-width:1px!important; border-bottom-width:1px!important; padding-top:1px!important; padding-bottom:1px!important; } 
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                Gantt bar supplement tags                                                */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* 
			There are tags that can be rendered with Gantt bar, but they are outside the bar.
			The supplement tags are moved or resized with the bar.
			
			1) Main bar side icons are printed by GanttIcons setting. 
			The icon is one div tag with background image set by one CSS class only
			..OutLeft,       ..OutRight        Outer left/right icon
			..InLeft,        ..InRight         Inner left/right icon
			..OutTopLeft,    ..OutTopRight     Outer left/right icon. Used when the main bar has set GanttTop or run bar Top or GanttRunTop attribute. But does NOT have set GanttHeight/Height/GanttRunHeight.
			..InTopLeft,     ..InTopRight      Inner left/right icon. Used when the main bar has set GanttTop or run bar Top or GanttRunTop attribute. But does NOT have set GanttHeight/Height/GanttRunHeight.
			..OutHeightLeft, ..OutHeightRight  Outer left/right icon. Used when the main bar has set GanttHeight or run bar Height or GanttRunHeight attribute.
			..InHeightLeft,  ..InHeightRight   Inner left/right icon. Used when the main bar has set GanttHeight or run bar Height or GanttRunHeight attribute.
			..OutCustomLeft, ..OutCustomRight  Outer left/right icon. Used for custom icons set by GanttIconLeft / GanttIconRight
			..InCustomLeft,  ..InCustomRight   Inner left/right icon. Used for custom icons set by GanttIconLeft / GanttIconRight
			
			
			2) Bar side text, set by GanttHtmlLeft and GanttHtmlRight for main bar and TextLeft and TextRight for run bar
			The side text consists from two div tags as <div SIZE><div TEXT>TEXT</div></div>
			
			a) div SIZE tag controls only the text position and width and has not set any CSS class
			b) the TEXT contains the textor HTML. Uses up to 2 classes, normal and disabled
			
			..HtmlLeft0,          ..HtmlRight0          Left / right side text for bar with GanttHtml...Edge = 2
			..HtmlLeft1,          ..HtmlRight1          Left / right side text for bar with GanttHtml...Edge = 0 or 1
			..HtmlLeftMilestone,  ..HtmlRightMilestone  Left / right side text for milestone
			..HtmlCenter                                Left / right side text for bar with GanttHtml...Edge = 3 or 4
			..HtmlDisabled                              Class added for disabled bar or milestone
			..HtmlXXX                                   17 Custom color classes
			
			
			3) Bar manual constraint icon, set for GanttManual or GanttRunManual or run Manual
			The icon is one div tag with background image set by one CSS class only
			..ManualStart                              Manual start icon, used for GanttManualDirection=0
			..ManualEnd                                Manual end icon, used for GanttManualDirection=1
			
			*/
			
			/* --- Main bar side icons --- */
			.TUXGanttOutLeft,.TUXGanttOutRight,.TUXGanttInLeft,.TUXGanttInRight,
			.TUXGanttOutHeightLeft,.TUXGanttOutHeightRight,.TUXGanttInHeightLeft,.TUXGanttInHeightRight { 
			background:url(Gantt.gif?v110) no-repeat; width:20px; overflow:hidden; 
			}
			.TUXGanttOutLeft { background-position: -292px bottom; padding-bottom:8px; }
			.TUXGanttOutRight { background-position: -354px bottom; padding-bottom:8px; }
			.TUXGanttInLeft { background-position: -90px 0px; }
			.TUXGanttInRight { background-position: -145px 0px; }
			.TUXGanttOutHeightLeft { background-position: -292px bottom; padding-bottom:8px; }
			.TUXGanttOutHeightRight { background-position: -354px bottom; padding-bottom:8px; }
			.TUXGanttInHeightLeft { background-position: -90px 0px; background-repeat:repeat-y; }
			.TUXGanttInHeightRight { background-position: -145px 0px; background-repeat:repeat-y; }
			.TUXGanttOutCustomLeft,.TUXGanttOutCustomRight,.TUXGanttInCustomLeft,.TUXGanttInCustomRight { padding-bottom:16px; overflow:hidden; background-repeat:no-repeat; }
			
			/* --- Bar HtmlLeft / HtmlRight --- */
			.TUXGanttHtmlLeft0,.TUXGanttHtmlRight0 { font:bold 12px Arial,Helvetica,sans-serif; line-height:12px; white-space:nowrap; padding-top:3px; }
			.TUXGanttHtmlLeft1,.TUXGanttHtmlRight1 { padding-top:2px; font:bold 11px Arial; line-height:11px; white-space:nowrap; }
			.TUXGanttHtmlLeftMilestone,.TUXGanttHtmlRightMilestone { font:bold 12px Arial,Helvetica,sans-serif; line-height:12px; white-space:nowrap; padding-top:2px;  }
			.TUXGanttHtmlRight0 { padding-left:7px; }
			.TUXGanttHtmlRight1 { padding-left:3px; }
			.TUXGanttHtmlRightMilestone { padding-left:12px; }
			.TUXGanttHtmlLeft0 { width:2000px; text-align:right; padding-right:7px; }
			.TUXGanttHtmlLeft1 { width:2000px; text-align:right; padding-right:3px; }
			.TUXGanttHtmlLeftMilestone { width:2000px; text-align:right; padding-right:2px; }
			.TUXGanttHtmlCenter { padding-top:3px; font:bold 11px Arial; line-height:11px; white-space:nowrap; }
			.TUXGanttHtmlDisabled { color:gray; }
			
			/* --- Bar HtmlLeft / HtmlRight color classes --- */
			.TUXGanttHtmlAqua { color:aqua; }
			.TUXGanttHtmlBlack { color:black; }
			.TUXGanttHtmlBlue { color:blue; }
			.TUXGanttHtmlFuchsia { color:fuchsia; }
			.TUXGanttHtmlGray { color:#400040; }
			.TUXGanttHtmlGreen { color:green; }
			.TUXGanttHtmlLime { color:lime; }
			.TUXGanttHtmlMaroon { color:maroon; }
			.TUXGanttHtmlNavy { color:navy; }
			.TUXGanttHtmlOlive { color:olive; }
			.TUXGanttHtmlOrange { color:orange; }
			.TUXGanttHtmlPurple { color:purple; }
			.TUXGanttHtmlRed { color:red; }
			.TUXGanttHtmlSilver { color:silver; }
			.TUXGanttHtmlTeal { color:teal; }
			.TUXGanttHtmlWhite { color:white; }
			.TUXGanttHtmlYellow { color:yellow; }
			
			.TUXGanttHtmlNone { padding:0px; }
			
			/* --- Bar Manual start / end --- */
			.TUXGanttManualStart,.TUXGanttManualEnd { background:url(Gantt.gif?v110) no-repeat; width:8px; height:8px; overflow:hidden; }
			.TUXGanttManualStart { background-position:-1900px 0px; }
			.TUXGanttManualEnd { background-position:-1950px 0px; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Milestone                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Milestone is used for Main bar Milestone and for Run bar Milestone and Stop types
			
			Milestone is one DIV tag with background image.
			It has set up to four CSS classes to specify the background image according to milestone type and state.
			The classes are defined in below order, the latter class overrides all the previous classes
			
			1) One base class:
			..Milestone or ..SelMilestone                      for Main bar milestone, the second class is for selected milestone
			..RunMilestone or ..RunSelMilestone                for Run bar Milestone type, the second class is for selected milestone
			..StopMilestone or ..StopSelMilestone              for Run bar Stop type, the second class is for selected milestone
			
			2) One complete class, set only if the Complete >=0 OR the milestone is critical, error or disabled
			..Milestone0 or ..SelMilestone0                    for incomplete milestone 
			..Milestone100 or ..SelMilestone100                for complete milestone
			..Milestone0Crit or ..SelMilestone0Crit            for incomplete milestone on critical path. Used also when Complete is null.
			..Milestone100Crit or ..SelMilestone100Crit        for complete milestone on critical path
			..Milestone0Err or ..SelMilestone0Err              for incomplete milestone beyond critical path. Used also when Complete is null.
			..Milestone100Err or ..SelMilestone100Err          for complete milestone beyond critical path
			..MilestoneDisabled or ..SelMilestoneDisabled      for disabled milestone
			
			3) One custom class, set only if GanttClass or Run Class is set
			..XXXMilestone or ..XXXSelMilestone                where XXX is the custom class name, predefined are one Group class and 17 color classes (only 10 color classes differ)
			
			4) One custom complete class, set only if GanttClass or Run Class is set and only if the Complete >=0 OR the milestone is critical, error or disabled
			..XXXMilestone0 or ..XXXSelMilestone0              for incomplete milestone 
			..XXXMilestone100 or ..XXXSelMilestone100          for complete milestone
			..XXXMilestone0Crit or ..XXXSelMilestone0Crit      for incomplete milestone on critical path. Used also when Complete is null.
			..XXXMilestone100Crit or ..XXXSelMilestone100Crit  for complete milestone on critical path
			..XXXMilestone0Err or ..XXXSelMilestone0Err        for incomplete milestone beyond critical path. Used also when Complete is null.
			..XXXMilestone100Err or ..XXXSelMilestone100Err    for complete milestone beyond critical path
			..XXXMilestoneDisabled or ..XXXSelMilestoneDisabled  for disabled milestone
			
			5) Hover classes, added if milestone is hovered (under mouse cursor)
			It adds all the classes already set with the Hover suffix.
			For example, if the milestone has CSS: "GSGanttMilestone GSGanttMilestone0Crit" the hovered CSS will be: "GSGanttMilestone GSGanttMilestone0Crit GSGanttMilestoneHover GSGanttMilestone0CritHover"
			
			*/
			
			/* --- Milestone padding calculations, how much the milestone icon can be overflowed from all sides --- */
			.TUXGanttMilestonePadding { height:2px; }
			
			/* --- Milestone for Main bar --- */
			.TUXGanttMilestone,.TUXGanttSelMilestone { background:url(Gantt.gif?v110) no-repeat; width:17px; height:17px; overflow:hidden; }
			.TUXGanttMilestone { background-position: -900px 0px; }
			.TUXGanttSelMilestone { background-position: -925px 0px; }
			.TUXGanttMilestoneHover { background-position: -950px 0px; }
			.TUXGanttSelMilestoneHover { background-position: -975px 0px; }
			
			/* --- Milestone for Run bar --- */
			.TUXGanttRunMilestone,.TUXGanttStopMilestone,.TUXGanttRunSelMilestone,.TUXGanttStopSelMilestone { background:url(Gantt.gif?v110) no-repeat; width:17px; height:17px; overflow:hidden; }
			.TUXGanttRunMilestone { background-position: -1100px 0px; }
			.TUXGanttRunSelMilestone { background-position: -1125px 0px; }
			.TUXGanttRunMilestoneHover { background-position: -1150px 0px; }
			.TUXGanttRunSelMilestoneHover { background-position: -1175px 0px; }
			
			/* --- Error (overlaid) milestone for Run bar, used instead of Complete --- */
			.TUXGanttMilestoneError { background-position: -1000px 0px; }
			.TUXGanttSelMilestoneError { background-position: -1025px 0px; }
			.TUXGanttMilestoneErrorHover { background-position: -1050px 0px; }
			.TUXGanttSelMilestoneErrorHover { background-position: -1075px 0px; }
			
			/* --- Milestone Complete --- */
			.TUXGanttMilestone0 { background-position: -1100px 0px; }
			.TUXGanttSelMilestone0 { background-position: -1125px 0px; }
			.TUXGanttMilestone0Hover { background-position: -1150px 0px; }
			.TUXGanttSelMilestone0Hover { background-position: -1175px 0px; }
			.TUXGanttMilestone100,.TUXGanttMilestone100Crit,.TUXGanttMilestone100Err { background-position: -1800px 0px; }
			.TUXGanttSelMilestone100,.TUXGanttSelMilestone100Crit,.TUXGanttSelMilestone100Err { background-position: -1825px 0px; }
			.TUXGanttMilestone100Hover,.TUXGanttMilestone100CritHover,.TUXGanttMilestone100CritHover { background-position: -1850px 0px; }
			.TUXGanttSelMilestone100Hover,.TUXGanttSelMilestone100CritHover,.TUXGanttSelMilestone100CritHover { background-position: -1875px 0px; }
			.TUXGanttMilestone0Crit { background-position:-1700px 0px; }
			.TUXGanttSelMilestone0Crit { background-position:-1725px 0px; }
			.TUXGanttMilestone0CritHover { background-position: -1750px 0px; }
			.TUXGanttSelMilestone0CritHover { background-position: -1775px 0px; }
			.TUXGanttMilestone0Err { background-position:-1000px 0px; }
			.TUXGanttSelMilestone0Err { background-position:-1025px 0px; }
			.TUXGanttMilestone0ErrHover { background-position: -1050px 0px; }
			.TUXGanttSelMilestone0ErrHover { background-position: -1075px 0px; }
			
			/* --- Stop milestone for Run bar --- */
			.TUXGanttStopMilestone { background-position: -900px 0px; }
			.TUXGanttStopSelMilestone { background-position: -925px 0px; }
			.TUXGanttStopMilestoneHover { background-position: -950px 0px; }
			.TUXGanttStopSelMilestoneHover { background-position: -975px 0px; }
			
			/* --- Milestone - Group color --- */
			.TUXGanttGroupMilestone { background-position: -900px 0px; }
			.TUXGanttGroupSelMilestone { background-position: -925px 0px; }
			.TUXGanttGroupMilestoneHover { background-position: -950px 0px; }
			.TUXGanttGroupSelMilestoneHover { background-position: -975px 0px; }
			.TUXGanttGroupMilestone0 { background-position: -1600px 0px; }
			.TUXGanttGroupSelMilestone0 { background-position: -1625px 0px; }
			.TUXGanttGroupMilestone0Hover { background-position: -1650px 0px; }
			.TUXGanttGroupSelMilestone0Hover { background-position: -1675px 0px; }
			.TUXGanttGroupMilestone0Crit { background-position:-1400px 0px; }
			.TUXGanttGroupSelMilestone0Crit { background-position:-1425px 0px; }
			.TUXGanttGroupMilestone0CritHover { background-position: -1450px 0px; }
			.TUXGanttGroupSelMilestone0CritHover { background-position: -1475px 0px; }
			.TUXGanttGroupMilestone0Err { background-position:-1300px 0px; }
			.TUXGanttGroupSelMilestone0Err { background-position:-1325px 0px; }
			.TUXGanttGroupMilestone0ErrHover { background-position: -1350px 0px; }
			.TUXGanttGroupSelMilestone0ErrHover { background-position: -1375px 0px; }
			
			/* --- Milestone - custom colors --- */
			.TUXGanttRedMilestone { background-position: -1000px 0px; } .TUXGanttRedMilestoneHover { background-position: -1050px 0px; }
			.TUXGanttRedSelMilestone { background-position: -1025px 0px; } .TUXGanttRedSelMilestoneHover { background-position: -1075px 0px; }
			.TUXGanttMaroonMilestone { background-position: -1000px 0px; } .TUXGanttMaroonMilestoneHover { background-position: -1050px 0px; }
			.TUXGanttMaroonSelMilestone { background-position: -1025px 0px; } .TUXGanttMaroonSelMilestoneHover { background-position: -1075px 0px; }
			.TUXGanttBlueMilestone { background-position: -1100px 0px; } .TUXGanttBlueMilestoneHover { background-position: -1150px 0px; }
			.TUXGanttBlueSelMilestone { background-position: -1125px 0px; } .TUXGanttBlueSelMilestoneHover { background-position: -1175px 0px; }
			.TUXGanttNavyMilestone { background-position: -1100px 0px; } .TUXGanttNavyMilestoneHover { background-position: -1150px 0px; }
			.TUXGanttNavySelMilestone { background-position: -1125px 0px; } .TUXGanttNavySelMilestoneHover { background-position: -1175px 0px; }
			.TUXGanttGreenMilestone { background-position: -1200px 0px; } .TUXGanttGreenMilestoneHover { background-position: -1250px 0px; }
			.TUXGanttGreenSelMilestone { background-position: -1225px 0px; } .TUXGanttGreenSelMilestoneHover { background-position: -1275px 0px; }
			.TUXGanttBlackMilestone { background-position: -900px 0px; } .TUXGanttBlackMilestoneHover { background-position: -950px 0px; }
			.TUXGanttBlackSelMilestone { background-position: -925px 0px; } .TUXGanttBlackSelMilestoneHover { background-position: -975px 0px; }
			.TUXGanttGrayMilestone { background-position: -900px 0px; } .TUXGanttGrayMilestoneHover { background-position: -950px 0px; }
			.TUXGanttGraySelMilestone { background-position: -925px 0px; } .TUXGanttGraySelMilestoneHover { background-position: -975px 0px; }
			.TUXGanttFuchsiaMilestone { background-position: -1300px 0px; } .TUXGanttFuchsiaMilestoneHover { background-position: -1350px 0px; }
			.TUXGanttFuchsiaSelMilestone { background-position: -1325px 0px; } .TUXGanttFuchsiaSelMilestoneHover { background-position: -1375px 0px; }
			.TUXGanttPurpleMilestone { background-position: -1300px 0px; } .TUXGanttPurpleMilestoneHover { background-position: -1350px 0px; }
			.TUXGanttPurpleSelMilestone { background-position: -1325px 0px; } .TUXGanttPurpleSelMilestoneHover { background-position: -1375px 0px; }
			.TUXGanttYellowMilestone { background-position: -1400px 0px; } .TUXGanttYellowMilestoneHover { background-position: -1450px 0px; }
			.TUXGanttYellowSelMilestone { background-position: -1425px 0px; } .TUXGanttYellowSelMilestoneHover { background-position: -1475px 0px; }
			.TUXGanttOliveMilestone { background-position: -1400px 0px; } .TUXGanttOliveMilestoneHover { background-position: -1450px 0px; }
			.TUXGanttOliveSelMilestone { background-position: -1425px 0px; } .TUXGanttOliveSelMilestoneHover { background-position: -1475px 0px; }
			.TUXGanttAquaMilestone { background-position: -1500px 0px; } .TUXGanttAquaMilestoneHover { background-position: -1550px 0px; }
			.TUXGanttAquaSelMilestone { background-position: -1525px 0px; } .TUXGanttAquaSelMilestoneHover { background-position: -1575px 0px; }
			.TUXGanttTealMilestone { background-position: -1500px 0px; } .TUXGanttTealMilestoneHover { background-position: -1550px 0px; }
			.TUXGanttTealSelMilestone { background-position: -1525px 0px; } .TUXGanttTealSelMilestoneHover { background-position: -1575px 0px; }
			.TUXGanttSilverMilestone { background-position: -1600px 0px; } .TUXGanttSilverMilestoneHover { background-position: -1650px 0px; }
			.TUXGanttSilverSelMilestone { background-position: -1625px 0px; } .TUXGanttSilverSelMilestoneHover { background-position: -1675px 0px; }
			.TUXGanttWhiteMilestone { background-position: -1600px 0px; } .TUXGanttWhiteMilestoneHover { background-position: -1650px 0px; }
			.TUXGanttWhiteSelMilestone { background-position: -1625px 0px; } .TUXGanttWhiteSelMilestoneHover { background-position: -1675px 0px; }
			.TUXGanttOrangeMilestone { background-position: -1700px 0px; } .TUXGanttOrangeMilestoneHover { background-position: -1750px 0px; }
			.TUXGanttOrangeSelMilestone { background-position: -1725px 0px; } .TUXGanttOrangeSelMilestoneHover { background-position: -1775px 0px; }
			.TUXGanttLimeMilestone { background-position: -1800px 0px; } .TUXGanttLimeMilestoneHover { background-position: -1850px 0px; }
			.TUXGanttLimeSelMilestone { background-position: -1825px 0px; } .TUXGanttLimeSelMilestoneHover { background-position: -1875px 0px; }
			
			/* --- Disabled milestone, used instead of Complete --- */
			.TUXGanttMilestoneDisabled { background-position:-1600px 0px; }
			.TUXGanttSelMilestoneDisabled { background-position:-1625px 0px; }
			.TUXGanttMilestoneDisabledHover { background-position: -1650px 0px; }
			.TUXGanttSelMilestoneDisabledHover { background-position: -1675px 0px; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                          Flag                                                           */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttFlag { background:url(Gantt.gif?v110) no-repeat 0px 0px; width:16px; height:15px; overflow:hidden; }
			.TUXGanttFlagHover { background-position:-50px 0px; }
			.TUXGanttFlagCustom { background-repeat:no-repeat; width:16px; height:15px; overflow:hidden; }
			.TUXGanttFlagCustomHover { background-color:red; }
			.TUXGanttFlagText,.TUXGanttFlagTextNoIcon,.TUXGanttFlagTextRtl {   
			overflow:hidden; margin:1px; padding:2px; border:1px solid; 
			font-size:9px; line-height:9px; font-family:"Microsoft Sans Serif",Verdana,Arial; white-space:pre; background:yellow; overflow:hidden; 
			}
			.TUXGanttFlagText { margin-left:17px; }
			.TUXGanttFlagTextRtl { margin-right:17px; }
			.TUXGanttFlagTextHover, .TUXGanttFlagTextNoIconHover { border:1px solid red!important; }
			.TUXGanttFlagMenu { padding-right:16px; padding-bottom:256px; font:15px Arial; background-repeat:no-repeat; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                          Point                                                          */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttPoint1,.TUXGanttPoint2,.TUXGanttPoint3,.TUXGanttPoint4,.TUXGanttPoint5,.TUXGanttPoint6,.TUXGanttPoint7,.TUXGanttPoint8 {
			background:url(Gantt.gif?v110) no-repeat; width:17px; height:17px; overflow:hidden; 
			}
			.TUXGanttPointCustom { background-position:0px 0px!important; background-repeat:no-repeat; width:17px; height:17px; overflow:hidden; }  
			.TUXGanttPointCustomHover { background-color:red; }
			.TUXGanttPoint1 { background-position:-900px 0px; }
			.TUXGanttPoint1Hover { background-position: -950px 0px; }
			.TUXGanttPoint2 { background-position:-1000px 0px; }
			.TUXGanttPoint2Hover { background-position:-1050px 0px; }
			.TUXGanttPoint3 { background-position:-1100px 0px; }
			.TUXGanttPoint3Hover { background-position:-1150px 0px; }
			.TUXGanttPoint4 { background-position:-1200px 0px; }
			.TUXGanttPoint4Hover { background-position:-1250px 0px; }
			.TUXGanttPoint5 { background-position:-1300px 0px; }
			.TUXGanttPoint5Hover { background-position:-1350px 0px; }
			.TUXGanttPoint6 { background-position:-1400px 0px; }
			.TUXGanttPoint6Hover { background-position:-1450px 0px; }
			.TUXGanttPoint7 { background-position:-1500px 0px; }
			.TUXGanttPoint7Hover { background-position:-1550px 0px; }
			.TUXGanttPoint8 { background-position:-1600px 0px; }
			.TUXGanttPoint8Hover { background-position:-1650px 0px; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                          Mark                                                          */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttMark,.TUXGanttMark1,.TUXGanttMark2,.TUXGanttMark3,.TUXGanttMark4,.TUXGanttMark5,.TUXGanttMark15 { height:5000px; overflow:hidden; background:#880; }
			.TUXGanttMarkImg { height:5000px; overflow:hidden; }
			.TUXGanttMark1 { background:red; }
			.TUXGanttMark2 { background:green; }
			.TUXGanttMark3 { background:yellow; }
			.TUXGanttMark4 { background:black; }
			.TUXGanttMark5 { background:silver; }
			.TUXGanttMark6 { background:#F8F; margin-top:14px!important; height:2px!important; margin-bottom:-16px!important; }
			.TUXGanttMark7 { background:#0F0; margin-top:14px!important; height:2px!important; margin-bottom:-16px!important; }
			.TUXGanttMark8 { background:silver; margin-top:14px!important; height:2px!important; margin-bottom:-16px!important; }
			.TUXGanttMark9 { background:#F8F; margin-top:2px!important; height:2px!important; margin-bottom:-4px!important; }
			.TUXGanttMark10 { background:#0F0; margin-top:2px!important; height:2px!important; margin-bottom:-4px!important; }
			.TUXGanttMark11 { background:silver; margin-top:2px!important; height:2px!important; margin-bottom:-4px!important; }
			.TUXGanttMark12 { background:#F8F; margin-top:8px!important; height:1px!important; margin-bottom:-9px!important; }
			.TUXGanttMark13 { background:#0F0; margin-top:8px!important; height:1px!important; margin-bottom:-9px!important; }
			.TUXGanttMark14 { background:silver; margin-top:8px!important; height:1px!important; margin-bottom:-9px!important; }
			.TUXGanttMark15 { background:#FF00FF; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                             Availability / Resource chart                                               */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttAvailability { height:5000px; background:#ACF; border:1px solid #88F; border-bottom:0px none; }
			.TUXGanttAvailabilityNeg { height:5000px; background:#FCA; border:1px solid #F88; border-top:0px none; }
			.TUXGanttAvailabilityText,.TUXGanttAvailabilityTextNeg { color:blue; background:none!important; text-align:center; font:bold 12px Arial; overflow:visible!important; white-space:nowrap; }
			.TUXGanttAvailabilityTextNeg { color:red; }
			.TUXGanttAvailabilityTextLeft { text-align:left; padding-left:2px; }
			.TUXGanttAvailabilityTextRight { text-align:right; padding-right:2px; }
			.TUXGanttAvailabilityAxis { background:#CCC; }
			.TUXGanttAvailabilityTransparent { opacity:0.7; filter:alpha(opacity=70); }
			.TUXGanttAvailabilityTransparentText { opacity:0.99; filter:alpha(opacity=99); }
			.TUXGanttAvailabilityRed { color:red; background:#F88; border-color:red; }
			.TUXGanttAvailabilityMaroon { color:maroon; background:#B77; border-color:maroon; }
			.TUXGanttAvailabilityOrange { color:orange; background:#FD8; border-color:orange; }
			.TUXGanttAvailabilityYellow { color:#BB0; background:#EE8; border-color:#CC0; }
			.TUXGanttAvailabilityOlive { color:olive; background:#CC8; border-color:olive; }
			.TUXGanttAvailabilityLime { color:#0D0; background:#8F8; border-color:#0D0; }
			.TUXGanttAvailabilityGreen { color:green; background:#6C6; border-color:green; }
			.TUXGanttAvailabilityAqua { color:#8DD; background:#8FF; border-color:#8DD; }
			.TUXGanttAvailabilityTeal { color:teal; background:#6CC; border-color:teal; }
			.TUXGanttAvailabilityBlue { color:blue; background:#99F; border-color:blue; }
			.TUXGanttAvailabilityNavy { color:navy; background:#66C; border-color:navy; }
			.TUXGanttAvailabilityFuchsia { color:fuchsia; background:#F8F; border-color:fuchsia; }
			.TUXGanttAvailabilityPurple { color:purple; background:#C6C; border-color:purple; }
			.TUXGanttAvailabilityBlack { color:#AAA; background:black; border-color:#AAA; }
			.TUXGanttAvailabilityGray { color:#400040; background:#AAA; border-color:#400040; }
			.TUXGanttAvailabilitySilver { color:silver; background:#DDD; border-color:silver; }
			.TUXGanttAvailabilityWhite { color:#CCC; background:#F8F8F8; border-color:#CCC; }
			.TUXGanttAvailabilityNB { border-top:0px none; border-bottom:0px none; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                       Dependencies                                                      */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------------------------------------  Dependency lines 0 - 9 ------------------------------------------------------ */
			
			.TUXGanttDep00 { border:1px solid white; width:1px; height:1px; overflow:hidden; }  /* Dependency line, can define border width and style (all border edges must have the same width), width and height (the width and height must be the same)  */
			.TUXGanttDep00Lag { margin-top:1px; border-top:1px dotted; height:2px; overflow:hidden; } /* Horizontal lag, can define height, vertical border size and vertical margin */
			.TUXGanttDep00IE { width:3px; height:3px; } /* Defines width and height for IE5 quirks mode, must be GanttDep00 width+border_widths, height+border_heights  */
			.TUXGanttDep00LagIE { height:3px; } /* Defines height for IE5 quirks mode, must be GanttDep00Lag height+border_heights  */
			
			.TUXGanttDep0Color { background:#00F; } /* dependency line color, can define background and border color */
			.TUXGanttDep0LagColor { border-top-color:#00F; } /* Horizontal lag color, can define background and border color */
			.TUXGanttDep1Color { background:#080; } .TUXGanttDep1LagColor { border-color:#080; }
			.TUXGanttDep2Color { background:#D70; } .TUXGanttDep2LagColor { border-color:#D70; }
			.TUXGanttDep3Color { background:#000; } .TUXGanttDep3LagColor { border-color:#000; }
			.TUXGanttDep4Color { background:#F0F; } .TUXGanttDep4LagColor { border-color:#F0F; }
			.TUXGanttDep5Color { background:#0DD; } .TUXGanttDep5LagColor { border-color:#0DD; }
			.TUXGanttDep6Color { background:#7D0; } .TUXGanttDep6LagColor { border-color:#7D0; }
			.TUXGanttDep7Color { background:#BB0; } .TUXGanttDep7LagColor { border-color:#BB0; }
			.TUXGanttDep8Color { background:#AAA; } .TUXGanttDep8LagColor { border-color:#AAA; }
			.TUXGanttDep9Color { background:#F00; } .TUXGanttDep9LagColor { border-color:#F00; }
			
			.TUXGanttDepArrow00Shift { width:4px; } /* Horizontal shift of the second arrow on the same place */
			.TUXGanttDepArrow00Stub { width:2px; }  /* Horizontal shift of the first arrow and last dependency start on the same place */
			.TUXGanttDepArrow00 { height:11px; width:8px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } /* Defines especially size of the dependency arrows */
			
			.TUXGanttDepArrow0Left { background-position:0px 0px; } .TUXGanttDepArrow0Right { background-position:-22px 0px; }
			.TUXGanttDepArrow1Left { background-position:-40px 0px; } .TUXGanttDepArrow1Right { background-position:-62px 0px; }
			.TUXGanttDepArrow2Left { background-position:-80px 0px; } .TUXGanttDepArrow2Right { background-position:-102px 0px; }
			.TUXGanttDepArrow3Left { background-position:-120px 0px; } .TUXGanttDepArrow3Right { background-position:-142px 0px; }
			.TUXGanttDepArrow4Left { background-position:-160px 0px; } .TUXGanttDepArrow4Right { background-position:-182px 0px; }
			.TUXGanttDepArrow5Left { background-position:-200px 0px; } .TUXGanttDepArrow5Right { background-position:-222px 0px; }
			.TUXGanttDepArrow6Left { background-position:-240px 0px; } .TUXGanttDepArrow6Right { background-position:-262px 0px; }
			.TUXGanttDepArrow7Left { background-position:-280px 0px; } .TUXGanttDepArrow7Right { background-position:-302px 0px; }
			.TUXGanttDepArrow8Left { background-position:-320px 0px; } .TUXGanttDepArrow8Right { background-position:-342px 0px; }
			.TUXGanttDepArrow9Left { background-position:-360px 0px; } .TUXGanttDepArrow9Right { background-position:-382px 0px; }
			
			.TUXGanttDepStub00Shift { width:4px; }  /* Horizontal shift of the second dependency start on the same place */
			.TUXGanttDepStub00 { height:7px; width:5px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } /* Defines especially size of the dependency start */
			
			.TUXGanttDepStub0Left { background-position:-1601px 0px; } .TUXGanttDepStub0Right { background-position:-1620px 0px; }
			.TUXGanttDepStub1Left { background-position:-1641px 0px; } .TUXGanttDepStub1Right { background-position:-1660px 0px; }
			.TUXGanttDepStub2Left { background-position:-1681px 0px; } .TUXGanttDepStub2Right { background-position:-1700px 0px; }
			.TUXGanttDepStub3Left { background-position:-1721px 0px; } .TUXGanttDepStub3Right { background-position:-1740px 0px; }
			.TUXGanttDepStub4Left { background-position:-1761px 0px; } .TUXGanttDepStub4Right { background-position:-1780px 0px; }
			.TUXGanttDepStub5Left { background-position:-1801px 0px; } .TUXGanttDepStub5Right { background-position:-1820px 0px; }
			.TUXGanttDepStub6Left { background-position:-1841px 0px; } .TUXGanttDepStub6Right { background-position:-1860px 0px; }
			.TUXGanttDepStub7Left { background-position:-1881px 0px; } .TUXGanttDepStub7Right { background-position:-1900px 0px; }
			.TUXGanttDepStub8Left { background-position:-1921px 0px; } .TUXGanttDepStub8Right { background-position:-1940px 0px; }
			.TUXGanttDepStub9Left { background-position:-1961px 0px; } .TUXGanttDepStub9Right { background-position:-1980px 0px; }
			
			.TUXGanttDepLag0Left { background-position:-1611px 0px; } .TUXGanttDepLag0Right { background-position:-1630px 0px; }
			.TUXGanttDepLag1Left { background-position:-1651px 0px; } .TUXGanttDepLag1Right { background-position:-1670px 0px; }
			.TUXGanttDepLag2Left { background-position:-1691px 0px; } .TUXGanttDepLag2Right { background-position:-1710px 0px; }
			.TUXGanttDepLag3Left { background-position:-1731px 0px; } .TUXGanttDepLag3Right { background-position:-1750px 0px; }
			.TUXGanttDepLag4Left { background-position:-1771px 0px; } .TUXGanttDepLag4Right { background-position:-1790px 0px; }
			.TUXGanttDepLag5Left { background-position:-1811px 0px; } .TUXGanttDepLag5Right { background-position:-1830px 0px; }
			.TUXGanttDepLag6Left { background-position:-1851px 0px; } .TUXGanttDepLag6Right { background-position:-1870px 0px; }
			.TUXGanttDepLag7Left { background-position:-1891px 0px; } .TUXGanttDepLag7Right { background-position:-1910px 0px; }
			.TUXGanttDepLag8Left { background-position:-1931px 0px; } .TUXGanttDepLag8Right { background-position:-1950px 0px; }
			.TUXGanttDepLag9Left { background-position:-1971px 0px; } .TUXGanttDepLag9Right { background-position:-1990px 0px; }
			
			.TUXGanttDep00Hover { border-color:#F88; } .TUXGanttDepLag00Hover { border-top:1px dotted red; }
			.TUXGanttDepArrow00LeftHover { background-position:-3200px 0px; } .TUXGanttDepArrow00RightHover { background-position:-3222px 0px; }
			.TUXGanttDepStub00LeftHover { background-position:-3361px 0px; } .TUXGanttDepStub00RightHover { background-position:-3370px 0px; }
			
			/* ------------------------------------------  Dependency lines 10 - 19 ---------------------------------------------------- */
			
			.TUXGanttDep10 { border:1px solid; width:2px; height:2px; overflow:hidden; }
			.TUXGanttDep10Lag { border-top:1px dotted; border-bottom:1px dotted; height:2px; overflow:hidden; }
			.TUXGanttDep10IE { width:4px; height:4px; }
			.TUXGanttDep10LagIE { height:4px; }
			
			.TUXGanttDep10Color { background:#DDF; border-color:#00F; } .TUXGanttDep10LagColor { background:white; border-color:#00F; }
			.TUXGanttDep11Color { background:#ADA; border-color:#080; } .TUXGanttDep11LagColor { background:white; border-color:#080; }
			.TUXGanttDep12Color { background:#FDA; border-color:#D70; } .TUXGanttDep12LagColor { background:white; border-color:#D70; }
			.TUXGanttDep13Color { background:#DDD; border-color:#000; } .TUXGanttDep13LagColor { background:white; border-color:#000; }
			.TUXGanttDep14Color { background:#FDF; border-color:#F0F; } .TUXGanttDep14LagColor { background:white; border-color:#F0F; }
			.TUXGanttDep15Color { background:#DFF; border-color:#0DD; } .TUXGanttDep15LagColor { background:white; border-color:#0DD; }
			.TUXGanttDep16Color { background:#DFD; border-color:#7D0; } .TUXGanttDep16LagColor { background:white; border-color:#7D0; }
			.TUXGanttDep17Color { background:#FF0; border-color:#BB0; } .TUXGanttDep17LagColor { background:white; border-color:#BB0; }
			.TUXGanttDep18Color { background:#EEE; border-color:#AAA; } .TUXGanttDep18LagColor { background:white; border-color:#AAA; }
			.TUXGanttDep19Color { background:#FDD; border-color:#F00; } .TUXGanttDep19LagColor { background:white; border-color:#F00; }
			
			.TUXGanttDepArrow10Shift { width:5px; }
			.TUXGanttDepArrow10Stub { width:3px; }
			.TUXGanttDepArrow10 { height:14px; width:16px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } 
			
			.TUXGanttDepArrow10Left { background-position:-400px 0px; } .TUXGanttDepArrow10Right { background-position:-420px 0px; }
			.TUXGanttDepArrow11Left { background-position:-440px 0px; } .TUXGanttDepArrow11Right { background-position:-460px 0px; }
			.TUXGanttDepArrow12Left { background-position:-480px 0px; } .TUXGanttDepArrow12Right { background-position:-500px 0px; }
			.TUXGanttDepArrow13Left { background-position:-520px 0px; } .TUXGanttDepArrow13Right { background-position:-540px 0px; }
			.TUXGanttDepArrow14Left { background-position:-560px 0px; } .TUXGanttDepArrow14Right { background-position:-580px 0px; }
			.TUXGanttDepArrow15Left { background-position:-600px 0px; } .TUXGanttDepArrow15Right { background-position:-620px 0px; }
			.TUXGanttDepArrow16Left { background-position:-640px 0px; } .TUXGanttDepArrow16Right { background-position:-660px 0px; }
			.TUXGanttDepArrow17Left { background-position:-680px 0px; } .TUXGanttDepArrow17Right { background-position:-700px 0px; }
			.TUXGanttDepArrow18Left { background-position:-720px 0px; } .TUXGanttDepArrow18Right { background-position:-740px 0px; }
			.TUXGanttDepArrow19Left { background-position:-760px 0px; } .TUXGanttDepArrow19Right { background-position:-780px 0px; }
			
			.TUXGanttDepStub10Shift { width:4px; }  
			.TUXGanttDepStub10 { height:8px; width:5px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } 
			
			.TUXGanttDepStub10Left { background-position:-2000px 0px; } .TUXGanttDepStub10Right { background-position:-2020px 0px; }
			.TUXGanttDepStub11Left { background-position:-2040px 0px; } .TUXGanttDepStub11Right { background-position:-2060px 0px; }
			.TUXGanttDepStub12Left { background-position:-2080px 0px; } .TUXGanttDepStub12Right { background-position:-2100px 0px; }
			.TUXGanttDepStub13Left { background-position:-2120px 0px; } .TUXGanttDepStub13Right { background-position:-2140px 0px; }
			.TUXGanttDepStub14Left { background-position:-2160px 0px; } .TUXGanttDepStub14Right { background-position:-2180px 0px; }
			.TUXGanttDepStub15Left { background-position:-2200px 0px; } .TUXGanttDepStub15Right { background-position:-2220px 0px; }
			.TUXGanttDepStub16Left { background-position:-2240px 0px; } .TUXGanttDepStub16Right { background-position:-2260px 0px; }
			.TUXGanttDepStub17Left { background-position:-2280px 0px; } .TUXGanttDepStub17Right { background-position:-2300px 0px; }
			.TUXGanttDepStub18Left { background-position:-2320px 0px; } .TUXGanttDepStub18Right { background-position:-2340px 0px; }
			.TUXGanttDepStub19Left { background-position:-2360px 0px; } .TUXGanttDepStub19Right { background-position:-2380px 0px; }
			
			.TUXGanttDepLag10Left { background-position:-2010px 0px; } .TUXGanttDepLag10Right { background-position:-2030px 0px; }
			.TUXGanttDepLag11Left { background-position:-2050px 0px; } .TUXGanttDepLag11Right { background-position:-2070px 0px; }
			.TUXGanttDepLag12Left { background-position:-2090px 0px; } .TUXGanttDepLag12Right { background-position:-2110px 0px; }
			.TUXGanttDepLag13Left { background-position:-2130px 0px; } .TUXGanttDepLag13Right { background-position:-2150px 0px; }
			.TUXGanttDepLag14Left { background-position:-2170px 0px; } .TUXGanttDepLag14Right { background-position:-2190px 0px; }
			.TUXGanttDepLag15Left { background-position:-2210px 0px; } .TUXGanttDepLag15Right { background-position:-2230px 0px; }
			.TUXGanttDepLag16Left { background-position:-2250px 0px; } .TUXGanttDepLag16Right { background-position:-2270px 0px; }
			.TUXGanttDepLag17Left { background-position:-2290px 0px; } .TUXGanttDepLag17Right { background-position:-2310px 0px; }
			.TUXGanttDepLag18Left { background-position:-2330px 0px; } .TUXGanttDepLag18Right { background-position:-2350px 0px; }
			.TUXGanttDepLag19Left { background-position:-2370px 0px; } .TUXGanttDepLag19Right { background-position:-2390px 0px; }
			
			.TUXGanttDep10Hover { background:#F88; } .TUXGanttDepLag10Hover { background:#F88; }
			.TUXGanttDepArrow10LeftHover { background-position:-3240px 0px; } .TUXGanttDepArrow10RightHover { background-position:-3260px 0px; }
			.TUXGanttDepStub10LeftHover { background-position:-3380px 0px; } .TUXGanttDepStub10RightHover { background-position:-3390px 0px; }
			
			/* ------------------------------------------  Dependency lines 20 - 29 ---------------------------------------------------- */
			
			.TUXGanttDep20 { border:1px solid; width:3px; height:3px; overflow:hidden; }
			.TUXGanttDep20Lag { margin-top:1px; border-top:1px dotted; border-bottom:1px dotted; height:1px; overflow:hidden; } 
			.TUXGanttDep20IE { width:5px; height:5px; } 
			.TUXGanttDep20LagIE { height:3px; } 
			
			.TUXGanttDep20Color { background:#00F; border-color:#DDF; border-right-color:#BBF; border-bottom-color:#BBF; } .TUXGanttDep20LagColor { border-color:#00F; background:#DDF; } 
			.TUXGanttDep21Color { background:#080; border-color:#ADA; border-right-color:#7C7; border-bottom-color:#7C7; } .TUXGanttDep21LagColor { border-color:#080; background:#ADA; } 
			.TUXGanttDep22Color { background:#D70; border-color:#FDA; border-right-color:#FC8; border-bottom-color:#FC8; } .TUXGanttDep22LagColor { border-color:#D70; background:#FDA; } 
			.TUXGanttDep23Color { background:#000; border-color:#DDD; border-right-color:#BBB; border-bottom-color:#BBB; } .TUXGanttDep23LagColor { border-color:#000; background:#DDD; } 
			.TUXGanttDep24Color { background:#F0F; border-color:#FDF; border-right-color:#FBF; border-bottom-color:#FBF; } .TUXGanttDep24LagColor { border-color:#F0F; background:#FDF; } 
			.TUXGanttDep25Color { background:#0DD; border-color:#DFF; border-right-color:#BFF; border-bottom-color:#BFF; } .TUXGanttDep25LagColor { border-color:#0DD; background:#DFF; } 
			.TUXGanttDep26Color { background:#7D0; border-color:#DFD; border-right-color:#BFB; border-bottom-color:#BFB; } .TUXGanttDep26LagColor { border-color:#7D0; background:#DFD; } 
			.TUXGanttDep27Color { background:#BB0; border-color:#FF8; border-right-color:#FF0; border-bottom-color:#FF0; } .TUXGanttDep27LagColor { border-color:#BB0; background:#FF8; } 
			.TUXGanttDep28Color { background:#AAA; border-color:#EEE; border-right-color:#DDD; border-bottom-color:#DDD; } .TUXGanttDep28LagColor { border-color:#AAA; background:#EEE; } 
			.TUXGanttDep29Color { background:#F00; border-color:#FDD; border-right-color:#FBB; border-bottom-color:#FBB; } .TUXGanttDep29LagColor { border-color:#F00; background:#FDD; } 
			
			.TUXGanttDepArrow20Shift { width:5px; }
			.TUXGanttDepArrow20Stub { width:3px; }
			.TUXGanttDepArrow20 { height:15px; width:15px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } 
			
			.TUXGanttDepArrow20Left { background-position:-800px 0px; } .TUXGanttDepArrow20Right { background-position:-820px 0px; }
			.TUXGanttDepArrow21Left { background-position:-840px 0px; } .TUXGanttDepArrow21Right { background-position:-860px 0px; }
			.TUXGanttDepArrow22Left { background-position:-880px 0px; } .TUXGanttDepArrow22Right { background-position:-900px 0px; }
			.TUXGanttDepArrow23Left { background-position:-920px 0px; } .TUXGanttDepArrow23Right { background-position:-940px 0px; }
			.TUXGanttDepArrow24Left { background-position:-960px 0px; } .TUXGanttDepArrow24Right { background-position:-980px 0px; }
			.TUXGanttDepArrow25Left { background-position:-1000px 0px; } .TUXGanttDepArrow25Right { background-position:-1020px 0px; }
			.TUXGanttDepArrow26Left { background-position:-1040px 0px; } .TUXGanttDepArrow26Right { background-position:-1060px 0px; }
			.TUXGanttDepArrow27Left { background-position:-1080px 0px; } .TUXGanttDepArrow27Right { background-position:-1100px 0px; }
			.TUXGanttDepArrow28Left { background-position:-1120px 0px; } .TUXGanttDepArrow28Right { background-position:-1140px 0px; }
			.TUXGanttDepArrow29Left { background-position:-1160px 0px; } .TUXGanttDepArrow29Right { background-position:-1180px 0px; }
			
			.TUXGanttDepStub20Shift { width:4px; }
			.TUXGanttDepStub20 { height:11px; width:5px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; } 
			
			.TUXGanttDepStub20Left { background-position:-2400px 0px; } .TUXGanttDepStub20Right { background-position:-2420px 0px; }
			.TUXGanttDepStub21Left { background-position:-2440px 0px; } .TUXGanttDepStub21Right { background-position:-2460px 0px; }
			.TUXGanttDepStub22Left { background-position:-2480px 0px; } .TUXGanttDepStub22Right { background-position:-2500px 0px; }
			.TUXGanttDepStub23Left { background-position:-2520px 0px; } .TUXGanttDepStub23Right { background-position:-2540px 0px; }
			.TUXGanttDepStub24Left { background-position:-2560px 0px; } .TUXGanttDepStub24Right { background-position:-2580px 0px; }
			.TUXGanttDepStub25Left { background-position:-2600px 0px; } .TUXGanttDepStub25Right { background-position:-2620px 0px; }
			.TUXGanttDepStub26Left { background-position:-2640px 0px; } .TUXGanttDepStub26Right { background-position:-2660px 0px; }
			.TUXGanttDepStub27Left { background-position:-2680px 0px; } .TUXGanttDepStub27Right { background-position:-2700px 0px; }
			.TUXGanttDepStub28Left { background-position:-2720px 0px; } .TUXGanttDepStub28Right { background-position:-2740px 0px; }
			.TUXGanttDepStub29Left { background-position:-2760px 0px; } .TUXGanttDepStub29Right { background-position:-2780px 0px; }
			
			.TUXGanttDepLag20Left { background-position:-2410px 0px; } .TUXGanttDepLag20Right { background-position:-2430px 0px; }
			.TUXGanttDepLag21Left { background-position:-2450px 0px; } .TUXGanttDepLag21Right { background-position:-2470px 0px; }
			.TUXGanttDepLag22Left { background-position:-2490px 0px; } .TUXGanttDepLag22Right { background-position:-2510px 0px; }
			.TUXGanttDepLag23Left { background-position:-2530px 0px; } .TUXGanttDepLag23Right { background-position:-2550px 0px; }
			.TUXGanttDepLag24Left { background-position:-2570px 0px; } .TUXGanttDepLag24Right { background-position:-2590px 0px; }
			.TUXGanttDepLag25Left { background-position:-2610px 0px; } .TUXGanttDepLag25Right { background-position:-2630px 0px; }
			.TUXGanttDepLag26Left { background-position:-2650px 0px; } .TUXGanttDepLag26Right { background-position:-2670px 0px; }
			.TUXGanttDepLag27Left { background-position:-2690px 0px; } .TUXGanttDepLag27Right { background-position:-2710px 0px; }
			.TUXGanttDepLag28Left { background-position:-2730px 0px; } .TUXGanttDepLag28Right { background-position:-2750px 0px; }
			.TUXGanttDepLag29Left { background-position:-2770px 0px; } .TUXGanttDepLag29Right { background-position:-2790px 0px; }
			
			.TUXGanttDep20Hover { border:1px solid red; } .TUXGanttDepLag20Hover { background:red; }
			.TUXGanttDepArrow20LeftHover { background-position:-3280px 0px; } .TUXGanttDepArrow20RightHover { background-position:-3300px 0px; }
			.TUXGanttDepStub20LeftHover { background-position:-3400px 0px; } .TUXGanttDepStub20RightHover { background-position:-3410px 0px; }
			
			/* ------------------------------------------  Dependency lines 30 - 39 ---------------------------------------------------- */
			
			.TUXGanttDep30 { border:1px solid; width:4px; height:4px; overflow:hidden; }
			.TUXGanttDep30Lag { border-top:1px dotted; border-bottom:1px dotted; height:4px; overflow:hidden; }
			.TUXGanttDep30IE { width:6px; height:6px; }
			.TUXGanttDep30LagIE { height:6px; }
			
			.TUXGanttDep30Color { background:#DDF; border-color:#00F; } .TUXGanttDep30LagColor { background:white; border-color:#00F; }
			.TUXGanttDep31Color { background:#ADA; border-color:#080; } .TUXGanttDep31LagColor { background:white; border-color:#080; }
			.TUXGanttDep32Color { background:#FDA; border-color:#D70; } .TUXGanttDep32LagColor { background:white; border-color:#D70; }
			.TUXGanttDep33Color { background:#DDD; border-color:#000; } .TUXGanttDep33LagColor { background:white; border-color:#000; }
			.TUXGanttDep34Color { background:#FDF; border-color:#F0F; } .TUXGanttDep34LagColor { background:white; border-color:#F0F; }
			.TUXGanttDep35Color { background:#DFF; border-color:#0DD; } .TUXGanttDep35LagColor { background:white; border-color:#0DD; }
			.TUXGanttDep36Color { background:#DFD; border-color:#7D0; } .TUXGanttDep36LagColor { background:white; border-color:#7D0; }
			.TUXGanttDep37Color { background:#FF0; border-color:#BB0; } .TUXGanttDep37LagColor { background:white; border-color:#BB0; }
			.TUXGanttDep38Color { background:#EEE; border-color:#AAA; } .TUXGanttDep38LagColor { background:white; border-color:#AAA; }
			.TUXGanttDep39Color { background:#FDD; border-color:#F00; } .TUXGanttDep39LagColor { background:white; border-color:#F00; }
			
			.TUXGanttDepArrow30Shift { width:6px; }
			.TUXGanttDepArrow30Stub { width:3px; }
			.TUXGanttDepArrow30 { height:16px; width:17px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; }
			
			.TUXGanttDepArrow30Left { background-position:-1200px 0px; } .TUXGanttDepArrow30Right { background-position:-1220px 0px; }
			.TUXGanttDepArrow31Left { background-position:-1240px 0px; } .TUXGanttDepArrow31Right { background-position:-1260px 0px; }
			.TUXGanttDepArrow32Left { background-position:-1280px 0px; } .TUXGanttDepArrow32Right { background-position:-1300px 0px; }
			.TUXGanttDepArrow33Left { background-position:-1320px 0px; } .TUXGanttDepArrow33Right { background-position:-1340px 0px; }
			.TUXGanttDepArrow34Left { background-position:-1360px 0px; } .TUXGanttDepArrow34Right { background-position:-1380px 0px; }
			.TUXGanttDepArrow35Left { background-position:-1400px 0px; } .TUXGanttDepArrow35Right { background-position:-1420px 0px; }
			.TUXGanttDepArrow36Left { background-position:-1440px 0px; } .TUXGanttDepArrow36Right { background-position:-1460px 0px; }
			.TUXGanttDepArrow37Left { background-position:-1480px 0px; } .TUXGanttDepArrow37Right { background-position:-1500px 0px; }
			.TUXGanttDepArrow38Left { background-position:-1520px 0px; } .TUXGanttDepArrow38Right { background-position:-1540px 0px; }
			.TUXGanttDepArrow39Left { background-position:-1560px 0px; } .TUXGanttDepArrow39Right { background-position:-1580px 0px; }
			
			.TUXGanttDepStub30Shift { width:4px; }
			.TUXGanttDepStub30 { height:12px; width:6px; background:url(Dependencies.gif?v110) no-repeat; overflow:hidden; }
			
			.TUXGanttDepStub30Left { background-position:-2800px 0px; } .TUXGanttDepStub30Right { background-position:-2820px 0px; }
			.TUXGanttDepStub31Left { background-position:-2840px 0px; } .TUXGanttDepStub31Right { background-position:-2860px 0px; }
			.TUXGanttDepStub32Left { background-position:-2880px 0px; } .TUXGanttDepStub32Right { background-position:-2900px 0px; }
			.TUXGanttDepStub33Left { background-position:-2920px 0px; } .TUXGanttDepStub33Right { background-position:-2940px 0px; }
			.TUXGanttDepStub34Left { background-position:-2960px 0px; } .TUXGanttDepStub34Right { background-position:-2980px 0px; }
			.TUXGanttDepStub35Left { background-position:-3000px 0px; } .TUXGanttDepStub35Right { background-position:-3020px 0px; }
			.TUXGanttDepStub36Left { background-position:-3040px 0px; } .TUXGanttDepStub36Right { background-position:-3060px 0px; }
			.TUXGanttDepStub37Left { background-position:-3080px 0px; } .TUXGanttDepStub37Right { background-position:-3100px 0px; }
			.TUXGanttDepStub38Left { background-position:-3120px 0px; } .TUXGanttDepStub38Right { background-position:-3140px 0px; }
			.TUXGanttDepStub39Left { background-position:-3160px 0px; } .TUXGanttDepStub39Right { background-position:-3180px 0px; }
			
			.TUXGanttDepLag30Left { background-position:-2810px 0px; } .TUXGanttDepLag30Right { background-position:-2830px 0px; }
			.TUXGanttDepLag31Left { background-position:-2850px 0px; } .TUXGanttDepLag31Right { background-position:-2870px 0px; }
			.TUXGanttDepLag32Left { background-position:-2890px 0px; } .TUXGanttDepLag32Right { background-position:-2910px 0px; }
			.TUXGanttDepLag33Left { background-position:-2930px 0px; } .TUXGanttDepLag33Right { background-position:-2950px 0px; }
			.TUXGanttDepLag34Left { background-position:-2970px 0px; } .TUXGanttDepLag34Right { background-position:-2990px 0px; }
			.TUXGanttDepLag35Left { background-position:-3010px 0px; } .TUXGanttDepLag35Right { background-position:-3030px 0px; }
			.TUXGanttDepLag36Left { background-position:-3050px 0px; } .TUXGanttDepLag36Right { background-position:-3070px 0px; }
			.TUXGanttDepLag37Left { background-position:-3090px 0px; } .TUXGanttDepLag37Right { background-position:-3110px 0px; }
			.TUXGanttDepLag38Left { background-position:-3130px 0px; } .TUXGanttDepLag38Right { background-position:-3150px 0px; }
			.TUXGanttDepLag39Left { background-position:-3170px 0px; } .TUXGanttDepLag39Right { background-position:-3190px 0px; }
			
			.TUXGanttDep30Hover { background:#F88; } .TUXGanttDepLag30Hover { background:#F88; }
			.TUXGanttDepArrow30LeftHover { background-position:-3320px 0px; } .TUXGanttDepArrow30RightHover { background-position:-3340px 0px; }
			.TUXGanttDepStub30LeftHover { background-position:-3420px 0px; } .TUXGanttDepStub30RightHover { background-position:-3430px 0px; }
			
			/* ---------------------------------------  Base dependency settings ---------------------------------------------------- */
			
			/* --- Base dependency sizes for calculation, change only the width --- */
			.TUXGanttDepStartShift { width:9px; } /* Shift of the line start from its box edge, plus 10 */
			.TUXGanttDepStartShiftAdjacent { width:10px; } /* Shift of the line start from its box edge when set GanttAdjacentBars=1, plus 10 */
			.TUXGanttDepStartShiftLag { width:12px; } /* Shift of the line start when lag goes into the box, the value is shift to the box plus 10 */
			.TUXGanttDepEndShift { width:9px; }  /* Shift of the arrow from its box edge, plus 10 */
			.TUXGanttDepEndShiftAdjacent { width:10px; }  /* Shift of the arrow from its box edge when set GanttAdjacentBars=1, plus 10 */
			.TUXGanttDepSpace { width:1px; } /* Vertical space between bar and horizontal dependency line below the bar */
			.TUXGanttDepRange { width:5px; } /* Width of horizontal dependency level, every level shows only one line, next lines are shifted */
			
			/* --- Base dependency settings, don't change them --- */
			.TUXGanttDepHorzLeft,.TUXGanttDepHorzBoth { border-left:0px none; overflow:hidden; }
			.TUXGanttDepHorzRight,.TUXGanttDepHorzBoth { border-right:0px none; overflow:hidden; }
			.TUXGanttDepHorz { overflow:hidden; }
			.TUXGanttDepVert { border-top:0px none; border-bottom:0px none; overflow:hidden; margin-bottom:-5000px; height:5000px; }
			.TUXGanttDepNone { border:0px none; overflow:hidden; margin-bottom:-5000px; height:5000px; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                       Constraints                                                       */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttMinStart,.TUXGanttMaxStart,.TUXGanttMinEnd,.TUXGanttMaxEnd { background:url(Gantt.gif?v110) no-repeat; width:7px; height:18px; overflow:hidden; }
			.TUXGanttMinStart { background-position:-500px 0px; }
			.TUXGanttMaxStart { background-position:-550px 0px; }
			.TUXGanttMinEnd { background-position:-600px 0px; }
			.TUXGanttMaxEnd { background-position:-650px 0px; }
			.TUXGanttMinStartHover { background-position:-700px 0px; }
			.TUXGanttMaxStartHover { background-position:-750px 0px; }
			.TUXGanttMinEndHover { background-position:-800px 0px; }
			.TUXGanttMaxEndHover { background-position:-850px 0px; }
			.TUXGanttConstraintCustom { background-repeat:no-repeat; width:16px; height:15px; overflow:hidden; }
			.TUXGanttConstraintCustomHover { background-color:red; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                      Background and Straight vertical lines                                             */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --- Base background for GanttBackground, GanttExclude, GanttLines, GanttBase, GanttFinish --- */
			.TUXGanttBack { height:300000px; margin-bottom:-300000px; overflow:hidden; margin-left:auto; margin-right:auto; }  /* Default background setting, don't change */
			.TUXGanttBackRow {  height:5000px; margin-bottom:-5000px; overflow:hidden; margin-left:auto; margin-right:auto; }  /* Default background setting if shown in individual row, don't change */
			.TUXGanttBackEnd { margin-top:-300000; height:0px; overflow:hidden; }                                              /* Ending tag of background definition, don't change */
			.TUXGanttBackEndIE { margin-top:-300021; height:21px; overflow:hidden; }                                           /* Ending tag of background definition for IE5 quirks mode, don't change */
			
			.TUXGanttBackDefault { background:none; }                                                                          /* Default background color */
			.TUXGanttBackRowDefault { background:white; }                                                                      /* Default background color if shown in individual row */
			
			/* --- Predefined 11 gray backgrounds --- */
			.TUXGanttBack0 { background:#FFFFFF; }
			.TUXGanttBack1 { background:#E8E8E8; }
			.TUXGanttBack2 { background:#D0D0D0; }
			.TUXGanttBack3 { background:#B8B8B8; }
			.TUXGanttBack4 { background:#A0A0A0; }
			.TUXGanttBack5 { background:#888888; }
			.TUXGanttBack6 { background:#707070; }
			.TUXGanttBack7 { background:#585858; }
			.TUXGanttBack8 { background:#404040; }
			.TUXGanttBack9 { background:#282828; }
			.TUXGanttBack10 { background:#101010; }
			
			/* --- Predefined 17 background colors --- */
			.TUXGanttBackAqua { background:aqua; }
			.TUXGanttBackBlack { background:black; }
			.TUXGanttBackBlue { background:blue; }
			.TUXGanttBackFuchsia { background:fuchsia; }
			.TUXGanttBackGray { background:gray; }
			.TUXGanttBackGreen { background:green; }
			.TUXGanttBackLime { background:lime; }
			.TUXGanttBackMaroon { background:maroon; }
			.TUXGanttBackNavy { background:navy; }
			.TUXGanttBackOlive { background:olive; }
			.TUXGanttBackOrange { background:orange; }
			.TUXGanttBackPurple { background:purple; }
			.TUXGanttBackRed { background:red; }
			.TUXGanttBackSilver { background:silver; }
			.TUXGanttBackTeal { background:teal; }
			.TUXGanttBackWhite { background:white; }
			.TUXGanttBackYellow { background:yellow; }
			
			/* --- Exclude colors if not defined the GanttExclude type */
			.TUXGanttExclude { background:#E9E9E9; }        /* Background for Exclude if shown */
			.TUXGanttExcludeHidden { background:#E9E9E9; }  /* Background for Exclude if hidden by GanttHideExclude='1' */
			
			/* --- Base and Finish lines --- */
			.TUXGanttBase,.TUXGanttFinish { background:#35CFFF; width:2px; }
			.TUXGanttFinishAuto,.TUXGanttBaseAuto { background:#35CFFF; width:1px; }
			
			/* --- Vertical Lines --- */
			.TUXGanttLineAqua { background:aqua; width:1px; } .TUXGanttLineAqua2 { background:aqua; width:2px; } .TUXGanttLineAqua3 { background:aqua; width:3px; }
			.TUXGanttLineBlack { background:black; width:1px; } .TUXGanttLineBlack2 { background:black; width:2px; } .TUXGanttLineBlack3 { background:black; width:3px; }
			.TUXGanttLineBlue { background:blue; width:1px; } .TUXGanttLineBlue2 { background:blue; width:2px; } .TUXGanttLineBlue3 { background:blue; width:3px; }
			.TUXGanttLineFuchsia { background:fuchsia; width:1px; } .TUXGanttLineFuchsia2 { background:fuchsia; width:2px; } .TUXGanttLineFuchsia3 { background:fuchsia; width:3px; }
			.TUXGanttLineGray { background:gray; width:1px; } .TUXGanttLineGray2 { background:gray; width:2px; } .TUXGanttLineGray3 { background:gray; width:3px; }
			.TUXGanttLineGreen { background:green; width:1px; } .TUXGanttLineGreen2 { background:green; width:2px; } .TUXGanttLineGreen3 { background:green; width:3px; }
			.TUXGanttLineLime { background:lime; width:1px; } .TUXGanttLineLime2 { background:lime; width:2px; } .TUXGanttLineLime3 { background:lime; width:3px; }
			.TUXGanttLineMaroon { background:maroon; width:1px; } .TUXGanttLineMaroon2 { background:maroon; width:2px; } .TUXGanttLineMaroon3 { background:maroon; width:3px; }
			.TUXGanttLineNavy { background:navy; width:1px; } .TUXGanttLineNavy2 { background:navy; width:2px; } .TUXGanttLineNavy3 { background:navy; width:3px; }
			.TUXGanttLineOlive { background:olive; width:1px; } .TUXGanttLineOlive2 { background:olive; width:2px; } .TUXGanttLineOlive3 { background:olive; width:3px; }
			.TUXGanttLineOrange { background:orange; width:1px; } .TUXGanttLineOrange2 { background:orange; width:2px; } .TUXGanttLineOrange3 { background:orange; width:3px; }
			.TUXGanttLinePurple { background:purple; width:1px; } .TUXGanttLinePurple2 { background:purple; width:2px; } .TUXGanttLinePurple3 { background:purple; width:3px; }
			.TUXGanttLineRed { background:red; width:1px; } .TUXGanttLineRed2 { background:red; width:2px; } .TUXGanttLineRed3 { background:red; width:3px; }
			.TUXGanttLineSilver { background:silver; width:1px; } .TUXGanttLineSilver2 { background:silver; width:2px; } .TUXGanttLineSilver3 { background:silver; width:3px; }
			.TUXGanttLineTeal { background:teal; width:1px; } .TUXGanttLineTeal2 { background:teal; width:2px; } .TUXGanttLineTeal3 { background:teal; width:3px; }
			.TUXGanttLineWhite { background:white; width:1px; } .TUXGanttLineWhite2 { background:white; width:2px; } .TUXGanttLineWhite3 { background:white; width:3px; }
			.TUXGanttLineYellow { background:yellow; width:1px; } .TUXGanttLineYellow2 { background:yellow; width:2px; } .TUXGanttLineYellow3 { background:yellow; width:3px; }
			
			.TUXGanttLineHidden { background:none; width:1px; }
			
			/* --- Hover vertical lines --- */
			.TUXGanttLineHover { background:red; } /* Used for all vertical lines, base and finish */
			.TUXGanttLineRedHover,.TUXGanttLineRed2Hover,.TUXGanttLineRed3Hover { background:black; }
			.TUXGanttBaseHover,.TUXGanttBaseAutoHover,.TUXGanttFinishHover,.TUXGanttFinishAutoHover { background:black; }
			.TUXGanttLineHiddenHover { background:black; }
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                               Gantt column Header                                                       */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			.TUXGanttHeader {  height:50px; margin-left:-10px; margin-right:-4px; margin-top:-2px; }
			.TUXGanttHeaderBase {
			font:14px 'Helvetica Neue', Helvetica, Arial, sans-serif; white-space:nowrap; text-align:center; border-right:1px solid #E0E0E0; border-left:1px solid #E0E0E0; color:#000000;
			padding:5px 0px;
			}
			
			
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                       Other                                                             */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Rectagle shown when selecting more run boxes. */
			.TUXGanttSelectRect { position:absolute; z-index:300; border:1px solid black; background:gray; opacity:0.2; filter:alpha(opacity=20); }
			
			/* Vertical line shown when moving or resizing Gantt object */
			.TUXGanttDragLine1 { position:absolute; z-index:300; border-left:1px solid black; overflow:hidden; width:1px; }
			
			/* Second vertical line shown when moving Gantt object */
			.TUXGanttDragLine2 { position:absolute; z-index:300; border-left:1px solid gray; overflow:hidden; width:1px; }
			
			/* Parent hover tag used especially for dependencies */
			.TUXGanttHover { position:absolute; left:0px; top:0px; z-index:6; }
			
			/* Tip shown during dragging Gantt object. The ...Run... is used if moved (not slide) GanttRun */
			.TUXDragGanttTip,.TUXDragGanttRunTip {
			background:#f4f4f4; border:1px solid #d0d0d0; padding:3px; cursor:default;
			margin-top:-4px; font:11.5px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; white-space:nowrap; position:absolute; z-index:300;
			}
			.TUXDragGanttRunTip {
			margin-top:-12px;
			}
			
			
			
			/* Do not change, marks the style loaded */
			.TUXGanttLoaded { border:1px solid black!important; }
		</style>
	</template>
</dom-module>
`;

addDomStyleModule(styles, "triplat-availability/styles/tristyles-gantt.js");