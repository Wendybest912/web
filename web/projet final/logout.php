<?php
// Inclusion du header pour la cohérence de la page
require("header.php");

// Destruction complète de la session
session_destroy();
$_SESSION = [];
// Redirection vers la page d'accueil après déconnexion
echo "<script>window.location.href='index.php'</script>";