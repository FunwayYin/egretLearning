// TypeScript file
/**
 * Game
 */
class Game extends eui.Component{
    private static _instance:Game = null;
    public static getInstance(){
        if(Game._instance == null){
            Game._instance = new Game();
        }
        return Game._instance;
    }

    public gp_conveyer:eui.Group;
    private pickupBottle:Bottle = null;
    private selBottle:Bottle = null;
    private gp_packages:eui.Group;
    public lb_score:eui.Label;
    public gp_over:eui.Group;
    public lb_overscore:eui.Label;
    public btn_replay:eui.Button;
    public btn_mainmenu:eui.Button;
    public gp_c:eui.Group;
    public constructor() {
        super();
        this.skinName = "resource/skins/GameSkin.exml";
        egret.startTick(this.onUpdate,this); 
        this.addChild(this.pickupBottle = new Bottle(1));
        this.pickupBottle.visible = false;
        this.pickupBottle.anchorOffsetX = 25 / 2;
        this.pickupBottle.anchorOffsetY = 90 / 2;
        this.pickupBottle.scaleX = this.pickupBottle.scaleY = 2;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.ontouch_begin,this); 
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.ontouch_move,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.ontouch_end,this);
        this.btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_replay,this);
        this.btn_mainmenu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_mainnenu,this);
        //this.onclick_replay();
    }
    private lasttime:number = 0;
    private birthtime:number = 0;
    private isPaused:boolean = true;
    private onUpdate(timestamp:number):boolean{
        var dt = (timestamp - this.lasttime) / 1000;
        this.lasttime = timestamp;
        if(this.isPaused){
            return false;
        }
        this.birthtime += dt;
        if(this.birthtime > 2){
            this.birthtime = 0;
            var bottle = new Bottle(<BottleType>Math.floor(Math.random() * 2 + 1));
            bottle.x = Math.random() * this.gp_conveyer.width;
            this.gp_conveyer.addChild(bottle);
        }
        for (var i = this.gp_conveyer.numChildren - 1; i >= 0; i--) {
            var element =<Bottle> this.gp_conveyer.getChildAt(i);
            element.y += dt * 100;
            if(element.y > this.gp_conveyer.height){
                this.gp_conveyer.removeChild(element);
                this.GameOver();
            }
        }
        this.gp_c.anchorOffsetY -= dt * 100;
        if(this.gp_c.anchorOffsetY <= -56){
            this.gp_c.anchorOffsetY = 0;
        }
        return false;
    }
    private ontouch_begin(e:egret.TouchEvent){
        var pt1 = new egret.Point(e.stageX - this.gp_conveyer.x,e.stageY-this.gp_conveyer.y);
        for (var i = this.gp_conveyer.numChildren - 1; i >= 0; i--) {
            var element =<Bottle> this.gp_conveyer.getChildAt(i);
            var rect = new egret.Rectangle(element.x,element.y,
                element.width,element.height);
            if(rect.containsPoint(pt1)){
                element.IsSelected = true;
                this.selBottle = element;
                this.pickupBottle.BottleType = this.selBottle.BottleType;
                this.pickupBottle.visible = true;
            }
        }
    }
    private ontouch_move(e:egret.TouchEvent){
        if(this.selBottle == null){
            return;
        }
        this.pickupBottle.x = e.stageX;
        this.pickupBottle.y = e.stageY;
    }
    private ontouch_end(e:egret.TouchEvent){
        if(this.selBottle != null){
            this.selBottle.IsSelected = false;
        }
        this.pickupBottle.visible =false;
        var checkpt = new egret.Point(e.stageX-this.gp_packages.x,e.stageY-this.gp_packages.y);
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var p = <Package>this.gp_packages.getChildAt(i);
            if(p.ispacking){
                continue;
            }
            var rect = new egret.Rectangle(p.x,p.y,p.width,p.height);
            if(rect.containsPoint(checkpt)){
                if(p.Pos == this.pickupBottle.BottleType){
                    if(p.addBottle(this.pickupBottle)){
                        this.score += 5;
                    }
                    this.score +=1;
                    this.gp_conveyer.removeChild(this.selBottle);
                    break;
                }else{
                    this.GameOver();
                }
            }
        }
    }
    private GameOver(){
        this.gp_over.visible = true;
        this.isPaused = true;
        for (var i = 0; i < this.gp_over.numChildren; i++) {
            var item =this.gp_over.getChildAt(i);
            item.alpha = 0;
            egret.Tween.get(item).wait(i * 200)
                .to({"alpha":1},500);
        }
    }
    
    private _score : number = 0;
    public get score() : number {
        return this._score;
    }
    public set score(v : number) {
        this._score = v;
        this.lb_score.text = this.lb_overscore.text = v.toString();
    }
    public onclick_replay(){
        this.score = 0;
        this.gp_over.visible = false;
        this.gp_conveyer.removeChildren();
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var p = <Package>this.gp_packages.getChildAt(i);
            p.clean_Bottle();
        }
        this.isPaused = false;
        for (var i = 0; i < this.gp_packages.numChildren; i++) {
            var item =this.gp_packages.getChildAt(i);
            item.anchorOffsetY = -800;
            egret.Tween.get(item).wait(i * 200)
                .to({"anchorOffsetY":0},500);
        }
    }
    private onclick_mainnenu(){
        //返回开始界面
        this.parent.addChild(StartUI.getInstance());
        this.parent.removeChild(this);
    }
}