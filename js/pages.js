
//set static page data and show it
function setStaticPage(data){
    console.log("setStaticPage data.status: " + data.status);
    //set the page by template
    //המתנה עם תמונה -1
    //המתנה בלי תמונה -2
    //סטטי עם תמונה -3
    //סטטי בלי תמונה -4
    var templateId = data.templateId;
    switch(templateId){
        case 1:
            setWaitPageWithImg(data);
            break;
        case 2:
            setWaitPageNoImg(data);
            break;
        case 3:
            setStaticPageWithImg(data);
            break;
        case 4:
            setStaticPageNoImg(data);
            break;
        
    }
}


function setWaitPageWithImg(data){
    var title = data.title;
    var text = data.text;
    var info =data.info
    var url="";
    //set the ing by size
    if(isBigSize){
        url =data.tamplateImage2;
    }
      else{
        url =data.tamplateImage1;
    }
    $("#message-with-img-title").text(title);
    $("#message-with-img-text").text(text);
    $("#message-with-img-wait-text").text(info);

    $("#message-with-img-img").css("background-image", "url('"+url+"')");
    
    Navi.goto("messageWithImage");
}
       
function  setWaitPageNoImg(data){
    var title = data.title;
    var text = data.text;
    var info =data.info

    $("#message-no-img-title").text(title);
    $("#message-no-img-text").text(text);
    $("#message-with-img-wait-text").text(info);
    
    Navi.goto("messageNoImage");
 }
      
function   setStaticPageWithImg(data){
    
}
       
function   setStaticPageNoImg(data){
                
            }