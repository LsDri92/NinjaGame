import { Container } from "pixi.js";
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

    }
}