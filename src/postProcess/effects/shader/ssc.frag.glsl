precision highp float;

    // Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D normalSampler;

uniform vec3 lightData;
uniform vec4 lightColor;
//uniform mat4 view;
// Lighting
vec3 diffuseBase = vec3(0., 0., 0.);
lightingInfo info;
#ifdef SPECULARTERM
vec3 specularBase = vec3(0., 0., 0.);
#endif
float shadow = 1.;

#ifdef LIGHTMAP
vec3 lightmapColor = texture2D(lightmapSampler, vLightmapUV + uvOffset).rgb * vLightmapInfos.y;
#endif

#include<lightFragment>[0..maxSimultaneousLights]

void main(void) {
    //vec3 norm = (vec4(texture2D(textureSampler, vUV).rgb, 1.0) * view).rgb;
    //vec4 lightPower = vec4(lightData, 1.0);
    gl_FragColor = vec4(diffuseBase, 1.0); //texture2D(normalSampler, vUV) / 255.0;
}
