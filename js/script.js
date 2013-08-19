$(document).ready(function () {
    initAppSize();
    //init the dictionary values
    initDictionaryValues();
    checkRulesChecked();
    //attachEventsFacebook(); //check gallery
    attachEventsGallery();
    //init the touchmive events
    initMoveEvents();
    //initWaitAnimation();

    longPolling(); //check gallery

    $("#horizonal-screen").hide();
    //initSounds();
});



//general parameters
var generalParameters = {
    isRegistered: false, //if register to vote
    wasRegisterPage:false,
    voteIdA: null,
    voteKeyA: null,
    voteIdB: null,
    voteKeyB: null,
    isSingle: null, //is the vote is to single or battle
    fbUser: {
        id: null,
        userName: null,
        gender: null,
        profilePic: null,
        showImg:false
    },
    isBigSize: false,
    ruledChecked: false
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
    var status = data.status;

    switch (status) {
        case 11:
            setStaticPage(data);
            break;
        case 21:
            setOpenRegisterPage(data,0);
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
function isSingle(data) {

    // if the generalParameters.isSingle was init -return it
    if (generalParameters.isSingle != null && generalParameters.isSingle != "") {
        return generalParameters.isSingle;
    }
    //else - init and then return it
    else {
        if (data.votes.length == 2) {
            generalParameters.isSingle = false;
        }
        else {
            generalParameters.isSingle = true;
        }
        return generalParameters.isSingle
    }
}

//check if tha app run on small screen or big. According to result load appropriate sized image
function initAppSize() {
    //set the isBigSize parameter by the device
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
        else{
            pos = pos * 1 + 40.75 * 1;
        }
        $(".contIcons").css("background-position-x", pos + "px");
    }, 300);    
}

function stopWaitAnimation(){
    clearInterval(gifInterval);
}

function initMoveEvents() {
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    var slider = $("#result-gallery")[0];
    slider.ontouchmove = function (e) {
        e.stopPropagation();
        $(document).css("top", "0px")
    };
}

function toggleTopMenu(headerText) {
    $(".topMenu").slideUp(700,function(){$(".topMenu h1").text(headerText);});
    
    $(".topMenu").slideDown(700);

}

function checkRulesChecked() {
    if (localStorage.getItem('rulesStorage')) {
        generalParameters.ruledChecked = true;
    }
}




function showFlash(){
    $(".register-red-flash").show();
    alertRegisterGoingClose();
}
