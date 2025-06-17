
// Données du jeu
const gameData = {
    player: {
        name: "Héros",
        hp: 100,
        maxHp: 100,
        attack: 10,
        armor:0,
        critChance: 5,
        critDmg:0,
        esquive:5,
        gold:0,
        specialCooldown: 0,
        level: 1,
        floor: 1,
        experience: 0,
        record: 0
    },
    enemy: null,
    inCombat: false,
    backgrounds: [
        "url('assets/background.png')",
        "url('assets/background2.png')",
        "url('assets/background3.png')",
    ],
    enemies: [
        { name: "slime", hp: 30, maxHp: 30, attack: 8, esquive: 5},
        { name: "rat", hp: 45, maxHp: 45, attack: 5, esquive: 5 },
        {name: "Bat", hp: 25, maxHp: 25,attack: 10, esquive: 15}
    ],
    bosses: [
        { name: "golem", hp: 100, maxHp: 100, attack: 16, esquive: 15 },
        { name: "Sazantos", hp: 1350525, maxHp: 1350525, attack: 1130, esquive: 38 }
    ],
    shopItems: [
        { name: "Potion +50HP", price: 5, effect: () => gameData.player.hp = Math.min(gameData.player.maxHp, gameData.player.hp + 50) },
        { name: "Épée +3ATK", price: 5, effect: () => gameData.player.attack += 3 },
        { name: "Bouclier +5ARM", price: 4, effect: () => gameData.player.armor += 5 }
    ],
    specialEvents: [
        { name: "Fosse aux trésors", weight: 3 },
        { name: "Marchand mystérieux", weight: 2 },
        { name: "Autel antique", weight: 2 },
        { name: "Entraîneur secret", weight: 1 }
    ]
};

let enemy = null;
let mobId = null;
let currentEnemy = null;
let isActionInProgress = false;

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




function initGame() {
    updatePlayerUI();
    elements.gameBackground.style.backgroundImage = gameData.backgrounds[0];
    
    loadGameProgress().then(() => {
        // Mettre à jour l'UI après le chargement
        updatePlayerUI();
        elements.gameBackground.style.backgroundImage = gameData.backgrounds[0];

        // event
        elements.startButton.addEventListener('click', startAdventure);
        elements.nextFloorBtn.addEventListener('click', () => {
            nextFloor();
            playAnimation('walk');
        });
        elements.attackBtn.addEventListener('click', () => {
            if (!isActionInProgress) {
                performAttack('normal');
                playAnimation('attack01');
                if (gameData.enemy.hp > 0 ) {
                playAnimationEnemy(enemyId, 'hit');
            }
            }
            
            gameData.player.specialCooldown = Math.max(0, gameData.player.specialCooldown - 1);
        });
        elements.specialBtn.addEventListener('click', () => {
            performAttack('special');
            playAnimation('attack02');
            if (gameData.enemy.hp > 0) {
                playAnimationEnemy(enemyId, 'hit');
            }
        });
    });
}

async function saveGameProgress() {
    
    if (gameData.player.floor > gameData.player.record){
            gameData.player.record = gameData.player.floor;
        }
    updatePlayerUI() ;
    try {
        const response = await fetch('save_game.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: sessionId, // ID de session récupéré depuis PHP
                stats: {
                    hp: gameData.player.hp,
                    maxHp: gameData.player.maxHp,
                    attack: gameData.player.attack,
                    armor: gameData.player.armor,
                    critChance: gameData.player.critChance,
                    critDmg: gameData.player.critDmg,
                    esquive: gameData.player.esquive,
                    gold: gameData.player.gold,
                    specialCooldown: gameData.player.specialCooldown,
                    level: gameData.player.level,
                    floor: gameData.player.floor,
                    experience: gameData.player.experience,
                    record: gameData.player.record
                }
            })
        });
        
        
        // Afficher la réponse texte brute avant de la parser
        const responseText = await response.text();
        console.log("Raw response:", responseText);
        
        // Puis essayer de la parser
        const result = JSON.parse(responseText);
        
        if (result.success) {
            console.log('Sauvegarde réussie');
        } else {
            console.error('Erreur de sauvegarde:', result.message);
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}

