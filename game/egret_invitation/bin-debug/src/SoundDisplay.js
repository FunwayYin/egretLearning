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
var SoundDisplay = (function (_super) {
    __extends(SoundDisplay, _super);
    function SoundDisplay() {
        var _this = _super.call(this) || this;
        _this.onTexture = RES.getRes("sound_on_png");
        _this.offTexture = RES.getRes("sound_off_png");
        _this.sound = RES.getRes("mp3_mp3");
        _this.isOpen = true;
        _this.position = 0;
        _this.texture = _this.onTexture;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onFrame, _this);
        _this.anchorOffsetX = 26;
        _this.anchorOffsetY = 26;
        _this.y = 70;
        _this.x = CONST.WIDTH - 26 - _this.width;
        _this.scaleX = _this.scaleY = 1.5;
        CONST.MAIN.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchStage, _this);
        return _this;
    }
    SoundDisplay.prototype.onTouchStage = function () {
        CONST.MAIN.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStage, this);
        this.onTouch();
        this.onTouch();
    };
    SoundDisplay.prototype.onFrame = function () {
        if (this.isOpen) {
            this.rotation += 1;
        }
    };
    SoundDisplay.prototype.onTouch = function () {
        this.isOpen = !this.isOpen;
        this.onOpenChange();
    };
    SoundDisplay.prototype.onOpenChange = function () {
        if (this.isOpen) {
            this.texture = this.onTexture;
            if (!this.soundChannel) {
                this.soundChannel = this.sound.play(this.position);
                this.soundChannel.volume = 0;
                egret.Tween.get(this.soundChannel).to({ volume: 1 }, 1000);
            }
        }
        else {
            this.texture = this.offTexture;
            if (this.soundChannel) {
                this.position = this.soundChannel.position;
                this.soundChannel.stop();
                egret.Tween.removeTweens(this.soundChannel);
                this.soundChannel = null;
            }
            this.rotation = 0;
        }
    };
    return SoundDisplay;
}(egret.Bitmap));
__reflect(SoundDisplay.prototype, "SoundDisplay");
