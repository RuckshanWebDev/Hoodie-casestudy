import { Float, useGLTF, useTexture } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useMyStore, { useStoreActions } from '../store'
import * as THREE from 'three'

function Model() {

    const [prevState, setPrevState] = useState(0)
    const hoodieText = useRef()
    const { nodes, materials } = useGLTF('/assets/Hoodie_V3.glb')
    const { zoom, currentScene, init } = useMyStore(useShallow(state => ({ zoom: state.zoom, currentScene: state.currentScene, init: state.init })))
    const { setTransitionState } = useStoreActions()
    const blackTexture = useTexture('/assets/BlackDiffuce.jpg')
    const brownTexture = useTexture('/assets/BrownDiffuce.jpg')
    const blueTexture = useTexture('/assets/BlueDiffuce.jpg')
    const greyTexture = useTexture('/assets/Diffuce.jpg')
    brownTexture.colorSpace = THREE.SRGBColorSpace
    blackTexture.colorSpace = THREE.SRGBColorSpace
    blueTexture.colorSpace = THREE.SRGBColorSpace
    greyTexture.colorSpace = THREE.SRGBColorSpace

    const modelContainer = useRef()
    const model = useRef()
    const timeline = gsap.timeline()

    function frontFaceCalc(val, direction) {
        const bal = val % (2 * Math.PI)
        console.log(val);

        if (!direction) {
            return (val + bal) + (Math.PI * 8)
        } else {
            return (val + bal) - (-Math.PI * 8)
        }
    }

    let zoomRatio = zoom ? 4.14 : .5

    const mouseMoveHandler = (e) => {
        if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return
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
        let count = 0
        if (currentScene === 1 && init) {
            hoodieText.current.visible = true
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y, currentScene > prevState), delay: 0, duration: 3.5, ease: 'power4.out',
                        onUpdate: function () {
                            count++
                            if (count === 40) {
                                materials.uniform_1001.map = brownTexture
                                materials.uniform_1001.needsUpdate = true
                            }
                        },
                        onComplete: () => {
                            count = 0
                            setPrevState(currentScene)
                            setTransitionState('ready')
                        }
                    }, 'start'
                )
        } else if (currentScene === 2) {
            hoodieText.current.visible = false
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y, currentScene > prevState), delay: 0, duration: 3.5, ease: 'power4.out',
                        onUpdate: function () {
                            count++
                            if (count === 40) {
                                materials.uniform_1001.map = blackTexture
                                materials.uniform_1001.needsUpdate = true
                            }
                        },
                        onComplete: () => {
                            count = 0
                            setPrevState(currentScene)
                            setTransitionState('ready')
                        }
                    }, 'start'
                )
        } else if (currentScene === 3) {
            hoodieText.current.visible = false
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y, currentScene > prevState), delay: 0, duration: 3.5, ease: 'power4.out',
                        onUpdate: function () {
                            count++
                            if (count === 40) {
                                materials.uniform_1001.map = blueTexture
                                materials.uniform_1001.needsUpdate = true
                            }
                        },
                        onComplete: () => {
                            count = 0
                            setPrevState(currentScene)
                            setTransitionState('ready')
                        }
                    }, 'start'
                )
        } else if (currentScene === 4) {
            hoodieText.current.visible = false
            setTransitionState('playing')
            timeline
                .add('start')
                .to(model.current.rotation,
                    {
                        y: frontFaceCalc(model.current.rotation.y, currentScene > prevState), delay: 0, duration: 3.5, ease: 'power4.out',
                        onUpdate: function () {
                            count++
                            if (count === 40) {
                                materials.uniform_1001.map = greyTexture
                                materials.uniform_1001.needsUpdate = true
                            }
                        },
                        onComplete: () => {
                            count = 0
                            setPrevState(currentScene)
                            setTransitionState('ready')
                        }
                    }, 'start'
                )
        }
    }, [currentScene])




    return (
        <>
            <group position={[window.innerWidth < 769 ? 0 : -.4, 6.2, -8]} scale={[.7, .7, .7]} ref={modelContainer}>
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
