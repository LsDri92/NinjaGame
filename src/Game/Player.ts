import { Container } from "pixi.js";
import { Keyboard } from "../Utils/Keyboard";

import { NinjaAnim } from "./NinjaAnim";


export class Player extends Container {
    private player1: NinjaAnim;

    constructor() {
        super()


        this.player1 = new NinjaAnim;
        this.addChild(this.player1);


    }

    update(deltaMS: number): void {
        this.player1.update(deltaMS / 1000);

        if (Keyboard.state.get("ArrowRight")){
            this.player1.x += 1;
            console.log(this.player1.x);
        }

    }
}