(function(){chatPopClass=function(){this.e;this.isshow=false;this.topDom;this.centerDom;this.bottomDom;this.popDom;this.msgScroller;this.privateName;this.privateUid;this.chatType;this.tabType;this.chatUniqueList;this.isTimeout=null};chatPopClass.prototype={init:function(){var A=this;$("div#chatpop_small").hide();$("#cbattle_chat_wrap").hide();if(A.isshow){$("#worldloading").hide();return}A.e=xGame.loadPopTmpl("chat");A.e.find(".content").find(".hidebtn").unbind("touchend").bind("touchend",function(B){chatpop.hide();B.preventDefault();B.stopPropagation()});A.e.find("#chat_text").attr("readonly","true");A.chatUniqueList=[];A.topDom=A.e.find("#chat_top");A.centerDom=A.e.find("#chatpop_list");A.bottomDom=A.e.find("#chat_footer");A.popDom=A.e.find("#private_pop");A.infoDom=A.e.find("#info_sub_pop");A.initFirst(CD["chat"].allChatData)},initFirst:function(E){var C=this;C.chatType=1;C.tabType=1;var A=xGame.xsGet("chatlasttab");C.tabType=A?A:1;if(C.tabType==2){C.chatType=2;C.bottomDom.find("#chat_from_all").removeClass("is_private");C.bottomDom.find("#chat_text").css("width","100%");C.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType"+C.chatType).html(lang("country"))}var D=xGame.xsGet("chatdata");if(D){var F=xGame.xsGet("chatdata").split(",");if(F[0]==3){C.privateUid=F[1];C.privateName=F[2];if(C.tabType==3){C.chatType=3;C.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType3").html(lang("private"));C.bottomDom.find("#chat_from_all").addClass("is_private").find("div").html(lang("say_someone",[C.privateName]));C.bottomDom.find("#chat_text").css("width",(570-C.bottomDom.find("#chat_from_all").find("div").width())+"px")}}}C.topDom.find("#"+C.convTabidToClass(C.tabType)).addClass("selected");C.bindAll();var B="";C.centerDom.html(C.buildLi(E));C.setWidth();C.msgScroller=new iScroll("chatpop_scroller",{momentum:false,hScrollbar:false,vScrollbar:true});C.chatRefresh(true);C.e.show();C.isTimeout=setTimeout(function(){C.chatRefresh(true);C.e.find("#chat_text").removeAttr("readonly")},500);C.isshow=true;$("#worldloading").hide()},convTabidToClass:function(B){var A={"1":"public","2":"country","3":"private","4":"battle","5":"system",};return A[B]},setWidth:function(){var B;var D;var C=this.centerDom.find("li");for(var A=0;A<C.length;A++){D=C.eq(A);B=D.find("div").width();D.find("p").css("width",(930-B)+"px")}C=null},chatRefresh:function(B){var C=this.msgScroller.maxScrollY;this.msgScroller.refresh();var A=this.centerDom.height();if(A>400&&(Math.abs(C-this.msgScroller.y)<=310||B==true)){this.msgScroller.scrollTo(0,400-A,0)}this.msgScroller.refresh();C=null},bindAll:function(){var A=this;A.topDom.undelegate(".pop_btn_small","touchend").delegate(".pop_btn_small","touchend",function(){if(xGame.checkLock(true)){return false}A.topDom.find(".selected").removeClass("selected");A.topDom.find("#"+this.id).addClass("selected");if(this.id=="public"){A.chatType=1;A.bottomDom.find("#chattype_text").attr("class","chatType1").html(lang("world"));A.tabType=1}else{if(this.id=="country"){A.chatType=2;A.bottomDom.find("#chattype_text").attr("class","chatType2").html(lang("country"));A.tabType=2}else{if(this.id=="private"){A.tabType=3}else{if(this.id=="battle"){A.tabType=4}else{if(this.id=="system"){A.tabType=5}}}}}if(A.tabType!=3){var B=A.bottomDom.find("#chat_from_all");if(B.hasClass("is_private")){B.removeClass("is_private");A.bottomDom.find("#chat_text").css("width","100%")}B=null;if(A.tabType==4||A.tabType==5){A.chatType=1;A.bottomDom.find("#chattype_text").attr("class","chatType1").html(lang("world"))}}else{if(A.privateName!=undefined){A.chatType=3;A.bottomDom.find("#chattype_text").attr("class","chatType3").html(lang("private"));A.bottomDom.find("#chat_from_all").addClass("is_private").find("div").html(lang("say_someone",[A.privateName]));A.bottomDom.find("#chat_text").css("width",(570-A.bottomDom.find("#chat_from_all").find("div").width())+"px")}else{A.chatType=1;A.bottomDom.find("#chattype_text").attr("class","chatType1").html(lang("world"))}}A.centerDom.html(A.buildLi(CD["chat"].allChatData));A.setWidth();A.chatRefresh(true)});A.topDom.undelegate("#clear","touchend").delegate("#clear","touchend",function(){if(xGame.checkLock(true)){return false}if(CD["chat"]!=undefined){CD["chat"].allChatData=[];CD["chat"].newData=[];if(A.msgScroller){A.msgScroller.destroy()}A.centerDom.html("");$("#chatpop_small").find("ul").html("")}});A.popDom.undelegate("#hidebtn2","touchend").delegate("#hidebtn2","touchend",function(){if(xGame.checkLock(true)){return false}A.popDom.css("display","none");A.chatType=1;A.bottomDom.find("#chat_from_all").removeClass("is_private");A.bottomDom.find("#chat_text").css("width","100%");A.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType"+A.chatType).html(A.bottomDom.find(".public").html())});A.centerDom.undelegate("span.under","touchend").delegate("span.under","touchend",function(){if(xGame.checkLock(true)){return false}A.privateUid=parseInt($(this).attr("uid"));A.privateName=$(this).text();A.showInfo()});A.bottomDom.undelegate(".input_slname","touchend").delegate(".input_slname","touchend",function(){if(xGame.checkLock(true)){return false}A.showInfo()});A.bottomDom.undelegate("#chat_type","touchend").delegate("#chat_type","touchend",function(){if(xGame.checkLock(true)){return false}$(this).toggleClass("chatlist_show")});A.bottomDom.undelegate("#chat_type_list li","touchend").delegate("#chat_type_list li","touchend",function(){if(xGame.checkLock(true)){return false}A.chatType=parseInt($(this).attr("chattype"));if(A.chatType!=3){xGame.xsRemove("chatdata");delete A.privateUid;delete A.privateName;A.bottomDom.find("#chat_from_all").removeClass("is_private");A.bottomDom.find("#chat_text").css("width","100%");A.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType"+A.chatType).html($(this).html())}else{if(A.chatType==3){if(A.privateName!=undefined){A.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType3").html(lang("private"));A.bottomDom.find("#chat_from_all").addClass("is_private").find("div").html(lang("say_someone",[A.privateName]));A.bottomDom.find("#chat_text").css("width",(570-A.bottomDom.find("#chat_from_all").find("div").width())+"px")}else{A.popDom.css("display","block")}}}A.bottomDom.find("#chat_type_list").removeClass("chatlist_show")});A.centerDom.undelegate("span.viewbattle","touchend").delegate("span.viewbattle","touchend",function(){var B=$(this).attr("viewid");if(B>0){if($(this).attr("type")=="champions"||$(this).attr("type")=="sanctum"||$(this).attr("type")=="war"||$(this).attr("type")=="pacify"||$(this).attr("type")=="starbattle"){miscpop.viewBattleFromMail(B,$(this).attr("type"),$(this).attr("stage"))}else{miscpop.viewBattleFromMail(B,$(this).attr("type"))}}});A.centerDom.undelegate("span.elitejoin","touchend").delegate("span.elitejoin","touchend",function(){var D=$(this).attr("fid");var B=$(this).attr("teamid");var C=$(this).attr("countryid");if(D>0&&B>0){if(typeof elitepop!="undefined"&&elitepop.e!=null){if(elitepop.teamdetail!=null){xGame.toast.show(lang("you_had_a_team"));return false}elitepop.fetchTeamList(D,B,C)}else{xGame.showpop("elite",{fid:D,teamid:B,countryid:C})}}});A.infoDom.undelegate("#hidebtn2","touchend").delegate("#hidebtn2","touchend",function(){A.infoDom.css({"display":"none"})});A.infoDom.undelegate(".sl","touchend").delegate(".sl","touchend",function(){A.chatType=3;A.bottomDom.find("#chat_type").find("#chattype_text").attr("class","chatType3").html(lang("private"));A.bottomDom.find("#chat_from_all").addClass("is_private").find("div").html(lang("say_someone",[A.privateName]));A.bottomDom.find("#chat_text").css("width",(570-A.bottomDom.find("#chat_from_all").find("div").width())+"px");A.infoDom.css({"display":"none"});xGame.xsSet("chatdata","3,"+A.privateUid+","+A.privateName)});A.infoDom.undelegate(".ok","touchend").delegate(".ok","touchend",function(){xGame.showpop("info",A.privateUid)});A.infoDom.undelegate(".cancle","touchend").delegate(".cancle","touchend",function(){A.hide(function(){xGame.showpop("mailbox",A.privateName)})});A.infoDom.undelegate(".friends","touchend").delegate(".friends","touchend",function(){miscpop.add_friend(false,A.privateUid)});A.infoDom.undelegate("#battle_btn","touchend").delegate("#battle_btn","touchend",function(){miscpop.battleByUid(A.privateUid);A.infoDom.css({"display":"none"})});A.infoDom.undelegate("#shield","touchend").delegate("#shield","touchend",function(){xGame.confirm.show(lang("notice"),lang("chatpop_shield_ask"),2,function(){xGame.confirm.hide();A.shieldFunc()},function(){xGame.confirm.hide()})})},shieldFunc:function(){var B=this;if(xGame.checkLock()){return false}var A=function(D){xGame.unlock();switch(parseInt(D.status)){case 1:if(CD["chat"]!=undefined){CD["chat"].allChatData=[];for(var C=D.list.length-1;C>=0;C--){if(D.list[C]!=undefined&&D.list[C].message!=undefined&&D.list[C].type>2){D.list[C].message=CD["chat"].transferMsgFunc(D.list[C].message)}CD["chat"].allChatData.push(D.list[C])}CD["chat"].createMain(CD["chat"].allChatData);CD["chat"].createCountryMain(CD["chat"].allChatData)}chatpop.centerDom.html(chatpop.buildLi(CD["chat"].allChatData));chatpop.setWidth();chatpop.chatRefresh();xGame.toast.show(lang("chatpop_shield_success"));B.infoDom.css("display","none");break;case -1:xGame.toast.show(lang("chatpop_do_not_again"));break;default:xGame.toast.show(lang("undefined_error"));break}};loadContents({"c":"chat","m":"ban_uid","touid":B.privateUid},A);A=null},showInfo:function(){var A=this;A.infoDom.css({"display":"block"});A.infoDom.find("#info_name").html(lang("nickname")+A.privateName)},buildLi:function(E,F){var C=this;var A="";var D="";if(E==undefined){return false}for(var B=E.length-1;B>=0;B--){C.endNum++;D="";if(E[B].rank!=undefined&&E[B].rank<4&&E[B].rank>0){D=" num rank"+E[B].rank}if(typeof E[B].tree!="undefined"&&E[B].tree>1){D+=" num tree"+E[B].tree}if(E[B].type==0&&(C.tabType==1)){if(E[B].uid==player.info.uid){A+='<li class="public"><div><span class="type">【'+lang("world")+'】</span><span class="name'+D+'"><em>'+lang("you")+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}else{A+='<li class="public"><div><span class="type">【'+lang("world")+'】</span><span class="name under'+D+'" uid="'+E[B].uid+'"><em>'+E[B].nickname+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}}else{if(E[B].type==1&&(C.tabType==1||C.tabType==3)){if(E[B].mine!=undefined){A+='<li class="private"><div><span class="type">【'+lang("private")+'】</span><span class="name"><em>'+lang("you")+"</em></span> "+lang("chatpop_to_someone")+' <span class="under name" uid="'+E[B].uid+'"><em>'+E[B].nickname+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}else{A+='<li class="private"><div><span class="type">【'+lang("private")+'】</span><span class="name under" uid="'+E[B].uid+'"><em>'+E[B].nickname+"</em></span>&nbsp;"+lang("chatpop_to_someone")+' <span class="name"><em>'+lang("you")+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}}else{if(E[B].type==3&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==4&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==5&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==6&&(C.tabType==1||C.tabType==2)){if(E[B].system==1){A+='<li class="country"><div><span class="type">【'+lang("country")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].uid==player.info.uid){A+='<li class="country"><div><span class="type">【'+lang("country")+'】</span><span class="name'+D+'"><em>'+lang("you")+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}else{if(E[B].uid!=player.info.uid){A+='<li class="country"><div><span class="type">【'+lang("country")+'】</span><span class="name under'+D+'" uid="'+E[B].uid+'"><em>'+E[B].nickname+"</em></span><b>&nbsp;"+lang("say")+"：</b></div><p>"+E[B].message+"</p></li>"}}}}else{if(E[B].type==7&&(C.tabType==1||C.tabType==5)){A+='<li class="system"><div><span class="type">【'+lang("system")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==8&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==9&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==10&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==11&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==38&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==12&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==49&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==53&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==55&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==54&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==58&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==65&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==66&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==67&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==68&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==69&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==70&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==71&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==72&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==73&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==74&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==75&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==76&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==77&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==78&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}else{if(E[B].type==79&&(C.tabType==1||C.tabType==4)){A+='<li class="battlereport"><div><span class="type">【'+lang("battle_report")+"】</span></div><p>"+E[B].message+"</p></li>"}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}if(F!=undefined){CD["chat"].allChatData.unshift(E[B])}}return A},send:function(){var B=this;var C=B.bottomDom.find("#chat_text").val();if(C==""){xGame.toast.show(lang("msg_not_null"));return}else{if(C.length>60){xGame.toast.show(lang("more_than_60"));return}}var A=function(E){switch(parseInt(E.status)){case 6:xGame.toast.show((E.msg?E.msg:lang("chatpop_sendlimit")));break;case 5:xGame.toast.show(lang("no_country_to_send"));break;case 4:xGame.toast.show(lang("send_too_fast"));break;case 3:xGame.toast.show(lang("msg_too_long"));break;case 2:xGame.toast.show(lang("msg_not_null"));break;case 1:if(player.info.halloween==1){if(E.candy>0){if(player.info.halloween_type==1){xGame.toast.show(lang("breakthrough_reward",["reward halloween_box","x"+E.candy]))}else{xGame.toast.show(lang("breakthrough_reward",["reward halloween_candy","x"+E.candy]))}}}if(B.chatType==3){E.list=[{"uid":B.privateUid,"type":1,"time":"no","nickname":B.privateName,"message":C,"mine":true}]}for(var D=E.list.length-1;D>=0;D--){if(E.list[D]!=undefined&&E.list[D].message!=undefined&&E.list[D].type>2){E.list[D].message=CD["chat"].transferMsgFunc(E.list[D].message)}}B.centerDom.append(B.buildLi(E.list,true));chatpop.deleteTenLine();B.setWidth();B.chatRefresh(true);CD["chat"].createMain(E.list);CD["chat"].createCountryMain(E.list);B.bottomDom.find("#chat_text").val("");break;case -8:xGame.toast.show(lang("msg_not_support"));break;default:xGame.toast.show(lang("undefined_error"));break}xGame.unlock()};if(xGame.checkLock()){return false}if(B.chatType==1){if(B.tabType!=1){B.topDom.find(".selected").removeClass("selected");B.topDom.find("#public").addClass("selected");B.tabType=1;B.centerDom.html(B.buildLi(CD["chat"].allChatData));B.setWidth();B.chatRefresh(true)}chatpop.httpChat({"c":"chat","m":"send","message":C},A,true)}else{if(B.chatType==2){if(B.tabType>2){B.topDom.find(".selected").removeClass("selected");B.topDom.find("#country").addClass("selected");B.tabType=2;B.centerDom.html(B.buildLi(CD["chat"].allChatData));B.setWidth();B.chatRefresh(true)}chatpop.httpChat({"c":"chat","m":"send","message":C,"country":"1"},A,true)}else{if(B.chatType==3){if(B.tabType!=3&&B.tabType!=1){B.topDom.find(".selected").removeClass("selected");B.topDom.find("#private").addClass("selected");B.tabType=3;B.centerDom.html(B.buildLi(CD["chat"].allChatData));B.setWidth();B.chatRefresh(true)}chatpop.httpChat({"c":"chat","m":"send","message":C,"uid":B.privateUid},A,true)}}}A=null},checkNickName:function(){var B=this;var C=B.popDom.find("#private_name").val();if(helper.checkNickName(C)){var A=function(D){switch(parseInt(D.status)){case 2:xGame.toast.show(lang("player_not_exist"));break;case 1:B.bottomDom.find("#chat_type").find("#chattype_text").html(lang("private"));B.chatType=3;B.privateName=C;B.privateUid=D.uid;B.bottomDom.find("#chat_from_all").addClass("is_private").find("div").html(lang("say_someone",[B.privateName]));B.bottomDom.find("#chat_text").val("").css("width",(570-B.bottomDom.find("#chat_from_all").find("div").width())+"px");B.popDom.css("display","none");break;default:xGame.toast.show(lang("undefined_error"));break}};chatpop.httpChat({"c":"chat","m":"getuid","name":C},A,true);A=null}},httpChat:function(D,B,C){var A="http://"+xGame.server_prefix+".chat."+xGame.server_domain+"/index.php?c="+D.c+"&m="+D.m+"&";http(A,D,B,C)},deleteTenLine:function(){if(chatpop.centerDom.find("li").length>30){for(var A=0;A<chatpop.centerDom.find("li").length-30;A++){chatpop.centerDom.find("li").eq("0").remove();CD["chat"].allChatData.pop()}}},unbindAll:function(){if(this.e){this.e.find(".content").find(".hidebtn").unbind("touchend");this.e.remove();this.e=null}if(this.topDom){this.topDom.undelegate("#clear","touchend");this.topDom.undelegate(".pop_btn_small","touchend");this.topDom.remove();this.topDom=null}if(this.popDom){this.popDom.undelegate("#hidebtn2","touchend");this.popDom.remove();this.popDom=null}if(this.bottomDom){this.bottomDom.undelegate(".input_slname","touchend");this.bottomDom.undelegate("#chat_type","touchend");this.bottomDom.undelegate("#chat_type_list li","touchend");this.bottomDom.remove();this.bottomDom=null}if(this.centerDom){this.centerDom.undelegate("span.under","touchend");this.centerDom.undelegate("span.viewbattle","touchend");this.centerDom.undelegate("span.elitejoin","touchend");this.centerDom.remove();this.centerDom=null}if(this.infoDom){this.infoDom.undelegate("#hidebtn2","touchend");this.infoDom.undelegate(".sl","touchend");this.infoDom.undelegate(".ok","touchend");this.infoDom.undelegate(".cancle","touchend");this.infoDom.undelegate("#battle_btn","touchend");this.infoDom.undelegate("#shield","touchend");this.infoDom.undelegate(".friends","touchend");this.infoDom.remove();this.infoDom=null}},hide:function(A){xGame.unlock();this.isshow=false;if(typeof A!="undefined"){A()}xGame.xsSet("chatlasttab",this.tabType);if(this.msgScroller){this.msgScroller.destroy();delete this.msgScroller}if(this.readThread){clearTimeout(this.readThread);this.readThread=null}this.privateName=this.chatType=this.privateUid=this.tabType=null;if(this.isTimeout){clearTimeout(this.isTimeout);this.isTimeout=null}$("#chatpop_small").show();$("#cbattle_chat_wrap").show();this.unbindAll()},}})();