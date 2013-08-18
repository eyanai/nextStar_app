// JavaScript Document
var wid=$(document).width();
var maxwid=wid/2;

$('.slideLeft').draggable({
    stack: ".drag",
    axis: "x",
    containment:'#slideSingleLeft',
    drag: function (event, ui) {
		console.log($('.slideLeft').css('left'));
        if ($('.slideLeft').position().left > maxwid) {
            $('.blueArrow').addClass('rotupl');
            $('.slideLeft').addClass('songGood');
            $('.slideRight').addClass('hideR');
            setTimeout(function () { $('.blueArrow.rotupl').hide(); }, 800);
            $('.love').addClass('loveShow');
            setVote(event);
            return false;
        };

    },
    stop:function (event, ui) {
		if($('.slideLeft').position().left < maxwid){
			$('.slideLeft').animate({left:'20%'},800,function(){});	
		}
	}

});

$('.slideRight').draggable({ 
	stack: ".drag",
    axis: "x",
    containment:'#slideSingleRight',
    drag: function (event, ui) {
    	if($('.slideRight').position().left<10){
			$('.redArrow').addClass('rotupr');
			$('.slideRight').addClass('songBad');
			$('.slideLeft').addClass('hideL');
			setTimeout(function(){$('.redArrow.rotupr').hide();},800);
			$('.hate').addClass('hateShow');
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
        if ($('.slideTopbattle.con1').position().left < 10) {
            $('.redArrow.cont1').addClass('rotuprcon1');
            $('.slideTopbattle.con1').addClass('battel1vot');
            $('.slideDownbattle.con1').addClass('hideRcon');
            //	$('.slideTopbattle.con2,.slideDownbattle.con2').addClass('hideLcon');
            setTimeout(function () { $('.redArrow.cont1.rotuprcon1').hide(); }, 800);
            $('.hate1').addClass('showIconCon1');
            setVote(event);
            return false;
        };
    },
    stop: function (event, ui) {
        if ($('.slideTopbattle.con1').position().left > 10) {
            $('.slideTopbattle.con1').animate({ left: '30%' }, 800, function () { });
        }
    }
});

$('.slideDownbattle.con1').draggable({ //R bottom
	stack: ".drag",
    axis: "x",
    containment:"#rslidecon" ,
    drag: function (event, ui) {
		if($('.slideDownbattle.con1').position().left<10){
			$('.blueArrow.cont1').addClass('rotuprcon1');
			$('.slideDownbattle.con1').addClass('battel1vot');
			$('.slideTopbattle.con1').addClass('hideRcon');
	//		$('.slideTopbattle.con2,.slideDownbattle.con2').addClass('hideLcon');
			setTimeout(function(){$('.blueArrow.cont1.rotuprcon1').hide();},800);
			$('.love1').addClass('showIconCon1');
            setVote(event);
			return false;
		};
	},
	stop:function (event, ui) {
		if($('.slideDownbattle.con1').position().left>10){
			$('.slideDownbattle.con1').animate({left:'30%'},800,function(){});	
		}
	}
});

$('.slideTopbattle.con2').draggable({ //left top
	stack: ".drag",
    axis: "x",
    containment:"#lslidecon" ,
    drag: function (event, ui) {
    	if($('.slideTopbattle.con2').position().left>maxwid){
			$('.redArrow.cont2').addClass('rotuplcon2');
			$('.slideTopbattle.con2').addClass('battel2vot');
			$('.slideDownbattle.con2').addClass('hideLcon');
		//	$('.slideTopbattle.con1,.slideDownbattle.con1').addClass('hideRcon');
			setTimeout(function(){$('.redArrow.cont2.rotuplcon2').hide();},800);
			$('.hate2').addClass('showIconCon2');
            setVote(event);
			return false;
		};
	},
	stop:function (event, ui) {
		if($('.slideTopbattle.con2').position().left<maxwid){
			$('.slideTopbattle.con2').animate({left:'20%'},800,function(){});	
		}
	}
});


$('.slideDownbattle.con2').draggable({ //left bottom
	stack: ".drag",
    axis: "x",
    containment:"#lslidecon" ,
    drag: function (event, ui) {
	
    	if($('.slideDownbattle.con2').position().left>maxwid){
			$('.blueArrow.cont2').addClass('rotuplcon2');
			$('.slideDownbattle.con2').addClass('battel2vot');
			$('.slideTopbattle.con2').addClass('hideLcon');
		//	$('.slideTopbattle.con1,.slideDownbattle.con1').addClass('hideRcon');
			setTimeout(function(){$('.blueArrow.cont2.rotuplcon2').hide();},800);
			$('.love2').addClass('showIconCon2');
            setVote(event);
			return false;
		}
	}, 
	stop:function (event, ui) {
		if($('.slideDownbattle.con2').position().left<maxwid){
			$('.slideDownbattle.con2').animate({left:'20%'},800,function(){});	
		}
	}
});

