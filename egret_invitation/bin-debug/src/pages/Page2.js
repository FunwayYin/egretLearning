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
var Page2 = (function (_super) {
    __extends(Page2, _super);
    function Page2() {
        var _this = _super.call(this, 2) || this;
        _this.pointList = [
            new egret.Point(134, 152),
            new egret.Point(240, 56),
            new egret.Point(408, 0),
            new egret.Point(580, 35),
            new egret.Point(706, 118),
            new egret.Point(774, 196),
            new egret.Point(810, 319),
            new egret.Point(820, 434),
            new egret.Point(842, 440),
            new egret.Point(854, 451)
        ];
        _this.firstLoad = true;
        _this.mainContainer = new egret.DisplayObjectContainer();
        _this.addChild(_this.mainContainer);
        _this.mainImage = new egret.Bitmap(RES.getRes("page_2_bg_png"));
        _this.mainImage.x = CONST.WIDTH - _this.mainImage.width >> 1;
        _this.mainImage.y = 700;
        _this.mainContainer.addChild(_this.mainImage);
        egret.Tween.get(_this.mainContainer, { loop: true }).to({
            y: _this.mainContainer.y + 20
        }, 1000, egret.Ease.sineInOut).to({
            y: _this.mainContainer.y
        }, 1000, egret.Ease.sineInOut);
        egret.startTick(_this.onFrame, _this);
        return _this;
    }
    Page2.prototype.onLoad = function () {
        console.log("load page(2)");
        if (this.firstLoad) {
            this.firstLoad = false;
            this.showWord(1, 334);
            egret.setTimeout(this.showWord, this, 100, 2, 438);
            egret.setTimeout(this.showWord, this, 200, -1, 496);
            egret.setTimeout(this.showWord, this, 300, 3, 516);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            var effect = new ClickEffect();
            effect.x = this.mainImage.x + 450;
            effect.y = this.mainImage.y + 600;
            this.addChild(effect);
        }
    };
    Page2.prototype.onTouchBegin = function (e) {
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    };
    Page2.prototype.onTouchEnd = function (e) {
        if (Math.abs(this.touchBeginX - e.stageX) < CONST.TOUCH_OFFSET && Math.abs(this.touchBeginY - e.stageY) < CONST.TOUCH_OFFSET) {
            this.showInfo();
        }
    };
    Page2.prototype.showWord = function (index, y) {
        var word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
            word.width = 612;
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_2_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH;
        word.y = y;
        egret.Tween.get(word).to({
            x: CONST.WIDTH - word.width >> 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE);
    };
    Page2.prototype.onFrame = function () {
        var _this = this;
        //随机生成雪花
        if (Math.random() < 0.2) {
            var meteor_1 = new egret.Shape();
            meteor_1.graphics.beginFill(0xffffff);
            meteor_1.graphics.drawRect(-6, -6, 12, 12);
            meteor_1.graphics.endFill();
            meteor_1.x = Math.floor(Math.random() * (CONST.WIDTH + 400));
            meteor_1.y = Math.floor(Math.random() * CONST.HEIGHT / 2);
            meteor_1.alpha = 0;
            this.addChildAt(meteor_1, 0);
            var distance = Math.floor(300 + Math.random() * 200);
            egret.Tween.get(meteor_1, {
                //雪花要停留在球体上
                onChange: function () {
                    for (var i = 0; i < _this.pointList.length - 1; i++) {
                        var p1 = _this.pointList[i];
                        var p2 = _this.pointList[i + 1];
                        var x = meteor_1.x - _this.mainImage.x;
                        var y = meteor_1.y - _this.mainImage.y;
                        if (x > p1.x && x < p2.x && y > (p1.y < p2.y ? p1.y : p2.y) && y < (p2.y > p1.y ? p2.y : p1.y)) {
                            var dis = _this.pointToSegDist(x, y, p1.x, p1.y, p2.x, p2.y);
                            if (dis < 5) {
                                _this.mainContainer.addChild(meteor_1);
                                egret.Tween.removeTweens(meteor_1);
                                egret.Tween.get(meteor_1)
                                    .wait(3000)
                                    .to({ alpha: 0 }, 1500)
                                    .call(function () {
                                    meteor_1.parent.removeChild(meteor_1);
                                });
                            }
                        }
                    }
                }
            })
                .to({ x: meteor_1.x - .8 * distance, y: meteor_1.y + distance, alpha: 1, rotation: 7200 + Math.floor(Math.random() * 360) }, 1000, egret.Ease.quadOut)
                .to({ alpha: 0 }, 100)
                .call(function () {
                meteor_1.parent.removeChild(meteor_1);
            });
        }
        return false;
    };
    Page2.prototype.pointToSegDist = function (x, y, startx, starty, endx, endy) {
        var se = (startx - endx) * (startx - endx) + (starty - endy) * (starty - endy); //线段两点距离平方  
        var p = ((x - startx) * (endx - startx) + (y - starty) * (endy - starty)); //向量点乘=|a|*|b|*cosA  
        var r = p / se; //r即点到线段的投影长度与线段长度比  
        var outx = startx + r * (endx - startx);
        var outy = starty + r * (endy - starty);
        var des = (x - outx) * (x - outx) + (y - outy) * (y - outy);
        return Math.sqrt(des);
    };
    Page2.prototype.onMove = function () {
    };
    Page2.prototype.showInfo = function () {
        var pannel = new Info1();
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
    return Page2;
}(Page));
__reflect(Page2.prototype, "Page2");
