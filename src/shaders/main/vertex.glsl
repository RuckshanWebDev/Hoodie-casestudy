varying vec2 vUv;

void main(){

    vUv = uv;

    // MVP
    gl_Position  = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}