import React, { use, useEffect, useRef } from 'react'
import { HeroEventos } from '../components/pages/eventos/HeroEventos'

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
        </>
    )
}