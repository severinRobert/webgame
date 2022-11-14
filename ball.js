"use strict";

class Ball {
    constructor(x, y, radius, velocity={x: 4, y: 0}, ratio=1.1, maxSpeed=8) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.ratio = ratio;
        this.maxSpeed = maxSpeed;
        this.start = {x: x, y: y, velocity_x: velocity.x, velocity_y: velocity.y};
    }

    ballReset() {
        this.x = this.start.x;
        this.y = this.start.y;
        this.velocity.x = this.start.velocity_x;
        this.velocity.y = this.start.velocity_y;
    }

    bounce(player) {
        const newSpeed = -this.velocity.x * this.ratio;
        if(newSpeed > this.maxSpeed) {
            this.velocity.x = this.maxSpeed;
        } else if(newSpeed < -this.maxSpeed) {
            this.velocity.x = -this.maxSpeed;
        } else {
            this.velocity.x = newSpeed;
        }
        this.velocity.y = ((this.y - (player.y + player.middle)) / player.middle) * Math.abs(this.velocity.x);
        console.log(`${player.color} get the ball, the ball bounce! ball speed: ${this.velocity.x}`);
    }

    update() {
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }

    draw(window) {
        window.context.fillStyle = "black";
        window.context.beginPath();
        window.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        window.context.fill();
    }
}
