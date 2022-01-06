import { Camera, Effect, GeometryBufferRenderer, PostProcess } from '@babylonjs/core';
import ssaoSource from './shader/ssao.frag.glsl';

export class SsaoPostProcess extends PostProcess {
  public constructor(name: string, geometryBufferRenderer: GeometryBufferRenderer, camera: Camera) {
    Effect.ShadersStore['acgSsaoFragmentShader'] = ssaoSource;
    super(name, 'acgSsao', [], ['normalSampler', 'depthSampler', 'positionSampler'], 1, camera);
    const depthIdx = 0;
    const normalIdx = 1;
    let positionIdx = 2;
    this.onApply = (effect: Effect) => {
      effect.setTexture('depthSampler', geometryBufferRenderer.getGBuffer().textures[depthIdx]);
      effect.setTexture('normalSampler', geometryBufferRenderer.getGBuffer().textures[normalIdx]);
      effect.setTexture('positionSampler', geometryBufferRenderer.getGBuffer().textures[positionIdx]);
    };
    this.onBeforeRender = (effect: Effect) => {
      const currentPosIdx = geometryBufferRenderer.getTextureIndex(GeometryBufferRenderer.POSITION_TEXTURE_TYPE);
      if (positionIdx !== currentPosIdx) {
        positionIdx = currentPosIdx;
        effect.setTexture('positionSampler', geometryBufferRenderer.getGBuffer().textures[positionIdx]);
      }
    };
  }
}
