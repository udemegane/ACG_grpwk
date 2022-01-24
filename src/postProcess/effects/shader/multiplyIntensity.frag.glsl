precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D originalColor;

void main(void){
    gl_FragColor = texture2D(textureSampler,vUV) * texture2D(originalColor,vUV);
}