import { Effect, Engine, PostProcess, Texture } from '@babylonjs/core';
import { ThinTexture } from '@babylonjs/core/Materials/Textures/thinTexture';
import passTexSource from './shader/passTexture.frag.glsl';

export default class PassTexturePostprocess extends PostProcess {
  public constructor(name: string, ratio: number, texture?: Texture, postprocess?: PostProcess, engine?: Engine) {
    Effect.ShadersStore['passTexFragmentShader'] = passTexSource;
    if (texture === null && postprocess === null) {
      console.error('Either texture or postprocess is required');
    }

    if (texture === null) {
      super(name, 'passTex', [], ['targetSampler'], ratio, null, Texture.BILINEAR_SAMPLINGMODE, engine, false);
      this.onApply = (effect: Effect) => {
        effect.setFloat2('texelSize', 1.0 / this.width, 1.0 / this.height);
        effect.setTextureFromPostProcess('targetSampler', postprocess);
      };
    } else {
      super(
        name,
        'passTex',
        [],
        ['targetSampler'],
        ratio,
        null,
        Texture.BILINEAR_SAMPLINGMODE,
        engine,
        false,
        '',
        texture.textureType
      );
      this.onApply = (effect: Effect) => {
        effect.setFloat2('texelSize', 1.0 / this.width, 1.0 / this.height);
        effect.setTexture('targetSampler', texture);
      };
    }
  }
}
