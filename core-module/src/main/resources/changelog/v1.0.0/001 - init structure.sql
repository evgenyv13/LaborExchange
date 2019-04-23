DROP TABLE IF EXISTS `commentary`;
set foreign_key_checks=0;
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
CONSTRAINT `for_user` FOREIGN KEY (`for_user`) REFERENCES `users` (`id`),
CONSTRAINT `from_user` FOREIGN KEY (`from_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentary`
--

LOCK TABLES `commentary` WRITE;
/*!40000 ALTER TABLE `commentary` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `education` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `university` varchar(30) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `education_id_uindex` (`id`),
UNIQUE KEY `language_levels_id_uindex` (`id`),
KEY `education_users_id_fk` (`user_id`),
CONSTRAINT `education_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_levels`
--

DROP TABLE IF EXISTS `language_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_levels` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `language` varchar(30) NOT NULL,
    `language_level` varchar(20) NOT NULL,
PRIMARY KEY (`id`),
KEY `language_levels_id_fk` (`user_id`),
CONSTRAINT `language_levels_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_levels`
--

LOCK TABLES `language_levels` WRITE;
/*!40000 ALTER TABLE `language_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `language_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_category_list`
--

DROP TABLE IF EXISTS `project_category_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_category_list` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `category_name` varchar(20) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `project_category_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_category_list`
--

LOCK TABLES `project_category_list` WRITE;
/*!40000 ALTER TABLE `project_category_list` DISABLE KEYS */;
INSERT INTO `project_category_list` VALUES (1,'IT'),(2,'Service'),(3,'Education');
/*!40000 ALTER TABLE `project_category_list` ENABLE KEYS */;
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
    `free_to_sell_token` float NOT NULL DEFAULT '0',
    `free_to_sell_per_token_price` float NOT NULL DEFAULT '0',
PRIMARY KEY (`id`),
KEY `project_id_idx` (`project_id`),
KEY `user_id_idx` (`user_id`),
CONSTRAINT `project_ref` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
CONSTRAINT `user_ref` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_owners`
--

LOCK TABLES `project_owners` WRITE;
/*!40000 ALTER TABLE `project_owners` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_subcategories`
--

DROP TABLE IF EXISTS `project_subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_subcategories` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `subcategory_id` int(10) unsigned NOT NULL,
    `project_id` int(10) unsigned NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `project_subcategories_id_uindex` (`id`),
KEY `project_subcategories_projects_id_fk` (`project_id`),
KEY `project_subcategories_project_subcategory_list_id_fk` (`subcategory_id`),
CONSTRAINT `project_subcategories_project_subcategory_list_id_fk` FOREIGN KEY (`subcategory_id`) REFERENCES `project_subcategory_list` (`id`),
CONSTRAINT `project_subcategories_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_subcategories`
--

LOCK TABLES `project_subcategories` WRITE;
/*!40000 ALTER TABLE `project_subcategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_subcategory_list`
--

DROP TABLE IF EXISTS `project_subcategory_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_subcategory_list` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `subcategory_name` varchar(20) NOT NULL,
    `category_id` int(10) unsigned NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `project_subcategory_list_id_uindex` (`id`),
KEY `project_subcategory_list_project_category_list_id_fk` (`category_id`),
CONSTRAINT `project_subcategory_list_project_category_list_id_fk` FOREIGN KEY (`category_id`) REFERENCES `project_category_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_subcategory_list`
--

LOCK TABLES `project_subcategory_list` WRITE;
/*!40000 ALTER TABLE `project_subcategory_list` DISABLE KEYS */;
INSERT INTO `project_subcategory_list` VALUES (1,'WEB',1),(2,'Mobile',1),(3,'Soft',1);
/*!40000 ALTER TABLE `project_subcategory_list` ENABLE KEYS */;
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
    `description` varchar(400) DEFAULT NULL,
    `contacts` varchar(100) DEFAULT NULL,
    `project_owner` int(10) unsigned NOT NULL,
    `creating_date` datetime DEFAULT NULL,
    `twitter` varchar(30) DEFAULT NULL,
    `gmail` varchar(50) DEFAULT NULL,
    `linkedin` varchar(30) DEFAULT NULL,
    `github` varchar(30) DEFAULT NULL,
    `youtube` varchar(30) DEFAULT NULL,
    `freeze_token` float NOT NULL DEFAULT '0',
PRIMARY KEY (`id`),
UNIQUE KEY `id_UNIQUE` (`id`),
KEY `project_owner_idx` (`project_owner`),
CONSTRAINT `project_owner` FOREIGN KEY (`project_owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
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
    `name` varchar(60) NOT NULL,
    `description` varchar(400) DEFAULT NULL,
    `progress` int(10) unsigned DEFAULT NULL,
    `payment_percent` float unsigned NOT NULL,
    `category` varchar(45) DEFAULT NULL,
    `skills` varchar(45) DEFAULT NULL,
    `project_id` int(10) unsigned NOT NULL,
    `user_accepteed_id` int(10) unsigned DEFAULT NULL,
    `creating_date` datetime DEFAULT NULL,
    `done` tinyint(1) DEFAULT '0',
PRIMARY KEY (`id`),
UNIQUE KEY `id_UNIQUE` (`id`),
KEY `user_accepteed_id_idx` (`user_accepteed_id`),
KEY `project_id_idx` (`project_id`),
CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
CONSTRAINT `user_accepteed_id` FOREIGN KEY (`user_accepteed_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks_reply`
--

LOCK TABLES `tasks_reply` WRITE;
/*!40000 ALTER TABLE `tasks_reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_sells_history`
--

DROP TABLE IF EXISTS `token_sells_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_sells_history` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `project` int(10) unsigned NOT NULL,
    `seller` int(10) unsigned NOT NULL,
    `buyer` int(10) unsigned NOT NULL,
    `amount` float NOT NULL,
    `price_per_one` float NOT NULL,
    `transaction_date` datetime NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `token_sells_history_id_uindex` (`id`),
KEY `token_sells_history_users_id_fk` (`seller`),
KEY `token_sells_history_projects_id_fk` (`project`),
KEY `token_sells_history_users_id_fk_2` (`buyer`),
CONSTRAINT `token_sells_history_projects_id_fk` FOREIGN KEY (`project`) REFERENCES `projects` (`id`),
CONSTRAINT `token_sells_history_users_id_fk` FOREIGN KEY (`seller`) REFERENCES `users` (`id`),
CONSTRAINT `token_sells_history_users_id_fk_2` FOREIGN KEY (`buyer`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_sells_history`
--

LOCK TABLES `token_sells_history` WRITE;
/*!40000 ALTER TABLE `token_sells_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_sells_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_skills`
--

DROP TABLE IF EXISTS `user_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_skills` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `skill` varchar(35) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `user_skills_id_uindex` (`id`),
KEY `user_skills_users_id_fk` (`user_id`),
CONSTRAINT `user_skills_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_skills`
--

LOCK TABLES `user_skills` WRITE;
/*!40000 ALTER TABLE `user_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_skills` ENABLE KEYS */;
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
    `linkedin` varchar(60) DEFAULT NULL,
    `gmail` varchar(60) DEFAULT NULL,
    `twitter` varchar(60) DEFAULT NULL,
    `github` varchar(60) DEFAULT NULL,
    `youtube` varchar(60) DEFAULT NULL,
    `about_me` varchar(400) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_experience` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `company_name` varchar(60) NOT NULL,
    `description` varchar(500) DEFAULT NULL,
    `position` varchar(30) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `work_experience_id_uindex` (`id`),
KEY `work_experience_users_id_fk` (`user_id`),
CONSTRAINT `work_experience_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
set foreign_key_checks=1;