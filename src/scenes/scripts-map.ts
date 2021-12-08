import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/scene/camera.ts": any;
	"src/scenes/scene/graphs/GraphTest.ts": any;
	"src/scenes/scene/scene.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/camera.ts": require("./scene/camera"),
	"src/scenes/scene/graphs/GraphTest.ts": require("./scene/graphs/GraphTest"),
	"src/scenes/scene/scene.ts": require("./scene/scene"),
}
