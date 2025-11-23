USE `parkingcontrol_db`;

-- 1. Desactivar seguridad de llaves foráneas para poder modificar tablas
SET FOREIGN_KEY_CHECKS = 0;

-- 3. Crear la tabla 'espacio' con la estructura CORRECTA (incluyendo 'codigo')
CREATE TABLE `espacio` (
    `id_espacio` INT NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(5) NOT NULL, -- Esta es la columna que faltaba
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

-- 4. Limpiar tablas relacionadas para evitar inconsistencias de datos antiguos
TRUNCATE TABLE `reserva`;

TRUNCATE TABLE `ticket`;

TRUNCATE TABLE `vehiculos`;

-- 5. Reactivar seguridad de llaves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- 6. Insertar los 40 espacios (Zonas A, B, C, D)
INSERT INTO
    espacio (codigo, letra_espacio, estado)
SELECT CONCAT(
        letter, '-', LPAD(number, 2, '0')
    ), -- Genera A-01, A-02...
    letter, 'libre'
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

-- 7. Verificar que la columna 'codigo' ahora existe y tiene datos
SELECT * FROM espacio LIMIT 40;