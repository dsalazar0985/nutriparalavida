document.addEventListener('DOMContentLoaded', function () {
    // ✅ Smooth scrolling para navegación interna
    function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
                // Solo prevenir el comportamiento por defecto si es un enlace interno
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
        e.preventDefault();
                    const target = document.querySelector(href);
                    if (!target) return;

                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
            behavior: 'smooth'
        });
                }
    });
});
    }

    document.addEventListener('DOMContentLoaded', initSmoothScroll);

    // ✅ Manejo del formulario de contacto
    const form = document.getElementById('formulario-reserva');
    if (form) {
        form.addEventListener('submit', function (e) {
    e.preventDefault();
    
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const comentario = document.getElementById('comentario').value;

            // Generar el mensaje para WhatsApp
            let message = `¡Hola! Me gustaría agendar una consulta nutricional.\n\n`;
            message += `Datos personales:\n`;
            message += `Nombre: ${nombre}\n`;
            message += `Email: ${email}\n`;
            message += `Teléfono: ${telefono}\n\n`;
            message += `Comentario sobre la consulta:\n${comentario}`;

            // Número de WhatsApp para consultas
            const phoneNumber = '50686494754';
            
            // Abrir WhatsApp con el mensaje
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

            // Limpiar el formulario
    this.reset();
});
    }

    // ✅ Navbar sombra al hacer scroll
    window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = '#ffffff';
    navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
});

    // ✅ Carrusel de la T-shirt (solo si existe en esta página)
    const carousel = document.getElementById('tshirtCarousel');
    if (carousel) {
    const images = carousel.querySelectorAll('.carousel-inner img');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

        prevBtn?.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

        nextBtn?.addEventListener('click', () => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

        showImage(0);
    }

    // ✅ Carrusel de productos
    const carousels = document.querySelectorAll('.carousel-producto');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-inner img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        prevBtn?.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextBtn?.addEventListener('click', () => {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        showImage(0);
    });

    // ✅ Carrito de compras
    const botonesAgregar = document.querySelectorAll('.comprar-btn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart-icon');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    const cartCount = document.querySelector('.cart-count');
    const checkoutButton = document.querySelector('.checkout-button');

    let total = 0;
    let cartCountNumber = 0;

    // Inicializar los botones de talla
    const tallaBtns = document.querySelectorAll('.talla-btn');
    const botonesCompraConTalla = document.querySelectorAll('.comprar-btn[data-requiere-talla="true"]');

    // Deshabilitar inicialmente los botones de compra que requieren talla
    botonesCompraConTalla.forEach(btn => {
        btn.classList.add('disabled');
    });

    // Agregar event listeners a los botones de talla
    tallaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productoCard = this.closest('.producto-card');
            const allTallaBtns = productoCard.querySelectorAll('.talla-btn');
            const comprarBtn = productoCard.querySelector('.comprar-btn[data-requiere-talla="true"]');
            const tallaError = productoCard.querySelector('.talla-error');

            // Remover selección de todos los botones
            allTallaBtns.forEach(b => b.classList.remove('selected'));
            
            // Seleccionar el botón actual
            this.classList.add('selected');
            
            // Ocultar mensaje de error si existe
            if (tallaError) {
                tallaError.style.display = 'none';
            }
            
            // Habilitar botón de comprar
            if (comprarBtn) {
                comprarBtn.classList.remove('disabled');
            }
        });
    });

    // Función para abrir el carrito
    function openCart() {
        cartModal?.classList.add('active');
        // Removemos el overflow: hidden del body para permitir scroll
        document.body.style.overflow = 'auto';
    }

    // Función para cerrar el carrito
    function closeCartModal() {
        cartModal?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Primero, vamos a agregar una función para manejar la visibilidad del mensaje
    function updateEmptyCartMessage() {
        const cartItems = document.querySelector('.cart-items');
        const existingMessage = cartItems.querySelector('.empty-cart-message');
        const hasItems = cartItems.querySelectorAll('.cart-item').length > 0;

        if (!hasItems && !existingMessage) {
            // Si no hay items y no existe el mensaje, lo agregamos
            cartItems.innerHTML = `
                <div class="empty-cart-message">
                    Tu carrito está vacío
                </div>
            `;
        } else if (hasItems && existingMessage) {
            // Si hay items y existe el mensaje, lo removemos
            existingMessage.remove();
        }
    }

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            // Si el botón requiere talla, verificar que se haya seleccionado una
            if (this.hasAttribute('data-requiere-talla')) {
                const productoCard = this.closest('.producto-card');
                const tallaSeleccionada = productoCard.querySelector('.talla-btn.selected');
                const tallaError = productoCard.querySelector('.talla-error');

                if (!tallaSeleccionada) {
                    if (tallaError) {
                        tallaError.style.display = 'block';
                    }
                    return; // Detener la ejecución si no hay talla seleccionada
                }
            }

            const card = this.closest('.producto-card');
            let titulo = card.querySelector('h3')?.textContent || 'Producto';
            const precioText = card.querySelector('.precio')?.textContent || '₡0';
            const precio = parseInt(precioText.replace(/[₡,]/g, '')) || 0;
            const img = card.querySelector('img');
            const imgSrc = img ? img.src : '';

            // Agregar la talla al título si está seleccionada
            const tallaSeleccionada = card.querySelector('.talla-btn.selected');
            if (tallaSeleccionada) {
                titulo += ` - Talla ${tallaSeleccionada.textContent}`;
            }

            // Remover el mensaje de carrito vacío si existe
            const emptyMessage = cartItemsContainer.querySelector('.empty-cart-message');
            if (emptyMessage) {
                emptyMessage.remove();
            }

            const itemHTML = `
                <div class="cart-item">
                    <img src="${imgSrc}" alt="${titulo}">
                    <div class="cart-item-details">
                        <p>${titulo}</p>
                        <p>₡${precio.toLocaleString()}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(this)">×</button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);

            // Actualiza el total y el contador del ícono
            total += precio;
            cartCountNumber++;
            totalAmountElement.textContent = `₡${total.toLocaleString()}`;
            cartCount.textContent = cartCountNumber;

            // Actualizar el mensaje del carrito vacío
            updateEmptyCartMessage();

            // Abrir el carrito automáticamente
            openCart();

            // Después de agregar al carrito, resetear la selección de talla
            if (tallaSeleccionada) {
                tallaSeleccionada.classList.remove('selected');
                this.classList.add('disabled');
            }
        });
    });

    // Event listeners para abrir/cerrar el carrito
    cartIcon?.addEventListener('click', () => {
        openCart();
        updateEmptyCartMessage();
    });
    closeCart?.addEventListener('click', closeCartModal);

    // Cerrar el carrito cuando se hace clic fuera de él
    document.addEventListener('click', (e) => {
        if (cartModal?.classList.contains('active') && 
            !e.target.closest('.cart-content') && 
            !e.target.closest('.cart-icon') &&
            !e.target.closest('.comprar-btn')) {
            closeCartModal();
        }
    });

    // Prevenir que los clics dentro del carrito lo cierren
    cartModal?.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // Función para eliminar items del carrito
    window.removeFromCart = function(button) {
        const cartItem = button.closest('.cart-item');
        const precioText = cartItem.querySelector('.cart-item-details p:last-child').textContent;
        const precio = parseInt(precioText.replace(/[₡,]/g, '')) || 0;
        
        total = Math.max(0, total - precio); // Asegurar que el total nunca sea negativo
        cartCountNumber = Math.max(0, cartCountNumber - 1); // Asegurar que nunca sea negativo
        
        totalAmountElement.textContent = `₡${total.toLocaleString()}`;
        cartCount.textContent = cartCountNumber;
        
        // Animación de desvanecimiento al eliminar
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            cartItem.remove();
            // Actualizar el mensaje del carrito vacío
            updateEmptyCartMessage();
        }, 300);

        // Mantener el carrito abierto sin bloquear el scroll
        cartModal.classList.add('active');
        document.body.style.overflow = 'auto';
    };

    // Función para generar el mensaje de WhatsApp
    function generateWhatsAppMessage() {
        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;

        let message = `¡Hola! Mi nombre es ${customerName} y me gustaría realizar el siguiente pedido:\n\n`;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const titulo = item.querySelector('.cart-item-details p:first-child').textContent;
            message += `• ${titulo}\n`;
        });

        message += `\nTotal: ₡${total.toLocaleString()}`;
        message += `\n\nDatos de contacto:`;
        message += `\nNombre: ${customerName}`;
        message += `\nTeléfono: ${customerPhone}`;

        return encodeURIComponent(message);
    }

    // Event listener para el botón de realizar pedido
    checkoutButton?.addEventListener('click', function() {
        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        
        // Validar campos
        let isValid = true;
        
        if (!customerName.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        if (!customerPhone.trim()) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }
        
        if (!isValid) {
            return;
        }

        const message = generateWhatsAppMessage();
        const phoneNumber = '50686494754'; // Número de WhatsApp de la tienda
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
        // Limpiar el carrito después de enviar el pedido
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                Tu carrito está vacío
            </div>
        `;
        total = 0;
        cartCountNumber = 0;
        totalAmountElement.textContent = `₡${total.toLocaleString()}`;
        cartCount.textContent = cartCountNumber;
        
        // Limpiar los campos del formulario
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        
        // Cerrar el modal del carrito
        closeCartModal();
    });

    // ✅ Menú hamburguesa
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu?.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Modificar el cierre del menú al hacer click en enlaces
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerrar el menú, no prevenir la navegación
            if (mobileMenu && navLinks) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            }
        });
    });

    // Cerrar el menú al hacer scroll
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Configuración del carrusel de testimonios
    function initTestimoniosCarousel() {
    const testimoniosCarousel = document.querySelector('.testimonios-carousel');
        if (!testimoniosCarousel) return;

    const testimonios = document.querySelectorAll('.testimonio');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
        let isTransitioning = false;
        const autoSlideInterval = 5000;
    let autoSlideTimer;
        let touchStartX = 0;
        let touchEndX = 0;

        function updateCarousel(index, animate = true) {
            if (isTransitioning) return;
            isTransitioning = animate;
            
        currentIndex = index;
            const transform = `translateX(-${currentIndex * 100}%)`;
            
            testimoniosCarousel.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
            testimoniosCarousel.style.transform = transform;

            if (animate) {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        }

        function handleNavigation(direction) {
            if (isTransitioning) return;
            
            const newIndex = direction === 'next' 
                ? (currentIndex + 1) % testimonios.length
                : (currentIndex - 1 + testimonios.length) % testimonios.length;
            
            updateCarousel(newIndex);
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(() => handleNavigation('next'), autoSlideInterval);
        }

        // Event Listeners
        prevBtn?.addEventListener('click', () => handleNavigation('prev'));
        nextBtn?.addEventListener('click', () => handleNavigation('next'));

        // Touch events
        testimoniosCarousel.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            testimoniosCarousel.style.transition = 'none';
        }, { passive: true });

        testimoniosCarousel.addEventListener('touchmove', e => {
            if (isTransitioning) return;
            
            const touch = e.touches[0];
            const diff = touchStartX - touch.clientX;
            const move = -(currentIndex * 100 + (diff / testimoniosCarousel.offsetWidth) * 100);
            
            testimoniosCarousel.style.transform = `translateX(${move}%)`;
        }, { passive: true });

    testimoniosCarousel.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            const threshold = testimoniosCarousel.offsetWidth * 0.2;

            if (Math.abs(diff) > threshold) {
                handleNavigation(diff > 0 ? 'next' : 'prev');
            } else {
                updateCarousel(currentIndex);
            }
        });

        // Inicialización
        updateCarousel(0, false);
        resetAutoSlide();

        // Pausar en hover
        testimoniosCarousel.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        testimoniosCarousel.addEventListener('mouseleave', resetAutoSlide);

        // Cleanup en página no visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoSlideTimer);
            } else {
                resetAutoSlide();
            }
        });
    }

    // Inicializar carrusel cuando el DOM esté listo
    initTestimoniosCarousel();

    // Agregar al inicio del archivo
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Llamar a la función cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
});
