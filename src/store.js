import { create } from 'zustand'

const useMyStore = create((set) => ({
    zoom: false,
    scaleFactor: 0,
    transitionState: 'ready', // [playing, ready]
    currentScene: 2,
    actions: {
        setZoom: (value) => set({ zoom: value }),
        setScaleFactor: (value) => set({ scaleFactor: value }),
        setTransitionState: (value) => set({ transitionState: value }),
    },
    setCurrentScene: (newScene) => set({ currentScene: newScene }),
}))

export default useMyStore;
export const useStoreActions = () => useMyStore((state) => state.actions)
