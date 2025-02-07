// Screen Management
const screens = {
    login: document.getElementById('loginScreen'),
    register: document.getElementById('registerScreen'),
    creative: document.getElementById('creativeScreen')
};

const showScreen = (screenName) => {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
};

// Navigation Event Listeners
document.getElementById('goToRegister').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('register');
});

document.getElementById('goToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('login');
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    showScreen('login');
});

// Check for logged-in user on page load
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showScreen('creative');
    } else {
        showScreen('login');
    }
});

// Creative Space Features
const searchInput = document.getElementById('searchInput');
const creativeContent = document.getElementById('creativeContent');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search functionality here
});