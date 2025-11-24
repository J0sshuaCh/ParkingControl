SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- 1. Reiniciar Schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `parkingcontrol_db`;

CREATE SCHEMA IF NOT EXISTS `parkingcontrol_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `parkingcontrol_db`;

-- -----------------------------------------------------
-- 2. Creación de Tablas
-- -----------------------------------------------------

-- Tabla `rol`
CREATE TABLE IF NOT EXISTS `rol` (
    `id_rol` INT NOT NULL,
    `nombre_rol` VARCHAR(15) NOT NULL,
    `descripcion` TINYTEXT NULL DEFAULT NULL,
    PRIMARY KEY (`id_rol`),
    UNIQUE INDEX `nombre_rol_UNIQUE` (`nombre_rol` ASC) VISIBLE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `usuario`
CREATE TABLE IF NOT EXISTS `usuario` (
    `id_usuario` INT NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nombre_completo` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL DEFAULT NULL,
    `estado` ENUM('Activo', 'Ausente') NULL DEFAULT 'Activo',
    `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `id_rol` INT NOT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    INDEX `fk_usuario_rol_idx` (`id_rol` ASC) VISIBLE,
    CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `espacio`
CREATE TABLE IF NOT EXISTS `espacio` (
    `id_espacio` INT NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(5) NOT NULL, -- Formato A-01
    `letra_espacio` VARCHAR(1) NOT NULL,
    `estado` ENUM(
        'libre',
        'ocupado',
        'reservado'
    ) NULL DEFAULT 'libre',
    PRIMARY KEY (`id_espacio`),
    UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
    INDEX `idx_estado` (`estado` ASC) VISIBLE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `vehiculos` (Sin opción 'Bus')
CREATE TABLE IF NOT EXISTS `vehiculos` (
    `id_vehiculo` INT NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(20) NOT NULL,
    `tipo_vehiculo` ENUM(
        'Sedan',
        'SUV',
        'Compacto',
        'Camioneta',
        'Moto'
    ) NOT NULL,
    `fecha_registro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `id_espacio` INT NULL,
    PRIMARY KEY (`id_vehiculo`),
    UNIQUE INDEX `placa_UNIQUE` (`placa` ASC) VISIBLE,
    INDEX `fk_vehiculo_espacio_idx` (`id_espacio` ASC) VISIBLE,
    CONSTRAINT `fk_vehiculo_espacio` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id_espacio`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `tarifa` (Sin opción 'Bus')
CREATE TABLE IF NOT EXISTS `tarifa` (
    `id_tarifa` INT NOT NULL AUTO_INCREMENT,
    `tipo_vehiculo` ENUM(
        'Sedan',
        'SUV',
        'Compacto',
        'Camioneta',
        'Moto'
    ) NOT NULL,
    `precio_hora` DECIMAL(10, 4) NOT NULL,
    `fecha_vigencia_inicio` DATE NOT NULL,
    `fecha_vigencia_fin` DATE NULL DEFAULT NULL,
    `estado` ENUM('En vigencia', 'Pasado') NULL DEFAULT 'En vigencia',
    PRIMARY KEY (`id_tarifa`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `reserva`
CREATE TABLE IF NOT EXISTS `reserva` (
    `id_reserva` INT NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(255) NULL DEFAULT NULL,
    `duracion` VARCHAR(100) NULL DEFAULT NULL,
    `id_espacio` INT NOT NULL,
    `id_usuario_creador` INT NOT NULL,
    `fecha_inicio` DATETIME NOT NULL,
    `fecha_fin` DATETIME NOT NULL,
    PRIMARY KEY (`id_reserva`),
    INDEX `fk_reserva_espacio_idx` (`id_espacio` ASC) VISIBLE,
    INDEX `fk_reserva_usuario_idx` (`id_usuario_creador` ASC) VISIBLE,
    CONSTRAINT `fk_reserva_espacio` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id_espacio`),
    CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuario` (`id_usuario`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `ticket` (Estado actualizado a 'Pagado')
CREATE TABLE IF NOT EXISTS `ticket` (
    `id_ticket` INT NOT NULL AUTO_INCREMENT,
    `codigo_ticket` VARCHAR(50) NOT NULL,
    `hora_entrada` DATETIME NOT NULL,
    `hora_salida` DATETIME NULL DEFAULT NULL,
    `tiempo_permanencia` INT NULL DEFAULT NULL,
    `monto_total` DECIMAL(10, 2) NULL DEFAULT NULL,
    `estado` ENUM(
        'Emitido',
        'Pagado',
        'Anulado'
    ) NULL DEFAULT 'Emitido',
    `fecha_emision` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `id_vehiculo` INT NOT NULL,
    `id_espacio` INT NOT NULL,
    `id_usuario_entrada` INT NOT NULL,
    `id_usuario_salida` INT NULL DEFAULT NULL,
    `id_tarifa` INT NOT NULL,
    PRIMARY KEY (`id_ticket`),
    UNIQUE INDEX `codigo_ticket_UNIQUE` (`codigo_ticket` ASC) VISIBLE,
    INDEX `fk_ticket_vehiculo_idx` (`id_vehiculo` ASC) VISIBLE,
    INDEX `fk_ticket_espacio_idx` (`id_espacio` ASC) VISIBLE,
    INDEX `fk_ticket_usuario_entrada_idx` (`id_usuario_entrada` ASC) VISIBLE,
    INDEX `fk_ticket_usuario_salida_idx` (`id_usuario_salida` ASC) VISIBLE,
    INDEX `fk_ticket_tarifa_idx` (`id_tarifa` ASC) VISIBLE,
    CONSTRAINT `fk_ticket_espacio` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id_espacio`),
    CONSTRAINT `fk_ticket_tarifa` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifa` (`id_tarifa`),
    CONSTRAINT `fk_ticket_usuario_entrada` FOREIGN KEY (`id_usuario_entrada`) REFERENCES `usuario` (`id_usuario`),
    CONSTRAINT `fk_ticket_usuario_salida` FOREIGN KEY (`id_usuario_salida`) REFERENCES `usuario` (`id_usuario`),
    CONSTRAINT `fk_ticket_vehiculo` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculo`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- Tabla `reporte`
