-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 09, 2023 at 06:28 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int NOT NULL,
  `ipaddress` varchar(15) NOT NULL,
  `name` text NOT NULL,
  `macaddress` varchar(17) CHARACTER SET utf8mb4  NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT 'user status 1 is enable 0 disable',
  `comcode` text NOT NULL,
  `role` tinyint(1) NOT NULL COMMENT '1-super user\r\n2-admin\r\n3-normal user\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `ipaddress`, `name`, `macaddress`, `email`, `password`, `salt`, `status`, `comcode`, `role`) VALUES
(12, '127.0.0.2', 'admin', '00.00.00.00.00.00', 'admin@admin.com', 'f2847944e69a8b96ddd0b6f46ef545bd014d562b7a16daaae2bcce34125e6ae6e8dfb48f67e5f307233951e8c95d3d84988cbac98ff9c3e298cc24f074ad3fd8', 'a1c8a50fe180f59a4b7b2587474884a6e5c401a1', 1, 'asdaadasd', 1),
(26, '192.168.1.3', 'user1', '00:1B:44:11:3A:98', 'user8@admin.com', '43ab18b664e714312d51934d01ad7799845ef2a0175bec57e9c8718c31bba26b09130b09df3e35b5c012cbee5a031ea4b2654671684fccd6f72ee985e65e0735', '5d34ad23227028f2097432d90f881e003451d0a9', 1, 'asdaadasd', 2),
(33, '192.168.1.7', 'user1', '00:1B:44:11:3A:22', 'user9@admin.com', '7455acabb6d49b78be202cf06236590250e631d1c0c1bcc75a4c808d3967b785555a5655400c4394711186d58ccae01dd1090d3091d4154bbdabd80b3d709927', 'de1ed90b74e8394b79bad757495868793e6b5b35', 1, 'asdaadasd', 3);

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
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `ipaddress` (`ipaddress`),
  ADD UNIQUE KEY `macaddress` (`macaddress`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
