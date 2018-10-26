function getInner(iElement){return gId=document.getElementById(iElement),eval(gId.innerHTML)}function setInner(e,n){gId=document.getElementById(e),gId.innerHTML=n}function getVal(iElement){return gId=document.getElementById(iElement),eval(gId.value)}function setVal(e,n){gId=document.getElementById(e),gId.value=n}function totalManaSymbols2(){var e,n=0
for(e=0;5>e;e++)n+=getVal(getElementByColor2(gElements[e],!1))
return n}function totalManaSources2(){var e,n=0
for(e=0;5>e;e++)n+=getInner(getElementByColor2(gElements[e],!0))
return n}function fx(){var e,n,t,l=0,o=0,r=[]
for(e=0;5>e;e++)l=parseInt(getVal(getElementByColor2(gElements[e],!1))),0!=l&&(r[o]=gElements[e],o++)
n=Math.floor(Math.random()*r.length),t=r[n],l=getInner(getElementByColor2(t,!0)),setInner(getElementByColor2(t,!0),l-1),console.log("NOTICE: Removed one land from color: "+t+"...")}function calc2(){var e,n,t=0
for(n=0;5>n;n++)e=gElements[n],t=getVal(getElementByColor2(e,!1)),calculate(e,t)
totalManaSources2()>getInner("lnd")&&(console.log("ERROR 1: Sources greater than requested lands ("+totalManaSources2()+">"+getInner("lnd")+") Automatically fixed by removing one at random..."),fx())}function rst(){var e,n
for(n=0;5>n;n++)e=gElements[n],setVal(getElementByColor2(e,!1),0),setInner(getElementByColor2(e,!0),0)}function calculate(e,n){var t,l=parseInt(getInner("lnd")),o=totalManaSymbols2()
t=0==o?0:Math.round(n*l/o),isNaN(t)&&(console.log("ERROR 2: Failed to calculate (divide by zero) was a form blank? ..."),t=0),setInner(getElementByColor2(e,!0),t)}function getElementByColor2(e,n){var t={W:"whiteSym",U:"blueSym",B:"blackSym",R:"redSym",G:"greenSym"},l={W:"whiteSource",U:"blueSource",B:"blackSource",R:"redSource",G:"greenSource"}
return n?l[e]:t[e]}function onChng(e){setInner("lnd",e),calc2()}function clr(e){setVal(e,"")}var gId,gElements=["W","U","B","R","G"]
