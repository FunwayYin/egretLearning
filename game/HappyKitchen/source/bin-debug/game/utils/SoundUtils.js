/**
 * Created by Administrator on 2014/9/22.
 */
var SoundUtils = (function () {
    function SoundUtils() {
        if (SoundUtils._instance != null)
            throw new Error("singleton");
    }
    var d = __define,c=SoundUtils,p=c.prototype;
    SoundUtils.instance = function () {
        return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    };
    p.initSound = function () {
        this.bgSound = new SoundBase("bgSound");
        this.gameoverSound = new SoundBase("gameoverSound");
        this.clearSound = new SoundBase("clearSound");
        this.clickSound = new SoundBase("correctSound");
        this.clickBuSound = new SoundBase("clickSound");
        this.endSound = new SoundBase("endSound");
        this.errorSound = new SoundBase("errorSound");
        this.readygoSound = new SoundBase("readygoSound");
        this.semiclearSound = new SoundBase("semiclearSound");
        this.timewarningSound = new SoundBase("timewarningSound");
        //        this.readygoSound.addEventListener("end",this.playBgMusic);
        //        this.clickSound.addEventListener("end",this.playBgMusic);
        //        this.clickBuSound.addEventListener("end",this.playBgMusic);
        //        this.errorSound.addEventListener("end",this.playBgMusic);
        //        this.semiclearSound.addEventListener("end",this.playBgMusic);
    };
    //    private playBgMusic(e:egret.Sound):void
    //    {
    //        this.playBg();
    //    }
    p.playBg = function () {
        if (GameData.closeBgMusic) {
            this.bgSound.pause();
            return;
        }
        this.bgSound.play();
        this.bgSound.setLoop(1);
    };
    p.stopBg = function () {
        this.bgSound.pause();
    };
    p.stopTimer = function () {
        this.timewarningSound.pause();
    };
    p.playClear = function () {
        if (GameData.closeMusic)
            return;
        this.endSound.play();
    };
    p.playClick = function () {
        if (GameData.closeMusic)
            return;
        this.clickSound.play();
    };
    p.playbu = function () {
        if (GameData.closeMusic)
            return;
        this.clickBuSound.play();
    };
    p.playEnd = function () {
        if (GameData.closeMusic)
            return;
        this.clearSound.play();
    };
    p.playError = function () {
        if (GameData.closeMusic)
            return;
        this.errorSound.play();
    };
    p.playGameover = function () {
        if (GameData.closeMusic)
            return;
        this.gameoverSound.play();
    };
    p.playReadyGo = function () {
        if (GameData.closeMusic)
            return;
        //this.readygoSound.play();
        console.log("called playready go");
    };
    p.playSemiclear = function () {
        if (GameData.closeMusic)
            return;
        this.semiclearSound.play();
    };
    p.playTimewarningSound = function () {
        if (GameData.closeMusic)
            return;
        this.timewarningSound.play();
        this.timewarningSound.setLoop(1);
    };
    return SoundUtils;
}());
egret.registerClass(SoundUtils,'SoundUtils');
