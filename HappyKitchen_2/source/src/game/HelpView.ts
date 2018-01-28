/**
 * Created by Channing on 2014/9/17.
 */
class HelpView extends egret.Sprite{
    constructor(){
        super();
        this.initView();
    }
    private initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("gameinfoImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        bg.touchEnabled = true;
        this.addChild(bg);

        var start_btn:MyButton = new MyButton("start1GameBtnImage","start1GameBtnImage");
        this.addChild(start_btn);
        var _swidth:number = Const.SCENT_WIDTH/2- start_btn.width/2;
        var _sheight:number = Const.SCENT_HEIGHT - start_btn.height-20;
        start_btn.x = _swidth;
        start_btn.y = _sheight;
        start_btn.setClick(this.showStartView.bind(this));
    }

    public removeAll():void
    {
        this.removeChildren();
    }
    private showStartView():void
    {
        GameSceneView.game.start();
    }
}