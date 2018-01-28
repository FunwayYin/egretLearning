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
var CONST;
(function (CONST) {
    CONST.WIDTH = 1080;
    CONST.HEIGHT = 1920;
    CONST.SPEED_BACKGROUND = 12;
    CONST.SPEED_FOREGROUND_1 = 9;
    CONST.SPEED_FOREGROUND_2 = 12;
    CONST.SPEED_FOREGROUND_3 = 17;
    CONST.SPEED_FOREGROUND_4 = 26;
    CONST.SPEED_FOREGROUND_5 = 33;
    CONST.SPEED_FOREGROUND_6 = 40;
    // 数值越大，动画越慢
    CONST.TWEEN_TIME_PER_PIXEL = 0.05;
    CONST.TWEEN_TIME_MIN = 500;
    // 翻页缓动动画
    CONST.TURN_PAGE_EASE = egret.Ease.getBackOut(0.3);
    // 文字渐出时间
    CONST.TEXT_FADE_IN = 500;
    // 文字渐出的动画
    CONST.TEXT_FADE_IN_EASE = egret.Ease.getBackOut(0.3);
    // 弹框弹出的tween动画时间
    CONST.INFO_SHOW_TWEEN_TIME = 200;
    CONST.TOUCH_OFFSET = 20;
    function init(width, main) {
        CONST.MAIN = main;
        CONST.WIDTH = width;
        CONST.KEY_FRAME = [
            0,
            CONST.WIDTH * CONST.SPEED_BACKGROUND * 2,
            CONST.WIDTH * CONST.SPEED_BACKGROUND * 4,
            CONST.WIDTH * CONST.SPEED_BACKGROUND * 6
        ];
        CONST.MAX_WIDTH = CONST.WIDTH * CONST.SPEED_BACKGROUND * 8;
        CONST.CIRCLE_GAP = CONST.WIDTH * CONST.SPEED_BACKGROUND;
    }
    CONST.init = init;
})(CONST || (CONST = {}));