async function loadGameProgress() {
    try {
        const response = await fetch('load_game.php', {
            method: 'GET',
            credentials: 'include'
        });
        
        const result = await response.json();
        
        if (result.success && result.player) {
            // Mettre à jour gameData.player avec les données de la BDD
            gameData.player = {
                ...gameData.player, // Garde les valeurs par défaut si certaines propriétés manquent
                ...result.player    // Écrase avec les valeurs de la BDD
            };
            updatePlayerUI();
            console.log('Chargement réussi depuis la BDD');
        } else {
            console.log('Utilisation des valeurs par défaut');
        }
    } catch (error) {
        console.error('Erreur de chargement:', error);
    }
}

// Ajoutez l'écouteur d'événement pour le bouton
document.getElementById('save-button')?.addEventListener('click', saveGameProgress);

function updatePlayerUI() {
    elements.currentHp.textContent = gameData.player.hp;
    elements.maxHp.textContent = gameData.player.maxHp;
    elements.hpFill.style.width = `${(gameData.player.hp / gameData.player.maxHp) * 100}%`;
    elements.playerLevel.textContent = gameData.player.level;
    elements.currentFloor.textContent = gameData.player.floor;
    elements.playerAttack.textContent = gameData.player.attack ;
    
    
    // Ajout des nouvelles stats dans l'UI (vous devrez ajouter ces éléments dans votre HTML)
    document.getElementById('player-armor').textContent = gameData.player.armor;
    document.getElementById('player-crit-chance').textContent = gameData.player.critChance;
    document.getElementById('player-crit-dmg').textContent = gameData.player.critDmg;
    document.getElementById('player-esquive').textContent = gameData.player.esquive;
    document.getElementById('player-gold').textContent = gameData.player.gold;
    document.getElementById('player-record').textContent = gameData.player.record;
 
    if (gameData.player.specialCooldown > 0) {
        elements.specialBtn.disabled = true;
        elements.specialBtn.innerHTML = `<i class="fas fa-clock"></i> Spécial (${gameData.player.specialCooldown} tours)`;
    } else {
        elements.specialBtn.disabled = false;
        elements.specialBtn.innerHTML = '<i class="fas fa-fire"></i> Attaque Spéciale';
    }
}


function startAdventure() {
    elements.eventContainer.style.display = 'none';
    showNextFloorButton();
}


function nextFloor() {
    gameData.player.floor++;
    
    
    // changer fond tous les 5 étages
    const bgIndex = Math.floor((gameData.player.floor - 1) / 5) % gameData.backgrounds.length;
    elements.gameBackground.style.backgroundImage = gameData.backgrounds[bgIndex];
    
    updatePlayerUI();
    elements.nextFloorBtn.style.display = 'none';
    
    setTimeout(triggerRandomEvent, 500);
}

function triggerRandomEvent() {
    if ((gameData.player.floor + 1) % 10 === 0) {
        triggerShop();
        return;
    }

    if (gameData.player.floor % 10 === 0) {
        triggerBossFight();
        return;
    }
    
    const eventPool = [
        { type: 'combat', weight: 40 },
        { type: 'treasure', weight: 15 },
        { type: 'heal', weight: 15 },
        { type: 'special', weight: 30 }
    ];

    const totalWeight = eventPool.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedEvent = null;

    for (const event of eventPool) {
        if (random < event.weight) {
            selectedEvent = event.type;
            break;
        }
        random -= event.weight;
    }

    switch (selectedEvent) {
        case 'combat':
            triggerCombat();
            break;
        case 'treasure':
            triggerTreasure();
            break;
        case 'heal':
            triggerHeal();
            break;
        case 'special':
            console.log("sdfghjk");
            
            triggerSpecialEvent();
            break;
        default:
            triggerCombat(); // Fallback
    }
}


