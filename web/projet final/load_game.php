<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'UserController.php';
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Credentials: true');

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Non authentifié', 401);
    }

    $controller = new UserController();
    $gameData = $controller->loadGameProgress($_SESSION['user_id']);
    
    echo json_encode([
        'success' => true,
        'player' => $gameData['player']
    ]);
} catch (Exception $e) {
    // Utilisez un code d'erreur HTTP par défaut si le code d'exception n'est pas valide
    $httpCode = is_int($e->getCode()) && $e->getCode() >= 100 && $e->getCode() < 600 
        ? $e->getCode() 
        : 500; // 500 = Internal Server Error
    
    http_response_code($httpCode);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_details' => $e->getCode() // Optionnel: pour le débogage
    ]);
    exit;
}