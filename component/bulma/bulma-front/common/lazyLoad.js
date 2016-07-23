var LazyLoad = {
	arr:[],
	deleteArray:[],
	getClient:function(){
		var l,t,w,h;
		l  =  document.documentElement.scrollLeft || document.body.scrollLeft;
		 t  =  document.documentElement.scrollTop || document.body.scrollTop;
		 w =   document.documentElement.clientWidth;
		 h =   document.documentElement.clientHeight;
		 return {'left':l,'top':t,'width':w,'height':h} ;
    },
	getSubClient:function(p){
		var l = 0,t = 0,w,h;
		w = p.offsetWidth ;
		h = p.offsetHeight;

		while(p.offsetParent){
			l += p.offsetLeft ;
			t += p.offsetTop ;
			p = p.offsetParent;
		}
		return {'left':l,'top':t,'width':w,'height':h } ;
	},
	intens:function(rec1,rec2){
       var lc1,lc2,tc1,tc2,w1,h1;
       lc1 = rec1.left + rec1.width / 2;
       lc2 = rec2.left + rec2.width / 2;
       tc1 = rec1.top + rec1.height / 2 ;
       tc2 = rec2.top + rec2.height / 2 ;
       w1 = (rec1.width + rec2.width) / 2 ;
       h1 = (rec1.height + rec2.height) / 2;
       return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1 ;
    },

	 //比较某个子区域是否呈现在浏览器区域
    jiance:function(arr,prec1,callback){
		var prec2;
		for(var i = arr.length - 1 ; i >= 0 ;i--){
			if(arr[i]){
				prec2 =  this.getSubClient(arr[i]);
				if(this.intens(prec1,prec2)){ //arr[i]在屏幕中
					callback(arr[i]);
					//加载资源后，删除监测
					this.deleteArray.push(arr[i]);
					//delete arr[i];
				}else {
					if (arr[i].complete) {
						continue;
					} else {
						arr[i].src = "";
					}
				}
			}
		}
	},
	autocheck:function(){
       var prec1 = this.getClient(); 
       this.jiance(this.arr,prec1,function(desobj){

			desobj.src = desobj.getAttribute("data-original");
			desobj.style.visibility = "visible";
       })
    }

}

LazyLoad.init = function(className){
	this.arr = document.getElementsByClassName(className);
	this.autocheck();
	var _this = this;
	window.onscroll = function(){
	   _this.autocheck();
	}
	window.onresize = function(){
	 //重新计算
	   _this.autocheck();
	}
}

export default LazyLoad;