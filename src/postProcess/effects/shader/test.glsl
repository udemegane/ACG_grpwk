precision highp float;
uniform vec3 vEyePosition;
uniform float alpha;
varying vec3 vPositionW;

#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
void main(void) {
    #include<clipPlaneFragment>
    vec3 viewDirectionW = normalize(vEyePosition - vPositionW);
    #ifdef NORMAL
    vec3 normalW = normalize(vNormalW);
    #else
    vec3 normalW = vec3(1.0, 1.0, 1.0);
    #endif
    vec3 diffuseBase = vec3(1., 1., 1.);
    lightingInfo info;
    float shadow = 1.;
    float glossiness = 0.;
    #include<lightFragment>[0..1]
    vec4 color = vec4(1., 0., 0., (1.0 - clamp(shadow, 0., 1.)) * alpha);
    #include<fogFragment>
    gl_FragColor = color;
}
