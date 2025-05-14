<?php
    class City {
        private $name;
        private $departement;

        public function __construct(string $name, string $departement) {
            $this->setName($name);
            $this->setDepartement($departement);
        }

        public function setName($newName){
            $this->name = $newName;
        }

        public function setDepartement($newDepartement){
            $this->departement = $newDepartement;
        }

        public function getName(){
            return $this->name;
        }

        public function getDepartement(){
            return $this->departement;
        }

        public function print(){
            echo "la ville " . $this->getName() . " est dans le département " . $this->getDepartement();
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $ville1 = new City("Versaille", "Chine");

        $ville1->print();
    ?>
</body>
</html>