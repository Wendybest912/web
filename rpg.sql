-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 18 juin 2025 à 10:54
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rpg`
--

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `level` int DEFAULT '1',
  `experience` int DEFAULT '0',
  `health` int DEFAULT '100',
  `max_hp` int DEFAULT '100',
  `armor` int DEFAULT '0',
  `gold` int DEFAULT '0',
  `crit_chance` int DEFAULT '5',
  `crit_dmg` int DEFAULT '0',
  `esquive` int DEFAULT '5',
  `floor` int DEFAULT '1',
  `cooldown_special` int DEFAULT '0',
  `attack` int DEFAULT '10',
  `record` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `characters`
--

INSERT INTO `characters` (`id`, `user_id`, `name`, `level`, `experience`, `health`, `max_hp`, `armor`, `gold`, `crit_chance`, `crit_dmg`, `esquive`, `floor`, `cooldown_special`, `attack`, `record`) VALUES
(14, 22, 'LIN', 1, 0, 100, 100, 0, 0, 5, 0, 5, 1, 0, 10, 0),
(16, 24, 'test3', 1, 0, 100, 100, 0, 0, 5, 0, 5, 1, 0, 10, 0),
(12, 20, 'webpres', 1, 0, 100, 100, 0, 0, 5, 0, 5, 1, 0, 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(18, 'admin', 'admin@admin', '$2y$10$YPn6nw6udQGVRWqVkWS95.FHlXHjb7V8n8NsJfS/Mu8gtJ7foCuEi'),
(24, 'test3', 'test3@test3', '$2y$10$rRiji0rlLW0624.y8LzsUuibx10Zct2scNGo4KkVOzXIUgW.tTgTS'),
(20, 'webpres', 'web@web', '$2y$10$8IatxN0kbcdzJVgDDhsUkuoR7WpL0U1f8E3PEfpIkNQ32yzbKeDaC'),
(22, 'LIN', 'filofilorial@gmail', '$2y$10$aGG1TPYOos1UyaSSW9qVzOTN0P6WC3H2Wmf4mjpFBAc/P.Cvn6qHa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
