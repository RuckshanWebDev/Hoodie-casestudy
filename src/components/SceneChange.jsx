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

    let prevTouch;
    const touchHandler = (e) => {
        if (transitionStateRef.current === 'ready') {
            if (e.type === 'touchstart') {
                prevTouch = e.touches[0].clientY
            }
            if (e.type === 'touchend') {
                if (prevTouch < e.changedTouches[0].clientY) {
                    console.log('h');
                    currentSceneRef.current > 1 && incScene(-1)
                } else if (prevTouch > e.changedTouches[0].clientY) {
                    console.log('j');
                    currentSceneRef.current < 4 && incScene(1)
                }
            }
        }
    }

    const scrollHandler = (e) => {
        if (transitionStateRef.current === 'ready') {
            if (e.deltaY < 0 && currentSceneRef.current > 1) {
                incScene(-1)
            } else if (e.deltaY > 0 && currentSceneRef.current < 4) {
                incScene(1)
            }
        }
    }

    useEffect(() => {
        document.body.addEventListener('wheel', scrollHandler)
        document.body.addEventListener('touchstart', touchHandler)
        document.body.addEventListener('touchend', touchHandler)
        return () => {
            document.body.removeEventListener('wheel', scrollHandler)
            document.body.removeEventListener('touchstart', touchHandler)
            document.body.removeEventListener('touchend', touchHandler)
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
