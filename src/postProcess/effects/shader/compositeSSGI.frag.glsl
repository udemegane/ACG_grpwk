precision highp float;
varying vec2 vUV;
uniform sampler2D originalColor;
uniform sampler2D ssgiColor;
void main(void) {
    if(vUV.x < 0.25) {
        gl_FragColor = texture2D(originalColor, vUV) + 0.3 * texture2D(ssgiColor, vUV);
    } else {
        gl_FragColor = texture2D(ssgiColor, vUV);
    }
}