/////************long polling- get status - change the pages******************/

/***********PRODUCTION***********/
////var serverDomain = '/nextStar/userjson?';
/***********PRODUCTION***********/

//var serverDomain = "http://makosrv1.egoline.co.il/nextStarTestB/userjson?";
//var serverDomain = "http://makosrv1.egoline.co.il:9090/nextStarTestD/userjson?";
var serverDomain = "/nextStarTestD/userjson?";

//E -mako
//A -yerutech
//cambium -D
//var serverDomain = "http://makosrv1.egoline.co.il:9090/nextStarTestD/userjson?";

var domain = "http://makosrv1.egoline.co.il:9090/application";//app domain//////////////check fb feed
//var domain = "http://makosrv1.egoline.co.il:9090/apptest";
//var domain = "http://makosrv1.egoline.co.il:9090/applicationYerutechQA";
//var domain = "http://makosrv1.egoline.co.il:9090/reut_test";//////////////check fb feed


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
