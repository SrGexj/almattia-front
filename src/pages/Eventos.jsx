import React, { use, useEffect, useRef } from 'react'
import { HeroEventos } from '../components/pages/eventos/HeroEventos'
import { Link } from 'react-router-dom'

export const Eventos = () => {

/*     useEffect(() => {
        window.scrollTo(0, 0);
    }, []) */

    return (
        <>
           <HeroEventos
                textToAnimate={"En Almattia diseñamos, planificamos y producimos eventos únicos, alineados con los objetivos y valores de cada cliente. Desde experiencias de marca hasta encuentros corporativos, garantizamos una ejecución impecable en cada fase del proyecto."}
                scrollDurationVh={2000}
            />
            <section className="flex w-full h-screen justify-between items-center">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[50px] leading-tight font-light text-white">Eventos Corporativos</h2>
                    <p className='text-[30px] max-[1024px]:text-[25px] leading-snug font-light text-[#6d6d6d] max-w-2xl '>
                        Desde conferencias y seminarios hasta lanzamientos de productos y eventos de networking, creamos experiencias que comunican, inspiran y refuerzan la imagen de tu empresa, impulsan relaciones y generan impacto.
                    </p>
                    <Link to='/nuestro-equipo' className='text-white text-[20px] leading-0 flex items-center gap-2 transition-all duration-300'>
                        <span className='w-5 h-5 bg-[#7d8570] rounded-full'></span>
                        Obtén más información
                    </Link>
                </div>
            </section>
        </>
    )
}