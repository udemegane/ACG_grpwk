// Vertex shader
precision highp float;

//Attributes
attribute vec2 position;


//Uniforms
uniform vec4 u_Vector;
uniform vec3 lightData;
uniform vec4 lightColor;


//Varyings
varying vec3 v_color1;
varying float v_intensity;




//Constants
float u_Constant = 1.0;


//Entry point
void main(void) {

//Position3D
vec4 xyzw = vec4(position, 0.0, u_Constant);

//VertexOutput
gl_Position = xyzw;

//Light information
#ifdef LIGHTPOINTTYPE0
vec3 direction = normalize(u_Vector.xyz - lightData);
#else
vec3 direction = lightData;
#endif
vec3 color1 = lightColor.rgb;
float intensity = lightColor.a;
v_color1 = color1;
v_intensity = intensity;

}

// Fragment shader
precision highp float;

//Uniforms
uniform vec4 u_Vector;
uniform vec3 lightData;
uniform vec4 lightColor;


//Varyings
varying vec3 v_color1;
varying float v_intensity;




//Constants
float u_Constant = 1.0;


//Entry point
void main(void) {

//FragmentOutput
gl_FragColor = vec4(v_color1, v_intensity);

}