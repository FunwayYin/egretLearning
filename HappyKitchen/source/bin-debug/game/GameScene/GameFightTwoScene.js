/**
 * Created by Administrator on 2014/9/18.
 */
var GameFightTwoScene = (function (_super) {
    __extends(GameFightTwoScene, _super);
    function GameFightTwoScene() {
        _super.call(this);
        this.daoJiShiTotalTime = egret.getTimer() + 1000 * 100;
        this.returnClick = true;
        this.targetNum = 0;
        this.typeArr = [];
        this.passTime = 0;
        this.num = 0;
        this.curNum = 0;
        this.btnType = 0;
        this.canPlayNvren = false;
        this.initView();
    }
    var d = __define,c=GameFightTwoScene,p=c.prototype;
    p.initView = function () {
        GameData.dataTimer = 0;
        var bg = ResourceUtils.createBitmapByName("gamingbgImage");
        this.addChild(bg);
        this.gameLayer = new egret.Sprite();
        this.addChild(this.gameLayer);
        this.gameView = new egret.Sprite();
        this.addChild(this.gameView);
        this.gameView.y = Const.SCENT_HEIGHT / 2 - 100;
        this.initClickTarget();
        this.uiLayer = new egret.Sprite();
        this.addChild(this.uiLayer);
        this.topLayer = new egret.Sprite();
        this.addChild(this.topLayer);
        this.btn1 = new egret.Sprite();
        this.gameLayer.addChild(this.btn1);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1Func, this);
        this.btn1.touchEnabled = true;
        this.btn1_1Sp = ResourceUtils.createBitmapByName("game2btn1_1Image");
        this.btn1.addChild(this.btn1_1Sp);
        this.btn1_2Sp = ResourceUtils.createBitmapByName("game2btn1_2Image");
        this.btn1.addChild(this.btn1_2Sp);
        this.btn2 = new egret.Sprite();
        this.gameLayer.addChild(this.btn2);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2Func, this);
        this.btn2.touchEnabled = true;
        this.btn2_1Sp = ResourceUtils.createBitmapByName("game2btn2_1Image");
        this.btn2.addChild(this.btn2_1Sp);
        this.btn2_2Sp = ResourceUtils.createBitmapByName("game2btn2_2Image");
        this.btn2.addChild(this.btn2_2Sp);
        this.btn3 = new egret.Sprite();
        this.gameLayer.addChild(this.btn3);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn3Func, this);
        this.btn3.touchEnabled = true;
        this.btn3_1Sp = ResourceUtils.createBitmapByName("game2btn3_1Image");
        this.btn3.addChild(this.btn3_1Sp);
        this.btn3_2Sp = ResourceUtils.createBitmapByName("game2btn3_2Image");
        this.btn3.addChild(this.btn3_2Sp);
        this.btn3_1Sp.visible = false;
        this.btn3_2Sp.visible = false;
        this.btn2_1Sp.visible = false;
        this.btn2_2Sp.visible = false;
        this.btn1_1Sp.visible = false;
        this.btn1_2Sp.visible = false;
        this.btn3_1Sp.x = this.btn3_1Sp.y = -50;
        this.btn3_2Sp.x = this.btn3_2Sp.y = -55;
        this.btn2_1Sp.x = this.btn2_1Sp.y = -50;
        this.btn2_2Sp.x = this.btn2_2Sp.y = -65;
        this.btn1_1Sp.x = this.btn1_1Sp.y = -50;
        this.btn1_2Sp.x = this.btn1_2Sp.y = -60;
        this.mc1 = StarlingSwfFactory.getInstance().makeMc("mc2btn2M");
        this.mc1.gotoAndStop(0);
        this.mc1.touchEnabled = true;
        this.btn1.addChild(this.mc1);
        this.mc2 = StarlingSwfFactory.getInstance().makeMc("mc2btn1M");
        this.mc2.gotoAndStop(0);
        this.mc2.touchEnabled = true;
        this.btn2.addChild(this.mc2);
        this.mc3 = StarlingSwfFactory.getInstance().makeMc("mc2btn3M");
        this.mc3.gotoAndStop(0);
        this.mc3.touchEnabled = true;
        this.btn3.addChild(this.mc3);
        this.btn1.y = 695;
        this.btn2.y = 695;
        this.btn3.y = 695;
        this.btn1.x = 90;
        this.btn2.x = 240;
        this.btn3.x = 390;
        this.sorcebar = ResourceUtils.createBitmapByName("sorcebarImage");
        this.barNumPic = ResourceUtils.createBitmapByName("barNum2Image");
        this.nvren = StarlingSwfFactory.getInstance().makeMc("nvren");
        this.weixian = ResourceUtils.createBitmapByName("weixianImage");
        this.showSorce = new SpecialNumber("number_");
        this.showsorce = new egret.TextField();
        this.showsorce.textColor = 0xffffff;
        this.showsorce.bold = true;
        this.showsorce.size = 16;
        this.showsorce.strokeColor = 0x000000;
        this.uiLayer.addChild(this.weixian);
        this.uiLayer.addChild(this.sorcebar);
        this.uiLayer.addChild(this.barNumPic);
        this.uiLayer.addChild(this.showsorce);
        this.uiLayer.addChild(this.nvren);
        this.nvren.gotoAndStop(0);
        var optionBtn = new egret.Sprite();
        var optionBmp = ResourceUtils.createBitmapByName("optionbtnImage");
        optionBtn.addChild(optionBmp);
        optionBtn.touchEnabled = true;
        optionBtn.x = Const.SCENT_WIDTH - optionBtn.width;
        optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMusicView, this);
        this.uiLayer.addChild(optionBtn);
        this.showSorce.scaleX = this.showSorce.scaleY = 0.8;
        this.uiLayer.addChild(this.showSorce);
        this.showSorce.y = 10;
        this.showSorce.setValue(GameData.sorce + "");
        this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
        this.weixian.visible = false;
        this.sorcebar.x = 65;
        this.sorcebar.y = 160;
        this.barNumPic.x = 30;
        this.barNumPic.y = 150;
        this.showsorce.x = 120;
        this.showsorce.y = 162;
        this.nvren.x = 360;
        this.nvren.y = 205;
        this.sorcebar.scaleX = GameData.winNum / 10;
        this.bar = ResourceUtils.createBitmapByName("gamingbarImage");
        this.uiLayer.addChild(this.bar);
        this.bar.y = Const.SCENT_HEIGHT - this.bar.height * 2 + 10;
        this.bar.x = Const.SCENT_WIDTH / 2 - this.bar.width / 2;
        this.barMask = ResourceUtils.createBitmapByName("gamingbarMaskImage");
        this.uiLayer.addChild(this.barMask);
        this.barMask.visible = false;
        this.barMask.y = Const.SCENT_HEIGHT - this.barMask.height * 2 + 10;
        this.barMask.x = Const.SCENT_WIDTH / 2 - this.barMask.width / 2;
        this.showTimer = new egret.TextField();
        this.showTimer.x = Const.SCENT_WIDTH / 2;
        this.showTimer.y = Const.SCENT_HEIGHT - 35;
        this.showTimer.textColor = 0xffffff;
        this.showTimer.bold = true;
        this.showTimer.size = 16;
        this.showTimer.strokeColor = 0x000000;
        this.uiLayer.addChild(this.showTimer);
        var gameMaskBar = ResourceUtils.createBitmapByName("gameMaskBar");
        this.uiLayer.addChild(gameMaskBar);
        var gameMaskX = Const.SCENT_HEIGHT - gameMaskBar.height * 1.5 + 3;
        var gameMaskY = Const.SCENT_WIDTH / 2 - gameMaskBar.width / 2;
        gameMaskBar.y = gameMaskX;
        gameMaskBar.x = gameMaskY;
        this.numTwo = ResourceUtils.createBitmapByName("cutTwoImage");
        this.uiLayer.addChild(this.numTwo);
        this.numTwo.visible = false;
        this.gameRight = ResourceUtils.createBitmapByName("rightImage");
        this.topLayer.addChild(this.gameRight);
        this.gameWorng = ResourceUtils.createBitmapByName("worngImage");
        this.topLayer.addChild(this.gameWorng);
        this.gameRight.x = Const.SCENT_WIDTH / 2 - this.gameRight.width / 2;
        this.gameRight.y = Const.SCENT_HEIGHT / 2 - this.gameRight.height / 2;
        this.gameWorng.x = Const.SCENT_WIDTH / 2 - this.gameWorng.width / 2;
        this.gameWorng.y = Const.SCENT_HEIGHT / 2 - this.gameWorng.height / 2;
        this.gameRight.visible = false;
        this.gameWorng.visible = false;
        this.con = ResourceUtils.createBitmapByName("gameWinOverImage");
        this.topLayer.addChild(this.con);
        this.con.visible = false;
        var ready = ResourceUtils.createBitmapByName("readyImage");
        this.topLayer.addChild(ready);
        this.go = ResourceUtils.createBitmapByName("goImage");
        this.topLayer.addChild(this.go);
        var norScaleX = Const.SCENT_WIDTH / 2 - ready.width / 2;
        var norScaleY = Const.SCENT_HEIGHT / 2 - ready.height / 2;
        this.nogScaleX = Const.SCENT_WIDTH / 2 - ready.width / 2;
        this.nogScaleY = Const.SCENT_HEIGHT / 2 - ready.height / 2;
        ready.scaleX = 0.1;
        ready.scaleY = 0.1;
        this.go.scaleX = 0.1;
        this.go.scaleY = 0.1;
        this.go.x = Const.SCENT_WIDTH / 2;
        this.go.y = Const.SCENT_HEIGHT / 2;
        ready.x = Const.SCENT_WIDTH / 2;
        ready.y = Const.SCENT_HEIGHT / 2;
        ready.visible = false;
        this.go.visible = false;
        ready.visible = true;
        this.soundView = new SoundPopView();
        this.addChild(this.soundView);
        this.soundView.visible = false;
        egret.Tween.get(ready).wait(400).to({ "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 200).to({ "visible": false }, 300).call(this.aaa, this);
    };
    p.showMusicView = function (e) {
        GameData.isClickBtn = true;
        this.soundView.visible = true;
        GameData.isPause = false;
        this.curNum = egret.getTimer();
    };
    p.onCLickHandler = function (e) {
        if (this.returnClick)
            return;
        if (this.btnType == 0)
            return;
        var str = e.currentTarget.name;
        var num = parseInt((str));
        if (this.btnType == num) {
            e.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCLickHandler, this);
            GameData.sorce += 100;
            this.showSorce.setValue(GameData.sorce + "");
            this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
            this.targetNum += 1;
            e.currentTarget.goToPlay("1");
            e.currentTarget.touchEnabled = false;
            if (this.targetNum == 9) {
                GameData.winNum += 1;
                GameData.sorce += 500;
                this.showSorce.setValue(GameData.sorce + "");
                this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
                if (GameData.winNum == 10) {
                    GameData.isPause = false;
                    this.barMask.visible = false;
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
                    this.showsorce.text = GameData.winNum + "/" + 10;
                    SoundUtils.instance().stopBg();
                    SoundUtils.instance().stopTimer();
                    egret.Tween.get(this.bar).to({ "scaleX": 0 }, 400).call(this.over, this);
                    return;
                }
                this.showRight();
                return;
            }
        }
        else {
            this.showWorng();
        }
    };
    p.aaa = function () {
        this.go.visible = true;
        SoundUtils.instance().playReadyGo();
        egret.Tween.get(this.go).to({ "scaleX": 1, "scaleY": 1, "x": this.nogScaleX, "y": this.nogScaleY }, 200).to({ "visible": false }, 300).call(this.bbb, this);
    };
    p.bbb = function () {
        this.returnClick = false;
        SoundUtils.instance().playBg();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
        this.initGameView();
    };
    p.initClickTarget = function () {
        var random;
        var i = 0;
        var num = 9;
        var mc;
        this.gameView.visible = false;
        this.typeArr = [];
        this.gameView.removeChildren();
        var gameViewBg = ResourceUtils.createBitmapByName("sceneView2Image");
        gameViewBg.x = -100;
        gameViewBg.y = -80;
        this.gameView.addChild(gameViewBg);
        for (; i < num; i++) {
            random = Math.round(1 + (3 - 1) * Math.random());
            if (random == 1) {
                mc = StarlingSwfFactory.getInstance().makeMc("mc2btn2Eff");
                mc.name = "1";
                mc.gotoAndStop(0);
                this.gameView.addChild(mc);
                mc.touchEnabled = true;
                this.typeArr.push(mc);
            }
            else if (random == 2) {
                mc = StarlingSwfFactory.getInstance().makeMc("mc2btn1Eff");
                mc.name = "2";
                mc.gotoAndStop(0);
                this.gameView.addChild(mc);
                mc.touchEnabled = true;
                this.typeArr.push(mc);
            }
            else if (random == 3) {
                mc = StarlingSwfFactory.getInstance().makeMc("mc2btn3Eff");
                mc.name = "3";
                mc.gotoAndStop(0);
                this.gameView.addChild(mc);
                mc.touchEnabled = true;
                this.typeArr.push(mc);
            }
            if (i < 9 && i >= 6) {
                mc.x = 120 * parseInt((i % 3)) + 22;
                mc.y = 120 * parseInt((i / 3));
            }
            else if (i >= 3 && i < 6) {
                mc.x = 120 * parseInt((i % 3)) + 18;
                mc.y = 120 * parseInt((i / 3));
            }
            else {
                mc.x = 120 * parseInt((i % 3)) + 13;
                mc.y = 120 * parseInt((i / 3));
            }
            this.typeArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCLickHandler, this);
        }
        this.gameView.x = Const.SCENT_WIDTH / 2 - this.gameView.width / 2 + 100;
    };
    p.initGameView = function () {
        var _x = Const.SCENT_WIDTH / 2 - this.gameView.width / 2 + 100;
        this.gameView.x = Const.SCENT_WIDTH;
        this.gameView.visible = true;
        egret.Tween.get(this.gameView).to({ "x": _x }, 400).call(this.initFrame, this);
    };
    p.initFrame = function () {
        this.returnClick = false;
        this.mc3.goToPlay("1");
        this.mc2.goToPlay("1");
        this.mc1.goToPlay("1");
        this.targetNum = 0;
        this.btnType = 0;
        GameData.isPause = true;
        GameData.isShow = false;
    };
    p.onEnterFrameHandler = function (e) {
        if (GameData.isPause) {
            if (GameData.dataTimer == 2) {
                this.daoJiShiTotalTime = this.daoJiShiTotalTime - 4000;
            }
            if (GameData.isStart) {
                GameData.isStart = false;
                this.daoJiShiTotalTime += egret.getTimer() - this.curNum;
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
            }
            else {
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
            }
            this.num = Math.floor((this.passTime / 1000) / 2);
            if (this.bar.scaleX >= 0) {
                var n = ((Math.floor(this.passTime / 1000 * 20) - (GameData.dataTimer * 2 * 20)) * 1000) / (100 * 20 * 1000);
                this.bar.scaleX = n;
                this.barMask.scaleX = n;
            }
            this.showTimer.text = "" + this.num;
            if (GameData.dataTimer == 2) {
                var _x = this.bar.width / 50 * this.num + this.bar.x;
                this.popNum(_x, this.bar.y);
            }
            GameData.dataTimer = 0;
            if (this.num <= 0) {
                this.showTimer.text = "0";
                SoundUtils.instance().stopBg();
                SoundUtils.instance().stopTimer();
                GameData.winNum = 0;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
                this.typeArr = [];
                //                GameData.sorce = 0;
                this.daoJiShiTotalTime = 0;
                if (this.parent)
                    this.removeChildren();
                egret.Tween.removeAllTweens();
                GameSceneView.game.gameOver();
            }
            if (this.num <= 10) {
                if (!this.isPlaySound) {
                    this.isPlaySound = true;
                    SoundUtils.instance().playTimewarningSound();
                }
                if (!this.playBarMask) {
                    this.playBarMask = true;
                    this.weixian.visible = true;
                    egret.Tween.get(this.barMask).to({ "visible": true }, 100).to({ "visible": false }, 100).call(this.canPlay, this);
                }
                if (!this.canPlayNvren) {
                    this.canPlayNvren = true;
                    this.nvren.goToPlay("2");
                    this.nvren.setCompleteAction(this.complete, this);
                }
            }
            this.sorcebar.scaleX = GameData.winNum / 10;
            if (GameData.winNum == 10) {
                this.showsorce.text = GameData.winNum + "/" + 10;
            }
            else {
                this.showsorce.text = "0" + GameData.winNum + "/" + 10;
            }
            this.gameStart();
        }
    };
    p.canPlay = function () {
        this.playBarMask = false;
        this.playBarMask = false;
        this.weixian.visible = false;
    };
    p.gameStart = function () {
        if (!GameData.isShow) {
            GameData.isShow = true;
            this.showGame();
        }
    };
    p.showGame = function () {
        this.clearData();
    };
    p.btn1Func = function (e) {
        if (this.returnClick)
            return;
        if (GameData.playBu) {
            SoundUtils.instance().playClick();
        }
        else {
            GameData.playBu = true;
            SoundUtils.instance().playbu();
        }
        this.btnType = 1;
        this.btn3_1Sp.visible = true;
        this.btn3_2Sp.visible = false;
        this.btn2_1Sp.visible = true;
        this.btn2_2Sp.visible = false;
        this.btn1_1Sp.visible = false;
        this.btn1_2Sp.visible = true;
        this.mc1.visible = false;
        this.mc2.visible = false;
        this.mc3.visible = false;
    };
    p.btn2Func = function (e) {
        if (this.returnClick)
            return;
        if (GameData.playBu) {
            SoundUtils.instance().playClick();
        }
        else {
            GameData.playBu = true;
            SoundUtils.instance().playbu();
        }
        this.btnType = 2;
        this.btn3_1Sp.visible = true;
        this.btn3_2Sp.visible = false;
        this.btn2_1Sp.visible = false;
        this.btn2_2Sp.visible = true;
        this.btn1_1Sp.visible = true;
        this.btn1_2Sp.visible = false;
        this.mc1.visible = false;
        this.mc2.visible = false;
        this.mc3.visible = false;
    };
    p.btn3Func = function (e) {
        if (this.returnClick)
            return;
        if (GameData.playBu) {
            SoundUtils.instance().playClick();
        }
        else {
            GameData.playBu = true;
            SoundUtils.instance().playbu();
        }
        this.btnType = 3;
        this.btn3_1Sp.visible = false;
        this.btn3_2Sp.visible = true;
        this.btn2_1Sp.visible = true;
        this.btn2_2Sp.visible = false;
        this.btn1_1Sp.visible = true;
        this.btn1_2Sp.visible = false;
        this.mc1.visible = false;
        this.mc2.visible = false;
        this.mc3.visible = false;
    };
    p.over = function () {
        this.bar.visible = false;
        var _cX = 0;
        var _cY = 0;
        this.returnClick = true;
        this.con.scaleX = 2;
        this.con.scaleY = 2;
        this.con.x = -this.con.width / 2;
        this.con.y = -this.con.height / 2;
        this.con.visible = true;
        SoundUtils.instance().playEnd();
        egret.Tween.get(this.con).to({ "scaleX": 1, "scaleY": 1, "x": _cX, "y": _cY }, 400).wait(2000).call(this.fun2, this);
    };
    p.fun2 = function () {
        this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1Func, this);
        this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2Func, this);
        this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn3Func, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
        GameData.curScene = 3;
        GameData.winNum = 0;
        this.typeArr = [];
        this.daoJiShiTotalTime = 0;
        if (this.parent)
            this.removeChildren();
        egret.Tween.removeAllTweens();
        GameSceneView.game.start();
    };
    p.clearData = function () {
        this.btnType = 0;
        var i = 0;
        var num = 9;
        for (; i < num; i++) {
            this.typeArr[i].gotoAndStop(0);
        }
    };
    p.complete = function () {
        this.canPlayNvren = false;
    };
    p.showRight = function () {
        this.nvren.goToPlay("3");
        GameData.isPause = false;
        this.curNum = egret.getTimer();
        this.returnClick = true;
        var norScaleX = Const.SCENT_WIDTH / 2 - this.gameRight.width / 2;
        var norScaleY = Const.SCENT_HEIGHT / 2 - this.gameRight.height / 2;
        this.gameRight.scaleX = 2;
        this.gameRight.scaleY = 2;
        this.gameRight.alpha = 0;
        this.gameRight.x = norScaleX - this.gameRight.width / 2;
        this.gameRight.y = norScaleY - this.gameRight.height / 2;
        this.gameRight.visible = true;
        this.btnType = 0;
        this.btn3_1Sp.visible = false;
        this.btn3_2Sp.visible = false;
        this.btn2_1Sp.visible = false;
        this.btn2_2Sp.visible = false;
        this.btn1_1Sp.visible = false;
        this.btn1_2Sp.visible = false;
        this.mc1.visible = true;
        this.mc2.visible = true;
        this.mc3.visible = true;
        SoundUtils.instance().playSemiclear();
        egret.Tween.get(this.gameRight).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 200).to({ "visible": false }, 600).call(this.falseView, this);
    };
    p.showWorng = function () {
        this.nvren.goToPlay("1");
        GameData.isPause = false;
        GameData.dataTimer = 2;
        this.curNum = egret.getTimer();
        this.returnClick = true;
        var norScaleX = this.gameWorng.x;
        var norScaleY = this.gameWorng.y;
        this.gameWorng.scaleX = 2;
        this.gameWorng.scaleY = 2;
        this.gameWorng.alpha = 0.2;
        this.gameWorng.visible = true;
        this.gameWorng.x = norScaleX - this.gameWorng.width / 2;
        this.gameWorng.y = norScaleY - this.gameWorng.height / 2;
        this.btnType = 0;
        this.btn3_1Sp.visible = false;
        this.btn3_2Sp.visible = false;
        this.btn2_1Sp.visible = false;
        this.btn2_2Sp.visible = false;
        this.btn1_1Sp.visible = false;
        this.btn1_2Sp.visible = false;
        this.mc1.visible = true;
        this.mc2.visible = true;
        this.mc3.visible = true;
        SoundUtils.instance().playError();
        egret.Tween.get(this.gameWorng).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 200).to({ "visible": false }, 600).call(this.falseView, this);
    };
    p.falseView = function () {
        egret.Tween.get(this.gameView).to({ "x": -Const.SCENT_WIDTH }, 400).call(this.showFightView, this);
    };
    p.showFightView = function () {
        this.initClickTarget();
        this.initGameView();
        GameData.playBu = false;
        GameData.isStart = true;
        var i = 0;
        var num = this.typeArr.length;
        for (; i < num; i++) {
            this.typeArr[i].touchEnabled = true;
        }
    };
    p.popNum = function (_x, _y) {
        this.numTwo.visible = true;
        this.numTwo.alpha = 0;
        this.numTwo.x = _x - this.numTwo.width / 2;
        this.numTwo.y = _y;
        egret.Tween.get(this.numTwo).to({ "alpha": 1, "x": this.numTwo.x, "y": this.numTwo.y - 100 }, 300).to({ "alpha": 0 }, 300);
    };
    return GameFightTwoScene;
}(egret.Sprite));
egret.registerClass(GameFightTwoScene,'GameFightTwoScene');
