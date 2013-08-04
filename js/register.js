var voteIdA, voteKeyA, voteIdB, voteKeyB;

function attachEventsRegister() {
    $(".slidein .btn").on("click", setRegister); //click on slider
}

function setOpenRegisterPage(data) {
    //console.log("data.status: " + data.status);
    //take the value from dictionary
    $("#register-dic").text(registerDic);
    $("#register .slidein").show();
    $("#register .reMesseg .continue").hide();
    var url = "";
    //if this is a double vote
    if (data.votes.length == 2) {
        //set the img
        //set the ing by size
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
    }
    //if this is a single vote
    else {

    }

    //show register page
    Navi.goto("register");

}

function setRegisterGoingClose(data) {
    console.log("setOpenRegisterPage data.status: " + data.status);
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

    $(".slidein").hide();
    $("#register .reMesseg .continue").show();

    voteIdA = data[0].voteId;
    voteKeyA = data[0].voteKey;
    if (data[1]) {
        voteIdB = data[1].voteId;
        voteKeyB = data[1].voteKey;
    }
    console.log(voteKeyB);



};
