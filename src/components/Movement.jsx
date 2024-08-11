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


  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const isMobile = detectMob()
  const cameraZPos = isMobile ? 2.2 : 5.5

  useEffect(() => {

    const handleMouseMove = (e) => {
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return
      const x = (e.clientX / window.innerWidth * 2) - 1;
      const y = (e.clientY / window.innerHeight * 2) - 1;

      timeline.clear();
      timeline
        .add('start')
        .to(camera.rotation, {
          y: (x * .02) + .04,
          x: (y * .02) - .08,
          delay: 0,
          duration: 1,
          ease: 'power1',
        }, 'start')
        .to(camera.rotation, { z: x * .02, duration: .3 }, 'start');
    };

    const handleMouseDown = () => {
      zoomTimeline.clear();
      zoomTimeline
        .add('start')
        .to(camera.position, {
          z: 0,
          delay: .2,
          duration: 1,
          onStart: () => {
            setTransitionState('playing');
          },
          onComplete: () => {
            setZoom(true);
          }
        }, 'start');
    };

    const handleMouseUp = () => {
      zoomTimeline.clear();
      zoomTimeline
        .add('start')
        .to(camera.position, {
          z: cameraZPos,
          delay: .2,
          duration: 1,
          onStart: () => {
            setZoom(false);
          },
          onComplete: () => {
            setTransitionState('ready');
          }
        }, 'start');
    };

    camera.lookAt(0, isMobile ? 12 : 0, -100);
    gsap.to(camera.position, { z: cameraZPos, y: isMobile ? 11 : 12, duration: 2.5, delay: 1, ease: "power1.out" });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  return (
    <>
      {/* <OrbitControls target={[0, 10, 4]} ref={controls} /> */}
    </>
  )
}

export default Movement
