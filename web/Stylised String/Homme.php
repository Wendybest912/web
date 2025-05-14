<?php
    class Homme extends Personne{
        private $epouse;

        public function getEpouse(){
            return $this->epouse;
        }

        public function setEpouse(Femme $epouse) : void{
            $this->epouse = $epouse;
        }

        public function estCelibataire() : bool{
            return $this->getEpouse() === null;
        }

        public function marier(Femme $epouse) : void {
            if($this-> getEpouse() === null && $epouse->getEpoux() === null){
                $this->setEpouse($epouse);
                $epouse->setEpoux($this);
            }
        }

        public function afficher(){
            echo personne::afficher() . " ";
            if ($this->estCelibataire()){
                echo $this->getFirstName() ." est célibataire";
            }else {
                echo $this->getFirstName() ." est en couple";
            };
        }
    }
?>