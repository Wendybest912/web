<?php require "header.php";?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Métadonnées et liens CSS -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aetheria - RPG Épique</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=MedievalSharp&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Section héros avec bouton CTA -->
    <section class="hero" id="home">
        <div class="hero-content">
            <h1 class="hero-title">Votre Légende Vous Attend</h1>
            <p class="hero-subtitle">Plongez dans un monde fantastique peuplé de créatures mythiques et d'aventures épiques</p>
            <div class="hero-cta">
                <a href="game.php" class="btn btn-primary btn-large">Commencer l'Aventure</a>
            </div>
        </div>
    </section>

    <!-- Section caractéristiques du jeu -->
    <section class="features" id="features">
        <div class="section-header">
            <h2 class="section-title">Un Monde à Explorer</h2>
            <p class="section-subtitle">Découvrez les merveilles d'Aetheria</p>
        </div>
        <div class="features-grid">
            <!-- Carte caractéristique 1 -->
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-swords"></i></div>
                <h3 class="feature-title">Combats Tactiques</h3>
                <p class="feature-desc">Système de combat stratégique au tour par tour avec des centaines de compétences à maîtriser.</p>
            </div>
            
            <!-- Carte caractéristique 2 -->
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-map-marked-alt"></i></div>
                <h3 class="feature-title">Monde Vivant</h3>
                <p class="feature-desc">Explorez des royaumes vastes avec des villes animées et des donjons périlleux.</p>
            </div>
        </div>
    </section>

    <!-- Section d'appel à l'action -->
    <section class="cta-section">
        <div class="cta-content">
            <h2 class="cta-title">Prêt à Forger Votre Destin?</h2>
            <p class="cta-text">Rejoignez des milliers d'aventuriers dans l'expérience RPG ultime</p>
            <a href="create.php" class="btn btn-primary btn-cta">Jouer Gratuitement</a>
        </div>
    </section>

    <!-- Pied de page -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-logo">
                <i class="fas fa-dragon"></i>
                <span>Aetheria</span>
            </div>
            <div class="footer-links">
                <!-- Liens vers différentes sections -->
                <div class="link-group">
                    <h4 class="link-title">Jeu</h4>
                    <a href="#" class="footer-link">Télécharger</a>
                    <a href="#" class="footer-link">Classes</a>
                    <a href="#" class="footer-link">Races</a>
                </div>
                <div class="link-group">
                    <h4 class="link-title">Communauté</h4>
                    <a href="#" class="footer-link">Forums</a>
                    <a href="#" class="footer-link">Guides</a>
                    <a href="#" class="footer-link">Événements</a>
                </div>
                <div class="link-group">
                    <h4 class="link-title">Support</h4>
                    <a href="#" class="footer-link">Aide</a>
                    <a href="#" class="footer-link">FAQ</a>
                    <a href="#" class="footer-link">Contact</a>
                </div>
            </div>
            <div class="social-links">
                <!-- Liens vers les réseaux sociaux -->
                <a href="#" class="social-icon"><i class="fab fa-discord"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitch"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="copyright">© 2023 Aetheria RPG. Tous droits réservés.</p>
        </div>
    </footer>
</body>
</html>