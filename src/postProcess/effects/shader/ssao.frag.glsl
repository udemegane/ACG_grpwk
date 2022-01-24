precision highp float;

    // Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D depthSampler;
//uniform sampler2D normalSampler;
uniform sampler2D positionSampler;
uniform vec2 texelSize;
//uniform vec3 camForward;
float eps = 0.00000001;

float getRoughOcculusion(vec2 offset, vec3 normal, vec3 base){
    vec3 v = texture2D(positionSampler, vUV + vec2(texelSize.x * offset.x, texelSize.y * offset.y)).rgb - base;
    return max(0.0,dot(normal,v))/(dot(v,v)+eps);
}

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
/*
vec3 normalFromDepth(float depth, vec2 coords)
{
	vec2 offset1 = vec2(0.0, texelSize.y);
	vec2 offset2 = vec2(texelSize.x, 0.0);

	float depth1 = texture2D(depthSampler, coords + offset1 + eps).r;
	float depth2 = texture2D(depthSampler, coords + offset2 + eps).r;

	vec3 p1 = vec3(offset1, depth1 - depth);
	vec3 p2 = vec3(offset2, depth2 - depth);

	vec3 normal = cross(p1, p2);
	normal.z = -normal.z;

	return normalize(normal);
}
*/
void main(void) {
    vec3 pos = texture2D(positionSampler, vUV).rgb;
    //vec3 normalTrans = vec3(1.0,0.0,0.0) - camForward;
    vec3 normal = getWorldNormal(pos, vUV); //texture2D(normalSampler,vUV).rgb + normalTrans;
    float result = 0.0;
    float tmp = (
    getRoughOcculusion(vec2(3.0,3.0), normal, pos) +
    getRoughOcculusion(vec2(-3.0,3.0), normal, pos) +
    getRoughOcculusion(vec2(3.0,-3.0), normal, pos) +
    getRoughOcculusion(vec2(-3.0,-3.0), normal, pos) ) /4.0;
    result = max(0.0, 1.0 - tmp);
    /*
    vec2[4] sample = vec2[](
        vec2(3.0,3.0),
        vec2(-3.0,3.0),
        vec2(3.0,-3.0),
        vec2(-3.0,-3.0)
    );
    for(int i=0;i<SAMPLES;i++){
        vec3 sample = 
    }*/
    gl_FragColor = vec4(vec3(result),1.0);
}
