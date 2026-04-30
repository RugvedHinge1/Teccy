// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero content on load
gsap.from('.hero-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Animate floating cards
gsap.from('.floating-card', {
    duration: 1.5,
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

// Animate features on scroll
gsap.from('.feature-card', {
    scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%',
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.15,
    ease: 'power2.out'
});

// Animate steps on scroll
gsap.from('.step', {
    scrollTrigger: {
        trigger: '.steps-container',
        start: 'top 80%',
    },
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

// Animate auth section
gsap.from('.auth-container', {
    scrollTrigger: {
        trigger: '.auth-section',
        start: 'top 80%',
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// ===================================
// Authentication Logic (Supabase)
// ===================================

// Check if already logged in
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        window.location.href = 'index.html';
    }
});

// Tab switching
function showLogin() {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    clearErrors();
}

function showSignup() {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    clearErrors();
}

function clearErrors() {
    document.getElementById('login-error').textContent = '';
    document.getElementById('signup-error').textContent = '';
}

// Scroll to auth section
function scrollToAuth() {
    document.getElementById('auth-section').scrollIntoView({ behavior: 'smooth' });
}

// Login Form Handler
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    try {
        // Clear localStorage before login to prevent data leakage
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.startsWith('sb-')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            errorEl.textContent = `❌ ${error.message}`;
            return;
        }

        console.log('Login successful:', data);

        // Successful login - redirect with cache clear
        gsap.to('.auth-container', {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // Use replace to prevent back button issues and force cache clear
                window.location.replace('index.html?t=' + Date.now());
            }
        });

    } catch (err) {
        errorEl.textContent = '❌ Login failed. Please try again.';
        console.error('Login error:', err);
    }
});

// Signup Form Handler
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const errorEl = document.getElementById('signup-error');

    // Client-side validation
    if (username.length < 3) {
        errorEl.textContent = '❌ Username must be at least 3 characters';
        return;
    }

    if (password.length < 6) {
        errorEl.textContent = '❌ Password must be at least 6 characters';
        return;
    }

    if (password !== confirm) {
        errorEl.textContent = '❌ Passwords do not match';
        return;
    }

    try {
        // CRITICAL: Logout any existing user first and clear localStorage
        // This prevents new signup from inheriting previous user's session
        try {
            await supabaseClient.auth.signOut();
        } catch (logoutErr) {
            console.warn('No existing session to sign out:', logoutErr);
        }

        // Clear ALL localStorage except Supabase keys
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.startsWith('sb-')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Now sign up with Supabase
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) {
            console.error('Supabase signup error:', error);
            errorEl.textContent = `❌ ${error.message}`;
            return;
        }

        console.log('Signup successful:', data);

        // Successful signup - flag as new user for welcome popup
        sessionStorage.setItem('isNewUser', 'true');
        sessionStorage.setItem('newUsername', username);

        gsap.to('.auth-container', {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // Use replace to prevent back button issues and force cache clear
                window.location.replace('index.html?t=' + Date.now());
            }
        });

    } catch (err) {
        console.error('Signup exception:', err);
        errorEl.textContent = `❌ Signup failed: ${err.message || 'Please try again'}`;
    }
});

// Expose functions to global scope
window.showLogin = showLogin;
window.showSignup = showSignup;
window.scrollToAuth = scrollToAuth;
