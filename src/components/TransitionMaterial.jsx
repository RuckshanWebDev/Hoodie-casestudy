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
  },
  resolveLygia(/*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
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
      float t = inverseLerp(value, inMin, inMax);
      return mix(outMin, outMax, t);
    }

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

      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`)
);

export default TransitionMaterial;



// #include <tonemapping_fragment>
// #include <encodings_fragment>
