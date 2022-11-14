"use strict";

function onload() {
    let game = new Game("canvas", 600, 400, 20, ["z", "s", "ArrowUp", "ArrowDown", "Enter"]);

    document.getElementById("start").addEventListener("click", () => {
        game.newGame(document.getElementById("mode").value);
        game.start(game.loop.bind(game));
    });
    document.getElementById("pause").addEventListener("click", () => {
        game.pause();
    });
}

class Game extends GameEngine {
    constructor(canvasId, width, height, interval, keys, mode="solo") {
        super(canvasId, width, height, interval, keys);
        this.running = true;
        this.middle = { x: width/2, y: height/2 };
        this.mode = mode;
    }

    newGame(mode) {
        this.mode = mode;
        const playerWidth = 3;
        const height = this.window.canvas.height;
        const width = this.window.canvas.width;
        this.p1 = new Player("blue", 0, this.middle.y, parseInt(height/7), playerWidth, "z", "s");
        if(this.mode == "solo") {
            this.p2 = new Player("black", width-playerWidth, 0, height, playerWidth, "ArrowUp", "ArrowDown");
        } else {
            this.p2 = new Player("red", width-playerWidth, this.middle.y, parseInt(height/7), playerWidth, "ArrowUp", "ArrowDown");
        }
        this.ball = new Ball(this.middle.x, this.middle.y, 3);
        console.log(`[INFO] New game in ${this.mode} mode`);
    }

    ballAtGoal(p, pOtherSide) {
        // p get the ball
        if(this.ball.y >= p.y-this.ball.radius && this.ball.y <= p.y+p.height+this.ball.radius) {
            this.ball.bounce(p);
            p.addHit();
        }
        // p missed the ball
        else {
            console.log(`${p.color} miss the ball, ${pOtherSide.name} get a point!`);
            console.log(`ball: ${this.ball.x}, ${this.ball.y}, ${this.ball.radius} / p: ${p.x}, ${p.y}, ${p.width}, ${p.height}`);
            pOtherSide.addPoint();
            this.ball.ballReset();
            if(this.mode == "solo") {
                p.hit = 0;
            }
        }
    }

    checkCollision() {
        const ball = this.ball;
        const p1 = this.p1;
        const p2 = this.p2;
        // ball hits the left wall
        if(ball.x <= p1.x+p1.width) {
            this.ballAtGoal(p1, p2);
        }
        // ball hits the right wall
        else if(ball.x >= p2.x-ball.radius) {
            if(this.mode == "solo") {
                ball.velocity.x = -ball.velocity.x;
            } else {
                this.ballAtGoal(p2, p1);
            }
        }
        // ball hits an horizontal wall
        else if(ball.y <= 0 || ball.y >= this.window.canvas.height-ball.radius) {
            console.log("The ball hits an horizontal wall, the ball bounce!");
            ball.velocity.y = -ball.velocity.y;
        }
    }

    moveObjects() {
        // move p1
        this.p1.update(this.keyPressed[this.p1.keyUp], this.keyPressed[this.p1.keyDown], this.window.canvas.height);
        // move p2
        if(!this.single) {
            this.p2.update(this.keyPressed[this.p2.keyUp], this.keyPressed[this.p2.keyDown], this.window.canvas.height);
        }
        else {
            this.p2.update(this.ball.y < this.p2.y-this.p2.middle, this.ball.y > this.p2.y, this.window.canvas.height);
        }
        // move ball
        this.ball.update();
    }

    update() {
        this.checkCollision();
        this.moveObjects();
    }

    drawScore() {
        this.window.context.fillStyle = "black";
        this.window.context.font = "30px Arial";
        if(this.mode == "solo") {
            this.window.context.fillText(this.p1.hit, this.middle.x-10, 30);
        } else {
            this.window.context.fillText(`${this.p1.score} - ${this.p2.score}`, this.middle.x-20, 30);
        }
    }

    draw() {
        this.p1.draw(this.window);
        this.p2.draw(this.window);
        this.ball.draw(this.window);
        this.drawScore();
    }

    pause() {
        this.running = !this.running;
        console.log(`[INFO] ${this.running ? "Running" : "Paused"}`);
    }

    loop() {
        if(this.keyPressed.Escape || this.keyPressed.p) {
            this.pause();
        } else if(this.keyJustPressed.Shift) {
            this.single = !this.single;
        }
        if(this.running) {
            this.update();
            this.clear();
            this.draw();
        }
    }
}
