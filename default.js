/*
#12/2/2011
*Initial Release as Windows Appx App
*
#10/25/2018
* Updated for web and added to budzique.com/mtg.
* Added web-app capibility for iOS (tap share and tap add to home screen in safari)
* Revised input method to not be tedious (previously you had to tap buttons to add symbols and could not go backwards so only reset to 0 would help) by adding forms instead
* combat erronious updates by checking for 0. (TODO: fix for blank form causing NaN)
* Land slider will now update calculation on slide.
* When even number of mana symbols produce 1 additional land than desired (such as 8 forest and 8 plains when you only wanted 15 lands) one land will now be removed at random.
* Land slider now has numeric output (This was previously removed to hide the additional land bug fixed above)
*/
var gId;
var gElements = ["W", "U", "B", "R", "G"];
function getInner(iElement) { 
    gId = document.getElementById(iElement);
    return eval(gId.innerHTML);
}
function setInner(iElement, val) { 
    gId = document.getElementById(iElement);
    gId.innerHTML = val;
}
function getVal(iElement) {
    gId = document.getElementById(iElement);
    return eval(gId.value);
}
function setVal(iElement, val) {
    gId = document.getElementById(iElement);
    gId.value = val;
}
function totalManaSymbols2() {
    var r = 0;
    for(var i=0;i<5;i++){
        r += getVal(getElementByColor2(gElements[i], false));
    }
    return r;
}
function totalManaSources2() {
    var r = 0;
    for(var i=0;i<5;i++){
        r += getInner(getElementByColor2(gElements[i], true));
    }
    return r;
}
/**
 * void fx()
 * 
 * An even number of symbols with odd lands caused an overflow on lands, 
 * remove one from a color at random. (ignoring those with 0 symbols)
 *
 */
function fx(){ 
    var t = 0;
    var x = 0;
    var l = [];
    for(var i = 0; i<5; i++) {
        t = parseInt(getVal(getElementByColor2(gElements[i], false)));
        if (t != 0) {
            l[x] = gElements[i];
            x++;
        }
    }
    var z = Math.floor(Math.random() * l.length);
    var el = l[z];
    t = getInner(getElementByColor2(l[z], true));
    setInner(getElementByColor2(l[z],true), t - 1);
}
function calc2(){
    var s = 0;
    var c;
    for(var i=0;i<5;i++){
        c = gElements[i];
        s = getVal(getElementByColor2(c, false));
        calculate(c,s);
    }
    if (totalManaSources2() > getInner("lnd")){
        fx();
    }
}
function rst(){
    var c;
    for(var i=0;i<5;i++){
        c = gElements[i];
        setVal(getElementByColor2(c,false),0);
        setInner(getElementByColor2(c,true),0);
    }
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
    var lands = parseInt(getInner("lnd"));
	var totSym = totalManaSymbols2();
    var sources = Math.round(getVal(getElementByColor2(color, false)) * lands / totSym);
    if (totSym == 0){
        sources = 0;
    }
    if (isNaN(sources)){
        sources = 0;
    }
    setInner(getElementByColor2(color, true), sources);
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

function onChng(val){
    setInner("lnd", val);
    calc2();
}
function clr(iElement){
    setVal(iElement, "");
}
