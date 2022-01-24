precision highp float;

varying vec2 vUV;
uniform sampler2D textureSampler;
uniform sampler2D originalColorSampler;
uniform sampler2D positionSampler;
uniform sampler2D roughnessSampler;
uniform sampler2D normalSampler;
uniform sampler2D randomSampler;
uniform vec2 texelSize;

#define GIINTENSITY 4.0

float eps = 0.00000001;
vec3 getWorldNormal(vec3 pos, vec2 coords) {
    vec2 offset1 = vec2(0.0, texelSize.y);
    vec2 offset2 = vec2(texelSize.x, 0.0);

    vec3 pos1 = texture2D(positionSampler, coords + offset1).rgb;
    vec3 pos2 = texture2D(positionSampler, coords + offset2).rgb;
    vec3 p1 = pos1 - pos;
    vec3 p2 = pos2 - pos;
    vec3 normal = cross(p1, p2) + eps;
    return normalize(normal);
}

vec3 sampling(vec3 pos, vec2 sampleCoord) {
    vec3 color = texture2D(originalColorSampler, sampleCoord).rgb;
    vec3 samplepos = texture2D(positionSampler, sampleCoord).rgb;
    vec3 normal = getWorldNormal(samplepos, sampleCoord);
    vec3 pn = getWorldNormal(pos, vUV);
    float roughness = texture2D(roughnessSampler, sampleCoord).r;
    vec3 v = samplepos - pos;
    float len = length(v);
    vec3 outColor = GIINTENSITY * color * max(0.0, -1.0 * dot(normal, pn)) / (len * log(len));
    return outColor;
}

vec3 calcRoughGI(vec3 pos) {
    float yoffset = 0.1;
    float xoffset = 0.1;
    vec3 camNormal = texture2D(normalSampler, vUV).rgb;
    vec2 offset = vec2(camNormal.r, -camNormal.b) * 0.2;
    vec2 up = vec2(0.0, yoffset);
    vec2 down = vec2(0.0, -yoffset);
    vec2 right = vec2(xoffset, 0.0);
    vec2 left = vec2(-xoffset, 0.0);
    vec3 gitemp = vec3(0.0, 0.0, 0.0);
    float l = 0.5;
    vec2 utmp = up * l;
    vec2 dtmp = down * l;
    vec2 rtmp = right * l;
    vec2 ltmp = left * l;
    vec2 rand1 = texture2D(randomSampler, vUV).rg * texelSize * 10.0;
    vec2 rand2 = texture2D(randomSampler, vUV + vec2(0.01, 0.01)).rg * texelSize * 8.0;
    gitemp += sampling(pos, vUV + utmp + offset + rand1 + rand1);
    gitemp += sampling(pos, vUV + utmp * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + dtmp + offset + rand1);
    gitemp += sampling(pos, vUV + dtmp * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + rtmp + offset + rand1);
    gitemp += sampling(pos, vUV + rtmp * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + ltmp + offset + rand1);
    gitemp += sampling(pos, vUV + ltmp * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + utmp + rtmp + offset + rand1);
    gitemp += sampling(pos, vUV + (utmp + rtmp) * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + utmp + ltmp + offset + rand1);
    gitemp += sampling(pos, vUV + (utmp + ltmp) * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + dtmp + rtmp + offset + rand1);
    gitemp += sampling(pos, vUV + (dtmp + rtmp) * 2.0 + offset + rand2);
    gitemp += sampling(pos, vUV + dtmp + ltmp + offset + rand1);
    gitemp += sampling(pos, vUV + (dtmp + ltmp) * 2.0 + offset + rand2);
    return gitemp;
}

void main(void) {
    //gl_FragColor = texture2D(positionSampler, vUV);
    float uvCut = 2.0 * length(vUV - vec2(0.5, 0.5));
    uvCut *= uvCut;
    float edge = max(0.0, sqrt(1.0 - uvCut));
    vec3 pos = texture2D(positionSampler, vUV).rgb;
    //vec3 orgColor = texture2D(originalColorSampler, vUV).rgb;
    vec3 gi = calcRoughGI(pos) * edge;
    // gl_FragColor = texture2D(normalSampler, vUV);

    if(vUV.x < 1.0) {
        gl_FragColor = vec4(gi, 1.0);//texture2D(originalColorSampler, vUV);
    } else if(vUV.x < 1.0) {
        gl_FragColor = texture2D(normalSampler, vUV);
    }

}