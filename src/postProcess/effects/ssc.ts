import { Camera, Effect, GeometryBufferRenderer, PostProcess } from '@babylonjs/core';
import sscSource from './shader/ssc.frag.glsl';

export class SscPostProcess extends PostProcess {
  public constructor(name: string, geometryBufferRenderer: GeometryBufferRenderer, camera: Camera) {
    Effect.ShadersStore['sscFragmentShader'] = sscSource;
    super(name, 'ssc', [], ['normalSampler'], 1, camera);
    this.onApply = (effect: Effect) => {
      /*
       * 0: depth
       * 1: normal
       * 2: pos
       * 3: roughness
       * 4: ???
       * */
      effect.setTexture('normalSampler', geometryBufferRenderer.getGBuffer().textures[0]);
    };
  }
}
