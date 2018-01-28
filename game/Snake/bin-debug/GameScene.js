var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.snakeSize = 15;
        this.appleSize = 15;
        this.score = 0;
        this.speed = 0;
        this.moveDistance = "right";
        this.timeUpdate = 1;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.createBg();
        this.createSnake();
        this.createApple();
        this.createScoreText();
        this.createControl();
        this.addEventListener(egret.Event.ENTER_FRAME, this.viewUpdate, this);
    };
    p.createBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x061f27);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    p.createSnake = function () {
        this.snake = [];
        for (var i = 0; i < 10; i++) {
            var snakeImp = new egret.Bitmap(RES.getRes("snake_png"));
            this.addChild(snakeImp);
            snakeImp.x = 150 + this.snakeSize * i;
            snakeImp.y = 150;
            this.snake.push(snakeImp);
        }
    };
    p.createApple = function () {
        var appleImp = new egret.Bitmap(RES.getRes("apple_png"));
        this.addChild(appleImp);
        appleImp.x = Math.floor(Math.random() * (this.stageW / this.appleSize)) * this.appleSize;
        appleImp.y = Math.floor(Math.random() * (this.stageH / this.appleSize)) * this.appleSize;
        this.apple = appleImp;
    };
    p.createScoreText = function () {
        this.scoreText = new egret.TextField;
        this.scoreText.text = "SCORE : " + this.score;
        this.addChild(this.scoreText);
        this.scoreText.x = this.appleSize;
        this.scoreText.y = this.appleSize;
        this.speedText = new egret.TextField();
        this.speedText.text = "SPEED : " + this.speed;
        this.addChild(this.speedText);
        this.speedText.x = this.stageW - this.speedText.width - this.appleSize;
        this.speedText.y = this.appleSize;
    };
    p.createControl = function () {
        this.upContorl = new egret.Bitmap(RES.getRes("control_png"));
        var anX = this.upContorl.width / 2;
        var anY = this.upContorl.height / 2;
        this.upContorl.anchorOffsetX = anX;
        this.upContorl.anchorOffsetY = anY;
        this.upContorl.rotation = 90;
        this.addChild(this.upContorl);
        this.upContorl.x = this.stageW - this.appleSize - this.upContorl.width / 2 * 3;
        this.upContorl.y = this.stageH - this.appleSize - this.upContorl.height / 2 * 5;
        this.downControl = new egret.Bitmap(RES.getRes("control_png"));
        this.downControl.anchorOffsetX = anX;
        this.downControl.anchorOffsetY = anY;
        this.downControl.rotation = -90;
        this.addChild(this.downControl);
        this.downControl.x = this.upContorl.x;
        this.downControl.y = this.upContorl.y + this.upContorl.height * 2;
        this.leftControl = new egret.Bitmap(RES.getRes("control_png"));
        this.leftControl.anchorOffsetX = anX;
        this.leftControl.anchorOffsetY = anY;
        this.addChild(this.leftControl);
        this.leftControl.x = this.upContorl.x - this.upContorl.width;
        this.leftControl.y = this.upContorl.y + this.upContorl.height;
        this.rightControl = new egret.Bitmap(RES.getRes("control_png"));
        this.rightControl.anchorOffsetX = anX;
        this.rightControl.anchorOffsetY = anY;
        this.rightControl.rotation = 180;
        this.addChild(this.rightControl);
        this.rightControl.x = this.upContorl.x + this.upContorl.width;
        this.rightControl.y = this.leftControl.y;
        this.upContorl.touchEnabled = true;
        this.downControl.touchEnabled = true;
        this.leftControl.touchEnabled = true;
        this.rightControl.touchEnabled = true;
        this.upContorl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.downControl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.leftControl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.rightControl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
    };
    p.startControl = function (e) {
        if (e.target == this.upContorl && this.moveDistance != "down") {
            this.newDistance = "up";
        }
        else if (e.target == this.downControl && this.moveDistance != "up") {
            this.newDistance = "down";
        }
        else if (e.target == this.leftControl && this.moveDistance != "right") {
            this.newDistance = "left";
        }
        else if (e.target == this.rightControl && this.moveDistance != "left") {
            this.newDistance = "right";
        }
        this.moveDistance = this.newDistance;
    };
    p.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.viewUpdate, this);
        this.upContorl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.downControl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.leftControl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
        this.rightControl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startControl, this);
    };
    p.viewUpdate = function (e) {
        var head = this.snake[this.snake.length - 1];
        var headX = head.x;
        var headY = head.y;
        var tail = this.snake[0];
        var tailX = tail.x;
        var tailY = tail.y;
        this.timeUpdate++;
        if (this.speed != 9) {
            this.speed = Math.floor(this.score / 10);
        }
        //吃到苹果
        for (var i = 0; i < this.snake.length; i++) {
            var snakeBody = this.snake[i];
            if (snakeBody.x == this.apple.x && snakeBody.y == this.apple.y) {
                this.removeChild(this.apple);
                this.score++;
                var body = new egret.Bitmap(RES.getRes("snake_png"));
                this.addChild(body);
                body.x = tailX;
                body.y = tailY;
                this.snake.unshift(body);
                this.scoreText.text = "SCORE : " + this.score;
                this.speedText.text = "SPEED : " + this.speed;
                this.createApple();
            }
        }
        //蛇身相撞，游戏结束
        for (var i = 0; i < this.snake.length - 1; i++) {
            if (headX == this.snake[i].x && headY == this.snake[i].y) {
                var over = new egret.TextField();
                over.text = "GAME OVER";
                this.addChild(over);
                over.x = (this.stageW - over.width) / 2;
                over.y = this.stageH - over.height;
                this.gameOver();
            }
        }
        //蛇身移动
        if (this.timeUpdate % (10 - this.speed) == 0) {
            if (this.moveDistance == "up") {
                if (headY <= 0) {
                    tail.y = this.stageH - this.snakeSize;
                }
                else {
                    tail.y = headY - this.snakeSize;
                }
                tail.x = headX;
                this.snake.shift();
                this.snake.push(tail);
            }
            else if (this.moveDistance == "down") {
                if (headY >= this.stageH - this.snakeSize) {
                    tail.y = 0;
                }
                else {
                    tail.y = headY + this.snakeSize;
                }
                tail.x = headX;
                this.snake.shift();
                this.snake.push(tail);
            }
            else if (this.moveDistance == "left") {
                if (headX <= 0) {
                    tail.x = this.stageW - this.snakeSize;
                }
                else {
                    tail.x = headX - this.snakeSize;
                }
                tail.y = headY;
                this.snake.shift();
                this.snake.push(tail);
            }
            else if (this.moveDistance == "right") {
                if (headX >= this.stageW - this.snakeSize) {
                    tail.x = 0;
                }
                else {
                    tail.x = headX + this.snakeSize;
                }
                tail.y = headY;
                this.snake.shift();
                this.snake.push(tail);
            }
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map