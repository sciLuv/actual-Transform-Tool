//hexToRGB is used in all updatePos(position file in gulp mode) inside function to associate value of color and value of opacity
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha/100 + ")";
}

//change the position-interface display
function changePosIFDisplay(){
    posIF.removeAttribute("block");
    posIF.removeAttribute("inline");
    posIF.removeAttribute("inline-block");
    posIF.removeAttribute("flex");
    posIF.removeAttribute("grid");

    posIF.setAttribute(posSetting.display.display, "");
}

//function to reinitialize style of container 
function reInitContainerStyle(){
    if(posSetting.display.display == "flex"){
        console.log("test1");
        topElemsContainer.style.flexDirection = null;
        topElemsContainer.style.flexWrap = null;
        topElemsContainer.style.justifyContent = null;
        topElemsContainer.style.alignContent = null;
        topElemsContainer.style.alignItems = null;

        elemsContainer.style.flexDirection = null;
        elemsContainer.style.flexWrap = null;
        elemsContainer.style.justifyContent = null;
        elemsContainer.style.alignContent = null;
        elemsContainer.style.alignItems = null;
    }
    else if(posSetting.display.display == "grid"){
        console.log("test2");
        topElemsContainer.style.display = null;
        topElemsContainer.style.gridTemplateColumns = null;
        topElemsContainer.style.gridTemplateRows = null;
        topElemsContainer.style.gridColumnGap = null;
        topElemsContainer.style.gridRowGap = null;

        elemsContainer.style.gridTemplateColumns = null;
        elemsContainer.style.gridTemplateRows = null;
        elemsContainer.style.gridColumnGap = null;
        elemsContainer.style.gridRowGap = null;

        underElemsContainer.style.display = null;
        underElemsContainer.style.gridTemplateColumns = null;
        underElemsContainer.style.gridTemplateRows = null;
        underElemsContainer.style.gridColumnGap = null;
        underElemsContainer.style.gridRowGap = null;

        underElemsContainer.innerHTML = "";
    }
}

