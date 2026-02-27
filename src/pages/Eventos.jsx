import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { HeroEventos } from '../components/pages/eventos/HeroEventos'
import { Link, useParams } from 'react-router-dom'
import { ServicesSelector } from '../components/pages/eventos/ServicesSelector'
import { Button } from '../components/ui/Button'
import { EventosCategories } from '../components/pages/eventos/EventosCategories'
import { EventosComponent } from '../components/pages/eventos/EventosComponent'
import { StreetMap } from '../components/StreetMap'
import { SectionsForm } from '../components/SectionsForm'
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { PreLoader } from '../components/ui/PreLoader'
import DOMPurify from 'dompurify'
import { PreloaderContext } from '../contexts/PreloaderContext'

export const Eventos = () => {

    const { startLoading, stopLoading, updateProgress, isLoading } = useContext(PreloaderContext)

    const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API
    const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN

    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    })

    // Diferentes velocidades de parallax para cada imagen
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50])
    const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [pageData, setPageData] = useState(null)

    const fetchData = async () => {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
            }
        }
        try {
            // Inicio de la petición
            updateProgress(10)
            
            const response = await fetch(`${VITE_BPANEL_API}/events-page/es`, options)
            
            // Petición enviada
            updateProgress(30)
            
            const data = await response.json()
            
            // Respuesta recibida
            updateProgress(60)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Datos parseados
            updateProgress(80)
            
            setPageData(data.data)
            
            // Datos guardados
            updateProgress(90)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        document.title = "Almattia - Eventos"
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
    }, [isLoading])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            ref={scrollRef}
            className='px-[95px] max-[1441px]:px-20 max-[1025px]:px-5 max-[768px]:px-3 mx-auto'
        >
            <HeroEventos
                scrollDurationVh={1500}
                content={pageData ? pageData.block_1 : null}
            />
            <section ref={scrollRef} className="max-w-[1350px] mx-auto w-full grid grid-cols-2 max-[1200px]:gap-10 max-[1025px]:gap-15 max-[1025px]:pt-25 max-[1025px]:grid-cols-1 gap-20 items-start py-20 max-[1200px]:py-15 max-[768px]:pb-0">
                <div className="flex flex-col gap-5 max-[768px]:gap-4">
                    <motion.h2
                        className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        {pageData ? pageData.block_2.title_block_2 : ''}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        className='text-[22px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] leading-snug font-light text-[#a2a39f]'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData ? pageData.block_2.long_text_block_2 : '') }}
                    >
                    </motion.p>
                    <Button
                        to={pageData ? pageData.block_2.link_block_2 : '#'}
                        text={pageData ? pageData.block_2.text_link_block_2 : 'Contáctanos'}
                        hover={true}
                        className='mt-6'
                        motion={true}
                    />
                </div>
                <div ref={scrollRef} className="relative flex min-h-[500px] max-[1200px]:min-h-[400px] max-[1025px]:min-h-[350px] max-[768px]:h-[250px] max-[768px]:w-full rounded-[30px] overflow-hidden">
                    <motion.div
                        className="absolute w-[80%] h-[50%] border-2 rounded-[30px] border-[#7d8570] top-10 right-20 max-[1200px]:right-10 max-[1025px]:right-5 max-[768px]:left-5 max-[768px]:top-5 z-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        style={{ y: y3 }}
                    />
                    <motion.div
                        style={{ y: y2 }}
                    >
                        <motion.img
                            src="/images/img-b2.jpg"
                            alt="Imagen de servicio"
                            className='z-1 h-full object-cover'
                            style={{ maskImage: "url('/images/layout-f-top.png')", maskRepeat: 'no-repeat', maskSize: 'cover' }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                    </motion.div>
                </div>
            </section>
            {/* Servicios */}
            <motion.div
                ref={scrollRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ margin: "0px 0px -250px 0px", once: true }}
                className='max-w-[1350px] mx-auto'
            >
                <ServicesSelector
                    title={pageData ? pageData.block_3.title_block_3 : ''}
                    description={pageData ? pageData.block_3.long_text_block_3 : ''}
                    style={y1}
                />
            </motion.div>
            {/* Trayectoria y eventos */}
            <section className="w-full flex flex-col gap-20 max-[1200px]:gap-15 max-[1025px]:gap-10 py-20 max-[1200px]:py-15 max-[1025px]:py-20 max-[768px]:py-10">
                <motion.div
                    className="max-w-[1350px] mx-auto flex items-end gap-30 max-[1200px]:gap-20 max-[1025px]:flex-col max-[1025px]:gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <h2 className="w-full text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white">
                        {pageData ? pageData.block_4.title_block_4 : ''}
                    </h2>
                    <p
                        className='w-full text-[22px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] leading-snug font-light text-[#a2a39f]'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData ? pageData.block_4.long_text_block_4 : '') }}
                    />
                </motion.div>
                <motion.div
                    className="max-w-[1350px] mx-auto grid grid-cols-5 gap-4 max-[1550px]:grid-cols-4 max-[1200px]:grid-cols-3 max-[1025px]:grid-cols-2 max-[768px]:grid-cols-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <EventosCategories
                        selectedCategory={selectedCategory}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <EventosComponent
                        selectedCategory={selectedCategory}
                    />
                </motion.div>
            </section>
            {/* Banner M360 */}
            <motion.section
                className="max-w-[1350px] mx-auto w-full h-[500px] max-[1550px]:h-[450px] max-[1200px]:h-[380px] max-[1025px]:h-[320px] max-[768px]:h-[100%] rounded-[30px] overflow-hidden relative my-20 max-[1200px]:my-15 max-[1025px]:my-10"
                style={{ backgroundImage: "url('/images/img-banner-m360.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ margin: "0px 0px -250px 0px", once: true }}
            >
                <div className="flex flex-col gap-5 max-[1200px]:gap-4 justify-start items-start text-left p-8 pl-20 pr-[50%] text-[#202852] max-[1550px]:pr-[40%] max-[1200px]:pr-[45%] max-[1025px]:pr-[20%] max-[1025px]:pl-10 max-[768px]:px-5 max-[768px]:pr-[10%]">
                    <motion.img
                        src="/images/logo-m-ex-360.webp"
                        alt="Logo M360"
                        className="max-[1200px]:w-[180px] max-[1025px]:w-[150px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.h2
                        className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[32px] max-[1025px]:text-[26px] max-[768px]:text-[22px] font-bold leading-[1.25em]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        {pageData ? pageData.block_5.title_block_5 : ''}
                    </motion.h2>
                    <motion.p
                        className="text-[20px] max-[1550px]:text-[18px] max-[1200px]:text-[16px] max-[1025px]:text-[15px] font-light max-w-2xl leading-[1.25em]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ margin: "0px 0px -175px 0px", once: true }}

                    >
                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData ? pageData.block_5.short_text_block_5 : '') }} />
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ margin: "0px 0px -150px 0px", once: true }}
                    >
                        <Link
                            to={pageData ? pageData.block_5.link_block_5 : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='bg-gradient-to-tr from-[#9537b3] to-[#43366d] inline-block px-8 py-1.75 rounded-full text-white font-medium text-[18px] max-[1200px]:text-[16px] max-[1025px]:px-6 hover:scale-105 transition-transform duration-300'
                        >
                            {pageData ? pageData.block_5.text_link_block_5 : 'Inscríbete'}
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
            {/* Mapa de ubicación */}
            <section className="max-w-[1350px] mx-auto w-full h-full pb-10 flex flex-col gap-10 max-[1025px]:gap-8 text-center relative">
                {/* Efecto de luz en la sección del mapa */}
                <div className="absolute -z-1 w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-[#7d8570] w-[500px] h-[500px] rounded-full blur-[250px] opacity-20"></div>
                    <div className="absolute right-10 bottom-10 bg-[#7d8570] w-[400px] h-[400px] rounded-full blur-[200px] opacity-15"></div>
                </div>

                <motion.h2
                    className='text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    {pageData ? pageData.block_6.title_block_6 : ''}
                </motion.h2>
                <motion.div
                    className="flex relative max-[1025px]:flex-col h-[700px] max-[1200px]:h-[650px] max-[1025px]:h-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <SectionsForm
                        inputColor={"#5a5e53"}
                        backgroundColor={"#363735D8"}
                        borderColor={"#4e4e4e"}
                        typeFields={['Evento Corporativo', 'Evento Social', 'Evento Cultural', 'Evento Deportivo']}
                    />
                    <StreetMap
                        width={"100%"}
                        height={"100%"}
                        className={'rounded-3xl border-3 border-[#7d8570]'}
                        lowBarBgColor={"#363735c4"}
                        lowBarBorderColor={"#939a88"}
                    />
                </motion.div>
            </section>
        </motion.div>
    )
}