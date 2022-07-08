//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OPACITY-BTN-RANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function createOpacity(){
    //Boucle qui itere pour chaque barre d'element des objets représentant les outils d'opacité et leurs EVENTS
    //4 objets représentant les outils d'opacité (color,shader,border,box) par barre d'element
    //2 EVENTS par outils d'opacité = Event du bouton d'ouverture du range, Event du range lui même
    //et les fonction de traitement de l'opacité elle même
    for(i=0; i<=opacityHTMLButtons.length-1; i++){
        //elementNum et le while associé permettent de définir le nombre de barre d'element
        let elementNum=1;
        while(i+1>4*elementNum){
            elementNum++
        }
        //opacityNumber défini un numéro pour chaque range d'opacité
        let opacityNumber = i;
        //ajout des différentes infos (un booleen et les variables représentant le HTML) pour chaque outil d'opacité dans des objet, dans opacityButtonList
        opacityButtonList[i] =
            {
                opacityButton : opacityHTMLButtons[i],
                opacityInsideButton : opacityHTMLInsideButtons[i],
                opacityContainer : opacityHTMLRangeContainers[i],
                opacityArrow : opacityHTMLArrows[i],
                opacityRange : opacityHTMLRanges[i],
                opacityInteruptor : false
            } 

        //fonction qui gere l'ouverture et la fermeture du range d'opacité  
        opacityButtonList[opacityNumber].opacityButton.addEventListener("click", function (event){
            let btnPlace = opacityButtonList[opacityNumber].opacityButton.getBoundingClientRect();
            let elemPlace = allElement.getBoundingClientRect();
            //ouverture du range
            //suivant le module de l'outil d'opacité les transformation graphique ne sont pas exactement les même
            if (opacityButtonList[opacityNumber].opacityInteruptor == false){
                opacityButtonList[opacityNumber].opacityContainer.style.display = "block";
                opacityButtonList[opacityNumber].opacityInteruptor = true;
                opacityButtonList[opacityNumber].opacityContainer.style.top = (btnPlace.top-elemPlace.top+30) +"px";
                opacityButtonList[opacityNumber].opacityContainer.style.left = (btnPlace.left-elemPlace.left-5) + "px";
            }
            //fermeture du range
            else{
                opacityButtonList[opacityNumber].opacityContainer.style.display = "none";
                opacityButtonList[opacityNumber].opacityInteruptor = false;
            }
        });
        //fonction qui gere la valeur de l'opacité elle même et sa représentation dans le bouton d'ouverture de l'opacité
        opacityButtonList[opacityNumber].opacityRange.addEventListener("click", function(){
            let opacityValue = opacityButtonList[opacityNumber].opacityRange.value/100;
            let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
            opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        })
    }

    //fonction lié au BODY, permettant fermeture des conteneur des range d'opacité
    //quand l'utilisateur clique en dehors du HTML lié à ces derniers
    body.addEventListener("click", function(e){
        for(i=0; i<=opacityHTMLButtons.length-1; i++){
            let elementNum=1;
            while(i+1>4*elementNum){
                elementNum++
            }
            if(((e.target != opacityButtonList[i].opacityRange)&&
            (e.target != opacityButtonList[i].opacityContainer)&&
            (e.target != opacityButtonList[i].opacityArrow)&&
            (e.target != opacityButtonList[i].opacityInsideButton)&&
            (e.target != opacityButtonList[i].opacityButton))&&
            (opacityButtonList[i].opacityInteruptor == true)){
                opacityButtonList[i].opacityContainer.style.display = "none";
                opacityButtonList[i].opacityInteruptor = false;
                break;
            }
        }
    })
}
function createName(){
    for(i=0; i<= elements.length-1; i++){
        let nameNum = i;
        let idNum = 0;

        //condition et boucle qui permettent d'assigné un nom prédéfini qui n'existe pas déjà
        //par exemple si "element-3" existe déjà mais est le seul elem présent
        //cela permettra lors de la création de l'elem suivant  de s'appeler "element-1"  
        if(nameModList.length > 0){
            for(j=0; j<= elements.length-2; j++){
                if(nameModList[j].name == ("element-" + (idNum+1))){
                    idNum++;
                    j= -1;
                }
            }
            nameModList[j] = {
                name : "element-" + (idNum+1)
            }
        }
        else{
            nameModList[nameNum] = {
                name : "element-" + (nameNum+1)
            }
        }
    
        idNames[nameNum].value = nameModList[nameNum].name;

        idNames[nameNum].addEventListener("blur", function(){
            let validName = true;
            for(j = 0; j <= elemList.length-1; j++){
                if (idNames[nameNum].value == elemList[j].id.name){
                    window.alert("Element name already exist !");
                    validName = false;
                }
            }
            if(idNames[nameNum].value == ""){
                window.alert("Element name is empty !");
                validName = false;
            }
            if(validName == true){
                elem = document.getElementById(elemList[nameNum].id.name);
                ifElem = document.getElementById("if-" + elemList[nameNum].id.name);
                nameModList[nameNum].name = idNames[nameNum].value;
                elem.setAttribute("id", idNames[nameNum].value);
                ifElem.setAttribute("id", "if-" + idNames[nameNum].value)
            }
            else{
                idNames[nameNum].value = elemList[nameNum].id.name;
            }
        })
    }
}

//ici les fonction de mise a jour visuel de : l'opacité, la couleur, les ranges.
//opacité
//opacity = opacitybtn number
//val = en fonction du module, ou se trouve la valeur de l'opacité (dans un objet)
function opaVisualChgt(val, opacity){
    let opacityRepre = Math.abs(Math.trunc((val/100)*255)-255);
    opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opacityButtonList[opacity].opacityRange.value = val;
}
//color
//colorInput = la représentation HTML de l'input de couleur ex : shaderColors[shaderModNum].value 
//val = en fonction du module, ou se trouve la valeur de la couleur (dans un objet)
function colorVisualChgt(colorInput,colorVal){
    colorInput.value = colorVal.color.hue;
}
//range
//rangeInput = représentaiton html de l'input de range ex :borderRanges[borderModuleNumber].value
//val = en fonction du module, ou se trouve la valeur de la couleur (dans un objet)
function rangeVisualChgt(rangeInput, rangeVal){
    rangeInput.value = rangeVal.placement;
}

//fonction de mise a jour visuel du range du module corner en fonction des coins qui sont séléctionné
function visualChgtCorner(interuptorTL, interuptorTR, InteruptorBR, interuptorBL, topLeft, topRight, bottomRight, bottomLeft, rangeInput){
    //tableau qui contiendra a chaque itération de la fonction les valeurs des coins séléctionné pour la mise à jour visuel
    let selectedCorner = [];
    //les 4 conditions suivante permettent d'ajouté ou non les valeurs des différentes coins. 
    //(topLeft/topRight/bottomRight/bottomLeft, dans l'ordre)
    let cornerSelectedValueTest;
    if(interuptorTL == true){
        selectedCorner.push(topLeft);
    }
    if(interuptorTR == true){
        selectedCorner.push(topRight);
    }
    if(InteruptorBR == true){
        selectedCorner.push(bottomRight);
    }
    if(interuptorBL == true){
        selectedCorner.push(bottomLeft);
    }
    //boucle et condition permettant la mise a jour de l'input range d'attribution de valeur de courbure
    for(m=0; m<=selectedCorner.length-1; m++){
        //selection de la valeur de range commune aux coins séléctionné
        cornerSelectedValueTest = selectedCorner[0];
        if(selectedCorner[m] == selectedCorner[0]){
            rangeInput.value = selectedCorner[0];
        }
        //valeur de courbure représenté par défaut si pas de correspondance entre les elements sélectionné
        else{
            rangeInput.value = 0;
            break;
        }
    }
}

//visualChgtBorder :
//fonction permettant la mise à jour visuel des différents élément d'intéraction/sélection de style des bordures, en fonctions des bordures séléctionné
//4 parametre pour les boutons de coins
//4 parametre pour les valeurs qui garde les valeurs des points
//1 parametre qui représente le range selectionné
//1 parametre pour ceux de la fonction de couleur
//1 parametre pour la fonction de l'opacité
//2 parametre pour la selection du style de bordure

