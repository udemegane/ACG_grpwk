import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/GameScripts/connection.ts": any;
	"src/scenes/GameScripts/environment.ts": any;
	"src/scenes/GameScripts/sceneScriptBase.ts": any;
	"src/scenes/MainMap/mainMap.ts": any;
	"src/scenes/scene/camera.ts": any;
	"src/scenes/scene/scene.ts": any;
	"src/scenes/ScrapBox/player.ts": any;
	"src/scenes/ScrapBox/playerCamera.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/GameScripts/connection.ts": require("./GameScripts/connection"),
	"src/scenes/GameScripts/environment.ts": require("./GameScripts/environment"),
	"src/scenes/GameScripts/sceneScriptBase.ts": require("./GameScripts/sceneScriptBase"),
	"src/scenes/MainMap/mainMap.ts": require("./MainMap/mainMap"),
	"src/scenes/scene/camera.ts": require("./scene/camera"),
	"src/scenes/scene/scene.ts": require("./scene/scene"),
	"src/scenes/ScrapBox/player.ts": require("./ScrapBox/player"),
	"src/scenes/ScrapBox/playerCamera.ts": require("./ScrapBox/playerCamera"),
}
