// Vertex shader
precision highp float;

//Attributes
attribute vec3 position;
attribute vec3 normal;


//Uniforms
uniform mat4 u_World;
uniform mat4 u_view;
#if defined(IGNORE) || DEBUGMODE > 0
uniform vec2 vDebugMode;
#endif
uniform vec3 ambientFromScene;
uniform mat4 u_ViewProjection;
uniform vec3 u_cameraPosition;
uniform float u_Float;
uniform float u_Float1;


//Varyings
varying vec4 v_output2;
#if defined(IGNORE) || DEBUGMODE > 0
varying vec4 vClipSpacePosition;
#endif
varying vec4 v_output3;


//PBRMetallicRoughness
#include<lightUboDeclaration>[0..maxSimultaneousLights]

//World normal
#include<helperFunctions>



//Entry point
void main(void) {

//World position
vec4 output2 = u_World * vec4(position, 1.0);

//PBRMetallicRoughness
v_output2 = output2;
vec4 worldPos = output2;
mat4 view = u_view;
#include<shadowsVertex>[0..maxSimultaneousLights]

//World normal
mat3 u_World_NUS = mat3(u_World);
#ifdef NONUNIFORMSCALING
u_World_NUS = transposeMat3(inverseMat3(u_World_NUS));
#endif
vec4 output3 = vec4(u_World_NUS * normal, 0.0);

//WorldPos
vec4 output1 = u_World * vec4(position, 1.0);

//WorldPos * ViewProjectionTransform
vec4 output0 = u_ViewProjection * output1;

//VertexOutput
gl_Position = output0;
v_output3 = output3;

#if DEBUGMODE > 0
vClipSpacePosition = gl_Position;
#endif

}

// Fragment shader

#extension GL_OES_standard_derivatives : enable

#if defined(LODBASEDMICROSFURACE)
#extension GL_EXT_shader_texture_lod : enable
#endif
precision highp float;

//Uniforms
uniform mat4 u_World;
uniform mat4 u_view;
#if defined(IGNORE) || DEBUGMODE > 0
uniform vec2 vDebugMode;
#endif
uniform vec3 ambientFromScene;
uniform mat4 u_ViewProjection;
uniform vec3 u_cameraPosition;
uniform float u_Float;
uniform float u_Float1;
uniform vec4 vLightingIntensity;
uniform float invertNormal;
uniform vec4 vMetallicReflectanceFactors;


//Samplers
uniform sampler2D environmentBrdfSampler;


//Varyings
varying vec4 v_output2;
#if defined(IGNORE) || DEBUGMODE > 0
varying vec4 vClipSpacePosition;
#endif
varying vec4 v_output3;


//PBRMetallicRoughness
#include<lightUboDeclaration>[0..maxSimultaneousLights]

//PBRMetallicRoughness
#include<helperFunctions>

//PBRMetallicRoughness
#include<importanceSampling>

//PBRMetallicRoughness
#include<pbrHelperFunctions>

//PBRMetallicRoughness
#include<imageProcessingFunctions>

//PBRMetallicRoughness
#ifdef SHADOWS
#ifndef SHADOWFLOAT

float unpack(vec4 color)
{
const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);
return dot(color,bit_shift);
}
#endif
float computeFallOff(float value,vec2 clipSpace,float frustumEdgeFalloff)
{
float mask=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));
return mix(value,1.0,mask);
}
#define inline
float computeShadowCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,vec2 depthValues)
{
vec3 directionToLight=v_output2.xyz-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadow=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadow=textureCube(shadowSampler,directionToLight).x;
#endif
return depth>shadow ? darkness : 1.0;
}
#define inline
float computeShadowWithPoissonSamplingCube(vec3 lightPosition,samplerCube shadowSampler,float mapSize,float darkness,vec2 depthValues)
{
vec3 directionToLight=v_output2.xyz-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
float visibility=1.;
vec3 poissonDisk[4];
poissonDisk[0]=vec3(-1.0,1.0,-1.0);
poissonDisk[1]=vec3(1.0,-1.0,-1.0);
poissonDisk[2]=vec3(-1.0,-1.0,-1.0);
poissonDisk[3]=vec3(1.0,-1.0,1.0);

#ifndef SHADOWFLOAT
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) visibility-=0.25;
#else
if (textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) visibility-=0.25;
#endif
return min(1.0,visibility+darkness);
}
#define inline
float computeShadowWithESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=v_output2.xyz-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);
return esm;
}
#define inline
float computeShadowWithCloseESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=v_output2.xyz-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return esm;
}
#ifdef WEBGL2
#define inline
float computeShadowCSM(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
vec3 uvLayer=vec3(uv.x,uv.y,layer);
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(texture2D(shadowSampler,uvLayer));
#else
float shadow=texture2D(shadowSampler,uvLayer).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
#endif
#define inline
float computeShadow(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(texture2D(shadowSampler,uv));
#else
float shadow=texture2D(shadowSampler,uv).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
}
#define inline
float computeShadowWithPoissonSampling(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float mapSize,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
float visibility=1.;
vec2 poissonDisk[4];
poissonDisk[0]=vec2(-0.94201624,-0.39906216);
poissonDisk[1]=vec2(0.94558609,-0.76890725);
poissonDisk[2]=vec2(-0.094184101,-0.92938870);
poissonDisk[3]=vec2(0.34495938,0.29387760);

#ifndef SHADOWFLOAT
if (unpack(texture2D(shadowSampler,uv+poissonDisk[0]*mapSize))<shadowPixelDepth) visibility-=0.25;
if (unpack(texture2D(shadowSampler,uv+poissonDisk[1]*mapSize))<shadowPixelDepth) visibility-=0.25;
if (unpack(texture2D(shadowSampler,uv+poissonDisk[2]*mapSize))<shadowPixelDepth) visibility-=0.25;
if (unpack(texture2D(shadowSampler,uv+poissonDisk[3]*mapSize))<shadowPixelDepth) visibility-=0.25;
#else
if (texture2D(shadowSampler,uv+poissonDisk[0]*mapSize).x<shadowPixelDepth) visibility-=0.25;
if (texture2D(shadowSampler,uv+poissonDisk[1]*mapSize).x<shadowPixelDepth) visibility-=0.25;
if (texture2D(shadowSampler,uv+poissonDisk[2]*mapSize).x<shadowPixelDepth) visibility-=0.25;
if (texture2D(shadowSampler,uv+poissonDisk[3]*mapSize).x<shadowPixelDepth) visibility-=0.25;
#endif
return computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(texture2D(shadowSampler,uv));
#else
float shadowMapSample=texture2D(shadowSampler,uv).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithCloseESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(texture2D(shadowSampler,uv));
#else
float shadowMapSample=texture2D(shadowSampler,uv).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#ifdef WEBGL2
#define GREATEST_LESS_THAN_ONE 0.99999994

#define inline
float computeShadowWithCSMPCF1(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(uvDepth.z,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float shadow=texture(shadowSampler,uvDepthLayer);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}



#define inline
float computeShadowWithCSMPCF3(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(uvDepth.z,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x;
uv+=0.5;
vec2 st=fract(uv);
vec2 base_uv=floor(uv)-0.5;
base_uv*=shadowMapSizeAndInverse.y;




vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}



#define inline
float computeShadowWithCSMPCF5(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(uvDepth.z,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x;
uv+=0.5;
vec2 st=fract(uv);
vec2 base_uv=floor(uv)-0.5;
base_uv*=shadowMapSizeAndInverse.y;


vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[1]),layer,uvDepth.z));
shadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[2]),layer,uvDepth.z));
shadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[2]),layer,uvDepth.z));
shadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[2]),layer,uvDepth.z));
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}

#define inline
float computeShadowWithPCF1(vec4 vPositionFromLight,float depthMetric,sampler2DShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
float shadow=texture2D(shadowSampler,uvDepth);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}



#define inline
float computeShadowWithPCF3(vec4 vPositionFromLight,float depthMetric,sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x;
uv+=0.5;
vec2 st=fract(uv);
vec2 base_uv=floor(uv)-0.5;
base_uv*=shadowMapSizeAndInverse.y;




vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z));
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}



