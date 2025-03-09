document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            mobileMenu.classList.remove('hide');
        } else {
            mobileMenu.classList.add('hide');
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    });
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hide');
                mobileMenu.classList.remove('show');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize 3D background
    initializeBackground();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// 3D Background with Three.js
function initializeBackground() {
    // Get the container element
    const container = document.getElementById('canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true for transparent background
    
    // Set renderer size and append to container
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Fill the arrays with random positions and colors
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Positions
        posArray[i] = (Math.random() - 0.5) * 15; // x
        posArray[i + 1] = (Math.random() - 0.5) * 15; // y
        posArray[i + 2] = (Math.random() - 0.5) * 10; // z
        
        // Colors (blue to purple gradient)
        const blueAmount = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
        colorsArray[i] = 0.2 + Math.random() * 0.2; // r (0.2 - 0.4)
        colorsArray[i + 1] = 0.3 + Math.random() * 0.3; // g (0.3 - 0.6)
        colorsArray[i + 2] = blueAmount; // b (0.5 - 1.0)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Create particles material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.5
    });
    
    // Create the particle system
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles slowly
        particleMesh.rotation.x += 0.0005;
        particleMesh.rotation.y += 0.0005;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
}

// Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.add('fade-in');
    });
    
    document.querySelectorAll('#how-it-works .card-hover').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
    });
    
    document.querySelectorAll('#features h2, #how-it-works h2, #cta h2').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Create Intersection Observer
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    // Apply observer to animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(element => {
        appearOnScroll.observe(element);
    });
}

// Add pulse animation to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const primaryCtaButton = document.querySelector('#cta a:first-child');
    if (primaryCtaButton) {
        primaryCtaButton.classList.add('btn-pulse');
    }
});