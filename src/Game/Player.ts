import { Keyboard } from "../Utils/Keyboard";
import { NinjaAnim } from "./NinjaAnim";
import { PhysicsContainer } from "./PhysicsContainer";


export class Player extends PhysicsContainer {
    private player1: NinjaAnim;

    constructor() {
        super()


        this.player1 = new NinjaAnim;

        this.addChild(this.player1);


    }
    override update(deltaMS:number){
        super.update(deltaMS/1000);
        this.player1.update(deltaMS/(1000/60));

        if (Keyboard.state.get("KeyA")) {
            this.player1.onRun();
            this.player1.scale.x = -1;
            this.player1.speed.x -= 1;
        } else if (Keyboard.state.get("KeyD")) {
            this.player1.onRun();
            this.player1.scale.x = 1;
            this.player1.speed.x += 1;
        } else {
            this.player1.onIdle();
            this.player1.speed.x = 0;
        }
    }

}