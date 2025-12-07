USE `parkingcontrol_db`;

-- =============================================================================
-- LIMPIEZA INICIAL
-- =============================================================================
DROP PROCEDURE IF EXISTS `sp_usuario_obtener_por_username`;

DROP PROCEDURE IF EXISTS `sp_usuario_listar`;

DROP PROCEDURE IF EXISTS `sp_usuario_editar`;

DROP PROCEDURE IF EXISTS `sp_usuario_eliminar`;

DROP PROCEDURE IF EXISTS `sp_espacio_mapa_ocupacion`;

DROP PROCEDURE IF EXISTS `sp_espacio_reservar`;

DROP PROCEDURE IF EXISTS `sp_espacio_liberar`;

DROP PROCEDURE IF EXISTS `sp_tarifa_crud`;

DROP PROCEDURE IF EXISTS `sp_ticket_listar`;

DROP PROCEDURE IF EXISTS `sp_ticket_buscar_placa`;

DROP PROCEDURE IF EXISTS `sp_ticket_pagar`;

DROP PROCEDURE IF EXISTS `sp_vehiculo_registrar_ingreso`;

DROP PROCEDURE IF EXISTS `sp_vehiculo_listar_activos`;

DROP PROCEDURE IF EXISTS `sp_insertar_usuario`;

DROP FUNCTION IF EXISTS `fn_verificar_contrasena`;

-- =============================================================================
-- 1. SEGURIDAD Y USUARIOS (Encriptación en Base de Datos)
-- =============================================================================

DELIMITER $$

