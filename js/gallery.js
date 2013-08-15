var gallerObj = "";
//set sizes to dom abj: li single, li battle and to ul

function attachEventsGallery() {
    $("#download-music").on("click", downloadMusic);
}

function gallerySize() {
    var resultGallery = $("#result-gallery").width(); //get the diaplay width
    var singleVoteWidth = resultGallery * 30 / 100; //calculate single width
    var numSingleVotes = $(".gallery-vote-single").width(singleVoteWidth).size(); //set single width and counter single votes
    var battleVoteWidth = $("#result-gallery").width() * 50 / 100; //calculate battle width
    var numBattleVotes = $(".gallery-vote-battle").width(battleVoteWidth).size(); //set battle width and counter battle votes
    var margin = $("#result-gallery ul li").css("margin-right").slice(0,-2)*1+2;
    //var margin = 4;
    var resultGalleryList = numSingleVotes * (singleVoteWidth + margin) + numBattleVotes * (battleVoteWidth + margin); //calculate ul width
    $("#result-gallery ul").width(resultGalleryList); //set ul width
    $("#result-gallery").scrollLeft(resultGalleryList - resultGallery + margin); //go to the right in ul
}

//set gallery page
function setGalleryPage(data) {
    var pages = data.pagesOnShow; //all pages in current show
    pages.forEach(function (p) {
        //if this page is a vote and not static page
        if (p.type == "vote") {
            //if battle vote
            if (p.votes.length > 1) {
                //gallerObj+=initBattleGallery(p.votes);//add battle vote obj to gallery string
                gallerObj = initBattleGallery(p.votes) + gallerObj; //add battle vote obj to gallery string
            }
            //single vote
            else {
                //gallerObj+=initSingleGallery(p.votes);//add single vote obj to gallery string
                gallerObj = initSingleGallery(p.votes) + gallerObj; //add single vote obj to gallery string
            }
        }

    });
    $("#result-gallery ul").append(gallerObj); //append to dom the gallery string
    toggleTopMenu(endShowDic);
    $("#gallery-title").text(data.title);
    Navi.goto("gallery");
}

//create battle vote string
function initBattleGallery(votes) {
    var battle = "<li class=\"gallery-vote-battle\"><span class=\"vote-1\">" + createObj(votes[0]) + "</span>" + "<span class=\"vote-2\">" + createObj(votes[1]) + "</span></li>";
    return battle;
}

//create single vote string
function initSingleGallery(votes) {
    var single = "<li class=\"gallery-vote-single\">" + createObj(votes[0]) + "</li>";
    return single;
}

//create the base vote obj
function createObj(vote) {
    console.log(vote);
    var url;
    if (generalParameters.isBigSize) {
        url = vote.imageUrlB;
    }
    else {
        url = vote.imageUrlA;
    }
    var $obj = "<img src=\"" + url + "\" alt=\"alt\"><span class=\"reMesseg\"><span class=\"divide\"></span><div class=\"songName\">" +
                "<h1>" + vote.name + "</h1><h2>" + vote.songName + "</h2></div><span class=\"percentage\">" + vote.finalPercent + "%</span></span>"
    return $obj;
}

//
function downloadMusic() {
    genClickSound.playclip();
}
