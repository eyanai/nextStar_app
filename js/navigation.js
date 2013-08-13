// JavaScript nevigation

var Navi = {

    hidelogin: function () {
        $('header').removeClass('hide');
        $('#login,section').hide();
    },

    goto: function (el) {
        switch (el) {
            case 'login1':
                //
                break;
            case 'login2':
                $("#slide-container").addClass("login-anim");
                break;
            case 'messageWaitingNoImage':
                Navi.hidelogin();
                $('header').show();
                $('#message').show();
                $('#message .messageImage').hide();
                $('#message .messageNoImage').show();
                $('#message .messageNoImage .continue').show();
                break;
            case 'messageWaitingWithImage':
                Navi.hidelogin();
                $('header').show();
                $('#message').show();
                $('#message .messageImage').show();
                $('#message .messageImage .continue').show();
                $('#message .messageNoImage').hide();
                break;
            case 'messageNoImage':
                Navi.hidelogin();
                $('header').show();
                $(".continue").hide();
                $('#message').show();
                $('#message .messageImage').hide();
                $('#message .messageNoImage').show();
                break;
            case 'messageWithImage':
                Navi.hidelogin();
                $('header').show();
                $(".continue").hide();
                $('#message').show();
                $('#message .messageImage').show();
                $('#message .messageNoImage').hide();
                break;
            //       
            case 'registerSingle':
                Navi.hidelogin();
                $('#register').show();
                $(".topMenu").show();
                if ($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                };
                $("#registerSingle").show();
                $("#registerBattle").hide();
                $(".register-red-flash").hide();
                break;
            case 'registerBattle':
                Navi.hidelogin();
                $('#register').show();
                $(".topMenu").show();
                if ($(".slidein ").hasClass('grey')) {
                    $(".slidein ").removeClass('grey');
                }
                $("#registerSingle").hide();
                $("#registerBattle").show();
                $(".register-red-flash").hide();
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
                break;
            case 'voteSingle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").show();
                $("#vote .battle").hide();
                break;
            case 'voteBattle':
                Navi.hidelogin();
                $('#vote').show();
                $(".topMenu").show();
                $("#vote .single").hide();
                $("#vote .battle").show();
                break;
            case 'voteCloseSingle':
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").show();
                $("#voteClose .battle").hide();
                $("#vote-close-wait-text-single").show();
                break;
            case 'voteCloseBattle':
                Navi.hidelogin();
                $('#voteClose').show();
                $(".topMenu").show();
                $("#voteClose .single").hide();
                $("#voteClose .battle").show();
                $("#vote-close-wait-text-battle").show();
                break;
            case 'resultsSingle':
                Navi.hidelogin();
                $('#results').show();
                $(".topMenu").show();
                $("#results-img-single").show();
                $("#results .single").show();
                $("#results .battle").hide();
                $("#results .single .reMesseg .continue").show();
                break;
            case 'resultsBattle':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#results').show();
                $("#results .single").hide();
                $("#results .battle").show();
                $("#results .battle .reMesseg .continue").show();
                break;
            case 'gallery':
                Navi.hidelogin();
                $(".topMenu").show();
                $('#gallery').show();
                gallerySize();
                break;
            default:
                Navi.hidelogin();
        }
    }



}

//check screen orientation - if screen fliped
function updateOrientation() {
    switch (window.orientation) {
        case 0:
            $("#horizonal-screen").hide();
            break;

        case -90:
            $("#horizonal-screen").show();
            break;

        case 90:
            $("#horizonal-screen").show();
            break;

        case 180:
            $("#horizonal-screen").hide();
            break;

    }
}
