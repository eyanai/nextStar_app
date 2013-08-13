var voteIdA, voteKeyA, voteIdB, voteKeyB;
//var isRegistered;

//function attachEventsRegister() {
//    //$(".slidein .btn").on("click", setRegister); //click on slider
//}

$("#registerSingle .slide.btn.drag").draggable({
    stack: ".drag",
    axis: "x",
    containment: "#registerSingle .slidein",
    drag: function (event, ui) {
    },
    stop: function (event, ui) {
        if (ui.helper.css("left").substring(0, ui.helper.css("left").length - 2) >=
                        ($(".slidein").width().substring(0, $(".slidein").width().length - 2)) / 2) {
            $(ui.helper).css("left", "74%");
            $(ui.helper).css("left", "5.5%");
            $(".slider-text").text("");
            setRegister();
        }
        else {
            $(ui.helper).css("left", "5.5%");
        }
    }
});

$("#registerBattle .slide.btn.drag").draggable({
    stack: ".drag",
    axis: "x",
    containment: "#registerBattle .slidein",
    drag: function (event, ui) {
    },
    stop: function (event, ui) {
        var lengthNoPx = ui.helper.css("left").length - 2;

        if (ui.helper.css("left").substring(0, lengthNoPx) >= ($(".slidein").width() / 2)) { //btn position goes over 50%
            $(ui.helper).css("left", "74%");
            $(ui.helper).css("left", "5.5%");
            $(".slider-text").text("");
            setRegister();
        }
        else {
            $(ui.helper).css("left", "5.5%");
        }
    }
});

function setOpenRegisterPage(data) {
    generalParameters.isRegistered = false;
    //take the value from dictionary
    toggleTopMenu(registerDic);
    $(".slide").css("left", "5.5%");
     $(".slider-text").text("כניסה להצבעה");
    $("#register .slidein").show();
    $("#register .reMesseg .continue").hide();
    var url = "";
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
        var textWait = data.textWaitRegister;
        $("#register-img-first").css("background-image", "url('" + url1 + "')");
        $("#register-comp-name-first").text(name1);
        $("#register-song-name-first").text(song1);
        $("#register-img-second").css("background-image", "url('" + url2 + "')");
        $("#register-comp-name-second").text(name2);
        $("#register-song-name-second").text(song2);
        $("#register-wait-text").text(textWait);
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
        var textWait = data.textWaitRegister;
        $("#register-single-img").css("background-image", "url('" + url + "')");
        $("#register-comp-name-single").text(name);
        $("#register-song-name-single").text(song);
        $("#register-wait-text").text(textWait);
        Navi.goto("registerSingle");
    }



}

function setRegisterGoingClose(data) {
    console.log("setOpenRegisterPage data.status: " + data.status);
    $(".register-red-flash").show();
}

function setRegister() {
    //ajax call server

    //console.log(domain);
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

function setWaitVotePage(data) {

    if (data.length == 0) {
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
