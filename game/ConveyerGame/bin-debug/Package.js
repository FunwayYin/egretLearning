var Package = (function (_super) {
    __extends(Package, _super);
    function Package() {
        _super.call(this);
        this.ispacking = false;
        this._sum = 0;
    }
    var d = __define,c=Package,p=c.prototype;
    p.createChildren = function () {
        this.img_body.source = RES.getRes("bottle" + this._Pos + "_0_png");
    };
    d(p, "Pos"
        ,function () {
            return this._Pos;
        }
        ,function (v) {
            this._Pos = v;
        }
    );
    p.addBottle = function (bottle) {
        this.sum += 1;
        if (this.sum >= 6) {
            this.packing();
            return true;
        }
        return false;
    };
    p.packing = function () {
        //this.sum = 0;
        this.ispacking = true;
        var frametween = egret.Tween.get(this.img_body);
        for (var i = 7; i < 24; i++) {
            frametween.wait(100)
                .set({ "source": RES.getRes("bottle" + this._Pos + "_" + i + "_png") });
        }
        frametween.call(this.packover, this);
    };
    p.packover = function () {
        this.sum = 0;
        this.ispacking = false;
    };
    d(p, "sum"
        ,function () {
            return this._sum;
        }
        ,function (v) {
            this._sum = v;
            var str = "bottle" + this._Pos + "_" + v + "_png";
            this.img_body.source = RES.getRes(str);
        }
    );
    p.clean_Bottle = function () {
        this.sum = 0;
    };
    return Package;
}(eui.Component));
egret.registerClass(Package,'Package');
//# sourceMappingURL=Package.js.map