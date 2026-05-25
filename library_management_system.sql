-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 25, 2026 at 08:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `nationality` text NOT NULL,
  `bio` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`author_id`, `first_name`, `last_name`, `nationality`, `bio`) VALUES
(1, 'hakuzimana', 'alex', 'rwanda', 'the people who write the many book'),
(2, 'kjwehd', 'jkrj', 'nder', 'nmdj'),
(3, 'sam', 'fvfv', 'burundi', 'mhh'),
(4, ',d', ',dj', 'd', 'mdj'),
(5, 'hakuzimana', 'eee', 'burundi', 'err'),
(6, 'hakuzimana', 'saget', 'burundi', 'kjhg'),
(7, 'sam', 'kagege', 'burundi', 'who is the person write the may book'),
(8, 'sam', 'kagege', 'burundi', 'who is the person write the may book'),
(9, 'sam', 'kagege', 'burundi', 'who is the person write the may book'),
(10, 'karenzi', 'simon', 'burundi', 'some  one who write many book'),
(11, ';loweurhg', 'lqwerht', 'werjhg', 'weoritpqwoerjh'),
(12, 'emile', 'niyonsenga', 'USA', 'fg'),
(13, 'ni', 'killer', 'rwandan', 'perfect author ');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `isbn` int(11) NOT NULL,
  `genre` varchar(200) NOT NULL,
  `copies_available` int(11) NOT NULL DEFAULT 1,
  `published_year` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `isbn`, `genre`, `copies_available`, `published_year`, `author_id`, `created_at`, `date`) VALUES
(22, 'th six strategic', 12, 'this is political book', 123, 1967, 10, '2026-05-24 19:33:38', '2026-05-24 19:33:38'),
(23, 'the art of war', 129876, 'politic of dinasty expansion', 459, 1987, 8, '2026-05-24 20:02:09', '2026-05-24 19:58:52'),
(24, 'the alsense and loereun', 65352423, 'history of world war ', 200, 1914, 5, '2026-05-24 20:00:37', '2026-05-24 20:00:37'),
(25, 'the hiostory of rwanda from to the bigning', 239865522, 'history of rwanda ', 362, 1995, 12, '2026-05-24 20:27:17', '2026-05-24 20:01:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `reset_token`, `reset_token_expiry`) VALUES
(2, 'saget', 'princekizz823@gmail.com', '$2b$10$d2l0/7rlvhLVWHtQmtpjYO/DHd16W/8g9j7nO8Q7sPBzip4kPRgPC', NULL, NULL),
(3, 'saget', 'princekizz82@gmail.com', '$2b$10$GZ8fa4D1NCUgMHlv5ttOketKeCYJefOmSLI9zviedE/UOGJqyEmBe', 'ce989b575c438a4b83a5742da8121df0f41a2baa0e60320706c54f9fe73304ce', '2026-05-24 22:08:16'),
(4, 'sam', 'sam@gmail.com', '$2b$10$fSfV.l.3r3XfC/qav1KN3.SbrcXvCYg8/aB6oeLrGrxMucH2fihti', NULL, NULL),
(5, 'sam', 'aaa@gmail.com', '$2b$10$ucr.hnX./br3MTj.gYUzzeoTXsZdKVbvXM6K6bAx4PxvTSke3p/h2', NULL, NULL),
(6, 'msked', 'asdd@gmail.com', '$2b$10$PDMrxsV6fwPlTN9FXDXyxO/aT9Uqx777YPWrP05qYGKyA53M89bWq', NULL, NULL),
(7, 'alex', '111@gmail.com', '$2b$10$4dXiYDStnPtrCZheNDd.Oefm7HnfS8EO79CczDLI.U3dETIfXIdSS', NULL, NULL),
(12, 'eric ', 'claude12@gmail.com', '$2b$10$vSAmTSQDZQs8wTAvLdfR3e8hXYhU.HVfznzPQZ8DIqHj9ELcp0dsm', '1f17cda1c1e8b70949d69a2d0a4ee27f45ea04ad3ca2cd2a3c0539caf5c81dda', '2026-05-24 13:16:02'),
(13, 'eric ', 'claude123@gmail.com', '$2b$10$Mbn9RxHxpSxEIfqw6H7gZe2kWIxJsqJK053G9NvuYMm2vf/qO9yui', NULL, NULL),
(14, 'saget', 'saget@gmail.com', '$2b$10$MPWn9I4mdONCVBeF0K3nyeWFwZKn9iXH9zAvMCpN1DpMu7Pti51O2', NULL, NULL),
(15, 'aforo', 'aforo@gmail.com', '$2b$10$QyYgojd6ZDGiaOdDXvIflulg6HgseSh21gBMdFtPbq40cePHnWIou', NULL, NULL),
(16, 'afoo', 'affoo@', '$2b$10$tAunPgdZDh6jVx67iQBtfOTZnYRmDG9arYzA/xn6yB.NFugRdGpba', NULL, NULL),
(17, 'g', 'g@gmail.com', '$2b$10$KFXHNEmfrZZzIw2PMQbI/OJTum8PMOo59Nz1CrfrMac3Wt3F.5yCu', NULL, NULL),
(18, 'killer', 'killer@gmail.com', '$2b$10$XAxdlky6NXDKF3tVPOCU6ejy.wELYbvUnR6JUFdynDpiTt4XN/b1W', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `author_id` (`author_id`);

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
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
