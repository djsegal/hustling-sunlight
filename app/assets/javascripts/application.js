// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require fullpage/fullpage-continuous-scroll
//= require fullpage/jquery-fullpage-extensions
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
  $(".cs-body").addClass("cs-visible");

  $('#fullpage').fullpage({
    controlArrows: false,
    continuousVertical: true,
    continuousHorizontal: true,
    continuousHorizontalKey: 'aHVzdGxpbmdzdW5saWdodC54eXpfaGg2WTI5dWRHbHVkVzkxYzBodmNtbDZiMjUwWVd3PTFHQQ=='
  });

  $(".cs-loading").addClass("cs-hidden");
});

$(document).ready(function() {
  diagonal();
  fixIosHeight();

  $.fn.fullpage.setAllowScrolling(false);
});

$(window).resize(function() {
  diagonal();
  fixIosHeight();

  var wWidth = $(window).width();

  var splitClass = $("body")[0].className.split("-");
  var curRow = parseInt(splitClass[splitClass.length-2]);
  var curCol = parseInt(splitClass[splitClass.length-1]);

  if ( wWidth < 1500 ) {
    if ( curCol == 0 ) {
      return;
    }
  } else {
    if ( curRow == 0 ) {
      return;
    }
  }

  if ( wWidth < 1500 ) {
    $.fn.fullpage.silentMoveTo(1, 0);
    $.fn.fullpage.silentMoveTo(curCol+1, 0);
  } else {
    $.fn.fullpage.silentMoveTo(1, curRow);
  }

});

var diagonal = function() {
  var wWidth = $(window).width();
  var wHeight = $(window).height();

  $('.diagonal').css('left', 0);
  $('.diagonal').css('top', 0);
  $('.diagonal').css('margin-left', 0);
  $('.diagonal').css('margin-top', 0);

  $('.diagonal').css('border-right-width', wWidth);
  $('.diagonal').css('border-top-width', wHeight);
};

var fixIosHeight = function() {

  var wWidth = $(window).width();
  var wHeight = $(window).height() + 1;
  var wMin = Math.min(wWidth,wHeight);

  $('.cs-title-card').css("height", wHeight);
  $('.cs-info-box').css("height", wHeight/2);
  $('.cs-extra-box').css("height", wHeight/10);

  var curMargin;

  curMargin = wHeight * (25/100);
  $('.cs-info-box').css("margin-top", curMargin);
  $('.cs-info-box').css("margin-bottom", curMargin);

  curMargin = wHeight * (75/100) - wMin * (1/100);
  $('.cs-github-box').css("margin-top", curMargin);
  $('.cs-github-box').css("margin-bottom", curMargin);

  curMargin = wHeight * (15/100) + wMin * (1/100);
  $('.cs-book-box').css("margin-top", curMargin);
  $('.cs-book-box').css("margin-bottom", curMargin);

};

$(document).keydown(function(e) {
  stealKeys(e, "keydown")
});

$(document).keyup(function(e) {
  stealKeys(e, "keyup")
});

$(document).keypress(function(e) {
  stealKeys(e, "keypress")
});

function customTrigger(curAction, keyCode) {
  $(document).trigger({ type: curAction, which: keyCode });
  setTimeout(function(){
    isTriggering = false;
  }, 1250);
}

function stealKeys(e, curAction) {
  var wWidth = $(window).width();
  var keyCode = -1;

  if ( wWidth < 1500 ) {
    if ( e.which == 37 ) {
      keyCode = 38;
    } else if ( e.which == 39 || e.which == 32 || e.which == 13 ) {
      keyCode = 40;
    }
  } else {
    if ( e.which == 38 ) {
      keyCode = 37;
    } else if ( e.which == 40 || e.which == 32 || e.which == 13 ) {
      keyCode = 39;
    }
  }

  if ( keyCode == -1 ) {
    return e;
  }

  e.stopImmediatePropagation();

  customTrigger(curAction, keyCode);
}

isTriggering = false;

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
$(document).bind(mousewheelevt, function(e){
  if ( isTriggering ) { return; }
  isTriggering = true;

  var wWidth = $(window).width();

  var evt = window.event || e //equalize event object
  evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
  var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

  if ( wWidth < 1500 ) {
    if(delta > 0) {
      // wheeled up
      customTrigger("keydown", 38);
    }
    else {
      // wheeled down
      customTrigger("keydown", 40);
    }
  } else {
    if(delta > 0) {
      // wheeled up
      customTrigger("keydown", 37);
    }
    else {
      // wheeled down
      customTrigger("keydown", 39);
    }
  }

  e.preventDefault();
});

var lastY;
var lastX;

// reset touch position on touchstart
$(document).bind('touchstart', function (e){
  var currentY = e.originalEvent.touches[0].clientY;
  lastY = currentY;

  var currentX = e.originalEvent.touches[0].clientX;
  lastX = currentX;
});

// get movement and scroll the same way
$(document).bind('touchmove', function (e){
  if ( isTriggering ) { return; }
  isTriggering = true;

  var wWidth = $(window).width();

  var currentY = e.originalEvent.touches[0].clientY;
  var deltaY = currentY - lastY;

  var currentX = e.originalEvent.touches[0].clientX;
  var deltaX = currentX - lastX;

  var delta;
  if ( Math.abs(deltaX) > Math.abs(deltaY) ) {
    delta = -deltaX;
  } else {
    delta = deltaY;
  }

  if ( wWidth < 1500 ) {
    if(delta > 0) {
      // wheeled up
      customTrigger("keydown", 38);
    }
    else {
      // wheeled down
      customTrigger("keydown", 40);
    }
  } else {
    if(delta > 0) {
      // wheeled up
      customTrigger("keydown", 37);
    }
    else {
      // wheeled down
      customTrigger("keydown", 39);
    }
  }

  e.preventDefault();
});

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

$(document).on( "click", ".js-box", function(e) {
  if ( getSelectedText() !== "" ) {
    return;
  }

  if ( isTriggering ) { return; }
  isTriggering = true;

  var wWidth = $(window).width();

  var isFirstBox = e.target.classList.contains("cs-first-box");

  if ( wWidth < 1500 ) {
    if(isFirstBox) {
      // clicked up
      customTrigger("keydown", 38);
    }
    else {
      // clicked down
      customTrigger("keydown", 40);
    }
  } else {
    if(isFirstBox) {
      // clicked up
      customTrigger("keydown", 37);
    }
    else {
      // clicked down
      customTrigger("keydown", 39);
    }
  }

  e.preventDefault();
});

$(document).on( "click", ".js-title-arrow", function(e) {
  if ( getSelectedText() !== "" ) {
    return;
  }

  if ( isTriggering ) { return; }
  isTriggering = true;

  var wWidth = $(window).width();

  var isPrevArrow = e.target.classList.contains("js-prev-arrow");

  if ( wWidth < 1500 ) {
    if(isPrevArrow) {
      // clicked up
      customTrigger("keydown", 38);
    }
    else {
      // clicked down
      customTrigger("keydown", 40);
    }
  } else {
    if(isPrevArrow) {
      // clicked up
      customTrigger("keydown", 37);
    }
    else {
      // clicked down
      customTrigger("keydown", 39);
    }
  }

  e.preventDefault();
});

$(document)[0].addEventListener('mousewheel', function(event) {
  event.preventDefault();
});
