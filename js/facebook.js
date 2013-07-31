var appID = "543975688973172";

/*FB._https = (window.location.protocol == "https:");*/
    FB._https = true; //check fb init

    FB.init({ appId: appID, status: true, cookie: true, oauth: true })

   
    function attachEventsFacebook(){
        $(".logFb").on("click", loginFb);
    }
    function loginFb() {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {

                alert("connect");

            }
            else if (response.status === 'not_authorized' || response.status == "unknown") {
                alert("not connect");
                // alert(" response.status " + response.status);
                FB.login(function (response) {
                    if (response.authResponse) {
                        alert("now connect");
                        introMan_.sendInviteRequest(response);
                    }
                    else {
                        console.log("facebook login failed in inviteClicked");
                    }
                }, { scope: 'email' });
            }

        });
    }