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
var TestShader = (function (_super) {
    __extends(TestShader, _super);
    function TestShader() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TestShader.prototype.onAddToStage = function (e) {
        this.poke1 = new egret.Bitmap(RES.getRes("poke0_png"));
        this.addChild(this.poke1);
        this.poke1.x = this.stage.stageWidth / 2 - this.poke1.width - 100;
        this.poke1.y = this.stage.stageHeight / 2 - this.poke1.height / 2;
        this.poke2 = new egret.Bitmap(RES.getRes("poke0_png"));
        this.addChild(this.poke2);
        this.poke2.x = this.stage.stageWidth / 2 - 100;
        this.poke2.y = this.stage.stageHeight / 2 - this.poke2.height / 2;
        this.addShader();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    TestShader.prototype.update = function (e) {
        if (this.poke1.filters && this.poke1.filters.length > 0) {
            this.updateFilter(this.poke1, this.updateData1);
        }
        if (this.poke2.filters && this.poke2.filters.length > 0) {
            this.updateFilter(this.poke2, this.updateData2);
        }
    };
    TestShader.prototype.updateFilter = function (poke, updateData) {
        var filter = poke.filters[0];
        filter.uniforms.angle -= 2.0 * Math.PI / 180;
        if (filter.uniforms.angle < 0.0) {
            filter.uniforms.angle += Math.PI;
            updateData.changed = false;
        }
        if (filter.uniforms.angle >= Math.PI / 2.0) {
            filter.uniforms.scale = 0.2 * ((Math.PI - filter.uniforms.angle) * 2 / Math.PI);
        }
        else {
            if (!updateData.changed) {
                if (updateData.dir < 0) {
                    poke.texture = RES.getRes("poke13_png");
                }
                else if (updateData.dir > 0) {
                    poke.texture = RES.getRes("poke0_png");
                }
                updateData.dir = -updateData.dir;
                updateData.changed = true;
            }
            filter.uniforms.scale = 0.2 * filter.uniforms.angle * 2 / Math.PI;
        }
        if (filter.uniforms.angle >= Math.PI / 1.0) {
            filter.uniforms.angle = 0.0;
            if (updateData.dir < 0) {
                poke.texture = RES.getRes("poke13_png");
            }
            else {
                poke.texture = RES.getRes("poke0_png");
            }
            updateData.dir = -updateData.dir;
        }
    };
    TestShader.prototype.addShader = function () {
        var vertexSrc = "\n            attribute vec2 aVertexPosition;\n            attribute vec2 aTextureCoord;\n            attribute vec2 aColor;\n\n            uniform vec2 projectionVector;\n\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n\n            const vec2 center = vec2(-1.0, 1.0);\n\n            void main(void) {\n                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n                vTextureCoord = aTextureCoord;\n                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n            }\n        ";
        var fragmentSrc1 = "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n            uniform sampler2D uSampler;\n\n            uniform float angle;\n            uniform float scale;\n\n            void main() {\n                vec2 uv = vTextureCoord.xy;\n                vec2 texCoord = uv;\n                float tx,ty,cosVal;\n                cosVal = cos(angle);\n                if(uv.x <= 0.5) {\n                    tx = 0.5 - (0.5-uv.x)/cosVal;\n                    if(tx < 0.0) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.x = 1.0 - tx;\n                        } else {\n                            texCoord.x = tx;\n                        }\n                        ty = 0.5 - tx;\n                        ty = 2.0*ty*scale;\n                        texCoord.y = (ty+uv.y)/(1.0+(2.0*ty));\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                } else {\n                    tx =(uv.x-0.5)/cosVal;\n                    if(tx > 0.5) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.x = 0.5-tx;\n                        } else {\n                            texCoord.x = 0.5+tx;\n                        }\n                        ty = tx;\n                        ty = 2.0 * ty *scale;\n                        texCoord.y = (uv.y - ty)/(1.0 -2.0*ty);\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                }\n            }\n        ";
        var fragmentSrc2 = "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n            uniform sampler2D uSampler;\n\n            uniform float angle;\n            uniform float scale;\n\n            void main() {\n                vec2 uv = vTextureCoord.xy;\n                vec2 texCoord = uv;\n                float tx,ty,cosVal;\n                cosVal = cos(angle);\n                if(uv.y <= 0.5) {\n                    ty = 0.5 - (0.5-uv.y)/cosVal;\n                    if(ty < 0.0) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.y = 1.0 - ty;\n                        } else {\n                            texCoord.y = ty;\n                        }\n                        tx = 0.5 - ty;\n                        tx = 2.0*tx*scale;\n                        texCoord.x = (tx+uv.x)/(1.0+(2.0*tx));\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                } else {\n                    ty =(uv.y-0.5)/cosVal;\n                    if(ty > 0.5) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.y = 0.5-ty;\n                        } else {\n                            texCoord.y = 0.5+ty;\n                        }\n                        tx = ty;\n                        tx = 2.0 * tx *scale;\n                        texCoord.x = (uv.x - tx)/(1.0 -2.0*tx);\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                }\n            }\n        ";
        var fragmentSrc3 = "precision mediump float;  \n  \n        varying vec2 texCoord;  \n        uniform sampler2D sourceTex;  \n        uniform sampler2D targetTex;  \n        uniform float time; // Ranges from 0.0 to 1.0  \n        \n        const float MIN_AMOUNT = -0.16;  \n        const float MAX_AMOUNT = 1.3;  \n        float amount = time * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;  \n        \n        const float PI = 3.141592653589793;  \n        \n        const float scale = 512.0;  \n        const float sharpness = 3.0;  \n        \n        float cylinderCenter = amount;  \n        // 360 degrees * amount  \n        float cylinderAngle = 2.0 * PI * amount;  \n        \n        const float cylinderRadius = 1.0 / PI / 2.0;  \n        \n        vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {  \n            float hitPoint = hitAngle / (2.0 * PI);  \n            point.y = hitPoint;  \n            return rrotation * point;  \n        }  \n        \n        \n        vec4 antiAlias(vec4 color1, vec4 color2, float distance) {  \n            distance *= scale;  \n            if (distance < 0.0) return color2;  \n            if (distance > 2.0) return color1;  \n            float dd = pow(1.0 - distance / 2.0, sharpness);  \n            return ((color2 - color1) * dd) + color1;  \n        }  \n        \n        float distanceToEdge(vec3 point) {  \n            float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);  \n            float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);  \n            if (point.x < 0.0) dx = -point.x;  \n            if (point.x > 1.0) dx = point.x - 1.0;  \n            if (point.y < 0.0) dy = -point.y;  \n            if (point.y > 1.0) dy = point.y - 1.0;  \n            if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);  \n            return min(dx, dy);  \n        }  \n        \n        vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation) {  \n            float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);  \n            vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);  \n        \n            if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {  \n                return texture2D(targetTex, texCoord);  \n            }  \n        \n            if (yc > 0.0) return texture2D(sourceTex, p);  \n        \n            vec4 color = texture2D(sourceTex, point.xy);  \n            vec4 tcolor = vec4(0.0);  \n        \n            return antiAlias(color, tcolor, distanceToEdge(point));  \n        }  \n        \n        vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation) {  \n            float shadow = distanceToEdge(point) * 30.0;  \n            shadow = (1.0 - shadow) / 3.0;  \n            if (shadow < 0.0) shadow = 0.0;  \n            else shadow *= amount;  \n        \n            vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);  \n            shadowColor.r -= shadow;  \n            shadowColor.g -= shadow;  \n            shadowColor.b -= shadow;  \n            return shadowColor;  \n        }  \n        \n        vec4 backside(float yc, vec3 point) {  \n            vec4 color = texture2D(sourceTex, point.xy);  \n            float gray = (color.r + color.b + color.g) / 15.0;  \n            gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));  \n            color.rgb = vec3(gray);  \n            return color;  \n        }  \n        \n        vec4 behindSurface(float yc, vec3 point, mat3 rrotation) {  \n            float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;  \n            shado *= 1.0 - abs(point.x - 0.5);  \n        \n            yc = (-cylinderRadius - cylinderRadius - yc);  \n        \n            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;  \n            point = hitPoint(hitAngle, yc, point, rrotation);  \n        \n            if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)){  \n                shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));  \n                shado *= pow(-yc / cylinderRadius, 3.0);  \n                shado *= 0.5;  \n            } else  \n                shado = 0.0;  \n        \n            return vec4(texture2D(targetTex, texCoord).rgb - shado, 1.0);  \n        }  \n        \n        void main(void) {  \n            const float angle = 30.0 * PI / 180.0;  \n            float c = cos(-angle);  \n            float s = sin(-angle);  \n        \n            mat3 rotation = mat3(  \n                c, s, 0,  \n                -s, c, 0,  \n                0.12, 0.258, 1  \n            );  \n        \n            c = cos(angle);  \n            s = sin(angle);  \n        \n            mat3 rrotation = mat3(  \n                c, s, 0,  \n                -s, c, 0,  \n                0.15, -0.5, 1  \n            );  \n        \n            vec3 point = rotation * vec3(texCoord, 1.0);  \n        \n            float yc = point.y - cylinderCenter;  \n        \n            if (yc < -cylinderRadius) {  \n                // Behind surface  \n                gl_FragColor = behindSurface(yc, point, rrotation);  \n                return;  \n            }  \n        \n            if (yc > cylinderRadius) {  \n                // Flat surface  \n                gl_FragColor = texture2D(sourceTex, texCoord);  \n                return;  \n            }  \n        \n            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;  \n        \n            float hitAngleMod = mod(hitAngle, 2.0 * PI);  \n            if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0)) {  \n                gl_FragColor = seeThrough(yc, texCoord, rotation, rrotation);  \n                return;  \n            }  \n        \n            point = hitPoint(hitAngle, yc, point, rrotation);  \n        \n            if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {  \n                gl_FragColor = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);  \n                return;  \n            }  \n        \n            vec4 color = backside(yc, point);  \n        \n            vec4 otherColor;  \n            if (yc < 0.0) {  \n                float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);  \n                shado *= pow(-yc / cylinderRadius, 3.0);  \n                shado *= 0.5;  \n                otherColor = vec4(0.0, 0.0, 0.0, shado);  \n            } else {  \n                otherColor = texture2D(sourceTex, texCoord);  \n            }  \n        \n            color = antiAlias(color, otherColor, cylinderRadius - abs(yc));  \n        \n            vec4 cl = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);  \n            float dist = distanceToEdge(point);  \n        \n            gl_FragColor = antiAlias(color, cl, dist);  \n            }\n        ";
        //水平翻转
        this.hFilter = new egret.CustomFilter(vertexSrc, fragmentSrc3, {
            angle: 0 * Math.PI / 180,
            scale: 0.0
        });
        //垂直翻转
        this.vFilter = new egret.CustomFilter(vertexSrc, fragmentSrc3, {
            angle: 0 * Math.PI / 180,
            scale: 0.0
        });
        this.updateData1 = { dir: -1, changed: false };
        this.updateData2 = { dir: -1, changed: false };
        this.poke1.filters = [this.hFilter];
        this.poke2.filters = [this.vFilter];
    };
    return TestShader;
}(egret.DisplayObjectContainer));
__reflect(TestShader.prototype, "TestShader");
//# sourceMappingURL=TestShader.js.map