
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"bin-debug/AlertPanel.js",
	"bin-debug/GameData.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MusicView.js",
	"bin-debug/game/GameScene/AddTimeMenu.js",
	"bin-debug/game/GameScene/GameFightFourScene.js",
	"bin-debug/game/GameScene/GameFightOneScene.js",
	"bin-debug/game/GameScene/GameFightThreeScene.js",
	"bin-debug/game/GameScene/GameFightTwoScene.js",
	"bin-debug/game/GameScene/GameLayer.js",
	"bin-debug/game/GameScene/GameOverView.js",
	"bin-debug/game/GameScene/GameStartView.js",
	"bin-debug/game/GameScene/GameingSceneView.js",
	"bin-debug/game/GameScene/ShareView.js",
	"bin-debug/game/GameSceneView.js",
	"bin-debug/game/HelpView.js",
	"bin-debug/game/SoundPopView.js",
	"bin-debug/game/utils/Button.js",
	"bin-debug/game/utils/ButtonSkin.js",
	"bin-debug/game/utils/Const.js",
	"bin-debug/game/utils/GS.js",
	"bin-debug/game/utils/GameUtils.js",
	"bin-debug/game/utils/GameVO.js",
	"bin-debug/game/utils/MyButton.js",
	"bin-debug/game/utils/MyButtonForGame.js",
	"bin-debug/game/utils/ResourceUtils.js",
	"bin-debug/game/utils/ShareUtils.js",
	"bin-debug/game/utils/SoundBase.js",
	"bin-debug/game/utils/SoundUtils.js",
	"bin-debug/game/utils/SpecialNumber.js",
	"bin-debug/starlingswf/StarlingSwfSheetAnalyzer.js",
	"bin-debug/starlingswf/Swf.js",
	"bin-debug/starlingswf/SwfAnimationInfo.js",
	"bin-debug/starlingswf/SwfAssetManager.js",
	"bin-debug/starlingswf/SwfFrameInfo.js",
	"bin-debug/starlingswf/SwfUpdateManager.js",
	"bin-debug/starlingswf/display/ISwfAnimation.js",
	"bin-debug/starlingswf/display/StarlingSwfMovieClip.js",
	"bin-debug/starlingswf/display/SwfSprite.js",
	"bin-debug/starlingswf/display/SwfMovieClip.js",
	"bin-debug/starlingswf/game/StarlingSwfFactory.js",
	"bin-debug/starlingswf/game/StarlingSwfMovieClip.js",
	"bin-debug/starlingswf/game/StarlingSwfUtils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 3,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};