// JavaScript nevigation

var Navi={
	
	hidelogin:function(){
		$('header').show();
		$('#login,section').hide();
	},
	
	goto:function(el){
		switch(el)
			{
			case 'message':
				$('header').show();
				$('#login').hide();
				$('#message').show();
			  break;
			case 'register':
				Navi.hidelogin();
				$('#register').show();
			  break;
			 case 'vote':
			 	Navi.hidelogin();
				$('#vote').show();
			  break;
			 case 'results':
				 Navi.hidelogin();
				$('#results').show();
			  break;
			 case 'gallery':
			 	Navi.hidelogin();
				$('#gallery').show();
			  break;
			default:
				$('section,header').hide();
				$('#login').show();
			 }
	},
	


}

	
