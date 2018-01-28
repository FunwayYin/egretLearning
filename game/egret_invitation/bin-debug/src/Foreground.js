//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Foreground = (function (_super) {
    __extends(Foreground, _super);
    function Foreground(index, speed, resName, bitmapNum, speacial) {
        if (bitmapNum === void 0) { bitmapNum = 5; }
        var _this = _super.call(this) || this;
        _this.moveWidth = -350;
        _this.speed = speed;
        if (speacial) {
            for (var i = 1; i <= bitmapNum; i++) {
                var bitmap = new egret.Bitmap(RES.getRes(resName + "_1_png"));
                bitmap.x = _this.moveWidth;
                _this.moveWidth += bitmap.width + Math.ceil(Math.random() * 170);
                _this.addChild(bitmap);
                _this["bitmap" + i] = bitmap;
            }
        }
        else {
            for (var i = 1; i <= bitmapNum; i++) {
                var bitmap = new egret.Bitmap(RES.getRes(resName + "_" + i + "_png"));
                bitmap.x = _this.moveWidth;
                _this.moveWidth += bitmap.width;
                _this.addChild(bitmap);
                _this["bitmap" + i] = bitmap;
            }
        }
        _this.y = CONST.HEIGHT;
        egret.Tween.get(_this).wait(500).to({ y: _this.y - _this.height }, 600 + index * 250, egret.Ease.sineOut);
        _this.fixPosition();
        return _this;
    }
    Foreground.prototype.move = function (distance) {
        var length = this.numChildren;
        for (var i = 0; i < length; i++) {
            this.getChildAt(i).x += distance;
        }
        this.fixPosition();
    };
    Foreground.prototype.fixPosition = function () {
        var leftChild = this.getChildAt(0);
        var rightChild = this.getChildAt(this.numChildren - 1);
        if (leftChild.x > 0) {
            rightChild.x -= this.moveWidth;
            this.addChildAt(rightChild, 0);
        }
        else if (rightChild.x < CONST.WIDTH) {
            leftChild.x += this.moveWidth;
            this.addChild(leftChild);
        }
    };
    return Foreground;
}(Container));
__reflect(Foreground.prototype, "Foreground");
