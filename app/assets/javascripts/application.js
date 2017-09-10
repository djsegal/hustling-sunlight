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
//= require rails-ujs
//= require fullpage
//= require turbolinks
//= require_tree .

$(document).ready(function() {
  $('#fullpage').fullpage({
    controlArrows: false,
    continuousVertical: true,
    loopHorizontal: false
  });
});

$(document).ready(function() {
  diagonal();
  fixIosHeight();
  toggleVerticalScroll();
});

$(window).resize(function() {
  diagonal();
  fixIosHeight();
  toggleVerticalScroll();

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

var toggleVerticalScroll = function() {
  var wWidth = $(window).width();

  $.fn.fullpage.setAllowScrolling( wWidth < 1500 );
};

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
  var wHeight = $(window).height();
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
    } else if ( e.which == 39 ) {
      keyCode = 40;
    }
  } else {
    if ( e.which == 38 ) {
      keyCode = 37;
    } else if ( e.which == 40 ) {
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
$('html').bind(mousewheelevt, function(e){
  var wWidth = $(window).width();
  if ( wWidth < 1500 ) { return; }

  if ( isTriggering ) { return; }
  isTriggering = true;

  var evt = window.event || e //equalize event object
  evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
  var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

  var wWidth = $(window).width();

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

});
