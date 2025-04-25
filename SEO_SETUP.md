
# Guía de Configuración SEO Técnica para Netlify + Google Search Console

Esta guía explica cómo configurar paso a paso las mejores prácticas de SEO técnico para un sitio web desplegado en **Netlify** usando un dominio propio (por ejemplo, `nutriparalavida.com`).

---

## ✅ 1. Crear y subir el sitemap

### 🔧 Si usás HTML puro
Crea un archivo llamado `sitemap.xml` en la raíz de tu proyecto (donde está `index.html`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nutriparalavida.com/</loc>
    <lastmod>2025-04-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

🔹 Consejo: podés añadir más bloques `<url>` si tenés más páginas.

🔹 Luego: asegurate que esté incluido en tu repo/proyecto y que **Netlify lo sirva como archivo estático**.

### 📥 Subir el sitemap a Google Search Console
1. Entra a [Google Search Console](https://search.google.com/search-console/)
2. Selecciona tu dominio verificado (ej. `nutriparalavida.com`)
3. Ve a "**Sitemaps**" en el menú lateral
4. Escribí: `sitemap.xml` y clic en **"Enviar"**

---

## ✅ 2. Crear el archivo `robots.txt`

Este archivo le dice a los bots de Google qué indexar.

Crea un archivo `robots.txt` en la raíz de tu proyecto con el siguiente contenido:

```txt
User-agent: *
Allow: /

Sitemap: https://nutriparalavida.com/sitemap.xml
```

🔹 Verificá que se sirva correctamente entrando a: [https://nutriparalavida.com/robots.txt](https://nutriparalavida.com/robots.txt)

---

## ✅ 3. HTTPS en Netlify

Netlify **activa automáticamente HTTPS** con certificados SSL de Let's Encrypt.

✔️ Verificá simplemente que tu sitio carga con el candado (`https`) en el navegador.

---

## ✅ 4. Activar Google Analytics y vincular con Search Console

### 🎯 Paso 1: Crear cuenta en Google Analytics
1. Accedé a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad
3. Seleccioná tipo de flujo **Web**
4. Ingresá la URL de tu sitio (ej. `nutriparalavida.com`)
5. Copiá el código de seguimiento (`G-XXXXXXXXXX`)

### 📄 Paso 2: Agregar el script a tu sitio

En el `<head>` de tu archivo `index.html` o en tu plantilla principal (si usás frameworks):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

🔒 Reemplazá `G-XXXXXXXXXX` por tu ID real.

### 📎 Paso 3: Vincular Analytics con Search Console
1. Ve a Google Analytics > **Configuración de la Propiedad** > **Enlaces de Search Console**
2. Clic en **"Asociar"**
3. Seleccioná tu propiedad verificada de GSC
4. Guardá los cambios

---

## 📈 Resultado final

Con esta configuración, tendrás:

- ✅ Dominio verificado en Google Search Console
- ✅ Sitemap activo y enviado
- ✅ robots.txt correctamente configurado
- ✅ HTTPS por defecto en Netlify
- ✅ Google Analytics recolectando datos
- ✅ Integración entre GSC y Analytics funcionando

---

> Esta guía sigue buenas prácticas de SEO técnico utilizadas por desarrolladores profesionales y plataformas modernas.
