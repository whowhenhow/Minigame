//其实是三只小鸟一起动
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage("birds");
        super(image,0,0,image.width,image.height,
            0,0,image.width,image.height
        );

        //小鸟宽34，高24，上下边距10，左右边距9
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = DataStore.getInstance().canvas.width / 4;
        const birdY = DataStore.getInstance().canvas.height / 2;
        const birdWidth = 34;
        const birdHeight = 24;
        this.birdsX = [birdX,birdX,birdX];
        this.birdsY = [birdY,birdY,birdY];
        this.birdsWidth = [birdWidth,birdWidth,birdWidth];
        this.birdsHeight = [birdHeight,birdHeight,birdHeight];
        this.y = [birdY,birdY,birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw(){
        const speed = 0.2;
        this.count += speed;
        //console.log(this.count);
        if(this.index >= 2){
            this.count = 0;
        }
        //整数才切换，减速
        this.index = Math.floor(this.count);

        const g = 0.98/2.4;
        //小鸟的位移
        const offsetUp = 30;
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        //const offsetY = 50;

        //y和birdsY的微妙关系：
        //y是小鸟的初始位置，也就是进行上升-下落的初始位置
        //birdsY是小鸟的动态位置，draw中调用的位置
        for(let i = 0; i <=2 ; i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );

    }
}