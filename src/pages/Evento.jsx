import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import DOMPurify from "dompurify"
import { PreloaderContext } from "../contexts/PreloaderContext";
import { createPortal } from "react-dom";

export const Evento = () => {
    const { stopLoading } = useContext(PreloaderContext);
    const location = useLocation()
    const { slug } = useParams()
    const getEvent = location.state?.event

    const [event, setEvent] = useState(null)
    const [lightboxImg, setLightboxImg] = useState(null)

    useEffect(() => {
        if (getEvent) {
            setEvent(getEvent)
            stopLoading()
        } else {
            const fetchEventBySlug = async () => {
                const VITE_BPANEL_API  = import.meta.env.VITE_BPANEL_API;
                const VITE_BPANEL_TOKEN  = import.meta.env.VITE_BPANEL_TOKEN;
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
                    }
                }
                try {
                    const response = await fetch(`${VITE_BPANEL_API}/event/${slug}/es`, options)
                    const data = await response.json()
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    setEvent(data.data)
                } catch (error) {
                    console.error("Error fetching event by slug:", error)
                } finally {
                    stopLoading()
                }
            }
            fetchEventBySlug()
        }
    }, [])

    // Bloquear scroll y pausar ScrollSmoother cuando el lightbox está abierto
    useEffect(() => {
        if (lightboxImg) {
            document.body.style.overflow = 'hidden'
            window.ScrollSmoother?.get()?.paused(true)
        } else {
            document.body.style.overflow = ''
            window.ScrollSmoother?.get()?.paused(false)
        }
        return () => {
            document.body.style.overflow = ''
            window.ScrollSmoother?.get()?.paused(false)
        }
    }, [lightboxImg])

    if (!event) return null

    const gallery = event.images?.['galería'] || event.images?.gallery || []

    // Portal para el lightbox
    const lightbox = lightboxImg
        ? createPortal(
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => setLightboxImg(null)}
            >
                <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                    <button
                        className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1"
                        onClick={() => setLightboxImg(null)}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                    <img
                        src={lightboxImg.url}
                        alt={lightboxImg.alt || event.title}
                        className="max-h-[80vh] w-auto rounded-xl"
                    />
                    {lightboxImg.alt && (
                        <p className="mt-4 text-white">{lightboxImg.alt}</p>
                    )}
                </div>
            </div>,
            document.body
        )
        : null

    return (
        <div className="pb-30">
            <div className="max-w-4xl mx-auto bg-[#292a2b] rounded-[30px] shadow-lg p-8 mt-20 border-1 border-[#565454]">
                <header className="mb-10">
                    <img
                        src={event.images?.featured_image?.url}
                        alt={event.images?.featured_image?.alt || event.title}
                        className="w-full h-[380px] object-cover rounded-[20px] mb-8"
                    />
                    <h1 className="text-white text-5xl font-bold mb-4">{event.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-[#8f99aa] text-lg mb-2">
                        <span>Organizado por <strong>{event.event_manager}</strong></span>
                        <span>{event.day} {event.month} {event.year} - {event.start_date}</span>
                    </div>
                </header>
                <section className="prose prose-invert text-[#f1f1f1] mb-8">
                    {event.short_text && (
                        <p className="text-xl font-medium mb-6">{event.short_text}</p>
                    )}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(event.long_text)
                        }}
                    />
                </section>
                {event.price && (
                    <div className="bg-[#3b434d] rounded-xl px-4 py-2 text-[#e1e4e9] font-bold w-fit mb-6">
                        Precio: {event.price}€
                    </div>
                )}
                {event.link && (
                    <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#545f6c] text-white rounded-full px-8 py-3 font-medium hover:bg-[#3b434d] transition-colors mb-6"
                    >
                        Más información
                    </a>
                )}
                <span className="w-full h-1 bg-white"></span>
                {/* Galería de imágenes */}
                {gallery.length > 0 && (
                    <section>
                        <h2 className="text-2xl text-[#e1e4e9] font-semibold mb-4">Galería</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {gallery.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={img.alt || event.title}
                                    className="w-full h-48 object-cover rounded-xl cursor-pointer"
                                    onClick={() => setLightboxImg(img)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
            {lightbox}
        </div>
    )
}