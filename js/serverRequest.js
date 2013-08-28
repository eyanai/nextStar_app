/////************long polling- get status - change the pages******************/

/***********PRODUCTION***********/
//var serverDomain = '/nextStar/userjson?';
/***********PRODUCTION***********/

//var serverDomain = "http://makosrv1.egoline.co.il/nextStarTestB/userjson?";
//var serverDomain = "http://makosrv1.egoline.co.il:9090/nextStarTestD/userjson?";
var serverDomain = "/nextStarTestD/userjson?";

//E -mako
//A -yerutech
//cambium -D
var domain = "http://thenextstar.mako.co.il:9090/application";
//var domain = "http://thenextstar.mako.co.il:9090/applicationMakoQA";//app domain//////////////check fb feed
//var domain = "http://thenextstar.mako.co.il:9090/apptest";
//var domain = "http://thenextstar.mako.co.il:9090/applicationYerutechQA";
//var domain = "http://thenextstar.mako.co.il:9090/reut_test";//////////////check fb feed


function longPolling() {
    //alert(0);
    pollController = new PollController();
    pollController._setUrl(serverDomain+"type=getStatus");
    pollController._setCallBackFunction(function (data) {
        console.log(data);
        pageChange(data);
    });
    pollController._init();
} 
