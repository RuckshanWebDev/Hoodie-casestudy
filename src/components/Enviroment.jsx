import { Mask, useGLTF, useMask, useTexture } from "@react-three/drei"
import useMyStore from "../store"
import { useShallow } from "zustand/react/shallow"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"

function Enviroment() {

    const timeline = gsap.timeline()
    const scene = useGLTF('/assets/env and sky2.glb')
    const { nodes, materials } = useGLTF('/assets/GoatSky.glb')
    const { scaleFactor, currentScene, transitionState } = useMyStore(useShallow(state => ({
        scaleFactor: state.scaleFactor,
        currentScene: state.currentScene,
        transitionState: state.transitionState
    })))
    const goatSceneRef = useRef()
    const maskRef = useRef()
    const goatSkyRef = useRef()
    const goatTreeRef = useRef()
    const noise = useRef()

    const texture = useTexture('/texture/IMAGE.png')
    texture.repeat.set(10, 10)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    const goatSkyTexture = useTexture('/texture/sky.jpg')
    const goatTreeTexture = useTexture('/texture/tree.png')
    goatSkyTexture.flipY = false
    goatTreeTexture.flipY = false
    const [transitionProgression, setTransitionProgression] = useState(0);
    const lastTimeRef = useRef(0);


    useEffect(() => {

        if (currentScene === 1) {
            timeline
                .add('start')
                .to(scene.scene.position, {
                    z: -4,
                    x: 0,
                    delay: .5
                    // onComplete: () => goatSceneRef.current.visible = false
                }, 'start')
                .to(noise.current.position, {
                    z: -13,
                    delay: .5,
                    duration: .3,
                    onStart: () => noise.current.visible = true,
                    onComplete: () => noise.current.visible = false,
                }, 'start')
                .to(goatSceneRef.current.position, {
                    x: 1,
                    delay: .5
                }, 'start')
        }
        if (currentScene === 2) {
            timeline
                .add('start')
                .to(scene.scene.position, {
                    z: -4,
                    x: -1,
                    delay: 1,
                    // onComplete: () => scene.scene.visible = false
                }, 'start')
                .to(noise.current.position, {
                    z: -13,
                    delay: .5,
                    duration: .4,
                    onStart: () => noise.current.visible = true,
                    onComplete: () => noise.current.visible = false,
                }, 'start')
                .to(goatSceneRef.current.position, {
                    x: 0,
                    delay: .8
                }, 'start')
        }
    }, [currentScene])

    useFrame(({ clock }) => {

        const currentTime = clock.getElapsedTime();
        const deltaTime = currentTime - lastTimeRef.current;
        // console.log(deltaTime );

        if (deltaTime < 1 / 60) return

        lastTimeRef.current = currentTime;


        if (currentScene === 1 && transitionState === 'playing') {
            setTransitionProgression(prev => Math.min(prev + 0.02, 1));
        } else if (currentScene === 2 && transitionState === 'playing') {
            setTransitionProgression(prev => Math.max(prev - 0.02, 0));
        } else if (transitionState === 'ready') {
            setTransitionProgression(currentScene === 1 ? 1 : 0);
        }
        if (goatSkyRef.current) {
            goatSkyRef.current.material.uniforms.uProgression.value = transitionProgression;
            goatTreeRef.current.material.uniforms.uProgression.value = transitionProgression;
        }
    });

    return (
        <>
            <group position={[2, 0, 0]} scale={scaleFactor} >
                <primitive object={scene.scene} />
            </group>

            <group position={[0, 2.8, -3]} dispose={null} scale={scaleFactor} ref={goatSceneRef} >
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
            </group>


            <mesh position={[0, 10, -16]} ref={noise} >
                <planeGeometry args={[30, 20]} />
                <meshBasicMaterial transparent={true} map={texture} opacity={.5} />
            </mesh>
        </>
    )
}

export default Enviroment
