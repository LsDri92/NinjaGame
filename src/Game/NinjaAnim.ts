import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { IUpdateable } from "../Utils/IUpdateable";
import { StateAnimation } from "../Utils/StateAnimation";
import { PhysicsContainer } from "./PhysicsContainer";



export class NinjaAnim extends PhysicsContainer implements IUpdateable {

    private ninja: StateAnimation = new StateAnimation;
    private shadow: DropShadowFilter;

   


    constructor() {
        super()

        this.ninja.addState("idle", [
            "similsekiro/idle/0.png",
            "similsekiro/idle/1.png",
            "similsekiro/idle/2.png",
            "similsekiro/idle/3.png",
            "similsekiro/idle/4.png",
            "similsekiro/idle/5.png"
        ], 0.06);

        this.ninja.addState("run", [
            "similsekiro/run/0.png",
            "similsekiro/run/1.png",
            "similsekiro/run/2.png",
            "similsekiro/run/3.png",
            "similsekiro/run/4.png",
            "similsekiro/run/5.png"
        ], 0.10, false);


        this.ninja.addState("attack", [
            "similsekiro/slash/0.png",
            "similsekiro/slash/1.png",
            "similsekiro/slash/2.png",
            "similsekiro/slash/3.png",
            "similsekiro/slash/4.png",
            "similsekiro/slash/5.png"
        ],0.10, false);

        this.shadow = new DropShadowFilter({
            blur: 0,
            quality: 1,
            alpha: 0.288,
            distance: 20.8,
            rotation: 120.92
        });
        this.shadow.angle = -240;
        




        this.ninja.filters = [this.shadow];
        this.addChild(this.ninja);
        
        
        
        this.addChild(this.ninja);

    };

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000)
        this.ninja.update(deltaMS / (1000/60));


    }

    public onAttack(){
        this.ninja.playState("attack", true);
    }

    public onIdle(){
        this.ninja.playState("idle", true);
        
    }

    public onRun(){
        this.ninja.playState("run", true);
    }

};