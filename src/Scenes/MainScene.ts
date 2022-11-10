import { OldFilmFilter } from "@pixi/filter-old-film";
import { Container, Texture, TilingSprite } from "pixi.js";
import { Boss } from "../Game/Boss";
import { NinjaAnim as Player } from "../Game/NinjaAnim";
import { Button } from "../Utils/Button";
import { IUpdateable } from "../Utils/IUpdateable";
import { Keyboard } from "../Utils/Keyboard";
import { SceneBase } from "../Utils/SceneBase";
import { SceneManager } from "../Utils/SceneManager";



export class MainScene extends SceneBase implements IUpdateable {
    private background: Container;
    private ninja1: Player;
    private rainFilter: OldFilmFilter;
    private moveLeft: Button;
    private moveRight: Button;
    private attack: Button;
    private sky: TilingSprite;
    private clouds1: TilingSprite;
    private clouds2: TilingSprite;
    private ground1: TilingSprite;
    private ground2: TilingSprite;
    private ground3: TilingSprite;
    private boss: Boss;
    private time: number = 1;



    constructor() {
        super()



        this.background = new Container
        this.sky = new TilingSprite(Texture.from("sky"), SceneManager.WIDTH, SceneManager.HEIGHT)
        this.clouds1 = new TilingSprite(Texture.from("clouds1"), SceneManager.WIDTH * 6, SceneManager.HEIGHT);
        this.clouds2 = new TilingSprite(Texture.from("clouds2"), SceneManager.WIDTH * 6, SceneManager.HEIGHT);
        this.ground1 = new TilingSprite(Texture.from("ground1"), SceneManager.WIDTH * 6, SceneManager.HEIGHT);
        this.ground2 = new TilingSprite(Texture.from("ground2"), SceneManager.WIDTH * 6, SceneManager.HEIGHT);
        this.ground3 = new TilingSprite(Texture.from("ground3"), SceneManager.WIDTH * 6, SceneManager.HEIGHT);

        this.rainFilter = new OldFilmFilter({
            sepia: 1,
            vignetting: 0.24
        });

        this.moveLeft = new Button(
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
            Texture.from("moveLeft"),
        );
        this.moveLeft.on("downClick", this.onLeftClick, this);

        this.moveLeft.position.set(100, 640);
        this.moveLeft.scale.set(1.5)

        this.moveRight = new Button(
            Texture.from("moveRight"),
            Texture.from("moveRight"),
            Texture.from("moveRight"),
        );
        this.moveRight.on("downClick", this.onRightClick, this);

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
        this.ninja1.x = SceneManager.WIDTH / 2;
        this.ninja1.y = SceneManager.HEIGHT - 100;


        this.boss = new Boss;
        this.boss.x = SceneManager.WIDTH - 200;
        this.boss.y = SceneManager.HEIGHT - 200;
        //this.boss.speed.x -= 1;
        this.boss.visible = true;


        this.ninja1.onIdle();




        this.addChild(this.ninja1, this.moveLeft, this.moveRight, this.attack, this.boss);


        this.sky.filters = [this.rainFilter];


    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.ninja1.update(deltaTime);
        this.boss.update(deltaTime);
        this.time += deltaTime / 1000;
        console.log(this.time)


        this.clouds1.tilePosition.x = this.ground1.x * this.worldTransform.a + this.time * 12;
        this.clouds2.tilePosition.x = this.ground2.x * this.worldTransform.a + this.time * 18;

        if (Keyboard.state.get("KeyA")) {
            this.ninja1.onRun;
            this.ninja1.scale.x = -1;
            
        } else if (Keyboard.state.get("KeyD")){
            this.ninja1.onRun;
            this.ninja1.scale.x = 1;
            
        } else if (Keyboard.state.get("KeyS")){
            this.ninja1.onAttack();
        } else {
            this.ninja1.onIdle
        };

        
    }



    private onLeftClick() {
        console.log("moving left");
        this.ninja1.onRun();
        this.ninja1.scale.x = -1;




        this.ground1.tilePosition.x += this.ground2.x * this.worldTransform.a + SceneManager.WIDTH / 12;
        this.ground2.tilePosition.x += this.ground3.x * this.worldTransform.a + SceneManager.WIDTH / 6;
        this.ground3.tilePosition.x += this.background.x * this.worldTransform.a + SceneManager.WIDTH / 25;
    }

    private onRightClick(): void {
        console.log("moving Right");
        this.ninja1.onRun();
        this.ninja1.scale.x = 1;
        

        this.ground1.tilePosition.x -= this.ground2.x * this.worldTransform.a + SceneManager.WIDTH / 12;
        this.ground2.tilePosition.x -= this.ground3.x * this.worldTransform.a + SceneManager.WIDTH / 6;
        this.ground3.tilePosition.x -= this.background.x * this.worldTransform.a + SceneManager.WIDTH / 25;
    }

    private onAClick(): void {
        console.log("attacking!")
        this.ninja1.onAttack();
        this.ninja1.speed.x = 0;
    }




}