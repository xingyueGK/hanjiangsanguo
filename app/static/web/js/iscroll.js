/*
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function() {
    var J = Math,
    C = function(W) {
        return W >> 0
    },
    S = (/webkit/i).test(navigator.appVersion) ? "webkit": (/firefox/i).test(navigator.userAgent) ? "Moz": (/trident/i).test(navigator.userAgent) ? "ms": "opera" in window ? "O": "",
    A = (/android/gi).test(navigator.appVersion),
    P = (/iphone|ipad/gi).test(navigator.appVersion),
    G = (/playbook/gi).test(navigator.appVersion),
    H = (/hp-tablet/gi).test(navigator.appVersion),
    K = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
    U = "ontouchstart" in window && !H,
    Q = S + "Transform" in document.documentElement.style,
    R = P || G,
    L = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(W) {
            return setTimeout(W, 1)
        }
    })(),
    D = (function() {
        return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    })(),
    E = "onorientationchange" in window ? "orientationchange": "resize",
    V = U ? "touchstart": "mousedown",
    I = U ? "touchmove": "mousemove",
    N = U ? "touchend": "mouseup",
    O = U ? "touchcancel": "mouseup",
    M = S == "Moz" ? "DOMMouseScroll": "mousewheel",
    B = "translate" + (K ? "3d(": "("),
    T = K ? ",0)": ")",
    F = function(W, Z) {
        var Y = this,
        a = document,
        X;
        Y.wrapper = typeof W == "object" ? W: a.getElementById(W);
        Y.wrapper.style.overflow = "hidden";
        Y.scroller = Y.wrapper.children[0];
        Y.options = {
            hScroll: true,
            vScroll: true,
            x: 0,
            y: 0,
            bounce: true,
            bounceLock: false,
            momentum: true,
            lockDirection: true,
            useTransform: true,
            useTransition: false,
            topOffset: 0,
            checkDOMChanges: false,
            hScrollbar: true,
            vScrollbar: true,
            fixedScrollbar: A,
            hideScrollbar: P,
            fadeScrollbar: P && K,
            scrollbarClass: "",
            zoom: false,
            zoomMin: 1,
            zoomMax: 4,
            doubleTapZoom: 2,
            wheelAction: "scroll",
            snap: false,
            snapThreshold: 1,
            onRefresh: null,
            onBeforeScrollStart: function(b) {
                b.preventDefault()
            },
            onScrollStart: null,
            onBeforeScrollMove: null,
            onScrollMove: null,
            onBeforeScrollEnd: null,
            onScrollEnd: null,
            onTouchEnd: null,
            onDestroy: null,
            onZoomStart: null,
            onZoom: null,
            onZoomEnd: null
        };
        for (X in Z) {
            Y.options[X] = Z[X]
        }
        Y.x = Y.options.x;
        Y.y = Y.options.y;
        Y.options.useTransform = Q ? Y.options.useTransform: false;
        Y.options.hScrollbar = Y.options.hScroll && Y.options.hScrollbar;
        Y.options.vScrollbar = Y.options.vScroll && Y.options.vScrollbar;
        Y.options.zoom = Y.options.useTransform && Y.options.zoom;
        Y.options.useTransition = R && Y.options.useTransition;
        if (Y.options.zoom && A) {
            B = "translate(";
            T = ")"
        }
        Y.scroller.style[S + "TransitionProperty"] = Y.options.useTransform ? "-" + S.toLowerCase() + "-transform": "top left";
        Y.scroller.style[S + "TransitionDuration"] = "0";
        Y.scroller.style[S + "TransformOrigin"] = "0 0";
        if (Y.options.useTransition) {
            Y.scroller.style[S + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)"
        }
        if (Y.options.useTransform) {
            Y.scroller.style[S + "Transform"] = B + Y.x + "px," + Y.y + "px" + T
        } else {
            Y.scroller.style.cssText += ";position:absolute;top:" + Y.y + "px;left:" + Y.x + "px"
        }
        if (Y.options.useTransition) {
            Y.options.fixedScrollbar = true
        }
        Y.refresh();
        Y._bind(E, window);
        Y._bind(V);
        if (!U) {
            Y._bind("mouseout", Y.wrapper);
            if (Y.options.wheelAction != "none") {
                Y._bind(M)
            }
        }
        if (Y.options.checkDOMChanges) {
            Y.checkDOMTime = setInterval(function() {
                Y._checkDOMChanges()
            },
            500)
        }
    };
    F.prototype = {
        enabled: true,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(W) {
            var X = this;
            switch (W.type) {
            case V:
                if (!U && W.button !== 0) {
                    return
                }
                X._start(W);
                break;
            case I:
                X._move(W);
                break;
            case N:
            case O:
                X._end(W);
                break;
            case E:
                X._resize();
                break;
            case M:
                X._wheel(W);
                break;
            case "mouseout":
                X._mouseout(W);
                break;
            case "webkitTransitionEnd":
                X._transitionEnd(W);
                break
            }
        },
        _checkDOMChanges: function() {
            if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
                return
            }
            this.refresh()
        },
        _scrollbar: function(W) {
            var X = this,
            Z = document,
            Y;
            if (!X[W + "Scrollbar"]) {
                if (X[W + "ScrollbarWrapper"]) {
                    if (Q) {
                        X[W + "ScrollbarIndicator"].style[S + "Transform"] = ""
                    }
                    X[W + "ScrollbarWrapper"].parentNode.removeChild(X[W + "ScrollbarWrapper"]);
                    X[W + "ScrollbarWrapper"] = null;
                    X[W + "ScrollbarIndicator"] = null
                }
                return
            }
            if (!X[W + "ScrollbarWrapper"]) {
                Y = Z.createElement("div");
                if (X.options.scrollbarClass) {
                    Y.className = X.options.scrollbarClass + W.toUpperCase()
                } else {
                    Y.style.cssText = "position:absolute;z-index:100;" + (W == "h" ? "height:7px;bottom:1px;left:2px;right:" + (X.vScrollbar ? "7": "2") + "px": "width:7px;bottom:" + (X.hScrollbar ? "7": "2") + "px;top:2px;right:1px")
                }
                Y.style.cssText += ";pointer-events:none;-" + S + "-transition-property:opacity;-" + S + "-transition-duration:" + (X.options.fadeScrollbar ? "350ms": "0") + ";overflow:hidden;opacity:" + (X.options.hideScrollbar ? "0": "1");
                X.wrapper.appendChild(Y);
                X[W + "ScrollbarWrapper"] = Y;
                Y = Z.createElement("div");
                if (!X.options.scrollbarClass) {
                    Y.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-" + S + "-background-clip:padding-box;-" + S + "-box-sizing:border-box;" + (W == "h" ? "height:100%": "width:100%") + ";-" + S + "-border-radius:3px;border-radius:3px"
                }
                Y.style.cssText += ";pointer-events:none;-" + S + "-transition-property:-" + S + "-transform;-" + S + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-" + S + "-transition-duration:0;-" + S + "-transform:" + B + "0,0" + T;
                if (X.options.useTransition) {
                    Y.style.cssText += ";-" + S + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"
                }
                X[W + "ScrollbarWrapper"].appendChild(Y);
                X[W + "ScrollbarIndicator"] = Y
            }
            if (W == "h") {
                X.hScrollbarSize = X.hScrollbarWrapper.clientWidth;
                X.hScrollbarIndicatorSize = J.max(C(X.hScrollbarSize * X.hScrollbarSize / X.scrollerW), 8);
                X.hScrollbarIndicator.style.width = X.hScrollbarIndicatorSize + "px";
                X.hScrollbarMaxScroll = X.hScrollbarSize - X.hScrollbarIndicatorSize;
                X.hScrollbarProp = X.hScrollbarMaxScroll / X.maxScrollX
            } else {
                X.vScrollbarSize = X.vScrollbarWrapper.clientHeight;
                X.vScrollbarIndicatorSize = J.max(C(X.vScrollbarSize * X.vScrollbarSize / X.scrollerH), 8);
                X.vScrollbarIndicator.style.height = X.vScrollbarIndicatorSize + "px";
                X.vScrollbarMaxScroll = X.vScrollbarSize - X.vScrollbarIndicatorSize;
                X.vScrollbarProp = X.vScrollbarMaxScroll / X.maxScrollY
            }
            X._scrollbarPos(W, true)
        },
        _resize: function() {
            var W = this;
            setTimeout(function() {
                W.refresh()
            },
            A ? 200 : 0)
        },
        _pos: function(W, X) {
            W = this.hScroll ? W: 0;
            X = this.vScroll ? X: 0;
            if (this.options.useTransform) {
                this.scroller.style[S + "Transform"] = B + W + "px," + X + "px" + T + " scale(" + this.scale + ")"
            } else {
                W = C(W);
                X = C(X);
                this.scroller.style.left = W + "px";
                this.scroller.style.top = X + "px"
            }
            this.x = W;
            this.y = X;
            this._scrollbarPos("h");
            this._scrollbarPos("v")
        },
        _scrollbarPos: function(W, a) {
            var X = this,
            Y = W == "h" ? X.x: X.y,
            Z;
            if (!X[W + "Scrollbar"]) {
                return
            }
            Y = X[W + "ScrollbarProp"] * Y;
            if (Y < 0) {
                if (!X.options.fixedScrollbar) {
                    Z = X[W + "ScrollbarIndicatorSize"] + C(Y * 3);
                    if (Z < 8) {
                        Z = 8
                    }
                    X[W + "ScrollbarIndicator"].style[W == "h" ? "width": "height"] = Z + "px"
                }
                Y = 0
            } else {
                if (Y > X[W + "ScrollbarMaxScroll"]) {
                    if (!X.options.fixedScrollbar) {
                        Z = X[W + "ScrollbarIndicatorSize"] - C((Y - X[W + "ScrollbarMaxScroll"]) * 3);
                        if (Z < 8) {
                            Z = 8
                        }
                        X[W + "ScrollbarIndicator"].style[W == "h" ? "width": "height"] = Z + "px";
                        Y = X[W + "ScrollbarMaxScroll"] + (X[W + "ScrollbarIndicatorSize"] - Z)
                    } else {
                        Y = X[W + "ScrollbarMaxScroll"]
                    }
                }
            }
            X[W + "ScrollbarWrapper"].style[S + "TransitionDelay"] = "0";
            X[W + "ScrollbarWrapper"].style.opacity = a && X.options.hideScrollbar ? "0": "1";
            X[W + "ScrollbarIndicator"].style[S + "Transform"] = B + (W == "h" ? Y + "px,0": "0," + Y + "px") + T
        },
        _start: function(W) {
            var a = this,
            d = U ? W.touches[0] : W,
            Z,
            b,
            c,
            X,
            Y;
            if (!a.enabled) {
                return
            }
            if (a.options.onBeforeScrollStart) {
                a.options.onBeforeScrollStart.call(a, W)
            }
            if (a.options.useTransition || a.options.zoom) {
                a._transitionTime(0)
            }
            a.moved = false;
            a.animating = false;
            a.zoomed = false;
            a.distX = 0;
            a.distY = 0;
            a.absDistX = 0;
            a.absDistY = 0;
            a.dirX = 0;
            a.dirY = 0;
            if (a.options.zoom && U && W.touches.length > 1) {
                X = J.abs(W.touches[0].pageX - W.touches[1].pageX);
                Y = J.abs(W.touches[0].pageY - W.touches[1].pageY);
                a.touchesDistStart = J.sqrt(X * X + Y * Y);
                a.originX = J.abs(W.touches[0].pageX + W.touches[1].pageX - a.wrapperOffsetLeft * 2) / 2 - a.x;
                a.originY = J.abs(W.touches[0].pageY + W.touches[1].pageY - a.wrapperOffsetTop * 2) / 2 - a.y;
                if (a.options.onZoomStart) {
                    a.options.onZoomStart.call(a, W)
                }
            }
            if (a.options.momentum) {
                if (a.options.useTransform) {
                    Z = getComputedStyle(a.scroller, null)[S + "Transform"].replace(/[^0-9-.,]/g, "").split(",");
                    b = Z[4] * 1;
                    c = Z[5] * 1
                } else {
                    b = getComputedStyle(a.scroller, null).left.replace(/[^0-9-]/g, "") * 1;
                    c = getComputedStyle(a.scroller, null).top.replace(/[^0-9-]/g, "") * 1
                }
                if (b != a.x || c != a.y) {
                    if (a.options.useTransition) {
                        a._unbind("webkitTransitionEnd")
                    } else {
                        D(a.aniTime)
                    }
                    a.steps = [];
                    a._pos(b, c)
                }
            }
            a.absStartX = a.x;
            a.absStartY = a.y;
            a.startX = a.x;
            a.startY = a.y;
            a.pointX = d.pageX;
            a.pointY = d.pageY;
            a.startTime = W.timeStamp || Date.now();
            if (a.options.onScrollStart) {
                a.options.onScrollStart.call(a, W)
            }
            a._bind(I);
            a._bind(N);
            a._bind(O)
        },
        _move: function(W) {
            var b = this,
            a = U ? W.touches[0] : W,
            g = a.pageX - b.pointX,
            X = a.pageY - b.pointY,
            h = b.x + g,
            d = b.y + X,
            Y,
            c,
            Z,
            f = W.timeStamp || Date.now();
            if (b.options.onBeforeScrollMove) {
                b.options.onBeforeScrollMove.call(b, W)
            }
            if (b.options.zoom && U && W.touches.length > 1) {
                Y = J.abs(W.touches[0].pageX - W.touches[1].pageX);
                c = J.abs(W.touches[0].pageY - W.touches[1].pageY);
                b.touchesDist = J.sqrt(Y * Y + c * c);
                b.zoomed = true;
                Z = 1 / b.touchesDistStart * b.touchesDist * this.scale;
                if (Z < b.options.zoomMin) {
                    Z = 0.5 * b.options.zoomMin * Math.pow(2, Z / b.options.zoomMin)
                } else {
                    if (Z > b.options.zoomMax) {
                        Z = 2 * b.options.zoomMax * Math.pow(0.5, b.options.zoomMax / Z)
                    }
                }
                b.lastScale = Z / this.scale;
                h = this.originX - this.originX * b.lastScale + this.x,
                d = this.originY - this.originY * b.lastScale + this.y;
                this.scroller.style[S + "Transform"] = B + h + "px," + d + "px" + T + " scale(" + Z + ")";
                if (b.options.onZoom) {
                    b.options.onZoom.call(b, W)
                }
                return
            }
            b.pointX = a.pageX;
            b.pointY = a.pageY;
            if (h > 0 || h < b.maxScrollX) {
                h = b.options.bounce ? b.x + (g / 2) : h >= 0 || b.maxScrollX >= 0 ? 0 : b.maxScrollX
            }
            if (d > b.minScrollY || d < b.maxScrollY) {
                d = b.options.bounce ? b.y + (X / 2) : d >= b.minScrollY || b.maxScrollY >= 0 ? b.minScrollY: b.maxScrollY
            }
            b.distX += g;
            b.distY += X;
            b.absDistX = J.abs(b.distX);
            b.absDistY = J.abs(b.distY);
            if (b.absDistX < 6 && b.absDistY < 6) {
                return
            }
            if (b.options.lockDirection) {
                if (b.absDistX > b.absDistY + 5) {
                    d = b.y;
                    X = 0
                } else {
                    if (b.absDistY > b.absDistX + 5) {
                        h = b.x;
                        g = 0
                    }
                }
            }
            b.moved = true;
            b._pos(h, d);
            b.dirX = g > 0 ? -1 : g < 0 ? 1 : 0;
            b.dirY = X > 0 ? -1 : X < 0 ? 1 : 0;
            if (f - b.startTime > 300) {
                b.startTime = f;
                b.startX = b.x;
                b.startY = b.y
            }
            if (b.options.onScrollMove) {
                b.options.onScrollMove.call(b, W)
            }
        },
        _end: function(Z) {
            if (U && Z.touches.length != 0) {
                return
            }
            var d = this,
            j = U ? Z.changedTouches[0] : Z,
            h,
            a,
            W = {
                dist: 0,
                time: 0
            },
            l = {
                dist: 0,
                time: 0
            },
            c = (Z.timeStamp || Date.now()) - d.startTime,
            k = d.x,
            b = d.y,
            g,
            f,
            i,
            Y,
            X;
            d._unbind(I);
            d._unbind(N);
            d._unbind(O);
            if (d.options.onBeforeScrollEnd) {
                d.options.onBeforeScrollEnd.call(d, Z)
            }
            if (d.zoomed) {
                X = d.scale * d.lastScale;
                X = Math.max(d.options.zoomMin, X);
                X = Math.min(d.options.zoomMax, X);
                d.lastScale = X / d.scale;
                d.scale = X;
                d.x = d.originX - d.originX * d.lastScale + d.x;
                d.y = d.originY - d.originY * d.lastScale + d.y;
                d.scroller.style[S + "TransitionDuration"] = "200ms";
                d.scroller.style[S + "Transform"] = B + d.x + "px," + d.y + "px" + T + " scale(" + d.scale + ")";
                d.zoomed = false;
                d.refresh();
                if (d.options.onZoomEnd) {
                    d.options.onZoomEnd.call(d, Z)
                }
                return
            }
            if (!d.moved) {
                if (U) {
                    if (d.doubleTapTimer && d.options.zoom) {
                        clearTimeout(d.doubleTapTimer);
                        d.doubleTapTimer = null;
                        if (d.options.onZoomStart) {
                            d.options.onZoomStart.call(d, Z)
                        }
                        d.zoom(d.pointX, d.pointY, d.scale == 1 ? d.options.doubleTapZoom: 1);
                        if (d.options.onZoomEnd) {
                            setTimeout(function() {
                                d.options.onZoomEnd.call(d, Z)
                            },
                            200)
                        }
                    } else {
                        d.doubleTapTimer = setTimeout(function() {
                            d.doubleTapTimer = null;
                            h = j.target;
                            while (h.nodeType != 1) {
                                h = h.parentNode
                            }
                            if (h.tagName != "SELECT" && h.tagName != "INPUT" && h.tagName != "TEXTAREA") {
                                a = document.createEvent("MouseEvents");
                                a.initMouseEvent("click", true, true, Z.view, 1, j.screenX, j.screenY, j.clientX, j.clientY, Z.ctrlKey, Z.altKey, Z.shiftKey, Z.metaKey, 0, null);
                                a._fake = true;
                                h.dispatchEvent(a)
                            }
                        },
                        d.options.zoom ? 250 : 0)
                    }
                }
                d._resetPos(200);
                if (d.options.onTouchEnd) {
                    d.options.onTouchEnd.call(d, Z)
                }
                return
            }
            if (c < 300 && d.options.momentum) {
                W = k ? d._momentum(k - d.startX, c, -d.x, d.scrollerW - d.wrapperW + d.x, d.options.bounce ? d.wrapperW: 0) : W;
                l = b ? d._momentum(b - d.startY, c, -d.y, (d.maxScrollY < 0 ? d.scrollerH - d.wrapperH + d.y - d.minScrollY: 0), d.options.bounce ? d.wrapperH: 0) : l;
                k = d.x + W.dist;
                b = d.y + l.dist;
                if ((d.x > 0 && k > 0) || (d.x < d.maxScrollX && k < d.maxScrollX)) {
                    W = {
                        dist: 0,
                        time: 0
                    }
                }
                if ((d.y > d.minScrollY && b > d.minScrollY) || (d.y < d.maxScrollY && b < d.maxScrollY)) {
                    l = {
                        dist: 0,
                        time: 0
                    }
                }
            }
            if (W.dist || l.dist) {
                i = J.max(J.max(W.time, l.time), 10);
                if (d.options.snap) {
                    g = k - d.absStartX;
                    f = b - d.absStartY;
                    if (J.abs(g) < d.options.snapThreshold && J.abs(f) < d.options.snapThreshold) {
                        d.scrollTo(d.absStartX, d.absStartY, 200)
                    } else {
                        Y = d._snap(k, b);
                        k = Y.x;
                        b = Y.y;
                        i = J.max(Y.time, i)
                    }
                }
                d.scrollTo(C(k), C(b), i);
                if (d.options.onTouchEnd) {
                    d.options.onTouchEnd.call(d, Z)
                }
                return
            }
            if (d.options.snap) {
                g = k - d.absStartX;
                f = b - d.absStartY;
                if (J.abs(g) < d.options.snapThreshold && J.abs(f) < d.options.snapThreshold) {
                    d.scrollTo(d.absStartX, d.absStartY, 200)
                } else {
                    Y = d._snap(d.x, d.y);
                    if (Y.x != d.x || Y.y != d.y) {
                        d.scrollTo(Y.x, Y.y, Y.time)
                    }
                }
                if (d.options.onTouchEnd) {
                    d.options.onTouchEnd.call(d, Z)
                }
                return
            }
            d._resetPos(200);
            if (d.options.onTouchEnd) {
                d.options.onTouchEnd.call(d, Z)
            }
        },
        _resetPos: function(Y) {
            var X = this,
            Z = X.x >= 0 ? 0 : X.x < X.maxScrollX ? X.maxScrollX: X.x,
            W = X.y >= X.minScrollY || X.maxScrollY > 0 ? X.minScrollY: X.y < X.maxScrollY ? X.maxScrollY: X.y;
            if (Z == X.x && W == X.y) {
                if (X.moved) {
                    X.moved = false;
                    if (X.options.onScrollEnd) {
                        X.options.onScrollEnd.call(X)
                    }
                }
                if (X.hScrollbar && X.options.hideScrollbar) {
                    if (S == "webkit") {
                        X.hScrollbarWrapper.style[S + "TransitionDelay"] = "300ms"
                    }
                    X.hScrollbarWrapper.style.opacity = "0"
                }
                if (X.vScrollbar && X.options.hideScrollbar) {
                    if (S == "webkit") {
                        X.vScrollbarWrapper.style[S + "TransitionDelay"] = "300ms"
                    }
                    X.vScrollbarWrapper.style.opacity = "0"
                }
                return
            }
            X.scrollTo(Z, W, Y || 0)
        },
        _wheel: function(X) {
            var Y = this,
            c, W, b, a, Z;
            if ("wheelDeltaX" in X) {
                c = X.wheelDeltaX / 12;
                W = X.wheelDeltaY / 12
            } else {
                if ("wheelDelta" in X) {
                    c = W = X.wheelDelta / 12
                } else {
                    if ("detail" in X) {
                        c = W = -X.detail * 3
                    } else {
                        return
                    }
                }
            }
            if (Y.options.wheelAction == "zoom") {
                Z = Y.scale * Math.pow(2, 1 / 3 * (W ? W / Math.abs(W) : 0));
                if (Z < Y.options.zoomMin) {
                    Z = Y.options.zoomMin
                }
                if (Z > Y.options.zoomMax) {
                    Z = Y.options.zoomMax
                }
                if (Z != Y.scale) {
                    if (!Y.wheelZoomCount && Y.options.onZoomStart) {
                        Y.options.onZoomStart.call(Y, X)
                    }
                    Y.wheelZoomCount++;
                    Y.zoom(X.pageX, X.pageY, Z, 400);
                    setTimeout(function() {
                        Y.wheelZoomCount--;
                        if (!Y.wheelZoomCount && Y.options.onZoomEnd) {
                            Y.options.onZoomEnd.call(Y, X)
                        }
                    },
                    400)
                }
                return
            }
            b = Y.x + c;
            a = Y.y + W;
            if (b > 0) {
                b = 0
            } else {
                if (b < Y.maxScrollX) {
                    b = Y.maxScrollX
                }
            }
            if (a > Y.minScrollY) {
                a = Y.minScrollY
            } else {
                if (a < Y.maxScrollY) {
                    a = Y.maxScrollY
                }
            }
            if (Y.maxScrollY < 0) {
                Y.scrollTo(b, a, 0)
            }
        },
        _mouseout: function(W) {
            var X = W.relatedTarget;
            if (!X) {
                this._end(W);
                return
            }
            while (X = X.parentNode) {
                if (X == this.wrapper) {
                    return
                }
            }
            this._end(W)
        },
        _transitionEnd: function(W) {
            var X = this;
            if (W.target != X.scroller) {
                return
            }
            X._unbind("webkitTransitionEnd");
            X._startAni()
        },
        _startAni: function() {
            var Y = this,
            X = Y.x,
            b = Y.y,
            a = Date.now(),
            W,
            c,
            Z;
            if (Y.animating) {
                return
            }
            if (!Y.steps.length) {
                Y._resetPos(400);
                return
            }
            W = Y.steps.shift();
            if (W.x == X && W.y == b) {
                W.time = 0
            }
            Y.animating = true;
            Y.moved = true;
            if (Y.options.useTransition) {
                Y._transitionTime(W.time);
                Y._pos(W.x, W.y);
                Y.animating = false;
                if (W.time) {
                    Y._bind("webkitTransitionEnd")
                } else {
                    Y._resetPos(0)
                }
                return
            }
            Z = function() {
                var f = Date.now(),
                d,
                e;
                if (f >= a + W.time) {
                    Y._pos(W.x, W.y);
                    Y.animating = false;
                    if (Y.options.onAnimationEnd) {
                        Y.options.onAnimationEnd.call(Y)
                    }
                    Y._startAni();
                    return
                }
                f = (f - a) / W.time - 1;
                c = J.sqrt(1 - f * f);
                d = (W.x - X) * c + X;
                e = (W.y - b) * c + b;
                Y._pos(d, e);
                if (Y.animating) {
                    Y.aniTime = L(Z)
                }
            };
            Z()
        },
        _transitionTime: function(W) {
            W += "ms";
            this.scroller.style[S + "TransitionDuration"] = W;
            if (this.hScrollbar) {
                this.hScrollbarIndicator.style[S + "TransitionDuration"] = W
            }
            if (this.vScrollbar) {
                this.vScrollbarIndicator.style[S + "TransitionDuration"] = W
            }
        },
        _momentum: function(d, W, c, X, a) {
            var f = 0.0006,
            Y = J.abs(d) / W,
            Z = (Y * Y) / (2 * f),
            b = 0,
            e = 0;
            if (d > 0 && Z > c) {
                e = a / (6 / (Z / Y * f));
                c = c + e;
                Y = Y * c / Z;
                Z = c
            } else {
                if (d < 0 && Z > X) {
                    e = a / (6 / (Z / Y * f));
                    X = X + e;
                    Y = Y * X / Z;
                    Z = X
                }
            }
            Z = Z * (d < 0 ? -1 : 1);
            b = Y / f;
            return {
                dist: Z,
                time: C(b)
            }
        },
        _offset: function(W) {
            var X = -W.offsetLeft,
            Y = -W.offsetTop;
            while (W = W.offsetParent) {
                X -= W.offsetLeft;
                Y -= W.offsetTop
            }
            if (W != this.wrapper) {
                X *= this.scale;
                Y *= this.scale
            }
            return {
                left: X,
                top: Y
            }
        },
        _snap: function(d, e) {
            var a = this,
            Z, c, X, W, Y, b;
            X = a.pagesX.length - 1;
            for (Z = 0, c = a.pagesX.length; Z < c; Z++) {
                if (d >= a.pagesX[Z]) {
                    X = Z;
                    break
                }
            }
            if (X == a.currPageX && X > 0 && a.dirX < 0) {
                X--
            }
            d = a.pagesX[X];
            Y = J.abs(d - a.pagesX[a.currPageX]);
            Y = Y ? J.abs(a.x - d) / Y * 500 : 0;
            a.currPageX = X;
            X = a.pagesY.length - 1;
            for (Z = 0; Z < X; Z++) {
                if (e >= a.pagesY[Z]) {
                    X = Z;
                    break
                }
            }
            if (X == a.currPageY && X > 0 && a.dirY < 0) {
                X--
            }
            e = a.pagesY[X];
            b = J.abs(e - a.pagesY[a.currPageY]);
            b = b ? J.abs(a.y - e) / b * 500 : 0;
            a.currPageY = X;
            W = C(J.max(Y, b)) || 200;
            return {
                x: d,
                y: e,
                time: W
            }
        },
        _bind: function(W, X, Y) { (X || this.scroller).addEventListener(W, this, !!Y)
        },
        _unbind: function(W, X, Y) { (X || this.scroller).removeEventListener(W, this, !!Y)
        },
        destroy: function() {
            var W = this;
            W.scroller.style[S + "Transform"] = "";
            W.hScrollbar = false;
            W.vScrollbar = false;
            W._scrollbar("h");
            W._scrollbar("v");
            W._unbind(E, window);
            W._unbind(V);
            W._unbind(I);
            W._unbind(N);
            W._unbind(O);
            if (!W.options.hasTouch) {
                W._unbind("mouseout", W.wrapper);
                W._unbind(M)
            }
            if (W.options.useTransition) {
                W._unbind("webkitTransitionEnd")
            }
            if (W.options.checkDOMChanges) {
                clearInterval(W.checkDOMTime)
            }
            if (W.options.onDestroy) {
                W.options.onDestroy.call(W)
            }
        },
        refresh: function() {
            var Y = this,
            W, X, Z, a, c = 0,
            b = 0;
            if (Y.scale < Y.options.zoomMin) {
                Y.scale = Y.options.zoomMin
            }
            Y.wrapperW = Y.wrapper.clientWidth || 1;
            Y.wrapperH = Y.wrapper.clientHeight || 1;
            Y.minScrollY = -Y.options.topOffset || 0;
            Y.scrollerW = C(Y.scroller.offsetWidth * Y.scale);
            Y.scrollerH = C((Y.scroller.offsetHeight + Y.minScrollY) * Y.scale);
            Y.maxScrollX = Y.wrapperW - Y.scrollerW;
            Y.maxScrollY = Y.wrapperH - Y.scrollerH + Y.minScrollY;
            Y.dirX = 0;
            Y.dirY = 0;
            if (Y.options.onRefresh) {
                Y.options.onRefresh.call(Y)
            }
            Y.hScroll = Y.options.hScroll && Y.maxScrollX < 0;
            Y.vScroll = Y.options.vScroll && (!Y.options.bounceLock && !Y.hScroll || Y.scrollerH > Y.wrapperH);
            Y.hScrollbar = Y.hScroll && Y.options.hScrollbar;
            Y.vScrollbar = Y.vScroll && Y.options.vScrollbar && Y.scrollerH > Y.wrapperH;
            W = Y._offset(Y.wrapper);
            Y.wrapperOffsetLeft = -W.left;
            Y.wrapperOffsetTop = -W.top;
            if (typeof Y.options.snap == "string") {
                Y.pagesX = [];
                Y.pagesY = [];
                a = Y.scroller.querySelectorAll(Y.options.snap);
                for (X = 0, Z = a.length; X < Z; X++) {
                    c = Y._offset(a[X]);
                    c.left += Y.wrapperOffsetLeft;
                    c.top += Y.wrapperOffsetTop;
                    Y.pagesX[X] = c.left < Y.maxScrollX ? Y.maxScrollX: c.left * Y.scale;
                    Y.pagesY[X] = c.top < Y.maxScrollY ? Y.maxScrollY: c.top * Y.scale
                }
            } else {
                if (Y.options.snap) {
                    Y.pagesX = [];
                    while (c >= Y.maxScrollX) {
                        Y.pagesX[b] = c;
                        c = c - Y.wrapperW;
                        b++
                    }
                    if (Y.maxScrollX % Y.wrapperW) {
                        Y.pagesX[Y.pagesX.length] = Y.maxScrollX - Y.pagesX[Y.pagesX.length - 1] + Y.pagesX[Y.pagesX.length - 1]
                    }
                    c = 0;
                    b = 0;
                    Y.pagesY = [];
                    while (c >= Y.maxScrollY) {
                        Y.pagesY[b] = c;
                        c = c - Y.wrapperH;
                        b++
                    }
                    if (Y.maxScrollY % Y.wrapperH) {
                        Y.pagesY[Y.pagesY.length] = Y.maxScrollY - Y.pagesY[Y.pagesY.length - 1] + Y.pagesY[Y.pagesY.length - 1]
                    }
                }
            }
            Y._scrollbar("h");
            Y._scrollbar("v");
            if (!Y.zoomed) {
                Y.scroller.style[S + "TransitionDuration"] = "0";
                Y._resetPos(200)
            }
        },
        scrollTo: function(b, c, W, d) {
            var Z = this,
            X = b,
            Y, a;
            Z.stop();
            if (!X.length) {
                X = [{
                    x: b,
                    y: c,
                    time: W,
                    relative: d
                }]
            }
            for (Y = 0, a = X.length; Y < a; Y++) {
                if (X[Y].relative) {
                    X[Y].x = Z.x - X[Y].x;
                    X[Y].y = Z.y - X[Y].y
                }
                Z.steps.push({
                    x: X[Y].x,
                    y: X[Y].y,
                    time: X[Y].time || 0
                })
            }
            Z._startAni()
        },
        scrollToElement: function(W, Z) {
            var X = this,
            Y;
            W = W.nodeType ? W: X.scroller.querySelector(W);
            if (!W) {
                return
            }
            Y = X._offset(W);
            Y.left += X.wrapperOffsetLeft;
            Y.top += X.wrapperOffsetTop;
            Y.left = Y.left > 0 ? 0 : Y.left < X.maxScrollX ? X.maxScrollX: Y.left;
            Y.top = Y.top > X.minScrollY ? X.minScrollY: Y.top < X.maxScrollY ? X.maxScrollY: Y.top;
            Z = Z === undefined ? J.max(J.abs(Y.left) * 2, J.abs(Y.top) * 2) : Z;
            X.scrollTo(Y.left, Y.top, Z)
        },
        scrollToPage: function(Y, X, Z) {
            var W = this,
            a, b;
            Z = Z === undefined ? 400 : Z;
            if (W.options.onScrollStart) {
                W.options.onScrollStart.call(W)
            }
            if (W.options.snap) {
                Y = Y == "next" ? W.currPageX + 1 : Y == "prev" ? W.currPageX - 1 : Y;
                X = X == "next" ? W.currPageY + 1 : X == "prev" ? W.currPageY - 1 : X;
                Y = Y < 0 ? 0 : Y > W.pagesX.length - 1 ? W.pagesX.length - 1 : Y;
                X = X < 0 ? 0 : X > W.pagesY.length - 1 ? W.pagesY.length - 1 : X;
                W.currPageX = Y;
                W.currPageY = X;
                a = W.pagesX[Y];
                b = W.pagesY[X]
            } else {
                a = -W.wrapperW * Y;
                b = -W.wrapperH * X;
                if (a < W.maxScrollX) {
                    a = W.maxScrollX
                }
                if (b < W.maxScrollY) {
                    b = W.maxScrollY
                }
            }
            W.scrollTo(a, b, Z)
        },
        disable: function() {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(I);
            this._unbind(N);
            this._unbind(O)
        },
        enable: function() {
            this.enabled = true
        },
        stop: function() {
            if (this.options.useTransition) {
                this._unbind("webkitTransitionEnd")
            } else {
                D(this.aniTime)
            }
            this.steps = [];
            this.moved = false;
            this.animating = false
        },
        zoom: function(Y, Z, a, b) {
            var X = this,
            W = a / X.scale;
            if (!X.options.useTransform) {
                return
            }
            X.zoomed = true;
            b = b === undefined ? 200 : b;
            Y = Y - X.wrapperOffsetLeft - X.x;
            Z = Z - X.wrapperOffsetTop - X.y;
            X.x = Y - Y * W + X.x;
            X.y = Z - Z * W + X.y;
            X.scale = a;
            X.refresh();
            X.x = X.x > 0 ? 0 : X.x < X.maxScrollX ? X.maxScrollX: X.x;
            X.y = X.y > X.minScrollY ? X.minScrollY: X.y < X.maxScrollY ? X.maxScrollY: X.y;
            X.scroller.style[S + "TransitionDuration"] = b + "ms";
            X.scroller.style[S + "Transform"] = B + X.x + "px," + X.y + "px" + T + " scale(" + a + ")";
            X.zoomed = false
        },
        isReady: function() {
            return ! this.moved && !this.zoomed && !this.animating
        }
    };
    if (typeof exports !== "undefined") {
        exports.iScroll = F
    } else {
        window.iScroll = F
    }
})();