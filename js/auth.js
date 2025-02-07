// Form Handling
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem', true);
        return;
    }

    const hashedPassword = await sha256(password);
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(user => user.email === email)) {
        showNotification('Email já cadastrado', true);
        return;
    }

    users.push({ name, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    showNotification('Cadastro realizado com sucesso!');
    showScreen('login');
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const hashedPassword = await sha256(password);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
        showNotification('Login realizado com sucesso!');
        showScreen('creative');
    } else {
        showNotification('Email ou senha incorretos', true);
    }
});