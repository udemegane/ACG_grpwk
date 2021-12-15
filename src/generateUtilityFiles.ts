const main = () => {
  const fs = require('fs');
  const decorators = {
    data:
      'import { PointerEventTypes, KeyboardEventTypes } from "@babylonjs/core";\n' +
      '\n' +
      'export type VisiblityPropertyType =\n' +
      '    "number" | "string" | "boolean" |\n' +
      '    "Vector2" | "Vector3" | "Vector4" |\n' +
      '    "Color3" | "Color4" |\n' +
      '    "KeyMap";\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member visible in the inspector.\n' +
      ' * @param type the property type.\n' +
      " * @param name optional name to be shown in the editor's inspector.\n" +
      ' * @param defaultValue optional default value set in the TS code.\n' +
      ' */\n' +
      'export function visibleInInspector(type: VisiblityPropertyType, name?: string, defaultValue?: any): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._InspectorValues = ctor._InspectorValues ?? [];\n' +
      '        ctor._InspectorValues.push({\n' +
      '            type,\n' +
      '            name: name ?? propertyKey.toString(),\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '            defaultValue,\n' +
      '        });\n' +
      '    };\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member linked to a child node.\n' +
      ' * @param nodeName defines the name of the node in children to retrieve.\n' +
      ' */\n' +
      'export function fromChildren(nodeName?: string): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._ChildrenValues = ctor._ChildrenValues ?? [];\n' +
      '        ctor._ChildrenValues.push({\n' +
      '            nodeName: nodeName ?? propertyKey.toString(),\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '        });\n' +
      '    };\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member linked to a node in the scene.\n' +
      ' * @param nodeName defines the name of the node in the scene to retrieve.\n' +
      ' */\n' +
      'export function fromScene(nodeName?: string): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._SceneValues = ctor._SceneValues ?? [];\n' +
      '        ctor._SceneValues.push({\n' +
      '            nodeName: nodeName ?? propertyKey.toString(),\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '        });\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member linked to a particle system which has the current Mesh attached.\n' +
      ' * @param particleSystemname the name of the attached particle system to retrieve.\n' +
      ' */\n' +
      'export function fromParticleSystems(particleSystemname?: string): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._ParticleSystemValues = ctor._ParticleSystemValues ?? [];\n' +
      '        ctor._ParticleSystemValues.push({\n' +
      '            particleSystemName: particleSystemname ?? propertyKey.toString(),\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '        });\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member function to be called on the given pointer event is fired.\n' +
      ' * @param type the event type to listen to execute the decorated function.\n' +
      ' * @param onlyWhenMeshPicked defines wether or not the decorated function should be called only when the mesh is picked. default true.\n' +
      ' */\n' +
      'export function onPointerEvent(type: PointerEventTypes, onlyWhenMeshPicked: boolean = true): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        if (typeof(target[propertyKey]) !== "function") {\n' +
      '            throw new Error(`Decorated propery "${propertyKey.toString()}" in class "${target.constructor.name}" must be a function.`);\n' +
      '        }\n' +
      '\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._PointerValues = ctor._PointerValues ?? [];\n' +
      '        ctor._PointerValues.push({\n' +
      '            type,\n' +
      '            onlyWhenMeshPicked,\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '        });\n' +
      '    };\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Sets the decorated member function to be called on the given keyboard key(s) is/are pressed.\n' +
      ' * @param key the key or array of key to listen to execute the decorated function.\n' +
      ' */\n' +
      'export function onKeyboardEvent(key: number | number[] | string | string[], type?: KeyboardEventTypes): any {\n' +
      '    return (target: any, propertyKey: string | symbol) => {\n' +
      '        if (typeof(target[propertyKey]) !== "function") {\n' +
      '            throw new Error(`Decorated propery "${propertyKey.toString()}" in class "${target.constructor.name}" must be a function.`);\n' +
      '        }\n' +
      '\n' +
      '        const ctor = target.constructor;\n' +
      '        ctor._KeyboardValues = ctor._KeyboardValues ?? [];\n' +
      '        ctor._KeyboardValues.push({\n' +
      '            type,\n' +
      '            keys: Array.isArray(key) ? key : [key],\n' +
      '            propertyKey: propertyKey.toString(),\n' +
      '        });\n' +
      '    };\n' +
      '}\n',
    path: './scenes/decorators.ts',
  };
  const tools = {
    data:
      '/**\n' +
      ' * Generated by the Babylon.JS Editor v4.0.4\n' +
      ' */\n' +
      '\n' +
      ' import {\n' +
      '    Color3, Color4,\n' +
      '    SerializationHelper,\n' +
      '    Scene, Node, AbstractMesh, Mesh,\n' +
      '    Vector2, Vector3, Vector4, Matrix,\n' +
      '    SSAO2RenderingPipeline, DefaultRenderingPipeline, ScreenSpaceReflectionPostProcess, MotionBlurPostProcess,\n' +
      '    Nullable, EngineStore,\n' +
      '} from "@babylonjs/core";\n' +
      '\n' +
      'export type NodeScriptConstructor = (new (...args: any[]) => Node);\n' +
      'export type GraphScriptConstructor = (new (scene: Scene) => any);\n' +
      'export type ScriptMap = {\n' +
      '    [index: string]: {\n' +
      '        IsGraph?: boolean;\n' +
      '        IsGraphAttached?: boolean;\n' +
      '        default: (new (...args: any[]) => NodeScriptConstructor | GraphScriptConstructor);\n' +
      '    }\n' +
      '};\n' +
      '\n' +
      'export interface IScript {\n' +
      '    /**\n' +
      '     * Called on the node is being initialized.\n' +
      '     * This function is called immediatly after the constructor has been called.\n' +
      '     */\n' +
      '    onInitialize?(): void;\n' +
      '    /**\n' +
      '     * Called on the scene starts.\n' +
      '     */\n' +
      '    onStart?(): void;\n' +
      '    /**\n' +
      '     * Called each frame.\n' +
      '     */\n' +
      '    onUpdate?(): void;\n' +
      '    /**\n' +
      '     * Called on a message has been received and sent from a graph.\n' +
      '     * @param message defines the name of the message sent from the graph.\n' +
      '     * @param data defines the data sent in the message.\n' +
      '     * @param sender defines the reference to the graph class that sent the message.\n' +
      '     */\n' +
      '    onMessage?(name: string, data: any, sender: any): void;\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Returns wether or not the given constructor is an ES6 (or more) class.\n' +
      ' * @param ctor defines the reference to the constructor to test.\n' +
      ' * @returns wether or not the given constructor is \n' +
      ' */\n' +
      'function isEs6Class(ctor: any): boolean {\n' +
      '    try {\n' +
      '        ctor.call({});\n' +
      '        return false;\n' +
      '    } catch (e) {\n' +
      '        return true;\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Requires the nedded scripts for the given nodes array and attach them.\n' +
      ' * @param scene defines the reference to the scene that contains the given nodes.\n' +
      ' * @param scriptsMap defines the map that contains the scripts constructors ordered by script path.\n' +
      ' * @param nodes the array of nodes to attach script (if exists).\n' +
      ' */\n' +
      'function requireScriptForNodes(scene: Scene, scriptsMap: ScriptMap, nodes: (Node | Scene)[]): void {\n' +
      '    const dummyScene = new Scene(scene.getEngine(), { virtual: true });\n' +
      '    const initializedNodes: { node: Node | Scene; exports: any; }[] = [];\n' +
      '    \n' +
      '    // Initialize nodes\n' +
      '    for (const n of nodes as ((Scene | Node) & IScript)[]) {\n' +
      '        if (!n.metadata || !n.metadata.script || !n.metadata.script.name || n.metadata.script.name === "None") { continue; }\n' +
      '        \n' +
      '        const exports = scriptsMap[n.metadata.script.name];\n' +
      '        if (!exports) { continue; }\n' +
      '\n' +
      '        const scene = n instanceof Scene ? n : n.getScene();\n' +
      '\n' +
      '        // Get prototype.\n' +
      '        let prototype = exports.default.prototype;\n' +
      '\n' +
      '        // Call constructor\n' +
      '        if (isEs6Class(prototype.constructor)) {\n' +
      '            const currentScene = EngineStore.LastCreatedScene;\n' +
      '            EngineStore._LastCreatedScene = dummyScene;\n' +
      '\n' +
      '            const clone = Reflect.construct(prototype.constructor.bind(n), []);\n' +
      '            Reflect.setPrototypeOf(n, clone.constructor.prototype);\n' +
      '\n' +
      '            EngineStore._LastCreatedScene = currentScene;\n' +
      '\n' +
      '            for (const key in clone) {\n' +
      '                if (!Reflect.has(n, key)) {\n' +
      '                    n[key] = clone[key];\n' +
      '                }\n' +
      '            }\n' +
      '\n' +
      '            clone.dispose();\n' +
      '        } else {\n' +
      '            if (exports.IsGraph) {\n' +
      '                exports.IsGraphAttached = true;\n' +
      '                prototype.constructor.call(n, scene, n);\n' +
      '            } else {\n' +
      '                prototype.constructor.call(n);\n' +
      '            }\n' +
      '\n' +
      '            // Add prototype\n' +
      '            do {\n' +
      '                for (const key in prototype) {\n' +
      '                    if (!prototype.hasOwnProperty(key) || key === "constructor") { continue; }\n' +
      '                    n[key] = prototype[key].bind(n);\n' +
      '                }\n' +
      '\n' +
      '                prototype = Object.getPrototypeOf(prototype);\n' +
      '            } while (prototype.constructor?.IsComponent === true);\n' +
      '        }\n' +
      '\n' +
      '        // Call onInitialize\n' +
      '        n.onInitialize?.call(n);\n' +
      '\n' +
      '        initializedNodes.push({ node: n, exports });\n' +
      '    }\n' +
      '\n' +
      '    // Configure initialized nodes\n' +
      '    for (const i of initializedNodes) {\n' +
      '        const n = i.node as (Scene | Node) & IScript;\n' +
      '        const e = i.exports;\n' +
      '        const scene = i.node instanceof Scene ? i.node : i.node.getScene();\n' +
      '\n' +
      '        // Check start\n' +
      '        if (n.onStart) {\n' +
      '            let startObserver = scene.onBeforeRenderObservable.addOnce(() => {\n' +
      '                startObserver = null!;\n' +
      '                n.onStart();\n' +
      '            });\n' +
      '\n' +
      '            n.onDisposeObservable.addOnce(() => {\n' +
      '                if (startObserver) {\n' +
      '                    scene.onBeforeRenderObservable.remove(startObserver);\n' +
      '                }\n' +
      '            });\n' +
      '        }\n' +
      '\n' +
      '        // Check update\n' +
      '        if (n.onUpdate) {\n' +
      '            const updateObserver = scene.onBeforeRenderObservable.add(() => n.onUpdate());\n' +
      '            n.onDisposeObservable.addOnce(() => scene.onBeforeRenderObservable.remove(updateObserver));\n' +
      '        }\n' +
      '\n' +
      '        // Check properties\n' +
      '        const properties = n.metadata.script.properties ?? { };\n' +
      '        for (const key in properties) {\n' +
      '            const p = properties[key];\n' +
      '\n' +
      '            switch (p.type) {\n' +
      '                case "Vector2": n[key] = new Vector2(p.value.x, p.value.y); break;\n' +
      '                case "Vector3": n[key] = new Vector3(p.value.x, p.value.y, p.value.z); break;\n' +
      '                case "Vector4": n[key] = new Vector4(p.value.x, p.value.y, p.value.z, p.value.w); break;\n' +
      '\n' +
      '                case "Color3": n[key] = new Color3(p.value.r, p.value.g, p.value.b); break;\n' +
      '                case "Color4": n[key] = new Color4(p.value.r, p.value.g, p.value.b, p.value.a); break;\n' +
      '\n' +
      '                default: n[key] = p.value; break;\n' +
      '            }\n' +
      '        }\n' +
      '\n' +
      '        // Check linked children.\n' +
      '        if (n instanceof Node) {\n' +
      '            const childrenLinks = (e.default as any)._ChildrenValues ?? [];\n' +
      '            for (const link of childrenLinks) {\n' +
      '                const child = n.getChildren((node => node.name === link.nodeName), true)[0];\n' +
      '                n[link.propertyKey] = child;\n' +
      '            }\n' +
      '        }\n' +
      '\n' +
      '        // Check linked nodes from scene.\n' +
      '        const sceneLinks = (e.default as any)._SceneValues ?? [];\n' +
      '        for (const link of sceneLinks) {\n' +
      '            const node = scene.getNodeByName(link.nodeName);\n' +
      '            n[link.propertyKey] = node;\n' +
      '        }\n' +
      '\n' +
      '        // Check particle systems\n' +
      '        const particleSystemLinks = (e.default as any)._ParticleSystemValues ?? [];\n' +
      '        for (const link of particleSystemLinks) {\n' +
      '            const ps = scene.particleSystems.filter((ps) => ps.emitter === n && ps.name === link.particleSystemName)[0];\n' +
      '            n[link.propertyKey] = ps;\n' +
      '        }\n' +
      '\n' +
      '        // Check pointer events\n' +
      '        const pointerEvents = (e.default as any)._PointerValues ?? [];\n' +
      '        for (const event of pointerEvents) {\n' +
      '            scene.onPointerObservable.add((e) => {\n' +
      '                if (e.type !== event.type) { return; }\n' +
      '                if (!event.onlyWhenMeshPicked) { return n[event.propertyKey](e); }\n' +
      '\n' +
      '                if (e.pickInfo?.pickedMesh === n) {\n' +
      '                    n[event.propertyKey](e);\n' +
      '                }\n' +
      '            });\n' +
      '        }\n' +
      '\n' +
      '        // Check keyboard events\n' +
      '        const keyboardEvents = (e.default as any)._KeyboardValues ?? [];\n' +
      '        for (const event of keyboardEvents) {\n' +
      '            scene.onKeyboardObservable.add((e) => {\n' +
      '                if (event.type && e.type !== event.type) { return; }\n' +
      '\n' +
      '                if (!event.keys.length) { return n[event.propertyKey](e); }\n' +
      '\n' +
      '                if (event.keys.indexOf(e.event.keyCode) !== -1 || event.keys.indexOf(e.event.key) !== -1) {\n' +
      '                    n[event.propertyKey](e);\n' +
      '                }\n' +
      '            });\n' +
      '        }\n' +
      '\n' +
      '        // Retrieve impostors\n' +
      '        if (n instanceof AbstractMesh && !n.physicsImpostor) {\n' +
      '            n.physicsImpostor = n._scene.getPhysicsEngine()?.getImpostorForPhysicsObject(n);\n' +
      '        }\n' +
      '\n' +
      '        delete n.metadata.script;\n' +
      '    }\n' +
      '\n' +
      '    dummyScene.dispose();\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Works as an helper, this will:\n' +
      ' * = attach scripts on objects.\n' +
      ' * @param scene the scene to attach scripts, etc.\n' +
      ' */\n' +
      'export async function runScene(scene: Scene, rootUrl?: string): Promise<void> {\n' +
      '    const scriptsMap = require("./scripts-map").scriptsMap;\n' +
      '\n' +
      '    // Attach scripts to objects in scene.\n' +
      '    attachScripts(scriptsMap, scene);\n' +
      '\n' +
      '    // Configure post-processes\n' +
      '    configurePostProcesses(scene, rootUrl);\n' +
      '\n' +
      '    // Rendering groups\n' +
      '    setupRenderingGroups(scene);\n' +
      '\n' +
      '    // Pose matrices\n' +
      '    applyMeshesPoseMatrices(scene);\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Attaches all available scripts on nodes of the given scene.\n' +
      ' * @param scene the scene reference that contains the nodes to attach scripts.\n' +
      ' */\n' +
      'export function attachScripts(scriptsMap: ScriptMap, scene: Scene): void {\n' +
      '    requireScriptForNodes(scene, scriptsMap, scene.meshes);\n' +
      '    requireScriptForNodes(scene, scriptsMap, scene.lights);\n' +
      '    requireScriptForNodes(scene, scriptsMap, scene.cameras);\n' +
      '    requireScriptForNodes(scene, scriptsMap, scene.transformNodes);\n' +
      '    requireScriptForNodes(scene, scriptsMap, [scene]);\n' +
      '\n' +
      '    // Graphs\n' +
      '    for (const scriptKey in scriptsMap) {\n' +
      '        const script = scriptsMap[scriptKey];\n' +
      '        if (script.IsGraph && !script.IsGraphAttached) {\n' +
      '            const instance = new script.default(scene);\n' +
      '            scene.executeWhenReady(() => instance["onStart"]());\n' +
      '            scene.onBeforeRenderObservable.add(() => instance["onUpdate"]());\n' +
      '        }\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Setups the rendering groups for meshes in the given scene.\n' +
      ' * @param scene defines the scene containing the meshes to configure their rendering group Ids.\n' +
      ' */\n' +
      'export function setupRenderingGroups(scene: Scene): void {\n' +
      '    scene.meshes.forEach((m) => {\n' +
      '        if (!m.metadata || !(m instanceof Mesh)) { return; }\n' +
      '        m.renderingGroupId = m.metadata.renderingGroupId ?? m.renderingGroupId;\n' +
      '    });\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      " * Meshes using pose matrices with skeletons can't be parsed directly as the pose matrix is\n" +
      ' * missing from the serialzied data of meshes. These matrices are stored in the meshes metadata\n' +
      ' * instead and can be applied by calling this function.\n' +
      ' * @param scene defines the scene containing the meshes to configure their pose matrix.\n' +
      ' */\n' +
      'export function applyMeshesPoseMatrices(scene: Scene): void {\n' +
      '    scene.meshes.forEach((m) => {\n' +
      '        if (m.skeleton && m.metadata?.basePoseMatrix) {\n' +
      '            m.updatePoseMatrix(Matrix.FromArray(m.metadata.basePoseMatrix));\n' +
      '            delete m.metadata.basePoseMatrix;\n' +
      '        }\n' +
      '    })\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      " * Attaches the a script at runtime to the given node according to the given script's path.\n" +
      ' * @param scriptPath defines the path to the script to attach (available as a key in the exported "scriptsMap" map).\n' +
      ' * @param object defines the reference to the object (node or scene) to attach the script to.\n' +
      ' */\n' +
      'export function attachScriptToNodeAtRuntime(scriptPath: string, object: Node | Scene): any {\n' +
      '    const scriptsMap = require("./scripts-map").scriptsMap;\n' +
      '\n' +
      '    object.metadata = object.metadata ?? { };\n' +
      '    object.metadata.script = object.metadata.script ?? { };\n' +
      '    object.metadata.script.name = scriptPath;\n' +
      '\n' +
      '    requireScriptForNodes(object instanceof Scene ? object : object.getScene(), scriptsMap, [object]);\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Defines the reference to the SSAO2 rendering pipeline.\n' +
      ' */\n' +
      'export let ssao2RenderingPipelineRef: Nullable<SSAO2RenderingPipeline> = null;\n' +
      '/**\n' +
      ' * Defines the reference to the SSR post-process.\n' +
      ' */\n' +
      'export let screenSpaceReflectionPostProcessRef: Nullable<ScreenSpaceReflectionPostProcess> = null;\n' +
      '/**\n' +
      ' * Defines the reference to the default rendering pipeline.\n' +
      ' */\n' +
      'export let defaultRenderingPipelineRef: Nullable<DefaultRenderingPipeline> = null;\n' +
      '/**\n' +
      ' * Defines the reference to the motion blur post-process.\n' +
      ' */\n' +
      'export let motionBlurPostProcessRef: Nullable<MotionBlurPostProcess> = null;\n' +
      '\n' +
      '/**\n' +
      ' * Configures and attaches the post-processes of the given scene.\n' +
      ' * @param scene the scene where to create the post-processes and attach to its cameras.\n' +
      ' * @param rootUrl the root Url where to find extra assets used by pipelines. Should be the same as the scene.\n' +
      ' */\n' +
      'export function configurePostProcesses(scene: Scene, rootUrl: string = null): void {\n' +
      '    if (rootUrl === null || !scene.metadata?.postProcesses) { return; }\n' +
      '\n' +
      '    // Load  post-processes configuration\n' +
      '    const data = scene.metadata.postProcesses;\n' +
      '\n' +
      '    if (data.ssao && !ssao2RenderingPipelineRef) {\n' +
      '        ssao2RenderingPipelineRef = SSAO2RenderingPipeline.Parse(data.ssao.json, scene, rootUrl);\n' +
      '        if (data.ssao.enabled) {\n' +
      '            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(ssao2RenderingPipelineRef.name, scene.cameras);\n' +
      '        }\n' +
      '    }\n' +
      '\n' +
      '    if (data.screenSpaceReflections?.json && !screenSpaceReflectionPostProcessRef) {\n' +
      '        screenSpaceReflectionPostProcessRef = ScreenSpaceReflectionPostProcess._Parse(data.screenSpaceReflections.json, scene.activeCamera!, scene, "");\n' +
      '    }\n' +
      '\n' +
      '    if (data.default && !defaultRenderingPipelineRef) {\n' +
      '        defaultRenderingPipelineRef = DefaultRenderingPipeline.Parse(data.default.json, scene, rootUrl);\n' +
      '        if (!data.default.enabled) {\n' +
      '            scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(defaultRenderingPipelineRef.name, scene.cameras);\n' +
      '        }\n' +
      '    }\n' +
      '\n' +
      '    if (data.motionBlur?.json) {\n' +
      '        motionBlurPostProcessRef = MotionBlurPostProcess._Parse(data.motionBlur.json, scene.activeCamera!, scene, "");\n' +
      '    }\n' +
      '\n' +
      '    scene.onDisposeObservable.addOnce(() => {\n' +
      '        ssao2RenderingPipelineRef = null;\n' +
      '        screenSpaceReflectionPostProcessRef = null;\n' +
      '        defaultRenderingPipelineRef = null;\n' +
      '        motionBlurPostProcessRef = null;\n' +
      '    });\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Overrides the texture parser.\n' +
      ' */\n' +
      '(function overrideTextureParser(): void {\n' +
      '    const textureParser = SerializationHelper._TextureParser;\n' +
      '    SerializationHelper._TextureParser = (sourceProperty, scene, rootUrl) => {\n' +
      '        if (sourceProperty.isCube && !sourceProperty.isRenderTarget && sourceProperty.files && sourceProperty.metadata?.isPureCube) {\n' +
      '            sourceProperty.files.forEach((f, index) => {\n' +
      '                sourceProperty.files[index] = rootUrl + f;\n' +
      '            });\n' +
      '        }\n' +
      '\n' +
      '        const texture = textureParser.call(SerializationHelper, sourceProperty, scene, rootUrl);\n' +
      '\n' +
      '        if (sourceProperty.url) {\n' +
      '            texture.url = rootUrl + sourceProperty.url;\n' +
      '        }\n' +
      '\n' +
      '        return texture;\n' +
      '    };\n' +
      '})();\n' +
      '\n' +
      '/**\n' +
      ' * @deprecated will be moved to "./decorators.ts".\n' +
      ' */\n' +
      'export * from "./decorators";\n',
    path: './scenes/tools.ts',
  };
  const scriptsmap = {
    data:
      'import { ScriptMap } from "./tools";\n' +
      '\n' +
      '/**\n' +
      ' * Defines the interface that exposes all exported scripts in this project.\n' +
      ' */\n' +
      'export interface ISceneScriptMap extends ScriptMap {\n' +
      '\t"src/scenes/GameScripts/gameManager.ts": any;\n' +
      '\t"src/scenes/GameScripts/sceneScriptBase.ts": any;\n' +
      '\t"src/scenes/MainMap/mainMap.ts": any;\n' +
      '\t"src/scenes/scene/camera.ts": any;\n' +
      '\t"src/scenes/scene/scene.ts": any;\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      ' * Defines the map of all available scripts in the project.\n' +
      ' */\n' +
      'export const scriptsMap: ISceneScriptMap = {\n' +
      '\t"src/scenes/GameScripts/gameManager.ts": require("./GameScripts/gameManager"),\n' +
      '\t"src/scenes/GameScripts/sceneScriptBase.ts": require("./GameScripts/sceneScriptBase"),\n' +
      '\t"src/scenes/MainMap/mainMap.ts": require("./MainMap/mainMap"),\n' +
      '\t"src/scenes/scene/camera.ts": require("./scene/camera"),\n' +
      '\t"src/scenes/scene/scene.ts": require("./scene/scene"),\n' +
      '}\n',
    path: './scenes/scripts-map.ts',
  };

  const index = {
    data:
      '/**\n' +
      ' * Generated by the Babylon.JS Editor v${editor-version}\n' +
      ' */\n' +
      '\n' +
      'import { Node, Scene } from "@babylonjs/core";\n' +
      'import {\n' +
      '    attachScripts, attachScriptToNodeAtRuntime,\n' +
      '    configurePostProcesses, setupRenderingGroups,\n' +
      '    applyMeshesPoseMatrices,\n' +
      '} from "../tools";\n' +
      '\n' +
      'import { scriptsMap } from "../scripts-map";\n' +
      '\n' +
      '/**\n' +
      ' * Works as an helper, this will:\n' +
      ' * = attach scripts on objects.\n' +
      ' * @param scene the scene to attach scripts, etc.\n' +
      ' */\n' +
      'export async function runScene(scene: Scene, rootUrl?: string): Promise<void> {\n' +
      '    // Attach scripts to objects in scene.\n' +
      '    attachScripts(scriptsMap, scene);\n' +
      '\n' +
      '    // Configure post-processes\n' +
      '    configurePostProcesses(scene, rootUrl);\n' +
      '\n' +
      '    // Rendering groups\n' +
      '    setupRenderingGroups(scene);\n' +
      '\n' +
      '    // Pose matrices\n' +
      '    applyMeshesPoseMatrices(scene);\n' +
      '}\n' +
      '\n' +
      '/**\n' +
      " * Attaches the a script at runtime to the given node according to the given script's path.\n" +
      ' * @param scriptPath defines the path to the script to attach (available as a key in the exported "scriptsMap" map).\n' +
      ' * @param object defines the reference to the object (node or scene) to attach the script to.\n' +
      ' */\n' +
      'export function attachScriptToObjectImmediately(scriptPath: string, object: Node | Scene): void {\n' +
      '    attachScriptToNodeAtRuntime(scriptPath, object);\n' +
      '}\n',
    path: './scenes/',
  };
  const scenesDirPath = '../scenes';
  const fileSrc = [decorators, tools, scriptsmap];

  // add filesource for each scene
  fs.readdirSync(scenesDirPath, { withFileTypes: true })
    .filter((entry) => !entry.isFile())
    .map(({ name }) => name)
    .map((name) => {
      fileSrc.push({ data: index.data, path: `${index.path}${name}/index.ts` });
    });

  fileSrc.map((file) => {
    fs.writeFile(file.path, file.data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`write ${file.path}`);
      }
    });
  });
};
main();
