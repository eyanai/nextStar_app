// JavaScript nevigation

var Navi = {

    hidelogin: function() {
        $('header').removeClass('hide');
        $('#login,section').hide();
    },

    goto: function(el) {
        stopWaitAnimation()
        switch(el) {
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
                break;

            case 'registerSingle':
                Navi.hidelogin();
                //toggleTopMenu(registerDic);
                $(".topMenu").show(); //check reut need to remove
                $('#register').show();


                if($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                };
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
                break;
            case 'registerBattle':
                Navi.hidelogin();
                $('#register').show();
                if($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                }
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
                break;
            case 'notRegister':
                initWaitAnimation();
                clearRegisterWishTextInterval();
                $(".slidein ").addClass('grey');
                $("#register .slider-text").html("<p>ההצבעה החלה</p><p>המתן לביצוע הבא</p>");
                $(".slide.btn").hide();
                //$(".slide .btn .drag .ui-draggable .regAnim").hide();
                //$(".topMenu").hide();
                $(".topMenu").slideUp(700);
                $(".register-red-flash").hide();
                stopAlertRegisterGoingClose();
                $("#register .reMesseg .continue").slideDown(500); //text was changed to textWaitVote in setOpenRegisterPage()
                break;
            case 'WaitVotePage':
                initWaitAnimation();
                $(".slidein").hide();
                $(".topMenu").show();
                $("#register .reMesseg .continue").slideDown(500);
                $(".live").hide();
                break;
            case 'voteSingle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").show();
                $("#vote .battle").hide();
                $(".live").show();
                break;
            case 'voteBattle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").hide();
                $("#vote .battle").show();
                $(".live").show();
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
                break;
            case 'gallery':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#gallery').show();
                gallerySize();
                $(".live").hide();
                break;
            default:
                Navi.hidelogin();
        }
    }



}


var supportsOrientationChange = "onorientationchange" in window;
var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, 
   function() { 
		setTimeout(function(){
			 window.isPortrait=(window.innerHeight/window.innerWidth)>1;
			 switch (window.isPortrait) {
				 case true:
					 $("#horizonal-screen").hide();
					 break;

				 case false:
					 $("#horizonal-screen").show();
					 break;
			}
		},500)
	}, 
   false
);

