import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/GameScripts/gameManager.ts": any;
	"src/scenes/GameScripts/sceneScriptBase.ts": any;
	"src/scenes/MainMap/mainMap.ts": any;
	"src/scenes/scene/camera.ts": any;
	"src/scenes/scene/scene.ts": any;
	"src/scenes/welcomescene/sound.ts": any;
	"src/scenes/welcomescene/text.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/GameScripts/gameManager.ts": require("./GameScripts/gameManager"),
	"src/scenes/GameScripts/sceneScriptBase.ts": require("./GameScripts/sceneScriptBase"),
	"src/scenes/MainMap/mainMap.ts": require("./MainMap/mainMap"),
	"src/scenes/scene/camera.ts": require("./scene/camera"),
	"src/scenes/scene/scene.ts": require("./scene/scene"),
	"src/scenes/welcomescene/sound.ts": require("./welcomescene/sound"),
	"src/scenes/welcomescene/text.ts": require("./welcomescene/text"),
}
