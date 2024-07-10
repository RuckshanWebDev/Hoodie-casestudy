import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";
import * as THREE from 'three'

const TransitionMaterial = shaderMaterial(
  {
    uProgression: 0,
    uTex: undefined,
    uRepeat: 1,
    uSmoothness: 0.5,
  },
  resolveLygia(/*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`),
  resolveLygia(/*glsl*/ ` 
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform float uProgression;
    uniform float uRepeat;
    uniform float uSmoothness;

    #include "lygia/generative/fbm.glsl"

    float inverseLerp(float value, float minValue, float maxValue) {
      return (value - minValue) / (maxValue - minValue);
    }

    float remap(float value, float inMin, float inMax, float outMin, float outMax) {
      float t = inverseLerp(value, inMin, inMax);
      return mix(outMin, outMax, t);
    }

    void main() {
      vec2 uv = vUv;

      vec4 textureColor = texture2D(uTex, uv);

      float pct = fbm(uv * uRepeat) * 0.5 + 0.5;

      float smoothenProgression = remap(uProgression, 0.0, 1.0, -uSmoothness / 2.0, 1.0 + uSmoothness / 2.0);

      pct = smoothstep(smoothenProgression, smoothenProgression + uSmoothness / 2.0, pct);

      vec4 finalColor = mix(vec4(textureColor.rgb, 0.0), textureColor, pct);

      gl_FragColor = finalColor;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`)
);

export default TransitionMaterial
