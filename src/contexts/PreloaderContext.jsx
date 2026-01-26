import { createContext, useState, useEffect, useRef } from "react" // 1. Importa useRef
import { useLocation } from "react-router-dom"
import { PreLoader } from "../components/ui/PreLoader"

export const PreloaderContext = createContext()

export const PreloaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [showContent, setShowContent] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [isFromCache, setIsFromCache] = useState(false)
    const location = useLocation()

    // Referencia para el timer de fallback
    const fallbackTimer = useRef(null)

    const startLoading = (fromCache = false) => {
        setShowContent(false)
        setIsLoading(true)
        setLoadingProgress(0)
        setDataLoaded(false)
        setImagesLoaded(false)
        setIsFromCache(fromCache)

        // Limpiamos cualquier timer anterior
        if (fallbackTimer.current) {
            clearTimeout(fallbackTimer.current)
        }

        // Fallback de seguridad: tiempo más corto si viene del caché
        const fallbackTime = fromCache ? 3000 : 8000
        fallbackTimer.current = setTimeout(() => {
            console.warn('Preloader fallback: stopLoading() no fue llamado, completando automáticamente')
            stopLoading()
        }, fallbackTime)
    }

    const stopLoading = () => {
        // Completar inmediatamente sin esperar imágenes
        setLoadingProgress(100)
        setDataLoaded(true)
        setImagesLoaded(true) // Marcar imágenes como cargadas inmediatamente
    }

    // Función para que las páginas puedan actualizar el progreso manualmente
    const updateProgress = (progress) => {
        setLoadingProgress(Math.min(progress, 100))
    }

    // Cuando tanto datos como imágenes están listos, completar el preloader
    useEffect(() => {
        if (dataLoaded && imagesLoaded) {
            // Paramos todos los timers
            if (fallbackTimer.current) {
                clearTimeout(fallbackTimer.current)
            }

            // Forzamos el 100% y ejecutamos la lógica de salida
            setLoadingProgress(100)
            setTimeout(() => {
                setIsLoading(false)
                // Scrollear arriba cuando el preloader se oculta
                window.scrollTo(0, 0)
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
                // Mostramos el contenido inmediatamente cuando el preloader se oculta
                setTimeout(() => {
                    setShowContent(true)
                    // Asegurar que está arriba después de mostrar el contenido
                    window.scrollTo(0, 0)
                }, 50)
            }, 300)
        }
    }, [dataLoaded, imagesLoaded])

    // Controlar el overflow del body según el estado de carga
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
        }
    }, [isLoading])

    // Activar preloader al cambiar de ruta
    useEffect(() => {
        // IMPORTANTE: Scrollear arriba INMEDIATAMENTE al cambiar de ruta
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        
        // Reset del smooth-content si existe
        const smoothContent = document.querySelector('#smooth-content')
        if (smoothContent) {
            smoothContent.style.transform = 'translate(0px, 0px)'
        }

        // Iniciamos el preloader cuando cambia la ruta
        setShowContent(false)
        setIsLoading(true)
        setLoadingProgress(0)
        setDataLoaded(false)
        setImagesLoaded(false)

        // Limpiamos cualquier timer anterior
        if (fallbackTimer.current) {
            clearTimeout(fallbackTimer.current)
        }

        // Fallback de seguridad
        fallbackTimer.current = setTimeout(() => {
            console.warn('Preloader fallback: completando automáticamente')
            setDataLoaded(true)
            setImagesLoaded(true)
        }, 8000)

        // Scrollear arriba de nuevo después de un pequeño delay
        const scrollTimeout = setTimeout(() => {
            window.scrollTo(0, 0)
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
        }, 50)

        return () => clearTimeout(scrollTimeout)
    }, [location.pathname])

    // Limpieza final: si el Provider se desmonta, limpiamos el timer
    useEffect(() => {
        return () => {
            if (fallbackTimer.current) {
                clearTimeout(fallbackTimer.current)
            }
        }
    }, [])

    return (
        <PreloaderContext.Provider value={{ 
            isLoading, 
            loadingProgress, 
            startLoading, 
            stopLoading, 
            updateProgress // La dejamos por si acaso
        }}>
            {isLoading && <PreLoader progress={loadingProgress} />}
            <div style={{
                opacity: showContent ? 1 : 0,
                visibility: showContent ? 'visible' : 'hidden',
                pointerEvents: showContent ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }}>
                {children}
            </div>
        </PreloaderContext.Provider>
    )
}