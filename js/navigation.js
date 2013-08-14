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
				initWaitAnimation()
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
                $('#register').show();
                $(".topMenu").show();
                if($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                };
                $("#registerSingle").show();
                $("#registerBattle").hide();
                $(".register-red-flash").hide();
                $(".live").hide();
                break;
            case 'registerBattle':
                Navi.hidelogin();
                $('#register').show();
                $(".topMenu").show();
                if($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                }
                $("#registerSingle").hide();
                $("#registerBattle").show();
                $(".register-red-flash").hide();
                $(".live").hide();
                break;
            case 'notRegister':
                $(".slidein ").addClass('grey');
                $(".topMenu").show();
                $(".register-red-flash").hide();
                break;
            case 'WaitVotePage':
                $(".slidein").hide();
                $(".topMenu").show();
                $("#register .reMesseg .continue").show();
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
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").show();
                $("#voteClose .battle").hide();
                $("#vote-close-wait-text-single").show();
                $(".live").hide();
                break;
            case 'voteCloseBattle':
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").hide();
                $("#voteClose .battle").show();
                $("#vote-close-wait-text-battle").show();
                $(".live").hide();
                break;
            case 'resultsSingle':
                Navi.hidelogin();
                $('#results').show();
                $(".topMenu").show();
                $("#results-img-single").show();
                $("#results .single").show();
                $("#results .battle").hide();
                $("#results .single .reMesseg .continue").show();
                $(".live").hide();
                break;
            case 'resultsBattle':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#results').show();
                $("#results .single").hide();
                $("#results .battle").show();
                $("#results .battle .reMesseg .continue").show();
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

//check screen orientation - if screen fliped
function updateOrientation() {
    // alert('in');
    switch (window.orientation) {
        case 0:
            // alert('0');
            $("#horizonal-screen").hide();
            break;

        case -90:
            // alert('-90');
            $("#horizonal-screen").show();
            break;

        case 90:
            // alert('90');
            $("#horizonal-screen").show();
            break;

        case 180:
            // alert('180');
            $("#horizonal-screen").hide();
            break;

    }
}
