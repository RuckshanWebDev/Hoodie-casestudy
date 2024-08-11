import { useEffect, useState } from 'react'
import Base from './Base'
import Enviroments from './Enviroment'
import Model from './Model'
import Movement from './Movement'
import { useThree } from '@react-three/fiber'
import useMyStore, { useStoreActions } from '../store'
import SceneChange from './SceneChange'

function Wrapper() {

    const viewport = useThree(state => state.viewport)
    const { zoom } = useMyStore()
    const { setScaleFactor } = useStoreActions()

    useEffect(() => {
        setScaleFactor(Math.max(Math.min(viewport.aspect / 1.69, 2), 1))
    }, [viewport])

    return (
        <>
            <Movement />

            <Enviroments />

            <Base />

            <Model />

            <SceneChange />

        </>
    )
}

export default Wrapper