function triggerSpecialEvent() {
    const specialEvent = gameData.specialEvents[Math.floor(Math.random() * gameData.specialEvents.length)];
    
    switch (specialEvent.name) {
        case "Fosse aux trésors":
            triggerTreasurePit();
            break;
        case "Marchand mystérieux":
            triggerMysteryMerchant();
            break;
        case "Autel antique":
            triggerAncientAltar();
            break;
        case "Entraîneur secret":
            triggerSecretTrainer();
            break;
    }
}

function triggerAncientAltar() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-heal';
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-place-of-worship"></i> Autel antique</h2>
        <p>L'autel propose une bénédiction permanente. Choisissez sagement:</p>
        <div class="altar-options">
            <button id="health-altar-btn" class="btn btn-altar">
                <i class="fas fa-heart"></i> +10 PV Max
            </button>
            <button id="attack-altar-btn" class="btn btn-altar">
                <i class="fas fa-sword"></i> +3 Attaque
            </button>
            <button id="esquive-altar-btn" class="btn btn-altar">
                <i class="fas fa-running"></i> +3% Esquive
            </button>
        </div>
    `;
    
    document.getElementById('health-altar-btn').addEventListener('click', () => {
        gameData.player.maxHp += 10;
        gameData.player.hp += 10;
        addToCombatLog("Vos PV maximum augmentent de 15!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('attack-altar-btn').addEventListener('click', () => {
        gameData.player.attack += 3;
        addToCombatLog("Votre attaque augmente de 5!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('esquive-altar-btn').addEventListener('click', () => {
        gameData.player.esquive += 3;
        addToCombatLog("Votre chance d'esquive augmente de 5%!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
}

function triggerMysteryMerchant() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-treasure';
    
    const mysteryItem = {
        name: ["Potion mystérieuse", "Parchemin ancien", "Relique oubliée"][Math.floor(Math.random() * 3)],
        price: Math.floor(5 + Math.random() * 5),
        effect: () => {
            const effects = [
                () => { gameData.player.maxHp += 5; gameData.player.hp += 5; },
                () => { gameData.player.attack += 3; },
                () => { gameData.player.critChance += 5; },
                () => { gameData.player.esquive += 5; },
                () => { gameData.player.gold += Math.floor(5 * Math.random()); }
            ];
            effects[Math.floor(Math.random() * effects.length)]();
        }
    };
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-hat-wizard"></i> Marchand mystérieux</h2>
        <p>Un étrange marchand vous propose un objet mystérieux...</p>
        <div class="mystery-item">
            <h3>${mysteryItem.name}</h3>
            <p>Prix: ${mysteryItem.price} pièces d'or</p>
            <div class="merchant-options">
                <button id="buy-mystery-btn" class="btn btn-primary" 
                    ${gameData.player.gold < mysteryItem.price ? 'disabled' : ''}>
                    Acheter l'objet mystère
                </button>
                <button id="ignore-merchant-btn" class="btn">
                    Ignorer le marchand
                </button>
            </div>
        </div>
        <p>Votre or: ${gameData.player.gold}</p>
    `;
    
    document.getElementById('buy-mystery-btn').addEventListener('click', () => {
        gameData.player.gold -= mysteryItem.price;
        mysteryItem.effect();
        addToCombatLog(`Vous achetez ${mysteryItem.name}... Effet inattendu!`);
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('ignore-merchant-btn').addEventListener('click', () => {
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
}

function triggerTreasurePit() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-treasure';
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-gem"></i> Fosse aux trésors</h2>
        <p>Un puits profond rempli d'or brille devant vous. Oserez-vous plonger?</p>
        <div class="treasure-options">
            <button id="risk-btn" class="btn btn-danger">
                <i class="fas fa-dice"></i> Tenter sa chance (50/50)
            </button>
            <button id="safe-btn" class="btn btn-primary">
                <i class="fas fa-coins"></i> Prendre la récompense modeste
            </button>
        </div>
    `;
    
    document.getElementById('risk-btn').addEventListener('click', () => {
        if (Math.random() > 0.5) {
            const bigReward = Math.floor(4 + Math.random() * 5);
            gameData.player.gold += bigReward;
            addToCombatLog(`Incroyable! Vous trouvez ${bigReward} pièces d'or!`);
        } else {
            const damage = Math.floor(gameData.player.maxHp * 0.3);
            gameData.player.hp = Math.max(1, gameData.player.hp - damage);
            addToCombatLog(`Oups! Vous prenez ${damage} dégâts en tombant!`);
        }
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('safe-btn').addEventListener('click', () => {
        const smallReward = Math.floor(1 + Math.random() * 4);
        gameData.player.gold += smallReward;
        addToCombatLog(`Vous obtenez ${smallReward} pièces d'or en toute sécurité.`);
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
}

function triggerShop() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-treasure';
    
    let shopHTML = `
        <h2><i class="fas fa-store"></i> Boutique du héros</h2>
        <p>Préparez-vous pour le prochain boss! Choisissez un objet:</p>
        <div class="shop-items">
    `;
    
    gameData.shopItems.forEach((item, index) => {
        shopHTML += `
            <div class="shop-item ${gameData.player.gold < item.price ? 'disabled' : ''}">
                <h3>${item.name}</h3>
                <p>Prix: ${item.price} pièces d'or</p>
                <button class="btn btn-shop" data-index="${index}" 
                    ${gameData.player.gold < item.price ? 'disabled' : ''}>
                    Acheter
                </button>
            </div>
        `;
    });
    
    shopHTML += `
        </div>
        <button id="leave-shop-btn" class="btn btn-primary">Continuer sans acheter</button>
        <p>Votre or: ${gameData.player.gold}</p>
    `;
    
    elements.eventContainer.innerHTML = shopHTML;
    
    // Gestion des achats
    document.querySelectorAll('.btn-shop').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const item = gameData.shopItems[index];
            
            if (gameData.player.gold >= item.price) {
                gameData.player.gold -= item.price;
                item.effect();
                addToCombatLog(`Vous avez acheté ${item.name} pour ${item.price} pièces d'or!`);
                updatePlayerUI();
                e.target.disabled = true;
                e.target.parentElement.classList.add('disabled');
            }
        });
    });
    
    document.getElementById('leave-shop-btn').addEventListener('click', () => {
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
}

function triggerSecretTrainer() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-heal';
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-user-ninja"></i> Entraîneur secret</h2>
        <p>Un vieux guerrier propose de vous enseigner une technique:</p>
        <div class="trainer-options">
            <button id="crit-trainer-btn" class="btn btn-trainer">
                <i class="fas fa-bolt"></i> Apprendre coup critique (+5% chance)
            </button>
            <button id="armor-trainer-btn" class="btn btn-trainer">
                <i class="fas fa-shield-alt"></i> Apprendre défense (+5% armure)
            </button>
            <button id="special-trainer-btn" class="btn btn-trainer">
                <i class="fas fa-fire"></i> Améliorer attaque spéciale (-1 tour cooldown)
            </button>
        </div>
    `;
    
    document.getElementById('crit-trainer-btn').addEventListener('click', () => {
        gameData.player.critChance += 5;
        addToCombatLog("Votre chance de coup critique augmente de 5%!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('armor-trainer-btn').addEventListener('click', () => {
        gameData.player.armor += 5;
        addToCombatLog("Votre armure augmente de 5%!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
    
    document.getElementById('special-trainer-btn').addEventListener('click', () => {
        if (gameData.player.specialCooldown > 0) gameData.player.specialCooldown--;
        addToCombatLog("Votre attaque spéciale se recharge plus rapidement!");
        updatePlayerUI();
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
    });
}

function triggerCombat() {
    
    gameData.inCombat = true;
    
    
    const enemyPool = gameData.enemies;
    gameData.enemy = {...enemyPool[Math.floor(Math.random() * enemyPool.length)]};
    
   
    elements.enemyName.textContent = gameData.enemy.name;
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyMaxHp.textContent = gameData.enemy.maxHp;
    elements.enemyHpFill.style.width = '100%';
    elements.combatLog.innerHTML = '';
    enemy = gameData.enemy.name;

    elements.eventContainer.innerHTML = ''; 
    elements.eventContainer.style.display = 'none';
    elements.eventContainer.className = 'event-container event-combat';

    spawnEnemy(enemy);
    elements.combatInterface.style.display = 'block';
    addToCombatLog(`Un ${enemy} sauvage apparaît!`);
}

function triggerBossFight() {
    gameData.inCombat = true;

    let selectedBoss;
    
    const sazantosChance = 0.001; 
    if (Math.random() > sazantosChance / 100) {
        selectedBoss = gameData.bosses.find(boss => boss.name === "Sazantos");
    } else {
        const otherBosses = gameData.bosses.filter(boss => boss.name !== "Sazantos");
        selectedBoss = otherBosses[Math.floor(Math.random() * otherBosses.length)];
    }

    gameData.enemy = { ...selectedBoss };

    elements.enemyName.textContent = gameData.enemy.name;
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyMaxHp.textContent = gameData.enemy.maxHp;
    elements.enemyHpFill.style.width = '100%';
    elements.combatLog.innerHTML = '';
    enemy = gameData.enemy.name;

    elements.eventContainer.style.display = 'none';
    elements.eventContainer.className = 'event-container event-combat';

    spawnEnemy(enemy);
    elements.combatInterface.style.display = 'block';
    addToCombatLog(`Un terrible ${gameData.enemy.name} apparaît!`);
}

function showGameOverScreen() {
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalFloor = document.getElementById('final-floor');
    const finalRecord = document.getElementById('final-record');
    
    // Mettre à jour les informations
    finalFloor.textContent = gameData.player.floor;
    finalRecord.textContent = gameData.player.record;
    
    // Afficher l'écran
    gameOverScreen.style.display = 'flex';
    
    // Configurer le bouton de redémarrage
    document.getElementById('restart-button').addEventListener('click', resetGame, { once: true });
}

function resetGame() {
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    
    // Réinitialiser le joueur
    gameData.player.hp = gameData.player.maxHp;
    gameData.player.floor = 1;
    gameData.player.gold = 0;
    
    // Cacher l'interface de combat
    elements.combatInterface.style.display = 'none';
    elements.eventContainer.style.display = 'none';
    
    // Mettre à jour l'UI
    updatePlayerUI();
    
    // Montrer le bouton pour continuer
    showNextFloorButton();
}


function triggerTreasure() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-treasure';
    
    const attack = Math.floor(Math.random() * 2) + 1;
    gameData.player.attack += attack;
    
    elements.eventContainer.innerHTML = `
        <h2><i class="fas fa-chest"></i> Trésor découvert!</h2>
        <p>Vous trouvez une épée légendaire qui augmente votre attaque de +${attack}!</p>
        <button id="continue-btn" class="btn btn-primary">Continuer</button>
    `;
    
    document.getElementById('continue-btn').addEventListener('click', () => {
        elements.eventContainer.style.display = 'none';
        showNextFloorButton();
        updatePlayerUI();
    });
}



function triggerHeal() {
    elements.eventContainer.style.display = 'block';
    elements.eventContainer.className = 'event-container event-heal';
    
    const healAmount = Math.floor(gameData.player.maxHp * 0.35);
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


function performAttack(type) {
    
    if (!gameData.inCombat || isActionInProgress) return;
    isActionInProgress = true;
    
    let damage = 0;
    let isSpecial = false;
    let isCritical = false;
    let isDodged = false;

    if (Math.floor(Math.random() * 101)<  5) {
        addToCombatLog(`Le ${gameData.enemy.name} a esquivé votre attaque!`);
        isDodged = true;
        setTimeout(enemyTurn, 1500);
        return;
    }
    
    if (type === 'normal') {
        damage = gameData.player.attack ;
    } else {
        if (gameData.player.specialCooldown > 0) return;
        
        damage = gameData.player.attack * 2.5;
        gameData.player.specialCooldown = 3;
        isSpecial = true;
    }
    
    if (Math.random() * 100 < gameData.player.critChance) {
        const critMultiplier = 2 + (gameData.player.critDmg / 100); 
        damage = Math.floor(damage * critMultiplier);
        isCritical = true;
    }

    gameData.enemy.hp = Math.max(0, gameData.enemy.hp - damage);
    elements.enemyHp.textContent = gameData.enemy.hp;
    elements.enemyHpFill.style.width = `${(gameData.enemy.hp / gameData.enemy.maxHp) * 100}%`;
    
    if (!isDodged) {
        if (isSpecial) {
            addToCombatLog(`Vous utilisez une attaque spéciale sur le ${gameData.enemy.name} ` + 
                          (isCritical ? `(CRITIQUE x${2 + (gameData.player.critDmg / 100).toFixed(1)}!) ` : ``) + 
                          `et infligez ${damage} dégâts!`);
        } else {
            addToCombatLog(`Vous attaquez le ${gameData.enemy.name} ` + 
                          (isCritical ? `(CRITIQUE x${2 + (gameData.player.critDmg / 100).toFixed(1)}!) ` : ``) + 
                          `et infligez ${damage} dégâts!`);
        }
    }
    
    // Vérification si l'ennemi est mort
    if (gameData.enemy.hp <= 0) {
        const goldEarned = gameData.enemy.gold || Math.floor(gameData.enemy.maxHp / 10);
        gameData.player.gold += goldEarned;
        
        killEnemy(enemyId);
        addToCombatLog(`Vous avez vaincu le ${gameData.enemy.name} et gagné ${goldEarned} pièces d'or!`);
        endCombat(true);
        return;
    }
    
    updatePlayerUI();
    
    setTimeout(enemyTurn, 1500);
}