//si aucune bordure selectionné les valeurs par défault sont :  opacité:100, couleur:noir, rangetaille:0, style:none
function visualChgtBorder(interuptorTB, interuptorLB, interuptorRB, interuptorBB, top, left, right, bottom, range, colorInput, opacity, selectedStyle, otherStyle){
    //tableau qui contiendra a chaque itération de la fonction les objets des bordures sélectionné pour la mise a jour visuel  
    let modifiedBorder = [];
    //les 4 conditions suivante permettent d'ajouté ou non les objets des différentes bordures. (top/right/bottom/left, dans l'ordre)
    if(interuptorTB == true){
        modifiedBorder.push(top);
    }
    if(interuptorRB == true){
        modifiedBorder.push(right);
    }
    if(interuptorBB == true){
        modifiedBorder.push(bottom);
    }
    if(interuptorLB == true){
        modifiedBorder.push(left);
    }
    //boucle permettant mise a jour de l'input d'attribution de couleur
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de la couleur commune
        if(modifiedBorder[m].color.hue == modifiedBorder[0].color.hue){
            colorInput.value = modifiedBorder[0].color.hue;
        }
        //couleur représenté par défault si pas de correspondance entre les elements sélectionné
        else{
            colorInput.value = "#000000";
        }
    }
    //boucle permettant la mise a jours du range de la taille des bordures
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de la taille de bordure commune
        if(modifiedBorder[m].size == modifiedBorder[0].size){
            range.value = modifiedBorder[0].size;
        }
        //taille représenté par défault si pas de correspondance entre les bordures sélectionné
        else{
            range.value = 0;
        }
    }
    //boucle permettant la mise a jour de l'input d'opacité (la couleur du bouton, et le placement du range)
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de l'opacité de bordure commune
        if(modifiedBorder[m].color.opacity == modifiedBorder[0].color.opacity){
            opaVisualChgt(modifiedBorder[0].color.opacity, opacity)
        }
        //opacité par défault si pas de correspondance entre les bordures selectionné
        else{
            opacityButtonList[opacity].opacityRange.value = 100;
            opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "black";
        }
    }
    //boucle permettant la mise a jour de la liste de style des bordures
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection du style de bordure commun 
        if(modifiedBorder[m].style == modifiedBorder[0].style){
            selectedStyle.removeAttribute("selected");
            //boucle+condition permettant, pour chaque style de la liste de la selectionné si elle est correspondante a la 1ere bordure de la liste 
            for(n=0; n<=9; n++){
               if(otherStyle.options[n].value == modifiedBorder[0].style){
                selectedStyle = otherStyle.options[n];
                selectedStyle.setAttribute("selected", "");  
                otherStyle.value = selectedStyle.value;
               } 
            }
            selectedStyle.setAttribute("selected", "");
        }
        //style de bordure par défaut
        else{
            selectedStyle.removeAttribute("selected");
            selectedStyle = otherStyle.options[0];
            selectedStyle.setAttribute("selected", "");
            otherStyle.value = selectedStyle.value;
            break;
        }
    }
}

//fonction de changement visuel des element de selection de la box en fonction de la box du module selectionné dans la liste
//boxModValue represente la box dans la liste des box de l'objet box se trouvant dans la boxModuleList (boxModList[boxModNum][val])
//inset représente l'input checkbox représentant l'inset de la box selectionné boxInsetCheckBoxs[inputNum]
//rangeXY rpz l'input range qui gere le placement X/Y de la box selectionné boxRangeXYs[inputNum]
//idem mais pour rangeBS
//idem mais pour colorInput
function visualChgtBox(boxModValue, boxIFValue, inset, rangeXY, rangeBS, colorInput, opaVal, opacity){
    //chgt visuel de l'input checkbox inset
    if(boxModValue.inset == false){
        inset.checked = false;
    }
    else{
        inset.checked = true;
    }
    //chgt visuel des ranges XY et BS, en fonction de l'état des interupteurs associé
    if(boxIFValue.interuptorXY == false){
        rangeXY.value = boxModValue.offset.y;
    }
    else{
        rangeXY.value = boxModValue.offset.x;
    }
    if(boxIFValue.interuptorBS == false){
        rangeBS.value = boxModValue.radius.spread;
    }
    else{
        rangeBS.value = boxModValue.radius.blur;
    }
    //chgt visuel du btn de couleur
    colorInput.value = boxModValue.color.hue;
    //chgt visuel du range d'opacité et du range de selection d'opacité
    let opacityRepre = Math.abs(Math.trunc((opaVal.color.opacity/100)*255)-255);
    opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opacityButtonList[opacity].opacityRange.value = opaVal.color.opacity;
}

//tout les changement visuel en même temps
//num représente le module/element-bar selectionné
function allVisualChange(number){
    let num = number;
    //name
    idNames[num].value = nameModList[num].name;
    //color
    colors[num].value = colorModList[num].hue;
    opaVisualChgt(colorModList[num].opacity, (num*4));
    //shader
    opaVisualChgt(elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1].color.opacity, 1+(num*4))
    colorVisualChgt(shaderColors[num],elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1]);
    rangeVisualChgt(shaderRanges[num], elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1]);
    //corner
    visualChgtCorner(
        elemIFList[num].corner.CornerInteruptorTL, elemIFList[num].corner.CornerInteruptorTR, 
        elemIFList[num].corner.CornerInteruptorBR, elemIFList[num].corner.CornerInteruptorBL, 

        elemList[num].corner.topLeft, elemList[num].corner.topRight, 
        elemList[num].corner.bottomRight, elemList[num].corner.bottomLeft, 

        radiusRanges[num])
    //border
    visualChgtBorder(
        elemIFList[num].border.interuptorTB, elemIFList[num].border.interuptorLB, 
        elemIFList[num].border.interuptorRB, elemIFList[num].border.interuptorBB, 
        elemList[num].border.top, elemList[num].border.left, 
        elemList[num].border.right, elemList[num].border.bottom, 
        borderRanges[num], 
        borderColors[num], 
        2+(num*4),
        borderStyles[num].options[borderStyles[num].selectedIndex], borderStyles[num])
    //box
    visualChgtBox(
        elemList[num].box[elemIFList[num].box.boxSelectNum-1], 
        elemIFList[num].box, 
        boxInsetCheckBoxs[num], 
        boxRangeXYs[num], 
        boxRangeBSs[num], 
        boxColors[num], 
        elemList[num].box[elemIFList[num].box.boxSelectNum-1], 3+(num*4))
}