CREATE TABLE IF NOT EXISTS `reporte` (
    `id_reporte` INT NOT NULL AUTO_INCREMENT,
    `tipo_reporte` ENUM('Parcial', 'Final', 'Rapido') NOT NULL,
    `fecha_generacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `total_ingresos` DECIMAL(10, 2) NULL DEFAULT NULL,
    `total_vehiculos` INT NULL DEFAULT NULL,
    `promedio_ocupacion` DECIMAL(5, 2) NULL DEFAULT NULL,
    `ruta_archivo` VARCHAR(255) NULL DEFAULT NULL,
    `formato` ENUM('Excel', 'PDF') NOT NULL,
    `id_usuario_generador` INT NOT NULL,
    PRIMARY KEY (`id_reporte`),
    INDEX `fk_reporte_usuario_idx` (`id_usuario_generador` ASC) VISIBLE,
    CONSTRAINT `fk_reporte_usuario` FOREIGN KEY (`id_usuario_generador`) REFERENCES `usuario` (`id_usuario`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- 3. Inserción de Datos Iniciales
-- -----------------------------------------------------

-- A. Insertar Rol Admin
INSERT INTO
    rol (
        id_rol,
        nombre_rol,
        descripcion
    )
VALUES (
        1,
        'admin',
        'Administrador del sistema'
    );

-- B. Insertar Usuario Admin (password: admin)
INSERT INTO
    usuario (
        id_usuario,
        username,
        password,
        nombre_completo,
        email,
        estado,
        fecha_creacion,
        id_rol
    )
VALUES (
        1,
        'admin',
        'admin',
        'Administrador',
        'admin@correo.com',
        'Activo',
        NOW(),
        1
    );

-- C. Insertar Tarifas Base (Sin Bus)
INSERT INTO
    tarifa (
        tipo_vehiculo,
        precio_hora,
        fecha_vigencia_inicio,
        estado
    )
VALUES (
        'Sedan',
        5.00,
        NOW(),
        'En vigencia'
    ),
    (
        'SUV',
        7.00,
        NOW(),
        'En vigencia'
    ),
    (
        'Compacto',
        4.00,
        NOW(),
        'En vigencia'
    ),
    (
        'Moto',
        2.50,
        NOW(),
        'En vigencia'
    ),
    (
        'Camioneta',
        8.00,
        NOW(),
        'En vigencia'
    );

-- D. Generar Espacios (40 espacios: A-01 a D-10)
INSERT INTO
    espacio (codigo, letra_espacio, estado)
SELECT CONCAT(
        letter, '-', LPAD(number, 2, '0')
    ), letter, 'libre'
FROM (
        SELECT 'A' AS letter
        UNION
        SELECT 'B'
        UNION
        SELECT 'C'
        UNION
        SELECT 'D'
    ) AS letters
    CROSS JOIN (
        SELECT 1 AS number
        UNION
        SELECT 2
        UNION
        SELECT 3
        UNION
        SELECT 4
        UNION
        SELECT 5
        UNION
        SELECT 6
        UNION
        SELECT 7
        UNION
        SELECT 8
        UNION
        SELECT 9
        UNION
        SELECT 10
    ) AS numbers
ORDER BY letter, number;

-- -----------------------------------------------------
-- Restauración de configuraciones
-- -----------------------------------------------------
SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;