
//general parameters
var generalParameters = {
    isRegistered: false, //if register to vote
    wasRegisterPage: false,
   // voteIdA: null,
    //voteKeyA: null,
    //voteIdB: null,
    //voteKeyB: null,
   // isSingle: null, //is the vote is to single or battle
    fbUser: {
        id: null,
        userName: null,
        gender: null,
        profilePic: null,
        showImg: false
    },
    isBigSize: false,
    ruledChecked: false,
    isConnect: false,
    onLoad:true

}


var voteGeneralParameters ={
    status:0,
    registered:false,
    isSingle:null,
    voteid1:0,
    voteid2:0,
    votekey1: null,
    votekey2: null,
    
    //null - not vote, 0 - bad , 1- good
    like1:null,
    like2:null,
    votePageId:0

}

//dictionary values
var registerDic = "";
var pushVoteDic = "";
var afterVoteDic = "";
var voteCloseDic = "";
var resultsDic = "";
var endShowDic = "";

//get data from the server and send to the suitable page
function pageChange(data) {
    
    $("#loader").hide();
    generalParameters.onLoad = false;

    var status = data.status;

    switch (status) {
        case 11:
            setStaticPage(data);
            break;
        case 21:
            setOpenRegisterPage(data, 0);
            break;
        case 22:
            setRegisterGoingClose(data);
            break;
        case 23:
            setVotePage(data);
            break;
        case 25:
            setVoteClosePage(data);
            break;
        case 26:
            setResultPage(data);
            break;

    }
}

//check for every vote if is single or battle
function setIsSingle(data) {

    // if the generalParameters.isSingle was init -return it
    if (voteGeneralParameters.isSingle != null && voteGeneralParameters.isSingle != "") {
        return voteGeneralParameters.isSingle;
    }
    //else - init and then return it
    else {
        if (data.votes.length == 2) {
            voteGeneralParameters.isSingle = false;
        }
        else {
            voteGeneralParameters.isSingle = true;
        }
        return voteGeneralParameters.isSingle
    }
}

//check if tha app run on small screen or big. According to result load appropriate sized image
function initAppSize() {
    //set the isBigSize parameter by the device
    if ($(window).width() > 700) {
        generalParameters.isBigSize = true;
    }

}

//init the dictionary values from admin- to blue title
function initDictionaryValues() {
    var dictionary = null;
    $.ajax({
        type: "GET",
        datatype: "json",
        url: domain + "/dictionary/dictionary.txt",
        success: function (data) {
            dictionary = JSON.parse(data);
            registerDic = dictionary.registerDic;
            pushVoteDic = dictionary.pushVoteDic;
            afterVoteDic = dictionary.afterVoteDic;
            voteCloseDic = dictionary.voteCloseDic;
            resultsDic = dictionary.resultsDic;
            endShowDic = dictionary.endShowDic;
            //console.log(JSON.parse(data));
        },
        error: function (data) {
            console.log("error getPage: " + data);
        }
    });

    /*registerDic = "אתם פה? מוכנים להצביע?";
    pushVoteDic = "הצביעו עכשיו, נשאר או הולך?";
    afterVoteDic = "תודה על הצבעתך.";
    voteCloseDic = "אנא המתן לפרסום התוצאות";
    resultsDic = "ויש לנו תוצאות...";
    endShowDic = "התוכנית הסתיימה, נתראה בשלישי ב21:00";
    */
}

//get fields per vote
function getFielsdByVote(voteData) {
    var firstName = voteData.name;
    var firstSong = voteData.songName;
    var firstUrl = "";
    //set the img by size
    if (generalParameters.isBigSize) {
        firstUrl = voteData.imageUrlB;
    }
    else {
        firstUrl = voteData.imageUrlA;
    }
    var results = new Array(firstName, firstSong, firstUrl);
    return results;
}

var gifInterval;
function initWaitAnimation() {

    var pos;
    gifInterval = setInterval(function () {
        pos = $(".contIcons").css("background-position-x");
        pos = pos.substring(0, pos.length - 2);
        if (pos > -1) {
            pos = -285.25;
        }
        else {
            pos = pos * 1 + 40.75 * 1;
        }
        $(".contIcons").css("background-position-x", pos + "px");
    }, 300);
}

function stopWaitAnimation() {
    clearInterval(gifInterval);
}

function initMoveEvents() {
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    var slider = $("#result-gallery")[0];
    var rule = $("#result-gallery")[0];
    slider.ontouchmove = function (e) {
        e.stopPropagation();
        $(document).css("top", "0px")
    };

    var scroller = $("#scroller")[0];
    scroller.ontouchmove = function (e) {
        e.stopPropagation();
        $(document).css("top", "0px")
    };


}

function toggleTopMenu(headerText) {
    $(".topMenu").slideUp(700, function () { $(".topMenu h1").text(headerText); });

    $(".topMenu").slideDown(700);

}