USE `parkingcontrol_db` $$
-- function fn_verificar_contrasena
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_verificar_contrasena`(
    p_username VARCHAR(50),
    p_password_plano VARCHAR(255)
) RETURNS tinyint(1)
    READS SQL DATA
BEGIN
DECLARE v_password_hash VARCHAR(255);
    
    -- Obtener la contraseña encriptada almacenada
    SELECT `password` INTO v_password_hash 
    FROM `usuario` 
    WHERE `username` = p_username 
    LIMIT 1;
    
    -- Si no existe el usuario, retorna falso
    IF v_password_hash IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Compara el hash guardado con el hash calculado del input
    IF v_password_hash = SHA2(p_password_plano, 256) THEN
        RETURN 1; -- Coincide
    ELSE
        RETURN 0; -- No coincide
    END IF;
END$$

DELIMITER;

-- -----------------------------------------------------
-- procedure sp_insertar_usuario
-- -----------------------------------------------------

DELIMITER $$

CREATE PROCEDURE `sp_insertar_usuario`(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_nombre_completo VARCHAR(100),
    IN p_id_rol INT
)
BEGIN
    -- Insertar usando SHA2 para la contraseña y 'Activo' por defecto
    INSERT INTO `usuario` (username, password, nombre_completo, id_rol, fecha_creacion, estado, email)
    VALUES (
        p_username, 
        SHA2(p_password, 256), -- Encriptación nativa
        p_nombre_completo, 
        p_id_rol, 
        NOW(), 
        'Activo', 
        p_email
    );
    
    -- Devolver el ID generado para que el backend lo reciba
    SELECT LAST_INSERT_ID() as id_usuario;
END$$

-- 1. GESTIÓN DE ESPACIOS (Mapa y Reservas)

-- Obtener el mapa completo con estado, placa y reservas activas
CREATE PROCEDURE `sp_espacio_mapa_ocupacion`()
BEGIN
    -- Auto-liberacion de espacios con reservas vencidas
    UPDATE espacio e 
    SET estado = 'libre' 
    WHERE estado = 'reservado' 
    AND NOT EXISTS (
        SELECT 1 FROM reserva r 
        WHERE r.id_espacio = e.id_espacio 
        AND r.fecha_fin > NOW()
    );

    SELECT 
        e.id_espacio AS dbId,
        e.codigo AS id,
        LOWER(e.estado) AS status,
        COALESCE(v.placa, NULL) AS vehiclePlate,
        COALESCE(r.motivo, NULL) AS reservedFor,
        COALESCE(DATE_FORMAT(r.fecha_fin, '%Y-%m-%dT%H:%i:%s'), NULL) AS reservedUntil
    FROM 
        espacio e 
    LEFT JOIN 
        ticket t ON e.id_espacio = t.id_espacio AND t.estado = 'Emitido' AND t.hora_salida IS NULL
    LEFT JOIN 
        vehiculos v ON t.id_vehiculo = v.id_vehiculo
    LEFT JOIN 
        reserva r ON e.id_espacio = r.id_espacio AND r.fecha_fin > NOW()
    ORDER BY e.codigo ASC;
END$$

-- Crear una reserva (Validando disponibilidad)
CREATE PROCEDURE `sp_espacio_reservar`(
    IN p_codigo_espacio VARCHAR(10),
    IN p_motivo VARCHAR(255),
    IN p_duracion_horas INT,
    IN p_id_usuario INT
)
BEGIN
    DECLARE v_id_espacio INT;
    DECLARE v_filas_afectadas INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Obtener ID
        SELECT id_espacio INTO v_id_espacio FROM espacio WHERE codigo = p_codigo_espacio;
        
        IF v_id_espacio IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Espacio no encontrado.';
        END IF;

        -- Intentar reservar solo si está libre
        UPDATE espacio SET estado = 'reservado' WHERE id_espacio = v_id_espacio AND estado = 'libre';
        SELECT ROW_COUNT() INTO v_filas_afectadas;

        IF v_filas_afectadas = 0 THEN
             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El espacio no está disponible para reservar.';
        ELSE
            INSERT INTO reserva (motivo, duracion, id_espacio, id_usuario_creador, fecha_inicio, fecha_fin)
            VALUES (p_motivo, CONCAT(p_duracion_horas, ' horas'), v_id_espacio, p_id_usuario, NOW(), DATE_ADD(NOW(), INTERVAL p_duracion_horas HOUR));
            
            SELECT LAST_INSERT_ID() AS id_reserva, 'Espacio reservado exitosamente' AS mensaje;
        END IF;
    COMMIT;
END$$

-- Liberar espacio (Cancelar reserva o forzar liberación)
CREATE PROCEDURE `sp_espacio_liberar`(IN p_id_espacio INT)
BEGIN
    START TRANSACTION;
        UPDATE espacio SET estado = 'libre' WHERE id_espacio = p_id_espacio;
        UPDATE reserva SET fecha_fin = NOW() WHERE id_espacio = p_id_espacio AND fecha_fin > NOW();
        SELECT CONCAT('Espacio ', p_id_espacio, ' liberado.') AS mensaje;
    COMMIT;
END$$

-- 2. GESTIÓN DE TARIFAS (CRUD Completo)
CREATE PROCEDURE `sp_tarifa_crud`(
    IN p_accion VARCHAR(10),       -- 'LISTAR', 'CREAR', 'EDITAR', 'ELIMINAR'
    IN p_id_tarifa INT,            -- NULL si no aplica
    IN p_tipo_vehiculo VARCHAR(20),-- NULL si no aplica
    IN p_precio_hora DECIMAL(10,4),-- NULL si no aplica
    IN p_estado VARCHAR(20)        -- NULL si no aplica
)
BEGIN
    IF p_accion = 'LISTAR' THEN
        SELECT * FROM tarifa;
    
    ELSEIF p_accion = 'CREAR' THEN
        INSERT INTO tarifa (tipo_vehiculo, precio_hora, fecha_vigencia_inicio, estado)
        VALUES (p_tipo_vehiculo, p_precio_hora, NOW(), IFNULL(p_estado, 'En vigencia'));
        SELECT LAST_INSERT_ID() AS id_tarifa;
    
    ELSEIF p_accion = 'EDITAR' THEN
        UPDATE tarifa 
        SET precio_hora = p_precio_hora, estado = p_estado 
        WHERE id_tarifa = p_id_tarifa;
        SELECT ROW_COUNT() AS afectados;

    ELSEIF p_accion = 'ELIMINAR' THEN
        DELETE FROM tarifa WHERE id_tarifa = p_id_tarifa;
        SELECT ROW_COUNT() AS afectados;
    END IF;
END$$

-- 3. GESTIÓN DE TICKETS Y PAGOS

-- Listar historial completo de tickets
CREATE PROCEDURE `sp_ticket_listar`()
BEGIN
    SELECT 
        t.id_ticket, t.codigo_ticket, t.hora_entrada, t.hora_salida,
        t.tiempo_permanencia, t.monto_total, t.estado,
        v.placa, v.tipo_vehiculo,
        e.codigo AS codigo_espacio,
        tr.precio_hora
    FROM ticket t
    JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
    JOIN espacio e   ON t.id_espacio   = e.id_espacio
    JOIN tarifa tr   ON t.id_tarifa    = tr.id_tarifa
    ORDER BY t.id_ticket DESC;
END$$

-- Buscar ticket activo para cobrar
CREATE PROCEDURE `sp_ticket_buscar_placa`(IN p_placa VARCHAR(20))
BEGIN
    SELECT 
        t.id_ticket, t.hora_entrada, t.hora_salida, t.tiempo_permanencia, t.monto_total,
        t.id_espacio, t.id_vehiculo, t.id_tarifa,
        v.placa, v.tipo_vehiculo,
        e.codigo as codigo_espacio,
        tr.precio_hora
    FROM ticket t
    JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
    JOIN espacio e   ON t.id_espacio   = e.id_espacio
    JOIN tarifa tr   ON t.id_tarifa    = tr.id_tarifa
    WHERE v.placa = p_placa AND t.estado = 'Emitido'
    LIMIT 1;
END$$

-- Pagar y cerrar ticket (Liberando espacio)
CREATE PROCEDURE `sp_ticket_pagar`(
    IN p_id_ticket INT,
    IN p_id_espacio INT,
    IN p_monto_total DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Cerrar Ticket
        UPDATE ticket 
        SET estado = 'Pagado', hora_salida = NOW(), monto_total = p_monto_total
        WHERE id_ticket = p_id_ticket;

        -- Liberar Espacio
        UPDATE espacio SET estado = 'libre' WHERE id_espacio = p_id_espacio;

        -- Desvincular vehículo (para que no salga "en parqueo" si se busca por ID espacio)
        UPDATE vehiculos SET id_espacio = NULL WHERE id_espacio = p_id_espacio;
        
    COMMIT;
    SELECT 'Ticket pagado y espacio liberado' AS mensaje;
END$$

-- 4. GESTIÓN DE VEHÍCULOS (Entrada y Listado)

-- Registrar Entrada (Lógica Transaccional Compleja)
CREATE PROCEDURE `sp_vehiculo_registrar_ingreso`(
    IN p_placa VARCHAR(20),
    IN p_tipo_vehiculo VARCHAR(20),
    IN p_id_espacio INT,
    IN p_id_tarifa INT,
    IN p_codigo_ticket_generado VARCHAR(50),
    IN p_id_usuario INT
)
BEGIN
    DECLARE v_id_vehiculo INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- 1. Insertar o Actualizar Vehículo
        INSERT INTO vehiculos (placa, tipo_vehiculo, id_espacio, fecha_registro) 
        VALUES (p_placa, p_tipo_vehiculo, p_id_espacio, NOW())
        ON DUPLICATE KEY UPDATE 
            tipo_vehiculo = VALUES(tipo_vehiculo), 
            id_espacio = VALUES(id_espacio), 
            fecha_registro = NOW();
            
        SELECT id_vehiculo INTO v_id_vehiculo FROM vehiculos WHERE placa = p_placa;

        -- 2. Ocupar Espacio
        UPDATE espacio SET estado = 'ocupado' WHERE id_espacio = p_id_espacio;

        -- 3. Generar Ticket
        INSERT INTO ticket (codigo_ticket, hora_entrada, estado, id_vehiculo, id_espacio, id_tarifa, id_usuario_entrada, fecha_emision) 
        VALUES (p_codigo_ticket_generado, NOW(), 'Emitido', v_id_vehiculo, p_id_espacio, p_id_tarifa, p_id_usuario, NOW());

    COMMIT;
    
    SELECT v_id_vehiculo as id_vehiculo, p_codigo_ticket_generado as ticket;
END$$

-- Listar vehículos actualmente en el parqueo
CREATE PROCEDURE `sp_vehiculo_listar_activos`()
BEGIN
    SELECT 
        v.id_vehiculo, v.placa, v.tipo_vehiculo, 
        DATE_FORMAT(t.hora_entrada, "%H:%i") as hora_ingreso, 
        e.codigo as espacio, 
        'Activo' as status, 
        t.codigo_ticket
    FROM vehiculos v
    JOIN espacio e ON v.id_espacio = e.id_espacio
    JOIN ticket t ON v.id_vehiculo = t.id_vehiculo
    WHERE t.estado = 'Emitido'
    ORDER BY t.hora_entrada DESC;
END$$

USE `parkingcontrol_db`;

-- 5. PROCEDIMIENTOS ADICIONALES PARA USUARIOS

-- 1. Obtener datos del usuario (usado en el Login tras verificar contraseña)
CREATE PROCEDURE `sp_usuario_obtener_por_username`(
    IN p_username VARCHAR(50)
)
BEGIN
    SELECT 
        u.id_usuario, 
        u.username, 
        u.nombre_completo, 
        u.email, 
        u.estado, 
        u.id_rol, 
        r.nombre_rol 
    FROM usuario u
    JOIN rol r ON u.id_rol = r.id_rol
    WHERE u.username = p_username;
END$$

-- 2. Listar todos los usuarios con su rol
CREATE PROCEDURE `sp_usuario_listar`()
BEGIN
    SELECT 
        u.id_usuario, 
        u.username, 
        u.nombre_completo, 
        u.email, 
        u.estado, 
        r.nombre_rol 
    FROM usuario u
    JOIN rol r ON u.id_rol = r.id_rol
    ORDER BY u.id_usuario ASC;
END$$

-- 3. Editar usuario
-- Nota: Usamos IFNULL para mantener el valor actual si envías NULL desde el backend
CREATE PROCEDURE `sp_usuario_editar`(
    IN p_id_usuario INT,
    IN p_nombre_completo VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_estado ENUM('Activo', 'Ausente'),
    IN p_id_rol INT
)
BEGIN
    UPDATE usuario
    SET 
        nombre_completo = IFNULL(p_nombre_completo, nombre_completo),
        email = IFNULL(p_email, email),
        estado = IFNULL(p_estado, estado),
        id_rol = IFNULL(p_id_rol, id_rol)
    WHERE id_usuario = p_id_usuario;

    -- Devolver cuántas filas se afectaron (0 si no hubo cambios o no existe)
    SELECT ROW_COUNT() as afectados;
END$$

-- 4. Eliminar usuario
CREATE PROCEDURE `sp_usuario_eliminar`(
    IN p_id_usuario INT
)
BEGIN
    DELETE FROM usuario WHERE id_usuario = p_id_usuario;
    SELECT ROW_COUNT() as afectados;
END$$

DELIMITER;