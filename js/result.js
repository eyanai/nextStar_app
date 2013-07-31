function setResultPage(data){
    console.log("setResultPage data.status: " + data.status);

    //set the dictionary text
    $("#results-dic").text(resultsDic);

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
         $("#results-img-single").css("background-image","url('"+firstFields[2]+"')")
        $("#results-comp-name-single").text(firstFields[0]);
        $("#results-song-name-single").text(firstFields[1]);

        //wait text
        $("#results-wait-text-single").text(data.textWaitContinue);
        //percent
        $("#results-perc-single").text(data.votes[0].finalPercent+"%");
          //navigate
         Navi.goto("resultsSingle");
     }
     else if(!isSingleVote){
         firstFields = getFielsdByVote(data.votes[0]);
         secondFields = getFielsdByVote(data.votes[1]);
            //firat comp
        $("#results-img-first").css("background-image","url('"+firstFields[2]+"')")
        $("#results-comp-name-first").text(firstFields[0]);
        $("#results-song-name-first").text(firstFields[1]);
            //second comp
        $("#results-img-second").css("background-image","url('"+secondFields[2]+"')")
        $("#results-comp-name-second").text(secondFields[0]);
        $("#results-song-name-second").text(secondFields[1]);

        //wait text
        $("#results-wait-text-battle").text(data.textWaitContinue);
         //percent
        $("#results-perc-first").text(data.votes[0].finalPercent+"%");
        $("#results-perc-second").text(data.votes[1].finalPercent+"%");
        //navigate
         Navi.goto("resultsBattle");
     }
}