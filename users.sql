-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 20, 2018 at 04:34 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `first_name` varchar(50) CHARACTER SET latin1 NOT NULL,
  `middle_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET latin1 NOT NULL,
  `gender` enum('Male','Female','Others') CHARACTER SET latin1 NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `middle_name`, `last_name`, `gender`, `email`, `date_time`) VALUES
(0000000007, 'Taeil', '', 'Moon', 'Male', 'moontaeil@nct.com', '2018-04-19 22:02:36'),
(0000000010, 'Taeyong', '', 'Lee', 'Male', 'tytrack@nct.com', '2018-04-19 22:44:56'),
(0000000011, 'Mark', '', 'Lee', 'Male', 'marklee@nct.com', '2018-04-19 22:47:18'),
(0000000012, 'Jaehyun', '', 'Jung', 'Male', 'jeffrey@nct.com', '2018-04-19 22:51:28'),
(0000000017, 'Kihyun', '', 'Yoo', 'Male', 'yookihyun@mx.com', '2018-04-19 23:01:19'),
(0000000018, 'Hoseok', '', 'Shin', 'Male', 'wonho@mx.com', '2018-04-19 23:03:28'),
(0000000023, 'Jimin', '', 'Park', 'Male', 'parkjimin@bts.com', '2018-04-20 10:23:17'),
(0000000024, 'Namjoon', '', 'Kim', 'Male', 'kimnamjoon@bts.com', '2018-04-20 10:24:51'),
(0000000031, 'Taehyung', '', 'Kim', 'Male', 'vkim@bts.com', '2018-04-20 10:28:56'),
(0000000032, 'Hansol', 'Vernon', 'Choi', 'Male', 'vernon@svt.com', '2018-04-20 10:30:48'),
(0000000033, 'Joshua', '', 'Hong', 'Male', 'jisoos@svt.com', '2018-04-20 10:31:52'),
(0000000034, 'Yong', 'Sun', 'Kim', 'Female', 'solar@mmm.com', '2018-04-20 10:33:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
