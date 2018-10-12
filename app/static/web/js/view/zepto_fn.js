(function($) {
    var jsonpID = 0,
    isObject = $.isObject,
    document = window.document,
    key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = "application/json",
    htmlType = "text/html",
    blankRE = /^\s*$/;
    function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName);
        $(context).trigger(event, data);
        return ! event.defaultPrevented
    }
    function triggerGlobal(settings, context, eventName, data) {
        if (settings.global) {
            return triggerAndReturn(context || document, eventName, data)
        }
    }
    $.active = 0;
    function ajaxStart(settings) {
        if (settings.global && $.active++===0) {
            triggerGlobal(settings, null, "ajaxStart")
        }
    }
    function ajaxStop(settings) {
        if (settings.global && !(--$.active)) {
            triggerGlobal(settings, null, "ajaxStop")
        }
    }
    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === false) {
            return false
        }
        triggerGlobal(settings, context, "ajaxSend", [xhr, settings])
    }
    function ajaxSuccess(data, xhr, settings) {
        var context = settings.context,
        status = "success";
        settings.success.call(context, data, status, xhr);
        triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
        ajaxComplete(status, xhr, settings)
    }
    function ajaxError(error, type, xhr, settings) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error);
        triggerGlobal(settings, context, "ajaxError", [xhr, settings, error]);
        ajaxComplete(type, xhr, settings)
    }
    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status);
        triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
        ajaxStop(settings)
    }
    function empty() {}
    $.ajaxJSONP = function(options) {
        var callbackName = "jsonp" + (++jsonpID),
        script = document.createElement("script"),
        abort = function() {
            $(script).remove();
            if (callbackName in window) {
                window[callbackName] = empty
            }
            ajaxComplete("abort", xhr, options)
        },
        xhr = {
            abort: abort
        },
        abortTimeout;
        if (options.error) {
            script.onerror = function() {
                xhr.abort();
                options.error()
            }
        }
        window[callbackName] = function(data) {
            clearTimeout(abortTimeout);
            $(script).remove();
            delete window[callbackName];
            ajaxSuccess(data, xhr, options)
        };
        serializeData(options);
        script.src = options.url.replace(/=\?/, "=" + callbackName);
        $("head").append(script);
        if (options.timeout > 0) {
            abortTimeout = setTimeout(function() {
                xhr.abort();
                ajaxComplete("timeout", xhr, options)
            },
            options.timeout)
        }
        return xhr
    };
    $.ajaxSettings = {
        type: "GET",
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        context: null,
        global: true,
        xhr: function() {
            return new window.XMLHttpRequest()
        },
        accepts: {
            script: "text/javascript, application/javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        crossDomain: false,
        timeout: 0
    };
    function mimeToDataType(mime) {
        return mime && (mime == htmlType ? "html": mime == jsonType ? "json": scriptTypeRE.test(mime) ? "script": xmlTypeRE.test(mime) && "xml") || "text"
    }
    function appendQuery(url, query) {
        return (url + "&" + query).replace(/[&?]{1,2}/, "?")
    }
    function serializeData(options) {
        if (isObject(options.data)) {
            options.data = $.param(options.data)
        }
        if (options.data && (!options.type || options.type.toUpperCase() == "GET")) {
            options.url = appendQuery(options.url, options.data)
        }
    }
    $.ajax = function(options) {
        var settings = $.extend({},
        options || {});
        for (key in $.ajaxSettings) {
            if (settings[key] === undefined) {
                settings[key] = $.ajaxSettings[key]
            }
        }
        ajaxStart(settings);
        if (!settings.crossDomain) {
            settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host
        }
        var dataType = settings.dataType,
        hasPlaceholder = /=\?/.test(settings.url);
        if (dataType == "jsonp" || hasPlaceholder) {
            if (!hasPlaceholder) {
                settings.url = appendQuery(settings.url, "callback=?")
            }
            return $.ajaxJSONP(settings)
        }
        if (!settings.url) {
            settings.url = window.location.toString()
        }
        serializeData(settings);
        var mime = settings.accepts[dataType],
        baseHeaders = {},
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1: window.location.protocol,
        xhr = $.ajaxSettings.xhr(),
        abortTimeout;
        if (!settings.crossDomain) {
            baseHeaders["X-Requested-With"] = "XMLHttpRequest"
        }
        if (mime) {
            baseHeaders["Accept"] = mime;
            if (mime.indexOf(",") > -1) {
                mime = mime.split(",", 2)[0]
            }
            xhr.overrideMimeType && xhr.overrideMimeType(mime)
        }
        if (settings.contentType || (settings.data && settings.type.toUpperCase() != "GET")) {
            baseHeaders["Content-Type"] = (settings.contentType || "application/x-www-form-urlencoded")
        }
        settings.headers = $.extend(baseHeaders, settings.headers || {});
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                clearTimeout(abortTimeout);
                var result, error = false;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == "file:")) {
                    dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type"));
                    result = xhr.responseText;
                    try {
                        if (dataType == "script") { (1, eval)(result)
                        } else {
                            if (dataType == "xml") {
                                result = xhr.responseXML
                            } else {
                                if (dataType == "json") {
                                    result = blankRE.test(result) ? null: JSON.parse(result)
                                }
                            }
                        }
                    } catch(e) {
                        error = e
                    }
                    if (error) {
                        ajaxError(error, "parsererror", xhr, settings)
                    } else {
                        ajaxSuccess(result, xhr, settings)
                    }
                } else {
                    ajaxError(null, "error", xhr, settings)
                }
            }
        };
        var async = "async" in settings ? settings.async: true;
        xhr.open(settings.type, settings.url, async);
        for (name in settings.headers) {
            xhr.setRequestHeader(name, settings.headers[name])
        }
        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.abort();
            return false
        }
        if (settings.timeout > 0) {
            abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = empty;
                xhr.abort();
                ajaxError(null, "timeout", xhr, settings)
            },
            settings.timeout)
        }
        xhr.send(settings.data ? settings.data: null);
        return xhr
    };
    $.get = function(url, success) {
        return $.ajax({
            url: url,
            success: success
        })
    };
    $.post = function(url, data, success, dataType) {
        if ($.isFunction(data)) {
            dataType = dataType || success,
            success = data,
            data = null
        }
        return $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: success,
            dataType: dataType
        })
    };
    $.getJSON = function(url, success) {
        return $.ajax({
            url: url,
            success: success,
            dataType: "json"
        })
    };
    $.fn.load = function(url, success) {
        if (!this.length) {
            return this
        }
        var self = this,
        parts = url.split(/\s/),
        selector;
        if (parts.length > 1) {
            url = parts[0],
            selector = parts[1]
        }
        $.get(url,
        function(response) {
            self.html(selector ? $(document.createElement("div")).html(response.replace(rscript, "")).find(selector).html() : response);
            success && success.call(self)
        });
        return this
    };
    var escape = encodeURIComponent;
    function serialize(params, obj, traditional, scope) {
        var array = $.isArray(obj);
        $.each(obj,
        function(key, value) {
            if (scope) {
                key = traditional ? scope: scope + "[" + (array ? "": key) + "]"
            }
            if (!scope && array) {
                params.add(value.name, value.value)
            } else {
                if (traditional ? $.isArray(value) : isObject(value)) {
                    serialize(params, value, traditional, key)
                } else {
                    params.add(key, value)
                }
            }
        })
    }
    $.param = function(obj, traditional) {
        var params = [];
        params.add = function(k, v) {
            this.push(escape(k) + "=" + escape(v))
        };
        serialize(params, obj, traditional);
        return params.join("&").replace("%20", "+")
    }
})(Zepto); (function(F) {
    var D = F.zepto,
    G = D.qsa,
    B = D.matches;
    function C(I) {
        I = F(I);
        return !! (I.width() || I.height()) && I.css("display") !== "none"
    }
    var H = D.cssFilters = {
        visible: function() {
            if (C(this)) {
                return this
            }
        },
        hidden: function() {
            if (!C(this)) {
                return this
            }
        },
        selected: function() {
            if (this.selected) {
                return this
            }
        },
        checked: function() {
            if (this.checked) {
                return this
            }
        },
        parent: function() {
            return this.parentNode
        },
        first: function(I) {
            if (I === 0) {
                return this
            }
        },
        last: function(J, I) {
            if (J === I.length - 1) {
                return this
            }
        },
        eq: function(J, K, I) {
            if (J === I) {
                return this
            }
        },
        contains: function(J, K, I) {
            if (F(this).text().indexOf(I) > -1) {
                return this
            }
        },
        has: function(J, K, I) {
            if (D.qsa(this, I).length) {
                return this
            }
        }
    };
    var A = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*");
    function E(L, K) {
        var M, J, I = L.match(A);
        if (I && I[2] in H) {
            var M = H[I[2]],
            J = I[3];
            L = I[1];
            if (J) {
                var N = Number(J);
                if (isNaN(N)) {
                    J = J.replace(/^["']|["']$/g, "")
                } else {
                    J = N
                }
            }
        }
        return K(L, M, J)
    }
    D.qsa = function(I, J) {
        return E(J,
        function(N, O, M) {
            try {
                if (!N && O) {
                    N = "*"
                }
                var L = G(I, N)
            } catch(K) {
                console.error("error performing selector: %o", J);
                throw K
            }
            return ! O ? L: D.uniq(F.map(L,
            function(Q, P) {
                return O.call(Q, P, L, M)
            }))
        })
    };
    D.matches = function(I, J) {
        return E(J,
        function(L, M, K) {
            return (!L || B(I, L)) && (!M || M.call(I, null, K) === I)
        })
    }
})(Zepto); (function(N) {
    var P = N.zepto.qsa,
    E = {},
    K = 1,
    J = {};
    J.click = J.mousedown = J.mouseup = J.mousemove = "MouseEvents";
    function Q(R) {
        return R._zid || (R._zid = K++)
    }
    function G(V, T, S, U) {
        T = C(T);
        if (T.ns) {
            var R = I(T.ns)
        }
        return (E[Q(V)] || []).filter(function(W) {
            return W && (!T.e || W.e == T.e) && (!T.ns || R.test(W.ns)) && (!S || Q(W.fn) === Q(S)) && (!U || W.sel == U)
        })
    }
    function C(S) {
        var R = ("" + S).split(".");
        return {
            e: R[0],
            ns: R.slice(1).sort().join(" ")
        }
    }
    function I(R) {
        return new RegExp("(?:^| )" + R.replace(" ", " .* ?") + "(?: |$)")
    }
    function O(T, S, R) {
        if (N.isObject(T)) {
            N.each(T, R)
        } else {
            T.split(/\s/).forEach(function(U) {
                R(U, S)
            })
        }
    }
    function M(S, X, U, W, T, R) {
        R = !!R;
        var V = Q(S),
        Y = (E[V] || (E[V] = []));
        O(X, U,
        function(b, a) {
            var e = T && T(a, b),
            Z = e || a;
            var d = function(g) {
                var f = Z.apply(S, [g].concat(g.data));
                if (f === false) {
                    g.preventDefault()
                }
                return f
            };
            var c = N.extend(C(b), {
                fn: a,
                proxy: d,
                sel: W,
                del: e,
                i: Y.length
            });
            Y.push(c);
            S.addEventListener(c.e, d, R)
        })
    }
    function L(U, T, S, R) {
        var V = Q(U);
        O(T || "", S,
        function(X, W) {
            G(U, X, W, R).forEach(function(Y) {
                delete E[V][Y.i];
                U.removeEventListener(Y.e, Y.proxy, false)
            })
        })
    }
    N.event = {
        add: M,
        remove: L
    };
    N.proxy = function(S, R) {
        if (N.isFunction(S)) {
            var T = function() {
                return S.apply(R, arguments)
            };
            T._zid = Q(S);
            return T
        } else {
            if (typeof R == "string") {
                return N.proxy(S[R], S)
            } else {
                throw new TypeError("expected function")
            }
        }
    };
    N.fn.bind = function(S, R) {
        return this.each(function() {
            M(this, S, R)
        })
    };
    N.fn.unbind = function(S, R) {
        return this.each(function() {
            L(this, S, R)
        })
    };
    N.fn.one = function(S, R) {
        return this.each(function(T, U) {
            M(this, S, R, null,
            function(W, V) {
                return function() {
                    var X = W.apply(U, arguments);
                    L(U, V, W);
                    return X
                }
            })
        })
    };
    var F = function() {
        return true
    },
    B = function() {
        return false
    },
    D = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    function H(S) {
        var R = N.extend({
            originalEvent: S
        },
        S);
        N.each(D,
        function(U, T) {
            R[U] = function() {
                this[T] = F;
                return S[U].apply(S, arguments)
            };
            R[T] = B
        });
        return R
    }
    function A(S) {
        if (! ("defaultPrevented" in S)) {
            S.defaultPrevented = false;
            var R = S.preventDefault;
            S.preventDefault = function() {
                this.defaultPrevented = true;
                R.call(this)
            }
        }
    }
    N.fn.delegate = function(U, T, R) {
        var S = false;
        if (T == "blur" || T == "focus") {
            if (N.iswebkit) {
                T = T == "blur" ? "focusout": T == "focus" ? "focusin": T
            } else {
                S = true
            }
        }
        return this.each(function(V, W) {
            M(W, T, R, U,
            function(X) {
                return function(Y) {
                    var a, Z = N(Y.target).closest(U, W).get(0);
                    if (Z) {
                        a = N.extend(H(Y), {
                            currentTarget: Z,
                            liveFired: W
                        });
                        return X.apply(Z, [a].concat([].slice.call(arguments, 1)))
                    }
                }
            },
            S)
        })
    };
    N.fn.undelegate = function(T, S, R) {
        return this.each(function() {
            L(this, S, R, T)
        })
    };
    N.fn.live = function(S, R) {
        N(document.body).delegate(this.selector, S, R);
        return this
    };
    N.fn.die = function(S, R) {
        N(document.body).undelegate(this.selector, S, R);
        return this
    };
    N.fn.on = function(S, T, R) {
        return T == undefined || N.isFunction(T) ? this.bind(S, T || R) : this.delegate(T, S, R)
    };
    N.fn.off = function(S, T, R) {
        return T == undefined || N.isFunction(T) ? this.unbind(S, T || R) : this.undelegate(T, S, R)
    };
    N.fn.trigger = function(R, S) {
        if (typeof R == "string") {
            R = N.Event(R)
        }
        A(R);
        R.data = S;
        return this.each(function() {
            if ("dispatchEvent" in this) {
                this.dispatchEvent(R)
            }
        })
    };
    N.fn.triggerHandler = function(T, U) {
        var R, S;
        this.each(function(V, W) {
            R = H(typeof T == "string" ? N.Event(T) : T);
            R.data = U;
            R.target = W;
            N.each(G(W, T.type || T),
            function(X, Y) {
                S = Y.proxy(R);
                if (R.isImmediatePropagationStopped()) {
                    return false
                }
            })
        });
        return S
    }; ("focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error").split(" ").forEach(function(R) {
        N.fn[R] = function(S) {
            return this.bind(R, S)
        }
    }); ["focus", "blur"].forEach(function(R) {
        N.fn[R] = function(S) {
            if (S) {
                this.bind(R, S)
            } else {
                if (this.length) {
                    try {
                        this.get(0)[R]()
                    } catch(T) {}
                }
            }
            return this
        }
    });
    N.Event = function(R, V) {
        var U = document.createEvent(J[R] || "Events"),
        S = true;
        if (V) {
            for (var T in V) { (T == "bubbles") ? (S = !!V[T]) : (U[T] = V[T])
            }
        }
        U.initEvent(R, S, true, null, null, null, null, null, null, null, null, null, null, null, null);
        return U
    }
})(Zepto); (function(G) {
    var C = {},
    F = G.fn.data,
    A = G.zepto.camelize,
    H = G.expando = "Zepto" + ( + new Date());
    function B(K, L) {
        var M = K[H],
        I = M && C[M];
        if (L === undefined) {
            return I || D(K)
        } else {
            if (I) {
                if (L in I) {
                    return I[L]
                }
                var J = A(L);
                if (J in I) {
                    return I[J]
                }
            }
            return F.call(G(K), L)
        }
    }
    function D(J, K, L) {
        var M = J[H] || (J[H] = ++G.uuid),
        I = C[M] || (C[M] = E(J));
        if (K !== undefined) {
            I[A(K)] = L
        }
        return I
    }
    function E(J) {
        var I = {};
        G.each(J.attributes,
        function(K, L) {
            if (L.name.indexOf("data-") == 0) {
                I[A(L.name.replace("data-", ""))] = L.value
            }
        });
        return I
    }
    G.fn.data = function(I, J) {
        return J === undefined ? G.isPlainObject(I) ? this.each(function(K, L) {
            G.each(I,
            function(M, N) {
                D(L, M, N)
            })
        }) : this.length == 0 ? undefined: B(this[0], I) : this.each(function() {
            D(this, I, J)
        })
    };
    G.fn.removeData = function(I) {
        if (typeof I == "string") {
            I = I.split(/\s+/)
        }
        return this.each(function() {
            var K = this[H],
            J = K && C[K];
            if (J) {
                G.each(I,
                function() {
                    delete J[A(this)]
                })
            }
        })
    }
})(Zepto); (function(J, A) {
    var H = "",
    K, B, C, G = {
        Webkit: "webkit",
        Moz: "",
        O: "o",
        ms: "MS"
    },
    F = window.document,
    I = F.createElement("div"),
    E = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    M = {};
    function D(N) {
        return N.toLowerCase()
    }
    function L(N) {
        return K ? K + N: D(N)
    }
    J.each(G,
    function(O, N) {
        if (I.style[O + "TransitionProperty"] !== A) {
            H = "-" + D(O) + "-";
            K = N;
            return false
        }
    });
    M[H + "transition-property"] = M[H + "transition-duration"] = M[H + "transition-timing-function"] = M[H + "animation-name"] = M[H + "animation-duration"] = "";
    J.fx = {
        off: (K === A && I.style.transitionProperty === A),
        cssPrefix: H,
        transitionEnd: L("TransitionEnd"),
        animationEnd: L("AnimationEnd")
    };
    J.fn.animate = function(P, Q, O, N) {
        if (J.isObject(Q)) {
            O = Q.easing,
            N = Q.complete,
            Q = Q.duration
        }
        if (Q) {
            Q = Q / 1000
        }
        return this.anim(P, Q, O, N)
    };
    J.fn.anim = function(S, Q, O, N) {
        var W, V = {},
        T, R = this,
        U, P = J.fx.transitionEnd;
        if (Q === A) {
            Q = 0.4
        }
        if (J.fx.off) {
            Q = 0
        }
        if (typeof S == "string") {
            V[H + "animation-name"] = S;
            V[H + "animation-duration"] = Q + "s";
            P = J.fx.animationEnd
        } else {
            for (T in S) {
                if (E.test(T)) {
                    W || (W = []);
                    W.push(T + "(" + S[T] + ")")
                } else {
                    V[T] = S[T]
                }
            }
            if (W) {
                V[H + "transform"] = W.join(" ")
            }
            if (!J.fx.off && typeof S === "object") {
                V[H + "transition-property"] = Object.keys(S).join(", ");
                V[H + "transition-duration"] = Q + "s";
                V[H + "transition-timing-function"] = (O || "linear")
            }
        }
        V[H + "fill-mode"] = "forwards";
        U = function(X) {
            if (typeof X !== "undefined") {
                if (X.target !== X.currentTarget) {
                    return
                }
                J(X.target).unbind(P, arguments.callee)
            }
            J(this).css(M);
            N && N.call(this)
        };
        if (Q > 0) {
            this.bind(P, U)
        }
        setTimeout(function() {
            R.css(V);
            if (Q <= 0) {
                setTimeout(function() {
                    R.each(function() {
                        U.call(this)
                    })
                },
                0)
            }
        },
        0);
        return this
    };
    I = null
})(Zepto); (function(H, A) {
    var K = window.document,
    B = K.documentElement,
    F = H.fn.show,
    D = H.fn.hide,
    E = H.fn.toggle,
    I = {
        _default: 400,
        fast: 200,
        slow: 600
    };
    function C(L) {
        return typeof L == "number" ? L: (I[L] || I._default)
    }
    function G(L, M, O, Q, N) {
        if (typeof M == "function" && !N) {
            N = M,
            M = A
        }
        var P = {
            opacity: O
        };
        if (Q) {
            P.scale = Q;
            L.css(H.fx.cssPrefix + "transform-origin", "0 0")
        }
        return L.anim(P, C(M) / 1000, null, N)
    }
    function J(L, M, O, N) {
        return G(L, M, 0, O,
        function() {
            D.call(H(this));
            N && N.call(this)
        })
    }
    H.fn.show = function() {
        F.call(this);
        this.css({
            "opacity": 1,
            "display": "block"
        })
    };
    H.fn.animshow = function(M, L) {
        F.call(this);
        if (M === A) {
            M = 0
        } else {
            this.css("opacity", 0)
        }
        return G(this, M, 1, "1,1", L)
    };
    H.fn.hide = function(M, L) {
        this.css({
            "display": "none"
        })
    };
    H.fn.animhide = function(M, L) {
        if (M === A) {
            return D.call(this)
        } else {
            return J(this, M, "0,0", L)
        }
    };
    H.fn.toggle = function(M, L) {
        if (M === A || typeof M == "boolean") {
            return E.call(this, M)
        } else {
            return this[this.css("display") == "none" ? "show": "hide"](M, L)
        }
    };
    H.fn.fadeTo = function(M, N, L) {
        return G(this, M, N, null, L)
    };
    H.fn.fadeIn = function(M, L) {
        var N = this.css("opacity");
        if (N > 0) {
            this.css("opacity", 0)
        } else {
            N = 1
        }
        return F.call(this).fadeTo(M, N, L)
    };
    H.fn.fadeOut = function(M, L) {
        return J(this, M, null, L)
    };
    H.fn.fadeToggle = function(M, L) {
        var N = this.css("opacity") == 0 || this.css("display") == "none";
        return this[N ? "fadeIn": "fadeOut"](M, L)
    };
    H.extend(H.fx, {
        speeds: I
    })
})(Zepto); (function(H) {
    var B = {},
    F;
    function G(J) {
        return "tagName" in J ? J: J.parentNode
    }
    function A(M, J, N, K) {
        var O = Math.abs(M - J),
        L = Math.abs(N - K);
        return O >= L ? (M - J > 0 ? "Left": "Right") : (N - K > 0 ? "Up": "Down")
    }
    var E = 750,
    D;
    function C() {
        D = null;
        if (B.last) {
            B.el.trigger("longTap");
            B = {}
        }
    }
    function I() {
        if (D) {
            clearTimeout(D)
        }
        D = null
    }
    H(document).ready(function() {
        var K, J;
        H(document.body).bind("touchstart",
        function(L) {
            K = Date.now();
            J = K - (B.last || K);
            B.el = H(G(L.touches[0].target));
            F && clearTimeout(F);
            B.x1 = L.touches[0].pageX;
            B.y1 = L.touches[0].pageY;
            if (J > 0 && J <= 250) {
                B.isDoubleTap = true
            }
            B.last = K;
            D = setTimeout(C, E)
        }).bind("touchmove",
        function(L) {
            I();
            B.x2 = L.touches[0].pageX;
            B.y2 = L.touches[0].pageY
        }).bind("touchend",
        function(L) {
            I();
            if (B.isDoubleTap) {
                B.el.trigger("doubleTap");
                B = {}
            } else {
                if ((B.x2 && Math.abs(B.x1 - B.x2) > 30) || (B.y2 && Math.abs(B.y1 - B.y2) > 30)) {
                    B.el.trigger("swipe") && B.el.trigger("swipe" + (A(B.x1, B.x2, B.y1, B.y2)));
                    B = {}
                } else {
                    if ("last" in B) {
                        B.el.trigger("tap");
                        F = setTimeout(function() {
                            F = null;
                            B = {}
                        },
                        250)
                    }
                }
            }
        }).bind("touchcancel",
        function() {
            if (F) {
                clearTimeout(F)
            }
            if (D) {
                clearTimeout(D)
            }
            D = F = null;
            B = {}
        })
    }); ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(J) {
        H.fn[J] = function(K) {
            return this.bind(J, K)
        }
    })
})(Zepto); (function(B) {
    function A(H) {
        var N = this.os = {},
        I = this.browser = {},
        F = H.match(/WebKit\/([\d.]+)/),
        M = H.match(/(Android)\s+([\d.]+)/),
        J = H.match(/(iPad).*OS\s([\d_]+)/),
        G = !J && H.match(/(iPhone\sOS)\s([\d_]+)/),
        D = H.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        C = D && H.match(/TouchPad/),
        K = H.match(/Kindle\/([\d.]+)/),
        E = H.match(/Silk\/([\d._]+)/),
        L = H.match(/(BlackBerry).*Version\/([\d.]+)/);
        if (I.webkit = !!F) {
            I.version = F[1]
        }
        if (M) {
            N.android = true,
            N.version = M[2]
        }
        if (G) {
            N.ios = N.iphone = true,
            N.version = G[2].replace(/_/g, ".")
        }
        if (J) {
            N.ios = N.ipad = true,
            N.version = J[2].replace(/_/g, ".")
        }
        if (D) {
            N.webos = true,
            N.version = D[2]
        }
        if (C) {
            N.touchpad = true
        }
        if (L) {
            N.blackberry = true,
            N.version = L[2]
        }
        if (K) {
            N.kindle = true,
            N.version = K[1]
        }
        if (E) {
            I.silk = true,
            I.version = E[1]
        }
        if (!E && N.android && H.match(/Kindle Fire/)) {
            I.silk = true
        }
    }
    A.call(B, navigator.userAgent);
    B.__detect = A
})(Zepto); (function(C) {
    var B = [],
    A;
    C.fn.remove = function() {
        return this.each(function() {
            if (this.parentNode) {
                if (this.tagName === "IMG") {
                    B.push(this);
                    this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                    if (A) {
                        clearTimeout(A)
                    }
                    A = setTimeout(function() {
                        B = []
                    },
                    60000)
                }
                this.parentNode.removeChild(this)
            }
        })
    }
})(Zepto); (function(B) {
    B["template"] = function(C, D) {
        return (A(C, D))
    };
    B["tmpl"] = function(C, D) {
        return B(A(C, D))
    };
    var A = function(C, D) {
        if (!D) {
            D = {}
        }
        return tmpl(C, D)
    }; (function() {
        var C = {};
        this.tmpl = function D(F, G) {
            var E = !/\W/.test(F) ? C[F] = C[F] || D(document.getElementById(F).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + F.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');");
            return G ? E(G) : E
        }
    })()
})(Zepto);