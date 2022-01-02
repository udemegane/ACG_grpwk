precision highp float;

    // Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D normalSampler;

//uniform mat4 view;

void main(void) {
    //vec3 norm = (vec4(texture2D(textureSampler, vUV).rgb, 1.0) * view).rgb;
    gl_FragColor = texture2D(normalSampler, vUV) * 1.0;
}
