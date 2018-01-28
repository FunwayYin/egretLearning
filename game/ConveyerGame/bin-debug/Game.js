// TypeScript file
/**
 * Game
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.pickupBottle = null;
        this.selBottle = null;
        this.lasttime = 0;
        this.birthtime = 0;
        this.isPaused = true;
        this._score = 0;
        this.skinName = "resource/skins/GameSkin.exml";
        egret.startTick(this.onUpdate, this);
        this.addChild(this.pickupBottle = new Bottle(1));
        this.pickupBottle.visible = false;
        this.pickupBottle.anchorOffsetX = 25 / 2;
        this.pickupBottle.anchorOffsetY = 90 / 2;
        this.pickupBottle.scaleX = this.pickupBottle.scaleY = 2;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouch_begin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.ontouch_move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.ontouch_end, this);
        this.btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_replay, this);
        this.btn_mainmenu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_mainnenu, this);
        //this.onclick_replay();
    }
    var d = __define,c=Game,p=c.prototype;
    Game.getInstance = function () {
        if (Game._instance == null) {
            Game._instance = new Game();
        }
        return Game._instance;
    };
    p.onUpdate = function (timestamp) {
        var dt = (timestamp - this.lasttime) / 1000;
        this.lasttime = timestamp;
        if (this.isPaused) {
            return false;
        }
        this.birthtime += dt;
        if (this.birthtime > 2) {
            this.birthtime = 0;
            var bottle = new Bottle(Math.floor(Math.random() * 2 + 1));
            bottle.x = Math.random() * this.gp_conveyer.width;
            this.gp_conveyer.addChild(bottle);
        }
        for (var i = this.gp_conveyer.numChildren - 1; i >= 0; i--) {
            var element = this.gp_conveyer.getChildAt(i);
            element.y += dt * 100;
            if (element.y > this.gp_conveyer.height) {
                this.gp_conveyer.removeChild(element);
                this.GameOver();
            }
        }
        this.gp_c.anchorOffsetY -= dt * 100;
        if (this.gp_c.anchorOffsetY <= -56) {
            this.gp_c.anchorOffsetY = 0;
        }
        return false;
    };
    p.ontouch_begin = function (e) {
        var pt1 = new egret.Point(e.stageX - this.gp_conveyer.x, e.stageY - this.gp_conveyer.y);
        for (var i = this.gp_conveyer.numChildren - 1; i >= 0; i--) {
            var element = this.gp_conveyer.getChildAt(i);
            var rect = new egret.Rectangle(element.x, element.y, element.width, element.height);
            if (rect.containsPoint(pt1)) {
                element.IsSelected = true;
                this.selBottle = element;
                this.pickupBottle.BottleType = this.selBottle.BottleType;
                this.pickupBottle.visible = true;
            }
        }
    };
    p.ontouch_move = function (e) {
        if (this.selBottle == null) {
            return;
        }
        this.pickupBottle.x = e.stageX;
        this.pickupBottle.y = e.stageY;
    };
    p.ontouch_end = function (e) {
        if (this.selBottle != null) {
            this.selBottle.IsSelected = false;
        }
        this.pickupBottle.visible = false;
        var checkpt = new egret.Point(e.stageX - this.gp_packages.x, e.stageY - this.gp_packages.y);
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var p = this.gp_packages.getChildAt(i);
            if (p.ispacking) {
                continue;
            }
            var rect = new egret.Rectangle(p.x, p.y, p.width, p.height);
            if (rect.containsPoint(checkpt)) {
                if (p.Pos == this.pickupBottle.BottleType) {
                    if (p.addBottle(this.pickupBottle)) {
                        this.score += 5;
                    }
                    this.score += 1;
                    this.gp_conveyer.removeChild(this.selBottle);
                    break;
                }
                else {
                    this.GameOver();
                }
            }
        }
    };
    p.GameOver = function () {
        this.gp_over.visible = true;
        this.isPaused = true;
        for (var i = 0; i < this.gp_over.numChildren; i++) {
            var item = this.gp_over.getChildAt(i);
            item.alpha = 0;
            egret.Tween.get(item).wait(i * 200)
                .to({ "alpha": 1 }, 500);
        }
    };
    d(p, "score"
        ,function () {
            return this._score;
        }
        ,function (v) {
            this._score = v;
            this.lb_score.text = this.lb_overscore.text = v.toString();
        }
    );
    p.onclick_replay = function () {
        this.score = 0;
        this.gp_over.visible = false;
        this.gp_conveyer.removeChildren();
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var p = this.gp_packages.getChildAt(i);
            p.clean_Bottle();
        }
        this.isPaused = false;
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var item = this.gp_packages.getChildAt(i);
            item.anchorOffsetY = -800;
            egret.Tween.get(item).wait(i * 200)
                .to({ "anchorOffsetY": 0 }, 500);
        }
    };
    p.onclick_mainnenu = function () {
        //返回开始界面
        this.parent.addChild(StartUI.getInstance());
        this.parent.removeChild(this);
    };
    Game._instance = null;
    return Game;
}(eui.Component));
egret.registerClass(Game,'Game');
//# sourceMappingURL=Game.js.map