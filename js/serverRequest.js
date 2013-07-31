
/************long polling- get status - change the pages******************/
//var domain = "http://192.168.2.108:8080/nextStarQA/json?";
var domain = "http://192.168.2.108:8080/nextStarQA/userjson?type=getStatus";
//var domain = 'http://makosrv1.egoline.co.il/nextStar/userjson?type=getStatus';
pollController=new PollController();
pollController._setUrl(domain);
pollController._setCallBackFunction(function(data) {
    console.log(data);
    pageChange(data);
});
pollController._init();
