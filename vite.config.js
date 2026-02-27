import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// Define the custom plugin to handle .htaccess generation
const htaccessPlugin = () => {
  return {
    name: 'htaccess-generator',
    writeBundle() {
      // The content of your .htaccess file
      const htaccessContent = `
    # Opciones básicas para un SPA
    # Se necesita para que las rutas funcionen correctamente en el servidor
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
      `
      // Path to the .htaccess file in the dist directory
      const htaccessPath = resolve(process.cwd(), 'dist', '.htaccess')

      // Write the content to the file
      try {
        writeFileSync(htaccessPath, htaccessContent.trim())
        console.log('.htaccess file successfully generated in the dist directory.')
      } catch (err) {
        console.error('Failed to generate .htaccess file:', err)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // Set the base path to relative only for production builds
    base: '/',

    plugins: [
      react(),
      tailwindcss(),
      htaccessPlugin(),
    ],
  }
})