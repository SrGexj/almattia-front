import { useEffect, useRef, useState } from 'react'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother' 
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from "motion/react"
import { ScrollBar } from './components/ScrollBar'
import { PageScrollProvider } from './contexts/PageScrollContext'
import { Eventos } from './pages/Eventos'
import { Landing } from './pages/Landing'
import { Formacion } from './pages/Formacion'
import { NotFound } from './pages/NotFound'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/header'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import { NuestroEquipo } from './pages/NuestroEquipo'
viewportUnitsBuggyfill.init()

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

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


function App() {

  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const smoother = useRef()

  useGSAP(() => {
    if (smoother.current) {
      smoother.current.kill()
    }
    smoother.current = ScrollSmoother.create({
      wrapper: ".scroll-wrapper",
      content: "#scroll-content",
      smooth: 1.5,
      effects: true,
    })

    ScrollTrigger.refresh()

    return () => {
      if (smoother.current) {
        smoother.current.kill()
        smoother.current = null
      }
    }
  }, { dependencies: [location.pathname] })

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
  }

  return (
    <>
      <PageScrollProvider>
        <ScrollBar id="scroll-bar" />
        <Header id="header" />
        <div className='scroll-wrapper'>
        <main id='scroll-content' className={`transition-all duration-500 ${!isHomePage ? 'ml-10 max-[1024px]:ml-0' : ''}`}>
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              {/* Mapeamos el objeto para crear las rutas dinámicamente */}
              {Object.values(routes).map(({ path, Component }) => (
                <Route
                  key={path} 
                  path={path}
                  element={
                    <>
                    <AnimatedPage>
                      <Component />
                    </AnimatedPage>
                    </>
                  }
                />
              ))}
              <Route
                path="*"
                element={
                  <AnimatedPage>
                    <NotFound />
                  </AnimatedPage>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        </div>
      </PageScrollProvider>
    </>
  )
}

export default App