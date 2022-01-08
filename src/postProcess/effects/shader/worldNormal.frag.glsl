precision highp float;

varying vec2 vUV;
uniform sampler2D positionSampler;
uniform vec2 texelSize;

vec3 getWorldNormal(vec3 pos, vec2 coords){
    vec2 offset1 = vec2(0.0, texelSize.y);
	vec2 offset2 = vec2(texelSize.x, 0.0);

    vec3 pos1 = texture2D(positionSampler, coords + offset1).rgb;
	vec3 pos2 = texture2D(positionSampler, coords + offset2).rgb;
    vec3 p1 = pos1 - pos;
	vec3 p2 = pos2 - pos;
    vec3 normal = cross(p1,p2);
    return normalize(normal);
}

void main(void){
    gl_FragColor = vec4(getWorldNormal(texture2D(positionSampler, vUV).rgb,vUV),1.0);
}