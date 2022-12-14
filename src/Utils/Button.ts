import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {
    private def: Texture;
    private down: Texture;
    private over: Texture;


    private spr: Sprite;

    constructor(def: Texture, down: Texture, over: Texture) {
        super()

        this.def = def;
        this.down = down;
        this.over = over;


        this.spr = Sprite.from(def);
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);

        this.spr.interactive = true;
        this.spr.on("pointerdown", this.onPointerDown, this);
        this.spr.on("pointerup", this.onPointerUp, this);
        this.spr.on("pointerover", this.onPointerOver, this);
        this.spr.on("pointerout", this.onPointerOut, this);

    }


    private onPointerDown(): void {
        this.emit("downClick")
        this.spr.texture = this.down;
    }

    private onPointerUp(): void {
        this.emit("upClicked");
        this.spr.texture = this.over;
    }

    private onPointerOver() {
        this.emit("overClick");
        this.spr.texture = this.over;
    }

    private onPointerOut() {
        this.emit("outClick");
        this.spr.texture = this.def;
    }
}