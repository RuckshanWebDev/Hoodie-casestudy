import { Mask, useGLTF, useMask, useTexture } from "@react-three/drei"
import useMyStore from "../store"
import { useShallow } from "zustand/react/shallow"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"

function Enviroment() {

    const timeline = gsap.timeline()
    const timeline2 = gsap.timeline()
    const scene = useGLTF('/assets/env and sky2.glb')
    const scene4 = useGLTF('/assets/Hoodie_4_bg_plane.glb')
    const { nodes, materials } = useGLTF('/assets/GoatSky.glb')
    const { scaleFactor, currentScene, transitionState } = useMyStore(useShallow(state => ({
        scaleFactor: state.scaleFactor,
        currentScene: state.currentScene,
        transitionState: state.transitionState
    })))
    const camelScene = useRef()
    const goatSceneRef = useRef()
    const maskRef = useRef()
    const goatSkyRef = useRef()
    const goatTreeRef = useRef()
    const blueStreetRef = useRef()
    const shopRef = useRef()
    const noise = useRef()

    const texture = useTexture('/texture/IMAGE.png')
    texture.repeat.set(8, 6)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    const goatSkyTexture = useTexture('/texture/sky.jpg')
    const goatTreeTexture = useTexture('/texture/tree.png')
    const blueStreetTexture = useTexture('/texture/wall.jpg')
    const skyTexture = useTexture('/texture/sky-full.jpg')
    const shopTexture = useTexture('/texture/shop.jpg')
    goatSkyTexture.flipY = false
    goatTreeTexture.flipY = false
    const [transitionProgression, setTransitionProgression] = useState(0);
    const [transitionProgression2, setTransitionProgression2] = useState(1);
    const lastTimeRef = useRef(0);


    useEffect(() => {
        timeline2.clear()
        timeline2
            .to(noise.current.material, { opacity: .4, duration: 1 })
            .to(noise.current.material, { opacity: 0, duration: .5 })

        if (currentScene === 1) {
            shopRef.current.visible = false
            timeline
                .add('start')
                .to(scene.scene.position, {
                    z: -4,
                    x: 0,
                    delay: .5,
                    onStart: () => blueStreetRef.current.visible = false
                }, 'start')
        }
        if (currentScene === 2) {
            timeline
                .add('start')
                .to(scene.scene.position, {
                    z: -8,
                    x: -1,
                    delay: 1,
                    onComplete: () => {
                        camelScene.current.visible = true
                        blueStreetRef.current.visible = true
                    },
                    onStart: () => shopRef.current.visible = false
                }, 'start')
            // .to(noise.current.position, {
            //     z: -13,
            //     delay: .5,
            //     duration: .4,
            //     onStart: () => noise.current.visible = true,
            //     onComplete: () => {
            //         noise.current.visible = false
            //         camelScene.current.visible = true
            //     },
            // }, 'start')

        }
        if (currentScene === 3) {
            timeline
                .add('start')
                .to(blueStreetRef, {
                    onStart: () => {
                        camelScene.current.visible = false
                    },
                    // onComplete: () => {
                    //     shopRef.current.visible = false
                    // }
                })
        }
        if (currentScene === 4) {
            shopRef.current.visible = true
        }
    }, [currentScene])

    useFrame(({ clock }) => {

        const currentTime = clock.getElapsedTime();
        const deltaTime = currentTime - lastTimeRef.current;

        if (deltaTime < 1 / 60) return

        lastTimeRef.current = currentTime;


        if (currentScene === 1 && transitionState === 'playing') {
            setTransitionProgression(prev => Math.min(prev + 0.02, 1));
            setTransitionProgression2(0)
        } else if (currentScene === 2 && transitionState === 'playing') {
            setTransitionProgression(prev => Math.max(prev - 0.02, 0));
            setTransitionProgression2(prev => Math.max(prev - 0.02, 0));
        } else if (currentScene === 3 && transitionState === 'playing') {
            setTransitionProgression(prev => Math.max(prev + 0.01, 0));
            setTransitionProgression2(prev => Math.max(prev + 0.01, 0));
        } if (currentScene === 4 && transitionState === 'playing') {
            setTransitionProgression2(prev => Math.max(prev - 0.01, 0));
        }

        if (transitionState === 'ready' && currentScene < 3) {
            setTransitionProgression(currentScene === 1 ? 1 : 0);
        } else if (transitionState === 'ready' && currentScene === 3) {
            setTransitionProgression(1);
            setTransitionProgression2(1);
        } else if (transitionState === 'ready' && currentScene === 2) {
            setTransitionProgression2(1);
        } else if (transitionState === 'ready' && currentScene === 4) {
            setTransitionProgression2(0);
        }
        if (goatSkyRef.current) {
            goatSkyRef.current.material.uniforms.uProgression.value = transitionProgression;
            // goatTreeRef.current.material.uniforms.uProgression.value = transitionProgression;
            shopRef.current.material.uniforms.uProgression.value = transitionProgression2;
        }
    });

    return (
        <>
            {/* 01 */}
            <group position={[2, 0, 0]} scale={scaleFactor} ref={camelScene} >
                <primitive object={scene.scene} />
            </group>

            {/* <group position={[0, 2.8, -3]} dispose={null} scale={scaleFactor} ref={goatSceneRef} >
                <mesh
                    ref={goatSkyRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Sky.geometry}
                    position={[0, -1.155, -9.359]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={3.007}
                >
                    <transitionMaterial
                        attach="material"
                        uTex={goatSkyTexture}
                        uRepeat={1}
                        uSmoothness={0.5}
                        transparent={true}
                    />
                </mesh>
                <mesh
                    ref={goatTreeRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Foregrounda.geometry}
                    position={[0, 0.449, -7.49]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={2.273}
                >
                    <transitionMaterial
                        attach="material"
                        uTex={goatTreeTexture}
                        uRepeat={1}
                        uSmoothness={0.5}
                        transparent={true}
                    />
                </mesh>
            </group> */}

            {/* 02 */}
            <mesh position={[-5, 12, -11.5]} ref={goatSkyRef} scale={scaleFactor}>
                <planeGeometry args={[30, 16]} />
                <transitionMaterial
                    attach="material"
                    uTex={skyTexture}
                    uRepeat={1}
                    uSmoothness={0.5}
                    transparent={true}
                />
                {/* <meshBasicMaterial map={blueStreetTexture} /> */}
            </mesh >

            {/* 03 */}
            <mesh position={[-2, 10, -16.5]} ref={blueStreetRef} scale={scaleFactor}>
                <planeGeometry args={[30, 20]} />
                {/* <transitionMaterial
                    attach="material"
                    uTex={blueStreetTexture}
                    uRepeat={1}
                    uSmoothness={0.5}
                    transparent={true}
                /> */}
                <meshBasicMaterial map={blueStreetTexture} />
            </mesh >

            {/* 04 */}
            <mesh position={[-2, 10, -15.5]} ref={shopRef} scale={scaleFactor}>
                <planeGeometry args={[30, 20]} />
                <transitionMaterial
                    attach="material"
                    uTex={shopTexture}
                    uRepeat={1}
                    uSmoothness={0.5}
                    transparent={true}
                />
                {/* <meshBasicMaterial map={blueStreetTexture} /> */}
            </mesh >

            {/* <primitive object={scene4.scene} position={[0, -1, -8]} scale={scaleFactor} ref={shopRef} /> */}

            <mesh position={[0, 10, -10]} ref={noise} visible={transitionState === 'playing'} >
                <planeGeometry args={[30, 20]} />
                <meshBasicMaterial transparent={true} map={texture} />
            </mesh>
        </>
    )
}

export default Enviroment
