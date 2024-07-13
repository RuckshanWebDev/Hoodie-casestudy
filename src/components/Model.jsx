import { Float, useGLTF, useTexture } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useMyStore, { useStoreActions } from '../store'
import * as THREE from 'three'

function Model() {

    const hoodieText = useRef()
    const { nodes, materials } = useGLTF('/assets/Hoodie_V3.glb')
    const { zoom, currentScene, init } = useMyStore(useShallow(state => ({ zoom: state.zoom, currentScene: state.currentScene, init: state.init })))
    const { setTransitionState } = useStoreActions()
    const blackTexture = useTexture('/assets/BlackDiffuce.jpg')
    const brownTexture = useTexture('/assets/BrownDiffuce.jpg')
    brownTexture.colorSpace = THREE.SRGBColorSpace
    blackTexture.colorSpace = THREE.SRGBColorSpace

    const modelContainer = useRef()
    const model = useRef()
    const timeline = gsap.timeline()

    function frontFaceCalc(val) {
        const bal = val % (2 * Math.PI)
        console.log((val + bal) % Math.PI);
        return val + bal
    }

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

    useEffect(() => {
        if (currentScene === 1 && init) {
            materials.uniform_1001.map = brownTexture
            materials.uniform_1001.needsUpdate = true
            hoodieText.current.visible = true
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y + Math.PI * 8), delay: 0, duration: 3.5, ease: 'power4.out',
                        onComplete: () => { console.log('changed'); setTransitionState('ready') }
                    }, 'start'
                )
        }
        if (currentScene === 2) {
            materials.uniform_1001.map = blackTexture
            materials.uniform_1001.needsUpdate = true
            hoodieText.current.visible = false
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y - Math.PI * 8), delay: 0, duration: 3.5, ease: 'power4.out',
                        onComplete: () => setTransitionState('ready')
                    }, 'start'
                )

        }
    }, [currentScene])



    return (
        <>
            <group position={[-.4, 6.2, -8]} scale={[.7, .7, .7]} ref={modelContainer}>
                <Float
                    speed={1} // Animation speed, defaults to 1
                    rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                    floatIntensity={.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                    floatingRange={[.2, .8]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                >
                    <group ref={model} dispose={null}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Hoodie.geometry}
                            material={materials.uniform_1001}
                            position={[0.063, 6.202, -0.163]}
                        />
                        <mesh
                            ref={hoodieText}
                            castShadow
                            receiveShadow
                            geometry={nodes.Embed_Text.geometry}
                            material={materials.Letters}
                            position={[-0.355, 7.547, 1.243]}
                        />
                    </group>
                </Float>
            </group>
        </>
    )
}

export default Model
