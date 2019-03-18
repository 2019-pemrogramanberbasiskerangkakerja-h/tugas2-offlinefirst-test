-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2019 at 11:20 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pbkk_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`time_stamp`, `description`) VALUES
('0000-00-00 00:00:00', 'heheheh'),
('2019-03-11 04:42:12', 'testtt'),
('2019-03-11 04:49:00', 'login username umum sukses'),
('2019-03-18 09:27:33', 'login username z sukses');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(32) NOT NULL,
  `password` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('1', 'c4ca4238a0b923820dcc509a6f75849b'),
('a', '0cc175b9c0f1b6a831c399e269772661'),
('b', '92eb5ffee6ae2fec3ad71c777531578f'),
('c', '4a8a08f09d37b73795649038408b5f33'),
('e', 'e1671797c52e15f763380b45e841ec32'),
('jokowi', '7d00ff54a263fe80825b9297804a982c'),
('tus', 'cd61363a23cbbc0606ec6f2725b1224d'),
('umum', '73ea7fbe1fa01ee3bc6370384c2450af'),
('umum333', 'adfab9c56b8b16d6c067f8d3cff8818e'),
('Yutub', '493a3fd2ea058eac1940852773d52bec'),
('z', 'fbade9e36a3f36d3d676c1b808451dd7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
