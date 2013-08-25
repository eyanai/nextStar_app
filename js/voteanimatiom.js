// JavaScript Document
//var wid=$(document).width();
//var maxwid=wid/2-1;

$('.slideLeft').draggable({
    stack: ".drag",
    axis: "x",
    containment: '#slideSingleLeft',
    drag: function (event, ui) {
        console.log($('.slideLeft').css('left'));
        if ($('.slideLeft').position().left > (($("body").width())/2-1)) {
            //if passes the middle
              $('.arrowRed').addClass('rotDown');
            $('.slideLeft').addClass('badSong');
              $('.slideRight').addClass('hideR');
              setTimeout(function () { $('.arrowRed.rotDown').hide(); }, 1630);
              $('.hate').addClass('hateShow');
            setVote(event);
            return false;
        };

    },
    stop: function (event, ui) {
        if ($('.slideLeft').position().left < (($("body").width())/2-1)) {
            //if doesn't pass the middle
            $('.slideLeft').animate({ left: '20%' }, 800, function () { });
        }
    }

});

$('.slideRight').draggable({ 
	stack: ".drag",
    axis: "x",
    containment:'#slideSingleRight',
    drag: function (event, ui) {
    	if($('.slideRight').position().left<10){
			$('.arrowBlue').addClass('rotupl');
			$('.slideRight').addClass('goodSong');
			$('.slideLeft').addClass('hideL');
			setTimeout(function(){$('.arrowBlue.rotupl').hide();},1630);
			$('.like').addClass('likeShow');
            setVote(event);
			return false;
		};
	},
     stop:function (event, ui) {
		if($('.slideRight').position().left > 10){
			$('.slideRight').animate({left:'30%'},800,function(){});	
		}
	}
});

///////////////////////////////////////////////////////battle////////////////////////////////////////

$('.slideTopbattle.con1').draggable({ //R top
    stack: ".drag",
    axis: "x",
    containment: "#rslidecon",
    drag: function (event, ui) {
        sR = $(document).width();
        if ($('.slideTopbattle.con1').position().left < 1) {
            $('.redArrow.cont1').addClass('rotdwnrcon1');
            $('.slideTopbattle.con1').addClass('battel1vot');
            $('.slideDownbattle.con1').addClass('hideRcon');
            setTimeout(function () { $('.redArrow.cont1.rotdwnrcon1').hide(); }, 1630);
            $('.hate1').addClass('showIconCon1');
            setVote(event);
            return false;
        };
    },
    stop: function (event, ui) {
        if ($('.slideTopbattle.con1').position().left > 1) {
            $('.slideTopbattle.con1').animate({ left: '30%' }, 800, function () { });
        }
    }
});

$('.slideDownbattle.con1').draggable({ //R bottom
	stack: ".drag",
    axis: "x",
    containment:"#rslidecon" ,
    drag: function (event, ui) {
		if($('.slideDownbattle.con1').position().left<1){
			$('.blueArrow.cont1').addClass('rotuprcon1');
			$('.slideDownbattle.con1').addClass('battel1vot');
			$('.slideTopbattle.con1').addClass('hideRcon');
			setTimeout(function(){$('.blueArrow.cont1.rotuprcon1').hide();},1630);
			$('.love1').addClass('showIconCon1');
            setVote(event);
			return false;
		};
	},
	stop:function (event, ui) {
		if($('.slideDownbattle.con1').position().left>1){
			$('.slideDownbattle.con1').animate({left:'30%'},800,function(){});	
		}
	}
});

$('.slideTopbattle.con2').draggable({ //left top
	stack: ".drag",
    axis: "x",
    containment:"#lslidecon" ,
    drag: function (event, ui) {
    	if($('.slideTopbattle.con2').position().left>(($("body").width())/2-1)){
			$('.redArrow.cont2').addClass('rotdwnlcon2');
			$('.slideTopbattle.con2').addClass('battel2vot');
			$('.slideDownbattle.con2').addClass('hideLcon');
			setTimeout(function(){$('.redArrow.cont2.rotdwnlcon2').hide();},1630);
			$('.hate2').addClass('showIconCon2');
            setVote(event);
			return false;
		};
	},
	stop:function (event, ui) {
		if($('.slideTopbattle.con2').position().left<(($("body").width())/2-1)){
			$('.slideTopbattle.con2').animate({left:'20%'},800,function(){});	
		}
	}
});


$('.slideDownbattle.con2').draggable({ //left bottom
	stack: ".drag",
    axis: "x",
    containment:"#lslidecon" ,
    drag: function (event, ui) {
	
    	if($('.slideDownbattle.con2').position().left>(($("body").width())/2-1)){
			$('.blueArrow.cont2').addClass('rotuplcon2');
			$('.slideDownbattle.con2').addClass('battel2vot');
			$('.slideTopbattle.con2').addClass('hideLcon');
			setTimeout(function(){$('.blueArrow.cont2.rotuplcon2').hide();},1630);
			$('.love2').addClass('showIconCon2');
            setVote(event);
			return false;
		}
	}, 
	stop:function (event, ui) {
		if($('.slideDownbattle.con2').position().left<(($("body").width())/2-1)){
			$('.slideDownbattle.con2').animate({left:'20%'},800,function(){});	
		}
	}
});

