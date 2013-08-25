var voteIdA, voteKeyA, voteIdB, voteKeyB;

var registerTextHtml = "<span>כ</span><span>נ</span><span>י</span><span>ס</span><span>ה</span> <span>ל</span><span>ה</span><span>צ</span><span>ב</span><span>ע</span><span>ה</span>";
//set register page
function setOpenRegisterPage(data, from) {
    generalParameters.isRegistered = false;

    $("#register .continue h2").text(data.textWaitRegister); //take the value from dictionary

    $(".slide").css("left", "5.5%");
    //$(".slide").css("left", "76%");
    //$("#test-reut-stars").css("left", "0%").show();
    $(".slider-text").html(registerTextHtml);
    $("#register .slidein").show();
    $(".deny-register").hide();
    $("#register .reMesseg .continue").hide();
    var url = "";
    generalParameters.isSingle = null; //init isSingle
    //if this is a double vote
    if (!isSingle(data)) {
        var url1 = "";
        var url2 = "";
        //set the img
        //set the ing by size
        if (generalParameters.isBigSize) {
            url1 = data.votes[0].imageUrlB;
            url2 = data.votes[1].imageUrlB;
        }
        else {
            url1 = data.votes[0].imageUrlA;
            url2 = data.votes[1].imageUrlA;
        }
        var name1 = data.votes[0].name;
        var song1 = data.votes[0].songName;
        var name2 = data.votes[1].name;
        var song2 = data.votes[1].songName;
        //var textWait = data.textWaitRegister;
        $("#register-img-first").css("background-image", "url('" + url1 + "')");
        $("#register-comp-name-first").text(name1);
        $("#register-song-name-first").text(song1);
        $("#register-img-second").css("background-image", "url('" + url2 + "')");
        $("#register-comp-name-second").text(name2);
        $("#register-song-name-second").text(song2);
        //$("#register-wait-text").text(textWait);
        Navi.goto("registerBattle");
    }
    //if this is a single vote
    else {
        if (generalParameters.isBigSize) {
            url = data.votes[0].imageUrlB;
        }
        else {
            url = data.votes[0].imageUrlA;
        }
        var name = data.votes[0].name;
        var song = data.votes[0].songName;
        //var textWait = data.textWaitRegister;
        $("#register-single-img").css("background-image", "url('" + url + "')");
        $("#register-comp-name-single").text(name);
        $("#register-song-name-single").text(song);
        //$("#register-wait-text").text(textWait);
        Navi.goto("registerSingle");
    }

    //if(!generalParameters.wasRegisterPage||generalParameters.wasRegisterPage&&generalParameters.isRegistered){
    if (from == "vote") {
        $("#register .reMesseg .continue h2").text(data.textWaitVote);
        Navi.goto("notRegister");
    }
    else {
        $(".topMenu").show();
        toggleTopMenu(registerDic);
    }
    //}
    //generalParameters.wasRegisterPage = true;

}
//var starsWidth;//=$("#test-reut-stars").width();
//var slideWidth;//=$(".slide").width();
//var leftMax = $("#test-reut-outer").css("left").slice(0, -2);
//drag to register in single vote
$("#registerSingle .slide.btn.drag").draggable({
    stack: ".drag",
    axis: "x",
    containment: "#registerSingle .slidein",
    //start:function(event,ui){
    //    starsWidth=$("#test-reut-stars").width();
    //    slideWidth=$(".slide").width();

    //},
    drag: function (event, ui) {
        //$("#test-reut-stars").css("left", 100*((ui.helper.css("left").slice(0,-2)*1-starsWidth+slideWidth-10)/starsWidth) + "%");
        //console.log(ui.helper.css("left").slice(0,-2)*1);
        //console.log(ui.helper.css("left").slice(0,-2)*1-starsWidth+slideWidth);
        
        console.log("ui.offset.left: "+ui.offset.left)
    },
    stop: function (event, ui) {
        var lengthNoPx = ui.helper.css("left").length - 2;

        if ($(".slidein").width().toString().length < 3) {
            var widthInPx = ($("#registerSingle").width() / 100) * $(".slidein").width();
        }
        else {
            var widthInPx = $(".slidein").width();
        }

        if (ui.helper.css("left").substring(0, lengthNoPx) >= (widthInPx * 0.5)) { //btn position goes over 50%
            $(".slide").addClass("animateLeft");
           $(ui.helper).css("left", "74%");
            //sliderCheckInSound.playclip();
            $("#checkInAud")[0].play();
            $(ui.helper).css("left", "5.5%");
            //$(ui.helper).css("left", "76%");
            $(".deny-register").show();
            //$("#test-reut-stars").hide();
            //$(".slider-text").text("");
       
            setTimeout(function() {
                setRegister();
            }, 3000);

            //$("#test-reut-stars").css("left", "0%");
            //$(ui.helper).css("left", "5.5%");
            //$(ui.helper).css("left", "76%");
        }
        else {
            
            $(ui.helper).css("left", "5.5%");
            //$("#test-reut-stars").css("left", "0%");
            //$(ui.helper).css("left", "76%");
        }
    }
});

