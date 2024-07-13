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

  const cameraZPos = window.innerWidth < 769 ? 9.5 : 5.5

  useEffect(() => {
    const handleMouseMove = (e) => {
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

    camera.lookAt(0, 0, -100);
    gsap.to(camera.position, { z: cameraZPos, y: 12, duration: 2.5, delay: 1, ease: "power1.out" });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth * 2) - 1;
      const y = (touch.clientY / window.innerHeight * 2) - 1;

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

    const handleTouchStart = handleMouseDown;
    const handleTouchEnd = handleMouseUp;

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);


  return (
    <>
      {/* <OrbitControls target={[0, 10, 4]} ref={controls} /> */}
    </>
  )
}

export default Movement
