function gallerySize(){
    var resultGallery=$("#result-gallery").width();
    var singleVoteWidth = resultGallery * 31 / 100;
    var numSingleVotes = $(".gallery-vote-single").width(singleVoteWidth).size();
    var battleVoteWidth = $("#result-gallery").width() * 50 / 100;
    var numBattleVotes = $(".gallery-vote-battle").width(battleVoteWidth).size();
    var margin = 4;
    var resultGalleryList = numSingleVotes * (singleVoteWidth + margin) + numBattleVotes * (battleVoteWidth + margin);
    $("#result-gallery ul").width( resultGalleryList);
    $("#result-gallery").scrollLeft(resultGalleryList-resultGallery+margin);
}