import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HeroFormacion } from "../components/pages/formacion/HeroFormación"
import { Button } from "../components/ui/Button"
import { PreLoader } from "../components/ui/PreLoader"
import { ModalitiesComp } from "../components/pages/formacion/ModalitiesComp"
import { CoursesComp } from "../components/pages/formacion/CoursesComp"
import { FormadoresComp } from "../components/pages/formacion/FormadoresComp"
import { SectionsForm } from "../components/SectionsForm"
import { StreetMap } from "../components/StreetMap"
import DOMPurify from 'dompurify';
import { PreloaderContext } from "../contexts/PreloaderContext"
import { useApiCache } from "../contexts/ApiCacheContext"

export const Formacion = () => {

    const { isLoading, loadingProgress, startLoading, stopLoading, updateProgress } = useContext(PreloaderContext)
    const { fetchWithCache } = useApiCache()

    const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API
    const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN

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

        try{
            const data = await fetchWithCache(
                'training-page-es', // cache key
                `${VITE_BPANEL_API}/training-page/es`,
                options,
                updateProgress // callback para progreso
            )
            
            setPageData(data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
             document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
        }
    }

    useEffect(() => {
        fetchData()
        document.title = "Formación - Almattia"
    }, [])

    useEffect(() => {
        document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
    }, [isLoading])

    return (
    
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.6 }}
                className='px-[95px] max-[1441px]:px-20 max-[1025px]:px-5 max-[768px]:px-3 max-w-[1550px] mx-auto'
            >
                <HeroFormacion
                    scrollDurationVh={1500}
                    content={pageData ? pageData.block_1 : null}
                />
                <motion.section 
                    className="w-full max-[768px]:h-auto flex flex-col gap-[50px] max-[1200px]:gap-[40px] justify-start py-20 max-[1200px]:py-15 pr-10 mt-20 max-[1200px]:mt-15 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5 max-[768px]:px-0 max-[768px]:pb-15 max-[768px]:pt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                > 
                    <div className="flex w-full gap-20 max-[1200px]:gap-10 items-end max-[1025px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
                        <h2 className="text-white text-[55px] max-[1550px]:text-[48px] max-[1200px]:text-[40px] max-[1025px]:text-[36px] max-[768px]:text-[32px] font-light leading-[1.1em] max-w-4xl">
                            {
                                pageData ? pageData.block_2.title_block_2 : 'Modalidades de formación adaptadas a ti'
                            }
                        </h2>
                        <p className="text-[#6d6d6d] text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] max-[768px]:text-[17px] font-light leading-snug max-w-2xl ml-20 max-[1200px]:ml-10 max-[1025px]:ml-0">
                            {
                                pageData ? pageData.block_2.short_text_block_2 : 'Ofrecemos diversas modalidades de formación para adaptarnos a tus necesidades y preferencias. Ya sea presencial, online o híbrida, tenemos la opción perfecta para ti.'
                            }
                        </p>
                    </div>
                    <ModalitiesComp apiToken={VITE_BPANEL_TOKEN} apiUrl={VITE_BPANEL_API} />
                </motion.section>
                <section className="flex gap-5 w-full h-full pb-20 max-[1200px]:pb-15 max-[1025px]:flex-col max-[1025px]:pb-10 max-[768px]:gap-3">
                    <div className="relative w-fit h-fit max-[768px]:w-full rounded-[30px] overflow-hidden">
                        <motion.div 
                            className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#4e5c72] top-10 left-35 z-0"
                            initial={{opacity: 0, x: 50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                        <motion.div 
                            className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#4e5c72] bottom-10 right-35 z-0"
                            initial={{opacity: 0, x: 50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                        <motion.img
                            src="/images/img-form-b2.jpg"
                            alt="Imagen de servicio"
                            className='z-1 object-cover'
                            style={{maskImage: "url('images/img-form-b2-layout.png')", maskRepeat: 'no-repeat', maskSize: 'contain', maskPosition: 'center'}}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                    </div>
                    <div className="w-[50%] mt-10 flex flex-col gap-5 max-[1200px]:gap-4 max-[1025px]:w-full max-[768px]:gap-4">
                        <motion.h2 
                            className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}      
                        >
                            {
                                pageData ? pageData.block_3.title_block_3 : 'Formaciones 360º: más que solo cursos'
                            }
                        </motion.h2>
                        <motion.p 
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}      
                            className='text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] leading-snug font-light text-[#fff]'
                            dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_3.short_text_block_3) : 'Cargando...' }}
                        >
                        </motion.p>
                        <motion.p 
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}      
                            className='text-[20px] max-[1550px]:text-[19px] max-[1200px]:text-[18px] max-[1025px]:text-[17px] leading-snug font-light text-[#a2a39f]'
                            dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_3.long_text_block_3) : 'Cargando...' }}
                        >
                        </motion.p>
                        <Button
                            to={pageData ? pageData.block_3.link_block_3 : '#'}
                            text={pageData ? pageData.block_3.text_link_block_3 : 'Más información'}
                            hover={true}
                            className='mt-6'
                            motion={true}
                            color={"#4e5c72"}
                        />
                    </div>
                </section>
                <section className="w-full h-full flex flex-col gap-10 justify-center items-center pt-30 max-[1200px]:pt-25 pb-20 max-[1200px]:pb-15 max-[1025px]:pt-20 max-[1025px]:pb-10 max-[768px]:gap-5 max-[768px]:px-1">
                    <div className="max-w-[85%] max-[1200px]:max-w-[90%] max-[1025px]:max-w-full flex flex-col gap-5 justify-center items-center text-center max-[768px]:w-full">
                        <motion.h2
                            className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        >
                            { pageData ? pageData.block_4.title_block_4 : 'Conoce a nuestros formadores expertos' }
                        </motion.h2>
                        <motion.p
                            className="text-[20px] max-[1550px]:text-[19px] max-[1200px]:text-[18px] max-[1025px]:text-[17px] font-light text-[#a2a39f] leading-snug text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                            dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_4.short_text_block_4) : 'Cargando...' }}   
                        >
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-5 gap-3 max-[1200px]:grid-cols-3 max-[1025px]:grid-cols-2 max-[768px]:grid-cols-1 w-full">
                        <FormadoresComp apiUrl={VITE_BPANEL_API} apiToken={VITE_BPANEL_TOKEN} />
                    </div>
                </section>
                {/* Calendario formativo */}
                <motion.section 
                    className="w-full max-[768px]:h-auto flex flex-col gap-[50px] max-[1200px]:gap-[40px] justify-start pt-30 max-[1200px]:pt-25 pr-10 pb-20 max-[1200px]:pb-15 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5 max-[768px]:px-0 max-[768px]:pb-15 max-[768px]:pt-10 "
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                > 
                    <div className="flex w-full gap-30 max-[1200px]:gap-20 items-end max-[1025px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
                        <h2 className="text-white text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[32px] max-[768px]:text-[28px] font-light leading-[1.1em]">
                            {
                                pageData ? pageData.block_5.title_block_5 : 'Calendario formativo: descubre nuestros cursos abiertos y especializaciones'
                            }
                        </h2>
                        <p className="text-[#6d6d6d] text-[20px] max-[1550px]:text-[19px] max-[1200px]:text-[18px] max-[1025px]:text-[17px] max-[768px]:text-[17px] font-light leading-snug w-[50%] ml-20 max-[1200px]:ml-10 max-[1025px]:w-full max-[1025px]:ml-0">
                            {
                                pageData ? DOMPurify.sanitize(pageData.block_5.short_text_block_5) : 'Cargando...'
                            }
                        </p>
                    </div>
                    <CoursesComp apiToken={VITE_BPANEL_TOKEN} apiUrl={VITE_BPANEL_API} />
                </motion.section>
                {/* Mapa de ubicación */}
                <section className="w-full pb-10 flex flex-col gap-10 max-[1025px]:gap-8 text-center">
                    <motion.h2 
                        className='text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white'
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        { pageData ? pageData.block_6.title_block_6 : 'Tu próximo destino de formación' }
                    </motion.h2>
                    <motion.div 
                        className="flex relative max-[1025px]:flex-col h-[800px] max-[1200px]:h-[650px] max-[1025px]:h-auto"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        <SectionsForm
                            inputColor={"#394150"}
                            backgroundColor={"#24272de3"}
                            borderColor={"#58657d"}
                            typeFields={['Corporativa', 'Social', 'Cultural', 'Deportiva']}
                            typeTitle={"formación"}
                            directedFields={['Formadores', 'Empresas', 'Particulares']}
                            endpoint={"training-page-contact"}
                        />
                        <StreetMap
                            width={"100%"}
                            height={"650px"}
                            className={'rounded-3xl border-3 border-[#24272d]'}
                            lowBarBgColor={"#24272d"}
                            lowBarBorderColor={"#24272d"}
                        />
                    </motion.div>
                </section>
            </motion.div> 
    )
}