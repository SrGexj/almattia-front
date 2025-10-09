import { createBrowserRouter } from 'react-router';
import { motion } from "motion/react"

import App from '../App'
import { Eventos } from '../pages/Eventos'
import { Landing } from '../pages/Landing'
import { Formacion } from '../pages/Formacion'
import { NotFound } from '../pages/NotFound'
import { NuestroEquipo } from '../pages/NuestroEquipo'


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
    Formacion: {
      path: "/formacion",
      Component: Formacion,
    },
    NuestroEquipo: {
      path: "/nuestro-equipo",
      Component: NuestroEquipo,
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
]);

export default router;
