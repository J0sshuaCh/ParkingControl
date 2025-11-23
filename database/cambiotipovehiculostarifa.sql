USE `parkingcontrol_db`;

-- 1. Desactivar verificación de llaves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- 2. Estandarizar datos existentes en 'tarifa' antes de cambiar la estructura
-- Si tienes tarifas creadas como 'Carro', las pasamos a 'Sedan'
UPDATE tarifa
SET
    tipo_vehiculo = 'Sedan'
WHERE
    tipo_vehiculo = 'Carro';

-- 3. Modificar la tabla 'vehiculos' con la lista completa
ALTER TABLE vehiculos
MODIFY COLUMN tipo_vehiculo ENUM(
    'Sedan',
    'SUV',
    'Compacto',
    'Camioneta',
    'Moto'
) NOT NULL;

-- 4. Modificar la tabla 'tarifa' con la MISMA lista completa
ALTER TABLE tarifa
MODIFY COLUMN tipo_vehiculo ENUM(
    'Sedan',
    'SUV',
    'Compacto',
    'Camioneta',
    'Moto'
) NOT NULL;

-- 5. Reactivar verificación
SET FOREIGN_KEY_CHECKS = 1;

-- Verificación visual
SELECT * FROM tarifa;