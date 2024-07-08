import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { useStoreActions } from '../store'
import { OrbitControls } from '@react-three/drei'

function Movement() {

  const camera = useThree((state) => state.camera)
  const controls = useRef()
  const timeline = gsap.timeline()
  const zoomTimeline = gsap.timeline()
  const { setZoom, setTransitionState } = useStoreActions()

  // useEffect(() => {

  //   camera.lookAt(0, 0, -100)
  //   gsap.to(camera.position, { z: 5.5, y: 12, duration: 2.5, delay: 1, ease: "power1.out", })

  //   window.addEventListener('mousemove', (e) => {
  //     const x = (e.clientX / window.innerWidth * 2) - 1
  //     const y = (e.clientY / window.innerHeight * 2) - 1

  //     timeline.clear()
  //     timeline
  //       .add('start')
  //       .to(camera.rotation,
  //         { y: (x * .02) + .04, x: (y * .02) - .08, delay: 0, duration: 1, ease: 'power1' },
  //         'start')
  //       .to(camera.rotation, { z: x * .02, duration: .3 }, 'start')
  //   })

  //   window.addEventListener('mousedown', (e) => {
  //     zoomTimeline.clear()
  //     zoomTimeline
  //       .add('start')
  //       .to(camera.position, {
  //         z: 0, delay: .2, duration: 1,
  //         onStart: () => {
  //           setTransitionState('playing')
  //         },
  //         onComplete: () => {
  //           setZoom(true)
  //         }
  //       }, 'start')
  //     // .to(camera.rotation, { z: .2, delay: .2, duration: 1 }, 'start')
  //   })

  //   window.addEventListener('mouseup', (e) => {
  //     zoomTimeline.clear()
  //     zoomTimeline
  //       .add('start')
  //       .to(camera.position, {
  //         z: 5.5, delay: .2, duration: 1, onStart: () => {
  //           setZoom(false)
  //         },
  //         onComplete: () => {
  //           setTransitionState('ready')
  //         }
  //       }, 'start')
  //     // .to(camera.rotation, { z: 0, delay: .2, duration: 1 }, 'start')
  //   })

  // }, [])

  return (
    <>
      {/* <OrbitControls target={[0, 10, 4]} ref={controls} /> */}
    </>
  )
}

export default Movement
