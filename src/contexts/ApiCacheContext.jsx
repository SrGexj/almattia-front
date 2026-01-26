import { createContext, useContext, useState, useCallback, useRef, useMemo } from "react"

const ApiCacheContext = createContext()

export const useApiCache = () => {
    const context = useContext(ApiCacheContext)
    if (!context) {
        throw new Error('useApiCache debe usarse dentro de ApiCacheProvider')
    }
    return context
}

export const ApiCacheProvider = ({ children }) => {
    const [cache, setCache] = useState({})
    const cacheTimestamps = useRef({})
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en milisegundos

    /**
     * Verifica si los datos en caché son válidos
     */
    const isCacheValid = useCallback((key) => {
        if (!cache[key] || !cacheTimestamps.current[key]) {
            return false
        }
        
        const now = Date.now()
        const cacheAge = now - cacheTimestamps.current[key]
        return cacheAge < CACHE_DURATION
    }, [cache])

    /**
     * Obtiene datos del caché si son válidos
     * Memoizado para evitar cálculos innecesarios
     */
    const getCachedData = useCallback((key) => {
        if (isCacheValid(key)) {
            console.log(`📦 Cache hit: ${key}`)
            return cache[key]
        }
        console.log(`❌ Cache miss: ${key}`)
        return null
    }, [cache, isCacheValid])

    /**
     * Guarda datos en el caché de forma inmutable
     */
    const setCachedData = useCallback((key, data) => {
        console.log(`💾 Guardando en cache: ${key}`)
        setCache(prev => ({ ...prev, [key]: data }))
        cacheTimestamps.current[key] = Date.now()
    }, [])

    /**
     * Limpia una entrada específica del caché
     */
    const clearCacheEntry = useCallback((key) => {
        console.log(`🗑️ Limpiando cache: ${key}`)
        setCache(prev => {
            const { [key]: removed, ...rest } = prev
            return rest
        })
        delete cacheTimestamps.current[key]
    }, [])

    /**
     * Limpia todo el caché
     */
    const clearAllCache = useCallback(() => {
        console.log('🗑️ Limpiando todo el cache')
        setCache({})
        cacheTimestamps.current = {}
    }, [])

    /**
     * Función helper para hacer fetch con caché automático
     * Memoizada con useCallback para mantener la referencia estable
     */
    const fetchWithCache = useCallback(async (cacheKey, url, options, onProgress) => {
        // Verificar si hay datos en caché válidos
        const cachedData = getCachedData(cacheKey)
        if (cachedData) {
            // Si hay datos en caché, reportar progreso instantáneo
            if (onProgress) {
                onProgress(30)
                await new Promise(resolve => setTimeout(resolve, 50))
                onProgress(60)
                await new Promise(resolve => setTimeout(resolve, 50))
                onProgress(90)
            }
            return cachedData
        }

        // Si no hay caché, hacer la petición
        try {
            if (onProgress) onProgress(10)
            
            const response = await fetch(url, options)
            
            if (onProgress) onProgress(30)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            if (onProgress) onProgress(60)
            
            const data = await response.json()
            
            if (onProgress) onProgress(80)
            
            // Guardar en caché
            setCachedData(cacheKey, data)
            
            if (onProgress) onProgress(90)
            
            return data
        } catch (error) {
            console.error(`Error fetching ${cacheKey}:`, error)
            throw error
        }
    }, [getCachedData, setCachedData])

    /**
     * Estadísticas del caché memoizadas
     */
    const cacheStats = useMemo(() => {
        const entries = Object.keys(cache)
        const validEntries = entries.filter(key => isCacheValid(key))
        
        return {
            totalEntries: entries.length,
            validEntries: validEntries.length,
            expiredEntries: entries.length - validEntries.length,
            keys: entries
        }
    }, [cache, isCacheValid])

    /**
     * Valor del contexto memoizado para evitar re-renders innecesarios
     */
    const contextValue = useMemo(() => ({
        cache,
        getCachedData,
        setCachedData,
        clearCacheEntry,
        clearAllCache,
        isCacheValid,
        fetchWithCache,
        cacheStats
    }), [cache, getCachedData, setCachedData, clearCacheEntry, clearAllCache, isCacheValid, fetchWithCache, cacheStats])

    return (
        <ApiCacheContext.Provider value={contextValue}>
            {children}
        </ApiCacheContext.Provider>
    )
}
