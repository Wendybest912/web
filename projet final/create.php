<?php require "header.php";?> <!-- Inclusion du fichier header.php, probablement pour les entêtes HTML ou la navigation -->

<?php
$error = null; // Initialisation de la variable d'erreur
$userController = new UserController(); // Création d'une instance du contrôleur utilisateur

// Vérifie si le formulaire a été soumis via POST
if ($_POST) {
    $email = $_POST['Email'];

    // Vérifie si l'email est déjà utilisé en appelant la méthode du contrôleur
    if ($userController->emailExists($email)) {
        $error = "Cette adresse email est déjà utilisée."; // Message d'erreur si email déjà présent
    } else {
        try {
            // Hashage du mot de passe pour la sécurité
            $_POST["Password"] = password_hash($_POST["Password"], PASSWORD_DEFAULT);

            // Création d'un nouvel utilisateur avec les données du formulaire
            $newUser = new User($_POST);

            // Enregistrement des données utilisateur dans la session
            $_SESSION["username"] = $newUser->getUsername();
            $_SESSION["email"] = $newUser->getEmail();

            // Appel de la méthode du contrôleur pour enregistrer l'utilisateur
            $userController->createUser($newUser);

            // Redirection vers la page de jeu après la création du compte
            header("Location: game.php");
            exit;
        } catch (Exception $e) {
            // Log en cas d'erreur technique
            error_log("Erreur création compte: " . $e->getMessage());
            $error = "Une erreur technique est survenue. Veuillez réessayer plus tard."; // Message d'erreur générique
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"> <!-- Définition de l'encodage -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive design -->
    <title>RPG Infini</title> <!-- Titre de la page -->
    <link rel="stylesheet" href="style.css"> <!-- Lien vers la feuille de style -->
</head>
<body>

    <div class="game-container"> <!-- Conteneur principal -->
        <h1>RPG Tour par Tour Infini</h1> <!-- Titre principal -->

        <div id="login-section" class="section"> <!-- Section pour le formulaire de création de compte -->
            <h2>Créer un compte</h2>
            <form action="" method="post"> <!-- Formulaire envoyé à la même page via POST -->

                <!-- Champ pour le nom d'utilisateur -->
                <label for="Username">Username</label>
                <input type="Username" class="form-control" name="Username" id="Username" placeholder="Username" required min=1 max=1000>

                <!-- Champ pour l'email -->
                <label for="Email">Email</label>
                <input type="email" class="form-control" name="Email" id="Email" placeholder="Email" required minlength=3 max=20>

                <!-- Champ pour le mot de passe -->
                <label for="Password">Password</label>
                <input type="password" class="form-control" name="Password" id="Password" placeholder="Password" minlength=3 max=100>

                <!-- Bouton de soumission -->
                <input type="submit" class="mt-2 btn btn-outline-success" value="Créer">

                <!-- Lien vers la page de connexion -->
                <p>Deja un compte ? <a href="./login.php">Se connecter</a></p>

                <!-- Affichage du message d'erreur s'il y en a un -->
                <?php if ($error): ?>
                    <p style="color:red;"><?= htmlspecialchars($error) ?></p>
                <?php endif; ?>

            </form>
        </div>
    </div>

</body>
</html>