#define inline
float computeShadowWithPCF5(vec4 vPositionFromLight,float depthMetric,sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x;
uv+=0.5;
vec2 st=fract(uv);
vec2 base_uv=floor(uv)-0.5;
base_uv*=shadowMapSizeAndInverse.y;


vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z));
shadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[0]),uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z));
shadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[1]),uvDepth.z));
shadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[2]),uvDepth.z));
shadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[2]),uvDepth.z));
shadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[2]),uvDepth.z));
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
const vec3 PoissonSamplers32[64]=vec3[64](
vec3(0.06407013,0.05409927,0.),
vec3(0.7366577,0.5789394,0.),
vec3(-0.6270542,-0.5320278,0.),
vec3(-0.4096107,0.8411095,0.),
vec3(0.6849564,-0.4990818,0.),
vec3(-0.874181,-0.04579735,0.),
vec3(0.9989998,0.0009880066,0.),
vec3(-0.004920578,-0.9151649,0.),
vec3(0.1805763,0.9747483,0.),
vec3(-0.2138451,0.2635818,0.),
vec3(0.109845,0.3884785,0.),
vec3(0.06876755,-0.3581074,0.),
vec3(0.374073,-0.7661266,0.),
vec3(0.3079132,-0.1216763,0.),
vec3(-0.3794335,-0.8271583,0.),
vec3(-0.203878,-0.07715034,0.),
vec3(0.5912697,0.1469799,0.),
vec3(-0.88069,0.3031784,0.),
vec3(0.5040108,0.8283722,0.),
vec3(-0.5844124,0.5494877,0.),
vec3(0.6017799,-0.1726654,0.),
vec3(-0.5554981,0.1559997,0.),
vec3(-0.3016369,-0.3900928,0.),
vec3(-0.5550632,-0.1723762,0.),
vec3(0.925029,0.2995041,0.),
vec3(-0.2473137,0.5538505,0.),
vec3(0.9183037,-0.2862392,0.),
vec3(0.2469421,0.6718712,0.),
vec3(0.3916397,-0.4328209,0.),
vec3(-0.03576927,-0.6220032,0.),
vec3(-0.04661255,0.7995201,0.),
vec3(0.4402924,0.3640312,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.)
);
const vec3 PoissonSamplers64[64]=vec3[64](
vec3(-0.613392,0.617481,0.),
vec3(0.170019,-0.040254,0.),
vec3(-0.299417,0.791925,0.),
vec3(0.645680,0.493210,0.),
vec3(-0.651784,0.717887,0.),
vec3(0.421003,0.027070,0.),
vec3(-0.817194,-0.271096,0.),
vec3(-0.705374,-0.668203,0.),
vec3(0.977050,-0.108615,0.),
vec3(0.063326,0.142369,0.),
vec3(0.203528,0.214331,0.),
vec3(-0.667531,0.326090,0.),
vec3(-0.098422,-0.295755,0.),
vec3(-0.885922,0.215369,0.),
vec3(0.566637,0.605213,0.),
vec3(0.039766,-0.396100,0.),
vec3(0.751946,0.453352,0.),
vec3(0.078707,-0.715323,0.),
vec3(-0.075838,-0.529344,0.),
vec3(0.724479,-0.580798,0.),
vec3(0.222999,-0.215125,0.),
vec3(-0.467574,-0.405438,0.),
vec3(-0.248268,-0.814753,0.),
vec3(0.354411,-0.887570,0.),
vec3(0.175817,0.382366,0.),
vec3(0.487472,-0.063082,0.),
vec3(-0.084078,0.898312,0.),
vec3(0.488876,-0.783441,0.),
vec3(0.470016,0.217933,0.),
vec3(-0.696890,-0.549791,0.),
vec3(-0.149693,0.605762,0.),
vec3(0.034211,0.979980,0.),
vec3(0.503098,-0.308878,0.),
vec3(-0.016205,-0.872921,0.),
vec3(0.385784,-0.393902,0.),
vec3(-0.146886,-0.859249,0.),
vec3(0.643361,0.164098,0.),
vec3(0.634388,-0.049471,0.),
vec3(-0.688894,0.007843,0.),
vec3(0.464034,-0.188818,0.),
vec3(-0.440840,0.137486,0.),
vec3(0.364483,0.511704,0.),
vec3(0.034028,0.325968,0.),
vec3(0.099094,-0.308023,0.),
vec3(0.693960,-0.366253,0.),
vec3(0.678884,-0.204688,0.),
vec3(0.001801,0.780328,0.),
vec3(0.145177,-0.898984,0.),
vec3(0.062655,-0.611866,0.),
vec3(0.315226,-0.604297,0.),
vec3(-0.780145,0.486251,0.),
vec3(-0.371868,0.882138,0.),
vec3(0.200476,0.494430,0.),
vec3(-0.494552,-0.711051,0.),
vec3(0.612476,0.705252,0.),
vec3(-0.578845,-0.768792,0.),
vec3(-0.772454,-0.090976,0.),
vec3(0.504440,0.372295,0.),
vec3(0.155736,0.065157,0.),
vec3(0.391522,0.849605,0.),
vec3(-0.620106,-0.328104,0.),
vec3(0.789239,-0.419965,0.),
vec3(-0.545396,0.538133,0.),
vec3(-0.178564,-0.596057,0.)
);





#define inline
float computeShadowWithCSMPCSS(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(uvDepth.z,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=texture(depthSampler,vec3(uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer)).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
if (numBlocker<1.0) {
return 1.0;
}
else
{
float avgBlockerDepth=sumBlockerDepth/numBlocker;

float AAOffset=shadowMapSizeInverse*10.;


float penumbraRatio=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);
vec4 filterRadius=vec4(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec4 offset=vec4(poissonSamplers[i],0.);

offset=vec4(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);
shadow+=texture2D(shadowSampler,uvDepthLayer+offset*filterRadius);
}
shadow/=float(pcfTapCount);

shadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));

shadow=mix(darkness,1.,shadow);

return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}





#define inline
float computeShadowWithPCSS(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=texture(depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy)).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
if (numBlocker<1.0) {
return 1.0;
}
else
{
float avgBlockerDepth=sumBlockerDepth/numBlocker;

float AAOffset=shadowMapSizeInverse*10.;


float penumbraRatio=((depthMetric-avgBlockerDepth)+AAOffset);
float filterRadius=penumbraRatio*lightSizeUV*shadowMapSizeInverse;
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec3 offset=poissonSamplers[i];

offset=vec3(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);
shadow+=texture2D(shadowSampler,uvDepth+offset*filterRadius);
}
shadow/=float(pcfTapCount);

shadow=mix(shadow,1.,depthMetric-avgBlockerDepth);

shadow=mix(darkness,1.,shadow);

return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
}
#define inline
float computeShadowWithPCSS16(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS32(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS64(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);
}
#define inline
float computeShadowWithCSMPCSS16(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS32(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS64(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#endif
#endif

//PBRMetallicRoughness

struct preLightingInfo
{

vec3 lightOffset;
float lightDistanceSquared;
float lightDistance;

float attenuation;

vec3 L;
vec3 H;
float NdotV;
float NdotLUnclamped;
float NdotL;
float VdotH;
float roughness;
};
preLightingInfo computePointAndSpotPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;

result.lightOffset=lightData.xyz-v_output2.xyz;
result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);

result.lightDistance=sqrt(result.lightDistanceSquared);

result.L=normalize(result.lightOffset);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeDirectionalPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;

result.lightDistance=length(-lightData.xyz);

result.L=normalize(-lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeHemisphericPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;


result.NdotL=dot(N,lightData.xyz)*0.5+0.5;
result.NdotL=saturateEps(result.NdotL);
result.NdotLUnclamped=result.NdotL;
#ifdef SPECULARTERM
result.L=normalize(lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
#endif
return result;
}
//PBRMetallicRoughness
#include<pbrDirectLightingFalloffFunctions>

//PBRMetallicRoughness

#define FRESNEL_MAXIMUM_ON_ROUGH 0.25




#ifdef MS_BRDF_ENERGY_CONSERVATION


vec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
return 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);
}
#endif
#ifdef ENVIRONMENTBRDF
vec3 getBRDFLookup(float NdotV,float perceptualRoughness) {

vec2 UV=vec2(NdotV,perceptualRoughness);

vec4 brdfLookup=texture2D(environmentBrdfSampler,UV);
#ifdef ENVIRONMENTBRDF_RGBD
brdfLookup.rgb=fromRGBD(brdfLookup.rgba);
#endif
return brdfLookup.rgb;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;

#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;
#endif
return reflectance;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;
#endif
return reflectance;
}
#endif

#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)
vec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)
{

float weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);
return reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));
}
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)

vec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {
vec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;
return sheenEnvironmentReflectance;
}
#endif
























vec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
float fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
#ifdef CLEARCOAT





vec3 getR0RemappedForClearCoat(vec3 f0) {
#ifdef CLEARCOAT_DEFAULTIOR
#ifdef MOBILE
return saturate(f0*(f0*0.526868+0.529324)-0.0482256);
#else
return saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);
#endif
#else
vec3 s=sqrt(f0);
vec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);
return t*t;
#endif
}
#endif






float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)
{



float a2=square(alphaG);
float d=NdotH*NdotH*(a2-1.0)+1.0;
return a2/(PI*d*d);
}
#ifdef SHEEN


float normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)
{
float invR=1./alphaG;
float cos2h=NdotH*NdotH;
float sin2h=1.-cos2h;
return (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);
}
#endif
#ifdef ANISOTROPIC


float normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {
float a2=alphaTB.x*alphaTB.y;
vec3 v=vec3(alphaTB.y*TdotH,alphaTB.x*BdotH,a2*NdotH);
float v2=dot(v,v);
float w2=a2/v2;
return a2*w2*w2*RECIPROCAL_PI;
}
#endif




#ifdef BRDF_V_HEIGHT_CORRELATED



float smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {
#ifdef MOBILE

float GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);
float GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);
return 0.5/(GGXV+GGXL);
#else
float a2=alphaG*alphaG;
float GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);
float GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);
return 0.5/(GGXV+GGXL);
#endif
}
#else















float smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)
{
#ifdef MOBILE

return 1.0/(dot+alphaG+(1.0-alphaG)*dot ));
#else
float alphaSquared=alphaG*alphaG;
return 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));
#endif
}
float smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)
{
float visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);

return visibility;
}
#endif
#ifdef ANISOTROPIC


float smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {
float lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));
float lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));
float v=0.5/(lambdaV+lambdaL);
return v;
}
#endif
#ifdef CLEARCOAT
float visibility_Kelemen(float VdotH) {



return 0.25/(VdotH*VdotH);
}
#endif
#ifdef SHEEN



