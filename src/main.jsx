import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as Sentry from "@sentry/react";
import { GoogleAnalyticsLoader } from './components/utils/GoogleAnalyticsLoader.jsx';
import { CookieManager } from "react-cookie-manager";

Sentry.init({
  dsn: "https://3a089bb274cfd6305bcd5647fecf07f5@o4507094780018688.ingest.de.sentry.io/4510034259083344",
  sendDefaultPii: true
});

// fix iconos (Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CookieManager
          classNames={
            {
              acceptButton:  "!bg-[#f0f0f030] transition-all duration-300 hover:!bg-[#7d8570] !text-white text-xs text-medium w-full px-3 py-1.5 rounded-md mr-2",
              declineButton: "!bg-[#1c1c1c] transition-all duration-300 hover:!bg-[#f00] w-full text-[#1c1c1c] text-xs px-3 py-1.5 rounded-md",
              manageButton:  "!text-white transition-all duration-300 hover:!border-[#7d8570] border border-gray-700 text-xs px-3 py-1.5 rounded-md",
            }
          }
          cookieKitId=""
          showManageButton={true}
          theme="dark"
          displayType="popup"
          enableFloatingButton={false}
          translations={{
            // General
            title: "Usamos cookies 🍪",
            message: "Valoramos tu privacidad. Elige qué cookies deseas permitir. Las cookies esenciales siempre están habilitadas, ya que son necesarias para que el sitio web funcione correctamente.",
            buttonText: "Aceptar todas",
            declineButtonText: "Rechazar todas",
            manageButtonText: "Configurar cookies",
            manageTitle: "Configurar cookies",
            manageMessage: "Selecciona las cookies que deseas permitir:",
            privacyPolicyText: 'Política de cookies',
            // Esenciales
            manageEssentialTitle: "Cookies esenciales",
            manageEssentialSubtitle: "Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.",
            manageEssentialStatusButtonText: "Siempre activas",
            // Analíticas
            manageAnalyticsTitle: "Analíticas",
            manageAnalyticsSubtitle: "Estas cookies nos ayudan a mejorar el sitio web recopilando y reportando información de forma anónima.",
            // Publicitarias
            manageAdvertTitle: "Publicidad",
            manageAdvertSubtitle: "Estas cookies se utilizan para ofrecer anuncios más relevantes para ti y tus intereses.",
            // Sociales
            manageSocialTitle: "Redes sociales",
            manageSocialSubtitle: "Estas cookies te permiten compartir contenido en redes sociales y otras plataformas.",
            // Estados
            manageCookiesStatus: "Status: {{status}} on {{date}}",
            manageCookiesEnabled: "activadas",
            manageCookiesDisabled: "desactivadas",
            // Botones
            manageCancelButtonText: "Cancelar",
            manageSaveButtonText: "Guardar configuración",
            floatingButtonAriaLabel: "Administrar preferencias de cookies"
          }}
          privacyPolicyUrl='/cookies'
          onAccept={
            () => {
              window.gtag?.("consent", "update", { analytics_storage: "granted" });
          }}
          onDecline={
            () => {
              window.gtag?.("consent", "update", { analytics_storage: "denied" });
          }}
          onManage={(preferences) => {
            if (preferences.analytics) {
              window.gtag?.("consent", "update", { analytics_storage: "granted" });
            } else {
              window.gtag?.("consent", "update", { analytics_storage: "denied" });
            }
          }}
        >
          <App />
          <GoogleAnalyticsLoader />
        </CookieManager>
    </Router>
  </StrictMode>
)
