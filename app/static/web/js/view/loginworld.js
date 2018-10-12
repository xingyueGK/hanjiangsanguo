if ($.os.iphone == true && $.os.version >= "9.0") {
    $("#viewport").attr({
        "content": "width=1136,user-scalable=no"
    });
    $("body").css("width", 1136);
    $("body").css("height", 900);
    window.scrollTo(0, 1);
    $("body").css("height", 640)
}
if ($.os.ipad == true && $.os.version >= "9.0") {
    $("#viewport").attr({
        "content": "width=2048,user-scalable=no"
    });
    $("body").css("width", 1024);
    $("body").css("height", 2000);
    window.scrollTo(0, 1);
    $("body").css("height", 768)
} (function() {
    loginWorldClass = function() {
        this.username = "";
        this.password = "";
        this.nickname = "";
        this.mobile = "";
        this.acountlist = null;
        this.movieclip;
        this.myScroller = null
    };
    loginWorldClass.prototype = {
        init: function(A) {
            $("#world").append($.template("loginworld_tmpl"));
            $("#worldloading").hide();
            $("#version").html("ver: " + localStorage.getItem("sg_ver") + "[" + channelID + "]");
            if (A) {
                this.serverlistRender(A)
            } else {
                if (Platform.id == "91") {
                    this.login91Acount()
                } else {
                    if (Platform.id == "pp") {
                        this.loginPPAcount()
                    } else {
                        if (Platform.id == "dj") {
                            this.loginDJAcount()
                        } else {
                            xGame.xsRemove("tryuid");
                            this.loginRender();
                            this.initAcountList()
                        }
                    }
                }
            }
            setTimeout(function() {
                if (gAudio) {
                    gAudio.playbgm("city_bgm")
                }
            },
            800)
        },
        checkFirstTime: function() {
            var B = xGame.xsGet("lastaccountsaved");
            if (B == null) {
                var A = xGame.xsGet("oldman");
                if (A == null) {
                    return true
                }
            }
            return false
        },
        passFirstTime: function() {
            xGame.xsSet("oldman", "solo")
        },
        viewPop: function(A) {
            $("#loginworld_page").attr({
                "class": "show_" + A
            })
        },
        loginRender: function() {
            var A = this;
            A.viewPop("login_wrap");
            var C = $("#login_wrap");
            C.find("#acountlist_btn").unbind("click").bind("click",
            function() {
                $("#acountlist_wrap").toggle();
                $("#loginworld_page").one("touchend",
                function(D) {
                    if (D.target.id == "acountlist_btn" || D.target.className == "d_btn") {
                        return false
                    }
                    $("#acountlist_wrap").css("display", "none")
                })
            });
            C.find(".regbtn").unbind("touchend").bind("touchend",
            function(D) {
                loginWorld.regRender();
                D.preventDefault();
                D.stopPropagation()
            });
            if (navigator && navigator.userAgent && navigator.userAgent.indexOf("5_0_1") != -1) {
                C.find(".try_btn").unbind("touchend").bind("touchend",
                function(D) {
                    xGame.confirm.show(lang("help"), lang("keft_qq"), 1,
                    function() {
                        xGame.confirm.hide()
                    });
                    D.preventDefault();
                    D.stopPropagation()
                }).html(lang("help"))
            } else {
                C.find(".try_btn").unbind("touchend").bind("touchend",
                function(D) {
                    D.preventDefault();
                    D.stopPropagation();
                    xGame.confirm.show(lang("quick_start_title"), lang("quick_start_content"), 1,
                    function() {
                        if (xGame.checkLock()) {
                            return false
                        }
                        setTimeout(function() {
                            loginWorld.tryRender();
                            xGame.confirm.hide()
                        },
                        350)
                    },
                    null, lang("quick_start_go_game"), null, true)
                })
            }
            C.find(".loginsubmitbtn").unbind("touchend").bind("touchend",
            function(D) {
                D.preventDefault();
                D.stopPropagation();
                if (xGame.checkLock()) {
                    return false
                }
                loginWorld.username = $("#login_username").val();
                loginWorld.password = $("#login_password").val();
                if (loginWorld.username.length <= 0 || loginWorld.password.length <= 0) {
                    xGame.toast.show(lang("account_pwd_type_complete"));
                    xGame.unlock();
                    return false
                }
                var E = function(F) {
                    if (F.status == 1) {
                        loginWorld.serverlistRender(F);
                        xGame.saveAccount(loginWorld.username, loginWorld.password)
                    } else {
                        switch (F.status) {
                        case - 1 : xGame.toast.show(lang("member_not_exist"));
                            break;
                        case - 2 : xGame.toast.show(lang("account_psw_error"));
                            break;
                        case - 3 : xGame.toast.show(lang("account_pwd_no_null"));
                            break;
                        default:
                            xGame.toast.show(lang("undefined_error"));
                            break
                        }
                    }
                    xGame.unlock()
                };
                http(UCAPI + "&c=user&m=login&", {
                    "u": loginWorld.username,
                    "p": loginWorld.password,
                    "mac": xGame.macaddr,
                    "adid": xGame.adid,
                    "devicetoken": xGame.devicetoken,
                    "channel": channelID
                },
                E, false, loginWorld.tempLoginFail)
            });
            var B = xGame.xsGet("lastaccountsaved");
            if (B != null && B != "") {
                arr = B.split(",");
                if (arr[0] != "" && arr[1] != "") {
                    $("#login_username").val(arr[0]);
                    $("#login_password").val(arr[1])
                }
                B = null
            }
            if (Platform.id == "pc") {
                C.find(".small_btn_wrap").css("visibility", "hidden")
            }
            C = null;
            A = null
        },
        regRender: function() {
            var A = this;
            A.viewPop("reg_wrap");
            var B = $("#reg_wrap");
            B.find(".input").addClass("greyword").one("focus",
            function() {
                $(this).removeClass("greyword").val("")
            });
            B.find(".close_btn").unbind("touchend").bind("touchend",
            function(C) {
                loginWorld.loginRender();
                C.preventDefault();
                C.stopPropagation()
            });
            B.find(".regsubmitbtn").unbind("touchend").bind("touchend",
            function(C) {
                C.preventDefault();
                C.stopPropagation();
                if (xGame.checkLock()) {
                    return false
                }
                var D = function(E) {
                    if (E.status == 1) {
                        xGame.saveAccount(loginWorld.username, loginWorld.password);
                        loginWorld.serverlistRender(E, loginWorld.checkFirstTime());
                        if (typeof cordova != "undefined" && (channelID == 3 || channelID == 100)) {
                            if (window.plugins.HasOfferTrack) {
                                window.plugins.HasOfferTrack.regisiter(null, null, [1])
                            }
                        }
                    } else {
                        if (E.status == -1) {
                            xGame.toast.show(lang("account_mate_error"))
                        } else {
                            if (E.status == -2) {
                                xGame.toast.show(lang("psw_mate_error"))
                            } else {
                                if (E.status == -3) {
                                    xGame.toast.show(lang("account_is_exist"))
                                } else {
                                    if (E.status == -4) {
                                        xGame.toast.show(lang("account_pwd_no_null"))
                                    }
                                }
                            }
                        }
                    }
                    D = null;
                    xGame.unlock()
                };
                loginWorld.username = $("#reg_username").val();
                loginWorld.password = $("#reg_password").val();
                loginWorld.mobile = $("#reg_mobile").val();
                if (loginWorld.username == lang("4_16")) {
                    loginWorld.username = ""
                }
                if (loginWorld.password == lang("6_16")) {
                    loginWorld.password = ""
                }
                if (loginWorld.mobile == lang("only_find_psw")) {
                    loginWorld.mobile = ""
                }
                if (helper.checkUserName(loginWorld.username) && helper.checkPassWord(loginWorld.password) && helper.checkTel(loginWorld.mobile)) {
                    http(UCAPI + "&c=register&m=reg&", {
                        "u": loginWorld.username,
                        "p": loginWorld.password,
                        "mobile": loginWorld.mobile,
                        "mac": xGame.macaddr,
                        "adid": xGame.adid,
                        "devicetoken": xGame.devicetoken,
                        "channel": channelID,
                        "32d7d8f515a95064d2d36ce16330a846": "c5e55009d72507b33ba7beecbf680550"
                    },
                    D)
                } else {
                    xGame.unlock()
                }
            });
            B = null;
            A = null
        },
        serverlistRender: function(D, N) {
            var H = this;
            xGame.xsSet("login_servers_data", JSON.stringify(D), true);
            var P = $("#serverlist_wrap");
            var G = "";
            var O = "";
            var E = "";
            var A = "";
            if (D.status == 1) {
                var L = null;
                var K = 0;
                var C = null;
                for (var J in D.newserver) {
                    var I = D.newserver[J];
                    E = '<span class="preview">' + lang("server_preview_ready") + "</span>";
                    G += '<li class="btn server_preview" name="' + I.name + '" msg="' + I.message + '" >' + I.name + " " + E + "</li>";
                    K++
                }
                for (var J in D.serverlist) {
                    if (C == null) {
                        C = D.serverlist[J]
                    }
                    var I = D.serverlist[J];
                    if (I.status == 1) {
                        E = '<span class="new">' + lang("new_server") + "</span>"
                    } else {
                        if (I.status == 2) {
                            E = '<span class="hot">' + lang("hot_server") + "</span>"
                        } else {
                            if (I.status == 3) {
                                E = '<span class="stop">' + lang("closed_server") + "</span>"
                            } else {
                                E = ""
                            }
                        }
                    }
                    G += '<li class="btn server" addr="' + I.addr + '" name="' + I.name + '" status="' + I.status + '" msg="' + I.message + '" >' + I.name + " " + E + "</li>";
                    if (I.selected == 1) {
                        L = I;
                        A = E
                    }
                    K++
                }
                if (_inArray([3, 100], channelID) && N == true && C) {
                    console.log(C);
                    addr_arr = C.addr.split(".");
                    xGame.server_prefix = addr_arr[0];
                    xGame.server_domain = addr_arr[2] + "." + addr_arr[3];
                    xGame.API = "http://" + xGame.server_prefix + ".game." + xGame.server_domain + "/index.php?v=" + localStorage["sg_ver"];
                    xGame.xsSet("addr", C.addr);
                    xGame.xsSet("server_name", C.name);
                    var B = function(Q) {
                        xGame.unlock();
                        if (Q.status == 1) {
                            loginWorld.logindoneRender(Q.token);
                            loginWorld.passFirstTime()
                        } else {
                            if (Q.status == 2) {
                                xGame.toast.show(lang("server_updating") + Q.time)
                            } else {
                                xGame.toast.show(lang("undefined_error"))
                            }
                            setTimeout(function() {},
                            2000)
                        }
                    };
                    if (xGame.xsExist("tryuid")) {
                        loadContents({
                            "c": "login",
                            "m": "guest",
                            "mac": xGame.macaddr,
                            "adid": xGame.adid,
                            "devicetoken": xGame.devicetoken,
                            "uid": xGame.xsGet("tryuid"),
                            "channel": channelID
                        },
                        B, false, loginWorld.tempLoginFail)
                    } else {
                        loadContents({
                            "c": "login",
                            "m": "user",
                            "mac": xGame.macaddr,
                            "adid": xGame.adid,
                            "devicetoken": xGame.devicetoken,
                            "u": loginWorld.username,
                            "p": loginWorld.password,
                            "channel": channelID
                        },
                        B, false, loginWorld.tempLoginFail)
                    }
                    return
                }
                if (L) {
                    O += '<div class="lastlogin_wrap">' + L.name + A + '</div><div class="lastlogin_btn btn server lastserver" name="' + L.name + '" addr="' + L.addr + '" status="' + L.status + '" msg="' + L.message + '">' + lang("enter_right_now") + "</div>"
                } else {
                    O += '<div class="lastlogin_wrap">' + lang("no") + "</div>"
                }
                E = A = null;
                var M = function() {
                    xGame.toast.show($(this).attr("msg"));
                    return false
                };
                P.find(".serverlist").undelegate(".server_preview", "click").delegate(".server_preview", "click", M);
                var F = function() {
                    if (xGame.checkLock()) {
                        return false
                    }
                    var R = $(this).attr("addr");
                    if (R == null || R == "") {
                        return
                    }
                    if ($(this).attr("status") == 3) {
                        xGame.confirm.show(lang("maintenance_tips"), $(this).attr("msg"), 1,
                        function() {
                            xGame.confirm.hide();
                            xGame.unlock();
                            window.location.reload()
                        });
                        return false
                    }
                    addr_arr = R.split(".");
                    xGame.server_prefix = addr_arr[0];
                    xGame.server_domain = addr_arr[2] + "." + addr_arr[3];
                    xGame.API = "http://" + xGame.server_prefix + ".game." + xGame.server_domain + "/index.php?v=" + localStorage["sg_ver"];
                    xGame.xsSet("addr", R);
                    xGame.xsSet("server_name", $(this).attr("name"));
                    var Q = function(S) {
                        xGame.unlock();
                        if (S.status == 1) {
                            if (Platform.id == "pc") {
                                //vip登录限制
                                // if ("vip" in S && S.vip < 5 && location.hash == "") {
                                if ("vip" in S && S.vip < -1 && location.hash == "") {
                                    xGame.confirm.show(lang("notice"), lang("website_vip_limit"), 1,
                                    function() {
                                        xGame.confirm.hide()
                                    });
                                    return
                                }
                            }
                            loginWorld.logindoneRender(S.token);
                            if (Platform.id == "h5" && S.temptoken) {
                                window.location.hash = "#!/temptoken=" + S.temptoken
                            }
                        } else {
                            if (S.status == -1) {
                                xGame.toast.show(lang("account_psw_error"))
                            } else {
                                if (S.status == -2) {
                                    xGame.toast.show(lang("create_account_error"))
                                } else {
                                    if (S.status == -3) {
                                        xGame.toast.show(lang("create_token_error"))
                                    } else {
                                        if (S.status == 2) {
                                            xGame.toast.show(lang("server_updating") + S.time)
                                        }
                                    }
                                }
                            }
                        }
                    };
                    if (Platform.id == "91") {
                        loadContents({
                            "c": "login",
                            "m": "user91",
                            "uin": Platform.userinfo.ndLoginUin,
                            "sessionid": Platform.userinfo.ndSessionId,
                            "mac": xGame.macaddr,
                            "adid": xGame.adid,
                            "devicetoken": xGame.devicetoken,
                            "channel": channelID
                        },
                        Q, false, loginWorld.tempLoginFail)
                    } else {
                        if (Platform.id == "pp") {
                            loadContents({
                                "c": "login",
                                "m": "userpp",
                                "ppuid": Platform.userinfo.ppuid,
                                "ppsessionid": Platform.userinfo.ppsessionid,
                                "mac": xGame.macaddr,
                                "adid": xGame.adid,
                                "devicetoken": xGame.devicetoken,
                                "channel": channelID
                            },
                            Q, false, loginWorld.tempLoginFail)
                        } else {
                            if (Platform.id == "dj") {
                                loadContents({
                                    "c": "login",
                                    "m": "userdj",
                                    "uin": Platform.userinfo.djuid,
                                    "sessionid": Platform.userinfo.sessionid,
                                    "mac": xGame.macaddr,
                                    "adid": xGame.adid,
                                    "devicetoken": xGame.devicetoken,
                                    "channel": channelID
                                },
                                Q, false, loginWorld.tempLoginFail)
                            } else {
                                if (xGame.xsExist("tryuid")) {
                                    loadContents({
                                        "c": "login",
                                        "m": "guest",
                                        "mac": xGame.macaddr,
                                        "devicetoken": xGame.devicetoken,
                                        "adid": xGame.adid,
                                        "uid": xGame.xsGet("tryuid"),
                                        "channel": channelID
                                    },
                                    Q, false, loginWorld.tempLoginFail)
                                } else {
                                    loadContents({
                                        "c": "login",
                                        "m": "user",
                                        "mac": xGame.macaddr,
                                        "devicetoken": xGame.devicetoken,
                                        "adid": xGame.adid,
                                        "u": loginWorld.username,
                                        "p": loginWorld.password,
                                        "channel": channelID
                                    },
                                    Q, false, loginWorld.tempLoginFail)
                                }
                            }
                        }
                    }
                };
                P.find(".serverlist").undelegate(".server", "click").delegate(".server", "click", F);
                if (typeof myScroller != "undefined") {
                    myScroller.destroy()
                }
                if ((K <= 8 && !L) || (K <= 7 && L)) {
                    P.find("#serverlist").html(O + '<div class="scroller" id="servers_scroller" >' + G + "</div>");
                    G = O = null
                } else {
                    G = '<div class="scroller" id="servers_scroller" ><div class="scroller_root"><ul class="scroller_content" id="activitypop_list">' + G + "</ul></div></div>";
                    P.find("#serverlist").html(O + G);
                    H.myScroller = new iScroll("servers_scroller", {
                        snap: "li",
                        bounce: false,
                        hScrollbar: false,
                        vScrollbar: true
                    });
                    setTimeout(function() {
                        H.myScroller.refresh()
                    },
                    300)
                }
                F = null;
                L = null;
                G = null;
                D = null;
                H.viewPop("serverlist_wrap")
            } else {
                xGame.toast.show(lang("server_closing"))
            }
        },
        logindoneRender: function(A) {
            guide.createFullmask();
            xGame.xsSet("token", A);
            xGame.initLogin();
            var B = function() {
                guide.cleanFullmask();
                if (player.info.uid == 0) {
                    xGame.toast.show(lang("get_user_info_fail"));
                    return
                }
                if (typeof cordova != "undefined" && typeof window.plugins.localNotification != "undefined") {
                    window.plugins.localNotification.cancel("practice")
                }
                loginWorld.fireEnd();
                if (player.info.gender == 0) {
                    xGame.loadWorld("role")
                } else {
                    var C = function() {
                        xGame.xsRemove("serverlist", true);
                        xGame.checkMenuOpen();
                        if (player.info.level && player.info.level >= 20) {
                            checkLaterUpdate(function() {
                                xGame.loadWorld("city")
                            })
                        } else {
                            guide.loadGuide()
                        }
                        xGame.updateCd("updatePlayer", null);
                        xGame.updateDeviceToken();
                        xGame.updateCd("chat", 0);
                        if (typeof Platform != "undefined" && Platform.id == "h5") {
                            if (xGame.guide == false) {
                                miscpop.showAddToScreen()
                            }
                            miscpop.showStandaloneTips()
                        }
                        xGame.initLocalNotication();
                        C = null
                    };
                    loginWorld.showMar(C)
                }
                B = null
            };
            player.reloadInfo(B, false)
        },
        showMar: function(A) {
            var B = function(D) {
                if (parseInt(D.status) == 1 && D.king.chapter != null) {
                    $("#loginworld_page").hide();
                    var C = xGame.loadPopTmpl("showmar");
                    var E = C.find("#mar_info");
                    C.find(".content").css("background", "url(http://img2.hanjiangsanguo.com/hjimg/pop/showmarpop_hero_" + D.king.chapter + ".jpg) 50% 50% no-repeat");
                    E.children(".emperor").html(D.king.chaptername);
                    E.find(".player_name").html(D.king.nickname);
                    E.find(".server_name").html("(" + D.king.servername + ")");
                    E = null;
                    C.find(".bar").unbind().bind("webkitAnimationEnd",
                    function(F) {
                        $(this).unbind();
                        C.remove();
                        C = null;
                        A()
                    })
                } else {
                    A()
                }
            };
            loadContents({
                "c": "god",
                "m": "loading"
            },
            B, false, A)
        },
        tryRender: function() {
            var A = function(B) {
                xGame.unlock();
                if (B.status == 1) {
                    xGame.xsSet("tryuid", B.uid);
                    xGame.xsRemove("lastaccountsaved");
                    loginWorld.serverlistRender(B, loginWorld.checkFirstTime());
                    if (typeof cordova != "undefined" && (channelID == 3 || channelID == 100)) {
                        if (window.plugins.HasOfferTrack) {
                            window.plugins.HasOfferTrack.regisiter(null, null, [1])
                        }
                    }
                } else {
                    xGame.toast.show(lang("try_fail"))
                }
            };
            http(UCAPI + "&c=register&m=guest&", {
                "mac": xGame.macaddr,
                "adid": xGame.adid,
                "devicetoken": xGame.devicetoken,
                "channel": channelID,
                "32d7d8f515a95064d2d36ce16330a846": "c5e55009d72507b33ba7beecbf680550"
            },
            A, false, loginWorld.tempLoginFail);
            A = null
        },
        initAcountList: function() {
            $("#acountlist_wrap").remove();
            var D = xGame.xsGet("acountlist");
            if (D) {
                this.acountlist = JSON.parse(D);
                var A = "";
                A += '<ul id="acountlist_wrap">';
                for (var B = 0; B < this.acountlist.length; B++) {
                    A += '<li id="acount' + B + '" u="' + this.acountlist[B].u + '" p="' + this.acountlist[B].p + '" k="' + B + '"><span>' + this.acountlist[B].u + '</span><button class="d_btn"></button></li>'
                }
                A += "</ul>";
                var C = $(A);
                C.undelegate("span", "touchend").delegate("span", "touchend",
                function(E) {
                    var G = $(this).parent().attr("u");
                    var F = $(this).parent().attr("p");
                    var H = $("#login_wrap");
                    H.find("#login_username").val(G);
                    H.find("#login_password").val(F);
                    H.find("#acountlist_wrap").hide();
                    H = null;
                    E.preventDefault();
                    E.stopPropagation()
                });
                C.undelegate("button", "touchend").delegate("button", "touchend",
                function(E) {
                    var F = $(this).parent().attr("k");
                    loginWorld.deleteAcount(F);
                    E.preventDefault();
                    E.stopPropagation()
                })
            } else {
                var A = "";
                A += '<ul id="acountlist_wrap">';
                A += "<li><span>" + lang("you_have_not_save_account") + "</span></li>";
                A += "</ul>";
                var C = $(A);
                C.unbind("touchend").bind("touchend",
                function() {
                    $("#acountlist_wrap").hide()
                })
            }
            $("#login_wrap").find(".real_wrap").append(C);
            C = null;
            $("#loginworld_page").unbind("touchend").bind("touchend",
            function(E) {
                if (E.target && E.target.id == "loginworld_page") {
                    $("#acountlist_wrap").hide()
                }
            })
        },
        deleteAcount: function(A) {
            if (A && this.acountlist) {
                this.acountlist.splice(parseInt(A), 1);
                xGame.xsSet("acountlist", JSON.stringify(this.acountlist));
                $("#acount" + A).remove()
            }
        },
        login91Acount: function() {
            var A = function(B) {
                xGame.unlock();
                if (B.status == 1) {
                    loginWorld.serverlistRender(B)
                } else {
                    xGame.toast.show(lang("get_user_info_fail"));
                    return false
                }
            };
            http(UCAPI + "&c=user91&m=login_ios&", {
                "uin": Platform.userinfo.ndLoginUin,
                "sessionid": Platform.userinfo.ndSessionId,
                "mac": xGame.macaddr,
                "adid": xGame.adid,
                "devicetoken": xGame.devicetoken,
                "channel": channelID
            },
            A, false, loginWorld.tempLoginFail);
            A = null
        },
        loginPPAcount: function() {
            this.serverlistRender(Platform.userinfo)
        },
        loginDJAcount: function() {
            var A = function(B) {
                xGame.unlock();
                if (B.status == 1) {
                    loginWorld.serverlistRender(B)
                } else {
                    xGame.toast.show(lang("get_user_info_fail"));
                    return false
                }
            };
            http(UCAPI + "&c=userdj&m=login_ios&", {
                "uin": Platform.userinfo.djuid,
                "sessionid": Platform.userinfo.sessionid,
                "mac": xGame.macaddr,
                "adid": xGame.adid,
                "devicetoken": xGame.devicetoken,
                "channel": channelID
            },
            A, false, loginWorld.tempLoginFail);
            A = null
        },
        fireStart: function() {
            if (this.movieclip != null) {
                return false
            }
            var D, E;
            var B = $("#loginworld_page");
            var A = B.width();
            var C = B.height();
            D = A / 2 + 322;
            E = C / 2 + 51;
            this.movieclip = new movieClipClass({
                "img": staticUrl + "img/login/fire.jpg",
                "width": 150,
                "height": 180,
                "x": D,
                "y": E,
                "loop": true,
                "zindex": "1",
                "frames": [{
                    rect: [0, 0],
                    interval: 40
                },
                {
                    rect: [180, 0],
                    interval: 40
                },
                {
                    rect: [360, 0],
                    interval: 40
                },
                {
                    rect: [540, 0],
                    interval: 40
                },
                {
                    rect: [720, 0],
                    interval: 40
                },
                {
                    rect: [0, 180],
                    interval: 40
                },
                {
                    rect: [180, 180],
                    interval: 40
                },
                {
                    rect: [360, 180],
                    interval: 40
                },
                {
                    rect: [540, 180],
                    interval: 40
                },
                {
                    rect: [720, 180],
                    interval: 40
                },
                {
                    rect: [0, 360],
                    interval: 40
                },
                {
                    rect: [180, 360],
                    interval: 40
                },
                {
                    rect: [360, 360],
                    interval: 40
                },
                {
                    rect: [540, 360],
                    interval: 40
                },
                {
                    rect: [720, 360],
                    interval: 40
                },
                {
                    rect: [900, 540],
                    interval: 700
                }]
            });
            this.movieclip.appendTo(B);
            this.movieclip.play();
            B = null
        },
        fireEnd: function() {
            if (this.movieclip != null) {
                this.movieclip.destory();
                this.movieclip = null
            }
        },
        tempLoginFail: function() {
            initmsg(loadLangObj["protect_msg2"])
        },
        clear: function() {
            if (this.myScroller) {
                this.myScroller.destroy();
                this.myScroller = null
            }
            $("#world").find("#loginworld_page").remove();
            this.fireEnd()
        },
    }
})();