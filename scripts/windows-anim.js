//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-WINDOWS-ANIMATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~OPEN-CLOSE-GROW-DECREASE~~~~~~~~~~~~~~~~~//

//Event of more btn, for adding elementModule
moreBtn.addEventListener("click", function(){

    angle.removeAttribute("close");
    elemTool.removeAttribute("close");

    removeAllEllAttr();
    angleInteruptor = false;
    moduleCounter++;
    selectAllEllAttr();
})

//Event of open/close btn
let angleInteruptor = false;
angle.addEventListener("click", function(){

    removeAllEllAttr();

    if(angleInteruptor == false){
        angle.setAttribute("close","");
        elemTool.setAttribute("close","");
        allElem.setAttribute("close","");
        titleSeparation.setAttribute("close","");
        angleInteruptor = true;
    }
    else{
        angle.removeAttribute("close");
        elemTool.removeAttribute("close");
        allElem.removeAttribute("close");
        titleSeparation.removeAttribute("close");
        selectAllEllAttr();
        angleInteruptor = false;
    }
})

//function use in Event before
//removeAllEllAttr is a loop to remove all attribut
//selectAllEllAttr have multiple condition for all numbers of module visual transformation 
function removeAllEllAttr(){
    for(attrNum = 0; attrNum <= allElem.attributes.length-1; attrNum++){
        if(allElem.attributes[attrNum].name != "id"){
            allElem.removeAttribute(allElem.attributes[attrNum].name);
        }
    }
}
function selectAllEllAttr(){
    if(moduleCounter == 1){
        elemTool.removeAttribute("begin");
        angle.removeAttribute("begin");
        allElem.setAttribute("one","");
    }
    else if (moduleCounter == 2){
        allElem.setAttribute("two","");
    }
    else if (moduleCounter == 3){
        allElem.setAttribute("three","");
    }
    else if (moduleCounter >= 1){
        allElem.setAttribute("four","");
    }
}

//~~~~~~~~~~~~~~MOVE OF WINDOW-ELEMENT~~~~~~~~~~~~~~~~~//

//part of the top pf element-window 
let elemPlace = document.getElementById("element-placement");
//html tag content the element-tool
let elemContent = document.getElementById("move-element-tool");

//boolean : false = moving is inactivate
let elemPlaceActive = false;
let initPlaceX, initPlaceY;

//Event for beginning the element-window moving, and assign initial value of X/Y
elemPlace.addEventListener("mousedown", function(event){
    elemMousePlace = event.target.getBoundingClientRect();
    initPlaceX = event.clientX - elemMousePlace.left;
    initPlaceY = event.clientY - elemMousePlace.top;
    //body.setAttribute("active","");
    elemPlace.setAttribute("active","");
    elemPlaceActive = true;

})
//Event for beginning the element-window moving,
elemPlace.addEventListener("mouseup", function(event){
    //body.removeAttribute("active");
    elemPlace.removeAttribute("active");
    elemPlaceActive = false;
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(elemPlaceActive == true){
        //body.removeAttribute("active");
        elemPlace.removeAttribute("active");
        elemPlaceActive = false;
    }
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(elemPlaceActive == true){
        elemContent.style.left = Math.round((event.clientX - initPlaceX))+ "px";
        elemContent.style.top = Math.round((event.clientY - initPlaceY)) + "px";
    }
})