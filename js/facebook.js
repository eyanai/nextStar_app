//////////////////////////////////////////////////////// help parameters
//var appID = "543975688973172";//fb app id
//var myLocation = domain+"/index.html";//domain

//////////////////////////////////////////////////////// fb init
//FB._https = (window.location.protocol == "https:");
//FB._https = true; //check fb init
//FB.init({ appId: appID, status: true, cookie: true, oauth: true });
////////////////////////////////////////////////////////// fb init
/////*FB._https = (window.location.protocol == "https:");*/
//FB._https = true; //check fb init
//FB.init({ appId: appID, status: true, cookie: true, oauth: true });

//////////////////////////////////////////////////////// listener   
//function attachEventsFacebook() { 
////if the user checked ruled in previous time -hide it   
//    if(generalParameters.ruledChecked)
//    {
//        $("#rules-wrap").hide();
//    }   
// $(".logFb").on("click", loginFb);
//    $("#loginRewardBox").on("click", ".login", startLongPolling);
//    $(".login").on("click", loginWithoutFacebook);
//    $("#rulesCB").on("click",rulesCBClick);
//    $("#tvImgCB").on("click",tvImgCBClick);
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
//   // if rules not checked - alert
//    if(!generalParameters.ruledChecked){
//        alert("עליך לאשר תקנון");
//        $("#notConfirmed").fadeIn();
//    }
//    else{
//            window.location = "https://www.facebook.com/dialog/oauth?client_id=543975688973172&redirect_uri=" + myLocation;
//    }

//}
////check: if login-> save data
//function loginCheck() {
//    //alert("loginCheck");
//    FB.getLoginStatus(function (response) {
//        if (response.status === 'connected') {
//            saveData();
//        }
//        else if (response.status === 'not_authorized' || response.status == "unknown") {

//            console.log("not connect");
//        }
//    });
//}

//function loginWithoutFacebook(){
//   
//    if(!generalParameters.ruledChecked){
//        alert("עליך לאשר תקנון");
//        $("#notConfirmed").fadeIn();
//    }
//    else{
//        //if the rules checked - go to login 2 
//        Navi.goto('login2');
//    }
//}

////get user data from fb api
//function saveData() {
//    FB.api('/me', function (response) {
//        generalParameters.fbUser.id = response.id;
//        generalParameters.fbUser.userName = response.name;
//        generalParameters.fbUser.gender = response.gender;
//        generalParameters.fbUser.profilePic = "https://graph.facebook.com/" + generalParameters.fbUser.id + "/picture";
//        //alert("fb api "+generalParameters.fbUser.userName);
//        saveDataOnServer();
//        

//    });


//}

//////////////////////////////////////////////////////// localstorge functions
////set Local Storage
//function setLocalStorage() {
//    localStorage.setItem('fbStorage', JSON.stringify(generalParameters.fbUser));    
//    //alert("setLocalStorage "+localStorage.getItem('fbStorage'));
//}
////get Local Storage
//function getLocalStorage() {
//    
//    return (localStorage.getItem('fbStorage'));
//}
////check if there is local storge
//function checkLocalStorge() {
//    
//    if ((userFromLocalStorge != "")&&(userFromLocalStorge != null)) {       
//       //alert(userFromLocalStorge);
//        userFromLocalStorge = jQuery.parseJSON(userFromLocalStorge);
//        
//        //if connect already
//        if (userFromLocalStorge.id != null) {
//            generalParameters.fbUser = userFromLocalStorge;
//            fromLocalStorge = true;
//        }
//    }
//}

/////////////////////////////////////////////////////////// functions
//////send data to server
//function saveDataOnServer(str) {

//    $.ajax({
//        type: "POST",
//        url: serverDomain + "type==getFacebookData",
//        data: {
//            facebookId: generalParameters.fbUser.id,
//            facebookName: generalParameters.fbUser.userName,
//            facebookSex: generalParameters.fbUser.gender,
//            facebookimgurl: generalParameters.fbUser.profilePic
//        },
//        success: function (data) {
//            console.log(data);
//            setLocalStorage();
//        },
//        error: function (data) {
//            console.log("error getFacebookData: " + data);
//        }
//    });

//    startLongPolling("saveDataOnServer " +str);
//}
////start LongPolling
//function startLongPolling(str) {    
//    longPolling();
//}



///*****************check boxes************************/

////ruled check box clicked
//function rulesCBClick(){
//    if($("#rulesCB").attr("selected") != "selected"){
//        generalParameters.ruledChecked = true;
//        $("#rulesCB").attr("selected", "selected");
//        localStorage.setItem('rulesStorage', true);
//    }
//    else{
//      $("#rulesCB").removeAttr("selected")  
//    }
//    
//}

//function tvImgCBClick(){
//    
//}