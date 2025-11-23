ALTER TABLE vehiculos
ADD COLUMN id_espacio INT NULL,
ADD CONSTRAINT fk_vehiculo_espacio FOREIGN KEY (id_espacio) REFERENCES espacio (id_espacio);

USE parkingcontrol_db;

-- 3️⃣  Vehículos (uno que ya está estacionado)
INSERT IGNORE INTO
    vehiculos (
        id_vehiculo,
        placa,
        tipo_vehiculo,
        fecha_registro,
        id_espacio
    )
VALUES (
        1,
        'ABC-123',
        'Sedan',
        NOW(),
        (
            SELECT id_espacio
            FROM espacio
            WHERE
                codigo = '1'
        )
    ),
    (
        2,
        'XYZ-789',
        'SUV',
        NOW(),
        (
            SELECT id_espacio
            FROM espacio
            WHERE
                codigo = '2'
        )
    );

UPDATE espacio SET estado = 'ocupado' WHERE id_espacio IN (1, 2);

INSERT IGNORE INTO
    ticket (
        id_ticket,
        codigo_ticket,
        hora_entrada,
        estado,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_tarifa
    )
VALUES (
        1,
        'TK-001',
        NOW(),
        'Emitido',
        (
            SELECT id_vehiculo
            FROM vehiculos
            WHERE
                placa = 'ABC-123'
        ),
        1,
        1,
        (
            SELECT id_tarifa
            FROM tarifa
            WHERE
                tipo_vehiculo = 'Sedan'
        )
    );