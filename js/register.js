var voteIdA, voteKeyA, voteIdB, voteKeyB;
//var isRegistered;

function attachEventsRegister() {
    $(".slidein .btn").on("click", setRegister); //click on slider
}

function setOpenRegisterPage(data) {
    generalParameters.isRegistered = false;
    //console.log("data.status: " + data.status);
    //take the value from dictionary
    $("#register-dic").text(registerDic);
    $("#register .slidein").show();
    $("#register .reMesseg .continue").hide();
    var url = "";
    //if this is a double vote
    if (!isSingle(data)) {
        var url1 = "";
        var url2 = "";
        //set the img
        //set the ing by size
        if (isBigSize) {
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
        if (isBigSize) {
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
    console.log(domain);
    $.ajax({
        type: "POST",
        url: domain + "type=registerToVote",
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
        console.log(data);
 Navi.goto("WaitVotePage");    

    generalParameters.voteIdA = data[0].voteId;
    generalParameters.voteKeyA = data[0].voteKey;
    if (data[1]) {
       generalParameters.voteIdB = data[1].voteId;
        generalParameters.voteKeyB = data[1].voteKey;
    }
    generalParameters.isRegistered = true;
   


};
