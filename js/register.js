
function setOpenRegisterPage(data){
    console.log("data.status: " + data.status);
    //take the value from dictionary
    $("#register-dic").text(registerDic);
    var url="";
    //if this is a double vote
    if(data.votes.length == 2){
      //set the img
        //set the ing by size
        if(isBigSize){
            url =data.votes[0].imageUrlB;
        }
          else{
            url =data.votes[0].imageUrlA;
        }
        var name = data.votes[0].name;
        var song = data.votes[0].songName;
        var textWait = data.textWaitRegister;
        $("#register-single-img").css("background-image", "url('"+url+"')");
        $("#register-comp-name-single").text(name);
        $("#register-song-name-single").text(song);
        $("#register-wait-text").text(textWait);
    }
    //if this is a single vote
    else{
        
    }

    //show register page
    Navi.goto("register");

}

function setRegisterGoingClose(data){
    console.log("setOpenRegisterPage data.status: " + data.status);
}
