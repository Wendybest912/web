<?php

class Person {
    private $lastName;
    private $firstName;
    private $address;


    public function __construct($lastName, $firstName, $address) {
        $this->setLastName($lastName) ;
        $this->setFirstName($firstName);
        $this->setAddress($address) ;
    }


    public function getLastName() {
        return $this->lastName;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function getAddress() {
        return $this->address;
    }


    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

   
    public function getPersonU() {
        return "Nom: " . $this->getLastName(). 
               ", Prénom: " . $this->getFirstName(). 
               ", Adresse: " . $this->getAddress();
    }
}


$person = new Person("Dupont", "Jean", "123 Rue de Paris");


echo $person->getLastName() . "<br>";   
echo $person->getFirstName() . "<br>";  
echo $person->getAddress() . "<br>";    


$person->setLastName("Martin");
$person->setFirstName("Sophie");
$person->setAddress("456 Avenue des Champs");


echo $person->getPersonU(); 

?>