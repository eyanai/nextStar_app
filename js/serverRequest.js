/////************long polling- get status - change the pages******************/
////var serverDomain = "http://192.168.2.108:8080/nextStarQA/json?";
////var serverDomain = "http://192.168.2.108:8080/nextStarQA/userjson?type=getStatus";
//var serverDomain = 'http://makosrv1.egoline.co.il/nextStar/userjson?';
////var serverDomain = "http://makosrv1.egoline.co.il/nextStarTestA/userjson?";
var serverDomain = "http://makosrv1.egoline.co.il/nextStarTestA/userjson?";


var domain = "http://makosrv1.egoline.co.il/application";//app domain//////////////check fb feed
//var domain = "http://makosrv1.egoline.co.il/applicationMakoQA";
//var domain = "http://makosrv1.egoline.co.il/applicationYerutechQA";
//var domain = "http://makosrv1.egoline.co.il/reut_test";//////////////check fb feed


function longPolling() {
    pollController = new PollController();
    pollController._setUrl(serverDomain+"type=getStatus");
    pollController._setCallBackFunction(function (data) {
        console.log(data);
        pageChange(data);
    });
    pollController._init();
} 