//function checkRulesChecked() {
//    if (localStorage.getItem('rulesStorage')) {
//        generalParameters.ruledChecked = true;
//    }
//}

function showFlash() {
    $(".register-red-flash").show();
    alertRegisterGoingClose();
}


$(document).ready(function() {
    initAppSize();
    //init the dictionary values
    initDictionaryValues();
    attachEventsFacebook(); //check gallery
    attachEventsGallery();
    //init the touchmive events
    initMoveEvents();
    
    longPolling(); //check gallery
    $("body").on("start-app", longPolling);
    if(generalParameters.isConnect) {
        $("body").trigger("start-app");
    }
    if(!generalParameters.onLoad) {
        $("#loader").hide();
    }
    
    initBrowser();
    loadRelevantCss();
    attachDrag();
   
    //// alert("user agent: " + ua);
    //    alert("width: " +$(document).width());
    //    alert("height: " +$(document).height());

    $("#close-agreement").on("click", function() {
        $("#login").show();
        $("#agreement").hide();
    });

   

    //check orientation 
    var isPortrait = (window.innerHeight / window.innerWidth) > 1;
    //alert(window.isPortrait);	
    switch(isPortrait) {
        case true:

            $("#horizonal-screen").hide();
            break;

        case false:
            $("#horizonal-screen").show();
            break;
    }

});

var browser;
function initBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    console.log("user agent: " + ua);
    // alert("user agent: " + ua);
    // alert("width: " +$(document).width());
    // alert("height: " +$(document).height());
    var androidSmall = false;
    var androidSmall2 = false;
    var androidNormal = false;
    //if (ua.search("android") > -1 && ua.search("mobile") > -1) {
    //    androidSmall = true;
    //}
    //if (ua.search("android") > -1 && ua.search("p5110") > -1) {
    //    androidNormal = true;
    //}
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && (ua.search("i9300") >-1 || ua.search("i9500") >-1 ))    {
        androidSmall = true;
    }
    if (androidSmall) {
        browser = "androidSmall";
       // alert("androidSmall")
        //   alert("android small");
    }
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && ua.search("i9100") >-1)    {
        androidSmall2 = true;
    }
    if (androidSmall2) {
        browser = "androidSmall2";
      //  alert("androidSmall2")
        //   alert("android small");
    }

    //alert("ua: "+ua);
    //if (androidSmall2) {
    //    browser = "androidSmall2";
    //    //   alert("android small");
    //}
    //if (androidNormal) {
    //    browser = "androidNormal";
    //    //   alert("android normal");
    //}
    //var isIpad = false;
    //if (ua.search("ipad") > -1) {
    //    isIpad = true;
    //    browser = "ipad";
    //}
    //var isIphone5 = false;
    //if (ua.search('iphone os 5') > -1) {
    //    isIphone5 = true;
    //    browser = "iphone5";
    //}
}

function loadRelevantCss(){
     switch (browser) {

  //      case "iphone5":
  //          loadcssfile("css/iphone5.css");
  //          break;
  //      
		//case "androidNormal":
  //          loadcssfile("css/andrd_normal.css");
  //          break;
		//
		//case "androidSmall2":

        case "androidSmall2":
            loadcssfile("css/andrd_small_2.css");
            break;
			
		case "androidSmall":
            loadcssfile("css/andrd_normal.css");
              break;
        //case "androidNormal":
        //    loadcssfile("css/andrd_normal.css");
        //    break;

        //case "androidSmall":
        //    loadcssfile("css/andrd_small.css");
        //    break;
    }
}

function loadcssfile(filename) {
    //if filename is an external CSS file
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)

    $("head").append(fileref);

}

function initBannerScript() {
    //set the script for 2 different sizes

    if (generalParameters.isBigSize) {
        $("#banner").append('script>' +
                    'var CM8Server="mako.checkm8.com";' +
                    'var CM8Cat="mobile.makoTV.programs.the_next_star.votes";' +
                    'var CM8Profile="APP_BANNER_LARGE_1024X66";' +
                    'var CM8Req="x";' +
                   ' var CM8Redir={click: "", ad_play: ""};' +
                    '</script>' +
                    '<script language="JavaScript" src="http://makostatic.checkm8.com/adam/cm8_detect_ad.js"></script>')
    }
    else {
        $("#banner").append('<script>' +
        'var CM8Server="mako.checkm8.com";' +
        'var CM8Cat="mobile.makoTV.programs.the_next_star.votes";' +
        'var CM8Profile="format=APP_BANNER_320X50";' +
        'var CM8Req="x";' +
        'var CM8Redir={click: "", ad_play: ""};' +
        '</script>' +
        '<script language="JavaScript" src="http://makostatic.checkm8.com/adam/cm8_detect_ad.js"></script>');
    }

}

function df() {//show the agreement on click in login section
    $("#agreement").show();
    $("#login").hide();
}
