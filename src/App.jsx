import { useEffect, useRef, useState } from 'react'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother' 
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GoogleAnalyticsLoader } from './components/utils/GoogleAnalyticsLoader.jsx';
import { CookieManager } from "react-cookie-manager";
import { motion, AnimatePresence } from "motion/react"
import { ScrollBar } from './components/ScrollBar'
import { PageScrollProvider } from './contexts/PageScrollContext'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Toaster } from 'react-hot-toast';
import { PreloaderProvider } from './contexts/PreloaderContext.jsx'
import { ApiCacheProvider } from './contexts/ApiCacheContext.jsx'
import { AnimatedBackground } from './components/AnimatedBackground.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

function App() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/'
  const [isReady, setIsReady] = useState(false)
  const smootherRef = useRef(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window)

  // Marcar como listo después de montar
  useEffect(() => {
    // Pequeño delay para asegurar que todo está montado
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    // No usar ScrollSmoother en móvil
    if (!isReady || isMobile || isTouchDevice) {
      return
    }

    if (smootherRef.current) {
      smootherRef.current.kill()
      smootherRef.current = null
    }

    const timer = setTimeout(() => {
      try {
        smootherRef.current = ScrollSmoother.create({
          smooth: 1,
          effects: true,
          smoothTouch: false
        })
      } catch (error) {
        console.warn('ScrollSmoother failed:', error)
      }
    }, 150)

    return () => {
      clearTimeout(timer)
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
    }
  }, [pathname, isReady])

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [pathname])

  return (
    <PageScrollProvider>
      <Toaster />
      {/* Renderizar siempre CookieManager - tiene su propio error handling */}
      <CookieManager
        classNames={{
          acceptButton: "!bg-[#f0f0f030] transition-all duration-300 hover:!bg-[#7d8570] !text-white text-xs text-medium w-full px-3 py-1.5 rounded-md mr-2",
          declineButton: "!bg-[#1c1c1c] transition-all duration-300 hover:!bg-[#f00] w-full text-[#1c1c1c] text-xs px-3 py-1.5 rounded-md",
          manageButton: "!text-white transition-all duration-300 hover:!border-[#7d8570] border border-gray-700 text-xs px-3 py-1.5 rounded-md",
        }}
        cookieKitId=""
        showManageButton={true}
        theme="dark"
        displayType="popup"
        enableFloatingButton={false}
        translations={{
          title: "Usamos cookies 🍪",
          message: "Valoramos tu privacidad. Elige qué cookies deseas permitir. Las cookies esenciales siempre están habilitadas, ya que son necesarias para que el sitio web funcione correctamente.",
          buttonText: "Aceptar todas",
          declineButtonText: "Rechazar todas",
          manageButtonText: "Configurar cookies",
          manageTitle: "Configurar cookies",
          manageMessage: "Selecciona las cookies que deseas permitir:",
          privacyPolicyText: 'Política de cookies',
          manageEssentialTitle: "Cookies esenciales",
          manageEssentialSubtitle: "Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.",
          manageEssentialStatusButtonText: "Siempre activas",
          manageAnalyticsTitle: "Analíticas",
          manageAnalyticsSubtitle: "Estas cookies nos ayudan a mejorar el sitio web recopilando y reportando información de forma anónima.",
          manageAdvertTitle: "Publicidad",
          manageAdvertSubtitle: "Estas cookies se utilizan para ofrecer anuncios más relevantes para ti y tus intereses.",
          manageSocialTitle: "Redes sociales",
          manageSocialSubtitle: "Estas cookies te permiten compartir contenido en redes sociales y otras plataformas.",
          manageCookiesStatus: "Status: {{status}} on {{date}}",
          manageCookiesEnabled: "activadas",
          manageCookiesDisabled: "desactivadas",
          manageCancelButtonText: "Cancelar",
          manageSaveButtonText: "Guardar configuración",
          floatingButtonAriaLabel: "Administrar preferencias de cookies",
        }}
        privacyPolicyUrl='/cookies'
        onAccept={() => {
          try {
            window.gtag?.("consent", "update", { analytics_storage: "granted" });
          } catch (e) {
            console.log('GA blocked or not loaded')
          }
        }}
        onDecline={() => {
          try {
            window.gtag?.("consent", "update", { analytics_storage: "denied" });
          } catch (e) {
            console.log('GA blocked or not loaded')
          }
        }}
        onManage={(preferences) => {
          try {
            if (preferences.analytics) {
              window.gtag?.("consent", "update", { analytics_storage: "granted" });
            } else {
              window.gtag?.("consent", "update", { analytics_storage: "denied" });
            }
          } catch (e) {
            console.log('GA blocked or not loaded')
          }
        }}
      >
        <ApiCacheProvider>
          <PreloaderProvider>
            <AnimatedBackground opacity={0.2} color="#fff" />
            <ScrollBar id="scroll-bar" />
            <Header id="header" />
            <div id="smooth-wrapper">
              <main id='smooth-content' className={`${!isHomePage ? 'ml-10 max-[1025px]:ml-0' : ''}`}>
                <AnimatePresence mode='wait'>
                  <Outlet key={pathname} />
                </AnimatePresence>
              </main>
            </div>
            {/* GA se carga con su propio error handling */}
            <GoogleAnalyticsLoader />
          </PreloaderProvider>
        </ApiCacheProvider>
      </CookieManager>
    </PageScrollProvider>
  )
}

export default App