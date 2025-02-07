// Utility Functions
const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const showNotification = (message, isError = false) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = isError ? '#ff3366' : '#00a896';
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
};