-- MySQL Workbench Forward Engineering (Metadata)

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Creación del Schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parkingcontrol_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `parkingcontrol_db` ;

---

-- -----------------------------------------------------
-- Table `rol` (Tabla de catálogo, independiente)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`rol` (
  `id_rol` INT NOT NULL,
  `nombre_rol` VARCHAR(15) NOT NULL,
  `descripcion` TINYTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `nombre_rol_UNIQUE` (`nombre_rol` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `usuario` (Depende de `rol`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`usuario` (
  `id_usuario` INT NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `estado` ENUM('Activo', 'Ausente') NULL DEFAULT 'Activo', -- DEFAULT agregado
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- DEFAULT agregado
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE, -- Agregada unicidad para el username
  INDEX `fk_usuario_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `parkingcontrol_db`.`rol` (`id_rol`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `espacio` (Independiente, para inicialización)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`espacio` (
  `id_espacio` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(5) NOT NULL, -- Aumentado a 5 por formato 'A-01'
  `letra_espacio` VARCHAR(1) NOT NULL,
  `estado` ENUM('libre', 'ocupado', 'reservado') NULL DEFAULT 'libre',
  PRIMARY KEY (`id_espacio`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE, -- Agregada unicidad al código
  INDEX `idx_estado` (`estado` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `vehiculos` (Se limpiaron columnas de reserva para ser consistentes con `reserva`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`vehiculos` (
  `id_vehiculo` INT NOT NULL AUTO_INCREMENT, -- AUTO_INCREMENT agregado
  `placa` VARCHAR(20) NOT NULL,
  `tipo_vehiculo` ENUM('Sedan', 'SUV', 'Moto' ,'Camioneta',) NOT NULL,
  `fecha_registro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- DEFAULT agregado
  `id_espacio` INT NULL, -- Permite NULL si el vehículo ya salió del parqueo
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE INDEX `placa_UNIQUE` (`placa` ASC) VISIBLE,
  INDEX `fk_vehiculo_espacio_idx` (`id_espacio` ASC) VISIBLE,
  CONSTRAINT `fk_vehiculo_espacio`
    FOREIGN KEY (`id_espacio`)
    REFERENCES `parkingcontrol_db`.`espacio` (`id_espacio`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tarifa` (Tabla de catálogo, independiente)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`tarifa` (
  `id_tarifa` INT NOT NULL,
  `tipo_vehiculo` ENUM('Bus', 'Camioneta', 'Carro') NOT NULL,
  `precio_hora` DECIMAL(10,4) NOT NULL,
  `fecha_vigencia_inicio` DATE NOT NULL,
  `fecha_vigencia_fin` DATE NULL DEFAULT NULL,
  `estado` ENUM('En vigencia', 'Pasado') NULL DEFAULT 'En vigencia',
  PRIMARY KEY (`id_tarifa`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reserva` (Depende de `espacio` y `usuario`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`reserva` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT, -- AUTO_INCREMENT agregado
  `motivo` VARCHAR(255) NULL DEFAULT NULL,
  `duracion` VARCHAR(100) NULL DEFAULT NULL,
  `id_espacio` INT NOT NULL,
  `id_usuario_creador` INT NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_fin` DATETIME NOT NULL,
  PRIMARY KEY (`id_reserva`),
  INDEX `fk_reserva_espacio_idx` (`id_espacio` ASC) VISIBLE,
  INDEX `fk_reserva_usuario_idx` (`id_usuario_creador` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_espacio`
    FOREIGN KEY (`id_espacio`)
    REFERENCES `parkingcontrol_db`.`espacio` (`id_espacio`),
  CONSTRAINT `fk_reserva_usuario`
    FOREIGN KEY (`id_usuario_creador`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ticket` (Tabla transaccional central, depende de todo)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT, -- AUTO_INCREMENT agregado
  `codigo_ticket` VARCHAR(50) NOT NULL,
  `hora_entrada` DATETIME NOT NULL,
  `hora_salida` DATETIME NULL DEFAULT NULL,
  `tiempo_permanencia` INT NULL DEFAULT NULL,
  `monto_total` DECIMAL(10,2) NULL DEFAULT NULL,
  `estado` ENUM('Emitido', 'Cobrado', 'Anulado') NULL DEFAULT 'Emitido', -- Cambiado a 'Cobrado' por lógica de pago
  `fecha_emision` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- DEFAULT agregado
  `id_vehiculo` INT NOT NULL,
  `id_espacio` INT NOT NULL,
  `id_usuario_entrada` INT NOT NULL,
  `id_usuario_salida` INT NULL DEFAULT NULL,
  `id_tarifa` INT NOT NULL,
  PRIMARY KEY (`id_ticket`),
  UNIQUE INDEX `codigo_ticket_UNIQUE` (`codigo_ticket` ASC) VISIBLE, -- Agregada unicidad al código
  INDEX `fk_ticket_vehiculo_idx` (`id_vehiculo` ASC) VISIBLE,
  INDEX `fk_ticket_espacio_idx` (`id_espacio` ASC) VISIBLE,
  INDEX `fk_ticket_usuario_entrada_idx` (`id_usuario_entrada` ASC) VISIBLE,
  INDEX `fk_ticket_usuario_salida_idx` (`id_usuario_salida` ASC) VISIBLE,
  INDEX `fk_ticket_tarifa_idx` (`id_tarifa` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_espacio`
    FOREIGN KEY (`id_espacio`)
    REFERENCES `parkingcontrol_db`.`espacio` (`id_espacio`),
  CONSTRAINT `fk_ticket_tarifa`
    FOREIGN KEY (`id_tarifa`)
    REFERENCES `parkingcontrol_db`.`tarifa` (`id_tarifa`),
  CONSTRAINT `fk_ticket_usuario_entrada`
    FOREIGN KEY (`id_usuario_entrada`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`),
  CONSTRAINT `fk_ticket_usuario_salida`
    FOREIGN KEY (`id_usuario_salida`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`),
  CONSTRAINT `fk_ticket_vehiculo`
    FOREIGN KEY (`id_vehiculo`)
    REFERENCES `parkingcontrol_db`.`vehiculos` (`id_vehiculo`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reporte` (Depende de `usuario`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`reporte` (
  `id_reporte` INT NOT NULL AUTO_INCREMENT, -- AUTO_INCREMENT agregado
  `tipo_reporte` ENUM('Parcial', 'Final', 'Rapido') NOT NULL,
  `fecha_generacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- DEFAULT agregado
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `total_ingresos` DECIMAL(10,2) NULL DEFAULT NULL,
  `total_vehiculos` INT NULL DEFAULT NULL,
  `promedio_ocupacion` DECIMAL(5,2) NULL DEFAULT NULL,
  `ruta_archivo` VARCHAR(255) NULL DEFAULT NULL,
  `formato` ENUM('Excel', 'PDF') NOT NULL, -- Agregado 'PDF'
  `id_usuario_generador` INT NOT NULL,
  PRIMARY KEY (`id_reporte`),
  INDEX `fk_reporte_usuario_idx` (`id_usuario_generador` ASC) VISIBLE,
  CONSTRAINT `fk_reporte_usuario`
    FOREIGN KEY (`id_usuario_generador`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

---

## 🏗️ Inicialización de Datos

-- -----------------------------------------------------
-- 1. Insertar el rol 'admin'
-- -----------------------------------------------------
INSERT IGNORE INTO rol (id_rol, nombre_rol, descripcion) VALUES (1, 'admin', 'Administrador del sistema');

-- -----------------------------------------------------
-- 2. Insertar usuario 'admin'
-- -----------------------------------------------------
INSERT IGNORE INTO usuario (id_usuario, username, password, nombre_completo, email, estado, fecha_creacion, id_rol)
VALUES (1, 'admin', 'admin', 'Administrador', 'admin@correo.com', 'Activo', NOW(), 1);

-- -----------------------------------------------------
-- 3. Generar espacios de parqueo (4 zonas x 10 espacios = 40 espacios)
-- CORREGIDO: Se usa INSERT IGNORE INTO y se elimina ON DUPLICATE KEY UPDATE.
-- -----------------------------------------------------
INSERT IGNORE INTO espacio (codigo, letra_espacio, estado)
SELECT 
    CONCAT(letter, '-', LPAD(number, 2, '0')), -- Genera A-01, B-05, etc.
    letter, 
    'libre'
FROM (
    SELECT 'A' AS letter UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D'
) AS letters
CROSS JOIN (
    SELECT 1 AS number UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) AS numbers;
-- ON DUPLICATE KEY UPDATE codigo=codigo; -- Esta línea es la que causaba el error y se elimina.

-- -----------------------------------------------------
-- Restauración de configuraciones
-- -----------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;