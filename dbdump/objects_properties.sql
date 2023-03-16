-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: objects
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `realtor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `properties_realtors_id_fk` (`realtor_id`),
  CONSTRAINT `properties_realtors_id_fk` FOREIGN KEY (`realtor_id`) REFERENCES `realtors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'Объект 1','ул. Мамадышская 45-78','9-ый дом, 180 кв. метров, двухуровневая',7500000.00,1),(2,'Объект 2','ул. Гагарина 56-56','ул. Азата Аббасова, д. 11, Казань',3900000.00,1),(3,'Объект 3','ул. Ленинградская 97-01','частный дом из сруба, 100 кв.метров',4500000.00,1),(4,'Объект 4','ул. Галимджана Баруди 59-78','Кирпичный дом, 80 кв. метров',3200000.00,1),(5,'Объект 5','ул. 50 лет Победы 24-32','Панельный дом, 45 кв. метров, с двумя лоджиями',2500000.00,1),(6,'Объект 6','ул. Аббасова 11-22','Продается 2-комн. кв., 64м2, 9/19этаж',3900000.00,1),(7,'Объект 7',' ул. Лушникова 50-7','Продается 2-комн. кв., 45.8м2, 1/5 этаж',2600000.00,1),(8,'Объект 8',' ул. Широка 97-01','Продается 2-комн. кв., 63м2, 9/10 этаж',4350000.00,1),(9,'Объект 9','ул. Хо Ши Мина  56-321','Продается 4-комн. кв., 83.5м2, 10/11 этаж',3750000.00,1),(10,'Объект 10',' ул. Фучика 6-97','Продается 2-комн. кв., 62.8м2, 2/16 этаж',5200000.00,1);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-16 15:19:20
