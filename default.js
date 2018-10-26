/*
12/2/2011
*Initial Release as Windows Appx App

10/25/2018
* Updated for web and added to budzique.com/mtg.
* Added web-app capibility for iOS (tap share and tap add to home screen in safari)
* Revised input method to not be tedious (previously you had to tap buttons to add symbols and could not go backwards so only reset to 0 would help) by adding forms instead
* combat erronious updates by checking for 0. (TODO: fix for blank form causing NaN)
* Land slider will now update calculation on slide.
* When even number of mana symbols produce 1 additional land than desired (such as 8 forest and 8 plains when you only wanted 15 lands) one land will now be removed at random.
* Land slider now has numeric output (This was previously removed to hide the additional land bug fixed above)





*/
var glob_id;
function setVal(element, val) { /* Please deprecate */
        var id = document.getElementById(element);
        id.innerHTML = val;
}
function setVal2(element, val) {
        var id = document.getElementById(element);
        id.value = val;
}
function getVal(element) { /* Please deprecate */
        glob_id = document.getElementById(element);
        
    return eval(glob_id.innerHTML);
}
function getVal2(element) {
    glob_id = document.getElementById(element);
    return eval(glob_id.value);
    
}
// replacement for totalManaSymbols()
function totalManaSymbols2(){
    var elements = ["W", "U", "B", "R", "G"];
    var r = 0;
    for(var i=0;i<5;i++){
        r += getVal2(getElementByColor(elements[i], false));
    }
    return r;
}
// replacement for totalManaSymbolsL()
function totalManaSources2(){
    var elements = ["W", "U", "B", "R", "G"];
    var r = 0;
    for(var i=0;i<5;i++){
        r += getVal(getElementByColor(elements[i], true));
    }
    return r;
}
function totalManaSymbols() { /* Please deprecate */
    return getVal2(getElementByColor("W", false)) + getVal2(getElementByColor("U", false)) + getVal2(getElementByColor("B", false)) + getVal2(getElementByColor("R", false)) + getVal2(getElementByColor("G", false));

}
function totalManaSymbolsL() { /* Please deprecate */
    return getVal(getElementByColor("W", true)) + getVal(getElementByColor("U", true)) + getVal(getElementByColor("B", true)) + getVal(getElementByColor("R", true)) + getVal(getElementByColor("G", true));

}
function fx(){ 
    
    /* an even number caused an overflow on lands, 
    remove one from a color at random. (ignoring those with 0 symbols) */
    var elements = ["W", "U", "B", "R", "G"];
    var t = 0;
    var x = 0;
    var l = [];
    for(var i = 0; i<5; i++) {
        t = parseInt(getVal2(getElementByColor(elements[i], false)));
        if (t != 0) {
            l[x] = elements[i];
            x++;
        }
    }
    var z = Math.floor(Math.random() * l.length);
    var el = l[z];
    t = getVal(getElementByColor(l[z], true));
    setVal(getElementByColor(l[z],true), t - 1);
}
function calc2(){
    var elements = ["W", "U", "B", "R", "G"];
    var s = 0;
    var c;
    for(var i=0;i<5;i++){
        c = elements[i];
        s = getVal2(getElementByColor(c, false));
        calculate(c,s);
    }
    if (totalManaSymbolsL() > getVal("lnd")){
        fx();
    }
}
function calc() { /* Please deprecate */
    var symbols = getVal2(getElementByColor("W", false));
    var color = "W";
    calculate(color, symbols);
    symbols = getVal2(getElementByColor("U", false));
    color = "U";
    calculate(color, symbols);
    symbols = getVal2(getElementByColor("B", false));
    color = "B";
    calculate(color, symbols);
    symbols = getVal2(getElementByColor("R", false));
    color = "R";
    calculate(color, symbols);
    symbols = getVal2(getElementByColor("G", false));
    color = "G";
    calculate(color, symbols);
    if (totalManaSymbolsL() > getVal("lnd")){
        fx();
    }
}
function rst2(){
    var elements = ["W", "U", "B", "R", "G"];
    var c;
    for(var i=0;i<5;i++){
        c = elements[i];
        setVal2(getElementByColor(c,false),0);
        setVal(getElementByColor(c,true),0);
    }
}
function rst(){ /* Please deprecate */
    setVal2(getElementByColor("W", false), 0);
    setVal2(getElementByColor("U", false), 0);
    setVal2(getElementByColor("B", false), 0);
    setVal2(getElementByColor("R", false), 0);
    setVal2(getElementByColor("G", false), 0);
    setVal(getElementByColor("W", true), 0);
    setVal(getElementByColor("U", true), 0);
    setVal(getElementByColor("B", true), 0);
    setVal(getElementByColor("R", true), 0);
    setVal(getElementByColor("G", true), 0);

}
/**
 * void calculate(str color, int symbols)
 * str color - either "W", "U", "B", "R", "G"
 * int symbols - number of symbols for given color
 *
 * accesses total mana symbols and land count
 * calculates by rounding the value of (symbols * lands / totalSymbols)
 *
 */
function calculate(color, symbols) {
    var id = document.getElementById("land");
    lands = parseInt(id.value);
    var sources = Math.round(getVal2(getElementByColor(color, false)) * lands / totalManaSymbols());
    if (totalManaSymbols() == 0){
        sources = 0;
    }
    if (isNaN(sources)){
        sources = 0;
    }
    var element = getElementByColor(color, true);
    setVal(element, sources);
}
/**
 * str getElementByColor2(str color, bool isSource)
 * str color - either "W", "U", "B", "R", "G"
 * bool isSource - whether we are returning the id for source or symbol
 * return: str - id of the element
 *
 * Improved function
 */
function getElementByColor2(color, isSource){
    var symbols = {
        W: "whiteSym", U: "blueSym", B: "blackSym",
        R: "redSym", G: "greenSym"
    };
    var sources = {
        W: "whiteSource", U: "blueSource", B: "blackSource",
        R: "redSource", G: "greenSource"
    };
    return (isSource) ? sources[color] : symbols[color];
}
/**
 * str getElementByColor(str color, bool isSource)
 * str color - either "W", "U", "B", "R", "G"
 * bool isSource - whether we are returning the id for source or symbol
 * return: str - id of the element
 */
function getElementByColor(color,isSource) { /* Please deprecate */
    switch(color)
    {
        case "W":
            if (isSource)
                return "whiteSource";
            else
                return "whiteSym";
            break;
        case "U":
            if (isSource)
                return "blueSource";
            else
                return "blueSym";
            break;
        case "B":
            if (isSource)
                return "blackSource";
            else
                return "blackSym";
            break;
        case "R":
            if (isSource)
                return "redSource";
            else
                return "redSym";
            break;
        case "G":
            if (isSource)
                return "greenSource";
            else
                return "greenSym";
            break;
        default:
            return false;
    }

}
function onChng(val){
    setVal("lnd", val);
    calc();
}
function clr(element){
    setVal2(element, "");
}
