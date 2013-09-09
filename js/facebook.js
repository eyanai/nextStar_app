////////////////////////////////////////////////////// help parameters
var appID = "543975688973172";//fb app id
//var myLocation = domain+"/index.html";//domain
var myLocation = window.location.href;

////////////////////////////////////////////////////// fb init
///*FB._https = (window.location.protocol == "https:");*/
FB._https = true; //check fb init
FB.init({ appId: appID, status: true, cookie: true, oauth: true });
//alert(0);
//if(localStorage != null){
//    localStorage.setItem('fbStorage', "");
//}



////////////////////////////////////////////////////// listener   
function attachEventsFacebook() {
    
 $(".logFb").on("click", loginFb);
    $("#loginRewardBox").on("click", ".login", loginRewardClicked);
    $("#loginExtendedBox .facebookArea").on("click",".login", loginWithoutFacClicked);
    $("#rulesCB").on("click",rulesCBClick);
    $(".tvImgCB").on("click",tvImgCBClick);
    //$(".reset-localstorge").on("click",function(){localStorage.setItem('fbStorage', "");});
}


//check if localStorge is reset with connect to fb
var fromLocalStorge = false;
var userFromLocalStorge = getLocalStorage();
checkLocalStorge();

var searchQuery = window.location.search;//search Query 
//if connect already
if (fromLocalStorge) {
    //alert("local");
    saveDataOnServer("fromLocalStorge");
    
}

//connect yet and after after login in webview
else if (searchQuery.length > 0) {
    //alert("search");
    loginCheck();
}
else{//if not connect and not from localstorge
    generalParameters.onLoad = false;
     $("#loader").hide();
}

//alert("search: " + window.location);
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
                window.location = "https://www.facebook.com/dialog/oauth?client_id=543975688973172&redirect_uri=" + myLocation+"?"+generalParameters.fbUser.showImg+"&scope=publish_stream";
        }
        
    }

}
//check: if login-> save data
function loginCheck() {
    //alert("loginCheck");
    var showImg = window.location.search.substr(1, 5);
    if(showImg.indexOf("true")>-1){
        generalParameters.fbUser.showImg = true;
    }
    else{
        generalParameters.fbUser.showImg = false;
    }
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            saveData();
        }
        else if (response.status === 'not_authorized' || response.status == "unknown") {
            $("#loader").hide();
            generalParameters.onLoad = false;
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

function postOnFeed() {
    //check if connect
    FB.getLoginStatus(function (response) {
        //if connect
        if (response.status === 'connected') {
            //text to post
            var postText = " גם אני "; /*generalParameters.fbUser.userName;*/
            if (generalParameters.fbUser.gender == "male") {
                postText += " שופט";
            }
            else {
                postText += " שופטת";
            }
            postText += " בכוכב הבא"
           // descriptionText = "לראשונה בעולם, אתם השופטים בזמן אמת, בשידור חי ובכל ביצוע! התחברו עכשיו";
            captionText = "www.mako.co.il";
            FB.api('/me/feed', 'post',
            {
                link: 'http://www.mako.co.il/collab/thenextstar/',
                //picture: domain + '/images/header/facebook_star.png',
                picture: domain + '/images/header/facebook_star_for_post.png',
                message: postText,
                description: 'לראשונה בעולם, אתם השופטים בזמן אמת, בשידור חי ובכל ביצוע! התחברו עכשיו',
                caption: captionText,
                name: 'אפליקציית הכוכב הבא בmakoTV'
            },
            function (response) {
                if (!response || response.error) {
                 //   alert('Error occured');
                }
                else {
                //    alert('Post ID: ' + response.id);
                }
            });

        }
    });
}


////////////////////////////////////////////////////// localstorge functions
//set Local Storage
function setLocalStorage() {
    if (localStorage != null) {
        localStorage.setItem('fbStorage', JSON.stringify(generalParameters.fbUser));
    }
    
    //alert("setLocalStorage "+localStorage.getItem('fbStorage'));
}
//get Local Storage
function getLocalStorage() {   
    if(localStorage==null){
        return null;
    }
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
     //$("#loader").hide();
     //generalParameters.onLoad = false;
    $.ajax({
        type: "POST",
        url: serverDomain + "type=getFacebookData",
        data: {
            facebookId: generalParameters.fbUser.id,
            facebookName: generalParameters.fbUser.userName,
            facebookSex: generalParameters.fbUser.gender,
            facebookimgurl: generalParameters.fbUser.profilePic,
            showImg: generalParameters.fbUser.showImg
        },
        success: function(data) {
           // alert("return from ajax getFacebookData");
            console.log(data);
            setLocalStorage();
           // alert(generalParameters.fbUser.showImg);
        },
        error: function(data) {
            console.log("error getFacebookData: " + data);

        }
    });
    postOnFeed();//post on feeds
    startLongPolling("saveDataOnServer " +str);
}
//start LongPolling
function startLongPolling(str) {    
    generalParameters.isConnect = true;
    $("body").trigger("start-app");
    if (checkTimeForPost()) {
        postOnFeed(); //post on feeds
    }
   //longPolling();
}



/*****************check boxes************************/

//ruled check box clicked
function rulesCBClick(){

    if($("#rulesCB").hasClass("checked")){
            $("#rulesCB").removeClass("checked");
             //localStorage.setItem('rulesStorage', false);
        generalParameters.ruledChecked = false;
           
        }
        else{
            $("#rulesCB").addClass("checked");
              generalParameters.ruledChecked = true;
               //localStorage.setItem('rulesStorage', true);
          
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


//checks the day and time of day
function checkTimeForPost(){
    var date=new Date();
    // check the day- sunday=0 and so on
    if (date.getDay() == 0 || date.getDay() == 2) {
        //check time in round hours (24hrs)
        if (date.getHours() == 21 || date.getHours() == 22) {
            return 1;
        }
        else return 0;
    }
    else return 0;
}