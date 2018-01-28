/*** Created by Administrator on 2014/9/17. */
class GameingSceneView extends egret.Sprite
{
    private thisContainer:egret.Bitmap;
    private num:number;
    private isStartGameBoo:Boolean;

    constructor()
    {
        super();
    }

    public showGame(index:number):void
    {
        this.num = index;
        switch (index)
        {
            case 1:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_1_Image");
                this.addChild(this.thisContainer);
                break;
            case 2:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_2_Image");
                this.addChild(this.thisContainer);
                break;
            case 3:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_3_Image");
                this.addChild(this.thisContainer);
                break;
            case 4:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_4_Image");
                this.addChild(this.thisContainer);
                break;
        }
        var start_btn:egret.Bitmap = ResourceUtils.createBitmapByName("startGameBtnImage");
        start_btn.scaleX = start_btn.scaleY = 1.4;
        this.addChild(start_btn);
        var _swidth:number = Const.SCENT_WIDTH / 2 - start_btn.width / 2 - 10;
        var _sheight:number = Const.SCENT_HEIGHT - start_btn.height - 20;
        start_btn.x = _swidth;
        start_btn.y = _sheight;
        var kuang:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("kuang");
        this.addChild(kuang);
        kuang.x = Const.SCENT_WIDTH / 2;
        kuang.y = kuang.height * 1.3;
        kuang.goToPlay("1");
        kuang.setCompleteAction(this.complete, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStartView, this);
    }

    private complete():void
    {
        this.isStartGameBoo = true;
    }

    private removeAl():void
    {
        this.touchEnabled = false;
        ;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showStartView, this);
    }

    private showStartView(e:egret.TouchEvent):void
    {
        if (!this.isStartGameBoo) return;
        switch (this.num)
        {
            case 1:
                this.removeChildren();
                this.removeAl();
                var game1:GameFightOneScene = new GameFightOneScene();
                this.addChild(game1);
                break;
            case 2:
                this.removeChildren();
                this.removeAl();
                var game2:GameFightTwoScene = new GameFightTwoScene();
                this.addChild(game2);
                break;
            case 3:
                this.removeChildren();
                this.removeAl();
                var game3:GameFightThreeScene = new GameFightThreeScene();
                this.addChild(game3);
                break;
            case 4:
                this.removeChildren();
                this.removeAl();
                var game4:GameFightFourScene = new GameFightFourScene();
                this.addChild(game4);
                break;
        }
    }
}