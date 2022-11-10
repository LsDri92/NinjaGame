import { Application, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager {

    export const WIDTH = 1280;
    export const HEIGHT = 720;
    let currentScene: SceneBase;

    let app: Application

    export function initialize() {

        if (app != undefined) {
            console.error("Don't call initialize twice!")
            return;
        }

        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            width: WIDTH,
            height: HEIGHT
        });

        Keyboard.initialize();

        window.addEventListener("resize", () => {

            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;

            const scale = Math.min(scaleX, scaleY);

            const gameWidth = Math.round(app.screen.width * scale);
            const gameHeigth = Math.round(app.screen.height * scale);

            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeigth) / 2);

            app.view.style.width = gameWidth + "px";
            app.view.style.height = gameHeigth + "px";

            app.view.style.marginLeft = marginHorizontal + "px";
            app.view.style.marginRight = marginHorizontal + "px";

            app.view.style.marginTop = marginVertical + "px";
            app.view.style.marginBottom = marginVertical + "px";
        });
        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update);

    }

    export function changeScene(newScene: SceneBase) {
        if (currentScene) {
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }

    function update(framePassed:number){
        currentScene?.update(Ticker.shared.elapsedMS, framePassed);
    }
}