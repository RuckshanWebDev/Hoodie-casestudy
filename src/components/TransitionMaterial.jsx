<<<<<<< HEAD
// import { shaderMaterial } from "@react-three/drei";
// import { resolveLygia } from "resolve-lygia";
// import * as THREE from 'three';

// const TransitionMaterial = shaderMaterial(
//   {
//     uProgression: 0,
//     uTex: undefined,
//     uRepeat: 1,
//     uSmoothness: 1,
//   },
//   resolveLygia(/*glsl*/ `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }`),
//   resolveLygia(/*glsl*/ `
//     varying vec2 vUv;
//     uniform sampler2D uTex;
//     uniform float uProgression;
//     uniform float uRepeat;
//     uniform float uSmoothness;

//     float inverseLerp(float value, float minValue, float maxValue) {
//       return (value - minValue) / (maxValue - minValue);
//     }

//     float remap(float value, float inMin, float inMax, float outMin, float outMax) {
//       float t = inverseLerp(value, inMin, inMax);
//       return mix(outMin, outMax, t);
//     }

//     // Noise function
//     float noise(vec2 uv) {
//       return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
//     }

//     // Enhanced fbm function for better visual quality
//     float fbm(vec2 uv) {
//       float f = 0.0;
//       float amplitude = 0.5;
//       vec2 shift = vec2(100.0, 100.0);
//       for (int i = 0; i < 6; i++) {
//         f += amplitude * noise(uv);
//         uv = uv * 2.0 + shift;
//         amplitude *= 0.5;
//       }
//       return f;
//     }

//     // RGB Noise function
//     vec3 rgbNoise(vec2 uv) {
//       return vec3(fbm(uv * uRepeat * 0.02), fbm(uv * uRepeat * 0.02 + vec2(100.0)), fbm(uv * uRepeat * 0.02 + vec2(200.0)));
//     }

//     void main() {
//       vec2 uv = vUv;

//       vec4 textureColor = texture2D(uTex, uv);

//       // Generate RGB noise
//       vec3 noiseColor = rgbNoise(uv);

//       float smoothenProgression = remap(uProgression, 0.0, 1.0, -uSmoothness / 2.0, 1.0 + uSmoothness / 2.0);

//       vec3 finalColorRGB = mix(vec3(1.0), textureColor.rgb, smoothstep(smoothenProgression - uSmoothness / 2.0, smoothenProgression + uSmoothness / 2.0, noiseColor));

//       vec4 finalColor = vec4(finalColorRGB, textureColor.a);

//       gl_FragColor = finalColor;

//       #include <tonemapping_fragment>
//       #include <encodings_fragment>
//     }`)
// );

// export default TransitionMaterial;


import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";
import * as THREE from 'three';

const TransitionMaterial = shaderMaterial(
  {
    uProgression: 0,
    uTex: undefined,
    uRepeat: 1,
    uSmoothness: 1,
=======
import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";

export const TransitionMaterial = shaderMaterial(
  {
    uProgression: 1,
    uTex: undefined,
    uTex2: undefined,
    uTransition: 3,
    uRepeat: 1,
    uSmoothness: 0.5,
>>>>>>> d3539a09b88121c96ff5a12e385884dc6b9a8e7e
  },
  resolveLygia(/*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
<<<<<<< HEAD
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`),
  resolveLygia(/*glsl*/ `
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform float uProgression;
    uniform float uRepeat;
    uniform float uSmoothness;

    float inverseLerp(float value, float minValue, float maxValue) {
      return (value - minValue) / (maxValue - minValue);
    }

    float remap(float value, float inMin, float inMax, float outMin, float outMax) {
=======
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`),
  resolveLygia(/*glsl*/ ` 
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform sampler2D uTex2;
    uniform float uProgression;
    uniform float uRepeat;
    uniform int uTransition;
    uniform float uSmoothness;

    #include "lygia/generative/fbm.glsl"
    #include "lygia/generative/cnoise.glsl"
    #include "lygia/generative/worley.glsl"
    #include "lygia/generative/curl.glsl"

    float inverseLerp(float value, float minValue, float maxValue){
      return (value - minValue) / (maxValue - minValue);
    }

    float remap(float value, float inMin, float inMax, float outMin, float outMax){
>>>>>>> d3539a09b88121c96ff5a12e385884dc6b9a8e7e
      float t = inverseLerp(value, inMin, inMax);
      return mix(outMin, outMax, t);
    }

<<<<<<< HEAD
    // Simplified noise function
    float noise(vec2 uv) {
      return fract(sin(dot(uv.xy, vec2(20.9898, 78.233))) * 43758.5453);
    }

    // Simplified fbm function for better performance
    float fbm(vec2 uv) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 5; i++) {
        f += w * noise(uv);
        uv *= 2.0;
        w *= 0.5;
      }
      return f;
    }

    void main() {
      vec2 uv = vUv;

      vec4 textureColor = texture2D(uTex, uv);

      float pct = fbm(uv * uRepeat * 5000.0) * 0.5 + 0.5; // Increase noise size by 5000x

      float smoothenProgression = remap(uProgression, 0.0, 1.0, -uSmoothness / 2.0, 1.0 + uSmoothness / 2.0);

      pct = smoothstep(smoothenProgression - uSmoothness / 2.0, smoothenProgression + uSmoothness / 2.0, pct);

      vec4 finalColor = mix(vec4(textureColor.rgb, 0.0), textureColor, pct);

      gl_FragColor = finalColor;

=======
    void main() {
      vec2 uv = vUv;

      vec4 _texture = texture2D(uTex, uv);
      vec4 _texture2 = texture2D(uTex2, uv);

      float pct = 1.0;
      vec4 finalTexture;
      if (uTransition == 0) { // HORIZONTAL
       pct = mod(uv.x * uRepeat, 1.0);
      }
      if (uTransition == 1) { // VERTICAL
        pct = mod(uv.y * uRepeat, 1.0);
      }
      if (uTransition == 2) { // BOTH
        pct = mod(uv.y * uRepeat, 1.0) * mod(uv.x * uRepeat, 1.0);
      }
      if (uTransition == 3) { // FBM
        pct = fbm(uv * uRepeat) * 0.5 + 0.5;
      }
      if (uTransition == 4) { // CNOISE
        pct = cnoise(uv * uRepeat) * 0.5 + 0.5;
      }
      if (uTransition == 5) { // WORLEY
        pct = worley(uv * uRepeat) * 0.5 + 0.5;
      }
      if (uTransition == 6) { // CURL
        pct = curl(uv * uRepeat).x * 0.5 + 0.5;
      }

      // 0 -> 1
      // -uSmoothness / 2 -> 1 + uSmoothness / 2
      
      float smoothenProgression = remap(uProgression, 0.0, 1.0, -uSmoothness / 2.0, 1.0 + uSmoothness / 2.0);

      pct = smoothstep(smoothenProgression, smoothenProgression + uSmoothness / 2.0, pct);

      finalTexture = mix(_texture2, _texture, pct);

      gl_FragColor = finalTexture;
>>>>>>> d3539a09b88121c96ff5a12e385884dc6b9a8e7e
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`)
);

<<<<<<< HEAD
export default TransitionMaterial;



// #include <tonemapping_fragment>
// #include <encodings_fragment>
=======

>>>>>>> d3539a09b88121c96ff5a12e385884dc6b9a8e7e
