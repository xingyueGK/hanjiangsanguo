(function(){mailPopClass=function(){this.e;this.isshow=false;this.mailBtns;this.mailData;this.msgDom;this.nextId;this.currentId;this.stype;this.redDom;this.rankScroller=null;this.uid=null};mailPopClass.prototype={init:function(){if(xGame.checkLock()){return false}var B=this;var A=function(D){if(parseInt(D.status)==1){if(B.e==undefined){B.e=xGame.loadPopTmpl("mail");B.e.hide();B.e.find(".content").find(".hidebtn").unbind("touchend").bind("touchend",function(H){if(xGame.checkLock(true)){return false}mailpop.myHide();H.preventDefault();H.stopPropagation()});B.mailBtns=$("#mail_btns");B.msgDom=B.e.find("#mail_msg_conetent");B.redDom=B.e.find("#redenvelope_dom");B.nextId=null;B.currentId=null;B.bindAll()}B.mailBtns.hide();var E=0;var F=B.mailData?B.mailData["num"]:0;B.mailData={};for(var C=1;C<=17;C++){if(D.list[C]!=undefined){E++;B.mailData[C]=D.list[C];var G=B.mailBtns.find("#mail_btn"+C);if(G.css("display")!="inline-block"){G.css("display","inline-block")}else{}G=null}else{B.mailData[C]=null}}if(typeof F=="undefined"||F==0||F!=E){B.mailBtns.attr("class","mail_have"+E)}else{}B.mailData["num"]=E;if(B.mailData["num"]>0){B.mailBtns.show()}else{B.mailBtns.hide()}}xGame.unlock()};loadContents({"c":"message","m":"index"},A,true);A=null},bindAll:function(){var A=this;A.mailBtns.undelegate("button","touchend").delegate("button","touchend",function(){A.stype=$(this).attr("type");if(A.stype==15){if(A.currentId==null){A.currentIdIndex=0;A.currentId=A.mailData[A.stype][A.currentIdIndex];if(A.mailData[A.stype].length>1){A.nextId=A.mailData[A.stype][A.currentIdIndex+1]}}}else{A.currentIdIndex=0;A.currentId=A.mailData[A.stype][A.currentIdIndex];if(A.mailData[A.stype][1]!=undefined){A.nextId=A.mailData[A.stype][A.currentIdIndex+1]}}A.readById()});A.msgDom.undelegate("#mail_ok","touchend").delegate("#mail_ok","touchend",function(B){if(xGame.checkLock(true)){return false}A.myHide();B.preventDefault();B.stopPropagation()});A.msgDom.undelegate("#mail_next","touchend").delegate("#mail_next","touchend",function(){if(xGame.checkLock(true)){return false}A.mailData[A.stype].shift();if(A.mailData[A.stype].length<=1){A.currentId=A.nextId;A.nextId=null}else{var B=A.nextId;A.currentId=B;A.nextId=A.mailData[A.stype][1]}A.readById()});A.msgDom.undelegate("#mail_report","touchend").delegate("#mail_report","touchend",function(){if(xGame.checkLock(true)){return false}if(A.stype==3||A.stype==4||A.stype==11){miscpop.viewBattleFromMail(A.currentId,"message")}else{if(A.stype==8){miscpop.viewBattleFromMail($(this).attr("reportid"),"worldarena")}else{$(this).hide()}}});A.msgDom.undelegate("#mail_fetch","touchend").delegate("#mail_fetch","touchend",function(){if(xGame.checkLock(true)){return false}miscpop.fetchRewardFromMail(A.currentId)});A.msgDom.undelegate("em","touchend").delegate("em","touchend",function(){if(xGame.checkLock(true)){return false}if($(this).attr("uid")!=undefined){xGame.showpop("info",parseInt($(this).attr("uid")))}});A.redDom.find("#redenvelope_hide").unbind("touchend").bind("touchend",function(B){if(xGame.checkLock(true)){return false}A.mailData[A.stype].shift();if(A.mailData[A.stype].length<=0){A.currentId=A.nextId;A.nextId=null;A.isshow=false;A.e.hide();A.mailBtns.find("#mail_btn"+A.stype).css("display","none")}else{var C=A.nextId;A.currentId=C;A.nextId=A.mailData[A.stype][1];A.isshow=false;A.e.hide()}B.preventDefault();B.stopPropagation()});A.redDom.find("#luck_rank").unbind("touchend").bind("touchend",function(B){if(xGame.checkLock(true)){return false}A.redenvelopeRank();B.preventDefault();B.stopPropagation()});A.redDom.find("#open_btn").unbind("touchend").bind("touchend",function(B){if(xGame.checkLock(true)){return false}A.openData();B.preventDefault();B.stopPropagation()});A.e.find("#redenvelope_rank_hide").unbind("touchend").bind("touchend",function(B){if(xGame.checkLock(true)){return false}A.e.find("#redenvelope_rank").hide();B.preventDefault()})},myHide:function(){var A=this;if(A.mailData[A.stype]!=undefined){loadContents({"c":"message","m":"update_read_status","type":A.stype},null,true);A.mailData[A.stype]=null;A.mailData["num"]-=1;A.mailBtns.find("#mail_btn"+A.stype).css("display","none");A.mailBtns.attr("class","mail_have"+A.mailData["num"])}else{A.mailBtns.find("#mail_btn"+A.stype).css("display","none");A.mailBtns.attr("class","mail_have"+A.mailData["num"])}if(A.mailData["num"]==0){A.hide()}else{xGame.doAnimate(A.e,"fadeOutUp","0.25s",function(){A.e.hide();A.isshow=false;A.nextId=null;A.currentId=null})}},showByMyIdAndMsg:function(B,F,J,I){var E=this;var A=E.msgDom.find("#mail_btn_line"),H=E.msgDom.find("p"),C=E.msgDom.find("#mailreward_wrap");if(E.currentId!=null&&E.nextId==null){A.attr("class","one")}else{if(E.currentId!=null&&E.nextId!=null){A.attr("class","two")}}if(E.stype==3||E.stype==4||E.stype==8||E.stype==11){A.find("#mail_report").css({"display":"inline-block"});if(E.stype==8){A.find("#mail_report").attr("reportid",I.list.title)}}else{if(F.length>0){A.find("#mail_fetch").css({"display":"inline-block"})}}if(F.length>0){var G="";for(var D=0;D<F.length;D++){G+='<li class="'+F[D]["type"]+'">'+F[D]["desc"]+" +"+F[D]["num"]+"</li>"}C.html(G).show()}else{C.hide()}H.html(B+'<span class="time">'+J+"</span>")},readById:function(){if(xGame.checkLock()){return false}var B=this;var A=function(E){if(parseInt(E.status)==1){if(E.list.type==15){if(B.isshow==false){B.e.show();B.e.find(".content").hide();B.redDom.show();B.uid=E.list.redenvelope_id;B.e.find(".redenvelope_from_title").html(lang("redenvelope_from",[E.list.name]));B.e.find(".redenvelope_name > span").html(E.list.message);B.redDom.find("#open_btn").removeClass("open");B.redDom.find(".redenvelope_name").removeClass("open");xGame.doAnimate(B.e,"fadeInDown","0.25s");B.isshow=true}}else{if(B.isshow==false){B.e.show();B.e.find(".content").show();B.redDom.hide();xGame.doAnimate(B.e,"fadeInDown","0.25s");B.isshow=true}var G=[];var F=["act","silver","gold","barcard"];for(var C=0;C<F.length;C++){var H=F[C];var D=E.list[F[C]];if(D>0){var I={"type":"","desc":"","num":0};I["type"]=H;I["desc"]=H=="act"?lang("act"):(H=="silver"?lang("silver"):(H=="gold"?lang("gold"):lang("free_leap_times")));I["num"]=D;G.push(I);I=null}}B.showByMyIdAndMsg(E.list.message,G,E.list.dateline,E)}}else{xGame.toast.show(lang("can_not_found_mail"))}xGame.unlock()};loadContents({"c":"message","m":"index","id":B.currentId},A,false,function(){console.log("c=message&m=index error.")});A=null},openData:function(){var B=this;var A=function(C){switch(parseInt(C.status)){case 1:B.redDom.find("#open_btn").addClass("open");B.redDom.find(".redenvelope_name").addClass("open");xGame.toast.show(lang("regrewardpop_reward",[C.gold]));player.updateinfo({"gold":C.all_gold});break;default:xGame.toast.show(C.msg);break}xGame.unlock()};loadContents({"c":"act_redenvelope","m":"grab_red_envelope","id":B.uid},A);A=null},redenvelopeRank:function(){var B=this;var A=function(C){switch(parseInt(C.status)){case 1:B.e.find("#redenvelope_rank").show();B.luckrankHtml(C.list);B.e.find(".redenvelope_oneself").html(lang("redenvelopepop_receive",[helper.convertWan(C.own)]));break;default:xGame.toast.show(C.msg);break}xGame.unlock()};loadContents({"c":"act_redenvelope","m":"get_luck_list"},A);A=null},luckrankHtml:function(D){var C=this;var A="";for(var B=0;B<D.length;B++){A+="<li>";A+='<span class="name">'+D[B].nickname+"</span>";A+='<span class="num">'+D[B].gold+lang("gold")+"</span>";A+="</li>"}this.e.find("#luckrank_list").html(A);if(this.rankScroller){this.rankScroller.destroy();this.rankScroller=null}if(this.rankScroller==null){this.rankScroller=new iScroll("luckrank_Scroll",{bounce:false,momentum:false,hScrollbar:false,vScrollbar:false})}this.rankScroller.refresh()},unbindAll:function(){if(this.e){this.e.find(".content").find(".hidebtn").unbind("touchend");this.e.find("#redenvelope_rank_hide").unbind("touchend");this.e.remove();this.e=null}if(this.mailBtns){this.mailBtns.undelegate("button","touchend");this.mailBtns.remove();this.mailBtns=null}if(this.msgDom){this.msgDom.undelegate("#mail_ok","touchend");this.msgDom.undelegate("#mail_next","touchend");this.msgDom.undelegate("#mail_report","touchend");this.msgDom.undelegate("#mail_fetch","touchend");this.msgDom.undelegate("em","touchend");this.msgDom.remove();this.msgDom=null}if(this.redDom){this.redDom.find("#redenvelope_hide").unbind("touchend");this.redDom.find("#luck_rank").unbind("touchend");this.redDom.find("#open_btn").unbind("touchend");this.redDom=null}},hide:function(){xGame.unlock();this.isshow=false;this.mailData=this.nextId=this.currentId=this.stype=this.currentIdIndex=null;this.uid=null;if(this.rankScroller){this.rankScroller.destroy();this.rankScroller=null}this.unbindAll()},}})();