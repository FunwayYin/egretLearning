
interface UpdateData {
    dir: number;//当前牌面
    changed: boolean;//是否切换了牌面
}

class TestShader extends egret.DisplayObjectContainer {

    constructor() {
        super();

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private poke1: egret.Bitmap;
    private poke2: egret.Bitmap;

    private onAddToStage(e: egret.Event) {
        this.poke1 = new egret.Bitmap(RES.getRes("poke0_png"))
        this.addChild(this.poke1);

        this.poke1.x = this.stage.stageWidth / 2 - this.poke1.width - 100;
        this.poke1.y = this.stage.stageHeight / 2 - this.poke1.height / 2;

        this.poke2 = new egret.Bitmap(RES.getRes("poke0_png"))
        this.addChild(this.poke2);

        this.poke2.x = this.stage.stageWidth / 2 - 100;
        this.poke2.y = this.stage.stageHeight / 2 - this.poke2.height / 2;

        this.addShader();

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private updateData1: UpdateData;
    private updateData2: UpdateData;

    update(e: egret.Event) {

        if (this.poke1.filters && this.poke1.filters.length > 0) {
            this.updateFilter(this.poke1, this.updateData1);
        }
        if (this.poke2.filters && this.poke2.filters.length > 0) {
            this.updateFilter(this.poke2, this.updateData2);
        }
    }

    private updateFilter(poke: egret.Bitmap, updateData: UpdateData): void {
        let filter: egret.CustomFilter = <egret.CustomFilter>poke.filters[0];
        
        filter.uniforms.angle -= 2.0 * Math.PI / 180;
        if (filter.uniforms.angle < 0.0) {
            filter.uniforms.angle += Math.PI;
            updateData.changed = false;
        }
        if (filter.uniforms.angle >= Math.PI / 2.0) {
            filter.uniforms.scale = 0.2 * ((Math.PI - filter.uniforms.angle) * 2 / Math.PI);
        } else {
            if (!updateData.changed) {
                if (updateData.dir < 0) {
                    poke.texture = RES.getRes("poke13_png");
                } else if (updateData.dir > 0) {
                    poke.texture = RES.getRes("poke0_png");
                }
                updateData.dir = -updateData.dir;
                updateData.changed = true;
            }
            filter.uniforms.scale = 0.2 * filter.uniforms.angle * 2 / Math.PI;
        }
        if (filter.uniforms.angle >= Math.PI / 1.0) {//翻转
            filter.uniforms.angle = 0.0;
            if (updateData.dir < 0) {
                poke.texture = RES.getRes("poke13_png");
            } else {
                poke.texture = RES.getRes("poke0_png");
            }
            updateData.dir = -updateData.dir;
        }
    }

    private addShader() {
        let vertexSrc = `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;
            attribute vec2 aColor;

            uniform vec2 projectionVector;

            varying vec2 vTextureCoord;
            varying vec4 vColor;

            const vec2 center = vec2(-1.0, 1.0);

            void main(void) {
                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
            }
        `;

        let fragmentSrc1 = `
            precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;

            uniform float angle;
            uniform float scale;

            void main() {
                vec2 uv = vTextureCoord.xy;
                vec2 texCoord = uv;
                float tx,ty,cosVal;
                cosVal = cos(angle);
                if(uv.x <= 0.5) {
                    tx = 0.5 - (0.5-uv.x)/cosVal;
                    if(tx < 0.0) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.x = 1.0 - tx;
                        } else {
                            texCoord.x = tx;
                        }
                        ty = 0.5 - tx;
                        ty = 2.0*ty*scale;
                        texCoord.y = (ty+uv.y)/(1.0+(2.0*ty));
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                } else {
                    tx =(uv.x-0.5)/cosVal;
                    if(tx > 0.5) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.x = 0.5-tx;
                        } else {
                            texCoord.x = 0.5+tx;
                        }
                        ty = tx;
                        ty = 2.0 * ty *scale;
                        texCoord.y = (uv.y - ty)/(1.0 -2.0*ty);
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                }
            }
        `;
        let fragmentSrc2 = `
            precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;

            uniform float angle;
            uniform float scale;

            void main() {
                vec2 uv = vTextureCoord.xy;
                vec2 texCoord = uv;
                float tx,ty,cosVal;
                cosVal = cos(angle);
                if(uv.y <= 0.5) {
                    ty = 0.5 - (0.5-uv.y)/cosVal;
                    if(ty < 0.0) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.y = 1.0 - ty;
                        } else {
                            texCoord.y = ty;
                        }
                        tx = 0.5 - ty;
                        tx = 2.0*tx*scale;
                        texCoord.x = (tx+uv.x)/(1.0+(2.0*tx));
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                } else {
                    ty =(uv.y-0.5)/cosVal;
                    if(ty > 0.5) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.y = 0.5-ty;
                        } else {
                            texCoord.y = 0.5+ty;
                        }
                        tx = ty;
                        tx = 2.0 * tx *scale;
                        texCoord.x = (uv.x - tx)/(1.0 -2.0*tx);
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                }
            }
        `;

        let fragmentSrc3=`precision mediump float;  
  
        varying vec2 texCoord;  
        uniform sampler2D sourceTex;  
        uniform sampler2D targetTex;  
        uniform float time; // Ranges from 0.0 to 1.0  
        
        const float MIN_AMOUNT = -0.16;  
        const float MAX_AMOUNT = 1.3;  
        float amount = time * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;  
        
        const float PI = 3.141592653589793;  
        
        const float scale = 512.0;  
        const float sharpness = 3.0;  
        
        float cylinderCenter = amount;  
        // 360 degrees * amount  
        float cylinderAngle = 2.0 * PI * amount;  
        
        const float cylinderRadius = 1.0 / PI / 2.0;  
        
        vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {  
            float hitPoint = hitAngle / (2.0 * PI);  
            point.y = hitPoint;  
            return rrotation * point;  
        }  
        
        
        vec4 antiAlias(vec4 color1, vec4 color2, float distance) {  
            distance *= scale;  
            if (distance < 0.0) return color2;  
            if (distance > 2.0) return color1;  
            float dd = pow(1.0 - distance / 2.0, sharpness);  
            return ((color2 - color1) * dd) + color1;  
        }  
        
        float distanceToEdge(vec3 point) {  
            float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);  
            float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);  
            if (point.x < 0.0) dx = -point.x;  
            if (point.x > 1.0) dx = point.x - 1.0;  
            if (point.y < 0.0) dy = -point.y;  
            if (point.y > 1.0) dy = point.y - 1.0;  
            if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);  
            return min(dx, dy);  
        }  
        
        vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation) {  
            float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);  
            vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);  
        
            if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {  
                return texture2D(targetTex, texCoord);  
            }  
        
            if (yc > 0.0) return texture2D(sourceTex, p);  
        
            vec4 color = texture2D(sourceTex, point.xy);  
            vec4 tcolor = vec4(0.0);  
        
            return antiAlias(color, tcolor, distanceToEdge(point));  
        }  
        
        vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation) {  
            float shadow = distanceToEdge(point) * 30.0;  
            shadow = (1.0 - shadow) / 3.0;  
            if (shadow < 0.0) shadow = 0.0;  
            else shadow *= amount;  
        
            vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);  
            shadowColor.r -= shadow;  
            shadowColor.g -= shadow;  
            shadowColor.b -= shadow;  
            return shadowColor;  
        }  
        
        vec4 backside(float yc, vec3 point) {  
            vec4 color = texture2D(sourceTex, point.xy);  
            float gray = (color.r + color.b + color.g) / 15.0;  
            gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));  
            color.rgb = vec3(gray);  
            return color;  
        }  
        
        vec4 behindSurface(float yc, vec3 point, mat3 rrotation) {  
            float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;  
            shado *= 1.0 - abs(point.x - 0.5);  
        
            yc = (-cylinderRadius - cylinderRadius - yc);  
        
            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;  
            point = hitPoint(hitAngle, yc, point, rrotation);  
        
            if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)){  
                shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));  
                shado *= pow(-yc / cylinderRadius, 3.0);  
                shado *= 0.5;  
            } else  
                shado = 0.0;  
        
            return vec4(texture2D(targetTex, texCoord).rgb - shado, 1.0);  
        }  
        
        void main(void) {  
            const float angle = 30.0 * PI / 180.0;  
            float c = cos(-angle);  
            float s = sin(-angle);  
        
            mat3 rotation = mat3(  
                c, s, 0,  
                -s, c, 0,  
                0.12, 0.258, 1  
            );  
        
            c = cos(angle);  
            s = sin(angle);  
        
            mat3 rrotation = mat3(  
                c, s, 0,  
                -s, c, 0,  
                0.15, -0.5, 1  
            );  
        
            vec3 point = rotation * vec3(texCoord, 1.0);  
        
            float yc = point.y - cylinderCenter;  
        
            if (yc < -cylinderRadius) {  
                // Behind surface  
                gl_FragColor = behindSurface(yc, point, rrotation);  
                return;  
            }  
        
            if (yc > cylinderRadius) {  
                // Flat surface  
                gl_FragColor = texture2D(sourceTex, texCoord);  
                return;  
            }  
        
            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;  
        
            float hitAngleMod = mod(hitAngle, 2.0 * PI);  
            if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0)) {  
                gl_FragColor = seeThrough(yc, texCoord, rotation, rrotation);  
                return;  
            }  
        
            point = hitPoint(hitAngle, yc, point, rrotation);  
        
            if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {  
                gl_FragColor = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);  
                return;  
            }  
        
            vec4 color = backside(yc, point);  
        
            vec4 otherColor;  
            if (yc < 0.0) {  
                float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);  
                shado *= pow(-yc / cylinderRadius, 3.0);  
                shado *= 0.5;  
                otherColor = vec4(0.0, 0.0, 0.0, shado);  
            } else {  
                otherColor = texture2D(sourceTex, texCoord);  
            }  
        
            color = antiAlias(color, otherColor, cylinderRadius - abs(yc));  
        
            vec4 cl = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);  
            float dist = distanceToEdge(point);  
        
            gl_FragColor = antiAlias(color, cl, dist);  
            }
        `;

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
    }

    private hFilter: egret.CustomFilter;
    private vFilter: egret.CustomFilter;
}