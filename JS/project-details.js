// Project data
const projectsData = {
    project1: {
        category: "Industrial",
        title: "Steel Industrial Dom",
        location: "Mumbai, Maharashtra",
        date: "2020",
        client: "ABC Industries",
        description: "A state-of-the-art steel fabrication facility with advanced equipment. The project involved the construction of a 50,000 sq ft manufacturing unit with cutting-edge technology and automation systems.",
        mainImage: "assets/image/WhatsApp Image 2025-05-12 at 22.14.49_9cd5fa8a.jpg",
        gallery: [
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.49_9cd5fa8a.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.13.22_81097d88.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.50_4ce7f7e7.jpg"
        ],
        features: [
            {
                icon: "bx-cog",
                title: "Advanced Automation",
                description: "State-of-the-art automation systems for efficient production"
            },
            {
                icon: "bx-leaf",
                title: "Sustainable Design",
                description: "Eco-friendly manufacturing processes and energy-efficient systems"
            },
            {
                icon: "bx-shield",
                title: "Safety Standards",
                description: "Comprehensive safety measures and emergency protocols"
            },
            {
                icon: "bx-line-chart",
                title: "Production Capacity",
                description: "High-capacity production lines with quality control systems"
            }
        ]
    },
    project2: {
        category: "Dom Architecture",
        title: "Dom Architecture",
        location: "Surat, Gujarat",
        date: "2021",
        client: "XYZ Corporation",
        description: "A complex featuring innovative steel architecture and sustainable design. The Dom is designed to maximize natural light and energy efficiency while providing modern amenities for businesses.",
        mainImage: "assets/image/WhatsApp Image 2025-05-12 at 22.13.22_81097d88.jpg",
        gallery: [
            "assets/image/WhatsApp Image 2025-05-12 at 22.13.22_81097d88.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.50_4ce7f7e7.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.49_9cd5fa8a.jpg"
        ],
        features: [
            {
                icon: "bx-building",
                title: "Smart Building",
                description: "Integrated smart building technology for optimal efficiency"
            },
            {
                icon: "bx-palette",
                title: "Modern Design",
                description: "Contemporary architecture with premium finishes"
            },
            {
                icon: "bx-wifi",
                title: "Advanced Connectivity",
                description: "High-speed internet and communication infrastructure"
            },
            {
                icon: "bx-parking",
                title: "Parking Facility",
                description: "Multi-level parking with EV charging stations"
            }
        ]
    },
    project3: {
        category: "Industrial",
        title: "Steel Structure",
        location: "Ahmedabad, Gujarat",
        date: "2022",
        client: "PQR Industries",
        description: "A modern steel structure project showcasing innovative design and engineering excellence. The project features advanced structural elements and sustainable construction practices.",
        mainImage: "assets/image/WhatsApp Image 2025-05-12 at 22.06.27_9f26849a.jpg",
        gallery: [
            "assets/image/WhatsApp Image 2025-05-12 at 22.06.27_9f26849a.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.50_4ce7f7e7.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.49_9cd5fa8a.jpg"
        ],
        features: [
            {
                icon: "bx-arch",
                title: "Structural Design",
                description: "Advanced structural engineering with optimal load distribution"
            },
            {
                icon: "bx-wrench",
                title: "Quality Materials",
                description: "High-grade steel and premium construction materials"
            },
            {
                icon: "bx-timer",
                title: "Timely Delivery",
                description: "Efficient project management and on-time completion"
            },
            {
                icon: "bx-check-circle",
                title: "Quality Assurance",
                description: "Rigorous quality control and testing procedures"
            }
        ]
    },
    project4: {
        category: "Dom",
        title: "Dom",
        location: "Surat, Gujarat",
        date: "2021",
        client: "YZ Corporation",
        description: "A complex featuring innovative steel architecture and sustainable design. The Dom is designed to maximize natural light and energy efficiency while providing modern amenities for businesses.",
        mainImage: "assets/image/WhatsApp Image 2025-05-12 at 22.06.09_fa93bd0c.jpg",
        gallery: [
            "assets/image/WhatsApp Image 2025-05-12 at 22.06.09_fa93bd0c.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.50_4ce7f7e7.jpg",
            "assets/image/WhatsApp Image 2025-05-12 at 22.14.49_9cd5fa8a.jpg"
        ],
        features: [
            {
                icon: "bx-wrench",
                title: "Custom Fabrication",
                description: "Tailored steel fabrication solutions for specific requirements"
            },
            {
                icon: "bx-cog",
                title: "Precision Engineering",
                description: "High-precision manufacturing and assembly processes"
            },
            {
                icon: "bx-shield",
                title: "Quality Control",
                description: "Stringent quality checks at every stage of production"
            },
            {
                icon: "bx-timer",
                title: "Efficient Delivery",
                description: "Timely project completion with optimal resource utilization"
            }
        ]
    }
};