function enemyTurn() {
    // Vérification de l'esquive du joueur
    if (Math.random() * 100 < gameData.player.esquive) {
        addToCombatLog(`Vous avez esquivé l'attaque du ${gameData.enemy.name}!`);
        isActionInProgress = false;
        return;
    }
    
    let damage = gameData.enemy.attack;
    let isCritical = false;
    
    // Réduction des dégâts par l'armure du joueur
    if (gameData.player.armor > 0) {
        const damageReduction = damage * (gameData.player.armor / 100);
        damage = Math.max(1, damage - damageReduction);
    }
    
    gameData.player.hp = Math.max(0, gameData.player.hp - damage);
    
    addToCombatLog(`Le ${gameData.enemy.name} vous attaque ` + 
                  `et inflige ${damage} dégâts!`);
    playAnimationEnemy(enemyId, 'attack');
    playAnimation('hurt');
    updatePlayerUI();
    isActionInProgress = false;
    
    if (gameData.player.hp <= 0) {
        if (gameData.player.floor > gameData.player.record){
            gameData.player.record = gameData.player.floor;
        }
        updatePlayerUI() 
        playAnimation("death");
        removeEnemy(enemyId);
        endCombat(false);
        return;
    }
}



function endCombat(playerWon) {
    gameData.inCombat = false;
    isActionInProgress = false;
    
    
    if (playerWon) {
        const xpGained = gameData.enemy.maxHp;
        addToCombatLog(`Vous avez vaincu le ${gameData.enemy.name} et gagné ${xpGained} XP!`);    

        checkLevelUp();
    } else {
        addToCombatLog(`Vous avez été vaincu par le ${gameData.enemy.name}...`);
        gameData.player.hp = gameData.player.maxHp;
        gameData.player.attack = 10;
        gameData.player.esquive = 5;
        gameData.player.armor = 0;
        gameData.player.critChance = 5;
        gameData.player.critDmg = 0;
        gameData.player.gold = 0;
        showGameOverScreen();
    }
    
    setTimeout(() => {
        elements.combatInterface.style.display = 'none';
        elements.eventContainer.style.display = 'none';
        
        if (playerWon) {
            showNextFloorButton();
        } else {
            gameData.player.floor = 1;
            updatePlayerUI();
            showNextFloorButton();
        }
    }, 2000);

}

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

