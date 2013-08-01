function gallerySize(){
    var singleVoteWidth = $("#result-gallery").width() * 45.6 / 100;
    var numSingleVotes = $(".gallery-vote-single").width(singleVoteWidth).size();
    var battleVoteWidth = $("#result-gallery").width() * 75 / 100;
    var numBattleVotes = $(".gallery-vote-battle").width(battleVoteWidth).size();
    var margin = 4;
    $("#result-gallery ul").width(numSingleVotes * (singleVoteWidth+margin) + numBattleVotes * (battleVoteWidth+margin) );

}