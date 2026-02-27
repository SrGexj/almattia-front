import { useContext, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { HeroFormacion } from "../components/pages/formacion/HeroFormación"
import { Button } from "../components/ui/Button"
import { ListBlocks } from "../components/pages/otros-servicios/listBlocks"
import { CoursesComp } from "../components/pages/formacion/CoursesComp"
import { FormadoresComp } from "../components/pages/formacion/FormadoresComp"
import { SectionsForm } from "../components/SectionsForm"
import { StreetMap } from "../components/StreetMap"
import DOMPurify from 'dompurify';
import { PreloaderContext } from "../contexts/PreloaderContext"
import { useApiCache } from "../contexts/ApiCacheContext"

export const OtrosServicios = () => {

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

        try {
            const data = await fetchWithCache(
                'other-services-page-es', // cache key
                `${VITE_BPANEL_API}/other-services-page/es`,
                options,
                updateProgress // callback para progreso
            )

            setPageData(data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
            /* document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)'; */
        }
    }

    const sanitizedText = useMemo(() => {
        if (!pageData) return ''
        return DOMPurify.sanitize(pageData.block_1.text_block_1, { ALLOWED_TAGS: ['<p>', '<br>', '<strong>', '<em>'] })
    }, [pageData])

    useEffect(() => {
        fetchData()
        document.title = "Otros Servicios - Almattia"
    }, [])

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='px-[95px] max-[1441px]:px-20 max-[1025px]:px-5 max-[768px]:px-3 max-w-[1550px] mx-auto'
        >
            {/* seccion 1 */}
            <section className={`w-full h-screen max-[1441px]:h-auto flex flex-col gap-[60px] justify-start pt-40 pr-10 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5 max-[768px]:px-0 max-[768px]:pt-30`}>
                <div className="flex flex-col w-full justify-between items-start max-[1025px]:gap-5 max-[768px]:flex-col max-[1025px]:items-start">
                    <motion.div
                        className="flex items-start gap-4"
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        <span className="w-4.5 h-4.5 mt-2.5 bg-[#f5f7f9] rounded-full"></span>
                        <h2 className="text-[50px] max-w-full max-[1025px]:text-[40px] leading-tight font-regular text-white">
                            {pageData ? pageData.block_1.title_block_1 : 'Cargando...'}
                        </h2>
                    </motion.div>
                    <motion.p
                        className='pl-9 text-[30px] max-[1025px]:text-[22px] leading-snug font-light text-[#b9b1b1] max-w-3xl'
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        {pageData ? pageData.block_1.subtitle_block_1 : 'Cargando...'}
                    </motion.p>
                </div>
                <div className="flex gap-10 max-[1025px]:grid-cols-1 max-[768px]:gap-10 max-[768px]:flex-col">
                    <div className="relative h-full flex max-[768px]:w-full rounded-[30px] overflow-hidden">
                        <motion.div
                            className="absolute w-[85%] h-[50%] border-2 rounded-[30px] border-[#4c5b72] top-10 right-20 max-[768px]:left-5 max-[768px]:top-5 z-0"
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                        <motion.img
                            src={pageData?.images?.image_block_1 ? pageData.images.image_block_1.url : '/images/img-formacion.jpg'}
                            alt="Imagen de servicio"
                            className='z-1 h-full object-cover'
                            style={{ maskImage: "url('/images/layout-f-top.png')", maskRepeat: 'no-repeat', maskSize: 'cover' }}
                            viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        />
                    </div>
                    <motion.div
                        className="w-[50%] flex flex-col gap-10 mt-5 max-[1441px]:w-[30%] max-[1025px]:w-full max-[768px]:mt-0"
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        <p className='text-[30px] max-[1441px]:text-[25px] max-[768px]:text-[20px] leading-snug font-light text-[#a0a0a0]' dangerouslySetInnerHTML={{ __html: sanitizedText }} />
                    </motion.div>
                </div>
            </section>
            {/* seccion 2 */}
            <motion.section
                className="w-full max-[768px]:h-auto flex flex-col gap-[50px] max-[1200px]:gap-[40px] justify-start py-20 max-[1200px]:py-15 pr-10 max-[1200px]:mt-15 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5 max-[768px]:px-0 max-[768px]:pb-15"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ margin: "0px 0px -250px 0px", once: true }}
            >
                <div className="flex w-full gap-20 max-[1200px]:gap-10 items-end max-[1025px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
                    <h2 className="text-white text-[55px] max-[1550px]:text-[48px] max-[1200px]:text-[40px] max-[1025px]:text-[36px] max-[768px]:text-[32px] leading-[1.1em] max-w-4xl">
                        {
                            pageData ? pageData?.block_2?.title_block_2 : 'Modalidades de formación adaptadas a ti'
                        }
                    </h2>
                    <p className="text-[#a2a2a2] text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] max-[768px]:text-[17px] font-light leading-snug max-w-2xl ml-20 max-[1200px]:ml-10 max-[1025px]:ml-0" dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_2.text_block_2,) : 'Cargando...' }}>
                    </p>
                </div>
                <ListBlocks apiToken={VITE_BPANEL_TOKEN} apiUrl={VITE_BPANEL_API} />
                <p className="text-[#b5b5b5] text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] max-[768px]:text-[17px] font-light leading-snug max-[1200px]:ml-10 max-[1025px]:ml-0">
                    {
                        pageData ? pageData.block_2?.text_link_block_2 : 'Ofrecemos diversas modalidades de formación para adaptarnos a tus necesidades y preferencias. Ya sea presencial, online o híbrida, tenemos la opción perfecta para ti.'
                    }
                </p>
            </motion.section>
            {/* seccion 3 */}
            <section className="flex gap-5 w-full h-full pb-20 max-[1200px]:pb-15 max-[1025px]:flex-col max-[1025px]:pb-10 max-[768px]:gap-3">
                {/* img */}
                <div className="relative w-fit h-fit max-[768px]:w-full rounded-[30px] overflow-hidden">
                    <motion.div
                        className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#F7FAFC] top-10 left-35 z-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.div
                        className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#F7FAFC] bottom-10 right-35 z-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.img
                        src={pageData?.images?.image_block_2 ? pageData.images.image_block_2.url : "/images/img-form-b2.jpg"}
                        alt="Imagen de servicio"
                        className='z-1 object-cover'
                        style={{ maskImage: "url('images/img-form-b2-layout.png')", maskRepeat: 'no-repeat', maskSize: 'contain', maskPosition: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                </div>
                {/* content */}
                <div className="w-[50%] mt-10 flex flex-col gap-5 max-[1200px]:gap-4 max-[1025px]:w-full max-[768px]:gap-4">
                    <motion.h2
                        className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-medium text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        {
                            pageData ? pageData.block_3.title_block_3 : 'Cargando…'
                        }
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        className='text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] leading-snug font-light text-[#a2a2a2]'
                        dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_3.text_block_3, {ALLOWED_TAGS: ['p','br','strong','em','ul','ol','li','a','span','b','i'], ALLOWED_ATTR: ['class']}) : 'Cargando...' }}
                    />
                </div>
            </section>
            {/* seccion 4 */}
            <section className="flex flex-row-reverse gap-5 w-full h-full pb-20 max-[1200px]:pb-15 max-[1025px]:flex-col max-[1025px]:pb-10 max-[768px]:gap-3">
                {/* img */}
                <div className="relative w-fit h-fit max-[768px]:w-full rounded-[30px] overflow-hidden">
                    <motion.div
                        className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#F7FAFC] top-10 left-35 z-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.div
                        className="absolute w-[50%] h-[30%] border-2 rounded-[30px] border-[#F7FAFC] bottom-10 right-35 z-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.img
                        src={pageData?.images?.image_block_3 ? pageData.images.image_block_3.url : "/images/img-form-b2.jpg"}
                        alt="Imagen de servicio"
                        className='z-1 object-cover'
                        style={{ maskImage: "url('images/img-form-b2-layout.png')", maskRepeat: 'no-repeat', maskSize: 'contain', maskPosition: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                </div>
                {/* content */}
                <div className="w-[50%] mt-10 flex flex-col gap-5 max-[1200px]:gap-4 max-[1025px]:w-full max-[768px]:gap-4">
                    <motion.h2
                        className="text-[50px] max-[1550px]:text-[42px] max-[1200px]:text-[36px] max-[1025px]:text-[30px] leading-tight font-light text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    >
                        {
                            pageData ? pageData.block_4.title_block_4 : 'Cargando…'
                        }
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                        className='text-[24px] max-[1550px]:text-[21px] max-[1200px]:text-[19px] max-[1025px]:text-[18px] leading-snug font-light text-[#a2a2a2]'
                        dangerouslySetInnerHTML={{ __html: pageData ? DOMPurify.sanitize(pageData.block_4.text_block_4, {ALLOWED_TAGS: ['p','br','strong','em','ul','ol','li','a','span','b','i'], ALLOWED_ATTR: ['class']}) : 'Cargando...' }}
                    />
                </div>
            </section>
            {/* Mapa de ubicación */}
            <section className="w-full pb-10 flex flex-col gap-10 max-[1025px]:gap-8 text-center">
                <motion.div
                    className="flex relative max-[1025px]:flex-col h-[800px] max-[1200px]:h-[650px] max-[1025px]:h-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <SectionsForm
                        inputColor={"#F7FAFC40"}
                        backgroundColor={"#323232C4"}
                        borderColor={"#F7FAFC40"}
                        typeFields={['Corporativa', 'Social', 'Cultural', 'Deportiva']}
                        typeTitle={"formación"}
                        directedFields={['Formadores', 'Empresas', 'Particulares']}
                        endpoint={"training-page-contact"}
                    />
                    <StreetMap
                        width={"100%"}
                        height={"650px"}
                        className={'rounded-3xl border-3 border-[#F7FAFC40]'}
                        lowBarBgColor={"#323232C4"}
                        lowBarBorderColor={"#F7FAFC40"}
                    />
                </motion.div>
            </section>
        </motion.div>
    )
}