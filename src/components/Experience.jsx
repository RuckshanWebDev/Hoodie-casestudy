import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Wrapper from './Wrapeer'
import { EffectComposer, Glitch, Vignette } from '@react-three/postprocessing';

function Experience() {

    const load = () => {
        console.log('loaded');
    }


    return (
        <Canvas gl={{ antialias: true }} camera={{ fov: 40, position: [0, 11.4, -7.5], }} onLoadedData={load}   >

            {/* <directionalLight
                position={[0, 20, -5.5]}
                intensity={10.5}
                castShadow={true}
                color={0xff0000}
            // tagName
            // shadow-camera-near={0.1}
            // shadow-camera-far={20}
            // shadow-camera-left={-10}
            // shadow-camera-right={10}
            // shadow-camera-top={10}
            // shadow-camera-bottom={-10}
            /> */}

            {/* <EffectComposer enableNormalPass={false} >
                <Vignette eskil={false} offset={.1} darkness={0.1} />
                <Glitch
                    delay={[10, 10]} // min and max glitch delay
                    duration={[0.3, 0.5]} // min and max glitch duration
                    strength={[1, 1]} // min and max glitch strength
                    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                    ratio={.01} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                />
            </EffectComposer> */}

            <Environment files='/texture/little_paris_eiffel_tower_1k.hdr' />

            <ambientLight />

            <Wrapper />

        </Canvas>
    )
}

export default Experience
