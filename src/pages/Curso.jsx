import { useContext, useEffect, useRef, useState } from "react"
import { PreloaderContext } from "../contexts/PreloaderContext"
import { useApiCache } from "../contexts/ApiCacheContext"
import { useParams } from "react-router-dom"
import DOMPurify from 'dompurify'
import { motion } from "framer-motion"
import { CornerDownLeft, Share2 } from "lucide-react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const Curso = () => {

    const scrollRef = useRef(null)
    const contentRef = useRef(null)

    const { isLoading, loadingProgress, startLoading, stopLoading, updateProgress } = useContext(PreloaderContext)
    const { fetchWithCache } = useApiCache()
    const { slug } = useParams()

    const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API
    const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN

    const [courseData, setCourseData] = useState(null)

    const isMobile = window.innerWidth < 768

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
                'course-es',
                `${VITE_BPANEL_API}/course/${slug}/es`,
                options,
                updateProgress
            )
            setCourseData(data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
            const smooth = document.querySelector('#smooth-content')
            if (smooth) smooth.style.transform = 'translate(0px, 0px)';
        }
    }

    const shareCourse = () => {
        const shareData = {
            title: courseData?.title,
            text: courseData?.description,
            url: window.location.href
        }
        navigator.share(shareData)
            .then(() => console.log('Course shared successfully'))
            .catch((error) => console.error('Error sharing course:', error))
    }

    useEffect(() => {
        fetchData()
        document.title = "Formación - Almattia"
    }, [])

    useEffect(() => {
        const smooth = document.querySelector('#smooth-content')
        if (smooth) smooth.style.transform = 'translate(0px, 0px)';
    }, [isLoading])

    useEffect(() => {
        // header en scroll se le pone clase bg-[#353f4f]
        const header = document.querySelector('header')
        document.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add('bg-[#353f4f]')
            } else {
                header.classList.remove('bg-[#353f4f]')
            }
        })
    }, [])

    useGSAP(() => {
        if (!contentRef.current) return
        if (isMobile) return
        
        // sticky contentRef
        ScrollTrigger.create({
            trigger: contentRef.current,
            start: "-150px top",
            end: `${scrollRef.current.offsetHeight} top`,
            pin: true,
            pinSpacing: false
        });
    }, [scrollRef]);

    return (
        <div ref={scrollRef} className="max-w-[1750px] mx-auto px-[95px] max-[1441px]:px-20 max-[1025px]:px-5 max-[768px]:px-3 pt-24 flex flex-col gap-5 pb-10">
            <span onClick={() => window.location.href = '/formacion'} className="text-[#f1f1f1] w-fit px-3 rounded-2xl py-1 text-sm uppercase font-medium cursor-pointer transition-colors duration-300 hover:text-[#4c5b72]">
                <CornerDownLeft className="inline-block mr-1" size={18} />
                volver atrás
            </span>
            <section className="flex gap-5 max-[1025px]:flex-col max-[1025px]:gap-8 items-start">
                {/* Imagen del curso */}
                <div className="relative flex flex-col gap-5 w-[55%] max-[1025px]:w-full rounded-[30px] overflow-hidden flex-shrink-0">
                    {/*     <motion.div
                        className="absolute w-[85%] h-[50%] border-2 rounded-[30px] border-[#4c5b72] top-10 right-10 max-[768px]:left-5 max-[768px]:top-5 z-0"
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.img
                        src={courseData?.images?.featured_image?.url}
                        alt={courseData?.title || "Imagen del curso"}
                        className="z-1 w-full h-full object-cover rounded-[30px]"
                        style={{ maskImage: "url('/images/layout-f-top.png')", maskRepeat: 'no-repeat', maskSize: 'cover' }}
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    /> */}
                    <motion.img
                        src={courseData?.images?.featured_image?.url}
                        alt={courseData?.title || "Imagen del curso"}
                        className="z-1 w-full object-cover rounded-[30px]"
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <section className="bg-[#292a2b] border-1 border-[#565454] rounded-2xl p-5">
                        <h3 className="text-[24px] font-medium text-[#f1f1f1] mb-4">Temario del curso:</h3>
                        <div className="courseInfo text-[#9ba3af] text-[16px] leading-relaxed list-wrapper"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(courseData?.course_syllabus)
                            }}
                        />
                    </section>
                </div>
                {/* Info del curso */}
                <div ref={contentRef} className="w-full">
                    <div className="max-[1025px]:w-full bg-[#292a2b] border-1 border-[#565454] flex flex-col gap-2 p-8 rounded-[30px] shadow-lg">
                        <h2 className="text-[28px] max-[1025px]:text-[24px] font-medium text-[#f1f1f1] leading-tight">
                            {courseData?.title}
                        </h2>
                        <div className="flex gap-2">
                            <span className="text-[#8f99aa] bg-[#3b434d] rounded-xl px-2">{courseData?.location}</span>
                            <span className="text-[#8f99aa] bg-[#3b434d] rounded-xl px-2">{courseData?.day_string}</span>
                            <span className="text-[#8f99aa] bg-[#3b434d] rounded-xl px-2">{courseData?.time_string}</span>
                        </div>
                        { courseData?.price 
                            ? (
                                <p className="font-bold flex items-center gap-2 text-[#e1e4e9] text-[28px] max-[1025px]:text-[22px]">
                                    {courseData?.price + '€'}
                                    <span className="text-lg font-light text-[#697588] relative before:h-[2px] before:w-full before:bg-[#697588] before:absolute before:top-1/2 before:translate-y-[-50%]">
                                        {courseData?.price - 5.01 + '€'}
                                    </span>
                                </p>
                            ) 
                            : (
                                <p className="font-bold flex items-center gap-2 text-[#e1e4e9] text-[28px] max-[1025px]:text-[22px]">Gratuito</p>
                            )
                        }
                        <div className="flex gap-2 items-center justify-start">

                            <a href={courseData?.link ? courseData.link : '/contacto'} className="w-fit inline-block mt-4 px-10 py-3 bg-[#545f6c] text-white rounded-full text-center font-medium transition-colors duration-300 hover:bg-[#3b434d]">
                                Inscribirse al curso
                            </a>
                            {/* boton de compartir */}
                            <span
                                className="cursor-pointer w-fit inline-block mt-4 p-3 bg-[#363b42] text-[#80838a] rounded-full text-center font-medium transition-colors duration-300 hover:bg-[#3b434d]"
                                onClick={shareCourse}
                            >
                                <Share2 />
                            </span>
                        </div>
                        <div className="h-[2px] w-1/3 bg-[#4a535d] my-2 rounded" />
                        <p className="text-[#acafb5] text-[20px] font-medium">
                            Características del curso:
                        </p>
                        <div
                            className="text-[#9ba3af] text-[16px] leading-relaxed list-wrapper"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(courseData?.course_features, {
                                    ALLOWED_TAGS: ['ul', 'ol', 'li', 'p', 'strong', 'em', 'span', 'b', 'i', 'br'],
                                    ALLOWED_ATTR: ['class']
                                })
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}