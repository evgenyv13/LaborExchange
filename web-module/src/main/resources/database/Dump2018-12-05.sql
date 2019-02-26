-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: startupdb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentary`
--

DROP TABLE IF EXISTS `commentary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentary` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `for_user` int(10) unsigned NOT NULL,
  `from_user` int(10) unsigned NOT NULL,
  `commentary_text` varchar(255) NOT NULL,
  `commentary_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `for_user_idx` (`from_user`),
  KEY `for_user_idx1` (`for_user`),
  CONSTRAINT `for_user` FOREIGN KEY (`for_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `from_user` FOREIGN KEY (`from_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentary`
--

LOCK TABLES `commentary` WRITE;
/*!40000 ALTER TABLE `commentary` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_owners`
--

DROP TABLE IF EXISTS `project_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_owners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `percent` float NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id_idx` (`project_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `project_ref` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `user_ref` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_owners`
--

LOCK TABLES `project_owners` WRITE;
/*!40000 ALTER TABLE `project_owners` DISABLE KEYS */;
INSERT INTO `project_owners` VALUES (1,2,56,1),(2,3,5,1),(3,4,76,2),(4,5,11,5),(5,1,27,4);
/*!40000 ALTER TABLE `project_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contacts` varchar(100) DEFAULT NULL,
  `project_owner` int(10) unsigned NOT NULL,
  `creating_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `project_owner_idx` (`project_owner`),
  CONSTRAINT `project_owner` FOREIGN KEY (`project_owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Check the weather','RPG on PC','lolipop@gmail.com',1,'2018-03-06 00:00:00'),(2,'Clever Fridge','app for auto control your fridge','badboy@gmail.by',1,'2018-09-11 00:00:00'),(3,'Led Cube','3d led cube','amazon@gmail.com',3,'2018-09-16 00:00:00'),(4,'Jenkins API for testers','New approach for testing apps','admin123@gmail.com',5,'2018-07-24 00:00:00'),(5,'Check the weather','App whitch tells you what to wear today','nik_msh@yandex.by',4,'2018-12-03 00:00:00'),(6,'Test project','description about Me','my mail: @ mial.ru',1,'2018-12-05 02:40:33');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `progress` int(10) unsigned DEFAULT NULL,
  `payment_percent` float unsigned NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `skills` varchar(45) DEFAULT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `user_accepteed_id` int(10) unsigned DEFAULT NULL,
  `creating_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_accepteed_id_idx` (`user_accepteed_id`),
  KEY `project_id_idx` (`project_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `user_accepteed_id` FOREIGN KEY (`user_accepteed_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Deploy server','need to deploy server with jenkins',4,0.3,'Back-end','Java EE',2,1,NULL),(2,'Create db','PosgreSQL need 6 small tables',33,2.3,'SQL','PosgreSQL',3,2,NULL),(3,'Create project architecture','you will create UML diagrams',12,0.3,'Design Architecture','UML',1,5,NULL),(4,'Create landing-page','landing page for casino',59,6.5,'Front-end','Js/HTML/CSS',1,NULL,NULL),(5,'Defect: jar file','need to resolve problem with jar file builds',0,0.2,'Back-end','Java EE',2,NULL,NULL),(6,'Test Task','description about task\n',0,0,NULL,NULL,6,NULL,NULL),(7,'Test Task 2','description about task 2\n',0,0.01,NULL,NULL,6,NULL,NULL),(8,'Test Task 3','description about task 3\n',0,0.01,NULL,NULL,6,NULL,'2018-12-05 02:55:37');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks_reply`
--

DROP TABLE IF EXISTS `tasks_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `task_id` int(10) unsigned NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `wanted_percent` float DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_id_idx` (`task_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_id` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks_reply`
--

LOCK TABLES `tasks_reply` WRITE;
/*!40000 ALTER TABLE `tasks_reply` DISABLE KEYS */;
INSERT INTO `tasks_reply` VALUES (1,1,2,'2018-08-13 00:00:00',14,'this task is not so easy, I want more'),(2,1,3,'2018-09-10 00:00:00',6,'I will do it fastly'),(3,3,4,'2018-10-06 00:00:00',2,'Nice task for me'),(4,4,4,'2019-01-02 00:00:00',7.6,'I am a professional'),(5,5,1,'2018-09-28 00:00:00',1.6,'Good job for senior');
/*!40000 ALTER TABLE `tasks_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$2cJzMqzRrp/Li0OajI.ELOUSkItyj68li1qzBpEaPfyHljxZs8oZu','admin@mail.ru','adminsite.com','ROLE_USER','c++ java'),(2,'Nik','$2a$10$2cJzMqzRrp/Li0OajI.ELOUSkItyj68li1qzBpEaPfyHljxZs8oZu','alert@gmail.com','noname.com','ROLE_USER','SQL'),(3,'Kolya','$2a$10$2cJzMqzRrp/Li0OajI.ELOUSkItyj68li1qzBpEaPfyHljxZs8oZu','hehe@yandex.ru','site3.com','ROLE_USER','.NET'),(4,'Evgen','$2a$10$2cJzMqzRrp/Li0OajI.ELOUSkItyj68li1qzBpEaPfyHljxZs8oZu','evgem@yandex.by','web-resource.com','ROLE_USER','c++ java Spring Mysql Hibernate Postgre '),(5,'Vlad','$2a$10$2cJzMqzRrp/Li0OajI.ELOUSkItyj68li1qzBpEaPfyHljxZs8oZu','emaker@mail.com','gitHubStyle.com','ROLE_USER','React');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-05  3:42:19
