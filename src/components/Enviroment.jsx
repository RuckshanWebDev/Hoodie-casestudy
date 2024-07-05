import { Mask, useGLTF, useMask } from "@react-three/drei"
import useMyStore from "../store"
import { useShallow } from "zustand/react/shallow"
import { useEffect, useRef } from "react"
import gsap from 'gsap'
import * as THREE from 'three'

function Enviroment() {

    const timeline = gsap.timeline()
    const scene = useGLTF('/assets/env and sky1.glb')
    const { nodes, materials } = useGLTF('/assets/GoatSky.glb')
    const { scaleFactor, currentScene } = useMyStore(useShallow(state => ({ scaleFactor: state.scaleFactor, currentScene: state.currentScene })))
    const goatSceneRef = useRef()
    const maskRef = useRef()

    const stencil = useMask(1, false)
    console.log(scene.scene);

    useEffect(() => {

        if (currentScene === 1) {
            timeline
                .add('start')
                .to(maskRef.current.position, {
                    x: 30,
                    duration: 2.5
                    // onStart: () => scene.scene.visible = true
                }, 'start')
                .to(scene.scene.position, {
                    z: -2
                    // onComplete: () => goatSceneRef.current.visible = false
                }, 'start')
        }
        if (currentScene === 2) {
            timeline
                .add('start')
                .to(maskRef.current.position, {
                    duration: 2.5,
                    x: 0,
                    // onStart: () => scene2.scene.visible = true
                    // onStart: () => goatSceneRef.current.visible = true
                }, 'start')
                .to(scene.scene.position, {
                    z: -8
                    // onComplete: () => scene.scene.visible = false
                }, 'start')
        }
    }, [currentScene])

    return (
        <>
            {/* <primitive object={camel.scene} /> */}
            <group position={[2, 0, 0]} scale={scaleFactor} >
                <primitive object={scene.scene} />
            </group>

            {/* <group position={[0, 2.8, -5]} scale={scaleFactor} >
                <primitive object={scene2.scene} />
            </group> */}
            <group position={[0, 2.8, -3]} dispose={null} scale={scaleFactor} ref={goatSceneRef} >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sky.geometry}
                    // material={materials.Sky}
                    position={[0, -1.155, -9.359]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={3.007}
                >
                    <meshBasicMaterial clone={materials.Sky} map={materials.Sky.map} {...stencil} />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Foregrounda.geometry}
                    material={materials.Tree}
                    position={[0, 0.449, -7.49]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={2.273}
                >
                    <meshBasicMaterial clone={materials.Tree} map={materials.Tree.map} {...stencil} transparent={true} />
                </mesh>
            </group>

            <Mask material={new THREE.MeshBasicMaterial({ color: 0xff0000 })} ref={maskRef} position={[0, 10, -15]} rotation-x={-Math.PI} rotation-y={-Math.PI} id={1} colorWrite={true} depthWrite={false}  >
                <planeGeometry args={[30, 20]} />

            </Mask>
        </>
    )
}

export default Enviroment
