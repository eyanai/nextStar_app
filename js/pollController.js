var PollController = function() {
	//---------------------------------------------------------------------------------
	//singleton
	// https://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	//---------------------------------------------------------------------------------
	if ( arguments.callee._singletonInstance )
	    return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;
	var self=this;
	//---------------------------------------------------------------------------------
	//public function
	//---------------------------------------------------------------------------------
	self._init = function(){
		if(!self._callBackFunction) self._callBackFunction=function(data){$("body").append(data);};
		
        $.ajax({ 
           	url: self._url,
           	type: "POST",
           	data: { type: "poll", index: self._index},
           	success: function(data){
           		self._url=data;
                //self._url=data.substring(0,29)+":9090/"+data.substring(30)
           		self._poll();
           	}
        });
	};
	
	self._setCallBackFunction=function(func){
		self._callBackFunction=func;
	};
	
	self._setUrl=function(url){
		self._url=url;
	};
	
	
	//---------------------------------------------------------------------------------
	//private function
	//---------------------------------------------------------------------------------
	self._poll=function(){
        $.ajax({ 
           	url: self._url+"?v="+Date.now(), 
           	complete: function() {
           		setTimeout(function(){self._poll();},3000);
           		}, 
           	dataType: "json",
           	type: "GET",
           	/*data: { type: "poll", index: self._index},*/
           	success: function(json){
           		if (json.index!=self._index){
	           		self._index=json.index;
	           		if (self._callBackFunction) self._callBackFunction(json.data);
           		}
           	}
        });
	};
	//---------------------------------------------------------------------------------
	//private attribute
	//---------------------------------------------------------------------------------
	self._callBackFunction=null;
	self._index=-1;
	self._url='';
};