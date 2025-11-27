-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema parkingcontrol_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema parkingcontrol_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parkingcontrol_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `parkingcontrol_db` ;

-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`espacio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`espacio` (
  `id_espacio` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(5) NOT NULL,
  `letra_espacio` VARCHAR(1) NOT NULL,
  `estado` ENUM('libre', 'ocupado', 'reservado') NULL DEFAULT 'libre',
  PRIMARY KEY (`id_espacio`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
  INDEX `idx_estado` (`estado` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 64
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`rol` (
  `id_rol` INT NOT NULL,
  `nombre_rol` VARCHAR(15) NOT NULL,
  `descripcion` TINYTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `nombre_rol_UNIQUE` (`nombre_rol` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`usuario` (
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
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `parkingcontrol_db`.`rol` (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`reporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`reporte` (
  `id_reporte` INT NOT NULL AUTO_INCREMENT,
  `tipo_reporte` ENUM('Parcial', 'Final', 'Rapido') NOT NULL,
  `fecha_generacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `total_ingresos` DECIMAL(10,2) NULL DEFAULT NULL,
  `total_vehiculos` INT NULL DEFAULT NULL,
  `promedio_ocupacion` DECIMAL(5,2) NULL DEFAULT NULL,
  `ruta_archivo` VARCHAR(255) NULL DEFAULT NULL,
  `formato` ENUM('Excel', 'PDF') NOT NULL,
  `id_usuario_generador` INT NOT NULL,
  PRIMARY KEY (`id_reporte`),
  INDEX `fk_reporte_usuario_idx` (`id_usuario_generador` ASC) VISIBLE,
  CONSTRAINT `fk_reporte_usuario`
    FOREIGN KEY (`id_usuario_generador`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`reserva` (
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
  CONSTRAINT `fk_reserva_espacio`
    FOREIGN KEY (`id_espacio`)
    REFERENCES `parkingcontrol_db`.`espacio` (`id_espacio`),
  CONSTRAINT `fk_reserva_usuario`
    FOREIGN KEY (`id_usuario_creador`)
    REFERENCES `parkingcontrol_db`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`tarifa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`tarifa` (
  `id_tarifa` INT NOT NULL AUTO_INCREMENT,
  `tipo_vehiculo` ENUM('Sedan', 'SUV', 'Compacto', 'Camioneta', 'Moto') NOT NULL,
  `precio_hora` DECIMAL(10,4) NOT NULL,
  `fecha_vigencia_inicio` DATE NOT NULL,
  `fecha_vigencia_fin` DATE NULL DEFAULT NULL,
  `estado` ENUM('En vigencia', 'Pasado') NULL DEFAULT 'En vigencia',
  PRIMARY KEY (`id_tarifa`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`vehiculos` (
  `id_vehiculo` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(20) NOT NULL,
  `tipo_vehiculo` ENUM('Sedan', 'SUV', 'Compacto', 'Camioneta', 'Moto') NOT NULL,
  `fecha_registro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `id_espacio` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE INDEX `placa_UNIQUE` (`placa` ASC) VISIBLE,
  INDEX `fk_vehiculo_espacio_idx` (`id_espacio` ASC) VISIBLE,
  CONSTRAINT `fk_vehiculo_espacio`
    FOREIGN KEY (`id_espacio`)
    REFERENCES `parkingcontrol_db`.`espacio` (`id_espacio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `parkingcontrol_db`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkingcontrol_db`.`ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `codigo_ticket` VARCHAR(50) NOT NULL,
  `hora_entrada` DATETIME NOT NULL,
  `hora_salida` DATETIME NULL DEFAULT NULL,
  `tiempo_permanencia` INT NULL DEFAULT NULL,
  `monto_total` DECIMAL(10,2) NULL DEFAULT NULL,
  `estado` ENUM('Emitido', 'Pagado', 'Anulado') NULL DEFAULT 'Emitido',
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
    REFERENCES `parkingcontrol_db`.`vehiculos` (`id_vehiculo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `parkingcontrol_db` ;

-- -----------------------------------------------------
-- function fn_verificar_contrasena
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_verificar_contrasena`(
    p_nombre_usuario VARCHAR(50),
    p_contrasena_texto_plano VARCHAR(255)
) RETURNS tinyint(1)
    READS SQL DATA
BEGIN
    DECLARE v_hash_almacenado CHAR(64); -- Para SHA-256 (64 caracteres)
    DECLARE v_hash_calculado CHAR(64);
    DECLARE v_existe_usuario INT;

    -- 1. Buscar el hash y la sal del usuario en la base de datos
    SELECT 
        contrasena_hash, 
        1
    INTO 
        v_hash_almacenado, 
        v_existe_usuario
    FROM Usuarios
    WHERE nombre_usuario = p_nombre_usuario
    LIMIT 1;

    -- 2. Verificar si el usuario existe
    IF v_existe_usuario IS NULL THEN
        RETURN FALSE; -- El usuario no existe
    END IF;

    -- 3. Recalcular el hash con la sal recuperada
    -- La lógica debe ser la misma que la utilizada durante la inserción: SHA2(salt + contraseña)
    SET v_hash_calculado = SHA2(p_contrasena_texto_plano, 256);
    
    -- 4. Comparar el hash calculado con el hash almacenado
    IF v_hash_calculado = v_hash_almacenado THEN
        RETURN TRUE; -- Coincide la contraseña
    ELSE
        RETURN FALSE; -- No coincide la contraseña
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_actualizar_ticket
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_ticket`(
    -- PARAMETRO OBLIGATORIO: Identificador del registro a modificar
    p_id_ticket INT,
    
    -- PARAMETROS OPCIONALES: Campos que suelen actualizarse al momento de la salida/pago.
    -- El valor por defecto es NULL, lo que permite a la aplicación pasar NULL para borrar el campo si es necesario.
    p_hora_salida DATETIME,
    p_tiempo_permanencia INT,
    p_monto_total DECIMAL(10, 2),
    p_estado ENUM('Emitido', 'Pagado', 'Anulado'), -- Se asume la lista de ENUMs
    p_id_usuario_salida INT
)
    COMMENT 'Actualiza la información de un ticket existente, típicamente para registrar la salida, el cálculo del monto y el cambio de estado.'
BEGIN
    -- 1. Manejo de Transacción: Asegura que la operación de actualización sea atómica (total o nada)
    START TRANSACTION;

    -- 2. Actualización de los campos
    UPDATE `parkingcontrol_db`.`ticket`
    SET
        `hora_salida` = p_hora_salida,
        `tiempo_permanencia` = p_tiempo_permanencia,
        `monto_total` = p_monto_total,
        `estado` = p_estado,
        `id_usuario_salida` = p_id_usuario_salida
    WHERE
        `id_ticket` = p_id_ticket;
        
        
        
    -- 3. Confirmar la transacción (si no hay errores)
    COMMIT;

    -- 4. Devolver la cantidad de filas afectadas como feedback
    SELECT ROW_COUNT() AS filas_afectadas, CONCAT('Ticket ID: ', p_id_ticket, ' actualizado.') AS Mensaje;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_buscar_espacios_libres
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_espacios_libres`()
    COMMENT 'Devuelve todos los registros de espacios de parqueo cuyo estado es "Libre".'
BEGIN
    -- 1. Establecer el nivel de aislamiento de la transacción para solo lectura,
    --    lo que mejora el rendimiento de SELECTs
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    -- 2. Iniciar la transacción de solo lectura
    START TRANSACTION READ ONLY;

    -- 3. Consulta principal: Se utilizan comillas inversas (backticks) en los nombres
    --    de las columnas para evitar conflictos con palabras reservadas, aunque
    --    no es estrictamente necesario aquí, es una buena práctica.
    SELECT
        `id_espacio`,
        `numero_espacio`,
        `zona`,
        `tipo_espacio`
    FROM
        `parkingcontrol_db`.`espacio`
    WHERE
        `estado` = 'Libre';

    -- 4. Confirmar la transacción (incluso si es READ ONLY)
    COMMIT;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_buscar_ticket
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_ticket`(
    -- PARAMETRO OBLIGATORIO: El código único del ticket
    p_codigo_ticket VARCHAR(50)
)
    COMMENT 'Busca y retorna toda la información de un ticket usando su código único.'
BEGIN
    -- 1. Establecer el nivel de aislamiento de la transacción para solo lectura
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    -- 2. Iniciar la transacción de solo lectura
    START TRANSACTION READ ONLY;

    -- 3. Consulta principal: Busca el ticket por el código proporcionado.
    --    Se utiliza un WHERE para la búsqueda.
    SELECT
        `id_ticket`,
        `codigo_ticket`,
        `hora_entrada`,
        `hora_salida`,
        `tiempo_permanencia`,
        `monto_total`,
        `estado`,
        `fecha_emision`,
        `id_vehiculo`,
        `id_espacio`,
        `id_usuario_salida`,
        `id_tarifa`
    FROM
        `parkingcontrol_db`.`ticket`
    WHERE
        `codigo_ticket` = p_codigo_ticket;

    -- 4. Confirmar la transacción
    COMMIT;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_buscar_ticket_por_placa
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_ticket_por_placa`(
    -- PARAMETRO OBLIGATORIO: La placa del vehículo a buscar
    p_placa VARCHAR(20)
)
    COMMENT 'Busca y retorna toda la información de los tickets asociados a una placa de vehículo específica, usando JOIN.'
BEGIN
    -- 1. Establecer el nivel de aislamiento de la transacción para solo lectura
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    -- 2. Iniciar la transacción de solo lectura
    START TRANSACTION READ ONLY;

    -- 3. Consulta principal: Usa JOIN para relacionar Vehículo y Ticket
    SELECT
        T.`id_ticket`,
        T.`codigo_ticket`,
        T.`hora_entrada`,
        T.`hora_salida`,
        T.`tiempo_permanencia`,
        T.`monto_total`,
        T.`estado`,
        T.`fecha_emision`,
        T.`id_espacio`,
        T.`id_tarifa`,
        V.`placa`,                -- Incluimos la placa para confirmar la búsqueda
        V.`tipo_vehiculo`
    FROM
        `parkingcontrol_db`.`ticket` AS T  -- Alias T para la tabla Ticket
    INNER JOIN
        `parkingcontrol_db`.`vehiculos` AS V  -- Alias V para la tabla Vehículos
        ON T.id_vehiculo = V.id_vehiculo
    WHERE
        V.placa = p_placa;

    -- 4. Confirmar la transacción
    COMMIT;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_insertar_ticket
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_ticket`(
    -- PARAMETROS OBLIGATORIOS (NOT NULL)
    p_codigo_ticket VARCHAR(50),
    p_hora_entrada DATETIME,
    p_estado ENUM('Emitido', 'Anulado', 'Cobrado'), 
    p_id_vehiculo INT,
    p_id_espacio INT,
    p_id_usuario_entrada INT,
    p_id_tarifa INT,
    
    -- PARAMETROS OPCIONALES (NULLABLE)
    p_hora_salida DATETIME,
    p_tiempo_permanencia INT,
    p_monto_total DECIMAL(10, 2),
    p_id_usuario_salida INT
)
    COMMENT 'Inserta un nuevo registro de ticket en la tabla ticket. Los campos de salida (hora_salida, monto, etc.) son opcionales y se usan principalmente para la emisión inicial.'
BEGIN
    -- Declarar la variable para la fecha de emisión. 
    -- Se establece como la hora actual del servidor.
    DECLARE v_fecha_emision DATETIME DEFAULT NOW();

    -- Inserción de datos
    INSERT INTO `parkingcontrol_db`.`ticket` (
        `codigo_ticket`,
        `hora_entrada`,
        `hora_salida`,
        `tiempo_permanencia`,
        `monto_total`,
        `estado`,
        `fecha_emision`,
        `id_vehiculo`,
        `id_espacio`,
        `id_usuario_entrada`, -- Se asume que el usuario de entrada es el que ejecuta el SP o se pasa internamente (lo omitimos aquí por no ser obligatorio en el diseño de tabla)
        `id_usuario_salida`,
        `id_tarifa`
    )
    VALUES (
        p_codigo_ticket,
        p_hora_entrada,
        p_hora_salida,          -- Opcional (puede ser NULL)
        p_tiempo_permanencia,   -- Opcional (puede ser NULL)
        p_monto_total,          -- Opcional (puede ser NULL)
        p_estado,
        v_fecha_emision,        -- Valor generado por el SP
        p_id_vehiculo,
        p_id_espacio,
        p_id_usuario_entrada,                   -- Asumiendo que id_usuario_entrada es opcional y NULL por ahora
        p_id_usuario_salida,    -- Opcional (puede ser NULL)
        p_id_tarifa
    );

    -- Devolver el ID del ticket recién insertado (buena práctica)
    SELECT LAST_INSERT_ID() AS id_ticket_generado;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_insertar_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_usuario`(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email	  VARCHAR(100),
    IN p_nombre_completo VARCHAR(100),
    IN p_id_rol INT,
    IN p_id_usuario INT
)
BEGIN
    -- Insertar el nuevo usuario con la contraseña cifrada
    INSERT INTO Usuarios (username, password, nombre_completo, id_rol, fecha_creacion, estado, email)
    VALUES (p_username, SHA2(p_password, 256), p_nombre_completo, p_id_rol, NOW(), 'INACTIVO', p_email);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_marcar_espacio_libre
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_marcar_espacio_libre`(
    -- PARAMETRO OBLIGATORIO: El número de espacio a liberar
    p_numero_espacio VARCHAR(10)
)
    COMMENT 'Actualiza el estado de un espacio de parqueo a "Libre" basándose en su número de espacio.'
BEGIN
    -- 1. Manejo de Transacción: Asegura que el cambio de estado sea seguro
    START TRANSACTION;

    -- 2. Actualización del estado
    UPDATE `parkingcontrol_db`.`espacio`
    SET
        `estado` = 'Libre'
    WHERE
        `numero_espacio` = p_numero_espacio;
        
    -- 3. Verificación y Finalización
    -- Chequea si alguna fila fue actualizada
    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT CONCAT('Espacio ', p_numero_espacio, ' marcado como Libre.') AS Mensaje, ROW_COUNT() AS filas_afectadas;
    ELSE
        -- Si no se encontró el espacio, se hace ROLLBACK y se informa.
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No se encontró el espacio con el número proporcionado para liberar.';
    END IF;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_marcar_espacio_ocupado
-- -----------------------------------------------------

DELIMITER $$
USE `parkingcontrol_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_marcar_espacio_ocupado`(
    -- PARAMETRO OBLIGATORIO: El número de espacio a ocupar
    p_numero_espacio VARCHAR(10)
)
    COMMENT 'Actualiza el estado de un espacio de parqueo a "Ocupado" basándose en su número de espacio.'
BEGIN
    -- 1. Manejo de Transacción: Asegura la integridad de la actualización
    START TRANSACTION;

    -- 2. Actualización del estado
    UPDATE `parkingcontrol_db`.`espacio`
    SET
        `estado` = 'Ocupado'
    WHERE
        `numero_espacio` = p_numero_espacio;
        
    -- 3. Verificación y Finalización
    -- Chequea si alguna fila fue actualizada
    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT CONCAT('Espacio ', p_numero_espacio, ' marcado como Ocupado.') AS Mensaje, ROW_COUNT() AS filas_afectadas;
    ELSE
        -- Si no se encontró el espacio, se hace ROLLBACK y se informa.
        ROLLBACK;
        -- SIGNAL SQLSTATE es la forma recomendada de retornar errores en SPs
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No se encontró el espacio con el número proporcionado.';
    END IF;

END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
