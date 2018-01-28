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
var Info1 = (function (_super) {
    __extends(Info1, _super);
    function Info1() {
        var _this = _super.call(this) || this;
        _this.containerList = [];
        _this.buttonContainer = new egret.DisplayObjectContainer();
        //嘉宾列表
        _this.list0 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        _this.list1 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        _this.list2 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        _this.list3 = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
        _this.list4 = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
        _this.list5 = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
        _this.list6 = [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84];
        _this.list7 = [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96];
        _this.list8 = [97, 98, 99, 100, 101, 102, 103, 129, 104, 105, 106, 107];
        _this.list9 = [108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119];
        _this.list10 = [120, 121, 122, 123, 124, 125, 126, 127, 128];
        _this.pages = 11;
        _this.touchX = NaN;
        _this.touchStartX = NaN;
        _this.touchStartTimer = NaN;
        _this.skinName = "skins.Info1Skin";
        _this.verticalCenter = 0;
        _this.horizontalCenter = 0;
        _this.width = CONST.WIDTH;
        _this.height = CONST.HEIGHT;
        return _this;
    }
    Info1.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.buttonContainer.y = 1758;
        this.addChild(this.buttonContainer);
        this.validateNow();
        var width = this.imageGroup.width;
        this.imageGroup.mask = new egret.Rectangle(10, 0, width - 20, this.imageGroup.height);
        width += 200;
        var container = new Info1Container();
        container.speed = CONST.SPEED_BACKGROUND;
        this.containerList.push(container);
        this.imageGroup.addChild(container);
        //创建嘉宾
        for (var i = 0; i < this.pages; i++) {
            var c = new egret.DisplayObjectContainer();
            var list = this["list" + i];
            for (var i_1 = 0; i_1 < list.length; i_1++) {
                var head = new egret.Bitmap(RES.getRes("h" + list[i_1] + "_png"));
                head.x = i_1 % 3 * 308 + 70;
                head.y = Math.floor(i_1 / 3) * 391 + 10;
                c.addChild(head);
                var name_1 = new egret.Bitmap(RES.getRes("w" + list[i_1] + "_png"));
                name_1.x = head.x + (236 - name_1.width >> 1);
                name_1.y = head.y + 267;
                c.addChild(name_1);
            }
            container.addChild(c);
            c.x = i * width;
            container.moveWidth += width;
            var button = new egret.Bitmap();
            this.addChild(button);
            button.x = i * 60;
            this.buttonContainer.addChild(button);
        }
        this.scrollController = new ScrollController(this.containerList);
        this.scrollController.dispatchPageLoaded(0);
        this.scrollController.key_frame = [];
        for (var i = 0; i < this.pages; i++) {
            this.scrollController.key_frame.push(width * CONST.SPEED_BACKGROUND * i);
        }
        this.scrollController.max_width = width * CONST.SPEED_BACKGROUND * this.pages;
        this.scrollController.circle_gap = width * CONST.SPEED_BACKGROUND;
        this.scrollController.generateKeyFrame();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    Info1.prototype.onTouchBegin = function (e) {
        this.touchStartX = e.stageX;
        this.touchStartTimer = egret.getTimer();
        egret.Tween.removeTweens(this.scrollController);
    };
    Info1.prototype.onTouchMove = function (e) {
        if (this.touchX != this.touchX) {
            this.touchX = e.stageX;
        }
        this.scrollController.distance -= (e.stageX - this.touchX) * 15;
        this.touchX = e.stageX;
    };
    Info1.prototype.onTouchEnd = function (e) {
        this.touchX = NaN;
        var delteX = e.stageX - this.touchStartX;
        if (this.touchStartTimer) {
            var delteTimer = egret.getTimer() - this.touchStartTimer;
            var num = delteX / delteTimer;
            if (Math.abs(num) > 1.0) {
                if (num > 0) {
                    this.scrollController.turnToPrevFrame();
                }
                else {
                    this.scrollController.turnToNextFrame();
                }
            }
            else {
                if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                    if (delteX > 0) {
                        this.scrollController.turnToPrevFrame();
                    }
                    else {
                        this.scrollController.turnToNextFrame();
                    }
                }
                else {
                    this.scrollController.turnToNearestFrame();
                }
            }
            this.touchStartX = NaN;
            this.touchStartTimer = NaN;
        }
        else {
            if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                if (delteX > 0) {
                    this.scrollController.turnToPrevFrame();
                }
                else {
                    this.scrollController.turnToNextFrame();
                }
            }
            else {
                this.scrollController.turnToNearestFrame();
            }
        }
    };
    Info1.prototype.onLoad = function (id) {
        for (var i = 0; i < this.buttonContainer.numChildren; i++) {
            if (i == id) {
                this.buttonContainer.getChildAt(i).texture = RES.getRes("btn_on_png");
            }
            else {
                this.buttonContainer.getChildAt(i).texture = RES.getRes("btn_off_png");
            }
        }
        this.buttonContainer.x = this.width - this.buttonContainer.width >> 1;
    };
    return Info1;
}(eui.Component));
__reflect(Info1.prototype, "Info1");
var Info1Container = (function (_super) {
    __extends(Info1Container, _super);
    function Info1Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveWidth = 0;
        return _this;
    }
    Info1Container.prototype.move = function (distance) {
        _super.prototype.move.call(this, distance);
        this.fixPosition();
    };
    Info1Container.prototype.fixPosition = function () {
        var leftChild = this.getChildAt(0);
        var rightChild = this.getChildAt(this.numChildren - 1);
        if (leftChild.localToGlobal(0, 0).x > 0) {
            rightChild.x -= this.moveWidth;
            this.addChildAt(rightChild, 0);
        }
        else if (rightChild.localToGlobal(0, 0).x < CONST.WIDTH) {
            leftChild.x += this.moveWidth;
            this.addChild(leftChild);
        }
    };
    Info1Container.prototype.onPageLoaded = function (id) {
        this.parent.parent.onLoad(id);
    };
    Info1Container.prototype.onPageMoving = function (id) {
    };
    return Info1Container;
}(Container));
__reflect(Info1Container.prototype, "Info1Container");
