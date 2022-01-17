import { Camera, PostProcessRenderPipeline, Scene } from '@babylonjs/core';
export declare class MSSAOPipeline extends PostProcessRenderPipeline {
    private _scene;
    private _originalColorPostProcess;
    private _ssaoPostProcess;
    private _compositePostProcess;
    private _testPostProcess;
    private _gbuffer;
    constructor(name: string, scene: Scene, cameras?: Camera[]);
    private _createTestPostProcess;
    private _createSSAOPostProcess;
    private _createCompositePostProcess;
}
