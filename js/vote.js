var numOfVotesThatChecked =0;

function attachEventsVote() {
    $("#vote-img-single,#vote-img-first,#vote-img-second").on("click", ".slideLeft, .slideRight, .slideTopbattle, .slideDownbattle", setVote); //click slider
}

function setVotePage(data) {
    var isSingleVote;
    var firstFields;
    var secondFields;

    if (generalParameters.isRegistered) {
        $("#vote .reMesseg .continue").hide();

        if (isSingle(data)) {
            //wait text
            var waitText = data.textWaitVote;
            $(".vote-wait-text").text(waitText);
            firstFields = getFielsdByVote(data.votes[0]);
            //set the dic title
            $("#vote-dic-single").text(pushVoteDic);
            $("#vote-img-single").css("background-image", "url('" + firstFields[2] + "')")
            $("#vote-comp-name-single").text(firstFields[0]);
            $("#vote-song-name-single").text(firstFields[1]);

            //navigate
            Navi.goto("voteSingle");
        }
        else if (!isSingle(data)) {
            //wait text
            var waitText = data.textWaitVote;
            $(".vote-wait-text").text(waitText);
            firstFields = getFielsdByVote(data.votes[0]);
            secondFields = getFielsdByVote(data.votes[1]);
            //set the dic title
            $("#vote-dic-battle").text(pushVoteDic);
            //firat comp
            $("#vote-img-first").css("background-image", "url('" + firstFields[2] + "')")
            $("#vote-comp-name-first").text(firstFields[0]);
            $("#vote-song-name-first").text(firstFields[1]);
            //second comp
            $("#vote-img-second").css("background-image", "url('" + secondFields[2] + "')")
            $("#vote-comp-name-second").text(secondFields[0]);
            $("#vote-song-name-second").text(secondFields[1]);

            //navigate
            Navi.goto("voteBattle");
        }
    }
    else { //if not registered
        setOpenRegisterPage(data);
        Navi.goto("notRegister");        
    }

    //init numOfVotesThatVoted
    numOfVotesThatChecked = 0;

}

//vote close

function setVoteClosePage(data) {
    //if registered
    if (generalParameters.isRegistered) {
        console.log("setVoteClosePage data.status: " + data.status);

        //set the dictionary text
        $("#vote-close-dic").text(resultsDic);

        var isSingleVote;
        var firstFields;
        var secondFields;
        if (isSingle(data)) {
            firstFields = getFielsdByVote(data.votes[0]);
            $("#vote-close-img-single").css("background-image", "url('" + firstFields[2] + "')")
            $("#vote-close-comp-name-single").text(firstFields[0]);
            $("#vote-close-song-name-single").text(firstFields[1]);

            //wait text
            $("#vote-close-wait-text-single").text(data.textWaitCalc);

            //navigate
            Navi.goto("voteCloseSingle");
        }
        else if (!isSingle(data)) {
            firstFields = getFielsdByVote(data.votes[0]);
            secondFields = getFielsdByVote(data.votes[1]);
            //firat comp
            $("#vote-close-img-first").css("background-image", "url('" + firstFields[2] + "')")
            $("#vote-close-comp-name-first").text(firstFields[0]);
            $("#vote-close-song-name-first").text(firstFields[1]);
            //second comp
            $("#vote-close-img-second").css("background-image", "url('" + secondFields[2] + "')")
            $("#vote-close-comp-name-second").text(secondFields[0]);
            $("#vote-close-song-name-second").text(secondFields[1]);

            //wait text
            $("#vote-close-wait-text-battle").text(data.textWaitCalc);
            //navigate
            Navi.goto("voteCloseBattle");
        }
    }

    else { //if not registered
        setOpenRegisterPage(data);
        Navi.goto("notRegister");        
    }
}

function setVote(e) {
    var voteId, voteKey, vote;
    console.log(e.currentTarget.className);
    console.log(e.delegateTarget.className);
    switch (e.currentTarget.className) {
        case 'slideLeft':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 1;
            break;
        case 'slideRight':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 0;
            break;
        case 'slideTopbattle':
            if (e.delegateTarget.className == "contestant1") {
                voteId = generalParameters.voteIdA;
                voteKey = generalParameters.voteKeyA;
            }
            else if (e.delegateTarget.className == "contestant2") {
                voteId = generalParameters.voteIdB;
                voteKey = generalParameters.voteKeyB;
            }
            vote = 1;
            break;
        case 'slideDownbattle':
            if (e.delegateTarget.className == "contestant1") {
                voteId = generalParameters.voteIdA;
                voteKey = generalParameters.voteKeyA;
            }
            else if (e.delegateTarget.className == "contestant2") {
                voteId = generalParameters.voteIdB;
                voteKey = generalParameters.voteKeyB;
            }
            vote = 0;
            break;
    }

    console.log(vote, voteId, voteKey);

    $.ajax({
        type: "POST",
        url: domain + "type=vote",
        data: { voteId: voteId, voteKey: voteKey, vote: vote },
        success: function(data) {
            console.log(data);
            numOfVotesThatChecked++;
            //check if show the wait text
                //if is single and one was checked - show it
            if(generalParameters.isSingle){
                if(numOfVotesThatChecked ==1){
                    setWaitResultsPage();
                }
            }
            else{
                 //if is battle and two was checked - show it
                if(numOfVotesThatChecked ==2){
                    setWaitResultsPage();
                }
            }
            
        },
        error: function(data) {
            console.log("error getPage: " + data);
        }
    });

}

function setWaitResultsPage() {
    $("#vote-img-single").hide();
    $("#vote .reMesseg .continue").show();
}