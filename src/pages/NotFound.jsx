import { useContext, useEffect, useLayoutEffect } from "react"
import { PreloaderContext } from "../contexts/PreloaderContext"

export const NotFound = () => {

    const { isLoading, stopLoading, updateProgress, loadingProgress } = useContext(PreloaderContext)

    useEffect(() => {
        document.title = "404 - Página no encontrada"
        document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
    }, [])

    useEffect(() => {
       
        for(let i = loadingProgress; i <= 100; i++) {
            setTimeout(() => {
                updateProgress(i);
            }, i * 3);
        }
    }, [isLoading])

    useEffect( () => {
        console.log(loadingProgress)
        if (loadingProgress === 100) {
            stopLoading();
        }
    }, [loadingProgress])

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center font-dm text-center text-white gap-5 pr-10">
            <h1 className="text-6xl font-light">404</h1>
            <h2 className="text-2xl font-light">Página no encontrada</h2>
            <p className="text-lg max-w-lg">Lo sentimos, la página que estás buscando no existe. Por favor, verifica la URL o regresa a la página principal.</p>
        </section>
    )
}