
<!DOCTYPE html>
<html lang="fr-FR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RPG</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    session_start();

    spl_autoload_register(function (string $className) {
        require "$className.php";
    });



    $userController = new UserController();

    ?>

    <div id="topbar">
        <nav>
            <ul>
                <li><a href="index.php">Accueil</a></li>
                <?php if ($_SESSION && $_SESSION["email"] && $_SESSION["username"]): ?>
                        <li class="nav-item">
                            <a class="nav-link" href="./logout.php">Se déconnecter</a>
                        </li>
                    <?php else: ?>
                        <li class="nav-item">
                            <a class="nav-link" href="./create.php">S'inscrire</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./login.php">Se connecter</a>
                        </li>
                    <?php endif ?>
            </ul>
        </nav>
    </div>

</body>