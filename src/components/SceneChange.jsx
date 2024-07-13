import React, { useEffect, useRef, useState } from 'react'
import useMyStore, { useStoreActions } from '../store'

function SceneChange() {
    const { transitionState, currentScene, setCurrentScene, init } = useMyStore()
    const { setInit } = useStoreActions()
    const currentSceneRef = useRef(currentScene)
    const transitionStateRef = useRef(transitionState)

    const incScene = (val) => {
        init || setInit()
        const newScene = currentSceneRef.current + val
        setCurrentScene(newScene)
    }

    const scrollHandler = (e) => {
        console.log(transitionStateRef.current);
        if (transitionStateRef.current === 'ready') {
            if (e.deltaY < 0 && currentSceneRef.current > 1) {
                incScene(-1)
            } else if (e.deltaY > 0 && currentSceneRef.current < 2) {
                incScene(1)
            }
        }
    }

    useEffect(() => {
        document.body.addEventListener('wheel', scrollHandler)
        return () => {
            document.body.removeEventListener('wheel', scrollHandler)
        }
    }, [])

    useEffect(() => {
        currentSceneRef.current = currentScene
    }, [currentScene])

    useEffect(() => {
        transitionStateRef.current = transitionState
    }, [transitionState])

    return (
        <>
        </>
    )
}

export default SceneChange
