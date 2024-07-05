import { Suspense, useEffect } from "react";
import './App.css';
import Experience from "./components/Experience.jsx";
import Loader from "./components/Loader.jsx";
import Ui from "./components/Ui.jsx";
import { TweenMax } from "gsap/gsap-core.js";
import useMyStore, { useStoreActions } from "./store.js";
import { useShallow } from "zustand/react/shallow";

function App() {

  const { currentScene } = useMyStore()
  console.log(currentScene);

  useEffect(() => {
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');

    document.body.addEventListener('mousemove', onMouseMove);

    function onMouseMove(e) {
      TweenMax.to($bigBall, 1, {
        x: e.pageX - 15,
        y: e.pageY - 15
      })
      TweenMax.to($smallBall, .1, {
        x: e.pageX - 5,
        y: e.pageY - 7
      })
    }
  }, [])

  return (
    <div className="app" >
      <Loader />
      <Suspense   >
        <Experience />
      </Suspense>
      <Ui />
    </div>
  )
}

export default App
