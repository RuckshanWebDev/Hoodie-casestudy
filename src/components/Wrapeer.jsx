import { useState } from 'react'
import Base from './Base'
import Enviroments from './Enviroment'
import Model from './Model'
import Movement from './Movement'
import { useThree } from '@react-three/fiber'

function Wrapper() {

    const viewport = useThree(state => state.viewport)
    const [zoom, setZoom] = useState(false)
    const scaleFactor = Math.max(Math.min((window.innerWidth / window.innerHeight) / 1.69, 2), 1)

    return (
        <>
            <Movement setZoom={setZoom} />

            <Enviroments scaleFactor={scaleFactor} />

            <Base scaleFactor={scaleFactor} />

            <Model zoom={zoom} scaleFactor={scaleFactor} />

        </>
    )
}

export default Wrapper
