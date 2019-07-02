(function () {
    helperClass = function () {
        this.e = null;
        this.ex = 0;
        this.ey = 0;
        this.ox = 0;
        this.oy = 0;
        this._counter = 0;
        this.textflash_active = false;
        this.textflash_queue = [];
        this.lang = {};
        this.Tween = {
            Linear: function (C, B, D, A) {
                return D * C / A + B
            }, Quad: {
                easeIn: function (C, B, D, A) {
                    return D * (C /= A) * C + B
                }, easeOut: function (C, B, D, A) {
                    return -D * (C /= A) * (C - 2) + B
                }, easeInOut: function (C, B, D, A) {
                    if ((C /= A / 2) < 1) {
                        return D / 2 * C * C + B
                    }
                    return -D / 2 * ((--C) * (C - 2) - 1) + B
                }
            }, Cubic: {
                easeIn: function (C, B, D, A) {
                    return D * (C /= A) * C * C + B
                }, easeOut: function (C, B, D, A) {
                    return D * ((C = C / A - 1) * C * C + 1) + B
                }, easeInOut: function (C, B, D, A) {
                    if ((C /= A / 2) < 1) {
                        return D / 2 * C * C * C + B
                    }
                    return D / 2 * ((C -= 2) * C * C + 2) + B
                }
            }, Quart: {
                easeIn: function (C, B, D, A) {
                    return D * (C /= A) * C * C * C + B
                }, easeOut: function (C, B, D, A) {
                    return -D * ((C = C / A - 1) * C * C * C - 1) + B
                }, easeInOut: function (C, B, D, A) {
                    if ((C /= A / 2) < 1) {
                        return D / 2 * C * C * C * C + B
                    }
                    return -D / 2 * ((C -= 2) * C * C * C - 2) + B
                }
            }, Quint: {
                easeIn: function (C, B, D, A) {
                    return D * (C /= A) * C * C * C * C + B
                }, easeOut: function (C, B, D, A) {
                    return D * ((C = C / A - 1) * C * C * C * C + 1) + B
                }, easeInOut: function (C, B, D, A) {
                    if ((C /= A / 2) < 1) {
                        return D / 2 * C * C * C * C * C + B
                    }
                    return D / 2 * ((C -= 2) * C * C * C * C + 2) + B
                }
            }, Sine: {
                easeIn: function (C, B, D, A) {
                    return -D * Math.cos(C / A * (Math.PI / 2)) + D + B
                }, easeOut: function (C, B, D, A) {
                    return D * Math.sin(C / A * (Math.PI / 2)) + B
                }, easeInOut: function (C, B, D, A) {
                    return -D / 2 * (Math.cos(Math.PI * C / A) - 1) + B
                }
            }, Expo: {
                easeIn: function (C, B, D, A) {
                    return (C == 0) ? B : D * Math.pow(2, 10 * (C / A - 1)) + B
                }, easeOut: function (C, B, D, A) {
                    return (C == A) ? B + D : D * (-Math.pow(2, -10 * C / A) + 1) + B
                }, easeInOut: function (C, B, D, A) {
                    if (C == 0) {
                        return B
                    }
                    if (C == A) {
                        return B + D
                    }
                    if ((C /= A / 2) < 1) {
                        return D / 2 * Math.pow(2, 10 * (C - 1)) + B
                    }
                    return D / 2 * (-Math.pow(2, -10 * --C) + 2) + B
                }
            }, Circ: {
                easeIn: function (C, B, D, A) {
                    return -D * (Math.sqrt(1 - (C /= A) * C) - 1) + B
                }, easeOut: function (C, B, D, A) {
                    return D * Math.sqrt(1 - (C = C / A - 1) * C) + B
                }, easeInOut: function (C, B, D, A) {
                    if ((C /= A / 2) < 1) {
                        return -D / 2 * (Math.sqrt(1 - C * C) - 1) + B
                    }
                    return D / 2 * (Math.sqrt(1 - (C -= 2) * C) + 1) + B
                }
            }, Elastic: {
                easeIn: function (F, E, G, B, A, D) {
                    if (F == 0) {
                        return E
                    }
                    if ((F /= B) == 1) {
                        return E + G
                    }
                    if (!D) {
                        D = B * 0.3
                    }
                    if (!A || A < Math.abs(G)) {
                        A = G;
                        var C = D / 4
                    } else {
                        var C = D / (2 * Math.PI) * Math.asin(G / A)
                    }
                    return -(A * Math.pow(2, 10 * (F -= 1)) * Math.sin((F * B - C) * (2 * Math.PI) / D)) + E
                }, easeOut: function (F, E, G, B, A, D) {
                    if (F == 0) {
                        return E
                    }
                    if ((F /= B) == 1) {
                        return E + G
                    }
                    if (!D) {
                        D = B * 0.3
                    }
                    if (!A || A < Math.abs(G)) {
                        A = G;
                        var C = D / 4
                    } else {
                        var C = D / (2 * Math.PI) * Math.asin(G / A)
                    }
                    return (A * Math.pow(2, -10 * F) * Math.sin((F * B - C) * (2 * Math.PI) / D) + G + E)
                }, easeInOut: function (F, E, G, B, A, D) {
                    if (F == 0) {
                        return E
                    }
                    if ((F /= B / 2) == 2) {
                        return E + G
                    }
                    if (!D) {
                        D = B * (0.3 * 1.5)
                    }
                    if (!A || A < Math.abs(G)) {
                        A = G;
                        var C = D / 4
                    } else {
                        var C = D / (2 * Math.PI) * Math.asin(G / A)
                    }
                    if (F < 1) {
                        return -0.5 * (A * Math.pow(2, 10 * (F -= 1)) * Math.sin((F * B - C) * (2 * Math.PI) / D)) + E
                    }
                    return A * Math.pow(2, -10 * (F -= 1)) * Math.sin((F * B - C) * (2 * Math.PI) / D) * 0.5 + G + E
                }
            }, Back: {
                easeIn: function (D, C, E, A, B) {
                    if (B == undefined) {
                        B = 1.70158
                    }
                    return E * (D /= A) * D * ((B + 1) * D - B) + C
                }, easeOut: function (D, C, E, A, B) {
                    if (B == undefined) {
                        B = 1.70158
                    }
                    return E * ((D = D / A - 1) * D * ((B + 1) * D + B) + 1) + C
                }, easeInOut: function (D, C, E, A, B) {
                    if (B == undefined) {
                        B = 1.70158
                    }
                    if ((D /= A / 2) < 1) {
                        return E / 2 * (D * D * (((B *= (1.525)) + 1) * D - B)) + C
                    }
                    return E / 2 * ((D -= 2) * D * (((B *= (1.525)) + 1) * D + B) + 2) + C
                }
            }, Bounce: {
                easeIn: function (C, B, D, A) {
                    return D - Tween.Bounce.easeOut(A - C, 0, D, A) + B
                }, easeOut: function (C, B, D, A) {
                    if ((C /= A) < (1 / 2.75)) {
                        return D * (7.5625 * C * C) + B
                    } else {
                        if (C < (2 / 2.75)) {
                            return D * (7.5625 * (C -= (1.5 / 2.75)) * C + 0.75) + B
                        } else {
                            if (C < (2.5 / 2.75)) {
                                return D * (7.5625 * (C -= (2.25 / 2.75)) * C + 0.9375) + B
                            } else {
                                return D * (7.5625 * (C -= (2.625 / 2.75)) * C + 0.984375) + B
                            }
                        }
                    }
                }, easeInOut: function (C, B, D, A) {
                    if (C < A / 2) {
                        return Tween.Bounce.easeIn(C * 2, 0, D, A) * 0.5 + B
                    } else {
                        return Tween.Bounce.easeOut(C * 2 - A, 0, D, A) * 0.5 + D * 0.5 + B
                    }
                }
            }
        }
    };
    helperClass.prototype = {
        compArray: function (A, C) {
            if ((A && typeof A === "object" && A.constructor === Array) && (C && typeof C === "object" && C.constructor === Array)) {
                if (A.length == C.length) {
                    for (var B = 0; B < A.length; B++) {
                        var D = this.compObj(A[B], C[B]);
                        if (!D) {
                            return false
                        }
                    }
                } else {
                    return false
                }
            } else {
                throw new Error("argunment is  error ;")
            }
            return true
        }, compObj: function (A, B) {
            if ((A && typeof A === "object") && ((B && typeof B === "object"))) {
                var D = this.propertyLength(A);
                var E = this.propertyLength(B);
                if (D == E) {
                    for (var C in A) {
                        if (A.hasOwnProperty(C) && B.hasOwnProperty(C)) {
                            if (A[C].constructor == Array && B[C].constructor == Array) {
                                if (!this.compArray(A[C], B[C])) {
                                    return false
                                }
                            } else {
                                if (typeof A[C] === "string" && typeof B[C] === "string") {
                                    if (A[C] !== B[C]) {
                                        return false
                                    }
                                } else {
                                    if (typeof A[C] === "object" && typeof B[C] === "object") {
                                        if (!this.compObj(A[C], B[C])) {
                                            return false
                                        }
                                    } else {
                                        return false
                                    }
                                }
                            }
                        } else {
                            return false
                        }
                    }
                } else {
                    return false
                }
            }
            return true
        }, propertyLength: function (C) {
            var A = 0;
            if (C && typeof C === "object") {
                for (var B in C) {
                    if (C.hasOwnProperty(B)) {
                        A++
                    }
                }
                return A
            } else {
                throw new Error("argunment can not be null;")
            }
        }, textflash_add: function (C, B, E, D, A) {
            if (!C || C.length <= 0) {
                return
            }
            this.textflash_queue.push({"e": C, "className": B, "time": E, "times": D, "callback": A});
            this.textflash_run()
        }, textflash_run: function () {
            if (!this.textflash_active && this.textflash_queue.length > 0) {
                var C = this;
                var E = this.textflash_queue.shift();
                this.textflash_active = true;
                var A = 0;
                var D = 0;
                var F = null;
                var B = E.e.attr("class");
                if (B == null) {
                    B = ""
                }
                if (B != "" && B.indexOf("textflash") != -1) {
                    console.log("正在运行，返回");
                    return false
                } else {
                    E.e.addClass("textflash")
                }
                F = setInterval(function () {
                    A != 1 ? A += 1 : A = 0;
                    D++;
                    E.e.attr({"class": B + " textflash " + E.className + A});
                    if (D == E.times) {
                        clearInterval(F);
                        E.e.attr("class", B);
                        C.textflash_callback(E.callback);
                        C = A = D = F = B = E = null;
                        return
                    }
                }, E.time)
            }
        }, textflash_callback: function (A) {
            A && A();
            this.textflash_active = false;
            this.textflash_run()
        }, getTalentColor: function (A) {
            A = parseInt(A);
            var B = "";
            switch (A) {
                case 1:
                    B = lang("white");
                    break;
                case 2:
                    B = lang("green");
                    break;
                case 3:
                    B = lang("blue");
                    break;
                case 4:
                    B = lang("golden");
                    break;
                case 5:
                    B = lang("purple");
                    break;
                case 6:
                    B = lang("talent_red");
                    break;
                case 7:
                    B = lang("orange");
                    break;
                case 8:
                    B = lang("colour");
                    break;
                case 9:
                    B = lang("coppery");
                    break;
                case 10:
                    B = lang("silvery");
                    break
            }
            return B
        }, getTalent: function (A, B) {
            A = parseInt(A);
            var C = "";
            switch (A) {
                case 1:
                    C = B == true ? lang("p_atk") : lang("p_attack");
                    break;
                case 2:
                    C = B == true ? lang("p_def") : lang("p_defense");
                    break;
                case 3:
                    C = B == true ? lang("m_atk") : lang("m_attack");
                    break;
                case 4:
                    C = B == true ? lang("m_def") : lang("m_defense");
                    break;
                case 5:
                    C = lang("life");
                    break;
                case 6:
                    C = lang("mingzhong");
                    break;
                case 7:
                    C = lang("jingzhun");
                    break;
                case 8:
                    C = lang("miss");
                    break;
                case 9:
                    C = lang("shipo");
                    break;
                case 10:
                    C = lang("suit_attr30");
                    break;
                case 11:
                    C = lang("suit_attr31");
                    break;
                case 53:
                    C = lang("suit_attr60");
                    break
            }
            return C
        }, getBrName: function (B) {
            var C = "";
            for (var A = 0; A < B.length; A++) {
                if (A > 0) {
                    C += "<br/>" + B[A]
                } else {
                    C += B[A]
                }
            }
            return C
        }, formatDate: function (A, B) {
            if (!A) {
                A = "-"
            }
            return new Date().getFullYear() + A + (new Date().getMonth() + 1) + A + new Date().getDate() + (B == true ? A + new Date().getHours() : "")
        }, getBattleZindex: function (C, B) {
            var A = 1;
            if (C == 1 || C == 4 || C == 7) {
                A = B ? 11 : 10
            } else {
                if (C == 2 || C == 5 || C == 8) {
                    A = B ? 13 : 12
                } else {
                    A = B ? 15 : 14
                }
            }
            return A
        }, getLevelRewardType: function (A) {
            A = parseInt(A);
            var B = "";
            switch (A) {
                case 1:
                    B = lang("gold");
                    break;
                case 2:
                    B = lang("silver");
                    break;
                case 3:
                    B = lang("act");
                    break;
                case 4:
                    B = lang("blue_jade");
                    break;
                case 5:
                    B = lang("yellow_jade");
                    break;
                case 6:
                    B = lang("purple_jade");
                    break
            }
            return B
        }, wuziname: function (A) {
            A = parseInt(A);
            var B = "";
            switch (A) {
                case 1:
                    B = lang("gold");
                    break;
                case 2:
                    B = lang("silver");
                    break;
                case 3:
                    B = lang("yellow_jade");
                    break;
                case 4:
                    B = lang("purple_jade");
                    break;
                case 5:
                    B = lang("original_soul");
                    break;
                case 6:
                    B = lang("jade");
                    break;
                case 7:
                    B = lang("reputation");
                    break;
                case 9:
                    B = lang("gemworld_part");
                    break;
                case 10:
                    B = lang("tfcard");
                    break;
                case 11:
                    B = lang("blue_jade");
                    break;
                case 13:
                    B = lang("act");
                    break;
                case 14:
                    B = lang("refinestone");
                    break;
                case 15:
                    B = lang("colorstone");
                    break;
                case 16:
                    B = lang("bloodstone");
                    break;
                case 27:
                    B = lang("meigui");
                    break;
                case 28:
                    B = lang("zuanshi");
                    break;
                case 30:
                    B = lang("hunpo");
                    break;
                case 31:
                    B = lang("lanternpop_personal_money");
                    break;
                case 32:
                    B = lang("lanternpop_country_money");
                    break;
                case 33:
                    B = lang("zhangong");
                    break;
                case 35:
                    B = lang("guyu");
                    break;
                case 36:
                    B = lang("actfightpop_ticket");
                    break;
                case 37:
                    B = lang("danyao");
                    break;
                case 38:
                    B = lang("xisuidan");
                    break;
                case 39:
                    B = lang("juyuandan");
                    break;
                case 40:
                    B = lang("butiandan");
                    break;
                case 42:
                    B = lang("doggold");
                    break;
                case 63:
                    B = lang("year_gold");
                    break;
                case 64:
                    B = lang("juexingshi");
                    break;
                case 65:
                    B = lang("yuanshen");
                    break;
                case 75:
                    B = lang("shop_card");
                    break;
                case 79:
                    B = lang("fubi");
                    break;
                case 82:
                    B = lang("jinsuidan");
                    break;
                case 83:
                    B = lang("actscratchpop_play");
                    break;
                case 84:
                    B = lang("actscratchpop_nice");
                    break;
                case 87:
                    B = lang("assistcardpop_type87");
                    break;
                case 88:
                    B = lang("assistcardpop_type88");
                    break;
                case 89:
                    B = lang("assistcardpop_type89");
                    break;
                case 91:
                    B = lang("assistcardpop_type91");
                    break;
                case 95:
                    B = lang("ancientspirit");
                    break;
                case 97:
                    B = lang("doubledenierpop_christmas_bear");
                    break;
                case 98:
                    B = lang("tangguo");
                    break;
                case 99:
                    B = lang("sleevepop_martial_score");
                    break;
                case 113:
                    B = lang("sticationpop_dzstone");
                    break;
                case 114:
                    B = lang("sticationpop_lsstone");
                    break;
                case 115:
                    B = lang("sticationpop_sstone");
                    break;
                case 116:
                    B = lang("dragonboatpop_jianglign");
                    break
            }
            return B
        }, getRandomTips: function () {
            var B = [lang("tips1"), lang("tips2"), lang("tips3"), lang("tips4"), lang("tips5"), lang("tips6"), lang("tips7"), lang("tips8"), lang("tips9"), lang("tips10"), lang("tips11"), lang("tips12"), lang("tips13"), lang("tips14"), lang("tips15"), lang("tips16"), lang("tips17"), lang("tips18"), lang("tips19"), lang("tips20"), lang("tips21"), lang("tips22"), lang("tips23"), lang("tips24"), lang("tips25"), lang("tips26")];
            var A = this.getRandom(0, B.length);
            return B[A]
        }, createUUID: function (B) {
            var A = B.charCodeAt(B.length - 1);
            if (A >= 48 && A <= 57) {
                B += "_"
            }
            return B + this._counter++
        }, urlParams: function () {
            var D = {};
            var E = window.location.href;
            var B = E.indexOf("?");
            if (B > 0) {
                var A = E.substring(B + 1);
                var H = A.split("&");
                for (var C = 0, G, F; G = H[C]; C++) {
                    F = H[C] = G.split("=");
                    D[F[0]] = F.length > 1 ? F[1] : true
                }
            }
            return D
        }, getRandom: function (A, D) {
            var C = D - A;
            var B = Math.random();
            return (A + Math.round(B * C))
        }, str_repeat: function (B, C) {
            var D = "";
            for (var A = 0; A < C; A++) {
                D += B
            }
            return D
        }, array_end_key: function (B) {
            var A = null;
            for (var C in B) {
                A = C
            }
            return A
        }, array_first: function (A) {
            var C = null;
            for (var B in A) {
                C = A[B];
                if (C != null) {
                    break
                }
            }
            return C
        }, max: function (B, A) {
            return B > A ? B : A
        }, min: function (B, A) {
            return B < A ? B : A
        }, getEnemyType: function (A) {
            var B = "";
            if (A == 1) {
                B = lang("normal")
            } else {
                if (A == 2) {
                    B = lang("elite")
                } else {
                    if (A == 3) {
                        B = lang("captain")
                    } else {
                        if (A == 4) {
                            B = lang("king")
                        }
                    }
                }
            }
            return B
        }, toMove: function (B) {
            var A = this;
            A.e = $("#" + B);
            A.e.css({"z-index": 100});
            document.getElementById(B).addEventListener("touchstart", function (C) {
                A.ex = parseInt(A.e.css("left").replace("px", ""));
                A.ey = parseInt(A.e.css("top").replace("px", ""));
                A.ox = parseInt(C.touches[0].pageX);
                A.oy = parseInt(C.touches[0].pageY);
                A.e.css({"box-shadow": "1px 1px 1px #000000"})
            }, false);
            document.getElementById(B).addEventListener("touchend", function (C) {
                A.e.css({"z-index": 0});
                A.ox = 0;
                A.oy = 0;
                A.ex = 0;
                A.ey = 0;
                A.e.css({"box-shadow": "none"})
            }, false);
            document.getElementById(B).addEventListener("touchmove", function (F) {
                var C = parseInt(F.touches[0].pageX);
                var E = parseInt(F.touches[0].pageY);
                var D = C - A.ox;
                var H = E - A.oy;
                var I = A.ex + D;
                var G = A.ey + H;
                A.e.css({left: I + "px"});
                A.e.css({top: G + "px"})
            }, false)
        }, timeToString: function (C, D) {
            C = parseInt(C);
            if (D) {
                if (C < 60) {
                    return C + lang("s")
                }
            }
            if (C < 60) {
                return this.zeroPad(C, 2) + lang("s")
            }
            var E = C % 60;
            var F = (C - E) / 60;
            if (D) {
                if (F < 60) {
                    return F + lang("mins")
                }
            }
            if (F < 60) {
                return F + lang("min") + this.zeroPad(E, 2) + lang("s")
            }
            var B = F % 60;
            var A = (F - B) / 60;
            if (D) {
                if (A > 24) {
                    return Math.floor(A / 24) + lang("day")
                } else {
                    return A + lang("hour")
                }
            }
            if (A <= 24) {
                return A + lang("hour") + B + lang("min") + E + lang("s")
            } else {
                return Math.floor(A / 24) + lang("day") + " " + A % 24 + lang("hour") + B + lang("min") + E + lang("s")
            }
        }, timeToClock: function (C) {
            C = parseInt(C);
            if (C < 60) {
                return "00:" + this.zeroPad(C, 2)
            }
            var D = C % 60;
            var E = (C - D) / 60;
            if (E < 60) {
                return this.zeroPad(E, 2) + ":" + this.zeroPad(D, 2)
            }
            var B = E % 60;
            var A = (E - B) / 60;
            if (A <= 24) {
                return this.zeroPad(A, 2) + ":" + this.zeroPad(B, 2) + ":" + this.zeroPad(D, 2)
            } else {
                return Math.floor(A / 24) + lang("day") + " " + this.zeroPad(A % 24, 2) + ":" + this.zeroPad(B, 2) + ":" + this.zeroPad(D, 2)
            }
        }, zeroPad: function (B, A) {
            var C = B.toString().length;
            while (C < A) {
                B = "0" + B;
                C++
            }
            return B
        }, getItemColor: function (A) {
            A = parseInt(A);
            var B = "#FFFFFF";
            switch (A) {
                case 2:
                    B = "#09964c";
                    break;
                case 3:
                    B = "#1262bc";
                    break;
                case 4:
                    B = "#d6a600";
                    break;
                case 5:
                    B = "#8d00a2";
                    break;
                case 6:
                    B = "#c50000";
                    break;
                case 7:
                    B = "#f47920";
                    break;
                case 9:
                    B = "#c3c2cb";
                    break;
                case 10:
                    B = "#5c7870";
                    break;
                case 11:
                    B = "#4588ee";
                    break;
                case 8:
                    B = "transparent";
                    break;
                case 12:
                    B = "#95760b";
                    break;
                case 13:
                    B = "#57109f";
                    break;
                case 14:
                    B = "#6b0606";
                    break;
                case 15:
                    B = "#a24908";
                    break;
                case 16:
                    B = "#ff4200";
                    break
            }
            return B
        }, getHeroColor: function (A) {
            return this.getItemColor(A)
        }, getItemVocation: function (A) {
            if (A == 1) {
                return lang("reggie")
            } else {
                if (A == 2) {
                    return lang("counselors")
                } else {
                    return lang("universal")
                }
            }
        }, getItemPowerName: function (A) {
            var B = "";
            A = parseInt(A);
            switch (A) {
                case 1:
                    B = lang("p_attack");
                    break;
                case 2:
                    B = lang("m_attack");
                    break;
                case 3:
                    B = lang("p_defense");
                    break;
                case 4:
                    B = lang("m_defense");
                    break;
                case 5:
                    B = lang("life_num");
                    break
            }
            return B
        }, getPowerName: function (A) {
            var B = "";
            A = parseInt(A);
            switch (A) {
                case 1:
                    B = lang("p_attack");
                    break;
                case 2:
                    B = lang("p_defense");
                    break;
                case 3:
                    B = lang("m_attack");
                    break;
                case 4:
                    B = lang("m_defense");
                    break;
                case 5:
                    B = lang("teampop_all_defense");
                    break;
                case 6:
                    B = lang("teampop_all_atk");
                    break;
                case 7:
                    B = lang("teampop_all_def&atk");
                    break;
                case 8:
                    B = lang("teampop_all_atk1");
                    break;
                case 9:
                    B = lang("teampop_all_atk2");
                    break
            }
            return B
        }, getNameByMatrixId: function (B) {
            var A = "";
            switch (parseInt(B)) {
                case 1:
                    A = lang("team1");
                    break;
                case 2:
                    A = lang("team2");
                    break;
                case 3:
                    A = lang("team3");
                    break;
                case 4:
                    A = lang("team4");
                    break;
                case 5:
                    A = lang("team5");
                    break;
                case 6:
                    A = lang("team6");
                    break;
                case 7:
                    A = lang("team7");
                    break;
                case 8:
                    A = lang("team8");
                    break
            }
            return A
        }, checkNickName: function (A) {
            if (A == "") {
                xGame.toast.show(lang("nickname_not_null"));
                return false
            }
            if (A.length < 2 || A.length > 20) {
                xGame.toast.show(lang("nickname_2_20"));
                return false
            }
            return true
        }, compare: function (A) {
            return function (B, C) {
                var D = B[A];
                var E = C[A];
                if (E > D) {
                    return -1
                } else {
                    if (E < D) {
                        return 1
                    } else {
                        return 0
                    }
                }
            }
        }, getItemTypeName: function (A) {
            var B = "";
            switch (A) {
                case 1:
                    B = lang("reggie_weapons");
                    break;
                case 2:
                    B = lang("counselors_weapons");
                    break;
                case 3:
                    B = lang("armor");
                    break;
                case 4:
                    B = lang("cloak");
                    break;
                case 5:
                    B = lang("bingfu");
                    break
            }
            return B
        }, getSoulTypeName: function (A) {
            var B = "";
            switch (A) {
                case 1:
                    B = lang("shiqi");
                    break;
                case 2:
                    B = lang("wuli");
                    break;
                case 3:
                    B = lang("zhili");
                    break;
                case 4:
                    B = lang("life");
                    break;
                case 5:
                    B = lang("miss");
                    break;
                case 6:
                    B = lang("shipo");
                    break;
                case 7:
                    B = lang("crit_rate");
                    break;
                case 8:
                    B = lang("crit_damage");
                    break;
                case 9:
                    B = lang("mingzhong");
                    break;
                case 10:
                    B = lang("jingzhun");
                    break;
                case 11:
                    B = lang("kangbao");
                    break;
                case 12:
                    B = lang("kangxuanyun");
                    break;
                case 13:
                    B = lang("suit_attr29");
                    break;
                case 14:
                    B = lang("suit_attr28");
                    break;
                case 15:
                    B = lang("suit_attr20");
                    break;
                case 16:
                    B = lang("suit_attr33");
                    break;
                case 50:
                    B = lang("suit_attr50");
                    break;
                case 51:
                    B = lang("suit_attr51");
                    break
            }
            return B
        }, getBookTypeName: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("wuli");
                    break;
                case 2:
                    B = lang("zhili");
                    break;
                case 3:
                    B = lang("tili");
                    break;
                case 4:
                    B = lang("p_attack");
                    break;
                case 5:
                    B = lang("p_defense");
                    break;
                case 6:
                    B = lang("m_attack");
                    break;
                case 7:
                    B = lang("m_defense");
                    break;
                case 8:
                    B = lang("life_num");
                    break;
                case 9:
                    B = lang("miss");
                    break;
                case 10:
                    B = lang("crit_rate");
                    break;
                case 11:
                    B = lang("shipo");
                    break;
                case 12:
                    B = lang("chushishiqi");
                    break;
                case 13:
                    B = lang("mingzhong");
                    break;
                case 14:
                    B = lang("jingzhun");
                    break;
                case 15:
                    B = lang("kcrit");
                    break;
                case 16:
                    B = lang("suit_attr29");
                    break;
                case 17:
                    B = lang("suit_attr28");
                    break;
                case 18:
                    B = lang("suit_attr20");
                    break;
                case 19:
                    B = lang("suit_attr33");
                    break;
                case 20:
                    B = lang("suit_attr20");
                    break;
                case 33:
                    B = lang("suit_attr33");
                    break;
                case 50:
                    B = lang("suit_attr50");
                    break;
                case 51:
                    B = lang("suit_attr51");
                    break;
                case 53:
                    B = lang("suit_attr60");
                    break
            }
            return B
        }, getQualityName: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("normal");
                    break;
                case 2:
                    B = lang("strengthen");
                    break;
                case 3:
                    B = lang("advanced");
                    break;
                case 4:
                    B = lang("whitegold");
                    break;
                case 5:
                    B = lang("extreme");
                    break;
                case 6:
                    B = lang("myth");
                    break;
                case 7:
                    B = lang("legend");
                    break
            }
            return B
        }, checkUserName: function (B) {
            var A = new RegExp("^[A-Za-z0-9]+$");
            if (B == "") {
                xGame.toast.show(lang("account_null"));
                return false
            } else {
                if (B.length < 4 || B.length > 16 || !A.test(B)) {
                    xGame.toast.show(lang("account_rule"));
                    return false
                } else {
                    return true
                }
            }
        }, checkPassWord: function (A) {
            var B = new RegExp("^[A-Za-z0-9]+$");
            if (A == "") {
                xGame.toast.show(lang("password_not_null"));
                return false
            } else {
                if (A.length < 6 || A.length > 16 || !B.test(A)) {
                    xGame.toast.show(lang("password_rule"));
                    return false
                } else {
                    return true
                }
            }
        }, checkTel: function (A) {
            if (A == "" || _inArray([3, 100, 153, 154], channelID)) {
                return true
            }
            if (/^1[3|4|5|8][0-9]\d{8}$/.test(A)) {
                return true
            } else {
                xGame.toast.show(lang("tel_rule"));
                return false
            }
        }, checkStr: function (A) {
            return true
        }, creatBox: function () {
            var F = this;
            var A = "";
            var D = ["left", "right"];
            for (var E = 0; E < D.length; E++) {
                var H = battle_pos[D[E]];
                for (var C in H) {
                    var G = H[C];
                    A += '<div type="' + D[E] + '" pos="' + C + '" class="groundbox" style="z-index:100;width:80px;height:100px;position:absolute;top:' + (G.y - 100) + "px;left:" + (G.x - 40) + 'px;"></div>'
                }
            }
            var B;
            $("#container").append(A);
            $("#container").undelegate(".groundbox", "touchstart").delegate(".groundbox", "touchstart", function () {
                var J = $(this).attr("pos");
                var I = $(this).attr("type");
                if (sprites[I][J] != undefined) {
                    B = $($.template("attackpop_tmpl"));
                    $("#container").append(B);
                    var M = {left: battle_pos[I][J].x, top: battle_pos[I][J].y};
                    var L = sprites[I][J].blood == 0 ? 0 : sprites[I][J].blood / sprites[I][J].allblood * 124;
                    var K = sprites[I][J].power == 0 ? 0 : sprites[I][J].power / 100 * 124;
                    if (I == "left") {
                        B.css({"top": M.top - 114, "left": M.left + 50})
                    } else {
                        B.css({"top": M.top - 114, "left": M.left - 350})
                    }
                    B.find(".img").css({"background": "url(" + xGame.avatar(sprites[I][J].herodata.image) + ") 0 0 no-repeat"});
                    B.find(".name").html(sprites[I][J].name);
                    B.find(".blood").find("em").css({"width": L});
                    B.find(".rage").find("em").css({"width": K});
                    B.find(".level").html("Lv." + sprites[I][J].herodata.level);
                    B.find(".skill").html(lang("skill") + "：" + sprites[I][J].herodata.skill);
                    B.show()
                } else {
                    console.log(lang("site_no_body"))
                }
            }).undelegate(".groundbox", "touchend").delegate(".groundbox", "touchend", function () {
                if (B != null) {
                    B.remove();
                    B = null
                }
            })
        }, lang: function (A, C) {
            var D = "";
            if (typeof lang[A] != "undefined") {
                D = lang[A];
                if (typeof C != "undefined") {
                    for (var B = 0; B < C.length; B++) {
                        D = D.replace("{" + (B + 1) + "}", C[B])
                    }
                }
            }
            return D
        }, getHorsePostion: function (A, C) {
            if (C == 100) {
                C = 23
            } else {
                if (C == 101) {
                    C = 24
                } else {
                    if (C == 102) {
                        C = 25
                    } else {
                        if (C == 103) {
                            C = 26
                        } else {
                            if (C == 104) {
                                C = 27
                            } else {
                                if (C == 105) {
                                    C = 28
                                } else {
                                    if (C == 106) {
                                        C = 29
                                    } else {
                                        if (C == 107) {
                                            C = 30
                                        } else {
                                            if (C == 108) {
                                                C = 31
                                            } else {
                                                if (C == 109) {
                                                    C = 32
                                                } else {
                                                    if (C == 110) {
                                                        C = 33
                                                    } else {
                                                        if (C == 111) {
                                                            C = 34
                                                        } else {
                                                            if (C == 112) {
                                                                C = 35
                                                            } else {
                                                                if (C == 113) {
                                                                    C = 36
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var D = 0;
            var E = 0;
            var F = 0;
            var B = 0;
            if (A == "big") {
                F = 170;
                B = 184
            } else {
                if (A == "small") {
                    F = 100;
                    B = 100
                } else {
                    if (A == "buff") {
                        F = 45;
                        B = 40
                    }
                }
            }
            D = (C - 1) % 6 * F * -1;
            E = (Math.ceil(C / 6) - 1) * B * -1;
            return D + "px " + E + "px"
        }, getHeroPostion: function (A, B) {
            return A + "px " + B + "px"
        }, chatClean: function (B) {
            var A = /[^\u4E00-\u9FA5\uf900-\ufa2d]/g;
            return B.replace(A, "")
        }, animate: function (I, T, H, R, B) {
            var S = [];
            var O = [];
            var D = [];
            var J = [];
            var C = 0;
            var F = Math.ceil(parseFloat(H) / 20);
            var A = 0;
            var U = I.length;
            var M = null;
            var Q = R.split(".");
            var P = null;
            if (R == "Linear") {
                P = this.Tween.Linear
            } else {
                P = this.Tween[Q[0]][Q[1]]
            }
            var K = [];
            for (var G in T) {
                D.push(G);
                for (var E = 0; E < U; E++) {
                    K.push(parseFloat($(I[E]).css(G)))
                }
                S.push(K);
                K = [];
                O.push(parseFloat(T[G]))
            }
            A = S.length;
            for (var G = 0; G < A; G++) {
                for (var E = 0; E < U; E++) {
                    K.push(O[G] - S[G][E])
                }
                J.push(K);
                K = []
            }
            K = null;

            function N() {
                M = null;
                S = null;
                O = null;
                J = null;
                D = null;
                Q = null;
                P = null;
                I = null;
                T = null;
                B = null
            }

            function L() {
                for (var V = 0; V < A; V++) {
                    for (var W = 0; W < U; W++) {
                        $(I[W]).css(D[V], P(C, S[V][W], J[V][W], F).toFixed(2) + "px")
                    }
                }
                C++;
                if (C < F) {
                    M = setTimeout(L, 20)
                } else {
                    clearTimeout(M);
                    for (var V = 0; V < A; V++) {
                        I.css(D[V], O[V] + "px")
                    }
                    if (B) {
                        B()
                    }
                    N()
                }
            }

            L()
        }, animate3D: function (I, U, H, S, B) {
            var T = [];
            var P = U;
            var J = [];
            var L = [];
            var D = 0;
            var F = Math.ceil(parseInt(H) / 20);
            var A = 6;
            var V = I.length;
            var M = null;
            var R = S.split(".");
            var Q = null;
            if (S == "Linear") {
                Q = this.Tween.Linear
            } else {
                Q = this.Tween[R[0]][R[1]]
            }
            var C = null;
            var N = [];
            for (var G = 0; G < V; G++) {
                C = $(I[G]).css("-webkit-transform");
                if (C != "none") {
                    C = C.slice(7, -1);
                    C = C.split(",");
                    for (var E = 0; E < A; E++) {
                        N[E] = parseFloat(C[E])
                    }
                    T.push(N);
                    N = []
                } else {
                    T.push([1, 0, 0, 1, 0, 0])
                }
            }
            for (var G = 0; G < V; G++) {
                for (var E = 0; E < A; E++) {
                    N[E] = P[E] - T[G][E]
                }
                J.push(N);
                N = []
            }
            N = null;

            function O() {
                M = null;
                T = null;
                P = null;
                J = null;
                L = null;
                C = null;
                R = null;
                Q = null;
                I = null;
                U = null;
                B = null
            }

            function K() {
                for (var W = 0; W < V; W++) {
                    for (var X = 0; X < A; X++) {
                        if (J[W][X] == 0) {
                            L[X] = T[W][X]
                        } else {
                            L[X] = Q(D, T[W][X], J[W][X], F).toFixed(4)
                        }
                    }
                    $(I[W]).css("-webkit-transform", "matrix(" + L.toString() + ")");
                    L = []
                }
                D++;
                if (D < F) {
                    M = setTimeout(K, 20)
                } else {
                    clearTimeout(M);
                    for (var W = 0; W < A; W++) {
                        I.css("-webkit-transform", "matrix(" + U.toString() + ")")
                    }
                    if (B) {
                        B()
                    }
                    O()
                }
            }

            K()
        }, newConvert: function (A) {
            var B = A;
            var C = parseInt(B);
            if (C >= 1000000000) {
                return Math.floor(parseInt(C) / 100000000) + lang("nian_yi")
            } else {
                if (C >= 1000000) {
                    return Math.floor(parseInt(C) / 10000) + lang("10k")
                } else {
                    return B
                }
            }
        }, convertWan: function (A) {
            var B = A;
            var C = parseInt(B);
            if (C >= 100000000) {
                return Math.floor(parseInt(C) / 100000000) + lang("nian_yi")
            } else {
                if (C >= 100000) {
                    return Math.floor(parseInt(C) / 10000) + lang("10k")
                } else {
                    return B
                }
            }
        }, getNewEquipInfo: function (C, A) {
            var B = "";
            switch (parseInt(C)) {
                case 1:
                    if (A == "title") {
                        B = lang("normal")
                    } else {
                        if (A == "des") {
                            B = lang("newEquip_des1")
                        }
                    }
                    break;
                case 2:
                    if (A == "title") {
                        B = lang("newEquip_title2")
                    } else {
                        if (A == "des") {
                            B = lang("newEquip_des2")
                        }
                    }
                    break;
                case 3:
                    if (A == "title") {
                        B = lang("newEquip_title3")
                    } else {
                        if (A == "des") {
                            B = lang("newEquip_des3")
                        }
                    }
                    break;
                case 4:
                    if (A == "title") {
                        B = lang("newEquip_title4")
                    } else {
                        if (A == "des") {
                            B = lang("newEquip_des4")
                        }
                    }
                    break;
                default:
                    if (A == "title") {
                        B = lang("no")
                    } else {
                        if (A == "des") {
                            B = lang("newEquip_des0")
                        }
                    }
                    break
            }
            return B
        }, getSuitAttr: function (A, C) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("wuli") + "+" + C;
                    break;
                case 2:
                    B = lang("zhili") + "+" + C;
                    break;
                case 3:
                    B = lang("tili") + "+" + C;
                    break;
                case 4:
                    B = lang("life") + "+" + C;
                    break;
                case 5:
                    B = lang("p_attack") + "+" + C;
                    break;
                case 6:
                    B = lang("p_defense") + "+" + C;
                    break;
                case 7:
                    B = lang("m_attack") + "+" + C;
                    break;
                case 8:
                    B = lang("m_defense") + "+" + C;
                    break;
                case 9:
                    B = lang("crit_rate") + "+" + C;
                    break;
                case 10:
                    B = lang("crit_damage") + "+" + C;
                    break;
                case 11:
                    B = lang("jingzhun") + "+" + C;
                    break;
                case 12:
                    B = lang("mingzhong") + "+" + C;
                    break;
                case 13:
                    B = lang("miss") + "+" + C;
                    break;
                case 14:
                    B = lang("shipo") + "+" + C;
                    break;
                case 15:
                    B = lang("shiqi") + "+" + C;
                    break;
                case 16:
                    B = lang("kangxuanyun") + "+" + C;
                    break;
                case 17:
                    B = lang("kangbao") + "+" + C;
                    break;
                case 18:
                    B = lang("wuli") + "、" + lang("zhili") + "、" + lang("tili") + "+" + C;
                    break;
                case 19:
                    B = lang("suit_attr19", [C]);
                    break;
                case 20:
                    B = lang("suit_attr20") + "+" + C;
                    break;
                case 21:
                    B = lang("suit_attr21") + "+" + C;
                    break;
                case 22:
                    B = lang("suit_attr22") + "+" + C;
                    break;
                case 23:
                    B = lang("suit_attr23", [C]);
                    break;
                case 24:
                    B = lang("suit_attr24", [C]);
                    break;
                case 25:
                    B = lang("suit_attr25", [C]);
                    break;
                case 26:
                    B = lang("suit_attr26", [C]);
                    break;
                case 27:
                    B = lang("suit_attr27", [C]);
                    break;
                case 28:
                    B = lang("suit_attr28") + "+" + C;
                    break;
                case 29:
                    B = lang("suit_attr29") + "+" + C;
                    break;
                case 30:
                    B = lang("suit_attr30") + "+" + C;
                    break;
                case 31:
                    B = lang("suit_attr31") + "+" + C;
                    break;
                case 32:
                    B = lang("suit_attr32", [C]);
                    break;
                case 33:
                    B = lang("suit_attr33_copy", [C]);
                    break;
                case 34:
                    B = lang("suit_attr34", [C]);
                    break;
                case 35:
                    B = lang("suit_attr35") + "+" + C;
                    break;
                case 36:
                    B = lang("suit_attr36") + "+" + C;
                    break;
                case 37:
                    B = lang("suit_attr37") + "+" + C;
                    break;
                case 38:
                    B = lang("suit_attr38") + "+" + C;
                    break;
                case 39:
                    B = lang("suit_attr39") + "+" + C;
                    break;
                case 40:
                    B = lang("suit_attr40") + "+" + C;
                    break;
                case 41:
                    B = lang("suit_attr41") + "+" + C;
                    break;
                case 42:
                    B = lang("suit_attr42") + "+" + C;
                    break;
                case 43:
                    B = lang("suit_attr43") + "+" + C;
                    break;
                case 44:
                    B = lang("suit_attr44", [C]);
                    break;
                case 45:
                    B = lang("suit_attr45", [C]);
                    break;
                case 46:
                    B = lang("suit_attr46", [C]);
                    break;
                case 47:
                    B = lang("suit_attr47", [C]);
                    break;
                case 48:
                    B = lang("suit_attr48", [C]);
                    break;
                case 49:
                    B = lang("suit_attr49") + "+" + C;
                    break;
                case 50:
                    B = lang("suit_attr50") + "+" + C;
                    break;
                case 51:
                    B = lang("suit_attr51") + "+" + C;
                    break;
                case 52:
                    B = lang("suit_attr52") + "+" + C + "%";
                    break;
                case 53:
                    B = lang("suit_attr53", [C]);
                    break;
                case 54:
                    B = lang("suit_attr54", [C]);
                    break;
                case 55:
                    B = lang("suit_attr55", [C]);
                    break;
                case 56:
                    B = lang("suit_attr56", [C]);
                    break;
                case 57:
                    B = lang("suit_attr57", [C]);
                    break;
                case 58:
                    B = lang("suit_attr58");
                    break;
                case 59:
                    B = lang("suit_attr59", [C]);
                    break;
                case 60:
                    B = lang("suit_attr60") + "+" + C;
                    break;
                case 61:
                    B = lang("suit_attr61") + "+" + C;
                    break;
                case 62:
                    B = lang("suit_attr62") + "+" + C;
                    break;
                case 63:
                    B = lang("suit_attr63", [C]);
                    break;
                case 64:
                    B = lang("suit_attr64", [C]);
                    break;
                case 65:
                    B = lang("suit_attr65", [C]);
                    break;
                case 66:
                    B = lang("suit_attr66", [C]);
                    break;
                case 67:
                    B = lang("suit_attr67", [C]);
                    break;
                case 68:
                    B = lang("suit_attr68", [C]);
                    break;
                case 69:
                    B = lang("suit_attr69", [C]);
                    break;
                case 70:
                    B = lang("suit_attr70", [C]);
                    break;
                case 71:
                    B = lang("suit_attr71", [C]);
                    break;
                case 72:
                    B = lang("suit_attr72");
                    break;
                default:
                    break
            }
            return B
        }, getAttrs: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("wuli");
                    break;
                case 2:
                    B = lang("zhili");
                    break;
                case 3:
                    B = lang("tili");
                    break;
                case 4:
                    B = lang("life");
                    break;
                case 5:
                    B = lang("p_attack");
                    break;
                case 6:
                    B = lang("p_defense");
                    break;
                case 7:
                    B = lang("m_attack");
                    break;
                case 8:
                    B = lang("m_defense");
                    break;
                case 9:
                    B = lang("crit_rate");
                    break;
                case 10:
                    B = lang("crit_damage");
                    break;
                case 11:
                    B = lang("jingzhun");
                    break;
                case 12:
                    B = lang("mingzhong");
                    break;
                case 13:
                    B = lang("miss");
                    break;
                case 14:
                    B = lang("shipo");
                    break;
                case 15:
                    B = lang("shiqi");
                    break;
                case 16:
                    B = lang("kangxuanyun");
                    break;
                case 17:
                    B = lang("kangbao");
                    break;
                case 18:
                    B = lang("wuli") + "、" + lang("zhili") + "、" + lang("tili");
                    break;
                case 20:
                    B = lang("suit_attr20");
                    break;
                case 21:
                    B = lang("suit_attr21");
                    break;
                case 22:
                    B = lang("suit_attr22");
                    break;
                case 28:
                    B = lang("suit_attr28");
                    break;
                case 29:
                    B = lang("suit_attr29");
                    break;
                case 30:
                    B = lang("suit_attr30");
                    break;
                case 31:
                    B = lang("suit_attr31");
                    break;
                case 33:
                    B = lang("suit_attr33");
                    break;
                case 35:
                    B = lang("suit_attr35");
                    break;
                case 36:
                    B = lang("suit_attr36");
                    break;
                case 37:
                    B = lang("suit_attr37");
                    break;
                case 38:
                    B = lang("suit_attr38");
                    break;
                case 39:
                    B = lang("suit_attr39");
                    break;
                case 40:
                    B = lang("suit_attr40");
                    break;
                case 41:
                    B = lang("suit_attr41");
                    break;
                case 42:
                    B = lang("suit_attr42");
                    break;
                case 43:
                    B = lang("attack_force");
                    break;
                case 44:
                    B = lang("defense_force");
                    break;
                case 50:
                    B = lang("suit_attr50");
                    break;
                case 51:
                    B = lang("suit_attr51");
                    break;
                case 60:
                    B = lang("suit_attr60");
                    break;
                case 61:
                    B = lang("suit_attr61");
                    break;
                case 62:
                    B = lang("suit_attr62");
                    break;
                default:
                    break
            }
            return B
        }, sticationgetAttrs: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("wuli");
                    break;
                case 2:
                    B = lang("zhili");
                    break;
                case 3:
                    B = lang("tili");
                    break;
                case 4:
                    B = lang("life");
                    break;
                case 5:
                    B = lang("p_attack");
                    break;
                case 6:
                    B = lang("p_defense");
                    break;
                case 7:
                    B = lang("m_attack");
                    break;
                case 8:
                    B = lang("m_defense");
                    break;
                case 9:
                    B = lang("crit_rate");
                    break;
                case 10:
                    B = lang("crit_damage");
                    break;
                case 11:
                    B = lang("jingzhun");
                    break;
                case 12:
                    B = lang("mingzhong");
                    break;
                case 13:
                    B = lang("miss");
                    break;
                case 14:
                    B = lang("shipo");
                    break;
                case 15:
                    B = lang("shiqi");
                    break;
                case 16:
                    B = lang("kangxuanyun");
                    break;
                case 17:
                    B = lang("kangbao");
                    break;
                case 18:
                    B = lang("wuli") + "、" + lang("zhili") + "、" + lang("tili");
                    break;
                case 19:
                    B = lang("xixue");
                    break;
                case 20:
                    B = lang("suit_attr20");
                    break;
                case 21:
                    B = lang("suit_attr21");
                    break;
                case 22:
                    B = lang("suit_attr22");
                    break;
                case 23:
                    B = lang("qingqi");
                    break;
                case 24:
                    B = lang("huiqi");
                    break;
                case 25:
                    B = lang("touqi");
                    break;
                case 26:
                    B = lang("mianshang");
                    break;
                case 28:
                    B = lang("zhansha");
                    break;
                case 29:
                    B = lang("fanji");
                    break;
                case 30:
                    B = lang("suit_attr30");
                    break;
                case 31:
                    B = lang("suit_attr31");
                    break;
                case 33:
                    B = lang("suit_attr33");
                    break;
                case 35:
                    B = lang("suit_attr35");
                    break;
                case 36:
                    B = lang("suit_attr36");
                    break;
                case 37:
                    B = lang("suit_attr37");
                    break;
                case 38:
                    B = lang("suit_attr38");
                    break;
                case 39:
                    B = lang("suit_attr39");
                    break;
                case 40:
                    B = lang("suit_attr40");
                    break;
                case 41:
                    B = lang("suit_attr41");
                    break;
                case 42:
                    B = lang("suit_attr42");
                    break;
                case 43:
                    B = lang("attack_force");
                    break;
                case 44:
                    B = lang("defense_force");
                    break;
                case 50:
                    B = lang("suit_attr50");
                    break;
                case 51:
                    B = lang("suit_attr51");
                    break;
                case 52:
                    B = lang("life");
                    break;
                case 60:
                    B = lang("suit_attr60");
                    break;
                case 61:
                    B = lang("suit_attr61");
                    break;
                case 62:
                    B = lang("suit_attr62");
                    break;
                default:
                    break
            }
            return B
        }, awakenAttrs: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("awakencopypop_attr1");
                    break;
                case 2:
                    B = lang("awakencopypop_attr2");
                    break;
                case 3:
                    B = lang("awakencopypop_attr3");
                    break;
                case 4:
                    B = lang("life");
                    break;
                case 5:
                    B = lang("p_attack");
                    break;
                case 6:
                    B = lang("awakencopypop_attr6");
                    break;
                case 7:
                    B = lang("m_attack");
                    break;
                case 8:
                    B = lang("awakencopypop_attr8");
                    break;
                case 9:
                    B = lang("awakencopypop_attr9");
                    break;
                case 10:
                    B = lang("awakencopypop_attr10");
                    break;
                case 11:
                    B = lang("jingzhun");
                    break;
                case 12:
                    B = lang("awakencopypop_attr12");
                    break;
                case 13:
                    B = lang("awakencopypop_attr13");
                    break;
                case 14:
                    B = lang("shipo");
                    break;
                case 15:
                    B = lang("shiqi");
                    break;
                case 16:
                    B = lang("kangxuanyun");
                    break;
                case 17:
                    B = lang("awakencopypop_attr17");
                    break;
                case 18:
                    B = lang("wuli") + "、" + lang("zhili") + "、" + lang("tili");
                    break;
                case 20:
                    B = lang("awakencopypop_attr20");
                    break;
                case 21:
                    B = lang("awakencopypop_attr21");
                    break;
                case 22:
                    B = lang("suit_attr22");
                    break;
                case 28:
                    B = lang("suit_attr28");
                    break;
                case 29:
                    B = lang("suit_attr29");
                    break;
                case 30:
                    B = lang("suit_attr30");
                    break;
                case 31:
                    B = lang("suit_attr31");
                    break;
                case 35:
                    B = lang("awakencopypop_attr35");
                    break;
                case 36:
                    B = lang("awakencopypop_attr36");
                    break;
                case 37:
                    B = lang("suit_attr37");
                    break;
                case 38:
                    B = lang("suit_attr38");
                    break;
                case 39:
                    B = lang("suit_attr39");
                    break;
                case 40:
                    B = lang("suit_attr40");
                    break;
                case 41:
                    B = lang("suit_attr41");
                    break;
                case 42:
                    B = lang("suit_attr42");
                    break;
                case 43:
                    B = lang("awakencopypop_attr43");
                    break;
                default:
                    break
            }
            return B
        }, getAttrsNew: function (A) {
            var B = "";
            switch (parseInt(A)) {
                case 1:
                    B = lang("wuli");
                    break;
                case 2:
                    B = lang("zhili");
                    break;
                case 3:
                    B = lang("tili");
                    break;
                case 4:
                    B = lang("life_num");
                    break;
                case 5:
                    B = lang("p_attack");
                    break;
                case 6:
                    B = lang("p_defense");
                    break;
                case 7:
                    B = lang("m_attack");
                    break;
                case 8:
                    B = lang("m_defense");
                    break;
                case 9:
                    B = lang("crit_rate");
                    break;
                case 10:
                    B = lang("crit_damage");
                    break;
                case 11:
                    B = lang("jingzhun");
                    break;
                case 12:
                    B = lang("mingzhong");
                    break;
                case 13:
                    B = lang("miss");
                    break;
                case 14:
                    B = lang("shipo");
                    break;
                case 15:
                    B = lang("shiqi");
                    break;
                case 16:
                    B = lang("kangxuanyun");
                    break;
                case 17:
                    B = lang("kangbao");
                    break;
                case 18:
                    B = lang("wuli") + "、" + lang("zhili") + "、" + lang("tili");
                    break;
                case 20:
                    B = lang("suit_attr20");
                    break;
                case 21:
                    B = lang("suit_attr21");
                    break;
                case 22:
                    B = lang("suit_attr22");
                    break;
                case 28:
                    B = lang("suit_attr28");
                    break;
                case 29:
                    B = lang("suit_attr29");
                    break;
                case 30:
                    B = lang("suit_attr30");
                    break;
                case 31:
                    B = lang("suit_attr31");
                    break;
                case 33:
                    B = lang("suit_attr33");
                    break;
                case 35:
                    B = lang("suit_attr35");
                    break;
                case 36:
                    B = lang("suit_attr36");
                    break;
                case 37:
                    B = lang("suit_attr37");
                    break;
                case 38:
                    B = lang("suit_attr38");
                    break;
                case 39:
                    B = lang("suit_attr39");
                    break;
                case 40:
                    B = lang("suit_attr40");
                    break;
                case 41:
                    B = lang("suit_attr41");
                    break;
                case 42:
                    B = lang("suit_attr42");
                    break;
                case 43:
                    B = lang("attack_force");
                    break;
                case 44:
                    B = lang("defense_force");
                    break;
                case 50:
                    B = lang("suit_attr50");
                    break;
                case 51:
                    B = lang("suit_attr51");
                    break;
                case 52:
                    B = lang("life");
                    break;
                case 53:
                    B = lang("pvpmingzhong");
                    break;
                case 54:
                    B = lang("pvpjingzhun");
                    break;
                case 55:
                    B = lang("pvpshanbi");
                    break;
                case 56:
                    B = lang("pvpshipo");
                    break;
                case 57:
                    B = lang("pvp_crit_damage");
                    break;
                case 58:
                    B = lang("pvp_suit_attr20");
                    break;
                case 59:
                    B = lang("pvp_suit_attr21");
                    break;
                case 60:
                    B = lang("suit_attr60");
                    break;
                default:
                    break
            }
            return B
        }, getJadeColor: function (A) {
            A = parseInt(A);
            var B = "#FFFFFF";
            switch (A) {
                case 2:
                    B = "#09964c";
                    break;
                case 3:
                    B = "#1262bc";
                    break;
                case 4:
                    B = "#d6a600";
                    break;
                case 5:
                    B = "#8d00a2";
                    break;
                case 6:
                    B = "#ecdfd1";
                    break;
                case 7:
                    B = "#f84546";
                    break;
                case 8:
                    B = "#fb6a1e";
                    break;
                case 9:
                    B = "#c9545f";
                    break;
                case 10:
                    B = "#c2c2c2";
                    break
            }
            return B
        }, rewardInfoHtml: function (D, A, C) {
            var B = "";
            if (parseInt(A) == 8) {
                B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image: url(' + xGame.itemurl(C.id) + ');"></span>'
            } else {
                if (parseInt(A) == 12 || parseInt(A) == 67) {
                    B += '<span class="rtype heros rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.avatar(C.image) + ');"></span>';
                    if (parseInt(A) == 67) {
                        B += '<em class="debristip"></em>'
                    }
                } else {
                    if ((parseInt(A) >= 17 && parseInt(A) <= 25) || (parseInt(A) >= 100 && parseInt(A) <= 108)) {
                        B += '<span class="rtype essence rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.essence(C.id) + ');"></span>'
                    } else {
                        if (parseInt(A) == 26 || parseInt(A) == 34) {
                            B += '<span class="rtype horse rtype' + A + '" id="addrtype' + A + '" typeid="' + A + '" rewardInfo=' + C + '  style="background-position:' + helper.getHorsePostion("small", C.id) + ';"></span>'
                        } else {
                            if (parseInt(A) == 29) {
                                B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.forgeMaterial(C.materials_id) + ');"></span>'
                            } else {
                                if (parseInt(A) == 45) {
                                    B += '<span class="rtype drune rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.drumurl(C.id) + ');"></span>'
                                } else {
                                    if ((parseInt(A) >= 46 && parseInt(A) <= 49) || (parseInt(A) >= 53 && parseInt(A) <= 56)) {
                                        B += '<span class="rtype stone rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.gem(C.gem_type, C.gem_quality) + ');"></span>'
                                    } else {
                                        if (parseInt(A) == 50) {
                                            B += '<span class="rtype soul rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(http://img2.hanjiangsanguo.com/hjimg/pop/soul_' + C.image + '.png);"></span>'
                                        } else {
                                            if (parseInt(A) == 52) {
                                                B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.runeurl(C.type, Math.ceil(parseInt(C.quality) / 5)) + ');"></span>'
                                            } else {
                                                if (parseInt(A) == 73) {
                                                    B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.awankeImg(C.image) + ');"></span>'
                                                } else {
                                                    if (parseInt(A) == 62) {
                                                        B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.charioturl(C.img) + ');"></span>'
                                                    } else {
                                                        if (parseInt(A) == 85) {
                                                            B += '<span class="rtype wuzi rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" id="addrtype' + A + "_" + D["param"] + '"></span>'
                                                        } else {
                                                            if (parseInt(A) == 86) {
                                                                B += '<span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.avatar(C.imageid) + ');"><em class="card_type type' + C.card_type + '"></em></span>'
                                                            } else {
                                                                if (parseInt(A) == 90) {
                                                                    B += '<span class="card_type' + C.card_type + '"></span><span class="rtype rtype' + A + '" typeid="' + A + '" rewardInfo="' + C + '" style="background-image:url(' + xGame.avatar(C.imageid) + ');"><span class="itempart"></span></span>'
                                                                } else {
                                                                    if (parseInt(A) == 111) {
                                                                        if (parseInt(D["param"]) != 13) {
                                                                            B += '<span class="rtype rtype' + A + '" id="addrtype' + A + "_" + D["param"] + '"></span>'
                                                                        }
                                                                    } else {
                                                                        B += '<span class="rtype wuzi rtype' + A + '" id="addrtype' + A + '"></span>'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return B
        }, rewardMsg: function (F, A, D, C) {
            var B = "";
            B += lang("acteggpairpop_congratulation");
            if (A != 0) {
                if (parseInt(A) == 8) {
                    B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image: url(" + xGame.itemurl(D.id) + ');">' + D.name + "x" + C + "</span>"
                } else {
                    if (parseInt(A) == 12 || parseInt(A) == 67) {
                        B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.avatar(D.image) + ');">';
                        if (parseInt(A) == 67) {
                            B += lang("debris", [D.name]) + "x" + C
                        } else {
                            B += D.name
                        }
                        B += "</span>"
                    } else {
                        if ((parseInt(A) >= 17 && parseInt(A) <= 25) || (parseInt(A) >= 100 && parseInt(A) <= 108)) {
                            B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.essence(D.id) + ');">' + D.name + "x" + C + "</span>"
                        } else {
                            if (parseInt(A) == 26 || parseInt(A) == 34) {
                                B += '<span id="buy_deity" class="' + (parseInt(D.quality) == 8 ? "colorwords" : "") + '" style="color:' + helper.getItemColor(D.quality) + ';">';
                                if (parseInt(A) == 34) {
                                    B += lang("debris", [D.name]) + "x" + C
                                } else {
                                    B += D.name + "x" + C
                                }
                                B += "</span>"
                            } else {
                                if (parseInt(A) == 29) {
                                    B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.forgeMaterial(D.materials_id) + ');">' + D.name + "x" + C + "</span>"
                                } else {
                                    if (parseInt(A) == 45) {
                                        B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.drumurl(D.id) + ');">' + D.name + "x" + C + "</span>"
                                    } else {
                                        if ((parseInt(A) >= 46 && parseInt(A) <= 49) || (parseInt(A) >= 53 && parseInt(A) <= 56)) {
                                            B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.gem(D.gem_type, D.gem_quality) + ');">' + D.name + "x" + C + "</span>"
                                        } else {
                                            if (parseInt(A) == 50) {
                                                B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(http://img2.hanjiangsanguo.com/hjimg/pop/soul_" + D.image + '.png);">' + D.name + "x" + C + "</span>"
                                            } else {
                                                if (parseInt(A) == 52) {
                                                    B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.runeurl(D.type, Math.ceil(parseInt(D.quality) / 5)) + ');">' + D.name + "x" + C + "</span>"
                                                } else {
                                                    if (parseInt(A) == 73) {
                                                        B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.awankeImg(D.image) + ');">' + D.name + "x" + C + "</span>"
                                                    } else {
                                                        if (parseInt(A) == 85) {
                                                            B += '<span id="buy_deity' + A + "_" + F["param"] + '">x' + C + "</span>"
                                                        } else {
                                                            if (parseInt(A) == 86) {
                                                                if (D.card_type == 1) {
                                                                    var E = D.card_name + lang("assistcardpop_type1")
                                                                } else {
                                                                    var E = D.card_name + lang("assistcardpop_type2")
                                                                }
                                                                B += '<span id="buy_deity" style="color:' + (parseInt(D.quality) == 8 ? "#ff0060" : helper.getItemColor(D.quality)) + ";background-image:url(" + xGame.avatar(D.imageid) + ');">' + E + "x" + C + "</span>"
                                                            } else {
                                                                if (parseInt(A) == 111) {
                                                                    if (parseInt(F["param"]) != 13) {
                                                                        B += '<span id="buy_deity' + A + "_" + F["param"] + '" >x' + C + "</span>"
                                                                    }
                                                                } else {
                                                                    B += '<span id="buy_deity' + A + '">x' + C + "</span>"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return B
        },
    }
})();
var helper = new helperClass;