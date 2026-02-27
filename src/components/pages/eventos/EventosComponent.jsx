import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { EventoCard } from "./EventoCard"
import { motion } from "framer-motion"

export const EventosComponent = ({ selectedCategory }) => {
    const slideReference = useRef(null)
    const containerRef = useRef(null)

    const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API
    const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN

    const gap = 16

    const [events, setEvents] = useState([])
    const [scheduledEvents, setScheduledEvents] = useState('past-events')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const [loading, setLoading] = useState(false)

    // Calcular cuántas tarjetas COMPLETAS se muestran según el ancho del contenedor
    const getVisibleCards = () => {
        if (containerWidth < 640) return 1 // móvil: 1 + peek
        if (containerWidth < 1024) return 2 // tablet: 2 + peek
        if (containerWidth < 1280) return 3 // desktop pequeño: 3 + peek
        return 4 // desktop grande: 4 + peek
    }

    const isMobile = containerWidth < 768

    const displayedEvents = useMemo(() => {
        if (!selectedCategory) {
            return events
        }
        
        return events.filter(event =>
            event.categories.some(cat => cat.slug === selectedCategory.slug)
        )
    }, [events, selectedCategory])

    const visibleCards = Math.min(getVisibleCards(), displayedEvents?.length || 0)
    const peekAmount = 60 // Píxeles de la siguiente tarjeta que se muestran
    
    // Calcular el ancho de cada tarjeta: espacio disponible menos el peek, dividido entre las cards visibles
    const cardWidth = visibleCards > 0 
        ? 375
        : 0

    const maxSlide = Math.max(0, (displayedEvents?.length || 0) - visibleCards)
    const translateValue = currentSlide * (cardWidth + gap)
    const isNextDisabled = !displayedEvents || displayedEvents.length === 0 || currentSlide >= maxSlide

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const handleNext = () => {
        if (currentSlide < maxSlide) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    // Dragging functionality
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleDrag = (e) => {
        setIsDragging(true)
        const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX
        setStartX(pageX - containerRef.current.offsetLeft)
        setScrollLeft(translateValue)
    }

    const stopDrag = () => {
        setIsDragging(false)
    }
    // Mover durante el drag de forma libre 
    const dragMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        
        const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX
        const x = pageX - containerRef.current.offsetLeft
        const walk = (x - startX) 
        let newTranslate = scrollLeft - walk

        // Limitar el movimiento dentro de los límites
        if (newTranslate < 0) newTranslate = 0
        const maxTranslate = maxSlide * (cardWidth + gap)
        if (newTranslate > maxTranslate) newTranslate = maxTranslate
        const newSlide = Math.round(newTranslate / (cardWidth + gap))
        setCurrentSlide(newSlide)
    }

    const fetchEvents = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
            }
        }

        try {
            const response = await fetch(`${VITE_BPANEL_API}/${scheduledEvents}/es`, options)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setEvents(data.data)
            setCurrentSlide(0)
        } catch (error) {
            console.error("Error fetching events:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [scheduledEvents])

    useEffect(() => {
        setCurrentSlide(0)
    }, [selectedCategory])

    useEffect(() => {
        const calculateDimensions = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth)
            }
        }

        calculateDimensions()
        window.addEventListener('resize', calculateDimensions)
        
        return () => {
            window.removeEventListener('resize', calculateDimensions)
        }
    }, [displayedEvents])

    return (
        <motion.div
            className="w-full h-[500px] max-[768px]:h-auto flex flex-col gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex gap-5 items-center justify-center">
                <button
                    className={`px-4 py-2 text-white text-[20px] bg-[#3b3b3a] border-[#5d5f5a] rounded-2xl transition-all !duration-100 ${scheduledEvents === 'upcoming-events' ? 'border-[2px] opacity-100' : '!border-[0px] opacity-50'}`}
                    onClick={() => setScheduledEvents('upcoming-events')}
                >
                    Próximos Eventos
                </button>
                <button
                    className={`px-4 py-2 text-white text-[20px] bg-[#3b3b3a] border-[#5d5f5a] rounded-2xl transition-all !duration-100 ${scheduledEvents === 'past-events' ? 'border-[2px] opacity-100' : '!border-[0px] opacity-50'}`}
                    onClick={() => setScheduledEvents('past-events')}
                >
                    Eventos Pasados
                </button>
            </div>
            {selectedCategory && (
                <h3 className="text-white text-[28px] font-regular text-center mb-4">
                    Categoría: <span className="text-xl">{selectedCategory.title}</span>
                </h3>
            )}
            <div className="flex gap-[20px] max-[1025px]:flex-col">
                <div className="flex flex-col gap-2 max-[1025px]:hidden">
                    <button
                        className="rounded-[20px] w-[103px] h-[103px] flex items-center justify-center transition-all duration-200 cursor-pointer border-neutral-500 text-white bg-[#7d8570] hover:bg-[#6b7a5f] disabled:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handlePrevious}
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft className="h-20 w-20 mr-1" strokeWidth={.5} />
                    </button>
                    <button
                        className="rounded-[20px] w-[103px] h-[103px] flex items-center justify-center transition-all duration-200 cursor-pointer border-neutral-500 text-white bg-[#7d8570] hover:bg-[#6b7a5f] disabled:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleNext}
                        disabled={isNextDisabled}
                    >
                        <ChevronRight className="h-20 w-20 ml-1" strokeWidth={.5} />
                    </button>
                </div>
                <div
                    className="relative flex overflow-x-hidden pt-7"
                    style={{ width: `calc(100% - ${isMobile ? 0 : 123}px)` }}
                    ref={containerRef}
                    // dragging on pc
                    onMouseDown={handleDrag}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onMouseMove={dragMove}
                    onTouchMove={dragMove}
                    onTouchStart={handleDrag}
                    onTouchEnd={stopDrag}
                >
                    <div
                        className="flex gap-4 -mt-3"
                        style={{
                            transform: `translateX(-${translateValue}px)`,
                            transition: 'transform 0.5s ease-in-out',
                        }}
                        ref={slideReference}
                    >
                        {loading ? (
                            <p className="text-white text-center text-[20px] opacity-55">Cargando eventos...</p>
                        ) : displayedEvents && displayedEvents.length > 0 ? (
                            displayedEvents.map((event, index) => (
                                <div
                                    key={index}
                                    style={{ 
                                        minWidth: `${cardWidth}px`,
                                        width: `${cardWidth}px`
                                    }}
                                >
                                    <EventoCard event={event} index={index} />
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">No hay eventos disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}