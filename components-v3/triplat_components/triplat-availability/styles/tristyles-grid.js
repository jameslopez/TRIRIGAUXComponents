/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { addDomStyleModule } from "../../tricore-util/tricore-util.js";

const styles = `
<dom-module id="grid-styles">
	<template>
		<style>
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                      TreeGrid CSS style                                                 */
			
			/*                                                        TRIRIGA style                                                    */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* To remove all the comments replace such RegEx: \/\*([^\*]|\n|\r)*\*\/|\s*\r\n?\s*(?=\r\n?)|\s+(?=[\{\}])|\s+(?=\r)
			
			In the description, the sentence starting by "@" lists what only should be changed in the CSS class
			*/
			
			
			/* ------------- Group definition for all TreeGrid tags ------------- */
			
			/* ! Note, here is no style prefix, it is shared among all TreeGrid styles 
			@ Set here default values for CSS attributes of tags <td>, <th>, <tr>, <table>, <tbody>, <div>, <span>, <u>,
			if your global style sheet redefined them, especially attributes controlling size and measurement, otherwise TreeGrid will be switched to Safe CSS mode 
			*/
			.GridMain * { -webkit-box-sizing:content-box!important; -moz-box-sizing:content-box!important; box-sizing:content-box!important; }
			
			/* ------------- Base tags ------------- */
			
			/* @ Do not change.
			FF3 version is used for Firefox 3 - 19 due its slow bug in rendering table cells with different borders 
			*/
			.TUXNone { display:none; }
			.TUXSection,.TUXSectionFF3 { table-layout:fixed; width:0px; font-size:0px; line-height:0px; }
			.TUXSectionFF3 { border-collapse:collapse; }
			.TUXSection img { vertical-align:top; }
			
			/* -------------- Main TreeGrid <table> tag, contains the table sections ------------------ */
			
			/* It controls border around the grid. 
			@ Set margin, border and padding. 
			Padding is ignored in IE7 strict, IE6 strict and IE5 quirks modes. 
			*/
			.TUXMainTable { background:white; border-bottom:1px solid #E0E0E0; border-collapse:separate; text-align:left; padding: 3px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Grid sections                                                    */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* -------------- Table sections with cells, <div> tag inside <td> tag ------------------ */
			
			/* They control border and spaces between grid sections. 
			@ Set border, padding and margin. Set them with relation to Splitters, Scrollbars and Space rows settings.
			...Head... (<Head> top fixed rows), ...Body... (<Body> variable rows), ...Foot... (<Foot> bottom fixed rows)
			...Left (<LefCols> left fixed columns), ...Mid (<Cols> variable columns), ...Right (<RightCols> right fixed columns)
			...SectionScroll is set to the tag inside section that has overflow:scroll; @ Do not change
			!! Sections on horizontal direction (...Left, ...Mid, ...Right) must have the same height (border+padding+margin)
			!! Sections on vertical direction (...Head..., ...Body..., ...Foot...) must have the same width (border+padding+margin)
			*/
			.TUXBodyLeft,.TUXBodyMid,.TUXBodyRight,.TUXHeadLeft,.TUXHeadMid,.TUXHeadRight,.TUXFootLeft,.TUXFootMid,.TUXFootRight { }
			.TUXHeadLeft,.TUXHeadMid,.TUXHeadRight { border-top:1px solid #E0E0E0; border-bottom:1px solid #AEAEAE;}
			.TUXBodyLeft,.TUXBodyMid,.TUXBodyRight { }
			.TUXFootLeft,.TUXFootMid,.TUXFootRight { border-top:1px solid #CBCBCB;}
			.TUXHeadLeft,.TUXBodyLeft,.TUXFootLeft { border-right:1px solid #e9e9e9;}
			.TUXHeadMid,.TUXBodyMid,.TUXFootMid { }
			.TUXHeadRight,.TUXBodyRight,.TUXFootRight { border-left:1px solid #e9e9e9; }
			.TUXSectionScroll::-webkit-scrollbar { display:none; }
			
			/* -------------- Splitters between resizable table sections, <td> tag ------------------ */
			
			/* The <td> tags are shown between the sections <td> tags when set <Cfg LeftWidth, MidWidth, RightWidth/> attributes and <Cfg SectionResizing='1'/>
			They control horizontal space between the resizable sections. 
			@ Set left/right border and padding and also width and background.
			LeftSplitter is between ...Left and ...Mid column sections and RightSplitter is between ...Mid and ...Right column sections.
			The splitter tag is shown in every row section (Head,Body,Foot) and in the horizontal scrollbars section.
			...Touch versions are shown instead on touch screens like iPad
			...HeadSplitter, ...BodySplitter, ...FootSplitter is added for appropriate row section, ...ScrollSplitter is added to splitter between horizontal scrollbars
			...SplitterDisabled is added if the sections cannot be resized now, due their actual width or permissions
			*/
			.TUXLeftSplitter,.TUXRightSplitter,.TUXLeftSplitterTouch,.TUXRightSplitterTouch { width:10px; background:#f9f9f9; overflow:hidden; cursor:e-resize; font-size:1px; border-right: #AEAEAE; border-left: #AEAEAE; }
			.TUXLeftSplitterTouch,.TUXRightSplitterTouch { width:15px; }
			.TUXLeftSplitter,.TUXLeftSplitterTouch { border-right:1px solid #e9e9e9; }
			.TUXRightSplitter,.TUXRightSplitterTouch { border-left:1px solid #e9e9e9; }
			.TUXHeadSplitter { }
			.TUXBodySplitter { }
			.TUXFootSplitter { }
			.TUXScrollSplitter { }
			.TUXSplitterDisabled { background:white; cursor:default; }
			
			/* -------------- Vertical scrollbar, <div> tag inside <td> tag ------------------ */
			
			/* The vertical scrollbar is placed on right side to <td> tag in Head section and is spanned through Body section and inner Space rows to Foot section 
			It controls the border and space around the scrollbar. 
			@ Set border, padding and margin, optionally background.
			@ You can control the scrollbar shape and look in IE or WebKit on its immediate child <div> as .TRIVScroll > div
			*/
			.TUXVScroll { padding-top:1px; border-top:1px solid #e9e9e9; border-right:1px solid #e9e9e9; overflow:hidden; }
			
			/* -------------- Horizontal scrollbars, <div> tag inside <td> tag ------------------ */
			
			/* ...Left (for <LefCols> left fixed columns), ...Mid (for <Cols> variable columns), ...Right (for <RightCols> right fixed columns)
			They control the border and space around the scrollbar. 
			@ Set border, padding and margin, optionally background.
			@ You can control the scrollbar shape and look in IE or WebKit on their immediate child <div> as .TRIHScroll... > div
			...Resize versions are shown instead for resizable sections, when set <Cfg LeftWidth, MidWidth, RightWidth/> attributes and <Cfg SectionResizing='2'/>
			...ResizeTouch versions are shown instead on touch screens like iPad 
			...HScrollWide is shown instead of all the section scrollbars when set <Cfg WideHScroll='1'/>
			...ScrollHidden is shown instead if the column section does not need to show scrollbar (but the other sections do)
			...XScroll is shown in the horizontal scrollbars row in place of vertical scrollbar
			*/
			.TUXHScrollLeft,.TUXHScrollMid,.TUXHScrollRight { overflow:hidden; }
			.TUXHScrollLeft { padding-right:1px; }
			.TUXHScrollMid { }
			.TUXHScrollRight { padding-left:1px; }
			.TUXHScrollLeftResize,.TUXHScrollRightResize,.TUXHScrollMidLeftResize,.TUXHScrollMidRightResize { background:#F4F4F4; overflow:hidden; }
			.TUXHScrollLeftResize { border-right:1px dotted black; padding-right:5px; margin-right:1px; }
			.TUXHScrollRightResize { border-left:1px dotted black; padding-left:5px; margin-left:1px; }
			.TUXHScrollMidLeftResize { border-left:1px dotted black; padding-left:5px; }
			.TUXHScrollMidRightResize { border-right:1px dotted black; padding-right:5px; }
			.TUXHScrollLeftResizeTouch,.TUXHScrollRightResizeTouch,.TUXHScrollMidLeftResizeTouch,.TUXHScrollMidRightResizeTouch { background:#F4F4F4; overflow:hidden; }
			.TUXHScrollLeftResizeTouch { border-right:1px dotted black; padding-right:18px; margin-right:1px; }
			.TUXHScrollRightResizeTouch { border-left:1px dotted black; padding-left:18px; margin-left:1px; }
			.TUXHScrollMidLeftResizeTouch { border-left:1px dotted black; padding-left:19px; }
			.TUXHScrollMidRightResizeTouch { border-right:1px dotted black; padding-right:19px; }
			.TUXHScrollWide { overflow:hidden; }
			.TUXHScrollHidden { }
			.TUXXScroll { background:#FFF; border-right:1px solid #e9e9e9; cursor:default; }
			
			/* -------------- Special scrollbar setting for Safari and Chrome, <div> tag inside <td> tag ------------------ */
			
			/* Added to vertical and horizontal scrollbar to force showing scrollbars in Safari and Chrome if they are automatically hidden
			@ Change here the scrollbars look; The scrollbars must be defined as permanently visible
			! Note, here is no style prefix
			*/
			.GridHiddenScroll > div::-webkit-scrollbar { -webkit-appearance:none; width:11px; height:11px; } 
			.GridHiddenScroll > div::-webkit-scrollbar-thumb { border-radius:8px; border:2px solid white; background-color:rgba(0,0,0,0.5); }
			
			/* ------------------ Round corners ------------------ */
			
			/* Used to render something above and below the grid, to simulate e.g. rounded corners with special effects compatible in all browsers */
			
			/* ...Top is set to <div> tag rendered directly above ...MainTable with the same width as the table 
			...Top0 to ...Top9 is set to up 10 <div> tags inside ...Top. The tag is not rendered if the class has not set height.
			...TopSpace0 to ...TopSpace9 is added to ...Top0 to ...Top9 in case there is some visible Space row width Space = 0
			*/
			.TUXTop { }
			.TUXTop1 { }
			.TUXTop2 { }
			.TUXTop3 { }
			.TUXTop4 { }
			.TUXTop5 { }
			
			/* ...Bottom is set to <div> tag rendered directly below ...MainTable with the same width as the table 
			...Bottom0 to ...Top9 is set to up 10 <div> tags inside ...Top. The tag is not rendered if the class has not set height.
			...BottomSpace0 to ...BottomSpace9 is added to ...Bottom0 to ...Bottom9 in case there is some visible Space row width Space = 4
			*/
			.TUXBottom { }
			.TUXBottom5 { }
			.TUXBottom4 { }
			.TUXBottom3 { }
			.TUXBottom2 { }
			.TUXBottom1 { }
			
			/* -------------- Row pages, <div> tag ------------------ */
			
			/* They control the border and space around the row page */
			/* @ Set here vertical border, padding and margin.
			...PageOne is shown if no root paging is set (<Cfg Paging='0'/>. 
			...PageFirst is the first root page, the ...Page are all the next root pages
			...ChildPart is shown around the row children, regardless on the <Cfg ChildParts/> is set or not
			...Border is added to all the classes for DynamicBorder, e.g. .TRIPageBorder is used instead of .TRIPage
			*/
			.TUXPageFirst { }
			.TUXPage {  border-top:1px solid #D4D4D4; }
			.TUXPageOne { }
			.TUXChildPart { }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Rows                                                             */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------- Table row height ------------------ */
			
			/* Classes are not assigned, only the height attribute is read. 
			@ Set the height in pixels only. 
			...RowHeight is default minimal height in pixels of all rows in table (not Space rows). It is outer height including all cell border and padding.
			...RowHeightTouch is used instead on touch screens like iPad 
			*/
			.TUXRowHeight { height:50px;}
			.TUXRowHeightTouch { height:50px;}
			
			/* ------------- Table rows, <tr> tag ------------------ */
			
			/* Sets the class to the whole column section of the row. Useful to set for special backgrounds.
			...DataRow is set for all standard table rows without Kind attribute set
			@ Set here only background
			*/
			.TUXHeaderRow { }
			.TUXFilterRow { }
			.TUXDataRow { }
			
			/* ------------- Space row height ------------------ */
			
			/* Classes are not assigned, only the height or margin attribute is read. 
			@ Set the height or margin in pixels only. 
			...SpaceRowHeight is default minimal height in pixels of all Space rows. It is outer height including all cell border and padding, but not the margin.
			...SpaceMargin is horizontal and vertical margin in pixels around all Space row cells. 
			...SpaceMarginTouch is used instead on touch screens like iPad 
			*/
			.TUXSpaceRowHeight { height:19px; }
			.TUXSpaceMargin { margin:0px; }
			.TUXSpaceMarginTouch { margin:0px; }
			
			/* ------------- Space rows, <div> tag inside <td> tag ------------------ */
			
			/* Space row class according to the row Kind as prefix+Kind+"Row". In XML the Kind can be set as tag name like <Group ... />. Default Kind is "Space".
			Every Space row is placed in its own <tr><td> tag, on the same level as table sections like Head/Body/Foot (...Left/Mid/Right).
			@ Set here border, padding, margin and background
			The horizontal border and spacing of Space rows should be synchronized with the table sections
			*/
			.TUXSpaceRow,.TUXGroupRow,.TUXSearchRow,.TUXPagerRow,.TUXToolbarRow,.TUXToolbar1Row,.TUXToolbar2Row,.TUXToolbar3Row,.TUXTopbarRow,.TUXTopbar1Row,.TUXTopbar2Row,.TUXTopbar3Row,.TUXTabberRow {
			
			padding:3px 0px 3px 0px; font-size:0px; overflow:hidden; white-space:nowrap;
			}
			.TUXSpaceRow { }                                /* Standard Space row with no special meaning */
			.TUXGroupRow { }                                /* Grouping settings row */
			.TUXSearchRow { }                               /* Search settings row */
			.TUXPagerRow { }                                /* Simple pager row with Pages type cell */
			.TUXToolbarRow { border-top:1px; margin-top:4px; padding-top:2px; border-bottom:1px; margin-bottom:4px; padding-bottom:2px; }  /* Bottom standalone toolbar */
			.TUXToolbar1Row { border-top:1px; margin-top:2px; padding-top:2px; } /* First bottom toolbar */
			.TUXToolbar2Row { }                             /* Last bottom toolbar */
			.TUXToolbar3Row { }                             /* Middle bottom toolbars */
			.TUXTopbarRow { }                               /* Standalone top toolbar */
			.TUXTopbar1Row { }                              /* First top toolbar*/
			.TUXTopbar2Row { }                              /* Last top toolbar */
			.TUXTopbar3Row { }                              /* Middle top toolbars */
			.TUXTabberRow { padding:0px; }                  /* Tabber row with Tab type cells, usually used with ...RowAbove or ...RowBelow */
			
			/* Special Space row Kind="Fill" shown for ConstHeight='1'*/
			.TUXFillRow { background:white; }
			
			/* Special Space row Kind="NoData" shown when all body rows are hidden */
			.TUXNoDataRow {  background:#FAFAFA; padding:5px 0px 5px 5px; overflow:hidden; }
			.TUXNoDataRow div { color:gray!important; font-style:italic!important; }
			
			/* Class added to Space row Kind class for its position (Space attribute value), only value 0 to 4 */
			.TUXRowSpace0 { }
			.TUXRowSpace1 { }
			.TUXRowSpace2 { }
			.TUXRowSpace3 { }
			.TUXRowSpace4 { }
			
			/* Special Space row above or below grid, used instead of Kind class, ...RowAbove is added for Space='-1', ...RowBelow for Space='5' */
			.TUXRowAbove,.TUXRowBelow { border-left:1px solid #e0e0ff; border-right:1px solid #e0e0ff; margin-left:1px; margin-right:1px; overflow:hidden; }
			.TUXRowAbove { margin-top:3px; background:url(Backgrounds.gif?v120) 0px -250px; }
			.TUXRowBelow {  margin-bottom:3px; background:url(Backgrounds.gif?v120) 0px bottom; }
			
			/* Class added for row with Panel='1' */
			.TUXSpaceRowPanel { padding-left:0px; }
			
			/* Class added for given row VAlign attribute value */
			.TUXSpaceVAlignTop { }
			.TUXSpaceVAlignMiddle { }
			.TUXSpaceVAlignBottom { }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Cells                                                            */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------- Table cells, <td> tag ------------- */
			
			/* Classes for table row cells (not Space rows). Always one class per one cell.
			@ Set border here. Note, all cells in table must have the same border width/height in the same cell edge.
			@ You can set also padding here, but note, the padding is defined also in cell type class.
			@ You can set also background here, but note, the data cell background color is often controlled by ...Color state classes
			...Cell - base data cell
			...CellPanel - cell Type="Panel"
			...CellFilter - cell in row Kind="Filter"
			...CellFilterPanel - cell Name="Panel" in row Kind="Filter". Note, it is used only for default panel named "Panel"
			...CellHeader - cell in row Kind="Header"
			...CellHeaderPanel - cell Type="Panel" in row Kind="Header"
			...CellEmpty - cell in _ConstWidth column (created due <Cfg ConstWidth/> setting), also in row Kind="Filter"
			...CellHeaderEmpty - cell in _ConstWidth column (created due <Cfg ConstWidth/> setting) in row Kind="Header"
			...CellUser - user cell section defined by <I LeftHtml MidHtml RightHtml/>
			...CellHidden - cell in child row hidden due spanned parent row through its children
			...CellIndex - cell in column RowIndex
			*/
			.TUXCell,.TUXCellPanel,.TUXCellFilter,.TUXCellFilterPanel,.TUXCellHeader,.TUXCellHeaderPanel,.TUXCellHeaderEmpty,.TUXCellUser,.TUXCellEmpty,.TUXCellIndex,.TUXCellIndexPanel,.TUXCellRowPanel {
			border-bottom:1px solid #E0E0E0; vertical-align:top; overflow:hidden; overflow:auto!IE; background-color: white!important;
			}
			.TUXCell { }
			.TUXCellHeader,.TUXCellHeaderPanel,.TUXCellHeaderEmpty { background: white; }
			.TUXCellPanel,.TUXCellHeaderPanel,.TUXCellFilterPanel,.TUXCellIndexPanel,.TUXCellRowPanel { white-space:nowrap; direction:ltr; }
			.TUXCellHeader { vertical-align: middle; }
			.TUXCellHeaderEmpty { background:white; border-color:white; }
			.TUXCellHeaderPanel { vertical-align: middle;}
			.TUXCellPanel { background: white; }
			.TUXCellFilterPanel { background: white; }
			.TUXCellFilter { }
			.TUXCellIndex,.TUXCellIndexPanel { background: white; }
			.TUXCellIndexPanel { }
			.TUXCellRowPanel { background: white; }
			.TUXCellUser { background: white; }
			.TUXCellEmpty { background: white; }
			.TUXCellHidden { background:transparent!important; border:none!important; }
			
			/* Special class added to every cell except panel, filter and header for DynamicBorder. @ Do not change. */
			.TUXCellBorder,.TUXCellHeaderBorder { border-left:2px solid transparent; border-top:2px solid transparent; }
			.TUXCellHeaderBorder { }
			
			/* Special class to choose if the last cells in column or row section will render its border; Not used in grid, only border width is read; @ Set border-right and border-bottom; set it to 0px to SHOW the border */
			.TUXLastCell { border-right:1px solid; border-bottom:0px none; }
			
			/* Classes added to the <td> cell due special feature
			...CellClassInner added to the cell with defined ClassInner attribute (including Header cell)
			...CellClassInnerIcon added to the cell with defined ClassInner attribute and side Icon
			...CellHeaderInnerIcon added to the header cell with defined ClassInner attribute and side Icon
			...CellBorderFF3 is added to all cells in Firefox 3 - 19 due its slow bug in rendering table cells with different borders
			*/
			.TUXCellClassInner { padding-top:0px; padding-bottom:0px; }
			.TUXCellClassInnerIcon { }
			.TUXCellHeaderInnerIcon { }
			.TUXCellBorderFF3 { border-left:0px none!important; border-top:0px none!important; }
			
			/* ------------- Cell content - Type, <td> or <div> tag ------------- */
			
			/* The Type class is by default set to same <td> tag as the table cell or Space cell class.
			Here are listed all TreeGrid Types except: "Gantt" - defined in Gantt.css file; "Chart", "Pages" and "DropCols" - defined later in this file and "Panel" - this class is not used.
			If the cell consists from more included <div> tags, it is set to the most inner <div> tag.
			The one or more <div> tags are included in cell if: 
				any cell has set VAlign, Rotate or ClassInner or Align="Scroll"
				Header cell has set Icon or Type="Bool"
				Space cell has set Icon or is editable or has Button="Defaults"
			There can be included also inner <table> inside cell in these cases:
				any cell has set Span + Merge with more columns and no MergeFormat
				Header cell has set Levels
				MainCol cell when set <Cfg SpannedTree='1'/>
				DropCols and Radio types use also inner <Table>, but the Type class is set to parent cell
			Select type class is set along with Html class for Select Type
			Note, the "Bool", "Icon" and "Select" type classes are not listed in the first line
			@ Set padding and text attributes like font, line-height, text-align, white-space
			*/
			.TUXText,.TUXLines,.TUXInt,.TUXFloat,.TUXDate,.TUXPass,.TUXImg,.TUXLink,.TUXRadio,.TUXEnum,.TUXButton,.TUXHtml,.TUXAbs,.TUXList,.TUXUser,.TUXFile {
				font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; padding: 25px 10px 0px 10px; color: #000000; white-space:nowrap;
			}
			.TUXInt,.TUXFloat,.TUXDate { text-align:right; }
			.TUXLines,.TUXRadio,.TUXHtml,.TUXList { white-space:normal; }	
			.TUXImg,.TUXHtml { padding-top:0px; padding-bottom:0px; }
			.TUXPass { font-size:14px; line-height:17px; padding:0px 0px 0px 3px; }
			.TUXRadio { padding:0px; }
			.TUXBool { text-align:center; line-height:0px; }
			.TUXIcon { background-repeat:no-repeat; }
			.TUXAbs { padding:0px; }
			.TUXUser { padding:0px; }
			.TUXSelect { padding-top:2px; padding-bottom:2px; }
			
			/* Class for inner RowIndex column */
			.TUXIndexText { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:2px 3px 2px 3px; text-align:center; }
			
			/* Class set for cell width Visible='0'.
			@ Set background for the ...Hidden
			It is always set to <td> tag, this tag has always empty content. 
			...Hidden is set to table cell and does not hide the cell, it just makes it empty
			...HiddenSpace is set to Space cell and hides the cell completely
			*/
			.TUXHidden { }
			.TUXHiddenSpace { display:none; }
			
			/* Class set to the right Button cell, the table cell next to the data cell:
			@ Set width, height, padding and text attributes like font, line-height, text-align, white-space
			...RightButton is set for <button> or <u> tag inside <td> tag for Button="Button" according to <Cfg UseButton>
			...RightHtml is set for <td> tag for Button="Html"
			*/
			button.TUXRightButton { font:10px/11px Verdana,Tahoma,"Trebuchet MS",sans-serif; height:17px; width:19px; margin:0px; padding:0px; }
			u.TUXRightButton { 
			background:#E0E0E0; border:1px solid white; border-right:1px solid #888; border-bottom:1px solid #888; padding:0px 3px 1px 3px; margin:1px;
			font:11px/12px Arial,Helvetica,sans-serif; text-decoration:none; display:inline-block; overflow:hidden; white-space:nowrap; 
			}
			.TUXRightHtml { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding-top:2px; padding-bottom:2px; }
			
			/* Class set to inner table <td> tag, when displaying Header cell Levels
			@ Set width and text attributes like font, line-height, text-align, white-space for the ...LevelButton
			...LevelButton is set to every Levels button
			...LevelButtonSpace is set to the next <td> as the space between buttons and cell value. The last <td> cell contains the cell value
			*/
			.TUXLevelButton { 
			background:url(Button.gif?v120) 2px -1253px no-repeat; padding:2px 0px 2px 0px; width:21px; 
			font:11.9px/13px "Microsoft Sans Serif",Tahoma,"Trebuchet MS",sans-serif; text-align:center; cursor:pointer; 
			}
			.TUXLevelButtonSpace { width:5px; }
			
			/* Class set to inner table <td> tag, when displaying merged cells (Span+Merge and no MergeFormat) 
			@ Set border, padding, background, width and height
			...MergedCellH is set to every merged value (<td> tag) when showing all cells in one row (MergeType&1 = 0)
			...MergedCellV is set to every merged value (<td> tag) when showing all cells in one column (MergeType&1 = 1)
			*/
			.TUXMergedCellH { padding:0px; padding-right:5px; }
			.TUXMergedCellV { padding:0px; padding-bottom:1px; }
			
			/* Classes set to cell in Header row
			...HeaderText is set along with the Type class for Header cell, to <td> or <div> tag. @ Set padding and text attributes like font, line-height, text-align, white-space
			...HeaderIconInner is set along with the ...HeaderText if the cell has set Icon, to <td> or <div> tag. @ Set padding.
			...HeaderButton is set to <td> tag next to the cell if the cell has set Button (by default Header cell has set Button="Sort"). @ Set padding or the first child <button> settings.
			...HeaderToolButton is set to <td> tag of the cell type "Button" and Button="Button". @ Set padding
			...HeaderFocus is added to cell <td> tag during dragging the Header cell. @ Set background and optionally border, padding and text attributes like font, line-height, text-align, white-space
			...HeaderDrag is added to ghost Header cell under mouse cursor during dragging the Header cell. @ Set background and border and optionally padding and text attributes like font, line-height, text-align, white-space
			*/
			.TUXHeaderText { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #4178be; padding-left: 10px; }
			.TUXHeaderIconInner { }
			.TUXHeaderButton { padding:0px; }
			.TUXHeaderButtonButton { }
			.TUXHeaderButtonHtml { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding-top:2px; padding-bottom:2px; }
			.TUXHeaderToolButton { text-align:center; padding:0px; }
			.TUXHeaderFocus { background-color:#DEDFD8; }
			.TUXHeaderDrag { background-color:#C0C0B0; cursor:default; overflow:hidden; }
			
			/* Classes added to DropCols type inner table cells, <td> tag. 
			@ Set here border, padding, background and text attributes.
			...DropCols is DropCols type class set to <td> tag
			...HeaderGroup is set to every DropCols inner table cells, except the last one
			...HeaderGroupFocus is added to the DropCols inner table cell during dragging inside the DropCols line (to be moved)
			...HeaderGroupDelete is added to the DropCols inner table cell during dragging outside the DropCols line (to be removed)
			...HeaderGroupCustom is set to the last cell in DropCols inner table, as the default text "To group by, drag column caption here"
			*/
			.TUXDropCols { border-left:0px none; }
			.TUXHeaderGroup { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:0px 3px 0px 3px; border-left:1px solid white; border-right:1px solid #D4D4D4; }
			.TUXHeaderGroupFocus { background-color:#DEDFD8; }
			.TUXHeaderGroupDelete { background-color:#E9E9E9; color:#E9E9E9; }
			.TUXHeaderGroupCustom { font:italic 11.5px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; color:#BBB; padding-left:5px; white-space:nowrap; }
			
			/* Class added to the cell <td> tag when resizing row by dragging this cell edge and direct resizing is off */
			.TUXResizingRow { border-bottom:1px solid black; }
			.TUXResizingSpace { }
			
			/* Classes added to cell with Wrap attribute. Added along with Type class to <td> or <div> tag. 
			@ Do not change. 
			...Wrap0 for Wrap='0', ...Wrap1 for Wrap='1'
			*/
			.TUXWrap0 { white-space:nowrap; }
			.TUXWrap1 { white-space:normal; }
			
			/* Classes added to cell with Align attribute. Added along with Type class to <td> or <div> tag. 
			@ Do not change.
			...AlignLeft for Align='Left', ...AlignCenter for Align='Center',  ...AlignRight for Align='Right', ...AlignJustify for Align="Justify"
			*/
			.TUXAlignLeft { text-align:left; }
			.TUXAlignCenter { text-align:center; }
			.TUXAlignJustify { text-align:justify; }
			.TUXAlignRight { text-align:right; }
			
			/* Classes added to cell with VAlign attribute. Added always to <td> tag. 
			@ Do not change.
			...VAlignTop for VAlign='Top', ...VAlignMiddle for VAlign='Middle',  ...AlignBottom for Align='Bottom'
			The ...VAlignTop must be defined as the last one. In Space row it is added also to all rows without VAlign set.
			*/
			.TUXVAlignMiddle { vertical-align:middle; display:table-cell; }
			.TUXVAlignBottom { vertical-align:bottom; display:table-cell; }
			.TUXVAlignTop { vertical-align:top; display:table-cell; }
			
			/* Classes added to cell with Rotate attribute. 
			@ Change them carefully, the rotation can differ per browser.
			...CellRotate... class is added to cell <td> tag for vertical alignment according to the Rotate and Align values
			...Rotate1 and ...Rotate2 is set to inner <div> to do the rotation, according to Rotate attribute value
			...Rotate1IE is used instead for IE9 and below for Rotate='1', the ...Rotate1IEHeader is used instead for Header cell
			...IconRotate is added to cell <td> for cell with Icon attribute to display icon on top
			...IconRotateLeft is added to extra inner <div> with icon for cell with Icon, IconAlign="Left" and Rotate="1" to display icon on bottom
			...IconRotateHeaderLeft is added to extra inner <div> with icon for Header cell with Icon, IconAlign="Left" and Rotate="1" to display icon on bottom
			...IconRotateHeaderRight is added to extra inner <div> with icon for Header cell with Icon attribute to display icon on top
			*/
			.TUXCellRotate1 { vertical-align:bottom; padding-top:1px; padding-bottom:1px; text-align:left; }
			.TUXCellRotate2 { vertical-align:top; padding-top:1px; padding-bottom:1px; }
			.TUXCellRotate3 { vertical-align:middle; padding-top:1px; padding-bottom:1px; }
			.TUXRotate1IEHeader { background-color:#E9E9E9; filter:progid:DXImageTransform.Microsoft.Chroma(color='#E9E9E9') progid:DXImageTransform.Microsoft.BasicImage(rotation=3); overflow:hidden; }
			.TUXRotate1IE { background-color:#FFFFFF; filter:progid:DXImageTransform.Microsoft.Chroma(color='#FFFFFF') progid:DXImageTransform.Microsoft.BasicImage(rotation=3); overflow:hidden; }
			.TUXRotate1 { -ms-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -webkit-transform:rotate(-90deg); -o-transform:rotate(-90deg); }
			.TUXRotate2IE { writing-mode:tb-rl; }
			.TUXRotate2 { text-align:left; -ms-transform:rotate(-270deg); -moz-transform:rotate(-270deg); -webkit-transform:rotate(-270deg); -o-transform:rotate(-270deg); }
			.TUXIconRotate { padding-left:2px!important; padding-top:20px!important; }
			.TUXIconRotateLeft { margin-left:0px; padding-top:20px!important; }
			.TUXIconRotateHeaderLeft { margin-left:5px; padding-top:20px!important; }
			.TUXIconRotateHeaderRight { margin-left:2px; padding-top:20px!important; }
			
			/* Classes for TextStyle attribute; @ Do not change */
			.TUXTextBold { font-weight:bold; }
			.TUXTextItalic { font-style:italic; }
			.TUXTextUnderline { text-decoration:underline; }
			.TUXTextStrike { text-decoration:line-through; }
			.TUXTextOverline { text-decoration:overline; }
			.TUXTextUnderlineStrike { text-decoration:underline line-through; }
			.TUXTextUnderlineOverline { text-decoration:underline overline; }
			.TUXTextStrikeOverline { text-decoration:line-through overline; }
			.TUXTextUnderlineStrikeOverline { text-decoration:underline line-through overline; }
			.TUXTextSmall { font-variant:small-caps; }
			
			/* Classes used for TextShadow attribute; @ Change only text-shadow */
			/* It is possible to add new classes with higher index like TextShadow10 and use the index in TextShadow attribute */
			/* ...Shadow0 is used also for empty TextShadow when TextShadowColor is set */
			/* The color in the first definition is replaced or added by TextShadowColor */
			.TUXTextShadow0 { text-shadow: 0px 0px 5px; }
			.TUXTextShadow1 { text-shadow: -1px -1px; }
			.TUXTextShadow2 { text-shadow: -1px -1px, -3px -3px silver; }
			.TUXTextShadow3 { text-shadow: -1px -1px, 0px 0px 5px yellow; }
			.TUXTextShadow4 { text-shadow: -1px -1px, 0px 0px 10px; }
			.TUXTextShadow5 { text-shadow: -2px -2px silver; }
			.TUXTextShadow6 { text-shadow: -3px -3px silver, -1px -1px; }
			.TUXTextShadow7 { text-shadow: 0px 0px 3px black,0px 0px 3px black,0px 0px 3px black; }
			.TUXTextShadow8 { text-shadow: 0px 0px 5px yellow, -1px -1px; }
			.TUXTextShadow9 { text-shadow: 0px 0px 10px; }
			
			/*--------------- Space cells ----------------- */
			
			/* Classes control the background and border of the Space cells
			@ Set here border, padding and background
			*/
			.TUXCellSpace,.TUXCellSpaceIcon,.TUXCellSpaceButton,.TUXCellSpaceButtonIcon,.TUXCellSpaceButtonButton,.TUXCellSpacePanel,.TUXCellSpaceBool,.TUXCellSpaceRadio,.TUXCellSpaceSelect,.TUXCellSpaceEdit {
			border-left:1px solid white; border-right:1px solid #D4D4D4;
			}
			
			/* Not editable Space cell. Set also for Label.
			...CellSpace is set to the <td> tag
			...CellSpaceIcon is set to <td> tag instead for cell with Icon attribute
			...SpaceIconInner is set to inner <div> tag for cell with Icon attribute
			*/
			.TUXCellSpace { padding-top:3px; padding-bottom:3px; }
			.TUXCellSpaceIcon { padding-top:1px; padding-bottom:0px; }
			.TUXSpaceIconInner { padding-top:2px; padding-bottom:3px; }
			
			/* Button Type in Space cell
			...CellSpaceButton is set to the <td> tag for cell with Button="Html"
			...CellSpaceButtonIcon is set to the <td> tag instead for cell with Button="Html" and Icon attribute
			...SpaceButtonIconInner is set to inner <div> tag for cell with Button="Html" and Icon attribute
			...CellSpaceButtonButton is set to the <td> tag for cell with Button="Button"
			...CellSpaceTool is added to the <td> tag (along with CellSpaceButton) for cell with Button="Html" and without ButtonText and with VAlign - the special toolbar button
			*/
			.TUXCellSpaceButton { padding:3px; white-space:nowrap; }
			.TUXCellSpaceButtonIcon { padding-top:1px; padding-bottom:0px; white-space:nowrap; }
			.TUXSpaceButtonIconInner { padding-top:2px; padding-bottom:3px; }
			.TUXCellSpaceButtonButton { }
			.TUXCellSpaceTool { padding:0px; }
			
			/* Classes for Type Panel, Bool and Radio in Space cell */
			.TUXCellSpacePanel { line-height:0px; }
			.TUXCellSpaceBool { line-height:0px; }
			.TUXCellSpaceRadio { padding-top:1px; }
			
			/* Classes for Type="Select" or cell with Button="Defaults" in Space cell
			...CellSpaceSelect is set to the <td> tag
			...SpaceSelectInner is set to inner <div> tag
			...SpaceSelectInnerIcon is set to inner <div> tag in cell with Icon
			...SpaceSelectIconInner is set to inner inner <div> tag (along with Type class) in cell with Icon
			...SpaceSelectInnerIE is added to inner <div> tag in cell with Icon in IE5 quirks mode
			*/
			.TUXCellSpaceSelect { }
			.TUXSpaceSelectInner,.TUXSpaceSelectInnerIcon { 
			padding:2px 20px 2px 3px; background:white url(Button.gif?v120) right 0px no-repeat; border:1px solid #D4D4D4; border-right:0px none; 
			}
			.TUXSpaceSelectInnerIcon { padding:0px 20px 0px 1px; }
			.TUXSpaceSelectIconInner { padding-top:2px; padding-bottom:2px; }
			.TUXSpaceSelectInnerIE { overflow:hidden; }
			
			/* Classes for editable Space cell
			...CellSpaceEdit is set to the <td> tag
			...SpaceEditInner is set to inner <div> tag
			...SpaceEditInnerIcon is set to inner <div> tag in cell with Icon
			...SpaceEditIconInner is set to inner inner <div> tag (along with Type class) in cell with Icon
			...SpaceEditButtonIconInner is set to inner inner <div> tag in cell with Icon and Button
			*/
			.TUXCellSpaceEdit { }
			.TUXSpaceEditInner,.TUXSpaceEditInnerIcon { background:white; border:1px solid #D4D4D4; border-right:0px none; }
			.TUXSpaceEditInnerIcon { padding:0px 0px 0px 1px; }
			.TUXSpaceEditIconInner { padding-top:2px; padding-bottom:2px; }
			.TUXSpaceEditButtonIconInner { padding-top:0px; padding-bottom:0px; }
			
			/* Classes added to <td> tag in cell in Space row with Space="-1" (...Above) or Space="5" (...Below)
			*/
			.TUXCellSpaceAbove { border-top:1px solid #D4D4D4; }
			.TUXCellSpaceBelow { border-bottom:1px solid #D4D4D4; }
			
			/* Class added to <div> tag with ClassInner class */
			.TUXSpaceClassInner { padding-top:0px; padding-bottom:0px; }
			
			/*--------------- Cell edges ----------------- */
			
			/* @ Support classes, do not change 
			Classes added to table or Space cell if it should not have the left or right border or is empty
			*/
			.TUXNoLeft,.TUXNoSpaceLeft { border-left:0px none!important; border-bottom-left-radius:0px!important; border-top-left-radius:0px!important; }
			.TUXNoRight,.TUXNoSpaceRight { border-right:0px none!important; border-bottom-right-radius:0px!important; border-top-right-radius:0px!important; }
			.TUXEmpty { text-decoration:none!important; font-size:0px!important; line-height:0px!important; }
			
			/*--------------- Pages type cell ----------------- */
			
			/* ...Pages is set to <td> as Type class. @ Set here border, padding and background
			...PagesLink is set to individual <a> tags as page numbers. @ Set here margin, padding, border, background and text attributes
			...PagesLinkActive is set to <a> tag in actual selected page number instead
			*/
			.TUXPages { overflow:visible; padding:0px!important; }
			.TUXPagesLink,.TUXPagesLinkActive { 
			padding:2px 1px 2px 2px; margin:1px 0px 1px 0px; display:inline-block; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:pointer; color:black; 
			}
			/* The :hover remarkably slows down every grid in IE strict mode
			.TRIPagesLink:visited { color:blue; } 
			.TRIPagesLink:hover { color:red; }*/
			.TUXPagesLinkActive { color:black; font-weight:bold; border:1px dotted black; margin-top:0px; margin-bottom:0px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                    Tree cell                                                            */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Class set to the tree in <td> tag left to MainCol cell 
			@ They are not expected to change, but you can set here background or border
			...Tree is set for <Cfg NoTreeLines='0'/>, default setting. It can be set to inner <td> tag for SpannedTree
			...NoTreeLines... is set for NoTreeLines value 1 - 3.
			...SpannedTree is added to ...Tree for Cfg SpannedTree=1
			*/
			.TUXTree { padding-top:0px; white-space:nowrap; line-height:0px; font-size:0px; }
			.TUXSpannedTree { line-height:0px; font-size:0px; }
			.TUXNoTreeLines1 { text-align:right; }
			.TUXNoTreeLines2 { text-align:right; vertical-align:middle; padding-top:0px; }
			.TUXNoTreeLines3 { text-align:left; }
			
			/* ------------- Tree images with lines (NoTreeLines='0') ------------- */
			
			/* Default tree class set to <td> tag or to inner <u> tag
			The tree is shown in inner <u> tags if it cannot be set by one background image or in SpannedTree or with TreeIcon.
			@ Set background and padding-left. It is not easy to change them, the image files contain many icons that must be changed all at once, especially if you want to change the widths.
			...TreeTop / ...TreeMiddle / ...TreeBottom is set according to VAlign value, for empty is set also ...TreeTop
			...TreeRev... is set according to VAlign value for <Cfg ReversedTree='1'/>, for empty is set also ...TreeRevTop
			...TreeIcon, ...TreeIconM, ...TreeIconB is set if used custom tree icon by <I TreeIcon/>, according to VAlign value (M - Middle, B - Bottom, nothing - Top or empty)
			...TreeImage, ...TreeImageM, ...TreeImageB is set to inner <u> tag, according to VAlign value (M - Middle, B - Bottom, nothing - Top or empty)
			...TreeImageIE, ...TreeImageIEM, ...TreeImageIEB is set instead in all IE modes except IE5 quirks and also in Firefox strict mode
			...Width... is width of the tree icon part in <u> tag, number is count of the icon lines, ...T is ending icon / button
			...Width1 is also used measure one level indent, ...Width1T is also used to measure tree button width
			*/
			.TUXTreeTop { background-image:url(Tree.gif?v120); }
			.TUXTreeMiddle { background-image:url(TreeMiddle.gif?v120); }
			.TUXTreeBottom { background-image:url(TreeBottom.gif?v120); }
			.TUXTreeRevTop { background-image:url(TreeRev.gif?v120); }
			.TUXTreeRevMiddle { background-image:url(TreeRevMiddle.gif?v120); }
			.TUXTreeRevBottom { background-image:url(TreeRevBottom.gif?v120); }
			.TUXTreeIcon { background-repeat:no-repeat; background-position:left top; }
			.TUXTreeIconM { background-repeat:no-repeat; background-position:left center; }
			.TUXTreeIconB { background-repeat:no-repeat; background-position:left bottom; }
			.TUXTreeImage,.TUXTreeImageM,.TUXTreeImageB { display:inline-block; height:100%; width:0px; }
			.TUXTreeImageIE { padding-bottom:1000px; }
			.TUXTreeImageMIE { padding-top:500px; padding-bottom:500px; }
			.TUXTreeImageBIE { padding-top:1000px; }
			.TUXWidth1T { padding-left:26px; } .TUXWidth1 { padding-left:21px; }
			.TUXWidth2T { padding-left:47px; } .TUXWidth2 { padding-left:42px; }
			.TUXWidth3T { padding-left:68px; } .TUXWidth3 { padding-left:63px; }
			.TUXWidth4T { padding-left:89px; }
			
			/* Individual tree backgrounds according to VAlign value (M - Middle, B - Bottom, nothing - Top or empty) 
			1 means vertical line, 0 means no vertical line
			*/
			
			/* ...xxx - three line icons, ...xxxT - three line icons plus ending icon (no last, no button) */
			.TUX000,.TUX000T { background-position:   0px top; } .TUX000M,.TUX000TM { background-position:   0px center; } .TUX000B,.TUX000TB { background-position:   0px bottom; }
			.TUX010,.TUX010T { background-position:-128px top; } .TUX010M,.TUX010TM { background-position:-128px center; } .TUX010B,.TUX010TB { background-position:-128px bottom; }
			.TUX001,.TUX001T { background-position:-256px top; } .TUX001M,.TUX001TM { background-position:-256px center; } .TUX001B,.TUX001TB { background-position:-256px bottom; }
			.TUX011,.TUX011T { background-position:-384px top; } .TUX011M,.TUX011TM { background-position:-384px center; } .TUX011B,.TUX011TB { background-position:-384px bottom; }
			.TUX100,.TUX100T { background-position:-512px top; } .TUX100M,.TUX100TM { background-position:-512px center; } .TUX100B,.TUX100TB { background-position:-512px bottom; }
			.TUX110,.TUX110T { background-position:-640px top; } .TUX110M,.TUX110TM { background-position:-640px center; } .TUX110B,.TUX110TB { background-position:-640px bottom; }
			.TUX101,.TUX101T { background-position:-768px top; } .TUX101M,.TUX101TM { background-position:-768px center; } .TUX101B,.TUX101TB { background-position:-768px bottom; }
			.TUX111,.TUX111T { background-position:-896px top; } .TUX111M,.TUX111TM { background-position:-896px center; } .TUX111B,.TUX111TB { background-position:-896px bottom; }
			
			/* ...xx - two line icons, ...xxT - two line icons plus ending icon (no last, no button) */
			.TUX00,.TUX00T { background-position: -21px top; } .TUX00M,.TUX00TM { background-position: -21px center; } .TUX00B,.TUX00TB { background-position: -21px bottom; }
			.TUX10,.TUX10T { background-position:-149px top; } .TUX10M,.TUX10TM { background-position:-149px center; } .TUX10B,.TUX10TB { background-position:-149px bottom; }
			.TUX01,.TUX01T { background-position:-277px top; } .TUX01M,.TUX01TM { background-position:-277px center; } .TUX01B,.TUX01TB { background-position:-277px bottom; }
			.TUX11,.TUX11T { background-position:-405px top; } .TUX11M,.TUX11TM { background-position:-405px center; } .TUX11B,.TUX11TB { background-position:-405px bottom; }
			
			/* ...x - one line icon, ...xT - one line icon plus ending icon (no last, no button) */
			.TUX0,.TUX0T { background-position: -42px top; } .TUX0M,.TUX0TM { background-position: -42px center; } .TUX0B,.TUX0TB { background-position: -42px bottom; }
			.TUX1,.TUX1T { background-position:-298px top; } .TUX1M,.TUX1TM { background-position:-298px center; } .TUX1B,.TUX1TB { background-position:-298px bottom; }
			
			/* ...T - ending icon (no last, no button) */
			.TUXT { background-position:-63px top; } .TUXTM { background-position:-63px center; } .TUXTB { background-position:-63px bottom; }
			
			/* ...xxL - the end icon is the icon of the last child row
			...xT? - one line icon plus end icon, no button , ...xC? - one line icon plus end collapse (-) button, ...xE? - one line icon plus end expand (+) button
			*/
			.TUX0TL { background-position:-1024px top; } .TUX0TLM { background-position:-1024px center; } .TUX0TLB { background-position:-1024px bottom; }
			.TUX1TL { background-position:-1088px top; } .TUX1TLM { background-position:-1088px center; } .TUX1TLB { background-position:-1088px bottom; }
			.TUX0C  { background-position:-1152px top; } .TUX0CM  { background-position:-1152px center; } .TUX0CB  { background-position:-1152px bottom; }
			.TUX1C  { background-position:-1216px top; } .TUX1CM  { background-position:-1216px center; } .TUX1CB  { background-position:-1216px bottom; }
			.TUX0CL { background-position:-1280px top; } .TUX0CLM { background-position:-1280px center; } .TUX0CLB { background-position:-1280px bottom; }
			.TUX1CL { background-position:-1344px top; } .TUX1CLM { background-position:-1344px center; } .TUX1CLB { background-position:-1344px bottom; }
			.TUX0E  { background-position:-1408px top; } .TUX0EM  { background-position:-1408px center; } .TUX0EB  { background-position:-1408px bottom; }
			.TUX1E  { background-position:-1472px top; } .TUX1EM  { background-position:-1472px center; } .TUX1EB  { background-position:-1472px bottom; }
			.TUX0EL { background-position:-1536px top; } .TUX0ELM { background-position:-1536px center; } .TUX0ELB { background-position:-1536px bottom; }
			.TUX1EL { background-position:-1600px top; } .TUX1ELM { background-position:-1600px center; } .TUX1ELB { background-position:-1600px bottom; }
			
			/* ...xL - the end icon is the icon of the last child row
			...T? - end icon, no button, ...C? - end collapse (-) button, ...E? - end expand (+) button
			*/
			.TUXTL { background-position:-1045px top; } .TUXTLM { background-position:-1045px center; } .TUXTLB { background-position:-1045px bottom; }
			.TUXC  { background-position:-1173px top; } .TUXCM  { background-position:-1173px center; } .TUXCB  { background-position:-1173px bottom; }
			.TUXCL { background-position:-1301px top; } .TUXCLM { background-position:-1301px center; } .TUXCLB { background-position:-1301px bottom; }
			.TUXE  { background-position:-1429px top; } .TUXEM  { background-position:-1429px center; } .TUXEB  { background-position:-1429px bottom; }
			.TUXEL { background-position:-1557px top; } .TUXELM { background-position:-1557px center; } .TUXELB { background-position:-1557px bottom; }
			
			/* Icons shown during dragging - drop permissions
			...xL - the end icon is the icon of the last child row
			...D0? - no drop, ...D1? - drop above, ...D2? - drop inside, ...D3? - drop below
			*/
			.TUXD0 { background-position:-1664px top; } .TUXD0M { background-position:-1664px center; } .TUXD0B { background-position:-1664px bottom; }
			.TUXD1 { background-position:-1696px top; } .TUXD1M { background-position:-1696px center; } .TUXD1B { background-position:-1696px bottom; }
			.TUXD2 { background-position:-1728px top; } .TUXD2M { background-position:-1728px center; } .TUXD2B { background-position:-1728px bottom; }
			.TUXD3 { background-position:-1760px top; } .TUXD3M { background-position:-1760px center; } .TUXD3B { background-position:-1760px bottom; }
			.TUXD0L { background-position:-1792px top; } .TUXD0LM { background-position:-1792px center; } .TUXD0LB { background-position:-1792px bottom; }
			.TUXD1L { background-position:-1824px top; } .TUXD1LM { background-position:-1824px center; } .TUXD1LB { background-position:-1824px bottom; }
			.TUXD2L { background-position:-1856px top; } .TUXD2LM { background-position:-1856px center; } .TUXD2LB { background-position:-1856px bottom; }
			.TUXD3L { background-position:-1888px top; } .TUXD3LM { background-position:-1888px center; } .TUXD3LB { background-position:-1888px bottom; }
			
			/* ...D4 - icons for expanding children in timeout, ...xL - the end icon is the icon of the last child row
			*/
			.TUXD4 { background-position:-1920px top; } .TUXD4M { background-position:-1920px center; } .TUXD4B { background-position:-1920px bottom; }
			.TUXD4L { background-position:-1952px top; } .TUXD4LM { background-position:-1952px center; } .TUXD4LB { background-position:-1952px bottom; }
			
			/* ------------- Tree images without lines (NoTreeLines='1') ------------- */
			
			/* Tree classes set to <td> tag or to inner <u> tag
			The tree is shown in inner <u> tags in SpannedTree, with TreeIcon or with VAlign
			@ Set here height, width and background
			...NC - Icon for button collapse, ...NE - Icon for button expand, ...NT - Icon for leaf none without button, ...NCR / ...NER / ...NTR - Shown instead in RTL mode
			...ND0 - ...ND3 - Icons shown during dragging - drop permissions: ...ND0 - no drop, ...ND1 - drop above, ...ND2 - drop inside, ...ND3 - drop below
			...NTreeImage is set to inner <u> tag; it is also used to read the default width of tree button
			...NIcon is set if used custom tree icon by <I TreeIcon/>
			...NWidth is never assigned, it is used to read the default width of one level indent
			*/
			.TUXNC,.TUXNE,.TUXNCR,.TUXNER,.TUXND0,.TUXND1,.TUXND2,.TUXND3,.TUXND4 { background-image:url(TreeN.gif?v120); background-repeat:no-repeat; vertical-align:top; }
			.TUXNT,.TUXNTR { }
			.TUXNTreeImage { display:inline-block; height:17px; width:17px; }
			.TUXNWidth { width:21px; }
			.TUXND0 { background-position:-9px 0px; }
			.TUXND1 { background-position:-56px 0px; }
			.TUXND2 { background-position:-106px 0px; }
			.TUXND3 { background-position:-156px 0px; }
			.TUXND4 { background-position:-206px 0px; }
			.TUXNC { background-position:right -50px;}
			.TUXNE { background-position:right -2000px;}
			.TUXNCR { background-position:-259px -50px;}
			.TUXNER { background-position:-259px -2000px;}
			.TUXNIcon { background-repeat:no-repeat; background-position:right top; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                 Panel type cell                                                         */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------- Standard Panel images (FastPanel='0') ------------- */
			
			/* @ Set here width, height and background.
			@ If there is present <button> in panel, set here padding-left and font-size instead of width and height
			...PanelImage is set to every panel icon <u> tag if there is no <button> in the panel.
			...PanelImageButton is set to every panel icon <u> tag if there also some <button> in the panel
			...PanelEmpty is shown for panel button named "Empty"
			...PanelMove is shown for panel button named "Move", ...PanelMoveOff is shown for rows without moving permissions
			...PanelSelect is shown for panel button named "Select", ...PanelSelectOff is shown for rows without selecting permissions, ...PanelSelectOn is shown for rows with Select="1"
			...PanelDelete is shown for panel button named "Delete", ...PanelDeleteOff is shown for rows without deleting permissions
			...PanelCopy is shown for panel button named "Copy", ...PanelCopyOff is shown for rows without copying permissions
			...PanelButton is shown if the panel button has not defined image and is shown as <button> or <u> depending on <Cfg UseButton>. @ Set here margin, border, padding, width, height and text attributes
			...PanelTouch is added to <u> on tablets with PanelImage, ...PanelTouchButton is added to <u> on tablets with PanelImageButton
			...PanelButtonTouch is added to <button> on tablets
			*/
			.TUXPanelImage { width:16px; height:24px; display:inline-block; background-image:url(Panel.gif?v120); background-repeat:no-repeat; background-position:center 3px; }
			.TUXPanelImageButton { font:14px Arial; padding-left:16px; background-image:url(Panel.gif?v120); background-repeat:no-repeat; zoom:1; }
			.TUXPanelEmpty { background:none; }   
			.TUXPanelMove { background-position:0px 3px; }
			.TUXPanelMoveOff { background-position:-50px 3px; }
			.TUXPanelSelect { background-position:-100px 3px; }
			.TUXPanelSelectOn { background-position:-150px 3px; }
			.TUXPanelSelectOff { background-position:-200px 3px; }
			.TUXPanelDelete { background-image:url(clear-btn.png?v120); padding-right:6px; }
			.TUXPanelDeleteOff { background-position:-300px 3px; }
			.TUXPanelCopy { background-position:-350px 3px; }
			.TUXPanelCopyOff { background-position:-400px 3px; }
			button.TUXPanelButton { 
			padding:0px; height:14px; width:19px; margin:0px;
			font:10px/7px "Microsoft Sans Serif","Trebuchet MS",Tahoma,sans-serif; display:inline-block; cursor:pointer; overflow:hidden; 
			}
			u.TUXPanelButton { 
			background:#F0F0E0; border:1px solid white; border-right:1px solid #888; border-bottom:1px solid #888; padding:1px 3px 1px 3px; margin:2px;
			font:14px/16px "Microsoft Sans Serif","Trebuchet MS",Tahoma,sans-serif; cursor:pointer; text-decoration:none; display:inline-block; overflow:hidden; white-space:nowrap; 
			}
			.TUXCellHeaderPanel u.TUXPanelButton { }
			.TUXPanelTouch { margin-left:5px; margin-right:5px; }
			.TUXPanelTouchButton { margin-left:5px; margin-right:5px; }
			.TUXPanelButtonTouch { margin-left:2px; margin-right:2px; width:25px; }
			
			/* ------------- Fast Panel images (FastPanel='1')------------- */
			
			/* @ Do not change, for custom images use standard panel (FastPanel='0') or modify the FastPanel1.gif?v120/FastPanel2.gif?v120 files.
			The image is used different for every button state, the four numbers are for buttons Move, Select, Delete, Copy in this order.
			1 - shown, 2 - (on, for select), 0 - hidden, but space reserved, x - hidden completely, with no space
			*/
			.TUXP1111,.TUXP1211,.TUXP1011,.TUXP1101,.TUXP1201,.TUXP1001,.TUXP1110,.TUXP1210,.TUXP1010,.TUXP1100,.TUXP1200,.TUXP1000,
			.TUXP0111,.TUXP0211,.TUXP0011,.TUXP0101,.TUXP0201,.TUXP0001,.TUXP0110,.TUXP0210,.TUXP0010,.TUXP0100,.TUXP0200,.TUXP0000, 
			.TUXP111x,.TUXP121x,.TUXP101x,.TUXP110x,.TUXP120x,.TUXP100x,.TUXP011x,.TUXP021x,.TUXP001x,.TUXP010x,.TUXP020x,.TUXP000x,
			.TUXP11xx,.TUXP12xx,.TUXP10xx,.TUXP01xx,.TUXP02xx,.TUXP00xx,
			.TUXPx111,.TUXPx211,.TUXPx011,.TUXPx101,.TUXPx201,.TUXPx001,.TUXPx110,.TUXPx210,.TUXPx010,.TUXPx100,.TUXPx200,.TUXPx000,
			.TUXPx11x,.TUXPx21x,.TUXPx01x,.TUXPx10x,.TUXPx20x,.TUXPx00x,
			.TUXPxx11,.TUXPxx10,.TUXPxx01,.TUXPxx00, 
			.TUXPxxx1,.TUXPxxx0,.TUXPxx1x,.TUXPxx0x,.TUXPx2xx,.TUXPx1xx,.TUXPx0xx,.TUXP1xxx,.TUXP0xxx {
			background-image:url(FastPanel1.gif?v120); background-repeat:no-repeat;
			}
			.TUXP1111,.TUXP111x,.TUXP11xx,.TUXP1xxx { background-position:0px 3px; }
			.TUXP1211,.TUXP121x,.TUXP12xx { background-position:-80px 3px; }
			.TUXP1011,.TUXP101x,.TUXP10xx { background-position:-160px 3px; }
			.TUXP1101,.TUXP110x { background-position:-240px 3px; }
			.TUXP1201,.TUXP120x { background-position:-320px 3px; }
			.TUXP1001,.TUXP100x { background-position:-400px 3px; }
			.TUXP1110 { background-position:-480px 3px; }
			.TUXP1210 { background-position:-560px 3px; }
			.TUXP1010 { background-position:-640px 3px; }
			.TUXP1100 { background-position:-720px 3px; }
			.TUXP1200 { background-position:-800px 3px; }
			.TUXP1000 { background-position:-880px 3px; }
			.TUXP0111,.TUXP011x,.TUXP01xx,.TUXP0xxx { background-position:-960px 3px; }
			.TUXP0211,.TUXP021x,.TUXP02xx { background-position:-1040px 3px; }
			.TUXP0011,.TUXP001x,.TUXP00xx { background-position:-1120px 3px; }
			.TUXP0101,.TUXP010x { background-position:-1200px 3px; }
			.TUXP0201,.TUXP020x { background-position:-1280px 3px; }
			.TUXP0001,.TUXP000x { background-position:-1360px 3px; }
			.TUXP0110 { background-position:-1440px 3px; }
			.TUXP0210 { background-position:-1520px 3px; }
			.TUXP0010 { background-position:-1600px 3px; }
			.TUXP0100 { background-position:-1680px 3px; }
			.TUXP0200 { background-position:-1760px 3px; }
			.TUXP0000 { background-position:-1840px 3px; }
			
			.TUXPx111,.TUXPx11x,.TUXPx1xx { background-position:-16px 17px; }
			.TUXPx211,.TUXPx21x,.TUXPx2xx { background-position:-96px 17px; }
			.TUXPx011,.TUXPx01x,.TUXPx0xx { background-position:-176px 3px; }
			.TUXPx101,.TUXPx10x { background-position:-256px 3px; }
			.TUXPx201,.TUXPx20x { background-position:-336px 3px; }
			.TUXPx001,.TUXPx00x { background-position:-416px 3px; }
			.TUXPx110 { background-position:-496px 3px; }
			.TUXPx210 { background-position:-576px 3px; }
			.TUXPx010 { background-position:-656px 3px; }
			.TUXPx100 { background-position:-736px 3px; }
			.TUXPx200 { background-position:-816px 3px; }
			.TUXPx000 { background-position:-896px 3px; }
			
			.TUXPxx11,.TUXPxx1x { background-position:-32px 3px; }
			.TUXPxx01,.TUXPxx0x { background-position:-272px 3px; }
			.TUXPxx10{ background-position:-512px 3px; }
			.TUXPxx00 { background-position:-752px 3px; }
			
			.TUXPxxx1 { background-position:-48px 3px; }
			.TUXPxxx0 { background-position:-528px 3px; }
			
			.TUXP11x1,.TUXP12x1,.TUXP10x1,.TUXP11x0,.TUXP12x0,.TUXP10x0,.TUXP01x1,.TUXP02x1,.TUXP00x1,.TUXP01x0,.TUXP02x0,.TUXP00x0,
			.TUXPx1x1,.TUXPx2x1,.TUXPx0x1,.TUXPx1x0,.TUXPx2x0,.TUXPx0x0,
			.TUXP1x11,.TUXP1x01,.TUXP1x10,.TUXP1x00,.TUXP0x11,.TUXP0x01,.TUXP0x10,.TUXP0x00,
			.TUXP1x1x,.TUXP1x0x,.TUXP0x1x,.TUXP0x0x,
			.TUXP1xx1,.TUXP1xx0,.TUXP0xx1,.TUXP0xx0 {
			background-image:url(FastPanel2.gif?v120); background-repeat:no-repeat;
			}
			.TUXP11x1 { background-position:0px 3px; }
			.TUXP12x1 { background-position:-80px 3px; }
			.TUXP10x1 { background-position:-160px 3px; }
			.TUXP11x0 { background-position:-240px 3px; }
			.TUXP12x0 { background-position:-320px 3px; }
			.TUXP10x0 { background-position:-400px 3px; }
			.TUXP01x1 { background-position:-480px 3px; }
			.TUXP02x1 { background-position:-560px 3px; }
			.TUXP00x1 { background-position:-640px 3px; }
			.TUXP01x0 { background-position:-720px 3px; }
			.TUXP02x0 { background-position:-800px 3px; }
			.TUXP00x0 { background-position:-880px 3px; }
			
			.TUXPx1x1 { background-position:-16px 3px; }
			.TUXPx2x1 { background-position:-96px 3px; }
			.TUXPx0x1 { background-position:-176px 3px; }
			.TUXPx1x0 { background-position:-256px 3px; }
			.TUXPx2x0 { background-position:-336px 3px; }
			.TUXPx0x0 { background-position:-416px 3px; }
			
			.TUXP1x11,.TUXP1x1x { background-position:-960px 3px; }
			.TUXP1x01,.TUXP1x0x { background-position:-1040px 3px; }
			.TUXP1x10 { background-position:-1120px 3px; }
			.TUXP1x00 { background-position:-1200px 3px; }
			.TUXP0x11,.TUXP0x1x { background-position:-1280px 3px; }
			.TUXP0x01,.TUXP0x0x { background-position:-1360px 3px; }
			.TUXP0x10 { background-position:-1440px 3px; }
			.TUXP0x00 { background-position:-1520px 3px; }
			
			.TUXP1xx1 { background-position:-1600px 3px; }
			.TUXP1xx0 { background-position:-1680px 3px; }
			.TUXP0xx1 { background-position:-1760px 3px; }
			.TUXP0xx0 { background-position:-1840px 3px; }
			
			/* ------------- Space/Filter Panel checkbox images ------------- */   
			
			/* Special images in Filter, Group and Search rows for default panel (column named "Panel") if shown as the first column.
			@ Set width, height and background
			...Filter0 - shown in Filter row when Filtered='0', ...Filter1 - shown in Filter row when Filtered='1'
			...Group0 - shown in Group row when Grouped='0', ...Group1 - shown in Group row when Grouped='1'
			...Search0 - shown in Search row when Searched='0', ...Search1 - shown in Search row when Searched='1'  
			*/
			.TUXFilter0,.TUXFilter1,.TUXGroup0,.TUXGroup1,.TUXSearch0,.TUXSearch1 { background-image:url(Filter.gif?v120); background-repeat:no-repeat; display:inline-block; width:13px; height:17px; }
			.TUXFilter0,.TUXFilter1 { height:17px; }
			.TUXFilter0 { background-position:center -1900px; }
			.TUXFilter1 { background-position:center -2000px; }
			.TUXGroup0 { background-position:center -1900px; }
			.TUXGroup1 { background-position:center -2000px; }
			.TUXSearch0 { background-position:center -1900px; }
			.TUXSearch1 { background-position:center -2000px; }
			
			/* ...PSpace... is shown in Group and Search row according to actual width of the Panel column. 
			@ Set here only width and text-align
			*/
			.TUXPSpace1 { width:17px; text-align:center; }
			.TUXPSpace2 { width:33px; text-align:center; }
			.TUXPSpace3 { width:49px; text-align:center; }
			.TUXPSpace4 { width:65px; text-align:center; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                               Button type cell                                                          */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------- Button = "Tab" ------------- */   
			
			/* @ Set border, padding, background and text attributes
			...TabHtml is set to the Tab button <td> tag
			...TabHtml1 is set to the Tab button <td> tag instead if the button value is 1
			...TabHtmlIcon... is set instead if the button has Icon
			*/
			.TUXTabHtml,.TUXTabHtml1,.TUXTabHtmlIcon,.TUXTabHtmlIcon1 { text-align:center; padding-left:5px; padding-right:5px; border-left:none; background:#E9E9E9 url(Backgrounds.gif?v120) 0px 0px repeat-x; }
			.TUXRowAbove .TUXTabHtml,.TUXRowAbove .TUXTabHtml1 { }
			.TUXRowBelow .TUXTabHtml,.TUXRowBelow .TUXTabHtml1 { }
			.TUXTabHtml1,.TUXTabHtmlIcon1 { background:#BBBBBB; color:white; }
			
			/* Separators between Button="Tab", set to <td> tag 
			They are created automatically to separate the Tabs or can be created manually by Button="TabSep"
			@ Set background, border and padding or width
			...TabSep is set to empty <td> tag between two Tab buttons
			...TabSepLeft is set to empty <td> tag before Tab button
			...TabSepRight is set to empty <td> tag after Tab button
			...TabSepFirst is set to empty <td> tag before Tab button if it is the first cell
			...TabSepLast is set to empty <td> tag after Tab button if it is the last cell
			...TabSepNoBack is added to all Tab separators on row Kind="Tabber2"
			*/
			.TUXTabSep,.TUXTabSepLeft,.TUXTabSepRight {
			padding-left:3px; padding-right:0px; background:white!important; border:0px none; border-right:1px solid #D4D4D4; cursor:default!important;
			}
			.TUXTabSepRight,.TUXTabSepLeft { padding-left:5px; }
			.TUXTabSepLast { padding-left:1px; background:white!important; border:none; cursor:default!important; }
			.TUXTabSepFirst { padding-left:1px; background:white!important; border:none; border-right:1px solid #D4D4D4; cursor:default!important; }
			.TUXTabSepNoBack { background:none!important; }
			
			/* ------------- Button = "Button" ------------- */   
			
			/* Parent of the <button>, it is set to cell <td> tag or inner <div> tag 
			@ Set background, border and padding
			*/
			.TUXToolButton { text-align:center; padding:0px 1px 0px 1px; }
			
			/* Class set to the <button> tag if set <Cfg UseButton='1'> or to <u> tag if set <Cfg UseButton='0'>.
			@ Set background, border, margin, padding, height and text attributes
			...ToolButtonButton is set in table row
			...ToolButtonButton1 is set in table row instead if the button value is 1
			...ToolButtonButtonAuto is added if the table cell has not set Width attribute
			...ToolSpaceButton is set in Space row
			...ToolSpaceButton1 is set in Space row instead if the button value is 1
			...ToolSpaceButtonAuto is added if the Space cell has set Width="-1"
			...Icon is added if the cell has set Icon attribute
			...IconInner is set to the inner <i> tag with the icon and text if the cell has set Icon attribute
			...Empty is added to button with empty text to preserve its height; @ Set height
			*/
			button.TUXToolButtonButton,button.TUXToolButtonButton1 { font:10px/11px Verdana,Tahoma,"Trebuchet MS",sans-serif; height:17px; padding:0px; cursor:pointer; white-space:nowrap; }
			button.TUXToolSpaceButton,button.TUXToolSpaceButton1 { font:10px/11px Verdana,Tahoma,"Trebuchet MS",sans-serif; height:17px; padding:0px; cursor:pointer; white-space:nowrap; }
			button.TUXToolButtonButton1,button.TUXToolSpaceButton1 { color:#09C; font-weight:bold; }
			
			u.TUXToolButtonButton,u.TUXToolButtonButton1,u.TUXToolSpaceButton,u.TUXToolSpaceButton1 { 
			border:1px solid white; border-right:1px solid #888; border-bottom:1px solid #888; 
			cursor:pointer; text-decoration:none; display:block; overflow:hidden; white-space:nowrap; 
			}
			u.TUXToolButtonButton,u.TUXToolButtonButton1 { font:11px/12px Arial,Helvetica,sans-serif; padding:1px 5px 0px 5px; background:#E0E0E0; margin:1px; }
			u.TUXToolSpaceButton,u.TUXToolSpaceButton1 { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; background:#D8D8D8; padding:1px 3px 0px 3px; margin:1px 0px 2px 0px; }
			.TUXCellHeader u.TUXToolButtonButton,.TUXCellHeader u.TUXToolButtonButton1 { background:#D8D8D8; }
			u.TUXToolButtonButton1,u.TUXToolSpaceButton1 { border:1px solid #888; border-right:1px solid white; border-bottom:1px solid white; color:#09C; }
			u.TUXToolButtonIcon { padding-top:0px; padding-bottom:0px; } .TUXToolButtonIconInner { padding-top:1px; padding-bottom:0px; display:inline-block; font-style:normal; }
			u.TUXToolSpaceIcon { padding-top:0px; padding-bottom:0px; }  .TUXToolSpaceIconInner { padding-top:1px; padding-bottom:0px; display:inline-block; font-style:normal; }
			.TUXToolButtonEmpty { height:12px; width:0px; overflow:hidden; display:inline-block; }
			.TUXToolSpaceEmpty { height:13px; width:0px; overflow:hidden; display:inline-block; }
			
			.TUXToolButtonButtonAuto,.TUXToolSpaceButtonAuto { padding-left:3px; padding-right:3px; }
			
			/* ------------- Button = "Html" ------------- */   
			
			/* @ Set border, padding, background and text attributes
			...ToolHtml is set to the button <td> tag
			...ToolHtml1 is set to the button <td> tag instead if the button value is 1
			...ToolHtmlIcon... is set instead if the button has Icon or is Class button
			*/
			.TUXToolHtml,.TUXToolHtml1 { padding-left:3px; padding-right:3px; text-align:center; }
			.TUXToolHtml1 { font-weight:bold; color:#09C; }
			.TUXToolHtmlIcon,.TUXToolHtmlIcon1 { text-align:center; } 
			.TUXToolHtmlIcon1 { }
			
			/* Added to <td> or <div> tag when the cell has set Icon attribute, according to IconAlign value */
			.TUXToolHtmlIconLeft { text-align:left; }
			.TUXToolHtmlIconRight { text-align:right; }
			
			/* Added to <td> tag, to button with empty text; @ Set border and padding */
			.TUXToolHtmlIconSingle { border:0px none; }
			
			/* Added to <div> tag, to button with empty text to preserve its height; ...IE is used for IE5 quirks mode; @ Set height */
			.TUXToolHtmlEmpty { height:13px; width:0px; overflow:hidden; display:inline-block; }
			.TUXToolHtmlEmptyIE { overflow:hidden; display:inline-block; }
			
			/* -------------  Other Button type attributes ------------- */
			
			/* Added to <td> tag when the Button type cell has set Disabled='1' */
			.TUXDisabledButton { opacity:0.3; filter:alpha(opacity=30); }
			
			/* Popup cell side icon, used for Button type cell with List attribute 
			@ Set background and padding
			...PopupRight - right popup icon, used for PopupIcon="2" and for not empty value and PopupIcon="1"
			...PopupLeft - not used now
			...PopupNone - used for PopupIcon="1" and empty value, just to preserve the space
			*/
			.TUXPopupLeft,.TUXPopupRight { background-image:url(Menu.gif?v120); background-repeat:no-repeat; }
			.TUXPopupLeft { background-position:-6px -248px; padding-left:14px;}
			.TUXPopupRight { background-position:right -248px; padding-right:14px;}
			.TUXPopupNone { padding-right:14px; }
			
			/* ------------------------------------------  Special Toolbar buttons' images ---------------------------------------------- */
			
			/* Class added to <td> tag for alignment of the icon in Button="Class" or Button="Html"
			...Single is added for button without ButtonText to specify the icon width
			...Left/Right/Top/Bottom is added for appropriate IconAlign value
			@ Set padding
			*/
			.TUXToolAlignSingle { padding-left:24px; padding-right:0px; }
			.TUXToolAlignLeft { padding-left:22px; padding-right:8px; }
			.TUXToolAlignRight { padding-left:8px; padding-right:22px; }
			.TUXToolAlignTop { padding-left:5px; padding-right:5px; padding-top:22px; }
			.TUXToolAlignBottom { padding:4px 5px 24px 5px; }
			
			/* Class added to <td> tag for alignment of the Underline line in Button="Class" or Button="Html"
			...Single is added for button without ButtonText
			...Left/Right/Top/Bottom is added for appropriate IconAlign value
			@ Set margin and width
			*/
			.TUXToolLineAlignSingle {  margin:14px auto -18px auto; height:0px;  }
			.TUXToolLineAlignLeft { margin:14px 3px -18px -20px; height:0px; width:17px; }
			.TUXToolLineAlignRight { margin:14px -23px -18px -2px; height:0px; }
			.TUXToolLineAlignTop { margin:-3px auto -1px auto; height:0px; }
			.TUXToolLineAlignBottom { margin:34px auto -38px auto; height:0px; }
			
			/* Class set to <div> tag with Underline line in Button="Class" or Button="Html"
			The number is the UnderlineStyle. ...Line is for UnderLineStyle = null, ...LineEmpty for UnderLineStyle=""
			@ Set border and padding
			*/
			.TUXToolLine { border-bottom:4px solid; padding-top:2px; }
			.TUXToolLineEmpty { border-bottom:1px solid #D4D4D4!important; padding-top:2px; }
			.TUXToolLine0 { border-bottom:0px none; padding-top:4px; }
			.TUXToolLine1 { border-bottom:1px solid; padding-top:3px; }
			.TUXToolLine2 { border-bottom:2px solid; padding-top:3px; }
			.TUXToolLine3 { border-bottom:3px solid; padding-top:2px; }
			.TUXToolLine4 { border-bottom:1px dotted; padding-top:3px; }
			.TUXToolLine5 { border-bottom:2px dotted; padding-top:3px; }
			.TUXToolLine6 { border-bottom:1px dashed; padding-top:3px; }
			.TUXToolLine7 { border-bottom:2px dashed; padding-top:3px; }
			
			/* Used for Type="Button" Button="Class" and cell value null, "", 0 or 1. Set to <td> tag
			@ Set border, padding, background
			*/
			.TUXToolSave,.TUXToolReload,.TUXToolRepaint,.TUXToolRepaint1,.TUXToolPrint,.TUXToolExportPDF,.TUXToolExport,.TUXToolUndo,.TUXToolUndo1,.TUXToolRedo,.TUXToolRedo1,
			.TUXToolAdd,.TUXToolAddChild,.TUXToolAddCol,.TUXToolJoin,.TUXToolSplit,.TUXToolOutdent,.TUXToolIndent,.TUXToolSort,.TUXToolSort1,.TUXToolCalc,.TUXToolCalc1,
			.TUXToolExpandAll,.TUXToolCollapseAll,.TUXToolColumns,.TUXToolCfg,.TUXToolHelp,.TUXToolDebug,.TUXResizeGrid,.TUXResizeGridRtl {
			background-image:url(Toolbar.png?v120); -background-image:url(Toolbar.gif?v120); background-repeat:no-repeat;
			}
			.TUXToolSave { background-position:center 0px; }            .TUXToolSaveLeft { background-position:left 0px; }            .TUXToolSaveRight { background-position:right 0px; }            .TUXToolSaveBottom { background-position:center 20px; }
			.TUXToolReload { background-position:center -100px; }       .TUXToolReloadLeft { background-position:left -100px; }       .TUXToolReloadRight { background-position:right -100px; }       .TUXToolReloadBottom { background-position:center -80px; }
			.TUXToolRepaint { background-position:center -200px; }      .TUXToolRepaintLeft { background-position:left -200px; }      .TUXToolRepaintRight { background-position:right -200px; }      .TUXToolRepaintBottom { background-position:center -180px; }
			.TUXToolRepaint1 { background-position:center -300px; }     .TUXToolRepaintLeft1 { background-position:left -300px; }     .TUXToolRepaintRight1 { background-position:right -300px; }     .TUXToolRepaintBottom1 { background-position:center -280px; }
			.TUXToolPrint { background-position:center -400px; }        .TUXToolPrintLeft { background-position:left -400px; }        .TUXToolPrintRight { background-position:right -400px; }        .TUXToolPrintBottom { background-position:center -380px; }
			.TUXToolExportPDF { background-position:center -500px; }    .TUXToolExportPDFLeft { background-position:left -500px; }    .TUXToolExportPDFRight { background-position:right -500px; }    .TUXToolExportPDFBottom { background-position:center -480px; }
			.TUXToolExport { background-position:center -600px; }       .TUXToolExportLeft { background-position:left -600px; }       .TUXToolExportRight { background-position:right -600px; }       .TUXToolExportBottom { background-position:center -580px; }
			.TUXToolUndo { background-position:center -700px; }         .TUXToolUndoLeft { background-position:left -700px; }         .TUXToolUndoRight { background-position:right -700px; }         .TUXToolUndoBottom { background-position:center -680px; }
			.TUXToolUndo1 { background-position:center -800px; }        .TUXToolUndoLeft1 { background-position:left -800px; }        .TUXToolUndoRight1 { background-position:right -800px; }        .TUXToolUndoBottom1 { background-position:center -780px; }
			.TUXToolRedo { background-position:center -900px; }         .TUXToolRedoLeft { background-position:left -900px; }         .TUXToolRedoRight { background-position:right -900px; }         .TUXToolRedoBottom { background-position:center -880px; } 
			.TUXToolRedo1 { background-position:center -1000px; }       .TUXToolRedoLeft1 { background-position:left -1000px; }       .TUXToolRedoRight1 { background-position:right -1000px; }       .TUXToolRedoBottom1 { background-position:center -980px; }
			.TUXToolAdd { background-position:center -1100px; }         .TUXToolAddLeft { background-position:left -1100px; }         .TUXToolAddRight { background-position:right -1100px; }         .TUXToolAddBottom { background-position:center -1080px; }
			.TUXToolAddChild { background-position:center -1200px; }    .TUXToolAddChildLeft { background-position:left -1200px; }    .TUXToolAddChildRight { background-position:right -1200px; }    .TUXToolAddChildBottom { background-position:center -1180px; }
			.TUXToolAddCol { background-position:center -2900px; }      .TUXToolAddColLeft { background-position:left -2900px; }      .TUXToolAddColRight { background-position:right -2900px; }      .TUXToolAddColBottom { background-position:center -2880px; }
			.TUXToolJoin { background-position:center -1300px; }        .TUXToolJoinLeft { background-position:left -1300px; }        .TUXToolJoinRight { background-position:right -1300px; }        .TUXToolJoinBottom { background-position:center -1280px; }
			.TUXToolSplit { background-position:center -1400px; }       .TUXToolSplitLeft { background-position:left -1400px; }       .TUXToolSplitRight { background-position:right -1400px; }       .TUXToolSplitBottom { background-position:center -1380px; }
			.TUXToolOutdent { background-position:center -1500px; }     .TUXToolOutdentLeft { background-position:left -1500px; }     .TUXToolOutdentRight { background-position:right -1500px; }     .TUXToolOutdentBottom { background-position:center -1480px; }
			.TUXToolIndent { background-position:center -1600px; }      .TUXToolIndentLeft { background-position:left -1600px; }      .TUXToolIndentRight { background-position:right -1600px; }      .TUXToolIndentBottom { background-position:center -1580px; }
			.TUXToolSort { background-position:center -1700px; }        .TUXToolSortLeft { background-position:left -1700px; }        .TUXToolSortRight { background-position:right -1700px; }        .TUXToolSortBottom { background-position:center -1680px; }
			.TUXToolSort1 { background-position:center -1800px; }       .TUXToolSortLeft1 { background-position:left -1800px; }       .TUXToolSortRight1 { background-position:right -1800px; }       .TUXToolSortBottom1 { background-position:center -1780px; }
			.TUXToolCalc { background-position:center -1900px; }        .TUXToolCalcLeft { background-position:left -1900px; }        .TUXToolCalcRight { background-position:right -1900px; }        .TUXToolCalcBottom { background-position:center -1880px; }
			.TUXToolCalc1 { background-position:center -2000px; }       .TUXToolCalcLeft1 { background-position:left -2000px; }       .TUXToolCalcRight1 { background-position:right -2000px; }       .TUXToolCalcBottom1 { background-position:center -1980px; }
			.TUXToolExpandAll { background-position:center -2100px; }   .TUXToolExpandAllLeft { background-position:left -2100px; }   .TUXToolExpandAllRight { background-position:right -2100px; }   .TUXToolExpandAllBottom { background-position:center -2080px; }
			.TUXToolCollapseAll { background-position:center -2200px; } .TUXToolCollapseAllLeft { background-position:left -2200px; } .TUXToolCollapseAllRight { background-position:right -2200px; } .TUXToolCollapseAllBottom { background-position:center -2180px; }
			.TUXToolColumns { background-position:center -2300px; }     .TUXToolColumnsLeft { background-position:left -2300px; }     .TUXToolColumnsRight { background-position:right -2300px; }     .TUXToolColumnsBottom { background-position:center -2280px; }
			.TUXToolCfg { background-position:center -2400px; }         .TUXToolCfgLeft { background-position:left -2400px; }         .TUXToolCfgRight { background-position:right -2400px; }         .TUXToolCfgBottom { background-position:center -2380px; }
			.TUXToolHelp { background-position:center -2500px; }        .TUXToolHelpLeft { background-position:left -2500px; }        .TUXToolHelpRight { background-position:right -2500px; }        .TUXToolHelpBottom { background-position:center -2480px; }
			.TUXToolDebug { background-position:center -2600px; }       .TUXToolDebugLeft { background-position:left -2600px; }       .TUXToolDebugRight { background-position:right -2600px; }       .TUXToolDebugBottom { background-position:center -2580px; }
			.TUXResizeGrid { background-position:center -2700px; }      .TUXResizeGridLeft { background-position:left -2700px; }      .TUXResizeGridRight { background-position:right -2700px; }      .TUXResizeGridBottom { background-position:center -2680px; } 
			.TUXResizeGridRtl { background-position:center -2800px; }   .TUXResizeGridRtlLeft { background-position:left -2800px; }   .TUXResizeGridRtlRight { background-position:right -2800px; }   .TUXResizeGridRtlBottom { background-position:center -2780px; }
			
			.TUXToolPagerFirst,.TUXToolPagerFirst1,.TUXToolPagerPrev,.TUXToolPagerPrev1,.TUXToolPagerNext,.TUXToolPagerNext1,.TUXToolPagerLast,.TUXToolPagerLast1 {
			background-image:url(Pager.png?v120); -background-image:url(Pager.gif?v120); background-repeat:no-repeat;
			}
			.TUXToolPagerFirst { background-position:center 0px; }      .TUXToolPagerFirstLeft { background-position:left 0px; }      .TUXToolPagerFirstRight { background-position:right 0px; }      .TUXToolPagerFirstBottom { background-position:center 20px; }
			.TUXToolPagerFirst1 { background-position:center -100px; }  .TUXToolPagerFirstLeft1 { background-position:left -100px; }  .TUXToolPagerFirstRight1 { background-position:right -100px; }  .TUXToolPagerFirstBottom1 { background-position:center -80px; }
			.TUXToolPagerPrev { background-position:center -200px; }    .TUXToolPagerPrevLeft { background-position:left -200px; }    .TUXToolPagerPrevRight { background-position:right -200px; }    .TUXToolPagerPrevBottom { background-position:center -180px; } 
			.TUXToolPagerPrev1 { background-position:center -300px; }   .TUXToolPagerPrevLeft1 { background-position:left -300px; }   .TUXToolPagerPrevRight1 { background-position:right -300px; }   .TUXToolPagerPrevBottom1 { background-position:center -280px; } 
			.TUXToolPagerNext { background-position:center -400px; }    .TUXToolPagerNextLeft { background-position:left -400px; }    .TUXToolPagerNextRight { background-position:right -400px; }    .TUXToolPagerNextBottom { background-position:center -380px; } 
			.TUXToolPagerNext1 { background-position:center -500px; }   .TUXToolPagerNextLeft1 { background-position:left -500px; }   .TUXToolPagerNextRight1 { background-position:right -500px; }   .TUXToolPagerNextBottom1 { background-position:center -480px; }
			.TUXToolPagerLast { background-position:center -600px; }    .TUXToolPagerLastLeft { background-position:left -600px; }    .TUXToolPagerLastRight { background-position:right -600px; }    .TUXToolPagerLastBottom { background-position:center -580px; } 
			.TUXToolPagerLast1 { background-position:center -700px; }   .TUXToolPagerLastLeft1 { background-position:left -700px; }   .TUXToolPagerLastRight1 { background-position:right -700px; }   .TUXToolPagerLastBottom1 { background-position:center -680px; }
			
			.TUXToolCorrect,.TUXToolCorrect1,.TUXToolZoomIn,.TUXToolZoomIn1,.TUXToolZoomOut,.TUXToolZoomOut1,.TUXToolZoomFit { 
			background-image:url(ToolbarGantt.png?v120); -background-image:url(ToolbarGantt.gif?v120); background-repeat:no-repeat;
			}
			.TUXToolCorrect { background-position:center 0px; }        .TUXToolCorrectLeft { background-position:left 0px; }          .TUXToolCorrectRight { background-position:right 0px; }         .TUXToolCorrectBottom { background-position:center 20px; } 
			.TUXToolCorrect1 { background-position:center -100px; }    .TUXToolCorrectLeft1 { background-position:left -100px; }      .TUXToolCorrectRight1 { background-position:right -100px; }     .TUXToolCorrectBottom1 { background-position:center -80px; }
			.TUXToolZoomIn { background-position:center -200px; }      .TUXToolZoomInLeft { background-position:left -200px; }        .TUXToolZoomInRight { background-position:right -200px; }       .TUXToolZoomInBottom { background-position:center -180px; } 
			.TUXToolZoomIn1 { background-position:center -300px; }     .TUXToolZoomInLeft1 { background-position:left -300px; }       .TUXToolZoomInRight1 { background-position:right -300px; }      .TUXToolZoomInBottom1 { background-position:center -280px; }
			.TUXToolZoomOut { background-position:center -400px; }     .TUXToolZoomOutLeft { background-position:left -400px; }       .TUXToolZoomOutRight { background-position:right -400px; }      .TUXToolZoomOutBottom { background-position:center -380px; }
			.TUXToolZoomOut1 { background-position:center -500px; }    .TUXToolZoomOutLeft1 { background-position:left -500px; }      .TUXToolZoomOutRight1 { background-position:right -500px; }     .TUXToolZoomOutBottom1 { background-position:center -480px; } 
			.TUXToolZoomFit { background-position:center -600px; }     .TUXToolZoomFitLeft { background-position:left -600px; }       .TUXToolZoomFitRight { background-position:right -600px; }      .TUXToolZoomFitBottom { background-position:center -580px; }
			
			.TUXToolLeft,.TUXToolCenter,.TUXToolRight,.TUXToolTop,.TUXToolMiddle,.TUXToolBottom,.TUXToolBold,.TUXToolItalic,.TUXToolUnderline,.TUXToolStrike,.TUXToolRotateLeft,.TUXToolRotateRight,.TUXToolWrapText {
			background-image:url(ToolbarSheet.png?v120); -background-image:url(ToolbarSheet.gif?v120); background-repeat:no-repeat;
			}
			.TUXToolLeft { background-position:center 0px; }           .TUXToolLeftLeft { background-position:left 0px; }             .TUXToolLeftRight { background-position:right 0px; }            .TUXToolLeftBottom { background-position:center 20px; } 
			.TUXToolCenter { background-position:center -100px; }      .TUXToolCenterLeft { background-position:left -100px; }        .TUXToolCenterRight { background-position:right -100px; }       .TUXToolCenterBottom { background-position:center -80px; } 
			.TUXToolRight { background-position:center -200px; }       .TUXToolRightLeft { background-position:left -200px; }         .TUXToolRightRight { background-position:right -200px; }        .TUXToolRightBottom { background-position:center -180px; } 
			.TUXToolTop { background-position:center -300px; }         .TUXToolTopLeft { background-position:left -300px; }           .TUXToolTopRight { background-position:right -300px; }          .TUXToolTopBottom { background-position:center -280px; } 
			.TUXToolMiddle { background-position:center -400px; }      .TUXToolMiddleLeft { background-position:left -400px; }        .TUXToolMiddleRight { background-position:right -400px; }       .TUXToolMiddleBottom { background-position:center -380px; } 
			.TUXToolBottom { background-position:center -500px; }      .TUXToolBottomLeft { background-position:left -500px; }        .TUXToolBottomRight { background-position:right -500px; }       .TUXToolBottomBottom { background-position:center -480px; } 
			.TUXToolBold { background-position:center -600px; }        .TUXToolBoldLeft { background-position:left -600px; }          .TUXToolBoldRight { background-position:right -600px; }         .TUXToolBoldBottom { background-position:center -580px; } 
			.TUXToolItalic { background-position:center -700px; }      .TUXToolItalicLeft { background-position:left -700px; }        .TUXToolItalicRight { background-position:right -700px; }       .TUXToolItalicBottom { background-position:center -680px; } 
			.TUXToolUnderline { background-position:center -800px; }   .TUXToolUnderlineLeft { background-position:left -800px; }     .TUXToolUnderlineRight { background-position:right -800px; }    .TUXToolUnderlineBottom { background-position:center -780px; } 
			.TUXToolStrike { background-position:center -900px; }      .TUXToolStrikeLeft { background-position:left -900px; }        .TUXToolStrikeRight { background-position:right -900px; }       .TUXToolStrikeBottom { background-position:center -880px; } 
			.TUXToolRotateLeft { background-position:center -1000px; } .TUXToolRotateLeftLeft { background-position:left -1000px; }   .TUXToolRotateLeftRight { background-position:right -1000px; }  .TUXToolRotateLeftBottom { background-position:center -980px; } 
			.TUXToolRotateRight { background-position:center -1100px; }.TUXToolRotateRightLeft { background-position:left -1100px; }  .TUXToolRotateRightRight { background-position:right -1100px; } .TUXToolRotateRightBottom { background-position:center -1080px; } 
			.TUXToolWrapText { background-position:center -1200px; }   .TUXToolWrapTextLeft { background-position:left -1200px; }     .TUXToolWrapTextRight { background-position:right -1200px; }    .TUXToolWrapTextBottom { background-position:center -1180px; } 
			
			.TUXToolColorText,.TUXToolColorBackground,.TUXToolBorder,.TUXToolBorderAll,.TUXToolBorderI3,.TUXToolBorderI2,.TUXToolBorderI1,
			.TUXToolBorderO15,.TUXToolBorderO1,.TUXToolBorderO2,.TUXToolBorderO4,.TUXToolBorderO8,.TUXToolBorderO5,.TUXToolBorderO10,.TUXToolColorShadow {
			background-image:url(ToolbarSheetWide.png?v120); -background-image:url(ToolbarSheetWide.gif?v120); background-repeat:no-repeat;
			}
			.TUXToolColorText { background-position:center 0px; }      .TUXToolColorTextLeft { background-position:left 0px; }        .TUXToolColorTextRight { background-position:right 0px; }       .TUXToolColorTextBottom { background-position:center 20px; }
			.TUXToolColorBackground { background-position:center -100px; } .TUXToolColorBackgroundLeft { background-position:left -100px; } .TUXToolColorBackgroundRight { background-position:right -100px; } .TUXToolColorBackgroundBottom { background-position:center -80px; }
			.TUXToolBorder { background-position:center -200px; }      .TUXToolBorderLeft { background-position:left -200px; }        .TUXToolBorderRight { background-position:right -200px; }       .TUXToolBorderBottom { background-position:center -180px; }
			.TUXToolBorderAll { background-position:center -300px; }   .TUXToolBorderAllLeft { background-position:left -300px; }     .TUXToolBorderAllRight { background-position:right -300px; }    .TUXToolBorderAllBottom { background-position:center -280px; }
			.TUXToolBorderO15 { background-position:center -400px; }   .TUXToolBorderO15Left { background-position:left -400px; }     .TUXToolBorderO15Right { background-position:right -400px; }    .TUXToolBorderO15Bottom { background-position:center -380px; }
			.TUXToolBorderI3 { background-position:center -500px; }    .TUXToolBorderI3Left { background-position:left -500px; }      .TUXToolBorderI3Right { background-position:right -500px; }     .TUXToolBorderI3Bottom { background-position:center -480px; }
			.TUXToolBorderI2 { background-position:center -600px; }    .TUXToolBorderI2Left { background-position:left -600px; }      .TUXToolBorderI2Right { background-position:right -600px; }     .TUXToolBorderI2Bottom { background-position:center -580px; }
			.TUXToolBorderI1 { background-position:center -700px; }    .TUXToolBorderI1Left { background-position:left -700px; }      .TUXToolBorderI1Right { background-position:right -700px; }     .TUXToolBorderI1Bottom { background-position:center -680px; }
			.TUXToolBorderO1 { background-position:center -800px; }    .TUXToolBorderO1Left { background-position:left -800px; }      .TUXToolBorderO1Right { background-position:right -800px; }     .TUXToolBorderO1Bottom { background-position:center -780px; }
			.TUXToolBorderO2 { background-position:center -900px; }    .TUXToolBorderO2Left { background-position:left -900px; }      .TUXToolBorderO2Right { background-position:right -900px; }     .TUXToolBorderO2Bottom { background-position:center -880px; }
			.TUXToolBorderO4 { background-position:center -1000px; }   .TUXToolBorderO4Left { background-position:left -1000px; }     .TUXToolBorderO4Right { background-position:right -1000px; }    .TUXToolBorderO4Bottom { background-position:center -980px; }
			.TUXToolBorderO8 { background-position:center -1100px; }   .TUXToolBorderO8Left { background-position:left -1100px; }     .TUXToolBorderO8Right { background-position:right -1100px; }    .TUXToolBorderO8Bottom { background-position:center -1080px; }
			.TUXToolBorderO5 { background-position:center -1200px; }   .TUXToolBorderO5Left { background-position:left -1200px; }     .TUXToolBorderO5Right { background-position:right -1200px; }    .TUXToolBorderO5Bottom { background-position:center -1180px; }
			.TUXToolBorderO10 { background-position:center -1300px; }  .TUXToolBorderO10Left { background-position:left -1300px; }    .TUXToolBorderO10Right { background-position:right -1300px; }   .TUXToolBorderO10Bottom { background-position:center -1280px; }
			.TUXToolColorShadow { background-position:center -1400px; }.TUXToolColorShadowLeft { background-position:left -1400px; }  .TUXToolColorShadowRight { background-position:right -1400px; } .TUXToolColorShadowBottom { background-position:center -1380px; }
			
			/* Void button ResizeGrid; @ Do not change */
			.TUXToolResize { visibility:hidden; }
			
			/* It is added to the td tag when used VAlign and no button text is shown */
			.TUXToolImage { display:inline-block; width:24px; height:24px; padding:0px; overflow:hidden; }
			
			/* It is added to the td tag when used VAlign and the button text is shown; for IconAlign values */
			.TUXToolImageLeftText,.TUXToolImageRightText,.TUXToolImageTopText,.TUXToolImageBottomText { display:inline-block; text-decoration:none; }
			.TUXToolImageLeftText { padding-top:4px; padding-bottom:4px; }
			.TUXToolImageRightText { padding-top:4px; padding-bottom:4px; }
			.TUXToolImageTopText { height:16px; padding-bottom:4px; }
			.TUXToolImageBottomText { height:16px; padding-top:4px; padding-bottom:24px; }
			
			/* It is added to div tag when used Icon attribute with Button="Class"; for IconAlign values; Single is used without ButtonText; */
			.TUXToolIconSingle { background-position:center center; }
			.TUXToolIconLeft { background-position:left center; }
			.TUXToolIconRight { background-position:right center; }
			.TUXToolIconTop { background-position:center top; }
			.TUXToolIconBottom { background-position:center bottom; }
			
			/* Special class added to <td> tag for Pager type cell edit box with pager number - it is standard editable Space cell */
			.TUXPagerEdit > div { text-align:center; }
			
			/* Special icon always placed to right bottom grid corner to resize grid if set ResizingMain 
			@ Set background and optionally margin, width and height for the icon size and position
			...Rtl is placed in bottom left corner and is used in RTL mode
			*/
			.TUXResizeGrid  { background-position:-1px -2703px; margin:-19px 0px 0px auto; height:19px; width:19px; overflow:hidden; padding:0px; cursor:nw-resize; }
			.TUXResizeGridRtl { background-position:-1px -2803px; margin:-19px auto 0px 0px; height:19px; width:19px; overflow:hidden; padding:0px; cursor:ne-resize; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                            Cell side Icon / Button                                                      */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --------------------------------------------------  Filter images -------------------------------------------------------- */
			
			/* Filter operator icons shown on left or right side (set by IconAlign), shown in <td> or <div> tag.
			The number 0 - 12 is the operator number set in cell Filter attribute
			@ Set here background and padding-left
			*/
			.TUXFilter0Left,.TUXFilter1Left,.TUXFilter2Left,.TUXFilter3Left,.TUXFilter4Left,.TUXFilter5Left,.TUXFilter6Left,
			.TUXFilter7Left,.TUXFilter8Left,.TUXFilter9Left,.TUXFilter10Left,.TUXFilter11Left,.TUXFilter12Left  {
			background-image:url(Filter.gif?v120); background-repeat:no-repeat; padding-left:17px;
			}
			.TUXFilter0Right,.TUXFilter1Right,.TUXFilter2Right,.TUXFilter3Right,.TUXFilter4Right,.TUXFilter5Right,.TUXFilter6Right,
			.TUXFilter7Right,.TUXFilter8Right,.TUXFilter9Right,.TUXFilter10Right,.TUXFilter11Right,.TUXFilter12Right {
			background-image:url(Filter.gif?v120); background-repeat:no-repeat; padding-right:17px;
			}
			.TUXFilter0Left,.TUXFilter0Menu { background-position:left 0px; }   
			.TUXFilter1Left,.TUXFilter1Menu { background-position:left -150px; }
			.TUXFilter2Left,.TUXFilter2Menu { background-position:left -300px; }
			.TUXFilter3Left,.TUXFilter3Menu { background-position:left -450px; }
			.TUXFilter4Left,.TUXFilter4Menu { background-position:left -600px; }
			.TUXFilter5Left,.TUXFilter5Menu { background-position:left -750px; }   
			.TUXFilter6Left,.TUXFilter6Menu { background-position:left -900px; }
			.TUXFilter7Left,.TUXFilter7Menu { background-position:left -1050px; }
			.TUXFilter8Left,.TUXFilter8Menu { background-position:left -1200px; }
			.TUXFilter9Left,.TUXFilter9Menu { background-position:left -1350px; }
			.TUXFilter10Left,.TUXFilter10Menu { background-position:left -1500px; }
			.TUXFilter11Left,.TUXFilter11Menu { background-position:left -1650px; }
			.TUXFilter12Left,.TUXFilter12Menu { background-position:left -1800px; }
			.TUXFilter0Right { background-position:right 0px; }   
			.TUXFilter1Right { background-position:right -150px; }
			.TUXFilter2Right { background-position:right -300px; }
			.TUXFilter3Right { background-position:right -450px; }
			.TUXFilter4Right { background-position:right -600px; }
			.TUXFilter5Right { background-position:right -750px; }   
			.TUXFilter6Right { background-position:right -900px; }
			.TUXFilter7Right { background-position:right -1050px; }
			.TUXFilter8Right { background-position:right -1200px; }
			.TUXFilter9Right { background-position:right -1350px; }
			.TUXFilter10Right { background-position:right -1500px; }
			.TUXFilter11Right { background-position:right -1650px; }
			.TUXFilter12Right { background-position:right -1800px; }
			
			/* The filter operator icons shown in the popup menu 
			@ Set here background, width and height
			*/
			.TUXFilter0Menu,.TUXFilter1Menu,.TUXFilter2Menu,.TUXFilter3Menu,.TUXFilter4Menu,.TUXFilter5Menu,.TUXFilter6Menu,
			.TUXFilter7Menu,.TUXFilter8Menu,.TUXFilter9Menu,.TUXFilter10Menu,.TUXFilter11Menu,.TUXFilter12Menu {
			width:17px; height:17px; overflow:hidden; background-image:url(Filter.gif?v120); background-repeat:no-repeat; margin-left:-1px;
			}
			
			/* Added to the filter cell according to the filter operator 
			@ Set here text attributes
			*/
			.TUXFilter0Value { color:silver; }
			.TUXFilter1Value,.TUXFilter2Value,.TUXFilter3Value,.TUXFilter4Value,.TUXFilter5Value,.TUXFilter6Value,.TUXFilter7Value,.TUXFilter8Value,.TUXFilter9Value,.TUXFilter10Value,.TUXFilter11Value,.TUXFilter12Value { color:blue; }
			
			/* ---------------------------------------------------  Sort images --------------------------------------------------------- */
			
			/* Sort icons shown on left or right side (set by IconAlign) in Header cell, shown in <td> or <div> tag.
			0 - no sort, 1 - first sort asc, 2 - second sort asc, 3 - third sort asc, 4 - first sort desc, 5 - second sort desc, 6 - third sort desc
			@ Set here background and padding-left
			*/
			.TUXSort0Left,.TUXSort1Left,.TUXSort2Left,.TUXSort3Left,.TUXSort4Left,.TUXSort5Left,.TUXSort6Left,
			.TUXSort0Right,.TUXSort1Right,.TUXSort2Right,.TUXSort3Right,.TUXSort4Right,.TUXSort5Right,.TUXSort6Right {
			background-image:url(Sort.gif?v120); background-repeat:no-repeat;  
			}
			.TUXSort0Left,.TUXSort1Left,.TUXSort2Left,.TUXSort3Left,.TUXSort4Left,.TUXSort5Left,.TUXSort6Left { padding-left:17px; }
			.TUXSort0Right,.TUXSort1Right,.TUXSort2Right,.TUXSort3Right,.TUXSort4Right,.TUXSort5Right,.TUXSort6Right{ padding-right:17px; }
			.TUXSort0Left { background-position:left 0px; }   
			.TUXSort1Left { background-position:left -250px; }
			.TUXSort2Left { background-position:left -500px; }
			.TUXSort3Left { background-position:left -750px; }
			.TUXSort4Left { background-position:left -1000px; }
			.TUXSort5Left { background-position:left -1250px; }
			.TUXSort6Left { background-position:left -1500px; }
			.TUXSort0Right { background-position:right 0px; }   
			.TUXSort1Right { background-position:right -250px; }
			.TUXSort2Right { background-position:right -500px; }
			.TUXSort3Right { background-position:right -750px; }
			.TUXSort4Right { background-position:right -1000px; }
			.TUXSort5Right { background-position:right -1250px; }
			.TUXSort6Right { background-position:right -1500px; }
			
			/* ------------------------------------------------  Side button images ----------------------------------------------------- */
			
			/* Predefined side icon and side button images.
			The ...Left is used for Icon with IconAlign="Left" or without IconAlign
			The ...Right is used for Icon with IconAlign="Right" and for Button
			The ...Top and ...Bottom is used for Type="Button" with Icon and IconAlign="Top" or "Bottom"
			The ...Check0... is not checked, ...Check1... is checked and ...Check2... is empty state (the ?)
			@ Set here background and padding-left or padding-right
			*/
			.TUXDefaultsLeft,.TUXEnumLeft,.TUXCollapseLeft,.TUXExpandLeft,.TUXFileLeft,.TUXClearLeft  { background-image:url(Button.gif?v120); padding-left:17px; background-repeat:no-repeat; }
			.TUXDefaultsRight,.TUXEnumRight,.TUXCollapseRight,.TUXExpandRight,.TUXFileRight,.TUXClearRight { background-image:url(Button.gif?v120); padding-right:17px; background-repeat:no-repeat; }
			.TUXDefaultsTop,.TUXEnumTop,.TUXCollapseTop,.TUXExpandTop,.TUXFileTop,.TUXClearTop  { background-image:url(Button.gif?v120); padding-top:20px; background-repeat:no-repeat; }
			.TUXDefaultsBottom,.TUXEnumBottom,.TUXCollapseBottom,.TUXExpandBottom,.TUXFileBottom,.TUXClearBottom { background-image:url(Button.gif?v120); padding-bottom:20px; background-repeat:no-repeat; }
			
			.TUXDateLeft,.TUXDatesLeft { background-image:url(date.png?v120); padding-left:17px; background-repeat:no-repeat; background-position:left; padding-left:20px; }
			.TUXDateRight,.TUXDatesRight { background-image:url(date.png?v120); padding-right:17px; background-repeat:no-repeat; background-position:right; padding-right:20px; }
			.TUXDateTop,.TUXDatesTop { background-image:url(date.png?v120); padding-top:20px; background-repeat:no-repeat; background-position:center; }
			.TUXDateBottom,.TUXDatesBottom { background-image:url(date.png?v120); padding-bottom:20px; background-repeat:no-repeat; background-position:center; }
			
			.TUXDefaultsLeft { background-position:left 0px; padding-left:20px; }
			.TUXDefaultsRight { background-position:right 0px; padding-right:20px; }
			.TUXDefaultsTop { background-position:center 0px; }
			.TUXDefaultsBottom { background-position:center 20px; }
			.TUXEnumLeft { background-position:left -500px; }
			.TUXEnumRight { background-position:right -500px; }
			.TUXEnumTop { background-position:center -500px; }
			.TUXEnumBottom { background-position:center -480px; }
			.TUXExpandLeft { background-position:left -999px; }
			.TUXExpandRight { background-position:right -999px; }
			.TUXExpandTop { background-position:center -1000px; }
			.TUXExpandBottom { background-position:center -980px; }
			.TUXCollapseLeft { background-position:left -749px;}
			.TUXCollapseRight { background-position:right -749px;}
			.TUXCollapseTop { background-position:center -750px; }
			.TUXCollapseBottom { background-position:center -730px; }
			.TUXFileLeft { background-position:left -2000px; padding-left:20px; }
			.TUXFileRight { background-position:right -2000px; padding-right:20px; }
			.TUXFileTop { background-position:center -2000px; }
			.TUXFileBottom { background-position:center -1980px; }
			.TUXClearLeft { background-position:left -2250px; }
			.TUXClearRight { background-position:right -2250px; }
			.TUXClearTop { background-position:center -2250px; }
			.TUXClearBottom { background-position:center -1230px; }
			
			.TUXCheck0Left,.TUXCheck1Left,.TUXCheck2Left  { background-image:url(Bool.gif?v120); padding-left:17px; background-repeat:no-repeat; }
			.TUXCheck0Right,.TUXCheck1Right,.TUXCheck2Right { background-image:url(Bool.gif?v120); padding-right:17px; background-repeat:no-repeat; }
			.TUXCheck0Top,.TUXCheck1Top,.TUXCheck2Top { background-image:url(Bool.gif?v120); padding-top:20px; background-repeat:no-repeat; }
			.TUXCheck0Bottom,.TUXCheck1Bottom,.TUXCheck2Bottom { background-image:url(Bool.gif?v120); padding-bottom:20px; background-repeat:no-repeat; }
			.TUXCheck0Left { background-position:left 0px; }
			.TUXCheck1Left { background-position:left -250px; }
			.TUXCheck2Left { background-position:left -500px; }
			.TUXCheck0Right { background-position:right 0px; }
			.TUXCheck1Right { background-position:right -250px; }
			.TUXCheck2Right { background-position:right -500px; }
			.TUXCheck0Top { background-position:center 0px; }
			.TUXCheck1Top { background-position:center -250px; }
			.TUXCheck2Top { background-position:center -500px; }
			.TUXCheck0Bottom { background-position:center 20px; }
			.TUXCheck1Bottom { background-position:center -230px; }
			.TUXCheck2Bottom { background-position:center -480px; }
			
			/* Class added to right side button if shown in <u> tag - in Header cell or if the cell has set VAlign 
			@ Set here only height
			*/
			.TUXButtonImage { display:inline-block; height:17px; padding-left:0px; padding-right:0px; }
			
			/* Class added to <a> tag in Type="Icon" and Link attribute set. @ Do not change. */
			.TUXIconLink { text-decoration:none; width:1000px; display:inline-block; }
			
			/* Class added to the <td> or <div> tag when set custom Icon as icon file, with the suffix as IconAlign. @ Set the padding-left or padding-right. */
			.TUXIconLeft { background-position:left 0px; padding-left:20px; background-repeat:no-repeat; }
			.TUXIconRight { background-position:right 0px; padding-right:20px; background-repeat:no-repeat; }
			.TUXIconCenter { background-position:center 0px; background-repeat:no-repeat; }
			.TUXIconTop { padding-top:19px; background-position:center 0px; background-repeat:no-repeat; }
			.TUXIconBottom { padding-bottom:22px; background-position:center 18px; background-repeat:no-repeat; }
			
			/* Class added to the <td> or <div> tag when set custom Icon as icon file, with the suffix as IconAlign="Top or "Bottom and VAlign. 
			Used to synchronize position of custom icons with standard toolbar icons
			@ Set padding and margin 
			*/
			.TUXIconTopVAlignTop { padding-top:19px; }
			.TUXIconTopVAlignMiddle { padding-top:19px; }
			.TUXIconTopVAlignBottom { padding-top:20px; }
			.TUXIconBottomVAlignTop { padding-bottom:22px; }
			.TUXIconBottomVAlignMiddle { padding-bottom:22px; }
			.TUXIconBottomVAlignBottom { padding-bottom:22px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                        Cell checkboxes - Radio and Bool types                                           */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------------------------------------------  Radio Type images ------------------------------------------------------ */
			
			/* Radio icons for cell RadioIcon = 0,1,2, set to <td> tag
			The ...Right is used when cell has set RadioRight='1'
			The ...None is used for RadioIcon='6'
			0 - unchecked radio, 1 - checked radio, 2 - unchecked checkbox, 3 - checked checkbox
			@ Set background, padding, border and text attributes
			*/
			.TUXRadio0Left,.TUXRadio0Right,.TUXRadio1Left,.TUXRadio1Right,.TUXRadio2Left,.TUXRadio2Right,.TUXRadio3Left,.TUXRadio3Right,.TUXRadioIconLeft,.TUXRadioIconRight,.TUXRadioNone { 
			background-image:url(Bool.gif?v120); background-repeat:no-repeat; font:11.9px/17px Verdana,Tahoma,"Trebuchet MS",sans-serif;
			}
			.TUXRadio0Left,.TUXRadio1Left,.TUXRadio2Left,.TUXRadio3Left,.TUXRadioIconLeft { padding-left:17px; padding-right:3px; }
			.TUXRadio0Right,.TUXRadio1Right,.TUXRadio2Right,.TUXRadio3Right,.TUXRadioIconRight { padding-right:17px; padding-left:3px; }
			.TUXRadio0Left { background-position:left -1500px; } 
			.TUXRadio1Left { background-position:left -1750px; } 
			.TUXRadio2Left { background-position:left 0px; }
			.TUXRadio3Left { background-position:left -250px;}
			.TUXRadio0Right { background-position:right -1500px; } 
			.TUXRadio1Right { background-position:right -1750px; } 
			.TUXRadio2Right { background-position:right 0px; }
			.TUXRadio3Right { background-position:right -250px; }
			.TUXRadioNone { background-image:none; }
			
			/* Custom radio icon for cell RadioIcon = "image file", set to <td> tag. 
			The ...Right is used when cell has set RadioRight='1'
			@ Set padding, border and text attributes
			*/
			.TUXRadioIconLeft { background-position:left top; }
			.TUXRadioIconRight { background-position:right top; }
			
			/* The Radio icons if set to nobr and span tags when set cell attribute Wrap='1'
			@ Set padding and optionally background, border and text attributes
			*/
			nobr.TUXRadio0Left,nobr.TUXRadio1Left,nobr.TUXRadio2Left,nobr.TUXRadio3Left,nobr.TUXRadio0Right,nobr.TUXRadio1Right,nobr.TUXRadio2Right,nobr.TUXRadio3Right,nobr.TUXRadioIconLeft,nobr.TUXRadioIconRight,
			span.TUXRadio0Left,span.TUXRadio1Left,span.TUXRadio2Left,span.TUXRadio3Left,span.TUXRadio0Right,span.TUXRadio1Right,span.TUXRadio2Right,span.TUXRadio3Right,span.TUXRadioIconLeft,span.TUXRadioIconRight {
			padding-top:2px; padding-bottom:2px; 
			}
			
			/* Radio icons by standard <input>, for cell RadioIcon = 3,4,5  
			...RadioCell is set to the <td> tag around the radio. @ Set background, padding and border
			...RadioInput is set to <input> type "checkbox" or "radio". @ Set margin, padding and line-height
			...RadioText is set to <span> tag next to the <input>. @ Set text attributes and optionally background, padding and border
			*/
			.TUXRadioCell { white-space:nowrap; }
			.TUXRadioInput { margin:1px 2px 0px 2px; padding:0px; margin-top:-4px!IE; line-height:13px; }
			.TUXRadioText { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; }
			nobr.TUXRadioCell,span.TUXRadioCell { display:inline-block; }
			
			/* Caption of checked radio button; @ Set here border, padding, background and text attributes */
			.TUXRadioChecked { color:#0099CC; }
			
			/* -------------------------------------------------  Bool Type images ------------------------------------------------------ */
			
			/* Checkbox icons for table row cell, for BoolIcon = 0,1,2,3, set to <td> or <u> tag  
			0 - unchecked checkbox, 1 - checked checkbox, X - empty (third) state (?), 2 - unchecked radio, 3 - checked radio, RO - read only
			...BoolIcon is used for custom icon in BoolIcon="image file"
			...BoolImage is added for every the Bool icon
			@ Set here background and width and height
			*/
			.TUXBool0,.TUXBool1,.TUXBoolX,.TUXBool0RO,.TUXBool1RO,.TUXBoolXRO,.TUXBool2,.TUXBool3,.TUXBool2RO,.TUXBool3RO { background-image:url(Bool.gif?v120); background-repeat:no-repeat; padding-left:17px; }
			.TUXBoolIcon { background-repeat:no-repeat; }
			.TUXBool0 { background-position:center 0px; }
			.TUXBool1 { background-position:center -250px; }
			.TUXBoolX { background-position:center -500px; }
			.TUXBool0RO { background-position:center -750px; }
			.TUXBool1RO { background-position:center -1000px; }
			.TUXBoolXRO { background-position:center -1250px; }
			.TUXBool2,.TUXBool2RO { background-position:center -1500px; }
			.TUXBool3,.TUXBool3RO { background-position:center -1750px; }
			.TUXBoolImage { display:inline-block; width:17px; height:17px; overflow:hidden; padding:0px; }
			
			/* Checkbox icons for Space row cell, for BoolIcon = 0,1,2,3, set to <td> or <u> tag  
			0 - unchecked checkbox, 1 - checked checkbox, X - empty (third) state (?), 2 - unchecked radio, 3 - checked radio, RO - read only
			...BoolIconSpace is used for custom icon in BoolIcon="image file"
			...BoolImageSpace is added for every the Bool icon
			@ Set here background, width and height and padding-left (width and height is used in <u> tag, padding-left in <td> tag)
			*/
			.TUXBoolXSpace,.TUXBool0Space,.TUXBool1Space,.TUXBoolXSpaceRO,.TUXBool0SpaceRO,.TUXBool1SpaceRO { background-image:url(Bool.gif?v120); background-repeat:no-repeat; padding-left:17px; }
			.TUXBool2Space,.TUXBool3Space,.TUXBool2SpaceRO,.TUXBool3SpaceRO { background-image:url(Bool.gif?v120); background-repeat:no-repeat; padding-left:17px; }
			.TUXBoolIconSpace { background-repeat:no-repeat; }
			.TUXBool0Space { background-position:center 1px; }
			.TUXBool1Space { background-position:center -249px; }
			.TUXBoolXSpace { background-position:center -499px; }
			.TUXBool0SpaceRO { background-position:center -749px; }
			.TUXBool1SpaceRO { background-position:center -999px; }
			.TUXBoolXSpaceRO { background-position:center -1249px; }
			.TUXBool2Space,.TUXBool2SpaceRO { background-position:center -1499px; }
			.TUXBool3Space,.TUXBool3SpaceRO { background-position:center -1749px; }
			.TUXBoolImageSpace { display:inline-block; width:17px; height:19px; overflow:hidden; padding:0px; }
			
			/* Bool icons by standard <input>, for cell BoolIcon = 4,5, different for table and Space row cells
			@ Set margin and padding
			*/
			.TUXBoolInput { margin-top:2px; margin-bottom:0px; padding:0px; margin-top:-2px!IE; margin-bottom:-6px!IE; }
			.TUXBoolInputSpace { margin-top:3px; margin-bottom:0px; padding:0px; margin-top:-2px!IE; margin-bottom:-6px!IE; }
			
			/* Bool icons by text 'x' in rect, for cell BoolIcon = 6
			0 - unchecked checkbox, 1 - checked checkbox, 2 - empty (third) state (?), RO - read only
			...IE is added in IE5 quirks mode
			@ Set height, width, border, background, padding, margin and text attributes
			*/
			.TUXBoolChar0,.TUXBoolChar1,.TUXBoolChar2,.TUXBoolChar0RO,.TUXBoolChar1RO,.TUXBoolChar2RO {
			height:9px; width:8px; border:2px ridge white; margin:2px auto 2px auto; font:bold 9px Arial; color:blue; text-align:center; overflow:hidden;
			}
			.TUXBoolChar2 { color:green; }
			.TUXBoolChar0RO,.TUXBoolChar1RO,.TUXBoolChar2RO { color:gray; }
			.TUXBoolCharIE { height:14px; width:12px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                     Side pager                                                          */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ...PagerMain - main <div> tag inside <td> tag. It has set inline width. @ Set border, margin and padding
			...PagerBody - the pages without header, <div> tag. @ Set background, border, margin and padding. 
			...PagerBodyLeft, ...PagerBodyRight - added to the ...PagerBody according to the side where is the pager displayed.
			...PagerHeader - the pager header, <div> tag. @ Set background, border, margin and padding. 
			...PagerHeaderLeft, ...PagerHeaderRight - added to the ...PagerHeader according to the side where is the pager displayed.
			...PagerCaption - text inside header, <div> tag, set text attributes and optionally also border, padding, margin and background
			*/
			.TUXPagerMain { border:1px solid #e9e9e9; border-bottom:0px none; }
			.TUXPagerBody { background:white; }
			.TUXPagerBodyLeft { }
			.TUXPagerBodyRight { }
			.TUXPagerHeader { background:#E9E9E9 url(Backgrounds.gif?v120) 0px 0px repeat-x; border:1px solid white; border-right:1px solid #D4D4D4; border-bottom:1px dotted #CBCBCB; cursor:default; }
			.TUXPagerHeaderLeft { }   
			.TUXPagerHeaderRight { }
			.TUXPagerCaption { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:2px 3px 2px 3px; white-space:nowrap; }
			
			/* ...PagerItem - one page name. @ Set background, border, margin, padding and text attributes
			...PagerItemTouch is added on tablet
			*/
			.TUXPagerItem {
			font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:pointer; overflow:hidden; white-space:nowrap;
			border-top:1px solid white; border-bottom:1px dotted #CBCBCB; border-right:1px solid #D4D4D4; padding:1px 3px 0px 3px; background:white;
			}
			.TUXPagerItemTouch { padding-top:4px; padding-bottom:4px; }
			
			/* Classes to ...PagerItem added on pager Type="Gantt" if set ShowUsedPages / ShowExcludedPages
			@ Set background, border, margin, padding and text attributes
			*/
			.TUXPagerItemUsed { color:green; }
			.TUXPagerItemUnused { color:#888; }
			.TUXPagerItemExcluded { background:#DDD; }
			
			/* Marked part of the page name, <span> tag
			1 - the first sorted column, 2 - the second sorted column, 3 - the third sorted column, S - when the grid is not sorted
			*/
			.TUXPagerSort1 { color: black; }
			.TUXPagerSort2 { color: #737373; }
			.TUXPagerSort3 { color: #9b9b9b; }
			.TUXPagerSortS { color: black; }
			
			/* Focus cursor - actully shown page(s) 
			...PagerFocus - actually shown (scrolled) page(s) in pager Pages or actually zoomed chart in pager Gantt
			...PagerFocus2 - actual view (scrolled) in pager Gantt
			...PagerFocus3 - the whole pager is shown in actual view, in pager Gantt
			*/
			.TUXPagerFocus,.TUXPagerFocus2,.TUXPagerFocus3 {
			position:relative; cursor:pointer; overflow:hidden; opacity:0.3; filter:alpha(opacity=30); 
			border:1px solid #666; background:#888;
			}
			.TUXPagerFocus2 { background:#F0F; }
			.TUXPagerFocus3 { background:#AFA; }
			
			/* Hover cursor - highlighted page under mouse cursor. 
			@ Set background, border, padding
			*/
			.TUXPagerHover {
			position:relative; cursor:pointer; overflow:hidden;
			background:#888; opacity:0.1; filter:alpha(opacity=10); 
			}
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                               State colors and classes                                                  */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* The ...Color... classes are never assigned, they are used only to read the color. 
			@ In ...Color... set only the background-color, it must be set by number, not by name.
			All the colors except ...FocusedCell... and ...Default are relative colors, are added to the ...Default color; if the result color number exceeds 0x1000000, it is subtracted by the 0x1000000
			The ...Class... is added to the cell if its condition is fulfilled. Only the listed ...Class... are used, the others can have only the ...Color... set.
			@ In ...Class... set text attributes and color and optionally border and padding. If set here background-color with !important, it overrides the cell color and sets it as absolute
			*/
			.TUXColorDefault { background-color:#FFFFFF; }   /* Base color for all cells, can be changed by <I Color /> attribute */
			
			.TUXColorNoFocus { background-color:#F0F0F0; }   /* Cell with CanFocus='0' */
			.TUXClassNoFocus { }
			.TUXColorReadOnly { background-color:#F4F4F4;}   /* Cell with CanEdit='0' */
			.TUXClassReadOnly { }
			.TUXColorPreview { background-color:#FFFFFF; }   /* Cell with CanEdit='2' */
			.TUXClassPreview { }
			.TUXColorFormula { background-color:#FFCC99; }   /* Cell with editable formula */
			.TUXClassFormula { }
			.TUXColorEdit { background-color:#FFFFFF; }      /* Cell with CanFocus='1' CanEdit='1' */
			.TUXClassEdit { }
			
			.TUXColorAlternate { background-color:#EBFFFF; } /* Color for <Cfg Alternate/>, can be changed by <I AlternateColor /> */
			.TUXClassAlternate { }                           /* Can be changed by <I AlternateClass /> */
			
			.TUXColorSelected { background-color:#DEEFFF; }  /* Selected row or cell */
			.TUXClassSelected {  }                           /* It is used only if set <Cfg SelectClass='1'/> */
			.TUXColorSelectedCell { background-color:#C6C6C6; }  /* Selected cell for SelectingCells=3 */
			.TUXClassSelectedCell { }                        /* It is used only if set <Cfg SelectClass='1'/> */
			.TUXColorFill { background-color:#FF80FF; }      /* Used when selecting cells by dragging due auto fill */
			
			.TUXColorError { background-color:#FF6969; }     /* Cell with Error attribute set */
			.TUXClassError { }
			
			/* Row / Cell state colors, are ignored if row has set NoColorState='1' */
			.TUXColorDeleted { background-color:#FFCDCD; }   /* Deleted row */
			.TUXClassDeleted { }
			.TUXColorAdded { background-color:#CDFFCD; }     /* Newly added row */
			.TUXClassAdded { font-weight:bold; }
			.TUXColorMoved1 { background-color:#FFFFFF; }    /* Row moved to another parent */
			.TUXClassMoved1 { }
			.TUXColorMoved2 { background-color:#FFFFFF; }    /* Row moved inside its parent, only if sorting is not permitted */
			.TUXClassMoved2 { }
			.TUXColorChanged { background-color:#EBEBFF; }   /* Row with some cell value changed */
			.TUXClassChanged { }
			.TUXColorChangedCell { background-color:#E1E1E1; } /* The cell with value changed */
			.TUXClassChangedCell { font-weight:bold; }
			
			.TUXColorMaxChildren { background-color:#FFFFF0; } /* Row created if row's children exceed <I MaxChildren/> */
			.TUXClassMaxChildren { }
			
			.TUXColorDetail { background-color:#FFF0FF; }    /* Row is master row, has set <I Detail /> attribute */
			.TUXClassDetail { }
			.TUXColorDetailSelected { background-color:#FFF0E0; } /* Master row actually shown in detail grid */
			.TUXClassDetailSelected { }
			
			.TUXColorDragged { background-color:#E0E0C0; }   /* The source row actually being dragged by mouse */
			
			.TUXColorCellMenu { background-color:#FA0; }     /* The cell showing cell popup Menu */
			
			.TUXColorFound1 { background-color:#FF87FF; }    /* Found cell in SearchAction="Mark", first search */
			.TUXClassFound1 { }                              /* Used only if set <Cfg SearchClass='1'/> */
			.TUXColorFound2 { background-color:#FFC387; }    /* Found cell in SearchAction="Mark", second search */
			.TUXClassFound2 { }                              /* Used only if set <Cfg SearchClass='1'/> */
			.TUXColorFound3 { background-color:#87FF87; }    /* Found cell in SearchAction="Mark", third search */
			.TUXClassFound3 { }                              /* Used only if set <Cfg SearchClass='1'/> */
			
			.TUXColorHovered { background-color:#E0E0E0; }   /* Row under mouse cursor, used only if the hovered cell or row has HoverRow["Color"]*/
			
			/* Cell under mouse cursor, according to its look or permissions
			...Color... is used only if the cell has set HoverCell["Color"] 
			...Class... is used only if the cell has set HoverCell["Class"] 
			Always only one Color and Class is used, if the cell fulfils more conditions the latter has precedence
			If the resulted color is #FFFFFF, it is set as transparent, therefore in some cases is required to set #FFFFFE to get white color
			*/
			.TUXColorHoveredCell { }     /* Standard cell */
			.TUXClassHoveredCell { }
			.TUXColorHoveredCellReadOnly { } /* Cell with CanEdit='0' */
			.TUXClassHoveredCellReadOnly { }
			.TUXColorHoveredCellNoFocus { }  /* Cell with CanFocus='0' */
			.TUXClassHoveredCellNoFocus { }
			.TUXColorHoveredCellHeader { }   /* Cell in Header row */
			.TUXClassHoveredCellHeader { }
			.TUXColorHoveredCellPanel { }    /* Cell Type = "Panel" */
			.TUXClassHoveredCellPanel { }
			.TUXColorHoveredCellFastPanel { ; }/* Cell Type = "Panel" if FastPanel is shown */
			.TUXClassHoveredCellFastPanel { }
			.TUXColorHoveredCellSpace {  }    /* Space row cell */
			.TUXClassHoveredCellSpace { }
			.TUXColorHoveredCellSpaceEdit {  } /* Editable Space row cell */
			.TUXClassHoveredCellSpaceEdit > div { }
			.TUXColorHoveredCellSpaceDefaults {  } /* Space row cell with Button="Defaults" */
			.TUXClassHoveredCellSpaceDefaults > div {  }
			.TUXColorHoveredCellSpaceBool0 { } /* Space row cell of Type="Bool" and value 0 */
			.TUXClassHoveredCellSpaceBool0,.TUXClassHoveredCellSpaceBool0 > u { background-position:center -749px; }
			.TUXColorHoveredCellSpaceBool1 {  } /* Space row cell of Type="Bool" and value 1 */
			.TUXClassHoveredCellSpaceBool1,.TUXClassHoveredCellSpaceBool1 > u { background-position:center -999px; }
			.TUXColorHoveredCellSpaceBoolX {  } /* Space row cell of Type="Bool" and value "" */
			.TUXClassHoveredCellSpaceBoolX,.TUXClassHoveredCellSpaceBoolX > u { background-position:center -1249px; }
			.TUXColorHoveredCellSpaceBoolIcon {} /* Space row cell of Type="Bool" and BoolIcon other than 0 and 2 */
			.TUXClassHoveredCellSpaceBoolIcon { }
			.TUXColorHoveredCellButton {  }     /* Space row cell of Type="Button" and Button="Html" */
			.TUXClassHoveredCellButton {  }
			.TUXColorHoveredCellButton1 {  }    /* Space row cell of Type="Button" and Button="Html" and value 1 */
			.TUXClassHoveredCellButton1 { }
			.TUXColorHoveredCellButtonButton {  }  /* Space row cell of Type="Button" and Button="Button" */
			.TUXClassHoveredCellButtonButton u {  }
			.TUXColorHoveredCellButtonButton1 { } /* Space row cell of Type="Button" and Button="Button" and value 1 */
			.TUXClassHoveredCellButtonButton1 u {  }
			.TUXColorHoveredCellTab {  }        /* Space row cell of Type="Button" and Button="Tab" */
			.TUXClassHoveredCellTab { }
			.TUXColorHoveredCellTab1 { }       /* Space row cell of Type="Button" and Button="Tab" and value 1*/
			.TUXClassHoveredCellTab1 {  }
			.TUXColorHoveredCellIndex {  }      /* Cell in column RowIndex */
			.TUXClassHoveredCellIndex { }
			
			.TUXColorFocused { background-color:#E0E0E0; }               /* Focused row, used only if the focused cell or row has FocusRow["Color"] */
			.TUXClassFocused { }                                         /* Used only if  the focused cell or row has FocusRow["Class"] */
			
			/* Focused cell, the color is absolute color 
			...Color... is used only if the cell or row has set FocusCell["Color"] 
			...Class... is used only if the cell or row has set FocusCell["Class"] 
			*/
			.TUXColorFocusedCell {  }           /* Standard cell */
			.TUXClassFocusedCell { } 
			.TUXColorFocusedCellRect { }          /* Standard cell if more cells are focused */
			.TUXClassFocusedCellRect { } 
			.TUXColorEditedCell {}            /* Cell being edited */
			.TUXColorViewedCell {  }            /* Cell being viewed - edited cell with CanEdit='2' */
			.TUXColorFocusedCellSafari { }     /* If the cell border is hidden due <Cfg BorderCursors='0' or '2'/> */
			.TUXColorFocusedCellHeader { }     /* Header row cell */
			.TUXClassFocusedCellHeader { }
			.TUXColorFocusedCellSpace { }         /* Space row cell */
			.TUXClassFocusedCellSpace { }
			.TUXColorFocusedCellSpaceEdit {  }  /* Editable Space row cell */
			.TUXClassFocusedCellSpaceEdit > div {  }
			.TUXColorFocusedCellSpaceDefaults { }  /* Space row cell with Button="Defaults" */
			.TUXClassFocusedCellSpaceDefaults > div { }
			.TUXColorFocusedCellSpaceBool {  }     /* Space row cell of Type="Bool" */
			.TUXClassFocusedCellSpaceBool { }
			.TUXColorFocusedCellButton {  }        /* Space row cell of Type="Button" */
			.TUXClassFocusedCellButton { }
			
			/* Side colors set by ColorCursor attribute 
			...Col is top / bottom side, ...Row is left / right side
			...Class... is used only if set <Cfg> ColorCursor bit 5, &16
			*/
			.TUXColorSelectedCol { background-color:#E5F5F5; }          /* Side for selected cells */
			.TUXClassSelectedCol { }
			.TUXColorSelectedRow { background-color:#E5F5F5; } 
			.TUXClassSelectedRow { }
			.TUXColorFocusedCol { background-color:#DDD; }              /* Side for cells focused by range (FRect) */
			.TUXClassFocusedCol { }
			.TUXColorFocusedRow { background-color:#DDD; } 
			.TUXClassFocusedRow { }
			.TUXColorEditedCol { background-color:#EEEE80; }               /* Side for focused cell (FRow/FCol) */
			.TUXClassEditedCol { }
			.TUXColorEditedRow { background-color:#EEEE80; } 
			.TUXClassEditedRow { }
			.TUXColorHoveredCol { background-color:#F3F3F3; }           /* Side for cell under mouse cursor (ARow/ACol) */
			.TUXClassHoveredCol { }
			.TUXColorHoveredRow { background-color:#F3F3F3; }             
			.TUXClassHoveredRow { }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                               Hover, focus, edit cursors                                                */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------- Cell and row highlighted under mouse cursor ------------- */
			
			/* ...HoverPanelBackground - Background shown above left side Panel cell when hovering the row; shown only if the hovered cell or row has HoverRow["Background"]; @ set background and opacity 
			...HoverRowBackground   - Background shown above the whole hovered row, except hovered cell and Panel; shown only if the hovered cell or row has HoverRow["Background"]; @ set background and opacity
			...HoverRowBorder       - Border around the whole hovered row; shown only if the hovered cell or row has HoverRow["Border"]; @ set border
			...HoverCellBorder      - Border around the hovered cell; shown only if the hovered cell or row has HoverCell["Border"]; @ set border
			...Dynamic              - Added to the base class if set Cfg DynamicBorder
			*/
			.TUXHoverPanelBackground { } 
			.TUXHoverRowBackground { } 
			.TUXHoverRowBorder { } 
			.TUXHoverRowBorderDynamic { }
			.TUXHoverCellBorder { } 
			.TUXHoverCellBorderDynamic { padding-left:0px; }
			
			/* ---------------- Highlighted focused cell(s) and row(s) ------------- */
			
			/* ...FocusPanelBackground - Background shown above left side Panel cell when the row is focused; shown only if the focused cell or row has FocusRow["Background"]; @ set background and opacity 
			...FocusRowBackground   - Background shown above the whole focused row, except focused cell and Panel; shown only if the focused cell or row has FocusRow["Background"]; @ set background and opacity
			...FocusRowBorder       - Border around the whole hovered row; shown only if the hovered cell or row has FocusRow["Border"]; @ set border
			...FocusCellBorder      - Border around the focused cell in table row; shown only if the focused cell or row has FocusCell["Border"]; @ set border and cursor
			...FocusCellSpaceBorder - Border around the focused cell in Space row; shown only if the focused cell or row has FocusCell["Border"]; @ set border and cursor
			...FocusCellCorner      - Bottom right corner for autofill; shown only if the focused cell or row has FocusCell["Corner"]; @ set border, margin, padding, background, width, height and cursor
			...Touch                - Added to the base class on tablet
			...Dynamic              - Added to the base class if set Cfg DynamicBorder
			*/
			.TUXFocusPanelBackground { } 
			.TUXFocusRowBackground {  } 
			.TUXFocusRowBorder {  }    
			.TUXFocusRowBorderDynamic { }
			.TUXFocusCellBorder { } 
			.TUXFocusCellBorderTouch { }
			.TUXFocusCellBorderDynamic { }
			.TUXFocusCellSpaceBorder {}                      
			.TUXFocusCellCorner {  }
			.TUXFocusCellCornerTouch { }
			
			/* ------------- Highlighted focused cell in edit mode ------------- */
			
			/* ...EditCellBorder      - Border around the focused cell in table row in edit mode; shown only if the focused cell or row has FocusCell["Border"]; @ set border 
			...EditCellSpaceBorder - Border around the focused cell in Space row in edit mode; shown only if the focused cell or row has FocusCell["Border"]; @ set border 
			...EditCellCorner      - Bottom right corner for autofill; shown only if the focused cell or row has FocusCell["Corner"] and is set <Cfg DragEdit='1'/>; @ set border, margin, padding, background, width, height and cursor
			...EditCellInput       - Parent div tag where the <input> or <textarea> is placed to; @ set border, padding and background
			...Touch               - Added to the base class on tablet
			*/
			.TUXEditCellBorder { z-index:4; border:1px solid red; }
			.TUXEditCellBorderTouch { }
			.TUXEditCellSpaceBorder { z-index:4; border:1px solid red; }
			.TUXEditCellCorner { position:relative; padding:0px; border:1px solid white; background:red; margin-left:-4px; margin-top:-5px; width:5px; height:5px; z-index:4; cursor:crosshair; }
			.TUXEditCellCornerTouch { width:10px; height:10px; margin-left:0px; }
			.TUXEditCellInput { position:relative; overflow:hidden; z-index:2; background-color:#FFE0A0; line-height:0px; font-size:0px; }
			
			/* ------------- Support classes removing border ------------- 
			
			/* added to ...Background or ...Border classes; @ Do not change */
			.TUXCursorBackground { position:relative; border:none; padding:0px; overflow:hidden; }
			.TUXCursorBorderLeft,.TUXCursorBorderRight,.TUXCursorBorderTop,.TUXCursorBorderBottom { position:relative; overflow:hidden; width:0px; height:0px; }
			.TUXCursorBorderLeft { border-right:none!important; border-top:none!important; border-bottom:none!important; padding-right:0px!important; padding-top:0px!important; padding-bottom:0px!important; }
			.TUXCursorBorderRight { border-left:none!important; border-top:none!important; border-bottom:none!important; padding-left:0px!important; padding-top:0px!important; padding-bottom:0px!important; }
			.TUXCursorBorderTop { border-bottom:none!important; border-left:none!important; border-right:none!important; padding-bottom:0px!important; padding-left:0px!important; padding-right:0px!important; }
			.TUXCursorBorderBottom { border-top:none!important; border-left:none!important; border-right:none!important; padding-top:0px!important; padding-left:0px!important; padding-right:0px!important; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                        Edit control                                                    */
			/*                                                            TGLib                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --- Edit text in <input> / <textarea> --- */
			
			/* @ Set background and text attributes
			...EditInput - set to <input> tag placed into inline edit cursor tag (...EditCellInput)
			...EditTextarea - set to <textarea> tag placed into inline edit cursor tag (...EditCellInput) for Lines type
			...Normal... is added to <input> / <textarea> for cell in table row, ...Header... is added for cell in Header row, ...Space is added for cell in Space row
			...Int..., ...Float..., ...Date..., ...Pass... is added for this cell type
			...Text... is added for cell type Text, Lines, Link, Img
			...ReadOnly is added for preview cell with CanEdit='2'
			*/
			.TUXEditInput,.TUXEditTextarea { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; border:0px none; margin:0px; padding:0px 3px 0px 0px; outline:none; box-sizing:content-box; resize:none; }
			.TUXEditInput::-ms-clear { height:13px; }
			.TUXEditNormalInput,.TUXEditNormalTextarea { background-color:#FFE0A0; }
			.TUXEditHeaderInput,.TUXEditHeaderTextarea { background-color:#FFE0A0; }
			.TUXEditSpaceInput,.TUXEditSpaceTextarea { background-color:#FFE0A0; }
			.TUXEditInt,.TUXEditFloat,.TUXEditDate { text-align:right; }
			.TUXEditText,.TUXEditPass { }
			.TUXEditReadOnly { background-color:#FFEEFF; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                   Dragging objects                                                      */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Set to ghost tag under mouse cursor when dragging something in grid or Gantt; 
			Used when <Cfg ShowDrag='1'/>. For dragged rows is used only if set <Cfg DragObject='1'/>
			The tag is <div> with absolute position and contains the dragged row(s), column header(s) or GanttRun box(es)
			@ Set border, margin, padding, opacity and optionally background
			*/
			.TUXMouseObject { opacity:0.5; filter:alpha(opacity=50); z-index:300; overflow:hidden; }
			
			/* Set to ghost tag under mouse cursor when dragging rows in grid, if set <Cfg DragObject='2'/> and <Cfg ShowDrag='1'/>
			The tag is <div> with absolute position and contains information about the count of dragged rows
			@ Set border, margin, padding, background, opacity, text attributes and optionally height and width
			*/
			.TUXDragObject {
			z-index:300; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; margin-left:10px; margin-top:10px;
			background:#f4f4f4; border:1px solid #d0d0d0; padding:3px;
			}
			
			/* The arrows showing actual drop position when dragging column header or GanttRun box
			@ Set background, width and height
			*/
			.TUXDragColInsideTop,.TUXDragColInsideBottom,.TUXDragColOutsideTop,.TUXDragColOutsideBottom,.TUXDragGanttRunTop,.TUXDragGanttRunBottom,.TUXDragGanttRunTopJoin,.TUXDragGanttRunBottomJoin {
			position:absolute; background-image:url(Sort.gif?v120); width:11px; height:14px; overflow:hidden; z-index:301;
			}
			.TUXDragColInsideTop  { background-position:-3px -1748px; }
			.TUXDragColInsideBottom  { background-position:-3px -1768px; }
			.TUXDragColOutsideTop  { background-position:-3px -1788px; }
			.TUXDragColOutsideBottom  { background-position:-3px -1808px; }
			.TUXDragGanttRunTop  { background-position:-1px -1748px; }
			.TUXDragGanttRunBottom  { background-position:-1px -1767px; }
			.TUXDragGanttRunTopJoin  { background-position:-1px -1788px; }
			.TUXDragGanttRunBottomJoin  { background-position:-1px -1807px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                    Message dialogs                                                      */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Disabled grid, absolute <div> tag shown above grid main tag. The grid is disabled when it shows some message (e.g. "Rendering").
			Note, for disabled page is used GridDisabled class instead. The whole page is disabled when the grid shows modal dialog (e.g. grid configuration menu).
			@ Set background and opacity, optionally margin and padding
			*/
			.TUXDisabled { position:absolute; z-index:264; background:white; opacity:0.5; filter:alpha(opacity=50); } 
			
			/* Grid informational or progress message, absolute <div> tag
			@ Set border, padding, background and text attributes
			*/
			.TUXMessage {
			font:13px Verdana,Tahoma,"Trebuchet MS",sans-serif; white-space:nowrap; text-align:center; visibility:hidden; z-index:266;
			position:absolute; left:0px; top:0px; background:#F4F4F4; border:1px solid #CBCBCB; padding:10px;
			}
			
			/* Shadow <div> tag displayed under grid message tag, on the same position and size 
			@ Set margin for the shadow shift, background, opacity and border
			*/
			.TUXMessageShadow {
			position:absolute; left:0px; top:0px; margin-left:3px; margin-top:3px; z-index:265; visibility:hidden; 
			background:#888; opacity:0.5; filter:alpha(opacity=50);
			}	
			
			/* Page informational message, <div> tag shown inside page being loaded or rendered, instead of the page content
			@ Set border, padding, background and text attributes
			*/
			.TUXPageMessage { background:#FAFAFA; border:1px solid #CBCBCB; padding:10px; font:13px Verdana,Tahoma,"Trebuchet MS",sans-serif; }
			
			/* Progress message 
			...Main is set to inner <div> of the progress message. @ Set text attributes and optionally border, margin, padding and background
			...Caption is set to <div> tag showing the progress message caption. @ Set border, margin, padding, background and text attributes
			...Text is set to <div> tag showing the progress message text. @ Set border, margin, padding, background and text attributes
			...Outer is set to <div> tag showing the gauge container. @ Set border, margin, padding, background and width
			...Inner is set to <div> tag showing the gauge indicator. @ Set border, margin, padding, background and height
			*/
			.TUXProgressMain { font:13px Verdana,Tahoma,"Trebuchet MS",sans-serif; }
			.TUXProgressCaption { font-weight:bold; margin-bottom:15px; }
			.TUXProgressText { margin-bottom:15px; }
			.TUXProgressOuter { text-align:left; width:200px; border:1px solid #CBCBCB; padding:2px; margin-bottom:15px; }
			.TUXProgressInner { height:10px; background:gray; }
			
			/* Button in informational or progress message, <button> tag below the message inside the ...Message 
			...Hover is added when the <button> tag is under mouse cursor
			@ Set border, padding, margin, background and text attributes
			*/
			.TUXProgressButton,.TUXMessageButton { 
			font:11.9px Arial,Helvetica,sans-serif; white-space:nowrap; 
			}
			.TUXProgressButton { margin:5px 2px 0px 2px; padding-left:10px; padding-right:10px; }
			.TUXMessageButton { margin:10px 3px 0px 3px; width:50px; }
			.TUXMessageButtonHover,.TUXProgressButtonHover { }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                   Popup menus and dialogs                                               */
			/*                                                            TGLib                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Default settings for all TreeGrid popup menus and dialogs like Enum, Defaults, Filter, cfg menu, columns menu, popup Menu, Gantt menu and custom menu shown by ShowMenu and ShowPopup
			The styles of individual menu types can be overridden by their individual classes added to all default classes (e.g. "GMMenuMain GMEnumMenuMain")
				Individual classes: ...EnumMenu..., ...DefaultsMenu..., ...FilterMenu..., ...CfgMenu..., ...ColumnsMenu..., ...PopupMenu, ...GanttMenu...
				For custom JSON menu can be the individual class prefix set to Class attribute, like {..., Class:"Custom", ... } and the added classes will be ...Custom..., e.g. GxCustomMain
			Some of the classes are used also for custom JSON dialogs shown by ShowDialog API function.
			*/
			
			/* --- Menu and dialog sections --- */
			
			/* Main menu and dialog classes
			...Main - Main absolute <div> tag; @ Do not change 
			...Static - Used instead of ...Main when dialog is written directly to page HTML by WriteDialog. Used only in TGLib, not in TreeGrid. @ Do not change
			...Shadow - Shadow <div> tag displayed under ...Main tag, on the same position and size. @ Set margin for the shadow shift, background, opacity and border
			...Outer - <div> tag inside the main tag, contains the whole menu. @ Set background, border and padding
			...Top is added to ...Outer when the menu is shown above the header, ...Bottom is added to ...Outer when the menu is shown below the header
			*/      
			.TUXMenuMain { position:absolute; left:0px; top:0px; z-index:258; }
			.TUXMenuStatic { }
			.TUXMenuShadow { position:absolute; margin-left:3px; margin-top:3px; z-index:257; background:#888; opacity:0.5; filter:alpha(opacity=50); }
			.TUXMenuOuter { overflow:hidden; background:white; }
			.TUXMenuOuterTop { }
			.TUXMenuOuterBottom { }
			
			/* Shown outside menu or dialog in place of the source tag, simulating the menu is popped up. For custom JSON menus and dialogs is used when set Header attribute.
			...Top is added to ...Header when the menu is shown above the header, ...Bottom is added to ...Header when the menu is shown below the header
			@ Set margin to shift the header, border, padding and background
			*/
			.TUXMenuHeader { 
			overflow:hidden; position:absolute; z-index:258; border:1px solid #aaaaaa; background:white; cursor:pointer; 
			user-select:none; -o-user-select:none; -moz-user-select:none; -khtml-user-select:none; -webkit-user-select:none;
			}
			.TUXMenuHeaderTop { }
			.TUXMenuHeaderBottom { }
			
			/* Set to menu and dialog top, not scrollable, section. Used only for TreeGrid cfg / column menus. For custom JSON menus and dialogs is used when set Head attribute.
			@ Set border, margin, padding, background and text attributes
			*/
			.TUXMenuHead { 
			border:1px solid #aaaaaa; border-bottom:none; background:#E9E9E9; padding:3px 0px 4px 0px; 
			font:bold 11.5px Verdana,Tahoma,"Trebuchet MS",sans-serif; text-align:center; cursor:default; 
			}
			
			/* Close icon set <div> tag inside the ...MenuHead. Used only for TreeGrid cfg / column menus. For custom JSON menus and dialogs is used when set Head attribute and can be hidden by setting HeadClose:0 
			@ Set background, width and height
			*/
			.TUXMenuClose { float:right; width:14px; cursor:pointer; display:none; background:url(Menu.gif?v120) no-repeat right -354px; }
			
			/* Set to menu and dialog middle, scrollable, section. For custom JSON dialogs the tag is filled by Body attribute value. 
			@ Set border, margin, padding, background and optionally (for the custom dialogs) text attributes
			*/
			.TUXMenuBody { border:1px solid #aaaaaa; cursor:default; padding: 1px 2px 1px 2px; }
			
			/* Set to menu and dialog bottom, not scrollable, section, contains usually control buttons. 
			Used only for TreeGrid cfg / column menus and Range dialogs to display the buttons. For custom JSON menus and dialogs is used when set Foot or Buttons (JSON menu only) attribute.
			@ Set border, margin, padding, background and text attributes
			*/
			.TUXMenuFoot { 
			border:1px solid #aaaaaa; border-top:none; background:#E9E9E9; padding:3px 0px 3px 0px; 
			font:bold 11.5px Verdana,Tahoma,"Trebuchet MS",sans-serif; text-align:center; white-space:nowrap; 
			}
			
			/* Control button inside the Foot section (e.g. OK, Cancel). <button> tag.
			...Hover is added when the <button> tag is under mouse cursor
			@ Set border, margin, padding, background, width, height and text attributes
			*/
			.TUXMenuButton {
			width:48px; margin:2px; padding-left:0px; padding-right:0px;
			font:11.9px Arial,Helvetica,sans-serif; text-align:center; white-space:nowrap; overflow:hidden;  
			}
			.TUXMenuButtonHover { }
			
			/* --- Menu item --- */
			
			/* <div> tags for individual menu items
			...Item is set to all menu items except focused and hovered
			...Focus is set to menu item with key cursor
			...Hover is set to menu item under mouse cursor (...ItemHover to not focused and ...FocusHover to focused)
			...Touch... is added to menu item on tablet
			@ Set border, margin padding and background; all the eight classes should have the same edge width and height (margin+border+padding)
			*/
			.TUXMenuItem { padding:2px 3px 2px 3px; }
			.TUXMenuItemTouch { padding-top:5px; padding-bottom:5px; }
			.TUXMenuItemHover { margin-left:1px; margin-right:1px; padding:2px; background:#F0F0F0; }
			.TUXMenuItemHoverTouch { padding-top:4px; padding-bottom:4px; }
			.TUXMenuFocus { margin-left:1px; margin-right:1px; padding:2px; background:#E0E0E0; }
			.TUXMenuFocusTouch { padding-top:4px; padding-bottom:4px; }   
			.TUXMenuFocusHover { margin-left:1px; margin-right:1px; padding:2px; background:#D0D0D0; }
			.TUXMenuFocusHoverTouch { padding-top:4px; padding-bottom:4px; }   
			
			/* --- Icons inside menu items --- */
			
			/* The classes are set in <div> tag inside the menu item tag
			...CheckedIcon...  - Bool item, checkbox, checked state,                  ...UncheckedIcon... - Bool item, checkbox, unchecked state
			...CheckedRadio... - Bool item with Group, radio button, checked state,   ...UncheckedRadio... - Bool item with Group, radio button, unchecked state
			...CheckedColor... - Bool item with ShowIcon=0 or 2, checked state,       ...UncheckedColor... - Bool item with ShowIcon=0 or 2, checked state
			...Left            - the bool icon is shown on the item text left side,   ...Right - the bool icon is shown on the item text right side
			...CursorIcon      - Cursor icon shown on left side, when menu have set ShowCursor:1; the width of the cursor icon is set by menu Indent attribute, by default 12px
			...HoverIcon       - The cursor icon in menu item under mouse cursor
			...ExpandedIcon    - Icon in expanded section (Expanded:1),  the menu item with Level and Items set; the width of the expanded  icon is set by menu Indent attribute, by default 12px 
			...CollapsedIcon   - Icon in collapsed section (Expanded:0), the menu item with Level and Items set; the width of the collapsed icon is set by menu Indent attribute, by default 12px  
			...NextIcon        - Icon on right side of item with submenu, the menu item with Menu:1 and Items set 
			...Rtl             - used instead in RTL text mode, shows the icon on the other side
			@ Set background and for some icons padding-left or padding-right
			*/
			.TUXMenuCheckedIconLeft { background:url(Menu.gif?v120) no-repeat -2px -51px; padding-left:14px; }
			.TUXMenuCheckedIconRight { background:url(Menu.gif?v120) no-repeat right -51px; padding-right:16px; }
			.TUXMenuUncheckedIconLeft { background:url(Menu.gif?v120) no-repeat -2px -1px; padding-left:14px; }
			.TUXMenuUncheckedIconRight { background:url(Menu.gif?v120) no-repeat right -1px; padding-right:16px; }
			.TUXMenuCheckedRadioLeft { background:url(Menu.gif?v120) no-repeat -2px -750px; padding-left:14px; }
			.TUXMenuCheckedRadioRight { background:url(Menu.gif?v120) no-repeat right -750px; padding-right:16px; }
			.TUXMenuUncheckedRadioLeft { background:url(Menu.gif?v120) no-repeat -2px -700px; padding-left:14px; }
			.TUXMenuUncheckedRadioRight { background:url(Menu.gif?v120) no-repeat right -700px; padding-right:16px; }
			.TUXMenuCheckedColor { background:#CAE1F3 url(Backgrounds.gif?v120) repeat-x 0px -1500px; }
			.TUXMenuUncheckedColor { }
			.TUXMenuCursorIcon { background:url(Menu.gif?v120) no-repeat -6px -150px; }
			.TUXMenuHoverIcon { background:url(Menu.gif?v120) no-repeat -6px -100px; }   
			.TUXMenuCursorIconRtl { background:url(Menu.gif?v120) no-repeat right -1000px; }
			.TUXMenuHoverIconRtl { background:url(Menu.gif?v120) no-repeat right -950px; }   
			.TUXMenuExpandedIcon { background:url(Menu.gif?v120) no-repeat -6px -200px; }
			.TUXMenuCollapsedIcon { background:url(Menu.gif?v120) no-repeat -6px -250px; }
			.TUXMenuNextIcon { background:url(Menu.gif?v120) no-repeat right -300px; padding-right:10px; }
			.TUXMenuNextIconRtl { background:url(Menu.gif?v120) no-repeat left -900px; padding-left:10px; }
			
			/* --- Menu item content --- */
			
			/* The classes are set to <td> tag of inner table that is used to display the item, if it has set Edit, Enum, Icon, LeftHtml or RightHtml attribute.   
			@ Set text attributes and optionally background, border, padding and margin
			...ItemText - every menu item text or caption, it set to <div> tag inside the menu item and inside the menu icon or to <td> tag with item text in inner table
			...ItemLeftHtml - <td> tag in inner table displaying the LeftHtml content on the left side
			...ItemRightHtml - <td> tag in inner table displaying the RightHtml content on the right side
			...ItemIcon - <td> tag in inner table displaying the Icon as background image on the left side, also left to LeftHtml; @ Do not change
			...Level - added to the tags with ...ItemText, ...ItemIcon, ...ItemLeft/RightHtml for item with Level set
			...ItemDisabled - added to all the menu item parts for item with Disabled:1; @ Set opacity and background
			*/
			.TUXMenuItemText,.TUXMenuItemLeftHtml,.TUXMenuItemRightHtml { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:1px 0px 1px 0px; white-space:nowrap; overflow:hidden; }
			.TUXMenuItemIcon { background-repeat:no-repeat; }
			.TUXMenuItemDisabled { opacity:0.70; filter:alpha(opacity=70); }
			.TUXMenuLevel { color:blue; text-align:center; }  
			
			/* The Enum combo in item with Enum:1
			...EnumParent - <td> tag in inner table displaying the Enum combo for the Enum:1 item, on left or right side according to Left value
			...Enum - <div> tag inside the <td> tag ...EnumParent displaying the Enum combo
			...EnumHeader - is set to the <div> tag in Header of the popped up Enum menu
			*/
			.TUXMenuEnumParent { padding-left:5px; padding-right:2px;}
			.TUXMenuEnum,.TUXMenuEnumHeader { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:1px 0px 1px 0px; white-space:nowrap; overflow:hidden; }
			.TUXMenuEnum { border:1px solid #DDD; border-top:1px solid #666; border-left:1px solid #666; background:white url(Menu.gif?v120) no-repeat left -800px; padding-left:15px; }
			.TUXMenuEnumHeader { background:url(Menu.gif?v120) no-repeat left -799px; padding:2px 0px 2px 15px; cursor:default; }
			
			/* The edit text in item with Edit:1
			...EditParent - <td> tag in inner table displaying the editable text for the Edit:1 item, on left or right side according to Left value; @ Set border, padding and background
			...Edit - <div> tag inside the <td> tag ...EditParent displaying the editable text; @ Set border, padding, background and text attributes 
			...EditIE is used instead of ...Edit in IE, in IE5 quirks mode
			...EditMulti - added to the ...Edit tag for item with set Multi:1, multi line edit, to be edited in <textarea>; @ Set border, background and text attributes
			...EditEdit - added to the ...Edit when editing the item text
			...EditText, ...EditInt, ...EditFloat, ...EditDate - added to the ...Edit tag and also to the <input> or <textarea> tag according to the Type attribute; @ Set text attributes
			...EditInput - set to <input> tag placed into ...Edit tag when editing the value; @ Set text attributes
			...EditTextarea - set to <textarea> tag placed into ...Edit tag when editing the value in item with Multi:1 set; @ Set text attributes
			*/
			.TUXMenuEditParent { padding-left:5px; padding-right:2px; }
			.TUXMenuEdit,.TUXMenuEditIE {
			font:11.9px/15px Verdana,Tahoma,"Trebuchet MS",sans-serif; background:white; overflow:hidden; white-space:nowrap; 
			border:1px solid #DDD; padding-left:3px; padding-right:3px; height:15px;
			}
			.TUXMenuEditIE { height:17px; }
			.TUXMenuEditMulti { white-space:normal; }
			.TUXMenuEditEdit { background:#FFE0A0; }
			.TUXMenuEditInput,.TUXMenuEditTextarea { 
			font:11.9px/15px Verdana,Tahoma,"Trebuchet MS",sans-serif; border:0px none; margin:0px; padding:0px; outline:none; background:#FFE0A0; box-sizing:content-box; resize:none; 
			}
			.TUXMenuEditInput::-ms-clear { height:13px; }
			.TUXMenuEditInt,.TUXMenuEditFloat,.TUXMenuEditDate { text-align:right; } 
			.TUXMenuEditText { }
			
			/* --- Special menu items --- */
			
			/* ...Caption - Inactive item, used instead of ...Item..., along width ...ItemText, shown for menu item with Caption:1; @ Set border, margin padding, background and text attributes
			...Separator - Separator between items, shown for menu item with Name:"-", used instead of ...Item...; @ Set border, margin, padding, background and height
			...VSeparator - <td> tag shown between columns of menu items; in children of menu item width Columns attribute set; @ Set border, padding, background and width 
			...Section - Tag around children of item width Level attribute set; @ Set border, margin, padding and background
			*/
			.TUXMenuCaption { padding:2px; background:#ddd; color:blue; text-align:center; }
			.TUXMenuSeparator { margin:3px 3px 2px 3px; height:1px; border-top:1px solid #aaaaaa; overflow:hidden; }
			.TUXMenuVSeparator { border-right:1px solid #DDD; }
			.TUXMenuSection  { }
			
			/* -----------------------------------------------  Filter operator menu ---------------------------------------------------- */
			
			/* Redefines standard popup ...Menu... attributes as ...FilterMenu... 
			*/
			.TUXFilterMenuMain { margin-left:-2px; margin-top:-2px; }
			.TUXFilterMenuOuterTop { }
			.TUXFilterMenuOuterBottom { }
			.TUXFilterMenuHeaderBottom { margin-left:-2px; margin-top:-1px; padding:2px 1px 0px 3px; border-bottom:0px none; }
			.TUXFilterMenuHeaderTop { margin-left:-2px; margin-top:-2px; padding:2px 1px 1px 3px; border-top:0px none; }
			.TUXFilterMenuShadow { margin-left:2px; }
			.TUXFilterMenuItem,.TUXFilterMenuItemHover,.TUXFilterMenuFocus,.TUXFilterMenuFocusHover { }
			
			/* ----------------------------------------------------  Enum menu ---------------------------------------------------------- */
			
			/* ...EnumMenu... redefine particular popup menu ...Menu... classes for Enum type popup menu
			...EnumHeader... is used inside popup menu header ...EnumMenuHeader tag and shows the Enum icon on left or right side or nowhere; @ Set background, padding and text attributes and optionally border and margin
			*/
			.TUXEnumMenuHeader { background:white; }
			.TUXEnumMenuHeaderBottom { padding-top:1px; }
			.TUXEnumMenuHeaderTop { padding-bottom:1px; }
			
			.TUXEnumHeaderLeft,.TUXEnumHeaderRight,.TUXEnumHeaderNone { 
			background:white; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; padding:2px 4px 2px 2px; white-space:nowrap; cursor:pointer; 
			}
			.TUXEnumHeaderLeft { background:white url(Menu.gif?v120) no-repeat 1px -799px; padding-left:17px; }
			.TUXEnumHeaderRight { background:white url(Menu.gif?v120) no-repeat right -799px; padding-right:17px;}
			
			/* --------------------------------------------------  Button List menu ------------------------------------------------------ */
			
			/* ...ToolMenu... redefine particular popup menu ...Menu... classes for Button type with List attribute popup menu
			...ToolHeader... is used inside popup menu header ...ToolMenuHeader tag for row Space='-1' (Above), Space='5' (Below) and others; @ Set background, padding and text attributes and optionally border and margin
			*/
			.TUXToolMenuMain { margin-left:-1px; }
			.TUXToolMenuHeader { margin-left:-1px; }
			.TUXToolMenuItem { }
			.TUXToolMenuOuter { background:#E9E9E9; }
			.TUXToolMenuBody { border:1px solid #D4D4D4; }
			
			.TUXToolHeader,.TUXToolHeaderAbove,.TUXToolHeaderBelow { border:none; padding:1px 5px 100px 4px; }
			.TUXToolHeaderAbove { padding-top:2px; padding-left:5px; }
			.TUXToolHeaderBelow { padding-top:1px; padding-left:5px; }
			
			/* -------------------------------------------  Grid configuration menus --------------------------------------------------- */
			
			/* Special settings for Cfg and Columns TreeGrid menus; override the standard menu settings defined above */
			.TUXCfgMenuOuter,.TUXColumnsMenuOuter { border:1px solid #CBCBCB; padding:6px; }
			.TUXCfgMenuHead,.TUXColumnsMenuHead { border-color:#CBCBCB; }
			.TUXCfgMenuBody,.TUXColumnsMenuBody { border-color:#CBCBCB; }
			.TUXCfgMenuFoot,.TUXColumnsMenuFoot { border-color:#CBCBCB; }
			.TUXCfgMenuButton { width:74px; } 
			.TUXColumnsMenuButton { width:96px; }
			.TUXCfgMenuItemText { padding-left:3px; }
			.TUXColumnsMenuItemText { padding-left:3px; white-space:nowrap; }
			.TUXCfgMenuItem,.TUXColumnsMenuItem { }
			.TUXCfgMenuItemHover,.TUXColumnsMenuItemHover { }
			.TUXCfgMenuFocus,.TUXCfgMenuFocusHover,.TUXColumnsMenuFocus,.TUXColumnsMenuFocusHover { }
			.TUXCfgMenuItemTouch,.TUXColumnsMenuItemTouch { }
			.TUXCfgMenuItemHoverTouch,.TUXColumnsMenuItemHoverTouch { }
			.TUXCfgMenuFocusTouch,.TUXCfgMenuFocusHoverTouch,.TUXColumnsMenuFocusTouch,.TUXColumnsMenuFocusHoverTouch { }
			
			/* ----------------------------------------------  Popup grid dialog ------------------------------------------------------- */
			
			/* Special settings for Popup grid shown by Dates button or ShowPopupGrid API method; overrides the standard dialog settings defined above */
			.TUXPopupGridOuter { overflow:visible; }
			.TUXPopupGridHead { padding:0px; }
			.TUXPopupGridBody { padding:0px; border:0px none; }
			.TUXPopupGridFoot { padding:0px; }
			.TUXPopupGridButton { width:50px; margin-top:-2px; margin-bottom:3px; } 
			
			/* ----------------------------------------------  Choose cell border menu --------------------------------------------------- */
			
			/* Border style menu, ...Style is added to all menu items, ...Empty is added for empty style, ...X is added for given border style 
			@ Change height, width, margin and background
			*/
			.TUXMenuItemBorderStyle { margin-bottom:9px; height:7px; width:50px; border-bottom-color:black; }
			.TUXMenuItemBorderEmpty { border-bottom-width:1px; border-bottom-style:solid; border-bottom-color:#D4D4D4; }
			.TUXMenuItemBorder0 { border-bottom:0px none; }
			.TUXMenuItemBorder1 { border-bottom-width:1px; border-bottom-style:solid; }
			.TUXMenuItemBorder2 { border-bottom-width:2px; border-bottom-style:solid; }
			.TUXMenuItemBorder3 { border-bottom-width:3px; border-bottom-style:solid; }
			.TUXMenuItemBorder4 { border-bottom-width:1px; border-bottom-style:dotted; }
			.TUXMenuItemBorder5 { border-bottom-width:2px; border-bottom-style:dotted; }
			.TUXMenuItemBorder6 { border-bottom-width:1px; border-bottom-style:dashed; }
			.TUXMenuItemBorder7 { border-bottom-width:2px; border-bottom-style:dashed; }
			
			/* Border edge menu, ...Edge is added to all menu items, ...Border is empty edge that is not used now
			...All - all edges, ...O15 - outer edges, ...I3 - inner edges, ...I2 - vertical inner edge, ...I1 - horizontal inner edge, 
			...O1 - top edge, ...O2 - right edge, ...O4 - bottom edge, ...O8 - left edge, ...O5 - top and bottom edge, ...O10 - left and right edge
			@ Change height, width, margin and background
			*/
			.TUXMenuItemBorderEdge { height:20px; width:24px; background-image:url(ToolbarSheetWide.gif?v120); background-repeat:no-repeat; }
			.TUXMenuItemBorder { background-position:left -200px; }
			.TUXMenuItemBorderAll { background-position:left -300px; }
			.TUXMenuItemBorderO15 { background-position:left -400px; }
			.TUXMenuItemBorderI3 { background-position:left -500px; }
			.TUXMenuItemBorderI2 { background-position:left -600px; }
			.TUXMenuItemBorderI1 { background-position:left -700px; }
			.TUXMenuItemBorderO1 { background-position:left -800px; }
			.TUXMenuItemBorderO2 { background-position:left -900px; }
			.TUXMenuItemBorderO4 { background-position:left -1000px; }
			.TUXMenuItemBorderO8 { background-position:left -1100px; }
			.TUXMenuItemBorderO5 { background-position:left -1200px; }
			.TUXMenuItemBorderO10 { background-position:left -1300px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                       Calendar dialog                                                   */
			/*                                                            TGLib                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --- Main calendar classes --- */
			
			/* Added to main menu / dialog classes ...Menu... as ...Pick...
			...Main - Main absolute <div> tag; @ Do not change 
			...Shadow - Shadow <div> tag displayed under ...Main tag, on the same position and size. @ Set margin for the shadow shift, background, opacity and border
			...Outer - <div> tag inside the main tag, contains the whole calendar. @ Set background, border and padding
			...Body - <div> inside ...Outer, contains the whole calendar, including buttons; @ Set background, border, padding and margin  
			*/      
			.TUXPickMain { position:absolute; left:0px; top:0px; z-index:258; }
			.TUXPickShadow { position:absolute; background:#888; z-index:257; margin-left:3px; margin-top:3px; opacity:0.5; filter:alpha(opacity=50); }   
			.TUXPickOuter { border:1px solid #ccc; overflow:hidden; }
			.TUXPickBody { cursor:default; border:none; }
			
			/* --- Other standard dialog parts' classes, NOT shown by default  --- */
			
			/* Added to main menu / dialog classes ...Menu... as ...Pick...
			...Header is shown outside the calendar dialog in place of the source tag. Used only if set Header attribute. @ Set margin to shift the header, border, padding and background
			...HeaderTop is added to ...Header when the calendar is shown above the header, ...HeaderBottom is added to ...Header when the calendar is shown below the header
			...Head is set to calendar top section. Used only if set Head attribute. @ Set border, margin, padding, background and text attributes
			...Close is close icon set <div> tag inside the ...PickHead. Used only if set Head attribute. Can be hidden by setting HeadClose:0; @ Set background, width and height
			...Foot is set to calendar bottom section. Used only if set Foot attribute. It does NOT show calendar buttons. @ Set border, margin, padding, background and text attributes
			*/
			.TUXPickHeader { 
			position:absolute; z-index:258; border:1px solid #ccc; background:white; 
			font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; overflow:hidden; cursor:pointer; 
			}
			.TUXPickHeaderBottom { border-bottom:0px none; padding-bottom:1px; }
			.TUXPickHeaderTop { border-top:0px none; padding-top:1px; }
			.TUXPickHead,.TUXPickFoot { background:#F4F4F4; border:0px none; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:default; }
			.TUXPickHead { padding:3px 0px 4px 5px; }
			.TUXPickFoot { padding:4px 0px 3px 5px; }  
			.TUXPickClose { float:right; width:14px; cursor:pointer; display:none; background:url(Menu.gif?v120) no-repeat right -353px; }
			
			/* --- The calendar header showing month and year --- */
			
			/* ...PickMY - the whole header tag showing the month and year; @ Set border, padding, margin, background and text attributes
			...PickMYDown - shown inside PickMY to display icon down in the first calendar table; @ Set background and padding-right
			...PickMYUp - shown inside PickMY to display icon up in the second calendar table; @ Set background and padding-right
			...PickMYRtl - added to ...PickMYUp and ...PickMYDown in RTL mode; @ Set padding-left
			...PickBL - previous month icon, ...PickBR - next month icon; @ Set background, width and height
			*/
			.TUXPickMY { 
			background:white; padding:4px 0px 4px 0px; 
			font:bold 11.5px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:default; text-align:center; 
			}   
			.TUXPickMYDown { padding-right:13px; background:url(Menu.gif?v120) no-repeat right -400px; cursor:pointer; }
			.TUXPickMYUp { padding-right:13px; background:url(Menu.gif?v120) no-repeat right -450px; cursor:pointer; }
			.TUXPickMYRtl { padding-right:0px; padding-left:13px; }
			.TUXPickBL,.TUXPickBR { width:24px; height:14px; margin-top:2px; padding-top:3px; overflow:hidden; cursor:pointer; display:none; }
			.TUXPickBL { float:left; background:url(Menu.gif?v120) no-repeat left -500px; }
			.TUXPickBR { float:right; background:url(Menu.gif?v120) no-repeat right -550px; }
			
			/* --- The first calendar table with days --- */
			
			/* ...PickTableParent - <div> tag containing the whole table; @ Set border, padding, margin and background 
			...PickTable - <table> tag inside ...PickTableParent; @ Do not change
			...PickRow - <tr> tags with individual day numbers; @ Set background and optionally height
			...PickRowW - top <tr> tag with week day names; @ Set background and optionally height
			...PickCell - <td> tags with day numbers or week names; @ Set width and optionally background, padding and height
			...PickCellTouch - added to ...PickCell on tablet
			*/
			.TUXPickTableParent { padding:5px 13px 5px 13px; }
			.TUXPickTable { table-layout:fixed; width:0px; }
			.TUXPickRow { background:#F4F4F4; }
			.TUXPickRowW { background:#F4F4F4; }
			.TUXPickRowW > td { }
			.TUXPickCell { width:26px; }
			.TUXPickCellTouch { width:32px; }
			
			/* Individual day cells in the first calendar table; only one class per tag is set (except added ...PickTouch). <div> tags inside <td> tag.
			@ Set background, border, margin, padding, height and text attributes
			@ All the classes should have the same height and should not be wider than ...PickCell to avoid blinking the calendar cells on mouse actions
			...PickWDN - week day name in top row
			...PickWN  - week number in left column 
			...PickWNE - not selectable week number in left column
			...PickWD  - work day number
			...PickSa  - Saturday number
			...PickSu  - Sunday number
			...PickOM  - Day number from another month
			...PickNow - Today number
			...PickSel - Selected day number
			...NE      - any not selectable day number
			...PickHover - Any not selected day number under mouse cursor
			...PickSelHover - Selected day number under mouse cursor
			...PickEmpty - top left button in <div> tag to select empty date; @ Set background and height
			...PickTouch - class added to every tag on tablet; @ Set line-height
			*/
			.TUXPickWDN { margin:1px 2px 1px 2px; padding-top:2px; font:11px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; text-align:center; cursor:default; }
			.TUXPickHover,.TUXPickSelHover,.TUXPickWD,.TUXPickSa,.TUXPickSu,.TUXPickSel,.TUXPickNow,.TUXPickWDNE,.TUXPickSaNE,.TUXPickSuNE,.TUXPickSelNE,.TUXPickNowNE,.TUXPickOM,.TUXPickOMNE,.TUXPickWN,.TUXPickWNE {
			margin:2px 3px 2px 3px; padding:1px; border:1px solid white; border-right:1px solid #D4D4D4; border-bottom:1px dotted #CBCBCB; 
			font:11px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; text-align:center; cursor:pointer;
			}
			.TUXPickWN,.TUXPickWNE { 
			border:0px none; margin:0px; padding:3px 4px 3px 4px; background:none; 
			color:#AAA;
			}
			.TUXPickWNE { cursor:default; }
			.TUXPickWDNE,.TUXPickSaNE,.TUXPickSuNE,.TUXPickSelNE,.TUXPickNowNE { cursor:default; text-decoration:line-through; }
			.TUXPickWD { background-color:white; }
			.TUXPickSa { border:1px solid #9cf; background-color:#9cf; color:white; }
			.TUXPickSu { border:1px solid #09C; background-color:#09C; color:white; }
			.TUXPickSel { border:2px solid #09C; padding:0px; background-color:white; font-weight:bold; }
			.TUXPickSelNE { background-color:#ffd; }
			.TUXPickNow { border:2px solid #9cf; padding:0px; background-color:white; font-weight:bold; }
			.TUXPickNowNE { background-color:#ffe0ff; }
			.TUXPickOM { background-color:none; color:black; }
			.TUXPickOMNE { color:#aaaaaa; cursor:default; text-decoration:line-through; }
			.TUXPickEmpty { background:url(Menu.gif?v120) no-repeat center -1050px; cursor:pointer; _cursor:hand; height:20px; }
			.TUXPickHover { background-color:#ddd; border:1px solid #09C; }
			.TUXPickSelHover { background-color:#ddd;  border:2px solid #09C; padding:0px; font-weight:bold; }
			.TUXPickTouch { line-height:18px; }
			
			/* --- The second calendar table with months and years --- */
			
			/* ...Pick2TableParent - <div> tag containing the whole table; @ Set border, padding, margin and background 
			...Pick2Table - <table> tag inside ...Pick2TableParent; @ Do not change
			...Pick2Row - <tr> tags with the cells: 2 months, separator and 2 years; @ Set background and optionally height
			...Pick2CellM - <td> tags with month names; @ Set height, width and optionally background and padding
			...Pick2CellY - <td> tags with year numbers; @ Set height, width and optionally background and padding
			...Pick2CellSep - <td> tag, separator between months and years section; @ Set height, width and optionally background and padding
			...Pick2SepH - separator between the calendar header ...PickMY and calendar body ...Pick2TableParent; @ Set height to synchronize heights of both calendar dialogs
			...Touch - added to ...Pick2Cell... on tablet
			*/
			.TUXPick2TableParent { padding:2px 3px 2px 3px; }
			.TUXPick2Table { table-layout:fixed; width:0px; }
			.TUXPick2Row { }
			.TUXPick2CellM { height:25px; width:70px; }
			.TUXPick2CellMTouch { height:30px; width:80px; }
			.TUXPick2CellY { height:25px; width:38px; }
			.TUXPick2CellYTouch { height:30px; width:50px; }
			.TUXPick2CellSep { height:25px; width:8px; }
			.TUXPick2CellSepTouch { height:30px; width:5px; }
			.TUXPick2SepH { width:1px; height:2px; overflow:hidden; }
			.TUXPick2SepHTouch { height:4px; }
			
			/* Individual cells, <div> tag inside <td> tag
			@ Set background, border, margin, padding, height and text attributes
			@ All the classes should have the same height and should not be wider than ...Pick2Cell... to avoid blinking the calendar cells on mouse actions
			...Pick2M - month name; ...Pick2Y - year number; ...Sel - selected cell; ...Hover - cell under mouse cursor; ...SelHover - selected cell under mouse cursor
			...Pick2Touch - class added to every tag on tablet; @ Set line-height
			*/
			.TUXPick2M,.TUXPick2Y,.TUXPick2MSel,.TUXPick2YSel,.TUXPick2MHover,.TUXPick2YHover,.TUXPick2MSelHover,.TUXPick2YSelHover {
			margin:0px 1px 0px 1px; padding:3px 1px 3px 1px; border:1px solid white; border-right:1px solid #D4D4D4; border-bottom:1px dotted #CBCBCB; background:white;
			font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:pointer; text-align:center; overflow:hidden;
			}
			.TUXPick2MSel,.TUXPick2YSel { border:2px solid #09C; padding:1px 0px 1px 0px; background-color:white; }
			.TUXPick2MHover,.TUXPick2YHover { background:#DDD; padding:1px 0px 1px 0px; border:1px solid #09C; }
			.TUXPick2MSelHover,.TUXPick2YSelHover { background:#ddd; }
			.TUXPick2Touch { line-height:18px; }
			
			/* Special cells, <div> tag inside <td> tag
			...Pick2Sep - separator between months and years; @ Set height, width, background, border, margin, padding
			...Pick2SepTouch - class added to ...Pick2Sep on tablet; @ Set height
			...Pick2BL - button (<div> tag) showing previous 5 years; @ Set background, width and height
			...Pick2BR - button (<div> tag) showing next 5 years; @ Set background, width and height
			*/
			.TUXPick2Sep { }
			.TUXPick2SepTouch { }
			.TUXPick2BL,.TUXPick2BR { width:34px; cursor:pointer; height:23px; }
			.TUXPick2CellYTouch .TUXPick2BL,.TUXPick2CellYTouch .TUXPick2BR { margin-left:5px; }
			.TUXPick2BL { background:url(Menu.gif?v120) no-repeat center -597px; }
			.TUXPick2BR { background:url(Menu.gif?v120) no-repeat center -647px; }
			
			/* --- The calendar footer with time --- */
			
			/* Shown when EditFormat contains time definition (H or h or m or s); it is not shown for Range cells
			For custom calendar it is shown if set TimeFormat attribute; it is not shown if set Multi:1
			...PickTimeCell - the whole calendar footer (<div> tag) on the same level as ...PickTableParent; @ Set border, padding, margin, background and text-align
			...PickTime - set to <input> tag inside ...PickTimeCell; @ Set text attributes
			*/
			.TUXPickTimeCell { padding:8px 5px 8px 0px; background:white; text-align:right; line-height:0px; }
			.TUXPickTime {
			font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; background:white; 
			margin:0px; padding:0px; border:0px none; white-space:nowrap; text-align:right; outline:none; 
			}
			
			/* --- The calendar footer with buttons --- */
			
			/* Contains buttons like OK, Today, Clear; shown for Range cells or when set CalendarButtons; For custom calendar is shown for Multi and for Buttons set.
			...PickFooter is the whole first calendar footer (<div> tag) on the same level as ...PickTableParent; @ Set border, padding, margin, background and text-align
			...Pick2Footer is the whole second calendar footer (<div> tag) on the same level as ...Pick2TableParent; @ Set border, padding, margin, background and text-align
			...PickButton is set to <button> tags; @ Set border, margin, padding, background, width, height and text attributes
			...PickButtonHover is added when the <button> tag is under mouse cursor; @ Set border, margin, padding, background, width, height and text attributes 
			*/
			.TUXPickFooter,.TUXPick2Footer { 
			background:white; padding-top:2px; padding-bottom:2px; cursor:default; text-align:center; 
			}
			.TUXPickButton {
			width:64px; margin:4px; padding:1px 0px 1px 0px;
			font:11.9px Arial,Helvetica,sans-serif; text-align:center; white-space:nowrap; overflow:hidden;  
			}
			.TUXPickButtonHover { }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                       TGLib special classes not used in TreeGrid                                        */
			/*                                                            TGLib                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --- Edit control (TGLib only) --- */
			
			/* ...EditParent is set to temporary parent div tag if the edit is shown on given position, not inside tag; @ Do not change
			...Edit is set to the TGLib Edit control tag (cc="Edit"); @ Set border, margin, padding, background and text attributes
			...EditInline is set instead if the TGLib Edit control tag has display:inline; @ Set side border, margin, padding, background and text attributes
			...EditMulti is added for control with Multi:1 as multiline edit in <textarea>; @ Set border, margin, padding, background and text attributes
			*/
			.TUXEditParent { position:absolute; z-index:258; overflow:hidden; }
			.TUXEdit,.TUXEditInline {
			padding:2px 4px 2px 4px; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif;
			border:1px solid #CCC; background:#EEE; white-space:nowrap; overflow:hidden;
			}
			.TUXEditInline { display:inline-block; vertical-align:bottom; }
			.TUXEditMulti { white-space:normal; }
			
			/* --- Enum control (TGLib only) --- */
			
			/* ...EnumControl is set to the TGLib Enum control tag (cc="Enum"); @ Set border, margin, padding, background and text attributes
			...EnumInline is set instead if the TGLib Enum control tag has display:inline; @ Set side border, margin, padding, background and text attributes
			...EnumHeader is used inside popup menu header ...MenuHeader tag and shows the Enum icon on left side; @ Set background, padding and text attributes and optionally border and margin
			*/
			.TUXEnumControl,.TUXEnumInline {
			background:#EEE url(Menu.gif?v120) no-repeat left -800px; overflow:hidden; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:pointer;
			padding:2px 4px 2px 15px; border:1px solid #CCC;
			}
			.TUXEnumInline { display:inline-block; vertical-align:bottom; }
			.TUXEnumHeader { background:white url(Menu.gif?v120) no-repeat left -798px; font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; cursor:pointer; padding:2px 4px 2px 15px; }
			
			/* --- Mouse dragging (TGLib only) --- */
			
			/* ...MouseOrig is set to original tag being dragged by mouse, when copying the tag
			...DragObject is set to ghost tag being dragged by mouse, when copying the tag
			*/
			.TUXMouseOrig { background:yellow!important; opacity:0.5; filter:alpha(opacity=50); }
			.TUXMouseDragObject { position:absolute; z-index:260; background:#888; opacity:0.5; filter:alpha(opacity=50); }
			
			/* --- Focused control (TGLib only) --- */
			
			.TUXFocus { border:1px solid blue; background-color:white; } 
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                Cell tooltips -  Hint and Tip                                            */
			/*                                                TreeGrid (Hint) / TGLib (Tip)                                            */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ------------------- Hint ------------------- */
			
			/* Hint is shown in place of the cell content if the cell content is not shown the whole 
			...Main is the <div> tag absolutely positioned containing the whole hint; @ Set margin to shift the hint and background, border and padding
			...Outer is added to inner <div> inside ...Main along with all the cell css classes; @ Carefully set the attributes to override the cell settings
			...Shadow is set to <div> tag displayed under hint ...Main tag, on the same position and size; @ Set margin for the shadow shift, background, opacity and border
			...Header... is added to ...Main, ...Outer and ...Shadow for Header row (for every row is added ...xxx..., where xxx is the row Kind and for Header is Header)
			...SpaceEdit is added to ...Main, ...Outer and ...Shadow for editable Space cell (for Space cell is added also the ...xxx... as for row Kind along with the ...SpaceEdit...)
			...Space... is added to ...Main, ...Outer and ...Shadow for not editable Space cell (for Space cell is added also the ...xxx... as for row Kind along with the ...Space...)
			*/
			.TUXHintMain {
			position:absolute; margin-left:-2px; margin-top:-2px; padding-left:1px; padding-top:1px; left:0px; top:0px; z-index:260; 
			background:white; cursor:default; border:1px dotted #CBCBCB; 
			}
			.TUXHintHeaderMain { }
			.TUXHintSpaceMain { margin-left:-1px; margin-top:-1px; padding:0px; overflow:hidden; }
			.TUXHintSpaceEditMain { border:0px none; background:none; margin-left:0px; margin-top:0px; padding:0px; overflow:hidden; }
			.TUXHintOuter { overflow:hidden; background:white; color:black; text-align:left; border-color:white; }
			.TUXHintSpaceOuter { margin-left:-1px; margin-top:-1px; }
			.TUXHintSpaceEditOuter { }
			.TUXHintHeaderOuter { background:#E9E9E9; }
			.TUXHintShadow { position:absolute; margin-left:2px; margin-top:2px; z-index:259; background:#888; opacity:0.3; filter:alpha(opacity=30); }
			.TUXHintSpaceShadow { margin-left:4px; margin-top:4px; }
			.TUXHintSpaceEditShadow { margin-left:4px; margin-top:4px; }
			
			/* ------------------- Tip ------------------- */
			
			/* Tip is shown below mouse cursor on mouse hover the cell; Used only if set <Cfg StandardTip='0'/>
			...Main - main tip <div> tag absolutely positioned; @ Do not change
			...Outer - outer tip <div> tag inside ...Main, has set maximal width to overflow long text; @ Set border, margin, padding, background
			...Body - inner tip <div> tag inside ...Outer; @ Set text attributes and optionally border, margin, padding and background
			...Shadow - <div> tag displayed under tip ...Main tag, on the same position and size; @ Set margin for the shadow shift, background, opacity and border
			*/
			.TUXTipMain { position:absolute; left:0px; top:0px; z-index:262; visibility:hidden; }
			.TUXTipOuter { background:#f4f4f4; border:1px solid #d0d0d0; padding:3px; overflow:hidden; cursor:default; }
			.TUXTipBody { font:11.9px/13px Verdana,Tahoma,"Trebuchet MS",sans-serif; white-space:nowrap; }
			.TUXTipShadow { position:absolute; margin-left:3px; margin-top:3px; z-index:261; background:#888; opacity:0.3; filter:alpha(opacity=30); visibility:hidden; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                 Line chart (cell type Chart)                                            */
			/*                                                            TGLib                                                        */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* ...Chart - cell type, <td> tag; @ Set border, padding and background
			...ChartInner - inner <div> tag containing the whole chart; @ Set background
			...ChartLayer - individual chart layers, <div> tags, one per TChartLine, one for Axis and one for Caption; @ Do not change
			...ChartAxisY - horizontal axis, <div> tag; @ Set height and background
			...ChartAxisX - vertical axis, <div> tag; @ Set width and background
			...ChartAxisYLabel, ...ChartAxisXLabel - <div> tag with labels for X and Y axes; @ Set background
			...ChartAxisYText, ...ChartAxisXText - <div> tag inside ...Label; @ Set text attributes and optionally background, border, margin and padding
			...ChartCaption - chart top caption, <div> tag; @ Set background, border, padding and text attributes
			*/
			.TUXChart { padding:5px; }
			.TUXChartInner { background:white; width:100%; }
			.TUXChartLayer { overflow:hidden; height:1000px; }
			.TUXChartAxisY { background:black; height:1px; overflow:hidden; }
			.TUXChartAxisYLabel { overflow:hidden; }
			.TUXChartAxisYText { margin-right:5px; margin-top:12px; text-align:right; font:12px/14px Arial,Helvetica,sans-serif; }
			.TUXChartAxisX { width:1px; overflow:hidden; background:black; }
			.TUXChartAxisXLabel { overflow:hidden; }
			.TUXChartAxisXText { text-align:center; font:12px/14px Arial,Helvetica,sans-serif; }
			.TUXChartCaption { text-align:center; font:12px/14px Arial,Helvetica,sans-serif; margin-top:3px; }
			
			/* Individual chart points for PointType value; @ Set only background 
			...Hover is added to point under mouse cursor
			*/
			.TUXChartPoint1,.TUXChartPoint2,.TUXChartPoint3,.TUXChartPoint4,.TUXChartPoint5,.TUXChartPoint6,.TUXChartPoint7,.TUXChartPoint8 {
			background:url(Gantt.gif?v120) no-repeat; width:32px; height:32px; overflow:hidden; 
			}
			.TUXChartPoint1 { background-position:-892px 7px; }
			.TUXChartPoint1Hover { background-position:-942px 7px; }
			.TUXChartPoint2 { background-position:-992px 7px; }
			.TUXChartPoint2Hover { background-position:-1042px 7px; }
			.TUXChartPoint3 { background-position:-1092px 7px; }
			.TUXChartPoint3Hover { background-position:-1142px 7px; }
			.TUXChartPoint4 { background-position:-1192px 7px; }
			.TUXChartPoint4Hover { background-position:-1242px 7px; }
			.TUXChartPoint5 { background-position:-1292px 7px; }
			.TUXChartPoint5Hover { background-position:-1342px 7px; }
			.TUXChartPoint6 { background-position:-1392px 7px; }
			.TUXChartPoint6Hover { background-position:-1442px 7px; }
			.TUXChartPoint7 { background-position:-1492px 7px; }
			.TUXChartPoint7Hover { background-position:-1542px 7px; }
			.TUXChartPoint8 { background-position:-1592px 7px; }
			.TUXChartPoint8Hover { background-position:-1642px 7px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                      Custom scrollbars                                                  */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* Custom scrollbars shown if set CustomScroll (always) or CustomHScroll (for horizontal scrollbar only) or TouchScroll (on tablet only)
			There are four scrollbar types for CustomScroll values 1 - 4 for different sizes, 1 - standard size, 2 - wide scrollbar, 3 - thin scrollbar, 4 - hidden scrollbar
			*/
			
			/* --- Horizontal scrollbars --- */
			
			/* ...RightHidden - shown instead of ...Right if the column section does not need to show scrollbar (but the other sections do) 
				It is used also to calculate scrollbar height; @ Set height and background and optionally border and margin
			...Right - <div> tag placed inside ...HScroll... tag to show the right side arrow button; @ Set padding-right and background and optionally border, padding and margin
			...RightHover - used instead of ...Right under mouse cursor, to highlight the right side button
			...Left - <div> tag placed inside ...Right to show the left side arrow button; @ Set padding-left and background
			...LeftHover - used instead of ...Left under mouse cursor, to highlight the left side button
			...SliderRight - <div> tag placed inside ...Left... tag to show the right edge of the slider; @ Set padding-right and background and optionally border, padding and margin
			...SliderRightHover - used instead of ...SliderRight under mouse cursor, to highlight the right edge of the slider
			...SliderLeft - <div> tag placed inside ...SliderRight to show the left edge of the slider; @ Set padding-left and background
			...SliderLeftHover - used instead of ...SliderLeft under mouse cursor, to highlight the left edge of the slider
			...SliderHIn - <div> tag placed inside ...SliderLeft to show the body of the slider; Controls height of the whole scrollbar; 
				@ Set height and background; The height must be height of ...RightHidden minus all vertical padding,border and margin of the ...Right, ...Left, ...SliderRight, ...SliderLeft and ...SliderHIn
			...SliderHInHover - used instead of ...SliderHIn under mouse cursor, to highlight the body of the slider
			...X - shown in the horizontal scrollbars row in place of vertical scrollbar; @ Set background
			*/
			.TUXCustScroll1RightHidden { background:url(VScroll.gif?v120) left -108px; height:17px; }
			.TUXCustScroll1Right { padding-right:17px; background:url(VScroll.gif?v120) right 0px; }
			.TUXCustScroll1RightHover { padding-right:17px; background:url(VScroll.gif?v120) right -18px; }
			.TUXCustScroll1Left { padding-left:17px; background:url(VScroll.gif?v120) left 0px; }
			.TUXCustScroll1LeftHover { padding-left:17px; background:url(VScroll.gif?v120) left -18px; }
			.TUXCustScroll1SliderRight { background:url(VScroll.gif?v120) right -36px; padding-right:1px; }
			.TUXCustScroll1SliderRightHover { background:url(VScroll.gif?v120) right -72px; padding-right:1px; }
			.TUXCustScroll1SliderLeft { background:url(VScroll.gif?v120) left -36px; padding-left:1px; }
			.TUXCustScroll1SliderLeftHover { background:url(VScroll.gif?v120) left -72px; padding-left:1px; }
			.TUXCustScroll1SliderHIn { height:17px; overflow:hidden; background:url(VScroll.gif?v120) center -54px; }
			.TUXCustScroll1SliderHInHover { height:17px; overflow:hidden; background:url(VScroll.gif?v120) center -90px; }
			.TUXCustScroll1X { background:#F4F4F4; cursor:default; }
			
			.TUXCustScroll2RightHidden { background:url(VScroll.gif?v120) left -364px; height:34px; }
			.TUXCustScroll2Right { padding-right:36px; background:url(VScroll.gif?v120) right -148px; }
			.TUXCustScroll2RightHover { padding-right:36px; background:url(VScroll.gif?v120) right -184px; }
			.TUXCustScroll2Left { padding-left:36px;  background:url(VScroll.gif?v120) left -148px; }
			.TUXCustScroll2LeftHover { padding-left:36px;  background:url(VScroll.gif?v120) left -184px; }
			.TUXCustScroll2SliderRight { background:url(VScroll.gif?v120) right -220px; padding-right:2px; }
			.TUXCustScroll2SliderRightHover { background:url(VScroll.gif?v120) right -292px; padding-right:2px; }
			.TUXCustScroll2SliderLeft { background:url(VScroll.gif?v120) left -220px; padding-left:2px; }
			.TUXCustScroll2SliderLeftHover { background:url(VScroll.gif?v120) left -292px; padding-left:2px; }
			.TUXCustScroll2SliderHIn { height:34px; overflow:hidden; background:url(VScroll.gif?v120) center -256px; }
			.TUXCustScroll2SliderHInHover { height:34px; overflow:hidden; background:url(VScroll.gif?v120) center -328px; }
			.TUXCustScroll2X { background:#F4F4F4; cursor:default; }
			
			.TUXCustScroll3Right,.TUXCustScroll3RightHidden { background:white; height:8px; }
			.TUXCustScroll3SliderRight,.TUXCustScroll3SliderRightHover { padding-right:3px; height:9px; background:url(VScroll.gif?v120) right -126px; }
			.TUXCustScroll3SliderRightHover { background-position:right -135px; }
			.TUXCustScroll3SliderLeft,.TUXCustScroll3SliderLeftHover { height:8px; background:url(VScroll.gif?v120) left -126px; }
			.TUXCustScroll3SliderLeftHover { background-position:left -135px; }
			.TUXCustScroll3X { background:white; cursor:default; }
			
			.TUXCustScroll4Right,.TUXCustScroll4RightHidden,.TUXCustScroll4SliderRight,.TUXCustScroll4SliderRightHover { height:1px; }
			.TUXCustScroll4X { }
			
			/* --- Vertical scrollbars --- */
			
			/* ...DownHidden - shown instead of ...Down if the grid does not need to show scrollbar and ShowVScroll='1' is set 
				It is used also to calculate scrollbar width; @ Set width and background and optionally border and margin
			...Down - <div> tag placed inside ...VScroll tag to show the bottom side arrow button; @ Set padding-bottom and background and optionally border, padding and margin
			...DownHover - used instead of ...Down under mouse cursor, to highlight the bottom side button
			...Up - <div> tag placed inside ...Down to show the top side arrow button; @ Set padding-top and background
			...UpHover - used instead of ...Up under mouse cursor, to highlight the top side button
			...SliderDown - <div> tag placed inside ...Up... tag to show the bottom edge of the slider; @ Set padding-bottom and background and optionally border, padding and margin
			...SliderDownHover - used instead of ...SliderDown under mouse cursor, to highlight the bottom edge of the slider
			...SliderUp - <div> tag placed inside ...SliderDown to show the top edge of the slider; @ Set padding-top and background
			...SliderUpHover - used instead of ...SliderUp under mouse cursor, to highlight the top edge of the slider
			...SliderVIn - <div> tag placed inside ...SliderUp to show the body of the slider; @ Set background
			...SliderVInHover - used instead of ...SliderVIn under mouse cursor, to highlight the body of the slider
			*/
			.TUXCustScroll1DownHidden { background:url(HScroll.png?v120) -108px top; width:17px; }
			.TUXCustScroll1Down { padding-bottom:17px; background:url(HScroll.png?v120) 0px bottom; }
			.TUXCustScroll1DownHover { padding-bottom:17px; background:url(HScroll.png?v120) -18px bottom; }
			.TUXCustScroll1Up { padding-top:17px; background:url(HScroll.png?v120) 0px top; }
			.TUXCustScroll1UpHover { padding-top:17px;  background:url(HScroll.png?v120) -18px top; }
			.TUXCustScroll1SliderDown { background:url(HScroll.png?v120) -36px bottom; padding-bottom:1px; }
			.TUXCustScroll1SliderDownHover { background:url(HScroll.png?v120) -72px bottom; padding-bottom:1px; }
			.TUXCustScroll1SliderUp { background:url(HScroll.png?v120) -36px top; padding-top:1px; }
			.TUXCustScroll1SliderUpHover { background:url(HScroll.png?v120) -72px top; padding-top:1px; }
			.TUXCustScroll1SliderVIn { background:url(HScroll.png?v120) -54px center; }
			.TUXCustScroll1SliderVInHover { background:url(HScroll.png?v120) -90px center; }
			
			.TUXCustScroll2DownHidden { background:url(HScroll.png?v120) -364px top; width:34px; }
			.TUXCustScroll2Down { padding-bottom:36px; background:url(HScroll.png?v120) -148px bottom; }
			.TUXCustScroll2DownHover { padding-bottom:36px; background:url(HScroll.png?v120) -184px bottom; }
			.TUXCustScroll2Up { padding-top:36px; background:url(HScroll.png?v120) -148px top; }
			.TUXCustScroll2UpHover { padding-top:36px;  background:url(HScroll.png?v120) -184px top; }
			.TUXCustScroll2SliderDown { background:url(HScroll.png?v120) -220px bottom; padding-bottom:2px; }
			.TUXCustScroll2SliderDownHover { background:url(HScroll.png?v120) -292px bottom; padding-bottom:2px; }
			.TUXCustScroll2SliderUp { background:url(HScroll.png?v120) -220px top; padding-top:2px; }
			.TUXCustScroll2SliderUpHover { background:url(HScroll.png?v120) -292px top; padding-top:2px; }
			.TUXCustScroll2SliderVIn { background:url(HScroll.png?v120) -256px center; }
			.TUXCustScroll2SliderVInHover { background:url(HScroll.png?v120) -328px center; }
			
			.TUXCustScroll3Down,.TUXCustScroll3DownHidden { background:white; width:9px; }
			.TUXCustScroll3SliderDown,.TUXCustScroll3SliderDownHover { padding-bottom:3px; background:url(HScroll.png?v120) -126px bottom; }
			.TUXCustScroll3SliderDownHover { background-position:-135px bottom; }
			.TUXCustScroll3SliderUp,.TUXCustScroll3SliderUpHover { background:url(HScroll.png?v120) -126px top; }
			.TUXCustScroll3SliderUpHover { background-position:-135px top; }
			
			.TUXCustScroll4Down,.TUXCustScroll4DownHidden,.TUXCustScroll4SliderDown,.TUXCustScroll4SliderDownHover { width:0px; }
			
			
			/* -------------------------------------------------------------------------------------------------------------------------- */
			/*                                                       System settings                                                   */
			/* -------------------------------------------------------------------------------------------------------------------------- */
			
			/* --------------- Debug print ----------------- */
			/* ! Note, here is no .TRI style prefix
			Controls the default debug window shown bottom the page, controlled by <bdo Debug> attribute
			...Tag - <div> tag containing the debug print; @ Set position attributes, background, border and padding
			...TagMax - used instead of ...Tag when maximized by clicking to Max button
			...Buttons - <div> tag placed next to ...Tag to show the debug control buttons; @ Set position attributes, background, border and padding
			...ButtonsMax - used instead of ...Buttons when maximized by clicking to Max button
			*/
			.GridDebugTag,.GridDebugTagMax { overflow:auto; overflow-y:scroll; border:1px solid black; background:#DDD; }
			.GridDebugTag,.GridDebugTagMax,.GridDebugButtons,.GridDebugButtonsMax {
			position:fixed; z-index:256; left:5px; right:5px; bottom:5px; height:200px; padding:4px;
			position:absolute!IE;
			left:expression((5+(document.compatMode=="CSS1Compat"?document.documentElement.scrollLeft:document.body.scrollLeft))+"px")!IE;
			width:expression((-10+(document.compatMode=="CSS1Compat"?document.documentElement.clientWidth-8:document.body.clientWidth))+"px")!IE;
			top:expression((-205+(document.compatMode=="CSS1Compat"?document.documentElement.scrollTop+document.documentElement.clientHeight-8:document.body.scrollTop+document.body.clientHeight))+"px")!IE;
			}
			.GridDebugTagMax,.GridDebugButtonsMax {
			top:5px; height:auto; 
			top:expression((5+(document.compatMode=="CSS1Compat"?document.documentElement.scrollTop:document.body.scrollTop))+"px")!IE;
			height:expression((-10+(document.compatMode=="CSS1Compat"?document.documentElement.clientHeight-8:document.body.clientHeight))+"px")!IE;
			}
			.GridDebugButtons,.GridDebugButtonsMax {
			text-align:right; margin-right:25px; width:130px; left:auto;
			left:expression((-155+(document.compatMode=="CSS1Compat"?document.documentElement.clientWidth-8:document.body.clientWidth))+"px")!IE;
			}
			
			/* Individual parts of the debug print
			...Button - one debug button, <button> tag placed inside ...Buttons; @ Set width, height, background, border, padding, margin and text attributes
			...Title - <span> tag with grid or print identification; @ Set text attributes and background
			...Mark - <span> tag that highlights some information, e.g. actual values; @ Set text attributes and background
			...Stop (0), ...Error (1), ...Warning (2), ...List (3), ...Info (>3) - <div> or <span> tag containing the information according to the debug level number; @ Set text attributes and background
			*/
			.GridDebugButton { font-size:10px; width:40px; padding:0px; }
			.GridDebugTitle { font-size:10px; color:blue; font-style:normal;font-weight:normal; }
			.GridDebugMark { font-weight:bold; }
			.GridDebugStop { font-size:18px; font-weight:bold; color:red; }
			.GridDebugError { font-size:12px; color:red; }
			.GridDebugWarning { font-size:12px; color:#A60;}
			.GridDebugList { font-size:10px; color:#888;}
			.GridDebugInfo { font-size:12px; }
			
			/* ------------------- Other settings ------------------- */
			
			/* Class added to <body> tag when printing grid to actual page or to new window (for PrintLocation != 2); @ Set any <body> attribute
			*/
			.TUXBodyPrint { margin:0px!important; padding:0px!important; border:0px none!important; background:none!important; }
			
			/* Border shown in main tag during grid resizing */
			.TUXResizeBorder { border:1px dashed black!important; }
			
			/* Temporary tag used for some calculations; @ Do not change; ! Note, here is no .TRI style prefix */
			.GridTmpTag { position:absolute; left:5px; top:5px; visibility:hidden; } 
			
			/* Tag added to disable whole page, e.g. when showing modal dialog. ! Note, here is no .TRI style prefix
			Note, to disable only the grid is used .TRIDisabled class instead (e.g. when showing message in grid).
			@ Set background and opacity, optionally margin and padding
			*/
			.GridDisabled { position:absolute; z-index:256; background:white; opacity:0.5; filter:alpha(opacity=50); } 
			
			/* Tag where the grid is rendered and also where all the support absolute tags are rendered (e.g. cursors, dialogs or messages). ! Note, here is no .TRI style prefix
			@ Increase z-index if the grid or its menus or cursors are not shown as expected. But it is usually better to set <Cfg ZIndex/> instead.
			*/
			.GridMain { z-index:255; }
			
			/* Marks the style loaded; must be the last class in the file; @ Do not change */
			.TUXLoaded { border:1px solid black!important; }
		</style>
	</template>
</dom-module>
`;

addDomStyleModule(styles, "triplat-availability/styles/tristyles-grid.js");