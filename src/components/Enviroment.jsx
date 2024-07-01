import { useGLTF } from "@react-three/drei"

function Enviroment({ scaleFactor }) {

    const scene = useGLTF('/assets/env and sky1.glb')

    return (
        <>
            {/* <primitive object={camel.scene} /> */}
            <group position={[2, 0, 0]} scale={scaleFactor} >
                <primitive object={scene.scene} />
            </group>
        </>
    )
}

export default Enviroment
