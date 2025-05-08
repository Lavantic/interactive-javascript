// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the interactive components
    initThemeToggle();
    initTabs();
    initControlPanel();
    initGallery();
    initFormValidation();
    initKeyPressDetection();
    initSecretFeature();
    initModal();
});

// Theme Toggle (Light/Dark Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.querySelector('.theme-label');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        // Toggle dark mode class
        body.classList.toggle('dark-mode');
        
        // Update button icon and label
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeLabel.textContent = 'Dark Mode';
            // Add a system message
            addMessage("Switching to dark mode. Night operations enabled.");
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeLabel.textContent = 'Light Mode';
            // Add a system message
            addMessage("Switching to light mode. Day operations enabled.");
        }
        
        // Button animation
        this.classList.add('rotate');
        setTimeout(() => {
            this.classList.remove('rotate');
        }, 500);
    });
}

// Tab Navigation
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Find and activate corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Add a system message
            addMessage(`Navigating to ${tabId.charAt(0).toUpperCase() + tabId.slice(1)} section.`);
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// Control Panel Functionality
function initControlPanel() {
    const statusIndicator = document.getElementById('statusIndicator');
    const toggleStatus = document.getElementById('toggleStatus');
    const powerLevel = document.getElementById('powerLevel');
    const boostPower = document.getElementById('boostPower');
    
    // Toggle Status Button
    toggleStatus.addEventListener('click', function() {
        if (statusIndicator.classList.contains('green')) {
            statusIndicator.classList.remove('green');
            statusIndicator.classList.add('red');
            statusIndicator.textContent = 'OFFLINE';
            addMessage("WARNING: System status changed to OFFLINE.");
        } else {
            statusIndicator.classList.remove('red');
            statusIndicator.classList.add('green');
            statusIndicator.textContent = 'ONLINE';
            addMessage("System status restored to ONLINE.");
        }
    });
    
    // Boost Power Button
    boostPower.addEventListener('click', function() {
        let currentPower = parseInt(powerLevel.style.width);
        
        // Increment power by 10%
        currentPower = (currentPower + 10) % 110;
        if (currentPower > 100) currentPower = 100;
        
        // Update power level display
        powerLevel.style.width = currentPower + '%';
        powerLevel.textContent = currentPower + '%';
        
        // Add a system message based on power level
        if (currentPower >= 80) {
            addMessage(`WARNING: Power levels at ${currentPower}%. System overload risk.`);
        } else if (currentPower >= 50) {
            addMessage(`Power increased to ${currentPower}%. Operating at optimal levels.`);
        } else {
            addMessage(`Power level: ${currentPower}%. Additional power recommended.`);
        }
    });
}

// System Message Function
function addMessage(message) {
    const messagePanel = document.getElementById('messagePanel');
    const newMessage = document.createElement('p');
    
    // Get current time for timestamp
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    newMessage.textContent = `[${timestamp}] ${message}`;
    messagePanel.appendChild(newMessage);
    
    // Auto-scroll to bottom
    messagePanel.scrollTop = messagePanel.scrollHeight;
    
    // Limit the number of messages
    if (messagePanel.children.length > 8) {
        messagePanel.removeChild(messagePanel.children[0]);
    }
}

