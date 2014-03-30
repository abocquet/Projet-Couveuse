-- phpMyAdmin SQL Dump
-- version 4.1.8
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Ven 28 Mars 2014 à 20:38
-- Version du serveur :  5.5.34
-- Version de PHP :  5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `ppe`
--

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jour` int(11) NOT NULL,
  `cycle` int(11) NOT NULL,
  `temperature` int(11) NOT NULL,
  `humidite` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `data`
--

INSERT INTO `data` (`id`, `jour`, `cycle`, `temperature`, `humidite`, `date`) VALUES
(1, 1, 1, 12, 80, '2014-03-28 19:01:47'),
(2, 2, 1, 13, 78, '2014-03-28 19:01:47'),
(3, 3, 1, 24, 89, '2014-03-28 19:21:42'),
(4, 4, 1, 18, 84, '2014-03-28 19:21:42');
