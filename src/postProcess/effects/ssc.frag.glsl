precision highp float;
varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D normalSampler;

uniform mat4 view;

void main() {
    vec4 baseColor = texture2D(normalSampler, vUV);
    vec3 norm = (vec4(texture2D(textureSampler, vUV).rgb, 1.0) * view).rgb;

    gl_FragColor = vec4(baseColor.rgb, 1.0);
}
