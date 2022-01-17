import { Engine, PostProcess, Texture } from '@babylonjs/core';
export default class PassTexturePostprocess extends PostProcess {
    constructor(name: string, ratio: number, texture?: Texture, postprocess?: PostProcess, engine?: Engine);
}
