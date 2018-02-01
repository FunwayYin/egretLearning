var __reflect = this && this.__reflect ||
    function (e, t, a) {
        e.__class__ = t,
            a ? a.push(t) : a = [t],
            e.__types__ = e.__types__ ? a.concat(e.__types__) : a
    },
    __extends = this && this.__extends ||
        function (e, t) {
            function a() {
                this.constructor = e
            }

            for (var r in t)
                t.hasOwnProperty(r) && (e[r] = t[r]);
            e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype, new a)
        },
    Global;
!
    function (e) {
        var t;
        !
            function (e) {
                e[e.regular = 0] = "regular",
                    e[e.tip = 1] = "tip"
            }(t = e.msgType || (e.msgType = {}));
        var a = function (e) {
            function a(a, r) {
                void 0 === r && (r = t.regular);
                var n = e.call(this) || this;
                return n._msgWidth = .8 * Data.stageWidth,
                    n._msgHeight = .9 * Data.stageHeight,
                    n.padding = 50,
                    n.textSize = 30,
                    n.str = a,
                    n._curType = r,
                    n.createMsg(),
                    n
            }

            return __extends(a, e),
                a.getInstance = function (e, r) {
                    return void 0 === r && (r = t.regular),
                        null == a.instance ? a.instance = new a(e, r) : (a.instance.msgTxt = e, a.instance._curType = r, a.instance.update()),
                        a.instance
                },
                a.prototype.createMsg = function () {
                    var e = new egret.Shape,
                        a = new egret.DisplayObjectContainer;
                    this.addChild(a);
                    var r = Tool.createBitmapByName("public_msg_bg_png");
                    r.width = this._msgWidth,
                        a.addChild(r);
                    var n = new egret.TextField;
                    n.textColor = 0,
                        n.size = this.textSize,
                        n.textAlign = "center",
                        n.lineSpacing = 10,
                        n.x = this.padding,
                        n.y = this.padding,
                        n.text = this.str,
                        this._msgTxt = n,
                        a.addChild(n);
                    var o;
                    this.update = function () {
                        egret.Tween.removeTweens(a),
                            a.alpha = 1,
                            this._curType == t.regular ? o ? a.addChild(o) : (o = this.createBtn("确定"), o.y = r.height - 100, a.addChild(o)) : Tool.remove(o),
                            e.graphics.clear(),
                            e = new egret.Shape,
                            e.graphics.beginFill(0),
                            e.graphics.drawRect(0, 0, Data.stageWidth, Data.stageHeight),
                            e.graphics.endFill(),
                            e.alpha = .3,
                            e.touchEnabled = !0,
                            this.addChild(e),
                            this.setChildIndex(e, 0),
                            r.width = this._msgWidth,
                            n.width = this._msgWidth - 2 * this.padding,
                            this._curType == t.regular ? (r.height = n.height + 100 + 2 * this.padding, r.height > this._msgHeight && (r.height = this._msgHeight, n.height = this._msgHeight - 100 - 2 * this.padding)) : this._curType == t.tip && (r.height = n.height + 2 * this.padding, r.height > this._msgHeight && (r.height = this._msgHeight, n.height = this._msgHeight - 2 * this.padding)),
                        this._curType == t.regular && (o.update(), o.y = r.height - 100),
                            a.x = Math.round(Data.stageWidth / 2),
                            a.y = Math.round(Data.stageHeight / 2),
                            a.anchorOffsetX = Math.round(a.width / 2),
                            a.anchorOffsetY = Math.round(a.height / 2),
                        this._curType == t.tip && (a.y += 100, a.alpha = 0, egret.Tween.get(a).to({
                            y: a.y - 100,
                            alpha: 1
                        }, 300, egret.Ease.quadOut).wait(500).to({
                            y: a.y - 200,
                            alpha: 0
                        }, 300, egret.Ease.quadIn).call(this.hideMsg, this))
                    },
                        this.update()
                },
                a.prototype.createBtn = function (e) {
                    var t = this,
                        a = new egret.Sprite,
                        r = Tool.createBitmapByName("public_msg_btn_bg_png");
                    r.width = this._msgWidth,
                        r.alpha = 0;
                    var n = new egret.Sprite;
                    n.graphics.beginFill(13816789),
                        n.graphics.drawRect(0, 0, this._msgWidth, 1),
                        n.graphics.endFill();
                    var o = new egret.TextField;
                    return o.textColor = 49664,
                        o.size = this.textSize + 4,
                        o.textAlign = "center",
                        o.width = this._msgWidth,
                        o.text = e,
                        o.y = Math.round((r.height - o.textHeight) / 2),
                        a.addChild(r),
                        a.addChild(n),
                        a.addChild(o),
                        a.update = function () {
                            r.width = t._msgWidth,
                                n.graphics.clear(),
                                n = new egret.Sprite,
                                n.graphics.beginFill(13816789),
                                n.graphics.drawRect(0, 0, t._msgWidth, 1),
                                n.graphics.endFill(),
                                a.addChild(n),
                                a.setChildIndex(n, 0),
                                o.width = t._msgWidth
                        },
                        this.onBegin = function (e) {
                            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this),
                                egret.Tween.get(r).to({
                                    alpha: 1
                                }, 100)
                        },
                        this.onEnd = function () {
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this),
                                egret.Tween.get(r).to({
                                    alpha: 0
                                }, 100)
                        },
                        a.name = "ok",
                        a.touchEnabled = !0,
                        a.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this),
                        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
                        a
                },
                a.prototype.addEvent = function (e) {
                    e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this),
                        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
                        e.touchEnabled = !0
                },
                a.prototype.onTap = function (e) {
                    "ok" == e.currentTarget.name && (this.touchChildren = !1, this.hideMsg())
                },
                a.prototype.hideMsg = function () {
                    egret.Tween.removeTweens(this),
                        egret.Tween.get(this).to({
                            alpha: 0
                        }, 100, egret.Ease.quadInOut).call(Tool.remove, this, [this])
                },
                Object.defineProperty(a.prototype, "msgWidth", {
                    get: function () {
                        return this._msgWidth
                    },
                    set: function (e) {
                        this._msgWidth = e
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, "msgHeight", {
                    get: function () {
                        return this._msgHeight
                    },
                    set: function (e) {
                        this._msgHeight = e
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, "msgTxt", {
                    set: function (e) {
                        this._msgTxt.text = e
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                a
        }(egret.Sprite);
        e.Msg = a,
            __reflect(a.prototype, "Global.Msg")
    }(Global || (Global = {}));
var Data = function () {
    function e() {
    }

    return Object.defineProperty(e, "方法", {
        get: function () {
        },
        set: function (e) {
        },
        enumerable: !0,
        configurable: !0
    }),
        e
}();
Data.stageWidth = 640,
    Data.stageHeight = 1030,
    __reflect(Data.prototype, "Data");
var Events = function (e) {
    function t(t, a, r, n) {
        void 0 === a && (a = ""),
        void 0 === r && (r = !1),
        void 0 === n && (n = !1);
        var o = e.call(this, t, r, n) || this;
        return o._resName = "",
            o._resName = a,
            o
    }

    return __extends(t, e),
        Object.defineProperty(t.prototype, "resName", {
            get: function () {
                return this._resName
            },
            enumerable: !0,
            configurable: !0
        }),
        t
}(egret.Event);
Events.LOAD_COMPLETE = "loadComplte",
    Events.SHOW_PAGE = "showPage",
    __reflect(Events.prototype, "Events");
var LoadingUI = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.loaded = 0,
            t.count = 0,
            t.mcArrX = [
                [74, 98],
                [-15, 74],
                [-105, 48],
                [-75, 128],
                [-140, 100],
                [-234, 0],
                [-276, 163],
                [-273, 119],
                [-346, -46],
                [-404, 75],
                [-468, 241],
                [-470, 174],
                [-527, -109],
                [-619, -2],
                [-659, 77],
                [-527, 216],
                [-715, 137],
                [-726, 369],
                [-750, -252],
                [-960, -195],
                [-930, -47],
                [-951, 331],
                [-1006, 34],
                [-1023, 181],
                [-1143, 296],
                [-1159, 566],
                [-1058, -338],
                [-1304, -165],
                [-1366, -38],
                [-1347, 177],
                [-1292, 342],
                [-1297, 492],
                [-1399, -319],
                [-1363, 46],
                [-1442, 357]
            ],
            t.mcArrS = [1, 1, 1.5, 1.5, 1, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            t.mcArrR = [-6.72, -6.72, -6.72, -6.72, -6.72, -6.72, -18.72, -6.72, -6.72, -6.72, -24.72, -6.72, 8.28, 8.28, -2.49, -15.72, -15.72, -19.22, 8.28, 8.28, 8.28, -22.72, -2.49, -2.49, -2.49, -15.72, 8.28, 8.28, 8.28, -2.49, -17.26, -15.72, 8.28, -2.49, -2.49],
            t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
                this.createView()
        },
        t.prototype.createView = function () {
            var e = Tool.createBitmapByName("loadBg_jpg");
            this.addChild(e);
            var t = new egret.Sprite;
            this.addChild(t),
                t.x = 246,
                t.y = 430,
                this.horse_mc = t;
            var a = Tool.createBitmapByName("load_sand2_png");
            t.addChild(a),
                a.anchorOffsetX = 184,
                a.anchorOffsetY = 46,
                a.x = 114.2,
                a.y = 98.1,
                a.scaleX = .29,
                a.scaleY = .29,
                a.rotation = 0,
                a.alpha = .11;
            var r = egret.Tween.get(a, {
                loop: !0
            });
            r.to({
                x: 114.2,
                y: 97.5,
                scaleX: .3,
                scaleY: .3,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(5), egret.Ease.quadInOut).wait(Tool.f2t(16));
            var n = Tool.createBitmapByName("load_sand2_png");
            t.addChild(n),
                n.anchorOffsetX = 184,
                n.anchorOffsetY = 46,
                n.x = 65.7,
                n.y = 93.8,
                n.scaleX = .26,
                n.scaleY = .26,
                n.rotation = 0,
                n.alpha = .45;
            var r = egret.Tween.get(n, {
                loop: !0
            });
            r.to({
                x: 65.7,
                y: 93.8,
                scaleX: .3,
                scaleY: .3,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(9), egret.Ease.quadInOut).wait(Tool.f2t(12));
            var o = Tool.createBitmapByName("load_sand2_png");
            t.addChild(o),
                o.anchorOffsetX = 184,
                o.anchorOffsetY = 46,
                o.x = 104.7,
                o.y = 93.8,
                o.scaleX = .2,
                o.scaleY = .2,
                o.rotation = 0,
                o.alpha = 1;
            var r = egret.Tween.get(o, {
                loop: !0
            });
            r.to({
                x: 104.7,
                y: 93.8,
                scaleX: .3,
                scaleY: .3,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(13), egret.Ease.quadInOut).wait(Tool.f2t(8));
            var i = Tool.createBitmapByName("load_sand2_png");
            t.addChild(i),
                i.anchorOffsetX = 184,
                i.anchorOffsetY = 46,
                i.x = 84.2,
                i.y = 97.5,
                i.scaleX = .14,
                i.scaleY = .14,
                i.rotation = 0,
                i.alpha = .45;
            var r = egret.Tween.get(i, {
                loop: !0
            });
            r.to({
                x: 84.2,
                y: 97.5,
                scaleX: .2,
                scaleY: .2,
                rotation: 0,
                alpha: 1
            }, Tool.f2t(5), egret.Ease.quadInOut).to({
                x: 84.2,
                y: 97.5,
                scaleX: .3,
                scaleY: .3,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(12), egret.Ease.quadInOut).wait(Tool.f2t(4));
            var s = Tool.createBitmapByName("load_sand2_png");
            t.addChild(s),
                s.anchorOffsetX = 184,
                s.anchorOffsetY = 46,
                s.x = 114.2,
                s.y = 97.5,
                s.scaleX = .1,
                s.scaleY = .1,
                s.rotation = 0,
                s.alpha = 0;
            var r = egret.Tween.get(s, {
                loop: !0
            });
            r.to({
                x: 114.2,
                y: 97.5,
                scaleX: .2,
                scaleY: .2,
                rotation: 0,
                alpha: 1
            }, Tool.f2t(13), egret.Ease.quadInOut).to({
                x: 114.2,
                y: 97.5,
                scaleX: .29,
                scaleY: .29,
                rotation: 0,
                alpha: .11
            }, Tool.f2t(8), egret.Ease.quadInOut);
            var h = Tool.createBitmapByName("load_sand2_png");
            t.addChild(h),
                h.anchorOffsetX = 184,
                h.anchorOffsetY = 46,
                h.x = 65.7,
                h.y = 93.8,
                h.scaleX = .1,
                h.scaleY = .1,
                h.rotation = 0,
                h.alpha = 0;
            var r = egret.Tween.get(h, {
                loop: !0
            });
            r.wait(Tool.f2t(5)).to({
                x: 65.7,
                y: 93.8,
                scaleX: .1,
                scaleY: .1,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(0), egret.Ease.quadInOut).to({
                x: 65.7,
                y: 93.8,
                scaleX: .2,
                scaleY: .2,
                rotation: 0,
                alpha: 1
            }, Tool.f2t(12), egret.Ease.quadInOut).to({
                x: 65.7,
                y: 93.8,
                scaleX: .26,
                scaleY: .26,
                rotation: 0,
                alpha: .45
            }, Tool.f2t(4), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("load_sand2_png");
            t.addChild(d),
                d.anchorOffsetX = 184,
                d.anchorOffsetY = 46,
                d.x = 104.7,
                d.y = 93.8,
                d.scaleX = .1,
                d.scaleY = .1,
                d.rotation = 0,
                d.alpha = 0;
            var r = egret.Tween.get(d, {
                loop: !0
            });
            r.wait(Tool.f2t(9)).to({
                x: 104.7,
                y: 93.8,
                scaleX: .1,
                scaleY: .1,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(0), egret.Ease.quadInOut).to({
                x: 104.7,
                y: 93.8,
                scaleX: .2,
                scaleY: .2,
                rotation: 0,
                alpha: 1
            }, Tool.f2t(12), egret.Ease.quadInOut);
            var l = Tool.createBitmapByName("load_sand2_png");
            t.addChild(l),
                l.anchorOffsetX = 184,
                l.anchorOffsetY = 46,
                l.x = 84.2,
                l.y = 97.5,
                l.scaleX = .1,
                l.scaleY = .1,
                l.rotation = 0,
                l.alpha = 0;
            var r = egret.Tween.get(l, {
                loop: !0
            });
            r.wait(Tool.f2t(13)).to({
                x: 84.2,
                y: 97.5,
                scaleX: .1,
                scaleY: .1,
                rotation: 0,
                alpha: 0
            }, Tool.f2t(0), egret.Ease.quadInOut).to({
                x: 84.2,
                y: 97.5,
                scaleX: .14,
                scaleY: .14,
                rotation: 0,
                alpha: .45
            }, Tool.f2t(8), egret.Ease.quadInOut);
            var c = new Horse;
            t.addChild(c);
            var g = new egret.Sprite;
            t.addChild(g),
                g.x = 55,
                g.y = 94;
            var u = new egret.Sprite;
            t.addChild(u),
                u.x = 74,
                u.y = 98;
            var p = new egret.Sprite;
            t.addChild(p),
                p.x = 94,
                p.y = 94;
            var T = new egret.Sprite;
            t.addChild(T),
                T.x = 104,
                T.y = 98;
            var _ = Tool.createBitmapByName("loadTxt_png");
            this.addChild(_),
                _.x = 194,
                _.y = 570,
                this.txt = _,
                this.myTimer = new egret.Timer(15),
                this.myTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this),
                this.myTimer.start()
        },
        t.prototype.setProgress = function (e, t) {
            var a = Math.floor(e / t * 100);
            this.loaded = a
        },
        t.prototype.onTimer = function () {
            var e = this;
            this.loaded > this.count && (this.count = this.loaded, this.count >= 100 && (this.myTimer.stop(), this.myTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this), egret.Tween.get(this.txt).wait(1e3).to({
                alpha: 0
            }, 500, egret.Ease.quadInOut).call(Tool.removeMc, this, [this.txt]), setTimeout(function () {
                e.scene2()
            }, 1500)))
        },
        t.prototype.scene2 = function () {
            for (var e = this, t = 0; t < this.mcArrX.length; t++) {
                var a = Tool.createBitmapByName("load_sand2_png");
                this.horse_mc.addChild(a),
                    a.anchorOffsetX = 184,
                    a.anchorOffsetY = 46,
                    a.x = this.mcArrX[t][0],
                    a.y = this.mcArrX[t][1],
                    a.scaleX = a.scaleY = 0,
                    a.rotation = this.mcArrR[t],
                    a.alpha = 0,
                    egret.Tween.get(a).wait(50 * t).to({
                        alpha: 1,
                        scaleX: 1.5 * this.mcArrS[t],
                        scaleY: 1.5 * this.mcArrS[t]
                    }, 800, egret.Ease.quadOut)
            }
            var r = Tool.createBitmapByName("bg1_1_jpg");
            this.addChild(r),
                r.alpha = 0,
                egret.Tween.get(this.horse_mc).to({
                    x: 900
                }, 900, egret.Ease.quadIn).to({
                    x: 1800
                }, 1e3, egret.Ease.quadOut),
                egret.Tween.get(r).wait(1500).to({
                    alpha: 1
                }, 1e3, egret.Ease.quadInOut).call(function () {
                    e.dispatchEventWith(Events.LOAD_COMPLETE)
                })
        },
        t
}(egret.Sprite);
__reflect(LoadingUI.prototype, "LoadingUI");
var Main = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.currentNum = 0,
            t.page_array = [Page1, Page2],
            t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
                RES.loadConfig("resource/default.res.json?v=" + Math.random(), "resource/")
        },
        t.prototype.onConfigComplete = function (e) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
                RES.loadGroup("loadingUI")
        },
        t.prototype.onResourceLoadComplete = function (e) {
            "loadingUI" == e.groupName ? (this.init(), RES.loadGroup("preload")) : "preload" == e.groupName ? (RES.loadGroup("nextload"), console.log("preload")) : "nextload" == e.groupName && (console.log("nextload"), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this), Util.isloaded = !0, Util.iswait && this.showScene())
        },
        t.prototype.onItemLoadError = function (e) {
            console.warn("Url:" + e.resItem.url + " has failed to load")
        },
        t.prototype.onResourceLoadError = function (e) {
            console.warn("Group:" + e.groupName + " has failed to load"),
                this.onResourceLoadComplete(e)
        },
        t.prototype.onResourceProgress = function (e) {
            "preload" == e.groupName && this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal)
        },
        t.prototype.init = function () {
            Util.mainRoot = this,
                Data.stageWidth = this.stage.stageWidth,
                Data.stageHeight = this.stage.stageHeight,
                this.container = new egret.Sprite,
                this.addChild(this.container),
                this.loadingView = new LoadingUI,
                this.stage.addChild(this.loadingView),
                this.loadingView.addEventListener(Events.LOAD_COMPLETE, this.craeteScene, this);
            var e = new BgSound;
            e.x = 600,
                e.y = 50,
                this.stage.addChild(e),
                EM.dispatch().addEventListener("showResult", this.showResult, this),
                EM.dispatch().addEventListener("showScene", this.showScene, this),
                EM.dispatch().addEventListener("showShare", this.showShare, this),
                play_music()
        },
        t.prototype.craeteScene = function (e) {
            egret.Tween.get(this.loadingView).to({
                alpha: 0
            }).call(Tool.remove, this, [this.loadingView]),
                this.changeScene()
        },
        t.prototype.changeScene = function () {
            this.currentPage && egret.Tween.get(this.currentPage).wait(200).to({
                alpha: 0
            }).call(Tool.removeMc, this, [this.currentPage]),
                this.currentPage = new this.page_array[this.currentNum],
                this.container.addChild(this.currentPage),
                this.currentPage.addEventListener("changeScene", this.changeScene, this),
            this.currentNum < this.page_array.length && this.currentNum++
        },
        t.prototype.showScene = function () {
            this.currentPage && (egret.Tween.get(this.currentPage).to({
                x: -640
            }, 1500, egret.Ease.quartInOut).call(Tool.remove, this, [this.currentPage]), this.currentPage = null),
                this.currentPage = new Scene,
                this.container.addChild(this.currentPage),
                this.currentPage.x = 640,
                egret.Tween.get(this.currentPage).to({
                    x: 0
                }, 1500, egret.Ease.quartInOut)
        },
        t.prototype.showResult = function () {
            this.currentPage && (egret.Tween.get(this.currentPage).to({
                alpha: 0
            }, 1e3, egret.Ease.quadOut).call(Tool.remove, this, [this.currentPage]), this.currentPage = null),
                this.currentPage = new Result,
                this.container.addChild(this.currentPage)
        },
        t.prototype.showShare = function () {
            this.share = new Share,
                this.share.alpha = 0,
                egret.Tween.removeTweens(this.share),
                egret.Tween.get(this.share).to({
                    alpha: 1
                }, 500, egret.Ease.quadInOut),
                this.stage.addChild(this.share),
                this.share.addEventListener("hideLayer", this.hideLayer, this)
        },
        t.prototype.hideLayer = function (e) {
            egret.Tween.get(e.currentTarget).to({
                alpha: 0
            }, 600, egret.Ease.quadInOut).call(Tool.remove, this, [e.currentTarget])
        },
        t
}(egret.DisplayObjectContainer);
__reflect(Main.prototype, "Main");
var Tool = function () {
    function e() {
    }

    return e.f2t = function (e, t) {
        return void 0 === t && (t = 30),
        e / t * 1e3
    },
        e.gear = function (e, t) {
            return void 0 === t && (t = 1),
            e * t
        },
        e.hitTest = function (e, t) {
            var a = e.getBounds(),
                r = t.getBounds();
            return a.x = e.x,
                a.y = e.y,
                r.x = t.x,
                r.y = t.y,
                a.intersects(r)
        },
        e.hitTest2 = function (e, t, a, r, n, o, i, s) {
            return e >= n && e >= n + i ? !1 : n >= e && n >= e + a ? !1 : t >= o && t >= o + s ? !1 : o >= t && o >= t + r ? !1 : !0
        },
        e.removeMc = function (e) {
            e.parent && e.parent.removeChild(e)
        },
        e.remove = function (e) {
            e ? e.parent && e.parent.removeChild(e) : console.log("Tool.remove:对象为空")
        },
        e.anchorXY = function (e, t, a) {
            var r = t || 0 == t ? t : Math.round(e.width / 2),
                n = a || 0 == a ? a : Math.round(e.height / 2);
            e.anchorOffsetX = r,
                e.anchorOffsetY = n
        },
        e.getMcData = function (e, t) {
            e = RES.getRes(e),
                t = RES.getRes(t);
            var a = new egret.MovieClipDataFactory(e, t);
            return a
        },
        e.createBitmapByName = function (e) {
            var t = new egret.Bitmap,
                a = RES.getRes(e);
            return t.texture = a,
                t
        },
        e.createSprite = function (e, t) {
            void 0 === t && (t = [0, 0, 640, 1030]);
            var a = new egret.Sprite;
            return a.graphics.beginFill(e),
                a.graphics.drawRect(t[0], t[1], t[2], t[3]),
                a.graphics.endFill(),
                a
        },
        e.getRandom = function (e, t, a) {
            void 0 === a && (a = 2);
            var r = Math.random() * (t - e) + e;
            return r.toFixed(a),
                r
        },
        e.RandomString = function (e) {
            for (var t = ""; t.length < e; t += Math.random().toString(36).substr(2)) ;
            return t.substr(0, e)
        },
        e.FormatData = function (e, t) {
            void 0 === t && (t = []);
            var a = 20,
                r = new egret.TextField;
            r.size = a;
            for (var n, o, i = [], s = 0; s < e.length; s++)
                r.text = e.substr(s, 1),
                    n = new egret.RenderTexture,
                    n.drawToTexture(r, new egret.Rectangle(0, 0, r.width, r.height)),
                    o = new egret.Bitmap,
                    o.texture = n,
                    i.push(o);
            for (var s = 0; s < t.length; s++) {
                o = t[s];
                var h = a / o.width;
                o.width = a,
                    o.height = h * o.height,
                    o.scaleX = o.scaleY = h,
                    n = new egret.RenderTexture,
                    n.drawToTexture(o, new egret.Rectangle(0, 0, o.width, o.height)),
                    o = new egret.Bitmap,
                    o.texture = n,
                    i.push(o)
            }
            for (var d = [], l = [], s = 0; s < i.length; s++) {
                d = [],
                    o = i[s];
                for (var c = 0; c < o.width; c++)
                    for (var g = 0; g < o.height; g++)
                        o.texture.getPixel32(c, g)[3] > 127.5 && d.push([c, g]);
                l.push(d)
            }
            return l
        },
        e
}();
__reflect(Tool.prototype, "Tool");
var Util = function () {
    function e() {
    }

    return e
}();
Util.infoId = 1,
    Util.isloaded = !1,
    Util.iswait = !1,
    __reflect(Util.prototype, "Util");
var Meteor = function (e) {
    function t(t) {
        var a = e.call(this) || this;
        a.textureName = t;
        var r = Tool.createBitmapByName(a.textureName);
        return Tool.anchorXY(r),
            r.x = r.width,
            r.y = r.height,
            a.addChild(r),
            a.loop(r),
            a
    }

    return __extends(t, e),
        t.produce = function (e) {
            var a = e;
            null == t.cacheDict[a] && (t.cacheDict[a] = []);
            var r, n = t.cacheDict[a];
            return r = n.length > 0 ? n.pop() : new t(a)
        },
        t.reclaim = function (e) {
            null == t.cacheDict[e.textureName] && (t.cacheDict[e.textureName] = []);
            var a = t.cacheDict[e.textureName];
            -1 == a.indexOf(e) && a.push(e),
                Tool.remove(e)
        },
        t.prototype.loop = function (e) {
            var t, a, r;
            a = 600 * Math.random() - 300,
                r = -100 > a ? 350 * Math.random() : -e.height,
                e.x = a,
                e.y = r,
                e.scaleX = e.scaleY = .5 + .5 * Math.random(),
                e.alpha = 1 - (1 - e.scaleX) / .5 * .5,
                t = egret.Tween.get(e),
                t.wait(1500 * Math.random() + 500).to({
                    x: a + 1e3,
                    y: r + 1e3 * Math.tan(Math.PI / 180 * 40)
                }, 4e3 / e.scaleX).call(this.loop, this, [e])
        },
        t
}(egret.Sprite);
Meteor.cacheDict = {},
    __reflect(Meteor.prototype, "Meteor");
var Star = function (e) {
    function t(t) {
        var a = e.call(this) || this;
        a.textureName = t;
        var r = Tool.createBitmapByName(a.textureName);
        return Tool.anchorXY(r),
            r.x = r.width,
            r.y = r.height,
            a.addChild(r),
            a.loop(r),
            a
    }

    return __extends(t, e),
        t.produce = function (e) {
            var a = e;
            null == t.cacheDict[a] && (t.cacheDict[a] = []);
            var r, n = t.cacheDict[a];
            return r = n.length > 0 ? n.pop() : new t(a)
        },
        t.reclaim = function (e) {
            null == t.cacheDict[e.textureName] && (t.cacheDict[e.textureName] = []);
            var a = t.cacheDict[e.textureName];
            -1 == a.indexOf(e) && a.push(e),
                Tool.remove(e)
        },
        t.prototype.loop = function (e) {
            var t = .7 * Math.random() + .3;
            e.x = Tool.getRandom(0, 640),
                e.y = Tool.getRandom(0, 1030),
                e.alpha = 0,
                egret.Tween.get(e).to({
                    scaleX: t,
                    scaleY: t,
                    alpha: t
                }, Tool.gear(250 * Math.random() + 400), egret.Ease.quadInOut).to({
                    scaleX: t / 2,
                    scaleY: t / 2,
                    alpha: 0
                }, Tool.gear(250 * Math.random() + 400), egret.Ease.quadInOut).call(this.loop, this, [e])
        },
        t
}(egret.Sprite);
Star.cacheDict = {},
    __reflect(Star.prototype, "Star");
var Gift = function (e) {
    function t(t) {
        var a = e.call(this) || this;
        a.textureName = t;
        var r = Tool.createBitmapByName(a.textureName);
        Tool.anchorXY(r),
            r.x = r.width,
            r.y = r.height,
            a.addChild(r);
        var n = egret.Tween.get(r, {
            loop: !0
        });
        return n.to({
            rotation: 359
        }, 3e3),
            a
    }

    return __extends(t, e),
        t.produce = function () {
            var e = Math.floor(Math.random() * this.TextureName_array.length),
                a = t.TextureName_array[e];
            null == t.cacheDict[a] && (t.cacheDict[a] = []);
            var r, n = t.cacheDict[a];
            return n.length > 0 ? r = n.pop() : (r = new t(a), r.speed = t.dropSpeed_array[e], r.score = t.score_array[e]),
                r
        },
        t.reclaim = function (e) {
            null == t.cacheDict[e.textureName] && (t.cacheDict[e.textureName] = []);
            var a = t.cacheDict[e.textureName];
            -1 == a.indexOf(e) && a.push(e),
                Tool.remove(e)
        },
        t
}(egret.Sprite);
Gift.TextureName_array = ["egret_icon1_png", "egret_icon2_png", "egret_icon3_png"],
    Gift.dropSpeed_array = [10, 8, 6, 5],
    Gift.score_array = [50, 40, 30, 10],
    Gift.cacheDict = {},
    __reflect(Gift.prototype, "Gift");
var BgSound = function (e) {
    function t() {
        var a = e.call(this) || this;
        a.soundBtn = new egret.Sprite,
            a.addChild(a.soundBtn);
        var r = Tool.createBitmapByName("music_icon1_png");
        a.soundBtn.addChild(r),
            t.icon1 = r,
            Tool.anchorXY(t.icon1);
        var n = egret.Tween.get(t.icon1, {
            loop: !0
        });
        n.to({
            rotation: 359
        }, 3e3);
        var o = Tool.createBitmapByName("music_icon2_png");
        return Tool.anchorXY(o),
            a.soundBtn.addChild(o),
            t.icon2 = o,
            t.icon2.visible = !1,
            a.soundBtn.touchEnabled = !0,
            a.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, t.playSound, a),
            a
    }

    return __extends(t, e),
        t.playSound = function (e) {
            void 0 === e && (e = null),
                t.status = play_sound(),
                t.status ? (t.icon1.visible = !0, t.icon2.visible = !1) : (t.icon1.visible = !1, t.icon2.visible = !0)
        },
        t
}(egret.Sprite);
__reflect(BgSound.prototype, "BgSound");
var EM = function (e) {
    function t() {
        return e.call(this) || this
    }

    return __extends(t, e),
        t.dispatch = function (e) {
            return void 0 === e && (e = null),
                null != e ? (t.dispatchDict[e] || (t.dispatchDict[e] = new egret.EventDispatcher), t.dispatchDict[e]) : (null == t._dispatch && (t._dispatch = new egret.EventDispatcher), t._dispatch)
        },
        t.removeDispatch = function (e) {
            null != t.dispatchDict && (null == t.dispatchDict[e] && t.removeEvent(t.dispatchDict[e]), delete t.dispatchDict[e])
        },
        t.addEvent = function (e, a, r, n) {
            t.eventDict[e.hashCode] || (t.eventDict[e.hashCode] = {}),
            t.eventDict[e.hashCode][a] && e.removeEventListener(a, t.eventDict[e.hashCode][a].listener, t.eventDict[e.hashCode][a].thisObject),
                t.eventDict[e.hashCode][a] = {
                    dispatch: e,
                    type: a,
                    listener: r,
                    thisObject: n
                },
                e.addEventListener(a, r, n)
        },
        t.removeEvent = function (e, a) {
            if (void 0 === a && (a = null), t.eventDict[e.hashCode]) {
                var r;
                if (null == a) {
                    for (var n in t.eventDict[e.hashCode])
                        r = t.eventDict[e.hashCode][n],
                            e.removeEventListener(r.type, r.listener, r.thisObject);
                    delete t.eventDict[e.hashCode]
                } else r = t.eventDict[e.hashCode][a],
                    e.removeEventListener(r.type, r.listener, r.thisObject),
                    delete t.eventDict[e.hashCode][a]
            }
        },
        t
}(egret.EventDispatcher);
EM.dispatchDict = {},
    EM.eventDict = {},
    __reflect(EM.prototype, "EM");
var HandTip = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.createView, t),
            t
    }

    return __extends(t, e),
        t.getInstance = function () {
            return null == t.instance && (t.instance = new t),
                t.instance
        },
        t.prototype.createView = function () {
            var e = Tool.createBitmapByName("hand_1_png");
            this.addChild(e),
                e.x = 0,
                e.y = 98;
            var t = Tool.createBitmapByName("hand_png");
            this.addChild(t),
                Tool.anchorXY(t, 60, 65),
                t.x = 87,
                t.y = 65,
                t.rotation = 8.99,
                egret.Tween.get(t, {
                    loop: !0
                }).to({
                    x: 47,
                    y: 65,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: -1.24
                }, Tool.f2t(20), egret.Ease.quadInOut).to({
                    x: 97.5,
                    y: 64.5,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    rotation: 13.73
                }, Tool.f2t(15), egret.Ease.quadInOut).to({
                    x: 87.5,
                    y: 64.5,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 8.99
                }, Tool.f2t(8), egret.Ease.quadOut)
        },
        t
}(egret.Sprite);
__reflect(HandTip.prototype, "HandTip");
var Horse = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.currentNum = 1,
            t.totalNum = 4,
            t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
                this.scene1()
        },
        t.prototype.scene1 = function () {
            this.horse = Tool.createBitmapByName("load_horse1_png"),
                this.addChild(this.horse),
                this.myTime = new egret.Timer(Tool.f2t(5), 0),
                this.myTime.addEventListener(egret.TimerEvent.TIMER, this.changePic, this),
                this.myTime.start()
        },
        t.prototype.changePic = function () {
            this.currentNum++,
            this.currentNum >= this.totalNum && (this.currentNum = 1);
            var e = RES.getRes("load_horse" + this.currentNum + "_png");
            this.horse.texture = e
        },
        t
}(egret.Sprite);
__reflect(Horse.prototype, "Horse");
var PostExp = function (e) {
    function t(t, a) {
        var r = e.call(this) || this;
        return r._url = t,
            r._params = a,
            r
    }

    return __extends(t, e),
        t.prototype.send = function () {
            this.sendPostRequest()
        },
        t.prototype.sendPostRequest = function () {
            var e = new egret.HttpRequest;
            e.responseType = egret.HttpResponseType.TEXT,
                e.open(this._url, egret.HttpMethod.POST),
                e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                e.send(this._params),
                e.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this),
                e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this)
        },
        t.prototype.onPostComplete = function (e) {
            var t = e.currentTarget;
            this.response = t.response,
                this.dispatchEventWith("complete")
        },
        t.prototype.onPostIOError = function (e) {
            console.log("post error : " + e),
                this.dispatchEventWith("io_error")
        },
        t
}(egret.DisplayObjectContainer);
__reflect(PostExp.prototype, "PostExp");
var Page = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.createView, t),
            t
    }

    return __extends(t, e),
        t.getInstance = function () {
            return null == t.instance && (t.instance = new t),
                t.instance
        },
        t.prototype.createView = function () {
        },
        t
}(egret.Sprite);
__reflect(Page.prototype, "Page");
var Page1 = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.mcArrX = [
            [74, 98],
            [-15, 74],
            [-105, 48],
            [-75, 128],
            [-140, 100],
            [-234, 0],
            [-276, 163],
            [-273, 119],
            [-346, -46],
            [-404, 75],
            [-468, 241],
            [-470, 174],
            [-527, -109],
            [-619, -2],
            [-659, 77],
            [-527, 216],
            [-715, 137],
            [-726, 369],
            [-750, -252],
            [-960, -195],
            [-930, -47],
            [-951, 331],
            [-1006, 34],
            [-1023, 181],
            [-1143, 296],
            [-1159, 566],
            [-1058, -338],
            [-1304, -165],
            [-1366, -38],
            [-1347, 177],
            [-1292, 342],
            [-1297, 492],
            [-1399, -319],
            [-1363, 46],
            [-1442, 357]
        ],
            t.mcArrS = [1, 1, 1.5, 1.5, 1, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            t.mcArrR = [-6.72, -6.72, -6.72, -6.72, -6.72, -6.72, -18.72, -6.72, -6.72, -6.72, -24.72, -6.72, 8.28, 8.28, -2.49, -15.72, -15.72, -19.22, 8.28, 8.28, 8.28, -22.72, -2.49, -2.49, -2.49, -15.72, 8.28, 8.28, 8.28, -2.49, -17.26, -15.72, 8.28, -2.49, -2.49],
            t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
                this.scene1()
        },
        t.prototype.scene1 = function () {
            var e = this,
                t = new egret.Sprite;
            this.addChild(t),
                this.bg_mc = t;
            var a = Tool.createBitmapByName("p2_bg_jpg");
            t.addChild(a);
            var r = new egret.Sprite;
            this.addChild(r),
                this.sandBox = r;
            var n = Tool.createBitmapByName("bg1_1_jpg");
            this.addChild(n),
                this.bg1 = n;
            var o = Tool.createBitmapByName("zhiwen_png");
            this.addChild(o),
                Tool.anchorXY(o),
                o.x = 320,
                o.y = 920,
                o.alpha = 0,
                o.name = "btn1",
                this.btn1 = o,
                egret.Tween.get(o).wait(0).to({
                    alpha: 1
                }, 1e3, egret.Ease.quadInOut).call(function () {
                    e.addEvent(o)
                })
        },
        t.prototype.scene2 = function () {
            for (var e = this, t = this.mcArrX.length - 1; t >= 0; t--) {
                var a = Tool.createBitmapByName("load_sand2_png");
                this.sandBox.addChild(a),
                    a.anchorOffsetX = 184,
                    a.anchorOffsetY = 46,
                    a.x = this.mcArrX[t][0] + 1500,
                    a.y = this.mcArrX[t][1] + 430,
                    a.scaleX = a.scaleY = 1.5 * this.mcArrS[t],
                    a.rotation = this.mcArrR[t],
                    egret.Tween.get(a).wait(200 + 50 * (this.mcArrX.length - t)).to({
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0
                    }, 800, egret.Ease.quadOut)
            }
            egret.Tween.get(this.btn1).to({
                alpha: 0
            }, 1e3, egret.Ease.quadInOut),
                egret.Tween.get(this.bg1).to({
                    alpha: 0
                }, 1e3, egret.Ease.quadInOut).wait(1e3).call(function () {
                    e.dispatchEventWith("changeScene")
                })
        },
        t.prototype.scene3 = function () {
            var e = this;
            this.bg_mc.alpha = 1,
                egret.Tween.get(this.box_mc).wait(0).to({
                    x: 320,
                    y: 485,
                    scaleX: 12,
                    scaleY: 12
                }, 3e3, egret.Ease.quadInOut).call(function () {
                    e.dispatchEventWith("changeScene")
                }),
                egret.Tween.get(this.door_left).wait(500).to({
                    x: 244
                }, 2e3, egret.Ease.quadInOut),
                egret.Tween.get(this.door_right).wait(500).to({
                    x: 355
                }, 2e3, egret.Ease.quadInOut)
        },
        t.prototype.addEvent = function (e) {
            e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this),
                e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
                e.touchEnabled = !0
        },
        t.prototype.onBegin = function (e) {
            var t = this;
            if (this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this), this.btn = e.currentTarget, "btn1" == e.currentTarget.name) this.tid && clearTimeout(this.tid),
                this.tid = setTimeout(function () {
                    t.scene2(),
                        t.btn1.touchEnabled = !1
                }, 2e3);
            else {
                var a = egret.Tween.get(this.btn);
                a.to({
                    scaleX: .9,
                    scaleY: .9
                }, 100)
            }
        },
        t.prototype.onEnd = function (e) {
            if (this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this), "btn1" == e.currentTarget.name) this.tid && clearTimeout(this.tid);
            else {
                var t = egret.Tween.get(this.btn);
                t.to({
                    scaleX: 1,
                    scaleY: 1
                }, 100)
            }
        },
        t.prototype.onTap = function (e) {
            "btn2" == e.currentTarget.name && (e.currentTarget.touchEnabled = !1, this.scene3())
        },
        t
}(egret.Sprite);
__reflect(Page1.prototype, "Page1");
var Page2 = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
                this.scene1()
        },
        t.prototype.scene1 = function () {
            var e = Tool.createBitmapByName("p2_bg_jpg");
            this.addChild(e);
            var t = new egret.Sprite;
            this.addChild(t),
                t.x = 318,
                t.alpha = 0;
            for (var a = 0, r = 1; 7 >= r; r++) {
                var n = Tool.createBitmapByName("p2_" + r + "_jpg");
                t.addChild(n),
                    n.x = a,
                    a += n.width
            }
            console.log(a);
            var o = Tool.createSprite(0, [0, 0, 640, 1030]);
            this.addChild(o),
                o.scaleX = .01,
                o.x = 318,
                t.mask = o;
            var i = Tool.createBitmapByName("zhou_png");
            this.addChild(i),
                Tool.anchorXY(i),
                i.x = 320,
                i.y = 1030,
                i.alpha = 0,
                i.rotation = 0,
                i.scaleX = i.scaleY = .1;
            var s = Tool.createBitmapByName("zhou_png");
            this.addChild(s),
                Tool.anchorXY(s),
                s.x = 320,
                s.y = 515,
                s.alpha = 0,
                egret.Tween.get(i).wait(0).to({
                    alpha: 1,
                    x: 320,
                    y: 515,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 360
                }, 1e3, egret.Ease.quadOut).to({
                    x: -27
                }, 1500, egret.Ease.quadIn),
                egret.Tween.get(s).wait(1e3).to({
                    alpha: 1
                }).to({
                    x: 553
                }, 1200, egret.Ease.quadIn).to({
                    x: 613
                }, 400, egret.Ease.quadOut),
                egret.Tween.get(o).wait(1e3).to({
                    x: 0,
                    scaleX: 1
                }, 1500, egret.Ease.quadIn).wait(100).call(function () {
                    t.mask = null,
                        Tool.removeMc(o)
                });
            var h = .85;
            egret.Tween.get(t).wait(1e3).to({
                alpha: 1
            }).to({
                x: 0
            }, 1500 * h, egret.Ease.quadIn).to({
                x: 640 - a + 250
            }, 3e4 * h).to({
                x: 640 - a
            }, 2e3 * h, egret.Ease.quadOut).wait(500).call(function () {
                console.log("Page2--moveEnd"),
                    Util.iswait = !0,
                Util.isloaded && EM.dispatch().dispatchEventWith("showScene")
            })
        },
        t
}(egret.Sprite);
__reflect(Page2.prototype, "Page2");
var Result = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.createView, t),
            t
    }

    return __extends(t, e),
        t.getInstance = function () {
            return null == t.instance && (t.instance = new t),
                t.instance
        },
        t.prototype.createView = function () {
            var e = this,
                t = Tool.createBitmapByName("result_bg_jpg");
            this.addChild(t);
            var a = new egret.Sprite;
            this.addChild(a);
            var r = Tool.createBitmapByName("result_pic1_png");
            Tool.anchorXY(r),
                a.addChild(r),
                egret.Tween.get(r, {
                    loop: !0
                }).to({
                    y: 10
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut).to({
                    y: 0
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut),
                a.x = 66,
                a.y = 912;
            var n = new egret.Sprite;
            this.addChild(n);
            var r = Tool.createBitmapByName("result_pic2_png");
            Tool.anchorXY(r),
                n.addChild(r),
                egret.Tween.get(r, {
                    loop: !0
                }).to({
                    y: 10
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut).to({
                    y: 0
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut),
                n.x = 126,
                n.y = 965;
            var o = new egret.Sprite;
            this.addChild(o);
            var r = Tool.createBitmapByName("result_pic3_png");
            Tool.anchorXY(r),
                o.addChild(r),
                o.x = 585,
                o.y = 829;
            var i = new egret.Sprite;
            this.addChild(i);
            var r = Tool.createBitmapByName("result_pic4_png");
            Tool.anchorXY(r),
                i.addChild(r),
                egret.Tween.get(r, {
                    loop: !0
                }).to({
                    y: 5
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut).to({
                    y: 0
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut),
                i.x = 320,
                i.y = 963;
            var s = Tool.createBitmapByName("result_pro_png");
            Tool.anchorXY(s, 140, 250),
                this.addChild(s),
                s.x = 320,
                s.y = 816;
            var h = new egret.Sprite;
            this.addChild(h);
            var d = new egret.Sprite;
            h.addChild(d),
                d.x = 96,
                d.y = 344;
            var l = Tool.createBitmapByName("result_tbg2_png");
            d.addChild(l);
            var c = Tool.createBitmapByName("result_t1_1_png");
            d.addChild(c),
                c.x = 166,
                c.y = 38;
            var g = new egret.Sprite;
            d.addChild(g),
                g.y = 67;
            var u = Tool.createBitmapByName("result_t1_2_png");
            g.addChild(u);
            var p = new egret.TextField;
            p.textColor = 0,
                p.size = 22,
                p.x = u.x + u.width + 5,
                p.y = u.y,
                g.addChild(p),
                p.text = String(Util.num);
            var T = Tool.createBitmapByName("result_t1_3_png");
            g.addChild(T),
                T.x = p.x + p.width + 5,
                g.x = Math.round((448 - g.width) / 2);
            var _ = Tool.createSprite(4278190080, [0, 0, 412, 102]);
            h.addChild(_),
                Tool.anchorXY(_),
                _.x = 320,
                _.y = 406,
                _.scaleX = 0,
                d.mask = _;
            var m = Tool.createBitmapByName("result_tbg_png");
            h.addChild(m),
                m.x = 303,
                m.y = 344;
            var l = Tool.createBitmapByName("result_tbg_png");
            h.addChild(l),
                l.x = 320,
                l.y = 344,
                this.alpha = 0,
                egret.Tween.get(this).to({
                    alpha: 1
                }, 1e3, egret.Ease.quadInOut),
                s.scaleX = s.scaleY = 0,
                egret.Tween.get(s).wait(900).to({
                    scaleX: 1,
                    scaleY: 1
                }, 2e3, egret.Ease.elasticOut);
            var v = 500;
            a.y = 1030 + a.height,
                egret.Tween.get(a).wait(v + 200).to({
                    y: 912
                }, 1e3, egret.Ease.quadOut),
                n.y = 1030 + n.height,
                egret.Tween.get(n).wait(v + 400).to({
                    y: 965
                }, 1e3, egret.Ease.quadOut),
                o.x = 640 + o.width,
                egret.Tween.get(o).wait(v + 300).to({
                    x: 585
                }, 1e3, egret.Ease.quadOut),
                i.y = 1030 + i.height,
                egret.Tween.get(i).wait(v).to({
                    y: 963
                }, 1e3, egret.Ease.quadOut),
                h.y += 100,
                h.alpha = 0,
                egret.Tween.get(h).wait(1e3).to({
                    y: h.y - 100,
                    alpha: 1
                }, 600, egret.Ease.quadOut),
                egret.Tween.get(_).wait(1500).to({
                    scaleX: 1
                }, 1200, egret.Ease.quartInOut),
                egret.Tween.get(m).wait(1500).to({
                    x: 97
                }, 1200, egret.Ease.quartInOut),
                egret.Tween.get(l).wait(1500).to({
                    x: 526
                }, 1200, egret.Ease.quartInOut),
                setTimeout(function () {
                    egret.Tween.get(_).to({
                        scaleX: 0
                    }, 1200, egret.Ease.quartInOut),
                        egret.Tween.get(m).to({
                            x: 303
                        }, 1200, egret.Ease.quartInOut),
                        egret.Tween.get(l).to({
                            x: 320
                        }, 1200, egret.Ease.quartInOut),
                        egret.Tween.get(h).wait(1e3).to({
                            alpha: 0
                        }, 400).call(Tool.remove, e, [h]),
                        egret.Tween.get(s).wait(500).to({
                            y: 866
                        }, 1500, egret.Ease.quadInOut);
                    for (var t, a = 1e3, r = [
                        [98, 131],
                        [233, 131],
                        [404, 131],
                        [552, 131]
                    ], n = 0; n < r.length; n++)
                        t = Tool.createBitmapByName("result_logo" + (n + 1) + "_png"),
                            e.addChild(t),
                            Tool.anchorXY(t),
                            t.x = r[n][0],
                            t.y = r[n][1],
                            t.scaleX = t.scaleY = 0,
                            egret.Tween.get(t).wait(a + 150 * n).to({
                                scaleX: 1,
                                scaleY: 1
                            }, 1800, egret.Ease.elasticOut);
                    var o = Tool.createBitmapByName("result_logo0_png");
                    e.addChild(o),
                        Tool.anchorXY(o),
                        o.x = 331,
                        o.y = 131,
                        o.alpha = 0,
                        egret.Tween.get(o).wait(1e3 + 150 * n + 300).to({
                            alpha: 1
                        }, 800, egret.Ease.quadOut),
                        a = 1500;
                    for (var t, i = [
                        [320, 380],
                        [320, 420],
                        [320, 450]
                    ], n = 0; n < i.length; n++)
                        t = Tool.createBitmapByName("result_t2_" + (n + 1) + "_png"),
                            e.addChild(t),
                            Tool.anchorXY(t),
                            t.x = i[n][0],
                            t.y = i[n][1] + 500,
                            t.alpha = 0,
                            egret.Tween.get(t).wait(a + 150 * n).to({
                                y: i[n][1],
                                alpha: 1
                            }, 800, egret.Ease.quadOut);
                    var d = Tool.createBitmapByName("result_t2_4_png");
                    e.addChild(d),
                        Tool.anchorXY(d),
                        d.x = 320,
                        d.y = 540,
                        d.scaleX = d.scaleY = 0,
                        egret.Tween.get(d).wait(a + 300 + 150 * n + 300).to({
                            scaleX: 1,
                            scaleY: 1
                        }, 1800, egret.Ease.elasticOut),
                        e.addEvent(d);
                    var c = Tool.createBitmapByName("result_t2_5_png");
                    e.addChild(c),
                        Tool.anchorXY(c),
                        c.x = 320,
                        c.y = 580,
                        c.alpha = 0,
                        egret.Tween.get(c).wait(a + 500 + 150 * n + 300).to({
                            alpha: 1
                        }, 800, egret.Ease.quadOut)
                }, 4e3)
        },
        t.prototype.addEvent = function (e) {
            e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this),
                e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
                e.touchEnabled = !0
        },
        t.prototype.onBegin = function (e) {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this),
                this.btn = e.currentTarget;
            var t = egret.Tween.get(this.btn);
            t.to({
                scaleX: .9,
                scaleY: .9
            }, 100)
        },
        t.prototype.onEnd = function (e) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            var t = egret.Tween.get(this.btn);
            t.to({
                scaleX: 1,
                scaleY: 1
            }, 100)
        },
        t.prototype.onTap = function (e) {
            EM.dispatch().dispatchEventWith("showShare")
        },
        t
}(egret.Sprite);
__reflect(Result.prototype, "Result");
var Scene = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.createView, t),
            t
    }

    return __extends(t, e),
        t.getInstance = function () {
            return null == t.instance && (t.instance = new t),
                t.instance
        },
        t.prototype.createView = function () {
            var e = (Tool.createSprite(16777215), new egret.ScrollView);
            this.addChild(e),
                e.bounces = !1,
                e.verticalScrollPolicy = "off",
                e.horizontalScrollPolicy = "off",
                e.width = 7968,
                e.height = 1030;
            var t = new egret.ScrollView;
            this.addChild(t),
                t.bounces = !1,
                t.verticalScrollPolicy = "off",
                t.horizontalScrollPolicy = "on",
                t.width = 640,
                t.height = 1030;
            var a = new egret.Sprite;
            this.addChild(a),
                this.myContent = a,
                t.setContent(e),
                e.setContent(a);
            var r = Tool.createBitmapByName("scene_bg_jpg");
            a.addChild(r);
            var n = new egret.Sprite;
            a.addChild(n);
            for (var o, i = 0; 6 >= i; i++)
                o = Tool.createBitmapByName("scene_top_jpg"),
                    o.x = i * o.width,
                    n.addChild(o);
            n.x = -100,
                egret.Tween.get(n, {
                    loop: !0
                }).to({
                    x: 0
                }, 3e3, egret.Ease.quadInOut).to({
                    x: -100
                }, 3e3, egret.Ease.quadInOut),
                t.scrollRect = new egret.Rectangle(0, 0, 7968, 1030);
            var s = Tool.createBitmapByName("scene_wall_1_png");
            a.addChild(s),
                s.x = 1808,
                s.y = 129;
            var h = Tool.createBitmapByName("scene_wall_2_png");
            a.addChild(h),
                h.x = 3116,
                h.y = 163;
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.x = 1495,
                d.y = 701,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 1595
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut).to({
                    x: 1495
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.scaleX = d.scaleY = .85,
                d.x = 1572,
                d.y = 775,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 1472
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut).to({
                    x: 1572
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.scaleX = d.scaleY = .8,
                d.x = 4515,
                d.y = 311,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 4615
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut).to({
                    x: 4515
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.scaleX = d.scaleY = .5,
                d.x = 4690,
                d.y = 276,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 4590
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut).to({
                    x: 4690
                }, 7e3 + 3e3 * Math.random(), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.scaleX = d.scaleY = .55,
                d.x = 4548,
                d.y = 415,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 4578
                }, 2e3 + 500 * Math.random(), egret.Ease.quadInOut).to({
                    x: 4548
                }, 2e3 + 500 * Math.random(), egret.Ease.quadInOut);
            var d = Tool.createBitmapByName("scene_cloud1_png");
            a.addChild(d),
                Tool.anchorXY(d),
                d.scaleX = d.scaleY = .5,
                d.x = 4737,
                d.y = 583,
                egret.Tween.get(d, {
                    loop: !0
                }).to({
                    x: 4707
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut).to({
                    x: 4737
                }, 1500 + 500 * Math.random(), egret.Ease.quadInOut);
            var l = new HandTip;
            a.addChild(l),
                l.x = 520,
                l.y = 375;
            var c = Tool.createBitmapByName("scene_t1_1_png");
            a.addChild(c),
                c.x = 166,
                c.y = 350,
                c.alpha = 0,
                egret.Tween.get(c).wait(800).to({
                    x: 54,
                    alpha: 1
                }, 1500, egret.Ease.quadOut);
            var g = Tool.createBitmapByName("scene_pro0_png");
            a.addChild(g),
                g.x = 2215,
                g.y = 896,
                egret.Tween.get(g, {
                    loop: !0
                }).to({
                    y: 886
                }, 800, egret.Ease.quadInOut).to({
                    y: 896
                }, 800, egret.Ease.quadInOut);
            for (var u = [], i = 0; 22 >= i; i++)
                u.push("ren1_" + i + "_png");
            var p = new SheetFactory(u, 50);
            this.myContent.addChild(p),
                p.x = 2238,
                p.y = 420;
            for (var u = [], i = 0; 21 >= i; i++)
                u.push("ren2_" + i + "_png");
            var p = new SheetFactory(u, 50);
            this.myContent.addChild(p),
                p.x = 4205,
                p.y = 420;
            var T = Tool.createBitmapByName("scene_wall_4_png");
            a.addChild(T),
                T.x = 5629,
                T.y = 73;
            var _ = Tool.createBitmapByName("scene_wall_5_png");
            a.addChild(_),
                _.x = 7208,
                _.y = 164;
            for (var u = [], i = 0; 21 >= i; i++)
                u.push("ren3_" + i + "_png");
            var p = new SheetFactory(u, 50);
            this.myContent.addChild(p),
                p.x = 5577,
                p.y = 308;
            var m = Tool.createBitmapByName("scene_wall_3_png");
            a.addChild(m),
                m.x = 4810,
                m.y = 124;
            for (var u = [], i = 1; 5 >= i; i++)
                u.push("ren4_" + i + "_png");
            var p = new SheetFactory(u, 200);
            a.addChild(p),
                p.x = 7308,
                p.y = -256,
                this.ren4 = p;
            var v = Tool.createBitmapByName("scene_pro_png");
            a.addChild(v),
                Tool.anchorXY(v),
                v.x = 7454,
                v.y = 400,
                this.pro = v;
            var y = Tool.createBitmapByName("scene_pro_txt_png");
            a.addChild(y),
                Tool.anchorXY(y),
                y.x = 7539,
                y.y = 400,
                this.pro_txt = y;
            for (var E, f = [
                [2800, 640, 1],
                [3450, 646, 2],
                [4030, 642, 2],
                [5136, 710, 2],
                [6022, 630, 1],
                [6556, 660, 1]
            ], i = 0; i < f.length; i++) {
                var w = new egret.Sprite;
                a.addChild(w),
                    w.x = f[i][0],
                    w.y = f[i][1];
                var x = Tool.createBitmapByName("scene_hand_point_png");
                w.addChild(x),
                    Tool.anchorXY(x);
                var C = Tool.createBitmapByName("scene_hand_point_png");
                w.addChild(C),
                    Tool.anchorXY(C),
                    C.alpha = 0,
                    egret.Tween.get(C, {
                        loop: !0
                    }).wait(0).to({
                        alpha: 1
                    }).to({
                        alpha: 0,
                        scaleX: 2,
                        scaleY: 2
                    }, 1e3, egret.Ease.quadOut).to({
                        scaleX: 1,
                        scaleY: 1
                    }),
                    E = Tool.createBitmapByName("scene_hand" + f[i][2] + "_png"),
                    a.addChild(E),
                    Tool.anchorXY(E),
                    E.x = f[i][0],
                    E.y = f[i][1],
                    1 == f[i][2] ? (E.anchorOffsetX = 40, E.anchorOffsetY = 7) : 2 == f[i][2] && (E.anchorOffsetX = 18, E.anchorOffsetY = 0),
                    egret.Tween.get(E, {
                        loop: !0
                    }).to({
                        y: f[i][1] + 10
                    }, 500, egret.Ease.quadInOut).to({
                        y: f[i][1]
                    }, 500, egret.Ease.quadInOut)
            }
            for (var O, S = [
                [2693, 341, 249, 341],
                [3271, 398, 350, 275],
                [3834, 411, 379, 256],
                [4960, 334, 332, 400],
                [5887, 432, 308, 237],
                [6381, 430, 367, 271]
            ], i = 0; i < S.length; i++)
                O = Tool.createSprite(16711680, S[i]),
                    a.addChild(O),
                    O.id = i + 1,
                    O.alpha = 0,
                    O.touchEnabled = !0,
                    O.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);
            O = Tool.createSprite(16711680, [7414, 365, 183, 72]),
                a.addChild(O),
                O.alpha = 0,
                O.touchEnabled = !0,
                O.addEventListener(egret.TouchEvent.TOUCH_TAP, this.flyOut, this);
            var B = new egret.Timer(200);
            B.addEventListener(egret.TimerEvent.TIMER, function () {
                if (t.scrollLeft >= 7140) {
                    B.stop();
                    var e = new egret.Sprite;
                    a.addChild(e),
                        e.x = 7429,
                        e.y = 501;
                    for (var r, n = [
                        [0, 0],
                        [44, 2],
                        [88, 2],
                        [132, 2],
                        [176, 2],
                        [220, 2],
                        [264, 2]
                    ], o = 0; o < n.length; o++)
                        r = Tool.createBitmapByName("scene_endt_" + (o + 1) + "_png"),
                            e.addChild(r),
                            r.x = n[o][0] + 100,
                            r.y = n[o][1],
                            r.alpha = 0,
                            egret.Tween.get(r).wait(200 * o).to({
                                x: n[o][0],
                                alpha: 1
                            }, 1e3, egret.Ease.quadOut)
                }
            }, this),
                B.start()
        },
        t.prototype.showInfo = function (e) {
            Util.infoId = e.currentTarget.id,
                this.currentInfo = new SceneInfo,
                this.addChild(this.currentInfo),
                this.currentInfo.addEventListener("hideLayer", this.hideLayer, this)
        },
        t.prototype.hideLayer = function (e) {
            egret.Tween.get(e.currentTarget).to({
                alpha: 0
            }, 300, egret.Ease.quadInOut).call(Tool.remove, this, [e.currentTarget])
        },
        t.prototype.flyOut = function () {
            var e = Tool.createSprite(0);
            this.addChild(e),
                e.alpha = 0,
                e.touchEnabled = !0,
                Tool.remove(this.ren4);
            for (var t = [], a = 6; 19 >= a; a++)
                t.push("ren4_" + a + "_png");
            var r = new SheetFactory(t, 120, 1);
            this.myContent.addChild(r),
                r.x = 7308,
                r.y = -256,
                r.addEventListener("complete", this.showSidai, this),
                this.ren4 = r,
                this.myContent.addChild(this.pro)
        },
        t.prototype.showSidai = function () {
            for (var e = this, t = [], a = 20; 35 >= a; a++)
                t.push("ren4_" + a + "_png");
            var r = new SheetFactory(t, 120, 1);
            this.addChild(r),
                r.addEventListener("complete", function () {
                    r.pause(),
                        Tool.remove(r);
                    for (var t = [], a = 33; 35 >= a; a++)
                        t.push("ren4_" + a + "_png");
                    var n = new SheetFactory(t, 250);
                    e.addChild(n);
                    var o = Tool.createBitmapByName("scene_tapTxt_png");
                    e.addChild(o),
                        Tool.anchorXY(o),
                        o.x = 320,
                        o.y = 485,
                        o.alpha = 0,
                        egret.Tween.get(o).to({
                            alpha: 1
                        }, 1e3, egret.Ease.quadOut).call(function () {
                            e.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                                e.submit()
                            }, e)
                        }, e)
                }, this)
        },
        t.prototype.submit = function () {
            this.touchChildren = !1,
                this.myPost = new PostExp(submit_url, "ran=" + Math.random()),
                this.myPost.addEventListener("complete", this.onComplete, this),
                this.myPost.addEventListener("io_error", this.ioError, this),
                this.myPost.send()
        },
        t.prototype.onComplete = function (e) {
            var t = JSON.parse(this.myPost.response);
            1 == t.status ? (Util.num = t.data.num, change_share(Util.num), EM.dispatch().dispatchEventWith("showResult")) : (this.touchChildren = !0, alert(t.msg))
        },
        t.prototype.ioError = function (e) {
            console.log("post error : " + e),
                alert("数据提交出错！")
        },
        t
}(egret.Sprite);
__reflect(Scene.prototype, "Scene");
var SceneInfo = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.createView, t),
            t
    }

    return __extends(t, e),
        t.getInstance = function () {
            return null == t.instance && (t.instance = new t),
                t.instance
        },
        t.prototype.createView = function () {
            var e = this,
                t = Tool.createBitmapByName("scene_info_bg_png");
            this.addChild(t),
                t.touchEnabled = !0;
            var a = Tool.createBitmapByName("scene_info" + Util.infoId + "_pic_jpg");
            this.addChild(a),
                Tool.anchorXY(a),
                a.x = 320,
                a.y = 325;
            var r = new egret.Sprite;
            this.addChild(r);
            var n = Tool.createSprite(4278190080, [0, 0, 499, 332]);
            r.addChild(n),
                Tool.anchorXY(n),
                n.x = 320,
                n.y = 786,
                n.scaleX = 0;
            var o = Tool.createBitmapByName("scene_info" + Util.infoId + "_txt_png");
            r.addChild(o),
                o.x = 71,
                o.y = 608,
                o.mask = n;
            var i = Tool.createBitmapByName("scene_info_tbg_png");
            r.addChild(i),
                i.x = 302,
                i.y = 608;
            var s = Tool.createBitmapByName("scene_info_tbg_png");
            r.addChild(s),
                s.x = 320,
                s.y = 608;
            var h = Tool.createBitmapByName("btn_close_png");
            this.addChild(h),
                Tool.anchorXY(h),
                h.x = 320,
                h.y = 984;
            var d = Tool.createSprite(0, [0, 0, 640, 1030]);
            this.addChild(d),
                d.alpha = 0,
                d.touchEnabled = !0,
                d.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    e.dispatchEventWith("hideLayer")
                }, this),
                this.alpha = 0,
                egret.Tween.get(this).to({
                    alpha: 1
                }, 500, egret.Ease.quadInOut),
                a.scaleX = a.scaleY = 0,
                egret.Tween.get(a).wait(200).to({
                    scaleX: 1,
                    scaleY: 1
                }, 800, egret.Ease.quartInOut);
            var l = 200;
            r.y += 450,
                egret.Tween.get(r).wait(l).to({
                    y: 0
                }, 1200, egret.Ease.quartInOut),
                egret.Tween.get(n).wait(l + 900).to({
                    scaleX: 1
                }, 1200, egret.Ease.quartInOut),
                egret.Tween.get(i).wait(l + 900).to({
                    x: 71
                }, 1200, egret.Ease.quartInOut),
                egret.Tween.get(s).wait(l + 900).to({
                    x: 549
                }, 1200, egret.Ease.quartInOut),
                h.scaleX = h.scaleY = 0,
                egret.Tween.get(h).wait(l + 900).to({
                    scaleX: 1,
                    scaleY: 1
                }, 1800, egret.Ease.elasticOut)
        },
        t
}(egret.Sprite);
__reflect(SceneInfo.prototype, "SceneInfo");
var Share = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
            t
    }

    return __extends(t, e),
        t.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
                this.scene()
        },
        t.prototype.scene = function () {
            var e = Tool.createSprite(0);
            e.alpha = .85,
                this.addChild(e),
                e.touchEnabled = !0;
            var t = RES.getRes("share_arrow_json"),
                a = RES.getRes("share_arrow_png"),
                r = new egret.MovieClipDataFactory(t, a),
                n = new egret.MovieClip(r.generateMovieClipData("share_arrow"));
            this.addChild(n),
                n.x = 480,
                n.y = 40,
                n.scaleX = n.scaleY = .7,
                n.gotoAndPlay(2),
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
                this.touchEnabled = !0
        },
        t.prototype.onTap = function (e) {
            this.dispatchEventWith("hideLayer")
        },
        t
}(egret.Sprite);
__reflect(Share.prototype, "Share");
var SheetFactory = function (e) {
    function t(t, a, r) {
        void 0 === a && (a = 80),
        void 0 === r && (r = 0);
        var n = e.call(this) || this;
        return n._totalNum = 0,
            n._index = 0,
            n._loop = 0,
            n._status = !1,
            n._list = t,
            n._totalNum = n._list.length,
            n._delay = a,
            n._loop = r * n._totalNum,
            n.init(),
            n
    }

    return __extends(t, e),
        t.prototype.init = function () {
            this._bitmap = new egret.Bitmap(RES.getRes(this._list[0])),
                this.addChild(this._bitmap),
                this.addTimer()
        },
        t.prototype.addTimer = function () {
            this._myTimer = new egret.Timer(this._delay, this._loop),
                this._myTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this),
            this._loop > 0 && this._myTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this),
                this._myTimer.start(),
                this._status = !0
        },
        t.prototype.kill = function () {
            this._myTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this),
            this._loop > 0 && this._myTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this),
                this._myTimer.stop(),
                this._myTimer = null,
                this._status = !1
        },
        t.prototype.onTimer = function (e) {
            this._bitmap.texture = RES.getRes(this._list[this._index]),
                this._index++,
            this._index >= this._totalNum && (this._index = 0)
        },
        t.prototype.onComplete = function (e) {
            this.kill(),
                this.dispatchEventWith("complete")
        },
        t.prototype.pause = function () {
            this._status && this._myTimer && (this._myTimer.stop(), this._status = !1)
        },
        t.prototype.play = function () {
            this._status || (this._myTimer || this.addTimer(), this._myTimer.start(), this._status = !0)
        },
        Object.defineProperty(t.prototype, "delay", {
            set: function (e) {
                this._delay = e,
                this._status && (this.kill(), this.play())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "loop", {
            set: function (e) {
                this._loop = e * this._totalNum,
                this._status && (this.kill(), this.play())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "index", {
            get: function () {
                return this._index
            },
            set: function (e) {
                this._index = e,
                    this._bitmap.texture = RES.getRes(this._list[this._index])
            },
            enumerable: !0,
            configurable: !0
        }),
        t
}(egret.Sprite);
__reflect(SheetFactory.prototype, "SheetFactory");