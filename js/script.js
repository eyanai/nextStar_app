$(document).ready(function() {
    initAppSize();

    //init the dictionary values
    initDictionaryValues();
   // attachEventsFacebook();
    attachEventsRegister();
    attachEventsVote();
    longPolling();

   // initWaitAnimation();
});

//general parameters
var generalParameters = {
    isRegistered: false, //if register to vote
    voteIdA: null,
    voteKeyA: null,
    voteIdB: null,
    voteKeyB: null,
    isSingle: null, //is the vote is to single or battle
    fbUser: {
        id: null,
        userName: null,
        gender: null,
        profilePic: null
    }
}

function pageChange(data) {
    var status = data.status;

    switch (status) {
        case 11:
            setStaticPage(data);
            break;
        case 21:
            setOpenRegisterPage(data);
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


function isSingle(data){

    // if the generalParameters.isSingle was init -return it
    if(generalParameters.isSingle != null && generalParameters.isSingle !=""){
        return generalParameters.isSingle;
    }
    //else - init and then return it
    else{
        if(data.votes.length == 2){
            generalParameters.isSingle =false;
        }
        else{
            generalParameters.isSingle =true;
        }
        return generalParameters.isSingle
    }
}



var isBigSize = false;
function initAppSize() {
    //set the isBigSize parameter by the device
}

var registerDic = "";
var pushVoteDic = "";
var afterVoteDic = "";
var resultsDic = "";
var endShowDic = "";
//init the dictionary values from admin- to blue title
function initDictionaryValues() {
    registerDic = "אתם פה? מוכנים להצביע?";
    pushVoteDic = "הצביעו עכשיו, נשאר או הולך?";
    afterVoteDic = "תודה על הצבעתך.";
    resultsDic = "ויש לנו תוצאות...";
    endShowDic = "התוכנית הסתיימה, נתראה בשלישי ב21:00";

}

function getFielsdByVote(voteData) {
    var firstName = voteData.name;
    var firstSong = voteData.songName;
    var firstUrl = "";
    //set the img by size
    if (isBigSize) {
        firstUrl = voteData.imageUrlB;
    }
    else {
        firstUrl = voteData.imageUrlA;
    }
    var results = new Array(firstName, firstSong, firstUrl);
    return results;
}

function initWaitAnimation(){
    var pos = $(".contIcons").css("background-position-x");
    pos = pos.substring(0, pos.length - 2);
    pos = pos - 63;
    $(".contIcons").css("background-position-x",pos+"px");
}