// Get project ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Function to load project details
function loadProjectDetails() {
    if (!projectId || !projectsData[projectId]) {
        window.location.href = 'Project.html';
        return;
    }

    const project = projectsData[projectId];

    // Update main content
    const mainImageEl = document.getElementById('projectMainImage');
    if (mainImageEl) {
        mainImageEl.src = project.mainImage;
        mainImageEl.onerror = () => { mainImageEl.src = 'assets/image/fallback.jpg'; };
    }
    const categoryEl = document.getElementById('projectCategory');
    if (categoryEl) categoryEl.textContent = project.category;
    const titleEl = document.getElementById('projectTitle');
    if (titleEl) titleEl.textContent = project.title;
    const locationEl = document.getElementById('projectLocation');
    if (locationEl) locationEl.textContent = project.location;
    const dateEl = document.getElementById('projectDate');
    if (dateEl) dateEl.textContent = project.date;
    const clientEl = document.getElementById('projectClient');
    if (clientEl) clientEl.textContent = project.client;
    const descEl = document.getElementById('projectDescription');
    if (descEl) descEl.textContent = project.description;

    // Load gallery
    const galleryContainer = document.getElementById('projectGallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = project.gallery.map(image => `
            <div class="gallery-item">
                <img src="${image}" alt="${project.title}">
                <div class="gallery-overlay">
                    <i class='bx bx-zoom-in gallery-zoom'></i>
                </div>
            </div>
        `).join('');
    }

    // Load features
    const featuresContainer = document.getElementById('projectFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = project.features.map(feature => `
            <div class="feature-item">
                <div class="feature-icon">
                    <i class='bx ${feature.icon}'></i>
                </div>
                <div class="feature-content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Load related projects
    const relatedProjectsContainer = document.getElementById('relatedProjects');
    if (relatedProjectsContainer) {
        const relatedProjects = Object.entries(projectsData)
            .filter(([id]) => id !== projectId)
            .slice(0, 3);

        relatedProjectsContainer.innerHTML = relatedProjects.map(([id, relatedProject]) => `
            <div class="related-item" data-id="${id}">
                <div class="related-image">
                    <img src="${relatedProject.mainImage}" alt="${relatedProject.title}">
                </div>
                <div class="related-content">
                    <div class="related-category">${relatedProject.category}</div>
                    <h3 class="related-item-title">${relatedProject.title}</h3>
                    <div class="related-meta">
                        <span><i class='bx bx-map'></i> ${relatedProject.location}</span>
                        <span><i class='bx bx-calendar'></i> ${relatedProject.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click event to related projects
        document.querySelectorAll('.related-item').forEach((item) => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                window.location.href = `project-details.html?id=${id}`;
            });
        });
    }
}

// Initialize gallery lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            // Create and show lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close"><i class='bx bx-x'></i></button>
                </div>
            `;
            document.body.appendChild(lightbox);

            // Close lightbox
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.closest('.lightbox-close')) {
                    lightbox.remove();
                }
            });
        });
    });
}

// Add lightbox styles
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
    initGalleryLightbox();
}); 