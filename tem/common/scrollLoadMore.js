var ScrollApp = {
  ajaxFunc(){},
  windowHeight:0,
  willLoad:true,
  context:{},
  loadMore(){
    var offsetHeight = $(document).height();
    var offsetTop = $('body').scrollTop();

    if(offsetTop > offsetHeight - this.windowHeight - 50 && this.willLoad){
      this.willLoad = false;
      this.ajaxFunc && this.ajaxFunc(this.context);
    }
  },
  resetLoadState(){
    if(this.willLoad === false){
      this.willLoad = true;
    }
  }
}

ScrollApp.init = function(context,func){
  var self = this;
  this.resetLoadState();
  this.windowHeight = $(window).height();
  this.ajaxFunc = func;
  this.context = context;
  $(window).on('scroll', function() {
        self.loadMore();
    });
}

if (typeof module !== "undefined") {
    module.exports = ScrollApp;
}