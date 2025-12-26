-- Database Schema for Atipe Computers

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Móvil', 'movil'),
(2, 'Ordenador', 'ordenador'),
(3, 'Consola', 'consola'),
(4, 'Accesorio', 'accesorio');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `originalPrice` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `brand` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Disponible',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `originalPrice`, `image`, `category_id`, `sku`, `stock`, `brand`, `status`) VALUES
(1, 'iPhone 11 64GB - Reacondicionado', 'Batería al 100%. Cristal impoluto. Incluye cargador.', 299.00, 350.00, 'iphone', 1, 'IP11-64R', 12, 'Apple', 'Disponible'),
(2, 'Portátil Gaming HP Omen', 'i7 10th Gen, 16GB RAM, RTX 2060. Perfecto estado.', 650.00, 899.00, 'laptop', 2, 'HP-OMEN-G', 5, 'HP', 'Disponible'),
(3, 'PS4 Slim 500GB + Mando', 'Limpieza interna recién hecha. Pasta térmica cambiada.', 180.00, 220.00, 'console', 3, 'PS4SLIM', 8, 'Sony', 'Disponible'),
(4, 'Monitor Dell 24\' IPS', 'Full HD, sin píxeles muertos. Peana ajustable.', 95.00, 140.00, 'monitor', 4, 'DELL-M24', 20, 'Dell', 'Disponible');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `device` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `urgency` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pendiente',
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `name`, `email`, `phone`, `device`, `description`, `urgency`, `status`, `date`) VALUES
(1, 'Manuel García', 'manuel@test.com', '600123456', 'iPad Air 4', 'Pantalla rota, no funciona el táctil en la esquina superior.', 'Normal', 'Pendiente', '2024-12-20'),
(2, 'Sofía Martín', 'sofia@test.com', '610987654', 'PC Sobremesa', 'Hace mucho ruido el ventilador y se apaga solo.', 'Urgente', 'Contactado', '2024-12-19');

COMMIT;
