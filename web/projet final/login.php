<?php require "header.php";?>

<?php

if ($_POST) {
    $user = $userController->getUserByEmail($_POST["email"]);
    if ($user && password_verify($_POST["password"], $user->getPassword())) {
        $_SESSION["email"] = $user->getEmail();
        $_SESSION["username"] = $user->getUsername();
        echo "<script>window.location.href='game.php'</script>";
    }else {
        echo "identifients érroné";
    }
}

?>
<link rel="stylesheet" href="style.css">
<div class="game-container">
    <h2>se connecter</h2>
    <form method="post" class="container mt-2">
        <label for="email">E-mail</label>
        <input type="email" class="form-control" name="email" id="email" placeholder="Votre adresse e-mail" required>
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" name="password" id="password" placeholder="Votre mot de passe" required>

        <input type="submit" class="mt-2 btn btn-outline-success" value="Se connecter">
    </form>
</div>

