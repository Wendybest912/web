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

    public function createUser(User $user): void
    {
        $req = $this->db->prepare("INSERT INTO `user` (username, email, password) VALUES (:username, :email, :password)");

        $req->bindValue(":username", $user->getUsername(), PDO::PARAM_STR);
        $req->bindValue(":email", $user->getEmail(), PDO::PARAM_STR);
        $req->bindValue(":password", $user->getPassword(), PDO::PARAM_STR);

        $req->execute();
    }

    public function updateUser(): void {}

    public function deleteUser(int $id): void
    {
        $req = $this->db->prepare("DELETE FROM `user` WHERE id=:id");
        $req->bindValue(":id", $id, PDO::PARAM_INT);
        $req->execute();
    }

    public function readUser(): void {}


    public function readAllUser(): array
    {
        $users = [];
        $req = $this->db->prepare("SELECT * FROM `user` ORDER BY number");
        $req->execute();
        $datas = $req->fetchAll();
        foreach ($datas as $data) {
            $users[] = new User($data);
        }
        return $users;
    }

    public function getUserByEmail(string $email): User
    {
        $req = $this->db->prepare("SELECT * FROM `user` WHERE email = :email");
        $req->bindValue(":email", $email, PDO::PARAM_STR);
        $req->execute();
        $data = $req->fetch();
        return new User($data);
    }
}