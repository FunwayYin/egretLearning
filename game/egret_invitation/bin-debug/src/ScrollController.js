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
var ScrollController = (function () {
    function ScrollController(containerList) {
        this._tweenTimePerLen = CONST.TWEEN_TIME_PER_PIXEL;
        this._keyFramePosition = [];
        this.circle_gap = CONST.CIRCLE_GAP;
        this.max_width = CONST.MAX_WIDTH;
        this.key_frame = CONST.KEY_FRAME;
        this._distance = 0;
        this.activePage = 0;
        this.containerList = containerList;
        this.generateKeyFrame();
    }
    ScrollController.prototype.circlePrev = function () {
        for (var i = 0; i < this._keyFramePosition.length; i++) {
            this._keyFramePosition[i] -= this.max_width;
        }
    };
    ScrollController.prototype.circleNext = function () {
        for (var i = 0; i < this._keyFramePosition.length; i++) {
            this._keyFramePosition[i] += this.max_width;
        }
    };
    ScrollController.prototype.generateKeyFrame = function () {
        this._keyFramePosition.length = 0;
        for (var i = 0; i < this.key_frame.length; i++) {
            this._keyFramePosition.push(this.key_frame[i]);
        }
    };
    ScrollController.prototype.moveForeground = function (value) {
        var length = this.containerList.length;
        for (var i = 1; i < length; i++) {
            var obj = this.containerList[i];
            obj.move(value / obj.speed);
        }
    };
    Object.defineProperty(ScrollController.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        set: function (value) {
            var length = this.containerList.length;
            for (var i = 0; i < length; i++) {
                var obj = this.containerList[i];
                obj.move((this._distance - value) / obj.speed);
            }
            this._distance = value;
            this.dispatchPageMoving();
        },
        enumerable: true,
        configurable: true
    });
    // 吸附到最近的页面
    ScrollController.prototype.turnToNearestFrame = function () {
        if (this._distance - this._keyFramePosition[this._keyFramePosition.length - 1] > this.circle_gap) {
            this.circleNext();
        }
        var num = Infinity, key = 0;
        for (var i = 0; i < this._keyFramePosition.length; i++) {
            var delta = Math.abs(this._keyFramePosition[i] - this._distance);
            if (num > delta) {
                num = delta;
                key = i;
            }
        }
        this.turnToFrame(key);
    };
    // 下一页
    ScrollController.prototype.turnToNextFrame = function () {
        if (this._keyFramePosition[this._keyFramePosition.length - 1] <= this._distance) {
            this.circleNext();
        }
        var key = this._keyFramePosition.length - 1;
        for (var i = 0; i < this._keyFramePosition.length; i++) {
            if (this._keyFramePosition[i] - this._distance >= 0) {
                key = i;
                break;
            }
        }
        this.turnToFrame(key);
    };
    // 上一页
    ScrollController.prototype.turnToPrevFrame = function () {
        if (this._keyFramePosition[0] >= this._distance) {
            this.circlePrev();
        }
        var key = 0;
        for (var i = this._keyFramePosition.length - 1; i >= 0; i--) {
            if (this._keyFramePosition[i] - this._distance <= 0) {
                key = i;
                break;
            }
        }
        this.turnToFrame(key);
    };
    // 跳转到指定页面
    ScrollController.prototype.turnToFrame = function (key) {
        var target = this._keyFramePosition[key];
        var delta = Math.abs(target - this._distance);
        // 计算需要移动的长度来控制动画时间
        var tweenTime = Math.max(this._tweenTimePerLen * delta, CONST.TWEEN_TIME_MIN);
        egret.Tween.get(this, undefined, undefined, true).to({
            distance: target
        }, tweenTime, CONST.TURN_PAGE_EASE).call(this.dispatchPageLoaded, this, [key]);
    };
    ScrollController.prototype.dispatchPageLoaded = function (page) {
        if (this.containerList[0].onPageLoaded) {
            this.containerList[0].onPageLoaded(page);
        }
        this.activePage = page;
    };
    ScrollController.prototype.dispatchPageMoving = function () {
        if (this.containerList[0].onPageMoving) {
            this.containerList[0].onPageMoving(this.activePage);
        }
    };
    return ScrollController;
}());
__reflect(ScrollController.prototype, "ScrollController");
