// Variables globales
let spriteSheet;
let animations = {};
let currentAnimation = null;
let currentFrame = 0;
let animationInterval;
const canvas = document.getElementById('sprite-canvas');
const ctx = canvas.getContext('2d');

// Configuration des animations basée sur le JSON
const animationConfig = {
    idle: { frameWidth: 100, frameCount: 6, loop: true },
    attack01: { frameWidth: 100, frameCount: 6, loop: false },
    death: { frameWidth: 100, frameCount: 4, loop: false },
    hurt: { frameWidth: 100, frameCount: 4, loop: false },
    walk: { frameWidth: 100, frameCount: 8, loop: false }
};

// Chargement des ressources
async function loadResources() {
    try {
        // Charger le spritesheet
        spriteSheet = await loadImage('spritesheet (3).png');
        
        // Charger les données JSON
        const response = await fetch('spritesheet (3).json');
        if (!response.ok) throw new Error('Erreur de chargement du JSON');
        const spritesheetData = await response.json();
        
        // Initialiser les animations
        initAnimations(spritesheetData);
        
        // Démarrer l'animation Idle par défaut
        playAnimation('idle');
        
        // Activer les boutons
        setupButtons();
    } catch (error) {
        console.error('Erreur de chargement:', error);
        alert('Erreur de chargement des ressources. Voir la console.');
    }
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function initAnimations(data) {
    // Créer un objet avec les positions de chaque animation
    data.frames.forEach((frame, index) => {
        const animName = frame.filename.split('-')[1].split('.')[0].toLowerCase();
        animations[animName] = {
            y: frame.frame.y,
            totalWidth: frame.frame.w
        };
    });
    
    // Configurer le canvas
    canvas.width = 100; // Largeur d'une frame
    canvas.height = 100;
}

function playAnimation(animName) {
    // Arrêter l'animation en cours
    if (animationInterval) clearInterval(animationInterval);
    
    // Réinitialiser le compteur de frames
    currentFrame = 0;
    currentAnimation = animName;
    
    // Démarrer la nouvelle animation
    drawFrame();
    
    if (animationConfig[animName].loop || currentFrame < animationConfig[animName].frameCount - 1) {
        animationInterval = setInterval(() => {
            drawFrame();
            
            // Vérifier si l'animation est terminée (pour les non-loop)
            if (!animationConfig[animName].loop && currentFrame >= animationConfig[animName].frameCount - 1) {
                clearInterval(animationInterval);
                // Revenir à l'idle après l'animation
                setTimeout(() => playAnimation('idle'), 300);
            }
        }, 100); // Vitesse d'animation
    }
}

function drawFrame() {
    const animName = currentAnimation;
    const config = animationConfig[animName];
    const animData = animations[animName];
    
    // Calculer la position x
    const frameX = 1 + (currentFrame * config.frameWidth);
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner la frame actuelle
    ctx.drawImage(
        spriteSheet,
        frameX,
        animData.y,
        config.frameWidth,
        100,
        0,
        0,
        config.frameWidth,
        100
    );
    
    // Passer à la frame suivante
    currentFrame = (currentFrame + 1) % config.frameCount;
}

function setupButtons() {
    document.querySelectorAll('.anim-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const animName = btn.dataset.anim;
            playAnimation(animName);
        });
    });
}

// Démarrer le chargement
loadResources();