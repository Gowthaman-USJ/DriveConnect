-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: driveconnect_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `CourseID` int NOT NULL AUTO_INCREMENT,
  `DsID` int NOT NULL,
  `Type` enum('Course','Package') DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `TotalSessions` int NOT NULL,
  `Price` int NOT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `DsID` (`DsID`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`DsID`) REFERENCES `drivingschool` (`DsID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,1,'Course','Beginner Driving Course','Basic vehicle control and road training',20,50000),(2,1,'Package','Full License Package','Complete training and test preparation',30,75000),(3,2,'Course','Automatic Driving Course','Automatic vehicle training',20,55000),(4,2,'Package','Premium License Package','Full license preparation package',35,90000),(5,9,'Course','Gowthaman Navarathnarajah',NULL,0,0),(6,9,'Package','Gowthaman Navarathwwwnarajah',NULL,0,0),(7,10,'Course','Gowthaman Navarathnarajah',NULL,0,0),(8,10,'Package','Gowthaman Nava22rathnarajah',NULL,0,0),(9,11,'Course','Gowthaman Navarathnarajah',NULL,0,0),(10,11,'Course','Gowthaman Navarathnarajah',NULL,0,0),(11,12,'Course','Gowthaman Navarathnarajah','rerergergerrehe',4,10000),(12,12,'Package','Gowthaman Navarathnarajah','fhoiefhoiewhf',100,50000);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivingschool`
--

DROP TABLE IF EXISTS `drivingschool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivingschool` (
  `DsID` int NOT NULL AUTO_INCREMENT,
  `LoginID` int NOT NULL,
  `SchoolName` varchar(50) NOT NULL,
  `DS_LicenseNo` varchar(25) NOT NULL,
  `Established_Year` int NOT NULL,
  `PhoneNo` varchar(50) DEFAULT NULL,
  `Description` tinytext,
  `ManagerName` varchar(50) NOT NULL,
  `DirectPhone` varchar(50) DEFAULT NULL,
  `S_Address` varchar(255) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `P_Code` int NOT NULL,
  `Trans_Offer` enum('Auto','Manual','Both') NOT NULL,
  `Operation_Time` enum('Weekday','Weekend','Both','Flex') NOT NULL,
  `InsuranceName` varchar(50) NOT NULL,
  `InsuranceNo` varchar(25) NOT NULL,
  PRIMARY KEY (`DsID`),
  UNIQUE KEY `SchoolName` (`SchoolName`),
  UNIQUE KEY `DS_LicenseNo` (`DS_LicenseNo`),
  UNIQUE KEY `InsuranceNo` (`InsuranceNo`),
  KEY `LoginID` (`LoginID`),
  CONSTRAINT `drivingschool_ibfk_1` FOREIGN KEY (`LoginID`) REFERENCES `login` (`LoginID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivingschool`
--

LOCK TABLES `drivingschool` WRITE;
/*!40000 ALTER TABLE `drivingschool` DISABLE KEYS */;
INSERT INTO `drivingschool` VALUES (1,19,'SafeDrive Driving Academy','DSL-458921',2015,'0774567890','Professional driving lessons for beginners and advanced learners','Nimal Perera','0712345678','125 Main Street','Colombo','Western Province',100,'Both','Both','Ceylinco Insurance PLC','POL-2025-785412'),(2,1,'Colombo Drive Academy','DSL-10001',2018,'0711111111','Professional driving training school','Ruwan Perera','0712222222','25 Main Street','Colombo','Western',100,'Both','Both','Ceylinco Insurance','INS-10001'),(3,2,'City Drive School','DSL-10002',2020,'0723333333','Modern driving lessons with experienced instructors','Chamara Silva','0724444444','50 Lake Road','Kandy','Central',20000,'Both','Flex','Allianz Insurance','INS-10002'),(7,36,'SafedwtrfdedDrive Driving Academy','DSL-458956212222',1902,'DSL-458956212222','fewfewfeefw','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','efee',10350,'Manual','Weekday','Ceylinco Insurance PLC','POL-2025-78541662'),(8,37,'ewewwefwe','DSL-4332258921',1902,'DSL-4332258921','fewfewfewfew','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','fewfewf',10350,'Auto','Weekend','Ceylinco Insurance PLC','POL-2025-743285412'),(9,38,'ewewdwwefwe','DSL-4583422921',1901,'DSL-4583422921','gregergregrgrggerg','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','de',10350,'Auto','Weekday','Ceylinco Insurance PLC','POL-2025-782325412'),(10,40,'ewewdwwefwwwdwe','DSL-45834332452921',1901,'DSL-45834332452921','gregergregrgrggerg','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','de',10350,'Auto','Weekday','Ceylinco Insurance PLC','POL-2025-723182325412'),(11,41,'e','DSL-458',1901,'DSL-458','gregergregrgrggerg','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','de',10350,'Auto','Weekday','Ceylinco Insurance PLC','POL-2025'),(12,42,'e2','DSL-4582',1901,'DSL-4582','gregergregrgrggerg','Gowthaman Navarathnarajah','+94760403533','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','de',10350,'Auto','Weekday','Ceylinco Insurance PLC','POL-20252');
/*!40000 ALTER TABLE `drivingschool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `InsID` int NOT NULL AUTO_INCREMENT,
  `DsID` int NOT NULL,
  `LoginID` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `PhoneNo` varchar(15) NOT NULL,
  `NIC` varchar(20) NOT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Drive_Exp` int NOT NULL,
  `Availability` enum('FullTime','PartTime','Weekend') NOT NULL,
  `Status` enum('Available','InLesson') DEFAULT NULL,
  PRIMARY KEY (`InsID`),
  UNIQUE KEY `NIC` (`NIC`),
  KEY `DsID` (`DsID`),
  KEY `LoginID` (`LoginID`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`DsID`) REFERENCES `drivingschool` (`DsID`),
  CONSTRAINT `instructor_ibfk_2` FOREIGN KEY (`LoginID`) REFERENCES `login` (`LoginID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (1,1,3,'Kasun Fernando','0771111111','199512345678','1995-04-10','Male','Colombo',6,'FullTime','Available'),(2,1,4,'Nimal Perera','0772222222','199412345679','1994-07-15','Male','Colombo',8,'FullTime','Available'),(3,1,5,'Sahan Jayasuriya','0773333333','199612345670','1996-08-20','Male','Colombo',5,'PartTime','Available'),(4,2,6,'Amal Silva','0781111111','199312345671','1993-02-12','Male','Kandy',10,'FullTime','Available'),(5,2,7,'Tharindu Kumar','0782222222','199712345672','1997-09-18','Male','Kandy',4,'PartTime','Available'),(6,2,8,'Roshan Deva','0783333333','199812345673','1998-11-25','Male','Kandy',3,'Weekend','Available');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licensetype`
--

DROP TABLE IF EXISTS `licensetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licensetype` (
  `LicenseID` int NOT NULL,
  `LoginID` int DEFAULT NULL,
  `License_Type` enum('Motorcycle','Light Vehicle','Heavy Vehicle') DEFAULT NULL,
  PRIMARY KEY (`LicenseID`),
  KEY `LoginID` (`LoginID`),
  CONSTRAINT `licensetype_ibfk_1` FOREIGN KEY (`LoginID`) REFERENCES `login` (`LoginID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licensetype`
--

LOCK TABLES `licensetype` WRITE;
/*!40000 ALTER TABLE `licensetype` DISABLE KEYS */;
INSERT INTO `licensetype` VALUES (1,27,'Motorcycle'),(2,27,'Heavy Vehicle');
/*!40000 ALTER TABLE `licensetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `LoginID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `UserRole` enum('Admin','DrivingSchool','Student','Instructor') DEFAULT NULL,
  PRIMARY KEY (`LoginID`),
  UNIQUE KEY `Email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'colombodrive@gmail.com','Drive@123','DrivingSchool'),(2,'citydrive@gmail.com','Drive@456','DrivingSchool'),(3,'kasun@gmail.com','Kasun@123','Instructor'),(4,'nimal@gmail.com','Nimal@123','Instructor'),(5,'sahan@gmail.com','Sahan@123','Instructor'),(6,'amal@gmail.com','Amal@123','Instructor'),(7,'tharindu@gmail.com','Tharindu@123','Instructor'),(8,'roshan@gmail.com','Roshan@123','Instructor'),(9,'john@gmail.com','John@123','Student'),(10,'kamal@gmail.com','Kamal@123','Student'),(11,'saman@gmail.com','Saman@123','Student'),(12,'dilshan@gmail.com','Dilshan@123','Student'),(13,'nuwan@gmail.com','Nuwan@123','Student'),(14,'arun@gmail.com','Arun@123','Student'),(15,'praveen@gmail.com','Praveen@123','Student'),(16,'mohan@gmail.com','Mohan@123','Student'),(17,'ravi@gmail.com','Ravi@123','Student'),(18,'vimal@gmail.com','Vimal@123','Student'),(19,'safedrive@gmail.com','SafeDrive@123','DrivingSchool'),(20,'iqgowthaman@gmail.com','gdueguduegd','Student'),(22,'iqgowthassman@gmail.com','efwefewfef','Student'),(23,'iqgowthamddan@gmail.com','fefewfwefew','Student'),(25,'iqgowthamddwwwan@gmail.com','fefewfwefew','Student'),(26,'iqgowtwwhamddwwwan@gmail.com','fefewfwefew','Student'),(27,'iqgoedeewthdaman@gmail.com','wdwdwdwwd','Student'),(29,'iqgowthafefeefeeman@gmail.com','fewfewfewf','DrivingSchool'),(31,'iqgcdeowthafefeefeeman@gmail.com','fewfewfewf','DrivingSchool'),(32,'iqgcdeowthafefeefeemcsan@gmail.com','fewfewfewf','DrivingSchool'),(33,'iqgtrgcdeowthafefeefeemcsan@gmail.com','fewfewfewf','DrivingSchool'),(35,'eeeiqgtrgcdeowthafefeefeemcsan@gmail.com','fewfewfewf','DrivingSchool'),(36,'prawes@gmail.com','fewfewfewf','DrivingSchool'),(37,'wtehsnnen@gmail.com','ferfrfr445g5','DrivingSchool'),(38,'teysajhb@gmail.com','vergergregrehre','DrivingSchool'),(40,'teyseybsajhb@gmail.com','eewfewfewfe','DrivingSchool'),(41,'teyb@gmail.com','','DrivingSchool'),(42,'te2yb@gmail.com','edededed','DrivingSchool');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `PayID` int NOT NULL AUTO_INCREMENT,
  `DsID` int NOT NULL,
  `StuID` int NOT NULL,
  `Payment_Date` date NOT NULL,
  `Amount` int NOT NULL,
  `Method` enum('Cash','Card') NOT NULL,
  PRIMARY KEY (`PayID`),
  KEY `StuID` (`StuID`),
  KEY `DsID` (`DsID`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`DsID`) REFERENCES `drivingschool` (`DsID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,11,'2026-07-01',50000,'Cash'),(2,1,12,'2026-07-02',75000,'Card'),(3,1,13,'2026-07-03',50000,'Cash'),(4,1,14,'2026-07-04',75000,'Card'),(5,1,15,'2026-07-05',50000,'Cash'),(6,2,16,'2026-07-06',60000,'Card'),(7,2,17,'2026-07-07',75000,'Cash'),(8,2,18,'2026-07-08',50000,'Card'),(9,2,19,'2026-07-09',75000,'Cash'),(10,2,20,'2026-07-10',60000,'Card');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `LessonID` int NOT NULL AUTO_INCREMENT,
  `StuID` int NOT NULL,
  `InsID` int NOT NULL,
  `Lesson_Date` date NOT NULL,
  `Lesson_Time` time NOT NULL,
  `Status` enum('Completed','InProgress','Scheduled') DEFAULT NULL,
  `Attendance` enum('Present','Absent','Pending') DEFAULT 'Pending',
  PRIMARY KEY (`LessonID`),
  KEY `InsID` (`InsID`),
  KEY `StuID` (`StuID`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`InsID`) REFERENCES `instructor` (`InsID`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`StuID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,11,1,'2026-07-15','08:00:00','Completed','Present'),(2,12,2,'2026-07-15','10:00:00','Completed','Present'),(3,13,3,'2026-07-16','09:30:00','Completed','Pending'),(4,14,4,'2026-07-16','14:00:00','InProgress','Absent'),(5,15,5,'2026-07-17','11:00:00','Scheduled','Pending'),(6,16,6,'2026-07-17','15:30:00','Scheduled','Pending'),(7,17,1,'2026-07-18','08:30:00','Scheduled','Pending'),(8,18,2,'2026-07-18','13:00:00','Scheduled','Pending');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `StuID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `DsID` int NOT NULL,
  `CourseID` int NOT NULL,
  `InsID` int DEFAULT NULL,
  `FeeStatus` enum('Paid','Pending') DEFAULT NULL,
  `Attendance` int NOT NULL,
  `Status` enum('Training','TestReady','Completed','OnHold') DEFAULT NULL,
  PRIMARY KEY (`StuID`),
  KEY `DsID` (`DsID`),
  KEY `InsID` (`InsID`),
  KEY `UserID` (`UserID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`DsID`) REFERENCES `drivingschool` (`DsID`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`InsID`) REFERENCES `instructor` (`InsID`),
  CONSTRAINT `student_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `student_ibfk_4` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (11,11,1,1,1,'Paid',5,'Training'),(12,12,1,1,2,'Pending',3,'Training'),(13,13,1,2,3,'Paid',10,'TestReady'),(14,14,1,2,1,'Paid',20,'Completed'),(16,16,2,3,4,'Paid',6,'TestReady'),(17,17,2,3,5,'Pending',4,'Training'),(18,18,2,4,6,'Paid',15,'TestReady'),(19,19,2,4,4,'Paid',25,'Training');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `LoginID` int NOT NULL,
  `Fname` varchar(100) NOT NULL,
  `Lname` varchar(100) NOT NULL,
  `NIC` varchar(20) NOT NULL,
  `PhoneNo` varchar(15) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` varchar(10) NOT NULL,
  `S_Address` varchar(255) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `P_Code` int NOT NULL,
  `Trans_Prefer` enum('Automatic','Manual') NOT NULL,
  `Drive_Exp` enum('C_Beginner','S_Experience','Intermediate','Advanced') NOT NULL,
  `Pref_LessonTime` enum('AnyTime','Mrng','Afternoon','Evening','Weekends') NOT NULL,
  `Notes` varchar(255) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `NIC` (`NIC`),
  KEY `LoginID` (`LoginID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`LoginID`) REFERENCES `login` (`LoginID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,9,'John','Silva','200112345678','0711111111','2001-01-10','Male','Colombo','Colombo','Western',10000,'Automatic','C_Beginner','Evening',''),(12,10,'Kamal','Perera','200212345678','0712222222','2002-02-15','Male','Colombo','Colombo','Western',10000,'Manual','C_Beginner','Mrng',''),(13,11,'Saman','Fernando','200312345678','0713333333','2003-03-20','Male','Colombo','Colombo','Western',10000,'Automatic','Intermediate','Weekends',''),(14,12,'Dilshan','Silva','200412345678','0714444444','2004-04-25','Male','Colombo','Colombo','Western',10000,'Manual','C_Beginner','Evening',''),(15,13,'Nuwan','Perera','200512345678','0715555555','2005-05-30','Male','Colombo','Colombo','Western',10000,'Automatic','C_Beginner','Weekends',''),(16,14,'Arun','Kumar','200612345678','0721111111','2006-06-10','Male','Kandy','Kandy','Central',20000,'Automatic','C_Beginner','Evening',''),(17,15,'Praveen','Raj','200712345678','0722222222','2007-07-15','Male','Kandy','Kandy','Central',20000,'Manual','C_Beginner','Mrng',''),(18,16,'Mohan','Silva','200812345678','0723333333','2008-08-20','Male','Kandy','Kandy','Central',20000,'Automatic','Intermediate','Weekends',''),(19,17,'Ravi','Perera','200912345678','0724444444','2009-09-25','Male','Kandy','Kandy','Central',20000,'Manual','C_Beginner','Evening',''),(20,18,'Vimal','Fernando','201012345678','0725555555','2010-10-30','Male','Kandy','Kandy','Central',20000,'Automatic','C_Beginner','Weekends',''),(21,26,'Gowthaman','Navarathnarajah','2004162100340','+94760403533','2026-07-01','male','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','efee',10350,'Automatic','Intermediate','Evening','adewdew'),(22,27,'Gowthaman','Navarathnarajah','200416100340','+94760403533','2026-07-21','female','16 Vanderwart Place,Dehiwala,undefined','Dehiwala','efee',10350,'Manual','Intermediate','Afternoon','adwedwe');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `VehID` int NOT NULL AUTO_INCREMENT,
  `DsID` int NOT NULL,
  `InsID` int DEFAULT NULL,
  `VehNo` varchar(15) NOT NULL,
  `Brand` varchar(10) NOT NULL,
  `Model` varchar(10) NOT NULL,
  `FuelType` enum('Petrol','Diesel','Hybrid','Electric') NOT NULL,
  `Mileage` int NOT NULL,
  `Transmission` enum('Automatic','Manual') NOT NULL,
  `Make_Year` int NOT NULL,
  `Status` enum('Available','In Lesson','Maintenance') NOT NULL DEFAULT 'Available',
  `Remarks` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`VehID`),
  UNIQUE KEY `VehNo` (`VehNo`),
  KEY `DsID` (`DsID`),
  KEY `InsID` (`InsID`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`DsID`) REFERENCES `drivingschool` (`DsID`),
  CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`InsID`) REFERENCES `instructor` (`InsID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,1,1,'WP CAB-1234','Toyota','Aqua','Hybrid',45000,'Automatic',2018,'Available','Training vehicle'),(2,1,2,'WP CAA-5678','Suzuki','Alto','Petrol',60000,'Manual',2017,'Available','Beginner training'),(3,1,3,'WP CAH-9012','Honda','Fit','Hybrid',35000,'Automatic',2020,'In Lesson','Assigned vehicle'),(4,2,4,'CP BCD-2345','Toyota','Vitz','Petrol',50000,'Manual',2019,'Available','Training vehicle'),(5,2,5,'CP BEF-6789','Honda','Grace','Hybrid',30000,'Automatic',2021,'Available','New vehicle'),(6,2,6,'CP BGH-3456','Suzuki','Wagon R','Petrol',70000,'Manual',2016,'Maintenance','Service required');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-17  6:05:59
