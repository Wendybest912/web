<?php
    class Femme extends Personne{
        private $epoux;

        public function getEpoux(){
            return $this->epoux;
        }

        public function setEpoux(Homme $epoux) : void{
            $this->epoux = $epoux;
        }

        public function estCelibataire() : bool{
            return $this->getEpoux() === null;
        }

        public function marier(Homme $epoux) : void {
            if($this-> getEpoux() === null && $epoux->getEpouse() === null){
                $this->setEpoux($epoux);
                $epoux->setEpouse($this);
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
