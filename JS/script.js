// Swiper js
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        // grabCursor:true,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

// Nav open close
const body = document.querySelector('body'),
    navMenu = body.querySelector('.menu-content'),
    navOpenBtn = body.querySelector('.navOpen-btn');
navCloseBtn = navMenu.querySelector('.navClose-btn');

if (navMenu && navOpenBtn) {
    navOpenBtn.addEventListener("click", () => {
        navMenu.classList.add("open");
        body.style.overflow = "scroll";
    })
}
if (navMenu && navCloseBtn) {
    navCloseBtn.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.style.overflow = "scroll";

    })
}

// Change header bg color
window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    if (scrollY > 5) {
        document.querySelector("header").classList.add("header-active");
    } else {
        document.querySelector("header").classList.remove("header-active");

    }

    // Scroll up button
    const scrollUpBtn = document.querySelector('.scrollUp-btn');

    if (scrollY > 250) {
        scrollUpBtn.classList.add("scrollUpBtn-active");
    } else {
        scrollUpBtn.classList.remove("scrollUpBtn-active");
    }


    // Nav link indicator
    const section = document.querySelectorAll('section[id]');
    section.forEach(section => {
        const sectionHeight = section.offsetHeight,
            sectionTop = section.offsetTop - 100;

        let navId = document.querySelector(`.brand-images a[href= '#${section.id}']`);


        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navId.classList.add("active-navlink")


        } else {
            navId.classList.remove("active-navlink")
        }
        navId.addEventListener("click", () => {
            navMenu.classList.remove("open");

            body.style.overflow = "scroll";

        })



    })




})
// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    dealy: 400,
})
sr.reveal(`.section-subtitle,.section-title,.section-description,.brand-image,.tesitmonial,.newsletter,.logo-content,.newsletter-inputBox,.newsletter-mediaIcon,.footer-content,.footer-links,.brochure`, { interval: 100, })
sr.reveal(`.about-imageContent`, { origin: 'left' })
sr.reveal(`.about-details`, { origin: 'right' })

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        // Validate email
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitButton = this.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        // Send to backend
        fetch('https://testproject-u7vq.onrender.com/api/v1/user/EmailSub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.innerHTML = '<p>Thank you for subscribing to our newsletter!</p>';
                    showNotification('Successfully subscribed to newsletter!', 'success');
                } else {
                    throw new Error(data.message || 'Subscription failed');
                }
            })
            .catch(error => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showNotification(error.message || 'There was a problem. Please try again.', 'error');
            });
    });
}

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';

    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2ecc71';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = 'white';
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(100%); opacity: 0; }
            }
          `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

//   project js 
document.addEventListener('DOMContentLoaded', function () {
    // Project data
    const projectData = {
        project1: {
            title: 'Steel Manufacturing Facility',
            category: 'Industrial',
            location: 'Mumbai, Maharashtra',
            date: '2022',
            client: 'SteelTech Industries',
            description: "A state-of-the-art steel febrication facility with advanced equipments. The project involved the construction of a 50,000 sq ft manufacturing unit with cutting-edge technology and automation systems.",
            gallery: [
                'https://www.alcox-steel.com/blog/wp-content/uploads/2024/07/steel-fabricators-in-India-feature-img.jpg',
                'https://www.alcox-steel.com/blog/wp-content/uploads/2024/07/steel-fabricators-in-India-feature-img.jpg'
            ]
        },
        project2: {
            title: 'Modern Office Complex',
            category: 'Commercial',
            location: 'Delhi, NCR',
            date: '2021',
            client: 'Global Business Solutions',
            description: 'A  complex featuring innovative steel architecture and sustainable design. The Dom is designed to maximize natural light and energy efficiency while providing modern amenities for businesses.',
            gallery: [
                'https://images.unsplash.com/photo-1503387762-592eb34d0872?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ]
        },

    };

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalClose = modal.querySelector('.modal-close');
    const projectButtons = document.querySelectorAll('.project-overlay-btn');

    // Set initial styles for project items
    projectItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Open modal
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];

            // Update modal content
            document.getElementById('modalImage').src = project.gallery[0];
            document.getElementById('modalCategory').textContent = project.category;
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalLocation').textContent = project.location;
            document.getElementById('modalDate').textContent = project.date;
            document.getElementById('modalClient').textContent = project.client;
            document.getElementById('modalDescription').textContent = project.description;

            // Update gallery
            const galleryContainer = document.getElementById('modalGallery');
            galleryContainer.innerHTML = '';
            project.gallery.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<img src="${image}" alt="${project.title}">`;
                galleryItem.addEventListener('click', () => {
                    document.getElementById('modalImage').src = image;
                });
                galleryContainer.appendChild(galleryItem);
            });

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Scroll animations
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.project-item, .filter-btn');
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for animated elements
    const animatedElements = document.querySelectorAll('.project-item, .filter-btn');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Trigger animation check on page load
    animateOnScroll();
});
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.querySelector('.download-btn');



    // Brochure js 


    document.addEventListener('DOMContentLoaded', function () {
        const downloadBtn = document.querySelector('.download-btn');

        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Show loading state
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Downloading...';
            downloadBtn.style.opacity = '0.7';

            // Simulate download process (you can remove this in production)
            setTimeout(() => {
                // Create a link element
                const link = document.createElement('a');
                link.href = 'Brochure.pdf';
                link.download = 'Sat-Shri-Steel-Brochure.pdf';

                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset button state
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.opacity = '1';

                // Show success message
                showNotification('Brochure downloaded successfully!');
            }, 1000);
        });

        // Function to show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.textContent = message;

            // Add styles for notification
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#2ecc71';
            notification.style.color = 'white';
            notification.style.padding = '1rem 2rem';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            notification.style.zIndex = '1000';
            notification.style.animation = 'slideIn 0.5s ease-out';

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
          @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
      `;
            document.head.appendChild(style);

            // Add to document
            document.body.appendChild(notification);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }
    });

    // about us 

    document.addEventListener('DOMContentLoaded', function () {
        // Animated counter for statistics
        const statNumbers = document.querySelectorAll('.stat-number');
        let counted = false;

        // Function to animate counting
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50; // Adjust speed of counting
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 30);
        }

        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        // Animate elements when they come into view
        function animateOnScroll() {
            // Animate stats when they come into view
            if (!counted && isInViewport(statNumbers[0])) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
            }

            // Animate other elements
            const animatedElements = document.querySelectorAll('.about-image, .about-content, .value-item, .team-member');
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Set initial styles for animated elements
        const animatedElements = document.querySelectorAll('.about-image, .about-content, .value-item, .team-member');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);

        // Trigger animation check on page load
        animateOnScroll();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add hover effect for team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px)';
            });

            member.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add parallax effect to hero section
        const heroSection = document.querySelector('.about-hero');
        if (heroSection) {
            window.addEventListener('scroll', function () {
                const scrollPosition = window.scrollY;
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        }
    });

    // for email servicess
    const nodemailer = require("nodemailer");

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "satshreefab@gmail.com", // Your email
            pass: "Satshree@123", // Your email password
        },
    });

    // Define the email options
    const mailOptions = {
        from: "your-email@gmail.com",
        to: "kailashdewasi620@gmail.com",
        subject: "Test Email",
        text: "Hello! This is a test email from Nodemailer.",
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
)