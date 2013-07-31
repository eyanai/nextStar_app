
/************long polling- get status - change the pages******************/

pollController=new PollController();
pollController._setUrl('http://makosrv1.egoline.co.il/nextStar/userjson?type=getStatus');
pollController._setCallBackFunction(function(data) {
    console.log(data);
    pageChange(data);
});
pollController._init();
