var numOfVotesThatChecked = 0;
var voteId, voteKey, vote;

//set vote page
function setVotePage(data) {
    var isSingleVote;
    var firstFields;
    var secondFields;

    if (generalParameters.isRegistered) {
        $("#vote .reMesseg .continue").hide();
        resetAnimations(); //reset animations
        $("#vote .continue h2").text(data.textWaitVote); //take the value from dictionary

        if (isSingle(data)) {

            //wait text
            //var waitText = data.textWaitVote;
            //$(".vote-wait-text").text(waitText);
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
            //var waitText = data.textWaitVote;
            //$(".vote-wait-text").text(waitText);
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
        setOpenRegisterPage(data, "vote");
        //Navi.goto("notRegister");        
    }

    //init numOfVotesThatVoted
    numOfVotesThatChecked = 0;

}

//set vote is close
function setVoteClosePage(data) {
    //if registered
    //if (generalParameters.isRegistered) {
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
        $("#voteClose .continue h2").text(data.textWaitCalc);

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
        $("#voteClose .continue h2").text(data.textWaitCalc);
        //navigate
        Navi.goto("voteCloseBattle");
    }
    //}

    //else { //if not registered
    //    setOpenRegisterPage(data, "vote");
    //    // Navi.goto("notRegister");        
    //}
}

//send to server the vote
function setVote(e) {
    voteId = null; voteKey = null; vote = null;
    switch (e.target.id) {
        case 'slideLeft':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 1;
            $("#votePosAud")[0].play();
            //votePositiveSound.playclip();
            break;
        case 'slideRight':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 0;
            $("#voteNegAud")[0].play();
            //voteNegativeSound.playclip();
            break;
        case 'slideTopbattleCon1':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 0;
            $("#voteNegAud")[0].play();
            //voteNegativeSound.playclip();
            break;
        case 'slideTopbattleCon2':
            voteId = generalParameters.voteIdB;
            voteKey = generalParameters.voteKeyB;
            vote = 0;
            $("#voteNegAud")[0].play();
            //voteNegativeSound.playclip();
            break;
        case 'slideDownbattleCon1':
            voteId = generalParameters.voteIdA;
            voteKey = generalParameters.voteKeyA;
            vote = 1;
            $("#votePosAud")[0].play();
           // votePositiveSound.playclip();
            break;
        case 'slideDownbattleCon2':
            voteId = generalParameters.voteIdB;
            voteKey = generalParameters.voteKeyB;
            vote = 1;
            $("#votePosAud")[0].play();
            //votePositiveSound.playclip();
            break;
    }

    console.log(vote, voteId, voteKey);

    $.ajax({
        type: "POST",
        url: serverDomain + "type=vote",
        data: { voteId: voteId, voteKey: voteKey, vote: vote },
        success: function (data) {
            console.log(data);
            numOfVotesThatChecked++;
            //check if show the wait text
            //if is single and one was checked - show it
            if (generalParameters.isSingle) {
                if (numOfVotesThatChecked == 1) {
                    setWaitVoteClosePage(data);
                }
            }
            else {
                //if is battle and two was checked - show it
                if (numOfVotesThatChecked == 2) {
                    setWaitVoteClosePage(data);
                }
            }

        },
        error: function (data) {
            console.log("error getPage: " + data);
        }
    });

}

//set wait result page
function setWaitVoteClosePage(data) {
    //if (vote==0){voteNegativeSound.playclip();}
    //else{votePositiveSound.playclip();}
    toggleTopMenu(afterVoteDic);

    $("#vote .continue").text(data.voteCloseCalc).slideDown(500);

}

function resetAnimations() {
    $('.blueArrow').removeClass('rotupl');
    $('.slideLeft').removeClass('songGood');
    $('.slideRight').removeClass('hideR');
    $('.love').removeClass('loveShow');
    $('.redArrow').removeClass('rotupr');
    $('.slideRight').removeClass('songBad');
    $('.slideLeft').removeClass('hideL');
    $('.hate').removeClass('hateShow');
    $('.redArrow').show();
    $('.blueArrow').show();
    $('.slideLeft').css('left', '20%');
    $('.slideRight').css('left', '30%');

    $('.redArrow.cont1').removeClass('rotdwnrcon1');
    $('.slideTopbattle.con1').removeClass('battel1vot');
    $('.slideDownbattle.con1').removeClass('hideRcon');
    $('.slideTopbattle.con2,.slideDownbattle.con2').removeClass('hideLcon');
    $('.redArrow.cont1').show();
    $('.hate1').removeClass('showIconCon1');
    $('.contestant1 .slideDownbattle').css('left', '30%');


    $('.blueArrow.cont1').removeClass('rotuprcon1');
    $('.slideDownbattle.con1').removeClass('battel1vot');
    $('.slideTopbattle.con1').removeClass('hideRcon');
    $('.slideTopbattle.con2,.slideDownbattle.con2').removeClass('hideLcon');
    $('.blueArrow.cont1').show();
    $('.love1').removeClass('showIconCon1');
    $('.contestant1 .slideTopbattle').css('left', '30%');

    $('.redArrow.cont2').removeClass('rotdwnlcon2');
    $('.slideTopbattle.con2').removeClass('battel2vot');
    $('.slideDownbattle.con2').removeClass('hideLcon');
    $('.slideTopbattle.con1,.slideDownbattle.con1').removeClass('hideRcon');
    $('.redArrow.cont2').show();
    $('.hate2').removeClass('showIconCon2');
    $('.contestant2 .slideDownbattle').css('left', '20%');

    $('.blueArrow.cont2').removeClass('rotuplcon2');
    $('.slideDownbattle.con2').removeClass('battel2vot');
    $('.slideTopbattle.con2').removeClass('hideLcon');
    $('.slideTopbattle.con1,.slideDownbattle.con1').removeClass('hideRcon');
    $('.blueArrow.cont2').show();
    $('.love2').removeClass('showIconCon2');
    $('.contestant2 .slideTopbattle').css('left', '20%');
}