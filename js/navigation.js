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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analytics
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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analytics
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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analytics
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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analytics
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
                //$("#register .slider-text").html("כניסה להצבעה");
                $("#register #registerSingle .slidein .slider-text").html(registerTextHtml);
                // registerWishTextInterval = setInterval(function() {
                initWishText($("#register #registerSingle .slidein .slider-text"));
                //  }, 3500);
                $(".slide.btn").show();
                stopAlertRegisterGoingClose();
                $(".live").hide();
                ga('send', 'pageview', '/TNS_Votes_CI'); //for google analytics
                $("#register .slider-text").removeClass("notRegistered");
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
                //$("#register .slider-text").html("כניסה להצבעה");
                $("#register #registerBattle .slidein .slider-text").html(registerTextHtml);
                //registerWishTextInterval = setInterval(function() {
                initWishText($("#register #registerBattle .slidein .slider-text"));
                // }, 3500);
                $(".slide.btn").show();
                ga('send', 'pageview', '/TNS_Votes_CI'); //for google analytics
                $("#register .slider-text").removeClass("notRegistered");
                break;
            case 'notRegister':
                initWaitAnimation();
                clearRegisterWishTextInterval();
                $(".slidein ").addClass('grey');
                $("#register .slider-text").html("<p>ההצבעה החלה</p><p>המתן לביצוע הבא</p>");
                $("#register .slider-text").addClass("notRegistered");
                $(".slide.btn").hide();
                $(".slide").removeClass("register-slide-back");
                $(".register-red-flash").hide();
                stopAlertRegisterGoingClose();
                $(".topMenu").show();
                toggleTopMenu(notRegisterDic);
                $("#register .reMesseg .continue h2").text(notRegisterWaitDic);
                $("#register .reMesseg .continue").slideDown(500);

                //ga('send', 'pageview', '/TNS_Votes_CI');//for google analytics
                break;
            case 'WaitVotePage':
                initWaitAnimation();
                $(".slidein").hide();
                $(".topMenu").show();
                $("#register .reMesseg .continue").slideDown(500);
                $(".live").hide();
                //ga('send', 'pageview', '/TNS_Votes_CI');//for google analytics
                break;
            case 'voteSingle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").show();
                $("#vote .battle").hide();
                $(".live").show();
                ga('send', 'pageview', '/TNS_Votes'); //for google analytics
                resetAnimations();

                break;
            case 'voteBattle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").hide();
                $("#vote .battle").show();
                $(".live").show();
                ga('send', 'pageview', '/TNS_Votes'); //for google analytics
                resetAnimations();

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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analyticsk

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
                ga('send', 'pageview', '/TNS_Splash_page'); //for google analytics

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
                ga('send', 'pageview', '/TNS_Votes_Result'); //for google analytics
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
                ga('send', 'pageview', '/TNS_Votes_Result'); //for google analytics
                break;
            case 'gallery':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#gallery').show();
                gallerySize();
                $(".live").hide();
                ga('send', 'pageview', '/TNS_Program_Votes'); //for google analytics
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