float visibility_Ashikhmin(float NdotL,float NdotV)
{
return 1./(4.*(NdotL+NdotV-NdotL*NdotV));
}

#endif







float diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {


float diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));
float diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));
float diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;
float fresnel =
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);
return fresnel/PI;
}
#ifdef SS_TRANSLUCENCY


vec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {
vec3 S=1./maxEps(diffusionDistance);
vec3 temp=exp((-0.333333333*thickness)*S);
return tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);
}


float computeWrappedDiffuseNdotL(float NdotL,float w) {
float t=1.0+w;
float invt2=1.0/square(t);
return saturate((NdotL+w)*invt2);
}
#endif

//PBRMetallicRoughness
#include<hdrFilteringFunctions>

//PBRMetallicRoughness
#define CLEARCOATREFLECTANCE90 1.0

struct lightingInfo
{
vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef CLEARCOAT


vec4 clearCoat;
#endif
#ifdef SHEEN
vec3 sheen;
#endif
};

float adjustRoughnessFromLightProperties(float roughness,float lightRadius,float lightDistance) {
#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)

float lightRoughness=lightRadius/lightDistance;

float totalRoughness=saturate(lightRoughness+roughness);
return totalRoughness;
#else
return roughness;
#endif
}
vec3 computeHemisphericDiffuseLighting(preLightingInfo info,vec3 lightColor,vec3 groundColor) {
return mix(groundColor,lightColor,info.NdotL);
}
vec3 computeDiffuseLighting(preLightingInfo info,vec3 lightColor) {
float diffuseTerm=diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*info.attenuation*info.NdotL*lightColor;
}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){
vec4 strq=textureProjectionMatrix*vec4(v_output2.xyz,1.0);
strq/=strq.w;
vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;
return toLinearSpace(textureColor);
}
#ifdef SS_TRANSLUCENCY
vec3 computeDiffuseAndTransmittedLighting(preLightingInfo info,vec3 lightColor,vec3 transmittance) {
float NdotL=absEps(info.NdotLUnclamped);

float wrapNdotL=computeWrappedDiffuseNdotL(NdotL,0.02);

float trAdapt=step(0.,info.NdotLUnclamped);
vec3 transmittanceNdotL=mix(transmittance*wrapNdotL,vec3(wrapNdotL),trAdapt);
float diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;
}
#endif
#ifdef SPECULARTERM
vec3 computeSpecularLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);
#else
float smithVisibility=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);
#endif
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef ANISOTROPIC
vec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float TdotH=dot(T,info.H);
float BdotH=dot(B,info.H);
float TdotV=dot(T,V);
float BdotV=dot(B,V);
float TdotL=dot(T,info.L);
float BdotL=dot(B,info.L);
float alphaG=convertRoughnessToAverageSlope(info.roughness);
vec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);
alphaTB=max(alphaTB,square(geometricRoughnessFactor));
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
float distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);
float smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef CLEARCOAT
vec4 computeClearCoatLighting(preLightingInfo info,vec3 Ncc,float geometricRoughnessFactor,float clearCoatIntensity,vec3 lightColor) {
float NccdotL=saturateEps(dot(Ncc,info.L));
float NccdotH=saturateEps(dot(Ncc,info.H));
float clearCoatRoughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
float fresnel=fresnelSchlickGGX(info.VdotH,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnel*=clearCoatIntensity;
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);
float kelemenVisibility=visibility_Kelemen(info.VdotH);
float clearCoatTerm=fresnel*distribution*kelemenVisibility;
return vec4(
clearCoatTerm*info.attenuation*NccdotL*lightColor,
1.0-fresnel
);
}
vec3 computeClearCoatLightingAbsorption(float NdotVRefract,vec3 L,vec3 Ncc,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {
vec3 LRefract=-refract(L,Ncc,vClearCoatRefractionParams.y);
float NdotLRefract=saturateEps(dot(Ncc,LRefract));
vec3 absorption=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);
return absorption;
}
#endif
#ifdef SHEEN
vec3 computeSheenLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);


float fresnel=1.;
float distribution=normalDistributionFunction_CharlieSheen(NdotH,alphaG);

float visibility=visibility_Ashikhmin(info.NdotL,info.NdotV);

float sheenTerm=fresnel*distribution*visibility;
return sheenTerm*info.attenuation*info.NdotL*lightColor;
}
#endif

//PBRMetallicRoughness
#include<pbrIBLFunctions>

//PBRMetallicRoughness
#include<pbrBlockAlbedoOpacity>

//PBRMetallicRoughness
#include<pbrBlockReflectivity>

//PBRMetallicRoughness
#include<pbrBlockAmbientOcclusion>

//PBRMetallicRoughness
#include<pbrBlockAlphaFresnel>

//PBRMetallicRoughness
#include<pbrBlockAnisotropic>

//PBRMetallicRoughness
#ifdef REFLECTION
struct reflectionOutParams
{
vec4 environmentRadiance;
vec3 environmentIrradiance;
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords;
#else
vec2 reflectionCoords;
#endif
#ifdef SS_TRANSLUCENCY
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
vec3 irradianceVector;
#endif
#endif
#endif
};
#define pbr_inline
void createReflectionCoords(
const in vec3 vPositionW,
const in vec3 normalW,
#ifdef ANISOTROPIC
const in anisotropicOutParams anisotropicOut,
#endif
#ifdef REFLECTIONMAP_3D
out vec3 reflectionCoords
#else
out vec2 reflectionCoords
#endif
)
{
#ifdef ANISOTROPIC
vec3 reflectionVector=computeReflectionCoordsPBR(vec4(vPositionW,1.0),anisotropicOut.anisotropicNormal);
#else
vec3 reflectionVector=computeReflectionCoordsPBR(vec4(vPositionW,1.0),normalW);
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif

#ifdef REFLECTIONMAP_3D
reflectionCoords=reflectionVector;
#else
reflectionCoords=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0-reflectionCoords.y;
#endif
}
#define pbr_inline
#define inline
void sampleReflectionTexture(
const in float alphaG,
const in vec3 vReflectionMicrosurfaceInfos,
const in vec2 vReflectionInfos,
const in vec3 vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
const in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
const in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSampler,
const vec3 reflectionCoords,
#else
const in sampler2D reflectionSampler,
const vec2 reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSamplerLow,
const in samplerCube reflectionSamplerHigh,
#else
const in sampler2D reflectionSamplerLow,
const in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
const in vec2 vReflectionFilteringInfo,
#endif
out vec4 environmentRadiance
)
{

#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
#ifdef LODBASEDMICROSFURACE

reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef LODINREFLECTIONALPHA









float automaticReflectionLOD=UNPACK_LOD(sampleReflection(reflectionSampler,reflectionCoords).a);
float requestedReflectionLOD=max(automaticReflectionLOD,reflectionLOD);
#else
float requestedReflectionLOD=reflectionLOD;
#endif
#ifdef REALTIME_FILTERING
environmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);
#else
environmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#endif
#else
float lodReflectionNormalized=saturate(reflectionLOD/log2(vReflectionMicrosurfaceInfos.x));
float lodReflectionNormalizedDoubled=lodReflectionNormalized*2.0;
vec4 environmentMid=sampleReflection(reflectionSampler,reflectionCoords);
if (lodReflectionNormalizedDoubled<1.0){
environmentRadiance=mix(
sampleReflection(reflectionSamplerHigh,reflectionCoords),
environmentMid,
lodReflectionNormalizedDoubled
);
} else {
environmentRadiance=mix(
environmentMid,
sampleReflection(reflectionSamplerLow,reflectionCoords),
lodReflectionNormalizedDoubled-1.0
);
}
#endif
#ifdef RGBDREFLECTION
environmentRadiance.rgb=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
environmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);
#endif

environmentRadiance.rgb*=vReflectionInfos.x;
environmentRadiance.rgb*=vReflectionColor.rgb;
}
#define pbr_inline
#define inline
void reflectionBlock(
const in vec3 vPositionW,
const in vec3 normalW,
const in float alphaG,
const in vec3 vReflectionMicrosurfaceInfos,
const in vec2 vReflectionInfos,
const in vec3 vReflectionColor,
#ifdef ANISOTROPIC
const in anisotropicOutParams anisotropicOut,
#endif
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
const in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
const in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSampler,
#else
const in sampler2D reflectionSampler,
#endif
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
const in vec3 vEnvironmentIrradiance,
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
const in mat4 reflectionMatrix,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
const in samplerCube irradianceSampler,
#else
const in sampler2D irradianceSampler,
#endif
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSamplerLow,
const in samplerCube reflectionSamplerHigh,
#else
const in sampler2D reflectionSamplerLow,
const in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
const in vec2 vReflectionFilteringInfo,
#endif
out reflectionOutParams outParams
)
{

vec4 environmentRadiance=vec4(0.,0.,0.,0.);
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=vec3(0.);
#else
vec2 reflectionCoords=vec2(0.);
#endif
createReflectionCoords(
vPositionW,
normalW,
#ifdef ANISOTROPIC
anisotropicOut,
#endif
reflectionCoords
);
sampleReflectionTexture(
alphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
roughness,
#endif
#ifdef REFLECTIONMAP_3D
reflectionSampler,
reflectionCoords,
#else
reflectionSampler,
reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentRadiance
);

vec3 environmentIrradiance=vec3(0.,0.,0.);
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradiance;
#else
#ifdef ANISOTROPIC
vec3 irradianceVector=vec3(reflectionMatrix*vec4(anisotropicOut.anisotropicNormal,0)).xyz;
#else
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#ifdef SS_TRANSLUCENCY
outParams.irradianceVector=irradianceVector;
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
vec4 environmentIrradiance4=sampleReflection(irradianceSampler,reflectionCoords);
environmentIrradiance=environmentIrradiance4.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradiance4);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);
#endif
#endif
environmentIrradiance*=vReflectionColor.rgb;
outParams.environmentRadiance=environmentRadiance;
outParams.environmentIrradiance=environmentIrradiance;
outParams.reflectionCoords=reflectionCoords;
}
#endif

