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
//= require_tree .

defaultWaitTime = 1250;

$(document).ready(function() {
  $('#fullpage').fullpage({
    controlArrows: false,
    continuousVertical: true,
    continuousHorizontal: true,
    continuousHorizontalKey: 'aHVzdGxpbmdzdW5saWdodC54eXpfaGg2WTI5dWRHbHVkVzkxYzBodmNtbDZiMjUwWVd3PTFHQQ=='
  });
});

$(document).ready(function() {
  iosInnerHeight(true);
  diagonal();
  fixIosHeight();
});

$(document).ready(function() {
  $(".cs-body").addClass("cs-visible");

  var wWidth = $(window).width();

  if ( wWidth < 1500 ) {
    $.fn.fullpage.silentMoveTo(1, 0);
    $.fn.fullpage.silentMoveTo(startIndex+1, 0);
  } else {
    $.fn.fullpage.silentMoveTo(1, startIndex);
  }

  splitClass = $("body")[0].classList[0].split("-");

  if ( splitClass[2] <= 1 && splitClass[3] == 0 ) {
    $(".cs-links").addClass("cs-zero-opacity");
  } else {
    $(".cs-links").removeClass("cs-zero-opacity");
  }

  $(".cs-links").addClass("js-has-loaded");
  $(".cs-loader").addClass("cs-hidden");
});

$(document).ready(function() {
  $.fn.fullpage.setAllowScrolling(false);
  $(window).resize();

  if ( startIndex !== 0 ) {
    var wWidth = $(window).width();

    if ( wWidth < 1500 ) {
      if ( $(".section.active .slide.active .cs-last-box").css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i) ) {
        $(".cs-prev.cs-text-inverse").removeClass("cs-zero-opacity")
        $(".cs-next.cs-text-primary").removeClass("cs-zero-opacity")
      } else {
        $(".cs-prev.cs-text-primary").removeClass("cs-zero-opacity")
        $(".cs-next.cs-text-inverse").removeClass("cs-zero-opacity")
      }
    } else {
      if ( $(".section.active .slide.active .cs-first-box").css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i) ) {
        $(".cs-prev.cs-text-primary").removeClass("cs-zero-opacity")
        $(".cs-next.cs-text-inverse").removeClass("cs-zero-opacity")
      } else {
        $(".cs-prev.cs-text-inverse").removeClass("cs-zero-opacity")
        $(".cs-next.cs-text-primary").removeClass("cs-zero-opacity")
      }
    }
  }
});

$(window).resize(function() {
  iosInnerHeight(true);
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
  var wHeight = iosInnerHeight();

  $('.diagonal').css('left', 0);
  $('.diagonal').css('top', 0);
  $('.diagonal').css('margin-left', 0);
  $('.diagonal').css('margin-top', 0);

  $('.diagonal').css('border-right-width', wWidth);
  $('.diagonal').css('border-top-width', wHeight);
};

var fixIosHeight = function() {

  var wWidth = $(window).width();
  var wHeight = iosInnerHeight();
  var wMin = Math.min(wWidth,wHeight);

  $('.cs-title-card').css("height", wHeight);
  $('.cs-info-box').css("height", wHeight/2);
  $('.cs-extra-box').css("height", wHeight/10);

  var curMargin;

  curMargin = wHeight * (25/100);
  $('.cs-info-box').css("margin-top", curMargin);
  $('.cs-info-box').css("margin-bottom", curMargin);

  curMargin = wHeight * (75/100) - wMin * (1/100);
  $('.cs-book-box').css("margin-top", curMargin);
  $('.cs-book-box').css("margin-bottom", curMargin);

  curMargin = wHeight * (15/100) + wMin * (1/100);
  $('.cs-email-box').css("margin-top", curMargin);
  $('.cs-email-box').css("margin-bottom", curMargin);

};

function disableAutoplay(selfToggle) {
  if ( selfToggle ) {
    $(".fa-pause").addClass("fa-play")
    $(".fa-play").removeClass("fa-pause")
  }

  clearInterval(playTimer);
  playTimer = undefined;
}

$(document).keypress(function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  return false;
});

$(document).keyup(function(e) {
  stealKeys(e, "keyup");
});

isHolding = false;

$(document).keydown(function(e) {
  if (isHolding) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  stealKeys(e, "keydown");

  isHolding = true;

  setTimeout(function(){
    isHolding = false;
  }, defaultWaitTime);
});

function customTrigger(curAction, keyCode) {
  $(document).trigger({ type: curAction, which: keyCode });

  refreshGUI();
}

