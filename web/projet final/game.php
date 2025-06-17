<?php require "header.php";?>
<?php
if (!isset($_SESSION['email'])) {
    header("Location: login.php");
    exit();
}
?>

    
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
    <div id="game-over-screen" class="game-over-screen">
        <h2>GAME OVER</h2>
        <p>Vous avez atteint l'étage <span id="final-floor">1</span></p>
        <p>Votre record: <span id="final-record">1</span></p>
        <button id="restart-button">Recommencer</button>
    </div>
    <script>
    // Affiche les données de session en console (version sécurisée)
    const sessionData = <?php echo json_encode($_SESSION); ?>;
    console.log("Données de session:", sessionData);

    // Si vous voulez seulement l'ID
    console.log("ID Session:", <?php echo json_encode($_SESSION['user_id'] ?? null); ?>);
    </script>
    <div class="game-container">
        <!-- Barre de statut -->
        <div class="status-bar">
            <div class="player-info">
            <h2 id="player-name"><?php echo htmlspecialchars($_SESSION['username'] ?? ''); ?></h2>
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
            <div class="stats-container">
                <div class="stat-row">
                    <span>Attaque: <span id="player-attack">10</span></span>
                    <span>Armure: <span id="player-armor">0</span>%</span>
                </div>
                <div class="stat-row">
                    <span>Critique: <span id="player-crit-chance">5</span>%</span>
                    <span>Dégâts Crit: +<span id="player-crit-dmg">0</span>%</span>
                </div>
                <div class="stat-row">
                    <span>Esquive: <span id="player-esquive">5</span>%</span>
                </div>
                <div class="stat-row">
                    <span>Gold: <span id="player-gold">0</span></span>
                    <span>RECORD: <span id="player-record">0</span></span>
                </div>
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
                    </div>
                </div>
                

                <div class="character enemy-character">
                    <div id="enemies-container" ></div>
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
                    <h3 id="enemy-name"></h3>
                    <div class="health-bar">
                        <span>PV: <span id="enemy-hp"></span>/<span id="enemy-max-hp"></span></span>
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
            <button id="save-button" class="btn btn-save">
                <i class="fas fa-save"></i> Sauvegarder
            </button>
        </div>
    </div>


    <script>
        const sessionId = <?= json_encode($_SESSION['user_id']) ?>;
    </script>

    <script src="game.js"></script>
</body>
</html>