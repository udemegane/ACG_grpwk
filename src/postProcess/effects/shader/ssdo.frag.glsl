precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D depthSampler;
uniform sampler2D normalSampler;
//uniform sampler2D positionSampler;
//uniform sampler2D noiseSampler;

uniform vec2 texelSize; 
float eps = 0.000001;
/* 
float getRoughOcculusion(vec2 offset, vec3 normal, vec3 base){
    vec3 sample = texture2D(positionSampler, vUV + vec2(texelSize.x * offset.x, texelSize.y * offset.y)).rgb - base;
    return max(0.0,dot(normal,sample))/(dot(sample,sample)+eps);
}
*/

void main(){
    int SAMPLES = 4;
    float depth = texture2D(depthSampler, vUV).r;
    //vec3 pos = texture2D(positionSampler, vUV).rgb;
    vec3 normal = texture2D(normalSampler, vUV).rgb;
    float result = 0.0;
    /*
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
    }
    */

    
    gl_FragColor = vec4(vec3(result),1.0);
}