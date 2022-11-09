import { OldFilmFilter } from "@pixi/filter-old-film";
import { Container, Texture, TilingSprite } from "pixi.js";
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
    private physNinja: PhysicsContainer;
    private sky: TilingSprite;
    private clouds1: TilingSprite;
    private clouds2: TilingSprite;
    private ground1: TilingSprite;
    private ground2: TilingSprite;
    private ground3: TilingSprite;


    constructor() {
        super()

        this.background = new Container
        this.sky = new TilingSprite(Texture.from("sky"), WIDTH, HEIGHT)
        this.clouds1 = new TilingSprite(Texture.from("clouds1"), WIDTH * 6, HEIGHT);
        this.clouds2 = new TilingSprite(Texture.from("clouds2"), WIDTH * 6, HEIGHT);
        this.ground1 = new TilingSprite(Texture.from("ground1"), WIDTH * 6, HEIGHT);
        this.ground2 = new TilingSprite(Texture.from("ground2"), WIDTH * 6, HEIGHT);
        this.ground3 = new TilingSprite(Texture.from("ground3"), WIDTH * 6, HEIGHT);

        this.rainFilter = new OldFilmFilter({
            sepia: 1,
            vignetting: 0.24
        });

        this.moveLeft = new Button(
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
        );
        this.moveLeft.on("movingClick", this.onLeftClick, this);

        this.moveLeft.position.set(100, 640);
        this.moveLeft.scale.set(1.5)

        this.moveRight = new Button(
            Texture.from("moveRight"),
            Texture.from("moveRight"),
            Texture.from("moveRight"),
        );
        this.moveRight.on("movingClick", this.onRightClick, this);

        this.moveRight.position.set(1100, 640);
        this.moveRight.scale.set(1.5)

        this.attack = new Button(
            Texture.from("attack"),
            Texture.from("attack"),
            Texture.from("attack"),
        );
        this.attack.on("upClicked", this.onAClick, this);

        this.attack.position.set(1200, 550);
        this.attack.scale.set(1.5)



        this.addChild(this.background);
        this.background.addChild(this.sky, this.clouds1, this.clouds2, this.ground1, this.ground2, this.ground3);


        this.ninja1 = new Player;
        this.ninja1.x = WIDTH / 2;
        this.ninja1.y = HEIGHT - 100;


        this.physNinja = new PhysicsContainer;

        this.addChild(this.physNinja);
        this.ninja1.addChild(this.physNinja);
        this.ninja1.onIdle();





        this.addChild(this.ninja1, this.moveLeft, this.moveRight, this.attack);

        this.sky.filters = [this.rainFilter];



    }

    update(_Frame: number, deltaMS: number): void {
        this.ninja1.update(deltaMS / (1000 / 60));

        if (!this.onLeftClick && !this.onRightClick && !this.onAClick) {
            this.ninja1.onIdle();
        }

        this.clouds1.tilePosition.x += this.ground1.x * this.worldTransform.a + deltaMS * 0.5;
        this.clouds2.tilePosition.x += this.ground2.x * this.worldTransform.a + deltaMS * 0.9;


    }

    private onLeftClick(): void {
        console.log("moving left");
        this.ninja1.onRun();
        this.ninja1.scale.x = -1;

        this.ground1.tilePosition.x += this.ground2.x * this.worldTransform.a + WIDTH / 12;
        this.ground2.tilePosition.x += this.ground3.x * this.worldTransform.a + WIDTH / 6;
        this.ground3.tilePosition.x += this.background.x * this.worldTransform.a + WIDTH / 25;
    }

    private onRightClick(): void {
        console.log("moving Right");
        this.ninja1.onRun();
        this.ninja1.scale.x = 1;

        this.ground1.tilePosition.x -= this.ground2.x * this.worldTransform.a + WIDTH / 12;
        this.ground2.tilePosition.x -= this.ground3.x * this.worldTransform.a + WIDTH / 6;
        this.ground3.tilePosition.x -= this.background.x * this.worldTransform.a + WIDTH / 25;
    }

    private onAClick(): void {
        console.log("attacking!")
        this.ninja1.onAttack();
    }




}