<?php require "header.php";?> <!-- Inclusion du fichier d'en-tête, probablement pour le menu/navigation -->

<?php
// Création d'une instance du contrôleur utilisateur
$userController = new UserController();

// Récupération de tous les utilisateurs depuis la base de données
$users = $userController->readAllUser();

// Vérifie si une requête POST a été envoyée et si le bouton "delete_user" a été cliqué
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_user'])) {
    // Récupère l'identifiant de l'utilisateur à supprimer depuis le formulaire
    $userId = (int)$_POST['user_id'];
    
    // Appelle la méthode de suppression dans le contrôleur
    $userController->deleteUser($userId);
    
    // Redirige vers la page admin après la suppression pour éviter le re-post du formulaire
    header("Location: admin.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestion Utilisateurs</title> <!-- Titre de la page -->
    <link rel="stylesheet" href="style_index.css"> <!-- Lien vers la feuille de style -->
</head>
<body>
    <h1>Gestion des Utilisateurs</h1> <!-- Titre principal de la page -->

    <table>
        <thead>
            <tr>
                <th>ID</th> <!-- Colonne pour l'identifiant de l'utilisateur -->
                <th>Username</th> <!-- Colonne pour le nom d'utilisateur -->
                <th>Email</th> <!-- Colonne pour l'email -->
                <th>Actions</th> <!-- Colonne pour les actions disponibles (ex: suppression) -->
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?> <!-- Boucle sur tous les utilisateurs -->
            <tr>
                <!-- Affiche les données de l'utilisateur en échappant les caractères spéciaux pour éviter les failles XSS -->
                <td><?= htmlspecialchars($user->getId()) ?></td>
                <td><?= htmlspecialchars($user->getUsername()) ?></td>
                <td><?= htmlspecialchars($user->getEmail()) ?></td>
                <td>
                    <!-- Formulaire pour supprimer un utilisateur -->
                    <form method="POST" onsubmit="return confirm('Supprimer cet utilisateur?');">
                        <!-- Champ caché contenant l'ID de l'utilisateur -->
                        <input type="hidden" name="user_id" value="<?= $user->getId() ?>">
                        <!-- Bouton de soumission pour supprimer l'utilisateur -->
                        <button type="submit" name="delete_user">Supprimer</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?> <!-- Fin de la boucle des utilisateurs -->
        </tbody>
    </table>
</body>
</html>
