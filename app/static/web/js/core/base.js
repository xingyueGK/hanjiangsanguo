if (! ((window.DocumentTouch && document instanceof DocumentTouch) || "ontouchstart" in window)) {
    var script = document.createElement("script");
    script.src = staticUrl + "js/touch.js";
    var tag = $("head").append(script);
    $.os.desktop = true
} (function() {
    xGameClass = function() {
        this.server_prefix = "";
        this.server_domain = "";
        this.API = "";
        this.token = "";
        this.xsPrefix = "htm5.app.sg.";
        this.confirm;
        this.toast;
        this.nowWorld = "";
        this.lastWorld = "";
        this.battleSeconds = 0;
        this.battleTimer = null;
        this.iscroll;
        this.islock = false;
        this.menustatus = true;
        this.activitymenustatus = false;
        this.guide = false;
        this.devicetoken = "000000";
        this.macaddr = "00:00:00:00:00:00";
        this.adid = "";
        this.ate = 0;
        this.udid = "";
        this.hornObj;
        this.payErrorNums = 0;
        this.iosLastPay = null;
        this.lastCheckMenuLevel = 0
    };
    xGameClass.prototype = {
        init: function() {
            $("#initloading").hide();
            xGame.start()
        },
        start: function() {
            var A = this;
            hideAddressBar();
            A.initLogin();
            A.initPlugins();
            A.initMenu();
            player = player || new PlayerClass;
            player.init();
            if (/OS 7_\d(_\d)? like Mac OS X/i.test(navigator.userAgent)) {
                $(".rightside_wrap").css("top", "20px")
            }
            if (typeof cordova != "undefined") {
                A.initPhoneGapPlugins()
            }
            if (A.token != "") {
                player.initInfoAndEnter()
            } else {
                if (Platform.id == "h5" && A.xsGet("temptoken")) {
                    console.log("我在用temptoken");
                    var B = A.xsGet("temptoken");
                    http(UCAPI + "&c=user&m=get_info_by_temptoken&", {
                        "temptoken": B,
                    },
                    function(C) {
                        if (C.status == 1) {
                            A.xsRemove("temptoken");
                            A.xsSet("token", C.token);
                            A.xsSet("addr", (islocal == true ? "t": "s") + C.serverid + ".game.hanjiangsanguo.com");
                            A.xsSet("server_name", C.servername);
                            if (C.username == "") {
                                A.xsSet("tryuid", C.uid)
                            } else {
                                A.xsSet("lastaccountsaved", C.username)
                            }
                            A.initLoginProcess();
                            player.initInfoAndEnter()
                        } else {
                            A.loadWorld("login")
                        }
                    })
                } else {
                    A.loadWorld("login")
                }
            }
            if (isPhonegap) {
                A.reEditCss()
            }
        },
        initPlugins: function() {
            this.confirm = this.confirm || new confirmClass;
            this.toast = this.toast || new toastClass;
            miscpop = miscpop || new miscPopClass
        },
        autoFadeOut: function() {
            if (this.activitymenustatus) {
                this.activitymenustatus = false;
                var A = $("#header").find(".header_activity_menu");
                $("#header").find("#header_activitymenu_control").removeClass("open");
                xGame.doAnimate(A, "fadeOutTR", "0.35s",
                function() {
                    A.hide()
                })
            }
        },
        initMenu: function() {
            var D = this;
            D.doMenuAnim();
            var I = $("#footer");
            var G = I.find("#menu_list");
            var A = I.find("#menu_list2");
            var B = I.find("#menu_list3");
            var F = I.find("#menu_listwar");
            var C = I.find("#menu_control");
            var H = I.find("#menu_promotlist");
            $("#world").unbind("click").bind("click",
            function(J) {
                D.autoFadeOut()
            });
            $("#footer").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut()
            });
            I.find(".menu_chat").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                D.showpop(K);
                J.preventDefault();
                J.stopPropagation()
            });
            I.find(".menu_mailbox").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                D.showpop(K);
                J.preventDefault();
                J.stopPropagation()
            });
            G.undelegate("li", "touchend").delegate("li", "touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                if (K != undefined) {
                    if (K == "country") {
                        player.reloadInfo(function() {
                            D.showpop("country")
                        },
                        false)
                    } else {
                        D.showpop(K)
                    }
                } else {
                    D.loadWorld($(this).attr("world"))
                }
                K = null;
                J.preventDefault();
                J.stopPropagation()
            });
            A.undelegate("li", "touchend").delegate("li", "touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                if (K == "city") {
                    A.find("#menu_map").show();
                    A.find("#menu_friends").show();
                    A.find("#essence_map").hide();
                    A.find("#menu_back").hide();
                    $(".bottom_page_wrap").hide();
                    D.loadWorld(K);
                    if (essencepop && essencepop.e) {
                        essencepop.hide();
                        A.find("#menu_world").hide()
                    }
                    $(this).hide()
                } else {
                    if (K == "map") {
                        A.find("#menu_friends").hide();
                        A.find("#menu_city").show();
                        $(".bottom_page_wrap").show();
                        D.loadWorld(K);
                        $(this).hide()
                    } else {
                        if (K == "friends") {
                            xGame.showpop("friends")
                        } else {
                            if (K == "essence") {
                                D.showpop("essence")
                            }
                        }
                    }
                }
                J.preventDefault();
                J.stopPropagation()
            });
            B.undelegate("li", "touchend").delegate("li", "touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                if ($(this).hasClass("menu_war")) {
                    if (F.hasClass("show")) {
                        xGame.doAnimate(F, "fadeOutTR1", "0.35s",
                        function() {
                            F.hide();
                            F.removeClass("show")
                        })
                    } else {
                        if (H.hasClass("show")) {
                            D.doAnimate($("#menu_promotlist"), "fadeOutRight", "0.35s",
                            function() {
                                $("#menu_promotlist").hide();
                                $("#menu_promotlist").removeClass("show");
                                xGame.unlock()
                            })
                        }
                        xGame.doAnimate(F, "fadeInTR1", "0.35s",
                        function() {
                            F.addClass("show")
                        });
                        F.show()
                    }
                } else {
                    if ($(this).hasClass("menu_promote")) {
                        if (H.hasClass("show")) {
                            xGame.doAnimate(H, "fadeOutTR1", "0.35s",
                            function() {
                                H.hide();
                                H.removeClass("show")
                            })
                        } else {
                            D.doAnimate($("#menu_listwar"), "fadeOutRight", "0.35s",
                            function() {
                                $("#menu_listwar").hide();
                                $("#menu_listwar").removeClass("show");
                                xGame.unlock()
                            });
                            xGame.doAnimate(H, "fadeInTR1", "0.35s",
                            function() {
                                H.addClass("show")
                            });
                            H.show()
                        }
                    } else {
                        if (K != undefined) {
                            D.showpop(K)
                        } else {
                            D.loadWorld($(this).attr("world"))
                        }
                    }
                }
                K = null;
                J.preventDefault();
                J.stopPropagation()
            });
            F.undelegate("li", "touchend").delegate("li", "touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                if (K != undefined) {
                    D.showpop(K)
                } else {
                    D.loadWorld($(this).attr("world"))
                }
                K = null;
                J.preventDefault();
                J.stopPropagation()
            });
            H.undelegate("li", "touchend").delegate("li", "touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                if (K != undefined) {
                    D.showpop(K)
                } else {
                    D.loadWorld($(this).attr("world"))
                }
                K = null;
                J.preventDefault();
                J.stopPropagation()
            });
            C.unbind("touchend").bind("touchend",
            function(J) {
                D.menuToggle();
                J.preventDefault();
                J.stopPropagation()
            });
            var E = $("#header");
            E.find("#header_activitymenu_control").unbind("touchend").bind("touchend",
            function(J) {
                var M = Math.ceil(player.activityList.length / 3) || 1;
                var N = $("#header").find(".header_activity_menu");
                if (D.activitymenustatus) {
                    D.activitymenustatus = false;
                    $("#header").find("#header_activitymenu_control").removeClass("open");
                    xGame.doAnimate(N, "fadeOutTR", "0.35s",
                    function() {
                        N.hide()
                    })
                } else {
                    D.activitymenustatus = true;
                    var L = M * 105;
                    var K = 790 - 105 * (M - 1);
                    if (isIPhone5) {
                        K = 980 - 105 * (M - 1)
                    } else {
                        if ($.os.ipad) {
                            K = 855 - 105 * (M - 1)
                        }
                    }
                    $(".rightside2_wrap").css({
                        "right": M * 5 + "px"
                    });
                    N.css({
                        "width": L + "px",
                        "left": K + "px"
                    });
                    $("#header").find("#header_activitymenu_control").addClass("open");
                    xGame.doAnimate(N, "fadeInTR", "0.35s",
                    function() {});
                    N.show();
                    D.doAnimate($("#menu_listwar"), "fadeOutRight", "0.35s",
                    function() {
                        $("#menu_listwar").hide();
                        $("#menu_listwar").removeClass("show");
                        xGame.unlock()
                    });
                    D.doAnimate($("#menu_promotlist"), "fadeOutRight", "0.35s",
                    function() {
                        $("#menu_promotlist").hide();
                        $("#menu_promotlist").removeClass("show");
                        xGame.unlock()
                    })
                }
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#menu_newpassreward").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                var K = $(this).attr("pop");
                D.showpop(K);
                J.preventDefault();
                J.stopPropagation()
            });
            E.undelegate(".rightsidebtn", "touchend").delegate(".rightsidebtn", "touchend",
            function(K) {
                var M = false;
                var L = $(this).attr("pop");
                for (var J = 0; J < player.activityList.length; J++) {
                    if (L == player.activityList[J]) {
                        M = true;
                        break
                    }
                }
                if (!M || L == "signin") {
                    D.autoFadeOut()
                }
                if (L == "cbattle") {
                    if (parseInt(player.info.leave_cd) > 0) {
                        D.loadWorld("countrybattle")
                    } else {
                        if (player.info.country_war == 4) {
                            D.loadWorld("countrybattle")
                        } else {
                            if (parseInt(player.info.is_saturday) == 0) {
                                if (player.info.enemy_name && player.info.enemy_name != "") {
                                    xGame.toast.show(lang("country_battle_start_time_npc", [player.info.country_date, player.info.enemy_name]))
                                } else {
                                    xGame.toast.show(lang("country_battle_start_time", [player.info.country_date]))
                                }
                            } else {
                                D.loadWorld("countrybattle")
                            }
                        }
                    }
                } else {
                    if (L == "gvg") {
                        D.loadWorld("gvg")
                    } else {
                        if (L == "champions") {
                            D.loadWorld("champions")
                        } else {
                            if (L == "nian") {
                                D.loadWorld("nian")
                            } else {
                                if (L == "war") {
                                    D.loadWorld("war")
                                } else {
                                    if (L == "breakthrough") {
                                        D.loadWorld("breakthrough")
                                    } else {
                                        D.showpop(L)
                                    }
                                }
                            }
                        }
                    }
                }
                K.preventDefault();
                K.stopPropagation()
            });
            E.find("#avatar_wrap").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                D.showpop("settings");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#vip_bj").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                D.showpop("vip");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#add_act_btn").unbind("touchend").bind("touchend",
            function() {
                D.autoFadeOut();
                D.buyActConfirm()
            });
            E.find("#sider_arena").unbind("touchend").bind("touchend",
            function(J) {
                D.showpop("arena");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#sider_levy").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                xGame.showpop("levy");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#sider_practice").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                xGame.showpop("practice");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#mission_wrap").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                xGame.showpop("mission");
                J.preventDefault();
                J.stopPropagation()
            });
            E.find("#expostulation_wrap").find("p").unbind("click").bind("click",
            function() {
                xGame.showpop("expostulation")
            });
            E.undelegate("#countrybanquet_wrap.open", "click").delegate("#countrybanquet_wrap.open", "click",
            function() {
                xGame.showpop("countrybanquet")
            });
            E.undelegate("#countrylearn_wrap.open", "click").delegate("#countrylearn_wrap.open", "click",
            function() {
                xGame.showpop("countrylearn")
            });
            E.undelegate("#countrycollege_wrap.open", "click").delegate("#countrycollege_wrap.open", "click",
            function() {
                xGame.showpop("countrycollege")
            });
            E.undelegate("#countryboss_wrap.open", "click").delegate("#countryboss_wrap.open", "click",
            function() {
                xGame.loadWorld("countryboss")
            });
            E.undelegate("#attackJapan_wrap.open", "click").delegate("#attackJapan_wrap.open", "click",
            function() {
                xGame.loadWorld("attackJapan")
            });
            $("#chatpop_small").unbind("touchend").bind("touchend",
            function(J) {
                D.autoFadeOut();
                xGame.showpop("chat");
                $(this).hide();
                J.preventDefault();
                J.stopPropagation()
            });
            E = null
        },
        setMenuList2: function(A) {
            var B = $("#menu_list2");
            if (A == "city") {
                B.find("#menu_map").show();
                B.find("#menu_friends").show();
                B.find("#menu_city").hide()
            } else {
                if (A == "map") {
                    B.find("#menu_city").show();
                    B.find("#menu_map").hide();
                    B.find("#menu_friends").hide()
                }
            }
            B = null
        },
        buyActConfirm: function() {
            var A = function(B) {
                if (B.price) {
                    xGame.confirm.show(lang("buy_act"), lang("nuy_act_ask", [B.price, player.info.act]), 2,
                    function() {
                        var C = function(D) {
                            if (D.status == 1) {
                                player.updateinfo({
                                    "gold": D.gold,
                                    "act": D.act
                                });
                                $("#buy_act_price").html(D.price);
                                $("#buy_act_num").html(D.act)
                            } else {
                                if (D.status == -1) {
                                    xGame.toast.show(lang("gold_not_enough"))
                                } else {
                                    xGame.toast.show(lang("buy_act_fail"))
                                }
                            }
                            C = null
                        };
                        loadContents({
                            "c": "shop",
                            "m": "buy_act",
                            "t": 1
                        },
                        C)
                    },
                    function() {
                        xGame.confirm.hide()
                    },
                    lang("buy"), lang("close"))
                } else {
                    xGame.toast.show(lang("can_not_buy_now"))
                }
                A = null
            };
            loadContents({
                "c": "shop",
                "m": "buy_act"
            },
            A)
        },
        editor: function() {
            console.log(this.API + "&c=editor&token=" + this.token)
        },
        horn: function(C) {
            var G = 400;
            var H = $("#chat_horn_msg");
            if (H.length != 0) {
                H.find("ul").append(C);
                var E = Number(H.find("ul").attr("speed"));
                var D = H.find("ul").width();
                var B = Math.abs(H.find("ul").offset().left - H.offset().left - H.width());
                var F = (D + G - B) / E;
                this.hornObj.stop();
                this.hornObj = new jsMorph();
                this.hornObj.reset("msg_ul", {
                    left: -D + "px"
                },
                {
                    duration: F
                },
                null, null, null,
                function() {
                    H.addClass("chat_horn_msg_hide").unbind("webkitAnimationEnd").one("webkitAnimationEnd",
                    function() {
                        H.remove();
                        H = E = D = B = F = this.hornObj = null
                    })
                }).start()
            } else {
                H = $('<div id="chat_horn_msg"><div class="ch_left"></div><div class="ch_center"><ul id="msg_ul">' + C + '</ul></div><div class="ch_right"></div></div>');
                H.appendTo($("body"));
                var D = H.find("ul").width();
                var A = D / 0.04;
                A = A < 8000 ? 8000 : A;
                H.find("ul").attr({
                    "speed": (D + G) / A
                });
                this.hornObj = new jsMorph("msg_ul", {
                    left: -D + "px"
                },
                {
                    duration: A
                },
                null, null, null,
                function() {
                    H.addClass("chat_horn_msg_hide").unbind("webkitAnimationEnd").one("webkitAnimationEnd",
                    function() {
                        H.remove();
                        H = D = null
                    })
                }).start()
            }
        },
        menuToggle: function() {
            if (this.menustatus == true) {
                this.menuClose();
                $("body").addClass("commonhide");
                $("#chatpop_small").hide();
                $(".header_gift_btn").hide();
                $("#menu_newpassreward").hide();
                var A = $("#header").find(".header_activity_menu");
                if (this.activitymenustatus) {
                    this.activitymenustatus = false;
                    $("#header").find("#header_activitymenu_control").removeClass("open");
                    xGame.doAnimate(A, "fadeOutTR", "0.35s",
                    function() {
                        A.hide();
                        $("#header_activitymenu_control").hide()
                    })
                } else {
                    $("#header_activitymenu_control").hide()
                }
                if (player.missionThread != null) {
                    clearInterval(player.missionThread);
                    player.missionThread = null
                }
            } else {
                this.menuOpen();
                $("body").removeClass("commonhide");
                $("#chatpop_small").show();
                $(".header_gift_btn").show();
                if (this.nowWorld == "map" && player.info.missionsite != 1) {
                    $("#menu_newpassreward").show()
                } else {
                    $("#menu_newpassreward").hide()
                }
                $("#header_activitymenu_control").show()
            }
        },
        menuClose: function() {
            var A = this;
            if (xGame.checkLock()) {
                return
            }
            $("#menu_control").removeClass("close");
            A.doAnimate($("#menu_list"), "fadeOutRight", "0.35s",
            function() {
                A.menustatus = false;
                xGame.unlock();
                $("#menu_list").hide()
            });
            A.doAnimate($("#menu_list2"), "fadeOutDown", "0.35s",
            function() {
                $("#menu_list2").hide();
                xGame.unlock()
            });
            A.doAnimate($("#menu_list3"), "fadeOutRight", "0.35s",
            function() {
                $("#menu_list3").hide();
                xGame.unlock()
            });
            A.doAnimate($("#menu_listwar"), "fadeOutRight", "0.35s",
            function() {
                $("#menu_listwar").hide();
                $("#menu_listwar").removeClass("show");
                xGame.unlock()
            });
            A.doAnimate($("#menu_promotlist"), "fadeOutRight", "0.35s",
            function() {
                $("#menu_promotlist").hide();
                $("#menu_promotlist").removeClass("show");
                xGame.unlock()
            })
        },
        menuOpen: function() {
            var A = this;
            if (xGame.checkLock()) {
                return
            }
            $("#menu_control").addClass("close");
            A.doAnimate($("#menu_list"), "fadeInRight", "0.35s",
            function() {
                A.menustatus = true;
                xGame.unlock();
                if (player.info.mainquest.length > 0) {
                    player.missionAutoMove()
                }
            });
            A.doAnimate($("#menu_list2"), "fadeInUp", "0.35s",
            function() {
                xGame.unlock()
            });
            $("#menu_list").show();
            $("#menu_list2").show();
            A.doAnimate($("#menu_list3"), "fadeInRight", "0.35s",
            function() {
                xGame.unlock()
            });
            $("#menu_list3").show();
            A.doAnimate($("#menu_listwar"), "fadeInRight", "0.35s",
            function() {
                xGame.unlock()
            });
            $("#menu_listwar").hide();
            $("#menu_listwar").removeClass("show")
        },
        initLogin: function() {
            if (Platform.id == "91" && Platform.userinfo != null) {
                if ((this.xsExist("nduin") && this.xsGet("nduin") != Platform.userinfo.ndLoginUin) || (this.xsExist("ndsessionid") && this.xsGet("ndsessionid") != Platform.userinfo.ndSessionId)) {
                    this.xsRemove("token");
                    this.xsRemove("addr");
                    this.xsRemove("guide");
                    this.xsRemove("guidenow")
                }
                this.xsSet("nduin", Platform.userinfo.ndLoginUin);
                this.xsSet("ndsessionid", Platform.userinfo.ndSessionId)
            } else {
                if (Platform.id == "pp" && Platform.userinfo != null) {
                    if ((this.xsExist("ppuid") && this.xsGet("ppuid") != Platform.userinfo.ppuid) || (this.xsExist("ppsessionid") && this.xsGet("ppsessionid") != Platform.userinfo.ppsessionid)) {
                        this.xsRemove("token");
                        this.xsRemove("addr");
                        this.xsRemove("guide");
                        this.xsRemove("guidenow")
                    }
                    this.xsSet("ppuid", Platform.userinfo.ppuid);
                    this.xsSet("ppsessionid", Platform.userinfo.ppsessionid)
                } else {
                    if ((Platform.id == "h5" || Platform.id == "pc") && typeof URLHASH != "undefined" && URLHASH != "") {
                        var B = URLHASH.substring(3).split("&");
                        for (var A = 0; A < B.length; A++) {
                            var C = B[A].split("=");
                            this.xsSet(C[0], decodeURIComponent(C[1]));
                            if (C[0] == "temptoken") {
                                window.location.hash = "#!/temptoken=" + C[1]
                            }
                        }
                    }
                }
            }
            this.initLoginProcess();
            return true
        },
        initLoginProcess: function() {
            if (!this.xsExist("token") || !this.xsExist("addr")) {
                this.token = "";
                this.server_prefix = "";
                this.server_domain = "";
                this.API = ""
            } else {
                this.token = this.xsGet("token");
                var A = this.xsGet("addr");
                addr_arr = A.split(".");
                this.server_prefix = addr_arr[0];
                this.server_domain = addr_arr[2] + "." + addr_arr[3];
                this.API = "http://" + this.server_prefix + ".game." + this.server_domain + "/index.php?v=" + localStorage["sg_ver"]
            }
        },
        preLoadWorld: function(A) {
            if (this.token == "" || player.info == null) {
                A = "login"
            } else {
                if (A != "countrymap" && A != "attackJapan") {
                    $("#worldloading").addClass("black").show()
                }
            }
            if (A == "city" || A == "map" || A == "treasure" || A == "country" || A == "countrymap") {
                if (!this.iscroll) {
                    this.iscroll = new iScroll("world", {
                        hScroll: true,
                        vScroll: true,
                        bounce: false,
                        hScrollbar: false,
                        vScrollbar: false,
                        checkDOMChanges: false,
                        lockDirection: false
                    })
                }
                $(this.iscroll.scroller).show()
            } else {
                if (this.iscroll) {
                    $(this.iscroll.scroller).empty().hide();
                    this.iscroll.destroy();
                    delete this.iscroll
                }
            }
            if (A == "city" || A == "map" || A == "treasure" || A == "country" || A == "countrymap") {
                $("#header").show();
                $("#footer").show()
            } else {
                $("#header").hide();
                $("#footer").hide()
            }
            if (this.nowWorld != "") {
                if (window[this.nowWorld + "World"] != undefined) {
                    this.lastWorld = this.nowWorld;
                    window[this.nowWorld + "World"].clear()
                }
            }
        },
        loadWorld: function(C, E) {
            if (window[C + "WorldClass"] == undefined) {
                var B = setTimeout(function() {
                    localStorage["sg2_version" + updateCfg.client_version];
                    initmsg("加载失败，请重试！")
                },
                10000);
                var A = xjs(staticUrl + "js/view/" + C + "world.js");
                ScriptQueue.AddTask(A,
                function() {
                    clearTimeout(B);
                    B = null;
                    console.log("异步载入：" + A);
                    xGame.preLoadWorld(C);
                    xGame.nowWorld = C;
                    window[C + "World"] = window[C + "World"] || (new window[C + "WorldClass"]);
                    window[C + "World"].init(E);
                    xGame.clearMissionThreadByWorld();
                    return
                })
            } else {
                xGame.preLoadWorld(C);
                var D = $("#header").find("#menu_newpassreward");
                if (this.menustatus && C == "map" && (player.info.missionsite == 2 || player.info.missionsite == 3)) {
                    D.show()
                } else {
                    D.hide()
                }
                xGame.nowWorld = C;
                window[C + "World"] = window[C + "World"] || (new window[C + "WorldClass"]);
                window[C + "World"].init(E);
                xGame.clearMissionThreadByWorld();
                return
            }
        },
        clearMissionThreadByWorld: function() {
            if (!miscpop.in_array(xGame.nowWorld, ["city", "map", "treasure", "countrymap"])) {
                if (player.missionThread != null) {
                    clearInterval(player.missionThread);
                    player.missionThread = null
                }
            } else {
                if (player.info.mainquest.length > 0) {
                    player.missionAutoMove()
                }
            }
        },
        loadBattle: function(D, A, G, F, B, C) {
            var E = "battle";
            this.preLoadWorld(E);
            xGame.nowWorld = E;
            window[E + "World"] = window[E + "World"] || (new window[E + "WorldClass"]);
            window[E + "World"].init(D, A, G, F, B, C);
            xGame.clearMissionThreadByWorld()
        },
        iscrollRefresh: function() {
            this.iscroll.scrollTo(0, 0);
            this.iscroll.refresh();
            setTimeout(function() {
                xGame.iscroll.refresh()
            },
            200)
        },
        showpop: function(B, D) {
            if (B != "mail" && B != "trends") {
                $("#worldloading").show()
            }
            if (window[B + "PopClass"] == undefined) {
                var C = setTimeout(function() {
                    localStorage["sg2_version" + updateCfg.client_version];
                    initmsg("加载失败，请重试！")
                },
                10000);
                var A = xjs(staticUrl + "js/view/" + B + "pop.js");
                ScriptQueue.AddTask(A,
                function() {
                    clearTimeout(C);
                    C = null;
                    console.log("异步载入：" + A);
                    window[B + "pop"] = window[B + "pop"] || (new window[B + "PopClass"]);
                    window[B + "pop"].init(D);
                    return
                })
            } else {
                window[B + "pop"] = window[B + "pop"] || (new window[B + "PopClass"]);
                window[B + "pop"].init(D);
                return
            }
        },
        closePops: function() {
            var B = ["miscpop", "packpop", "strongpop", "levypop", "musterpop", "fosterpop", "heropop", "teampop", "tradepop", "barpop", "shoppop", "practicepop", "chatpop", "lotterypop", "vippop", "mailpop", "arenapop", "settingspop", "rushpop", "mailboxpop", "giftpop", "sacrificepop", "activitypop", "iospaypop", "firstpaypop", "exercisepop", "bossbandpop", "drinkpop", "taskgiftpop", "giftchangepop", "dailytaskpop", "dailytradepop", "infopop", "treasuremappop", "talentpop", "dailysignpop", "worshippop", "rebatepop", "helpinfopop", "workshoppop", "slyzpop", "expostulationpop", "countrypop", "countryhousepop", "countryworshippop", "elitepop", "strategypop", "inheritpop", "trendspop", "blackmarketpop", "worldarenapop", "countrylearnpop", "countrybanquetpop", "countrylearnpop", "christmaspaypop", "christmassignpop", "christmasgeneralpop", "yuandansignpop", "heromanualpop", "godminepop", "newyearpaypop", "eggpop", "newbiegiftpop", "overseastradepop", "newyeardinnerpop", "beatengodpop", "friendspop", "smashpop", "epicpop", "bearpop", "viprewardpop", "countrydicepop", "forcepop", "qingmingpop", "limitedgodpop", "advancedpop", "invitationpop", "missionpop", "sacredtreepop", "anniversarypop", "countrytreasurepop", "mountpop", "studfarmpop", "practiceleappop", "zhulupop", "christmasgiftpop", "ndgiftpop", "viprepaypop", "springshoppop", "newyearlotterypop", "firstpaygiftpop", "levelgiftpop", "newgiftpop", "loginedpop", "regrewardpop", "countrynoticepop", "countrywarnoticepop", "equiprefinepop", "refineinheritpop", "refineachievepop", "strongachievepop", "acttreasurepop", "championsrewardpop", "recallpop", "scoreshoppop", "showmarpop", "kemaripop", "kemarisuccpop", "kemarilosepop", "worldcuppop", "newpassrewardpop", "chargegiftpop", "signinpop", "outprintgodpop", "valentinepop", "beautypop", "lordsoulpop", "soulrefinepop", "countrycollegepop", "midautumnpop", "nationcelpop", "loginrewardpop", "paycheckspop", "countrymallpop", "nationaldaypop", "halloweenpop", "systempop", "forgepop", "resolvepop", "pacifypop", "sweeppop", "enrichmentpop", "sevenstarpop", "christmasbuypop", "newyearpop", "lanternpop", "swordpop", "honormallpop", "holidaypop", "monthcardpop", "recallfriendpop", "killdevilpop", "actsevenpop", "godforgepop", "essencepop", "jademallpop", "newactsevenpop", "actjubaopop", "threeyearpop", "actfightpop", "monthfundpop", "paradepop", "cornuspop", "acthallowmaspop", "fridaypop", "novemberpop", "warfieldpop", "newepicpop", "drumpop", "drumshoppop", "acteggpairpop", "fiveyearpop", "redenvelopepop", "bazaarpop", "devilpop", "accumulatepop", "vitalitypop", "starbattlepop", "flopbrandpop", "luckydicepop", "promotionpop", "tongbaopop", "countrygvgpop", "runepop", "runeshoppop", "actmonopolypop", "newlotterypop", "accrueeverychargepop", "accruecostpop", "equipbookpop", "actmanekipop", "mooncakepop", "actcornucopiapop", "actrebatepop", "actcarnivalpop", "actcalendarpop", "ladderwarpop", "ladderpop", "actsteadilypop", "exploittreepop", "exploitstonepop", "actdoubleelevenpop", "chickenpop", "fukubukuropop", "signpop", "discountpop", "generalpoolpop", "eightdiagrampop", "actwelfarepop", "acteaticepop", "awakenpop", "awakenpackpop", "awakenmallpop", "awakenwarpop", "actsalepop", "anglingpop", "drummallpop", "anniversarymallpop", "actauctionpop", "sticationpop", "equipguidepop", "guoqingpop", "elevenpop", "elevenmallpop", "shakepop", "cardmallpop", "travelpop", "ordtravelpop", "crytravelpop", "actsolepop", "actchristmaspop", "actspringpop", "newsacrificepop", "fubimallpop", "actspringwarpop", "shoothalberdpop", "actmuchmoneypop", "elixirpop", "signeggpop", "equiplockpop", "actsacrificepop", "newfubimallpop", "actscratchpop", "bigdipperpop", "fiveelementspop", "threecontestpop", "playersrecallpop", "specialfestivalpop", "scramblepop", "guardianpop", "statuepop", "assistcardpop", "artificepop", "assistwarpop", "ancientspiritpop", "goldentimepop"];
            for (var A = 0; A < B.length; A++) {
                if (window[B[A]] && window[B[A]].e != null) {
                    window[B[A]].hide()
                }
            }
        },
        log: function(A, B) {},
        xsSet: function(C, B, A) {
            C = this.xsPrefix + C;
            if (A) {
                sessionStorage.setItem(C, B)
            } else {
                localStorage.setItem(C, B)
            }
        },
        xsGet: function(B, A) {
            B = this.xsPrefix + B;
            if (A) {
                return sessionStorage.getItem(B)
            } else {
                return localStorage.getItem(B)
            }
        },
        xsRemove: function(B, A) {
            B = this.xsPrefix + B;
            if (A) {
                return sessionStorage.removeItem(B)
            } else {
                return localStorage.removeItem(B)
            }
        },
        xsExist: function(C, A) {
            var B = this.xsGet(C, A);
            if (B != null && B != "") {
                return true
            } else {
                return false
            }
        },
        doAnimate: function(B, C, D, A) {
            if (!B || B.length <= 0) {
                return
            }
            B.css({
                "-webkit-animation": C + " " + D,
                "-webkit-animation-fill-mode": "both"
            });
            timeseconeds = parseFloat(D.replace("s", "")) * 1000 + 100;
            var F = setTimeout(function() {
                console.log(C + "动画超时，强制触发事件");
                F = null;
                if (B) {
                    B.trigger("webkitAnimationEnd", [])
                }
            },
            timeseconeds);
            var E = function() {
                B.css("-webkit-animation", "");
                if (A) {
                    A()
                }
                B = null;
                clearTimeout(F)
            };
            return B.unbind("webkitAnimationEnd").one("webkitAnimationEnd", E)
        },
        doAnimate3: function(B, C, D, A) {
            if (!B || B.length <= 0) {
                return
            }
            B.css({
                "-webkit-animation": C + " " + D,
                "-webkit-animation-fill-mode": "both"
            });
            timeseconeds = parseFloat(D.replace("s", "")) * 1000 + 100;
            var F = setTimeout(function() {
                console.log(C + "动画超时，强制触发事件");
                F = null;
                if (B) {
                    B.trigger("webkitAnimationEnd", [])
                }
            },
            timeseconeds);
            var E = function() {
                if (B = stage.find(".drumChange_up")) {
                    return false
                } else {
                    return false
                }
                if (A) {
                    A()
                }
                B = null;
                clearTimeout(F)
            };
            return B.unbind("webkitAnimationEnd").one("webkitAnimationEnd", E)
        },
        doAnimate2: function(A, H, B, F, C) {
            if (!A || A.length <= 0) {
                return
            }
            var E = 0;
            var D = 0;
            var G = null;
            var I = A.attr("class");
            G = setInterval(function() {
                E != 1 ? E += 1 : E = 0;
                D++;
                A.attr({
                    "class": I + " " + H + E
                });
                if (D == F) {
                    clearInterval(G);
                    I = A.attr("class");
                    A.attr({
                        "class": xGame.repalceLike(I, H)
                    });
                    E = D = G = I = A = I = null;
                    if (C != undefined) {
                        C()
                    }
                    return
                }
            },
            B)
        },
        repalceLike: function(A, B) {
            var C = new RegExp("null", "g");
            A = A.replace(C, "");
            C = new RegExp(B + "1", "g");
            A = A.replace(C, "");
            C = new RegExp(B + "0", "g");
            return A.replace(C, "")
        },
        scroller: function(B, C, F, G) {
            var D;
            var G = G || 0;
            var A = $("#" + B);
            A.children(".scroller_root").css({
                "width": C + "px"
            });
            var E = {
                snap: "li",
                momentum: false,
                bounce: false,
                hScrollbar: false,
                vScrollbar: false
            };
            if (F == true) {
                delete E.snap
            }
            D = new iScroll(B, E);
            D.refresh();
            D.scrollTo(G, 0);
            setTimeout(function() {
                D.refresh();
                D.scrollTo(G, 0)
            },
            300);
            return D
        },
        carousel: function(F, H, D, B) {
            var C;
            var G = $("#" + F);
            if (D == undefined) {
                var I = G.children(".carousel_scroller").children(".carousel_content").children("li");
                var D = I.length
            }
            var A = "";
            for (var E = 0; E < D; E++) {
                A += '<li page="' + E + '" class="' + (E == 0 ? "active": "") + '">' + (E + 1) + "</li>"
            }
            A += "";
            G.find(".carousel_page").html(A);
            G.children(".carousel_scroller").css({
                "width": H * D + "px"
            });
            C = new iScroll(F, {
                snap: "li",
                vScroll: false,
                momentum: false,
                hScrollbar: false,
                onScrollEnd: function() {
                    var J = this.currPageX;
                    G.children(".carousel_page").children("li").each(function() {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass()
                        }
                        if ($(this).attr("page") == J) {
                            $(this).addClass("active")
                        }
                    });
                    if (B != undefined) {
                        B()
                    }
                }
            });
            C.refresh();
            setTimeout(function() {
                C.refresh()
            },
            300);
            return C
        },
        loadPopTmpl: function(B) {
            if ($("#" + B + "pop").length > 0) {
                return false
            }
            $("#world").append($.template(B + "pop_tmpl"));
            var A = $("#" + B + "pop");
            return A
        },
        createCloud: function() {
            var B = function() {
                return '<span class="cloud" style="top:' + helper.getRandom(100, 1000) + "px;-webkit-animation:cloudAni " + helper.getRandom(10, 25) + "s infinite linear;-webkit-animation-delay:" + helper.getRandom(0, 6) + 's;-webkit-animation-fill-mode:both;"></span>'
            };
            var C = "";
            for (var A = 0; A < 3; A++) {
                C += xGame.newCloud()
            }
            $("#world").append(C);
            $("#world").undelegate(".cloud", "touchend").delegate(".cloud", "touchend",
            function() {
                var E = $(this);
                var F = E.offset().left;
                var D = E.offset().top;
                E.css({
                    "left": F + "px",
                    "top": D + "px",
                    "-webkit-animation": ""
                });
                xGame.doAnimate(E, "shakeOut", "0.5s",
                function() {
                    E.remove();
                    E = null;
                    $("#world").append(xGame.newCloud())
                })
            })
        },
        newCloud: function() {
            return '<span class="cloud" style="top:' + helper.getRandom(100, 640) + "px;-webkit-animation:cloudAni " + helper.getRandom(10, 25) + "s infinite linear;-webkit-animation-delay:" + helper.getRandom(0, 6) + 's;-webkit-animation-fill-mode:both;"></span>'
        },
        clearCloud: function() {
            var A = $("#world");
            A.undelegate(".cloud", "touchend");
            A.find(".cloud").remove();
            A = null
        },
        updateCd: function(A, B) {
            if (!timer) {
                timer = new Timer(1000);
                timer.start()
            }
            if (!CD[A]) {
                CD[A] = new window[A + "CdClass"];
                CD[A].init(B);
                CD[A].step()
            } else {
                CD[A].update(B)
            }
        },
        guideSthHide: function() {
            $("body").addClass("commonhide");
            $("#footer").find(".menu_team").hide();
            $("#menu_friends").hide();
            $("#menu_map").hide();
            $("#menu_city").show();
            $("#chatpop_small").hide();
            $(".header_gift_btn").hide()
        },
        guideSthShow: function() {
            $("#chatpop_small").show();
            $("body").removeClass("commonhide");
            $(".header_gift_btn").show();
            $("#header").find(".rightside_wrap").show()
        },
        checkMenuOpen: function() {
            if (player.info.level < 11 || player.info.level == this.lastCheckMenuLevel) {
                return
            }
            var L = $("#menu_list");
            var D = $("#menu_list3");
            var K = $("#menu_listwar");
            var M = $("#menu_promotlist");
            var I = 252;
            var E = 0;
            var G = 0;
            var C = 0;
            if (player.info.level >= 12) {
                var H = L.find(".menu_team");
                if (H.is(":hidden")) {
                    H.show()
                }
                I += 84
            }
            if (player.info.level >= 16) {
                var F = $("#header").find("#sider_levy");
                if (F.is(":hidden")) {
                    F.show()
                }
                F = null
            }
            if (player.info.level >= 26) {
                var H = L.find(".menu_country");
                if (H.is(":hidden")) {
                    H.show()
                }
                I += 84
            }
            if (player.info.level >= 120) {
                var H = M.find(".menu_meridian");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 51) {
                var H = M.find(".menu_soul");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 91) {
                var H = M.find(".menu_talent");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 140) {
                var H = M.find(".menu_gem");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (L.offset().width != I) {
                L.width(I)
            }
            if (player.info.level >= 120) {
                var H = M.find("#menu_mount");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 80) {
                var H = M.find("#menu_lordsoul");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 50) {
                var H = M.find("#menu_equipbook");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 190) {
                var H = M.find("#menu_ladder");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 160) {
                var H = M.find("#menu_assistcard");
                if (H.is(":hidden")) {
                    H.show()
                }
                C += 1
            }
            if (player.info.level >= 110) {
                var H = D.find("#menu_war");
                if (H.is(":hidden")) {
                    H.show()
                }
                E += 84
            }
            if (player.info.level >= 50) {
                var H = D.find("#menu_promote");
                if (H.is(":hidden")) {
                    H.show()
                }
                E += 84
            }
            if (D.offset().width != E) {
                D.width(E)
            }
            if (player.info.level >= 110) {
                var H = K.find("#menu_pacify");
                if (H.is(":hidden")) {
                    H.show()
                }
                G += 84
            }
            if (player.info.level >= 190) {
                var H = K.find("#menu_ladderwar");
                if (H.is(":hidden")) {
                    H.show()
                }
                G += 84
            }
            if (player.info.level >= 161) {
                var H = K.find("#menu_eightdiagram");
                if (H.is(":hidden")) {
                    H.show()
                }
                G += 84
            }
            if (player.info.level >= 160) {
                var H = K.find("#menu_awakencopy");
                if (H.is(":hidden")) {
                    H.show()
                }
                G += 84
            }
            var B = parseInt(G) + 32;
            if (K.find("ul").offset().width != G) {
                K.find("ul").width(G);
                K.find(".bg_center").width(G);
                K.width(B)
            }
            var J = Math.ceil(C / 3) * 80 + "px";
            var A = (110 + Math.ceil(C / 3) * 80) + "px";
            if (player.info.level < 110) {
                M.css("right", "100px").css("top", "-" + A)
            } else {
                if (player.info.level >= 110) {
                    M.css("right", "190px").css("top", "-" + A)
                }
            }
            if (C == 1) {
                M.find("ul").width("90px").height(J)
            } else {
                if (C == 2) {
                    M.find("ul").width("180px").height(J)
                } else {
                    M.find("ul").width("270px").height(J)
                }
            }
            H = null;
            L = null;
            D = null;
            K = null;
            M = null;
            this.lastCheckMenuLevel = player.info.level
        },
        checkLock: function(A) {
            if (this.islock) {
                return true
            } else {
                if (A != true) {
                    this.islock = true
                }
                return false
            }
        },
        unlock: function() {
            this.islock = false
        },
        showGuide: function(B) {
            if (xGame.guide) {
                var A = function(D) {
                    for (var C = 0; C <= B.length; C++) {
                        if (D == B[C]) {
                            return true
                        }
                    }
                    return false
                };
                if (A(guide.now)) {
                    guide.show()
                }
            }
        },
        avatar: function(C, B) {
            var A = "";
            if (this.checkImgLocal(C)) {
                A = staticUrl + "img/avatar/" + (B == true ? "a" + C + ".jpg": C + ".png")
            } else {
                A = "http://img2.hanjiangsanguo.com/hjimg/avatar/" + (B == true ? "a" + C + ".jpg": C + ".png")
            }
            return A
        },
        miniavatar: function(B) {
            var A = "";
            if (this.checkImgLocal(B)) {
                A = staticUrl + "img/avatar/miniavatar" + B + ".png"
            } else {
                A = "http://img2.hanjiangsanguo.com/hjimg/avatar/miniavatar" + B + ".png"
            }
            return A
        },
        hero: function(D, A, C) {
            A = A || 1;
            var E = "";
            var B = "";
            if (A == 1) {
                B = D + ".png"
            } else {
                if (A == 2) {
                    B = "a" + D + ".png"
                } else {
                    if (A == 3) {
                        B = D + ".1.png"
                    }
                }
            }
            if (this.checkImgLocal(D)) {
                E = staticUrl + "img/hero/" + B
            } else {
                if (typeof cordova != "undefined" && typeof C != "undefined" && C == true) {
                    E = cached_path + "Documents/sg_cache/" + B
                } else {
                    E = "http://img2.hanjiangsanguo.com/hjimg/hero/" + B
                }
            }
            return E
        },
        checkImgLocal: function(A) {
            if (Platform.id == "pc") {
                return false
            }
            if (A <= 40) {
                return true
            } else {
                return false
            }
        },
        itemurl: function(A) {
            var B = "";
            if (A <= 71) {
                B = staticUrl + "img/item/" + A + ".png"
            } else {
                B = "http://img2.hanjiangsanguo.com/hjimg/item/" + A + ".png"
            }
            return B
        },
        drumurl: function(A) {
            var B = "";
            B = "http://img2.hanjiangsanguo.com/hjimg/pop/drum_" + A + ".png";
            return B
        },
        runeurl: function(A, C) {
            var B = "";
            B = "http://img2.hanjiangsanguo.com/hjimg/pop/rune" + A + "_" + C + ".png";
            return B
        },
        charioturl: function(A) {
            var B = "";
            B = "http://img2.hanjiangsanguo.com/hjimg/pop/chariot_" + A + ".png";
            return B
        },
        drumupurl: function(A) {
            var B = "";
            B = staticUrl + "img/plugin/drumchange_up" + A + ".png";
            return B
        },
        drumdownurl: function(A) {
            var B = "";
            B = staticUrl + "img/plugin/drumchange_down" + A + ".png";
            return B
        },
        gem: function(A, C) {
            var B = "";
            B = "http://img2.hanjiangsanguo.com/hjimg/pop/gem_" + A + C + ".png";
            return B
        },
        master: function(B) {
            var A = "http://img2.hanjiangsanguo.com/hjimg/pop/master" + B + ".png";
            return A
        },
        essence: function(B) {
            var A = "http://img2.hanjiangsanguo.com/hjimg/pop/essence" + B + ".png";
            return A
        },
        forgeMaterial: function(B) {
            var A = "http://img2.hanjiangsanguo.com/hjimg/pop/material" + B + ".png";
            return A
        },
        awankeImage: function(B) {
            var A = "http://img2.hanjiangsanguo.com/hjimg/pop/awaken_0_" + B + ".png";
            return A
        },
        awankeImg: function(B) {
            var A = "http://img2.hanjiangsanguo.com/hjimg/pop/awaken_" + B + ".png";
            return A
        },
        initPhoneGapPlugins: function() {
            gAudio = gAudio || new gAudioClass;
            gAudio.ready = true;
            gAudio.loadMusic();
            document.addEventListener("offline",
            function() {
                if (typeof timer != "undefined" && timer != null) {
                    timer.paused = true
                }
                initmsg(lang("can_not_surfer_internet"))
            },
            false);
            document.addEventListener("online",
            function() {
                var A = $("#initmsg");
                if (A.css("display") != "none") {
                    A.css("display", "none");
                    if (typeof player != "undefined" && player != null && player.info.uid > 0) {
                        player.reloadInfo()
                    }
                }
                A = null;
                if (typeof timer != "undefined" && timer != null) {
                    timer.paused = false
                }
            },
            false);
            document.addEventListener("pause",
            function() {
                var A = parseInt(((new Date()).getTime() + "").substring(0, 10));
                if (typeof player != "undefined" && player != null) {
                    player.lasttime = A
                }
                if (typeof timer != "undefined" && timer != null) {
                    timer.paused = true
                }
            },
            false);
            document.addEventListener("resume",
            function() {
                var B = true;
                if (typeof timer != "undefined" && timer != null) {
                    timer.paused = false
                }
                var A = parseInt(((new Date()).getTime() + "").substring(0, 10));
                if (typeof player != "undefined" && player != null) {
                    if (A - player.lasttime < 600) {
                        B = false;
                        if (CD["chat"] != undefined) {
                            CD["chat"].clear();
                            xGame.updateCd("chat", 0)
                        }
                    }
                }
                if (B == false || (xGame.guide == true && guide.now <= 138)) {
                    if (typeof player != "undefined" && player != null && player.info.uid > 0) {
                        player.reloadInfo()
                    }
                    if (xGame.nowWorld == "champions" && typeof championsWorld != "undefined" && championsWorld != null) {
                        championsWorld.refreshByTime(A - player.lasttime)
                    }
                    if (xGame.nowWorld == "gvg" && typeof gvgWorld != "undefined" && championsWorld != null) {
                        gvgWorld.refreshByTime(A - player.lasttime)
                    }
                } else {
                    if (typeof gAudio != "undefined" && gAudio != null) {
                        gAudio.stopMusic()
                    }
                    setTimeout(function() {
                        location.reload()
                    },
                    500);
                    setTimeout(function() {
                        location.reload()
                    },
                    1500)
                }
            },
            false);
            window.plugins.inAppPurchaseManager.onPurchased = function(C, A, B) {
                xGame.hideWaitmsg();
                xGame.toast.show(lang("pay_success"));
                console.log("purchased: " + A);
                console.log(B);
                xGame.xsSet("pay_receipt", B.replace("%3D", "="));
                iospayCheck();
                if (typeof cordova != "undefined" && (channelID == 3 || channelID == 100) && xGame.iosLastPay) {
                    if (window.plugins.HasOfferTrack) {
                        window.plugins.HasOfferTrack.purchase(null, null, [xGame.iosLastPay])
                    }
                    xGame.iosLastPay = null
                }
            };
            window.plugins.inAppPurchaseManager.onRestored = function(C, A, B) {
                console.log("restored: " + A)
            };
            window.plugins.inAppPurchaseManager.onFailed = function(B, A) {
                xGame.toast.show(lang("pay_fail"));
                xGame.hideWaitmsg();
                console.log("failed: " + A)
            };
            if (Platform.id == "kuaiyong") {
                window.plugins.KuaiyongPlatform.onResult = function(A) {
                    if (player && player.info.uid > 0) {
                        setTimeout(function() {
                            console.log("Kuaiyong: result-" + A);
                            player.reloadInfo()
                        },
                        2000)
                    }
                }
            }
        },
        initLocalNotication: function() {
            if (typeof cordova != "undefined" && typeof window.plugins.localNotification != "undefined") {
                window.plugins.localNotification.cancel("worldboss");
                window.plugins.localNotification.cancel("worldboss2");
                window.plugins.localNotification.cancel("countrywar");
                window.plugins.localNotification.cancel("newyearboss");
                var A = new Date();
                var F = [];
                var G = A.getFullYear() + "-" + (A.getMonth() + 1) + "-" + A.getDate();
                var D = miscpop.getTimestamp(G + " 12:00:00");
                var C = miscpop.getTimestamp(G + " 20:00:00");
                F.push({
                    date: (A.getTime() < D ? Math.round(D / 1000) : (Math.round(D / 1000) + 86400)),
                    message: lang("worldboss_clock"),
                    repeat: "daily",
                    badge: 1,
                    id: "worldboss",
                    sound: "sub.caf"
                });
                F.push({
                    date: (A.getTime() < C ? Math.round(C / 1000) : (Math.round(C / 1000) + 86400)),
                    message: lang("worldboss_clock"),
                    repeat: "daily",
                    badge: 1,
                    id: "worldboss2",
                    sound: "sub.caf"
                });
                var J = 1362821400;
                var I = Math.round(miscpop.getTimestamp(G + " 17:30:00") / 1000);
                while (J < I) {
                    J += 604800
                }
                F.push({
                    date: J,
                    message: lang("countrywar_clock"),
                    repeat: "weekly",
                    badge: 1,
                    id: "countrywar",
                    sound: "sub.caf"
                });
                var H = Math.floor((new Date()).getTime() / 1000);
                if (H >= 1391097600 && H < 1391788800) {
                    var B = miscpop.getTimestamp(G + " 12:30:00");
                    F.push({
                        date: (A.getTime() < D ? Math.round(B / 1000) : (Math.round(B / 1000) + 86400)),
                        message: lang("nian_clock"),
                        repeat: "daily",
                        badge: 1,
                        id: "newyearboss",
                        sound: "sub.caf"
                    })
                }
                if (F.length > 0) {
                    for (var E = 0; E < F.length; E++) {
                        window.plugins.localNotification.add(F[E])
                    }
                }
            }
        },
        updateDeviceToken: function(A) {
            if (typeof cordova != "undefined") {
                window.plugins.DeviceTokenPlugin.fetchToken(function(B) {
                    if (B != "error") {
                        xGame.devicetoken = B;
                        loadContents({
                            "c": "ios",
                            "m": "savetoken",
                            "devicetoken": B
                        },
                        function() {},
                        true)
                    } else {
                        console.log("devicetoken cannot get")
                    }
                },
                function(B) {
                    console.log("devicetoken cannot get")
                },
                [1, 1])
            }
        },
        showWaitmsg: function(B) {
            var A = $("#initmsg");
            A.addClass("waitmsg");
            A.find(".text").html(B);
            A.find(".waittext").html(lang("please_wait"));
            A.show()
        },
        hideWaitmsg: function() {
            $("#initmsg").removeClass("waitmsg").hide()
        },
        goPay: function(A) {
            if (xGame.confirm.isshow) {
                xGame.toast.show(A)
            } else {
                xGame.confirm.show(lang("pay_now"), A + "<br/>" + lang("pay_ask"), 2,
                function() {
                    xGame.confirm.hide(function() {
                        xGame.enterPay()
                    })
                },
                function() {
                    xGame.confirm.hide()
                })
            }
        },
        enterPay: function() {
            if (player.info.rebate == 1) {
                xGame.showpop("rebate")
            } else {
                if (typeof jBreaking != "undefined" && jBreaking == true) {
                    miscpop.otherPay()
                } else {
                    xGame.showpop("iospay")
                }
            }
            return false
        },
        getUsername: function() {
            var C = "";
            if (xGame.xsGet("lastaccountsaved")) {
                var B = xGame.xsGet("lastaccountsaved");
                var A = B.indexOf(",");
                if (A != -1) {
                    C = B.substr(0, A)
                } else {
                    C = B
                }
            }
            return C
        },
        updateToken: function(B, A) {
            this.xsSet("token", A);
            this.xsSet("addr", B + ".game." + this.server_domain);
            window.location.reload()
        },
        saveAccount: function(F, D) {
            this.xsSet("lastaccountsaved", F + "," + D);
            var A = this.xsGet("acountlist");
            if (A) {
                A = JSON.parse(A);
                var B = false;
                for (var G = 0; G < A.length; G++) {
                    if (A[G].u == F) {
                        A[G].p = D;
                        B = true
                    }
                }
                if (B == false) {
                    var H = A.push({
                        u: F,
                        p: D
                    });
                    if (H > 5) {
                        A.splice(0, H - 5)
                    }
                }
                this.xsSet("acountlist", JSON.stringify(A))
            } else {
                var C = [];
                var E = {
                    "u": F,
                    "p": D
                };
                C.push(E);
                this.xsSet("acountlist", JSON.stringify(C))
            }
        },
        doMenuAnim: function() {
            var B = $("#header_activitymenu_control");
            var C = 80;
            var A = new movieClipClass({
                "img": ximg(staticUrl + "img/plugin/activitymenu_control.png"),
                "width": 100,
                "height": 100,
                "x": 0,
                "y": 0,
                "loop": true,
                "frames": [{
                    rect: [0, 0],
                    interval: C,
                },
                {
                    rect: [100, 0],
                    interval: C,
                },
                {
                    rect: [200, 0],
                    interval: C,
                },
                {
                    rect: [300, 0],
                    interval: C,
                },
                {
                    rect: [0, 100],
                    interval: C,
                },
                {
                    rect: [100, 100],
                    interval: C,
                },
                {
                    rect: [200, 100],
                    interval: C,
                },
                {
                    rect: [300, 100],
                    interval: C,
                },
                {
                    rect: [0, 200],
                    interval: C,
                },
                {
                    rect: [100, 200],
                    interval: C,
                },
                {
                    rect: [200, 200],
                    interval: C,
                },
                {
                    rect: [300, 200],
                    interval: 6000,
                },
                ],
            });
            A.appendTo(B);
            A.play();
            A = null
        },
        reEditCss: function() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(H) {
                appFileSystem = H;
                cached_path = appFileSystem.root.fullPath.replace("Documents", "")
            },
            function() {});
            var B = xGame.xsGet("version_number");
            var E = device.version;
            var G = xGame.xsGet("cached_path");
            if (B == null) {
                xGame.xsSet("version_number", E);
                xGame.xsSet("cached_path", cached_path)
            } else {
                if (B != E && cached_path != G) {
                    xGame.xsSet("version_number", E);
                    xGame.xsSet("cached_path", cached_path);
                    var A = "sg_cache/game.css";
                    F()
                }
            }
            function F() {
                appFileSystem.root.getFile(A, {
                    create: true
                },
                function(I) {
                    var H = new FileReader();
                    H.onloadend = function(K) {
                        var J = new RegExp(G, "g");
                        var L = K.target.result.replace(J, cached_path);
                        I.remove(function() {
                            D(L)
                        })
                    };
                    H.readAsText(I)
                },
                C)
            }
            function D(H) {
                appFileSystem.root.getFile(A, {
                    create: true
                },
                function(I) {
                    I.createWriter(function(J) {
                        J.onwrite = function() {};
                        J.seek(J.length);
                        J.write(H);
                        window.location.reload()
                    })
                },
                C)
            }
            function C(H) {
                initmsg(lang("update_resource_msg"),
                function() {
                    cleanGameCache()
                })
            }
        },
    }
})(); (function() {
    confirmClass = function() {
        this.e = null;
        this.message_wrap = null;
        this.title = null;
        this.content = null;
        this.confirm_btn = null;
        this.cancel_btn = null;
        this.hide_btn = null;
        this.isshow = false;
        this.cancelName = "";
        this.confirmName = ""
    };
    confirmClass.prototype = {
        init: function() {
            if (this.e) {
                return true
            } else {
                this.e = $("#confirm_page");
                this.message_wrap = this.e.find(".message_wrap");
                this.title = this.e.find(".title");
                this.content = this.e.find(".text");
                this.confirm_btn = this.e.find(".confirm_btn");
                this.cancel_btn = this.e.find(".cancel_btn");
                this.hide_btn = this.e.find(".hidebtn")
            }
        },
        setContent: function(C, D, A, B) {
            this.confirm_btn.html(this.confirmName);
            this.cancel_btn.html(this.cancelName);
            this.title.html(C);
            this.content.html(D);
            if (A && A == 1) {
                this.confirm_btn.addClass("only").show();
                this.cancel_btn.hide()
            } else {
                if (A && A == 2) {
                    this.confirm_btn.removeClass("only").show();
                    this.cancel_btn.show()
                } else {
                    this.confirm_btn.hide();
                    this.cancel_btn.hide()
                }
            }
            if (typeof B != "undefined" && B == true) {
                this.hide_btn.show()
            }
        },
        setListener: function(A) {
            if (A.confirm != null) {
                this.confirm_btn.unbind("touchend").bind("touchend",
                function(B) {
                    A.confirm();
                    B.preventDefault();
                    B.stopPropagation()
                })
            } else {
                this.confirm_btn.unbind("touchend")
            }
            if (A.cancel != null) {
                this.cancel_btn.unbind("touchend").bind("touchend",
                function(B) {
                    A.cancel();
                    B.preventDefault();
                    B.stopPropagation()
                })
            } else {
                this.cancel_btn.unbind("touchend")
            }
            this.hide_btn.unbind("touchend").bind("touchend",
            function(B) {
                xGame.confirm.hide();
                B.preventDefault();
                B.stopPropagation()
            })
        },
        _display: function(B, A) {
            var C = this;
            if (C.isshow) {
                if (A) {
                    A()
                }
            } else {
                C.e.show();
                C.message_wrap.show();
                C.isshow = true;
                if (A) {
                    A()
                }
            }
        },
        hide: function(A) {
            var B = this;
            if (B.isshow == false) {
                false
            }
            B.setListener({
                "confirm": null,
                "cancel": null
            });
            B.hide_btn.hide();
            B.message_wrap.hide();
            B.e.hide();
            B.isshow = false;
            this.destory();
            if (A) {
                A()
            }
        },
        show: function(G, I, H, A, F, D, C, E) {
            var B = this;
            this.init();
            H = H || 1;
            A = A ||
            function() {
                xGame.confirm.hide()
            };
            B.confirmName = D == undefined ? lang("ok") : D;
            B.cancelName = C == undefined ? lang("close") : C;
            B.setContent(G, I, H, E);
            B._display("fadeInDown",
            function() {
                B.setListener({
                    "confirm": A,
                    "cancel": F
                })
            })
        },
        destory: function() {
            this.e = null;
            this.message_wrap = null;
            this.title = null;
            this.content = null;
            this.confirm_btn = null;
            this.cancel_btn = null;
            this.hide_btn = null
        }
    }
})(); (function() {
    toastClass = function() {
        $("body").undelegate(".toast_msg", "webkitAnimationEnd").delegate(".toast_msg", "webkitAnimationEnd",
        function() {
            $(this).remove()
        })
    };
    toastClass.prototype = {
        show: function(B, A) {
            $("body").append('<p class="toast_msg' + (A != undefined ? (" " + A) : "") + '">' + B + "</p>")
        },
    }
})();
function http(H, A, G, C, D, F, B) {
    A.token = xGame.token;
    var E = {
        "type": "post",
        "dataType": "json",
        "url": H + "&token=" + xGame.token + "&channel=" + channelID + "&lang=" + appLanguage + "&rand=" + (new Date()).getTime() + "" + Math.floor(Math.random(1) * 100),
        "data": A,
        "beforeSend": function(J, I) {
            if (!C) {
                $("#ajaxloading").show()
            }
        },
        "complete": function(J, I) {
            J = null;
            if (!C) {
                $("#ajaxloading").hide()
            }
        },
        "timeout": 20000,
        "success": function(J) {
            if (J == "403") {
                if (timer) {
                    timer.stop();
                    timer = null
                }
                xGame.xsRemove("token");
                xGame.xsRemove("addr");
                xGame.xsRemove("guide");
                xGame.xsRemove("guidenow");
                xGame.initLogin();
                if (typeof gAudio != "undefined" && gAudio != null) {
                    gAudio.stopMusic()
                }
                guide.hide();
                $("#worldloading").hide();
                xGame.confirm.show(lang("notice"), lang("base_badtoken"), 1,
                function() {
                    xGame.confirm.hide();
                    if (Platform.id == "pc") {
                        window.location.href = Platform.loginurl
                    } else {
                        window.location.hash = "";
                        xGame.xsRemove("temptoken");
                        setTimeout(function() {
                            window.location.reload()
                        },
                        100)
                    }
                    return false
                })
            } else {
                if (typeof(J) == "String" && J.indexOf("403-") != -1) {
                    var I = parseInt(J.substring(4));
                    xGame.toast.show(lang("account_forbid", [(I > 0 ? I + lang("day") : lang("forbid_forever"))]));
                    if (timer) {
                        timer.stop();
                        timer = null
                    }
                    xGame.xsRemove("token");
                    xGame.xsRemove("addr");
                    xGame.xsRemove("guide");
                    xGame.xsRemove("guidenow");
                    xGame.initLogin();
                    if (typeof gAudio != "undefined" && gAudio != null) {
                        gAudio.stopMusic()
                    }
                    setTimeout(function() {
                        window.location.hash = "";
                        window.location.reload()
                    },
                    3000)
                } else {
                    if (J && J.status == 101) {
                        miscpop.showlockHtml(null, 3)
                    } else {
                        if (G) {
                            G(J)
                        }
                    }
                }
            }
        },
        "error": function(J, I) {
            xGame && xGame.unlock();
            console.log("http error:" + I);
            if (D != undefined && D != null) {
                D();
                D = null;
                guide.hide();
                if (xGame.guide) {
                    xGame.confirm.show(lang("notice"), lang("internet_error"), 1,
                    function() {
                        xGame.confirm.hide();
                        if (Platform.id == "pc") {
                            window.location.href = Platform.loginurl
                        } else {
                            window.location.hash = "";
                            xGame.xsRemove("temptoken");
                            setTimeout(function() {
                                window.location.reload()
                            },
                            100)
                        }
                        return false
                    })
                }
                if (B == true) {
                    return false
                } else {
                    $("#ajaxloading").hide();
                    $("#worldloading").hide();
                    return
                }
            } else {
                if (typeof B == "undefined" || B == false) {
                    if (I == "parsererror") {
                        sendError(H, A, J.responseText);
                        xGame.toast.show(lang("server_error_msg"))
                    } else {
                        if (I == "timeout" || I == "abort") {
                            xGame.toast.show(lang("timeout_error_msg"))
                        } else {
                            xGame.toast.show(lang("internet_error"))
                        }
                    }
                    xGame.closePops();
                    guide.hide();
                    if (xGame.guide) {
                        xGame.confirm.show(lang("notice"), lang("internet_error"), 1,
                        function() {
                            xGame.confirm.hide();
                            if (Platform.id == "pc") {
                                window.location.href = Platform.loginurl
                            } else {
                                window.location.hash = "";
                                xGame.xsRemove("temptoken");
                                setTimeout(function() {
                                    window.location.reload()
                                },
                                100)
                            }
                            return false
                        })
                    } else {
                        xGame.loadWorld("city")
                    }
                    $("#ajaxloading").hide();
                    $("#worldloading").hide();
                    return
                }
            }
            J = null
        },
    };
    return $.ajax(E)
}
function loadContents(F, A, D, C, B) {
    var E = xGame.API;
    if (F && F.c) {
        E += "&c=" + F.c + "&";
        delete F.c
    }
    if (F && F.m) {
        E += "&m=" + F.m + "&";
        delete F.m
    }
    if (F && F.d) {
        E += "&d=" + F.d + "&";
        delete F.d
    }
    if (player && player.info && player.info.uid) {
        E += "&token_uid=" + player.info.uid
    }
    http(E, F, A, D, C, null, B)
}
if (typeof hideAddressBar == "undefined") {
    var hideAddressBar = function() {}
}
function iospayCheck() {
    var C = xGame.xsGet("pay_receipt");
    var A = xGame.xsGet("pay_prepay_id");
    if (!C) {}
    var D = function(E) {
        if (E.status == 1) {
            xGame.toast.show(lang("pay_success_msg"));
            player.reloadInfo();
            xGame.xsRemove("pay_receipt");
            xGame.xsRemove("pay_prepay_id");
            if (xGame.payErrorNums > 0) {
                xGame.payErrorNums = 0
            }
            C = null;
            A = null;
            D = null
        } else {
            if (E.status == -1) {
                xGame.toast.show(lang("pay_fail_msg1"));
                xGame.xsRemove("pay_receipt");
                xGame.xsRemove("pay_prepay_id")
            } else {
                if (E.status == -2) {
                    xGame.toast.show(lang("pay_fail_msg2"));
                    xGame.xsRemove("pay_receipt");
                    xGame.xsRemove("pay_prepay_id")
                } else {
                    if (E.status == -3) {
                        xGame.toast.show(lang("pay_fail_msg3"));
                        xGame.xsRemove("pay_receipt");
                        xGame.xsRemove("pay_prepay_id")
                    } else {
                        if (B) {
                            B()
                        }
                    }
                }
            }
        }
    };
    var B = function() {
        if (xGame.payErrorNums < 3) {
            xGame.payErrorNums++;
            iospayCheck()
        } else {
            xGame.confirm.show(lang("pay_fail_msg"), lang("pay_fail_msg4"), 1,
            function() {
                xGame.confirm.hide()
            })
        }
    };
    http(xGame.API + "&c=ios&m=verify", {
        "receipt": C,
        "prepay_id": A,
        "devicetoken": xGame.devicetoken,
        "macaddr": xGame.macaddr,
        "adid": xGame.adid,
    },
    D, false, B, true)
}
function getSLeft(A) {
    return isIPhone5 ? Math.ceil(A * 1136 / 1024) : A
}
function getSTop(A) {
    return isIPhone5 ? Math.ceil(A * 852 / 768) : A
}
if (typeof defaultExceptionHandler == "undefined") {
    var defaultExceptionHandler = function() {}
}
if (typeof step == "undefined") {
    var step = function() {
        var C = [];
        var G = null;
        var D = 0;
        var F = defaultExceptionHandler;
        var H = function(J) {
            return toString.call(J) == "[object Array]"
        };
        var B = function() {
            if (C.length > 0) {
                G = C.shift();
                D = G.length;
                E()
            }
        };
        var I = function() {
            if (arguments.length == 0) {
                if (--D == 0) {
                    B()
                }
            } else {
                F(arguments[0], I)
            }
        };
        var E = function() {
            var J = G.length;
            G.forEach(function(K) {
                setTimeout(function() {
                    try {
                        K(I)
                    } catch(L) {
                        F(L, I)
                    }
                },
                0)
            })
        };
        var A = function() {
            if (G) {
                return
            }
            var M = Array.prototype.slice.call(arguments);
            var L = [];
            var K = null;
            var J = null;
            var N = function() {
                if (K || J) {
                    throw new TypeError()
                }
            };
            M.forEach(function(O) {
                if (typeof O === "function") {
                    if (K) {
                        K.forEach(function(R, Q) {
                            L.push(function(S) {
                                O(S, R, Q)
                            })
                        });
                        K = null
                    } else {
                        if (J) {
                            for (var P in J) { (function(Q, R) {
                                    L.push(function(S) {
                                        O(S, Q, R)
                                    })
                                })(P, J[P])
                            }
                            J = null
                        } else {
                            L.push(O)
                        }
                    }
                } else {
                    if (H(O)) {
                        N();
                        K = O
                    } else {
                        if (typeof O === "object") {
                            N();
                            J = O
                        } else {
                            throw new TypeError()
                        }
                    }
                }
            });
            N();
            C.push(L);
            return arguments.callee
        };
        A.run = function(J) {
            if (G == null) {
                if (J) {
                    F = J
                }
                B()
            }
        };
        return A.apply(null, arguments)
    }
}
function sendError(A, D, B) {
    if (islocal) {
        xGame.toast.show("后端出现异常")
    } else {
        var C = {};
        C.domain = xGame.server_domain;
        C.serverid = xGame.server_prefix;
        C.url = A;
        C.data = JSON.stringify(D);
        C.result = B;
        C.uid = player.info.uid;
        C.nickname = player.info.nickname;
        console.log(C);
        $.ajax({
            "type": "post",
            "dataType": "json",
            "url": "http://error.zhanchengkeji.com/index.php?c=report&m=send",
            "data": C,
            "timeout": 10000,
            "success": function(E) {},
            "error": function(F, E) {
                console.log(F);
                console.log(E)
            }
        })
    }
};