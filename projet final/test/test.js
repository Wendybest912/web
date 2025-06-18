const enemies = {};
let enemyCounter = 0;

// Configuration complète des ennemis
const enemyTypes = {
    slime: {
        spriteSheet: 'spritesheet (1).png',
        animations: {
            idle: { frameWidth: 64, frameCount: 4, loop: true, startY: 0 },
            death02: { frameWidth: 64, frameCount: 6, loop: false, startY: 64 },
            attack: { frameWidth: 64, frameCount: 4, loop: false, startY: 128 },
            hit: { frameWidth: 64, frameCount: 4, loop: false, startY: 192 }
        }
    },
    rat: {
        spriteSheet: 'spritesheet (2).png',
        animations: {
            idle: { frameWidth: 64, frameCount: 4, loop: true, startY: 0 },
            death: { frameWidth: 64, frameCount: 6, loop: false, startY: 64 },
            attack: { frameWidth: 64, frameCount: 8, loop: false, startY: 128 },
            hit: { frameWidth: 64, frameCount: 4, loop: false, startY: 192 }
        }
    }
};

// Charge une image
function loadImageEnemy(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

// Fait apparaître un ennemi
async function spawnEnemy(type) {
    if (!enemyTypes[type]) {
        console.error(`Type d'ennemi inconnu: ${type}`);
        return null;
    }

    const enemyId = `enemy_${enemyCounter++}`;
    const config = enemyTypes[type];

    try {
        const spriteSheet = await loadImageEnemy(config.spriteSheet);
        
        const canvas = document.createElement('canvas');
        canvas.id = `${enemyId}_canvas`;
        canvas.className = 'enemy-canvas';
        document.getElementById('enemies-container').appendChild(canvas);

        // Configuration initiale du canvas
        const firstAnim = config.animations.idle;
        canvas.width = firstAnim.frameWidth;
        canvas.height = 64; // Hauteur fixe

        enemies[enemyId] = {
            spriteSheet,
            canvas,
            ctx: canvas.getContext('2d'),
            currentAnimation: null,
            currentFrame: 0,
            animationInterval: null,
            config: config.animations,
            type
        };

        playAnimationEnemy(enemyId, 'idle');
        return enemyId;
    } catch (error) {
        console.error(`Erreur de création ${type}:`, error);
        return null;
    }
}

// Joue une animation
function playAnimationEnemy(enemyId, animName, onComplete) {
    const enemy = enemies[enemyId];
    if (!enemy || !enemy.config[animName]) return;

    // Arrête l'animation en cours
    if (enemy.animationInterval) {
        clearInterval(enemy.animationInterval);
        enemy.animationInterval = null;
    }

    // Réinitialise l'animation
    enemy.currentFrame = 0;
    enemy.currentAnimation = animName;
    
    const animConfig = enemy.config[animName];
    const frameDuration = animName.includes('attack') ? 100 : 200; // Plus rapide pour les attaques

    // Dessine la première frame immédiatement
    drawFrameEnemy(enemyId);

    // Configure la boucle d'animation
    enemy.animationInterval = setInterval(() => {
        enemy.currentFrame++;
        
        if (enemy.currentFrame >= animConfig.frameCount) {
            if (!animConfig.loop) {
                clearInterval(enemy.animationInterval);
                if (onComplete) onComplete();
                return;
            }
            enemy.currentFrame = 0;
        }
        
        drawFrameEnemy(enemyId);
    }, frameDuration);
}

// Dessine une frame
function drawFrameEnemy(enemyId) {
    const enemy = enemies[enemyId];
    if (!enemy || !enemy.currentAnimation) return;

    const animName = enemy.currentAnimation;
    const animConfig = enemy.config[animName];
    
    enemy.ctx.clearRect(0, 0, enemy.canvas.width, enemy.canvas.height);
    enemy.ctx.drawImage(
        enemy.spriteSheet,
        enemy.currentFrame * animConfig.frameWidth, // Position X
        animConfig.startY,                        // Position Y
        animConfig.frameWidth, 64,               // Taille source
        0, 0,                                    // Position canvas
        animConfig.frameWidth, 64                 // Taille canvas
    );
}

// Tue un ennemi
function killEnemy(enemyId) {
    if (!enemies[enemyId]) return;

    const enemyType = enemies[enemyId].type;
    const deathAnim = enemyType === 'skeleton' ? 'death02' : 'death';
    
    playAnimationEnemy(enemyId, deathAnim, () => {
        removeEnemy(enemyId);
    });
}

// Supprime un ennemi
function removeEnemy(enemyId) {
    if (!enemies[enemyId]) return;

    const canvas = document.getElementById(`${enemyId}_canvas`);
    if (canvas) canvas.remove();
    
    delete enemies[enemyId];
}
/*
// Gestion des boutons UI
function setupUI() {
    document.getElementById('spawn-skeleton').addEventListener('click', () => {
        spawnEnemy('skeleton');
    });

    document.getElementById('spawn-zombie').addEventListener('click', () => {
        spawnEnemy('zombie');
    });

    document.getElementById('kill-random').addEventListener('click', () => {
        const enemyIds = Object.keys(enemies);
        if (enemyIds.length > 0) {
            const randomId = enemyIds[Math.floor(Math.random() * enemyIds.length)];
            killEnemy(randomId);
        }
    });

    // Boutons d'attaque/dégâts supplémentaires
    document.getElementById('attack-all').addEventListener('click', () => {
        Object.keys(enemies).forEach(id => {
            playAnimation(id, 'attack');
        });
    });

    document.getElementById('hit-all').addEventListener('click', () => {
        Object.keys(enemies).forEach(id => {
            playAnimation(id, 'hit');
        });
    });
}*/

// Initialisation
async function init() {
    await spawnEnemy('slime');
    await spawnEnemy('rat');
    setupUI();
}

init();