import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Base({ scaleFactor }) {

    const cloud1 = useRef()
    const cloud2 = useRef()
    const cloud3 = useRef()
    const cloud4 = useRef()
    const camel = useRef()

    const cloudTexture = useTexture('/texture/cloud.png')
    const cloudNoiseTexture = useTexture('/texture/cloudNoise.jpg')
    const camelTexture = useTexture('/texture/camel.png')

    cloudNoiseTexture.wrapS = THREE.RepeatWrapping
    cloudNoiseTexture.wrapT = THREE.RepeatWrapping


    useFrame(({ clock }) => {

        if (cloud1.current) cloud1.current.position.x = Math.sin(clock.elapsedTime * .005) * 8
        if (cloud2.current) cloud2.current.position.x = Math.sin(clock.elapsedTime * .01 + 10) * 10
        if (cloud3.current) cloud3.current.position.x = Math.sin(clock.elapsedTime * .01 + 20) * 10
        if (cloud4.current) cloud4.current.position.x = Math.sin(clock.elapsedTime * .01 + 5) * 10
        if (camel.current) camel.current.position.x -= .001

    })

    return (
        <>
            <group scale={scaleFactor}>
                <mesh position={[12, 12.4, -23]} scale={1} ref={camel} >
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial side={THREE.DoubleSide} map={camelTexture} transparent={true} alphaTest={.5} />
                </mesh>
                <mesh position={[-5, 13, -12]} ref={cloud1} scale={.8} >
                    <planeGeometry args={[15, 10]} />
                    <meshBasicMaterial side={THREE.DoubleSide} map={cloudTexture} alphaMap={cloudTexture} transparent={true} />
                </mesh>
                <mesh position={[-5, 13, -11]} ref={cloud4} scale={.8} >
                    <planeGeometry args={[15, 10]} />
                    <meshBasicMaterial side={THREE.DoubleSide} map={cloudTexture} alphaMap={cloudTexture} transparent={true} />
                </mesh>
                <mesh position={[5, 18.5, -21]} ref={cloud2}  >
                    <planeGeometry args={[15, 10]} />
                    <meshBasicMaterial side={THREE.DoubleSide} map={cloudTexture} alphaMap={cloudTexture} transparent={true} />
                </mesh>
                <mesh position={[5, 18, -22]} ref={cloud3} >
                    <planeGeometry args={[15, 10]} />
                    <meshBasicMaterial side={THREE.DoubleSide} map={cloudTexture} alphaMap={cloudTexture} transparent={true} />
                </mesh>
            </group>
        </>
    )
}

export default Base
