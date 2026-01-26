import React, { useRef, useMemo, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from "motion/react"
import DOMPurify from 'dompurify'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const HeroEventos = ({ scrollDurationVh, id, content }) => {

    const containerRef = useRef(null)
    const textTargetRef = useRef(null)
    const linkRef = useRef(null)
    const splitRef = useRef(null)
    const tlRef = useRef(null)

    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    })

    // Diferentes velocidades de parallax para cada imagen
    const y1 = useTransform(scrollYProgress, [0, 1], [20, -20])
    const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10])
    const y3 = useTransform(scrollYProgress, [0, 1], [10, -10])

    const textToAnimate = content ? content.long_text_block_1 : ''
    const sanitizedText = useMemo(() => {
        if (!textToAnimate) return ''
        return DOMPurify.sanitize(textToAnimate)
    }, [textToAnimate])

    useEffect(() => {
        console.log(scrollYProgress)
    }, [scrollYProgress])

    return (
        <section ref={containerRef} id={id} className={`max-w-[1350px] mx-auto w-full h-screen max-[1441px]:h-auto flex flex-col gap-[60px] justify-start pt-40 pr-10 pb-20 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5  max-[768px]:px-0 max-[768px]:pb-0 max-[768px]:pt-30`}>
            <div ref={scrollRef} className="w-full h-full relative flex flex-col gap-20 max-[1025px]:gap-10">
                <div className="flex flex-col w-full justify-between items-start max-[1025px]:gap-5 max-[768px]:flex-col max-[1025px]:items-start">
                    <div className="flex items-start gap-4">
                        <span className="w-4.5 h-4.5 mt-2.5 bg-[#7d8570] rounded-full"></span>
                        <h2 className="text-[50px] max-[1025px]:text-[40px] leading-tight font-regular text-white">
                            {content ? content.title_block_1 : 'Eventos que dejan huella'}
                        </h2>
                    </div>
                    <p className='text-[30px] max-[1025px]:text-[22px] leading-snug font-light text-[#e7e7e7] max-w-4xl pl-9'>
                        {content ? content.short_text_block_1 : 'Descubre cómo en Almattia creamos experiencias inolvidables que conectan, inspiran y abren nuevas puertas para tu marca o empresa.'}
                    </p>
                </div>
                <div className="relative grid grid-cols-2 gap-[35px] max-[1025px]:grid-cols-1">
                    <div className="flex flex-col gap-[15px]">
                        <motion.img
                            src="/images/img-mid-1.jpg"
                            alt=""
                            className='h-[250px] w-full object-cover rounded-2xl'
                            style={{ y: y1 }}
                        />
                        <motion.img
                            src="/images/img-mid-2.jpg"
                            alt=""
                            className='h-[250px] w-full object-cover rounded-2xl'
                            style={{ y: y2 }}
                        />
                    </div>
                    <div className="flex flex-col gap-10 mt-5">
                        <div 
                            className='eventsHero text-[30px] max-[1441px]:text-[25px] max-[768px]:text-[20px] leading-snug font-light text-[#a0a0a0] prose prose-invert prose-headings:text-white prose-h2:text-[30px] prose-h2:font-light prose-h2:mb-4 prose-p:text-[#a0a0a0] max-w-none'
                            dangerouslySetInnerHTML={{ __html: sanitizedText }}
                        />
                        <Link
                            ref={linkRef}
                            to={content ? content.link_block_1 : '/nuestro-equipo'}
                            className='w-fit text-white text-[20px] leading-0 flex items-center transition-all duration-300 relative group'
                        >
                            <span className='w-5 h-5 absolute bg-[#7d8570] rounded-full group-hover:w-[110%] group-hover:h-10 transition-all duration-300'></span>
                            <p className="ml-7 z-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content ? content.text_link_block_1 : 'Conoce a nuestro equipo') }} />
                        </Link>
                    </div>
                </div>
                {/* <div className="absolute -z-1 w-full h-full top-0 left-0">
                    <div className="absolute -left-50 top-20 bg-[#7d8570] w-[500px] h-[500px] rounded-full blur-[250px]"></div>
                    <div className="absolute right-0 bottom-0 bg-[#7d8570] w-[500px] h-[500px] rounded-full blur-[200px]"></div>
                </div> */}
            </div>
        </section>
    )
}