import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const HeroEventos = ({textToAnimate, scrollDurationVh, id}) => {

    const containerRef = useRef(null);
    const textTargetRef = useRef(null);
    const linkRef = useRef(null);

    useGSAP(() => {
        
        const split = new SplitText(textTargetRef.current, { type: "chars" });
        const chars = split.chars; 
        
        gsap.set(linkRef.current, { opacity: 0 }); 
        gsap.set(chars, { color: '#6d6d6d' }); 
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current, 
                pin: true,                      
                start: "top top",               
                end: `+=${scrollDurationVh}vh`, 
                scrub: true,                    
            }
        });


        tl.to(chars, {
            color: 'white',
            stagger: 0.015,
            ease: "none"
        })
        
        tl.to(linkRef.current, {
            opacity: 1,
            duration: 0.3, 
        }, ">");
        
        return () => split.revert()
        
    }, { scope: containerRef, dependencies: [textToAnimate]});

    return (
        <section ref={containerRef} id={id} className={`w-full h-screen flex flex-col gap-[60px] justify-start pt-40 px-[95px] pr-10 mb-10`}>
            <div className="flex w-full justify-between items-center">
                <div className="flex items-start gap-4">
                    <span className="w-4.5 h-4.5 mt-2.5 bg-[#7d8570] rounded-full"></span>
                    <h2 className="text-[50px] leading-tight font-light text-white">Organización <br /> de Eventos</h2>
                </div>
                <p className='text-[30px] max-[1024px]:text-[25px] leading-snug font-light text-[#6d6d6d] max-w-2xl'>
                    Creamos experiencias que comunican, inspiran y refuerzan la imagen de tu empresa, impulsan relaciones y generan impacto.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-[35px]">
                <div className="flex flex-col gap-[15px]">
                    <img src="/images/img-mid-1.jpg" alt="" className='h-full w-full object-cover rounded-2xl' />
                    <img src="/images/img-mid-2.jpg" alt="" className='h-full w-full object-cover rounded-2xl' />
                </div>
                <div className="flex flex-col gap-10 mt-5">
                    <p ref={textTargetRef} className='text-[30px] max-[1024px]:text-[25px] leading-snug font-light text-[#a0a0a0]'>
                        {textToAnimate}
                    </p>
                    <Link to='/nuestro-equipo' ref={linkRef} className='text-white text-[20px] leading-0 flex items-center gap-2 transition-all duration-300'>
                        <span className='w-5 h-5 bg-[#7d8570] rounded-full'></span>
                        Conoce a nuestro equipo
                    </Link>
                </div>
                <div >
                    <img src="/images/img-mid-2.jpg" alt="" className='h-full w-full object-cover rounded-2xl' />
                </div>
            </div>
        </section>
    )
}