import { useEffect, useContext } from 'react'
import { PreloaderContext } from '../contexts/PreloaderContext' // Ajusta la ruta

/**
 * Hook para páginas estáticas.
 * Actualiza el progreso y llama a stopLoading() automáticamente después de un breve retardo
 * para permitir que la animación del preloader se vea fluida.
 */
export const useStaticPageLoad = (delay = 200) => {
    const { stopLoading, updateProgress } = useContext(PreloaderContext)

    useEffect(() => {
        // Simula un progreso rápido para páginas estáticas
        updateProgress(30)
        
        setTimeout(() => updateProgress(60), 50)
        setTimeout(() => updateProgress(90), 100)
        
        // Llama a stopLoading después del retardo
        const timer = setTimeout(() => {
            stopLoading()
        }, delay)

        // Limpia el temporizador si el componente se desmonta
        return () => clearTimeout(timer)

    }, [stopLoading, updateProgress, delay]) // Se ejecuta solo si estas funciones cambian
}