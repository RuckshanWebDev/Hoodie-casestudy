import React from 'react'

function Ui() {

    function navigateTo(path) {
        window.parent.postMessage({ path: path }, '*');
    }


    // const origin = localStorage.getItem('origin')
    // console.log(origin);
    return (
        <>
            <div className="cursor">
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


            <nav className="flex justify-between" >
                <div className='flex gap-5'>
                    <a className='text-lg font-medium' href="#">Home</a>
                    <a className='text-lg font-medium' onClick={() => navigateTo('/collections/all')} >Shop</a>
                    <a className='text-lg font-medium' onClick={() => navigateTo('/contact')}>Contact</a>
                </div>
                <h1 style={{
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: 'white',
                }} className="text-3xl font-light uppercase tracking-widest select-none	" >Desert Owners</h1>
                <p className='text-sm font-thin select-none' >@ 2024</p>
            </nav>

            <h1 className='main text-3xl md:text-5xl tracking-widest font-medium select-none' >THE VIA <br /> JOURNEY
                <p className='text-sm select-none -tracking-wide mt-5 mb-3' >
                    Dive into Louis Vuitton's exploration of new digital <br />
                    frontiers through VIA, the Maison's first digital trunk. <br />
                    Representing an ever-evolving imagination, VIA <br />
                    exemplifies the spirit of travel intrinsic to the <br />
                    Maison's ethos. It’s a narrative of open-ended <br />
                    wonder, unconfined by traditional boundaries.
                </p>
                <a className='cta-btn' onClick={() => navigateTo('/collections/all')} >View Collection</a>
            </h1>

            <main>

            </main>

            <footer className=' items-center w-full justify-between hidden md:flex '>
                <div className="flex gap-2 items-baseline">
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
                <p className='text-xs font-medium align-middle select-none'></p>
            </footer>
        </>
    )
}

export default Ui
