
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
var notRegisterDic = "";
var notRegisterWaitDic = "";

//get data from the server and send to the suitable page
function pageChange(data) {
    //alert("status change");
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
        url: "dictionary/dictionary.txt",
        success: function (data) {
            dictionary = JSON.parse(data);
            registerDic = dictionary.registerDic;
            pushVoteDic = dictionary.pushVoteDic;
            afterVoteDic = dictionary.afterVoteDic;
            voteCloseDic = dictionary.voteCloseDic;
            resultsDic = dictionary.resultsDic;
            endShowDic = dictionary.endShowDic;
            notRegisterDic = dictionary.notRegisterDic;
            notRegisterWaitDic = dictionary.notRegisterWaitDic;
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
    gifInterval = setTimeout(function () {
        pos = $(".contIcons").css("background-position-x");
        pos = pos.substring(0, pos.length - 2);
        if (pos > -1) {
            pos = -285.25;
        }
        else {
            pos = pos * 1 + 40.75 * 1;
        }
        $(".contIcons").css("background-position-x", pos + "px");
        initWaitAnimation();
    }, 300);
}

function stopWaitAnimation() {
    clearTimeout(gifInterval);
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
    $("#alertAud")[0].play();
    alertRegisterGoingClose();
    
}


$(document).ready(function() {
    ga('send', 'pageview', '/TNS_Homepage'); //for google analytics
    $.ajaxSetup({ cache: false });
    checkPCScreen();
    if(window.location.host.indexOf("9090") > -1) {
        $(".nextPage").hide();
    }
    // window.location = "http://thenextstar.mako.co.il/test.html";
    initAppSize();
    //init the dictionary values
    initDictionaryValues();
    attachEventsFacebook(); //check gallery
    attachEventsGallery();
    //init the touchmive events
    initMoveEvents();
    //initWaitAnimation();
    initDrag(); // init draggable
    soundsLoad(); //init sounds

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

    $("#close-agreement").on("click", function() {
        $("#login").show();
        $("#agreement").hide();
    });

    /*****images from json to cach list********/
    getImagesCachList();


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
    var androidSmall = false;
    var androidSmall2 = false;
    var androidNormal = false;
    if (ua.search("android") > -1 && !(ua.search("mobile") > -1)) {
        androidNormal = true;
    }
	if (androidNormal) {
        browser = "androidNormal";
    }
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && (ua.search("i9300") >-1 || ua.search("i9500") >-1 ))    {
        androidSmall = true;
    }
    if (androidSmall) {
        browser = "androidSmall";
    }
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && ua.search("i9100") >-1)    {
        androidSmall2 = true;
    }
    if (androidSmall2) {
        browser = "androidSmall2";
    }

}

function loadRelevantCss(){
     switch (browser) {

        case "androidSmall2":
            loadcssfile("css/andrd_small_2.css");
			
            break;
			
		case "androidNormal":
            loadcssfile("css/andrd_normal.css");
			
            break;
		
		case "androidSmall":
            loadcssfile("css/andrd_small.css");
			
              break;
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
    $("#scroller").html('');
    $("#scroller").append(' <li><img src="images/agreement/agreement_page_1.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_2.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_3.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_4.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_5.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_6.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_7.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_8.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_9.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_10.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_11.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_12.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_13.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_14.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_15.jpg" alt="1"></li>'+
                    '<li><img src="images/agreement/agreement_page_16.jpg" alt="1"></li>');

    $("#agreement").show();
    $("#login").hide();
}


function checkPCScreen(){
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     
    }
    else {
        $("#pc-screen").show();
    }
}


function getImagesCachList(){
    //load the relevant json by the device size
    var jsonUrl = "";
    if(generalParameters.isBigSize){
        jsonUrl = "/page/imagesListBig.json";
    }
    else{
        jsonUrl = "/page/imagesListSmall.json";
    }
    $.getJSON(jsonUrl, function(data) {
	var css='body:after{content:';
	
	$.each(data, function(key, val) {
		css+='url("'+val+'") ';
	});
	
	css+=';display:none;}';
	
	$("head").append($('<style>'+css+'</style>'));
	
});
}
