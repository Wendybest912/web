
<?php require "header.php";?>


<?php


$userController = new UserController();
$users = $userController->readAllUser();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_user'])) {
    $userId = (int)$_POST['user_id'];
    $userController->deleteUser($userId);
    header("Location: admin.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestion Utilisateurs</title>
    <link rel="stylesheet" href="style_index.css">
</head>
<body>
    <h1>Gestion des Utilisateurs</h1>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
            <tr>
                <td><?= htmlspecialchars($user->getId()) ?></td>
                <td><?= htmlspecialchars($user->getUsername()) ?></td>
                <td><?= htmlspecialchars($user->getEmail()) ?></td>
                <td>
                    <form method="POST" onsubmit="return confirm('Supprimer cet utilisateur?');">
                        <input type="hidden" name="user_id" value="<?= $user->getId() ?>">
                        <button type="submit" name="delete_user">Supprimer</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>