import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container {

    private states: Map<string, AnimatedSprite> = new Map();

    private animContainer:Container = new Container();

    constructor() {
        super();

        this.addChild(this.animContainer);
    }

    public playState(stateName: string, restartAnim: boolean) {
        this.animContainer.removeChildren();
        const currentState = this.states.get(stateName);
        if (currentState) {
            this.animContainer.addChild(currentState);
            if (restartAnim) {
                currentState.gotoAndPlay(0);
            }
        }
    }

    public addState(stateName: string, frames: Texture[] | string[], animationSpeed: number = 0.12, loop: boolean = true) {

        const texArray: Texture[] = [];
        for (const tex of frames) {
            if (typeof tex == "string") {
                texArray.push(Texture.from(tex));
            }
            else {
                texArray.push(tex);
            }
        }

        const tempAnim: AnimatedSprite = new AnimatedSprite(texArray);
        tempAnim.animationSpeed = animationSpeed;
        tempAnim.loop = loop;
        tempAnim.anchor.set(0.5);
        tempAnim.play();
        this.states.set(stateName, tempAnim);

    }

    public update(frames: number) {
        for (const state of this.states.values()) {
            state.update(frames);
        };

    }
}