//PBRMetallicRoughness
#ifdef SHEEN
struct sheenOutParams
{
float sheenIntensity;
vec3 sheenColor;
float sheenRoughness;
#ifdef SHEEN_LINKWITHALBEDO
vec3 surfaceAlbedo;
#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
float sheenAlbedoScaling;
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
vec3 finalSheenRadianceScaled;
#endif
#if DEBUGMODE>0
vec4 sheenMapData;
vec3 sheenEnvironmentReflectance;
#endif
};
#define pbr_inline
#define inline
void sheenBlock(
const in vec4 vSheenColor,
#ifdef SHEEN_ROUGHNESS
const in float vSheenRoughness,
#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
const in vec4 sheenMapRoughnessData,
#endif
#endif
const in float roughness,
#ifdef SHEEN_TEXTURE
const in vec4 sheenMapData,
#endif
const in float reflectance,
#ifdef SHEEN_LINKWITHALBEDO
const in vec3 baseColor,
const in vec3 surfaceAlbedo,
#endif
#ifdef ENVIRONMENTBRDF
const in float NdotV,
const in vec3 environmentBrdf,
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
const in vec2 AARoughnessFactors,
const in vec3 vReflectionMicrosurfaceInfos,
const in vec2 vReflectionInfos,
const in vec3 vReflectionColor,
const in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSampler,
const in vec3 reflectionCoords,
#else
const in sampler2D reflectionSampler,
const in vec2 reflectionCoords,
#endif
const in float NdotVUnclamped,
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSamplerLow,
const in samplerCube reflectionSamplerHigh,
#else
const in sampler2D reflectionSamplerLow,
const in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
const in vec2 vReflectionFilteringInfo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
const in float seo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
const in float eho,
#endif
#endif
out sheenOutParams outParams
)
{
float sheenIntensity=vSheenColor.a;
#ifdef SHEEN_TEXTURE
#if DEBUGMODE>0
outParams.sheenMapData=sheenMapData;
#endif
#endif
#ifdef SHEEN_LINKWITHALBEDO
float sheenFactor=pow5(1.0-sheenIntensity);
vec3 sheenColor=baseColor.rgb*(1.0-sheenFactor);
float sheenRoughness=sheenIntensity;
outParams.surfaceAlbedo=surfaceAlbedo*sheenFactor;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#else
vec3 sheenColor=vSheenColor.rgb;
#ifdef SHEEN_TEXTURE
sheenColor.rgb*=sheenMapData.rgb;
#endif
#ifdef SHEEN_ROUGHNESS
float sheenRoughness=vSheenRoughness;
#ifdef SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE
#if defined(SHEEN_TEXTURE)
sheenRoughness*=sheenMapData.a;
#endif
#elif defined(SHEEN_TEXTURE_ROUGHNESS)
#ifdef SHEEN_TEXTURE_ROUGHNESS_IDENTICAL
sheenRoughness*=sheenMapData.a;
#else
sheenRoughness*=sheenMapRoughnessData.a;
#endif
#endif
#else
float sheenRoughness=roughness;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#endif

#if !defined(SHEEN_ALBEDOSCALING)
sheenIntensity*=(1.-reflectance);
#endif

sheenColor*=sheenIntensity;
#endif

#ifdef ENVIRONMENTBRDF

#ifdef SHEEN_ROUGHNESS
vec3 environmentSheenBrdf=getBRDFLookup(NdotV,sheenRoughness);
#else
vec3 environmentSheenBrdf=environmentBrdf;
#endif

#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
float sheenAlphaG=convertRoughnessToAverageSlope(sheenRoughness);
#ifdef SPECULARAA

sheenAlphaG+=AARoughnessFactors.y;
#endif
vec4 environmentSheenRadiance=vec4(0.,0.,0.,0.);
sampleReflectionTexture(
sheenAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
sheenRoughness,
#endif
reflectionSampler,
reflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentSheenRadiance
);
vec3 sheenEnvironmentReflectance=getSheenReflectanceFromBRDFLookup(sheenColor,environmentSheenBrdf);
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
sheenEnvironmentReflectance*=seo;
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
sheenEnvironmentReflectance*=eho;
#endif
#if DEBUGMODE>0
outParams.sheenEnvironmentReflectance=sheenEnvironmentReflectance;
#endif
outParams.finalSheenRadianceScaled=
environmentSheenRadiance.rgb *
sheenEnvironmentReflectance *
vLightingIntensity.z;





#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)



outParams.sheenAlbedoScaling=1.0-sheenIntensity*max(max(sheenColor.r,sheenColor.g),sheenColor.b)*environmentSheenBrdf.b;
#endif

outParams.sheenIntensity=sheenIntensity;
outParams.sheenColor=sheenColor;
outParams.sheenRoughness=sheenRoughness;
}
#endif

