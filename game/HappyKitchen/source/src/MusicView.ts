/**
 * Created by Administrator on 2014/9/23.
 */
class MusicView extends egret.Sprite{

    private spContainer:egret.Sprite;

    constructor(){
        super();

        this.initView();
    }

    private initView():void
    {
        var spMask:egret.Sprite = new egret.Sprite();
        this.addChild(spMask);
        var mask:egret.Bitmap = ResourceUtils.createBitmapByName("alphaBg");
        spMask.addChild(mask);
        spMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchThis,this);
        this.spContainer = new egret.Sprite();
        this.addChild(this.spContainer);
        var wd:number = Const.SCENT_WIDTH/8;
        var hd:number = Const.SCENT_HEIGHT/4;
        this.spContainer.x = wd;
        this.spContainer.y = hd;

        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("optionBgImage");
        this.spContainer.addChild(bg);

        var close:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(close);
        var spclose:egret.Bitmap = ResourceUtils.createBitmapByName("option7Image");
        close.addChild(spclose);
        close.touchEnabled = true;
        close.x = this.spContainer.width-close.width*0.7;
        close.y = -close.height*0.4;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closePop,this);

        var soundBooBg:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(soundBooBg);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        soundBooBg.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        soundBooBg.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        soundBooBg.x = 182;
        soundBooBg.y = 84;
        soundBooBg.touchEnabled = true;
        soundBooBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBgHandler,this);

        var soundBoo:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(soundBoo);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        soundBoo.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        soundBoo.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        soundBoo.x = 182;
        soundBoo.y = 148;
        soundBoo.touchEnabled = true;
        soundBoo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);

        if(!GameData.closeBgMusic)
        {
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
        }else{
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
        }
        if(!GameData.closeMusic)
        {
            this.spguan.visible = false;
            this.spkai.visible = true;
        }else{
            this.spguan.visible = true;
            this.spkai.visible = false;
        }
    }
    private onTouchThis(e:egret.TouchEvent):void
    {
        e.stopImmediatePropagation();
    }
    private spguanbg:egret.Bitmap;
    private spkaibg:egret.Bitmap;
    private spguan:egret.Bitmap;
    private spkai:egret.Bitmap;
    private clickHandler(e:egret.TouchEvent):void
    {
        if(!GameData.closeMusic)
        {
            this.spkai.visible = false;
            this.spguan.visible = true;
            GameData.closeMusic = true;
        }else{
            this.spkai.visible = true;
            this.spguan.visible = false;
            GameData.closeMusic = false;
        }
    }
    private clickBgHandler(e:egret.TouchEvent):void
    {
        if(!GameData.closeBgMusic)
        {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
            GameData.closeBgMusic = true;
        }else{
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
            GameData.closeBgMusic = false;
        }
    }
    private closePop(e:egret.TouchEvent):void
    {
        if(this.parent)
            GameData.isClickBtn = false;
            this.parent.removeChild(this);
    }
    public removeAll():void
    {
        this.removeChildren();
    }
}