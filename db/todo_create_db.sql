-- MySQL Script generated by MySQL Workbench
-- Sat Mar  2 13:03:59 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tododb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tododb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tododb` DEFAULT CHARACTER SET utf8 ;
USE `tododb` ;

-- -----------------------------------------------------
-- Table `tododb`.`Users`
-- -----------------------------------------------------
DROP TABLE `tododb`.`Users`;
CREATE TABLE IF NOT EXISTS `tododb`.`Users` (
  `userIdx` INT NOT NULL auto_increment,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT 'A',
  `createdAt` TIMESTAMP NULL DEFAULT current_timestamp,
  `updatedAt` TIMESTAMP NULL DEFAULT current_timestamp on update current_timestamp,
  `Userscol` VARCHAR(45) NULL,
  PRIMARY KEY (`userIdx`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tododb`.`Todos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tododb`.`Todos` (
  `todoIdx` INT NOT NULL AUTO_INCREMENT,
  `userIdx` INT NOT NULL,
  `contents` TEXT NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `status` CHAR(1) NULL DEFAULT 'A',
  `createdAt` TIMESTAMP NULL DEFAULT current_timestamp,
  `updateAt` TIMESTAMP NULL DEFAULT current_timestamp on update current_timestamp,
  `Todoscol` VARCHAR(45) NULL,
  PRIMARY KEY (`todoIdx`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
