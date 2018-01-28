/**
 * Created by Administrator on 2014/9/22.
 */
class SoundUtils{

    private static _instance:SoundUtils;

    public static instance():SoundUtils
    {
        return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    }

    constructor()
    {
        if(SoundUtils._instance != null)
            throw new Error("singleton");
    }

    private bgSound:SoundBase;
    private gameoverSound:SoundBase;
    private timewarningSound:SoundBase;
    private semiclearSound:SoundBase;
    private readygoSound:SoundBase;
    private errorSound:SoundBase;
    private endSound:SoundBase;

    private clickSound:SoundBase;
    private clickBuSound:SoundBase;
    private clearSound:SoundBase;

    public initSound():void
    {
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
    }
//    private playBgMusic(e:egret.Sound):void
//    {
//        this.playBg();
//    }
    public playBg():void
    {
        if(GameData.closeBgMusic){
            this.bgSound.pause();
            return;
        }
        this.bgSound.play();
        this.bgSound.setLoop(1);
    }
    public stopBg():void
    {
        this.bgSound.pause();
    }
    public stopTimer():void
    {
        this.timewarningSound.pause();
    }
    public playClear():void
    {
        if(GameData.closeMusic) return;
        this.endSound.play();
    }
    public playClick():void
    {
        if(GameData.closeMusic)
            return;
        this.clickSound.play();
    }
    public playbu():void
    {
        if(GameData.closeMusic)
            return;
        this.clickBuSound.play();
    }

    public playEnd():void
    {
        if(GameData.closeMusic)
            return;
        this.clearSound.play();

    }
    public playError():void
    {
        if(GameData.closeMusic)
            return;
        this.errorSound.play();
    }
    public playGameover():void
    {
        if(GameData.closeMusic)
            return;
        this.gameoverSound.play();
    }
    public playReadyGo():void
    {
        if(GameData.closeMusic)
            return;
        //this.readygoSound.play();
        console.log("called playready go");
    }
    public playSemiclear():void
    {
        if(GameData.closeMusic)
            return;
        this.semiclearSound.play();
    }
    public playTimewarningSound():void
    {
        if(GameData.closeMusic)
            return;
        this.timewarningSound.play();
        this.timewarningSound.setLoop(1);
    }
}