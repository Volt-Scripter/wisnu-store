// Mobile-optimized JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking on a link
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// WhatsApp order function
function orderService(serviceName) {
    const phoneNumber = '6285717976178';
    let message = '';
    
    switch(serviceName) {
        case 'Web Development':
            message = `Halo Rizky, saya tertarik dengan layanan Web Development. Saya ingin membuat website dengan HTML, CSS, JavaScript. Bisa kita diskusikan lebih lanjut?`;
            break;
        case 'WhatsApp Bot Script':
            message = `Halo Rizky, saya ingin order WhatsApp Bot Script dengan fitur request/pencarian. Mohon info lebih lanjut tentang fitur dan harganya.`;
            break;
        case 'Code Encryption':
            message = `Halo Rizky, saya butuh layanan Code Encryption untuk mengamankan script saya. Bisa bantu saya?`;
            break;
        case 'Database Services':
            message = `Halo Rizky, saya memerlukan layanan Database Services untuk aplikasi saya. Bisa kita diskusikan kebutuhannya?`;
            break;
        case 'Script Fixing':
            message = `Halo Rizky, saya punya script web/bot WA yang bermasalah dan perlu diperbaiki. Bisa bantu fix scriptnya?`;
            break;
        case 'Open Panel Hosting':
            message = `Halo Rizky, saya tertarik dengan layanan Open Panel Hosting. Bisa info paket hosting yang tersedia dari 1GB sampai unlimited?`;
            break;
        default:
            message = `Halo Rizky, saya tertarik dengan layanan ${serviceName}. Bisa kita diskusikan lebih lanjut?`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Prevent zoom on double tap (iOS Safari)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add loading states for better UX
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}