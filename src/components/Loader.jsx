import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import SplitType from 'split-type'

function Loader() {

    const para1 = useRef()

    const [loadedAnimation, setLoadedAnimation] = useState(false)
    const { active, progress, errors, item, loaded, total } = useProgress()

    useEffect(() => {
        if (progress === 100 && loadedAnimation ) {
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
                    onComplete : ()=> para1.current.style.display = 'none'
                }
            );
        }
    }, [progress, loadedAnimation])

    useEffect(() => {
        const text = new SplitType('#split-text', { tagName: 'span', types: 'words' })
            gsap.fromTo(text.words,
                {
                opacity:0, // Start opacity
                y : 0
            },
            {
                y: 0,
                delay : 1,
                opacity: 1, // End opacity
                duration:.5, // Duration of each animation
                stagger: 0.1, // Delay between each letter animation
                ease: "power3.in", // Easing function
                onComplete :  ()=> setLoadedAnimation(true)
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
        </div>
    )
}

export default Loader


//     < script src = "https://unpkg.com/split-type" ></script >
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

// <script>
// let typeSplit = new SplitType('[animate]', {
//   types: 'lines, words, chars',
//   tagName: 'span'
// })

// gsap.from('[animate] .char', {
//   y: '100%',
//   opacity: 1,
//   duration: 0.5,
//   ease: 'power1.out',
//   stagger: 0.1,
  
// })
// </script>

//     < script src = "https://unpkg.com/split-type" ></script >
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>

// <script>
// let typeSplit = new SplitType('[animate]', {
//   types: 'lines, words, chars',
//   tagName: 'span'
// })

// gsap.from('[animate] .char', {
//   y: '100%',
//   opacity: 1,
//   duration: 0.25,
//   ease: 'Second.inOut',
//   stagger: 0.1,
  
//   scrollTrigger: {
//     trigger: '[animate]',
//     start: 'top center',
    
//   }
// })
// </script>