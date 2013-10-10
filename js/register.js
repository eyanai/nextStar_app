var voteIdA, voteKeyA, voteIdB, voteKeyB;

var registerTextHtml = "<span>כ</span><span>נ</span><span>י</span><span>ס</span><span>ה</span> <span>ל</span><span>ה</span><span>צ</span><span>ב</span><span>ע</span><span>ה</span>";
//set register page
function setOpenRegisterPage(data, from) {
    initVoteGeneralParameters();

    voteGeneralParameters.status = data.status
   
    voteGeneralParameters.votePageId = data.id;
   // generalParameters.isRegistered = false;

    $("#register .continue h2").text(data.textWaitRegister); //take the value from dictionary

    if ($(window).width() > 700) {
        $(".slide").css("left", "10px");
    }
    else {
        $(".slide").css("left", "4px");
    }
    $(".slider-text").html(registerTextHtml);
    $(".slider-text").show();
    $("#register .slidein").show();
    $(".deny-register").hide();
    $("#register .reMesseg .continue").hide();
    var url = "";
    setIsSingle(data);
    setRegisterGeneralParams(data);
    //if this is a double vote
    if (!voteGeneralParameters.isSingle) {
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
        $("#register-img-first").css("background-image", "url('" + url1 + "')");
        $("#register-comp-name-first").text(name1);
        $("#register-song-name-first").text(song1);
        $("#register-img-second").css("background-image", "url('" + url2 + "')");
        $("#register-comp-name-second").text(name2);
        $("#register-song-name-second").text(song2);
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
        $("#register-single-img").css("background-image", "url('" + url + "')");
        $("#register-comp-name-single").text(name);
        $("#register-song-name-single").text(song);
        Navi.goto("registerSingle");
    }

    if (from == "vote") {
        $("#register .reMesseg .continue h2").text(data.textWaitVote);
        Navi.goto("notRegister");
    }
    else {
        $(".topMenu").show();
        toggleTopMenu(registerDic);
    }

}

function attachDrag() {

    $("#registerSingle .slide.btn.drag").click(function () {
        setRegister()
    });
    $("#registerBattle .slide.btn.drag").click(function () {
        setRegister()
    });

    //drag to register in  single vote
    $("#registerSingle .slide.btn.drag").draggable({
        stack: ".drag",
        axis: "x",
        containment: "#registerSingle .slidein",
        drag: function (event, ui) {
            var lengthNoPx = ui.helper.css("left").length - 2;
            var widthInPx = ($("#registerSingle").width() / 100) * $(".slidein").width();
            if (ui.helper.css("left").substring(0, lengthNoPx) >= (widthInPx * 0.03)) {
                $(".slider-text").hide();
            }
            console.log("ui.offset.left: " + ui.offset.left);
            console.log("% " + ui.offset.left / ui.offset.width);
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
                console.log($(ui.helper).css("left"));
                console.log("% " + ui.helper.left / ui.helper.width);
                if ($(window).width() > 700) {
                    $(ui.helper).css("left", "52%");
                }
                else {
                    $(ui.helper).css("left", "60%");
                }
                //$(".slide").addClass("register-slide-back");
                $("#checkInAud")[0].play();
                // $(ui.helper).css("left", "4px");
				
				$(".slidein").hide();
                $(".deny-register").show();
                setTimeout(function () {
                    setRegister();
                    Navi.goto("WaitVotePage");
                }, 300);



            }
            else {

                if ($(window).width() > 700) {
                    $(ui.helper).css("left", "10px");
                }
                else {
                    $(ui.helper).css("left", "4px");
                }
                $(".slider-text").show();
            }
        }
    });

    //drag to register in battle vote
    $("#registerBattle .slide.btn.drag").draggable({
        stack: ".drag",
        axis: "x",
        containment: "#registerBattle .slidein",
        drag: function (event, ui) {
            var lengthNoPx = ui.helper.css("left").length - 2;
            var widthInPx = ($("#registerBattle").width() / 100) * $(".slidein").width();
            if (ui.helper.css("left").substring(0, lengthNoPx) >= (widthInPx * 0.15)) {
                $(".slider-text").hide();
            }
        },
        stop: function (event, ui) {
            var lengthNoPx = ui.helper.css("left").length - 2;
            var widthInPx = ($("#registerBattle").width() / 100) * $(".slidein").width();

        if(ui.helper.css("left").substring(0, lengthNoPx) >= (widthInPx / 2)) { //btn position goes over 50%
            if ($(window).width() > 700){
				$(ui.helper).css("left", "52%");
			}
			else {
				$(ui.helper).css("left", "60%");
			}
            //$(".slide").addClass("register-slide-back");
            $("#checkInAud")[0].play();
            // $(ui.helper).css("left", "4px");
			$(".slidein").hide();
            $(".deny-register").show();
            //stop the red flash sound
            $("#alertAud")[0].pause();
            clearInterval(alertInterval);
            setTimeout(function() {
                 setRegister();
                 Navi.goto("WaitVotePage");
                }, 1600);

            }
            else {
                if ($(window).width() > 700) {
                    $(ui.helper).css("left", "10px");
                }
                else {
                    $(ui.helper).css("left", "4px");
                }
                $(".slider-text").show();
            }
        }
    });
}



