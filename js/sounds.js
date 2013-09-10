
function soundsLoad(){
    $('audio').each(function(){
        $(this)[0].load();
    });

    // turn down results audio
    resultsAudio=document.getElementById("voteBarAud");
    resultsAudio.volume = 0.3;
    checkInAudio=document.getElementById("checkInAud");
    checkInAudio.volume = 0.5;
    //console.log(resultsAudio.duration);

    resultsAudio.addEventListener('loadedmetadata', function() {
    console.log("Playing " + resultsAudio.src + ", for: " + resultsAudio.duration + "seconds.");
});
}