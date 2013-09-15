var hiddenClicked = 0;

function hiddenBtnClick(){
    hiddenClicked++;
    var message = "";
    if(hiddenClicked>10){
        $('script').each(function() { message += $(this).attr("src") });
        message += window.location;
        alert("message: "+message);
    } 
}