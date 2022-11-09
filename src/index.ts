import { Application, Loader, Ticker } from 'pixi.js'
import { assets } from './assets';
import { MainScene } from './Scenes/MainScene';

export const WIDTH = 1280;
export const HEIGHT = 720;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGHT
});

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

Loader.shared.add(assets);
Loader.shared.onComplete.add(() => {
	const myScene = new MainScene
	app.stage.addChild(myScene);
	Ticker.shared.add(function(deltaFrame){
		myScene.update(Ticker.shared.deltaMS, deltaFrame);
	})
});
Loader.shared.load();