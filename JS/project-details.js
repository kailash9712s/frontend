// Project data
const projectsData = {
    project1: {
        category: "Industrial",
        title: "Steel Industrial Dom",
        location: "Mumbai, Maharashtra",
        date: "2020",
        client: "ABC Industries",
        description: "A state-of-the-art steel febrication facility with advanced equipments. The project involved the construction of a 50,000 sq ft manufacturing unit with cutting-edge technology and automation systems.",
        mainImage: "https://www.alcox-steel.com/blog/wp-content/uploads/2024/07/steel-fabricators-in-India-feature-img.jpg",
        gallery: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1581092334247-ddef2a41f178?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
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
        category: "Dom",
        title: "Dom",
        location: "Surat, Gujrat",
        date: "2021",
        client: "XYZ Corporation",
        description: "A complex featuring innovative steel architecture and sustainable design. The Dom is designed to maximize natural light and energy efficiency while providing modern amenities for businesses.",
        mainImage: "https://saicorian.com/wp-content/uploads/2019/04/SAICORIAN-STEEL-FAB-e1695513479533.jpg",
        gallery: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
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
    document.getElementById('projectMainImage').src = project.mainImage;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectLocation').textContent = project.location;
    document.getElementById('projectDate').textContent = project.date;
    document.getElementById('projectClient').textContent = project.client;
    document.getElementById('projectDescription').textContent = project.description;

    // Update stats
    document.getElementById('projectArea').textContent = project.area;
    document.getElementById('projectDuration').textContent = project.duration;
    document.getElementById('projectBudget').textContent = project.budget;
    document.getElementById('projectTeam').textContent = project.team;

    // Load gallery
    const galleryContainer = document.getElementById('projectGallery');
    galleryContainer.innerHTML = project.gallery.map(image => `
        <div class="gallery-item">
            <img src="${image}" alt="${project.title}">
            <div class="gallery-overlay">
                <i class='bx bx-zoom-in gallery-zoom'></i>
            </div>
        </div>
    `).join('');

    // Load features
    const featuresContainer = document.getElementById('projectFeatures');
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

    // Load related projects
    const relatedProjectsContainer = document.getElementById('relatedProjects');
    const relatedProjects = Object.entries(projectsData)
        .filter(([id]) => id !== projectId)
        .slice(0, 3);

    relatedProjectsContainer.innerHTML = relatedProjects.map(([id, relatedProject]) => `
        <div class="related-item">
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
    document.querySelectorAll('.related-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            window.location.href = `project-details.html?id=${relatedProjects[index][0]}`;
        });
    });
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