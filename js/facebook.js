//////////////////////////////////////////////////////// help parameters
//var appID = "543975688973172";//fb app id
//var myLocation = "http://makosrv1.egoline.co.il/application/index.html";//domain

//////////////////////////////////////////////////////// fb init
///*FB._https = (window.location.protocol == "https:");*/
//FB._https = true; //check fb init
//FB.init({ appId: appID, status: true, cookie: true, oauth: true })

//////////////////////////////////////////////////////// listener   
//function attachEventsFacebook() {    
//    $(".logFb").on("click", loginFb);
//    $("#loginRewardBox").on("click", ".login", startLongPolling);
//}

////check if localStorge is reset with connect to fb
//var fromLocalStorge = false;
//var userFromLocalStorge = getLocalStorage();
//checkLocalStorge();

//var searchQuery = window.location.search;//search Query 
////if connect already
//if (fromLocalStorge) {
//    saveDataOnServer("fromLocalStorge");
//}
////connect yet and after after login in webview
//else if (searchQuery.length > 0) {
//    loginCheck();
//}

//////////////////////////////////////////////////////// fb api functions
////login fb
//function loginFb() {
//    window.location = "https://www.facebook.com/dialog/oauth?client_id=543975688973172&redirect_uri=" + myLocation;
//}
////check: if login-> save data
//function loginCheck() {
//    FB.getLoginStatus(function (response) {
//        if (response.status === 'connected') {
//            saveData();
//        }
//        else if (response.status === 'not_authorized' || response.status == "unknown") {

//            console.log("not connect");
//        }
//    });
//}
////get user data from fb api
//function saveData() {
//    FB.api('/me', function (response) {
//        generalParameters.fbUser.id = response.id;
//        generalParameters.fbUser.userName = response.name;
//        generalParameters.fbUser.gender = response.gender;
//        generalParameters.fbUser.profilePic = "https://graph.facebook.com/" + generalParameters.fbUser.id + "/picture";

//        saveDataOnServer();
//        //alert(user.userName + user.gender);

//    });


//}

//////////////////////////////////////////////////////// localstorge functions
////set Local Storage
//function setLocalStorage() {
//    localStorage.setItem('fbStorage', JSON.stringify(generalParameters.fbUser));
//}
////get Local Storage
//function getLocalStorage() {
//    return (localStorage.getItem('fbStorage'));
//}
////check if there is local storge
//function checkLocalStorge() {
//    if (userFromLocalStorge != "") {

//        userFromLocalStorge = jQuery.parseJSON(userFromLocalStorge);
//        //if connect already
//        if (userFromLocalStorge.id != null) {
//            generalParameters.fbUser = userFromLocalStorge;
//            fromLocalStorge = true;
//        }
//    }
//}

///////////////////////////////////////////////////////// functions
////send data to server
//function saveDataOnServer(str) {

//    $.ajax({
//        type: "POST",
//        url: domain + "type==getFacebookData",
//        data: {
//            facebookId: generalParameters.fbUser.id,
//            facebookName: generalParameters.fbUser.userName,
//            facebookSex: generalParameters.fbUser.gender,
//            facebookimgurl: generalParameters.fbUser.profilePic
//        },
//        success: function (data) {
//            console.log(data);
//            setLocalStorage(data);
//        },
//        error: function (data) {
//            console.log("error getFacebookData: " + data);
//        }
//    });

//    startLongPolling("saveDataOnServer " +str);
//}
////start LongPolling
//function startLongPolling(str) {
//    alert("start polling " + str);
//    longPolling();
//}