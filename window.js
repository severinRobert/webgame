"use strict";

class Window {
    constructor(canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
    }
}
