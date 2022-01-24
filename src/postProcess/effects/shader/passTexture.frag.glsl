precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D targetSampler;

void main(void){
    gl_FragColor = texture2D(targetSampler, vUV);
}