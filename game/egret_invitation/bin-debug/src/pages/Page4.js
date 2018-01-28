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
var Page4 = (function (_super) {
    __extends(Page4, _super);
    function Page4() {
        var _this = _super.call(this, 4) || this;
        _this.boxs = [];
        _this.firstLoad = true;
        _this.createBox();
        _this.mainImage = new egret.Bitmap(RES.getRes("page_4_logo_png"));
        _this.mainImage.x = (CONST.WIDTH - _this.mainImage.width) / 2;
        _this.mainImage.y = 650;
        _this.addChild(_this.mainImage);
        _this.mainImage.touchEnabled = true;
        _this.mainImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onMainImageTouchBegin, _this);
        _this.mainImage.addEventListener(egret.TouchEvent.TOUCH_END, _this.onMainImageTouchEnd, _this);
        _this.mainImage2 = new egret.Bitmap(RES.getRes("page_4_logo1_png"));
        _this.mainImage2.x = _this.mainImage.x + 310 - 56;
        _this.mainImage2.y = _this.mainImage.y + 600 + 10;
        _this.addChild(_this.mainImage2);
        _this.mainImage3 = new egret.Bitmap(RES.getRes("page_4_logo2_png"));
        _this.mainImage3.x = _this.mainImage.x + 310 - 22;
        _this.mainImage3.y = _this.mainImage.y + 600 + 40;
        _this.addChild(_this.mainImage3);
        _this.mainImage4 = new egret.Bitmap(RES.getRes("page_4_logo3_png"));
        _this.mainImage4.x = _this.mainImage.x + 310 + 40;
        _this.mainImage4.y = _this.mainImage.y + 600 + 25;
        _this.addChild(_this.mainImage4);
        _this.mainImage5 = new egret.Bitmap(RES.getRes("page_4_logo1_png"));
        _this.mainImage5.x = _this.mainImage.x + 310 - 100;
        _this.mainImage5.y = _this.mainImage.y + 600;
        _this.addChild(_this.mainImage5);
        return _this;
    }
    Page4.prototype.onMainImageTouchBegin = function (e) {
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    };
    Page4.prototype.onMainImageTouchEnd = function (e) {
        if (Math.abs(e.stageX - this.touchBeginX) > 20 || Math.abs(e.stageY - this.touchBeginY) > 20) {
            return;
        }
        window.location.href = "http://www.huodongxing.com/event/9361412645900";
    };
    Page4.prototype.createBox = function () {
        // 粒子出生位置
        var originX = CONST.WIDTH / 2 - 20;
        var originY = CONST.HEIGHT - 400;
        for (var i = 1; i <= 70; i++) {
            var box = new egret.Bitmap(RES.getRes("page_4_part" + (i % 8 + 1) + "_png"));
            box.x = originX;
            box.y = originY;
            this.boxs.push(box);
            this.addChild(box);
            egret.Tween.get(box, { loop: true })
                .set({
                visible: false,
                alpha: 1,
                scaleX: 0,
                scaleY: 0
            })
                .wait(3000 * Math.random())
                .set({
                visible: true
            })
                .to({
                x: originX + 450 * Math.random() - 230,
                y: originY - 500,
                alpha: 1,
                scaleX: 2,
                scaleY: 2
            }, 1500 + 1000 * Math.random(), egret.Ease.circIn);
        }
    };
    Page4.prototype.onLoad = function () {
        console.log("load page(4)");
        if (this.firstLoad) {
            this.firstLoad = false;
            this.showWord(1, 334);
            egret.setTimeout(this.showWord, this, 100, 2, 438);
            egret.setTimeout(this.showWord, this, 200, -1, 496);
            egret.setTimeout(this.showWord, this, 300, 3, 516);
            egret.Tween.get(this.mainImage, { loop: true }).to({
                y: 650 + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: 650
            }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(this.mainImage2, { loop: true }).wait(200).to({
                y: this.mainImage2.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage2.y
            }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(this.mainImage3, { loop: true }).wait(400).to({
                y: this.mainImage3.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage3.y
            }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(this.mainImage4, { loop: true }).wait(600).to({
                y: this.mainImage4.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage4.y
            }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(this.mainImage5, { loop: true }).wait(800).to({
                y: this.mainImage5.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage5.y
            }, 1000, egret.Ease.sineInOut);
        }
    };
    Page4.prototype.onMove = function () {
    };
    Page4.prototype.showWord = function (index, y) {
        var word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
            word.width = 478;
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_4_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH;
        word.y = y;
        egret.Tween.get(word).to({
            x: CONST.WIDTH - word.width >> 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE);
    };
    return Page4;
}(Page));
__reflect(Page4.prototype, "Page4");