function createColor(){
    for(i=0; i<= elements.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let ColorModNum = i;
        let opaNum = (ColorModNum*4);
    
        let beforColor = Math.floor(Math.random() * 16777215).toString(16);
        let colorElem = "#" + ("000000" + beforColor).slice(-6);

        colorModList[ColorModNum] = {
            hue : colorElem,
            opacity : 100
        }
        colors[ColorModNum].addEventListener("input", function(){
            colorModList[ColorModNum].hue = colors[ColorModNum].value;
            color(ColorModNum);
        })
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
        colorModList[ColorModNum].opacity = opacityButtonList[opaNum].opacityRange.value;
        color(ColorModNum);
        })
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createBorder(){
//boucle qui contient l'ensemble des regles de l'outil de selection de bordure
for(i=0; i<= elements.length-1; i++){
    //represente le nombre de modules de border (1 pour chaque module d'element)
    let borderModNum = i;
    //permet pour chaque module de border de selectionné le range d'opacité correspondant
    let opaNum = 2+(borderModNum*4);

    borderIFList[borderModNum] = {
        //compteur permettant de selectionné grace au bouton centrale de selection des bordure 
        //une succession de selection des différentes bordures et de leurs représentation graphique. 
        borderSelectorCounter : 1,

        //4 variables représentant l'état d'activation des boutons de bordure du selecteur de bordure 
        interuptorTB : false,
        interuptorRB : false,
        interuptorLB : false,
        interuptorBB : false
    }

    //représente l'option selectionné du select de style de bordure.
    let selectedStyle = borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex];

    //objet qui contient l'ensemble des info de style de chacune des bordures.
    borderModList[borderModNum] = {
        top :{
            size : 0,
            style : "none",
            color : {
                hue : "#000000",
                opacity : 100
            }
        },
        right :{
            size : 0,
            style : "none",
            color : {
                hue : "#000000",
                opacity : 100
            }
        },
        bottom :{
            size : 0,
            style : "none",
            color : {
                hue : "#000000",
                opacity : 100
            }
        },
        left :{
            size : 0,
            style : "none",
            color : {
                hue : "#000000",
                opacity : 100
            }
        }
    }

    //visualChangeBeforeBorderModification :
    //fonction permettant la mise à jour visuel des différents élément d'intéraction/sélection de style des bordures, en fonctions des bordures séléctionné
    //si aucune bordure selectionné les valeurs par défault sont :  opacité:100, couleur:noir, rangetaille:0, style:none
    function visualChangeBeforeBorderModification(){
        visualChgtBorder(
            borderIFList[borderModNum].interuptorTB, borderIFList[borderModNum].interuptorLB, 
            borderIFList[borderModNum].interuptorRB, borderIFList[borderModNum].interuptorBB,
             
            borderModList[borderModNum].top, borderModList[borderModNum].left, 
            borderModList[borderModNum].right, borderModList[borderModNum].bottom,
            
            borderRanges[borderModNum], 
            borderColors[borderModNum], 
            opaNum, 
            selectedStyle, borderStyles[borderModNum]
            )
    }

    //suite de fonction qui s'activerons dans les différents EVENT qui leurs succede
    //elles permettent +/- l'attribut HTML correspondant a un selecteur de bordure activé ou non 
    //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des bordures
    //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
    function topBorderActivate(){
        topBorderSelectors[borderModNum].setAttribute("active","");
    };
    function bottomBorderActivate(){
        bottomBorderSelectors[borderModNum].setAttribute("active","");
    };
    function leftBorderActivate(){
        leftBorderSelectors[borderModNum].setAttribute("active","");
    };
    function rightBorderActivate(){
        rightBorderSelectors[borderModNum].setAttribute("active","");
    }
    function topBorderNeutral(){
        topBorderSelectors[borderModNum].removeAttribute("active");
    };
    function bottomBorderNeutral(){
        bottomBorderSelectors[borderModNum].removeAttribute("active");
    };
    function leftBorderNeutral(){
        leftBorderSelectors[borderModNum].removeAttribute("active");
    };
    function rightBorderNeutral(){
        rightBorderSelectors[borderModNum].removeAttribute("active");
    }

    //Evenement lié au bouton de selection des bordures (bouton-central du selecteur de bordure)
    //a chaque nouveau clique une nouvelle selection de bordures modifiable est faite, 
    //il y a 9 selections différentes qui se succede.
    //l'evenement utilise : 
    //les fonction neutral/active pour chgmt grahique et 
    //les variables interuptors (o/i) pour validé ou non la possibilité de modification des bord  
    borderSelects[borderModNum].addEventListener("click", function(e){
        console.log("test");
        //selection de tout les bords
        if(borderIFList[borderModNum].borderSelectorCounter == 1){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure haute
        else if(borderIFList[borderModNum].borderSelectorCounter == 2){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "-0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 3){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure basse
        else if(borderIFList[borderModNum].borderSelectorCounter == 4){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure gauche
        else if(borderIFList[borderModNum].borderSelectorCounter == 5){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 6){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure basse et gauche
        else if(borderIFList[borderModNum].borderSelectorCounter == 7){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et basse
        else if(borderIFList[borderModNum].borderSelectorCounter == 8){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure gauche et droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 9){
            borderIFList[borderModNum].borderSelectorCounter = 1;
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
    })
    //les 4 Evenements permettant O/I indépendament les différent bords
    //lors d'un clique sur les bouton de bord représentant le bord désiré dans le selecteur
    //cela permet de l'inclure ou l'exclure de la selection de bord que l'on peut modifier (interuptor booleen O/I)
    //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
    topBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorTB == false){
            topBorderActivate();
            borderIFList[borderModNum].interuptorTB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            topBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            visualChangeBeforeBorderModification()
        }
    })
    leftBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorLB == false){
            leftBorderActivate();
            borderIFList[borderModNum].interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorLB = false;
            visualChangeBeforeBorderModification()
        }
    })
    rightBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorRB == false){
            rightBorderActivate();
            borderIFList[borderModNum].interuptorRB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            rightBorderNeutral();
            borderIFList[borderModNum].interuptorRB = false;
            visualChangeBeforeBorderModification()
        }
    })
    bottomBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorBB == false){
            bottomBorderActivate();
            borderIFList[borderModNum].interuptorBB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            bottomBorderNeutral();
            borderIFList[borderModNum].interuptorBB = false;
            visualChangeBeforeBorderModification()
        }
    })
    
    //selectionIfNoBorderIsSelected:
    //permet lors des Event de selection de valeur,btn/input, qui suivent juste en dessous de selectionné tout les bords si aucun ne l'est
    //inclus visualChangeBeforeBorderModification pour activé visuellement le changement.
    function selectionIfNoBorderIsSelected(){
        if((borderIFList[borderModNum].interuptorTB == false)&&(borderIFList[borderModNum].interuptorRB == false)&&
        (borderIFList[borderModNum].interuptorBB == false)&&(borderIFList[borderModNum].interuptorLB == false)){
            borderIFList[borderModNum].borderSelectorCounter = 2;
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true;
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            visualChangeBeforeBorderModification()
        }
    }
    //Les 4 Event qui suivents fonctionne en 3 étapes : 
    //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
    //2. effectue une condition pour chaque bord (4) avec les interuptor O/I associés aux bords pour savoir 
    //   si il est inclus à la selection a modifié. si le booleen est true, on change la valeur désiré dans lobjet représentant le bord 
    //3. Enfin, si aucun bords n'est selectionné la fonction "selectionIfNoBorderIsSelected" incluse selectionnera tout les bords (visuel/valeur)

    //Event du range de selection de la taille des bords 
    borderRanges[borderModNum].addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.size = borderRanges[borderModNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du bouton de couleur des bords
    borderColors[borderModNum].addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.color.hue = borderColors[borderModNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du select de la liste de style des bords 
    borderStyles[borderModNum].addEventListener("click", function(){
        if(borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex] != selectedStyle){
            selectedStyle.removeAttribute("selected");
            selectedStyle = borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex];
            selectedStyle.setAttribute("selected", "");
        }
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.style = selectedStyle.value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du bouton d'opacité
    opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
}

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CORNER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createCorner(){
    //boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
    for(i=0; i<= elements.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let cornerModNum = i;
        //objet contenant les informations sur les element de selection du module
        cornerIFList[cornerModNum] = {
            //représente l'état futur de l'element de selection des coins
            cornerSelectorSelectionCounter : 1,
            //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
            CornerInteruptorTL : false,
            CornerInteruptorTR : false,
            CornerInteruptorBR : false,
            CornerInteruptorBL : false
        }

        //objet qui contient les valeurs de courbure pour les 4 coins de l'element ciblé
        cornerModList[cornerModNum] = {
            topLeft : 0,
            topRight : 0,
            bottomRight : 0,
            bottomLeft : 0
        }

        //RangeVisualChangeBeforeCornerSelection :
        //fonction permettant la mise à jour visuel du range de selection de la valeur de la courbure, en fonctions des coins séléctionné
        function RangeVisualChangeBeforeCornerSelection(){
            visualChgtCorner(
                cornerIFList[cornerModNum].CornerInteruptorTL, cornerIFList[cornerModNum].CornerInteruptorTR,
                cornerIFList[cornerModNum].CornerInteruptorBR , cornerIFList[cornerModNum].CornerInteruptorBL,

                cornerModList[cornerModNum].topLeft, cornerModList[cornerModNum].topRight, 
                cornerModList[cornerModNum].bottomRight, cornerModList[cornerModNum].bottomLeft, 

                radiusRanges[cornerModNum]
            )
        }

        //suite de fonction qui s'activerons dans les EVENT qui leurs succede, 
        //elles permettent +/- l'attribut HTML correspondant a un selecteur de coin activé ou non
        //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des coins 
        //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
        function topLeftCornerActivate(){
            topLefts[cornerModNum].setAttribute("active","");
        }
        function topRightCornerActivate(){
            topRights[cornerModNum].setAttribute("active","");  
        }
        function bottomRightCornerActivate(){
            bottomRights[cornerModNum].setAttribute("active","");
        }
        function bottomLeftCornerActivate(){
            bottomLefts[cornerModNum].setAttribute("active","");
        }
        function topLeftCornerNeutral(){
            topLefts[cornerModNum].removeAttribute("active");
        }
        function topRightCornerNeutral(){
            topRights[cornerModNum].removeAttribute("active");
        }
        function bottomRightCornerNeutral(){
            bottomRights[cornerModNum].removeAttribute("active");
        }
        function bottomLeftCornerNeutral(){
            bottomLefts[cornerModNum].removeAttribute("active"); 
        }

        //Evenement lié au bouton de selection des coins (bouton-central du selecteur de coins)
        //a chaque nouveau clique une nouvelle selection de coin est faite,
        //il y a 11 selections différentes qui se succede
        //l'evenement utilise : 
        //les fonction neutral/active pour chgmt grahique et 
        //les variables interuptors (o/i) pour validé ou non la possibilité de modification des coins  
        cornerSelects[cornerModNum].addEventListener("click", function(e){
            //selection de tout les coins
            if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 1){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 2){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 3){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 4){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 5){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins supérieurs
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 6){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins droits
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 7){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins inférieurs
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 8){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins gauches
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 9){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut gauche et bas droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 10){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut droit et bas gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 11){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter = 1;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
        })

        //les 4 Evenements permettant O/I indépendament les différents coins
        //lors d'un clique sur les bouton de coin représentant le coin désiré dans le selecteur
        //cela permet de l'inclure ou l'exclure de la selection de coin que l'on peut modifier (interuptor booleen O/I)
        //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
        topLefts[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorTL == false){
                topLeftCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
            }
            else{
                topLeftCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorTL = false;           
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        topRights[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorTR == false){
                topRightCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
            }
            else{
                topRightCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomRights[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorBR == false){
                bottomRightCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
            }
            else{
                bottomRightCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomLefts[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorBL == false){
                bottomLeftCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
            }
            else{
                bottomLeftCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })


        //L'Event du range qui gere la courbure fonctionne en 3 étapes : 
        //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
        //2. effectue une condition pour chaques coins (4) avec les interuptor O/I associé au coin pour savoir- 
        //   -si il est inclus a la selection a modifié. Si le booleen est true, on change la valeur désiré dans la variable représentant le coin
        //3. si aucun coins n'est sélectionné mais que le range est utilisé, alors il y aura une selection auto de tout les bord (visuel et valeur)
        radiusRanges[cornerModNum].addEventListener("input", function(){

            if(cornerIFList[cornerModNum].CornerInteruptorTL == true){
                cornerModList[cornerModNum].topLeft = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorTR == true){
                cornerModList[cornerModNum].topRight = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorBR == true){
                cornerModList[cornerModNum].bottomRight = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorBL == true){
                cornerModList[cornerModNum].bottomLeft = radiusRanges[cornerModNum].value;
            }
            if((cornerIFList[cornerModNum].CornerInteruptorTL == false)&&(cornerIFList[cornerModNum].CornerInteruptorTR == false)&&
            (cornerIFList[cornerModNum].CornerInteruptorBR == false)&&(cornerIFList[cornerModNum].CornerInteruptorBL == false)){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter = 2;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            corner(cornerModNum);
        })
    }
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SHADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function createShader(){
    //boucle qui permet de remplir le shaderModList d'objet representant chacun des module de shaders et leurs différentes valeurs
    //déclaration d'evenement avec les outils HTML d'interactions et de selection
    for(i=0; i<= elements.length-1; i++){
        //représente le nombre de module de shader
        let shaderModNum = i;
        //permet de selectionner le range d'opacité lié au module de shader
        let opaNum = 1+(shaderModNum*4);

        //objet qui contient les informations concernant le nombre de shader différent, celui qui est sélectionné et les info sur les btns
        shaderIFList[shaderModNum] = {
            //représente le nombre de shaders différent dans un même module
            shaderNum : 1,
            //représente le shader selectionné (le shaderNumber selectionné)
            shaderSelectNum : 1,
            //défini l'état du bouton de selection de gradient (lineaire ou gradient)
            interuptor : false,
            //défini les différentes variable lié au bouton de selection de degré
            degreeBtn : {
                //représente le numéro du bouton qui permet l'attribution d'un degré pour les gradient lineaire
                btnNum : i,
                //représente les degrés a 360°, ici a leurs valeurs initial
                degree : 0,
                //défini l'état du bouton d'attribution de degré (si gradient lineaire ON, si radial OFF)
                degreeInteruptor : false,
                //permet de pouvoir comparé l'ancienne place de la souris avec la nouvelle et de crée le nouveau degrés
                initVal : 0
            }    
        }   

        //crée un tableau qui va contenir les objets représentant les différents shaders d'un même module
        shaderModList[shaderModNum] = [];
        //création de l'objet shader de base
        shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderNum-1] = {
            placement : 0,
            gradient : "linear",
            degree : 0,
            color : {
                        hue : "#FFA200",
                        opacity : 100
                    }
        }
        //fonction de changement visuel des element de selection du shader en fonction du shader du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            //changement visuel du range de placement et du bouton de selection de couleur
            rangeVisualChgt(shaderRanges[shaderModNum], shaderModList[shaderModNum][val]);
            colorVisualChgt(shaderColors[shaderModNum], shaderModList[shaderModNum][val])
            //changement visuel du range d'opacité et du range de selection d'opacité
            opaVisualChgt(shaderModList[shaderModNum][val].color.opacity, opacity);
        }
        
        //event de selection du shader dans la liste des shader dans chaque module
        shaderSelectors[shaderModNum].addEventListener("click", changeListShadersNumber);
        function changeListShadersNumber(){
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (shaderIFList[shaderModNum].shaderSelectNum != shaderSelectors[shaderModNum].options[shaderSelectors[shaderModNum].selectedIndex].value){

                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].removeAttribute("selected");
                shaderIFList[shaderModNum].shaderSelectNum = shaderSelectors[shaderModNum].options[shaderSelectors[shaderModNum].selectedIndex].value;
                shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
                let val= shaderIFList[shaderModNum].shaderSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }
            shader(shaderModNum);
        }
        //ajout d'un shader dans la liste des shader d'un module
        shaderMoreBtns[shaderModNum].addEventListener("click", function(e){
            //ajout d'un shader dans le "compteur de shader" pour ensuite construire l'element html qui le representera
            shaderIFList[shaderModNum].shaderNum ++;
            shaderSelectors[shaderModNum].innerHTML += '<option value="' + shaderIFList[shaderModNum].shaderNum + '">' + shaderIFList[shaderModNum].shaderNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection du shader
            shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].removeAttribute("selected");
            shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderNum-1].setAttribute("selected", "");
            //creation de l'objet représentant le nouveau shader
            shaderIFList[shaderModNum].shaderSelectNum = shaderIFList[shaderModNum].shaderNum;
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderNum-1] = {
                placement : 100,
                color : {
                            hue : "#FFA200",
                            opacity : 100
                        }
            }

            //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
            let val= shaderIFList[shaderModNum].shaderNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
            shader(shaderModNum);
        })
        
        //suppression d'un shader dans la liste des shader d'un module
        shaderTrashBtns[shaderModNum].addEventListener("click", function(e){
            if(shaderIFList[shaderModNum].shaderNum > 1){
                shaderSelectors[shaderModNum].removeChild(shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1]);
                shaderModList[shaderModNum].splice(shaderIFList[shaderModNum].shaderSelectNum-1, 1)

                //boucle pour remplacer les elements HTML qui représente les shaders précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=shaderIFList[shaderModNum].shaderSelectNum-1; i<=shaderSelectors[shaderModNum].length-1; i++){
                    shaderSelectors[shaderModNum][i].innerHTML = i+1;
                    shaderSelectors[shaderModNum][i].setAttribute("value", i+1);
                }
                //selection du shader inférieur a celui supprimé apres sa suppression 
                if(shaderIFList[shaderModNum].shaderSelectNum-2 >= 0){
                    shaderIFList[shaderModNum].shaderNum --;
                    shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-2].setAttribute("selected", "");
                    shaderIFList[shaderModNum].shaderSelectNum = shaderIFList[shaderModNum].shaderSelectNum-1; 
                }
                //quand le shader supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(shaderIFList[shaderModNum].shaderSelectNum-2 < 0){
                    shaderIFList[shaderModNum].shaderNum --;
                    shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au shaderSelectNumber
                shaderSelectors[shaderModNum].selectedIndex = shaderIFList[shaderModNum].shaderSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= shaderIFList[shaderModNum].shaderSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
                shader(shaderModNum);
            }
            else{
                color(shaderModNum);
            }
        })
        //event qui attribut la position des shaders grace au range du module shader
        shaderRanges[shaderModNum].addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].placement = shaderRanges[shaderModNum].value;
            shader(shaderModNum);
        })
        //event qui attribut la couleur des shaders grace a l'input couleur du module shader
        shaderColors[shaderModNum].addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].color.hue = shaderColors[shaderModNum].value;
            shader(shaderModNum);
        })
        //event qui attribut l'opacité des shaders grace a l'outil d'opacité du module shader
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].color.opacity = opacityButtonList[opaNum].opacityRange.value;
            shader(shaderModNum);
        })



        //EVENT qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
        selectGradients[shaderModNum].addEventListener('click', function(){
            //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
            if(shaderIFList[shaderModNum].interuptor == false){
                btnSelectGradients[shaderModNum].setAttribute("active","");
                degreeButtons[shaderModNum].removeAttribute("active");
                shaderModList[shaderModNum][0].gradient = "radial";
                shaderModList[shaderModNum][0].degree = undefined;
                shaderIFList[shaderModNum].interuptor = true;
            }
            //idem pour le gradient radial
            else{; 
                btnSelectGradients[shaderModNum].removeAttribute("active");
                degreeButtons[shaderModNum].setAttribute("active","");
                shaderModList[shaderModNum][0].gradient = "linear";
                shaderModList[shaderModNum][0].degree = shaderIFList[shaderModNum].degreeBtn.degree;
                shaderIFList[shaderModNum].interuptor = false;
            }
            shader(shaderModNum);
        })
        
            //fonction permettant de calculer le nouveau degré
            //fonctionne en comparant le placement de la souris une fois que l'on a appuyer sur le bouton de selection de degré
            //initialPlacementValue = relatif a initialValue, placementValue = placement suivant a InitialValue, degreeValue = valeur initial des degrè avant fonction.
            function calculDegree(initialPlacementValue, placementValue, degreeValue){
                let initialPlacement = initialPlacementValue, actualplacement = placementValue, degreeChange = degreeValue;
                let changementDegreeValue = (initialPlacement - actualplacement)*5;
            
                //changement de la valeur des degrés.
                shaderIFList[shaderModNum].degreeBtn.degree += changementDegreeValue;
                //deux boucle permettant de rester dans l'interval de 360
                if (shaderIFList[shaderModNum].degreeBtn.degree > 360){shaderIFList[shaderModNum].degreeBtn.degree = degreeChange-360;}
                else if (shaderIFList[shaderModNum].degreeBtn.degree < 0){shaderIFList[shaderModNum].degreeBtn.degree = 360 - degreeChange;}
            
                //premet le changement visuel du bouton
                degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].style.transform = "rotate(" + shaderIFList[shaderModNum].degreeBtn.degree + "deg)";
                //ajout de la nouvelle valeur des degrés au premier objet du tableau des shader
                shaderModList[shaderModNum][0].degree = shaderIFList[shaderModNum].degreeBtn.degree;
                //mise a jour de la valeur initial du placement du curseur pour pouvoir répété la fonction. 
                shaderIFList[shaderModNum].degreeBtn.initVal = actualplacement;
        
                /*placer sans doute ici le code permettant d'ajouter*/
                shader(shaderModNum);
            }
            //evenement permettant d'initialisé une valeurs de placement de la souris lorsqu'on clique sur le bouton
            degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].addEventListener('mousedown', function(event){
                if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                    shaderIFList[shaderModNum].degreeBtn.degreeInteruptor = true;
                    shaderIFList[shaderModNum].degreeBtn.initVal = event.clientY;
                }
            })
            //evement qui s'active lorsqu'on bouge la souris de haut en bas apres un clique qui n'est pas remonté
            body.addEventListener('mousemove', function(event){ 
                //this condition is here for if the module contain the btn in link with this Event is delete
                //avoid the rest of the event
                if(shaderIFList[shaderModNum] != undefined){
                    if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                        let placement = event.clientY;
                        if (shaderIFList[shaderModNum].degreeBtn.degreeInteruptor == true){
                            beginCalculDegree = setInterval(calculDegree(shaderIFList[shaderModNum].degreeBtn.initVal, placement, shaderIFList[shaderModNum].degreeBtn.degree), 200);
                        }
                    }
                }      
            })
            //evenement qui s'active lorsqu'on remonte la souris, qui termine le processus de selection du degré
            //réinitialise une partie des valeurs pour pouvoir recommencer la selection une prochaine fois.
            body.addEventListener('mouseup', function(){
                //this condition is here for if the module container the btn in link with this Event is delete
                //avoid the rest of the event
                if(shaderIFList[shaderModNum] != undefined){
                    if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                        if(shaderIFList[shaderModNum].degreeBtn.degreeInteruptor == true){
                            shaderIFList[shaderModNum].degreeBtn.degreeInteruptor = false;
                            clearInterval(beginCalculDegree);
                        }
                    }
                }
            })

    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BOX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createBox(){
    for(i=0; i<= elements.length-1; i++){
        //représente le nombre de module de box
        let boxModNum = i;
        //permet de selectionner le range d'opacité lié au module de box
        let opaNum = 3+(boxModNum*4);
        boxIFList[boxModNum] = {
            //représente le nombre de boxs différent dans un même module
            boxNum : 1,
            //représente la box selectionné (le boxNum selectionné)
            boxSelectNum : 1,
            //défini l'état du bouton XY
            interuptorXY : false,    
            //défini l'état du bouton BS
            interuptorBS : false
            }
        //crée un tableau qui va contenir les objets représentant les différents boxs d'un même module
        boxModList[boxModNum] = [];
        //création de l'objet box de base
        boxModList[boxModNum][boxIFList[boxModNum].boxNum-1] = {
            inset : false,
            radius : {
                spread : 0,
                blur : 0 
            },
            offset : {
                x : 0,
                y : 0
            },
            color : {
                hue : "#969696",
                opacity : 100
            }
        }
    
        //fonction de changement visuel des element de selection de la box en fonction de la box du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            visualChgtBox(
                boxModList[boxModNum][val], boxIFList[boxModNum], 
                boxInsetCheckBoxs[boxModNum], boxRangeXYs[boxModNum], boxRangeBSs[boxModNum], 
                boxColors[boxModNum], 
                boxModList[boxModNum][val], opacity
                )
        }
    
        //event de selection du box dans la liste des box dans chaque module
        boxSelectors[boxModNum].addEventListener("click", changeListBoxsNumber);
        function changeListBoxsNumber(){
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (boxIFList[boxModNum].boxSelectNum != boxSelectors[boxModNum].options[boxSelectors[boxModNum].selectedIndex].value){
                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].removeAttribute("selected");
                boxIFList[boxModNum].boxSelectNum = boxSelectors[boxModNum].options[boxSelectors[boxModNum].selectedIndex].value;
                boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module box (permet de correspondre au box selectionné)
                let val= boxIFList[boxModNum].boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);  
            }
            box(boxModNum);
        }
        
        //ajout d'une box dans la liste des box d'un module
        boxMoreBtns[boxModNum].addEventListener("click", function(e){
            //ajout d'une box dans le "compteur de box" pour ensuite construire l'element html qui le representera
            boxIFList[boxModNum].boxNum ++;
            boxSelectors[boxModNum].innerHTML += '<option value="' + boxIFList[boxModNum].boxNum + '">' + boxIFList[boxModNum].boxNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection de la box
            boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].removeAttribute("selected");
            boxSelectors[boxModNum].children[boxIFList[boxModNum].boxNum-1].setAttribute("selected", "");
            //creation de l'objet représentant la nouvelle box
            boxIFList[boxModNum].boxSelectNum = boxIFList[boxModNum].boxNum;
            boxModList[boxModNum][boxIFList[boxModNum].boxNum-1] = {
                inset : false,
                radius : {
                    spread : 0,
                    blur : 0 
                },
                offset : {
                    x : 0,
                    y : 0
                },
                color : {
                    hue : "#969696",
                    opacity : 100
                }
            }
            //enleve les animations des interupteur de selection des ranges
            interuptorSpreadBlurs[boxModNum].classList.add("no-transition");
            interuptorSelectsXYs[boxModNum].classList.add("no-transition");
            //remet les interupter XY/BS dans leurs position initial lorsque ajout d'une box
            interuptorSpreadBlurs[boxModNum].removeAttribute("active");
            boxRangeBSs[boxModNum].setAttribute("min","-100");
            boxRangeBSs[boxModNum].setAttribute("max","100");
            boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread; 
            boxIFList[boxModNum].interuptorBS = false;
            interuptorSelectsXYs[boxModNum].removeAttribute("active");
            boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y;
            boxIFList[boxModNum].interuptorXY = false;
    
    
            //fonction de changement visuel du module box (permet de correspondre au box selectionné)
            let val= boxIFList[boxModNum].boxNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
            box(boxModNum);
        })
    
        //suppression d'un box dans la liste des box d'un module
        boxTrashBtns[boxModNum].addEventListener("click", function(e){
            if(boxIFList[boxModNum].boxNum > 1){
                boxSelectors[boxModNum].removeChild(boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-1]);
                boxModList[boxModNum].splice(boxIFList[boxModNum].boxSelectNum-1, 1)
    
                //boucle pour remplacer les elements HTML qui représente les boxs précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=boxIFList[boxModNum].boxSelectNum-1; i<=boxSelectors[boxModNum].length-1; i++){
                    boxSelectors[boxModNum][i].innerHTML = i+1;
                    boxSelectors[boxModNum][i].setAttribute("value", i+1);
                }
                //selection du box inférieur a celui supprimé apres sa suppression 
                if(boxIFList[boxModNum].boxSelectNum-2 >= 0){
                    boxIFList[boxModNum].boxNum --;
                    boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-2].setAttribute("selected", "");
                    boxIFList[boxModNum].boxSelectNum = boxIFList[boxModNum].boxSelectNum-1; 
                }
                //quand le box supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(boxIFList[boxModNum].boxSelectNum-2 < 0){
                    boxIFList[boxModNum].boxNum --;
                    boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au boxSelectNum
                boxSelectors[boxModNum].selectedIndex = boxIFList[boxModNum].boxSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= boxIFList[boxModNum].boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }
            box(boxModNum);
        })
    
        //E checkbox, defini si box est inset ou non 
        boxInsetCheckBoxs[boxModNum].addEventListener('input', function(){
            if(boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset = true;
    
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset = false;
            }
            box(boxModNum);
        })
        //Evenement qui gere le changement détat du bouton XY, permettant selection de l'axe
        selectXYs[boxModNum].addEventListener('click', function(){
        //mise en place des effet de transition de l'interupteur
        interuptorSelectsXYs[boxModNum].classList.remove("no-transition");
        //etat bouton definissant l'axe Y en JS et qui active le css pour changer le visuel du bouton en fonction
            if(boxIFList[boxModNum].interuptorXY == false){
                interuptorSelectsXYs[boxModNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.x;
                    boxIFList[boxModNum].interuptorXY = true;  
                },200)
            }
            //idem que dernier commentaire pour l'axe X 
            else{
                interuptorSelectsXYs[boxModNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y;
                    boxIFList[boxModNum].interuptorXY = false;  
                },200)
            }
            box(boxModNum);
        })
        //E définissant le offset de box via un range, Y||X en fonction d'interuptorXY
        boxRangeXYs[boxModNum].addEventListener("input", function(){
            if(boxIFList[boxModNum].interuptorXY == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y = boxRangeXYs[boxModNum].value;
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.x = boxRangeXYs[boxModNum].value;            
            }
            box(boxModNum);
        })
        //Evenement qui gere le changement détat du bouton BS, permettant selection soi du spread ou du blur
        selectBlurSpreads[boxModNum].addEventListener('click', function(){
            //mise en place des effet de transition de l'interupteur
            interuptorSpreadBlurs[boxModNum].classList.remove("no-transition");
            //etat bouton definissant selection spread en JS et qui active le css pour changer le visuel du bouton en fonction
            if(boxIFList[boxModNum].interuptorBS == false){
                interuptorSpreadBlurs[boxModNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeBSs[boxModNum].setAttribute("min","0");
                    boxRangeBSs[boxModNum].setAttribute("max","100");
                    boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.blur;
                    boxIFList[boxModNum].interuptorBS = true;
                },200)
            }
            //idem pour le blur
            else{
                interuptorSpreadBlurs[boxModNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeBSs[boxModNum].setAttribute("min","-100");
                    boxRangeBSs[boxModNum].setAttribute("max","100");
                    boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread; 
                    boxIFList[boxModNum].interuptorBS = false;
                },200)
            }
            box(boxModNum);
        })
        //E definissant le Blur de box via un range, Blur||Spread en fonction d'interuptorBS
        boxRangeBSs[boxModNum].addEventListener("input", function(){
            if(boxIFList[boxModNum].interuptorBS == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread = boxRangeBSs[boxModNum].value;
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.blur = boxRangeBSs[boxModNum].value;            
            }
            box(boxModNum);
        })
        //E definissant la couleur de box 
        boxColors[boxModNum].addEventListener("input", function(){
            boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].color.hue = boxColors[boxModNum].value;
            box(boxModNum);
        })
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
            boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].color.opacity = opacityButtonList[opaNum].opacityRange.value;
            box(boxModNum);
        })
    }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TRASH-RESET-MORE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//fonction de suppression d'une element bar

