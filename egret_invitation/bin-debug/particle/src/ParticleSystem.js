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
var particle;
(function (particle_1) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            var _this = _super.call(this) || this;
            _this._pool = [];
            _this.frameTime = 0;
            _this.particles = [];
            _this._emitterX = 0;
            _this._emitterY = 0;
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            _this.emissionTime = -1;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            _this.maxParticles = 200;
            /**
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            _this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            _this.particleClass = null;
            _this.particleMeasureRect = new egret.Rectangle();
            _this.transformForMeasure = new egret.Matrix();
            _this.setAlphaNodeList = [];
            _this.bitmapNodeList = [];
            _this.emissionRate = emissionRate;
            _this.texture = texture;
            _this.$renderNode = new egret.sys.GroupNode();
            //不清除绘制数据
            _this.$renderNode.cleanBeforeRender = function () { };
            return _this;
        }
        ParticleSystem.prototype.getParticle = function () {
            var result;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new particle_1.Particle();
            }
            return result;
        };
        ParticleSystem.prototype.removeParticle = function (particle) {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                return true;
            }
            else {
                return false;
            }
        };
        ParticleSystem.prototype.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        ParticleSystem.prototype.updateRelativeBounds = function (emitterRect) {
            if (emitterRect) {
                if (this.relativeContentBounds == null) {
                    this.relativeContentBounds = new egret.Rectangle();
                }
                this.relativeContentBounds.copyFrom(emitterRect);
                this.relativeContentBounds.x += this.emitterX;
                this.relativeContentBounds.y += this.emitterY;
            }
            else {
                this.relativeContentBounds = null;
            }
            this.mask = this.relativeContentBounds;
        };
        Object.defineProperty(ParticleSystem.prototype, "emitterBounds", {
            get: function () {
                return this._emitterBounds;
            },
            /**
             * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
             * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
             */
            set: function (rect) {
                this._emitterBounds = rect;
                this.updateRelativeBounds(rect);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emitterX", {
            get: function () {
                return this._emitterX;
            },
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            set: function (value) {
                this._emitterX = value;
                this.updateRelativeBounds(this.emitterBounds);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emitterY", {
            get: function () {
                return this._emitterY;
            },
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            set: function (value) {
                this._emitterY = value;
                this.updateRelativeBounds(this.emitterBounds);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        ParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                this.timeStamp = egret.getTimer();
                egret.startTick(this.update, this);
            }
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        ParticleSystem.prototype.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.stopTick(this.update, this);
            }
        };
        ParticleSystem.prototype.update = function (timeStamp) {
            var dt = timeStamp - this.timeStamp;
            this.timeStamp = timeStamp;
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {
                        this.addOneParticle();
                    }
                    this.frameTime -= this.emissionRate;
                }
                if (this.emissionTime != -1) {
                    this.emissionTime -= dt;
                    if (this.emissionTime < 0) {
                        this.emissionTime = 0;
                    }
                }
            }
            var particle;
            var particleIndex = 0;
            while (particleIndex < this.numParticles) {
                particle = this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            this.$invalidateContentBounds();
            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.stopTick(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            return false;
        };
        ParticleSystem.prototype.$measureContentBounds = function (bounds) {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }
            if (this.numParticles > 0) {
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var totalRect = egret.Rectangle.create();
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;
                    var tmpRegion = egret.sys.Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);
                    if (i == 0) {
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    }
                    else {
                        var l = Math.min(totalRect.x, tmpRegion.minX);
                        var t = Math.min(totalRect.y, tmpRegion.minY);
                        var r = Math.max(totalRect.right, tmpRegion.maxX);
                        var b = Math.max(totalRect.bottom, tmpRegion.maxY);
                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    egret.sys.Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                this.lastRect = totalRect;
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            }
            else {
                if (this.lastRect) {
                    totalRect = this.lastRect;
                    bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                    egret.Rectangle.release(totalRect);
                    this.lastRect = null;
                }
            }
        };
        ParticleSystem.prototype.setCurrentParticles = function (num) {
            for (var i = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        ParticleSystem.prototype.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                //todo 这里可以优化
                this.setAlphaNodeList.length = 0;
                this.bitmapNodeList.length = 0;
                this.$renderNode.drawData.length = 0;
            }
        };
        ParticleSystem.prototype.clear = function () {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
            this.$renderNode.drawData.length = 0;
            this.setAlphaNodeList.length = 0;
            this.bitmapNodeList.length = 0;
            this.$invalidateContentBounds();
        };
        ParticleSystem.prototype.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        };
        ParticleSystem.prototype.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        ParticleSystem.prototype.$render = function () {
            if (this.numParticles > 0) {
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    var setAlphaNode;
                    var bitmapNode;
                    if (!this.bitmapNodeList[i]) {
                        this.setAlphaNodeList[i] = new egret.sys.SetAlphaNode();
                        bitmapNode = new egret.sys.BitmapNode();
                        this.bitmapNodeList[i] = bitmapNode;
                        this.$renderNode.addNode(this.setAlphaNodeList[i]);
                        this.$renderNode.addNode(this.bitmapNodeList[i]);
                        bitmapNode.image = texture._bitmapData;
                        bitmapNode.imageWidth = texture._sourceWidth;
                        bitmapNode.imageHeight = texture._sourceHeight;
                        bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                    setAlphaNode = this.setAlphaNodeList[i];
                    bitmapNode = this.bitmapNodeList[i];
                    setAlphaNode.setAlpha(particle.alpha);
                    bitmapNode.matrix = particle.$getMatrix(textureW / 2, textureH / 2);
                    bitmapNode.blendMode = particle.blendMode;
                }
            }
        };
        ParticleSystem.prototype.appendTransform = function (matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation; // * Matrix.DEG_TO_RAD;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                //                skewX *= Matrix.DEG_TO_RAD;
                //                skewY *= Matrix.DEG_TO_RAD;
                matrix.append(egret.NumberUtils.cos(skewY), egret.NumberUtils.sin(skewY), -egret.NumberUtils.sin(skewX), egret.NumberUtils.cos(skewX), x, y);
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            }
            else {
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (regX || regY) {
                // prepend the registration offset:
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return ParticleSystem;
    }(egret.DisplayObject));
    particle_1.ParticleSystem = ParticleSystem;
    __reflect(ParticleSystem.prototype, "particle.ParticleSystem");
})(particle || (particle = {}));
