/**
 * Created by husong on 14/11/6.
 */
var AddTimeMenu = (function (_super) {
    __extends(AddTimeMenu, _super);
    function AddTimeMenu(gs) {
        _super.call(this);
        this.initUI();
        this.gs = gs;
    }
    var d = __define,c=AddTimeMenu,p=c.prototype;
    p.initUI = function () {
        this.bgContainer = new egret.DisplayObjectContainer();
        this.bgContainer.visible = false;
        this.addChild(this.bgContainer);
        var bg = GameUtils.createBitmapByName("newAssets.framebg");
        bg.scaleY = 0.9;
        this.bgContainer.addChild(bg);
        this.addTime = new Button();
        this.addTime.anchorOffsetX = this.addTime.width * 0.5;
        this.addTime.anchorOffsetY = this.addTime.width * 0.5;
        this.addTime.setTexture(new ButtonSkin("newAssets.btn02_up", "newAssets.btn02_down"));
        this.addTime.setLableTexture("newAssets.zengjiashijian");
        this.addTime.x = bg.width / 2;
        this.addChild(this.addTime);
        var start = 55;
        var gap = 60;
        this.tenSecond = new Button();
        this.tenSecond.anchorOffsetX = this.tenSecond.width * 0.5;
        this.tenSecond.anchorOffsetY = this.tenSecond.height * 0.5;
        this.tenSecond.setTexture(new ButtonSkin("btn_green_s1", "btn_green_s2"));
        this.tenSecond.setLableTexture("newAssets.10miao");
        this.tenSecond.x = bg.width / 2;
        this.tenSecond.y = start;
        this.bgContainer.addChild(this.tenSecond);
        this.twentySecond = new Button();
        this.twentySecond.setTexture(new ButtonSkin("btn_green_s1", "btn_green_s2"));
        this.twentySecond.setLableTexture("newAssets.20miao");
        this.twentySecond.anchorOffsetX = this.twentySecond.width * 0.5;
        this.twentySecond.anchorOffsetY = this.twentySecond.height * 0.5;
        this.twentySecond.x = bg.width / 2;
        this.twentySecond.y = start + gap;
        this.bgContainer.addChild(this.twentySecond);
        this.thirtySecond = new Button();
        this.thirtySecond.setTexture(new ButtonSkin("btn_green_s1", "btn_green_s2"));
        this.thirtySecond.setLableTexture("newAssets.30miao");
        this.thirtySecond.anchorOffsetX = this.thirtySecond.width * 0.5;
        this.thirtySecond.anchorOffsetY = this.thirtySecond.height * 0.5;
        this.thirtySecond.x = bg.width / 2;
        this.thirtySecond.y = start + gap * 2;
        this.bgContainer.addChild(this.thirtySecond);
        this.addTime.setClickHandler(this.onAddTimeClick, this);
        this.tenSecond.setClickHandler(this.onTimesHandler, this);
        this.twentySecond.setClickHandler(this.onTimesHandler, this);
        this.thirtySecond.setClickHandler(this.onTimesHandler, this);
    };
    p.onAddTimeClick = function () {
        this.bgContainer.visible = !this.bgContainer.visible;
        this.checkPause();
    };
    p.onTimesHandler = function (event) {
        var button = event.target;
        var time = 0;
        switch (button) {
            case this.tenSecond:
                time = 10;
                break;
            case this.twentySecond:
                time = 20;
                break;
            case this.thirtySecond:
                time = 30;
                break;
        }
        this.gs.addTime(time);
        this.onAddTimeClick();
    };
    p.checkPause = function () {
        if (this.bgContainer.visible) {
            this.gs.pause();
        }
        else {
            this.gs.resume();
        }
    };
    return AddTimeMenu;
}(egret.DisplayObjectContainer));
egret.registerClass(AddTimeMenu,'AddTimeMenu');