function createTrashBtn(){
    for(i=0; i<= elements.length-1; i++){
        let trashNum = i;
        trashBtns[trashNum].addEventListener("click", function(){
        
            document.getElementById("if-" + elemList[trashNum].id.name).remove();
            document.getElementById(elemList[trashNum].id.name).remove();
    
            fetch('data/element-module.txt')
            .then(response => response.text())
            .then(data => {
                //delete all element-module HTML elem contents in all
                elementModulesContainer.innerHTML = "";
                //variables of "old" version of Elem/mod list, for after array manipulation and update of elem
                let saveElemList = [];
                let saveNameModList = [];
                let saveColorModList = [];
                let saveShaderModList = [];
                let saveCornerModList = [];
                let saveBorderModList = [];
                let saveBoxModList = []
                
                let saveElemIFList = [];
                let saveShaderIFList = [];
                let saveCornerIFList = [];
                let saveBorderIFList = [];
                let saveBoxIFList = [];
                
                //delete select elem-bar informations in all construction array of element
                elemList.splice(trashNum, 1);
                nameModList.splice(trashNum, 1);
                colorModList.splice(trashNum, 1);
                shaderModList.splice(trashNum, 1);
                cornerModList.splice(trashNum, 1);
                borderModList.splice(trashNum, 1);
                boxModList.splice(trashNum, 1);
    
                elemIFList.splice(trashNum, 1);
                shaderIFList.splice(trashNum, 1);
                cornerIFList.splice(trashNum, 1);
                borderIFList.splice(trashNum, 1);
                boxIFList.splice(trashNum, 1);

    
                //adding in saveList init before Elem execpt the elem delete of list before
                for(j=0; j<=elemList.length-1; j++){
                    saveElemList.push(elemList[j]);
                    saveNameModList.push(nameModList[j]);
                    saveColorModList.push(colorModList[j]);
                    saveShaderModList.push(shaderModList[j]);
                    saveCornerModList.push(cornerModList[j]);
                    saveBorderModList.push(borderModList[j]);
                    saveBoxModList.push(boxModList[j]);
        
                    saveElemIFList.push(elemIFList[j]);
                    saveShaderIFList.push(shaderIFList[j]);
                    saveCornerIFList.push(cornerIFList[j]);
                    saveBorderIFList.push(borderIFList[j]);
                    saveBoxIFList.push(boxIFList[j]);

                }
                //adding HTML-ELEM for each Module-ELEM
                for (k=0; k<=elemList.length-1; k++){
                elementModulesContainer.innerHTML += data;
                }
                createModule();
                //update Elem-mod-list create with createModule() with our SaveList
                for (k=0; k<=elements.length-1; k++){
                    elemList.splice(k, 1, saveElemList[k]);
                    nameModList.splice(k, 1, saveNameModList[k]);
                    colorModList.splice(k, 1, saveColorModList[k]);
                    shaderModList.splice(k, 1, saveShaderModList[k]);
                    cornerModList.splice(k, 1, saveCornerModList[k]);
                    borderModList.splice(k, 1, saveBorderModList[k]);
                    boxModList.splice(k, 1, saveBoxModList[k]);
        
                    elemIFList.splice(k, 1, saveElemIFList[k]);
                    shaderIFList.splice(k, 1, saveShaderIFList[k]);
                    cornerIFList.splice(k, 1, saveCornerIFList[k]);
                    borderIFList.splice(k, 1, saveBorderIFList[k]);
                    boxIFList.splice(k, 1, saveBoxIFList[k]);

                    if(k == elements.length-1){
                        delete sizeIFList[elements.length].height;
                        delete sizeIFList[elements.length].width;

                        elemIFList[elements.length] = {
                            size : sizeIFList[elements.length]
                        }
                    }
                }
                //first step of visual change
                for (o=0; o<=elemList.length-1; o++){
                    allVisualChange(o);
                }
                //specific visual change for the delete Event, for each par of elem module (id,color,shader,ect)
                for(j=0; j<=elements.length-1; j++){
                    //shader
                    for(k=2; k<=shaderIFList[j].shaderNum; k++){
                        shaderSelectors[j].innerHTML += '<option value="' + k + '">' + k + '</option>';
                        if(k == shaderIFList[j].shaderSelectNum){
                            shaderSelectors[j].children[k-1].setAttribute("selected", "");
                            shaderSelectors[j].selectedIndex = k-1;
                        }
                    }
                    if(shaderIFList[j].interuptor == true){
                        btnSelectGradients[j].setAttribute("active", "");
                        degreeButtons[j].removeAttribute("active");
                    }
                    degreeButtons[j].style.transform = "rotate(" + shaderModList[j][0].degree + "deg)";
                    if(j >= trashNum){
                        shaderIFList[j].degreeBtn.btnNum--;
                    }
                    //corner
                    if(cornerIFList[j].CornerInteruptorTL == true){
                        topLefts[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorTR == true){
                        topRights[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorBL == true){
                        bottomLefts[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorBR == true){
                        bottomRights[j].setAttribute("active","")
                    }
                    //border
                    if(borderIFList[j].interuptorTB == true){
                        topBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].interuptorRB == true){
                        rightBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].nteruptorLB == true){
                        leftBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].interuptorBB == true){
                        bottomBorderSelectors[j].setAttribute("active","")
                    }
                    //box
                    let boxNum = 0;
                    for(k=2; k<=boxIFList[j].boxNum; k++){
                        boxSelectors[j].innerHTML += '<option value="' + k + '">' + k + '</option>';
                        if(k == boxIFList[j].boxSelectNum){
                            boxSelectors[j].children[k-1].setAttribute("selected", "");
                            boxSelectors[j].selectedIndex = k-1;
                            boxNum = k-1;
                        }
                    }
                    if(boxIFList[j].interuptorXY == true){
                        interuptorSelectsXYs[j].setAttribute("active", "");
                        boxRangeXYs[j].value = boxModList[j][boxNum].offset.x;
                    }
                    else{
                        boxRangeXYs[j].value = boxModList[j][boxNum].offset.y;
                    }
                    if(boxIFList[j].interuptorBS == true){
                        interuptorSpreadBlurs[j].setAttribute("active", "");
                        boxRangeBSs[j] = boxModList[j][boxNum].radius.blur;
                        boxRangeBSs[j].setAttribute("min", "0");
                    }
                    else{
                        boxRangeBSs[j] = boxModList[j][boxNum].radius.spread;
                        boxRangeBSs[j].setAttribute("min", "-100");
                    }
                }
                updatePos();
                gridIFList[i].use = false;
                createSize();
                createPlacement();
            })
            //for visual-changement of elem-window
            removeAllEllAttr()
            moduleCounter--;
            selectAllEllAttr()
            if(moduleCounter == 0){
                elemTool.setAttribute("begin", "");
                angle.setAttribute("begin", "");
            }
        })
    }
}
//fonction de reset des information de style de l'element séléctionné
function createResetBtn(){
    for(i=0; i<= elements.length-1; i++){
        let resetNum = i;
        resetBtns[resetNum].addEventListener("click", function(){
            console.log(resetNum);
            //~~~~~~~~~~~~~~~~~~~~RESET ELEMENT~~~~~~~~~~~~~~~~~~~~~//
            //put all information in their initial values, for all modules
            //id
            nameModList[resetNum].name = elemList[resetNum].id.name;
            //color
            colorModList[resetNum].hue = "#009DFF";
            colorModList[resetNum].opacity = 100;
            //shader
            shaderIFList[resetNum].shaderNum = 1;
            shaderIFList[resetNum].shaderSelectNum = 1;
            shaderIFList[resetNum].interuptor = false;
            shaderIFList[resetNum].degreeBtn.btnNum = 0;
            shaderIFList[resetNum].degreeBtn.degree = 0;
            shaderIFList[resetNum].degreeBtn.degreeInteruptor = false;
            shaderIFList[resetNum].degreeBtn.initVal = 0;

            shaderModList[resetNum] = [];
            shaderModList[resetNum][0] = {
                placement : 0, gradient : "linear", degree : 0,
                color : { hue : "#FFA200",opacity : 100 }
            }
            //corner
            cornerIFList[resetNum].cornerSelectorSelectionCounter = 1;
            cornerIFList[resetNum].CornerInteruptorTL = false;
            cornerIFList[resetNum].CornerInteruptorTR = false;
            cornerIFList[resetNum].CornerInteruptorBR = false;
            cornerIFList[resetNum].CornerInteruptorBL = false;

            cornerModList[resetNum].topLeft = 0;
            cornerModList[resetNum].topRight = 0;
            cornerModList[resetNum].bottomRight = 0;
            cornerModList[resetNum].bottomLeft = 0;
            //border
            borderIFList[resetNum].borderSelectorCounter = 1;
            borderIFList[resetNum].interuptorTB = false;
            borderIFList[resetNum].interuptorRB = false;
            borderIFList[resetNum].interuptorLB = false;
            borderIFList[resetNum].interuptorBB = false;

            borderModList[resetNum].top.size = 0;
            borderModList[resetNum].top.style = "none";
            borderModList[resetNum].top.color.hue = "#000000";
            borderModList[resetNum].top.color.opacity = 100;
            borderModList[resetNum].right.size = 0;
            borderModList[resetNum].right.style = "none";
            borderModList[resetNum].right.color.hue = "#000000";
            borderModList[resetNum].right.color.opacity = 100;
            borderModList[resetNum].bottom.size = 0;
            borderModList[resetNum].bottom.style = "none";
            borderModList[resetNum].bottom.color.hue = "#000000";
            borderModList[resetNum].bottom.color.opacity = 100;
            borderModList[resetNum].left.size = 0;
            borderModList[resetNum].left.style = "none";
            borderModList[resetNum].left.color.hue = "#000000";
            borderModList[resetNum].left.color.opacity = 100;
            //box
            boxIFList[resetNum].boxNum = 1;
            boxIFList[resetNum].boxSelectNum = 1;
            boxIFList[resetNum].interuptorXY = false;
            boxIFList[resetNum].interuptorBS = false;

            boxModList[resetNum] = [];
            boxModList[resetNum][0] = {
                inset : false,
                radius : { spread : 0, blur : 0 },
                offset : { x : 0, y : 0 },
                color : { hue : "#969696", opacity : 100 }
            }
            //
            createElement();
            //~~~~~~~~~~~~~~~~~~~~RESET VISUEL~~~~~~~~~~~~~~~~~~~~~//
            //name
            idNames[resetNum].value = nameModList[resetNum].name;
            //color
            colors[resetNum].value = colorModList[resetNum].hue;
            opaVisualChgt(colorModList[resetNum].opacity, (resetNum*4));
            //shader
            shaderSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            shaderColors[resetNum].value = shaderModList[resetNum][0].color.hue;
            opaVisualChgt(shaderModList[resetNum][0].color.opacity, 1+(resetNum*4));
            btnSelectGradients[resetNum].removeAttribute("active");
            degreeButtons[resetNum].style.transform = "rotate(" + 0 + "deg)";
            degreeButtons[resetNum].setAttribute("active","");
            //corner
            topLefts[resetNum].removeAttribute("active"); 
            topRights[resetNum].removeAttribute("active"); 
            bottomRights[resetNum].removeAttribute("active"); 
            bottomLefts[resetNum].removeAttribute("active"); 
            radiusRanges[resetNum].value = 0;
            //border
            topBorderSelectors[resetNum].removeAttribute("active"); 
            leftBorderSelectors[resetNum].removeAttribute("active"); 
            rightBorderSelectors[resetNum].removeAttribute("active"); 
            bottomBorderSelectors[resetNum].removeAttribute("active"); 

            for(j=0; j<=borderStyles[resetNum].children.length-1; j++){
                if(j==0){
                    borderStyles[resetNum].children[j].setAttribute("selected","");
                    borderStyles[resetNum].selectedIndex = j;
                }
                else{
                    borderStyles[resetNum].children[j].removeAttribute("selected");
                }
            }
            borderColors[resetNum].value = borderModList[resetNum].top.color.hue;
            opaVisualChgt(borderModList[resetNum].top.color.opacity, 2+(resetNum*4));
            borderRanges[resetNum].value = 0;
            //box
            boxSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            boxColors[resetNum].value = boxModList[resetNum][0].color.hue;
            opaVisualChgt(boxModList[resetNum][0].color.opacity, 3+(resetNum*4));
            boxInsetCheckBoxs[resetNum].checked = false;
            interuptorSelectsXYs[resetNum].removeAttribute("active");
            interuptorSpreadBlurs[resetNum].removeAttribute("active");
            boxRangeBSs[resetNum].setAttribute("min", "-100");
            boxRangeXYs[resetNum].value = 0;
            boxRangeBSs[resetNum].value = 0;

            //color
            color(resetNum);
            //shader
            shader(resetNum)
            //corner
            corner(resetNum);
            //border
            border(resetNum);
            //box
            box(resetNum);
            //size
            size(resetNum);            
        })
    }
}
function createElement(){
    for (i=0; i<=elements.length-1; i++){
        let elemNum = i;
        let opaNum = elemNum*4;
    
        elemList[elemNum] = 
        {
            id :  nameModList[elemNum],
            color : colorModList[elemNum],
            shader : shaderModList[elemNum],
            corner : cornerModList[elemNum],
            border : borderModList[elemNum],
            box : boxModList[elemNum],
            size : {
                width : 60,
                height : 60
            },
            grid : {
                left : 1,
                top : 1,
                right : 2,
                bottom : 2
            },
            place : {
                left : 0,
                top : 0
            } 
        }
        elemIFList[elemNum] = 
        {
            shader : shaderIFList[elemNum],
            corner : cornerIFList[elemNum],
            border : borderIFList[elemNum],
            box : boxIFList[elemNum],
        }
    }
}

