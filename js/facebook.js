////////////////////////////////////////////////////// help parameters
var appID = "543975688973172";//fb app id
var myLocation = domain+"/index.html";//domain

////////////////////////////////////////////////////// fb init
///*FB._https = (window.location.protocol == "https:");*/
FB._https = true; //check fb init
FB.init({ appId: appID, status: true, cookie: true, oauth: true });

//localStorage.setItem('fbStorage', "");


////////////////////////////////////////////////////// listener   
function attachEventsFacebook() { 
//if the user checked ruled in previous time -hide it   
    if(generalParameters.ruledChecked)
    {
        $("#rules-wrap").hide();
    }   
 $(".logFb").on("click", loginFb);
    $("#loginRewardBox").on("click", ".login", loginRewardClicked);
    $("#loginExtendedBox").on("click",".login", loginWithoutFacClicked);
    $("#rulesCB").on("click",rulesCBClick);
    $("#tvImgCB").on("click",tvImgCBClick);
}

//check if localStorge is reset with connect to fb
var fromLocalStorge = false;
var userFromLocalStorge = getLocalStorage();
checkLocalStorge();

var searchQuery = window.location.search;//search Query 
//if connect already
if (fromLocalStorge) {
    saveDataOnServer("fromLocalStorge");
}
//connect yet and after after login in webview
else if (searchQuery.length > 0) {
    loginCheck();
}

////////////////////////////////////////////////////// fb api functions
//login fb
function loginFb() {
   if(!$(this).hasClass("inFb")){       
       // if rules not checked - alert
        if(!generalParameters.ruledChecked){
            $("#notConfirmed").fadeIn();
            $("#rulesCB").addClass("required");
        }
        else{
                window.location = "https://www.facebook.com/dialog/oauth?client_id=543975688973172&redirect_uri=" + myLocation+"&scope=publish_stream";
        }
        
    }

}
//check: if login-> save data
function loginCheck() {
    //alert("loginCheck");
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            saveData();
        }
        else if (response.status === 'not_authorized' || response.status == "unknown") {

            console.log("not connect");
        }
    });
}

function loginWithoutFacebook(){
   
    if(!generalParameters.ruledChecked){
        $("#notConfirmed").fadeIn();
        $("#rulesCB").addClass("required");
    }
    else{
        //if the rules checked - go to login 2 
        Navi.goto('login2');
    }
}

//get user data from fb api
function saveData() {
    FB.api('/me', function (response) {
        generalParameters.fbUser.id = response.id;
        generalParameters.fbUser.userName = response.name;
        generalParameters.fbUser.gender = response.gender;
        generalParameters.fbUser.profilePic = "https://graph.facebook.com/" + generalParameters.fbUser.id + "/picture";
        //alert("fb api "+generalParameters.fbUser.userName);
        saveDataOnServer();
    });
}

function postOnFeed(){
    /*FB.ui({
        method: 'feed',
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
      },
      function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
      }      
    );*/
   var postText=generalParameters.fbUser.userName;
   if(generalParameters.fbUser.gender=="male"){
       postText += " שופט";
   }
   else{
       postText += " שופטת";
   }
   postText+=" בכוכב הבא"

    FB.api('/me/feed', 'post', 
        { 
            link: 'http://www.mako.co.il/',
            picture: domain+'/images/header/hdr_logo_kohav.png',
            message: postText 
        }, 
        function(response) {
          if (!response || response.error) {
            alert('Error occured');
          } 
          else {
            alert('Post ID: ' + response.id);
          }
    });
}

////////////////////////////////////////////////////// localstorge functions
//set Local Storage
function setLocalStorage() {
    localStorage.setItem('fbStorage', JSON.stringify(generalParameters.fbUser));
    
    //alert("setLocalStorage "+localStorage.getItem('fbStorage'));
}
//get Local Storage
function getLocalStorage() {
    
    return (localStorage.getItem('fbStorage'));
}
//check if there is local storge
function checkLocalStorge() {
    
    if ((userFromLocalStorge != "")&&(userFromLocalStorge != null)) {       
       //alert(userFromLocalStorge);
        userFromLocalStorge = jQuery.parseJSON(userFromLocalStorge);
        
        //if connect already
        if (userFromLocalStorge.id != null) {
            generalParameters.fbUser = userFromLocalStorge;
            fromLocalStorge = true;
        }
    }
}

///////////////////////////////////////////////////////// functions
////send data to server
function saveDataOnServer(str) {
    
    $.ajax({
        type: "POST",
        url: serverDomain + "type==getFacebookData",
        data: {
            facebookId: generalParameters.fbUser.id,
            facebookName: generalParameters.fbUser.userName,
            facebookSex: generalParameters.fbUser.gender,
            facebookimgurl: generalParameters.fbUser.profilePic,
            showImg:generalParameters.fbUser.showImg
        },
        success: function (data) {
            console.log(data);
            setLocalStorage();
        },
        error: function (data) {
            console.log("error getFacebookData: " + data);
        }
    });

    startLongPolling("saveDataOnServer " +str);
}
//start LongPolling
function startLongPolling(str) {
    generalParameters.isConnect = true;
    $("body").trigger("start-app");
   //longPolling();
}



/*****************check boxes************************/

//ruled check box clicked
function rulesCBClick(){

    if($("#rulesCB").hasClass("checked")){
            $("#rulesCB").removeClass("checked");
             localStorage.setItem('rulesStorage', false);
        generalParameters.ruledChecked = false;
           
        }
        else{
            $("#rulesCB").addClass("checked");
              generalParameters.ruledChecked = true;
               localStorage.setItem('rulesStorage', true);
          
        }

}

function tvImgCBClick(){
        if($(".tvImgCB").hasClass("checked")){
            $(".tvImgCB").removeClass("checked");
            generalParameters.fbUser.showImg = false;
        }
        else{
            $(".tvImgCB").addClass("checked");
            generalParameters.fbUser.showImg = true;
        }
      
}


function loginRewardClicked(){
    $("#genAud")[0].play();
    startLongPolling();
}

function loginWithoutFacClicked(){
    $("#genAud")[0].play();
    loginWithoutFacebook();
}
