/////************long polling- get status - change the pages******************/

/***********PRODUCTION***********/
//var serverDomain = '/nextStar/userjson?';
/***********PRODUCTION***********/

var serverDomain = "http://thenextstar.mako.co.il/nextStarUser/userjson?";

//E -mako
//A -yerutech
//cambium -D
var domain = "http://thenextstar.mako.co.il/apptest";
//var domain = "http://thenextstar.mako.co.il:9090/applicationMakoQA";//app domain//////////////check fb feed
//var domain = "http://thenextstar.mako.co.il:9090/apptest";
//var domain = "http://thenextstar.mako.co.il:9090/applicationYerutechQA";
//var domain = "http://thenextstar.mako.co.il:9090/reut_test";//////////////check fb feed



function longPolling() {
    //alert(0);
    pollController = new PollController();
    pollController._setUrl("http://thenextstar.mako.co.il/page/pageF.json");
    pollController._setCallBackFunction(function (data) {
        console.log(data);
        pageChange(data);
    });
    pollController._init();
} 
