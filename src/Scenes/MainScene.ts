import { OldFilmFilter } from "@pixi/filter-old-film";
import { Container, Sprite, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { NinjaAnim as Player } from "../Game/NinjaAnim";
import { PhysicsContainer } from "../Game/PhysicsContainer";
import { Button } from "../Utils/Button";
import { IUpdateable } from "../Utils/IUpdateable";



export class MainScene extends Container implements IUpdateable {
    private background: Container;
    private ninja1: Player;
    private rainFilter: OldFilmFilter;
    private moveLeft: Button;
    private moveRight: Button;
    private attack: Button;
    physNinja: PhysicsContainer;


    constructor() {
        super()

        this.background = new Container
        const sky: Sprite = Sprite.from("sky")
        const clouds1: Sprite = Sprite.from("clouds1");
        const clouds2: Sprite = Sprite.from("clouds2");
        const ground1: Sprite = Sprite.from("ground1");
        const ground2: Sprite = Sprite.from("ground2");
        const ground3: Sprite = Sprite.from("ground3");

        this.rainFilter = new OldFilmFilter({
            sepia: 1,
            vignetting: 0.24
        });

        this.moveLeft = new Button(
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
        );
        this.moveLeft.on("buttonClicked", this.onLeftClick, this);

        this.moveLeft.position.set(100, 640);
        this.moveLeft.scale.set(1.5)

        this.moveRight = new Button(
            Texture.from("moveRight"),
            Texture.from("moveRight"),
            Texture.from("moveRight"),
        );
        this.moveRight.on("buttonClicked", this.onRightClick, this);

        this.moveRight.position.set(1100, 640);
        this.moveRight.scale.set(1.5)

        this.attack = new Button(
            Texture.from("attack"),
            Texture.from("attack"),
            Texture.from("attack"),
        );
        this.attack.on("buttonClicked", this.onAClick, this);

        this.attack.position.set(1200, 550);
        this.attack.scale.set(1.5)


        this.background.addChild(sky, clouds1, clouds2, ground1, ground2, ground3);
        this.addChild(this.background);
        this.background.width = WIDTH;
        this.background.height = HEIGHT;

        this.ninja1 = new Player;
        this.ninja1.x = this.width / 2;
        this.ninja1.y = this.height - 200;


        this.physNinja = new PhysicsContainer;

        this.addChild(this.physNinja);
        this.ninja1.addChild(this.physNinja);
        this.ninja1.onIdle();





        this.addChild(this.ninja1, this.moveLeft, this.moveRight, this.attack);

        sky.filters = [this.rainFilter];



    }

    update(_Frame: number, deltaMS: number): void {
        this.ninja1.update(deltaMS / (1000 / 60));
        this.physNinja.update(deltaMS / (1 / 60));

        if (!this.onLeftClick && !this.onRightClick && !this.onAClick) {
            this.ninja1.onIdle();
        }

    }

    private onLeftClick(): void {
        console.log("moving left");
        this.ninja1.onRun();
        this.ninja1.scale.x = -1;
    }

    private onRightClick(): void {
        console.log("moving Right");
        this.ninja1.onRun();
        this.ninja1.scale.x = 1;
    }

    private onAClick(): void {
        console.log("attacking!")
        this.ninja1.onAttack();
    }




}