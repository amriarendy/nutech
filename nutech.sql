-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 23, 2024 at 04:24 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech`
--

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `id` int NOT NULL,
  `balance` int DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`id`, `balance`, `user_id`, `updatedAt`, `createdAt`) VALUES
(1, 100000, 'jhon@gmail.com', '2024-11-23 16:24:01', '2024-11-23 16:20:16');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `banner_name` varchar(100) DEFAULT NULL,
  `banner_image` varchar(100) DEFAULT NULL,
  `description` text,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_name`, `banner_image`, `description`, `updatedAt`, `createdAt`) VALUES
(1, 'Banner 1', 'http://127.0.0.1:3000/public/uploads/banner/dummy_1.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-15 20:45:51', '2024-11-12 20:45:54'),
(2, 'Banner 2', 'http://127.0.0.1:3000/public/uploads/banner/dummy_2.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-05 20:45:57', '2024-11-11 20:45:59'),
(3, 'Banner 3', 'http://127.0.0.1:3000/public/uploads/banner/dummy_3.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-05 20:46:01', '2024-11-04 20:46:03'),
(4, 'Banner 4', 'http://127.0.0.1:3000/public/uploads/banner/dummy_4.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-12 20:46:05', '2024-11-04 20:46:07'),
(5, 'Banner 5', 'http://127.0.0.1:3000/public/uploads/banner/dummy_5.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-12 20:46:10', '2024-11-19 20:46:12'),
(6, 'Banner 6', 'http://127.0.0.1:3000/public/uploads/banner/dummy_6.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-06 20:46:14', '2024-11-04 20:46:16');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `service_code` varchar(100) DEFAULT NULL,
  `service_name` varchar(100) DEFAULT NULL,
  `service_icon` varchar(100) DEFAULT NULL,
  `service_tarif` int DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tarif`, `updatedAt`, `createdAt`) VALUES
(1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(6, 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(7, 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(8, 'PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(9, 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, '2024-11-15 20:45:51', '2024-11-15 20:45:51'),
(12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, '2024-11-15 20:45:51', '2024-11-15 20:45:51');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `service_code` varchar(100) DEFAULT NULL,
  `service_name` varchar(100) DEFAULT NULL,
  `transaction_type` varchar(100) DEFAULT NULL,
  `total_amount` varchar(100) DEFAULT NULL,
  `created_on` varchar(100) DEFAULT NULL,
  `balance_id` int DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `invoice_number`, `service_code`, `service_name`, `transaction_type`, `total_amount`, `created_on`, `balance_id`, `updatedAt`, `createdAt`) VALUES
(1, '465373', 'TOPUP', 'Top Up', 'TOPUP', '100000', '2024-11-23 23:24:01', 1, '2024-11-23 16:24:01', '2024-11-23 16:24:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `tokenRefresh` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `profile_image`, `tokenRefresh`, `createdAt`, `updatedAt`) VALUES
(1, 'jhon@gmail.com', '$2b$10$phHn744B8Ji2W4RjdtCgwO6J8Dm5eq/zVGDjQdk0KG1Spd33oLiMW', 'Jhone', 'Doe', 'default.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE3MzIzNzkwMTcsImV4cCI6MTczMjQ2NTQxN30.wfDOB_pHFBQs8Z-pSK2xD2ttpfYbNLa5DfeIL6-y3EU', '2024-11-23 16:20:16', '2024-11-23 16:23:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
