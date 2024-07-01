import { Float, MeshTransmissionMaterial, ShadowAlpha, useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

function Model({ zoom }) {

    const { nodes, materials } = useGLTF('/assets/Hoodie.glb')

    const modelContainer = useRef()
    const timeline = gsap.timeline()

    let zoomRatio = zoom ? 4.14 : .5

    const mouseMoveHandler = (e) => {
        const x = (e.clientX / window.innerWidth * 2) - 1
        const y = (e.clientY / window.innerHeight * 2) - 1

        timeline.clear()
        timeline
            .add('start')
            .to(modelContainer.current.rotation,
                {
                    y: x * zoomRatio, x: y * .1, delay: 0, duration: 1, ease: 'power1',
                }, 'start'
            )
            .to(modelContainer.current.rotation, { z: -x * .05, duration: .3 }, 'start')
    }

    useEffect(() => {

        window.addEventListener('mousemove', mouseMoveHandler)

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler)
        }

    }, [zoomRatio])

    return (
        <>
            <group position={[0, 10.5, -10]} scale={[.7, .7, .7]} ref={modelContainer}>
                <Float
                    speed={1} // Animation speed, defaults to 1
                    rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                    floatIntensity={.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                    floatingRange={[.2, .8]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                >
                    <group dispose={null}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Hoodie005.geometry}
                            material={materials.Hoodie}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Hoodie005_1.geometry}
                            material={materials.Letters}
                        />
                    </group>
                    {/* <ShadowAlpha /> */}
                    {/* <mesh rotation-x={-Math.PI / 2} position-y={-4} receiveShadow={true} >
                        <planeGeometry args={[10, 10]} />
                        <meshStandardMaterial />
                    </mesh> */}
                </Float>
            </group>
        </>
    )
}

export default Model
