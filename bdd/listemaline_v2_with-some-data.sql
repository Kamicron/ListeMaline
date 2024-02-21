-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2024 at 07:03 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `listemaline`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Produit laitier'),
(2, 'Surgelé'),
(3, 'Fruits et légumes'),
(4, 'Boissons'),
(5, 'Viandes et Poissons'),
(6, 'Boulangerie'),
(7, 'Épicerie sucrée'),
(8, 'Épicerie salée'),
(9, 'Hygiène et beauté'),
(10, 'Entretien et ménage');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `user_id`) VALUES
(1, 'Frites', '2.85', 'Sachet de frites 1.5KG', 2, NULL),
(2, 'Lait', '1.25', 'Pack de 6 briques de laits', 1, NULL),
(3, 'Beurre', '1.50', 'Beurre doux en plaquette', 1, NULL),
(4, 'Yaourt nature', '0.80', 'Pack de 4 yaourts nature', 1, NULL),
(5, 'Fromage', '3.00', 'Pack de 6 tranches de fromage', 1, NULL),
(6, 'Pizza', '4.50', 'Pizza surgelée 4 fromages', 2, NULL),
(7, 'Lasagne', '2.85', 'Barquette de lasagne', 2, NULL),
(8, 'Nuggets de poulet', '3.20', 'Pack de 10 nuggets de poulet', 2, NULL),
(9, 'Poisson pané', '4.00', 'Pack de 6 poissons panés', 2, NULL),
(10, 'Glace vanille', '3.50', 'Pot de glace à la vanille', 2, NULL),
(11, 'Pommes', '1.50', 'Pack de 6 pommes', 3, NULL),
(12, 'Carottes', '1.00', 'Pack de 10 carottes', 3, NULL),
(13, 'Salade', '1.20', 'Pack de 2 salades', 3, NULL),
(14, 'Tomates', '1.80', 'Pack de 6 tomates', 3, NULL),
(15, 'Bananes', '2.50', 'Pack de 6 bananes', 3, NULL),
(16, 'Soda', '1.50', 'Pack de 6 canettes de soda', 4, NULL),
(17, 'Jus d orange', '2.00', 'Bouteille de 1L de jus d orange', 4, NULL),
(18, 'Eau minérale', '0.80', 'Pack de 6 bouteilles d eau minérale', 4, NULL),
(19, 'Vin rouge', '5.00', 'Bouteille de vin rouge', 4, NULL),
(20, 'Vin blanc', '5.00', 'Bouteille de vin blanc', 4, NULL),
(21, 'Steak de boeuf', '3.50', 'Pack de 4 steaks de boeuf', 5, NULL),
(22, 'Filet de saumon', '5.20', 'Filet de saumon frais', 5, NULL),
(23, 'Crevettes', '6.00', 'Pack de 10 crevettes', 5, NULL),
(24, 'Poulet', '4.50', 'Pack de 2 filets de poulet', 5, NULL),
(25, 'Saumon fumé', '7.00', 'Pack de 6 tranches de saumon fumé', 5, NULL),
(26, 'Baguette', '1.00', 'Baguette traditionnelle', 6, NULL),
(27, 'Croissant', '0.80', 'Pack de 4 croissants', 6, NULL),
(28, 'Pain de mie', '1.20', 'Pack de 10 tranches de pain de mie', 6, NULL),
(29, 'Pain complet', '1.50', 'Pack de 6 tranches de pain complet', 6, NULL),
(30, 'Pain aux céréales', '1.80', 'Pack de 4 tranches de pain aux céréales', 6, NULL),
(31, 'Chocolat', '2.50', 'Tablette de chocolat noir', 7, NULL),
(32, 'Bonbons', '1.00', 'Pack de 10 bonbons', 7, NULL),
(33, 'Gâteau', '3.00', 'Gâteau au chocolat', 7, NULL),
(34, 'Biscuits', '2.00', 'Pack de 12 biscuits', 7, NULL),
(35, 'Céréales', '2.50', 'Pack de 6 barres de céréales', 7, NULL),
(36, 'Chips', '1.50', 'Pack de chips', 8, NULL),
(37, 'Crackers', '1.20', 'Pack de crackers', 8, NULL),
(38, 'Olives', '2.00', 'Pack d olives vertes', 8, NULL),
(39, 'Saucisson', '3.50', 'Pack de saucisson sec', 8, NULL),
(40, 'Cacahuètes', '1.80', 'Pack de cacahuètes', 8, NULL),
(41, 'Shampooing', '4.00', 'Shampooing pour cheveux secs', 9, NULL),
(42, 'Gel douche', '3.50', 'Gel douche à la vanille', 9, NULL),
(43, 'Dentifrice', '2.00', 'Dentifrice blancheur', 9, NULL),
(44, 'Déodorant', '2.50', 'Déodorant à la fraîcheur marine', 9, NULL),
(45, 'Rasoir', '5.00', 'Rasoir pour peau sensible', 9, NULL),
(46, 'Lessive', '6.00', 'Lessive en poudre', 10, NULL),
(47, 'Adoucissant', '3.50', 'Adoucissant pour linge délicat', 10, NULL),
(48, 'Éponge', '1.00', 'Éponge pour vaisselle', 10, NULL),
(49, 'Nettoyant multi-surfaces', '2.50', 'Nettoyant pour toutes les surfaces', 10, NULL),
(50, 'Désodorisant', '4.00', 'Désodorisant pour maison', 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
