-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: kids_club
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `children_list`
--

DROP TABLE IF EXISTS `children_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `children_list` (
  `kid_id` int NOT NULL AUTO_INCREMENT,
  `kid_name` varchar(45) NOT NULL,
  `kid_surname` varchar(45) NOT NULL,
  `kid_second_name` varchar(45) DEFAULT NULL,
  `birthday` date NOT NULL,
  `parent_name` varchar(45) NOT NULL,
  `parent_surname` varchar(45) NOT NULL,
  `parent_second_name` varchar(45) DEFAULT NULL,
  `parent_phone` varchar(45) NOT NULL,
  `date_registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_registration` int NOT NULL,
  `date_last_changed` datetime NOT NULL,
  `users_list_id_last_changed` int NOT NULL,
  PRIMARY KEY (`kid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `children_list`
--

LOCK TABLES `children_list` WRITE;
/*!40000 ALTER TABLE `children_list` DISABLE KEYS */;
INSERT INTO `children_list` VALUES (1,'Анастасия','Туманова','Павловна','2018-09-08','Анна','Туманова','Владимировна','89161234567','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(2,'Михаил','Мальцев','Сергеевич','2018-09-08','Сергей','Мальцев','Алексеевич','89011234567','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(3,'Николай','Фролов','Николаевич','2018-12-11','Екатерина','Фролова','Андреевна','89167654321','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(4,'Ярослав','Кудрин','Юрьевич','2018-04-12','Юрий','Кудрин','Васильевич','89039876543','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(5,'Алексей','Юдин',NULL,'2017-06-06','Дарья','Юдина','Владимировна','89159876543','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(6,'Вадим','Жарков','Борисович','2017-07-07','Борис','Жарков','Аркадьевич','89261234567','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(7,'Максим','Индзинский','Павлович','2019-08-08','Елена','Скворцова','Юрьевна','89015165161','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(8,'Алексей','Крючков','Игоревич','2019-09-09','Екатерина','Крючкова','Павловна','89164148917','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(9,'Михаил','Деев','Владимирович','2016-01-01','Наталья','Деева','Сергеевна','89035123654','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(10,'Сергей','Симонин','Сергеевич','2016-02-02','Сергей','Симонин','Алексеевич','89238648520','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(11,'Наталья','Прокопович','Викторовна','2015-03-03','Виктор','Прокопович','Петрович','89651236545','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(12,'Екатерина','Матрехина','Валерьевна','2015-03-03','Елизавета','Матрехина','Николаевна','89164251253','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(13,'Елена','Гришина','Михайловна','2016-03-03','Михаил','Гришин','Денисович','89179635241','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(14,'Полина','Гагарина',NULL,'2016-03-03','Татьяна','Гагарина','Дмитриевна','89051472536','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(15,'Дарья','Балашова','Васильевна','2020-01-01','Василий','Балашов','Григорьевич','89038523614','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(16,'Павел','Погорелов','Николаевич','2020-04-04','Николай','Погорелов','Николаевич','89263214565','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1),(17,'Юрий','Аношин','Анатольевич','2020-05-05','Юлия','Аношина','Владимировна','89266549878','2021-09-08 21:10:10',1,'2021-09-08 21:10:10',1);
/*!40000 ALTER TABLE `children_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `name_class` varchar(45) NOT NULL,
  `descriptions` varchar(45) DEFAULT NULL,
  `min_age` int NOT NULL,
  `max_age` int NOT NULL,
  `data_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_created` int NOT NULL,
  `date_last_changed` datetime NOT NULL,
  `users_list_id_last_changed` int NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Мама и малыш','Занятия для малышей с мамой',1,3,'2021-09-08 20:31:57',1,'2021-09-08 20:31:57',1),(2,'Развивайка','Общеразвивающие занятия. Подготовка к школе.',3,6,'2021-09-08 20:34:24',1,'2021-09-08 20:33:57',1),(3,'Я сам','Общеразвивающие занятия для малышей',2,3,'2021-09-08 20:34:24',1,'2021-09-08 20:33:57',1),(4,'Цветные ладошки','Рисование для детей',3,6,'2021-09-08 20:34:24',1,'2021-09-08 20:33:57',1),(6,'АБВГДейка','Изучаем алфавит',4,6,'2021-09-08 20:34:24',1,'2021-09-08 20:33:57',1),(7,'Музыкальный паровозик','Играем и поём',3,6,'2021-09-08 20:34:24',1,'2021-09-08 20:33:57',1);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_class`
--

DROP TABLE IF EXISTS `groups_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_class` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `name_group` varchar(45) NOT NULL,
  `classes_id` int NOT NULL,
  `teacher` varchar(45) NOT NULL,
  `min_age_group` int NOT NULL,
  `max_age_group` int NOT NULL,
  `max_number` int NOT NULL,
  `current_number` int NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_created` int NOT NULL,
  `date_last_changed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_last_changed` int NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_class`
--

LOCK TABLES `groups_class` WRITE;
/*!40000 ALTER TABLE `groups_class` DISABLE KEYS */;
INSERT INTO `groups_class` VALUES (1,'Телепузики',1,'Иванова',1,2,5,3,'2021-09-08 20:39:56',1,'2021-09-08 20:39:57',1),(2,'Фиксики',1,'Иванова',2,3,5,2,'2021-09-08 20:39:56',1,'2021-09-08 20:39:57',1),(3,'Малышки',3,'Иванова',2,2,5,1,'2021-09-08 20:50:50',1,'2021-09-08 20:52:57',1),(4,'Коротышки',3,'Иванова',3,3,5,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(5,'Котята',2,'Петрова',3,3,4,1,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(6,'Колокольчики',4,'Ромашина',3,3,4,1,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(7,'Землянички',6,'Сидорова',3,3,4,3,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(8,'До',7,'Чайковский',3,3,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(9,'Щенята',2,'Петрова',4,4,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(10,'Незабудки',4,'Ромашина',4,4,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(11,'Малинки',6,'Сидорова',4,4,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(12,'Ре',7,'Чайковский',4,4,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(13,'Муравьишки',2,'Петрова',5,5,4,4,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(14,'Ромашки',4,'Ромашина',5,5,4,4,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(15,'Вишенки',6,'Сидорова',5,5,4,4,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(16,'Ми',7,'Чайковский',5,5,4,4,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(17,'Пчелки',2,'Петрова',6,6,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(18,'Одуванчики',4,'Ромашина',6,6,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(19,'Чернички',6,'Сидорова',6,6,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1),(20,'Фа',7,'Чайковский',6,6,4,2,'2021-09-08 20:50:51',1,'2021-09-08 20:52:57',1);
/*!40000 ALTER TABLE `groups_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_groups`
--

DROP TABLE IF EXISTS `list_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_groups` (
  `list_groups_id` int NOT NULL AUTO_INCREMENT,
  `groups_class_id` int NOT NULL,
  `children_list_id` int NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_created` int NOT NULL,
  `date_last_changed` datetime NOT NULL,
  `users_list_id_last_changed` int NOT NULL,
  PRIMARY KEY (`list_groups_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_groups`
--

LOCK TABLES `list_groups` WRITE;
/*!40000 ALTER TABLE `list_groups` DISABLE KEYS */;
INSERT INTO `list_groups` VALUES (1,1,15,'2021-09-12 15:22:46',1,'2021-09-12 15:22:46',1),(2,1,16,'2021-09-12 15:22:46',1,'2021-09-12 15:22:46',1),(3,1,17,'2021-09-12 15:22:46',1,'2021-09-12 15:22:46',1),(4,2,1,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(5,2,8,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(6,3,7,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(7,4,2,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(8,4,3,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(9,5,4,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(10,6,4,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(11,7,1,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(12,7,4,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(13,7,2,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(14,8,4,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(15,8,1,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(16,9,5,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(17,9,6,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(18,10,5,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(19,10,6,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(20,11,5,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(21,11,6,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(22,12,5,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(23,12,6,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(24,13,9,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(25,14,9,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(26,15,9,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(27,16,9,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(28,13,10,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(29,14,10,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(30,15,10,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(31,16,10,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(32,13,13,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(33,14,13,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(34,15,13,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(35,16,13,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(36,13,14,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(37,14,14,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(38,15,14,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(39,16,14,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(40,17,11,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(41,18,11,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(42,19,11,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(43,20,11,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(44,17,12,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(45,18,12,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(46,19,12,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1),(47,20,12,'2021-09-12 15:35:15',1,'2021-09-12 15:40:46',1);
/*!40000 ALTER TABLE `list_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shedule`
--

DROP TABLE IF EXISTS `shedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shedule` (
  `shedule_id` int NOT NULL AUTO_INCREMENT,
  `groups_class_id` int NOT NULL,
  `day` varchar(45) NOT NULL,
  `time_start` varchar(45) NOT NULL,
  `time_end` varchar(45) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_list_id_created` int NOT NULL,
  `date_last_changed` datetime NOT NULL,
  `users_list_id_last_changed` int NOT NULL,
  PRIMARY KEY (`shedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shedule`
--

LOCK TABLES `shedule` WRITE;
/*!40000 ALTER TABLE `shedule` DISABLE KEYS */;
INSERT INTO `shedule` VALUES (1,1,'Понедельник','10-00','10-45','2021-09-08 21:19:57',1,'2021-09-08 21:19:57',1),(2,1,'Среда','10-00','10-45','2021-09-08 21:19:57',1,'2021-09-08 21:19:57',1),(3,2,'Понедельник','11-00','11-45','2021-09-08 21:19:57',1,'2021-09-08 21:19:57',1),(4,2,'Среда','11-00','11-45','2021-09-08 21:19:57',1,'2021-09-08 21:19:57',1),(5,3,'Вторник','10-00','10-30','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(6,3,'Пятница','10-00','10-30','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(7,4,'Вторник','11-00','11-30','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(8,4,'Пятница','11-00','11-30','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(9,5,'Понедельник','17-00','17-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(10,6,'Среда','17-00','17-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(11,7,'Понедельник','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(12,8,'Среда','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(13,9,'Понедельник','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(14,10,'Среда','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(15,11,'Понедельник','19-00','19-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(16,12,'Среда','19-00','19-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(17,13,'Суббота','11-00','11-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(18,14,'Вторник','17-00','17-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(19,15,'Вторник','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(20,16,'Суббота','12-00','12-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(21,17,'Суббота','12-00','12-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(22,18,'Вторник','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(23,19,'Вторник','19-00','19-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(24,20,'Суббота','13-00','13-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(25,18,'Пятница','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(26,14,'Пятница','19-00','19-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(27,15,'Пятница','18-00','18-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1),(28,19,'Пятница','19-00','19-45','2021-09-12 16:01:10',1,'2021-09-13 21:19:57',1);
/*!40000 ALTER TABLE `shedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_list`
--

DROP TABLE IF EXISTS `users_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_list` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_surname` varchar(45) NOT NULL,
  `user_second_name` varchar(45) DEFAULT NULL,
  `date_last_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `daea_registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_list`
--

LOCK TABLES `users_list` WRITE;
/*!40000 ALTER TABLE `users_list` DISABLE KEYS */;
INSERT INTO `users_list` VALUES (1,'GrigorevPN','46792755','Павел','Григорьев','Николаевич','2021-09-04 16:01:19','2021-09-04 16:01:19');
/*!40000 ALTER TABLE `users_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-15 19:29:26
