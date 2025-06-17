document.addEventListener('DOMContentLoaded', async function() {
    const monsterContainer = document.getElementById('monster-container');
    const generateBtn = document.getElementById('generate-btn');
    let spritesData = null;

    // Charger les données JSON
    try {
        const response = await fetch('spritesheet.json');
        if (!response.ok) throw new Error('Erreur de chargement du JSON');
        spritesData = await response.json();
        
        // Générer un premier monstre

    } catch (error) {
        console.error('Erreur:', error);
        monsterContainer.innerHTML = `<p class="error">Erreur de chargement: ${error.message}</p>`;
    }

    // Générer un monstre aléatoire
    function generateRandomMonster() {
        if (!spritesData) return;

        // Effacer le monstre précédent
        monsterContainer.innerHTML = '';

        // Choisir un sprite aléatoire
        const randomIndex = Math.floor(Math.random() * spritesData.frames.length);
        const sprite = spritesData.frames[randomIndex];
        
        // Créer l'élément du monstre
        const monsterElement = document.createElement('div');
        monsterElement.className = 'monster monster-appear';
        
        // Calculer la taille pour tenir dans le conteneur (max 80% de la hauteur/largeur)
        const maxSize = Math.min(monsterContainer.offsetWidth * 0.8, monsterContainer.offsetHeight * 0.8);
        const scale = Math.min(maxSize / sprite.frame.w, maxSize / sprite.frame.h);
        
        monsterElement.style.width = `${sprite.frame.w}px`;
        monsterElement.style.height = `${sprite.frame.h}px`;
        monsterElement.style.backgroundPosition = `-${sprite.frame.x}px -${sprite.frame.y}px`;
        monsterElement.style.transform = `scale(${scale})`;
        
        // Ajouter les infos du monstre
        const infoElement = document.createElement('div');
        infoElement.className = 'monster-info';
        infoElement.textContent = `${sprite.filename} (${sprite.frame.w}x${sprite.frame.h})`;
        monsterElement.appendChild(infoElement);
        
        monsterContainer.appendChild(monsterElement);
    }

    // Bouton pour générer un nouveau monstre
    generateBtn.addEventListener('click', generateRandomMonster);
});