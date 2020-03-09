import $ from 'jquery';
import AOS from 'aos';

window.jQuery = $;
window.$ = $;

console.log(this);
$(document).ready(function() {
  $('button').click(function() {
    $('button').removeClass('active');
    $(this).addClass('active');
  });
});



$(document).ready(function(){
  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 500,
    once: true
  }
          );
  if($(window).width() < 768) {
    AOS.init({
      disable: true,
      once: false,
    }
            );
  }
}
                 );

$(document).ready(function() {
  $('.drop-b').on('hide.bs.dropdown', function() {
    $('.drop-a').html(
      '<div class="d-flex align-items-center justify-content-between width-100"><span>All Categories</span><i class="fa fa-caret-right" aria-hidden="true"></i></div>'
    );
  });
  $('.drop-b').on('show.bs.dropdown', function() {
    $('.drop-a').html(
      '<div class="d-flex align-items-center justify-content-between width-100"><span>All Categories</span><i class="fa fa-caret-down" aria-hidden="true"></i></div>'
    );
  });
});

$(document).ready(function() {
  // Add minus icon for collapse element which is open by default
  $('.collapse.show').each(function() {
    $(this)
      .prev('.btn-trans')
      .find('.fa')
      .addClass('fa-caret-down')
      .removeClass('fa-caret-right');
  });

  // Toggle plus minus icon on show hide of collapse element
  $('.collapse')
    .on('show.bs.collapse', function() {
      $(this)
        .prev('.btn-trans')
        .find('.fa')
        .removeClass('fa-caret-right')
        .addClass('fa-caret-down');
    })
    .on('hide.bs.collapse', function() {
      $(this)
        .prev('.btn-trans')
        .find('.fa')
        .removeClass('fa-caret-down')
        .addClass('fa-caret-right');
    });
});

$(document).ready(function() {
  var showChar = 120;
  var ellipsestext = "...";
  var moretext = "Read More";
  $('.more').each(function() {
    var content = $(this).html();

    if(content.length > showChar) {

      var c = content.substr(0, showChar);
      var h = content.substr(showChar-1, content.length - showChar);

      var html = c + '<span class="moreelipses">'+ellipsestext+'</span>&nbsp;<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">'+moretext+'</a></span>';

      $(this).html(html);
    }

  });
});


function adjust_height(){

  var currentTallest = 0,
   currentRowStart = 0,
   rowDivs = new Array(),
   $el,
   topPosition = 0;

 $('.equal:visible').each(function() {

   $el = $(this);
   topPosition = $el.position().top;

   if (currentRowStart != topPosition) {

   // we just came to a new row.  Set all the heights on the completed row
   for (let currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }

   // set the variables for the new row
   rowDivs.length = 0; // empty the array
   currentRowStart = topPosition;
   currentTallest = $el.height();
   rowDivs.push($el);

   } else {

   // another div on the current row.  Add it to the list and check if it's taller
   rowDivs.push($el);
   currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

  }

  // do the last row
   for (let currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
   rowDivs[currentDiv].height(currentTallest);
   }
});

}

if($(".equal").length>0){
adjust_height();

$(window).resize( function(){
setTimeout( function(){
  $('.equal').css({ height: '100%' });
  adjust_height();
  // console.log('adjust_height()');
}, 500);
});


$(document).ready(function() {
adjust_height();

});
}

// // AOS
$(document).ready(function() {
  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 500,
    once: true,
    disable() {
      const maxWidth = 768;
      return window.innerWidth < maxWidth;
    },
    // disable: 'mobile',
  });
  if ($(window).width() < 768) {
    AOS.init({
      disable: true,
      once: false,
    });
  }
});