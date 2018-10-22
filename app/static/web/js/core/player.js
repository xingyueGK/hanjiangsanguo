(function() {
    PlayerClass = function() {
        this.sh = null;
        this.e = null;
        this.lasttime = 0;
        this.info = {
            "uid": "",
            "nickname": "",
            "gender": 0,
            "level": 0,
            "exp": 0,
            "levelupexp": 0,
            "gold": null,
            "silver": 0,
            "act": 0,
            "act_limit": 0,
            "attack": 0,
            "actkemari": 0,
            "actkemari_type": 0,
            "worldcup": 0,
            "worldcup_type": 0,
            "defense": 0,
            "missionsite": 0,
            "missionlevel": 0,
            "missionstage": 0,
            "newpm": 0,
            "newmail": 0,
            "vip": 0,
            "exercise": 0,
            "sacrifice": 0,
            "blackmarket": 0,
            "battlecd": 0,
            "battlecdstatus": 0,
            "soul": 0,
            "levy": null,
            "practice": null,
            "rank": 0,
            "vip_reward": null,
            "race": null,
            "newresult": 0,
            "daily_task": null,
            "gift": null,
            "treasuremap": 0,
            "general_onsale": 0,
            "flop": 0,
            "dailysign": 0,
            "openboss": 0,
            "sg_ver": "",
            "christmas": 0,
            "christmaspay": 0,
            "limitedshop": 0,
            "serverhold": "",
            "rebate": 0,
            "mooncake": 0,
            "activities": 0,
            "exchange": 0,
            "appreview": 0,
            "country": 0,
            "country_war": 0,
            "country_lock": 0,
            "onmine": 0,
            "onworkshop": 0,
            "jade": 0,
            "trends_id": 0,
            "notice_id": 0,
            "ongeneral": 0,
            "server_reward": 0,
            "is_saturday": 0,
            "country_date": "",
            "enemy_name": "",
            "newyeardailysign": 0,
            "jadegamble": 0,
            "newyearpay": 0,
            "new_role_reward": 0,
            "newyeardinner": 0,
            "dinner_get": 0,
            "beatengod": 0,
            "reputation": 0,
            "free_inherit_site": 0,
            "jump_rebate": 0,
            "god": 0,
            "chingming": 0,
            "leave_cd": 0,
            "god_entry": 0,
            "gvg": 0,
            "bind91": 0,
            "country_job": 0,
            "oncountrymine": 0,
            "weibobind": 0,
            "mainquest": [],
            "edifice": [],
            "sacredtree": 0,
            "anniversary": 0,
            "compete": 0,
            "christmasgift": 0,
            "ndgift": 0,
            "viprepay": 0,
            "springshop": 0,
            "jump_rebate_type": 0,
            "chingming_type": 0,
            "christmasgift_type": 0,
            "newyearboss": 0,
            "opennewyearboss": 0,
            "newyearpay_type": 0,
            "compete_type": 0,
            "springlottery": 0,
            "first_recharge": 0,
            "levelgift": 0,
            "newgift": 0,
            "levelgift_popo": 0,
            "newgift_popo": 0,
            "activity_popo": 0,
            "newgift_starttime": 0,
            "newgift_msg": [],
            "rush_popo": 0,
            "guest": 0,
            "god_reward": 0,
            "acttreasure": 0,
            "acttreasure_popo": 0,
            "openbossreward": 0,
            "recall": 0,
            "war": 0,
            "war_entry": 0,
            "pass_general": 0,
            "actthirty": 0,
            "total_login": 0,
            "general_only": 0,
            "acttanabata": 0,
            "moon": 0,
            "national_celebration": 0,
            "login_reward": 0,
            "paychecks": 0,
            "national_day": 0,
            "halloween": 0,
            "halloween_type": 0,
            "actenrichment": 0,
            "sevenstar": 0,
            "christmasbuy": 0,
            "act_newyear": 0,
            "weather": 0,
            "lantern": 0,
            "sword": 0,
            "holiday": 0,
            "newrecall": 0,
            "killdevil": 0,
            "actseven": 0,
            "actguyu": 0,
            "actrechargegift": 0,
            "actjubao": 0,
            "month_fund": 0,
            "parade": 0,
            "cornus": 0,
            "acthallowmas": 0,
            "general_score": 0,
            "amphitheater": 0,
            "acteggpair": 0,
            "actfiveyear": 0,
            "actredenvelope": 0,
            "national_market": 0,
            "general_only_type": 0,
            "bear_accumulate": 0,
            "vitality": 0,
            "star_battle": 0,
            "qm_card": 0,
            "lucky_dice": 0,
            "actpromotion": 0,
            "act_tombo": 0,
            "country_gvg": 0,
            "act_monopoly": 0,
            "act_lottery": 0,
            "accrueeverycharge": 0,
            "accruecost": 0,
            "act_maneki": 0,
            "act_mooncake": 0,
            "act_cornucopia": 0,
            "act_rebate": 0,
            "act_carnival": 0,
            "act_steadily": 0,
            "act_doubleeleven": 0,
            "chicken": 0,
            "fukubukuro": 0,
            "fukubukuro_type": 0,
            "sign": 0,
            "discount_store": 0,
            "discount_store_type": 0,
            "act_generalpool": 0,
            "act_welfare": 0,
            "act_eatice": 0,
            "act_sale": 0,
            "act_angling": 0,
            "act_auction": 0,
            "happy_guoqing": 0,
            "act_shop": 0,
            "act_shake": 0,
            "act_travel": "0",
            "act_solt": "0",
            "act_christmas": 0,
            "act_spring": 0,
            "shoot_halberd": 0,
            "act_muchmoney": 0,
            "break_egg": 0,
            "equip_pwd": 0,
            "repwd_time": 0,
            "act_sacrifice": 0,
            "scratch_prize": 0,
            "seven_star": 0,
            "five_line_guess": 0,
            "three_talents_pk": 0,
            "oldsoldier_recall": 0,
            "coolsummer": 0,
            "scramble": 0,
            "years_guard": 0,
            "ancient_spirit": 0,
            "gold_time": 0,
        };
        this.expBarLength = 209;
        this.worldareanisshow = false;
        this.binding91Show = false;
        this.missionThread;
        this.finishNum;
        this.onlyIndex;
        this.currentSite;
        this.activityList = [];
        this.mainquestNotice = false;
        this.newgiftNoticeSet = false
    };
    PlayerClass.prototype = {
        init: function() {},
        initCd: function() {
            var A = $("#header");
            if (this.info.serverhold != "") {
                if (timer) {
                    timer.pause()
                }
                xGame.showWaitmsg(this.info.serverhold);
                return false
            }
            xGame.checkMenuOpen();
            xGame.updateCd("battle", this.info.battlecd);
            if (this.info.battlecdstatus == 1) {
                $("#battle_timer").children("span").addClass("red")
            } else {
                $("#battle_timer").children("span").removeClass("red")
            }
            if (this.info.levy) {
                if (parseInt(this.info.levy.times) == 0) {
                    this.info.levy.cd = 0
                }
                xGame.updateCd("levy", this.info.levy.cd)
            }
            this.showPracticeSider(this.info.practice.timers);
            if (parseInt(this.info.newpm) == 1) {
                xGame.showpop("mail")
            }
            if (parseInt(this.info.newmail) > 0 || (parseInt(this.info.notice_id) > 0 && parseInt(this.info.notice_id) != parseInt(xGame.xsGet(xGame.server_prefix + "notice_id")))) {
                $("#footer").find(".menu_mailbox").addClass("tada").unbind("touched").one("touchend",
                function() {
                    $(this).removeClass("tada")
                })
            } else {
                $("#footer").find(".menu_mailbox").removeClass("tada")
            }
            if (typeof Platform != "undefined" && Platform.id != "h5") {
                if (this.info.rank > 0) {
                    var D = $("#sider_arena");
                    D.find("p").text(lang("rank", [this.info.rank]));
                    D.show();
                    D = null
                } else {
                    $("#sider_arena").hide()
                }
            }
            if (this.info.mainquest.length > 0) {
                this.buildMissionList();
                $("#mission_wrap").show();
                this.missionAutoMove()
            } else {
                $("#mission_wrap").hide();
                if (this.missionThread != null) {
                    clearInterval(this.missionThread);
                    this.missionThread = null
                }
            }
            if (this.info.newresult > 0) {
                if ($("#passreward_box_wrap").length == 0 && xGame.nowWorld == "city") {
                    setTimeout(function() {
                        var G = xGame.xsGet(player.info.uid + "shilialldone");
                        if (G == "solo") {
                            miscpop.passShiliReward(player.info.newresult, true)
                        } else {
                            miscpop.passShiliReward(player.info.newresult)
                        }
                    },
                    1000)
                }
            }
            var E = $("#dailytask_wrap");
            switch (parseInt(this.info.daily_task.status)) {
            case 0:
                E.hide();
                break;
            case 1:
                E.unbind("touchend").bind("touchend",
                function() {
                    var H = $("#header").find(".header_activity_menu");
                    var G = $("#header").find("#header_activitymenu_control");
                    if (H && G) {
                        G.removeClass("open");
                        xGame.doAnimate(H, "fadeOutTR", "0.35s",
                        function() {
                            H.hide()
                        })
                    }
                    xGame.showpop("dailytask")
                });
                E.find("p").html(lang("task_left") + "(" + this.info.daily_task.number + ")");
                E.show();
                break;
            case 2:
                E.unbind("touchend").bind("touchend",
                function() {
                    xGame.showpop("dailytask")
                });
                var B = E.find("p");
                B.html(this.info.daily_task.name + "<em>" + this.info.daily_task.plan + "</em>/" + this.info.daily_task.value + "");
                if (this.info.daily_task.plan >= this.info.daily_task.value) {
                    B.css({
                        "color": "#72FF3F"
                    })
                }
                E.show();
                if (this.info.daily_task.name.length + 4 > 10) {
                    B.addClass("sp")
                } else {
                    B.removeClass("sp")
                }
                B = null;
                break
            }
            E = null;
            if (this.info.first_recharge == 1 || this.info.first_recharge == 2 || this.info.first_recharge == 3) {
                A.find("#header_firstpay_btn_wrap").show();
                if ((typeof firstpaygiftpop == "undefined" || firstpaygiftpop.e == null) && player.info.first_recharge == 2) {
                    if (xGame.nowWorld == "" || xGame.nowWorld == "login" || xGame.nowWorld == "city") {
                        xGame.showpop("firstpaygift")
                    }
                }
            } else {
                A.find("#header_firstpay_btn_wrap").hide()
            }
            if (this.info.levelgift == 1) {
                A.find("#header_levelgift_btn_wrap").show();
                if (this.info.levelgift_popo == 1) {
                    A.find("#header_levelgift_btn_wrap").children(".popo").show()
                }
            }
            if (this.info.appreview == 0) {
                A.find("#header_friday_btn_wrap").show()
            }
            if (this.info.appreview == 0) {
                A.find("#header_actcalendar_btn_wrap").show()
            }
            if (this.info.act_welfare == 1) {
                A.find("#header_actwelfare_btn_wrap").show()
            }
            if (this.info.sign == 1) {
                A.find("#header_sign_btn_wrap").show()
            }
            if (this.info.newgift == 1) {
                A.find("#header_newgift_btn_wrap").show();
                if (this.info.newgift_popo == 1) {
                    A.find("#header_newgift_btn_wrap").children(".popo").show()
                }
            }
            if (this.info.activity_popo == 1 || this.info.openbossreward == 1) {
                A.find("#header_activity_btn_wrap").children(".popo").show()
            }
            if (this.info.guest == 1) {
                A.find("#header_regreward_btn_wrap").show()
            }
            var C = [];
            if (this.info.new_role_reward == 1) {
                C.push("newbiegift")
            }
            if (this.info.month_fund == 1) {
                C.push("monthfund")
            } else {
                C.push("monthcard")
            }
            if (this.info.appreview == 0) {
                C.push("actfight")
            }
            if (this.info.race == 1) {
                C.push("rush");
                if (this.info.rush_popo == 1) {
                    $("#rush_btn").children(".popo").show()
                }
            }
            if (this.info.exercise == 1) {
                C.push("exercise")
            }
            if (this.info.sacrifice == 1) {
                C.push("sacrifice")
            }
            if (this.info.general_onsale == 1) {
                C.push("godwill")
            }
            if (this.info.flop == 1) {
                C.push("worship")
            }
            if (this.info.mooncake == 1) {
                C.push("mooncake")
            }
            if (this.info.dailysign == 1) {
                C.push("dailysign")
            }
            if (this.info.rebate == 1) {
                C.push("rebate")
            }
            if (this.info.christmaspay == 1) {
                C.push("christmaspay")
            }
            if (this.info.christmas == 1) {
                C.push("christmassign")
            }
            if (this.info.blackmarket == 1) {
                C.push("blackmarket")
            }
            if (this.info.newyeardailysign == 1) {
                C.push("ganen")
            }
            if (this.info.jadegamble == 1) {
                C.push("godmine")
            }
            if (this.info.newyearpay == 1) {
                C.push("newyearpay")
            }
            if (this.info.newyeardinner == 1) {
                C.push("newyeardinner")
            }
            if (this.info.dinner_get == 1) {
                miscpop.openDinnerConfirm()
            }
            if (this.info.beatengod == 1) {
                C.push("beatengod")
            }
            if (this.info.chingming == 1) {
                C.push("qingming")
            }
            if (this.info.jump_rebate == 1) {
                C.push("bear")
            }
            if (this.info.gvg == 1) {
                C.push("gvg")
            }
            if (this.info.limitedshop == 1) {
                C.push("limitedgod")
            }
            if (this.info.sacredtree == 1) {
                C.push("sacredtree")
            }
            if (this.info.anniversary == 1) {
                C.push("anniversary")
            }
            if (this.info.recall == 1) {
                C.push("recall")
            }
            if (this.info.compete == 1) {
                C.push("zhulu")
            }
            if (this.info.viprepay == 1) {
                C.push("viprepay")
            }
            if (this.info.springshop == 1) {
                C.push("springshop")
            }
            if (this.info.christmasgift == 1) {
                C.push("christmasgift")
            }
            if (this.info.newyearboss == 1) {
                C.push("nian")
            }
            if (this.info.springlottery == 1) {
                C.push("newyearlottery")
            }
            if (this.info.god_reward == 1) {
                C.push("championsreward")
            }
            if (this.info.pass_general == 1) {
                C.push("breakthrough")
            }
            if (this.info.acttreasure == 1) {
                C.push("acttreasure")
            }
            var F = false;
            if (Date.parse(new Date()) <= parseInt(this.info.newgift_starttime) * 1000 + 30 * 24 * 60 * 60 * 1000) {
                F = true
            }
            this.setNewgiftNotice(F);
            if (this.info.god_entry == 1 || this.info.god_entry == 2 || this.info.god_entry == 3) {
                C.push("champions")
            }
            if (this.info.war == 1) {
                C.push("war")
            }
            if (this.info.actkemari == 1) {
                C.push("kemari")
            }
            if (this.info.worldcup == 1) {
                C.push("worldcup")
            }
            if (this.info.actthirty == 1) {
                C.push("chargegift")
            }
            if (this.info.total_login == 1) {
                C.push("signin")
            }
            if (this.info.general_only == 1) {
                C.push("outprintgod")
            }
            if (this.info.acttanabata == 1) {
                C.push("valentine")
            }
            if (this.info.moon == 1) {
                C.push("midautumn")
            }
            if (this.info.national_celebration == 1) {
                C.push("nationcel")
            }
            if (this.info.actenrichment == 1) {
                C.push("enrichment")
            }
            if (this.info.sevenstar == 1) {
                C.push("sevenstar")
            }
            if (this.info.login_reward == 1) {
                C.push("loginreward")
            }
            if (this.info.paychecks == 1) {
                C.push("paychecks")
            }
            if (this.info.national_day == 1) {
                C.push("nationalday")
            }
            if (this.info.halloween == 1) {
                if (this.info.halloween_type == 1) {
                    C.push("threeyear")
                } else {
                    C.push("halloween")
                }
            }
            if (this.info.christmasbuy == 1) {
                C.push("christmasbuy")
            }
            if (this.info.act_newyear == 1) {
                C.push("newyear")
            }
            if (this.info.lantern == 1) {
                C.push("lantern")
            }
            if (this.info.sword == 1) {
                C.push("sword")
            }
            if (this.info.holiday == 1) {
                C.push("holiday")
            }
            if (this.info.newrecall == 1) {
                C.push("recallfriend")
            }
            if (this.info.killdevil == 1) {
                C.push("killdevil")
            }
            if (this.info.actseven == 1) {
                C.push("actseven")
            }
            if (this.info.actguyu == 1) {
                C.push("jademall")
            }
            if (this.info.actrechargegift == 1) {
                C.push("newactseven")
            }
            if (this.info.actjubao == 1) {
                C.push("actjubao")
            }
            if (this.info.parade == 1) {
                C.push("parade")
            }
            if (this.info.cornus == 1) {
                C.push("cornus")
            }
            if (this.info.acthallowmas == 1) {
                C.push("acthallowmas")
            }
            if (this.info.general_score == 1) {
                C.push("november")
            }
            if (this.info.amphitheater == 1) {
                C.push("warfield")
            }
            if (this.info.acteggpair == 1) {
                C.push("acteggpair")
            }
            if (this.info.actfiveyear == 1) {
                C.push("fiveyear")
            }
            if (this.info.actredenvelope == 1) {
                C.push("redenvelope")
            }
            if (this.info.national_market == 1) {
                C.push("bazaar")
            }
            if (this.info.bear_accumulate == 1) {
                C.push("accumulate")
            }
            if (this.info.vitality == 1) {
                C.push("vitality")
            }
            if (this.info.star_battle == 1) {
                C.push("starbattle")
            }
            if (this.info.qm_card == 1) {
                C.push("flopbrand")
            }
            if (this.info.lucky_dice == 1) {
                C.push("luckydice")
            }
            if (this.info.actpromotion == 1) {
                C.push("promotion")
            }
            if (this.info.act_tombo == 1) {
                C.push("tongbao")
            }
            if (this.info.country_gvg == 1) {
                C.push("countrygvg")
            }
            if (this.info.act_monopoly == 1) {
                C.push("actmonopoly")
            }
            if (this.info.act_lottery == 1) {
                C.push("newlottery")
            }
            if (this.info.accrueeverycharge == 1) {
                C.push("accrueeverycharge")
            }
            if (this.info.accruecost == 1) {
                C.push("accruecost")
            }
            if (this.info.act_maneki == 1) {
                C.push("actmaneki")
            }
            if (this.info.act_mooncake == 1) {
                C.push("mooncake")
            }
            if (this.info.act_cornucopia == 1) {
                C.push("actcornucopia")
            }
            if (this.info.act_rebate == 1) {
                C.push("actrebate")
            }
            if (this.info.act_carnival == 1) {
                C.push("actcarnival")
            }
            if (this.info.act_steadily == 1) {
                C.push("actsteadily")
            }
            if (this.info.act_doubleeleven == 1) {
                C.push("actdoubleeleven")
            }
            if (this.info.chicken == 1) {
                C.push("chicken")
            }
            if (this.info.fukubukuro == 1) {
                C.push("fukubukuro")
            }
            if (this.info.fukubukuro_type == 1) {
                $("#header").find(".header_activity_menu").addClass("sixyear")
            }
            if (this.info.discount_store_type == 1) {
                $("body").addClass("summer_bg")
            }
            if (this.info.discount_store_type == 2) {
                $("body").addClass("autumn_bg")
            }
            if (this.info.discount_store_type == 3) {
                $("body").addClass("winter_bg")
            }
            if (this.info.discount_store == 1) {
                C.push("discount")
            }
            if (this.info.act_generalpool == 1) {
                C.push("generalpool")
            }
            if (this.info.act_eatice == 1) {
                C.push("acteatice")
            }
            if (this.info.act_sale == 1) {
                C.push("actsale")
            }
            if (this.info.act_angling == 1) {
                C.push("angling")
            }
            if (this.info.act_auction == 1) {
                C.push("actauction")
            }
            if (this.info.happy_guoqing == 1) {
                C.push("guoqing")
            }
            if (this.info.act_shop == 1) {
                C.push("eleven")
            }
            if (this.info.act_shake == 1) {
                C.push("shake")
            }
            if (this.info.act_travel == 1) {
                C.push("travel")
            }
            if (this.info.act_solt == 1) {
                C.push("actsole")
            }
            if (this.info.act_christmas == 1) {
                C.push("actchristmas")
            }
            if (this.info.act_spring == 1) {
                C.push("actspring")
            }
            if (this.info.shoot_halberd == 1) {
                C.push("shoothalberd")
            }
            if (this.info.act_muchmoney == 1) {
                C.push("actmuchmoney")
            }
            if (this.info.break_egg == 1) {
                C.push("signegg")
            }
            if (this.info.act_sacrifice == 1) {
                C.push("actsacrifice")
            }
            if (this.info.scratch_prize == 1) {
                C.push("actscratch")
            }
            if (this.info.seven_star == 1) {
                C.push("bigdipper")
            }
            if (this.info.five_line_guess == 1) {
                C.push("fiveelements")
            }
            if (this.info.three_talents_pk == 1) {
                C.push("threecontest")
            }
            if (this.info.oldsoldier_recall == 1) {
                C.push("playersrecall")
            }
            if (this.info.coolsummer == 1) {
                C.push("specialfestival")
            }
            if (this.info.scramble == 1) {
                C.push("scramble")
            }
            if (this.info.years_guard == 1) {
                C.push("guardian")
            }
            if (this.info.ancient_spirit == 1) {
                C.push("ancientspirit")
            }
            if (this.info.gold_time == 1) {
                C.push("goldentime")
            }
            if (this.info.ndgift == 1) {
                C.push("ndgift");
                setTimeout(function() {
                    if (xGame.nowWorld == "city") {
                        var G = new Date();
                        var H = G.getFullYear() + "" + (G.getMonth() + 1) + "" + G.getDate();
                        var I = xGame.xsGet(xGame.server_prefix + "last_ndgift");
                        if (H != I) {
                            if (typeof ndgiftpop == "undefined" || ndgiftpop.isshow == false) {
                                xGame.showpop("ndgift");
                                xGame.xsSet(xGame.server_prefix + "last_ndgift", H)
                            }
                        }
                    }
                },
                3000)
            }
            if (this.info.country_war > 0 || xGame.nowWorld == "country") {
                if (this.info.country_war != 3) {
                    C.push("cbattle");
                    if (parseInt(player.info.is_saturday) == 1) {
                        miscpop.openCbattleConfirm(this.info.country_war)
                    }
                }
            }
            if (JSON.stringify(C) != JSON.stringify(this.activityList)) {
                this.activityList = C;
                this.renderActivity()
            } else {}
            if (xGame.guide == false && this.info.trends_id > 0 && parseInt(this.info.level) >= 20) {
                setTimeout(function() {
                    if (xGame.nowWorld == "city" || xGame.nowWorld == "map") {
                        var G = new Date();
                        var H = G.getFullYear() + "" + (G.getMonth() + 1) + "" + G.getDate();
                        var I = xGame.xsGet(xGame.server_prefix + "last_trends_id");
                        var J = xGame.xsGet(xGame.server_prefix + "last_trends_date");
                        if (!I || !J || I != player.info.trends_id || J != H) {
                            if (typeof trendspop == "undefined" || trendspop.isshow == false) {
                                xGame.showpop("trends", {
                                    id: player.info.trends_id,
                                    date: H
                                })
                            }
                        }
                    }
                },
                2500)
            }
            if (this.info.openboss == 1) {
                miscpop.openBossConfirm()
            }
            if (this.info.opennewyearboss == 1) {
                miscpop.openNianConfirm()
            }
            if (this.info.sg_ver != "" && this.info.sg_ver != localStorage.getItem("sg_ver")) {
                timer.pause();
                initmsg(lang("update_msg"))
            }
            if (this.worldareanisshow == false && this.info.server_reward != 0) {
                this.serverReward(this.info.server_reward)
            }
        },
        serverReward: function(D) {
            var A = this;
            if (A.worldareanisshow == false) {
                var B = xGame.loadPopTmpl("welfare");
                A.worldareanisshow = true
            } else {
                var B = $("#welfarepop");
                B.show()
            }
            B.find("#welfare_name").html(D.nickname);
            var C = "pop/worshippop_type2.png";
            if (D.type == 2) {
                C = "pop/pop_gem1.png"
            } else {
                if (D.type == 3) {
                    C = "pop/pop_gem2.png"
                } else {
                    if (D.type == 4) {
                        C = "pop/pop_gem3.png"
                    } else {
                        if (D.type == 5) {
                            C = "pop/worshippop_type3.png"
                        } else {
                            if (D.type == 6) {
                                C = "pop/worshippop_type4.png"
                            } else {
                                if (D.type == 7) {
                                    C = "pop/worshippop_type5.png"
                                } else {
                                    if (D.type == 8) {
                                        C = "pop/worshippop_type6.png"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            B.find("#welfare_reward").html(D.num).css({
                "background-image": "url(" + staticUrl + "img/" + C + ")"
            });
            B.find(".pop_btn_middle").hide();
            B.find("#welfare_btn").show();
            B.find("#welfare_btn").unbind("touchend").bind("touchend",
            function() {
                var E = function(F) {
                    switch (parseInt(F.status)) {
                    case 1:
                        B.hide();
                        player.updateinfo({
                            "silver":
                            parseInt(F.silver),
                            "act": parseInt(F.act)
                        });
                        xGame.toast.show(lang("get_reward_success"));
                        if (F.server_reward != "") {
                            A.serverReward(F.server_reward)
                        } else {
                            B.remove();
                            B = null
                        }
                        break;
                    default:
                        xGame.toast.show(lang("no_reward_try_again"));
                        B.hide();
                        B.remove();
                        B = null;
                        break
                    }
                };
                loadContents({
                    "c": "worldarena",
                    "m": "get_server_reward"
                },
                E, true)
            })
        },
        initInfoAndEnter: function() {
            var A = this;
            $("#worldloading").show();
            var B = function(C) {
                $("#worldloading").hide();
                A.updateinfo(C);
                if (A.info.gender == 0) {
                    roleWorld = roleWorld || (new roleWorldClass);
                    roleWorld.init(true);
                    xGame.nowWorld = "role"
                } else {
                    A.initCd();
                    if (player.info.level && player.info.level >= 20) {
                        checkLaterUpdate(function() {
                            xGame.loadWorld("city")
                        })
                    } else {
                        guide.loadGuide()
                    }
                    if (typeof Platform != "undefined" && Platform.id == "h5") {
                        if (xGame.guide == false) {
                            miscpop.showAddToScreen()
                        }
                        miscpop.showStandaloneTips()
                    }
                    xGame.updateCd("updatePlayer", null);
                    xGame.updateCd("chat", 0);
                    if (gAudio) {
                        gAudio.playbgm("city_bgm")
                    }
                    if (xGame.xsGet("pay_receipt")) {
                        console.log("启动时检查支付");
                        iospayCheck()
                    }
                    xGame.initLocalNotication();
                    if (xGame.guide == false) {
                        xGame.xsRemove(player.info.uid + "guide_hide_page", true)
                    }
                }
                B = null;
                A = null
            };
            loadContents({
                "c": "member",
                "m": "index"
            },
            B, true,
            function() {
                initmsg(lang("no_internet_msg"))
            })
        },
        reloadInfo: function(A, D) {
            var B = this;
            var C = function(E) {
                B.updateinfo(E);
                B.initCd();
                B.toggleActivityPopo();
                A && A();
                C = null;
                B = null
            };
            loadContents({
                "c": "member",
                "m": "index"
            },
            C, D != undefined ? D: true,
            function() {
                initmsg(lang("no_internet_msg"))
            });
            C = null
        },
        _show: function() {
            var F = this;
            var G = $("#header");
            var A;
            A = G.find(".avatar");
            if (A.css("background-image") == "none" && F.info.gender > 0) {
                A.addClass("avatar" + F.info.gender)
            }
            A = G.find(".name");
            if (A.text() != F.info.nickname) {
                A.html("<em" + (F.info.nickname.length > 5 ? ' style="font-size:18px;"': "") + ">" + F.info.nickname + "</em>")
            }
            A = G.find(".level");
            if (A.text() != F.info.level) {
                A.html("" + F.info.level)
            }
            A = $("#vip_bj");
            if (A.text() != F.info.vip) {
                // A.html("VIP." + F.info.vip)
                A.html("VIP." + 16)
            }
            if (F.info.vip >= 1) {
                $("#vip_bj").show()
            } else {
                $("#vip_bj").hide()
            }
            var H = $("#act").find("p");
            if (H.text() != F.info.act + "/" + F.info.act_limit) {
                xGame.doAnimate2(H, "changcolor", 100, 7,
                function() {
                    H.html("" + F.info.act + "/" + F.info.act_limit);
                    H = null
                })
            }
            var C = parseInt(F.info.silver) > 999999 ? F.getWan(F.info.silver) : F.info.silver + "";
            var D = $("#coin").find("p");
            if (D.text() != C) {
                xGame.doAnimate2(D, "changcolor", 100, 7,
                function() {
                    D.html(C);
                    D = null
                })
            }
            var B = parseInt(F.info.gold) > 999999 ? F.getWan(F.info.gold) : F.info.gold + "";
            var E = $("#gold").find("p");
            if (E.text() != B) {
                xGame.doAnimate2(E, "changcolor", 100, 7,
                function() {
                    E.text(B)
                })
            }
            A = null;
            G = null;
            F._expBar()
        },
        getWan: function(A) {
            return Math.floor(parseInt(A) / 10000) + lang("10k")
        },
        _expBar: function() {
            var B = this;
            var C = $("#header").find(".avatar_wrap");
            var A = C.find(".exp").text();
            if (A != B.info.exp + "/" + B.info.levelupexp) {
                var D = parseInt(B.info.exp) / parseInt(B.info.levelupexp) * B.expBarLength;
                D = parseInt(D);
                C.find(".expbar").width(D);
                C.find(".exp").text("" + B.info.exp + "/" + B.info.levelupexp);
                C.find(".explong").text(Math.floor(B.info.exp / B.info.levelupexp * 100) + "%");
                if (B.info.levelupexp > 10000) {
                    C.addClass("toolong")
                } else {
                    C.removeClass("toolong")
                }
            }
            C = null
        },
        updateinfo: function(C) {
            var B = this;
            for (var A in C) {
                if (A == "gold" && B.info[A] != null && parseInt(C[A]) < parseInt(B.info[A])) {
                    B.taskaction(5)
                } else {
                    if (A == "vip" && parseInt(B.info[A]) < 3 && parseInt(C[A]) >= 3) {
                        C.attackcd = {
                            status: 0,
                            cd: 0
                        };
                        C.levy.cd = 0;
                        C.levy.status = 0;
                        if (typeof levypop != "undefined" && levypop.e != null) {
                            xGame.updateCd("levy", 0)
                        }
                        if (typeof strongpop != "undefined" && strongpop.e != null) {
                            xGame.updateCd("strong", 0)
                        }
                    }
                }
                if (typeof B.info[A] != "undefined" && C[A] != null) {
                    B.info[A] = C[A]
                }
            }
            if (C.attackcd) {
                B.info.battlecd = C.attackcd.cd;
                B.info.battlecdstatus = C.attackcd.status
            }
            B._show()
        },
        showPracticeSider: function(A) {
            if (this.info.practice) {
                var B = $("#sider_practice");
                if (A > 0) {
                    xGame.updateCd("siderPractice", A);
                    B.find("p").attr({
                        "class": "cd"
                    })
                } else {
                    xGame.updateCd("siderPractice", 0);
                    B.find("p").attr({
                        "class": "nocd"
                    }).text(lang("can_practice_hero"))
                }
                B = null
            }
        },
        taskaction: function(A, C) {
            if (parseInt(A) == parseInt(player.info.daily_task.type)) {
                var B = $("#dailytask_wrap").find("p");
                player.info.daily_task.plan += 1;
                var D = parseInt(player.info.daily_task.plan);
                if (D >= parseInt(player.info.daily_task.value) || C == true) {
                    D = parseInt(player.info.daily_task.value);
                    B.css({
                        "color": "#72E957"
                    })
                }
                B.find("em").html(D);
                B = null
            }
        },
        hideActivity: function(A) {
            if (!miscpop.in_array(A, this.activityList)) {
                return false
            }
            this.activityList.splice(this.activityList.indexOf(A), 1);
            this.renderActivity()
        },
        showActivity: function(A) {
            if (miscpop.in_array(A, this.activityList)) {
                return false
            }
            this.activityList.push(A);
            this.renderActivity()
        },
        renderActivity: function() {
            var C = "";
            var J = 0;
            var D = Platform.id == "h5" ? 2 : 3;
            var A = 1;
            var B = $("#header_activitymenu_control").find(".popo");
            for (var F = 0; F < this.activityList.length; F++) {
                if (J == 0) {
                    C += '<li class="li' + A + '" id="li' + A + '">'
                } else {
                    if (J == D) {
                        J = 0;
                        A++;
                        C += '</li><li class="li' + A + '" id="li' + A + '">'
                    }
                }
                var G = this.activityList[F];
                if ((this.info[G] == 1 && this.info[G + "_type"] == 1) || (G == "qingming" && this.info["chingming_type"] == 1) || (G == "bear" && this.info["jump_rebate_type"] == 1) || (G == "zhulu" && this.info["compete_type"] == 1)) {
                    C += '<div pop="' + G + '" class="rightsidebtn btn new" id="' + G + '_btn">'
                } else {
                    if (parseInt(this.info.general_only_type) == 3 && G == "outprintgod") {
                        C += '<div pop="' + G + '" class="rightsidebtn btn devil" id="' + G + '_btn">'
                    } else {
                        C += '<div pop="' + G + '" class="rightsidebtn btn" id="' + G + '_btn">'
                    }
                    if (this.info[G + "_popo"] == 0) {
                        C += '<span class="popo"></span>'
                    } else {
                        if (this.info[G + "_popo"] == 1) {
                            C += '<span class="popo" style="display:block;"></span>';
                            B.show()
                        }
                    }
                }
                var E = [];
                if (G == "cbattle") {
                    if ((this.info.is_saturday == 1 && this.info.country_war == 1) || this.info.country_war == 2 || this.info.country_war == 4) {
                        E.push("tada")
                    }
                    if (this.info.country_lock == 1) {
                        E.push("force")
                    }
                }
                C += '<div class="main ' + E.join(" ") + '"></div>';
                C += "</div>";
                J++
            }
            C += "</li>";
            var H = $("#header");
            var I = H.find(".header_activity_menu");
            H.find(".rightside2_wrap").html(C);
            I.hide()
        },
        buildMissionList: function() {
            var A = "";
            var D = "";
            this.finishNum = 0;
            this.onlyIndex = 0;
            var E = false;
            if (this.info.mainquest.length > 1) {
                if (this.info.mainquest[0].status == 1) {
                    D = '<li class="g">' + this.info.mainquest[0].name + "</li>"
                } else {
                    D = "<li>" + this.info.mainquest[0].name + "</li>"
                }
            }
            for (var B = 0; B < this.info.mainquest.length; B++) {
                if (this.info.mainquest[B].status == 1) {
                    A += '<li class="g">' + this.info.mainquest[B].name + "</li>";
                    this.finishNum += 1;
                    this.onlyIndex = B + 1
                } else {
                    A += "<li>" + this.info.mainquest[B].name + "</li>"
                }
                if (this.info.mainquest[B].task_type == 20) {
                    E = true;
                    this.setMainquestNotice()
                }
            }
            if (E == false) {
                this.cancelMainquestNotice()
            }
            var C = $("#mission_wrap");
            C.find("ul").html(A + D);
            if (this.finishNum > 0) {
                if (C.find(".popo").length == 0) {
                    C.append('<span class="popo"></span>')
                }
            } else {
                C.find(".popo").remove()
            }
            A = null;
            D = null;
            C = null
        },
        missionAutoMove: function() {
            if (this.missionThread != null) {
                clearInterval(this.missionThread);
                this.missionThread = null
            }
            if (!miscpop.in_array(xGame.nowWorld, ["city", "map", "treasure", "countrymap"]) || xGame.menustatus == false) {
                return false
            }
            var A = $("#mission_wrap");
            if (this.info.mainquest.length > 0 && this.info.mainquest.length != 1 && this.finishNum != 1) {
                if (this.currentSite == null) {
                    this.currentSite = 1
                }
                this.missionThread = setInterval(function() {
                    player.currentSite += 1;
                    if (player.currentSite == player.info.mainquest.length + 1) {
                        A.find("ul").css("-webkit-transform", "translateY(" + ( - 30 * (player.currentSite - 1)) + "px)").one("webkitTransitionEnd",
                        function() {
                            $(this).addClass("no_anim").css("-webkit-transform", "translateY(0px)");
                            setTimeout(function() {
                                A.find("ul").removeClass("no_anim")
                            },
                            100);
                            player.currentSite = 1
                        })
                    } else {
                        A.find("ul").css("-webkit-transform", "translateY(" + ( - 30 * (player.currentSite - 1)) + "px)")
                    }
                },
                3000)
            } else {
                if (this.onlyIndex > 0) {
                    A.find("ul").css("-webkit-transform", "translateY(" + ( - 30 * (this.onlyIndex - 1)) + "px)")
                } else {
                    A.find("ul").css("-webkit-transform", "translateY(0px)")
                }
            }
        },
        setMainquestNotice: function() {
            if (this.mainquestNotice == true) {
                return
            }
            this.mainquestNotice = true;
            if (typeof cordova != "undefined" && typeof window.plugins.localNotification != "undefined") {
                window.plugins.localNotification.cancel("mainquest");
                var C = new Date();
                var A = C.getFullYear() + "-" + (C.getMonth() + 1) + "-" + C.getDate();
                var B = miscpop.getTimestamp(A + " 00:00:00") / 1000 + 60 * 60 * 24;
                window.plugins.localNotification.add({
                    date: B,
                    message: lang("mainquest_notice"),
                    badge: 1,
                    repeat: "daily",
                    id: "mainquest",
                    sound: "sub.caf"
                })
            }
        },
        cancelMainquestNotice: function() {
            this.mainquestNotice = false;
            if (typeof cordova != "undefined" && typeof window.plugins.localNotification != "undefined") {
                window.plugins.localNotification.cancel("mainquest")
            }
        },
        setNewgiftNotice: function(C) {
            var G = this;
            if (typeof cordova != "undefined" && typeof window.plugins.localNotification != "undefined") {
                if (G.newgiftNoticeSet == true) {
                    return
                }
                G.newgiftNoticeSet = true;
                for (var F = 0; F < 4; F++) {
                    window.plugins.localNotification.cancel("newgift" + F)
                }
                if (C) {
                    var E = Math.floor(Date.parse(new Date()) / 1000);
                    var J = parseInt(G.info.newgift_starttime);
                    var H = J + 2 * 86400;
                    var I = J + 7 * 86400;
                    var A = J + 15 * 86400;
                    var K = J + 30 * 86400;
                    var D = [H, I, A, K];
                    for (var F = 0,
                    B = G.info.newgift_msg.length; F < B; F++) {
                        if (E <= D[F]) {
                            window.plugins.localNotification.add({
                                date: D[F],
                                message: G.info.newgift_msg[F],
                                badge: 1,
                                id: "newgift" + F,
                                sound: "sub.caf"
                            })
                        }
                    }
                }
            }
        },
        toggleActivityPopo: function() {
            var C = $("#header_activitymenu_control").find(".popo");
            C.hide();
            var A = null;
            for (var B = 0; B < this.activityList.length; B++) {
                A = this.activityList[B];
                if (this.info[A + "_popo"] == 1) {
                    C.show();
                    break
                }
            }
            C = null
        },
    }
})();