function addToCombatLog(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    elements.combatLog.appendChild(logEntry);
    elements.combatLog.scrollTop = elements.combatLog.scrollHeight;
}

function showNextFloorButton() {
    elements.nextFloorBtn.style.display = 'flex';
}

function saveGame() {
    localStorage.setItem('rpgPlayer', JSON.stringify(gameData.player));
}

function loadGame() {
    if (localStorage.getItem('rpgPlayer')) {
        gameData.player = JSON.parse(localStorage.getItem('rpgPlayer'));
        updatePlayerUI();
    }
}

let spriteSheet;
let animations = {};
let currentAnimation = null;
let currentFrame = 0;
let animationInterval;
const canvas = document.getElementById('player-canvas');
const ctx = canvas.getContext('2d');

const animationConfig = {
    idle: { frameWidth: 100, frameCount: 6, loop: true },
    attack01: { frameWidth: 100, frameCount: 6, loop: false },
    death: { frameWidth: 100, frameCount: 4, loop: false },
    hurt: { frameWidth: 100, frameCount: 4, loop: false },
    walk: { frameWidth: 100, frameCount: 8, loop: false },
    attack02: { frameWidth: 100, frameCount: 6, loop: false },
    download: { frameWidth: 100, frameCount: 8, loop: false }
};

