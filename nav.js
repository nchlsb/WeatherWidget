function my$(id) {
    return document.getElementById(id);
}

// This function is invoked whenever the navIcon is clicked -- because of the 
// <div id="navIcon" onclick="iconClicked()"> tag in the HTML.
function iconClicked() {
    var navGroup = my$("navGroup");
    var navDisplay = getComputedStyle(navGroup).display;
    if (navDisplay === "block") {
        my$("navGroup").style.display = "none";
    } else {
        my$("navGroup").style.display = "block";
    }
}


// Global declarations **************************************************
var navIcon = my$("navIcon"); // reference to the "navIcon" div

// This is the initial display attribute (block or none) - depends on the 
// size of browser at page refresh time. 
// I had to use getComputedStyle (per internet search) rather than just 
// navIcon.style.display because the initial setting is set by CSS not javaScript.
var iconDisplay = getComputedStyle(navIcon).display;

// We want to have certain behavior when the browser first "gets small" 
// (converts to mobile layout) and when the browser first "gets big" 
// (converts to desktop layout). So we have to track the previous value 
// as well as the current value.
var previousIconDisplay = iconDisplay;
// End of Global declarations **************************************************


// This function is invoked whenever the browser is resized -- because of the 
// <body> tag in the HTML: <body onresize="resize()">
function resize() {
    previousIconDisplay = iconDisplay;
    iconDisplay = getComputedStyle(navIcon).display;

    if (iconDisplay === "none" && previousIconDisplay === "block") {
      
        my$("navGroup").style.display = "block";
    }
    if (iconDisplay === "block" && previousIconDisplay === "none") {
       
        my$("navGroup").style.display = "none";
    }
}




// Wait until all elements exist on the page before trying to reference anything ...
$(document).ready(function () {

    // $('a[href^="#"]') --> thia selector applies to all <a> elements with a href attribute that starts with "#".
    //    Learned this from   http://www.w3schools.com/jquery/jquery_ref_selectors.asp
    $('a[href^="#"]').click(function () {

        // "this" means the element involved in the event, so, the link that was clicked.
      

        // ".hash" refers to the href attribute of the <a> tag. So, if <a href="#page1">
        // was clicked, then "this.hash" has this value: "#page1"
       

        // $ is a jQuery function which returns a jQuery object that references the
        // specified HTML element. For example, $("#content") returns a jQuery
        // object that references the HTML element with id="content". This object also has
        // loads of contextual information (e.g., parent, siblings, and many other properties.

        // So, variable "target" references a jQuery object that the user clicked. 
        var target = $(this.hash);
      
        // This if statement will run if target.length exists.
        if (target.length) {

            // animate is a jQuery function (what_to_do, how_fast_in_millisecs). 
            // "what_to_do" is an object with any number of CSS property/value pairs:
            /*
             * $("button").click(function(){
             $("div").animate({
             left: '250px',
             opacity: '0.5',
             height: '150px'
             },500);
             }); 
             */
            // 
            // scrollTop is a javaScript property of any DOM element. 
            // It measures the number of pixels from the DOM element to the top of 
            // of the DOM element's scrollable parent element.
            //           see http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_scrollleft
            // 
            // .offset() is a function (of any jQuery object) that returns an object with 
            // top and left properties (top/left relative to the document).

            $('html, body').animate({
                // set the scrollTop property (of the browser)
                // to be the top attribute of the element being linked to
                scrollTop: target.offset().top
            }, 900);  // (900 millisecs)
        }

    });

});