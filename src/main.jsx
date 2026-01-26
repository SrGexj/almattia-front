import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as Sentry from "@sentry/react";
import router from './router/index.jsx';

Sentry.init({
  dsn: "https://3a089bb274cfd6305bcd5647fecf07f5@o4507094780018688.ingest.de.sentry.io/4510034259083344",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

// fix icons (Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
});

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}>
    </RouterProvider>
  
)
