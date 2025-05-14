<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aetheria - RPG Épique</title>
    <link rel="stylesheet" href="style_index.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=MedievalSharp&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Fond animé -->
    <div class="particles-container" id="particles"></div>
    <div class="overlay"></div>

    <!-- Navigation -->
    <header class="main-header">
        <div class="header-container">
            <div class="logo">
                <i class="fas fa-dragon"></i>
                <span>Aetheria</span>
            </div>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="nav-item"><a href="#home" class="nav-link active">Accueil</a></li>
                    <li class="nav-item"><a href="#features" class="nav-link">Caractéristiques</a></li>
                    <li class="nav-item"><a href="#gallery" class="nav-link">Galerie</a></li>
                    <li class="nav-item"><a href="#community" class="nav-link">Communauté</a></li>
                    <div class="auth-buttons">
                        <a href="login.html" class="btn btn-login">Connexion</a>
                        <a href="register.html" class="btn btn-primary">Inscription</a>
                    </div>
                </ul>
            </nav>
            <button class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content">
            <h1 class="hero-title">Votre Légende Vous Attend</h1>
            <p class="hero-subtitle">Plongez dans un monde fantastique peuplé de créatures mythiques et d'aventures épiques</p>
            <div class="hero-cta">
                <a href="register.html" class="btn btn-primary btn-large">Commencer l'Aventure</a>
                <a href="#features" class="btn btn-outline">Découvrir</a>
            </div>
        </div>
        <div class="hero-illustration">
            <img src="assets/images/hero-character.png" alt="Héros RPG" class="hero-image">
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="section-header">
            <h2 class="section-title">Un Monde à Explorer</h2>
            <p class="section-subtitle">Découvrez les merveilles d'Aetheria</p>
        </div>
        <div class="features-grid">
            <!-- Feature 1 -->
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-swords"></i>
                </div>
                <h3 class="feature-title">Combats Tactiques</h3>
                <p class="feature-desc">Système de combat stratégique au tour par tour avec des centaines de compétences à maîtriser.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <h3 class="feature-title">Monde Vivant</h3>
                <p class="feature-desc">Explorez des royaumes vastes avec des villes animées et des donjons périlleux.</p>
            </div>
            
            <!-- Feature 3 -->
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3 class="feature-title">Aventures Multi-joueurs</h3>
                <p class="feature-desc">Formez des guildes et affrontez des raids épiques avec vos amis.</p>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
        <div class="cta-content">
            <h2 class="cta-title">Prêt à Forger Votre Destin?</h2>
            <p class="cta-text">Rejoignez des milliers d'aventuriers dans l'expérience RPG ultime</p>
            <a href="register.html" class="btn btn-primary btn-cta">Jouer Gratuitement</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-logo">
                <i class="fas fa-dragon"></i>
                <span>Aetheria</span>
            </div>
            <div class="footer-links">
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

    <script src="scripts.js"></script>
</body>
</html>