function refreshGUI() {
  $(".cs-alert").addClass("cs-zero-opacity");
  $(".cs-prev").addClass("cs-zero-opacity");
  $(".cs-next").addClass("cs-zero-opacity");

  preSplitClass = $("body")[0].classList[0].split("-");

  setTimeout(function(){
    postSplitClass = $("body")[0].classList[0].split("-");

    if ( postSplitClass[2] == 0 && postSplitClass[3] == 0 ) {
      $(".cs-links").addClass("cs-zero-opacity");
    } else if ( Math.abs(parseInt(preSplitClass[2]) - parseInt(postSplitClass[2])) > 1 ) {
      if ( parseInt(postSplitClass[2]) > 1 ) {
        $(".cs-links").removeClass("cs-zero-opacity");
      } else {
        $(".cs-links").addClass("cs-zero-opacity");
      }
    } else {
      $(".cs-links").removeClass("cs-zero-opacity");
    }

    var tmpText = $(".section.active .slide.active").text().trim().split(/\s+/g).join("-");

    if ( tmpText.indexOf("Scroll") > -1 && tmpText.indexOf("Scroll") > -1 ) {
      curPath = "/";
    } else {
      curPath = '/' + tmpText;
    }

    window.history.replaceState( {} , 'Hustling Sunlight', curPath );

    ga('set', 'page', curPath);
    ga('send', 'pageview');

    isTriggering = false;
  }, defaultWaitTime);
}

function stealKeys(e, curAction) {
  var wWidth = $(window).width();
  var keyCode = -1;

  if ( wWidth < 1500 ) {
    if ( e.which == 37 ) {
      keyCode = 38;
    } else if ( e.which == 39 || e.which == 32 || e.which == 13 ) {
      keyCode = 40;
    } else if ( e.which == 38 || e.which == 40 ) {
      refreshGUI();
    }
  } else {
    if ( e.which == 38 ) {
      keyCode = 37;
    } else if ( e.which == 40 || e.which == 32 || e.which == 13 ) {
      keyCode = 39;
    } else if ( e.which == 37 || e.which == 39 ) {
      refreshGUI();
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

  e.stopImmediatePropagation();
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
  event.stopImmediatePropagation();
});

function copyToClipboard() {
  disableAutoplay(true);

  var $temp = $("<input>");
  $("body").append($temp);
  var tmpText = $(".section.active .slide.active").text().trim().split(/\s+/g).join("-");
  tmpText = window.location.origin + "/" + tmpText;
  $temp.val(tmpText).select();

  var wWidth = $(window).width();

  if ( wWidth < 1500 ) {
    if ( $(".section.active .slide.active .cs-last-box").css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i) ) {
      $(".cs-alert-primary").removeClass("cs-zero-opacity")
    } else {
      $(".cs-alert-inverse").removeClass("cs-zero-opacity")
    }
  } else {
    if ( $(".section.active .slide.active .cs-first-box").css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i) ) {
      $(".cs-alert-primary").removeClass("cs-zero-opacity")
    } else {
      $(".cs-alert-inverse").removeClass("cs-zero-opacity")
    }
  }

  document.execCommand("copy");
  $temp.remove();

  setTimeout(function(){
    $(".cs-alert").addClass("cs-zero-opacity")
  }, 2.5 * defaultWaitTime);
}

function goHome() {
  disableAutoplay(true);

  $("#fullpage").addClass("cs-zero-opacity");
  $('.cs-loader').addClass('cs-zero-opacity');
  $('.cs-loader').removeClass('cs-hidden');

  $('.cs-links').addClass('cs-zero-opacity');
  $(".cs-alert").addClass("cs-zero-opacity");
  $(".cs-prev").addClass("cs-zero-opacity");
  $(".cs-next").addClass("cs-zero-opacity");

  setTimeout(function(){
    $('.cs-loader').removeClass('cs-zero-opacity');
    $.fn.fullpage.silentMoveTo(1, 0)

    setTimeout(function(){
      window.history.replaceState( {} , 'Hustling Sunlight', '/' );

      $('.cs-loader').addClass('cs-zero-opacity');
      $("#fullpage").removeClass("cs-zero-opacity");

      setTimeout(function(){
        $('.cs-loader').addClass('cs-hidden');
      }, 1.5*defaultWaitTime);
    }, 1.5*defaultWaitTime);
  }, 1/2 * defaultWaitTime);
}

playTimer = undefined;

function togglePlay() {
  if ( $(".fa-play").length == 2 && $(".fa-pause").length == 0 && playTimer == undefined ) {
    setTimeout(function(){
      nextButtonClick()
      playTimer = setInterval(nextButtonClick, 4000);
    }, 100);
  }

  if ( $(".fa-pause").length == 2 && $(".fa-play").length == 0 && playTimer != undefined ) {
    disableAutoplay();
  }

  $(".fa-play, .fa-pause").toggleClass("fa-play fa-pause");
}
