/**
 * Created by Channing on 2014/9/17.
 */
var GameSceneView = (function (_super) {
    __extends(GameSceneView, _super);
    function GameSceneView() {
        _super.call(this);
        GameSceneView.game = this;
        this.initView();
    }
    var d = __define,c=GameSceneView,p=c.prototype;
    p.initView = function () {
        this.gameContainer = new egret.Sprite();
        this.addChild(this.gameContainer);
        this.showHome();
    };
    p.clear = function () {
        while (this.gameContainer.numChildren) {
            this.gameContainer.removeChildAt(0);
        }
    };
    p.start = function () {
        this.clear();
        this._gameScene = new GameingSceneView();
        this.gameContainer.addChild(this._gameScene);
        this._gameScene.showGame(GameData.curScene);
    };
    p.gameOver = function () {
        this.clear();
        this._gameOverScene = new GameOverView();
        this.gameContainer.addChild(this._gameOverScene);
    };
    p.showHome = function () {
        this.clear();
        this._startScene = new GameStartView();
        this.gameContainer.addChild(this._startScene);
    };
    return GameSceneView;
}(egret.Sprite));
egret.registerClass(GameSceneView,'GameSceneView');
