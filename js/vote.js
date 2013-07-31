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
         var waitText = data.textWaitVote;
        $(".vote-wait-text").text(waitText);
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
         var waitText = data.textWaitVote;
         $(".vote-wait-text").text(waitText);
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
     
    //set the dictionary text
    $("#vote-close-dic").text(resultsDic);

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
         firstFields = getFielsdByVote(data.votes[0]);
         $("#vote-close-img-single").css("background-image","url('"+firstFields[2]+"')")
        $("#vote-close-comp-name-single").text(firstFields[0]);
        $("#vote-close-song-name-single").text(firstFields[1]);

        //wait text
        $("#vote-close-wait-text-single").text(data.textWaitCalc);

          //navigate
         Navi.goto("voteCloseSingle");
     }
     else if(!isSingleVote){
         firstFields = getFielsdByVote(data.votes[0]);
         secondFields = getFielsdByVote(data.votes[1]);
            //firat comp
        $("#vote-close-img-first").css("background-image","url('"+firstFields[2]+"')")
        $("#vote-close-comp-name-first").text(firstFields[0]);
        $("#vote-close-song-name-first").text(firstFields[1]);
            //second comp
        $("#vote-close-img-second").css("background-image","url('"+secondFields[2]+"')")
        $("#vote-close-comp-name-second").text(secondFields[0]);
        $("#vote-close-song-name-second").text(secondFields[1]);

        //wait text
        $("#vote-close-wait-text-battle").text(data.textWaitCalc);
        //navigate
         Navi.goto("voteCloseBattle");
     }
}