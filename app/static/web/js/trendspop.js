(function(){trendsPopClass=function(){this.e;this.isshow=false;this.selected=0;this.myScroller};trendsPopClass.prototype={init:function(C){var B=this;this.isshow=true;var A=function(D){if(xGame.guide){D.status=-1}switch(parseInt(D.status)){case 1:B.initList(D);if(C){xGame.xsSet(xGame.server_prefix+"last_trends_id",C.id);xGame.xsSet(xGame.server_prefix+"last_trends_date",C.date)}break;default:$("#worldloading").hide();B.isshow=false;break}xGame.unlock();B=null};loadContents({"c":"message","m":"get_new_trends"},A,true);A=null},initList:function(B){var A=this;A.e=xGame.loadPopTmpl("trends");A.e.find(".content").find(".hidebtn").unbind("touchend").one("touchend",function(C){if(xGame.checkLock(true)){return false}if(A.selected==1){A.closetrends()}trendspop.hide();C.preventDefault()});A.e.find(".content").find("#info").html(B.list.info);A.myScroller=new iScroll("trendspop_scroller",{bounce:false,momentum:false});A.myScroller.refresh();A.e.find(".content").find(".closetrends").unbind("touchend").bind("touchend",function(){if(A.selected==1){A.selected=0;$(this).removeClass("selected")}else{A.selected=1;$(this).addClass("selected")}});A.e.show();$("#worldloading").hide();html=null},closetrends:function(){loadContents({"c":"message","m":"update_trends_status"})},unbindAll:function(){if(this.e){this.e.find(".content").find(".closetrends").unbind("touchend");this.e.remove();this.e=null}},hide:function(){xGame.unlock();this.unbindAll();this.isshow=false;if(this.myScroller){this.myScroller.destroy();this.myScroller=null}this.selected=0},}})();