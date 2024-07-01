varying vec2 vUv;
uniform sampler2D uNoiseTexture;
uniform float uTime;
uniform vec3 color1;
uniform vec3 color2;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main (){

    float opacity = vUv.x + 0.5;

    gl_FragColor =vec4(0.9216, 0.6392, 0.2431, smoothstep(0.6, 1.0,opacity));

}