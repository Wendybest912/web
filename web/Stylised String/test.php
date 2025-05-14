<?php
    spl_autoload_register(function ($class) {
    require_once $class . '.php';
    });

    $jean = new Homme("Jean", "Dupont", 30);
    $marie = new Femme("Marie", "Martin", 28);

    echo "Avant mariage:<br>";
    $jean->afficher(); echo "<br>";
    $marie->afficher(); echo "<br><br>";

    // Mariage
    $jean->marier($marie);

    echo "Après mariage:<br>";
    $jean->afficher(); echo "<br>";
    $marie->afficher(); echo "<br><br>";

    // Vieillissement
    $jean->vieillir();
    $marie->vieillir();

    echo "Après vieillissement:<br>";
    echo $jean->afficher(); echo "<br>";
    echo $marie->afficher(); echo "<br>";
?>