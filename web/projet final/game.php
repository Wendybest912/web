
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aetheria - Jeu</title>
    <link rel="stylesheet" href="game.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=MedievalSharp&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="game-container">
        <!-- Barre de statut -->
        <div class="status-bar">
            <div class="player-info">
                <h2 id="player-name">Héros</h2>
                <div class="health-bar">
                    <span>PV: <span id="current-hp">100</span>/<span id="max-hp">100</span></span>
                    <div class="bar">
                        <div class="fill" id="hp-fill"></div>
                    </div>
                </div>
                <div class="level-info">
                    <span>Niveau: <span id="player-level">1</span></span>
                    <span>Étape: <span id="current-floor">1</span></span>
                </div>
                <div class="attack-info">
                    <span>Attaque: <span id="player-attack">10</span></span>
                </div>
            </div>
        </div>

        <div class="game-area">

            <div class="combat-characters">
                <div class="character player-character">
                    <div class="animation-container">
                        <div class="sprite-display-container">
                            <canvas id="player-canvas"></canvas>
                        </div>
                        
                        <!--
                        <div class="controls">
                            <button class="anim-btn" data-anim="idle">Idle</button>
                            <button class="anim-btn" data-anim="attack01">Attack</button>
                            <button class="anim-btn" data-anim="death">Death</button>
                            <button class="anim-btn" data-anim="hurt">Hurt</button>
                            <button class="anim-btn" data-anim="walk">Walk</button>
                        </div>
                        -->
                    </div>
                </div>
                

                <div class="character enemy-character">
                    <canvas id="enemy-canvas" width="200" height="200"></canvas>
                </div>
            </div>
            

            <div class="background" id="game-background"></div>
            
            <div class="event-container" id="event-container">
                <div class="welcome-message">
                    <h2>Bienvenue dans les Donjons d'Aetheria</h2>
                    <p>Préparez-vous à affronter des dangers et découvrir des trésors!</p>
                    <button id="start-button" class="btn btn-primary">Commencer l'aventure</button>
                </div>
            </div>

            <div class="combat-interface" id="combat-interface">
                <div class="enemy-info">
                    <h3 id="enemy-name">Gobelin</h3>
                    <div class="health-bar">
                        <span>PV: <span id="enemy-hp">30</span>/<span id="enemy-max-hp">30</span></span>
                        <div class="bar">
                            <div class="fill" id="enemy-hp-fill"></div>
                        </div>
                    </div>
                </div>
                
                <div class="combat-actions">
                    <button id="attack-btn" class="btn btn-combat" class="anim-btn" data-anim="attack01">
                        <i class="fas fa-sword"></i> Attaquer
                    </button>
                    <button id="special-btn" class="btn btn-combat">
                        <i class="fas fa-fire"></i> Attaque Spéciale
                    </button>
                </div>
                
                <div class="combat-log" id="combat-log"></div>
            </div>

            <button id="next-floor-btn" class="btn btn-next-floor">
                <i class="fas fa-arrow-right"></i> Aller à l'étape suivante
            </button>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>