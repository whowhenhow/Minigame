//控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {

    constructor() {
        this.datastore = DataStore.getInstance();
        this.movespeed = 2;
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.datastore.get("pencils").push(new UpPencil(top));
        this.datastore.get("pencils").push(new DownPencil(top));

    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.datastore.get("birds").y[i]
                = this.datastore.get("birds").birdsY[i];
        }
        this.datastore.get("birds").time = 0;
    }

    static isStrike(bird,pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }

        return !s;
    }

    //判断小鸟的碰撞事件
    check() {
        const birds = this.datastore.get("birds");
        const land = this.datastore.get("land");
        const pencils = this.datastore.get("pencils");
        const score = this.datastore.get("score");
        //地板的撞击判断
        if (birds.birdsY[1] + birds.birdsHeight[1] >= land.y) {
            console.log("撞起来了");
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            //top: birds.y[0],
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0],
        }

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top : pencil.y,
                bottom:pencil.y + pencil.height,
                left: pencil.x,
                right:pencil.x+pencil.width
            }
            if(Director.isStrike(birdsBorder,pencilBorder)){
                this.isGameOver = true;
                return;
            }
        }

        //加分
        if(birds.birdsX[0]>pencils[0].x+pencils[0].width && score.flag){
            score.score++;
            score.flag = false;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.datastore.get("background").draw();

            const pencils = this.datastore.get("pencils");
            //把移出屏幕外的铅笔删掉
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.datastore.get("score").flag = true;
            }
            //保证屏幕里有第二根铅笔
            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil();
            }

            this.datastore.get("pencils").forEach(function (value) {
                value.draw();
            });
            this.datastore.get("land").draw();
            this.datastore.get("score").draw();
            this.datastore.get("birds").draw();

            let timer = requestAnimationFrame(() => this.run());
            this.datastore.put("timer", timer);

            //cancelAnimationFrame(this.datastroe.get(timer));
        }
        else {
            cancelAnimationFrame(this.datastore.get("timer"));
            this.datastore.get("startButton").draw();
            this.datastore.destroy();
            console.log("游戏结束！");
            //小游戏垃圾回收
            wx.triggerGC();
        }
    }
}