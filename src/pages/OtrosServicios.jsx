import { useContext, useEffect } from "react"
import { PreloaderContext } from "../contexts/PreloaderContext";


export const OtrosServicios = () => {

    

    const { startLoading, stopLoading, updateProgress, isLoading } = useContext(PreloaderContext);

    useEffect(() => {
        document.title = "Almattia - Otros Servicios"
        
        // Simula un progreso rápido para página estática
        updateProgress(30)
        setTimeout(() => updateProgress(60), 50)
        setTimeout(() => updateProgress(90), 100)
        setTimeout(() => stopLoading(), 200)

    }, [])

    useEffect(() => {
        document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
    }, [isLoading])

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center font-dm text-center text-white gap-5 pr-10">
            <h1 className="text-6xl font-light">Otros Servicios</h1>
            <h2 className="text-2xl font-light">Página en construcción</h2>
            <p className="text-lg max-w-lg">Lo sentimos, esta página aún está en desarrollo. Por favor, regresa más tarde para ver los servicios adicionales que ofreceremos.</p>
        </section>
    )
}   