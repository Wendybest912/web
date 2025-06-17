<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <!-- Métadonnées et liens CSS -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aetheria - RPG Épique</title>
    <link rel="stylesheet" href="style_index.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=MedievalSharp&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <?php
    // Démarrage de la session
    session_start();

    // Autoloader pour charger automatiquement les classes
    spl_autoload_register(function (string $className) {
        require "$className.php";
    });

    // Création du contrôleur utilisateur
    $userController = new UserController();
    ?>

    <!-- En-tête principal du site -->
    <header class="main-header">
        <div class="header-container">
            <!-- Logo du jeu -->
            <div class="logo">
                <i class="fas fa-dragon"></i>
                <span>Aetheria</span>
            </div>
            <!-- Navigation principale -->
            <nav class="main-nav" id="mainNav">
                <ul class="nav-list">
                    <li class="nav-item"><a href="index.php" class="nav-link active">Accueil</a></li>
                    <?php if (isset($_SESSION["email"]) && isset($_SESSION["username"])): ?>
                        <!-- Lien de déconnexion si utilisateur connecté -->
                        <li class="nav-item">
                            <a class="nav-link" href="./logout.php">Se déconnecter</a>
                        </li>
                    <?php else: ?>
                        <!-- Liens d'inscription/connexion si utilisateur non connecté -->
                        <li class="nav-item">
                            <a href="create.php" class="btn btn-primary">Inscription</a>
                        </li>
                        <li class="nav-item">
                            <a href="login.php" class="btn btn-login">Connexion</a>
                        </li>
                    <?php endif ?>
                </ul>
            </nav>
            <!-- Bouton menu mobile -->
            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <!-- Script pour le menu mobile -->
    <script>
        document.getElementById('mobileMenuBtn').addEventListener('click', function() {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
        });
    </script>
</body>