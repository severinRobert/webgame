"use strict";

class Player {
    constructor(color, x, y, height, width, keyUp, keyDown, speed=8, score=0) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.height = height;
        this.middle = height/2;
        this.width = width;
        this.keyUp = keyUp;
        this.keyDown = keyDown;
        this.speed = speed
        this.score = score;
        this.hit = 0;
    }

    addPoint() {
        this.score = this.score + 1;
    }

    addHit() {
        this.hit = this.hit + 1;
    }

    update(up_button, down_button, height) {
        if(up_button && this.y > 0) {
            this.y = this.y -this.speed;
        }
        else if(down_button && this.y+this.height < height) {
            this.y = this.y +this.speed;
        }
    }

    draw(window) {
        window.context.fillStyle = this.color;
        window.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
