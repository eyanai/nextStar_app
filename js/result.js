function setResultPage(data) {
    console.log("setResultPage data.status: " + data.status);

    //set the dictionary text
    //$("#results-dic").text(resultsDic);
    toggleTopMenu(resultsDic);

    var isSingleVote;
    var firstFields;
    var secondFields;
    if (isSingle(data)) {
        firstFields = getFielsdByVote(data.votes[0]);
        $("#results-img-single").css("background-image", "url('" + firstFields[2] + "')")
        $("#results-comp-name-single").text(firstFields[0]);
        $("#results-song-name-single").text(firstFields[1]);

        //wait text
        $("#results-wait-text-single").text(data.textWaitContinue);
        //percent
        $("#results-perc-single").text(data.votes[0].finalPercent + "%");
         //percent gragh
        
        $("#results .single .resultScalaL .result").addClass("resultBlue");
        $("#results .single .resultScalaL .scala").addClass("scalaBlue");
         $('.scala').animate({ bottom: '0%' }, 1000, function () {
              var bottomFirst = -1 *(100 - data.votes[0].finalPercent);
            $("#results .single .resultScalaL .scala").animate({ bottom: bottomFirst + '%' }, 500);
        });
        voteBarsSound.playclip();
       
       
        //navigate
        Navi.goto("resultsSingle");
    }
    else if (!isSingle(data)) {
        firstFields = getFielsdByVote(data.votes[0]);
        secondFields = getFielsdByVote(data.votes[1]);
        //firat comp
        $("#results-img-first").css("background-image", "url('" + firstFields[2] + "')")
        $("#results-comp-name-first").text(firstFields[0]);
        $("#results-song-name-first").text(firstFields[1]);
        //second comp
        $("#results-img-second").css("background-image", "url('" + secondFields[2] + "')")
        $("#results-comp-name-second").text(secondFields[0]);
        $("#results-song-name-second").text(secondFields[1]);
        
        //wait text
        $("#results-wait-text-battle").text(data.textWaitContinue);
       
        //percent gragh
        //if the percent bigger then  - add the red class
        $("#results .battle .resultScalaR .result").addClass("resultRed");
        $("#results .battle .resultScalaR .scala").addClass("scalaRed");
        $('.scala').animate({ bottom: '0%' }, 1000, function() {
            var bottomFirst = -1 *(100 - data.votes[0].finalPercent);
            var bottomSecond =  -1 *(100 - data.votes[1].finalPercent);
            $("#results .battle .resultScalaR .scala").animate({ bottom: bottomFirst + '%' }, 500, function() { });
            $("#results .battle .resultScalaL .scala").animate({ bottom: bottomSecond + '%' }, 500, function() { });
        });


        $("#results .battle .resultScalaL .result").addClass("resultBlue");
        $("#results .battle .resultScalaL .scala").addClass("scalaBlue");
         //percent
        $("#results-perc-first").text(data.votes[0].finalPercent + "%");
        $("#results-perc-second").text(data.votes[1].finalPercent + "%");
      //  setPercentNumberAnimation("single", data.votes[0].finalPercent,data.votes[1].finalPercent);
        //if the percent bigger then  - add the red class $("#results-perc-second").addClass("red")
        //navigate
        Navi.goto("resultsBattle");
    }
}
var  perce1Temp = 0;
var milise = 0;
function setPercentNumberAnimation(type,perc1,perc2){
    if( type=="single"){
        perce1Temp = 0;
        milise = 1 * 1000 / perc1;
        returnNumber(perc1);
    }
}

function returnNumber(perc1){
     
    setTimeout(function() {
        perce1Temp ++;
        if(perce1Temp == perc1){
                
        }
        else{
             $("#results-perc-first").text(perce1Temp+"%")
            returnNumber();
        }
            
    }, milise);  
}