//set register going to close 
function setRegisterGoingClose(data) {
    console.log("setOpenRegisterPage data.status: " + data.status);
    //if the user where in register page before the red flash
    if ($('#register').is(":visible")) {
        //show and play the audio if the user not register
        if (!voteGeneralParameters.registered) {
            $(".register-red-flash").show();
            alertRegisterGoingClose();
        }
    }
    //else- set the data to the html object
    else {
        setOpenRegisterPage(data);

        $(".register-red-flash").show();
        alertRegisterGoingClose();
    }
    //show and play the audio if the user not register
    //if (!voteGeneralParameters.registered) {
    //    $(".register-red-flash").show();
    //    alertRegisterGoingClose();
    //}

}

var alertInterval;
function alertRegisterGoingClose() {
    
     //clearInterval(alertInterval);
    alertInterval = setInterval(function () {
        $("#alertAud")[0].play();
        
    }, 1000);
}

function stopAlertRegisterGoingClose() {
    clearInterval(alertInterval);
}

//send to server the register
function setRegister() {
    voteGeneralParameters.registered = true;
    //voteGeneralParameters.votePageId = data.id;

    var data = "";
    var facebookid = 0;
    if (generalParameters.fbUser.id != null) {
        facebookid = generalParameters.fbUser.id;
    }
    if (voteGeneralParameters.isSingle) {
        data = { voteId1: voteGeneralParameters.voteid1, facebookId: facebookid }
    }
    else {
        data = { voteId1: voteGeneralParameters.voteid1, voteId2: voteGeneralParameters.voteid2, facebookId: facebookid }
    }

    $.ajax({
        type: "POST",
        url: serverDomain + "type=registerToVote",
        data: data,
        success: function (data) {

            //if the response return when the status is 21-register time
            if (voteGeneralParameters.status == 21) {
                //if the response return when the page id is identical
                if ((voteGeneralParameters.voteid1 == data[0].voteId) || (voteGeneralParameters.voteid1 == null)) {
                     setWaitVotePage(data);
                   
                }
                //else- if the response return when this is register of another vote (different page id)
                else{
                    //do nothing
                }

            }
            //else - if the current status is another - vote ot publish result etc.
            else {

                registerReturnFromServerDelay(data);
            }

        },
        error: function (request, status, error) {
            //when error eccured- the user was transfered to the next pages and didnt know about the error
        }
    });

    //stop the flash sound when user checkin
    stopAlertRegisterGoingClose()
};

//set wait vote page
function setWaitVotePage(data) {
  
    //
    if (data.length == 0) {

        //error eccured in the server - the data=""
        console.log("no data was received");
        //$("#register .continue h2").text("ממתין לסגירת ההצבעה");
       // Navi.goto("notRegister");


    }

    else {
        voteGeneralParameters.votekey1 = data[0].voteKey;
        if (data[1]) {
            voteGeneralParameters.votekey2 = data[1].voteKey;
        }
    }

};

function registerReturnFromServerDelay(data) {
    voteGeneralParameters.votekey1 = data[0].voteKey;
    if (data[1]) {
        voteGeneralParameters.votekey2 = data[1].voteKey;
    }

    //check if the status is vote - and the user was voted - take his data and send to teh server
    if (data.status == 23){
        voteId = voteGeneralParameters.voteid1;
        voteKey =voteGeneralParameters.votekey1;
        vote =voteGeneralParameters.like1;
        
        sendVoteToServer(voteId,voteKey,vote);
        
        if (!voteGeneralParameters.isSingle){
            voteId = voteGeneralParameters.voteid2;
            voteKey =voteGeneralParameters.votekey2;
            vote =voteGeneralParameters.like2;
        
            sendVoteToServer(voteId,voteKey,vote);
        }
    }
}


var index = 0;
var registerWishTextInterval;
function initWishText(sliderObj) {
    index = 0;
    sliderObjTemp = sliderObj;
    var spanArray = $(sliderObj).children("span");

    setTimeout(function () {
        addWishToLettet(spanArray, sliderObjTemp);
    }, 200);

}

function addWishToLettet(spanArrayTemp, sliderObjTemp) {
    $(spanArrayTemp[index]).addClass("wish");
    if (index > 0) {
        $(spanArrayTemp[index - 1]).removeClass("wish");
    }

    index++;
    if (index < spanArrayTemp.length) {
        setTimeout(function () {
            addWishToLettet(spanArrayTemp, sliderObjTemp);
        }, 100);

    }
    else {

        registerWishTextInterval = setTimeout(function () {
            initWishText(sliderObjTemp)
        }, 2500);

        setTimeout(function () {
            $(spanArrayTemp[index - 1]).removeClass("wish");
        }, 200);



    }
}

function clearRegisterWishTextInterval() {

    clearTimeout(registerWishTextInterval);
}


function setRegisterGeneralParams(data) {
    voteGeneralParameters.voteid1 = data.votes[0].voteID;

    if (!voteGeneralParameters.isSingle) {
        voteGeneralParameters.voteid2 = data.votes[1].voteID;
    }



}


function initVoteGeneralParameters() {

    voteGeneralParameters.status = 0;
    voteGeneralParameters.isSingle = null;
    voteGeneralParameters.registered = false;
    voteGeneralParameters.voteid1 = 0;
    voteGeneralParameters.voteid2 = 0;
    voteGeneralParameters.votekey1 = null;
    voteGeneralParameters.votekey2 = null;
    voteGeneralParameters.like1 = null;
    voteGeneralParameters.like2 = null;
    voteGeneralParameters.votePageId = 0;
}