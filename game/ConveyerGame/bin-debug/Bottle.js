var BottleType;
(function (BottleType) {
    BottleType[BottleType["None"] = 0] = "None";
    BottleType[BottleType["Bottle1"] = 1] = "Bottle1";
    BottleType[BottleType["Bottle2"] = 2] = "Bottle2";
    BottleType[BottleType["Bottle3"] = 3] = "Bottle3";
    BottleType[BottleType["Bottle4"] = 4] = "Bottle4";
    BottleType[BottleType["Bottle5"] = 5] = "Bottle5";
    BottleType[BottleType["Bottle6"] = 6] = "Bottle6";
})(BottleType || (BottleType = {}));
var Bottle = (function (_super) {
    __extends(Bottle, _super);
    function Bottle(type) {
        _super.call(this);
        this.BottleType = type;
    }
    var d = __define,c=Bottle,p=c.prototype;
    d(p, "BottleType"
        ,function () {
            return this._BottleType;
        }
        ,function (v) {
            this._BottleType = v;
            var str = "bottle" + v + "_png";
            this.source = RES.getRes(str);
        }
    );
    d(p, "IsSelected"
        ,function () {
            return this._IsSelected;
        }
        ,function (v) {
            this._IsSelected = v;
            if (v) {
                this.alpha = 0.5;
            }
            else {
                this.alpha = 1;
            }
        }
    );
    return Bottle;
}(eui.Image));
egret.registerClass(Bottle,'Bottle');
//# sourceMappingURL=Bottle.js.map