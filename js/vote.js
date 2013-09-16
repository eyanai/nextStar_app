var numOfVotesThatChecked = 0;
var voteId, voteKey, vote;
var waitVoteText = "";
//set vote page
function setVotePage(data) {
    var isSingleVote;
    var firstFields;
    var secondFields;

    //set the wait text
    waitVoteText = data.textWaitVote;
    voteGeneralParameters.status = data.status;
    //alert("setVotePage");
    //if the user was register - only if the register server request didnt return - do
    //alert(" voteGeneralParameters.voteid1: " + voteGeneralParameters.voteid1 + " ; data.votes[0].voteID: " + data.votes[0].voteID);
    if (voteGeneralParameters.registered ) {
        //if we have the voteID that correct for the current vote
        if( voteGeneralParameters.voteid1 == data.votes[0].voteID){
                      $("#vote .reMesseg .continue").hide();
                resetAnimations(); //reset animations
                $("#vote .continue #vote-wait-text").text(data.textWaitVote); //take the value from dictionary
                setIsSingle(data);

                if (voteGeneralParameters.isSingle) {

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
                else if (!voteGeneralParameters.isSingle) {
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
        else{
             setOpenRegisterPage(data, "vote");
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
    setIsSingle(data);

    if (voteGeneralParameters.isSingle) {
        firstFields = getFielsdByVote(data.votes[0]);
        $("#vote-close-img-single").css("background-image", "url('" + firstFields[2] + "')")
        $("#vote-close-comp-name-single").text(firstFields[0]);
        $("#vote-close-song-name-single").text(firstFields[1]);
        //set the dictionary text
        //$("#vote-close-dic-single").text(voteCloseDic);
        toggleTopMenu(voteCloseDic);

        //wait text
        $("#voteClose .continue h2").text(data.textWaitCalc);

        //navigate
        Navi.goto("voteCloseSingle");
    }
    else if (!voteGeneralParameters.isSingle) {
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
    //alert("setVote");
    voteId = null; voteKey = null; vote = null;
    switch (e.target.id) {
        case 'slideLeft':
            voteId = voteGeneralParameters.voteid1;
            voteKey = voteGeneralParameters.votekey1;
            vote = 0;
            voteGeneralParameters.like1 = 0;
            $("#voteNegAud")[0].play()
            break;
        case 'slideRight':
            voteId = voteGeneralParameters.voteid1;
            voteKey = voteGeneralParameters.votekey1;
            vote = 1;
            voteGeneralParameters.like1 = 1;
            $("#votePosAud")[0].play()
            break;


        case 'slideTopbattleCon1':
            voteId = voteGeneralParameters.voteid2;
            voteKey = voteGeneralParameters.votekey2;
            vote = 0;
            voteGeneralParameters.like2 = 0;
            $("#voteNegAud")[0].play()
            break;
        case 'slideTopbattleCon2':
            voteId = voteGeneralParameters.voteid1;
            voteKey = voteGeneralParameters.votekey1;
            vote = 0;
            voteGeneralParameters.like1 = 0;
            $("#voteNegAud")[0].play()
            break;
        case 'slideDownbattleCon1':
            voteId = voteGeneralParameters.voteid2;
            voteKey = voteGeneralParameters.votekey2;
            vote = 1;
            voteGeneralParameters.like2 = 1;
            $("#votePosAud")[0].play();

            break;
        case 'slideDownbattleCon2':
            voteId = voteGeneralParameters.voteid1;
            voteKey = voteGeneralParameters.votekey1;
            vote = 1;
            voteGeneralParameters.like1 = 1;
            $("#votePosAud")[0].play()
            break;
    }

    console.log(vote, voteId, voteKey);

    //show the wait text if return from server and if not
    numOfVotesThatChecked++;
    setWaitVoteClosePage();

    //if the register return from server- send the vote to server, else - wait 
    if(voteGeneralParameters.votekey1 != null || voteGeneralParameters.votekey2 != null){
        sendVoteToServer(voteId,voteKey,vote);
    }
    else{
        
    }

}

function sendVoteToServer(voteId,voteKey,vote){
    
   // alert("sendVoteToServer");
    $.ajax({
        type: "POST",
        url: serverDomain + "type=vote",
        data: { voteId: voteId, voteKey: voteKey, vote: vote },
        success: function (data) {
            console.log(data);
            //numOfVotesThatChecked++;
           //alert("suc" +data.result);
           //alert("suc" +data);
           //show the wait text if the server respone return and if not
            //setWaitVoteClosePage(data);
//              alert("vote");

        },
        error: function (data) {
            console.log("error getPage: " + data);
          //  alert("err");
        }
    });
}


//set wait result page
function setWaitVoteClosePage() {
    //if this is a single vote - show the wait and top menu
    //if this is a double vote - show the wait and top menu only if the user vote to 2 
    if(voteGeneralParameters.isSingle){
          toggleTopMenu(afterVoteDic);
          $("#vote .continue #vote-wait-text").text(waitVoteText);
          $("#vote .continue").slideDown(500);
     }
   else{
       if(numOfVotesThatChecked == 2){
         toggleTopMenu(afterVoteDic);
         $("#vote .continue #vote-wait-text").text(waitVoteText);
          $("#vote .continue").slideDown(500);
       }
   }
    //remove the vote buttons
    if(voteGeneralParameters.like1 ==null){
        
    }
    if(voteGeneralParameters.like2 ==null){
        
    }

}

function resetAnimations() {
    $('.slideRight').draggable('enable');
    $('.slideLeft').draggable('enable');
    $('.slideDownbattle.con1').draggable('enable');
    $('.slideTopbattle.con1').draggable('enable');
    $('.slideDownbattle.con2').draggable('enable');
    $('.slideTopbattle.con2').draggable('enable');

    $('.arrowRed').removeClass('rotDown');
    $('.slideLeft').removeClass('badSong');
    $('.slideRight').removeClass('hideR');
    $('.hate').removeClass('hateShow');
    $('.arrowBlue').removeClass('rotupl');
    $('.slideRight').removeClass('goodSong');
    $('.slideLeft').removeClass('hideL');
    $('.like').removeClass('likeShow');
    $('.arrowBlue').show();
    $('.arrowRed').show();
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