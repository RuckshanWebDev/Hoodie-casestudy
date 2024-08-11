import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import SplitType from 'split-type'

function Loader() {

    const para1 = useRef()
    const percentage = useRef()

    const [loadedAnimation, setLoadedAnimation] = useState(false)
    const progress = useProgress(state => state.progress)

    if (percentage.current) percentage.current.style.width = `${progress}%`

    useEffect(() => {
        if (progress === 100 && loadedAnimation) {
            console.log(loadedAnimation);
            const text = new SplitType('#split-text', { tagName: 'span', types: 'words' })
            gsap.fromTo(text.words,
                {
                    opacity: 1, // Start opacity
                },
                {
                    opacity: 0, // End opacity
                    duration: .5, // Duration of each animation
                    stagger: 0.1, // Delay between each letter animation
                    ease: "power3.in", // Easing function
                    onComplete: () => para1.current.style.display = 'none'
                }
            );
        }
    }, [progress, loadedAnimation])

    useEffect(() => {
        const text = new SplitType('#split-text', { tagName: 'span', types: 'words' })
        gsap.fromTo(text.words,
            {
                opacity: 0, // Start opacity
                y: 0
            },
            {
                y: 0,
                delay: 1,
                opacity: 1, // End opacity
                duration: .5, // Duration of each animation
                stagger: 0.1, // Delay between each letter animation
                ease: "power3.in", // Easing function
                onComplete: () => setLoadedAnimation(true)
            }
        )
    }, [])

    return (
        <div id='loader' ref={para1}>
            <div >
                {/* <span className='sub-para1' >We </span>
                <span className='sub-para1' >aim </span>
                <span className='sub-para1' >to </span>
                <span className='sub-para1' >enrich </span>
                <span className='sub-para1' >your </span>
                <span className='sub-para1' >daily </span>
                <span className='sub-para1' >living </span>
                <span className='sub-para1' >by </span>
                <span className='sub-para1' >offering </span>
                <span className='sub-para1' >the </span>
                <span className='sub-para1' >finest </span>
                <span className='sub-para1' >clothes</span> */}
                <span id='split-text' >We aim to enrich your daily living <br /> by offering the finest clothes.</span>
            </div>
            <div className="w-56 h-2 bg-black rounded-lg relative  mt-7">
                <div className="w-0 h-full  bg-[#FBFBFB] rounded-lg absolute top-1/2 -translate-y-1/2 left-0" ref={percentage}></div>
            </div>
        </div>
    )
}

export default Loader