// Products Data - Mudah untuk diubah
const products = [
    {
        id: '50rbx',
        robux: 50,
        price: 8000,
        originalPrice: 10000,
        popular: false,
        bonus: null
    },
    {
        id: '100rbx',
        robux: 100,
        price: 14000,
        originalPrice: 15000,
        popular: false,
        bonus: null
    },
    {
        id: '200rbx',
        robux: 200,
        price: 28000,
        originalPrice: 30000,
        popular: true,
        bonus: null
    },
    {
        id: '500rbx',
        robux: 500,
        price: 70000,
        originalPrice: 75000,
        popular: false,
        bonus: '+25 Bonus Robux'
    },
    {
        id: '800rbx',
        robux: 800,
        price: 85000,
        originalPrice: 120000,
        popular: true,
        bonus: '+50 Bonus Robux'
    },
    {
        id: '1000rbx',
        robux: 1000,
        price: 115000,
        originalPrice: 140000,
        popular: false,
        bonus: '+75 Bonus Robux'
    },
    {
        id: '2000rbx',
        robux: 2000,
        price: 280000,
        originalPrice: 310000,
        popular: false,
        bonus: '+200 Bonus Robux'
    },
    {
        id: '5000rbx',
        robux: 5000,
        price: 812000,
        originalPrice: 1060000,
        popular: false,
        bonus: '+300 Bonus Robux'
    },
    {
        id: '10000rbx',
        robux: 10000,
        price: 1170000,
        originalPrice: 2350000,
        popular: false,
        bonus: '+500 Bonus Robux'
    }
];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '6285885290190';

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

function calculateDiscount(originalPrice, currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

function generateWhatsAppMessage(robux, price) {
    const message = `Halo WisnuStore! 🎮

Saya ingin top up Robux dengan detail berikut:
📦 Paket: ${robux.toLocaleString('id-ID')} Robux
💰 Harga: Rp ${formatPrice(price)}

Mohon info lebih lanjut untuk proses pembayaran. Terima kasih! 🙏`;

    return encodeURIComponent(message);
}

function openWhatsApp(robux, price) {
    const message = generateWhatsAppMessage(robux, price);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function openWhatsAppSupport() {
    const message = encodeURIComponent('Halo WisnuStore! Saya butuh bantuan 😊');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Product Card Generation
function createProductCard(product, index) {
    const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card ${product.popular ? 'popular' : ''}" style="animation-delay: ${index * 100}ms">
                ${product.popular ? '<div class="popular-badge"><i class="bi bi-trending-up me-1"></i>TERPOPULER</div>' : ''}
                ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
                
                <div class="robux-icon">
                    <i class="bi bi-gem"></i>
                </div>
                
                <div class="robux-amount">${product.robux.toLocaleString('id-ID')}</div>
                <div class="robux-label">Robux</div>
                
                ${product.bonus ? `
                    <div class="bonus-badge">
                        <i class="bi bi-gift"></i>
                        ${product.bonus}
                    </div>
                ` : ''}
                
                <div class="price-section">
                    ${product.originalPrice ? `
                        <div class="original-price">Rp ${formatPrice(product.originalPrice)}</div>
                    ` : ''}
                    <div class="current-price">Rp ${formatPrice(product.price)}</div>
                </div>
                
                <button class="btn btn-buy" onclick="handlePurchase('${product.id}')">
                    <i class="bi bi-lightning-charge me-2"></i>
                    Beli Sekarang
                </button>
            </div>
        </div>
    `;
}

// Purchase Handler
function handlePurchase(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const button = event.target;
    const originalContent = button.innerHTML;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        Memproses...
    `;
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        openWhatsApp(product.robux, product.price);
        
        // Reset button
        button.disabled = false;
        button.innerHTML = originalContent;
    }, 1000);
}

// Smooth Scroll Function
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize Products
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const productsHTML = products.map((product, index) => 
        createProductCard(product, index)
    ).join('');
    
    productsGrid.innerHTML = productsHTML;
    
    // Add fade-in animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 100);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.stat-card, .section-badge, .section-title, .cta-card');
    animateElements.forEach(el => observer.observe(el));
}

// Performance Optimization
function optimizeImages() {
    // Lazy load images if any are added later
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Error occurred:', e.error);
        // Could implement user-friendly error messages here
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeProducts();
        handleNavbarScroll();
        initializeAnimations();
        optimizeImages();
        handleErrors();
        
        // Add some interactive feedback
        console.log('🎮 WisnuStore loaded successfully!');
        console.log(`📦 ${products.length} products available`);
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Press 'P' to scroll to products
    if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.altKey) {
        scrollToProducts();
    }
    
    // Press 'W' to open WhatsApp support
    if (e.key.toLowerCase() === 'w' && !e.ctrlKey && !e.altKey) {
        openWhatsAppSupport();
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Could implement swipe navigation here if needed
        // For now, just add a subtle feedback
        document.body.style.transform = `translateX(${diff > 0 ? -2 : 2}px)`;
        setTimeout(() => {
            document.body.style.transform = 'translateX(0)';
        }, 100);
    }
}

// Export functions for global access (if needed)
window.WisnuStore = {
    products,
    openWhatsApp,
    openWhatsAppSupport,
    scrollToProducts,
    handlePurchase
};
