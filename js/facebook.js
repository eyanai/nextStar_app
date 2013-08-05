//var appID = "543975688973172";

//fb user details
var user={
    id:null,
    userName:null,
    gender:null,
    profilePic:null
}
//domain
var myLocation = "http://makosrv1.egoline.co.il/application/index.html";

/*FB._https = (window.location.protocol == "https:");*/
FB._https = true; //check fb init

FB.init({ appId: appID, status: true, cookie: true, oauth: true })

//listener   
//function attachEventsFacebook(){
//    $(".logFb").on("click", loginFb);
//       
//}
    
//check if login fb now
var searchQuery=window.location.search;
if(searchQuery.length>0){
    loginCheck();
}

//login fb
function loginFb(){
     window.location = "https://www.facebook.com/dialog/oauth?client_id=543975688973172&redirect_uri="+myLocation; 
}

//check: if login-> save data
function loginCheck() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            saveData();
        }
        else if (response.status === 'not_authorized' || response.status == "unknown") {
           
            console.log("not connect");                
        }
    });
}

//save user data
function saveData(){        
        FB.api('/me', function (response) {                
            user.id = response.id;
            user.userName = response.name;
            user.gender = response.gender;
            user.profilePic = "https://graph.facebook.com/" + user.id + "/picture";
            alert(user.userName+user.gender);
      });
        
}
