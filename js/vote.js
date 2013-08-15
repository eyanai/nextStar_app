var numOfVotesThatChecked =0;

var voteId, voteKey, vote;

//listener
function attachEventsVote() {
   // $("#vote-img-single,#vote-img-first,#vote-img-second").on("click", ".slideLeft, .slideRight, .slideTopbattle, .slideDownbattle", setVote); //click slider
}

//set vote page
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
            //$("#vote-dic-single").text(pushVoteDic);
            toggleTopMenu(pushVoteDic);
            $("#vote-img-single").css("background-image", "url('" + firstFields[2] + "')");
            $("#vote-img-single").show();
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
            //$("#vote-dic-battle").text(pushVoteDic);
            toggleTopMenu(pushVoteDic);
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
        setOpenRegisterPage(data,"vote");
        //Navi.goto("notRegister");        
    }

    //init numOfVotesThatVoted
    numOfVotesThatChecked = 0;

}

//set vote is close
function setVoteClosePage(data) {
    //if registered
    if (generalParameters.isRegistered) {
        console.log("setVoteClosePage data.status: " + data.status);

      
        var isSingleVote;
        var firstFields;
        var secondFields;
        if (isSingle(data)) {
            firstFields = getFielsdByVote(data.votes[0]);
            $("#vote-close-img-single").css("background-image", "url('" + firstFields[2] + "')")
            $("#vote-close-comp-name-single").text(firstFields[0]);
             //set the dictionary text
            //$("#vote-close-dic-single").text(voteCloseDic);
            toggleTopMenu(voteCloseDic);

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
             //set the dictionary text
            //$("#vote-close-dic-battle").text(voteCloseDic);
            toggleTopMenu(voteCloseDic);

            //wait text
            $("#vote-close-wait-text-battle").text(data.textWaitCalc);
            //navigate
            Navi.goto("voteCloseBattle");
        }
    }

    else { //if not registered
        setOpenRegisterPage(data,"vote");
       // Navi.goto("notRegister");        
    }
}

//send to server the vote
function setVote(e) {
    voteId=null; voteKey=null; vote=null;
 //   console.log(e.target.id);
   // console.log(e.delegateTarget.className);
    switch (e.target.id) {
        case 'slideLeft':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 1;
            votePositiveSound.playclip();
            break;
        case 'slideRight':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 0;
            voteNegativeSound.playclip();
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
            vote = 0;
            voteNegativeSound.playclip();
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
            vote = 1;
            votePositiveSound.playclip();
            break;
    }

    console.log(vote, voteId, voteKey);

    $.ajax({
        type: "POST",
        url: serverDomain + "type=vote",
        data: { voteId: voteId, voteKey: voteKey, vote: vote },
        success: function(data) {
            console.log(data);
            numOfVotesThatChecked++;
            //check if show the wait text
                //if is single and one was checked - show it
            if(generalParameters.isSingle){
                if(numOfVotesThatChecked ==1){
                    setWaitVoteClosePage();
                }
            }
            else{
                 //if is battle and two was checked - show it
                if(numOfVotesThatChecked ==2){
                    setWaitVoteClosePage();
                }
            }
            
        },
        error: function(data) {
            console.log("error getPage: " + data);
        }
    });

}

//set wait result page
function setWaitVoteClosePage() {
    //if (vote==0){voteNegativeSound.playclip();}
    //else{votePositiveSound.playclip();}
    toggleTopMenu(afterVoteDic);

    $("#vote .continue").slideDown(500);

}
