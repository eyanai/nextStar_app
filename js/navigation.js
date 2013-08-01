// JavaScript nevigation

var Navi = {

    hidelogin: function() {
        $('header').removeClass('hide');
        $('#login,section').hide();
    },

    goto: function(el) {
        switch(el) {
            case 'messageNoImage':
                $('header').show();
                $('#login').hide();
                $('#message').show();
                $('#message .messageImage').hide();
                $('#message .messageNoImage').show();
                break;
            case 'messageWithImage':
                $('header').show();
                $('#login').hide();
                $('#message').show();
                $('#message .messageImage').show();
                $('#message .messageNoImage').hide();
                break;
            case 'register':
                Navi.hidelogin();
                $('#register').show();
                break;
            case 'voteSingle':
                Navi.hidelogin();
                $('#vote').show();
                $("#vote .single").show();
                $("#vote .battle").hide();
                break;
            case 'voteBattle':
                Navi.hidelogin();
                $('#vote').show();
                $("#vote .single").hide();
                $("#vote .battle").show();
                break;
            case 'voteCloseSingle':
                Navi.hidelogin();
                $('#voteClose').show();
                $("#vote-close-img-single").hide();
                $("#voteClose .single").show();
                $("#voteClose .battle").hide();
                break;
            case 'voteCloseBattle':
                Navi.hidelogin();
                $('#voteClose').show();
                $("#voteClose .single").hide();
                $("#voteClose .battle").show();
                break;
            case 'resultsSingle':
                Navi.hidelogin();
                $('#results').show();
                $("#results-img-single").show();
                $("#results .single").show();
                $("#results .battle").hide();
                break;
            case 'resultsBattle':
                Navi.hidelogin();
                $('#results').show();
                $("#results .single").hide();
                $("#results .battle").show();
                break;
            case 'gallery':
                Navi.hidelogin();
                $('#gallery').show();
                break;
            default:
                $('section,header').hide();
                $('#login').show();
        }
    }



}

	