//PBRMetallicRoughness
struct clearcoatOutParams
{
vec3 specularEnvironmentR0;
float conservationFactor;
vec3 clearCoatNormalW;
vec2 clearCoatAARoughnessFactors;
float clearCoatIntensity;
float clearCoatRoughness;
#ifdef REFLECTION
vec3 finalClearCoatRadianceScaled;
#endif
#ifdef CLEARCOAT_TINT
vec3 absorption;
float clearCoatNdotVRefract;
vec3 clearCoatColor;
float clearCoatThickness;
#endif
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
vec3 energyConservationFactorClearCoat;
#endif
#if DEBUGMODE>0
mat3 TBNClearCoat;
vec2 clearCoatMapData;
vec4 clearCoatTintMapData;
vec4 environmentClearCoatRadiance;
float clearCoatNdotV;
vec3 clearCoatEnvironmentReflectance;
#endif
};
#ifdef CLEARCOAT
#define pbr_inline
#define inline
void clearcoatBlock(
const in vec3 vPositionW,
const in vec3 geometricNormalW,
const in vec3 viewDirectionW,
const in vec2 vClearCoatParams,
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
const in vec4 clearCoatMapRoughnessData,
#endif
const in vec3 specularEnvironmentR0,
#ifdef CLEARCOAT_TEXTURE
const in vec2 clearCoatMapData,
#endif
#ifdef CLEARCOAT_TINT
const in vec4 vClearCoatTintParams,
const in float clearCoatColorAtDistance,
const in vec4 vClearCoatRefractionParams,
#ifdef CLEARCOAT_TINT_TEXTURE
const in vec4 clearCoatTintMapData,
#endif
#endif
#ifdef CLEARCOAT_BUMP
const in vec2 vClearCoatBumpInfos,
const in vec4 clearCoatBumpMapData,
const in vec2 vClearCoatBumpUV,
#if defined(IGNORE) && defined(NORMAL)
const in mat3 vTBN,
#else
const in vec2 vClearCoatTangentSpaceParams,
#endif
#ifdef OBJECTSPACE_NORMALMAP
const in mat4 normalMatrix,
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
const in vec3 faceNormal,
#endif
#ifdef REFLECTION
const in vec3 vReflectionMicrosurfaceInfos,
const in vec2 vReflectionInfos,
const in vec3 vReflectionColor,
const in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSampler,
#else
const in sampler2D reflectionSampler,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
const in samplerCube reflectionSamplerLow,
const in samplerCube reflectionSamplerHigh,
#else
const in sampler2D reflectionSamplerLow,
const in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
const in vec2 vReflectionFilteringInfo,
#endif
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
const in float ambientMonochrome,
#endif
#endif
out clearcoatOutParams outParams
)
{

float clearCoatIntensity=vClearCoatParams.x;
float clearCoatRoughness=vClearCoatParams.y;
#ifdef CLEARCOAT_TEXTURE
clearCoatIntensity*=clearCoatMapData.x;
#ifdef CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE
clearCoatRoughness*=clearCoatMapData.y;
#endif
#if DEBUGMODE>0
outParams.clearCoatMapData=clearCoatMapData;
#endif
#endif
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL
clearCoatRoughness*=clearCoatMapData.y;
#else
clearCoatRoughness*=clearCoatMapRoughnessData.y;
#endif
#endif
outParams.clearCoatIntensity=clearCoatIntensity;
outParams.clearCoatRoughness=clearCoatRoughness;
#ifdef CLEARCOAT_TINT
vec3 clearCoatColor=vClearCoatTintParams.rgb;
float clearCoatThickness=vClearCoatTintParams.a;
#ifdef CLEARCOAT_TINT_TEXTURE
clearCoatColor*=clearCoatTintMapData.rgb;
clearCoatThickness*=clearCoatTintMapData.a;
#if DEBUGMODE>0
outParams.clearCoatTintMapData=clearCoatTintMapData;
#endif
#endif
outParams.clearCoatColor=computeColorAtDistanceInMedia(clearCoatColor,clearCoatColorAtDistance);
outParams.clearCoatThickness=clearCoatThickness;
#endif




#ifdef CLEARCOAT_REMAP_F0
vec3 specularEnvironmentR0Updated=getR0RemappedForClearCoat(specularEnvironmentR0);
#else
vec3 specularEnvironmentR0Updated=specularEnvironmentR0;
#endif
outParams.specularEnvironmentR0=mix(specularEnvironmentR0,specularEnvironmentR0Updated,clearCoatIntensity);

vec3 clearCoatNormalW=geometricNormalW;
#ifdef CLEARCOAT_BUMP
#ifdef NORMALXYSCALE
float clearCoatNormalScale=1.0;
#else
float clearCoatNormalScale=vClearCoatBumpInfos.y;
#endif
#if defined(IGNORE) && defined(NORMAL)
mat3 TBNClearCoat=vTBN;
#else
mat3 TBNClearCoat=cotangent_frame(clearCoatNormalW*clearCoatNormalScale,vPositionW,vClearCoatBumpUV,vClearCoatTangentSpaceParams);
#endif
#if DEBUGMODE>0
outParams.TBNClearCoat=TBNClearCoat;
#endif
#ifdef OBJECTSPACE_NORMALMAP
clearCoatNormalW=normalize(clearCoatBumpMapData.xyz*2.0-1.0);
clearCoatNormalW=normalize(mat3(normalMatrix)*clearCoatNormalW);
#else
clearCoatNormalW=perturbNormal(TBNClearCoat,clearCoatBumpMapData.xyz,vClearCoatBumpInfos.y);
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
clearCoatNormalW*=sign(dot(clearCoatNormalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
clearCoatNormalW=gl_FrontFacing ? clearCoatNormalW : -clearCoatNormalW;
#endif
outParams.clearCoatNormalW=clearCoatNormalW;

outParams.clearCoatAARoughnessFactors=getAARoughnessFactors(clearCoatNormalW.xyz);

float clearCoatNdotVUnclamped=dot(clearCoatNormalW,viewDirectionW);

float clearCoatNdotV=absEps(clearCoatNdotVUnclamped);
#if DEBUGMODE>0
outParams.clearCoatNdotV=clearCoatNdotV;
#endif
#ifdef CLEARCOAT_TINT

vec3 clearCoatVRefract=-refract(vPositionW,clearCoatNormalW,vClearCoatRefractionParams.y);

outParams.clearCoatNdotVRefract=absEps(dot(clearCoatNormalW,clearCoatVRefract));
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)

vec3 environmentClearCoatBrdf=getBRDFLookup(clearCoatNdotV,clearCoatRoughness);
#endif

#if defined(REFLECTION)
float clearCoatAlphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
#ifdef SPECULARAA

clearCoatAlphaG+=outParams.clearCoatAARoughnessFactors.y;
#endif
vec4 environmentClearCoatRadiance=vec4(0.,0.,0.,0.);
vec3 clearCoatReflectionVector=computeReflectionCoordsPBR(vec4(vPositionW,1.0),clearCoatNormalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
clearCoatReflectionVector.z*=-1.0;
#endif

#ifdef REFLECTIONMAP_3D
vec3 clearCoatReflectionCoords=clearCoatReflectionVector;
#else
vec2 clearCoatReflectionCoords=clearCoatReflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
clearCoatReflectionCoords/=clearCoatReflectionVector.z;
#endif
clearCoatReflectionCoords.y=1.0-clearCoatReflectionCoords.y;
#endif
sampleReflectionTexture(
clearCoatAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
clearCoatNdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
clearCoatRoughness,
#endif
reflectionSampler,
clearCoatReflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentClearCoatRadiance
);
#if DEBUGMODE>0
outParams.environmentClearCoatRadiance=environmentClearCoatRadiance;
#endif

#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 clearCoatEnvironmentReflectance=getReflectanceFromBRDFLookup(vec3(vClearCoatRefractionParams.x),environmentClearCoatBrdf);
#ifdef RADIANCEOCCLUSION
float clearCoatSeo=environmentRadianceOcclusion(ambientMonochrome,clearCoatNdotVUnclamped);
clearCoatEnvironmentReflectance*=clearCoatSeo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float clearCoatEho=environmentHorizonOcclusion(-viewDirectionW,clearCoatNormalW,geometricNormalW);
clearCoatEnvironmentReflectance*=clearCoatEho;
#endif
#endif
#endif
#else

vec3 clearCoatEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(clearCoatNdotV,vec3(1.),vec3(1.),sqrt(1.-clearCoatRoughness));
#endif
clearCoatEnvironmentReflectance*=clearCoatIntensity;
#if DEBUGMODE>0
outParams.clearCoatEnvironmentReflectance=clearCoatEnvironmentReflectance;
#endif
outParams.finalClearCoatRadianceScaled=
environmentClearCoatRadiance.rgb *
clearCoatEnvironmentReflectance *
vLightingIntensity.z;
#endif
#if defined(CLEARCOAT_TINT)

outParams.absorption=computeClearCoatAbsorption(outParams.clearCoatNdotVRefract,outParams.clearCoatNdotVRefract,outParams.clearCoatColor,clearCoatThickness,clearCoatIntensity);
#endif

float fresnelIBLClearCoat=fresnelSchlickGGX(clearCoatNdotV,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnelIBLClearCoat*=clearCoatIntensity;
outParams.conservationFactor=(1.-fresnelIBLClearCoat);
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
outParams.energyConservationFactorClearCoat=getEnergyConservationFactor(outParams.specularEnvironmentR0,environmentClearCoatBrdf);
#endif
}
#endif

//PBRMetallicRoughness
struct subSurfaceOutParams
{
vec3 specularEnvironmentReflectance;
#ifdef SS_REFRACTION
vec3 finalRefraction;
vec3 surfaceAlbedo;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
float alpha;
#endif
#ifdef REFLECTION
float refractionFactorForIrradiance;
#endif
#endif
#ifdef SS_TRANSLUCENCY
vec3 transmittance;
float translucencyIntensity;
#ifdef REFLECTION
vec3 refractionIrradiance;
#endif
#endif
#if DEBUGMODE>0
vec4 thicknessMap;
vec4 environmentRefraction;
vec3 refractionTransmittance;
#endif
};
#ifdef SUBSURFACE
#define pbr_inline
#define inline
void subSurfaceBlock(
const in vec3 vSubSurfaceIntensity,
const in vec2 vThicknessParam,
const in vec4 vTintColor,
const in vec3 normalW,
const in vec3 specularEnvironmentReflectance,
#ifdef SS_THICKNESSANDMASK_TEXTURE
const in vec4 thicknessMap,
#endif
#ifdef REFLECTION
#ifdef SS_TRANSLUCENCY
const in mat4 reflectionMatrix,
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
const in vec3 irradianceVector_,
#endif
#if defined(REALTIME_FILTERING)
const in samplerCube reflectionSampler,
const in vec2 vReflectionFilteringInfo,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
const in samplerCube irradianceSampler,
#else
const in sampler2D irradianceSampler,
#endif
#endif
#endif
#endif
#ifdef SS_REFRACTION
const in vec3 vPositionW,
const in vec3 viewDirectionW,
const in mat4 view,
const in vec3 surfaceAlbedo,
const in vec4 vRefractionInfos,
const in mat4 refractionMatrix,
const in vec3 vRefractionMicrosurfaceInfos,
const in vec4 vLightingIntensity,
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
const in float alpha,
#endif
#ifdef SS_LODINREFRACTIONALPHA
const in float NdotVUnclamped,
#endif
#ifdef SS_LINEARSPECULARREFRACTION
const in float roughness,
#else
const in float alphaG,
#endif
#ifdef SS_REFRACTIONMAP_3D
const in samplerCube refractionSampler,
#ifndef LODBASEDMICROSFURACE
const in samplerCube refractionSamplerLow,
const in samplerCube refractionSamplerHigh,
#endif
#else
const in sampler2D refractionSampler,
#ifndef LODBASEDMICROSFURACE
const in sampler2D refractionSamplerLow,
const in sampler2D refractionSamplerHigh,
#endif
#endif
#ifdef ANISOTROPIC
const in anisotropicOutParams anisotropicOut,
#endif
#ifdef REALTIME_FILTERING
const in vec2 vRefractionFilteringInfo,
#endif
#endif
#ifdef SS_TRANSLUCENCY
const in vec3 vDiffusionDistance,
#endif
out subSurfaceOutParams outParams
)
{
outParams.specularEnvironmentReflectance=specularEnvironmentReflectance;



#ifdef SS_REFRACTION
float refractionIntensity=vSubSurfaceIntensity.x;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
refractionIntensity*=(1.0-alpha);

outParams.alpha=1.0;
#endif
#endif
#ifdef SS_TRANSLUCENCY
float translucencyIntensity=vSubSurfaceIntensity.y;
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
float thickness=thicknessMap.r*vThicknessParam.y+vThicknessParam.x;
#if DEBUGMODE>0
outParams.thicknessMap=thicknessMap;
#endif
#ifdef SS_MASK_FROM_THICKNESS_TEXTURE
#ifdef SS_REFRACTION
refractionIntensity*=thicknessMap.g;
#endif
#ifdef SS_TRANSLUCENCY
translucencyIntensity*=thicknessMap.b;
#endif
#elif defined(SS_MASK_FROM_THICKNESS_TEXTURE_GLTF)
#ifdef SS_REFRACTION
refractionIntensity*=thicknessMap.r;
#elif defined(SS_TRANSLUCENCY)
translucencyIntensity*=thicknessMap.r;
#endif
thickness=thicknessMap.g*vThicknessParam.y+vThicknessParam.x;
#endif
#else
float thickness=vThicknessParam.y;
#endif



#ifdef SS_TRANSLUCENCY
thickness=maxEps(thickness);
vec3 transmittance=transmittanceBRDF_Burley(vTintColor.rgb,vDiffusionDistance,thickness);
transmittance*=translucencyIntensity;
outParams.transmittance=transmittance;
outParams.translucencyIntensity=translucencyIntensity;
#endif



#ifdef SS_REFRACTION
vec4 environmentRefraction=vec4(0.,0.,0.,0.);
#ifdef ANISOTROPIC
vec3 refractionVector=refract(-viewDirectionW,anisotropicOut.anisotropicNormal,vRefractionInfos.y);
#else
vec3 refractionVector=refract(-viewDirectionW,normalW,vRefractionInfos.y);
#endif
#ifdef SS_REFRACTIONMAP_OPPOSITEZ
refractionVector.z*=-1.0;
#endif

#ifdef SS_REFRACTIONMAP_3D
refractionVector.y=refractionVector.y*vRefractionInfos.w;
vec3 refractionCoords=refractionVector;
refractionCoords=vec3(refractionMatrix*vec4(refractionCoords,0));
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));
vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;
refractionCoords.y=1.0-refractionCoords.y;
#endif
#ifdef SS_LODINREFRACTIONALPHA
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,alphaG,NdotVUnclamped);
#elif defined(SS_LINEARSPECULARREFRACTION)
float refractionLOD=getLinearLodFromRoughness(vRefractionMicrosurfaceInfos.x,roughness);
#else
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,alphaG);
#endif
#ifdef LODBASEDMICROSFURACE

