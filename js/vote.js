function setVotePage(data){
     var isSingleVote ;
      var firstFields;
      var secondFields;
     if(data.votes.length == 2){
         isSingleVote = false;
     }
     else  if(data.votes.length == 1){
         isSingleVote = true;
     }
     
     if(isSingleVote){
         //wait text
     $("#results-wait-text-single").text();
         firstFields = getFielsdByVote(data.votes[1]);
        //set the dic title
        $("#vote-dic-single").text(pushVoteDic);
        $("#vote-img-single").css("background-image","url('"+firstFields[2]+"')")
        $("#vote-comp-name-single").text(firstFields[0]);
        $("#vote-song-name-single").text(firstFields[1]);

        //navigate
         Navi.goto("voteSingle");
     }
     else if(!isSingleVote){
          //wait text
         $("#results-wait-text-battle").text();
         firstFields = getFielsdByVote(data.votes[0]);
         secondFields = getFielsdByVote(data.votes[1]);
        //set the dic title
        $("#vote-dic-battle").text(pushVoteDic);
            //firat comp
        $("#vote-img-first").css("background-image","url('"+firstFields[2]+"')")
        $("#vote-comp-name-first").text(firstFields[0]);
        $("#vote-song-name-first").text(firstFields[1]);
            //second comp
        $("#vote-img-second").css("background-image","url('"+secondFields[2]+"')")
        $("#vote-comp-name-second").text(secondFields[0]);
        $("#vote-song-name-second").text(secondFields[1]);

        //navigate
        Navi.goto("voteBattle");
     }

}

//vote close

function setVoteClosePage(data){
     console.log("setVoteClosePage data.status: " + data.status);
     //wait text
     $("#results-wait-text-single").text(data.textWaitContinue);
}