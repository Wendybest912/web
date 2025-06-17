

// Données du jeu
const gameData = {
    player: {
        name: "Héros",
        hp: 100,
        maxHp: 100,
        attack: 10,
        specialAttack: 25,
        specialCooldown: 0,
        level: 1,
        floor: 1,
        attackBoost: 0
    },
    enemy: null,
    inCombat: false,
    backgrounds: [
        "url('assets/background.png')",
    ],
    enemies: [
        { name: "Gobelin", hp: 30, maxHp: 30, attack: 8, image: "goblin.png" },
        { name: "Loup Géant", hp: 45, maxHp: 45, attack: 12, image: "wolf.png" },
        { name: "Squelette", hp: 35, maxHp: 35, attack: 10, image: "skeleton.png" },
        { name: "Araignée Géante", hp: 40, maxHp: 40, attack: 15, image: "spider.png" }
    ],
    bosses: [
        { name: "Dragon Noir", hp: 150, maxHp: 150, attack: 25, image: "dragon.png" },
        { name: "Liche", hp: 120, maxHp: 120, attack: 30, image: "lich.png" }
    ]
};

// Éléments DOM
const elements = {
    playerName: document.getElementById('player-name'),
    currentHp: document.getElementById('current-hp'),
    maxHp: document.getElementById('max-hp'),
    hpFill: document.getElementById('hp-fill'),
    playerLevel: document.getElementById('player-level'),
    currentFloor: document.getElementById('current-floor'),
    playerAttack: document.getElementById('player-attack'),
    gameBackground: document.getElementById('game-background'),
    eventContainer: document.getElementById('event-container'),
    combatInterface: document.getElementById('combat-interface'),
    enemyName: document.getElementById('enemy-name'),
    enemyHp: document.getElementById('enemy-hp'),
    enemyMaxHp: document.getElementById('enemy-max-hp'),
    enemyHpFill: document.getElementById('enemy-hp-fill'),
    combatLog: document.getElementById('combat-log'),
    attackBtn: document.getElementById('attack-btn'),
    specialBtn: document.getElementById('special-btn'),
    nextFloorBtn: document.getElementById('next-floor-btn'),
    startButton: document.getElementById('start-button')
};

// Initialisation du jeu
function initGame() {
    updatePlayerUI();
    elements.gameBackground.style.backgroundImage = gameData.backgrounds[0];
    /*
    if (localStorage.getItem('rpgPlayer')) {
        gameData.player = JSON.parse(localStorage.getItem('rpgPlayer'));
        updatePlayerUI();
        showNextFloorButton();
    }
        */
    
    // Événements
    elements.startButton.addEventListener('click', startAdventure);
    elements.nextFloorBtn.addEventListener('click', () => {
        nextFloor();
        playAnimation('walk');
    });
    elements.attackBtn.addEventListener('click', () => {
        performAttack('normal');
        playAnimation('attack01');
        gameData.player.specialCooldown = Math.max(0, gameData.player.specialCooldown - 1);
    });
    elements.specialBtn.addEventListener('click', () => {
        performAttack('special');
        playAnimation('attack02');
    });
}

// Mise à jour de l'interface joueur
function updatePlayerUI() {
    elements.playerName.textContent = gameData.player.name;
    elements.currentHp.textContent = gameData.player.hp;
    elements.maxHp.textContent = gameData.player.maxHp;
    elements.hpFill.style.width = `${(gameData.player.hp / gameData.player.maxHp) * 100}%`;
    elements.playerLevel.textContent = gameData.player.level;
    elements.currentFloor.textContent = gameData.player.floor;
    elements.playerAttack.textContent = gameData.player.attack + gameData.player.attackBoost;
    
    // Gestion du bouton spécial
    if (gameData.player.specialCooldown > 0) {
        elements.specialBtn.disabled = true;
        elements.specialBtn.innerHTML = `<i class="fas fa-clock"></i> Spécial (${gameData.player.specialCooldown} tours)`;
    } else {
        elements.specialBtn.disabled = false;
        elements.specialBtn.innerHTML = '<i class="fas fa-fire"></i> Attaque Spéciale';
    }
}

// Commencer l'aventure
function startAdventure() {
    elements.eventContainer.style.display = 'none';
    showNextFloorButton();
}

