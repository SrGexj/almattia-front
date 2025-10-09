import { useEffect, useRef, useState } from 'react'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother' 
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from "motion/react"
import { ScrollBar } from './components/ScrollBar'
import { PageScrollProvider } from './contexts/PageScrollContext'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
viewportUnitsBuggyfill.init()

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

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



  return (
    <>
      <PageScrollProvider>
        <ScrollBar id="scroll-bar" />
        <Header id="header" />
        <div className='scroll-wrapper'>
        <main id='scroll-content' className={`transition-all duration-500 ${!isHomePage ? 'ml-10 max-[1024px]:ml-0' : ''}`}>
          <AnimatePresence mode='wait'>
              <Outlet />
          </AnimatePresence>
        </main>
        </div>
      </PageScrollProvider>
    </>
  )
}

export default App