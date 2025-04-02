document.addEventListener('DOMContentLoaded', function () {
    // ✅ Smooth scrolling para navegación interna
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const card = boton.closest('.producto-card');
            const titulo = card.querySelector('h3')?.textContent || 'Producto';
            const precioText = card.querySelector('.precio')?.textContent || '₡0';
            const precio = parseInt(precioText.replace(/[₡,]/g, '')) || 0;
            const img = card.querySelector('img');
            const imgSrc = img ? img.src : '';

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

            // Abrir el carrito automáticamente
            openCart();
        });
    });

    // Event listeners para abrir/cerrar el carrito
    cartIcon?.addEventListener('click', openCart);
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
        
        total -= precio;
        cartCountNumber--;
        
        totalAmountElement.textContent = `₡${total.toLocaleString()}`;
        cartCount.textContent = cartCountNumber;
        
        // Animación de desvanecimiento al eliminar
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            cartItem.remove();
            
            // Si el carrito está vacío, mostrar un mensaje
            if (cartCountNumber === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart-message">
                        Tu carrito está vacío
                    </div>
                `;
            }
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

    // Cerrar el menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Cerrar el menú al hacer scroll
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
