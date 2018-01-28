/**
 * Created by Channing on 2014/9/17.
 */
class GameStartView extends egret.Sprite{

    private help:HelpView;
    private music:MusicView;
    private thisContainer:egret.Sprite;
    constructor()
    {
        super();
        this.initView()
    }

    private initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("bgImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
        var start_btn:MyButtonForGame = new MyButtonForGame("startBtnImage","startBtnImage");
        this.addChild(start_btn);
        var _swidth:number = Const.SCENT_WIDTH/2- start_btn.width/2;
        var _sheight:number = Const.SCENT_HEIGHT - 140 - start_btn.height;
        start_btn.y = _sheight;
        start_btn.x= _swidth;
        start_btn.setClick(this.showStartView.bind(this));

        var gengduo:MyButtonForGame = new MyButtonForGame("gengduo","gengduo");
        this.addChild(gengduo);
        var _gwidth:number = Const.SCENT_WIDTH/2- gengduo.width/2;
        gengduo.x = _gwidth;
        gengduo.y = Const.SCENT_HEIGHT - 140;
        gengduo.setClick(this.showOtherView.bind(this));

        var music_btn:MyButtonForGame = new MyButtonForGame("musicBtnImage","musicBtnImage");
        this.addChild(music_btn);

        var _mwidth:number = Const.SCENT_WIDTH - music_btn.width;
        var _mheight:number = music_btn.height*1.2;
        music_btn.x = _mwidth;
        music_btn.y =  _mheight*0.5;
        music_btn.setClick(this.showMusicView.bind(this));

        var help_btn:MyButtonForGame = new MyButtonForGame("helpBtnImage","helpBtnImage");
        this.addChild(help_btn);

        help_btn.x = _mwidth;
        help_btn.y = _mheight+music_btn.height*0.5;
        help_btn.setClick(this.showHelpView.bind(this));

        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);

        this.help = new HelpView();
        this.music = new MusicView();

        var textField:egret.TextField = new egret.TextField();
        this.addChild(textField);
        textField.y = 770;
        textField.textColor = 0xffffff;
        textField.width = 480;
        textField.height = 100;
        textField.size = 22;
        textField.textAlign = "center";
        textField.text = "Powered by Egret Engine";


        if(egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType){
            this.removeChild(gengduo);
        }
    }

    private showStartView():void
    {
        if(this.parent) this.parent.removeChild(this);
        GameSceneView.game.start();
    }

    private showMusicView():void
    {
        GameData.isClickBtn = true;

        this.addChild(this.music);
        this.music.x = 0;
        this.music.y = 0;
    }

    private showHelpView():void
    {
        this.addChild(this.help);
    }

    private showOtherView():void
    {
        //EgretShare.moreGame();
    }
}