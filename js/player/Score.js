//分数
import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        //防止因为浏览器刷新速度重复加分
        this.flag = true;
    }

    draw() {
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "#2840ff"
        this.ctx.fillText(
            this.score,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000
        )
    }
}