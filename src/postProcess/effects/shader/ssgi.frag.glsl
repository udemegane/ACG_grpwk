precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D originalColorSampler;
uniform sampler2D positionSampler;
uniform vec2 texelSize;
float eps = 0.00000001;
vec3 getWorldNormal(vec3 pos, vec2 coords) {
    vec2 offset1 = vec2(0.0, texelSize.y * 10.0);
    vec2 offset2 = vec2(texelSize.x * 10.0, 0.0);

    vec3 pos1 = texture2D(positionSampler, coords + offset1).rgb;
    vec3 pos2 = texture2D(positionSampler, coords + offset2).rgb;
    vec3 p1 = pos1 - pos;
    vec3 p2 = pos2 - pos;
    vec3 normal = cross(p1, p2) + eps;
    return normalize(normal);
}

void main(void) {
    //gl_FragColor = texture2D(positionSampler, vUV);
    vec3 normal = getWorldNormal(texture2D(positionSampler, vUV).rgb, vUV);

    if(vUV.x < 0.5) {
        gl_FragColor = texture2D(originalColorSampler, vUV);
    } else if(vUV.x < 0.75) {
        gl_FragColor = vec4(normal, 1.0);
    } else {
        gl_FragColor = texture2D(positionSampler, vUV);
    }

}