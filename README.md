# 📘 NutriParaLaVida - Documentación Técnica

## 📌 Descripción General

**NutriParaLaVida** es un sitio web informativo y comercial de una profesional en nutrición que ofrece:
- Servicios personalizados de nutrición clínica.
- Un catálogo de productos saludables libres de gluten.
- Integración de carrito de compras simple.
- Formularios de contacto y reserva.
- Testimonios de clientes.
- Estética profesional y diseño responsivo.

---

## 🧱 Estructura del Proyecto

### Archivos principales:
- `index.html` → Página de inicio con información sobre servicios, contacto y testimonios.
- `productos.html` → Página de catálogo de productos con sistema de carrito de compras.
- `styles.css` → Estilos globales personalizados y responsivos.
- `script.js` → Lógica de interacción del usuario, animaciones, y carrito.

---

## ⚙️ Funcionalidades Implementadas

### 🛒 Carrito de Compras

- Cada producto tiene un botón "Agregar".
- Al hacer clic, el producto se añade al carrito.
- Modal con lista de productos, total acumulado y campos de nombre y teléfono.
- Botón **"Realizar Pedido"** simulado (a futuro puede conectarse con WhatsApp, backend o email).
- Ícono de carrito muestra contador dinámico.

### 📦 Catálogo de Productos

- Productos mostrados como `producto-card` con nombre, imagen, descripción, precio y botón.
- Incluye carrusel interactivo para productos con múltiples imágenes (T-Shirts).

### 📞 Formulario de Contacto

- Campo de nombre, email, teléfono y motivo de consulta.
- Validación básica de campos requeridos.
- Mensaje de confirmación en envío.

### 🧑‍⚕️ Sección de Servicios

- Tarjetas con tipo de servicio ofrecido: consulta nutricional, seguimiento online, planes personalizados.

### 💬 Testimonios

- Carrusel automático y manual.
- Reseñas con imagen, nombre y opinión del cliente.

### 📱 Diseño Responsivo

- Navbar adaptable con menú hamburguesa.
- Carrusel e imágenes ajustables a pantallas móviles.
- Modal de carrito optimizado para dispositivos pequeños.

### 🎨 Estética UI/UX

- Paleta de colores con `--primary-color`, `--accent-color`, etc.
- Sombras, transiciones, hover effects.
- Tipografía clara (`Poppins`).
- Accesibilidad táctil y navegación suave (`scroll-behavior: smooth`).

---

## 🔐 Mejores Prácticas

- ✔️ Componentes reutilizables (`producto-card`, `.carousel-producto`, `.testimonio`, etc.).
- ✔️ Uso de variables CSS para escalabilidad visual.
- ✔️ Lazy loading de imágenes para rendimiento.
- ✔️ Separación de responsabilidades (HTML, CSS, JS modularizado).
- ✔️ Compatible con SEO básico (uso de `<meta>`, descripciones, estructura semántica).

---

## 📦 Mejora futura sugerida

| Área | Recomendación |
|------|----------------|
| Checkout | Integrar con API de WhatsApp, email o backend |
| Seguridad | Validar inputs contra inyecciones / sanitización |
| Accesibilidad | Incluir etiquetas `aria-*`, roles y navegación con teclado |
| Persistencia | Guardar carrito en `localStorage` |
| PWA | Convertir a Progressive Web App para navegación offline |
| SEO | Agregar etiquetas `alt` completas, títulos únicos y `Open Graph` |

---

## 🧑‍💻 Desarrollado por

**Manakin Labs**  
[Instagram @manakin_labs](https://www.instagram.com/manakin_labs)  
© 2025 nutriparalavida.com