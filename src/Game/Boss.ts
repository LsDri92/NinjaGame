import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { AnimatedSprite, Texture } from "pixi.js";
import { IUpdateable } from "../Utils/IUpdateable";
import { PhysicsContainer } from "./PhysicsContainer";

export class Boss extends PhysicsContainer implements IUpdateable {

    private walkingBoss: AnimatedSprite;
    private attackingBoss: AnimatedSprite;
    private shadow: DropShadowFilter;

    constructor() {
        super()

        this.walkingBoss = new AnimatedSprite([
            Texture.from("walk/0.png"),
            Texture.from("walk/1.png"),
            Texture.from("walk/2.png"),
            Texture.from("walk/3.png"),
            Texture.from("walk/4.png"),
            Texture.from("walk/5.png"),
            Texture.from("walk/6.png"),
            Texture.from("walk/7.png")
        ])
        this.walkingBoss.play()
        this.walkingBoss.animationSpeed = 0.08;
        this.walkingBoss.scale.set(2);
        this.addChild(this.walkingBoss);

        this.attackingBoss = new AnimatedSprite([
            Texture.from("attack/0.png"),
            Texture.from("attack/1.png"),
            Texture.from("attack/2.png"),
            Texture.from("attack/3.png"),
            Texture.from("attack/4.png"),
            Texture.from("attack/5.png"),
            Texture.from("attack/6.png"),
        ])

        this.attackingBoss.play();
        this.attackingBoss.animationSpeed = 0.08;
        this.attackingBoss.scale.set(2);
        this.attackingBoss.visible=false;
        this.attackingBoss.gotoAndPlay(0);
        this.attackingBoss.loop = true;
        this.addChild(this.attackingBoss);

        this.shadow = new DropShadowFilter({
            blur: 0,
            quality: 1,
            alpha: 0.288,
            distance: 20.8,
            rotation: 120.92
        });
        this.shadow.angle = -240;

        this.walkingBoss.filters = [this.shadow];
        this.attackingBoss.filters = [this.shadow];
        
    }

    public onWalkingBoss() {
        this.walkingBoss.visible = true;
        this.attackingBoss.visible = false;
    }

    public onAttackingBoss() {
        this.walkingBoss.visible = false;
        this.attackingBoss.visible = true;
        this.attackingBoss.gotoAndPlay(0);
    }
}