/**
 * Created by Channing on 2014/9/17.
 */
var HelpView = (function (_super) {
    __extends(HelpView, _super);
    function HelpView() {
        _super.call(this);
        this.initView();
    }
    var d = __define,c=HelpView,p=c.prototype;
    p.initView = function () {
        var bg = ResourceUtils.createBitmapByName("gameinfoImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        bg.touchEnabled = true;
        this.addChild(bg);
        var start_btn = new MyButton("start1GameBtnImage", "start1GameBtnImage");
        this.addChild(start_btn);
        var _swidth = Const.SCENT_WIDTH / 2 - start_btn.width / 2;
        var _sheight = Const.SCENT_HEIGHT - start_btn.height - 20;
        start_btn.x = _swidth;
        start_btn.y = _sheight;
        start_btn.setClick(this.showStartView.bind(this));
    };
    p.removeAll = function () {
        this.removeChildren();
    };
    p.showStartView = function () {
        GameSceneView.game.start();
    };
    return HelpView;
}(egret.Sprite));
egret.registerClass(HelpView,'HelpView');
