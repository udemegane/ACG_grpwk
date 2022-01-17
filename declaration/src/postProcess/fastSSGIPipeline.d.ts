import { Camera, PostProcessRenderPipeline, Scene } from '@babylonjs/core';
export declare class FastSSGIPipeline extends PostProcessRenderPipeline {
    private _scene;
    private _randomTexture;
    private _originalColorPostProcess;
    private _downSampledOriginalColorPostProcess;
    private _downSampledPositionPostProcess;
    private _ssgiPostProcess;
    private _compositePostProcess;
    private _testPostProcess;
    private _blurHPostProcess;
    private _blurVPostProcess;
    private _gbuffer;
    private _textureCache;
    private _downSampleRatio;
    constructor(name: string, scene: Scene, cameras?: Camera[]);
    private ssgiStart;
    private ssgiEnd;
    private start;
    private end;
    private ssgiCalcTime;
    private ssgiGlobalTime;
    getPerformance(): {
        ssgipp: any;
        ssgiline: any;
    };
    private _createBlurPostProcess;
    private _createSSGIPostProcess;
    private _createTestPostProcess;
    private _createCompositePostProcess;
    private _createRandomTexture;
}
