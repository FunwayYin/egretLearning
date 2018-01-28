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
var Page3 = (function (_super) {
    __extends(Page3, _super);
    function Page3() {
        var _this = _super.call(this, 3) || this;
        _this.boxs = [];
        _this.firstLoad = true;
        _this.createBox();
        var originY = 750;
        _this.mainImage = new egret.Bitmap(RES.getRes("page_3_logo1_png"));
        _this.mainImage.x = (CONST.WIDTH - _this.mainImage.width) / 2;
        _this.mainImage.y = originY;
        _this.addChild(_this.mainImage);
        _this.mainImage2 = new egret.Bitmap(RES.getRes("page_3_logo2_png"));
        _this.mainImage2.x = (CONST.WIDTH - _this.mainImage2.width) / 2 + 100;
        _this.mainImage2.y = 1100;
        _this.addChild(_this.mainImage2);
        egret.Tween.get(_this.mainImage, { loop: true }).to({
            y: originY + 20
        }, 2000, egret.Ease.sineInOut).to({
            y: originY
        }, 2000, egret.Ease.sineInOut);
        egret.Tween.get(_this.mainImage2, { loop: true }).wait(200).to({
            y: 1100 + 20
        }, 2000, egret.Ease.sineInOut).to({
            y: 1100
        }, 2000, egret.Ease.sineInOut);
        return _this;
    }
    Page3.prototype.createBox = function () {
        for (var i = 1; i <= 14; i++) {
            // 粒子出生位置
            var originX = (CONST.WIDTH / 2 - 350) + Math.random() * 700;
            var originY = 1300 + Math.random() * 300;
            var box = new egret.Bitmap(RES.getRes("page_3_part" + (i > 9 ? i - 9 : i) + "_png"));
            box.x = originX;
            box.y = originY;
            this.boxs.push(box);
            this.addChild(box);
            egret.Tween.get(box, { loop: true }).set({
                alpha: 0
            }).wait(3000 * Math.random()).to({
                y: originY - 300,
                alpha: 1,
                scaleX: 2,
                scaleY: 2
            }, 1000 + 1000 * Math.random()).to({
                y: originY - 500,
                alpha: 1
            }, 980).to({
                y: originY - 760,
                alpha: 0
            }, 870);
        }
    };
    Page3.prototype.onLoad = function () {
        console.log("load page(3)");
        if (this.firstLoad) {
            this.firstLoad = false;
            this.showWord(1, 334);
            egret.setTimeout(this.showWord, this, 100, 2, 438);
            egret.setTimeout(this.showWord, this, 200, -1, 496);
            egret.setTimeout(this.showWord, this, 300, 3, 516);
            var effect = new ClickEffect();
            effect.x = this.mainImage.x + 670;
            effect.y = this.mainImage.y + 290;
            this.addChild(effect);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Page3.prototype.onTouchBegin = function (e) {
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    };
    Page3.prototype.onTouchEnd = function (e) {
        if (Math.abs(this.touchBeginX - e.stageX) < CONST.TOUCH_OFFSET && Math.abs(this.touchBeginY - e.stageY) < CONST.TOUCH_OFFSET) {
            this.showInfo();
        }
    };
    Page3.prototype.onMove = function () {
    };
    Page3.prototype.showWord = function (index, y) {
        var word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
            word.width = 692;
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_3_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH;
        word.y = y;
        egret.Tween.get(word).to({
            x: CONST.WIDTH - word.width >> 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE);
    };
    Page3.prototype.showInfo = function () {
        var pannel = new Info2();
        this.stage.addChild(pannel);
        //出现动画
        this.touchEnabled = false;
        egret.Tween.get(pannel).set({
            x: CONST.WIDTH / 2,
            y: CONST.HEIGHT / 2,
            anchorOffsetX: CONST.WIDTH / 2,
            anchorOffsetY: CONST.HEIGHT / 2,
            scaleX: 0.1,
            scaleY: 0.1,
            alpha: 0.5
        }).to({
            y: CONST.HEIGHT / 2 - 450,
            scaleX: 0.2,
            scaleY: 0.2,
        }, 200, egret.Ease.circIn).to({
            x: CONST.WIDTH / 2,
            y: CONST.HEIGHT / 2,
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        }, 150, egret.Ease.circOut).call(function () {
            this.touchEnabled = true;
        }, this);
    };
    return Page3;
}(Page));
__reflect(Page3.prototype, "Page3");
