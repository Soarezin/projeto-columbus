const screens = {
    login: document.getElementById('loginScreen'),
    register: document.getElementById('registerScreen'),
    creative: document.getElementById('creativeScreen')
};

const showScreen = (screenName) => {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
};

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

window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showScreen('creative');
    } else {
        showScreen('login');
    }
});

const searchInput = document.getElementById('searchInput');
const creativeContent = document.getElementById('creativeContent');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
});