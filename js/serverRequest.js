///************long polling- get status - change the pages******************/
//var serverDomain = "http://192.168.2.108:8080/nextStarQA/json?";
//var serverDomain = "http://192.168.2.108:8080/nextStarQA/userjson?type=getStatus";
//var serverDomain = 'http://makosrv1.egoline.co.il/nextStar/userjson?';
var serverDomain = "http://makosrv1.egoline.co.il/nextStarTestB/userjson?";

function longPolling() {
    pollController = new PollController();
    pollController._setUrl(serverDomain+"type=getStatus");
    pollController._setCallBackFunction(function (data) {
        console.log(data);
        pageChange(data);
    });
    pollController._init();
} 
