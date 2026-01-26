// src/components/utils/GoogleAnalyticsLoader.jsx
import { useEffect, useState } from 'react'
import { useCookieConsent } from 'react-cookie-manager'
import { useLocation } from 'react-router-dom'

export function GoogleAnalyticsLoader() {
  const consent = useCookieConsent()
  const location = useLocation()
  const [gaLoaded, setGaLoaded] = useState(false)
  const [loadAttempted, setLoadAttempted] = useState(false)

  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ""

  // Carga GA y establece estado de consentimiento
  useEffect(() => {
    // Si ya intentamos cargar, no hacerlo de nuevo
    if (loadAttempted) return

    const analyticsAccepted = consent?.detailedConsent?.Analytics?.consented

    // Si no hay consentimiento, no cargar
    if (!analyticsAccepted) return

    // Marcar que intentamos cargar
    setLoadAttempted(true)

    // Verificar si GA ya está cargado
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
    if (existingScript || window.gtag) {
      setGaLoaded(true)
      return
    }

    // Si no hay GA_ID, no intentar cargar
    if (!GA_ID) {
      console.warn('Google Analytics ID not configured')
      return
    }

    try {
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      script.async = true

      // Manejar bloqueo de Brave Shields
      script.onerror = () => {
        console.log('Google Analytics blocked (privacy shield detected)')
        setGaLoaded(false)
      }

      script.onload = () => {
        try {
          window.dataLayer = window.dataLayer || []
          window.gtag = function() { window.dataLayer.push(arguments) }

          // 1️⃣ Default: todo denegado
          window.gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          })

          // 2️⃣ Update según consentimiento
          if (analyticsAccepted) {
            window.gtag("consent", "update", { analytics_storage: "granted" })
          }

          // 3️⃣ Inicializar GA
          window.gtag("js", new Date())
          window.gtag("config", GA_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          })

          // 4️⃣ Enviar pageview inicial
          window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          })

          setGaLoaded(true)
          console.log("✅ Google Analytics cargado correctamente")
        } catch (error) {
          console.log('Error initializing GA:', error)
          setGaLoaded(false)
        }
      }

      // Añadir script al DOM con delay para no bloquear rendering
      setTimeout(() => {
        document.body.appendChild(script)
      }, 500)

    } catch (error) {
      console.log('Failed to load Google Analytics:', error)
      setGaLoaded(false)
    }
  }, [consent, loadAttempted, GA_ID])

  // Pageviews automáticos en SPA
  useEffect(() => {
    // Solo enviar pageviews si GA está cargado y hay consentimiento
    if (!gaLoaded || !window.gtag) return

    const analyticsAccepted = consent?.detailedConsent?.Analytics?.consented
    if (!analyticsAccepted) return

    try {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
      console.log("📄 Pageview enviado:", location.pathname)
    } catch (error) {
      console.log('Error sending pageview:', error)
    }
  }, [location, consent, gaLoaded])

  return null
}