// Gallery/Slideshow Functionality
function initGallery() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gallerySlide = document.querySelector('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Gallery images and captions
    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564', caption: 'Distant Galaxy' },
        { src: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9', caption: 'Astronaut in Space' },
        { src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa', caption: 'Earth from Orbit' },
        { src: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72', caption: 'Nebula Cloud' },
        { src: 'https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3', caption: 'Space Station' }
    ];
    
    let currentIndex = 0;
    
    // Update gallery with current image and caption
    function updateGallery() {
        const { src, caption } = galleryItems[currentIndex];
        gallerySlide.innerHTML = `
            <img src="${src}" alt="${caption}">
            <div class="caption">${caption}</div>
        `;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Add a system message
        addMessage(`Viewing: ${caption}`);
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateGallery();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGallery();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateGallery();
        });
    });
    
    // Initialize the gallery with the first image
    updateGallery();
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('missionForm');
    const nameInput = document.getElementById('astronautName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successModal = document.getElementById('successModal');
    
    // Name field validation
    nameInput.addEventListener('input', function() {
        const nameError = document.getElementById('nameError');
        if (this.value.trim() === '') {
            nameError.textContent = 'Astronaut name is required';
        } else if (this.value.length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
        } else {
            nameError.textContent = '';
        }
    });
    
    // Email field validation
    emailInput.addEventListener('input', function() {
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
        } else if (!emailPattern.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    // Password field validation with strength indicator
    passwordInput.addEventListener('input', function() {
        const passwordError = document.getElementById('passwordError');
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        // Clear previous classes
        strengthBar.className = 'strength-bar';
        
        if (this.value.trim() === '') {
            passwordError.textContent = 'Security code is required';
            strengthText.textContent = 'Password Strength';
        } else if (this.value.length < 8) {
            passwordError.textContent = 'Security code must be at least 8 characters';
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else {
            // Check password strength
            const hasUpperCase = /[A-Z]/.test(this.value);
            const hasLowerCase = /[a-z]/.test(this.value);
            const hasNumbers = /\d/.test(this.value);
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(this.value);
            
            const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
            
            passwordError.textContent = '';
            
            if (strength <= 2) {
                strengthBar.classList.add('weak');
                strengthText.textContent = 'Weak';
            } else if (strength === 3) {
                strengthBar.classList.add('medium');
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.classList.add('strong');
                strengthText.textContent = 'Strong';
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if there are any errors
        const errors = document.querySelectorAll('.error-message');
        let hasErrors = false;
        
        errors.forEach(error => {
            if (error.textContent !== '') {
                hasErrors = true;
            }
        });
        
        // Check required fields
        if (nameInput.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Astronaut name is required';
            hasErrors = true;
        }
        
        if (emailInput.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            hasErrors = true;
        }
        
        if (passwordInput.value.trim() === '') {
            document.getElementById('passwordError').textContent = 'Security code is required';
            hasErrors = true;
        }
        
        // If no errors, show success modal
        if (!hasErrors) {
            successModal.style.display = 'block';
            addMessage("Mission registration successful! Welcome aboard, astronaut.");
            form.reset();
        }
    });
}

// Keypress Detection
function initKeyPressDetection() {
    const keyPressed = document.getElementById('keyPressed');
    
    document.addEventListener('keydown', function(e) {
        // Update the key pressed display
        keyPressed.textContent = e.key;
        
        // Add system message for interesting keys
        const specialKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'];
        if (specialKeys.includes(e.key)) {
            addMessage(`Command key pressed: ${e.key}`);
        }
        
        // Secret arrow key navigation (if secret panel is visible)
        const secretPanel = document.getElementById('secretPanel');
        if (!secretPanel.classList.contains('hidden')) {
            handleSecretNavigation(e.key);
        }
    });
}

// Secret Feature (Double Click)
function initSecretFeature() {
    const secretPanel = document.getElementById('secretPanel');
    
    // Double click anywhere to toggle secret panel
    document.addEventListener('dblclick', function() {
        secretPanel.classList.toggle('hidden');
        
        if (!secretPanel.classList.contains('hidden')) {
            addMessage("SECRET MODE ACTIVATED! Use arrow keys to navigate.");
        } else {
            addMessage("Secret mode deactivated.");
        }
    });
    
    // Long press detection (alternative for mobile)
    let pressTimer;
    
    document.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            secretPanel.classList.toggle('hidden');
            
            if (!secretPanel.classList.contains('hidden')) {
                addMessage("SECRET MODE ACTIVATED! (Long press detected)");
            } else {
                addMessage("Secret mode deactivated.");
            }
        }, 1000); // 1 second for long press
    });
    
    document.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
}

// Handle secret navigation with arrow keys
function handleSecretNavigation(key) {
    const gameMessage = document.querySelector('.game-message');
    
    switch (key) {
        case 'ArrowUp':
            gameMessage.textContent = "Navigating up...";
            break;
        case 'ArrowDown':
            gameMessage.textContent = "Navigating down...";
            break;
        case 'ArrowLeft':
            gameMessage.textContent = "Navigating left...";
            break;
        case 'ArrowRight':
            gameMessage.textContent = "Navigating right...";
            break;
    }
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalOk = document.getElementById('modalOk');
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking OK button
    modalOk.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}