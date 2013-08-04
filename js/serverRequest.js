
///************long polling- get status - change the pages******************/
//var domain = "http://192.168.2.108:8080/nextStarQA/json?";
//var domain = "http://192.168.2.108:8080/nextStarQA/userjson?type=getStatus";
//var domain = 'http://makosrv1.egoline.co.il/nextStar/userjson?';
var domain = "http://makosrv1.egoline.co.il/nextStarTestA/userjson?";
pollController=new PollController();
pollController._setUrl("http://makosrv1.egoline.co.il/nextStarTestA/userjson?type=getStatus");
pollController._setCallBackFunction(function(data) {
    console.log(data);
    pageChange(data);
});
pollController._init();
