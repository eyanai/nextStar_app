
//------play sounds-------//
//var html5_audiotypes = { //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
//    "mp3": "audio/mpeg",
//    "mp4": "audio/mp4",
//    "ogg": "audio/ogg",
//    "wav": "audio/wav"
//}


//function createsoundbite(sound) {
//    var html5audio = document.createElement('audio');
//    // $(document).append(html5audio);
//    if (html5audio.canPlayType) { //check support for HTML5 audio
//        for (var i = 0; i < arguments.length; i++) {
//            var sourceel = document.createElement('source');
//            sourceel.setAttribute('src', arguments[i]);
//            if (arguments[i].match(/\.(\w+)$/i));
//            //sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
//            html5audio.appendChild(sourceel);
//        }
//        html5audio.load();
//        html5audio.playclip = function () {
//            html5audio.pause();
//           // html5audio.currentTime = 0;
//            html5audio.play();
//        }
//        return html5audio;
//    }
//    else {
//        return { playclip: function () { throw new Error("Your browser doesn't support HTML5 audio unfortunately") } }
//    }
//}

////Initialize sounds
//var alertSound = createsoundbite("../sounds/Alert.mp3");
//var genClickSound = createsoundbite("../sounds/Gen Click.mp3");
//var sliderCheckInSound = createsoundbite("../sounds/Slider Check in.mp3");
//var voteBarsSound = createsoundbite("../sounds/Vote Bars.mp3");
//var voteNegativeSound = createsoundbite("../sounds/Vote Sound Negative.mp3");
//var votePositiveSound = createsoundbite("../sounds/Vote Sound Positive.mp3");



//function initSounds(){
//   $("#alert-audio")[0].load(); 
//}

//function playclip(audio){
//  audio[0].play();  
//}


function soundsLoad(){
    $('audio').each(function(){
        $(this)[0].load();
    });
}