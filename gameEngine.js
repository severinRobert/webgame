"use strict";

class GameEngine {
    constructor(canvasId, width, height, milliseconds, keys) {
        this.window = new Window(canvasId, width, height);
        this.milliseconds = milliseconds;
        this.keyPressed = {};
        this.initKeyPressed(keys);
        this.keyJustPressed = {};
        document.addEventListener("keydown", (e) => {
            this.keyJustPressed[e.key] = this.keyPressed[e.key] ? false : true;
            this.keyPressed[e.key] = true;
        });
        document.addEventListener("keyup", (e) => {
            this.keyJustPressed[e.key] = false;
            this.keyPressed[e.key] = false;
        });
    }

    initKeyPressed(keys) {
        for(let key in keys) {
            this.keyPressed[key] = false;
        }
    }

    start(loop) {
        this.stop();
        this.interval = setInterval(loop, this.milliseconds);
        console.log(`[INFO] Game started : ${this.interval}`);
    }

    stop() {
        console.log(`[INFO] Game stopped : ${this.interval}`);
        clearInterval(this.interval);
    }

    clear() {
        this.window.context.clearRect(0, 0, this.window.canvas.width, this.window.canvas.height);
    }
}
