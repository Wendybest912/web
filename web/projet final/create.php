<?php require "header.php";?>

<?php
$error = null;
$userController = new UserController();

if ($_POST) {
    $email = $_POST['Email'];

    // Vérification plus robuste de l'existence de l'email
    if ($userController->emailExists($email)) {
        $error = "Cette adresse email est déjà utilisée.";
    } else {
        try {
            $_POST["Password"] = password_hash($_POST["Password"], PASSWORD_DEFAULT);
            $newUser = new User($_POST);
            $_SESSION["username"] = $newUser->getUsername();
            $_SESSION["email"] = $newUser->getEmail();
            $userController->createUser($newUser);
            header("Location: game.php");
            exit;
        } catch (Exception $e) {
            error_log("Erreur création compte: " . $e->getMessage());
            $error = "Une erreur technique est survenue. Veuillez réessayer plus tard.";
        }
    }
}
?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RPG Infini</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    
    <div class="game-container">
        <h1>RPG Tour par Tour Infini</h1>
        
        <div id="login-section" class="section">
            <h2>Créer un compte</h2>
            <form action="" method="post">
                <label for="Username">Username</label>
                <input type="Username" class="form-control" name="Username" id="Username" placeholder="Username" required min=1 max=1000>
                <label for="Email">Email</label>
                <input type="email" class="form-control" name="Email" id="Email" placeholder="Email" required minlength=3 max=20>
                <label for="Password">Password</label>
                <input type="password" class="form-control" name="Password" id="Password" placeholder="Password" minlength=3 max=100>
                <input type="submit" class="mt-2 btn btn-outline-success" value="Créer">
                <p>Deja un compte ? <a href="./login.php">Se connecter</a></p>
                <?php if ($error): ?>
                    <p style="color:red;"><?= htmlspecialchars($error) ?></p>
                <?php endif; ?>
                
            </form>
        </div>
    </div>
        

</body>

</html>

