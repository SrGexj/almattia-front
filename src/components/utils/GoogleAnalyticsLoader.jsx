// src/components/utils/GoogleAnalyticsLoader.jsx
import { useEffect } from 'react'
import { useCookieConsent } from 'react-cookie-manager'
import { useLocation } from 'react-router-dom'

export function GoogleAnalyticsLoader() {
  const consent = useCookieConsent()
  const location = useLocation()

  // Carga GA y establece estado de consentimiento
  useEffect(() => {
    const analyticsAccepted = consent?.detailedConsent?.Analytics?.consented

    if (!analyticsAccepted) return

    // Evitar cargar GA más de una vez
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id="
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        window.gtag = function() { window.dataLayer.push(arguments) }

        // 1️⃣ Default: todo denegado
        window.gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied'
        })

        // 2️⃣ Update según consentimiento
        if (analyticsAccepted) {
          window.gtag("consent", "update", { analytics_storage: "granted" })
        }

        // 3️⃣ Inicializar GA
        window.gtag("js", new Date())
        window.gtag("config", "")
        window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        })
      }
    }
  }, [consent])


  // Pageviews automáticos en SPA
  useEffect(() => {
    if (window.gtag && consent?.detailedConsent?.Analytics?.consented) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
      console.log("📄 Pageview enviado:", location.pathname)
    }
  }, [location, consent])

  return null
}