//function for size part of the position menu (size, padding and margin) and changing of the
function posIFAutoPlaceAndSize(size, sizeSpe, minIF, range, positionWindow){
    let diffRange = 0;
    if(size > minIF){
        if(range.value < minIF-(size-sizeSpe)){
            diffRange = sizeSpe - (minIF-(size-sizeSpe));
            console.log(sizeSpe - (minIF-(size-sizeSpe)));
        }
        else{
            diffRange = sizeSpe - range.value;
        }
    }
    else if((size < minIF)&&(range.value > minIF-(size-sizeSpe))){
            diffRange = (minIF-(size-sizeSpe)) - range.value;  
    }
    leftPosition = Number(leftPosition) + Number(diffRange);
    position.style[positionWindow] = leftPosition + "px";
}
function posIFHeightCSS(size, posIF){
    if(size <= 112){
        posIF.style.height = "152px";
    }
    else{
        posIF.style.height = null;
    }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ IN LINK WITH GRID DISPLAYING ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//to put/add cel in underContainer 
function addGridCel(column, line, underContainer){
    underContainer.innerHTML = "";
    let numOfCel = column*line;
    for(i=1; i <= numOfCel; i++){
        underContainer.innerHTML += "<div id='cel-" + i + "' class='cel'></div>"
    }
} 
//to apply style of grid gap to all in-position elem container
function addGridGap(container, underContainer, topContainer, columnOrLine, gap){
    container.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    underContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    topContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
}
//in function of the value in posSetting.display, organise the grid with CSS rules
function addGridColLine(container, underContainer, topContainer, columnsOrLines, columnOrLine, num){
    let GridTemplateVal = ""; 
    let specificTemplateVal = false;
    let lastSpecificTemplateVal = 0;

    for(i=1; i<=num; i++){
        if(posSetting.display.size[columnOrLine][i] != undefined){
            if(i == 1){
                GridTemplateVal += posSetting.display.size[columnOrLine][i] + "fr";
                specificTemplateVal = true;
                lastSpecificTemplateVal = 1;
            }
            else{    
                if(lastSpecificTemplateVal == (i-1)){
                    GridTemplateVal += " " + posSetting.display.size[columnOrLine][i] + "fr";
                }
                else{
                    GridTemplateVal += " repeat(" + ((i-1)-lastSpecificTemplateVal) + ", " + posSetting.display.size[columnOrLine].default + "fr) " + posSetting.display.size[columnOrLine][i] + "fr";
                }
                specificTemplateVal = true;
                lastSpecificTemplateVal = i;
            }
        }
        if((i == num)&&(lastSpecificTemplateVal != num)){
            if(lastSpecificTemplateVal == (num-1)){
                GridTemplateVal += " " + posSetting.display.size[columnOrLine].default + "fr"
            }
            else{
                GridTemplateVal += " repeat(" + (i-lastSpecificTemplateVal) + ", " + posSetting.display.size[columnOrLine].default + "fr) "
            }
        }
    }
    if(specificTemplateVal == false){
        GridTemplateVal = "repeat("+ num +", 15fr)"
        container.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
        underContainer.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
        topContainer.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
    }
    else{
        container.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
        underContainer.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
        topContainer.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
    }
}
//this function give to the object posSetting.Display.menu[left|top] information about placement and size of each cel of grid 
function insideCalcGrid(rowOrColNumb, celSizeList, placeTopOrLeft, heightOrWidth, lineOrColumn){
    celSizeList = []; //asign to variable array type or/and emptying arrays of variables to recalculate their content
    
    //global variable use specificly in this function to define DOM element of first row or column of the grid of under-position-elem
    posSetting.display.menu[placeTopOrLeft] = [];


    //this loop select first cel of each row or col an put it on celSizeList array
    for(i=1; i<=rowOrColNumb; i++){
        if(posSetting.display[lineOrColumn] != posSetting.display.margeLines){
            let cel = (columnNumb*(i-1))+1;
            let celDom = document.getElementById("cel-" + cel);
        }
        else{
            let celDom = document.getElementById("cel-" + i);
            celSizeList.push(celDom)
        }
    }
    //this loop find the size of cels and put the information in an array in posSetting.display.menu[left|top]
    for(i=1; i<=celSizeList.length; i++){
        let cel = window.getComputedStyle(celSizeList[i-1]).getPropertyValue(heightOrWidth);
        let celSize = Number(cel.split("px").shift())+2;
        if(i>1){
            celSize += posSetting.display.menu[placeTopOrLeft][i-2];
            celSize += Number(posSetting.display[lineOrColumn]);
            celSize = Math.round(celSize*100)/100;
        }
        posSetting.display.menu[placeTopOrLeft].push(celSize);
    }
    posSetting.display.menu[placeTopOrLeft].unshift(0);
}
//calcGrid exe insideCalcGrid twice, (for line and column), and calcElemPlace. use to place less code in other part of the program
function calcGrid(){
    rowNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-rows").split(" ").length;
    columnNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-columns").split(" ").length;
    insideCalcGrid(rowNumb, gridRowCelSizeList, "top", "height", "margeLines");
    insideCalcGrid(columnNumb, gridColumnCelSizeList, "left" , "width", "margeColumns");
    calcElemCelPlace();
}
//calcElemCelPlace is use in calcGrid and the click event of the more btn of the element tool.
//use for find place of new elem in a grid display, in function of the place of other element already here.
function calcElemCelPlace(){
    if(posSetting.display.display == "grid"){ 
        //loop of all element for select specificly the last element, with the next condition 
        for(i=0; i<=elemList.length-1; i++){
            if(i+1==elemList.length){
                //this condition is here for when this function is use in link of function of redefining the display place,
                //in this way, once the elem has is place it can't be change again. in end of the loop .use is true
                if(gridIFList[i].use == false){
                    //variables for representation of differentes part of the css rule "grid-area"
                    topCel = 1;
                    bottomCel = 2;
                    leftCel = 1;
                    rightCel = 2;
                    //array to push futur variable of elem take place for the new elem's already selected place
                    let isTopEmpty = [];
                    //this loop is for select all elem except the last one (the elem for which we search now the place)
                    for(j=0; j<=elemList.length-2; j++){
                        //if the left side of the item we are comparing have the same value of the left actual value of assigniation
                        if(elemList[j].grid.left == leftCel){
                            //if top and bottom side of item we are comparing have the same value of the top and bottom actual value of assigniation
                            if((elemList[j].grid.top == topCel)||((elemList[j].grid.top < topCel)&&(elemList[j].grid.bottom >= bottomCel))){
                                //add to the isTopEmpty array the Right Side of the elem Selected in lasts conditions
                                isTopEmpty.push(elemList[j].grid.right);
                            }
                        }
                        //this is selected the second to last elem before to process the rest of place selection of the last elem 
                        //in this way the array isTopEmpty is completed
                        if(j == elemList.length-2){
                            //if the place is already take (if isTopEmpty is not empty)
                            if(isTopEmpty.length > 0){
                                //if the empty value is superior of the number of column, change value of top/left/bottom/right 
                                //in this way change the row selected 
                                if(isTopEmpty == columnNumb+1){
                                    console.log(isTopEmpty);
                                    topCel++;
                                    bottomCel++;
                                    leftCel = 1;
                                    rightCel = 2;
                                }
                                //if the value is different but not superior of the number of column change just left and right 
                                //in this way change to the next cel not test in the same row.
                                else{
                                    let newLeft = Math.max(...isTopEmpty);
                                    leftCel = newLeft;
                                    rightCel = newLeft+1;
                                }
                                //this two new value give to go back in beginning of the loop
                                j = -1;
                                isTopEmpty = [];
                            }
                            //condition when elem take already all places in the grid, place the elem by default in 1/1/2/2
                            else if((bottomCel > rowNumb+1)||(rightCel > columnNumb+1)){
                                topCel = 1;
                                bottomCel = 2;
                                 leftCel = 1;
                                rightCel = 2;  
                                console.log("prout");  
                            }
                        }
                    }
                    //this apply change selected before to elem object
                    elemList[i].grid.left = leftCel; 
                    elemList[i].grid.right = rightCel;
        
                    elemList[i].grid.top = topCel;
                    elemList[i].grid.bottom = bottomCel;

                    gridIFList[i].use = true;   
                }
            }
            //give to sizing and placing html elem caracteristic selected before
            document.getElementById(elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
            document.getElementById(elemList[i].id.name).style.width = "auto";
            document.getElementById(elemList[i].id.name).style.height = "auto";
            //give to html elem caracteristic selected before
            document.getElementById("if-" + elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
            document.getElementById("if-" + elemList[i].id.name).style.width = "auto";
            document.getElementById("if-" + elemList[i].id.name).style.height = "auto";
        }
    }
}
//use to calculate the place of the position-elem-container to the top and the left, in a grid displaying context
function inPositionPlacement(){
    if(posSetting.display.display == "grid"){
        let inPositionPaddingTopHeight = Number(window.getComputedStyle(inPositionPaddingTop[0]).getPropertyValue("height").replace("px",""));
        let inPositionPaddingTopBorderHeight = Number(window.getComputedStyle(posIF).getPropertyValue("border-top").split(" ")[0].replace("px",""));
        let posToolTitleHeight = Number(window.getComputedStyle(posToolTitle).getPropertyValue("height").replace("px",""));
        let posToolTitleBorderHeight = Number(window.getComputedStyle(posToolTitle).getPropertyValue("border-top").split(" ")[0].replace("px",""));
        posSetting.display.menu.clientTop = topPosition + inPositionPaddingTopHeight + inPositionPaddingTopBorderHeight + posToolTitleHeight + posToolTitleBorderHeight + Number(posSetting.size.margin.top) + Number(posSetting.size.padding.top);
    
    
        let inPositionPaddingLeftWidth = Number(window.getComputedStyle(inPositionPaddingLeft[0]).getPropertyValue("width").replace("px",""));
        let inPositionPaddingLeftBorderWidth = Number(window.getComputedStyle(posIF).getPropertyValue("border-left").split(" ")[0].replace("px",""));
        posSetting.display.menu.clientLeft = leftPosition + inPositionPaddingLeftWidth + inPositionPaddingLeftBorderWidth + Number(posSetting.size.margin.left) + Number(posSetting.size.padding.left);
    }
}

function reSizingGridPlacementElem(){}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ IN LINK WITH CREATESIZE(), THE IN-POSITION SIZING FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

//use to change size of elem, in the event in link with interaction's size button in context of NONE grid displaying. parameter : 
//elemNum = elemNum (iteration of inPosition's loop)
//placement = event.clientX or Y/ widthOrHeight = "height" or "width"/ initialPlacement = initialWidth2Placement initialHeight2Placement, ect..
function NoGridSizingCalc(elemNum, placement, widthOrHeight, initialPlacement){
    //condition for size growing 
    if(placement > initialPlacement){
        elemList[elemNum].size[widthOrHeight] += (placement - initialPlacement); 
    }
    //condition for size minimised
    if(placement < initialPlacement){
        elemList[elemNum].size[widthOrHeight] -= (initialPlacement - placement);
    }
    //apply to HTML changement do in representative object
    document.getElementById(elemList[sizeIFList[elemNum][widthOrHeight].num].id.name).style[widthOrHeight] = elemList[sizeIFList[elemNum][widthOrHeight].num].size[widthOrHeight] + "px";
    document.getElementById("if-" + elemList[sizeIFList[elemNum][widthOrHeight].num].id.name).style[widthOrHeight] = elemList[sizeIFList[elemNum][widthOrHeight].num].size[widthOrHeight] + "px";
}

//use to change size of elem, in the event in link with interaction's size button in context of grid displaying. parameter : 
//elemNum = elemNum (iteration of inPosition's loop)
//placement = event.clientX or Y/ widthOrHeight = "height" or "width"/ rowOrColPlaces = rowsPlaces or columnsPlaces (array) / side = "top", "left", ect...
function gridSizingCalc(elemNum, widthOrHeight, placement, rowOrColPlaces, side){
    gridIFList[sizeIFList[elemNum][widthOrHeight].num].use = true;
    for(i=0; i<=rowOrColPlaces.length-1; i++){
        if(placement >= rowOrColPlaces[i]){
            elemList[elemNum].grid[side] = i+1;
        }
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ IN LINK WITH CREATEPLACEMENT(), THE IN-POSITION PLACEMENT FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
function insidePlaceMove(placementX, placementY, elemNum, elem, topElem){
    if(placementX > initialPlaceX){
        elemList[elemNum].place.left += (placementX - initialPlaceX);
    }
    if(placementX < initialPlaceX){
        elemList[elemNum].place.left -= (initialPlaceX - placementX);
    }
    initialPlaceX = placementX;

    if(placementY > initialPlaceY){
        elemList[elemNum].place.top += (placementY - initialPlaceY);
    }
    if(placementY < initialPlaceY){
        elemList[elemNum].place.top -= (initialPlaceY - placementY);
    }
    initialPlaceY = placementY;

    elem.style.top = elemList[elemNum].place.top + "px";
    topElem.style.top = elemList[elemNum].place.top + "px";
    
    elem.style.left = elemList[elemNum].place.left + "px";
    topElem.style.left = elemList[elemNum].place.left + "px";
} 
//updatePos is used in element code for creation/deletion of html/css part of the element 
function updatePos(){
    elemsContainer.innerHTML = ""
    topElemsContainer.innerHTML = "";
    if(elemList.length > 0){
        for(i=0; i<=elemList.length-1; i++){
            topElemsContainer.innerHTML += 
            "<div class='if-in-position' id='if-" + elemList[i].id.name + "'>" + 
                "<div class='size-col'></div>" + 
                    "<div class='middle-sizing'>" + 
                            "<div class='size-line'></div>" + 
                            "<div class='pos-grab'></div>" + 
                            "<div class='size-line'></div>" + 
                    "</div>" +
                "<div class='size-col'></div>" + 
            "</div>";
            elemsContainer.innerHTML += "<div class='in-position' id=" + elemList[i].id.name + "></div>";
            //color
            color(i);
            //shader
            shader(i)
            //corner
            corner(i);
            //border
            border(i);
            //box
            box(i);
            //size
            size(i);
            //place
            place(i);
        }
    }
}
//similar of updatePos but only for MaJ of the graphism of elements
function updateGraphicPos(){
    if(elemList.length > 0){
        for(i=0; i<=elemList.length-1; i++){
            //color
            color(i);
            //shader
            shader(i)
            //corner
            corner(i);
            //border
            border(i);
            //box
            box(i);
            //size
            size(i);
            //place
            place(i);
        }
    }
}

//here, each function (color, shader, ect...) update the graphism of elem, with using elemList
function color(i){
    let elem = document.getElementById(elemList[i].id.name);
    elem.style.background =  hexToRGB(elemList[i].color.hue, elemList[i].color.opacity);
}

function shader(i){
    let shader = "";
    let elem = document.getElementById(elemList[i].id.name);
    if(elemList[i].shader.length >= 2){
        for(j=0; j<= elemList[i].shader.length-1; j++){
            if(j == 0){
                if(elemIFList[i].shader.interuptor == true){
                    shader += elemList[i].shader[j].gradient + "-gradient(circle, ";
                }
                else{
                    shader += elemList[i].shader[j].gradient + "-gradient(" + elemList[i].shader[j].degree + "deg, ";
                }
                shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%, ";
            }
            else if(j == elemList[i].shader.length-1){
                shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%)";
            }
            else{
                shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%, ";
            } 
        }
        elem.style.background = shader;
    }
}

function corner(i){
    let elem = document.getElementById(elemList[i].id.name);
    elem.style.borderRadius = elemList[i].corner.topLeft + "% " + elemList[i].corner.topRight + "% " + elemList[i].corner.bottomRight + "% " + elemList[i].corner.bottomLeft + "%";

}

function border(i){
    let elem = document.getElementById(elemList[i].id.name);
    let ifElem = document.getElementById("if-" + elemList[i].id.name);
    elem.style.borderTop = hexToRGB(elemList[i].border.top.color.hue, elemList[i].border.top.color.opacity) + " " + elemList[i].border.top.style + " " + elemList[i].border.top.size + "px";
    elem.style.borderLeft = hexToRGB(elemList[i].border.left.color.hue, elemList[i].border.left.color.opacity) + " " + elemList[i].border.left.style + " " + elemList[i].border.left.size + "px";
    elem.style.borderRight = hexToRGB(elemList[i].border.right.color.hue, elemList[i].border.right.color.opacity) + " " + elemList[i].border.right.style + " " + elemList[i].border.right.size + "px";
    elem.style.borderBottom = hexToRGB(elemList[i].border.bottom.color.hue, elemList[i].border.bottom.color.opacity) + " " + elemList[i].border.bottom.style + " " + elemList[i].border.bottom.size + "px";

    ifElem.style.borderTop = "solid #ffffff00 " + elemList[i].border.top.size + "px";
    ifElem.style.borderLeft = "solid #ffffff00 " + elemList[i].border.left.size + "px";
    ifElem.style.borderRight = "solid #ffffff00 " + elemList[i].border.right.size + "px";
    ifElem.style.borderBottom = "solid #ffffff00 " + elemList[i].border.bottom.size + "px";

}

function box(i){
    let box = "";
    let elem = document.getElementById(elemList[i].id.name);
    for(j=0; j<= elemList[i].box.length-1; j++){
        let inset = ""
        if(elemList[i].box[j].inset){
            inset = "inset ";
        }
        if(j == 0){
           box += inset + elemList[i].box[j].offset.x + "px " + elemList[i].box[j].offset.y + "px " + elemList[i].box[j].radius.blur + "px " + elemList[i].box[j].radius.spread + "px " + hexToRGB(elemList[i].box[j].color.hue, elemList[i].box[j].color.opacity);
        }
        else{
            box += ", " + inset + elemList[i].box[j].offset.x + "px " + elemList[i].box[j].offset.y + "px " + elemList[i].box[j].radius.blur + "px " + elemList[i].box[j].radius.spread + "px " + hexToRGB(elemList[i].box[j].color.hue, elemList[i].box[j].color.opacity);
        }
    }
    elem.style.boxShadow = box;
}

function size(i){
    let elem = document.getElementById(elemList[i].id.name);
    let ifElem = document.getElementById("if-" + elemList[i].id.name);

    if((posSetting.display.display == undefined)||(posSetting.display.display != "grid")){
        elem.style.width = elemList[i].size.width + "px";
        elem.style.height = elemList[i].size.height + "px";
        elem.style.removeProperty("grid-area");
    
        ifElem.style.width = elemList[i].size.width + "px";
        ifElem.style.height = elemList[i].size.height + "px";
        ifElem.style.removeProperty("grid-area");
    }
    else{
        elem.style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
        elem.style.width = "auto";
        elem.style.height = "auto";
    
        ifElem.style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
        ifElem.style.width = "auto";
        ifElem.style.height = "auto";
    }

}

function place(i){

        let elem = document.getElementById(elemList[i].id.name);
        let ifElem = document.getElementById("if-" + elemList[i].id.name);
    
        elem.style.top = elemList[i].place.top + "px";
        ifElem.style.top = elemList[i].place.top + "px";
    
        elem.style.left = elemList[i].place.left + "px";
        ifElem.style.left = elemList[i].place.left + "px";

        elem.style.position = posSetting.free.position;
        ifElem.style.position = posSetting.free.position;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POSITION-VISIBILITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//few function for activate/disable position menu visibility
//
//
function posIsVisibleOrNot(){
    position.addEventListener("mouseover", function(){
        posToolTitle.style.transition = null;
        posMenu.style.transition = null;
        posMenuContent.style.transition = null;
        posOpener.style.transition = null;
        openClosePosArrow.style.transition = null;
        mouseIsOnPos = true;

        position.removeAttribute("invisible");
    })
    position.addEventListener("mouseleave", function(){
        mouseIsOnPos = false;
        position.setAttribute("invisible", "");
        let closing = window.setTimeout(closePosMenuWhenMouseLeave, 1500);

    })
}

function closePosMenuWhenMouseLeave(){
    if(mouseIsOnPos == false){
        posToolTitle.removeAttribute("active");
        posMenu.removeAttribute("active");
        posMenuContent.setAttribute("inactive", "");

        posToolTitle.style.transition = "all 0s";
        posMenu.style.transition = "all 0s";
        posMenuContent.style.transition = "all 0s";
        posOpener.style.transition = "all 0s";
        openClosePosArrow.style.transition = "all 0s";
        posToolOpen = false;
    }

}

posIsVisibleOrNot();

//few function for position menu placement and moving
//
//
positionMove.addEventListener("mousedown", function(event){
    posMousePlace = event.target.getBoundingClientRect();
    posInitPlaceX =  event.pageX - (posMousePlace.left + (event.pageX - event.clientX));
    posInitPlaceY =  event.pageY - (posMousePlace.top + (event.pageY - event.clientY));
    posPlaceActive = true;

    position.setAttribute("active","");
})
//Event for beginning the element-window moving,
positionMove.addEventListener("mouseup", function(event){
    posPlaceActive = false;
    position.removeAttribute("active");
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(posPlaceActive == true){
        body.removeAttribute("active");
        position.removeAttribute("active");
        posPlaceActive = false;
    }
    inPositionPlacement();
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(posPlaceActive == true){
        position.style.top = Math.round(event.pageY - posInitPlaceY) + "px";
        position.style.left = Math.round(event.pageX - posInitPlaceX) + "px";

        topPosition = Math.round(event.pageY - posInitPlaceY);
        leftPosition = Math.round(event.pageX - posInitPlaceX);
    }
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POSITION-MENU~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//Event for give specific attribut to the opener and the tool title 
//in function of there opening and closing 
posOpener.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posToolTitle.setAttribute("active", ""); 
        posMenu.setAttribute("active", ""); 
        posMenuContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posToolTitle.removeAttribute("active");
        posMenu.removeAttribute("active");
        let inativeposMenuContent = window.setTimeout(inativationContent, 300);
    }
})
//exclusively use in the Event just before 
//for give specific attribut for few ms to the position menu content
function inativationContent(){
    posMenuContent.setAttribute("inactive", "");
}

//use in posSize part of the menu to calculate all the width size of the container
function calcWidth(){
    console.log(Number(posSize.width) + " "+ Number(posSize.margin.left) + " "+ Number(posSize.margin.right) + " "+ Number(posSize.padding.left) + " "+ Number(posSize.padding.right));
    allWidthSize = Number(posSize.width) + Number(posSize.margin.left) + Number(posSize.margin.right) + Number(posSize.padding.left) + Number(posSize.padding.right);
    return allWidthSize;
}
function calcHeight(){
    allHeightSize = Number(posSize.height) + Number(posSize.margin.top) + Number(posSize.margin.bottom) + Number(posSize.padding.top) + Number(posSize.padding.bottom);
    return allHeightSize;
}

//function to change the begin of the position menu to an specific part of it
//this function is call each time we enter in the begin of the menu and be call in function of all part of the menu
//this function call data content the HTML of the other part of the menu to rewrite the content of the position menu
function baseMenu(){
    //assign the HTML btn for other part of the menu each time, avoid "undefined", that why this variable are declar in global scope
    basicSelect = document.getElementById("basic-pos-select");
    flexSelect = document.getElementById("flex-pos-select");
    gridSelect = document.getElementById("grid-pos-select");

    freeSelect = document.getElementById("free-pos-select");
    sizeSelect = document.getElementById("size-pos-select");

    //here after deselection of all btn
    //this function define the way to select new html for the content of the menu delete the actual
    //and define global style for each html selected (under menu)
    function posSelection(posSelect){
        if (selectPos != posSelect.getAttribute("pos")){

            basicSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            //the line just after is to get the exact name of the futur html file load after
            //use an attribute in the btn associate to do that
            selectPos = posSelect.getAttribute("pos");
        }
        //here the specific code to delete old html and select and add new html
        posMenu.removeAttribute("base");
        posMenu.innerHTML = "";
        posMenu.setAttribute(selectPos, "");
        fetch('data/position/' + selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            //here trigger the function contain all specific rules of each under-menu
            switch(selectPos){
                case "basic" : whenBasicIsSelect(); break;
                case "flex" : whenFlexIsSelect(); break;
                case "grid" : whenGridIsSelect(); break;

                case "free" : whenFreeIsSelect(); break;
                case "size" : whenSizeIsSelect();break;
            }
        })
    }
    //here event use last function posSelection to access to each under menu
    basicSelect.addEventListener("mousedown", function(){posSelection(basicSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    sizeSelect.addEventListener("mousedown", function(){posSelection(sizeSelect);});
}

baseMenu();

//for all under menu, there are a event associate to the btn to go back to the base menu
function goToInitialMenu(posMenuSectionName){
    goBackMenu = document.getElementById("go-before");
    goBackMenu.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute(posMenuSectionName);
        fetch('data/position/base.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            baseMenu();
            selectAttributeIfItsDisplay();
            underElemsContainer.removeAttribute("active");
        })
    })
}

//to put in state of selection btn link of the display of the object of display 
function selectAttributeIfItsDisplay(){
    switch(posSetting.display.display){
        case "block" : basicSelect.setAttribute("selected", ""); break;
        case "inline" : basicSelect.setAttribute("selected", ""); break;
        case "block-inline" : basicSelect.setAttribute("selected", ""); break;
        case "flex" : flexSelect.setAttribute("selected", ""); break;
        case "grid" : gridSelect.setAttribute("selected", ""); break;
    }
}

function whenBasicIsSelect(){

    //JS representation of the btns of selection of basic display
    let block = document.getElementById("block");
    let inline = document.getElementById("inline");
    let blockInline = document.getElementById("block-inline");

    //init the basic menu in function of selected display in the display object
    function initBasicMenu(){

        reInitContainerStyle();

        block.removeAttribute("selected");
        inline.removeAttribute("selected");
        blockInline.removeAttribute("selected");

        switch(posSetting.display.display){
            case "block" : block.setAttribute("selected", ""); break;
            case "inline" : inline.setAttribute("selected", ""); break;
            case "block-inline" : blockInline.setAttribute("selected", ""); break;
            default : block.setAttribute("selected", "");
            posSetting.display = {  display : "block"  }; break;
        }

        elemsContainer.style.display = posSetting.display.display;
        topElemsContainer.style.display = posSetting.display.display;
        for(i=0; i<=elemList.length-1; i++){
            size(i);
        }
    }

    //Event in link of each display btn
    function basicDisplaySelection(){
        block.addEventListener("click", function(){
            AddAttributeAndDisplayValue(inline, blockInline, block, "block");
        })
        inline.addEventListener("click", function(){
            AddAttributeAndDisplayValue(block, blockInline, inline, "inline");
        })
        blockInline.addEventListener("click", function(){
            AddAttributeAndDisplayValue(block, inline, blockInline, "inline-block");
        })
    }
    //use in the event above to add/remove graphic attribut for the selected display, and change the display object with his new attribute. PARAMETER :
    // btn1, btn2 : btn unselected // btnSelected : the btn of the selected display // displayVal :the new value of the displayObjct
    function AddAttributeAndDisplayValue(btn1, btn2, btnSelect, displayVal){
        btn1.removeAttribute("selected");
        btn2.removeAttribute("selected");   
        btnSelect.setAttribute("selected", "");
        posSetting.display = {  display : displayVal  };
        elemsContainer.style.display = posSetting.display.display;
        topElemsContainer.style.display = posSetting.display.display;
        changePosIFDisplay();
    }

    //use of all fonction create before for a operationnal basic menu   
    initBasicMenu()
    basicDisplaySelection();
    goToInitialMenu(selectPos);
}

function whenFlexIsSelect(){
    //elements interaction of flexDirection selection, and boolean to set them
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    let flexXY = true;
    let reverseInteruptor = document.getElementById("flex-reverse");
    let reverseInteruptorImg = document.querySelector("#flex-reverse img");
    let reverseActivator = false;

    //elements interaction of flexWrap    
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");
    let reverseWarpImg = document.querySelector("#envelop-reverse img");
    let warpReverseActivator = false;

    //elements interaction of justify-content
    let selectFlexAxe1 = document.getElementById("first-axe-interuptor");
    let interuptorFlexStartEnd1 = document.getElementById("first-axe-under-interuptor");
    let flexStartEnd1 = "middle";
    let between1 = document.getElementById("between-1");
    let around1 = document.getElementById("around-1");

    //elements interaction of align-items
    let selectFlexAxe2 = document.getElementById("second-axe-interuptor");
    let interuptorFlexStartEnd2 = document.getElementById("second-axe-under-interuptor");
    let flexStartEnd2 = "middle";
    let between2 = document.getElementById("between-2");
    let around2 = document.getElementById("around-2");

    //elements interaction of align-content
    let flexStartEndElem = "middle";

    //set visual state of elements interaction in function of the state of the posSetting.display value (in the "if" part)
    //or creation of a posSetting.display.flex object (in the "else" part)
    function initFlexDisplay(){
        if(posSetting.display.display == "flex"){
            if(posSetting.display.flexDirection == "column"){
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");
            }
            if(posSetting.display.directionReverse == true){
                reverseInteruptor.setAttribute("selected", "");
                reverseInteruptorImg.setAttribute("active", "");
                reverseActivator = true;
            }
            
            if(posSetting.display.wrap == "nowrap"){
                wrap.removeAttribute("selected");
                noWrap.setAttribute("selected", "");
                posSetting.display.wrap = "nowrap";
                posSetting.display.wrapReverse = false;
                reverseWarp.removeAttribute("active");
            }
            if(posSetting.display.wrapReverse == true){
                reverseWarp.setAttribute("selected", "");
                reverseWarpImg.setAttribute("active", "");
                warpReverseActivator = true;
            }

            initFlexAxesSelectors(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");
            initFlexAxesSelectors(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItems");            
        }
        else{
            reInitContainerStyle();
            posSetting.display = {
                display : "flex",
                flexDirection : "row",
                directionReverse : false,
                wrap : "wrap",
                wrapReverse : false,
                justifyContent : "center",
                alignItems : "center",
                alignContent : "center"
            }
            elemsContainer.style.display = posSetting.display.display;
            elemsContainer.style.flexDirection = posSetting.display.flexDirection;
            elemsContainer.style.flexWrap = posSetting.display.wrap;
            elemsContainer.style.justifyContent = posSetting.display.justifyContent;
            elemsContainer.style.alignItems = posSetting.display.alignItems;
            elemsContainer.style.alignContent = posSetting.display.alignContent;

            topElemsContainer.style.display = posSetting.display.display;
            topElemsContainer.style.display = posSetting.display.display;
            topElemsContainer.style.flexDirection = posSetting.display.flexDirection;
            topElemsContainer.style.flexWrap = posSetting.display.wrap;
            topElemsContainer.style.justifyContent = posSetting.display.justifyContent;
            topElemsContainer.style.alignItems = posSetting.display.alignItems;
            topElemsContainer.style.alignContent = posSetting.display.alignContent;
            changePosIFDisplay();
        }
        for(i=0; i<=elemList.length-1; i++){
            size(i);
        }
    }
    //use exclusively in the initFlexDisplay (function just before) to set all the axis part of the flex menu (justifyContent, alignItem, AlignContent)
    function initFlexAxesSelectors(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        if(posSetting.display[displayFlexVal] == "flex-start"){
            underInteruptor.removeAttribute("middle");
            interuptorValRpz = "start";
            console.log(interuptorValRpz);
        }
        else if(posSetting.display[displayFlexVal] == "flex-end"){
            underInteruptor.removeAttribute("middle");
            underInteruptor.setAttribute("end","");
            interuptorValRpz = "end";
            console.log(interuptorValRpz);
        }
        else if(posSetting.display[displayFlexVal] == "space-between"){
            between.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
        else if(posSetting.display[displayFlexVal] == "space-around"){
            around.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
        giveValAgain(interuptor, interuptorValRpz);
    }

    //Events for interaction element of the flex direction (flex direction and flexReverse)
    //and, in there rules to set flexDirection object and visual value of the interaction element
    function flexDirection(){
        selectFlexXY.addEventListener('click', function(){
            if(flexXY == false){
                interuptorFlexRowColumn.setAttribute("active","");
                flexXY = true;
                posSetting.display.flexDirection = "row";
                interuptorFlexStartEnd2.setAttribute("column", "");
                interuptorFlexStartEnd1.removeAttribute("column");
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
                topElemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
            else{
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                posSetting.display.flexDirection = "column";
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
                topElemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
        })
        reverseInteruptor.addEventListener("click", function(){
            if(reverseActivator == false){
                posSetting.display.directionReverse = true;
                reverseActivator = true;
                elemsContainer.style.flexDirection = posSetting.display.flexDirection + "-reverse";
                topElemsContainer.style.flexDirection = posSetting.display.flexDirection + "-reverse";
            }
            else{
                posSetting.display.directionReverse = false;
                reverseActivator = false;
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
                topElemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
        })
    }

    //Events for interaction element of the flexWrap (flexWrap and flexWrapReverse)
    //and, in there rules to set flexWrap object and visual value of the interaction element
    function flexEnvelop(){
        noWrap.addEventListener("click", function(){
            wrap.removeAttribute("selected");
            noWrap.setAttribute("selected", "");
            posSetting.display.wrap = "nowrap";
            posSetting.display.wrapReverse = false;
            warpReverseActivator = false;
            reverseWarp.removeAttribute("active");
            elemsContainer.style.flexWrap = posSetting.display.wrap;
            topElemsContainer.style.flexWrap = posSetting.display.wrap;
        })
        wrap.addEventListener("click", function(){
            noWrap.removeAttribute("selected");
            wrap.setAttribute("selected", "");
            posSetting.display.wrap = "wrap";
            reverseWarp.setAttribute("active", "");
            elemsContainer.style.flexWrap = posSetting.display.wrap;
            topElemsContainer.style.flexWrap = posSetting.display.wrap;
        })
        reverseWarp.addEventListener("click", function(){ 
                if(warpReverseActivator == false){
                    posSetting.display.wrapReverse = true;
                    posSetting.display.wrap = "wrap";
                    warpReverseActivator = true;
                    reverseWarp.setAttribute("active", "");
                    noWrap.removeAttribute("selected");
                    wrap.setAttribute("selected", "");
                    elemsContainer.style.flexWrap = posSetting.display.wrap + "-reverse";
                    topElemsContainer.style.flexWrap = posSetting.display.wrap + "-reverse";
                }
                else{
                    posSetting.display.wrapReverse = false;
                    warpReverseActivator = false;
                    elemsContainer.style.flexWrap = posSetting.display.wrap;
                    topElemsContainer.style.flexWrap = posSetting.display.wrap;
                }
        })
    }

    //Events for interaction element of the  (justifyContent, alignItem, AlignContent)
    //and, in there rules to set flex Axis object and visual value of the interaction element
    function flexAxesInteruptorBtn(){

        selectFlexAxe1.addEventListener('click', function(){
            flexAxesSelectorsEvent(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");

        })
        around1.addEventListener('click', function(){
            aroundBetweenBtnEvent(around1, between1, selectFlexAxe1, "justifyContent", "space-around");
        })
        between1.addEventListener('click', function(){
            aroundBetweenBtnEvent(between1, around1, selectFlexAxe1, "justifyContent", "space-between");
        })


        selectFlexAxe2.addEventListener('click', function(){
            if(posSetting.display.wrap == "wrap"){
                flexAxesSelectorsEvent(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignContent");

            }
            else{
                flexAxesSelectorsEvent(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItems");

            }
        })
        around2.addEventListener('click', function(){
            if(posSetting.display.wrap == "wrap"){
                aroundBetweenBtnEvent(around2, between2, selectFlexAxe2, "alignContent", "space-around");
            }
            else{
                aroundBetweenBtnEvent(around2, between2, selectFlexAxe2, "alignItems", "space-around");
            }
        })
        between2.addEventListener('click', function(){
            if(posSetting.display.wrap == "wrap"){
                aroundBetweenBtnEvent(between2, around2, selectFlexAxe2 , "alignContent", "space-between");
            }
            else{
                aroundBetweenBtnEvent(between2, around2, selectFlexAxe2, "alignItems", "space-between");
            }
        })
    }


    //because each element interaction for axis selection work in a same way, a function to set them with less writing code. PARAMETER :
    //interuptor = the JS representation of the HTML interuptor.
    //underInteruptor = the inside part of the interuptor, represent visually the selection of start/middle/end
    //around/between = represent the JS representation of the around and between btn
    //displayFlexVal = represente the posSetting.display["justifyContent"/"alignItem"/"alignContent"]
    function flexAxesSelectorsEvent(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        console.log(interuptorValRpz);
        around.removeAttribute("selected");
        between.removeAttribute("selected");
        if(interuptor.hasAttribute("active")){
            if(interuptorValRpz == "start"){
                console.log("test1");
                underInteruptor.setAttribute("middle","");
                posSetting.display[displayFlexVal] = "center";
                interuptorValRpz = "middle";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];   
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];     
            }
            else if(interuptorValRpz == "middle"){
                console.log("test2");
                underInteruptor.removeAttribute("middle");
                underInteruptor.setAttribute("end","");
                posSetting.display[displayFlexVal] = "flex-end";
                interuptorValRpz = "end";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
            }
            else if(interuptorValRpz == "end"){
                console.log("test3");
                underInteruptor.removeAttribute("end");
                posSetting.display[displayFlexVal] = "flex-start";
                interuptorValRpz = "start";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
            }
        giveValAgain(interuptor, interuptorValRpz);
        }
        else{
            interuptor.setAttribute("active","");
            if(interuptorValRpz == "start"){
                posSetting.display[displayFlexVal] = "flex-start";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];

            }
            else if(interuptorValRpz == "middle"){
                posSetting.display[displayFlexVal] = "center";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];

            }
            else if(interuptorValRpz == "end"){
                posSetting.display[displayFlexVal] = "flex-end";
                elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];

            }
        }
    }

    function giveValAgain(interuptor, interuptorValRpz){
        if (interuptor.getAttribute("id") == "first-axe-interuptor"){
            flexStartEnd1 = interuptorValRpz;
        }
        else if (interuptor.getAttribute("id") == "second-axe-interuptor"){
            flexStartEnd2 = interuptorValRpz;
        }
        else{
            flexStartEndElem = interuptorValRpz;
        }
    }

    //Event of btn around and between. PARAMETER : (if same name in the parameter of last function, same possibility of value)
    //btn1, btn2 = around or between btn in function of the event create
    //spacingValue = "space-around" or "space-between"
    function aroundBetweenBtnEvent(btn1, btn2, interuptor, displayFlexVal, spacingValue){
        btn1.setAttribute("selected", "");
        btn2.removeAttribute("selected");
        interuptor.removeAttribute("active");
        posSetting.display[displayFlexVal] = spacingValue;
        elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
        topElemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
    }

    //use to put a visual feelback when user click on a reverse btn
    function reverseBtnAnim(reverseBtn, reverseBtnImg, reverseActivator){
            reverseBtn.addEventListener("click", function(){
                if(reverseBtn.hasAttribute("active")){
                    if(reverseActivator == false){
                        reverseBtnImg.setAttribute("active", "");
                        reverseBtn.setAttribute("selected", "");
                        reverseActivator = true;
                    }
                    else{
                        reverseBtnImg.removeAttribute("active");
                        reverseBtn .removeAttribute("selected");
                        reverseActivator = false;
                    }
                }
            })     
    }

    //use of all fonction create before for a operationnal free menu   
    initFlexDisplay();
    reverseBtnAnim(reverseInteruptor, reverseInteruptorImg, reverseActivator);
    reverseBtnAnim(reverseWarp, reverseWarpImg, warpReverseActivator);
    flexDirection();
    flexEnvelop();
    flexAxesInteruptorBtn();
    goToInitialMenu(selectPos);
}
function whenGridIsSelect(){
    //element interaction of the number of lines or column in a grid display 
    let btnColumn = document.getElementById("num-column");
    let btnLine = document.getElementById("num-line");
    let numRange = document.getElementById("num-range");

    //element interaction of the size of the marges of lines or column in a grid display 
    let margeRange = document.getElementById("marge-range");

    //element interaction of the size of each lines or column in a grid display 
    let gridSizeSelect = document.getElementById("size-select")
    let sizeRange = document.getElementById("size-range");

    //to init the grid menu and its selectio in function of object of grid value
    function initGridDisplay(){
        underElemsContainer.setAttribute("active","");
        if(posSetting.display.menu != undefined){
            if(posSetting.display.display == "grid"){
                initNumAndColumn("num", btnColumn, btnLine, numRange, "columns", "lines");
                initNumAndColumn("marge", btnColumn, btnLine, margeRange, "margeColumns", "margeLines");
                if(posSetting.display.menu.size == "line"){
                    gridSelectModif("lines");
                } 
                else{
                    gridSelectModif("columns");
                }
            }
        }
        else{
            reInitContainerStyle();
            posSetting.display = {
                display : "grid",
                columns : 4, 
                lines : 4, 
                margeColumns : 0, 
                margeLines : 0,
                size : {
                    column : {  default : 15  },
                    line :   {  default : 15  }
                },
                menu : {
                    num : "column",
                    marge : "column",
                    size: "column",
                    sizeSelect : 1,
                    top : [0,37.5,75,112.5,150],
                    left : [0, 62.5, 125, 187.5, 250],
                    clientTop : 126,
                    clientLeft : 73
                } 
            }
            topElemsContainer.style.display = posSetting.display.display;
            elemsContainer.style.display = posSetting.display.display;
            underElemsContainer.style.display = posSetting.display.display;

            addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Columns", "column", posSetting.display.columns);
            addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Rows", "line", posSetting.display.lines);

            addGridCel(posSetting.display.columns, posSetting.display.lines, underElemsContainer);
            changePosIFDisplay();
        }
        calcGrid();
    }
    //init num and marge section of the grid menu is relatively similar, so a function to reduce code. PARAMETER : 
    //menu = menu "num" or "marge" //column, line, range = selection element of the part of the grid menu (ex : margeColumn)
    //displayColumn, displayLine to give to the range the actual value of the column or the line
    function initNumAndColumn(menu, column, line, range, displayColumn, displayLine){
        if(posSetting.display.menu[menu] == "column"){
            range.value = posSetting.display[displayColumn];
        }
        else{
            column.removeAttribute("selected");
            line.setAttribute("selected", "");
            range.value = posSetting.display[displayLine];
        }
    }

    //event to remove/add select attribut to the btn column/line num, and the range , change value of the num of column and line
    function gridNum(){
        btnColumn.addEventListener("click", function(){
            chgtRangeAndMenu(btnLine, btnColumn, numRange, "columns", "num", "column");
            gridSelectModif("columns");
        })
        btnLine.addEventListener("click", function(){
            chgtRangeAndMenu(btnColumn, btnLine, numRange, "lines", "num", "line");
            gridSelectModif("lines");
        })
        numRange.addEventListener("input", function(){
            if(btnColumn.hasAttribute("selected")){
                const num = posSetting.display.columns;
                posSetting.display.columns = numRange.value;
                if((posSetting.display.size.column[num])&&(Number(num)>posSetting.display.columns)){
                    delete posSetting.display.size.column[num];
                }
                addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Columns", "column", posSetting.display.columns);
                addGridCel(posSetting.display.columns, posSetting.display.lines, underElemsContainer);
                gridSelectModif("columns");
            }
            else{
                const num = posSetting.display.lines;
                posSetting.display.lines = numRange.value;
                if((posSetting.display.size.line[num])&&(Number(num)>posSetting.display.lines)){
                    delete posSetting.display.size.line[num];
                }
                posSetting.display.lines = numRange.value;
                addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Rows", "line", posSetting.display.lines);
                addGridCel(posSetting.display.columns, posSetting.display.lines, underElemsContainer);
                gridSelectModif("lines");
            }
            calcGrid();
        })
    }
    //event to remove/add select attribut to the btn column/line marge, and the range, change value of the marge of column and line
    function gridMarge(){
        btnColumn.addEventListener("click", function(){
            chgtRangeAndMenu(btnLine, btnColumn, margeRange, "margeColumns", "marge", "column");
        })
        btnLine.addEventListener("click", function(){
            chgtRangeAndMenu(btnColumn, btnLine, margeRange, "margeLines", "marge", "line");
        })
        margeRange.addEventListener("input", function(){
            if(btnColumn.hasAttribute("selected")){
                posSetting.display.margeColumns = margeRange.value;
                addGridGap(elemsContainer, underElemsContainer, topElemsContainer, "Column", posSetting.display.margeColumns);

            }
            else{
                posSetting.display.margeLines = margeRange.value;
                addGridGap(elemsContainer, underElemsContainer, topElemsContainer, "Row", posSetting.display.margeLines);
            }
            calcGrid();
        })
    }
    //event to remove/add select attribut to the btn column/line size, and the range, change value of the size of column and line
    function gridSize(){
        btnColumn.addEventListener("click", function(){
            //columnOrLineSelect(sizeLine, sizeColumn);
            gridSelectModif("columns");
            chgtSizeRange();
            posSetting.display.menu.size = "column";
        })
        btnLine.addEventListener("click", function(){
            //columnOrLineSelect(sizeColumn, sizeLine);
            gridSelectModif("lines");
            chgtSizeRange();
            posSetting.display.menu.size = "line";
        })
        sizeRange.addEventListener("input",function(){
            let sizeSelected = sizeRange.value;
            if(btnColumn.hasAttribute("selected")){
                let columnSelected = 1 + (gridSizeSelect.selectedIndex);
                posSetting.display.size.column[columnSelected] = sizeSelected;
                addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Columns", "column", posSetting.display.columns);
            }
            else{
                let lineSelected = 1 + (gridSizeSelect.selectedIndex);
                posSetting.display.size.line[lineSelected] = sizeSelected;
                addGridColLine(elemsContainer, underElemsContainer, topElemsContainer, "Rows", "line", posSetting.display.lines);
            }
            calcGrid();
        })
        gridSizeSelect.addEventListener("change", function(){
            chgtSizeRange(); 
        })
        calcGrid();
    }
    //in link with the size part of the menu. allow to add or remove option in the select element in function of the number of column or line
    function gridSelectModif(columnOrLine){
        gridSizeSelect.innerHTML = "";
        for(i=1; i<=posSetting.display[columnOrLine]; i++){
            let opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = i;
            gridSizeSelect.appendChild(opt);
        }
    }

    //use in gridSelectModif and gridSize, to add and remove select graphic attribut to btn if user select "column" or "line" btn
    function columnOrLineSelect(axisBtnRemove, axisBtnSet){
        axisBtnRemove.removeAttribute("selected");
        axisBtnSet.setAttribute("selected", "");
    };
    //une in gridNum and gridMarge, in their part of remove/set select graphic attribut of btn, change value of range in function of btn line/column select
    //use columnOrLineSelect too. PARAMETER : 
    //axisBtnRemove, axisBtnSet, range = represent part of interaction element of the part of menu (ex : margeColumn)
    //axisObject = "columns" or "lines", represent the part of the display object of the selected axis
    //menuPart = "num" or "marge" selection in the menu representation object/ lineOrColumn represente the value of the menu object (column, or line)
    function chgtRangeAndMenu(axisBtnRemove, axisBtnSet, range, axisObject, menuPart, lineOrColumn){
        columnOrLineSelect(axisBtnRemove, axisBtnSet);
        range.value = posSetting.display[axisObject];
        posSetting.display.menu[menuPart] = lineOrColumn;
    }

    //change the value of the size range in function of the column or the line selected in the select element and his option (ex line 3)
    function chgtSizeRange(){
        let selectedOption = 1 + (gridSizeSelect.selectedIndex);
        gridSizeSelectSetting = gridSizeSelect.selectedIndex;
        if(btnColumn.hasAttribute("selected")){
            chgtSizeColumnLine("column", selectedOption);
        }
        else{
            chgtSizeColumnLine("line", selectedOption);
        }
    }
    //for less code, function for avoid repeating code in chgtSizeRange()
    function chgtSizeColumnLine(columnOrLine, selectedOption){
        if(posSetting.display.size[columnOrLine][selectedOption] != undefined){
            sizeRange.value = posSetting.display.size[columnOrLine][selectedOption];
        }
        else{
            sizeRange.value = 15;
        }
    }

    //use of all fonction create before for a operationnal free menu
    initGridDisplay();
    gridNum();
    gridMarge();
    gridSize();
    goToInitialMenu(selectPos);
}
function whenFreeIsSelect(){
    //element interaction of position selection value 
    let noFree = document.getElementById("no-free-btn");
    let relative = document.getElementById("relative-btn");
    let absolute = document.getElementById("absolute-btn");

    //element interaction of z-index value
    let zIndex = document.getElementById("z-index-input");
    let zIndexMore = document.getElementById("z-index-more");
    let zIndexLess = document.getElementById("z-index-less");

    //element interaction of the overflow value
    //interuptor for select the axe of the overflow
    let interuptorOF = document.getElementById("interuptor");
    let underInteruptorOF = document.getElementById("under-interuptor");
    //three button for select intrinsec value of overflow axis
    let visibleOF = document.getElementById("visible-btn-OF");
    let hiddenOF = document.getElementById("hidden-btn-OF");
    let scrollOF = document.getElementById("scroll-btn-OF");

    //to init the free menu and its selection element in function of object of free value
    function initFree(){
        if(posSetting.free.position == "relative"){
            removeAndSetAttribute(noFree, absolute, relative);
        }
        else if(posSetting.free.position == "absolute"){
            removeAndSetAttribute(noFree, relative, absolute);
        }
        zIndex.value = posSetting.free.zIndex;

        if(posSetting.free.overflow.interuptor == "x"){
            underInteruptorOF.removeAttribute("middle");
            underInteruptorOF.setAttribute("end","");
            overflowChgt("x");
        }
        else if(posSetting.free.overflow.interuptor == "y"){
            underInteruptorOF.removeAttribute("middle");
            overflowChgt("y");
        }
        else{
            overflowChgt("xy")
        }
    
        positionOfChildOfContainer();
        elemsContainer.style.zIndex = posSetting.free.zIndex;

    }

    //contain all event in link with element interaction of position selection value
    function freePositionSelection(){
        noFree.addEventListener("click", function(){
            removeAndSetAttribute(relative, absolute, noFree);
            posSetting.free.position = "initial";
            positionOfChildOfContainer()
        })
        relative.addEventListener("click", function(){
            removeAndSetAttribute(noFree, absolute, relative);
            posSetting.free.position = "relative";
            positionOfChildOfContainer()
        })
        absolute.addEventListener("click", function(){
            removeAndSetAttribute(noFree, relative, absolute);
            posSetting.free.position = "absolute";
            positionOfChildOfContainer()
        })
    }
    //contain all event in link with element interaction of Z-index selection value
    function zIndexAssignValue(){
        zIndexMore.addEventListener("click", function(){
            if(posSetting.free.zIndex <= 49){
                posSetting.free.zIndex ++;
                zIndex.value = posSetting.free.zIndex;
                elemsContainer.style.zIndex = posSetting.free.zIndex;
            }
        })
        zIndexLess.addEventListener("click", function(){
            if(posSetting.free.zIndex >= -49){
            posSetting.free.zIndex --;
            zIndex.value = posSetting.free.zIndex;
            elemsContainer.style.zIndex = posSetting.free.zIndex;
            }
        })
        zIndex.addEventListener("input", function(e){
            if(zIndex.value > 50){
                zIndex.value = 50;
            }
            else if(zIndex.value < -50){
                zIndex.value = -50;
            }
            posSetting.free.zIndex = zIndex.value;
            elemsContainer.style.zIndex = posSetting.free.zIndex;
            setOverflow();
        })
    }

    //for change the overflow interuptor value of axis and visual
    function overflowInteruptor(){
        interuptorOF.addEventListener('click', function(){
            if(posSetting.free.overflow.interuptor == "y"){
                underInteruptorOF.setAttribute("end","");
                posSetting.free.overflow.interuptor = "x";
                overflowChgt("x");
            }
            else if(posSetting.free.overflow.interuptor == "x"){
                underInteruptorOF.removeAttribute("end");
                underInteruptorOF.setAttribute("middle","");
                posSetting.free.overflow.interuptor = "xy";
                overflowChgt("xy");
            }
            else{
                underInteruptorOF.removeAttribute("middle");
                posSetting.free.overflow.interuptor = "y";
                overflowChgt("y");
            }
        })
    }

    //Event for the btn of selection of value of overflow
    function overflowSelection(){
        visibleOF.addEventListener("click", function(){
            removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
            axeOF("visible"); 
            setOverflow();
        })
        hiddenOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
            axeOF("hidden");
            setOverflow();
        })
        scrollOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
            axeOF("scroll");
            setOverflow();
        })
    }

    //use exclusively in the function "overflowSelection" to assign value (visible/hidden/scroll)
    //select by a button in the object representing the overflow
    function axeOF(valueOF){
        switch(posSetting.free.overflow.interuptor){
            case "xy" :
                posSetting.free.overflow.x = valueOF;
                posSetting.free.overflow.y = valueOF;
                break;
            case "x" : posSetting.free.overflow.x = valueOF; break;
            case "y" : posSetting.free.overflow.y = valueOF; break;
        }
    }

    //change the visual selection of the btn of selection value of overflow (visible/hidden/scroll)
    function overflowChgt(axeSelected){
        if(axeSelected == "xy"){
            if(posSetting.free.overflow.x != posSetting.free.overflow.y){
                visibleOF.removeAttribute("selected");
                hiddenOF.removeAttribute("selected");
                scrollOF.removeAttribute("selected");
            }
            else{
                if(posSetting.free.overflow[axeSelected] == "visible"){
                    removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
                }
                else if(posSetting.free.overflow[axeSelected] == "hidden"){
                    removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
                }
                else if(posSetting.free.overflow[axeSelected] == "scroll"){
                    removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
                }
            }
        }
        else{
            if(posSetting.free.overflow[axeSelected] == "visible"){
                removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
            }
            else if(posSetting.free.overflow[axeSelected] == "hidden"){
                removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
            }
            else if(posSetting.free.overflow[axeSelected] == "scroll"){
                removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
            }
        }
    }

    //use in Position and Overflow to set and remove selected attribute from btn
    //seleted attribute is use in the css to visually mark a selected btn
    function removeAndSetAttribute(firstRemove, secondRemove, setAttribute){
        firstRemove.removeAttribute("selected");
        secondRemove.removeAttribute("selected");
        setAttribute.setAttribute("selected","");
    }

    function positionOfChildOfContainer(){
        for(i=0; i<= elemsContainer.children.length-1; i++){
            elemsContainer.children[i].style.position = posSetting.free.position;
            topElemsContainer.children[i].style.position = posSetting.free.position;
        }
    }
    function setOverflow(){
        elemsContainer.style.overflowX = posSetting.free.overflow.x;
        elemsContainer.style.overflowY = posSetting.free.overflow.y;
    }

    //use of all fonction create before for a operationnal free menu   
    initFree() 
    freePositionSelection();
    zIndexAssignValue();
    overflowInteruptor();
    overflowSelection();
    goToInitialMenu(selectPos);
}
function whenSizeIsSelect(){
    //interaction element link with selection of size (height or width)
    let widthBtn = document.getElementById("pos-menu-size-width");
    let HeightBtn = document.getElementById("pos-menu-size-height");
    let sizeRange = document.getElementById("pos-menu-size-range");

    //interaction element link with selection of margin
    let margeTB = document.getElementById("pos-marge-border-top");
    let margeLB = document.getElementById("pos-marge-border-left");
    let margeRB = document.getElementById("pos-marge-border-right");
    let margeBB = document.getElementById("pos-marge-border-bottom");

    let margeSelector = document.getElementById("pos-marge-all-border");
    let margeRange = document.getElementById("pos-menu-marge-range");

    //interaction element link with selection of padding
    let padTB = document.getElementById("pos-padding-border-top");
    let padLB = document.getElementById("pos-padding-border-left");
    let padRB = document.getElementById("pos-padding-border-right");
    let padBB = document.getElementById("pos-padding-border-bottom");

    let padSelector = document.getElementById("pos-padding-all-border");
    let padRange = document.getElementById("pos-menu-padding-range");

    //PARAMETER NAME FOR ALL THE 7 FUNCTION DECLARE AFTER  : 
    //all parameter "btn" represent the selection border element, if the name is "btnSOMETHING" the parameter taget a spécific btn 
    //margePad = object of margin OR padding content border information : "margin" or "padding"
    //border = side of the padding or margin, "top", "left" ect
    //range = the range of padding or margin : margeRange or padRange 

    //initialize the size menu, and changing the interaction element in function of value in posSetting.Size menu
    function initSize(){
        if(posSetting.size.menu.size == "width"){
            sizeRange.value = posSetting.size.width;
        }
        else{
            sizeRange.value = posSetting.size.height;
            widthBtn.removeAttribute("selected");
            HeightBtn.setAttribute("selected", "");
        }
        initSelectBorder(margeTB, margeLB, margeRB, margeBB, "margin", margeRange)
        initSelectBorder(padTB, padLB, padRB, padBB, "padding", padRange)
    }
    //with a foreach loop apply the initBorder for each border selection of a marging/padding 
    //tb,lb,rb,bb are parameter represent all borders selection of a margin/padding section 
    function initSelectBorder(tB, lB, rB, bB, margePad, range){
        let margePads = [tB, lB, rB, bB]
        let borders = ["top", "left", "right","bottom"];
        let borderCounter = 0;
            margePads.forEach((margeOrPad) => {
                let size = borders[borderCounter];
                initBorder(margePad, size, range, margeOrPad);
                borderCounter++;
            })
    }
    //for a border selection (interaction elem) select his state (true/false//selected/not selected) and apply chgt in rest of interaction element
    function initBorder(margePad, border, range, btn){
        if(posSetting.size.menu[margePad][border] == true){
            margPadTrue(btn, margePad, border);
        }
        RangeVisualChgt(margePad, range);
        margPadRangeActive(margePad, range);
    }

    //Event in link with interaction element of size selection of width or height
    function selectWidthHeight(){
        widthBtn.addEventListener("click", function(){
            HeightBtn.removeAttribute("selected");
            widthBtn.setAttribute("selected", "");
            posSetting.size.menu.size = "width";
            sizeRange.value = posSetting.size.width;
        })
        HeightBtn.addEventListener("click", function(){
            widthBtn.removeAttribute("selected");
            HeightBtn.setAttribute("selected", "");
            posSetting.size.menu.size = "height";
            sizeRange.value = posSetting.size.height;
        })

        sizeRange.addEventListener("input", function(){
            if(widthBtn.hasAttribute("selected")){
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size.width, posIFWidthMin, sizeRange, "left");
                elemsContainer.style.width = sizeRange.value + "px";
                underElemsContainer.style.width = sizeRange.value + "px";
                topElemsContainer.style.width = sizeRange.value + "px";
                posSetting.size.width = sizeRange.value;
            }
            else{
                posIFHeightCSS(calcHeight(), posIF);
                posSetting.size.height = sizeRange.value;
                elemsContainer.style.height = sizeRange.value + "px";
                underElemsContainer.style.height = sizeRange.value + "px";
                topElemsContainer.style.height = sizeRange.value + "px";
            }
            if(posSetting.display.display == "grid"){
                calcGrid();
            }
        })
    }    

    //contain all function to declare event in link with interaction element (btn, selector, input) in link with marge or padding. 
    function marginPadding(btnTB, btnLB, btnRB, btnBB, btnSelector, margePad, range){

        let btnMargePads = [btnTB, btnLB, btnRB, btnBB]
        let borders = ["top", "left", "right","bottom"];
        let borderCounter = 0;
        btnMargePads.forEach((btnMargePad) => {
            let size = borders[borderCounter];
            btnMargePad.addEventListener("mousedown", function(){
                border(margePad, size, range, this);
            })
            borderCounter++;
        });

        btnSelector.addEventListener("mousedown", function(){
            if((posSetting.size.menu[margePad].top == false)||
            (posSetting.size.menu[margePad].left == false)||
            (posSetting.size.menu[margePad].right == false)||
            (posSetting.size.menu[margePad].bottom == false)){
                margPadTrue(btnTB, margePad, "top"); margPadTrue(btnBB, margePad, "bottom");
                margPadTrue(btnRB, margePad, "right"); margPadTrue(btnLB, margePad, "left");
                range.removeAttribute("inactive");
            }
            else{
                margPadFalse(btnTB, margePad, "top"); margPadFalse(btnBB, margePad, "bottom"); 
                margPadFalse(btnRB, margePad, "right"); margPadFalse(btnLB, margePad, "left");
                range.setAttribute("inactive", "");
            }
            RangeVisualChgt(margePad, range);
        })

        range.addEventListener("input", function(){
            posIFHeightCSS(calcHeight(), posIF);
            margPadSizeAssign(margePad, "top", range, margePad + "Top");
            margPadSizeAssign(margePad, "bottom", range, margePad + "Bottom");
            margPadSizeAssign(margePad, "left", range, margePad + "Left"); 
            margPadSizeAssign(margePad, "right", range, margePad + "Right");
            inPositionPlacement();
        })
    }
    //contain function margePadTrue, and margePadFalse and active them if border selector in link is selected. PARAMETER :
    function border(margePad, border, range, btn){
        if(posSetting.size.menu[margePad][border] == false){
            margPadTrue(btn, margePad, border);
        }
        else{
            margPadFalse(btn, margePad, border);
        }
        RangeVisualChgt(margePad, range);
        margPadRangeActive(margePad, range);
    }
    //activate a selection of a borderSelection margin or padding. PARAMETER :
    function margPadTrue(btn, margePad, border){
        btn.setAttribute("selected", "");
        posSetting.size.menu[margePad][border] = true;
    }
    //inactivate a selection of a borderSelection margin or padding. PARAMETER : idem of margePadTrue
    function margPadFalse(btn, margePad, border){
        btn.removeAttribute("selected");
        posSetting.size.menu[margePad][border] = false;
    }
    //active range marge/pad if one borderSelection is actif, else inactive the range. PARAMETER :
    function margPadRangeActive(margePad, range){
        if((posSetting.size.menu[margePad].top == false)&&
        (posSetting.size.menu[margePad].left == false)&&
        (posSetting.size.menu[margePad].right == false)&&
        (posSetting.size.menu[margePad].bottom == false)){
            range.setAttribute("inactive", "");
        } 
        else{
            range.removeAttribute("inactive");
        }
    }
    //assign value of the range marge/pad of each side of the element's container if it is selected
    function margPadSizeAssign(margePad, border, range, margePadStyle){
        if(posSetting.size.menu[margePad][border] == true){
            if(border == "left"){
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size[margePad].left, posIFWidthMin, range, "left");
            }
            if(border == "right"){
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size[margePad].right, posIFWidthMin, range, "left");
            }
            posSetting.size[margePad][border] = range.value;
            elemsContainer.style[margePadStyle] = range.value + "px";
            underElemsContainer.style[margePadStyle] = range.value + "px";
            topElemsContainer.style[margePadStyle] = range.value + "px";
        }
    }
    //if each selected border of marge/pad have a same value, the range represent this value, else the range represent 0
    function RangeVisualChgt(margePad, range){
        let borders = ["top","left","right","bottom"];
        let borderSelects = [];
        borders.forEach((border) => {
            if(posSetting.size.menu[margePad][border] == true){
                borderSelects.push(posSetting.size[margePad][border]);
            }
        });
        if(borderSelects.length > 0){
            borderSelects.forEach((borderSelect) => {
                if (borderSelect == borderSelects[0]){
                    range.value = borderSelects[0];
                }
                else{
                    range.value = 0; 
                    borderSelects = [];
                }
            })
        }
        else{
            range.value = 0;
        }
    }
    
    //use of all fonction create before for a size menu operationnal
    initSize()
    marginPadding(margeTB, margeLB, margeRB, margeBB, margeSelector, "margin", margeRange);
    marginPadding(padTB, padLB, padRB, padBB, padSelector, "padding", padRange);
    selectWidthHeight()
    goToInitialMenu(selectPos);
}
let widthBtns = document.getElementsByClassName("size-col");
let heightBtns = document.getElementsByClassName("size-line");

let sizeIFList = [];
let gridIFList = [];

//use to do all thing in link with sizing and his modifications
function createSize(){
    for(l=0; l<=elemList.length-1; l++){ 
        let elemNum = l;
        //here conditions to define in sizeIfList[elem] informations relative to the size, to work with after. 
        //if the sizeIFList[elem] doesn't exist
        if(sizeIFList[elemNum] == undefined){
            sizeIFList[elemNum] = {
                existing : false,
                height : {
                    num : elemNum,
                    interuptor1 : false,
                    interuptor2 : false
                },
                width : {
                    num : elemNum,
                    interuptor1 : false,
                    interuptor2 : false
                }
            }
        }
        //if the sizeIFList[elem] already exist, just put some information in there default value
        else{
            sizeIFList[elemNum]["height"] = {
                num : elemNum,
                interuptor1 : false,
                interuptor2 : false
            }
            sizeIFList[elemNum]["width"] = {
                num : elemNum,
                interuptor1 : false,
                interuptor2 : false
            }
        }

        //here conditions to define in gridIFList[elem] informations relative to the grid displaying, to work with after. 
        //if the gridIFList[elem] doesn't exist
        if(gridIFList[elemNum] == undefined){
            gridIFList[elemNum] = {
                use : false
            }
        }
        //if the gridIFList[elem] exist but the elem in link not (delete) 
        if(sizeIFList[elemNum].existing == false){
            let initialHeight1Placement;
            let initialHeight2Placement;
            
            let initialWidth1Placement;
            let initialWidth2Placement;
        }
        
        //Event in link of interaction under-elem of each elems to sizing them. init their required value and begin the sizing process
        //there are 4, 2 for height, 2 for width
        heightBtns[(sizeIFList[elemNum].height.num*2)].addEventListener("mousedown",function(event){
            initialHeight1Placement = event.clientY; 
            sizeIFList[elemNum].height.interuptor1 = true;
        });
        heightBtns[(sizeIFList[elemNum].height.num*2)+1].addEventListener("mousedown",function(event){
            initialHeight2Placement = event.clientY; 
            sizeIFList[elemNum].height.interuptor2 = true;
        });

        widthBtns[(sizeIFList[elemNum].width.num*2)].addEventListener("mousedown",function(event){
            initialWidth1Placement = event.clientX; 
            sizeIFList[elemNum].width.interuptor1 = true; 
        });
        widthBtns[(sizeIFList[elemNum].width.num*2)+1].addEventListener("mousedown",function(event){
            initialWidth2Placement = event.clientX; 
            sizeIFList[elemNum].width.interuptor2 = true;
        });

        //part of the program doing the sizing of elem.
        //first a condition before creation of some event, to avoid that, if the elem doesn't exist
        if(sizeIFList[elemNum].existing == false){
            //event for the middle part of the sizing process, it's here where the size is modified, with a moving of the mouse
            body.addEventListener("mousemove", sizeMove);
            function sizeMove(event){
                if(elemList[elemNum] != undefined){
                    //part of sizeMove for none grid Display (flex, block)
                    if(posSetting.display.display != "grid"){
                        if(sizeIFList[elemNum].width.interuptor2 == true){
                            NoGridSizingCalc(elemNum, event.clientX, "width", initialWidth2Placement);
                            initialWidth2Placement = event.clientX;
                        }
                        if(sizeIFList[elemNum].width.interuptor1 == true){
                            NoGridSizingCalc(elemNum, event.clientX, "width", initialWidth1Placement);
                            initialWidth1Placement = event.clientX;
                        }
                        if(sizeIFList[elemNum].height.interuptor2 == true){
                            NoGridSizingCalc(elemNum, event.clientY, "height", initialHeight2Placement);
                            initialHeight2Placement = event.clientY;
                        }
                        if(sizeIFList[elemNum].height.interuptor1 == true){
                            NoGridSizingCalc(elemNum, event.clientY, "height", initialHeight1Placement);
                            initialHeight1Placement = event.clientY;
                        }
                        
                    }
                    //part of sizeMove for grid Display
                    else{
                        let rowsPlaces = [];
                        let columnsPlaces = [];

                        for(i=0; i<=posSetting.display.menu.top.length-1; i++){
                            let rowPlace = posSetting.display.menu.top[i] + posSetting.display.menu.clientTop;
                            rowsPlaces.push(rowPlace);
                        }
                        for(i=0; i<=posSetting.display.menu.left.length-1; i++){
                            let columnPlace = posSetting.display.menu.left[i] + posSetting.display.menu.clientLeft;
                            columnsPlaces.push(columnPlace);
                        }

                        if(sizeIFList[elemNum].width.interuptor2 == true){
                            gridSizingCalc(elemNum, "width", event.clientX, columnsPlaces, "right");
                        }
                        if(sizeIFList[elemNum].width.interuptor1 == true){
                            gridSizingCalc(elemNum, "width", event.clientX, columnsPlaces, "left");
                        }

                        if(sizeIFList[elemNum].height.interuptor2 == true){
                            gridSizingCalc(elemNum, "height", event.clientY, rowsPlaces, "bottom");
                        }
                        if(sizeIFList[elemNum].height.interuptor1 == true){
                            gridSizingCalc(elemNum, "height", event.clientY, rowsPlaces, "top");
                        }

                        let elem = elemList[sizeIFList[elemNum].width.num];
                        document.getElementById(elem.id.name).style.gridArea = elem.grid.top + "/" + elem.grid.left + "/" + elem.grid.bottom + "/" + elem.grid.right;
                        document.getElementById("if-" + elem.id.name).style.gridArea = elem.grid.top + "/" + elem.grid.left + "/" + elem.grid.bottom + "/" + elem.grid.right;

                    }
                }
            }
            body.addEventListener("mouseup", sizeEndMove);
            function sizeEndMove(){
                if(elemList[elemNum] != undefined){
                    if(sizeIFList[elemNum].width.interuptor1 == true){
                        sizeIFList[elemNum].width.interuptor1 = false;
                    }
                    if(sizeIFList[elemNum].width.interuptor2 == true){
                        sizeIFList[elemNum].width.interuptor2 = false;
                    }
                    if(sizeIFList[elemNum].height.interuptor1 == true){
                        sizeIFList[elemNum].height.interuptor1 = false;
                    }
                    if(sizeIFList[elemNum].height.interuptor2 == true){
                        sizeIFList[elemNum].height.interuptor2 = false;
                    }
                }
            }
            sizeIFList[elemNum].existing = true;
        }
    }
}

let grabPosBtns = document.getElementsByClassName("pos-grab");
let placeIFList = [];
let initialPlaceX, initialPlaceY;

//do all things in link with placement of elements and their modifications
function createPlacement(){
    for(l=0; l<=elemList.length-1; l++){
        
        let elemNum = l;
        let elem = document.getElementById(elemList[elemNum].id.name);
        let topElem = document.getElementById("if-" + elemList[elemNum].id.name);
        console.log(topElem);
        
        
        if(placeIFList[elemNum] == undefined){
            placeIFList[elemNum] = {
                existing : false,
                exist : false
            } 
        }

        grabPosBtns[elemNum].addEventListener("mousedown",function(event){
            placeIFList[elemNum].exist = true;
            initialPlaceX = event.clientX; 
            initialPlaceY = event.clientY;
        });
        
        body.addEventListener("mousemove", placeMove);
        function placeMove(event){
            let placementX = event.clientX;
            let placementY = event.clientY;
            if(placeIFList[elemNum].exist == true){
                if((posSetting.free.position == "relative")||(posSetting.free.position == "absolute")){
                    insidePlaceMove(placementX, placementY, elemNum, elem, topElem);
                }
            }
        }

        body.addEventListener("mouseup", placeEndMove);
        function placeEndMove(){
            if(elemList[elemNum] != undefined){
                if(placeIFList[elemNum].exist == true){
                    placeIFList[elemNum].exist = false;
                }
            }
        }
        placeIFList[elemNum].existing = true;
    }
}