// Passer à l'étape suivante
function nextFloor() {
    gameData.player.floor++;
    
    
    // Changer le fond tous les 5 étages
    const bgIndex = Math.floor((gameData.player.floor - 1) / 5) % gameData.backgrounds.length;
    elements.gameBackground.style.backgroundImage = gameData.backgrounds[bgIndex];
    
    updatePlayerUI();
    elements.nextFloorBtn.style.display = 'none';
    
    // Délai avant le prochain événement pour l'animation
    setTimeout(triggerRandomEvent, 500);
}

// Déclencher un événement aléatoire
function triggerRandomEvent() {
    // Boss tous les 10 étages
    if (gameData.player.floor % 10 === 0) {
        triggerBossFight();
        return;
    }
    
    const eventTypes = ['combat', 'treasure', 'heal'];
    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    switch (randomEvent) {
        case 'combat':
            triggerCombat();
            break;
        case 'treasure':
            triggerTreasure();
            break;
        case 'heal':
            triggerHeal();
            break;
    }
}

// Déclencher un combat
function triggerCombat() {
    gameData.inCombat = true;
    
    // Choisir un ennemi aléatoire
    const enemyPool = gameData.enemies;
    gameData.enemy = {...enemyPool[Math.floor(Math.random() * enemyPool.length)]};
    
    // Mise à jour de l'interface combat
    elements.enemyName.textContent = gameData.enemy.name;
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyMaxHp.textContent = gameData.enemy.maxHp;
    elements.enemyHpFill.style.width = '100%';
    elements.combatLog.innerHTML = '';
    
    // Afficher l'interface de combat
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-combat';
    elements.eventContainer.innerHTML = `
        <h2>Un ${gameData.enemy.name} apparaît!</h2>
        <p>Préparez-vous au combat!</p>
    `;
    
    elements.combatInterface.style.display = 'block';
    addToCombatLog(`Un ${gameData.enemy.name} sauvage apparaît!`);
}

// Déclencher un combat de boss
function triggerBossFight() {
    gameData.inCombat = true;
    
    // Choisir un boss aléatoire
    const bossPool = gameData.bosses;
    gameData.enemy = {...bossPool[Math.floor(Math.random() * bossPool.length)]};
    
    // Mise à jour de l'interface combat
    elements.enemyName.textContent = gameData.enemy.name;
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyMaxHp.textContent = gameData.enemy.maxHp;
    elements.enemyHpFill.style.width = '100%';
    elements.combatLog.innerHTML = '';
    
    // Afficher l'interface de combat
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-combat';
    elements.eventContainer.innerHTML = `
        <h2>Un ${gameData.enemy.name} apparaît!</h2>
        <p>Un boss redoutable se dresse devant vous!</p>
    `;
    
    elements.combatInterface.style.display = 'block';
    addToCombatLog(`Un terrible ${gameData.enemy.name} apparaît!`);
}

// Déclencher un trésor
function triggerTreasure() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-treasure';
    
    const attackBoost = Math.floor(Math.random() * 5) + 1;
    gameData.player.attackBoost += attackBoost;
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-chest"></i> Trésor découvert!</h2>
        <p>Vous trouvez une épée légendaire qui augmente votre attaque de +${attackBoost}!</p>
        <button id="continue-btn" class="btn btn-primary">Continuer</button>
    `;
    
    document.getElementById('continue-btn').addEventListener('click', () => {
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
        updatePlayerUI();
    });
}

// Déclencher une fontaine de soin
function triggerHeal() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-heal';
    
    const healAmount = Math.floor(gameData.player.maxHp * 0.3);
    gameData.player.hp = Math.min(gameData.player.maxHp, gameData.player.hp + healAmount);
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-fountain"></i> Fontaine de soin</h2>
        <p>Vous vous reposez près d'une fontaine magique et récupérez ${healAmount} PV.</p>
        <button id="continue-btn" class="btn btn-primary">Continuer</button>
    `;
    
    document.getElementById('continue-btn').addEventListener('click', () => {
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
        updatePlayerUI();
    });
}

