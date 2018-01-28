/**
 * Created by CHanning on 2014/9/18.
 */
class GameOverView extends egret.Sprite{
    private str:string;
    private share:ShareView;
    constructor(){
        super();
        this.initView();
    }
    private initView():void
    {
        GameData.overIsWin = false;
        switch (GameData.curScene)
        {
            case 1:
                this.str = "gameOver1Image";
                break;
            case 2:
                this.str = "gameOver2Image";
                break;
            case 3:
                this.str = "gameOver3Image";
                break;
            case 4:
                this.str = "gameOver4Image";
                break;
        }

        var bg:egret.Bitmap = ResourceUtils.createBitmapByName(this.str);
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        SoundUtils.instance().playGameover();
        this.addChild(bg);

        this.share = new ShareView();
        this.addChild(this.share);
        this.share.visible = false;
        egret.Tween.get(this.share).wait(2000).call(this.showShareView,this);
    }
    private showShareView():void
    {
        this.share.visible = true;
    }
}