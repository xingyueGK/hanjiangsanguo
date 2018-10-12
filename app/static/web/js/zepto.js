var Zepto = (function() {
    var Z, G, E, X, p = [],
    P = p.slice,
    g = window.document,
    T = {},
    U = {},
    M = g.defaultView.getComputedStyle,
    C = {
        "column-count": 1,
        "columns": 1,
        "font-weight": 1,
        "line-height": 1,
        "opacity": 1,
        "z-index": 1,
        "zoom": 1
    },
    d = /^\s*<(\w+|!)[^>]*>/,
    K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    i = [1, 3, 8, 9, 11],
    f = ["after", "prepend", "before", "append"],
    Q = g.createElement("table"),
    b = g.createElement("tr"),
    o = {
        "tr": g.createElement("tbody"),
        "tbody": Q,
        "thead": Q,
        "tfoot": Q,
        "td": b,
        "th": b,
        "*": g.createElement("div")
    },
    D = /complete|loaded|interactive/,
    e = /^\.([\w-]+)$/,
    c = /^#([\w-]+)$/,
    Y = /^[\w-]+$/,
    J = {}.toString,
    W = {},
    I,
    m,
    a = g.createElement("div");
    W.matches = function(u, t) {
        if (!u || u.nodeType !== 1) {
            return false
        }
        var v = u.webkitMatchesSelector || u.mozMatchesSelector || u.oMatchesSelector || u.matchesSelector;
        if (v) {
            return v.call(u, t)
        }
        var s, q = u.parentNode,
        r = !q;
        if (r) { (q = a).appendChild(u)
        }
        s = ~W.qsa(q, t).indexOf(u);
        r && a.removeChild(u);
        return s
    };
    function A(q) {
        return J.call(q) == "[object Function]"
    }
    function S(q) {
        return q instanceof Object
    }
    function R(q) {
        return S(q) && q.__proto__ == Object.prototype
    }
    function V(q) {
        return q instanceof Array
    }
    function N(q) {
        return typeof q.length == "number"
    }
    function l(q) {
        return q.filter(function(r) {
            return r !== Z && r !== null
        })
    }
    function F(q) {
        return q.length > 0 ? E.fn.concat.apply([], q) : q
    }
    I = function(q) {
        return q.replace(/-+(.)?/g,
        function(r, s) {
            return s ? s.toUpperCase() : ""
        })
    };
    function n(q) {
        return q.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    m = function(q) {
        return q.filter(function(r, s) {
            return q.indexOf(r) == s
        })
    };
    function B(q) {
        return q in U ? U[q] : (U[q] = new RegExp("(^|\\s)" + q + "(\\s|$)"))
    }
    function k(q, r) {
        return (typeof r == "number" && !C[n(q)]) ? r + "px": r
    }
    function H(s) {
        var r, q;
        if (!T[s]) {
            r = g.createElement(s);
            g.body.appendChild(r);
            q = M(r, "").getPropertyValue("display");
            r.parentNode.removeChild(r);
            q == "none" && (q = "block");
            T[s] = q
        }
        return T[s]
    }
    W.fragment = function(q, r) {
        if (q.replace) {
            q = q.replace(K, "<$1></$2>")
        }
        if (r === Z) {
            r = d.test(q) && RegExp.$1
        }
        if (! (r in o)) {
            r = "*"
        }
        var s = o[r];
        s.innerHTML = "" + q;
        return E.each(P.call(s.childNodes),
        function() {
            s.removeChild(this)
        })
    };
    W.Z = function(q, r) {
        q = q || [];
        q.__proto__ = arguments.callee.prototype;
        q.selector = r || "";
        return q
    };
    W.isZ = function(q) {
        return q instanceof W.Z
    };
    W.init = function(s, r) {
        if (!s) {
            return W.Z()
        } else {
            if (A(s)) {
                return E(g).ready(s)
            } else {
                if (W.isZ(s)) {
                    return s
                } else {
                    var q;
                    if (V(s)) {
                        q = l(s)
                    } else {
                        if (R(s)) {
                            q = [E.extend({},
                            s)],
                            s = null
                        } else {
                            if (i.indexOf(s.nodeType) >= 0 || s === window) {
                                q = [s],
                                s = null
                            } else {
                                if (d.test(s)) {
                                    q = W.fragment(s.trim(), RegExp.$1),
                                    s = null
                                } else {
                                    if (r !== Z) {
                                        return E(r).find(s)
                                    } else {
                                        q = W.qsa(g, s)
                                    }
                                }
                            }
                        }
                    }
                    return W.Z(q, s)
                }
            }
        }
    };
    E = function(r, q) {
        return W.init(r, q)
    };
    E.extend = function(q) {
        P.call(arguments, 1).forEach(function(r) {
            for (G in r) {
                if (r[G] !== Z) {
                    q[G] = r[G]
                }
            }
        });
        return q
    };
    W.qsa = function(r, q) {
        var s;
        return (r === g && c.test(q)) ? ((s = r.getElementById(RegExp.$1)) ? [s] : p) : (r.nodeType !== 1 && r.nodeType !== 9) ? p: P.call(e.test(q) ? r.getElementsByClassName(RegExp.$1) : Y.test(q) ? r.getElementsByTagName(q) : r.querySelectorAll(q))
    };
    function j(q, r) {
        return r === Z ? E(q) : E(q).filter(r)
    }
    function L(q, r, t, s) {
        return A(r) ? r.call(q, t, s) : r
    }
    E.isFunction = A;
    E.isObject = S;
    E.isArray = V;
    E.isPlainObject = R;
    E.inArray = function(s, q, r) {
        return p.indexOf.call(q, s, r)
    };
    E.trim = function(q) {
        return q.trim()
    };
    E.uuid = 0;
    E.map = function(s, q) {
        var t, u = [],
        r,
        v;
        if (N(s)) {
            for (r = 0; r < s.length; r++) {
                t = q(s[r], r);
                if (t != null) {
                    u.push(t)
                }
            }
        } else {
            for (v in s) {
                t = q(s[v], v);
                if (t != null) {
                    u.push(t)
                }
            }
        }
        return F(u)
    };
    E.each = function(s, q) {
        var r, t;
        if (N(s)) {
            for (r = 0; r < s.length; r++) {
                if (q.call(s[r], r, s[r]) === false) {
                    return s
                }
            }
        } else {
            for (t in s) {
                if (q.call(s[t], t, s[t]) === false) {
                    return s
                }
            }
        }
        return s
    };
    E.fn = {
        forEach: p.forEach,
        reduce: p.reduce,
        push: p.push,
        indexOf: p.indexOf,
        concat: p.concat,
        map: function(q) {
            return E.map(this,
            function(r, s) {
                return q.call(r, s, r)
            })
        },
        slice: function() {
            return E(P.apply(this, arguments))
        },
        ready: function(q) {
            if (D.test(g.readyState)) {
                q(E)
            } else {
                g.addEventListener("DOMContentLoaded",
                function() {
                    q(E)
                },
                false)
            }
            return this
        },
        get: function(q) {
            return q === Z ? P.call(this) : this[q]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                if (this.parentNode != null) {
                    this.parentNode.removeChild(this)
                }
            })
        },
        each: function(q) {
            this.forEach(function(r, s) {
                q.call(r, s, r)
            });
            return this
        },
        filter: function(q) {
            if (A(q)) {
                return this.not(this.not(q))
            }
            return E([].filter.call(this,
            function(r) {
                return W.matches(r, q)
            }))
        },
        add: function(r, q) {
            return E(m(this.concat(E(r, q))))
        },
        is: function(q) {
            return this.length > 0 && W.matches(this[0], q)
        },
        not: function(s) {
            var r = [];
            if (A(s) && s.call !== Z) {
                this.each(function(t) {
                    if (!s.call(this, t)) {
                        r.push(this)
                    }
                })
            } else {
                var q = typeof s == "string" ? this.filter(s) : (N(s) && A(s.item)) ? P.call(s) : E(s);
                this.forEach(function(t) {
                    if (q.indexOf(t) < 0) {
                        r.push(t)
                    }
                })
            }
            return E(r)
        },
        eq: function(q) {
            return q === -1 ? this.slice(q) : this.slice(q, +q + 1)
        },
        first: function() {
            var q = this[0];
            return q && !S(q) ? q: E(q)
        },
        last: function() {
            var q = this[this.length - 1];
            return q && !S(q) ? q: E(q)
        },
        find: function(r) {
            var q;
            if (this.length == 1) {
                q = W.qsa(this[0], r)
            } else {
                q = this.map(function() {
                    return W.qsa(this, r)
                })
            }
            return E(q)
        },
        closest: function(s, q) {
            var r = this[0];
            while (r && !W.matches(r, s)) {
                r = r !== q && r !== g && r.parentNode
            }
            return E(r)
        },
        parents: function(s) {
            var q = [],
            r = this;
            while (r.length > 0) {
                r = E.map(r,
                function(t) {
                    if ((t = t.parentNode) && t !== g && q.indexOf(t) < 0) {
                        q.push(t);
                        return t
                    }
                })
            }
            return j(q, s)
        },
        parent: function(q) {
            return j(m(this.pluck("parentNode")), q)
        },
        children: function(q) {
            return j(this.map(function() {
                return P.call(this.children)
            }), q)
        },
        contents: function() {
            return E(this.map(function() {
                return P.call(this.childNodes)
            }))
        },
        siblings: function(q) {
            return j(this.map(function(s, r) {
                return P.call(r.parentNode.children).filter(function(t) {
                    return t !== r
                })
            }), q)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(q) {
            return this.map(function() {
                return this[q]
            })
        },
        show: function() {
            return this.each(function() {
                this.style.display == "none" && (this.style.display = null);
                if (M(this, "").getPropertyValue("display") == "none") {
                    this.style.display = H(this.nodeName)
                }
            })
        },
        replaceWith: function(q) {
            return this.before(q).remove()
        },
        wrap: function(q) {
            return this.each(function() {
                E(this).wrapAll(E(q)[0].cloneNode(false))
            })
        },
        wrapAll: function(q) {
            if (this[0]) {
                E(this[0]).before(q = E(q));
                q.append(this)
            }
            return this
        },
        wrapInner: function(q) {
            return this.each(function() {
                var r = E(this),
                s = r.contents();
                s.length ? s.wrapAll(q) : r.append(q)
            })
        },
        unwrap: function() {
            this.parent().each(function() {
                E(this).replaceWith(E(this).children())
            });
            return this
        },
        clone: function() {
            return E(this.map(function() {
                return this.cloneNode(true)
            }))
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(q) {
            return (q === Z ? this.css("display") == "none": q) ? this.show() : this.hide()
        },
        prev: function(q) {
            return E(this.pluck("previousElementSibling")).filter(q || "*")
        },
        next: function(q) {
            return E(this.pluck("nextElementSibling")).filter(q || "*")
        },
        html: function(q) {
            return q === Z ? (this.length > 0 ? this[0].innerHTML: null) : this.each(function(s) {
                var r = this.innerHTML;
                E(this).empty().append(L(this, q, s, r))
            })
        },
        text: function(q) {
            return q === Z ? (this.length > 0 ? this[0].textContent: null) : this.each(function() {
                this.textContent = q
            })
        },
        attr: function(r, s) {
            var q;
            return (typeof r == "string" && s === Z) ? (this.length == 0 || this[0].nodeType !== 1 ? Z: (r == "value" && this[0].nodeName == "INPUT") ? this.val() : (!(q = this[0].getAttribute(r)) && r in this[0]) ? this[0][r] : q) : this.each(function(t) {
                if (this.nodeType !== 1) {
                    return
                }
                if (S(r)) {
                    for (G in r) {
                        this.setAttribute(G, r[G])
                    }
                } else {
                    this.setAttribute(r, L(this, s, t, this.getAttribute(r)))
                }
            })
        },
        removeAttr: function(q) {
            return this.each(function() {
                if (this.nodeType === 1) {
                    this.removeAttribute(q)
                }
            })
        },
        prop: function(q, r) {
            return (r === Z) ? (this[0] ? this[0][q] : Z) : this.each(function(s) {
                this[q] = L(this, r, s, this[q])
            })
        },
        data: function(q, r) {
            var s = this.attr("data-" + n(q), r);
            return s !== null ? s: Z
        },
        val: function(q) {
            return (q === Z) ? (this.length > 0 ? (this[0].multiple ? E(this[0]).find("option").filter(function(r) {
                return this.selected
            }).pluck("value") : this[0].value) : Z) : this.each(function(r) {
                this.value = L(this, q, r, this.value)
            })
        },
        offset: function() {
            if (this.length == 0) {
                return null
            }
            var q = this[0].getBoundingClientRect();
            return {
                left: q.left + window.pageXOffset,
                top: q.top + window.pageYOffset,
                width: q.width,
                height: q.height
            }
        },
        css: function(q, r) {
            if (r === Z && typeof q == "string") {
                return (this.length == 0 ? Z: this[0].style[I(q)] || M(this[0], "").getPropertyValue(q))
            }
            var s = "";
            for (G in q) {
                if (typeof q[G] == "string" && q[G] == "") {
                    this.each(function() {
                        this.style.removeProperty(n(G))
                    })
                } else {
                    s += n(G) + ":" + k(G, q[G]) + ";"
                }
            }
            if (typeof q == "string") {
                if (r == "") {
                    this.each(function() {
                        this.style.removeProperty(n(q))
                    })
                } else {
                    s = n(q) + ":" + k(q, r)
                }
            }
            return this.each(function() {
                this.style.cssText += ";" + s
            })
        },
        index: function(q) {
            return q ? this.indexOf(E(q)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(q) {
            if (this.length < 1) {
                return false
            } else {
                return B(q).test(this[0].className)
            }
        },
        addClass: function(q) {
            return this.each(function(s) {
                X = [];
                var r = this.className,
                t = L(this, q, s, r);
                t.split(/\s+/g).forEach(function(u) {
                    if (!E(this).hasClass(u)) {
                        X.push(u)
                    }
                },
                this);
                X.length && (this.className += (r ? " ": "") + X.join(" "))
            })
        },
        removeClass: function(q) {
            return this.each(function(r) {
                if (q === Z) {
                    return this.className = ""
                }
                X = this.className;
                L(this, q, r, X).split(/\s+/g).forEach(function(s) {
                    X = X.replace(B(s), " ")
                });
                this.className = X.trim()
            })
        },
        toggleClass: function(r, q) {
            return this.each(function(s) {
                var t = L(this, r, s, this.className); (q === Z ? !E(this).hasClass(t) : q) ? E(this).addClass(t) : E(this).removeClass(t)
            })
        }
    }; ["width", "height"].forEach(function(q) {
        E.fn[q] = function(t) {
            var r, s = q.replace(/./,
            function(u) {
                return u[0].toUpperCase()
            });
            if (t === Z) {
                return this[0] == window ? window["inner" + s] : this[0] == g ? g.documentElement["offset" + s] : (r = this.offset()) && r[q]
            } else {
                return this.each(function(v) {
                    var u = E(this);
                    u.css(q, L(this, t, v, u[q]()))
                })
            }
        }
    });
    function O(t, s, r) {
        var q = (t % 2) ? s: s.parentNode;
        q ? q.insertBefore(r, !t ? s.nextSibling: t == 1 ? q.firstChild: t == 2 ? s: null) : E(r).remove()
    }
    function h(s, r) {
        r(s);
        for (var q in s.childNodes) {
            h(s.childNodes[q], r)
        }
    }
    f.forEach(function(q, r) {
        E.fn[q] = function() {
            var v = E.map(arguments,
            function(w) {
                return S(w) ? w: W.fragment(w)
            });
            if (v.length < 1) {
                return this
            }
            var s = this.length,
            t = s > 1,
            u = r < 2;
            return this.each(function(y, z) {
                for (var w = 0; w < v.length; w++) {
                    var x = v[u ? v.length - w - 1 : w];
                    h(x,
                    function(Aa) {
                        if (Aa.nodeName != null && Aa.nodeName.toUpperCase() === "SCRIPT" && (!Aa.type || Aa.type === "text/javascript")) {
                            window["eval"].call(window, Aa.innerHTML)
                        }
                    });
                    if (t && y < s - 1) {
                        x = x.cloneNode(true)
                    }
                    O(r, z, x)
                }
            })
        };
        E.fn[(r % 2) ? q + "To": "insert" + (r ? "Before": "After")] = function(s) {
            E(s)[q](this);
            return this
        }
    });
    W.Z.prototype = E.fn;
    W.camelize = I;
    W.uniq = m;
    E.zepto = W;
    return E
})();
window.Zepto = Zepto;
"$" in window || (window.$ = Zepto);