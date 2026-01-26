import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Create the context
const PageScrollContext = createContext();

// Custom hook to use the context
export const usePageScroll = () => useContext(PageScrollContext);

// Provider component
import { useLocation } from "react-router-dom"

export const PageScrollProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(null)
    const [pageColor, setPageColor] = useState('#FFFFFF')
    const [pageHeight, setPageHeight] = useState(null)
    const scrollbarRefs = useRef({})
    const location = useLocation()

    const registerScrollbar = (page, ref) => {
        scrollbarRefs.current[page] = ref
    }

    const calculatePageHeight = () => {
        const height = document.body.scrollHeight
        setPageHeight(height)
    }

    useEffect(() => {
        // elimina el "/" y usa el nombre de la ruta como id
        const page = location.pathname.replace("/", "") || "home"
        setCurrentPage(page)

        // Calcula la altura de la página al cargar y al cambiar de ruta
        calculatePageHeight()
        window.addEventListener('resize', calculatePageHeight)
        
        return () => {
            window.removeEventListener('resize', calculatePageHeight)
        }

    }, [location, pageHeight])

    return (
        <PageScrollContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                pageColor,
                setPageColor,
                pageHeight,
                setPageHeight,
                registerScrollbar
            }}
        >
            {children}
        </PageScrollContext.Provider>
    )
}
