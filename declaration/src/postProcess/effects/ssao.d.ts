import { Camera, GeometryBufferRenderer, PostProcess } from '@babylonjs/core';
export declare class SsaoPostProcess extends PostProcess {
    constructor(name: string, geometryBufferRenderer: GeometryBufferRenderer, camera: Camera);
}
