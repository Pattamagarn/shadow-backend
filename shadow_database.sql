-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2024 at 10:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shadow_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `email` varchar(3072) NOT NULL,
  `username` longtext NOT NULL,
  `avatar` longtext NOT NULL,
  `suspended_status` tinyint(1) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `gacha_count` bigint(20) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`email`, `username`, `avatar`, `suspended_status`, `role`, `gacha_count`, `create_at`, `update_at`) VALUES
('foxteary@gmail.com', 'Nutsang', 'bb09e76d-48f5-4f6b-bf7c-06dbe5c803611708018412311898819761.png', 0, 0, 0, '2024-02-15 21:44:21', '0000-00-00 00:00:00'),
('sponser@gmail.com', 'Sponser', 's.png', 0, 0, 0, '2024-02-15 22:47:22', '2024-02-15 22:47:22'),
('voraprot.s@ku.th', 'Nutsang', 'afca43ef-6f05-4b37-956e-141eded3d3841708017718564228053639.png', 0, 0, 0, '2024-02-15 16:14:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `auction_product`
--

CREATE TABLE `auction_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `default_price` double NOT NULL,
  `default_bid` double NOT NULL,
  `auction_status` tinyint(1) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `end_time` datetime NOT NULL DEFAULT current_timestamp(),
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `latest_bidder` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `uuid` varchar(3072) NOT NULL,
  `information` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`uuid`, `information`, `create_at`, `update_at`) VALUES
('68cf8646-4e9f-4f5e-b557-6258bab5cb41', 'e0785db1-2f4a-432c-9707-d10f471d84f81708031529698545174056.png', '2024-02-16 03:58:05', '0000-00-00 00:00:00'),
('7aca0b17-bf6c-4c08-bb08-8848392adbb7', '9d92272b-a35d-4666-b526-72d45f4161ad1708030686071259807211.png', '2024-02-16 03:58:06', '2024-02-16 03:58:06'),
('b50b8378-fa69-4f17-891b-6ded0fbc6dd3', '1b37e74b-b265-4528-923a-e5681f775db21708030665345124846114.png', '2024-02-16 03:57:45', '2024-02-16 03:57:45'),
('ba7b34ff-3e2a-45da-81dd-7343387572a2', 'cfbec528-66a4-47f9-966c-de210e4d84171708030684789381822422.png', '2024-02-16 03:58:04', '2024-02-16 03:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `email` varchar(3072) NOT NULL,
  `cash_amount` double NOT NULL,
  `aysel_amount` double NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `finance`
--

INSERT INTO `finance` (`email`, `cash_amount`, `aysel_amount`, `create_at`, `update_at`) VALUES
('foxteary@gmail.com', 0, 0, '2024-02-15 21:44:21', '2024-02-15 21:44:21'),
('sponser@gmail.com', 0, 0, '2024-02-15 22:47:22', '2024-02-15 22:47:22'),
('voraprot.s@ku.th', 200, 200, '2024-02-15 16:14:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `gacha_product`
--

CREATE TABLE `gacha_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `chance` double NOT NULL,
  `guarantee_status` tinyint(1) NOT NULL,
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game_name`
--

CREATE TABLE `game_name` (
  `uuid` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `general_product`
--

CREATE TABLE `general_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `normal_price` double NOT NULL,
  `special_price` double NOT NULL,
  `special_price_status` tinyint(1) NOT NULL,
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_payment`
--

CREATE TABLE `history_payment` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `aysel_amount` double NOT NULL,
  `cash_amount` double NOT NULL,
  `payment_status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_product`
--

CREATE TABLE `history_product` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `product_name` longtext NOT NULL,
  `product_price` double NOT NULL,
  `buy_method` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `uuid` varchar(3072) NOT NULL,
  `method` longtext NOT NULL,
  `information` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`uuid`, `method`, `information`, `create_at`, `update_at`) VALUES
('68fdb45f-e504-48ef-9c58-ba6ed8cc5fc6', 'วิดีโอ', 'https://youtu.be/6eEAHM00IOE?si=OA9aJ9JERS1hDNQW', '2024-02-16 01:39:17', '0000-00-00 00:00:00'),
('b867eb39-bb8a-47de-adb7-1e9ba4c901a4', 'รูปภาพ', 'd9bdb4de-fb90-4581-871e-99ef3b243f291708023383179988636152.png', '2024-02-16 01:38:20', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `store_product`
--

CREATE TABLE `store_product` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `method_uuid` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `product_name` longtext NOT NULL,
  `used_status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `auction_product`
--
ALTER TABLE `auction_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `gacha_product`
--
ALTER TABLE `gacha_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `game_name`
--
ALTER TABLE `game_name`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `general_product`
--
ALTER TABLE `general_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `history_payment`
--
ALTER TABLE `history_payment`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `history_product`
--
ALTER TABLE `history_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `store_product`
--
ALTER TABLE `store_product`
  ADD PRIMARY KEY (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
