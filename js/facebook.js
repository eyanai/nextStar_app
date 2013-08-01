var appID = "543975688973172";

//fb user details
var user={
    id:null,
    userName:null,
    gender:null,
    profilePic:null
}
var myLocation = window.location.href;

/*FB._https = (window.location.protocol == "https:");*/
    FB._https = true; //check fb init

    FB.init({ appId: appID, status: true, cookie: true, oauth: true })

   
    function attachEventsFacebook(){
        $(".logFb").on("click touchend", loginFb);       
    }
    function loginFb() {        
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {

                console.log("connect");

                saveData();

            }
            else if (response.status === 'not_authorized' || response.status == "unknown") {
                console.log("not connect");
                // alert(" response.status " + response.status);
                FB.login(function (response) {
                    if (response.authResponse) {
                        isConnect = true;
                        console.log("now connect");
                        
                        saveData();
                    }
                    else {
                        console.log("facebook login failed in inviteClicked");
                        console.log(response);
                    }
                }, { redirect_uri: myLocation }); //, { scope: 'email' });
            }

        });

        
       
    }
    function saveData(){
        
            FB.api('/me', function (response) {
                
                user.id = response.id;
                user.userName = response.name;
                user.gender = response.gender;
                user.profilePic = "https://graph.facebook.com/" + user.id + "/picture";
                alert(user.userName+user.gender);
            });
        
    }