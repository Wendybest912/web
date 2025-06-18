<?php

class UserController
{
    private PDO $db; // Instance de PDO

    public function __construct()
    {
        // Connexion à la BDD
        $host = "localhost";
        $dbName = "rpg";
        $port = 3306;
        $userName = "root";
        $password = "";
        try {
            $this->setDb(new PDO("mysql:host=$host;dbname=$dbName;port=$port;charset=utf8mb4", $userName, $password));
            //echo "Connexion réussie !";
        } catch (PDOException $error) {
            echo "<p style='color:red'>{$error->getMessage()}</p>";
        }
    }

    public function setDb(PDO $db): void
    {
        $this->db = $db;
    }

    public function createCharacter(int $userId, string $name): void
    {
        $req = $this->db->prepare("
            INSERT INTO characters (user_id, name) 
            VALUES (:userid, :name)
        ");
        $req->bindValue(":userid", $userId, PDO::PARAM_INT);
        $req->bindValue(":name", $name, PDO::PARAM_STR);

        $req->execute();
    }

    public function createUser(User $user): void
    {
        $emailVerification = $this->db->prepare("SELECT id FROM user WHERE email = :email");
        $emailVerification->bindValue(":email", $user->getEmail(), PDO::PARAM_STR);
        $emailVerification->execute();

        if ($emailVerification->rowCount() > 0) {
            echo '<script>console.log("Message dans la console depuis PHP !");</script>';
        } else {
            $req = $this->db->prepare("INSERT INTO `user` (username, email, password) VALUES (:username, :email, :password)");

            $req->bindValue(":username", htmlspecialchars($user->getUsername()), PDO::PARAM_STR);
            $req->bindValue(":email", htmlspecialchars($user->getEmail()), PDO::PARAM_STR);
            $req->bindValue(":password", htmlspecialchars($user->getPassword()), PDO::PARAM_STR);

            $req->execute();

            $userId = $this->db->lastInsertId();

            $this->createCharacter($userId, $user->getUsername());
        }
        
    }

   public function updateCharacterStats(int $userId, array $stats): void
{
    $req = $this->db->prepare("
        UPDATE characters SET 
            health = :health,
            max_hp = :max_hp,
            attack = :attack,
            armor = :armor,
            crit_chance = :crit_chance,
            crit_dmg = :crit_dmg,
            esquive = :esquive,
            gold = :gold,
            cooldown_special = :special_cooldown,
            level = :level,
            floor = :floor,
            experience = :experience,
            record = :record
        WHERE user_id = :user_id
    ");

    $req->bindValue(':health',htmlspecialchars($stats['hp']), PDO::PARAM_INT);
    $req->bindValue(':max_hp', htmlspecialchars($stats['maxHp']), PDO::PARAM_INT);
    $req->bindValue(':attack', htmlspecialchars($stats['attack']), PDO::PARAM_INT);
    $req->bindValue(':armor', htmlspecialchars($stats['armor']), PDO::PARAM_INT);
    $req->bindValue(':crit_chance', htmlspecialchars($stats['critChance']), PDO::PARAM_INT); 
    $req->bindValue(':crit_dmg', htmlspecialchars($stats['critDmg']), PDO::PARAM_INT);
    $req->bindValue(':esquive', htmlspecialchars($stats['esquive']), PDO::PARAM_INT);
    $req->bindValue(':gold', htmlspecialchars($stats['gold']), PDO::PARAM_INT);
    $req->bindValue(':special_cooldown', htmlspecialchars($stats['specialCooldown']), PDO::PARAM_INT);
    $req->bindValue(':level', htmlspecialchars($stats['level']), PDO::PARAM_INT);
    $req->bindValue(':floor', htmlspecialchars($stats['floor']), PDO::PARAM_INT);
    $req->bindValue(':experience', htmlspecialchars($stats['experience']), PDO::PARAM_INT);
    $req->bindValue(':record', htmlspecialchars($stats['record']), PDO::PARAM_INT);
    $req->bindValue(':user_id', htmlspecialchars($userId), PDO::PARAM_INT);

    $req->execute();
}


   public function loadGameProgress(int $userId): array
{
    $req = $this->db->prepare("
        SELECT 
            name, health AS hp, max_hp AS maxHp, attack, 
            armor, crit_chance AS critChance, crit_dmg AS critDmg,
            esquive, gold, cooldown_special AS specialCooldown,
            level, floor, record
        FROM characters 
        WHERE user_id = :user_id
    ");

    $req->bindValue(':user_id', htmlspecialchars($userId), PDO::PARAM_INT);
    $req->execute();

    $character = $req->fetch(PDO::FETCH_ASSOC);

    if (!$character) {
        throw new Exception("Personnage non trouvé");
    }

    return [
        'player' => $character
    ];
}


    public function emailExists(string $email): bool
    {
        $stmt = $this->db->prepare("SELECT id FROM user WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->rowCount() > 0;
    }


    public function deleteUser(int $id): void
    {
        $req = $this->db->prepare("DELETE FROM `user` WHERE id=:id");
        $req->bindValue(":id", $id, PDO::PARAM_INT);
        $req->execute();

        $req = $this->db->prepare("DELETE FROM `characters` WHERE user_id=:id");
        $req->bindValue(":id", $id, PDO::PARAM_INT);
        $req->execute();
    }

    public function readUser(): void {}


    public function readAllUser(): array
    {
        $users = [];
        $req = $this->db->prepare("SELECT * FROM `user` ORDER BY id");
        $req->execute();
        $datas = $req->fetchAll();
        foreach ($datas as $data) {
            $users[] = new User($data);
        }
        return $users;
    }

    public function getUserByEmail(string $email): ?User
    {
        $req = $this->db->prepare("SELECT * FROM `user` WHERE email = :email");
        $req->bindValue(":email", $email, PDO::PARAM_STR);
        $req->execute();

        $data = $req->fetch(PDO::FETCH_ASSOC); 

        if (!$data) {
            return null; 
        }

        return new User($data); 
    }

}