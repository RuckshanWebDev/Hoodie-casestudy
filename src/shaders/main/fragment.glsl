varying vec2 vUv;
uniform sampler2D uNoiseTexture;
uniform float uTime;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main (){

    vec4 grayscale = texture(uNoiseTexture , vec2((vUv.x * 2.0 - uTime), vUv.y ));

    float opacity = (1.2 - vUv.y)  ;
    opacity *=  vUv.x * (2.0 - vUv.y);
    opacity *= (1.0 - vUv.x) * (1.0 - vUv.y / 2.0);

    gl_FragColor =vec4(0.9216, 0.6392, 0.2431, smoothstep(0.4, 1.0, grayscale.r) * opacity);

}