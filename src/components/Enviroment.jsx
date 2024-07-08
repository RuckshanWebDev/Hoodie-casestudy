import { CameraControls, Mask, PerspectiveCamera, useFBO, useGLTF, useMask } from "@react-three/drei"
import useMyStore from "../store"
import { useShallow } from "zustand/react/shallow"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import * as THREE from 'three'
import { useFrame, useThree } from "@react-three/fiber"
import { DEG2RAD } from "three/src/math/MathUtils";

import { MathUtils } from "three";

function Enviroment() {

    const viewport = useThree((state) => state.viewport);
    const camera = useThree((state) => state.camera);
    const timeline = gsap.timeline()
    const scene = useGLTF('/assets/env and sky1.glb')
    const scene2 = useGLTF('/assets/GoatSky.glb')
    const { scaleFactor, currentScene } = useMyStore(useShallow(state => ({ scaleFactor: state.scaleFactor, currentScene: state.currentScene })))

    const renderedScene = useRef();
    const exampleScene = useRef();
    const renderMaterial = useRef();
    const renderTarget = useFBO();
    const renderTarget2 = useFBO();
    console.log(renderTarget);
    const [mode, setMode] = useState('EXAMPLE_SCENE');
    const [prevMode, setPrevMode] = useState(0);
    const [progressionTarget] = useState(1);
    const [transitionSpeed] = useState(.2);
    const renderCamera = useRef();
    const controls = useRef();

    useFrame(({ gl, scene }, delta) => {

        gl.setRenderTarget(renderTarget);

        if (prevMode === 1) {
            renderedScene.current.visible = false;
            exampleScene.current.visible = true;
        } else {
            renderedScene.current.visible = true;
            exampleScene.current.visible = false;
        }

        renderMaterial.current.uProgression = MathUtils.lerp(
            renderMaterial.current.uProgression,
            progressionTarget,
            delta * transitionSpeed
        );
        gl.render(scene, renderCamera.current);

        gl.setRenderTarget(renderTarget2);

        if (mode === 1) {
            renderedScene.current.visible = false;
            exampleScene.current.visible = true;
        } else {
            renderedScene.current.visible = true;
            exampleScene.current.visible = false;
        }

        gl.render(scene, renderCamera.current);

        renderedScene.current.visible = false;
        exampleScene.current.visible = false;

        gl.setRenderTarget(null);
        renderMaterial.current.map = renderTarget.texture;
    });

    useEffect(() => {
        // Set the camera position directly
        renderCamera.current.position.set(0, 0, 20);

        // Make sure CameraControls uses the updated camera position
        // controls.current.camera = renderCamera.current;
        // 
        // controls.current.updateCamera(renderCamera.current);
        // controls.current.update();
    }, []);

    useEffect(() => {

        controls.current.camera = renderCamera.current;
        controls.current.setLookAt(
            20.0146122041349432,
            2.822796205893349,
            10.587088991637922,
            1.0858141754116573,
            1.9366397611967157,
            1.7546919697281576
        );
    }, []);

    useEffect(() => {
        setPrevMode(mode);
        setMode(currentScene);
    }, [currentScene])

    return (
        <>
            <CameraControls
                enablePan={true}
                minPolarAngle={DEG2RAD * 70}
                maxPolarAngle={DEG2RAD * 85}
                minAzimuthAngle={DEG2RAD * -30}
                maxAzimuthAngle={DEG2RAD * 30}
                // minDistance={5}
                // maxDistance={9}
                ref={controls}
            />
            <PerspectiveCamera ref={renderCamera} position={[-5, 5, 20]} />
            <mesh position={[0, -15, -20]} >
                <planeGeometry args={[50, 40]} />
                <transitionMaterial
                    ref={renderMaterial}
                    uTex={renderTarget.texture}
                    uTex2={renderTarget2.texture}
                    toneMapped={false}
                />
            </mesh>
            <group position={[2, 0, 0]} scale={scaleFactor} ref={renderedScene} >
                <primitive object={scene.scene} />
            </group>
            <group position={[0, 2.8, -5]} scale={scaleFactor} ref={exampleScene} >
                <primitive object={scene2.scene} />
            </group>

        </>
    )
}

export default Enviroment
