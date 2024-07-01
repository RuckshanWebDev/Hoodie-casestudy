import vertex from '../shaders/border/vertex.glsl'
import fragment from '../shaders/border/fragment.glsl'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Border() {

    const noise = useRef()

    const noiseTexture = useTexture('/texture/noiseTexture.png')
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping

    useFrame(({ clock }) => {

        if (noise.current) noise.current.material.uniforms.uTime.value = clock.elapsedTime * .1

    })

    return (
        <>
            <mesh position={[20, 8, -0.3]} ref={noise}>
                <planeGeometry args={[20, 50]} />
                <shaderMaterial
                    side={THREE.DoubleSide}
                    attach={'material'}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    alphaTest={1}
                    transparent={true}
                    uniforms={{
                        color1: { value: new THREE.Color('#EC9F3900') },
                        color2: { value: new THREE.Color(0xEC9F39) },
                        uTime: new THREE.Uniform(0),
                        uNoiseTexture: new THREE.Uniform(noiseTexture)
                    }}
                />
            </mesh>
            <mesh position={[-20, 8, -0]} ref={noise} rotation-y={Math.PI}>
                <planeGeometry args={[20, 50]} />
                <shaderMaterial
                    side={THREE.DoubleSide}
                    attach={'material'}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    alphaTest={1}
                    transparent={true}
                    uniforms={{
                        color1: { value: new THREE.Color('#EC9F3900') },
                        color2: { value: new THREE.Color(0xEC9F39) },
                        uTime: new THREE.Uniform(0),
                        uNoiseTexture: new THREE.Uniform(noiseTexture)
                    }}
                />
            </mesh>
            <mesh position={[0, 20, -0.1]} ref={noise} rotation-z={Math.PI / 2}>
                <planeGeometry args={[20, 50]} />
                <shaderMaterial
                    side={THREE.DoubleSide}
                    attach={'material'}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    alphaTest={1}
                    transparent={true}
                    uniforms={{
                        color1: { value: new THREE.Color('#EC9F3900') },
                        color2: { value: new THREE.Color(0xEC9F39) },
                        uTime: new THREE.Uniform(0),
                        uNoiseTexture: new THREE.Uniform(noiseTexture)
                    }}
                />
            </mesh>
            <mesh position={[0, -3, -0.2]} ref={noise} rotation-z={-Math.PI / 2}>
                <planeGeometry args={[20, 50]} />
                <shaderMaterial
                    side={THREE.DoubleSide}
                    attach={'material'}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    alphaTest={1}
                    transparent={true}
                    uniforms={{
                        color1: { value: new THREE.Color('#EC9F3900') },
                        color2: { value: new THREE.Color(0xEC9F39) },
                        uTime: new THREE.Uniform(0),
                        uNoiseTexture: new THREE.Uniform(noiseTexture)
                    }}
                />
            </mesh>
        </>
    )
}

export default Border
