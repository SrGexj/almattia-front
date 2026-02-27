import React, { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { motion } from 'framer-motion'
import { createMotionAnimations } from '../../helpers/createMotionAnimations'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const HeroFormacion = ({scrollDurationVh, id, content}) => {

    const containerRef = useRef(null)

    const animations = createMotionAnimations(0.15)

    const textToAnimate = content ? content.long_text_block_1 : ''
    const sanitizedText = useMemo(() => {
        if (!textToAnimate) return ''
        return DOMPurify.sanitize(textToAnimate, { ALLOWED_TAGS: [] })
    }, [textToAnimate])

    return (
        <section ref={containerRef} id={id} className={`w-full h-screen max-[1441px]:h-auto flex flex-col gap-[60px] justify-start pt-40 pr-10 pb-20 max-[1025px]:pr-5 max-[1025px]:pl-5 max-[1025px]:gap-5 max-[768px]:px-0 max-[768px]:pb-0 max-[768px]:pt-30`}>
            <div className="flex flex-col w-full justify-between items-start max-[1025px]:gap-5 max-[768px]:flex-col max-[1025px]:items-start">
                <motion.div
                    {...animations.next()}
                    className="flex items-start gap-4"
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <span className="w-4.5 h-4.5 mt-2.5 bg-[#4e5c72] rounded-full"></span>
                    <h2 className="text-[50px] max-w-[70%] max-[1025px]:text-[40px] leading-tight font-regular text-white">
                        { content ? content.title_block_1 : 'Cargando...'}
                    </h2>
                </motion.div>
                <motion.p {...animations.next()}
                    className='pl-9 text-[30px] max-[1025px]:text-[22px] leading-snug font-light text-[#b9b1b1] max-w-2xl'
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    { content ? content.short_text_block_1 : 'Cargando...'}
                </motion.p>
            </div>
            <div className="flex gap-4 max-[1025px]:grid-cols-1 max-[768px]:gap-10 max-[768px]:flex-col">
                <div className="relative h-full flex max-[768px]:w-full rounded-[30px] overflow-hidden">
                    <motion.div {...animations.next()}
                        className="absolute w-[85%] h-[50%] border-2 rounded-[30px] border-[#4c5b72] top-10 right-20 max-[768px]:left-5 max-[768px]:top-5 z-0"
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                    <motion.img {...animations.next()}
                        src="/images/img-formacion.jpg" 
                        alt="Imagen de servicio"
                        className='z-1 h-full object-cover' 
                        style={{maskImage: "url('/images/layout-f-top.png')", maskRepeat: 'no-repeat', maskSize: 'cover'}} 
                        viewport={{ margin: "0px 0px -250px 0px", once: true }}
                    />
                </div>
                 <motion.div {...animations.next()}
                    className="w-[50%] flex flex-col gap-10 mt-5 max-[1441px]:w-[30%] max-[1025px]:w-full max-[768px]:mt-0"
                    viewport={{ margin: "0px 0px -250px 0px", once: true }}
                >
                    <p className='text-[30px] max-[1441px]:text-[25px] max-[768px]:text-[20px] leading-snug font-light text-[#a0a0a0]'>
                        {sanitizedText}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}