import { LoaderScene } from './Scenes/LoaderScene';
import { SceneManager } from './Utils/SceneManager';



SceneManager.initialize();
SceneManager.changeScene(new LoaderScene());