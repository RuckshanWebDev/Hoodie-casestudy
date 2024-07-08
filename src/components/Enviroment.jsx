import { CameraControls, PerspectiveCamera, useFBO, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import gsap from 'gsap';
import useMyStore from "../store";
import { useShallow } from "zustand/react/shallow";

function Enviroment() {
    const viewport = useThree((state) => state.viewport);
    const { scaleFactor, currentScene } = useMyStore(useShallow(state => ({ scaleFactor: state.scaleFactor, currentScene: state.currentScene })));
    const renderedScene = useRef();
    const exampleScene = useRef();
    const renderMaterial = useRef();
    const renderTarget = useFBO();
    const renderTarget2 = useFBO();
    const [mode, setMode] = useState(0);
    const [prevMode, setPrevMode] = useState(0);
    const [progressionTarget] = useState(1);
    const [transitionSpeed] = useState(.5);
    const renderCamera = useRef();
    const controls = useRef();

    const { scene: scene1 } = useGLTF('/assets/env and sky1.glb');
    const { scene: scene2 } = useGLTF('/assets/GoatSky.glb');



    useFrame(({ gl, scene, camera }, delta) => {


        gl.setRenderTarget(renderTarget);

        if (prevMode === 2) {
            renderedScene.current.visible = false;
            exampleScene.current.visible = true;
        } else {
            renderedScene.current.visible = true;
            exampleScene.current.visible = false;
        }

        renderMaterial.current.uProgression = MathUtils.lerp(
            renderMaterial.current.uProgression,
            progressionTarget,
            delta * 1
        );


        gl.render(scene, camera);

        gl.setRenderTarget(renderTarget2);

        if (mode === 2) {
            renderedScene.current.visible = false;
            exampleScene.current.visible = true;
        } else {
            renderedScene.current.visible = true;
            exampleScene.current.visible = false;
        }

        gl.render(scene, camera);

        renderedScene.current.visible = false;
        exampleScene.current.visible = false;

        gl.setRenderTarget(null);
        renderMaterial.current.map = renderTarget.texture;
    });

    useEffect(() => {
        if (mode === prevMode) {
            return;
        }
        renderMaterial.current.uProgression = 0;
    }, [mode]);

    useEffect(() => {
        // renderCamera.current.position.set(0, 0, 50);
    }, []);

    useEffect(() => {
        // controls.current.camera = renderCamera.current;
    }, []);

    useEffect(() => {
        setMode((mode) => {
            setPrevMode(mode);
            return currentScene;
        });
    }, [currentScene]);

    return (
        <>
            <CameraControls enablePan={true} ref={controls} />
            {/* <PerspectiveCamera ref={renderCamera} position={[0, 20, 20]} fov={50} /> */}
            <mesh position={[0, -10, -20]}>
                <planeGeometry args={[viewport.width * 20, viewport.height * 20]} />
                <transitionMaterial
                    ref={renderMaterial}
                    uTex={renderTarget.texture}
                    uTex2={renderTarget2.texture}
                    toneMapped={false}
                />
            </mesh>
            <group position={[2, 0, 0]} scale={scaleFactor} ref={renderedScene} name="scene1">
                <primitive object={scene1} />
            </group>
            <group position={[0, 2.8, -5]} scale={scaleFactor} ref={exampleScene} name="scene2">
                <primitive object={scene2} />
            </group>
        </>
    );
}

export default Enviroment;