refractionLOD=refractionLOD*vRefractionMicrosurfaceInfos.y+vRefractionMicrosurfaceInfos.z;
#ifdef SS_LODINREFRACTIONALPHA









float automaticRefractionLOD=UNPACK_LOD(sampleRefraction(refractionSampler,refractionCoords).a);
float requestedRefractionLOD=max(automaticRefractionLOD,refractionLOD);
#else
float requestedRefractionLOD=refractionLOD;
#endif
#ifdef REALTIME_FILTERING
environmentRefraction=vec4(radiance(alphaG,refractionSampler,refractionCoords,vRefractionFilteringInfo),1.0);
#else
environmentRefraction=sampleRefractionLod(refractionSampler,refractionCoords,requestedRefractionLOD);
#endif
#else
float lodRefractionNormalized=saturate(refractionLOD/log2(vRefractionMicrosurfaceInfos.x));
float lodRefractionNormalizedDoubled=lodRefractionNormalized*2.0;
vec4 environmentRefractionMid=sampleRefraction(refractionSampler,refractionCoords);
if (lodRefractionNormalizedDoubled<1.0){
environmentRefraction=mix(
sampleRefraction(refractionSamplerHigh,refractionCoords),
environmentRefractionMid,
lodRefractionNormalizedDoubled
);
} else {
environmentRefraction=mix(
environmentRefractionMid,
sampleRefraction(refractionSamplerLow,refractionCoords),
lodRefractionNormalizedDoubled-1.0
);
}
#endif
#ifdef SS_RGBDREFRACTION
environmentRefraction.rgb=fromRGBD(environmentRefraction);
#endif
#ifdef SS_GAMMAREFRACTION
environmentRefraction.rgb=toLinearSpace(environmentRefraction.rgb);
#endif

environmentRefraction.rgb*=vRefractionInfos.x;
#endif



#ifdef SS_REFRACTION
vec3 refractionTransmittance=vec3(refractionIntensity);
#ifdef SS_THICKNESSANDMASK_TEXTURE
vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);





refractionTransmittance*=cocaLambert(volumeAlbedo,thickness);
#elif defined(SS_LINKREFRACTIONTOTRANSPARENCY)

float maxChannel=max(max(surfaceAlbedo.r,surfaceAlbedo.g),surfaceAlbedo.b);
vec3 volumeAlbedo=saturate(maxChannel*surfaceAlbedo);

environmentRefraction.rgb*=volumeAlbedo;
#else

vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);
refractionTransmittance*=cocaLambert(volumeAlbedo,vThicknessParam.y);
#endif
#ifdef SS_ALBEDOFORREFRACTIONTINT

environmentRefraction.rgb*=surfaceAlbedo.rgb;
#endif

outParams.surfaceAlbedo=surfaceAlbedo*(1.-refractionIntensity);
#ifdef REFLECTION

outParams.refractionFactorForIrradiance=(1.-refractionIntensity);

#endif

vec3 bounceSpecularEnvironmentReflectance=(2.0*specularEnvironmentReflectance)/(1.0+specularEnvironmentReflectance);
outParams.specularEnvironmentReflectance=mix(bounceSpecularEnvironmentReflectance,specularEnvironmentReflectance,refractionIntensity);

refractionTransmittance*=1.0-outParams.specularEnvironmentReflectance;
#if DEBUGMODE>0
outParams.refractionTransmittance=refractionTransmittance;
#endif
outParams.finalRefraction=environmentRefraction.rgb*refractionTransmittance*vLightingIntensity.z;
#if DEBUGMODE>0
outParams.environmentRefraction=environmentRefraction;
#endif
#endif



#if defined(REFLECTION) && defined(SS_TRANSLUCENCY)
#if defined(NORMAL) && defined(USESPHERICALINVERTEX) || !defined(USESPHERICALFROMREFLECTIONMAP)
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#else
vec3 irradianceVector=irradianceVector_;
#endif
#if defined(USESPHERICALFROMREFLECTIONMAP)
#if defined(REALTIME_FILTERING)
vec3 refractionIrradiance=irradiance(reflectionSampler,-irradianceVector,vReflectionFilteringInfo);
#else
vec3 refractionIrradiance=computeEnvironmentIrradiance(-irradianceVector);
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
vec3 irradianceCoords=irradianceVector;
#else
vec2 irradianceCoords=irradianceVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
irradianceCoords/=irradianceVector.z;
#endif
irradianceCoords.y=1.0-irradianceCoords.y;
#endif
vec4 refractionIrradiance=sampleReflection(irradianceSampler,-irradianceCoords);
#ifdef RGBDREFLECTION
refractionIrradiance.rgb=fromRGBD(refractionIrradiance);
#endif
#ifdef GAMMAREFLECTION
refractionIrradiance.rgb=toLinearSpace(refractionIrradiance.rgb);
#endif
#else
vec4 refractionIrradiance=vec4(0.);
#endif
refractionIrradiance.rgb*=transmittance;
outParams.refractionIrradiance=refractionIrradiance.rgb;
#endif
}
#endif



