(function(){mapWorldClass=function(){this.touchObj=null;this.first};mapWorldClass.prototype={init:function(B){var A=this;if(B&&B.callback){B.callback()}if(xGame.guide==true&&miscpop.in_array(guide.now,[911,931,1613])){player.info.missionsite=2}if(player.info.missionsite==1){A.loadWorldMap()}else{if(player.info.missionsite==2){A.loadShiliMap()}else{if(player.info.missionsite==3){A.loadGuanqiaMap()}}}A=null},initMapPage:function(){var B=this;$("#menu_newnotice").hide();var A=$("#footer");A.find("#menu_world").hide();A.find("#essence_map").css("bottom","90px").show();A.find("#menu_back").hide();A.find(".guanqia_page_btn").hide();A=null;var C=$("#scroller");if(C.find("#mapworld_page").length==0){C.html($.template("mapworld_tmpl"));xGame.createCloud();$("#world").undelegate(".nowplace","webkitAnimationEnd").delegate(".nowplace","webkitAnimationEnd",function(){$(this).unbind("webkitAnimationEnd");$(this).remove()})}$("#worldloading").removeClass("black").hide();C=null;B=null},loadWorldMap:function(A){var C=this;if(xGame.checkLock()){return false}player.info.missionsite=1;var B=function(I){var E=$("#header").find("#menu_newpassreward");if(E){E.find(".popo").hide();E.hide()}C.initMapPage();if(parseInt(I.enter_world)==3||parseInt(I.enter_world)==4){$("#mapworld_page").removeClass("width2").addClass("width1")}else{$("#mapworld_page").removeClass("width2").removeClass("width1")}var G=$("#map_wrap");if((I.enter_world!=undefined&&I.enter_world==1)||I.enter_world==undefined){G.html($.template("mapworld_bigmap_tmpl"))}else{G.html($.template("mapworld_bigmap_tmpl"+I.enter_world))}var K=G.find(".bigmap");var F=null;var J="";for(var H=0;H<100;H++){if(I[H]!=undefined){if(I[H].status==0){continue}F=I[H].id;if(map_ini["world"][H]){J+='<div id="worldshili'+I[H].id+'" class="btn shili '+(I[H].pass_status==1?"done":"")+'" style="left:'+getSLeft(map_ini["world"][H].x)+"px;top:"+getSTop(map_ini["world"][H].y)+'px" l="'+I[H].id+'"><p>'+map_ini["world"][H].name+"</p></div>"}else{J+='<div class="btn shili" style="left:'+getSLeft(I[H].x)+"px;top:"+getSTop(I[H].y)+'px" l="'+I[H].id+'"><p>'+I[H].name+"</p></div>"}}}K.append(J);K.undelegate(".shili");K.undelegate(".shili","touchstart").delegate(".shili","touchstart",function(){mapWorld.touchObj=this.id});K.undelegate(".shili","click").delegate(".shili","click",function(){if(xGame.guide==false&&this.id!=mapWorld.touchObj){mapWorld.touchObj=null;return false}mapWorld.touchObj=null;var L=$(this);if(!L.hasClass("close")){mapWorld.loadShiliMap(L.attr("l"));L=null}else{alert("当前未开启！")}});$("#mapworld_page").show();if(!xGame.xsGet(player.info.uid+"guide_hide_page",true)){C.displayWorldPage(I.next_status,I.enter_world)}C.first=I.first;C.showNextWorld(I.next_status,I.enter_world);xGame.iscrollRefresh();var D=null;if(F&&I.next_status!=1){D=K.find("#worldshili"+F);if(D!=null&&D.length>0){D.append('<span id="lastenemy_span"></span>')}}D=null;C.resultDisplay();xGame.unlock();J=null;G=null;K=null;B=null;if(xGame.guide==true&&guide.now==1804){guide.show(1805)}};if(A==undefined){loadContents({"c":"map","m":"index"},B,false,function(){xGame.loadWorld("city")});B=null}else{loadContents({"c":"map","m":"index","world":A},B,false,function(){xGame.loadWorld("city")});B=null}},showNextWorld:function(A,B){if(this.first==1&&A==1){if(xGame.menustatus==false){guide.create("touchend",$("#menu_control"),false,function(){$("body").append('<div id="guide_rect" class="guide_rect" style="width:100%;height:100%;left:0px;top:0px;"></div>');var C=function(){guide.create("touchend",$("#guanqia_next"))};guide.checkMenuAndDo(C)})}else{guide.create("touchend",$("#guanqia_next"))}}else{if(this.first==1&&A==0){this.showWorldStory(B)}}},showWorldStory:function(D){$("#header").css("display","none");$("#footer").css("display","none");$("#world").append($.template("world"+D+"_story_tmpl"));var B=$("#world"+D+"_story_page");var A=function(){B.remove();B=null;$(".bigmap"+D).removeClass("shake_a");$("#footer").css("display","block");$("#header").css("display","block")};for(var C=1;C<5;C++){B.find("#w"+D+"_t"+C).unbind("webkitTransitionEnd").one("webkitTransitionEnd",function(){$(this).next().addClass("noblur")})}B.find("#w"+D+"_t5").unbind("webkitTransitionEnd").one("webkitTransitionEnd",function(){setTimeout(function(){B.find("#w"+D+"_start").unbind("webkitTransitionEnd").one("webkitAnimationEnd",function(){$(this).attr("class","shine");B.unbind("touchend").one("touchend",function(){A();A=null})}).addClass("shake");B.addClass("shake_a");$(".bigmap"+D).addClass("shake_a")},300)});xGame.doAnimate(B.find("#w"+D+"_text"),"newhero_scalein","0.5s",function(){if(xGame.menustatus==true){xGame.menuToggle()}B.find("#w"+D+"_t1").addClass("noblur")})},displayWorldPage:function(C,A){var D=null;var B=null;var E=this;A=parseInt(A);B=map_ini["worldname"][A+1];if(A>1){D=map_ini["worldname"][A-1]}if(D){$("#footer").find("#guanqia_prev").text(D.name).unbind("touchend").bind("touchend",function(F){mapWorld.loadWorldMap(D.id);$("#footer").find("#guanqia_prev").text(D.name).unbind("touchend");F.preventDefault();F.stopPropagation()}).show()}if(B){if(C==0){$("#footer").find("#guanqia_next").addClass("close").text(B.name).unbind("touchend").show()}else{$("#footer").find("#guanqia_next").removeClass("close").text(B.name).unbind("touchend").bind("touchend",function(F){mapWorld.loadWorldMap(B.id);$("#footer").find("#guanqia_next").removeClass("close").text(B.name).unbind("touchend");F.preventDefault();F.stopPropagation()}).show()}}},getShiliMapImage:function(A){if(A<=6){return staticUrl+"img/map/"+A+".jpg"}else{return"http://img2.hanjiangsanguo.com/hjimg/map/"+A+".jpg"}},getGuanqiaMapImage:function(A,B){if(A<=6){return staticUrl+"img/map/"+A+"_"+B+".jpg"}else{return"http://img2.hanjiangsanguo.com/hjimg/map/"+A+"_"+B+".jpg"}},getCityNameImage:function(A){if(A<=6){return staticUrl+"img/map/guanqia_name"+A+".png"}else{return"http://img2.hanjiangsanguo.com/hjimg/map/guanqia_name"+A+".png"}},get1NPCImage:function(C,B,A){return staticUrl+"img/map/mapnpc_1_"+C+"_"+(B==1?"boss":"enemy")+""+A+".png"},loadShiliMap:function(A){var B=this;if(xGame.checkLock()){return false}if(!A){A=player.info.missionlevel}var C=function(N){if(N.status!=1){xGame.toast.show(lang("you_have_no_shili"));$("#worldloading").removeClass("black").hide();xGame.unlock();C=null;return}player.info.missionlevel=A;player.info.missionsite=2;var H=$("#header").find("#menu_newpassreward");if(H){if(xGame.menustatus){H.show();if(N.popo==1){H.find(".popo").show()}else{H.find(".popo").hide()}}}B.initMapPage();var K=$("#map_wrap");K.html($.template("mapworld_shilimap_tmpl"));var Q=K.find(".shilimap");if(player.info.missionlevel==18||player.info.missionlevel==19||player.info.missionlevel==20){$("#mapworld_page").removeClass("width1").addClass("width2");Q.removeClass("width1").addClass("width2")}if(player.info.missionlevel==21){$("#mapworld_page").removeClass("width2").addClass("width1");Q.removeClass("width2").addClass("width1")}if(player.info.missionlevel==22||player.info.missionlevel==23){$("#mapworld_page").removeClass("width2").removeClass("width1");Q.removeClass("width2").removeClass("width1")}Q.css("background","url("+B.getShiliMapImage(player.info.missionlevel)+") 0 0 no-repeat");$("#footer").find("#essence_map").css("bottom","160px").show();$("#footer").find("#menu_world").unbind("touchend").one("touchend",function(R){mapWorld.loadWorldMap();R.preventDefault();R.stopPropagation();B=null}).show();var I=null;var G=0;var O="";var M=map_ini["shili"][player.info.missionlevel];if(isIPhone5&&player.info.missionlevel==20){M=map_ini["shili"][205]}if(isIPhone5&&player.info.missionlevel==19){M=map_ini["shili"][195]}if(isIPhone5&&player.info.missionlevel==18){M=map_ini["shili"][185]}if(isIPhone5&&player.info.missionlevel==17){M=map_ini["shili"][175]}if(isIPhone5&&player.info.missionlevel==16){M=map_ini["shili"][165]}var F={};var J="";for(var L in N.list){if(N.list[L].openstatus==0){continue}I=N.list[L].stage;G=N.list[L].id;if((L==73||L==80)&&N.list[L].status==1){I=null}if(M&&M[N.list[L].stage]){F=M[N.list[L].stage];if(player.info.missionlevel==17||player.info.missionlevel==16||player.info.missionlevel==18||player.info.missionlevel==19||player.info.missionlevel==21){O+='<div id="guanqia'+F.stage+'" class="btn guanqia pictype'+F.type+" guanqia"+F.stage+'" style="left:'+F.x+"px;top:"+F.y+'px" s="'+F.stage+'">';O+='<div class="bg '+(F.reverse==1?"reverse":"")+'"></div>'}else{O+='<div id="guanqia'+F.stage+'" class="btn guanqia pictype'+F.type+" guanqia"+F.stage+'" style="left:'+getSLeft(F.x)+"px;top:"+getSTop(F.y)+'px" s="'+F.stage+'">';O+='<div class="bg '+(F.reverse==1?"reverse":"")+'"></div>'}if(parseInt(player.info.missionlevel)<=14){O+='<p style="background-image:url('+B.getCityNameImage(player.info.missionlevel)+");background-position-y:-"+((F.stage-1)*22)+'px;"></p>'}O+=(N.list[L].status==1?'<div class="win"></div>':"");O+="</div>"}else{O+=""}}M=null;F=null;J=null;Q.append(O);Q.undelegate(".guanqia");Q.undelegate(".guanqia","touchstart").delegate(".guanqia","touchstart",function(){mapWorld.touchObj=this.id});Q.undelegate(".guanqia","click").delegate(".guanqia","click",function(){if(xGame.guide==false&&this.id!=mapWorld.touchObj){mapWorld.touchObj=null;return false}mapWorld.touchObj=null;var R=$(this);if(!R.hasClass("close")){mapWorld.loadGuanqiaMap(player.info.missionlevel,R.attr("s"));R=null}else{alert("当前未开启！")}B=null});var D=null;if(N.next_status==1){I=null}if(I){D=Q.find("#guanqia"+I);if(D!=null&&D.length>0&&(player.info.level>16||xGame.guide==false)){if(miscpop.in_array(G,[78,79,80,81,82,85,87,88])){D.append('<span id="lastenemy_span" class="gq_ls_'+G+'"></span>')}else{D.append('<span id="lastenemy_span"></span>')}}}$("#mapworld_page").show();xGame.iscrollRefresh();D=null;if(!xGame.xsGet(player.info.uid+"guide_hide_page",true)){B.displayShiliPage(N.next_status)}if(map_ini["world"][A].name){$("#world").append('<p class="nowplace">'+map_ini["world"][A].name+"</p>")}B.resultDisplay();xGame.unlock();O=null;K=null;Q=null;C=null;if(xGame.guide==true){if(guide.now==0){guide.showNpc(lang("welcome_msg"),function(){guide.showNpc(lang("liaohua_msg"),function(){guide.show(1)},2)})}else{if(guide.now==911){guide.show(601)}else{if(guide.now==931){guide.show(1324)}else{xGame.showGuide([1613])}}}}if(xGame.guide==true&&guide.now==1803){var E=xGame.xsGet(player.info.uid+"shilidone",true);if(E){var P=function(){miscpop.passShiliReward(E,function(){guide.show(1804)});xGame.xsRemove(player.info.uid+"shilidone",true)};P()}}if(guide.step){guide.show(guide.step);guide.step=0}};loadContents({"c":"map","m":"get_scene_list","l":A},C,false,function(){xGame.loadWorld("city")});C=null},loadGuanqiaMap:function(A,D){var B=this;if(xGame.checkLock()){return false}if(A==null){A=player.info.missionlevel}if(D==null){D=player.info.missionstage}var C=function(L){if(L.status!="1"){xGame.toast.show(lang("have_not_open_checkpoint"));xGame.unlock();return false}var G=$("#header").find("#menu_newpassreward");if(G){if(xGame.menustatus){if(L.popo==1){G.find(".popo").show()}else{G.find(".popo").hide()}G.show()}}if(A&&D){player.info.missionlevel=A;player.info.missionstage=D;player.info.missionsite=3}B.initMapPage();var J=$("#map_wrap");J.html($.template("mapworld_guanqiamap_tmpl"));var O=J.find(".guanqiamap");$("#mapworld_page").removeClass("width2").removeClass("width1");O.css("background-image","url("+B.getGuanqiaMapImage(player.info.missionlevel,player.info.missionstage)+")");$("#footer").find("#essence_map").css("bottom","170px").show();$("#footer").find("#menu_back").unbind("touchend").one("touchend",function(P){mapWorld.loadShiliMap(player.info.missionlevel);P.preventDefault();P.stopPropagation();B=null}).show();var H=null;var M="";for(var K in L.list){if(L.list[K].openstatus==0){if(H<=4&&L.list[K].missionid<=4){M+=B.buildMission(L.list[K],(player.info.missionlevel==1?true:false))}else{if(H>4&&H<=7&&L.list[K].missionid>4&&L.list[K].missionid<=7){M+=B.buildMission(L.list[K],(player.info.missionlevel==1?true:false))}else{if(H>7&&L.list[K].missionid>7){M+=B.buildMission(L.list[K],(player.info.missionlevel==1?true:false))}}}continue}M+=B.buildMission(L.list[K],(player.info.missionlevel==1?true:false));if(L.list[K].status!=1){H=L.list[K].missionid}}O.append(M);if(xGame.guide==false&&player.info.missionlevel==1&&player.info.missionstage==2&&L.list[20].openstatus==1&&L.list[20].status==0){xGame.xsSet(player.info.uid+"gozhangliang",1,true)}O.undelegate(".enemy");O.undelegate(".enemy","touchstart").delegate(".enemy","touchstart",function(){mapWorld.touchObj=this.id});O.undelegate(".enemy","click").delegate(".enemy","click",function(){if(xGame.guide==false&&this.id!=mapWorld.touchObj){mapWorld.touchObj=null;return false}mapWorld.touchObj=null;var P=$(this);miscpop.enemyInfo(P.attr("missionid"),P.attr("openstatus"));P=null});$("#mapworld_page").show();xGame.iscrollRefresh();if(!xGame.xsGet(player.info.uid+"guide_hide_page",true)){B.displayGuanqiaPage(L.next_status)}if(map_ini["shili"][A][D]&&map_ini["shili"][A][D].name){$("#world").append('<p class="nowplace">'+map_ini["shili"][A][D].name+"</p>")}if(xGame.guide==false){B.resultDisplay()}var E=null;if(H){E=O.find("#mission"+H)}var I=function(){if(guide.step){guide.show(guide.step);guide.step=0}xGame.showGuide([0,1,4,7,103,106,109,203,206,209,303,601,604,607,614,617,703,706,709,712,715])};if(E!=null&&E.length>0&&(player.info.level>16||xGame.guide==false)){E.append('<span id="lastenemy_span"></span>')}var F=xGame.xsGet(player.info.uid+"levelup",true);if(F){xGame.xsRemove(player.info.uid+"levelup",true);miscpop.createLevelUp(function(){if(E!=null&&E.length>0){var P=E.offset();if(P.top>416){guide.move2bottom(I)}else{I()}P=null;E=null;I=null}else{if(guide.step){guide.show(guide.step);guide.step=0}}xGame.showGuide([306,1422]);switch(parseInt(player.info.level)){case 20:guide.show(1701);break;case 30:guide.show(1501);break;case 31:miscpop.showComment();break;case 40:guide.show(1504);break;case 50:if(player.info.paychecks==1){miscpop.showNewinvitecode()}else{miscpop.showInvitecode()}break;default:break}mapWorld.resultDisplay();if(xGame.guide&&guide.now==1329){checkLaterUpdate()}})}else{mapWorld.resultDisplay();if(E!=null&&E.length>0){var N=E.offset();if(N.top>416){guide.move2bottom(I)}else{I()}N=null;E=null;I=null}else{if(guide.step){guide.show(guide.step);guide.step=0}}xGame.showGuide([306,1324,1422]);if(xGame.guide&&guide.now==722){guide.show(1409)}}xGame.unlock();M=null;J=null;O=null;C=null};loadContents({"c":"map","m":"get_mission_list","l":A,"s":D},C,false,function(){xGame.loadWorld("city")});C=null},buildMission:function(G,F){if(F==true){var C=1;var E=1;if(G.type==1||G.type==2){C=0}if(G.status==1){E=2}else{if(G.openstatus==0){E=3}}var A=this.get1NPCImage(player.info.missionstage,C,E);var B='<div id="mission'+G.missionid+'" class="btn enemy solderenemy" missionid="'+G.missionid+'" openstatus="'+G.openstatus+'" style="left:'+getSLeft(G.x)+"px;top:"+getSTop(G.y)+"px;background-image:url("+A+');">'+(G.name==""?"":"<p>"+G.name+"</p>")+"</div>";return B}else{var D="";if(G.type==1||G.type==2){D="solderenemy"}else{D="bossenemy"}if(G.status==1){D+=" cry"}else{if(G.openstatus==0){D+=" close"}}var B='<div id="mission'+G.missionid+'" class="btn enemy '+D+'" missionid="'+G.missionid+'" openstatus="'+G.openstatus+'" style="left:'+getSLeft(G.x)+"px;top:"+getSTop(G.y)+'px">'+(G.name==""?"":"<p>"+G.name+"</p>")+"</div>";return B}},resultDisplay:function(){var F=this;var C=xGame.xsGet(player.info.uid+"islose",true);if(C){var D=xGame.xsGet(player.info.uid+"zhanglianglose",true);if(D){xGame.xsRemove(player.info.uid+"islose",true);xGame.xsRemove(player.info.uid+"zhanglianglose",true);guide.show(1901);return false}if(xGame.guide&&guide.now==722){xGame.xsRemove(player.info.uid+"islose",true);xGame.xsRemove("lastBattle",true);return false}var A=xGame.loadPopTmpl("loseguide");A.find("#hidebtn").unbind("touchend").bind("touchend",function(K){A.undelegate(".losepop_btns","touchend");A.undelegate(".retry","touchend");A.find("#hidebtn").unbind("touchend");K.preventDefault();setTimeout(function(){xGame.xsRemove("lastBattle",true);A.remove();A=null},300)});A.undelegate(".losepop_btns","touchend").delegate(".losepop_btns","touchend",function(K){var M=$(this).attr("pop");var L=parseInt($(this).attr("level"));if(player.info.level<L){xGame.toast.show(L+lang("lv_open"))}else{if(M){xGame.showpop(M)}}K.preventDefault()});A.undelegate(".retry","touchend").delegate(".retry","touchend",function(){A.undelegate(".losepop_btns","touchend");A.find("#hidebtn").unbind("touchend");A.undelegate(".retry","touchend");var L=xGame.xsGet("lastBattle",true);var K=L.split(",");L={"l":K[0],"s":K[1],"id":K[2]};A.remove();A=null;miscpop.enterBattle(L)});if(xGame.guide==false&&player.info.level<=40){guide.create("touchend",$("#loseguidepop .strong"),true);A.bind("touchend",function(){guide.hide()})}A.show();xGame.xsRemove(player.info.uid+"islose",true);return}var J=xGame.xsGet(player.info.uid+"getitem",true);if(J){miscpop.itemfly2bag(JSON.parse(J),function(){mapWorld.resultDisplay()});xGame.xsRemove(player.info.uid+"getitem",true);return}var H=xGame.xsGet(player.info.uid+"getgeneral",true);if(H){var B=JSON.parse(H);if(xGame.guide){if(parseInt(B.generalid)==3||parseInt(B.generalid)==4||parseInt(B.generalid)==5){miscpop.newhero(B,function(){if(parseInt(B.generalid)==3){xGame.showGuide([725])}else{if(parseInt(B.generalid)==4){var K=xGame.xsGet(player.info.uid+"no_in_guide",true);if(!K){var L=xGame.xsGet(player.info.uid+"guide_err",true);if(!L){guide.show(1601)}else{guide.now=1614;xGame.xsRemove(player.info.uid+"guide_err",true)}}}else{if(parseInt(B.generalid)==5){var K=xGame.xsGet(player.info.uid+"no_in_guide",true);if(!K){guide.show(1801)}}}}});xGame.toast.show(lang("zhaomudao_xx",[B.name]));xGame.xsRemove(player.info.uid+"getgeneral",true);return}}else{miscpop.newhero(B,function(){mapWorld.resultDisplay()});xGame.toast.show(lang("zhaomudao_xx",[B.name]));xGame.xsRemove(player.info.uid+"getgeneral",true);return}}var G=xGame.xsGet(player.info.uid+"guanqiadone",true);if(G){xGame.confirm.show(lang("next_checkpoint"),lang("open_checkpoint"),1,function(){xGame.confirm.hide(function(){mapWorld.loadShiliMap(G)})});xGame.xsRemove(player.info.uid+"guanqiadone",true);return}var E=xGame.xsGet(player.info.uid+"shilidone",true);if(E){var I=function(){if(xGame.guide==true&&guide.now==1803){return false}var K=xGame.xsGet(player.info.uid+"shilialldone");if(K=="solo"){miscpop.passShiliReward(E,null,true)}else{var L="";if(E==14){L=lang("mapworld_newworld")}else{L=lang("open_shili")}miscpop.passShiliReward(E,function(){xGame.confirm.show(lang("new_shili"),L,1,function(){xGame.confirm.hide(function(){mapWorld.loadWorldMap()})})})}xGame.xsRemove(player.info.uid+"shilidone",true)};I();return}},displayGuanqiaPage:function(E){var F=null,A=null;var B=this;player.info.missionstage=parseInt(player.info.missionstage);if(player.info.missionstage>1){var D=player.info.missionstage-1;F=map_ini["shili"][player.info.missionlevel][D]}var C=player.info.missionstage+1;A=map_ini["shili"][player.info.missionlevel][C];if(F){$("#footer").find("#guanqia_prev").unbind("touchend").bind("touchend",function(G){mapWorld.loadGuanqiaMap(player.info.missionlevel,F.stage);F=null;G.preventDefault();G.stopPropagation()}).text(F.name).show()}if(A){if(parseInt(E)==0){$("#footer").find("#guanqia_next").addClass("close").unbind("touchend").text(A.name).show()}else{$("#footer").find("#guanqia_next").removeClass("close").unbind("touchend").bind("touchend",function(G){mapWorld.loadGuanqiaMap(player.info.missionlevel,A.stage);A=null;G.preventDefault();G.stopPropagation()}).text(A.name).show()}}else{$("#footer").find("#guanqia_next").removeClass("close").unbind("touchend").bind("touchend",function(G){mapWorld.loadShiliMap(player.info.missionlevel);A=null;G.preventDefault();G.stopPropagation()}).text(lang("back")).show()}},displayShiliPage:function(D){var B=null,E=null;var C=this;player.info.missionlevel=parseInt(player.info.missionlevel);if(player.info.missionlevel>1){if(player.info.missionlevel!=15&&player.info.missionlevel!=18&&player.info.missionlevel!=21){var A=player.info.missionlevel-1;B=map_ini["world"][A]}}if(player.info.missionlevel!=14&&player.info.missionlevel!=17&&player.info.missionlevel!=20&&player.info.missionlevel!=23){var F=player.info.missionlevel+1;E=map_ini["world"][F]}if(B){$("#footer").find("#guanqia_prev").text(B.name).unbind("touchend").bind("touchend",function(G){mapWorld.loadShiliMap(B.id);G.preventDefault();G.stopPropagation()}).show()}if(E){if(parseInt(D)==0){$("#footer").find("#guanqia_next").addClass("close").text(E.name).unbind("touchend").show()}else{$("#footer").find("#guanqia_next").removeClass("close").text(E.name).unbind("touchend").bind("touchend",function(G){mapWorld.loadShiliMap(E.id);G.preventDefault();G.stopPropagation()}).show()}}else{$("#footer").find("#guanqia_next").removeClass("close").text(lang("back")).unbind("touchend").bind("touchend",function(G){mapWorld.loadWorldMap();G.preventDefault();G.stopPropagation()}).show()}},clear:function(){xGame.unlock();this.touchObj=null;xGame.clearCloud();$("#footer").find("#menu_world").hide();$("#footer").find("#essence_map").hide();$("#footer").find("#menu_back").hide();$("#footer").find(".guanqia_page_btn").hide();this.first=null}}})();