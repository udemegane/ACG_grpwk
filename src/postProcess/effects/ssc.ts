import { Camera, Effect, GeometryBufferRenderer, PostProcess, Texture } from '@babylonjs/core';
import sscSource from './shader/ssc.frag.glsl';

export class SscPostProcess extends PostProcess {
  public constructor(name: string, geometryBufferRenderer: GeometryBufferRenderer, camera: Camera) {
    //const noiseTexture = new Texture('./texture/noise.jpg', camera.getScene());
    Effect.ShadersStore['sscFragmentShader'] = sscSource;
    super(name, 'ssc', ['texelSize'], ['normalSampler', 'depthSampler', 'positionSampler'], 1, camera);
    const depthIdx = 0;
    const normalIdx = 1;
    let positionIdx = 2;
    this.onApply = (effect: Effect) => {
      /*
       * 0: depth
       * 1: normal
       * 2: pos
       * 3: roughness
       * 4: ???
       * */
      effect.setFloat2('texelSize', 1.0 / this.width, 1.0 / this.height);
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
