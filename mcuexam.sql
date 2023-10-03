-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2023 at 08:17 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcuexam`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` bigint NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `gender` varchar(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `age` smallint NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int NOT NULL,
  `ipaddress` varchar(15) NOT NULL,
  `name` text NOT NULL,
  `macaddress` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT 'user status 1 is enable 0 disable',
  `comcode` text NOT NULL,
  `role` tinyint(1) NOT NULL COMMENT '1-super user\r\n2-admin\r\n3-normal user\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `ipaddress`, `name`, `macaddress`, `email`, `password`, `salt`, `status`, `comcode`, `role`) VALUES
(12, '127.0.0.1', 'admin', '', 'admin@admin.com', 'f2847944e69a8b96ddd0b6f46ef545bd014d562b7a16daaae2bcce34125e6ae6e8dfb48f67e5f307233951e8c95d3d84988cbac98ff9c3e298cc24f074ad3fd8', 'a1c8a50fe180f59a4b7b2587474884a6e5c401a1', 1, 'asdaadasd', 1),
(13, '127.0.0.1', 'user1', '', 'user1@admin.com', '9f20cf5f811b6a53ab30657f611dfe226b05a3452f52e5ff071e45c769b67da90db1d4ce35a4d9ef66b933bf94b1b0dddf8c38b97fc24928d63ceb9af64786d0', '871e87892779b4293d67f00acbc911228ef90859', 1, 'asdaadasd', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
