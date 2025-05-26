// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems2 = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems2.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Featured Slider
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (sliderContainer && slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Function to go to a specific slide
        function goToSlide(n) {
            currentSlide = n;
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        }
        
        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Load More Button
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                // Add 3 more items to the gallery
                const galleryGrid = document.querySelector('.gallery-grid');
                const categories = ['nature', 'city', 'people'];
                
                for (let i = 0; i < 3; i++) {
                    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                    const randomImage = `https://source.unsplash.com/random/800x600?${randomCategory}`;
                    
                    const galleryItem = document.createElement('div');
                    galleryItem.classList.add('gallery-item');
                    galleryItem.setAttribute('data-category', randomCategory);
                    
                    galleryItem.innerHTML = `
                        <img src="${randomImage}" alt="${randomCategory}">
                        <div class="gallery-overlay">
                            <div class="gallery-info">
                                <h3>${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)} Image</h3>
                                <p>${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}</p>
                            </div>
                        </div>
                    `;
                    
                    galleryGrid.appendChild(galleryItem);
                    
                    // Add lightbox functionality to new items
                    galleryItem.addEventListener('click', function() {
                        openLightbox(this.querySelector('img').src, this.querySelector('h3').textContent);
                    });
                }
                
                this.textContent = 'Load More';
            }, 1000);
        });
    }
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevLightbox = document.querySelector('.prev-lightbox');
    const nextLightbox = document.querySelector('.next-lightbox');
    
    // Open lightbox
    function openLightbox(src, caption) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('h3').textContent;
            openLightbox(imgSrc, caption);
        });
    });
    
    // Close lightbox when clicking on close button or outside the image
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            this.querySelector('button').textContent = 'Subscribing...';
            
            setTimeout(() => {
                this.innerHTML = '<p>Thank you for subscribing to our newsletter!</p>';
            }, 1500);
        });
    }    
  
    
    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const statValue = parseInt(stat.textContent);
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const increment = statValue / (duration / 16); // 60fps
                
                const updateStat = () => {
                    currentValue += increment;
                    if (currentValue < statValue) {
                        stat.textContent = Math.floor(currentValue) + '+';
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = statValue + '+';
                    }
                };
                
                updateStat();
            });
        };
        
        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the stats section
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 