//Entry point
void main(void) {

//PBRMetallicRoughness
vec4 vNormalW = normalize(v_output3);
vec3 viewDirectionW = normalize(u_cameraPosition - v_output2.xyz);
vec3 geometricNormalW = vNormalW.xyz;
vec3 normalW = geometricNormalW;
//PBRMetallicRoughness
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
vec3 faceNormal=normalize(cross(dFdx(v_output2.xyz),dFdy(v_output2.xyz)))*invertNormal;
#if defined(TWOSIDEDLIGHTING)
faceNormal=gl_FrontFacing ? faceNormal : -faceNormal;
#endif
normalW*=sign(dot(normalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
normalW=gl_FrontFacing ? normalW : -normalW;
#endif

albedoOpacityOutParams albedoOpacityOut;
albedoOpacityBlock(
                vec4(vec3(1.), 1.),
            #ifdef ALBEDO
                vec4(1.),
                vec2(1., 1.),
            #endif
            #ifdef OPACITY
                vec4(1.),
                vec2(1., 1.),
            #endif
                albedoOpacityOut
            );

            vec3 surfaceAlbedo = albedoOpacityOut.surfaceAlbedo;
            float alpha = albedoOpacityOut.alpha;
//PBRMetallicRoughness
#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);
return;
#endif
ambientOcclusionOutParams aoOut;
ambientOcclusionBlock(
            #ifdef AMBIENT
                vec3(1.),
                vec4(0., 1.0, 1.0, 0.),
            #endif
                aoOut
            );
//PBRMetallicRoughness
#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
#ifdef GAMMALIGHTMAP
lightmapColor.rgb=toLinearSpace(lightmapColor.rgb);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif

#ifdef UNLIT
                vec3 diffuseBase = vec3(1., 1., 1.);
            #else
reflectivityOutParams reflectivityOut;
vec3 baseColor = surfaceAlbedo;

            reflectivityBlock(
                vec4(u_Float, u_Float1, 0., 0.),
            #ifdef METALLICWORKFLOW
                surfaceAlbedo,
                vMetallicReflectanceFactors,
            #endif
            #ifdef REFLECTIVITY
                vec3(0., 0., 1.),
                vec4(1.),
            #endif
            #if defined(METALLICWORKFLOW) && defined(REFLECTIVITY)  && defined(AOSTOREINMETALMAPRED)
                aoOut.ambientOcclusionColor,
            #endif
            #ifdef MICROSURFACEMAP
                microSurfaceTexel, <== not handled!
            #endif
                reflectivityOut
            );

            float microSurface = reflectivityOut.microSurface;
            float roughness = reflectivityOut.roughness;

            #ifdef METALLICWORKFLOW
                surfaceAlbedo = reflectivityOut.surfaceAlbedo;
            #endif
            #if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
                aoOut.ambientOcclusionColor = reflectivityOut.ambientOcclusionColor;
            #endif
//PBRMetallicRoughness
float NdotVUnclamped=dot(normalW,viewDirectionW);

float NdotV=absEps(NdotVUnclamped);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec2 AARoughnessFactors=getAARoughnessFactors(normalW.xyz);
#ifdef SPECULARAA

alphaG+=AARoughnessFactors.y;
#endif
#if defined(ENVIRONMENTBRDF)

vec3 environmentBrdf=getBRDFLookup(NdotV,roughness);
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
#ifdef AMBIENTINGRAYSCALE
float ambientMonochrome=aoOut.ambientOcclusionColor.r;
#else
float ambientMonochrome=getLuminance(aoOut.ambientOcclusionColor);
#endif
float seo=environmentRadianceOcclusion(ambientMonochrome,NdotVUnclamped);
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float eho=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif

//PBRMetallicRoughness
float reflectance=max(max(reflectivityOut.surfaceReflectivityColor.r,reflectivityOut.surfaceReflectivityColor.g),reflectivityOut.surfaceReflectivityColor.b);
vec3 specularEnvironmentR0=reflectivityOut.surfaceReflectivityColor.rgb;
#ifdef METALLICWORKFLOW
vec3 specularEnvironmentR90=vec3(vMetallicReflectanceFactors.a);
#else
vec3 specularEnvironmentR90=vec3(1.0,1.0,1.0);
#endif

#ifdef ALPHAFRESNEL
float reflectance90=fresnelGrazingReflectance(reflectance);
specularEnvironmentR90=specularEnvironmentR90*reflectance90;
#endif

clearcoatOutParams clearcoatOut;

        #ifdef CLEARCOAT
            vec2 vClearCoatParams = vec2(1., 0.);
            vec4 vClearCoatTintParams = vec4(vec3(1.), 1.);

            clearcoatBlock(
                v_output2.xyz,
                geometricNormalW,
                viewDirectionW,
                vClearCoatParams,
                specularEnvironmentR0,
            #ifdef CLEARCOAT_TEXTURE
                vec2(0.),
            #endif
            #ifdef CLEARCOAT_TINT
                vClearCoatTintParams,
                1.,
                vClearCoatRefractionParams,
                #ifdef CLEARCOAT_TINT_TEXTURE
                    vec4(0.),
                #endif
            #endif
            #ifdef CLEARCOAT_BUMP
                vec2(0., 1.),
                vec4(vec3(0.), 0.),
                vec2(0.),
                #if defined(IGNORE) && defined(NORMAL)
                    vTBN,
                #else
                    vClearCoatTangentSpaceParams,
                #endif
                #ifdef OBJECTSPACE_NORMALMAP
                    normalMatrix,
                #endif
            #endif
            #if defined(FORCENORMALFORWARD) && defined(NORMAL)
                faceNormal,
            #endif
            #ifdef REFLECTION
                undefined,
                undefined,
                undefined,
                vLightingIntensity,
                #ifdef undefined
                    undefined,
                #else
                    undefined,
                #endif
                #ifndef LODBASEDMICROSFURACE
                    #ifdef undefined
                        undefined,
                        undefined,
                    #else
                        undefined,
                        undefined,
                    #endif
                #endif
            #endif
            #if defined(ENVIRONMENTBRDF) && !defined(undefined)
                #ifdef RADIANCEOCCLUSION
                    ambientMonochrome,
                #endif
            #endif
                clearcoatOut
            );
        #else
            clearcoatOut.specularEnvironmentR0 = specularEnvironmentR0;
        #endif
//PBRMetallicRoughness
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 specularEnvironmentReflectance=getReflectanceFromBRDFLookup(clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,environmentBrdf);
#ifdef RADIANCEOCCLUSION
specularEnvironmentReflectance*=seo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
specularEnvironmentReflectance*=eho;
#endif
#endif
#endif
#else

vec3 specularEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,sqrt(microSurface));
#endif
#ifdef CLEARCOAT
specularEnvironmentReflectance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
specularEnvironmentReflectance*=clearcoatOut.absorption;
#endif
#endif

subSurfaceOutParams subSurfaceOut;

        #ifdef SUBSURFACE
            vec2 vThicknessParam = vec2(0., 0.);
            vec4 vTintColor = vec4(vec3(1.), 1.);
            vec3 vSubSurfaceIntensity = vec3(1., 1., 0.);

            subSurfaceBlock(
                vSubSurfaceIntensity,
                vThicknessParam,
                vTintColor,
                normalW,
                specularEnvironmentReflectance,
            #ifdef SS_THICKNESSANDMASK_TEXTURE
                vec4(0.),
            #endif
            #ifdef REFLECTION
                #ifdef SS_TRANSLUCENCY
                    undefined,
                    #ifdef USESPHERICALFROMREFLECTIONMAP
                        #if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
                            reflectionOut.irradianceVector,
                        #endif
                        #if defined(REALTIME_FILTERING)
                            undefined,
                            undefined,
                        #endif
                        #endif
                    #ifdef USEIRRADIANCEMAP
                        irradianceSampler,
                    #endif
                #endif
            #endif
            #ifdef SS_REFRACTION
                v_output2.xyz,
                viewDirectionW,
                ,
                surfaceAlbedo,
                ,
                ,
                ,
                vLightingIntensity,
                #ifdef SS_LINKREFRACTIONTOTRANSPARENCY
                    alpha,
                #endif
                #ifdef IGNORE
                    NdotVUnclamped,
                #endif
                #ifdef IGNORE
                    roughness,
                #else
                    alphaG,
                #endif
                #ifdef IGNORE
                    ,
                #else
                    ,
                #endif
                #ifndef LODBASEDMICROSFURACE
                    #ifdef IGNORE
                        ,
                        ,
                    #else
                        ,
                        ,
                    #endif
                #endif
                #ifdef ANISOTROPIC
                    anisotropicOut,
                #endif
                #ifdef REALTIME_FILTERING
                    ,
                #endif
            #endif
            #ifdef SS_TRANSLUCENCY
                vec3(1.),
            #endif
                subSurfaceOut
            );

            #ifdef SS_REFRACTION
                surfaceAlbedo = subSurfaceOut.surfaceAlbedo;
                #ifdef SS_LINKREFRACTIONTOTRANSPARENCY
                    alpha = subSurfaceOut.alpha;
                #endif
            #endif
        #else
            subSurfaceOut.specularEnvironmentReflectance = specularEnvironmentReflectance;
        #endif
//PBRMetallicRoughness
vec3 diffuseBase=vec3(0.,0.,0.);
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#ifdef CLEARCOAT
vec3 clearCoatBase=vec3(0.,0.,0.);
#endif
#ifdef SHEEN
vec3 sheenBase=vec3(0.,0.,0.);
#endif

preLightingInfo preInfo;
lightingInfo info;
float shadow=1.;
#if defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
vec3 absorption=vec3(0.);
#endif

#include<lightFragment>[0..maxSimultaneousLights]
//PBRMetallicRoughness




#if defined(ENVIRONMENTBRDF)
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 energyConservationFactor=getEnergyConservationFactor(clearcoatOut.specularEnvironmentR0,environmentBrdf);
#endif
#endif
#ifndef METALLICWORKFLOW
#ifdef SPECULAR_GLOSSINESS_ENERGY_CONSERVATION
surfaceAlbedo.rgb=(1.-reflectance)*surfaceAlbedo.rgb;
#endif
#endif
#if defined(SHEEN) && defined(SHEEN_ALBEDOSCALING) && defined(ENVIRONMENTBRDF)
surfaceAlbedo.rgb=sheenOut.sheenAlbedoScaling*surfaceAlbedo.rgb;
#endif

#ifdef REFLECTION
vec3 finalIrradiance=reflectionOut.environmentIrradiance;
#if defined(CLEARCOAT)
finalIrradiance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
finalIrradiance*=clearcoatOut.absorption;
#endif
#endif
#if defined(SS_REFRACTION)
finalIrradiance*=subSurfaceOut.refractionFactorForIrradiance;
#endif
#if defined(SS_TRANSLUCENCY)
finalIrradiance*=(1.0-subSurfaceOut.translucencyIntensity);
finalIrradiance+=subSurfaceOut.refractionIrradiance;
#endif
finalIrradiance*=surfaceAlbedo.rgb;
finalIrradiance*=vLightingIntensity.z;
finalIrradiance*=aoOut.ambientOcclusionColor;
#endif

#ifdef SPECULARTERM
vec3 finalSpecular=specularBase;
finalSpecular=max(finalSpecular,0.0);
vec3 finalSpecularScaled=finalSpecular*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalSpecularScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalSpecularScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif

#ifdef REFLECTION
vec3 finalRadiance=reflectionOut.environmentRadiance.rgb;
finalRadiance*=subSurfaceOut.specularEnvironmentReflectance;
vec3 finalRadianceScaled=finalRadiance*vLightingIntensity.z;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalRadianceScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalRadianceScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif

#ifdef SHEEN
vec3 finalSheen=sheenBase*sheenOut.sheenColor;
finalSheen=max(finalSheen,0.0);
vec3 finalSheenScaled=finalSheen*vLightingIntensity.x*vLightingIntensity.w;
#if defined(CLEARCOAT) && defined(REFLECTION) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.absorption;
#endif
#endif
#endif

#ifdef CLEARCOAT
vec3 finalClearCoat=clearCoatBase;
finalClearCoat=max(finalClearCoat,0.0);
vec3 finalClearCoatScaled=finalClearCoat*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalClearCoatScaled*=clearcoatOut.energyConservationFactorClearCoat;
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction*=clearcoatOut.conservationFactor;
#ifdef CLEARCOAT_TINT
subSurfaceOut.finalRefraction*=clearcoatOut.absorption;
#endif
#endif
#endif

#ifdef ALPHABLEND
float luminanceOverAlpha=0.0;
#if defined(REFLECTION) && defined(RADIANCEOVERALPHA)
luminanceOverAlpha+=getLuminance(finalRadianceScaled);
#if defined(CLEARCOAT)
luminanceOverAlpha+=getLuminance(clearcoatOut.finalClearCoatRadianceScaled);
#endif
#endif
#if defined(SPECULARTERM) && defined(SPECULAROVERALPHA)
luminanceOverAlpha+=getLuminance(finalSpecularScaled);
#endif
#if defined(CLEARCOAT) && defined(CLEARCOATOVERALPHA)
luminanceOverAlpha+=getLuminance(finalClearCoatScaled);
#endif
#if defined(RADIANCEOVERALPHA) || defined(SPECULAROVERALPHA) || defined(CLEARCOATOVERALPHA)
alpha=saturate(alpha+luminanceOverAlpha*luminanceOverAlpha);
#endif
#endif

#endif
//PBRMetallicRoughness

vec3 finalDiffuse=diffuseBase;
finalDiffuse*=surfaceAlbedo.rgb;
finalDiffuse=max(finalDiffuse,0.0);
finalDiffuse*=vLightingIntensity.x;

vec3 finalAmbient=vec3(0., 0., 0.) * ambientFromScene;
finalAmbient*=surfaceAlbedo.rgb;



#ifdef AMBIENT
vec3 ambientOcclusionForDirectDiffuse=mix(vec3(1.),aoOut.ambientOcclusionColor,0.);
#else
vec3 ambientOcclusionForDirectDiffuse=aoOut.ambientOcclusionColor;
#endif
finalAmbient*=aoOut.ambientOcclusionColor;
finalDiffuse*=ambientOcclusionForDirectDiffuse;

//PBRMetallicRoughness
vec4 finalColor=vec4(
finalAmbient +
finalDiffuse +
#ifndef UNLIT
#ifdef REFLECTION
finalIrradiance +
#endif
#ifdef SPECULARTERM
finalSpecularScaled +
#endif
#ifdef SHEEN
finalSheenScaled +
#endif
#ifdef CLEARCOAT
finalClearCoatScaled +
#endif
#ifdef REFLECTION
finalRadianceScaled +
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled +
#endif
#ifdef CLEARCOAT
clearcoatOut.finalClearCoatRadianceScaled +
#endif
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction +
#endif
#endif
vec3(0.),
alpha);

#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
finalColor.rgb*=lightmapColor.rgb;
#else
finalColor.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
#define CUSTOM_FRAGMENT_BEFORE_FOG

finalColor=max(finalColor,0.0);

//PBRMetallicRoughness
#ifdef IMAGEPROCESSINGPOSTPROCESS


finalColor.rgb=clamp(finalColor.rgb,0.,30.0);
#else

finalColor=applyImageProcessing(finalColor);
#endif
finalColor.a*=1.;
#ifdef PREMULTIPLYALPHA

finalColor.rgb*=finalColor.a;
#endif

//PBRMetallicRoughness
#if DEBUGMODE>0
if (vClipSpacePosition.x/vClipSpacePosition.w>=vDebugMode.x) {

#if DEBUGMODE == 1
gl_FragColor.rgb=v_output2.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 2 && defined(NORMAL)
gl_FragColor.rgb=vNormalW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 3 && defined(BUMP) || DEBUGMODE == 3 && defined(PARALLAX) || DEBUGMODE == 3 && defined(ANISOTROPIC)

gl_FragColor.rgb=TBN[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 4 && defined(BUMP) || DEBUGMODE == 4 && defined(PARALLAX) || DEBUGMODE == 4 && defined(ANISOTROPIC)

gl_FragColor.rgb=TBN[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 5

gl_FragColor.rgb=normalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 6 && defined(MAINUV1)
gl_FragColor.rgb=vec3(vMainUV1,0.0);
#elif DEBUGMODE == 7 && defined(MAINUV2)
gl_FragColor.rgb=vec3(vMainUV2,0.0);
#elif DEBUGMODE == 8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)

gl_FragColor.rgb=clearcoatOut.TBNClearCoat[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)

gl_FragColor.rgb=clearcoatOut.TBNClearCoat[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 10 && defined(CLEARCOAT)

gl_FragColor.rgb=clearcoatOut.clearCoatNormalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 11 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicNormal;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 12 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicTangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE == 13 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicBitangent;
#define DEBUGMODE_NORMALIZE

#elif DEBUGMODE == 20 && defined(ALBEDO)
gl_FragColor.rgb=vec3(1.);
gl_FragColor.rgb = toGammaSpace(gl_FragColor.rgb);

#elif DEBUGMODE == 21 && defined(AMBIENT)
gl_FragColor.rgb=aoOut.ambientOcclusionColorMap.rgb;
#elif DEBUGMODE == 22 && defined(OPACITY)
gl_FragColor.rgb=opacityMap.rgb;
#elif DEBUGMODE == 23 && defined(EMISSIVE)
gl_FragColor.rgb=emissiveColorTex.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 24 && defined(LIGHTMAP)
gl_FragColor.rgb=lightmapColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceMetallicColorMap.rgb;
#elif DEBUGMODE == 26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceReflectivityColorMap.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatMapData.rg,0.0);
#elif DEBUGMODE == 28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
gl_FragColor.rgb=clearcoatOut.clearCoatTintMapData.rgb;
#elif DEBUGMODE == 29 && defined(SHEEN) && defined(SHEEN_TEXTURE)
gl_FragColor.rgb=sheenOut.sheenMapData.rgb;
#elif DEBUGMODE == 30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)
gl_FragColor.rgb=anisotropicOut.anisotropyMapData.rgb;
#elif DEBUGMODE == 31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)
gl_FragColor.rgb=subSurfaceOut.thicknessMap.rgb;

#elif DEBUGMODE == 40 && defined(SS_REFRACTION)

gl_FragColor.rgb=subSurfaceOut.environmentRefraction.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 41 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 42 && defined(CLEARCOAT) && defined(REFLECTION)
gl_FragColor.rgb=clearcoatOut.environmentClearCoatRadiance.rgb;
#define DEBUGMODE_GAMMA

#elif DEBUGMODE == 50
gl_FragColor.rgb=diffuseBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 51 && defined(SPECULARTERM)
gl_FragColor.rgb=specularBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 52 && defined(CLEARCOAT)
gl_FragColor.rgb=clearCoatBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 53 && defined(SHEEN)
gl_FragColor.rgb=sheenBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 54 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentIrradiance.rgb;
#define DEBUGMODE_GAMMA

#elif DEBUGMODE == 60
gl_FragColor.rgb=surfaceAlbedo.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 61
gl_FragColor.rgb=clearcoatOut.specularEnvironmentR0;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 62 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=vec3(reflectivityOut.metallicRoughness.r);
#elif DEBUGMODE == 71 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.metallicF0;
#elif DEBUGMODE == 63
gl_FragColor.rgb=vec3(roughness);
#elif DEBUGMODE == 64
gl_FragColor.rgb=vec3(alphaG);
#elif DEBUGMODE == 65
gl_FragColor.rgb=vec3(NdotV);
#elif DEBUGMODE == 66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
gl_FragColor.rgb=clearcoatOut.clearCoatColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 67 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatRoughness);
#elif DEBUGMODE == 68 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatNdotV);
#elif DEBUGMODE == 69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)
gl_FragColor.rgb=subSurfaceOut.transmittance;
#elif DEBUGMODE == 70 && defined(SUBSURFACE) && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.refractionTransmittance;

#elif DEBUGMODE == 80 && defined(RADIANCEOCCLUSION)
gl_FragColor.rgb=vec3(seo);
#elif DEBUGMODE == 81 && defined(HORIZONOCCLUSION)
gl_FragColor.rgb=vec3(eho);
#elif DEBUGMODE == 82 && defined(MS_BRDF_ENERGY_CONSERVATION)
gl_FragColor.rgb=vec3(energyConservationFactor);
#elif DEBUGMODE == 83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=specularEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=clearcoatOut.clearCoatEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 85 && defined(SHEEN) && defined(REFLECTION)
gl_FragColor.rgb=sheenOut.sheenEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE == 86 && defined(ALPHABLEND)
gl_FragColor.rgb=vec3(luminanceOverAlpha);
#elif DEBUGMODE == 87
gl_FragColor.rgb=vec3(alpha);
#endif
gl_FragColor.rgb*=vDebugMode.y;
#ifdef DEBUGMODE_NORMALIZE
gl_FragColor.rgb=normalize(gl_FragColor.rgb)*0.5+0.5;
#endif
#ifdef DEBUGMODE_GAMMA
gl_FragColor.rgb=toGammaSpace(gl_FragColor.rgb);
#endif
gl_FragColor.a=1.0;
#ifdef PREPASS
gl_FragData[0]=toLinearSpace(gl_FragColor);
gl_FragData[1]=vec4(0.,0.,0.,0.);
#endif
return;
}
#endif
vec3 lighting = finalColor.rgb;
float shadow1 = shadow;

//FragmentOutput
gl_FragColor = vec4(lighting, shadow1);

}