// Effectuer une attaque
function performAttack(type) {
    if (!gameData.inCombat) return;
    
    let damage = 0;
    let isSpecial = false;
    
    if (type === 'normal') {
        damage = gameData.player.attack + gameData.player.attackBoost;
        addToCombatLog(`Vous attaquez le ${gameData.enemy.name} et infligez ${damage} dégâts!`);
    } else {
        if (gameData.player.specialCooldown > 0) return;
        
        damage = gameData.player.specialAttack + gameData.player.attackBoost;
        gameData.player.specialCooldown = 3;
        isSpecial = true;
        addToCombatLog(`Vous utilisez une attaque spéciale sur le ${gameData.enemy.name} et infligez ${damage} dégâts!`);
    }
    
    // Appliquer les dégâts à l'ennemi
    gameData.enemy.hp = Math.max(0, gameData.enemy.hp - damage);
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyHpFill.style.width = `${(gameData.enemy.hp / gameData.enemy.maxHp) * 100}%`;
    
    // Vérifier si l'ennemi est mort
    if (gameData.enemy.hp <= 0) {
        endCombat(true);
        return;
    }
    
    updatePlayerUI();
    
    // Tour de l'ennemi après un délai
    setTimeout(enemyTurn, 1500);
}

// Tour de l'ennemi
function enemyTurn() {
    const damage = gameData.enemy.attack;
    gameData.player.hp = Math.max(0, gameData.player.hp - damage);
    
    addToCombatLog(`Le ${gameData.enemy.name} vous attaque et inflige ${damage} dégâts!`);
    updatePlayerUI();
    
    // Vérifier si le joueur est mort
    if (gameData.player.hp <= 0) {
        endCombat(false);
        return;
    }
}

// Terminer le combat
function endCombat(playerWon) {
    gameData.inCombat = false;
    
    if (playerWon) {
        const xpGained = gameData.enemy.maxHp;
        addToCombatLog(`Vous avez vaincu le ${gameData.enemy.name} et gagné ${xpGained} XP!`);
        
        // Vérifier le niveau supérieur
        checkLevelUp();
    } else {
        addToCombatLog(`Vous avez été vaincu par le ${gameData.enemy.name}...`);
        // Réinitialiser le joueur
        gameData.player.hp = gameData.player.maxHp;
    }
    
    // Cacher l'interface de combat après un délai
    setTimeout(() => {
        elements.combatInterface.style.display = 'none';
        elements.eventContainer.style.display = 'none';
        
        if (playerWon) {
            showNextFloorButton();
        } else {
            // Retour à l'étape 1 si mort
            gameData.player.floor = 1;
            updatePlayerUI();
            showNextFloorButton();
        }
    }, 2000);
}

// Vérifier si le joueur monte de niveau
function checkLevelUp() {
    const xpNeeded = gameData.player.level * 100;
    if (gameData.player.floor >= xpNeeded) {
        gameData.player.level++;
        gameData.player.maxHp += 20;
        gameData.player.hp = gameData.player.maxHp;
        gameData.player.attack += 5;
        gameData.player.specialAttack += 8;
        
        addToCombatLog(`Félicitations! Vous atteignez le niveau ${gameData.player.level}!`);
        updatePlayerUI();
    }
}

// Ajouter un message au journal de combat
function addToCombatLog(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    elements.combatLog.appendChild(logEntry);
    elements.combatLog.scrollTop = elements.combatLog.scrollHeight;
}

// Afficher le bouton d'étape suivante
function showNextFloorButton() {
    elements.nextFloorBtn.style.display = 'flex';
}

// Sauvegarder la partie
function saveGame() {
    localStorage.setItem('rpgPlayer', JSON.stringify(gameData.player));
}

// Charger la partie
function loadGame() {
    if (localStorage.getItem('rpgPlayer')) {
        gameData.player = JSON.parse(localStorage.getItem('rpgPlayer'));
        updatePlayerUI();
    }
}

// Variables globales
let spriteSheet;
let animations = {};
let currentAnimation = null;
let currentFrame = 0;
let animationInterval;
const canvas = document.getElementById('player-canvas');
const ctx = canvas.getContext('2d');

// Configuration des animations basée sur le JSON
const animationConfig = {
    idle: { frameWidth: 100, frameCount: 6, loop: true },
    attack01: { frameWidth: 100, frameCount: 6, loop: false },
    death: { frameWidth: 100, frameCount: 4, loop: false },
    hurt: { frameWidth: 100, frameCount: 4, loop: false },
    walk: { frameWidth: 100, frameCount: 8, loop: false },
    attack02: { frameWidth: 100, frameCount: 6, loop: false },
    download: { frameWidth: 100, frameCount: 8, loop: false }
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

// Initialiser le jeu au chargement
window.addEventListener('load', initGame);
// Sauvegarder quand on quitte la page
window.addEventListener('beforeunload', saveGame);


