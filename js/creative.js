class CargosManager {
    constructor() {
        this.cargas = JSON.parse(localStorage.getItem('cargas') || '[]');
        this.cargosList = document.getElementById('cargosList');
        this.modal = document.getElementById('cargoModal');
        this.cargoDescription = document.getElementById('cargoDescription');
        this.searchInput = document.getElementById('searchInput');
        
        // Botões
        document.getElementById('addCargo').addEventListener('click', () => this.openModal());
        document.getElementById('saveCargo').addEventListener('click', () => this.saveCargo());
        document.getElementById('cancelCargo').addEventListener('click', () => this.closeModal());
        this.searchInput.addEventListener('input', () => this.filterCargas());
        
        this.editingId = null;
        this.loadCargas();
    }

    saveToStorage() {
        localStorage.setItem('cargas', JSON.stringify(this.cargas));
    }

    loadCargas() {
        this.cargosList.innerHTML = '';
        const searchTerm = this.searchInput.value.toLowerCase();
        
        this.cargas
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .filter(cargo => cargo.description.toLowerCase().includes(searchTerm))
            .forEach(cargo => this.createCargoElement(cargo));
    }

    createCargoElement(cargo) {
        const div = document.createElement('div');
        div.className = 'cargo-item';
        div.innerHTML = `
            <div class="cargo-description">${cargo.description}</div>
            <div class="cargo-date">${new Date(cargo.date).toLocaleString()}</div>
            <div class="cargo-actions">
                <button class="edit-button" onclick="cargosManager.startEdit('${cargo.id}')">Editar</button>
                <button class="delete-button" onclick="cargosManager.deleteCargo('${cargo.id}')">Deletar</button>
            </div>
        `;
        this.cargosList.appendChild(div);
    }

    openModal(cargo = null) {
        this.modal.classList.add('active');
        if (cargo) {
            this.editingId = cargo.id;
            this.cargoDescription.value = cargo.description;
            document.getElementById('modalTitle').textContent = 'Editar Carga';
        } else {
            this.editingId = null;
            this.cargoDescription.value = '';
            document.getElementById('modalTitle').textContent = 'Nova Carga';
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.editingId = null;
        this.cargoDescription.value = '';
    }

    saveCargo() {
        const description = this.cargoDescription.value.trim();
        if (!description) {
            showNotification('Por favor, digite uma descrição', true);
            return;
        }

        if (this.editingId) {
            const index = this.cargas.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
                this.cargas[index].description = description;
                this.cargas[index].date = new Date().toISOString();
                showNotification('Carga atualizada com sucesso!');
            }
        } else {
            const novaCarga = {
                id: Date.now().toString(),
                description,
                date: new Date().toISOString(),
            };
            this.cargas.push(novaCarga);
            showNotification('Carga adicionada com sucesso!');
        }

        this.saveToStorage();
        this.loadCargas();
        this.closeModal();
    }

    startEdit(id) {
        const cargo = this.cargas.find(c => c.id === id);
        if (cargo) {
            this.openModal(cargo);
        }
    }

    deleteCargo(id) {
        if (!confirm('Tem certeza que deseja deletar esta carga?')) return;

        this.cargas = this.cargas.filter(cargo => cargo.id !== id);
        this.saveToStorage();
        this.loadCargas();
        showNotification('Carga deletada com sucesso!');
    }

    filterCargas() {
        this.loadCargas();
    }
}

// inicia o gerenciador quando carrega o index
let cargosManager;
window.addEventListener('load', () => {
    if (localStorage.getItem('currentUser')) {
        cargosManager = new CargosManager();
    }
});