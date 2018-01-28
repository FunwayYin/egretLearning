/**
 * Created by Channing on 2014/9/17.
 */
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        _super.call(this);
        this.initView();
    }
    var d = __define,c=GameStartView,p=c.prototype;
    p.initView = function () {
        var bg = ResourceUtils.createBitmapByName("bgImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
        var start_btn = new MyButtonForGame("startBtnImage", "startBtnImage");
        this.addChild(start_btn);
        var _swidth = Const.SCENT_WIDTH / 2 - start_btn.width / 2;
        var _sheight = Const.SCENT_HEIGHT - 140 - start_btn.height;
        start_btn.y = _sheight;
        start_btn.x = _swidth;
        start_btn.setClick(this.showStartView.bind(this));
        var gengduo = new MyButtonForGame("gengduo", "gengduo");
        this.addChild(gengduo);
        var _gwidth = Const.SCENT_WIDTH / 2 - gengduo.width / 2;
        gengduo.x = _gwidth;
        gengduo.y = Const.SCENT_HEIGHT - 140;
        gengduo.setClick(this.showOtherView.bind(this));
        var music_btn = new MyButtonForGame("musicBtnImage", "musicBtnImage");
        this.addChild(music_btn);
        var _mwidth = Const.SCENT_WIDTH - music_btn.width;
        var _mheight = music_btn.height * 1.2;
        music_btn.x = _mwidth;
        music_btn.y = _mheight * 0.5;
        music_btn.setClick(this.showMusicView.bind(this));
        var help_btn = new MyButtonForGame("helpBtnImage", "helpBtnImage");
        this.addChild(help_btn);
        help_btn.x = _mwidth;
        help_btn.y = _mheight + music_btn.height * 0.5;
        help_btn.setClick(this.showHelpView.bind(this));
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.help = new HelpView();
        this.music = new MusicView();
        var textField = new egret.TextField();
        this.addChild(textField);
        textField.y = 770;
        textField.textColor = 0xffffff;
        textField.width = 480;
        textField.height = 100;
        textField.size = 22;
        textField.textAlign = "center";
        textField.text = "Powered by Egret Engine";
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            this.removeChild(gengduo);
        }
    };
    p.showStartView = function () {
        if (this.parent)
            this.parent.removeChild(this);
        GameSceneView.game.start();
    };
    p.showMusicView = function () {
        GameData.isClickBtn = true;
        this.addChild(this.music);
        this.music.x = 0;
        this.music.y = 0;
    };
    p.showHelpView = function () {
        this.addChild(this.help);
    };
    p.showOtherView = function () {
        //EgretShare.moreGame();
    };
    return GameStartView;
}(egret.Sprite));
egret.registerClass(GameStartView,'GameStartView');
