-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 31, 2023 at 05:03 AM
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
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint NOT NULL,
  `uid` smallint NOT NULL,
  `ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `method` varchar(8) NOT NULL,
  `url` text NOT NULL,
  `status` varchar(3) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_template`
--

CREATE TABLE `master_template` (
  `applicationno` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `enrollno` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rollno` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `yrtermcode` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examcode` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examcode2` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examname` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examnamempo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `progcodempo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stdcent` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'study center no',
  `stdcentname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examcent` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'exam center code',
  `examcentname` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pracent` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pracentname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fhname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hname` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `category` varchar(5) DEFAULT NULL,
  `medium` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mstatus` varchar(1) DEFAULT NULL,
  `dob` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `subcode` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `paper` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `thobt` varchar(150) DEFAULT NULL,
  `thoutof` varchar(150) DEFAULT NULL,
  `thresult` varchar(1) DEFAULT NULL,
  `threvised` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `probt` varchar(10) DEFAULT NULL,
  `proutof` varchar(10) DEFAULT NULL,
  `prresult` varchar(1) DEFAULT NULL,
  `prrevised` varchar(3) DEFAULT NULL,
  `intobt` varchar(10) DEFAULT NULL,
  `intoutof` varchar(10) DEFAULT NULL,
  `intresult` varchar(1) DEFAULT NULL,
  `intrevised` varchar(3) DEFAULT NULL,
  `subresult` varchar(1) DEFAULT NULL,
  `semobt` varchar(10) DEFAULT NULL,
  `semoutof` varchar(10) DEFAULT NULL,
  `semresult` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sempercentage` varchar(150) DEFAULT NULL,
  `semdivision` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `withheld` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `graceind` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gracecurr` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `msheetno` varchar(150) DEFAULT NULL,
  `agrtotobtn` varchar(150) DEFAULT NULL,
  `agrtotout` varchar(150) DEFAULT NULL,
  `agrresult` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `agrpercent` varchar(150) DEFAULT NULL,
  `agrdiv` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `agrremark1` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `remark1` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `remark2` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mappingfile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `schemefile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `studyfile` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `examfile` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `datafilefile` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ID` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CGPA` varchar(150) DEFAULT NULL,
  `SGPA` varchar(150) DEFAULT NULL,
  `sub_credit` varchar(150) DEFAULT NULL,
  `sub_credit_point` varchar(150) DEFAULT NULL,
  `sub_grade` varchar(150) DEFAULT NULL,
  `sub_grade_point` varchar(150) DEFAULT NULL,
  `sub_max` varchar(150) DEFAULT NULL,
  `sub_min` varchar(150) DEFAULT NULL,
  `sub_total` varchar(150) DEFAULT NULL,
  `total_credit` varchar(150) DEFAULT NULL,
  `total_credit_point` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int NOT NULL,
  `ipaddress` varchar(15) NOT NULL,
  `name` text NOT NULL,
  `macaddress` varchar(17) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT 'user status 1 is enable 0 disable',
  `comcode` text NOT NULL,
  `role` tinyint(1) NOT NULL COMMENT '1-super user\r\n2-admin\r\n3-normal user\r\n',
  `lastlogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `ipaddress`, `name`, `macaddress`, `email`, `password`, `salt`, `status`, `comcode`, `role`, `lastlogin`) VALUES
(43, '127.0.0.1', 'Super User', '00:1B:44:11:3A:22', 'giitbpl@gmail.com', '1e18e3d50ada80dbb626639c35d4f8917b2fabfc73003ab6e3c2a5eab7a1b13e2096377b20789e4a0d6e34934c24b0fb15c6bf0a184bf3753f683fe958d275df', 'd19366d5945b4b05f74ca06d02a33926c66a2eaa', 1, 'asdaadasd', 1, '2023-10-30 18:10:26'),
(62, '192.168.1.1', 'nitin guptta', '00-1B-63-84-45-E7', 'giitbpl@gmail.com', '48f511e1e1511e6c267403aa1917ccd3c9d917dbd9620800921b9df50c363ba64e6d2cc42d68888ae2268ef7d112dc4aa9ffff9a1b1c62b4543fe4c809e90610', 'e7cbf3ca53d5de99c8d9f141edff1766e01d09b2', 1, 'abc', 3, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `ip` (`ip`);

--
-- Indexes for table `master_template`
--
ALTER TABLE `master_template`
  ADD KEY `enrollno` (`enrollno`);

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
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
