import { NinjaAnim } from "./NinjaAnim";
import { PhysicsContainer } from "./PhysicsContainer";


export class Player extends PhysicsContainer {
    private player1: NinjaAnim;

    constructor() {
        super()


        this.player1 = new NinjaAnim;

        this.addChild(this.player1);


    }

}