import { Camera, Effect, GeometryBufferRenderer, PostProcess } from '@babylonjs/core';
import sscSource from './ssc.frag.glsl';

export class SscPostProcess extends PostProcess {
  public constructor(name: string, geometryBufferRenderer: GeometryBufferRenderer, camera: Camera) {
    Effect.ShadersStore['sscFragmentShader'] = sscSource;
    super(name, 'ssc', ['view'], ['normalSampler', 'view'], 1, camera);
    this.onApply = (effect: Effect) => {
      effect.setTexture('normalTexture', geometryBufferRenderer.getGBuffer().textures[1]);
      effect.setMatrix('view', camera.getViewMatrix());
    };
  }
}
