import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"
import DOMPurify from 'dompurify'

export const ServicesSelector = ({ title, description, style }) => {


    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    })

    // Diferentes velocidades de parallax para cada imagen
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])

    const testServices = [
        {
            title: "Personal de Eventos de Alto Nivel",
            description: "Contamos con un equipo de azafatas, gestores de sala y personal auxiliar con amplia experiencia y formación especializada. Ofrecemos una atención impecable y discreta, asegurando que cada miembro del staff comprenda la estrategia de tu evento y resuelva cualquier necesidad con profesionalidad.",
            imageUrl: "/images/img-b3.jpg"
        },
        {
            title: "Servicio 2",
            description: "Descripción breve del servicio que ofrecemos, destacando sus beneficios y características principales para captar la atención del usuario.",
            imageUrl: "/images/img-b3.jpg"
        },
        {
            title: "Servicio 3",
            description: "Descripción breve del servicio que ofrecemos, destacando sus beneficios y características principales para captar la atención del usuario.",
            imageUrl: "/images/img-b2.jpg"
        },
    ]

    const [selectedService, setSelectedService] = useState(testServices[0])

    // PASO 1: Estado para guardar la posición del elemento seleccionado
    const [arrowPosition, setArrowPosition] = useState({ top: 0, height: 0, opacity: 0 })

    const handleServiceClick = (service, event) => {
        setSelectedService(service)
        // PASO 2: Medir el elemento y actualizar el estado de la flecha
        const { offsetTop, offsetHeight } = event.currentTarget
        setArrowPosition({ top: offsetTop, height: offsetHeight, opacity: 1 })
    }

    return (
        <section ref={scrollRef} className="w-full grid grid-cols-2 max-[1025px]:grid-cols-1 max-[1025px]:gap-15 max-[1025px]:py-10 max-[768px]:py-5 items-start">
            <div className="flex flex-col items-start max-[1025px]:w-full  max-[1441px]:w-[650px] gap-10 max-[1025px]:order-2">
                {/* Imagen servicio */}
                <div className="relative flex h-[400px] max-[768px]:h-auto max-[768px]:w-full rounded-[30px] overflow-hidden">
                    <div className="absolute w-[80%] h-[50%] border-2 rounded-[30px] border-[#7d8570] bottom-10 left-20 z-0 max-[768px]:left-10 max-[768px]:bottom-3" />
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={selectedService.imageUrl} // <-- ¡Esta es la clave!
                            src={selectedService.imageUrl}
                            alt=""
                            className='z-1 w-fit h-full object-cover'
                            style={{ maskImage: "url('/images/layout-f-slid.png')", maskRepeat: 'no-repeat', maskSize: 'cover', y: y1 }}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        />
                    </AnimatePresence>
                    {/* < 
                    <img src={selectedService.imageUrl} alt="" className='z-1 w-fit h-full object-cover' style={{maskImage: "url('/images/layout-f-slid.png')", maskRepeat: 'no-repeat'}} />
                    */}
                </div>
                {/* Info servicio */}
                <div className="flex flex-col h-65 max-[768px]:h-auto w-full relative">
                    <AnimatePresence mode="wait">
                        <>
                            {selectedService.title &&
                                <motion.h3
                                    key={selectedService.title} // <-- ¡Esta es la clave!
                                    exit={{ opacity: 0, y: -20 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[35px] w-full flex items-center gap-2 mb-4 max-[1441px]:text-[25px] max-[768px]:text-[20px] leading-snug font-light text-white mt-10">
                                    <span className=" w-[20px] h-[20px] rounded-full bg-[#7d8570]"></span>
                                    {selectedService.title}
                                </motion.h3>
                            }
                            {selectedService.description &&
                                <motion.p
                                    key={selectedService.title + '-desc'} // <-- Usa una key única también aquí
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className='text-[20px] max-[1025px]:text-[25px] leading-snug font-light text-[#a2a39f] mt-4'>
                                    {selectedService.description}
                                </motion.p>
                            }
                        </>
                    </AnimatePresence>
                </div>
            </div>
            <div className="pl-10 flex flex-col gap-4 mt-10">
                <h2 className="text-[50px] max-[1441px]:text-[36px] max-[1025px]:text-[25px] leading-tight font-regular text-white">
                    {title}
                </h2>
                <p className='text-[22px] max-[1025px]:text-[25px] leading-snug font-light text-[#a2a39f]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
                <ul className="flex flex-col gap-4">
                    {testServices.map((service, index) => (
                        <li
                            key={index}
                            onClick={() => handleServiceClick(service)}
                            className={`cursor-pointer transition-all duration-300 w-fit px-4 py-2 rounded-[17px] ${selectedService.title === service.title ? 'bg-[#5d5f5a87]' : 'bg-transparent hover:bg-[#7d8570]/30'
                                }`}
                        >
                            <p className={`text-[20px] font-regular transition-all duration-300 ${selectedService.title === service.title ? 'text-white' : 'text-white/30 hover:text-white'
                                }`}>
                                {service.title}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}