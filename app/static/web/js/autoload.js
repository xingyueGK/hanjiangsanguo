var isdebug = false;
var islocal = false;
var isPhonegap = typeof cordova != "undefined";
var staticUrl = "http://img2.hanjiangsanguo.com/h5cdn/20151225172/static/";
var localJS = "http://127.0.0.1:5000/static/web/";
var UCAPI = "http://uc.game.hanjiangsanguo.com/index.php?";
var client_version = 20151225169;
var local_version = 0;
var server_version = 0;
var appLanguage = "zh-cn";
var channelID = 150;
var jBreaking = false;
var Platform = {
    id: "pc",
    userinfo: null
};
var packageName = "sanguox.app";
var isPhonegap = typeof cordova != "undefined";
var loadRandomNum = (new Date).getTime();
var URLHASH = window.location.hash;
if (URLHASH.indexOf("temptoken") == -1) {
    window.location.hash = ""
}
if (Platform.id == "pc") {

    Platform["payurl"] = "http://hjsg.zhanyougame.com/index.php?c=pay";
    Platform["loginurl"] = "http://127.0.0.1:5000/admin/web";
    if (console) {
        console.log = function() {}
    }
} else {
    if (Platform.id == "h5") {
        Platform["payurl"] = "http://m.hanjiangsanguo.com/index.php?c=website&m=pay"
    }
}
var isIPhone5 = "devicePixelRatio"in window && window.devicePixelRatio == 2 && window.screen.height == 568;
if (isIPhone5) {
    $("body").addClass("iPhone5")
}
var supportFullScreen = false;
if (/OS 6_\d(_\d)? like Mac OS X/i.test(navigator.userAgent) && /(iPhone|iPod)/i.test(navigator.userAgent)) {
    supportFullScreen = true
} else {
    supportFullScreen = false
}
if (typeof cordova == "undefined" && window.navigator.standalone != undefined) {
    window.addEventListener("touchstart", function() {
        hideAddressBar()
    }, true);
    window.addEventListener("orientationchange", function() {
        orientationchangeNotice()
    }, true);
    window.addEventListener("resize", function() {
        checkFullScreen()
    }, true)
}
document.addEventListener("touchmove", preventTouchMove, false);
var ScriptQueue = {
    Loading: false,
    TaskQueue: [],
    CallBack: function(B) {
        B && B();
        this.Loading = false;
        this.Load()
    },
    Load: function() {
        if (!this.Loading && this.TaskQueue.length) {
            var F = document.getElementsByTagName("BODY")[0];
            var H = this
              , G = this.TaskQueue.shift()
              , E = document.createElement("script");
            this.Loading = true;
            E.onload = E.onreadystatechange = function() {
                if (E && E.readyState && E.readyState != "loaded" && E.readyState != "complete") {
                    return
                }
                E.onload = E.onreadystatechange = E.onerror = null;
                E.src = "";
                E.parentNode.removeChild(E);
                E = null;
                H.CallBack(G.CallBackMethod);
                G = null;
                var B = $("#loading_init_em");
                var A = parseInt(B.text()) + 1;
                B.html(A);
                B = null;
                A = null
            }
            ;
            E.charset = "UTF-8";
            E.src = G.src;
            F.appendChild(E)
        }
    },
    AddTask: function(E, F) {
        var D = isPhonegap == true ? "?t=" + loadRandomNum : "";
        this.TaskQueue.push({
            "src": E + D,
            "CallBackMethod": F
        });
        this.Load()
    }
};
var basejs_list = ["js/language.js", "js/core/base.js", "js/core/timer.js", "js/core/player.js", "js/core/audio.js", "js/view/cd.js", "js/view/movieclip.js", "js/view/helper.js", "js/view/guide.js", "js/view/loginworld.js", "js/view/roleworld.js", "js/view/cityworld.js", "js/view/mapworld.js", "js/view/chatpop.js", "js/view/miscpop.js", "js/view/mailpop.js", "js/view/mailboxpop.js", "js/view/trendspop.js", "js/view/battleworld.js", "js/data/mapini.js", "js/data/ini.js", "js/obj/battle_hero.js", "js/obj/battle_num.js", "js/obj/battle_team.js", "js/core/jsMorph-0.5.0.min.js", "js/core/socket.io.min.js", "js/core/PxLoader.js", "js/core/PxLoaderImage.js", "js/core/gamestart.js"];
var alljs_list = basejs_list;
var appFileSystem = null;
var cached_list = [];
var cached_path = "";
var file_index = 0;
var webfile_list = {};
var ischeck = true;
var stopLoadingAnim = false;
var loadLangObj = {
    "private_msg": "您启用了safari秘密浏览功能，请关闭后再重启游戏！",
    "protect_msg1": "暂时无法登录游戏，请稍后重试！<br/><br/>预计恢复时间：{1}",
    "protect_msg2": "暂时无法登录游戏，请稍后重试",
    "no_internet_msg": "暂时无法连接网络！<br/>请检查网络状态或稍后重试！",
    "update_resource_msg": "更新资源出错，请重试！",
    "updating_image": "正在更新图片 {1}/{2} (共需下载{3})",
    "updating_modual": "正在更新模块 {1}/{2} (共需下载{3})",
    "updating_style": "正在更新样式 1/1 (共需下载{1})",
    "updating_view": "正在更新界面 1/1 (共需下载{1})",
    "loading_modual": '正在加载模块 <em id="loading_init_em">0</em>/{1}'
};
function lang(H, G) {
    var E = "";
    if (typeof langObj != "undefined" && typeof langObj[H] != "undefined") {
        E = langObj[H]
    } else {
        if (typeof loadLangObj != "undefined" && typeof loadLangObj[H] != "undefined") {
            E = loadLangObj[H]
        }
    }
    if (E != "" && typeof G != "undefined") {
        for (var F = 0; F < G.length; F++) {
            E = E.replace("{" + (F + 1) + "}", G[F])
        }
    }
    return E
}
var init = function() {
    if ($.os.ipad) {
        $("#viewport").attr({
            "content": "width=1024,user-scalable=no"
        });
        $("body").css({
            "width": "1024px"
        }).addClass("iPad")
    } else {
        if (typeof isIPhone5 != "undefined" && isIPhone5) {
            $("#viewport").attr({
                "content": "width=1136,user-scalable=no"
            });
            $("body").css({
                "width": "1136px"
            })
        }
    }
    orientationchangeNotice();
    hideAddressBar();
    $("#initloading").find(".longtimetips").show();
    try {
        localStorage["test"] = "1"
    } catch (b) {
        initmsg(lang("private_msg"));
        return false
    }
    var h = 0;
    var Z = "";
    var e = $("#initloading_progress");
    var Y = function() {
        local_version = localStorage["sg_version" + client_version] > 0 ? localStorage["sg_version" + client_version] : client_version;
        var A = {
            "type": "get",
            "dataType": "json",
            "url": UCAPI + "c=ios&m=update_world30&client_version=" + client_version + "&local_version=" + local_version + "&lang=" + appLanguage + "&channel=" + channelID,
            "complete": function(C, B) {
                C = null
            },
            "success": function(B) {
                if (B.status == 1) {
                    server_version = B.version;
                    localStorage.setItem("sg_ver", B.versionname);
                    if (isPhonegap == true && client_version != server_version) {
                        cached_list = B.cached_list;
                        alljs_list = B.alljs_list;
                        if (local_version != server_version) {
                            ischeck = false;
                            localStorage["sg_tmpl_v" + client_version] = "";
                            $("#updateinfo").html(B.updateinfo).show();
                            webfile_list = B.filelist;
                            X(function() {
                                V();
                                S()
                            })
                        } else {
                            X(function() {
                                V();
                                c()
                            })
                        }
                    } else {
                        V();
                        c()
                    }
                } else {
                    if (B.status == 2) {
                        initmsg(lang("protect_msg1", [B.time]))
                    } else {
                        initmsg(lang("protect_msg2"))
                    }
                }
            },
            "error": function(C, B) {
                hideAddressBar();
                initmsg(lang("no_internet_msg"));
                return
            },
        };
        $.ajax(A)
    };
    if (_inArray(["h5", "pc"], Platform.id) || isdebug) {
        local_version = localStorage["sg_version" + client_version] > 0 ? localStorage["sg_version" + client_version] : client_version;
        if (local_version != server_version) {
            localStorage["sg_tmpl_v" + client_version] = "";
            local_version = server_version;
            localStorage["sg_version" + client_version] = local_version
        }
        localStorage.setItem("sg_ver", local_version);
        V();
        c()
    } else {
        Y()
    }
    function X(A) {
        if (typeof cordova == "undefined") {
            c()
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(B) {
                appFileSystem = B;
                cached_path = appFileSystem.root.fullPath.replace("Documents", "");
                file_index = 0;
                A()
            }, function() {
                stopLoadingAnim == true;
                initmsg(lang("update_resource_msg"))
            })
        }
    }
    function S() {
        T((file_index + 1) / webfile_list["imgnum"], lang("updating_image", [(file_index + 1), webfile_list["imgnum"], webfile_list["allsize"]]));
        if (typeof webfile_list["img"][file_index] != "undefined") {
            d(webfile_list["img"][file_index], "http://img2.hanjiangsanguo.com/h5cdn/" + server_version + "/img/plugin/" + webfile_list["img"][file_index], S)
        } else {
            file_index = 0;
            f()
        }
    }
    function f() {
        T(1, lang("updating_style", [webfile_list["allsize"]]));
        if (typeof webfile_list["css"][file_index] != "undefined") {
            d(webfile_list["css"][file_index], "http://img2.hanjiangsanguo.com/h5cdn/" + server_version + "/css/" + webfile_list["css"][file_index], f)
        } else {
            file_index = 0;
            W()
        }
    }
    function W() {
        T((file_index + 1) / webfile_list["jsnum"], lang("updating_modual", [(file_index + 1), webfile_list["jsnum"], webfile_list["allsize"]]));
        if (typeof webfile_list["js"][file_index] != "undefined") {
            d(webfile_list["js"][file_index], "http://img2.hanjiangsanguo.com/h5cdn/" + server_version + "/js/" + webfile_list["js"][file_index], W)
        } else {
            file_index = 0;
            localStorage["sg_version" + client_version] = server_version;
            local_version = server_version;
            c()
        }
    }
    function c() {
        if (ischeck == true) {
            T(1)
        } else {
            T(1, lang("updating_view", [webfile_list["allsize"]]))
        }
        if (typeof localStorage["sg_tmpl_v" + client_version] == "undefined" || localStorage["sg_tmpl_v" + client_version] == "") {
            var A = "";
            if (_inArray(["h5", "pc"], Platform.id)) {
                A = "http://game.hanjiangsanguo.com/fileproxy.php?name=" + encodeURIComponent(staticUrl + "./tmpl.html")
            } else {
                if (isPhonegap == false) {
                    A = staticUrl + "./tmpl.html"
                } else {
                    A = client_version == server_version ? staticUrl + "./tmpl.html" : "http://img2.hanjiangsanguo.com/h5cdn/index.php?lang=" + appLanguage + "&name=" + encodeURIComponent(server_version + "/tmpl.html")
                }
            }
            R(A, function(B) {
                if (isPhonegap == true || !_inArray(["h5", "pc"], Platform.id)) {
                    localStorage["sg_tmpl_v" + client_version] = B
                }
                $("body").append(B);
                U()
            })
        } else {
            $("body").append(localStorage["sg_tmpl_v" + client_version]);
            U()
        }
    }
    function U() {
        var B = "";
        var A = "";
        if (client_version == server_version || _inArray(["h5", "pc"], Platform.id) || isPhonegap == false) {
            B = staticUrl + "css/game.css"
        } else {
            B = cached_path + "Documents/sg_cache/game.css?v=" + server_version
        }
        g(B);
        if (isIPhone5) {
            g(staticUrl + "css/iphone5.css")
        }
        if (Platform.id == "h5") {
            g(staticUrl + "css/h5.css")
        }
        a()
    }
    function g(A) {
        var B = document.createElement("link");
        B.rel = "stylesheet";
        B.rev = "stylesheet";
        B.type = "text/css";
        B.href = A;
        document.getElementsByTagName("head")[0].appendChild(B)
    }
    function a() {
        T(1, lang("loading_modual", [alljs_list.length]));
        for (var A in basejs_list) {
            var B = xjs(localJS + basejs_list[A]);
            ScriptQueue.AddTask(B)
        }
    }
    function V() {
        if (stopLoadingAnim == true) {
            e = null;
            return false
        }
        e.css("width", "10px").animate({
            "width": "464px",
        }, A(100, 1000), "ease", V);
        function A(B, C) {
            var E = C - B;
            var D = Math.random();
            return (B + Math.round(D * E))
        }
    }
    function T(B, F) {
        var E = $("#initloading");
        var C = E.find("#initloading_progress");
        if (F) {
            E.find("#tips").html(F)
        }
        return false;
        if (B > 0) {
            var A = B + "";
            A = parseFloat(A.substr(0, 4));
            var D = 462 * A
        } else {
            var D = C.width() + 5;
            if (D > 324) {
                D = 324
            }
        }
        C.css({
            "width": D + "px"
        })
    }
    function R(B, A) {
        var C = {
            "type": "get",
            "dataType": "text",
            "url": B,
            "complete": function(D, E) {
                D = null
            },
            "success": A,
        };
        $.ajax(C)
    }
    function d(F, A, H) {
        file_index++;
        var E = "sg_cache/" + F;
        appFileSystem.root.getFile(E, null, function(I) {
            I.remove(function() {
                appFileSystem.root.getDirectory("sg_cache", {
                    create: true
                }, G, D)
            })
        }, function() {
            appFileSystem.root.getDirectory("sg_cache", {
                create: true
            }, G, D)
        });
        function G(I) {
            var J = new FileTransfer();
            var K = I.fullPath + "/" + F;
            J.download(A, K, function(L) {
                if (F.indexOf(".css") == -1) {
                    H()
                } else {
                    C()
                }
            }, D)
        }
        function C() {
            appFileSystem.root.getFile(E, {
                create: true
            }, function(J) {
                var I = new FileReader();
                I.onloadend = function(K) {
                    var L = K.target.result.replace(/..\/img\/plugin\//g, cached_path + "Documents/sg_cache/");
                    L = L.replace(/..\/img\//g, cached_path + packageName + "/www/static/img/");
                    J.remove(function() {
                        B(L)
                    })
                }
                ;
                I.readAsText(J)
            }, D)
        }
        function B(I) {
            appFileSystem.root.getFile(E, {
                create: true
            }, function(J) {
                J.createWriter(function(K) {
                    K.onwrite = function() {}
                    ;
                    K.seek(K.length);
                    K.write(I);
                    H()
                })
            }, D)
        }
        function D(I) {
            console.log("ERROR");
            console.log(JSON.stringify(I));
            stopLoadingAnim == true;
            initmsg(lang("update_resource_msg"), function() {
                cleanGameCache()
            })
        }
    }
};
var init91 = function() {
    window.plugins.NdComPlatformPlugin.loginSuccess = function(B) {
        if (typeof player != "undefined" && player.info.uid > 0) {
            return false
        }
        Platform.userinfo = B;
        init()
    }
    ;
    window.plugins.NdComPlatformPlugin.loginFail = function(B) {
        Platform.userinfo = null;
        if (typeof timer != "undefined" && timer != null) {
            timer.paused = true
        }
        initmsg("您登录失败或失去登录状态，请重新登录！")
    }
    ;
    window.plugins.NdComPlatformPlugin.exitPlatform = function() {
        if (Platform.userinfo == null) {
            window.location.reload()
        }
    }
    ;
    window.plugins.NdComPlatformPlugin.sessionInvaild = function(B) {}
    ;
    window.plugins.NdComPlatformPlugin.purchaseResult = function() {
        if (typeof player != "undefined" && player.info.uid > 0) {
            setTimeout(function() {
                player.reloadInfo()
            }, 1000)
        }
    }
    ;
    if (sessionStorage["checkupdated"]) {
        window.plugins.NdComPlatformPlugin.ndLogin(null, null, [])
    } else {
        window.plugins.NdComPlatformPlugin.ndCheckUpdate(null, null, []);
        sessionStorage["checkupdated"] = "true"
    }
};
var initPP = function() {
    window.plugins.PPComPlatformPlugin.loginResult = function(B) {
        if (B.status == 1) {
            console.log("PP User Info:" + B.ppuid + " " + B.ppsessionid);
            if (typeof player != "undefined" && player.info.uid > 0) {
                return false
            }
            Platform.userinfo = B;
            init()
        } else {
            initmsg("您登录失败或失去登录状态，请重新登录！")
        }
    }
    ;
    window.plugins.PPComPlatformPlugin.loginFail = function() {
        Platform.userinfo = null;
        if (typeof timer != "undefined" && timer != null) {
            timer.paused = true
        }
        initmsg("您登录失败或失去登录状态，请重新登录！")
    }
    ;
    window.plugins.PPComPlatformPlugin.purchaseResult = function() {
        if (typeof player != "undefined" && player.info.uid > 0) {
            setTimeout(function() {
                player.reloadInfo()
            }, 1000)
        }
    }
    ;
    window.plugins.PPComPlatformPlugin.ppRefresh = function() {
        if (typeof player != "undefined" && player.info.uid > 0) {
            player.reloadInfo()
        }
    }
    ;
    window.plugins.PPComPlatformPlugin.ppLogin(null, null, [])
};
if (Platform.id == "91") {
    $(document).ready(function() {
        document.addEventListener("deviceready", init91, false)
    })
} else {
    if (Platform.id == "pp") {
        $(document).ready(function() {
            document.addEventListener("deviceready", initPP, false)
        })
    } else {
        if (typeof cordova != "undefined") {
            $(document).ready(function() {
                document.addEventListener("deviceready", init, false)
            })
        } else {
            init()
        }
    }
}
function initmsg(E, F) {
    var D = $("#initmsg");
    D.find(".text").html(E);
    if (D.css("display") != "none") {
        return false
    } else {
        D.find("#initmsg_btn").unbind("click").bind("click", function() {
            D.hide();
            D = null;
            if (typeof timer != "undefined") {
                timer.paused = true
            }
            if (typeof gAudio != "undefined" && gAudio != null) {
                gAudio.stopMusic()
            }
            $("#worldloading").addClass("black").show();
            $("#world").remove();
            if (F) {
                F()
            }
            window.location.reload();
            setTimeout(function() {
                window.location.reload()
            }, 1500)
        });
        D.show()
    }
}
function ximg(C) {
    if (typeof cordova == "undefined" || C.indexOf(staticUrl + "img/plugin/") == -1) {
        return C
    }
    C = C.replace(staticUrl + "img/plugin/", "");
    if (_inArray(cached_list, C)) {
        var D = cached_path + "Documents/sg_cache/" + C;
        return D
    } else {
        var D = "http://img2.hanjiangsanguo.com/h5cdn/" + server_version + "/img/plugin/" + C;
        return D
    }
}
function xjs(D) {
    if (typeof cordova == "undefined") {
        return D
    }
    var E = D.substring(D.lastIndexOf("/") + 1);
    if (_inArray(cached_list, E)) {
        var F = cached_path + "Documents/sg_cache/" + E;
        return F
    } else {
        return D
    }
}
function _inArray(E, D) {
    if (E.length > 0) {
        for (var F = 0; F < E.length; F++) {
            if (E[F] == D) {
                return true
            }
        }
    }
    return false
}
function hideAddressBar() {
    if (window.navigator.standalone == undefined) {
        if (window.innerHeight >= 768) {
            $("body").css("height", 768)
        } else {
            $("body").css("height", window.innerHeight)
        }
        return false
    }
    var B = window.innerHeight;
    $("body").css("height", window.innerHeight + 100);
    window.scrollTo(0, 1);
    $("body").css("height", window.innerHeight);
    if (Platform.id == "h5") {
        $("#orientationchange").css("height", window.innerHeight)
    }
    B = null
}
function checkFullScreen() {
    if (window.orientation == 0 || window.orientation == 180) {
        return false
    }
    if (window.navigator.standalone == true) {
        return false
    }
    if (typeof cordova == "undefined" && supportFullScreen) {
        if (window.innerHeight > 538) {
            if ($("body").attr("fullscreen") != "true") {
                $("body").attr("fullscreen", "true");
                $("body").css("height", window.innerHeight + 100);
                window.scrollTo(0, 1);
                $("body").css("height", 642)
            }
        } else {
            if ($("body").attr("fullscreen") != "false") {
                $("body").attr("fullscreen", "false");
                $("body").css("height", window.innerHeight + 300);
                window.scrollTo(0, 1);
                $("body").css("height", 538)
            }
        }
        if ((_inArray([106, 152, 153, 154, 155], channelID)) && typeof loginWorld != "undefined" && loginWorld.movieclip != null) {
            loginWorld.movieclip.obj.css({
                "left": $("#loginworld_page").width() / 2 + 322 + "px",
                "top": $("#loginworld_page").height() / 2 + 51 + "px"
            })
        }
    }
    if (typeof xGame != "undefined" && xGame.iscroll != undefined) {
        xGame.iscroll.refresh()
    }
}
function orientationchangeNotice() {
    if (typeof cordova == "undefined" && window.navigator.standalone != undefined) {
        if (window.orientation == 0 || window.orientation == 180) {
            $("#orientationchange").css({
                "display": "block",
                "height": window.innerHeight
            });
            if ($("#add_notice").attr("show") == "true") {
                $("#add_notice").css("display", "none")
            }
            if ($("#standalonetips").attr("show") == "true") {
                $("#standalonetips").css("display", "none")
            }
        } else {
            if (window.orientation == 90 || window.orientation == -90) {
                $("#orientationchange").css("display", "none");
                hideAddressBar();
                if ($("#add_notice").attr("show") == "true") {
                    $("#add_notice").css("display", "block")
                }
                if ($("#standalonetips").attr("show") == "true") {
                    $("#standalonetips").css("display", "block")
                }
            }
        }
    }
}
function cleanGameCache() {
    localStorage.removeItem("sg_tmpl_v" + client_version);
    if (typeof gAudio != "undefined" && gAudio != null) {
        gAudio.stopMusic()
    }
    if (typeof cordova == "undefined") {
        localStorage["sg_version" + client_version] = "";
        location.reload()
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(B) {
            appFileSystem = B;
            appFileSystem.root.getDirectory("sg_cache", {
                create: false
            }, function(A) {
                A.removeRecursively(function() {
                    localStorage["sg_version" + client_version] = "";
                    location.reload()
                }, function() {
                    location.reload()
                })
            }, function() {
                location.reload()
            })
        }, function() {
            location.reload()
        })
    }
}
function preventTouchMove(B) {
    B.preventDefault();
    B.stopPropagation();
    return false
}
;