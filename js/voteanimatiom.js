// JavaScript Document
 

$('.slideLeft').draggable({ 
	stack: ".drag",
    axis: "x",
   // containment:[conleftstart,0,0,0],
    drag: function (event, ui) {
		console.log($('.slideLeft').css('left'));
    	if($('.slideLeft').position().left>-5){
			$('.blueArrow').addClass('rotupl');
			$('.slideLeft').addClass('songGood');
			$('.slideRight').addClass('hideR');
			setTimeout(function(){$('.blueArrow.rotupl').hide();},800);
			$('.love').addClass('loveShow');
			return false;
		};
	}
});
//$('.slideGo').width()

$('.slideRight').draggable({ 
	stack: ".drag",
    axis: "x",
   // containment:[conleftstart,0,0,0],
    drag: function (event, ui) {
		singelR=$(document).width()-$('.slideRight').position().left+40;
    	if($('.slideRight').position().left<singelR){
			$('.redArrow').addClass('rotupr');
			$('.slideRight').addClass('songBad');
			$('.slideLeft').addClass('hideL');
			setTimeout(function(){$('.redArrow.rotupr').hide();},800);
			$('.hate').addClass('hateShow');
			return false;
		};
	}
});

///////////////////////////////////////////////////////battel////////////////////////////////////////


$('.slideTopbattle').draggable({ 
	stack: ".drag",
    axis: "x",
   // containment:"parent" ,
    drag: function (event, ui) {
	
    	//if($('.slideRight').position().left<singelR){
//			$('.redArrow').addClass('rotupr');
//			$('.slideRight').addClass('songBad');
//			$('.slideLeft').addClass('hideL');
//			setTimeout(function(){$('.redArrow.rotupr').hide();},400);
//			$('.hate').addClass('hateShow');
//			return false;
//		};
	}
});