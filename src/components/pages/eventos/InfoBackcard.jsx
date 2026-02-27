import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { Calendar, Clock, Link as LinkIcon, DollarSign, ListTree, UserStarIcon } from "lucide-react"

export const InfoBackcard = ({ slug }) => {

    const [eventInfo, setEventInfo] = useState([])

    useEffect(() => {
        const fetchEventBySlug = async () => {

            const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API;
            const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN;

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

                setEventInfo(data.data)

            } catch (error) {
                console.error("Error fetching event by slug:", error)
            }
        }

        fetchEventBySlug()
    }, [])

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#2a2c28] to-[#1f1e22] rounded-3xl p-8 flex flex-col gap-6 overflow-y-auto max-[768px]:p-5 max-[768px]:gap-4">
            {/* Título y texto corto */}
            <div className="flex flex-col gap-3 max-[768px]:gap-2">
                <h2 className="text-white text-[28px] font-semibold leading-tight max-[768px]:text-[22px]">{eventInfo.title}</h2>
                {eventInfo.short_text && (
                    <p className="text-[#b8bcaf] text-[16px] font-light italic max-[768px]:text-[14px]">{eventInfo.short_text}</p>
                )}
                {
                    eventInfo?.event_manager && (
                        <p className="text-[#7e8473] text-[16px] max-[768px]:text-[14px] flex gap-2 items-center">
                            <UserStarIcon className="stroke-[2px] max-[768px]:w-3.5 max-[768px]:h-3.5" />
                            { DOMPurify.sanitize( eventInfo.event_manager)}
                        </p>
                    )
                }
            </div>

            {/* Información de fecha y detalles */}
            <div className="flex flex-col gap-3 pt-2 border-t border-[#ffffff15] max-[768px]:gap-2.5 max-[768px]:pt-1.5">
                {/* Fecha */}
                {eventInfo.start_date && (
                    <div className="flex items-center gap-3 text-[#d4d6d1] max-[768px]:gap-2">
                        <Calendar size={20} strokeWidth={1.5} className="text-[#7d8570] max-[768px]:w-4 max-[768px]:h-4" />
                        <div className="flex flex-col">
                            <span className="text-[14px] font-medium max-[768px]:text-[13px]">
                                {eventInfo.start_date}
                                {eventInfo.end_date && ` - ${eventInfo.end_date}`}
                            </span>
                            {eventInfo.one_day === 1 && (
                                <span className="text-[12px] text-[#b8bcaf] max-[768px]:text-[11px]">Evento de un día</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Precio */}
                {eventInfo.price && (
                    <div className="flex items-center gap-3 text-[#d4d6d1] max-[768px]:gap-2">
                        <DollarSign size={20} strokeWidth={1.5} className="text-[#7d8570] max-[768px]:w-4 max-[768px]:h-4" />
                        <span className="text-[14px] font-medium max-[768px]:text-[13px]">{eventInfo.price}</span>
                    </div>
                )}
            </div>
            
            {/* Texto largo */}
            {eventInfo.short_text && (
                <p 
                    className="text-[#d4d6d1] text-[15px] font-light leading-normal prose prose-invert max-w-none
                    prose-p:text-[#d4d6d1] prose-p:mb-4
                    prose-ul:text-[#d4d6d1] prose-ul:list-disc prose-ul:pl-5
                    prose-ol:text-[#d4d6d1] prose-ol:list-decimal prose-ol:pl-5
                    prose-li:mb-2
                    prose-strong:text-white prose-strong:font-semibold
                    prose-a:text-[#7d8570] prose-a:underline hover:prose-a:text-[#98a08b]
                    max-[768px]:text-[13px] max-[768px]:leading-relaxed
                    max-[768px]:prose-p:mb-3 max-[768px]:prose-li:mb-1.5"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eventInfo.short_text) }} 
                />
            )}
        </div>
    )
}