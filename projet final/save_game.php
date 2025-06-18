<?php
// Désactiver l'affichage des erreurs pour le client
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers FIRST
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] ?? '*');
header('Access-Control-Allow-Credentials: true');

require_once 'UserController.php';

try {
    session_start();
    
    error_log("Session: " . print_r($_SESSION, true));
    error_log("Input: " . file_get_contents('php://input'));

    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Non authentifié', 401);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Données JSON invalides', 400);
    }

    if (empty($input['stats'])) {
        throw new Exception('Données manquantes', 400);
    }

    $controller = new UserController();
    $controller->updateCharacterStats($_SESSION['user_id'], $input['stats']);
    
    echo json_encode(['success' => true]);
    exit;

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