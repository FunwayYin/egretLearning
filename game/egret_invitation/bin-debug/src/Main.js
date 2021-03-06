//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        _this.loadedGroups = 0;
        _this.containerList = [];
        _this.lastTime = NaN;
        _this.touchX = NaN;
        _this.touchStartX = NaN;
        _this.touchStartTimer = NaN;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化常量
        CONST.init(this.stage.stageWidth, this);
        this.touchEnabled = true;
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.setMaxLoadingThread(8);
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "loading") {
            //Config loading process interface
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
            RES.loadGroup("info");
        }
        else if (event.groupName == "info") {
            this.loadedGroups++;
            this.checkLoadingComplete();
        }
        else if (event.groupName == "preload") {
            this.loadedGroups++;
            this.checkLoadingComplete();
        }
    };
    Main.prototype.checkLoadingComplete = function () {
        if (this.loadedGroups == 2) {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        var bg = new egret.Bitmap(RES.getRes("bg_jpg"));
        bg.width = CONST.WIDTH;
        bg.height = CONST.HEIGHT;
        this.addChild(bg);
        var background = new Background();
        this.containerList.push(background);
        var stageHeight = CONST.HEIGHT;
        var foreground6 = new Foreground(6, CONST.SPEED_FOREGROUND_6, "foreground_6");
        this.containerList.push(foreground6);
        this.addChild(foreground6);
        var foreground5 = new Foreground(5, CONST.SPEED_FOREGROUND_5, "foreground_5");
        this.containerList.push(foreground5);
        this.addChild(foreground5);
        var foreground4 = new Foreground(4, CONST.SPEED_FOREGROUND_4, "foreground_4", 6, true);
        this.containerList.push(foreground4);
        this.addChild(foreground4);
        var foreground3 = new Foreground(3, CONST.SPEED_FOREGROUND_3, "foreground_3");
        this.containerList.push(foreground3);
        this.addChild(foreground3);
        var foreground2 = new Foreground(2, CONST.SPEED_FOREGROUND_2, "foreground_2");
        this.containerList.push(foreground2);
        this.addChild(foreground2);
        var foreground1 = new Foreground(1, CONST.SPEED_FOREGROUND_1, "foreground_1");
        this.containerList.push(foreground1);
        this.addChild(foreground1);
        this.addChild(background);
        egret.startTick(this.update, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.scrollController = new ScrollController(this.containerList);
        this.scrollController.dispatchPageLoaded(0);
        this.stage.addChild(new SoundDisplay());
    };
    Main.prototype.update = function (dt) {
        if (this.lastTime != this.lastTime) {
            this.lastTime = dt;
            return;
        }
        if (dt - this.lastTime > 1000) {
            this.lastTime = dt;
            return;
        }
        if (this.touchX != this.touchX) {
            this.scrollController.moveForeground(this.lastTime - dt);
        }
        this.lastTime = dt;
        return false;
    };
    Main.prototype.onTouchBegin = function (e) {
        this.touchStartX = e.stageX;
        this.touchStartTimer = egret.getTimer();
        // stop scroll tween
        egret.Tween.removeTweens(this.scrollController);
    };
    Main.prototype.onTouchMove = function (e) {
        if (this.touchX != this.touchX) {
            this.touchX = e.stageX;
        }
        this.scrollController.distance -= (e.stageX - this.touchX) * 15;
        this.touchX = e.stageX;
    };
    Main.prototype.onTouchEnd = function (e) {
        this.touchX = NaN;
        this.lastTime = NaN;
        var delteX = e.stageX - this.touchStartX;
        if (this.touchStartTimer) {
            var delteTimer = egret.getTimer() - this.touchStartTimer;
            var num = delteX / delteTimer;
            if (Math.abs(num) > 1.0) {
                if (num > 0) {
                    this.scrollController.turnToPrevFrame();
                }
                else {
                    this.scrollController.turnToNextFrame();
                }
            }
            else {
                if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                    if (delteX > 0) {
                        this.scrollController.turnToPrevFrame();
                    }
                    else {
                        this.scrollController.turnToNextFrame();
                    }
                }
                else {
                    this.scrollController.turnToNearestFrame();
                }
            }
            this.touchStartX = NaN;
            this.touchStartTimer = NaN;
        }
        else {
            if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                if (delteX > 0) {
                    this.scrollController.turnToPrevFrame();
                }
                else {
                    this.scrollController.turnToNextFrame();
                }
            }
            else {
                this.scrollController.turnToNearestFrame();
            }
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
