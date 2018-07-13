////////////////////////////////////////////////////////////////////////////////////////////////////
// Registration form validation
(function(){
  $(function() {
    $("div.text-danger").attr('hidden', true);
    $("div.text-danger.confirm-password").attr('hidden', true);
    var is_error = false;
    $("#register-form").on("submit", function(e){
      is_error = false;
      $.each($('.required'), function(){
        if($(this).val()==''){
          $(this).parent().addClass('has-error');
          $("div.text-danger.confirm-password").attr('hidden', true);
          $(this).next('div.text-danger').attr('hidden', false);
          e.preventDefault();
          is_error = true;
        } else {
          if($('#confirm-password').val() != $('#password').val()) {
            $(this).parent().addClass('has-error');
            $("div.text-danger").attr('hidden', true);
            $("div.text-danger.confirm-password").attr('hidden', false);
            e.preventDefault();
            is_error = true;
          } else if ($(this).parent().hasClass('has-error')) {
            $(this).parent().removeClass('has-error').addClass('has-success');
            $(this).next('div.text-danger').attr('hidden', true);
            $("div.text-danger.confirm-password").attr('hidden', true);
          }
        }
      });
      if(is_error)
        return false;
    });
  });

})();
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Login form validation
$(function() {
  $("div.text-danger").attr('hidden', true);
  var is_error = false;
  $("#login-form").on("submit", function(e){
    is_error = false;
    $.each($('.required'), function(){
      if($(this).val()==''){
        $(this).parent().addClass('has-error');
        $(this).next('div.text-danger').attr('hidden', false);
        e.preventDefault();
        is_error = true;
      } else if ($(this).parent().hasClass('has-error')) {
        $(this).parent().removeClass('has-error').addClass('has-success');
        $(this).next('div.text-danger').attr('hidden', true);
      }
    });
    if(is_error)
      return false;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Home page
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $(".menubar").addClass('meffect');
  } else {
    $(".menubar").removeClass('meffect');
  }
});


function openNav2() {
  document.getElementById("rightside").style.width = "450px";
  document.body.style.backgroundColor = "rgba(168,232,226, 0.7)";
}
function closeNav2() {
  document.getElementById("rightside").style.width = "0";
  document.body.style.backgroundColor = "white";
}

$(function(){
  $('.dropdown').hover(function() {
    $(this).addClass('open');
  },
  function() {
    $(this).removeClass('open');
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////

$(function() {
    $('[id^=detail-]').show();
    $('.toggle').click(function() {
        $input = $( this );
        $target = $('#'+$input.attr('data-toggle'));
        $target.slideToggle();
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////
// Change password
(function(){
  $(function() {
    $("div.text-danger").attr('hidden', true);
    $("div.text-danger.confirm-password").attr('hidden', true);
    var is_error = false;
    $("#change-password-form").on("submit", function(e){
      is_error = false;
      $.each($('.required'), function(){
        if($(this).val()==''){
          $(this).parent().addClass('has-error');
          $("div.text-danger.confirm-password").attr('hidden', true);
          $(this).next('div.text-danger').attr('hidden', false);
          e.preventDefault();
          is_error = true;
        } else {
          if($('#confirmPassword').val() != $('#newPassowrd').val()) {
            $(this).parent().addClass('has-error');
            $("div.text-danger").attr('hidden', true);
            $("div.text-danger.confirm-password").attr('hidden', false);
            e.preventDefault();
            is_error = true;
          } else if ($(this).parent().hasClass('has-error')) {
            $(this).parent().removeClass('has-error').addClass('has-success');
            $(this).next('div.text-danger').attr('hidden', true);
            $("div.text-danger.confirm-password").attr('hidden', true);
          }
        }
      });
      if(is_error)
        return false;
    });
  });

})();


///////////////////////////////////////////////////////////////////////////////////////////////////