async function loadResources() {
    try {
        spriteSheet = await loadImage('spritesheet (3).png');
    
        const response = await fetch('spritesheet (3).json');
        if (!response.ok) throw new Error('Erreur de chargement du JSON');
        const spritesheetData = await response.json();

        initAnimations(spritesheetData);
        
        playAnimation('idle');
        
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
    data.frames.forEach((frame, index) => {
        const animName = frame.filename.split('-')[1].split('.')[0].toLowerCase();
        animations[animName] = {
            y: frame.frame.y,
            totalWidth: frame.frame.w
        };
    });

    canvas.width = 100; 
    canvas.height = 100;
}

function playAnimation(animName) {
    if (animationInterval) clearInterval(animationInterval);
    
    currentFrame = 0;
    currentAnimation = animName;
    
    drawFrame();
    
    if (animationConfig[animName].loop || currentFrame < animationConfig[animName].frameCount - 1) {
        animationInterval = setInterval(() => {
            drawFrame();
            
            if (!animationConfig[animName].loop && currentFrame >= animationConfig[animName].frameCount - 1) {
                clearInterval(animationInterval);
                setTimeout(() => playAnimation('idle'), 300);
            }
        }, 100);
    }
}

function drawFrame() {
    const animName = currentAnimation;
    const config = animationConfig[animName];
    const animData = animations[animName];
    
    const frameX = 1 + (currentFrame * config.frameWidth);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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

let enemyId = null;
const enemies = {};
let enemyCounter = 0;

// Configuration complète des ennemis
const enemyTypes = {
    slime: {
        spriteSheet: 'monster/slime.png',
        animations: {
            attack: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: false, startY: 0 },
            death02: { frameWidth: 64,frameHeight: 64, frameCount: 6, loop: false, startY: 64 },
            hit: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: false, startY: 130 },
            idle: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: true, startY: 196 }
        }
    },
    rat: {
        spriteSheet: 'monster/rat.png',
        animations: {
            attack: { frameWidth: 64,frameHeight: 64, frameCount: 8, loop: false, startY: -8 },
            death: { frameWidth: 64,frameHeight: 64, frameCount: 6, loop: false, startY: 59 },
            hit: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: false, startY: 133 },
            idle: { frameWidth: 64, frameHeight: 64,frameCount: 4, loop: true, startY: 197 }
        }
    },
    Bat: {
        spriteSheet: 'monster/Bat.png', 
        animations: {
            attack: { frameWidth: 64,frameHeight: 64, frameCount: 7,loop: false, startY: 1 },
            death: { frameWidth: 64,frameHeight: 64, frameCount: 11, loop: false, startY: 67 },
            hit: { frameWidth: 64,frameHeight: 64, frameCount: 5, loop: false, startY: 133 },
            idle: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: true, startY: 199 }
        }
    },
    golem: {
        spriteSheet: 'monster/golem.png', 
        animations: {
            attack: { frameWidth: 64,frameHeight: 64, frameCount: 7,loop: false, startY: 1 },
            death: { frameWidth: 64,frameHeight: 64, frameCount: 11, loop: false, startY: 67 },
            hit: { frameWidth: 64,frameHeight: 64, frameCount: 5, loop: false, startY: 133 },
            idle: { frameWidth: 64,frameHeight: 64, frameCount: 4, loop: true, startY: 199 }
        }
    },
    Sazantos: {
    spriteSheet: 'monster/Sazantos.png',
    animations: {
        attack: { 
            frameWidth: 504, 
            frameHeight: 600, 
            frameCount: 8, 
            loop: false, 
            startY: 0 
        },
        death: { 
            frameWidth: 504, 
            frameHeight: 600, 
            frameCount: 8, 
            loop: false, 
            startY: 0
        },
        hit: { 
            frameWidth: 504, 
            frameHeight: 600, 
            frameCount: 8, 
            loop: false, 
            startY: 0
        },
        idle: { 
            frameWidth: 504, 
            frameHeight: 600, 
            frameCount: 8, 
            loop: true, 
            startY: 0
        }
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

    enemyId = `enemy_${enemyCounter++}`;
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
        canvas.height = firstAnim.frameHeight; // Hauteur fixe

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

function playAnimationEnemy(enemyId, animName, onComplete) {
    const enemy = enemies[enemyId];
    if (!enemy || !enemy.config[animName]) return;

    // Arrête l'animation en cours
    if (enemy.animationInterval) {
        clearInterval(enemy.animationInterval);
    }

    // Réinitialise l'animation
    enemy.currentFrame = 0;
    enemy.currentAnimation = animName;
    
    const animConfig = enemy.config[animName];
    const frameDuration = animName.includes('attack') ? 100 : 150;

    // Dessine la première frame immédiatement
    drawFrameEnemy(enemyId);

    // Configure la boucle d'animation
    enemy.animationInterval = setInterval(() => {
        enemy.currentFrame++;
        
        if (enemy.currentFrame >= animConfig.frameCount) {
            if (!animConfig.loop) {
                clearInterval(enemy.animationInterval);
                
                // Retour à l'idle après un délai pour les animations non-bouclées
                setTimeout(() => {
                    playAnimationEnemy(enemyId, 'idle');
                }, 200);
                
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

    let displayHeight = enemyTypes[enemy.type].displayHeight || animConfig.frameHeight || 64;
    let scaleFactor = displayHeight / animConfig.frameHeight;

    // Décalage personnalisé pour Sazantos
    let offsetX = 0;
    let offsetY = 0;
    if (enemy.type == 'Sazantos') {
        offsetX = 50;
        offsetY = 130;
    }

    enemy.ctx.drawImage(
        enemy.spriteSheet,
        enemy.currentFrame * animConfig.frameWidth,  // sx
        animConfig.startY,                           // sy
        animConfig.frameWidth,                       // sw
        animConfig.frameHeight,                      // sh
        offsetX,                                      // dx (on applique le décalage ici)
        offsetY,                                      // dy
        animConfig.frameWidth * scaleFactor,         // dw
        displayHeight                                 // dh
    );
}



// Tue un ennemi
function killEnemy(enemyId) {
    if (!enemies[enemyId]) return;

    const enemyType = enemies[enemyId].type;
    const deathAnim = enemyType === 'slime' ? 'death02' : 'death';
    
    playAnimationEnemy(enemyId, deathAnim, () => {
        removeEnemy(enemyId);
    });
}

// Supprime un ennemi
function removeEnemy(enemyId) {
    if (!enemies[enemyId]) return;

    const canvas = document.getElementById(`${enemyId}_canvas`);
    if (canvas) {
        canvas.remove();
    };
    
    delete enemies[enemyId];
}


loadResources();

window.addEventListener('load', initGame);
window.addEventListener('beforeunload', saveGame);


