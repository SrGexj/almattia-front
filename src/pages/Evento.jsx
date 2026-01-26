import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import DOMPurify from "dompurify"
import { PreloaderContext } from "../contexts/PreloaderContext";

export const Evento = () => {

    const { startLoading, stopLoading } = useContext(PreloaderContext);

    const location = useLocation()
    const { slug } = useParams()
    const getEvent = location.state?.event

    const [event, setEvent] = useState([])

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

  return (
    <section className="flex gap-2 justify-center items-start pt-35 p-10 max-md:flex-col">
        <img src={event.images ? event.images.featured_image.url : ''} alt={event.title} className="w-1/2 h-auto rounded-[20px]" />
        <div className="flex justify-center items-start flex-col gap-6 p-6">
            <h1 className="text-white text-4xl">{event.title}</h1>
            <p className="text-white text-lg">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.long_text) }}></span>
            </p>
            <p className="text-white text-lg">{event.start_date}</p>
        </div>
    </section>
  )
}