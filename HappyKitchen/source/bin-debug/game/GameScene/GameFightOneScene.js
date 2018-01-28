/**
 * Created by Channing on 2014/9/17.
 */
var GameFightOneScene = (function (_super) {
    __extends(GameFightOneScene, _super);
    function GameFightOneScene() {
        _super.call(this);
        this.daoJiShiTotalTime = egret.getTimer() + 1000 * 60;
        //游戏数据
        this.btn1Num = 0;
        this.btn2Num = 0;
        this.btn3Num = 0;
        this.curbtn1Num = 0;
        this.curbtn2Num = 0;
        this.curbtn3Num = 0;
        this.btn1Arr = [];
        this.btn2Arr = [];
        this.btn3Arr = [];
        this.returnClick = false;
        this.passTime = 0;
        this.num = 0;
        this._win = false;
        this.curNum = 0;
        this.canPlayNvren = false;
        this.isPauseGame = "";
        this.initView();
    }
    var d = __define,c=GameFightOneScene,p=c.prototype;
    p.initView = function () {
        var bg = ResourceUtils.createBitmapByName("gamingbgImage");
        this.addChild(bg);
        this.gameLayer = new egret.Sprite();
        this.addChild(this.gameLayer);
        this.gameView = new egret.Sprite();
        this.addChild(this.gameView);
        this.gameView.x = 75;
        this.gameView.y = 580;
        this.uiLayer = new egret.Sprite();
        this.addChild(this.uiLayer);
        this.topLayer = new egret.Sprite();
        this.addChild(this.topLayer);
        this.btn1 = new MyButton("game1btn1Image", "game1btn1Image");
        this.gameLayer.addChild(this.btn1);
        this.btn1.setClick(this.btn1Func.bind(this));
        this.btn2 = new MyButton("game1btn2Image", "game1btn2Image");
        this.gameLayer.addChild(this.btn2);
        this.btn2.setClick(this.btn2Func.bind(this));
        this.btn3 = new MyButton("game1btn3Image", "game1btn3Image");
        this.gameLayer.addChild(this.btn3);
        this.btn3.setClick(this.btn3Func.bind(this));
        var i = 0;
        var num = 4;
        var btn1View;
        for (; i < num; i++) {
            btn1View = StarlingSwfFactory.getInstance().makeMc("mc1Btn1Efc");
            btn1View.visible = false;
            btn1View.gotoAndStop(0);
            this.btn1Arr.push(btn1View);
            this.gameView.addChild(btn1View);
            btn1View.x = 0;
            btn1View.y = -(i * 110);
        }
        i = 0;
        num = 4;
        var btn2View;
        for (; i < num; i++) {
            btn2View = StarlingSwfFactory.getInstance().makeMc("mc1Btn2Efc");
            this.btn2Arr.push(btn2View);
            btn2View.gotoAndStop(0);
            btn2View.visible = false;
            this.gameView.addChild(btn2View);
            btn2View.x = 160;
            btn2View.y = -(i * 110);
        }
        i = 0;
        num = 4;
        var btn3View;
        for (; i < num; i++) {
            btn3View = StarlingSwfFactory.getInstance().makeMc("mc1Btn3Efc");
            this.btn3Arr.push(btn3View);
            btn3View.visible = false;
            btn3View.gotoAndStop(0);
            this.gameView.addChild(btn3View);
            btn3View.x = 320;
            btn3View.y = -(i * 110);
        }
        this.btn1.x = this.gameView.x - 45;
        this.btn2.x = 170;
        this.btn3.x = 340;
        this.btn1.y = this.gameView.y + 45;
        this.btn2.y = this.gameView.y + 45;
        this.btn3.y = this.gameView.y + 45;
        this.sorcebar = ResourceUtils.createBitmapByName("sorcebarImage");
        this.barNumPic = ResourceUtils.createBitmapByName("barNum1Image");
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
        this.uiLayer.addChild(this.showSorce);
        this.showSorce.scaleX = this.showSorce.scaleY = 0.8;
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
        this.isPauseGame = GameData.n.join("");
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
        this.returnClick = true;
        //        this.swfFrame = StarlingswfMovieClip.swfFrame["href"];
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
        GameData.isPause = true;
        this.returnClick = false;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
    };
    p.onEnterFrameHandler = function (e) {
        if (GameData.isPause) {
            if (GameData.dataTimer == 2) {
                this.daoJiShiTotalTime = this.daoJiShiTotalTime - 4000;
            }
            if (GameData.isStart) {
                //                if(this.swfFrame.indexOf(this.isPauseGame) >= 0||this.swfFrame.indexOf(ShareUtils.shareSwfInfo) >= 0)
                //                {
                GameData.isStart = false;
                this.daoJiShiTotalTime += egret.getTimer() - this.curNum;
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
            }
            else {
                this.passTime = this.daoJiShiTotalTime - egret.getTimer();
            }
            this.num = Math.floor((this.passTime / 1000) / 2);
            if (this.bar.scaleX >= 0) {
                this.bar.scaleX = ((Math.floor(this.passTime / 1000 * 20) - (GameData.dataTimer * 2 * 20)) * 1000) / (60 * 20 * 1000);
                this.barMask.scaleX = ((Math.floor(this.passTime / 1000 * 20) - (GameData.dataTimer * 2 * 20)) * 1000) / (60 * 20 * 1000);
            }
            this.showTimer.text = "" + this.num;
            if (GameData.dataTimer == 2) {
                var _x = this.bar.width / 30 * this.num + this.bar.x;
                this.popNum(_x, this.bar.y);
            }
            GameData.dataTimer = 0;
            if (this.num <= 10) {
                if (!this.playBarMask) {
                    this.playBarMask = true;
                    this.weixian.visible = true;
                    egret.Tween.get(this.barMask).to({ "visible": true }, 100).to({ "visible": false }, 100).call(this.canPlay, this);
                }
                if (!this.isPlaySound) {
                    this.isPlaySound = true;
                    SoundUtils.instance().playTimewarningSound();
                }
                if (!this.canPlayNvren) {
                    this.canPlayNvren = true;
                    this.nvren.goToPlay("2");
                    this.nvren.setCompleteAction(this.complete, this);
                }
            }
            if (this.num <= 0 && !this._win) {
                this.returnClick = true;
                this.showTimer.text = "0";
                SoundUtils.instance().stopBg();
                SoundUtils.instance().stopTimer();
                //                GameData.sorce = 0;
                GameData.winNum = 0;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
                if (this.parent)
                    this.removeChildren();
                GameSceneView.game.gameOver();
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
        this.falseAll();
        this.randomView();
        this.showGameView();
        this.playBg();
    };
    p.playBg = function () {
        if (!this.isplay) {
            this.isplay = true;
            SoundUtils.instance().playBg();
        }
    };
    p.falseAll = function () {
        var i = 0;
        var num = 4;
        for (; i < num; i++) {
            this.btn1Arr[i].visible = false;
            this.btn2Arr[i].visible = false;
            this.btn3Arr[i].visible = false;
        }
    };
    p.showGameView = function () {
        this.returnClick = false;
        var i = 0;
        var num = this.btn1Num;
        for (; i < num; i++) {
            this.btn1Arr[i].visible = true;
        }
        i = 0;
        num = this.btn2Num;
        for (; i < num; i++) {
            this.btn2Arr[i].visible = true;
        }
        i = 0;
        num = this.btn3Num;
        for (; i < num; i++) {
            this.btn3Arr[i].visible = true;
        }
    };
    p.randomView = function () {
        this.btn1Num = Math.round(Math.random() * (4 - 1) + 1);
        this.btn2Num = Math.round(Math.random() * (4 - 1) + 1);
        this.btn3Num = Math.round(Math.random() * (4 - 1) + 1);
    };
    p.btn1Func = function () {
        if (this.returnClick)
            return;
        this.curbtn1Num += 1;
        if (this.curbtn1Num <= this.btn1Num) {
            this.btn1Arr[this.curbtn1Num - 1].goToPlay("1");
        }
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.btn2Func = function () {
        if (this.returnClick)
            return;
        this.curbtn2Num += 1;
        if (this.curbtn2Num <= this.btn2Num) {
            this.btn2Arr[this.curbtn2Num - 1].goToPlay("1");
        }
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.btn3Func = function () {
        if (this.returnClick)
            return;
        this.curbtn3Num += 1;
        if (this.curbtn3Num <= this.btn3Num) {
            this.btn3Arr[this.curbtn3Num - 1].goToPlay("1");
        }
        SoundUtils.instance().playClick();
        this.changeGameView();
    };
    p.changeGameView = function () {
        if (this.curbtn1Num == this.btn1Num && this.curbtn2Num == this.btn2Num && this.curbtn3Num == this.btn3Num) {
            this.returnClick = true;
            GameData.winNum += 1;
            GameData.sorce += 500;
            this.showSorce.setValue(GameData.sorce + "");
            this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
            if (GameData.winNum == 10) {
                this._win = true;
                this.barMask.visible = false;
                this.showsorce.text = GameData.winNum + "/" + 10;
                SoundUtils.instance().stopTimer();
                SoundUtils.instance().stopBg();
                egret.Tween.get(this.bar).to({ "scaleX": 0 }, 400).call(this.over, this);
                return;
            }
            this.showRight();
            return;
        }
        if (this.curbtn1Num > this.btn1Num || this.curbtn3Num > this.btn3Num || this.curbtn2Num > this.btn2Num) {
            this.showWorng();
            return;
        }
        GameData.sorce += 100;
        this.showSorce.setValue(GameData.sorce + "");
        this.showSorce.x = Const.SCENT_WIDTH / 2 - this.showSorce.width / 2;
    };
    p.over = function () {
        egret.Tween.removeAllTweens();
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
        egret.Tween.removeAllTweens();
        GameData.isPause = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
        this.showTimer.text = "0";
        GameData.curScene = 2;
        GameData.winNum = 0;
        this._win = false;
        if (this.parent) {
            this.removeChildren();
        }
        GameSceneView.game.start();
    };
    p.clearData = function () {
        this.curbtn1Num = 0;
        this.curbtn2Num = 0;
        this.curbtn3Num = 0;
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
        egret.Tween.get(this.gameRight).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 200).to({ "visible": false }, 600).call(this.showFightView, this);
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
        egret.Tween.get(this.gameWorng).to({ "alpha": 1, "scaleX": 1, "scaleY": 1, "x": norScaleX, "y": norScaleY }, 200).to({ "visible": false }, 600).call(this.showFightView, this);
    };
    p.showFightView = function () {
        egret.Tween.removeAllTweens();
        var num1 = this.btn1Arr.length;
        for (var i = 0; i < num1; i++) {
            this.btn1Arr[i].gotoAndStop(0);
        }
        var num3 = this.btn3Arr.length;
        for (var i = 0; i < num3; i++) {
            this.btn3Arr[i].gotoAndStop(0);
        }
        var num2 = this.btn2Arr.length;
        for (var i = 0; i < num2; i++) {
            this.btn2Arr[i].gotoAndStop(0);
        }
        GameData.isPause = true;
        GameData.isStart = true;
        GameData.isShow = false;
    };
    p.popNum = function (_x, _y) {
        this.numTwo.visible = true;
        this.numTwo.alpha = 0;
        this.numTwo.x = _x - this.numTwo.width / 2;
        this.numTwo.y = _y;
        egret.Tween.get(this.numTwo).to({ "alpha": 1, "x": this.numTwo.x, "y": this.numTwo.y - 100 }, 300).to({ "alpha": 0 }, 300);
    };
    return GameFightOneScene;
}(egret.Sprite));
egret.registerClass(GameFightOneScene,'GameFightOneScene');