function createModule(){
    createOpacity();
    createName();
    createColor();
    createBorder();
    createCorner();
    createShader();
    createBox();
    createResetBtn();
    createTrashBtn();
    createElement();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-MODULE-ADDING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//Event of the more-btn of the element-window
moreElementBtn.addEventListener("click", function(){
    fetch('data/element-module.txt')
    .then(response => response.text())
    .then(data => {
        //variables of "old" version of Elem/mod list, for after array manipulation and update of elem
        let saveElemList = [];
        let saveNameModList = [];
        let saveColorModList = [];
        let saveShaderModList = [];
        let saveCornerModList = [];
        let saveBorderModList = [];
        let saveBoxModList = []
        
        let saveElemIFList = [];
        let saveShaderIFList = [];
        let saveCornerIFList = [];
        let saveBorderIFList = [];
        let saveBoxIFList = []
        let saveSizeIFList = []

        //adding of "old" element information in the savelist create before
        for (i=0; i<=elemList.length-1; i++){
            saveElemList.push(elemList[i]);
            saveNameModList.push(nameModList[i]);
            saveColorModList.push(colorModList[i]);
            saveShaderModList.push(shaderModList[i]);
            saveCornerModList.push(cornerModList[i]);
            saveBorderModList.push(borderModList[i]);
            saveBoxModList.push(boxModList[i]);

            saveElemIFList.push(elemIFList[i]);
            saveShaderIFList.push(shaderIFList[i]);
            saveCornerIFList.push(cornerIFList[i]);
            saveBorderIFList.push(borderIFList[i]);
            saveBoxIFList.push(boxIFList[i]);
            saveSizeIFList.push(sizeIFList[i]);
        }

        //adding of HTML of module element
        elementModulesContainer.innerHTML += data;
        createModule();
        updatePos();

        //loop for adding last save information in the "new" array representing actual modules elem
        for (i=0; i<=saveElemList.length-1; i++){
            elemList.splice(i, 1, saveElemList[i]);
            nameModList.splice(i, 1, saveNameModList[i]);
            colorModList.splice(i, 1, saveColorModList[i]);
            shaderModList.splice(i, 1, saveShaderModList[i]);
            cornerModList.splice(i, 1, saveCornerModList[i]);
            borderModList.splice(i, 1, saveBorderModList[i]);
            boxModList.splice(i, 1, saveBoxModList[i]);
        
            elemIFList.splice(i, 1, saveElemIFList[i]);
            shaderIFList.splice(i, 1, saveShaderIFList[i]);
            cornerIFList.splice(i, 1, saveCornerIFList[i]);
            borderIFList.splice(i, 1, saveBorderIFList[i]);
            boxIFList.splice(i, 1, saveBoxIFList[i]);
            sizeIFList.splice(i, 1, saveSizeIFList[i]);
        }
        createSize();
        //body.removeEventListener("mousemove", placeMove);
        //body.removeEventListener("mouseup", placeEndMove);
        createPlacement();
        //visual change for the new element list
        for (i=0; i<=elemList.length-1; i++){
           allVisualChange(i); 
        }
        updateGraphicPos();
        calcElemCelPlace();
    })
})

