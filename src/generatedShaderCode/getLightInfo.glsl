// Vertex shader
precision highp float;

//Attributes
attribute vec3 position;


//Uniforms
uniform mat4 u_World;
uniform vec3 lightData;
uniform vec4 lightColor;
uniform mat4 u_ViewProjection;


//Varyings
varying vec3 v_color1;
varying float v_intensity;




//Entry point
void main(void) {

//World position
vec4 output2 = u_World * vec4(position, 1.0);

//Light information
#ifdef LIGHTPOINTTYPE0
vec3 direction = normalize(output2.xyz - lightData);
#else
vec3 direction = lightData;
#endif
vec3 color1 = lightColor.rgb;
float intensity = lightColor.a;

//WorldPos
vec4 output1 = u_World * vec4(position, 1.0);

//WorldPos * ViewProjectionTransform
vec4 output0 = u_ViewProjection * output1;

//VertexOutput
gl_Position = output0;
v_color1 = color1;
v_intensity = intensity;

}

// Fragment shader
precision highp float;

//Uniforms
uniform mat4 u_World;
uniform vec3 lightData;
uniform vec4 lightColor;
uniform mat4 u_ViewProjection;


//Varyings
varying vec3 v_color1;
varying float v_intensity;




//Entry point
void main(void) {

//FragmentOutput
gl_FragColor = vec4(v_color1, v_intensity);

}