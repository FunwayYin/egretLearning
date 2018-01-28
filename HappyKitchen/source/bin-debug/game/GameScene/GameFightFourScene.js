/**
 * Created by Channing on 2014/9/18.
 */
var GameFightFourScene = (function (_super) {
    __extends(GameFightFourScene, _super);
    function GameFightFourScene() {
        _super.call(this);
        this.daoJiShiTotalTime = egret.getTimer() + 1000 * 120;
        //游戏数据
        this.returnClick = false;
        this.curTarget = 0;
        this.curArr = 0;
        this._win = false;
        this.typeCurArr = [];
        this.typeLastArr = [];
        this.passTime = 0;
        this.num = 0;
        this.curNum = 0;
        this.canPlayNvren = false;
        this.okNum = 0;
        this.initView();
    }
    var d = __define,c=GameFightFourScene,p=c.prototype;
    p.initView = function () {
        var bg = ResourceUtils.createBitmapByName("gamingbgImage");
        this.addChild(bg);
        this.gameLayer = new egret.Sprite();
        this.addChild(this.gameLayer);
        this.gameView = new egret.Sprite();
        this.addChild(this.gameView);
        this.gameView.x = 0;
        this.gameView.y = 220;
        this.curGameViewBg = new egret.Sprite();
        var sp1 = ResourceUtils.createBitmapByName("gameScene4ViewBgImage");
        this.lastGameViewBg = new egret.Sprite();
        var sp2 = ResourceUtils.createBitmapByName("gameScene4ViewBgImage");
        this.gameView.addChild(this.lastGameViewBg);
        this.gameView.addChild(this.curGameViewBg);
        this.curSp = new egret.Sprite();
        this.lastSp = new egret.Sprite();
        this.curGameViewBg.addChild(sp1);
        this.lastGameViewBg.addChild(sp2);
        this.curGameViewBg.addChild(this.curSp);
        this.lastGameViewBg.addChild(this.lastSp);
        this.curGameViewBg.alpha = 0;
        this.lastGameViewBg.x = -Const.SCENT_WIDTH;
        this.curGameViewBg.x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2;
        this.uiLayer = new egret.Sprite();
        this.addChild(this.uiLayer);
        this.topLayer = new egret.Sprite();
        this.addChild(this.topLayer);
        this.btn1 = new MyButton("game4Btn1Image", "game4Btn1Image");
        this.gameLayer.addChild(this.btn1);
        this.btn1.setClick(this.btn1Func.bind(this));
        this.btn2 = new MyButton("game4Btn2Image", "game4Btn2Image");
        this.gameLayer.addChild(this.btn2);
        this.btn2.setClick(this.btn2Func.bind(this));
        this.btn3 = new MyButton("game4Btn3Image", "game4Btn3Image");
        this.gameLayer.addChild(this.btn3);
        this.btn3.setClick(this.btn3Func.bind(this));
        this.btn1.y = 600;
        this.btn2.y = 600;
        this.btn3.y = 605;
        this.btn1.x = 40;
        this.btn2.x = 180;
        this.btn3.x = 325;
        this.showSorce = new SpecialNumber("number_");
        this.sorcebar = ResourceUtils.createBitmapByName("sorcebarImage");
        this.barNumPic = ResourceUtils.createBitmapByName("barNum4Image");
        this.nvren = StarlingSwfFactory.getInstance().makeMc("nvren");
        this.weixian = ResourceUtils.createBitmapByName("weixianImage");
        this.showsorce = new egret.TextField();
        this.showsorce.textColor = 0xffffff;
        this.showsorce.bold = true;
        this.showsorce.size = 16;
        this.showsorce.strokeColor = 0x000000;
        this.uiLayer.addChild(this.weixian);
        this.uiLayer.addChild(this.sorcebar);
        this.uiLayer.addChild(this.barNumPic);
        this.uiLayer.addChild(this.showsorce);
        this.showSorce.scaleX = this.showSorce.scaleY = 0.8;
        this.uiLayer.addChild(this.nvren);
        this.nvren.gotoAndStop(0);
        var optionBtn = new egret.Sprite();
        var optionBmp = ResourceUtils.createBitmapByName("optionbtnImage");
        optionBtn.addChild(optionBmp);
        optionBtn.touchEnabled = true;
        optionBtn.x = Const.SCENT_WIDTH - optionBtn.width;
        optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMusicView, this);
        this.uiLayer.addChild(optionBtn);
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
        this.sorcebar.scaleX = GameData.winNum / GameData.fourWinNum;
        this.bar = ResourceUtils.createBitmapByName("gamingbarImage");
        this.uiLayer.addChild(this.bar);
        this.bar.y = Const.SCENT_HEIGHT - this.bar.height * 2 + 10;
        this.bar.x = Const.SCENT_WIDTH / 2 - this.bar.width / 2;
        this.barMask = ResourceUtils.createBitmapByName("gamingbarMaskImage");
        this.uiLayer.addChild(this.barMask);
        this.barMask.visible = false;
        this.barMask.y = Const.SCENT_HEIGHT - this.barMask.height * 2 + 10;
        this.barMask.x = Const.SCENT_WIDTH / 2 - this.barMask.width / 2;
        var gameMaskBar = ResourceUtils.createBitmapByName("gameMaskBar");
        this.uiLayer.addChild(gameMaskBar);
        gameMaskBar.y = Const.SCENT_HEIGHT - gameMaskBar.height * 1.5 + 3;
        gameMaskBar.x = Const.SCENT_WIDTH / 2 - gameMaskBar.width / 2;
        this.showTimer = new egret.TextField();
        this.showTimer.x = Const.SCENT_WIDTH / 2;
        this.showTimer.y = Const.SCENT_HEIGHT - 35;
        this.showTimer.textColor = 0xffffff;
        this.showTimer.bold = true;
        this.showTimer.size = 16;
        this.showTimer.strokeColor = 0x000000;
        this.uiLayer.addChild(this.showTimer);
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
        this.con.x = Const.SCENT_WIDTH / 2 - this.con.width / 2;
        this.con.y = Const.SCENT_HEIGHT / 2 - this.con.height / 2;
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
    p.aaa = function () {
        this.go.visible = true;
        SoundUtils.instance().playReadyGo();
        egret.Tween.get(this.go).to({ "scaleX": 1, "scaleY": 1, "x": this.nogScaleX, "y": this.nogScaleY }, 200).to({ "visible": false }, 300).call(this.bbb, this);
    };
    p.bbb = function () {
        egret.Tween.removeAllTweens();
        SoundUtils.instance().playBg();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
        this.initGameView();
    };
    p.initGameView = function () {
        this.randomView();
        this.showCurGameViewBg();
    };
    p.randomView = function () {
        this.randomCurView();
        this.randomLastView();
    };
    p.randomCurView = function () {
        var randomCur = 0;
        var i = 1;
        var num = 6;
        var mc1;
        for (; i < num; i++) {
            randomCur = Math.round(Math.random() * (3 - 1) + 1);
            if (randomCur == 1) {
                mc1 = StarlingSwfFactory.getInstance().makeMc("mc4Btn1Efc");
                mc1.name = "1";
                mc1.gotoAndStop(0);
            }
            else if (randomCur == 2) {
                mc1 = StarlingSwfFactory.getInstance().makeMc("mc4Btn2Efc");
                mc1.name = "2";
                mc1.gotoAndStop(0);
            }
            else if (randomCur == 3) {
                mc1 = StarlingSwfFactory.getInstance().makeMc("mc4Btn3Efc");
                mc1.name = "3";
                mc1.gotoAndStop(0);
            }
            this.curSp.addChild(mc1);
            mc1.scaleX = mc1.scaleY = 0.8;
            mc1.x = 78 * i;
            mc1.y = 90;
            this.typeCurArr.push(mc1);
        }
    };
    p.randomLastView = function () {
        var randomLast = 0;
        var i = 1;
        var num = 6;
        var mc2;
        for (; i < num; i++) {
            randomLast = Math.round(Math.random() * (3 - 1) + 1);
            if (randomLast == 1) {
                mc2 = StarlingSwfFactory.getInstance().makeMc("mc4Btn1Efc");
                mc2.name = "1";
            }
            else if (randomLast == 2) {
                mc2 = StarlingSwfFactory.getInstance().makeMc("mc4Btn2Efc");
                mc2.name = "2";
            }
            else if (randomLast == 3) {
                mc2 = StarlingSwfFactory.getInstance().makeMc("mc4Btn3Efc");
                mc2.name = "3";
            }
            mc2.gotoAndStop(0);
            this.lastSp.addChild(mc2);
            mc2.scaleX = mc2.scaleY = 0.8;
            mc2.x = 78 * i;
            mc2.y = 90;
            this.typeLastArr.push(mc2);
        }
    };
    p.showCurGameViewBg = function () {
        this.curArr = 1;
        this.curGameViewBg.scaleX = this.curGameViewBg.scaleY = 0.7;
        this.curGameViewBg.y = 0;
        this.lastGameViewBg.visible = false;
        var _x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2;
        var _y = 150;
        this.curGameViewBg.x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2 + this.curGameViewBg.width / 8;
        egret.Tween.get(this.curGameViewBg).to({ "x": _x, "y": _y, "scaleX": 1, "scaleY": 1, "alpha": 1 }, 350).call(this.showLast, this);
    };
    p.showLast = function () {
        this.lastGameViewBg.visible = true;
        this.lastGameViewBg.scaleX = this.lastGameViewBg.scaleY = 0.7;
        var _x = Const.SCENT_WIDTH / 2 - this.lastGameViewBg.width / 2 + this.lastGameViewBg.width / 8;
        this.lastGameViewBg.x = -Const.SCENT_WIDTH;
        this.lastGameViewBg.y = 0;
        GameData.isStart = true;
        egret.Tween.get(this.lastGameViewBg).to({ "x": _x, "scaleX": 0.7, "scaleY": 0.7 }, 350).call(this.startGame, this);
    };
    p.startGame = function () {
        GameData.isPause = true;
        this.returnClick = false;
        GameData.isStart = false;
        GameData.isShow = false;
    };
    p.onEnterFrameHandler = function (e) {
        if (GameData.isPause) {
            if (GameData.dataTimer == 2) {
                this.daoJiShiTotalTime = this.daoJiShiTotalTime - 4000;
            }
            if (GameData.isStart) {
                this.daoJiShiTotalTime += egret.getTimer() - this.curNum;
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
                GameData.isStart = false;
            }
            else {
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
            }
            this.num = Math.floor((this.passTime / 1000) / 2);
            if (this.bar.scaleX >= 0) {
                var n = ((Math.floor(this.passTime / 1000 * 20) - (GameData.dataTimer * 2 * 20)) * 1000) / (120 * 20 * 1000);
                this.bar.scaleX = n;
                this.barMask.scaleX = n;
            }
            this.showTimer.text = "" + this.num;
            if (GameData.dataTimer == 2) {
                var _x = this.bar.width / 60 * this.num + this.bar.x;
                this.popNum(_x, this.bar.y);
            }
            GameData.dataTimer = 0;
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
            if (this.num <= 0 && !this._win) {
                this.showTimer.text = "0";
                GameData.winNum = 0;
                //                GameData.sorce = 0;
                SoundUtils.instance().stopBg();
                SoundUtils.instance().stopTimer();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
                this.daoJiShiTotalTime = 0;
                if (this.parent)
                    this.removeChildren();
                egret.Tween.removeAllTweens();
                GameSceneView.game.gameOver();
            }
            this.sorcebar.scaleX = GameData.winNum / GameData.fourWinNum;
            var str = GameData.winNum + "/" + GameData.fourWinNum;
            if (GameData.winNum >= 10) {
                this.showsorce.text = str;
            }
            else {
                this.showsorce.text = "0" + str;
            }
            this.gameStart();
        }
    };
    p.canPlay = function () {
        this.playBarMask = false;
        this.weixian.visible = false;
    };
    p.complete = function () {
        this.canPlayNvren = false;
    };
    p.gameStart = function () {
        if (!GameData.isShow) {
            GameData.isShow = true;
            this.showGame();
        }
    };
    p.showGame = function () {
        this.clearData();
        this.showGameView();
    };
    p.showGameView = function () {
    };
    p.btn1Func = function () {
        if (this.returnClick)
            return;
        this.curTarget = 1;
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.btn2Func = function () {
        if (this.returnClick)
            return;
        this.curTarget = 2;
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.btn3Func = function () {
        if (this.returnClick)
            return;
        this.curTarget = 3;
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.changeGameView = function () {
        if (this.curArr == 1) {
            var num = parseInt((this.typeCurArr[this.okNum].name));
            if (num == this.curTarget) {
                this.okNum += 1;
                this.typeCurArr[this.okNum - 1].goToPlay("1");
                if (this.okNum == 5) {
                    this.okNum = 0;
                    GameData.winNum += 1;
                    GameData.sorce += 500;
                    this.showSorce.setValue(GameData.sorce + "");
                    this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
                    if (GameData.winNum == GameData.fourWinNum) {
                        this._win = true;
                        this.barMask.visible = false;
                        egret.Tween.get(this.bar).to({ "scaleX": 0 }, 400, egret.Ease.sineIn).call(this.over, this);
                        return;
                    }
                    this.showRight();
                    return;
                }
                GameData.sorce += 100;
                this.showSorce.setValue(GameData.sorce + "");
                this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
            }
            else {
                this.okNum = 0;
                this.showWorng();
                return;
            }
        }
        else if (this.curArr == 2) {
            var num = parseInt((this.typeLastArr[this.okNum].name));
            if (num == this.curTarget) {
                //                  this.nvren.goToPlay("4");
                this.okNum += 1;
                this.typeLastArr[this.okNum - 1].goToPlay("1");
                if (this.okNum == 5) {
                    this.okNum = 0;
                    GameData.winNum += 1;
                    GameData.sorce += 500;
                    ;
                    if (GameData.winNum == GameData.fourWinNum) {
                        GameData.isPause = false;
                        this.barMask.visible = false;
                        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
                        this.showsorce.text = GameData.winNum + "/" + GameData.fourWinNum;
                        SoundUtils.instance().stopBg();
                        SoundUtils.instance().stopTimer();
                        egret.Tween.get(this.bar).to({ "scaleX": 0 }, 400).call(this.over, this);
                        return;
                    }
                    this.showRight();
                    return;
                }
                GameData.sorce += 100;
            }
            else {
                this.okNum = 0;
                this.showWorng();
                return;
            }
        }
    };
    p.removeCurAll = function () {
        this.curSp.removeChildren();
        this.typeCurArr = [];
    };
    p.removeLastAll = function () {
        this.lastSp.removeChildren();
        this.typeLastArr = [];
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
        SoundUtils.instance().playEnd();
        this.con.visible = true;
        egret.Tween.get(this.con).to({ "scaleX": 1, "scaleY": 1, "x": _cX, "y": _cY }, 400).wait(2000).call(this.fun2, this);
    };
    p.fun2 = function () {
        GameData.isPause = false;
        GameData.curScene = 5;
        this._win = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
        this.showTimer.text = "0";
        this.gameView.removeChildren();
        this.gameView.removeChildren();
        this.uiLayer.removeChildren();
        this.gameLayer.removeChildren();
        this.topLayer.removeChildren();
        this.daoJiShiTotalTime = 0;
        if (this.parent)
            this.removeChildren();
        var spWin = ResourceUtils.createBitmapByName("gameWinImage");
        this.addChild(spWin);
        this.share = new ShareView();
        this.addChild(this.share);
        this.share.visible = false;
        egret.Tween.get(this.share).wait(2000).call(this.showHomeView, this);
    };
    p.showHomeView = function () {
        egret.Tween.removeAllTweens();
        this.share.visible = true;
    };
    p.clearData = function () {
        this.curTarget = 0;
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
        SoundUtils.instance().playSemiclear();
        egret.Tween.get(this.gameRight).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 300).call(this.showFightView, this).to({ "visible": false }, 700);
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
        SoundUtils.instance().playError();
        egret.Tween.get(this.gameWorng).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 300).call(this.showFightView, this).to({ "visible": false }, 700);
    };
    p.showFightView = function () {
        if (this.curArr == 1) {
            this.showLastGameViewBg();
        }
        else if (this.curArr == 2) {
            this.showCur1GameViewBg();
        }
    };
    p.showCur1GameViewBg = function () {
        this.curArr = 1;
        var _x = Const.SCENT_WIDTH;
        egret.Tween.get(this.lastGameViewBg).to({ "x": _x, "scaleX": 1, "scaleY": 1 }, 350).call(this.showLast1View, this);
    };
    p.showLast1View = function () {
        this.removeLastAll();
        this.randomLastView();
        var _x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2;
        var _y = 150;
        egret.Tween.get(this.curGameViewBg).to({ "x": _x, "y": _y, "scaleX": 1, "scaleY": 1, "alpha": 1 }, 350).call(this.showLast, this);
    };
    p.showLastGameViewBg = function () {
        this.curArr = 2;
        var _x = Const.SCENT_WIDTH;
        this.curGameViewBg.x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2 + this.curGameViewBg.width / 8;
        egret.Tween.get(this.curGameViewBg).to({ "x": _x, "scaleX": 1, "scaleY": 1 }, 350).call(this.showLastView, this);
    };
    p.showLastView = function () {
        this.removeCurAll();
        this.randomCurView();
        var _x = Const.SCENT_WIDTH / 2 - this.lastGameViewBg.width / 2;
        var _y = 150;
        egret.Tween.get(this.lastGameViewBg).to({ "x": _x, "y": _y, "scaleX": 1, "scaleY": 1 }, 350).call(this.showCur, this);
    };
    p.showCur = function () {
        this.curGameViewBg.scaleX = this.curGameViewBg.scaleY = 0.7;
        var _x = Const.SCENT_WIDTH / 2 - this.curGameViewBg.width / 2 + this.lastGameViewBg.width / 8;
        this.curGameViewBg.x = -Const.SCENT_WIDTH;
        this.curGameViewBg.y = 0;
        GameData.isStart = true;
        egret.Tween.get(this.curGameViewBg).to({ "x": _x, "scaleX": 0.7, "scaleY": 0.7 }, 350).call(this.startGame, this);
    };
    p.popNum = function (_x, _y) {
        this.numTwo.visible = true;
        this.numTwo.alpha = 0;
        this.numTwo.x = _x - this.numTwo.width / 2;
        this.numTwo.y = _y;
        egret.Tween.get(this.numTwo).to({ "alpha": 1, "x": this.numTwo.x, "y": this.numTwo.y - 100 }, 300).to({ "alpha": 0 }, 300);
    };
    return GameFightFourScene;
}(egret.Sprite));
egret.registerClass(GameFightFourScene,'GameFightFourScene');
