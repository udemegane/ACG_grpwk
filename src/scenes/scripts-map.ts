import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/GameScripts/connection.ts": any;
	"src/scenes/GameScripts/environment.ts": any;
	"src/scenes/GameScripts/protobuf/backapi_pb2.ts": any;
	"src/scenes/GameScripts/protobuf/compiled_pb2.ts": any;
	"src/scenes/GameScripts/protobuf/websocket_pb2.ts": any;
	"src/scenes/GameScripts/sceneScriptBase.ts": any;
	"src/scenes/MainMap/camera.ts": any;
	"src/scenes/MainMap/cameramove.ts": any;
	"src/scenes/MainMap/damage.ts": any;
	"src/scenes/MainMap/enemy.ts": any;
	"src/scenes/MainMap/enemy.ts.ts": any;
	"src/scenes/MainMap/mainMap.ts": any;
	"src/scenes/MainMap/move.ts": any;
	"src/scenes/scene/camera.ts": any;
	"src/scenes/scene/scene.ts": any;
	"src/scenes/ScrapBox/player.ts": any;
	"src/scenes/ScrapBox/playerCamera.ts": any;
	"src/scenes/welcomescene/move_camera1.ts": any;
	"src/scenes/welcomescene/move_camera2.ts": any;
	"src/scenes/welcomescene/object_camera1.ts": any;
	"src/scenes/welcomescene/object_camera2.ts": any;
	"src/scenes/welcomescene/particle.ts": any;
	"src/scenes/welcomescene/text.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/GameScripts/connection.ts": require("./GameScripts/connection"),
	"src/scenes/GameScripts/environment.ts": require("./GameScripts/environment"),
	"src/scenes/GameScripts/protobuf/backapi_pb2.ts": require("./GameScripts/protobuf/backapi_pb2"),
	"src/scenes/GameScripts/protobuf/compiled_pb2.ts": require("./GameScripts/protobuf/compiled_pb2"),
	"src/scenes/GameScripts/protobuf/websocket_pb2.ts": require("./GameScripts/protobuf/websocket_pb2"),
	"src/scenes/GameScripts/sceneScriptBase.ts": require("./GameScripts/sceneScriptBase"),
	"src/scenes/MainMap/camera.ts": require("./MainMap/camera"),
	"src/scenes/MainMap/cameramove.ts": require("./MainMap/cameramove"),
	"src/scenes/MainMap/damage.ts": require("./MainMap/damage"),
	"src/scenes/MainMap/enemy.ts": require("./MainMap/enemy"),
	"src/scenes/MainMap/enemy.ts.ts": require("./MainMap/enemy.ts"),
	"src/scenes/MainMap/mainMap.ts": require("./MainMap/mainMap"),
	"src/scenes/MainMap/move.ts": require("./MainMap/move"),
	"src/scenes/scene/camera.ts": require("./scene/camera"),
	"src/scenes/scene/scene.ts": require("./scene/scene"),
	"src/scenes/ScrapBox/player.ts": require("./ScrapBox/player"),
	"src/scenes/ScrapBox/playerCamera.ts": require("./ScrapBox/playerCamera"),
	"src/scenes/welcomescene/move_camera1.ts": require("./welcomescene/move_camera1"),
	"src/scenes/welcomescene/move_camera2.ts": require("./welcomescene/move_camera2"),
	"src/scenes/welcomescene/object_camera1.ts": require("./welcomescene/object_camera1"),
	"src/scenes/welcomescene/object_camera2.ts": require("./welcomescene/object_camera2"),
	"src/scenes/welcomescene/particle.ts": require("./welcomescene/particle"),
	"src/scenes/welcomescene/text.ts": require("./welcomescene/text"),
}
