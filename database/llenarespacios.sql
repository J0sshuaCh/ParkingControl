START TRANSACTION;

-- 1. Insertar Vehículos Ficticios en todos los espacios que están 'libre'
INSERT INTO
    vehiculos (
        placa,
        tipo_vehiculo,
        fecha_registro,
        id_espacio
    )
SELECT CONCAT('FULL-', codigo), -- Genera placas como: FULL-A-01
    'Sedan', NOW(), id_espacio
FROM espacio
WHERE
    estado = 'libre';

-- 2. Generar los Tickets para esos vehículos nuevos
-- Nota: Usamos un JOIN con espacio WHERE estado='libre' para tomar solo los que acabamos de crear
-- antes de cambiarles el estado en el paso 3.
INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        estado,
        id_vehiculo,
        id_espacio,
        id_tarifa,
        id_usuario_entrada,
        fecha_emision
    )
SELECT CONCAT('TK-FULL-', e.codigo), -- Genera tickets como: TK-FULL-A-01
    NOW(), 'Emitido', v.id_vehiculo, v.id_espacio, (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    ), -- Busca automáticamente el ID de la tarifa Sedan
    1, -- Asignamos al usuario ID 1 (Admin) como creador
    NOW()
FROM vehiculos v
    JOIN espacio e ON v.id_espacio = e.id_espacio
WHERE
    e.estado = 'libre';

-- 3. Finalmente, marcar todos los espacios libres como 'ocupado'
UPDATE espacio SET estado = 'ocupado' WHERE estado = 'libre';

COMMIT;

-- Verificación final
SELECT count(*) as total_ocupados
FROM espacio
WHERE
    estado = 'ocupado';

-- para revertir es esto
SET SQL_SAFE_UPDATES = 0;

-- Borrar los tickets de prueba
DELETE FROM ticket WHERE codigo_ticket LIKE 'TK-FULL-%';

-- Borrar los vehículos de prueba
DELETE FROM vehiculos WHERE placa LIKE 'FULL-%';

-- Liberar los espacios que quedaron sin ticket activo
UPDATE espacio
SET
    estado = 'libre'
WHERE
    id_espacio NOT IN(
        SELECT DISTINCT
            id_espacio
        FROM ticket
        WHERE
            estado = 'Emitido'
    );

SET SQL_SAFE_UPDATES = 1;