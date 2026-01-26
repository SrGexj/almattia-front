import fs from 'fs/promises'
import path from 'path'

// --- CONSTANTES DE CONFIGURACIÓN ---
const BASE_URL = 'https://almattia.com'
const BPANEL_API_BASE = 'https://bpanel.almattia.com/api'

// ¡IMPORTANTE! Reemplaza los tokens con los valores reales.
const BPANEL_AUTH_TOKEN = 'Bearer AhALTLLbQr9j5GQ5wuSN' 

const LANGUAGE = 'es' 
const LIMIT_PAGINATION = '0/1000' 

// --- RUTAS ESTÁTICAS ---
const staticRoutes = [
    '/',
    '/el-viaje',
    '/asociados',
    '/territorios',
    '/experiencias',
    '/eventos',
    '/propuestas', // La página principal de propuestas es estática
    '/blog',
    '/aviso-legal', 
    '/politica-privacidad',
    '/cookies'
]

// --- CONFIGURACIÓN DE RUTAS DINÁMICAS (Listados de la API) ---
const dynamicRoutesConfig = [
    // 1. BLOG (BPANEL): Obtiene TODAS las entradas, incluyendo Propuestas.
    { 
        apiBase: BPANEL_API_BASE,
        authToken: BPANEL_AUTH_TOKEN, 
        apiPath: `/blog/${LANGUAGE}/${LIMIT_PAGINATION}`, 
        routePrefix: '/blog/',
        type: 'blog' 
    }, 
    
    // 2. BLOG CATEGORÍAS (BPANEL): Obtiene las categorías de Propuestas para generar URLs dinámicas.
    { 
        apiBase: BPANEL_API_BASE,
        authToken: BPANEL_AUTH_TOKEN, 
        apiPath: `/blog-categories/${LANGUAGE}/child/true`, 
        // Asumimos que las categorías dinámicas de Propuestas usan la ruta /propuestas/:slug
        routePrefix: '/propuestas/', 
        type: 'blog_categories' 
    },
];

// --- FUNCIÓN DE CONSULTA DE API ---
async function fetchSlugs(config) { 
    const fullUrl = `${config.apiBase}${config.apiPath}`
    
    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Authorization': config.authToken, 
                'Content-Type': 'application/json' 
            }
        }) 

        // Manejo de errores de HTTP 
        if (!response.ok) {
            console.error(`Error ${response.status} (${response.statusText}) al obtener datos de ${config.apiPath}. URL: ${fullUrl}`)
            throw new Error(`Fallo en la API, status: ${response.status}`)
        }
        
        const data = await response.json() 
        let items = null
        // Lógica de Extracción de Datos FINAL:
        if (config.type === 'blog') {
            // Caso 1: BLOG entries -> data.blogs.data
            items = data.blogs && data.blogs.data ? data.blogs.data : null 
        } else if (config.type === 'gestion') {
            // Caso 2: GESTIÓN -> 'member'
            items = data.member
        } else if (config.type === 'blog_categories') {
            // Caso 3: CATEGORÍAS -> Array raíz con children (necesita aplanarse)
            if (Array.isArray(data)) {
                items = [];
                data.forEach(parent => {
                    // Incluir categorías padre (ej: 'propuestas')
                    if (parent.slug) items.push(parent); 
                    // Incluir categorías hijas (ej: 'travesias-en-kayak-paddle-surf-vela')
                    if (Array.isArray(parent.children)) {
                        items.push(...parent.children);
                    }
                });
            }
        } else {
            // Fallback genérico para otros endpoints de BPanel
            items = data.data || data
        }

        if (!Array.isArray(items)) {
            console.warn(`La API en ${config.apiPath} no devolvió un array válido. Estructura inesperada.`)
            return []
        }

        // Extracción del slug o id según el tipo
        return items
                   .map(item => {
                       if (config.type === 'gestion') {
                           // Para GESTIÓN, usamos el ID (ej: /territorios/61)
                           return item.id
                       }
                       // Para BPANEL, usamos slug
                       return item.slug || item.id
                   })
                   .filter(val => val)

    } catch (error) {
        console.error(`❌ Fallo al consultar o procesar ${config.apiPath}:`, error.message)
        return [] 
    }
}

// --- FUNCIÓN PRINCIPAL DE GENERACIÓN DE SITEMAP ---
async function generateSitemap() {
    console.log('Iniciando la generación del sitemap.xml...')
    
    // 1. URLs estáticas
    let allUrls = staticRoutes.map(route => ({
        loc: `${BASE_URL}${route}`,
        changefreq: route === '/' ? 'daily' : 'monthly',
        priority: route === '/' ? '1.0' : '0.8',
        lastmod: new Date().toISOString().split('T')[0], 
    }))

    // 2. URLs dinámicas
    for (const config of dynamicRoutesConfig) {
        // Pasar el objeto 'config' completo para que fetchSlugs pueda usar el token y el tipo
        const slugs = await fetchSlugs(config) 
        
        const dynamicUrls = slugs.map(slug => ({
            loc: `${BASE_URL}${config.routePrefix}${slug}`,
            changefreq: 'weekly',
            priority: '0.7',
            lastmod: new Date().toISOString().split('T')[0], 
        }))
        
        allUrls.push(...dynamicUrls)
        console.log(`- ${dynamicUrls.length} URLs de ${config.routePrefix} añadidas.`)
    }

    // 3. Generar el XML
    let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    allUrls.forEach(url => {
        sitemapXML += `  <url>\n`
        sitemapXML += `    <loc>${url.loc}</loc>\n`
        sitemapXML += `    <lastmod>${url.lastmod}</lastmod>\n`
        sitemapXML += `    <changefreq>${url.changefreq}</changefreq>\n`
        sitemapXML += `    <priority>${url.priority}</priority>\n`
        sitemapXML += `  </url>\n`
    })

    sitemapXML += `</urlset>`

    // 4. Escribir el archivo
    try {
        const sitemapPath = path.resolve(process.cwd(), 'dist', 'sitemap.xml')
        await fs.writeFile(sitemapPath, sitemapXML, 'utf8')
        console.log(`\n✅ sitemap.xml generado exitosamente en dist/ con ${allUrls.length} URLs.`)
    } catch (error) {
        console.error('❌ Error al escribir el sitemap.xml:', error)
    }
}

generateSitemap()