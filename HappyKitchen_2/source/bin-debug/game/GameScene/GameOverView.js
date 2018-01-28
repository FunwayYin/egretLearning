/**
 * Created by CHanning on 2014/9/18.
 */
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        _super.call(this);
        this.initView();
    }
    var d = __define,c=GameOverView,p=c.prototype;
    p.initView = function () {
        GameData.overIsWin = false;
        switch (GameData.curScene) {
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
        var bg = ResourceUtils.createBitmapByName(this.str);
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        SoundUtils.instance().playGameover();
        this.addChild(bg);
        this.share = new ShareView();
        this.addChild(this.share);
        this.share.visible = false;
        egret.Tween.get(this.share).wait(2000).call(this.showShareView, this);
    };
    p.showShareView = function () {
        this.share.visible = true;
    };
    return GameOverView;
}(egret.Sprite));
egret.registerClass(GameOverView,'GameOverView');
