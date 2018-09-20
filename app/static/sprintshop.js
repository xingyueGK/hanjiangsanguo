(function () {
    springshopPopClass = function () {
        this.e;
        this.sid;
        this.listData;
        this.itemDom;
        this.itemScroller;
        this.autoThread;
        this.pageData;
        this.reputationNum
    };
    springshopPopClass.prototype = {
        init: function () {
            var A = this;
            var B = function (C) {
                switch (parseInt(C.status)) {
                    case 1:
                        A.pageData = C;
                        A.initPage(C);
                        A.autoThread = setTimeout(function () {
                            if (springshoppop.e) {
                                springshoppop.autoRefresh()
                            }
                        }, 5000);
                        break;
                    default:
                        xGame.toast.show(C.msg);
                        $("#worldloading").hide();
                        break
                }
                xGame.unlock();
                $("#worldloading").hide()
            };
            loadContents({"c": "springshop", "m": "index"}, B, true);
            B = null
        }, initPage: function (B) {
            var A = this;
            A.e = xGame.loadPopTmpl("springshop");
            A.e.find(".content").find(".hidebtn").unbind("touchend").bind("touchend", function (C) {
                if (xGame.checkLock(true)) {
                    return false
                }
                springshoppop.hide();
                C.preventDefault()
            });
            A.e.find("#springshop_hide").unbind("touchend").bind("touchend", function (C) {
                if (xGame.checkLock(true)) {
                    return false
                }
                A.e.find("#springshop_info_dom").css("display", "none");
                C.preventDefault()
            });
            A.itemDom = A.e.find("#springshop_list_scroller");
            A.sid = 0;
            A.listData = B.list;
            A.fillData(B.list);
            xGame.updateCd("springshop", B.end_time);
            A.e.find("#springshop_gem3").html(B.get3);
            A.e.find("#springshop_prestige").html(B.reputation);
            A.e.find("#springshop_honor").html(B.credit);
            A.bindAll();
            A.e.show()
        }, autoRefresh: function () {
            var B = this;
            var A = function (C) {
                if (C.status == "1") {
                    B.autoThread = setTimeout(function () {
                        if (springshoppop.e) {
                            springshoppop.fillData(C.list);
                            springshoppop.autoRefresh()
                        }
                    }, 5000)
                }
            };
            loadContents({"c": "springshop", "m": "index"}, A, true, function () {
                B.autoThread = setTimeout(function () {
                    if (springshoppop.e) {
                        springshoppop.autoRefresh()
                    }
                }, 5000)
            }, true);
            A = null
        }, bindAll: function () {
            var A = this;
            A.itemDom.undelegate(".touchdiv", "click").delegate(".touchdiv", "click", function () {
                if (xGame.checkLock(true)) {
                    return false
                }
                A.sid = $(this).attr("sid");
                A.itemDom.find(".selected").removeClass("selected");
                $(this).parent().addClass("selected");
                miscpop.showHeroInfo(A.listData[$(this).attr("index")].general)
            });
            A.itemDom.undelegate(".pop_btn_middle ", "click").delegate(".pop_btn_middle ", "click", function () {
                if (xGame.checkLock(true)) {
                    return false
                }
                var G = $(this).attr("gid");
                var C = $(this).attr("price");
                var E = $(this).attr("price1");
                var B = $(this).attr("type");
                var D = $(this).attr("type1");
                var F = $(this).attr("hname");
                if (B == 3) {
                    A.reputationNum = C
                } else {
                    if (D == 3) {
                        A.reputationNum = E
                    } else {
                        A.reputationNum = 0
                    }
                }
                xGame.confirm.show(lang("buy"), lang("springshoppop_ask", [B, C, D, E, F]), 2, function () {
                    xGame.confirm.hide();
                    A.buyHero(G)
                }, function () {
                    xGame.confirm.hide()
                }, lang("ok"), lang("close"))
            })
        }, fillData: function (D) {
            var A = "";
            var F = 0;
            for (var B = 0, E = D.length; B < E; B++) {
                var C = Math.floor((D[B].discount) / 10);
                if ((this.sid == 0 && B == 0) || (this.sid != 0 && this.sid == D[B].id)) {
                    A += '<li class="selected" id="gid' + D[B].id + '" index="' + B + '">';
                    this.sid = D[B].id
                } else {
                    A += '<li id="gid' + D[B].id + '" index="' + B + '">'
                }
                A += '<img src="' + xGame.avatar(D[B].image, true) + '" />';
                A += '<span class="zhekou zhe' + C + '"></span>';
                A += '<span class="hero_name"><em class="name_wrap">' + D[B].name + "</em></span>";
                A += '<span class="herotype">' + helper.getItemVocation(D[B].type) + "</span>";
                A += '<span class="limited">' + D[B].buytimes + "/" + D[B].number + "</span>";
                A += '<div class="price_wrap old_price_wrap">' + lang("original_price") + '<span class="price_treasure price_1 imgtype' + D[B].buytype + '">' + D[B].price + '</span><span class="price_treasure price_2 imgtype' + D[B].buytype1 + '">' + D[B].price1 + '</span><span class="old_line"></span></div>';
                A += '<div class="price_wrap new_price_wrap">' + lang("now_price") + '<span class="price_treasure price_1 imgtype' + D[B].buytype + '">' + D[B].price_discount + '</span><span class="price_treasure price_2 imgtype' + D[B].buytype1 + '">' + D[B].price1_discount + "</span></div>";
                A += '<div class="touchdiv" index="' + B + '" sid="' + D[B].id + '"></div>';
                if (D[B].is_buy == 1) {
                    A += '<button class="btn pop_btn_middle pay' + D[B].buytype + '" gid="' + D[B].id + '" hname="' + D[B].name + '" price="' + D[B].price_discount + '" price1="' + D[B].price1_discount + '" type="' + D[B].buytype + '" type1="' + D[B].buytype1 + '">' + lang("buy") + "</button>"
                } else {
                    if (D[B].is_buy == 2) {
                        A += '<button class="btn pop_btn_middle_disable">' + lang("christmasgeneral_no_num") + "</button>";
                        A += '<div class="shop_over"></div>'
                    } else {
                        A += '<button class="btn pop_btn_middle_disable">' + lang("christmasgiftpop_had_buy") + "</button>"
                    }
                }
                A += "</li>";
                F += 1
            }
            this.itemDom.html(A).width(F * 250);
            A = null;
            if (this.itemScroller == null) {
                this.itemScroller = new iScroll("springshop_scroller", {
                    bounce: false,
                    momentum: false,
                    hScrollbar: false,
                    vScrollbar: false
                })
            }
            this.itemScroller.refresh()
        }, showHeroInf: function (B) {
            var A = "";
            A += '<div class="hero_avatar" style="background: url(' + xGame.avatar(B.image, true) + '); 0 0 no-repeat"></div>';
            A += '<p class="hero_name">' + B.name + "</p>";
            A += '<span class="herotype">' + helper.getItemVocation(B.type) + "</span>";
            A += '<p class="hero_stars" style="width: ' + (18 * parseInt(B.star)) + 'px;"></p>';
            A += '<p class="hero_wuli hero_p">' + lang("springshoppop_wuli", [B.wuli]) + "</p>";
            A += '<p class="hero_zhili hero_p">' + lang("springshoppop_zhili", [B.zhili]) + "</p>";
            A += '<p class=" hero_tili hero_p">' + lang("springshoppop_tili", [B.tili]) + "</p>";
            A += '<p class="hero_talent_title">' + lang("springshoppop_talent") + "</p>";
            A += '<p class="hero_talent hero_infop"><span>' + B.talent.name + "</span>：" + B.talent.description + "</p>";
            A += '<p class="hero_skill_title">' + lang("springshoppop_skill") + "</p>";
            A += '<p class="hero_skill hero_infop"><span>' + B.skill.name + "</span>：" + B.skill.description + "</p>";
            this.e.find("#springshop_info_main").html(A);
            A = null;
            this.e.find("#springshop_info_dom").css("display", "block")
        }, buyHero: function (C) {
            if (xGame.checkLock()) {
                return false
            }
            var B = this;
            var A = function (D) {
                switch (parseInt(D.status)) {
                    case 1:
                        B.e.find("#springshop_info_dom").css("display", "none");
                        B.sid = C;
                        B.listData = D.list;
                        B.fillData(D.list);
                        B.e.find("#springshop_gem3").html(D.get3);
                        B.pageData.reputation = B.pageData.reputation - B.reputationNum;
                        B.e.find("#springshop_prestige").html(B.pageData.reputation);
                        B.e.find("#springshop_honor").html(D.all_credit);
                        if (D.msg == undefined || D.msg == "") {
                            xGame.toast.show(lang("buy_success"));
                            if (D.general) {
                                miscpop.newhero(D.general)
                            }
                        } else {
                            xGame.toast.show(D.msg)
                        }
                        if (B.autoThread) {
                            clearTimeout(B.autoThread);
                            B.autoThread = null
                        }
                        B.autoThread = setTimeout(function () {
                            if (springshoppop.e) {
                                springshoppop.autoRefresh()
                            }
                        }, 5000);
                        break;
                    default:
                        xGame.toast.show(D.msg);
                        break
                }
                xGame.unlock()
            };
            loadContents({"c": "springshop", "m": "buy", "id": C}, A);
            A = null
        }, unbindAll: function () {
            if (this.e) {
                this.e.find(".content").find(".hidebtn").unbind("touchend");
                this.e.find("#springshop_hide").unbind("touchend");
                this.e.remove();
                this.e = null
            }
            if (this.itemDom) {
                this.itemDom.undelegate(".touchdiv", "click");
                this.itemDom.undelegate(".pop_btn_middle ", "click");
                this.itemDom.remove();
                this.itemDom = null
            }
        }, hide: function () {
            xGame.unlock();
            xGame.updateCd("springshop", 0);
            this.sid = null;
            this.listData = null;
            this.pageData = null;
            this.reputationNum = null;
            if (this.autoThread) {
                clearTimeout(this.autoThread);
                this.autoThread = null
            }
            if (this.itemScroller != undefined) {
                this.itemScroller.destroy();
                this.itemScroller = null
            }
            this.unbindAll()
        },
    }
})();