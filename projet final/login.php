<?php require "header.php";?>

<?php
// Initialisation des variables
$errorMessage = "";
// Traitement du formulaire de connexion
if ($_POST) {
    $user = $userController->getUserByEmail($_POST["email"]);
    // Cas particulier pour l'admin
    if ($_POST['email'] == "admin@admin"){
        if ($user && password_verify($_POST["password"], $user->getPassword())) {
            // Création de la session admin
            $_SESSION["email"] = $user->getEmail();
            $_SESSION["username"] = $user->getUsername();
            $_SESSION['user_id'] = $user->getId();
            echo "<script>console.log(" . json_encode($_SESSION["user_id"]) . ");</script>";
            // Redirection vers l'admin
            echo "<script>window.location.href='admin.php'</script>";
        }
    }
    // Cas normal de connexion
    else if ($user && password_verify($_POST["password"], $user->getPassword())) {
        // Création de la session utilisateur
        $_SESSION["email"] = $user->getEmail();
        $_SESSION["username"] = $user->getUsername();
        $_SESSION['user_id'] = $user->getId();
        echo "<script>console.log(" . json_encode($_SESSION["user_id"]) . ");</script>";
        // Redirection vers le jeu
        echo "<script>window.location.href='game.php'</script>";
    }else {
        // Gestion des erreurs
        $errorMessage = "Adresse e-mail incorrecte ou non enregistrée.";
        // Compteur d'erreurs
        if (!isset($_SESSION['login_error_count'])) {
            $_SESSION['login_error_count'] = 0;
        }
        $_SESSION['login_error_count']++;
        $errorCount = $_SESSION['login_error_count'];
    }
}
?>

<link rel="stylesheet" href="style.css">
<div class="game-container">
    <h2>se connecter</h2>

    <?php if ($errorMessage): ?>
        <div class="error-message">
            <?= htmlspecialchars($errorMessage) ?>
        </div>
    <?php endif; ?>
            
    <!-- Formulaire de connexion -->
    <form method="post" class="container mt-2">
        <label for="email">E-mail</label>
        <input type="email" class="form-control" name="email" id="email" placeholder="Votre adresse e-mail" required>
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" name="password" id="password" placeholder="Votre mot de passe" required>

        <input type="submit" class="mt-2 btn btn-outline-success" value="Se connecter">
        <p>Pas de compte ? <a href="./create.php">Creer un compte</a></p>
    </form>
</div>

<!-- Chat animé qui apparaît après plusieurs erreurs -->
<div id="sliding-cat" style="position: fixed; top: 10px; left: -200px; z-index: 1001; font-size: 1.2rem; background: #f0f0f0; padding: 10px; border-radius: 8px; box-shadow: 0 0 8px rgba(0,0,0,0.3); display: none; color: black">
    🐱 Miaou... t'as besoin d'aide ? Miaou... Bah alors t'a oublié tes identifiants ? 😺
</div>

<script>
// Animation du chat après 3 erreurs
let errorCount = <?= $errorCount ?>;
if (errorCount >= 3) {
    const cat = document.getElementById('sliding-cat');
    cat.style.display = "block";

    let pos = -200;
    const interval = setInterval(() => {
        if (pos >= window.innerWidth) {
            clearInterval(interval);
            cat.style.display = "none";
        } else {
            cat.style.left = pos + 'px';
            pos += 5;
        }
    }, 20);
}
</script>