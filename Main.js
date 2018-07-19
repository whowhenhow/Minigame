//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.datastore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        this.datastore.canvas = this.canvas;
        this.datastore.ctx = this.ctx;
        this.datastore.res = map;
        this.createBackGroundMusic();
        this.init();
    }

    createBackGroundMusic(){
        var bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = "audios/bgm.mp3";
    }

    init() {

        this.director.isGameOver = false;

        this.datastore
            .put("pencils", [])
            .put("background", BackGround)
            .put("land", Land)
            .put("birds", Birds)
            .put("startButton", StartButton)
            .put("score", Score);
        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        // this.canvas.addEventListener("touchstart",e =>{
        //     //屏蔽了事件冒泡
        //     e.preventDefault();
        //     if(this.director.isGameOver){
        //         console.log("游戏开始");
        //         this.init();
        //     }
        //     else{
        //         this.director.birdsEvent();
        //     }
        // });
        wx.onTouchStart(()=>
        {
            if (this.director.isGameOver) {
                console.log("游戏开始");
                this.init();
            }
            else {
                this.director.birdsEvent();
            }
        });
    }
}