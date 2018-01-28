enum BottleType{
	None,Bottle1,Bottle2,Bottle3,Bottle4,Bottle5,Bottle6
}
class Bottle extends eui.Image {
	public constructor(type:BottleType) {
		super();
		this.BottleType = type;
	}
	
	private _BottleType : BottleType;
	public get BottleType() : BottleType {
		return this._BottleType;
	}
	public set BottleType(v : BottleType) {
		this._BottleType = v;
		var str = "bottle"+<number>v+"_png";
		this.source = RES.getRes(str);
	}
	
	private _IsSelected : boolean;
	public get IsSelected() : boolean {
		return this._IsSelected;
	}
	public set IsSelected(v : boolean) {
		this._IsSelected = v;
		if(v){
			this.alpha = 0.5;
		}else{
			this.alpha = 1;
		}
	}
	
}