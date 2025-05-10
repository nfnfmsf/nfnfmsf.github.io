document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. MENÚ DESPLEGABLE COMPLETO
    // ======================
    const navItems = document.querySelectorAll('nav ul li');
    
    // Submenú para MARCAS
    navItems[1].innerHTML += `
        <ul class="submenu">
            <li><a href="triumph.html">Triumph</a></li>
            <li><a href="norton.html">Norton</a></li>
            <li><a href="bsa.html">BSA</a></li>
            <li><a href="royal-enfield.html">Royal Enfield</a></li>
        </ul>
    `;

    // Submenú para EVENTOS
    navItems[2].innerHTML += `
        <ul class="submenu">
            <li><a href="rallyes.html">Rallyes Clásicos</a></li>
            <li><a href="exposiciones.html">Exposiciones</a></li>
            <li><a href="festivales.html">Festivales</a></li>
        </ul>
    `;

    // Submenú para DISEÑO
    navItems[3].innerHTML += `
        <ul class="submenu">
            <li><a href="caracteristicas.html">Características</a></li>
            <li><a href="evolucion.html">Evolución</a></li>
            <li><a href="personalizacion.html">Personalización</a></li>
        </ul>
    `;

    // Submenú para CULTURA
    navItems[4].innerHTML += `
        <ul class="submenu">
            <li><a href="moda.html">Moda y Estilo</a></li>
            <li><a href="cine.html">Cine y TV</a></li>
            <li><a href="musica.html">Música</a></li>
        </ul>
    `;

    // Eventos para todos los submenús
    navItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            item.addEventListener('mouseenter', () => {
                submenu.style.display = 'block';
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            });
            
            item.addEventListener('mouseleave', () => {
                submenu.style.display = 'none';
                item.style.backgroundColor = '';
            });
        }
    });

    // ======================
    // 2. SLIDER DE IMÁGENES (mejorado)
    // ======================
    const images = [
        { 
            src: 'images/triumph.jpg', 
            alt: 'Triumph Bonneville', 
            legend: 'Triumph Bonneville, un clásico británico',
            link: 'triumph.html'
        },
        { 
            src: 'images/norton.jpg', 
            alt: 'Norton Commando', 
            legend: 'Norton Commando, leyenda de los 70s',
            link: 'norton.html'
        },
        { 
            src: 'images/royal-enfield.jpg', 
            alt: 'Royal Enfield', 
            legend: 'Royal Enfield, herencia colonial',
            link: 'royal-enfield.html'
        }
    ];
    
    const sliderContainer = document.querySelector('.imagen-destacada');
    let currentIndex = 0;
    
    function updateSlider() {
        sliderContainer.innerHTML = `
            <a href="${images[currentIndex].link}">
                <img src="${images[currentIndex].src}" 
                     alt="${images[currentIndex].alt}" 
                     loading="lazy">
            </a>
            <p class="leyenda-imagen">${images[currentIndex].legend}</p>
            <div class="slider-nav">
                ${images.map((_, index) => `
                    <span class="slider-dot ${index === currentIndex ? 'active' : ''}" 
                          data-index="${index}"></span>
                `).join('')}
            </div>
            <div class="slider-controls">
                <button class="prev-btn">←</button>
                <button class="next-btn">→</button>
            </div>
        `;
        
        // Eventos para botones
        document.querySelector('.prev-btn').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });
        
        document.querySelector('.next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        // Eventos para puntos de navegación
        document.querySelectorAll('.slider-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateSlider();
            });
        });
    }
    
    // Iniciar slider
    updateSlider();
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }, 5000);

    // Pausar slider al interactuar
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }, 5000);
    });

    // ======================
    // 3. MENSAJE DE BIENVENIDA MEJORADO
    // ======================
    const header = document.querySelector('header');
    const welcomeMsg = document.createElement('div');
    welcomeMsg.id = 'welcome-message';
    header.insertBefore(welcomeMsg, header.firstChild);
    
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = '¡Buenos días, motero! Descubre nuestros clásicos británicos.';
    } else if (hour < 19) {
        greeting = '¡Buenas tardes! Explora la leyenda sobre ruedas.';
    } else {
        greeting = '¡Buenas noches! Disfruta de nuestra galería nocturna.';
    }
    
    welcomeMsg.innerHTML = `
        <p>${greeting}</p>
        <small id="live-clock"></small>
    `;

    // Reloj en tiempo real
    function updateClock() {
        const now = new Date();
        document.getElementById('live-clock').textContent = 
            `Hora actual: ${now.toLocaleTimeString()}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});