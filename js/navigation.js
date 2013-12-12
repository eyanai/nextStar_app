// JavaScript nevigation

var Navi = {

    hidelogin: function () {
        $('header').removeClass('hide');
        $('#login,section').hide();
    },

    goto: function (el) {
        stopWaitAnimation()
        switch (el) {
            case 'login1':
                $(".topMenu").hide();
                break;
            case 'login2':
                $("#slide-container").addClass("login-anim");
                $(".topMenu").hide();
                ga('send', 'pageview', '/Signup page 2'); //login 2
                
                break;
            case 'messageWaitingNoImage':
                initWaitAnimation();
                Navi.hidelogin();
                $('header').show();
                $(".topMenu").hide();
                $('#message').show();
                $('#message .messageImage').hide();
                $('#message .messageNoImage').show();
                $('#message .messageNoImage .continue').show();
                $(".live").hide();
                ga('send', 'pageview', '/Waiting page'); //waiting page
                break;
            case 'messageWaitingWithImage':
                initWaitAnimation();
                Navi.hidelogin();
                $('header').show();
                $(".topMenu").hide();
                $('#message').show();
                $('#message .messageImage').show();
                $('#message .messageImage .continue').show();
                $('#message .messageNoImage').hide();
                $(".live").hide();
                ga('send', 'pageview', '/Waiting page'); //waiting page
                break;
            case 'messageNoImage':
                Navi.hidelogin();
                $('header').show();
                $(".topMenu").hide();
                $(".continue").hide();
                $('#message').show();
                $('#message .messageImage').hide();
                $('#message .messageNoImage').show();
                $(".live").hide();
                ga('send', 'pageview', '/Waiting page'); //waiting page
                break;
            case 'messageWithImage':
                Navi.hidelogin();
                $('header').show();
                $(".topMenu").hide();
                $(".continue").hide();
                $('#message').show();
                $('#message .messageImage').show();
                $('#message .messageNoImage').hide();
                $(".live").hide();
                ga('send', 'pageview', '/Waiting page'); //waiting page
                break;

            case 'registerSingle':
                Navi.hidelogin();
                //toggleTopMenu(registerDic);
                $(".topMenu").show(); //check reut need to remove
                $('#register').show();
                if ($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                };
                $(".slide").removeClass("register-slide-back");
                $("#registerSingle").show();
                $("#registerBattle").hide();
                $(".register-red-flash").hide();
                $("#register #registerSingle .slidein .slider-text").html(registerTextHtml);
                initWishText($("#register #registerSingle .slidein .slider-text"));
                $(".slide.btn").show();
                stopAlertRegisterGoingClose();
                $(".live").hide();
                $("#register .slider-text").removeClass("notRegistered");

                ga('send', 'pageview', '/Checkin: enter vote'); //register
                break;
            case 'registerBattle':
                Navi.hidelogin();
                $('#register').show();
                if ($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                }
                $(".slide").removeClass("register-slide-back");
                $("#registerSingle").hide();
                $("#registerBattle").show();
                $(".register-red-flash").hide();
                stopAlertRegisterGoingClose();
                $(".live").hide();
                 $("#register #registerBattle .slidein .slider-text").html(registerTextHtml);
                initWishText($("#register #registerBattle .slidein .slider-text"));
                $(".slide.btn").show();
                
                $("#register .slider-text").removeClass("notRegistered");

                ga('send', 'pageview', '/Checkin: enter vote'); //register
                break;
            case 'notRegister':
                initWaitAnimation();
                clearRegisterWishTextInterval();
                $(".slidein ").addClass('grey');
                $("#register .slider-text").html("<p>ההצבעה החלה</p><p>המתן לשיר הבא</p>");
                $("#register .slider-text").addClass("notRegistered");
                $(".slide.btn").hide();
                $(".slide").removeClass("register-slide-back");
                $(".register-red-flash").hide();
                stopAlertRegisterGoingClose();
                $(".topMenu").show();
                toggleTopMenu(notRegisterDic);
                $("#register .reMesseg .continue h2").text(notRegisterWaitDic);
                $("#register .reMesseg .continue").slideDown(500);

                ga('send', 'pageview', '/Checkin: vote missed');//for google analytics
                break;
            case 'WaitVotePage':
                initWaitAnimation();
                $(".slidein").hide();
                $(".topMenu").show();
                $("#register .reMesseg .continue").slideDown(500);
                $(".live").hide();
                ga('send', 'pageview', '/Checkin: checkedin'); //registered
                break;
            case 'voteSingle':
                initWaitAnimation();
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").show();
                $("#vote .battle").hide();
                $(".live").show();
                
                resetAnimations();
                ga('send', 'pageview', '/Vote'); //registered
                
                break;
            case 'voteBattle':
                initWaitAnimation();
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").hide();
                $("#vote .battle").show();
                $(".live").show();
                 resetAnimations();

                ga('send', 'pageview', '/Vote'); //registered

                break;
            case 'voteCloseSingle':
                initWaitAnimation();
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").show();
                $("#voteClose .battle").hide();
                $("#vote-close-wait-text-single").show();
                $(".live").hide();
                $("#voteClose .continue").show();
                ga('send', 'pageview', '/Song ended'); //vote close

                break;
            case 'voteCloseBattle':
                initWaitAnimation();
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").hide();
                $("#voteClose .battle").show();
                $("#vote-close-wait-text-battle").show();
                $("#voteClose .continue").show();
                $(".live").hide();
                 ga('send', 'pageview', '/Song ended'); //vote close

                break;
            case 'resultsSingle':
                initWaitAnimation();
                Navi.hidelogin();
                $('#results').show();
                $(".topMenu").show();
                $("#results-img-single").show();
                $("#results .single").show();
                $("#results .battle").hide();
                $("#results .single .reMesseg .continue").slideDown(500);
                $(".live").hide();
                ga('send', 'pageview', '/Vote Results page'); //for google analytics
                break;
            case 'resultsBattle':
                initWaitAnimation();
                Navi.hidelogin();
                $(".topMenu").show();
                $('#results').show();
                $("#results .single").hide();
                $("#results .battle").show();
                $("#results .battle .reMesseg .continue").slideDown();
                $(".live").hide();
                ga('send', 'pageview', '/Vote Results page'); //for google analytics
                break;
            case 'gallery':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#gallery').show();
                gallerySize();
                $(".live").hide();
                ga('send', 'pageview', '/Results'); //slider
                break;
            case "errorPage":
                Navi.hidelogin();
                $(".live").hide();
                $('#error').show();
                break;
            default:
                Navi.hidelogin();
        }
    }



}


var supportsOrientationChange = "onorientationchange" in window;
var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";



window.addEventListener(orientationEvent,
   function () {
   //prevent android zoom   
   $('meta[name=viewport]').attr("content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
       //  $("#horizonal-screen").show();
       var isPortrait;
       setTimeout(function () {
           //alert("work");
           isPortrait = (window.innerHeight / window.innerWidth) > 1;
           //alert(window.isPortrait);	
           switch (isPortrait) {
               case true:

                   $("#horizonal-screen").hide();
                   break;

               case false:
                   $("#horizonal-screen").show();
                   break;
           }
       }, 500)
   },
   false
);

