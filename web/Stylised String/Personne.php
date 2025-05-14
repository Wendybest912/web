<?php
    class Personne {
        private $lastName;
        private $firstName;
        private $age;


        public function __construct($lastName, $firstName, $age) {
            $this->setLastName($lastName) ;
            $this->setFirstName($firstName);
            $this->setAge($age) ;
        }


        public function getLastName() {
            return $this->lastName;
        }

        public function getFirstName() {
            return $this->firstName;
        }

        public function getAge() {
            return $this->age;
        }


        public function setLastName($lastName) {
            $this->lastName = $lastName;
        }

        public function setFirstName($firstName) {
            $this->firstName = $firstName;
        }

        public function setAge($age) {
            $this->age = $age;
        }

        public function vieillir(){
            return $this->setAge($this->getAge()+1);
        }

        public function afficher() {
            return "Nom: " . $this->getLastName(). 
                   ", Prénom: " . $this->getFirstName(). 
                   ", Age: " . $this->getAge();
        }
    }
?>