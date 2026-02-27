import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { InfoBackcard } from "./InfoBackcard"

export const EventoCard = ({ event, index }) => {

    return (
        <motion.a 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
            viewport={{ once: true, margin: "-400px" }}
            href={`/eventos/${event.slug}`} 
            draggable={false} 
            state={{ event }} 
            className="cursor-pointer group ">
            <motion.div
                className="group p-3 relative rounded-3xl overflow-hidden bg-[#3f413d] h-[470px] max-[768px]:h-[400px]"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
                {/* Imagen de fondo */}
                <img src={event?.images?.featured_image?.url} alt="" className="w-full h-full object-cover top-0 left-0 absolute z-0" />
                
                {/* Borde animado en hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-[#3f413d] transition-opacity duration-300 pointer-events-none z-20">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                        <div 
                            className="border-anim absolute inset-0 rounded-3xl"
                        />
                        <div className="absolute inset-[2px] rounded-3xl bg-[#3f413d]">
                            <InfoBackcard slug={event.slug} />
                        </div>
                    </div>
                </div>
                
                {/* Contenido visible */}
                <div className="z-10 relative h-full flex flex-col justify-end">
                    <span className="absolute top-0 flex flex-col p-2 px-3 border-1 border-[#000] bg-[#1f1e22d2]/80 text-white justify-center items-center rounded-xl backdrop-blur-[1px] max-[768px]:p-1.5 max-[768px]:px-2">
                        <p className="!text-[35px] leading-[1] max-[768px]:!text-[28px]">{event.day}</p>
                        <p className="!text-[18px] leading-[1] max-[768px]:!text-[15px]">{event.month}</p>
                        <p className="!text-[15px] leading-[1] max-[768px]:!text-[13px]">{event.year}</p>
                    </span>
                    <span className="text-[#f3f5f0] border-1 border-[#44463e] bg-[#72756b]/70 backdrop-blur-[1px] rounded-xl px-2 pr-3 py-1 mb-2 w-fit text-[14px] flex gap-1 items-center max-[768px]:text-[12px] max-[768px]:px-2 max-[768px]:py-0.5">
                        {/* <Tag className="w-fit h-3.75 stroke-[#2f332c]" /> */}
                        {event.categories.length > 0 ? event.categories[0].name : 'Sin categoría'}
                    </span>
                    <div className="w-full h-fit justify-end flex flex-col gap-1 px-4 py-2 border-1 border-[#000] rounded-2xl bg-[#2C2C2C]/75 backdrop-blur-[3px] max-[768px]:px-3 max-[768px]:py-1.5">
                        <h3 className="text-white text-[22px] leading-[1.25em] capitalize max-[768px]:text-[18px]">{event.title}</h3>
                    </div>
                </div>
            </motion.div>
        </motion.a>

    )
}