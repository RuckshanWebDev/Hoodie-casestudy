import React, { useEffect, useRef } from 'react'
import useMyStore from '../store';
import gsap from 'gsap';

const data = [
    {
        title: 'Desert Owners',
        text: `Our "Desert Owners" hoodie, straight out of the Moroccan desert vibes. It's all about sparking conversations — yeah, we're talking about who really owns the Sahara (We both know who does). Rock this hoodie, and you're not just wearing it, you're making a statement. Desert cool meets street-ready, right here.`
    },
    {
        title: 'Goated',
        text: `Introducing our "Goated" hoodie, where Moroccan charm meets streetwear cool. Picture this: argan trees adorned with goats—yeah, those goats are on top of their game, literally. It's not just about the design; it's about embracing the GOAT mentality. Stand tall, stand stylish in this ode to Morocco's natural wonders and urban vibe.`
    },
    {
        title: 'Blue Pearl',
        text: `The "Blue Pearl" hoodie, inspired by Chefchaouen's mesmerizing blue hues. A doorway to Moroccan magic, right on your chest. It's more than a hoodie; it's a tribute to the Blue Pearl of Morocco, capturing the essence of wanderlust and vibrant charm.`
    },
    {
        title: 'Weapons of Mass Destruction',
        text: `Our "Weapons of Mass Destruction" hoodie, featuring the favorite weapon of most Moroccan moms—the belgha—set ablaze. A playful nod to childhood memories and Moroccan tradition, wrapped in streetwear style.`
    },
]

function Ui() {

    const timeline = gsap.timeline()
    const title = useRef()
    const text = useRef()

    function navigateTo(path) {
        window.parent.postMessage({ path: path }, '*')
    }

    const currentScene = useMyStore(state => state.currentScene)
    const setCurrentScene = useMyStore(state => state.setCurrentScene)

    const indicatorHandler = (e) => {
        if (currentScene !== e.target.value * 1) {
            setCurrentScene(e.target.value * 1)
        }
    }

    useEffect(() => {
        timeline.clear()
        timeline
            .add('first')
            .to(title.current, { y: '100%', opacity: 0, duration: .8 }, 'first')
            .to(text.current, { opacity: 0, duration: .5 }, 'first')
            .to('.cta-btn', { opacity: 0, }, 'first')
            .to('.cta-btn', { opacity: 1, })
            .to(text.current, { opacity: 1 },)
            .to(title.current, { y: 0, opacity: 1, })
    }, [currentScene])

    // const origin = localStorage.getItem('origin')
    // console.log(origin);

    return (
        <>
            <div className="cursor md:block hidden">
                <div className="cursor__ball cursor__ball--big ">
                    <p className='text-xs cursor__ball--text select-none' style={{
                        width: '69px',
                        transform: 'translate(55px, 16px)'
                    }} >Click and Hold</p>
                </div>
                <div className="cursor__ball cursor__ball--small">
                    <svg height="10" width="10">
                        <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
                    </svg>
                </div>
            </div>


            <nav className="flex md:justify-between justify-center" >
                <div className='md:flex hidden gap-5 basis-1/4'>
                    <a className='text-lg font-medium select-none cursor-pointer' onClick={() => navigateTo('/')} >Home</a>
                    <a className='text-lg font-medium select-none cursor-pointer' onClick={() => navigateTo('/collections/all')} >Shop</a>
                    <a className='text-lg font-medium select-none' >Contact</a>
                </div>
                <h1 style={{
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: 'white',
                }} className="text-3xl font-light uppercase tracking-widest select-none	cursor-pointer" onClick={() => navigateTo('/')} >GENSDUMONDE</h1>
                <p className='text-sm font-thin select-none md:block hidden basis-1/4 text-end' >@ 2024</p>
            </nav>

            <div className="main">
                <div className='overflow-hidden' >
                    <h1 className='text-3xl md:text-5xl tracking-widest font-medium select-none' ref={title} >{data[currentScene - 1].title}</h1>
                </div>
                <p className='text-md select-none -tracking-wide mt-5 mb-8 leading-5' ref={text}>
                    {data[currentScene - 1].text}
                </p>
                <a className='cta-btn text-center md:inline block' onClick={() => navigateTo('/collections/all')} >View Collection</a>
            </div>

            <main>

            </main>

            <div id="indicator">
                <div className="flex flex-col space-y-4 p-5">

                    <label className="relative flex items-center cursor-pointer">
                        <input className="sr-only peer" name="futuristic-radio" type="radio" checked={currentScene === 1} value={1} />
                        <div
                            className="w-4 h-4 bg-transparent border-2 border-white rounded-full peer-checked:bg-white peer-checked:border-[#BA7A4D] peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                        ></div>
                    </label>
                    <label className="relative flex items-center cursor-pointer">
                        <input className="sr-only peer" name="futuristic-radio" type="radio" checked={currentScene === 2} value={2} />
                        <div
                            className="w-4 h-4 bg-transparent border-2 border-white rounded-full peer-checked:bg-white peer-checked:border-[#242018] peer-hover:shadow-lg peer-hover:shadow-[#242018] peer-checked:shadow-lg peer-checked:shadow-[#242018]  transition duration-300 ease-in-out"
                        ></div>
                    </label>
                    <label className="relative flex items-center cursor-pointer">
                        <input className="sr-only peer" name="futuristic-radio" type="radio" checked={currentScene === 3} value={3} />
                        <div
                            className="w-4 h-4 bg-transparent border-2 border-white rounded-full peer-checked:bg-white peer-checked:border-[#242018] peer-hover:shadow-lg peer-hover:shadow-[#242018] peer-checked:shadow-lg peer-checked:shadow-[#242018]  transition duration-300 ease-in-out"
                        ></div>
                    </label>
                    <label className="relative flex items-center cursor-pointer">
                        <input className="sr-only peer" name="futuristic-radio" type="radio" checked={currentScene === 4} value={4} />
                        <div
                            className="w-4 h-4 bg-transparent border-2 border-white rounded-full peer-checked:bg-white peer-checked:border-[#242018] peer-hover:shadow-lg peer-hover:shadow-[#242018] peer-checked:shadow-lg peer-checked:shadow-[#242018]  transition duration-300 ease-in-out"
                        ></div>
                    </label>
                </div>

            </div>

            <footer className=' items-center w-full justify-between hidden md:flex '>
                <div className="flex gap-2 items-baseline basis-1/4">
                    <div className="now playing" id="music">
                        <span className="bar n1">A</span>
                        <span className="bar n2">B</span>
                        <span className="bar n3">c</span>
                        <span className="bar n4">D</span>
                        <span className="bar n5">E</span>
                        <span className="bar n6">F</span>
                        {/* <span class="bar n7">G</span>
                        <span class="bar n8">H</span> */}
                    </div>
                    <p className='text-xs font-thin'>Sound</p>
                </div>
                <p className='text-xs font-medium align-middle tracking-widest select-none'>Scroll to change universe</p>
                <p className='text-xs font-medium align-middle select-none basis-1/4'></p>
            </footer>
        </>
    )
}

export default Ui