//drag to register in battle vote
$("#registerBattle .slide.btn.drag").draggable({
    stack: ".drag",
    axis: "x",
    containment: "#registerBattle .slidein",
    drag: function(event, ui) {
    },
    stop: function(event, ui) {
        var lengthNoPx = ui.helper.css("left").length - 2;
        var widthInPx = ($("#registerBattle").width() / 100) * $(".slidein").width();

        if(ui.helper.css("left").substring(0, lengthNoPx) >= (widthInPx / 2)) { //btn position goes over 50%
            $(".slide").addClass("animateLeft");
            $(ui.helper).css("left", "74%");
            $("#checkInAud")[0].play();
            // sliderCheckInSound.playclip();
            $(ui.helper).css("left", "5.5%");
            $(".deny-register").show();
            //$(".slider-text").text("");
            
            setTimeout(function() {
                setRegister();
            }, 3000);

        }
        else {
            $(ui.helper).css("left", "5.5%");
        }
    }
});


//set register going to close 
function setRegisterGoingClose(data) {
    console.log("setOpenRegisterPage data.status: " + data.status);
    //if(data.votes.length ==1){
    //   
    //}
    //else{
    //     Navi.goto("registerBattle");
    //}
    
    $(".register-red-flash").show();
    alertRegisterGoingClose();
}

var alertInterval
function alertRegisterGoingClose() {
    alertInterval = setInterval(function() {
        // alertSound.playclip();
        $("#alertAud")[0].play();
    }, 1000);
}

function stopAlertRegisterGoingClose() {
    clearInterval(alertInterval);
}

//send to server the register
function setRegister() {
    //ajax call server
    $.ajax({
        type: "POST",
        url: serverDomain + "type=registerToVote",
        success: function (data) {
            console.log(data);
            setWaitVotePage(data);
        },
        error: function (data) {
            console.log("error getPage: " + data);
        }
    });
};

//set wait vote page
function setWaitVotePage(data) {

    if (data.length == 0) {
        console.log("no data was received");
        $("#register .continue h2").text("ממתין לסגירת ההצבעה");
        Navi.goto("notRegister");
    }

    else {

        Navi.goto("WaitVotePage");
        generalParameters.voteIdA = data[0].voteId;
        generalParameters.voteKeyA = data[0].voteKey;
        if (data[1]) {
            generalParameters.voteIdB = data[1].voteId;
            generalParameters.voteKeyB = data[1].voteKey;
        }
        generalParameters.isRegistered = true;
    }
};

var index =0;
var registerWishTextInterval;
function initWishText(sliderObj){
    index =0;
    sliderObjTemp =sliderObj;
   // $(sliderObj).html(registerTextHtml);
    var spanArray =  $(sliderObj).children("span");

    setTimeout(function(){
            addWishToLettet(spanArray,sliderObjTemp);
        },200);
      
}

function addWishToLettet(spanArrayTemp,sliderObjTemp){
    $(spanArrayTemp[index]).addClass("wish");
    if(index>0){
         $(spanArrayTemp[index-1]).removeClass("wish");
    }
    
    index++;
    if(index < spanArrayTemp.length){
          setTimeout(function(){
            addWishToLettet(spanArrayTemp,sliderObjTemp);
        },100);
      
    }
    else{

        registerWishTextInterval = setTimeout(function(){
            initWishText(sliderObjTemp)
        },2500);

         setTimeout(function(){
            $(spanArrayTemp[index-1]).removeClass("wish");
        },200);

        
        
    }
}

function clearRegisterWishTextInterval(){
    
    clearTimeout(registerWishTextInterval);
}