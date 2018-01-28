class Package extends eui.Component {
	public constructor() {
		super();
		
	}
	private img_body:eui.Image;
	protected createChildren(){
		this.img_body.source = RES.getRes("bottle"+this._Pos+"_0_png");
	}
	private _Pos : number;
	public get Pos() : number {
		return this._Pos;
	}
	public set Pos(v : number) {
		this._Pos = v;
		
	}
	public addBottle(bottle:Bottle):boolean{
		this.sum += 1;
		if(this.sum >= 6){
			this.packing();
			return true;
		}
		return false;
	}
	public ispacking:boolean = false;
	private packing(){
		//this.sum = 0;
		this.ispacking = true;
		var frametween = egret.Tween.get(this.img_body);
		for (var i = 7; i < 24; i++) {
			frametween.wait(100)
				.set({"source":RES.getRes("bottle"+this._Pos+"_"+i+"_png")})
				;
		}
		frametween.call(this.packover,this);
	}
	private packover(){
		this.sum = 0;
		this.ispacking = false;
	}
	private _sum : number = 0;
	public get sum() : number {
		return this._sum;
	}
	public set sum(v : number) {
		this._sum = v;
		var str = "bottle"+this._Pos+"_"+v+"_png";
		
		this.img_body.source = RES.getRes(str);
	}
	public clean_Bottle(){
		this.sum = 0;
	}
}