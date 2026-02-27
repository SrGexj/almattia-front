import { createBrowserRouter } from 'react-router'
import { motion } from "motion/react"

import App from '../App'
import { Eventos } from '../pages/Eventos'
import { Evento } from '../pages/Evento'
import { Landing } from '../pages/Landing'
import { Formacion } from '../pages/Formacion'
import { NotFound } from '../pages/NotFound'
import { NuestroEquipo } from '../pages/NuestroEquipo'
import { OtrosServicios } from '../pages/OtrosServicios'
import { Curso } from '../pages/Curso'


const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className='w-full'
  >
    {children}
  </motion.div>
) 

  const routes = {
    Home: {
      path: "/",
      Component: Landing,
    },
    Eventos: {
      path: "/eventos",
      Component: Eventos,
    },
    Evento: {
      path: "/eventos/:slug",
      Component: Evento,
    },
    Formacion: {
      path: "/formacion",
      Component: Formacion,
    },
    Curso: {
      path: "/cursos/:slug",
      Component: Curso,
    },
    NuestroEquipo: {
      path: "/nuestro-equipo",
      Component: NuestroEquipo,
    },
    OtrosServicios: {
      path: "/otros-servicios",
      Component: OtrosServicios,
    },
    NotFound: {
      path: "*",
      Component: NotFound,
    },
  }

const router = createBrowserRouter([
  {
    Component: App,
    children: Object.values(routes).map(({ path, Component }) => ({
      path,
      Component: () => (
        <AnimatedPage>
          <Component />
        </AnimatedPage>
      ),
    })),
  },
])

export default router
