USE `parkingcontrol_db`;

-- Reiniciamos la inserción de tickets asegurando que los códigos de espacio EXISTAN (A, B, C, D del 01 al 10)

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- DOMINGO 24 NOV (Inicio tranquilo ~10 tickets)
-- =============================================
(
    'TKT-NOV24-01',
    '2025-11-24 07:30:00',
    '2025-11-24 09:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-24 07:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV24-02',
    '2025-11-24 08:15:00',
    '2025-11-24 11:15:00',
    180,
    12.00,
    'Pagado',
    '2025-11-24 08:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV24-03',
    '2025-11-24 09:00:00',
    '2025-11-24 10:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-24 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto asignada a Zona B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV24-04',
    '2025-11-24 10:30:00',
    '2025-11-24 12:45:00',
    135,
    21.00,
    'Pagado',
    '2025-11-24 10:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV24-05',
    '2025-11-24 11:00:00',
    '2025-11-24 15:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-24 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV24-06',
    '2025-11-24 12:20:00',
    '2025-11-24 13:20:00',
    60,
    5.00,
    'Pagado',
    '2025-11-24 12:20:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV24-07',
    '2025-11-24 14:00:00',
    '2025-11-24 14:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-24 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto en Zona B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV24-08',
    '2025-11-24 16:00:00',
    '2025-11-24 18:30:00',
    150,
    21.00,
    'Pagado',
    '2025-11-24 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV24-09',
    '2025-11-24 19:00:00',
    '2025-11-24 21:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-24 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV24-10',
    '2025-11-24 20:00:00',
    '2025-11-24 23:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-24 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),

-- =============================================
-- LUNES 25 NOV (Aumento de tráfico ~12 tickets)
-- =============================================
(
    'TKT-NOV25-01',
    '2025-11-25 07:00:00',
    '2025-11-25 12:00:00',
    300,
    25.00,
    'Pagado',
    '2025-11-25 07:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV25-02',
    '2025-11-25 08:30:00',
    '2025-11-25 09:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-25 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV25-03',
    '2025-11-25 09:15:00',
    '2025-11-25 11:15:00',
    120,
    14.00,
    'Pagado',
    '2025-11-25 09:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV25-04',
    '2025-11-25 10:00:00',
    '2025-11-25 10:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-25 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto en Zona B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV25-05',
    '2025-11-25 11:30:00',
    '2025-11-25 13:30:00',
    120,
    16.00,
    'Pagado',
    '2025-11-25 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV25-06',
    '2025-11-25 12:00:00',
    '2025-11-25 15:30:00',
    210,
    20.00,
    'Pagado',
    '2025-11-25 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV25-07',
    '2025-11-25 13:00:00',
    '2025-11-25 14:00:00',
    60,
    7.00,
    'Pagado',
    '2025-11-25 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV25-08',
    '2025-11-25 14:15:00',
    '2025-11-25 16:15:00',
    120,
    5.00,
    'Pagado',
    '2025-11-25 14:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-09'
        LIMIT 1
    ),
    1,
    1, -- Moto en espacio pequeño de A
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV25-09',
    '2025-11-25 15:00:00',
    '2025-11-25 16:30:00',
    90,
    8.00,
    'Pagado',
    '2025-11-25 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV25-10',
    '2025-11-25 17:00:00',
    '2025-11-25 19:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-25 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-07'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV25-11',
    '2025-11-25 18:00:00',
    '2025-11-25 22:00:00',
    240,
    28.00,
    'Pagado',
    '2025-11-25 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV25-12',
    '2025-11-25 19:30:00',
    '2025-11-25 21:30:00',
    120,
    16.00,
    'Pagado',
    '2025-11-25 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),

-- =============================================
-- MARTES 26 NOV (Tráfico Medio ~11 tickets)
-- =============================================
(
    'TKT-NOV26-01',
    '2025-11-26 08:00:00',
    '2025-11-26 16:00:00',
    480,
    40.00,
    'Pagado',
    '2025-11-26 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV26-02',
    '2025-11-26 09:00:00',
    '2025-11-26 10:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-26 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-06'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV26-03',
    '2025-11-26 10:15:00',
    '2025-11-26 12:15:00',
    120,
    14.00,
    'Pagado',
    '2025-11-26 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV26-04',
    '2025-11-26 11:00:00',
    '2025-11-26 13:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-26 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV26-05',
    '2025-11-26 12:30:00',
    '2025-11-26 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-26 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV26-06',
    '2025-11-26 14:00:00',
    '2025-11-26 17:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-26 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV26-07',
    '2025-11-26 15:30:00',
    '2025-11-26 16:30:00',
    60,
    2.50,
    'Pagado',
    '2025-11-26 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-07'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV26-08',
    '2025-11-26 16:45:00',
    '2025-11-26 18:45:00',
    120,
    14.00,
    'Pagado',
    '2025-11-26 16:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV26-09',
    '2025-11-26 19:00:00',
    '2025-11-26 21:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-26 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV26-10',
    '2025-11-26 20:00:00',
    '2025-11-26 21:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-26 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-06'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV26-11',
    '2025-11-26 22:00:00',
    '2025-11-26 23:30:00',
    90,
    14.00,
    'Pagado',
    '2025-11-26 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),

-- =============================================
-- MIERCOLES 27 NOV (Tráfico ~13 tickets)
-- =============================================
(
    'TKT-NOV27-01',
    '2025-11-27 07:15:00',
    '2025-11-27 08:15:00',
    60,
    5.00,
    'Pagado',
    '2025-11-27 07:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV27-02',
    '2025-11-27 08:00:00',
    '2025-11-27 12:00:00',
    240,
    16.00,
    'Pagado',
    '2025-11-27 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV27-03',
    '2025-11-27 09:30:00',
    '2025-11-27 11:30:00',
    120,
    5.00,
    'Pagado',
    '2025-11-27 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-06'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV27-04',
    '2025-11-27 10:00:00',
    '2025-11-27 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-27 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV27-05',
    '2025-11-27 11:30:00',
    '2025-11-27 12:30:00',
    60,
    8.00,
    'Pagado',
    '2025-11-27 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV27-06',
    '2025-11-27 13:00:00',
    '2025-11-27 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-27 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV27-07',
    '2025-11-27 14:00:00',
    '2025-11-27 16:30:00',
    150,
    7.50,
    'Pagado',
    '2025-11-27 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV27-08',
    '2025-11-27 15:30:00',
    '2025-11-27 18:30:00',
    180,
    21.00,
    'Pagado',
    '2025-11-27 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV27-09',
    '2025-11-27 16:00:00',
    '2025-11-27 17:00:00',
    60,
    4.00,
    'Pagado',
    '2025-11-27 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV27-10',
    '2025-11-27 17:30:00',
    '2025-11-27 20:30:00',
    180,
    15.00,
    'Pagado',
    '2025-11-27 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV27-11',
    '2025-11-27 19:00:00',
    '2025-11-27 23:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-27 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV27-12',
    '2025-11-27 20:30:00',
    '2025-11-27 22:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-27 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV27-13',
    '2025-11-27 21:00:00',
    '2025-11-27 22:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-27 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote 1 (Nov 24-27) Insertado correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- ===================================================
-- VIERNES 28 NOV (Actividad Alta / Noche - ~14 tickets)
-- ===================================================
(
    'TKT-NOV28-01',
    '2025-11-28 08:00:00',
    '2025-11-28 13:00:00',
    300,
    25.00,
    'Pagado',
    '2025-11-28 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV28-02',
    '2025-11-28 09:30:00',
    '2025-11-28 10:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-28 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV28-03',
    '2025-11-28 11:00:00',
    '2025-11-28 12:45:00',
    105,
    14.00,
    'Pagado',
    '2025-11-28 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV28-04',
    '2025-11-28 12:00:00',
    '2025-11-28 13:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-28 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV28-05',
    '2025-11-28 13:30:00',
    '2025-11-28 17:30:00',
    240,
    32.00,
    'Pagado',
    '2025-11-28 13:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV28-06',
    '2025-11-28 14:00:00',
    '2025-11-28 15:30:00',
    90,
    10.00,
    'Pagado',
    '2025-11-28 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV28-07',
    '2025-11-28 16:00:00',
    '2025-11-28 16:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-28 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV28-08',
    '2025-11-28 17:00:00',
    '2025-11-28 20:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-28 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV28-09',
    '2025-11-28 18:30:00',
    '2025-11-28 22:30:00',
    240,
    20.00,
    'Pagado',
    '2025-11-28 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV28-10',
    '2025-11-28 19:00:00',
    '2025-11-28 20:30:00',
    90,
    8.00,
    'Pagado',
    '2025-11-28 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV28-11',
    '2025-11-28 20:00:00',
    '2025-11-28 23:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-28 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV28-12',
    '2025-11-28 21:00:00',
    '2025-11-28 23:30:00',
    150,
    24.00,
    'Pagado',
    '2025-11-28 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV28-13',
    '2025-11-28 22:00:00',
    '2025-11-28 23:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-28 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV28-14',
    '2025-11-28 23:00:00',
    '2025-11-28 23:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-28 23:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- ===================================================
-- SABADO 29 NOV (Día pesado - Compras - ~16 tickets)
-- ===================================================
(
    'TKT-NOV29-01',
    '2025-11-29 09:00:00',
    '2025-11-29 14:00:00',
    300,
    25.00,
    'Pagado',
    '2025-11-29 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV29-02',
    '2025-11-29 10:00:00',
    '2025-11-29 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-29 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV29-03',
    '2025-11-29 10:30:00',
    '2025-11-29 12:00:00',
    90,
    8.00,
    'Pagado',
    '2025-11-29 10:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV29-04',
    '2025-11-29 11:00:00',
    '2025-11-29 11:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-29 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV29-05',
    '2025-11-29 12:00:00',
    '2025-11-29 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-29 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV29-06',
    '2025-11-29 13:15:00',
    '2025-11-29 14:15:00',
    60,
    5.00,
    'Pagado',
    '2025-11-29 13:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV29-07',
    '2025-11-29 14:30:00',
    '2025-11-29 18:30:00',
    240,
    28.00,
    'Pagado',
    '2025-11-29 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV29-08',
    '2025-11-29 15:00:00',
    '2025-11-29 16:30:00',
    90,
    5.00,
    'Pagado',
    '2025-11-29 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV29-09',
    '2025-11-29 16:00:00',
    '2025-11-29 19:00:00',
    180,
    15.00,
    'Pagado',
    '2025-11-29 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV29-10',
    '2025-11-29 17:00:00',
    '2025-11-29 18:00:00',
    60,
    4.00,
    'Pagado',
    '2025-11-29 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV29-11',
    '2025-11-29 18:30:00',
    '2025-11-29 20:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-29 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV29-12',
    '2025-11-29 19:00:00',
    '2025-11-29 20:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-29 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV29-13',
    '2025-11-29 20:00:00',
    '2025-11-29 22:00:00',
    120,
    16.00,
    'Pagado',
    '2025-11-29 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV29-14',
    '2025-11-29 21:00:00',
    '2025-11-29 23:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-29 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV29-15',
    '2025-11-29 22:00:00',
    '2025-11-29 23:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-29 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-09'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV29-16',
    '2025-11-29 23:00:00',
    '2025-11-29 23:59:59',
    59,
    2.50,
    'Pagado',
    '2025-11-29 23:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- ===================================================
-- DOMINGO 30 NOV (Día tranquilo - ~12 tickets)
-- ===================================================
(
    'TKT-NOV30-01',
    '2025-11-30 08:30:00',
    '2025-11-30 11:30:00',
    180,
    15.00,
    'Pagado',
    '2025-11-30 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV30-02',
    '2025-11-30 09:00:00',
    '2025-11-30 13:00:00',
    240,
    16.00,
    'Pagado',
    '2025-11-30 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV30-03',
    '2025-11-30 10:00:00',
    '2025-11-30 12:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-30 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV30-04',
    '2025-11-30 11:00:00',
    '2025-11-30 11:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-30 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV30-05',
    '2025-11-30 12:30:00',
    '2025-11-30 14:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-30 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV30-06',
    '2025-11-30 13:00:00',
    '2025-11-30 16:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-30 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV30-07',
    '2025-11-30 14:00:00',
    '2025-11-30 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-30 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV30-08',
    '2025-11-30 15:00:00',
    '2025-11-30 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-30 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV30-09',
    '2025-11-30 16:30:00',
    '2025-11-30 18:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-30 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV30-10',
    '2025-11-30 18:00:00',
    '2025-11-30 20:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-30 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV30-11',
    '2025-11-30 19:30:00',
    '2025-11-30 21:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-30 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV30-12',
    '2025-11-30 21:00:00',
    '2025-11-30 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-30 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote 2 (Nov 28-30) Insertado correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- LUNES 01 DIC (Inicio de mes - ~14 tickets)
-- =============================================
(
    'TKT-DIC01-01',
    '2025-12-01 07:45:00',
    '2025-12-01 16:45:00',
    540,
    45.00,
    'Pagado',
    '2025-12-01 07:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
), -- 9h * 5.00
(
    'TKT-DIC01-02',
    '2025-12-01 08:30:00',
    '2025-12-01 09:30:00',
    60,
    4.00,
    'Pagado',
    '2025-12-01 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC01-03',
    '2025-12-01 09:00:00',
    '2025-12-01 11:00:00',
    120,
    5.00,
    'Pagado',
    '2025-12-01 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto en B
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC01-04',
    '2025-12-01 10:15:00',
    '2025-12-01 13:15:00',
    180,
    21.00,
    'Pagado',
    '2025-12-01 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC01-05',
    '2025-12-01 11:00:00',
    '2025-12-01 15:00:00',
    240,
    32.00,
    'Pagado',
    '2025-12-01 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC01-06',
    '2025-12-01 12:00:00',
    '2025-12-01 12:45:00',
    45,
    2.50,
    'Pagado',
    '2025-12-01 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC01-07',
    '2025-12-01 13:30:00',
    '2025-12-01 15:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-01 13:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC01-08',
    '2025-12-01 14:00:00',
    '2025-12-01 17:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-01 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC01-09',
    '2025-12-01 15:15:00',
    '2025-12-01 16:15:00',
    60,
    4.00,
    'Pagado',
    '2025-12-01 15:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC01-10',
    '2025-12-01 16:30:00',
    '2025-12-01 18:30:00',
    120,
    14.00,
    'Pagado',
    '2025-12-01 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC01-11',
    '2025-12-01 17:00:00',
    '2025-12-01 19:30:00',
    150,
    12.50,
    'Pagado',
    '2025-12-01 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC01-12',
    '2025-12-01 18:00:00',
    '2025-12-01 22:00:00',
    240,
    32.00,
    'Pagado',
    '2025-12-01 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC01-13',
    '2025-12-01 19:00:00',
    '2025-12-01 20:00:00',
    60,
    5.00,
    'Pagado',
    '2025-12-01 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC01-14',
    '2025-12-01 20:30:00',
    '2025-12-01 21:30:00',
    60,
    2.50,
    'Pagado',
    '2025-12-01 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- MARTES 02 DIC (Tráfico Medio ~12 tickets)
-- =============================================
(
    'TKT-DIC02-01',
    '2025-12-02 08:00:00',
    '2025-12-02 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-12-02 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC02-02',
    '2025-12-02 09:30:00',
    '2025-12-02 11:00:00',
    90,
    6.00,
    'Pagado',
    '2025-12-02 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
), -- 1.5h * 4 = 6.00
(
    'TKT-DIC02-03',
    '2025-12-02 10:00:00',
    '2025-12-02 12:00:00',
    120,
    14.00,
    'Pagado',
    '2025-12-02 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC02-04',
    '2025-12-02 11:30:00',
    '2025-12-02 12:15:00',
    45,
    2.50,
    'Pagado',
    '2025-12-02 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC02-05',
    '2025-12-02 12:30:00',
    '2025-12-02 14:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-02 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC02-06',
    '2025-12-02 13:00:00',
    '2025-12-02 16:00:00',
    180,
    24.00,
    'Pagado',
    '2025-12-02 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC02-07',
    '2025-12-02 14:45:00',
    '2025-12-02 16:45:00',
    120,
    14.00,
    'Pagado',
    '2025-12-02 14:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC02-08',
    '2025-12-02 16:00:00',
    '2025-12-02 17:30:00',
    90,
    3.75,
    'Pagado',
    '2025-12-02 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
), -- 1.5h * 2.50 = 3.75
(
    'TKT-DIC02-09',
    '2025-12-02 17:00:00',
    '2025-12-02 19:00:00',
    120,
    8.00,
    'Pagado',
    '2025-12-02 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC02-10',
    '2025-12-02 18:30:00',
    '2025-12-02 21:30:00',
    180,
    21.00,
    'Pagado',
    '2025-12-02 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC02-11',
    '2025-12-02 20:00:00',
    '2025-12-02 21:00:00',
    60,
    5.00,
    'Pagado',
    '2025-12-02 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC02-12',
    '2025-12-02 21:15:00',
    '2025-12-02 22:45:00',
    90,
    7.50,
    'Pagado',
    '2025-12-02 21:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- MIERCOLES 03 DIC (Tráfico ~13 tickets)
-- =============================================
(
    'TKT-DIC03-01',
    '2025-12-03 07:30:00',
    '2025-12-03 10:30:00',
    180,
    15.00,
    'Pagado',
    '2025-12-03 07:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC03-02',
    '2025-12-03 08:30:00',
    '2025-12-03 12:30:00',
    240,
    16.00,
    'Pagado',
    '2025-12-03 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC03-03',
    '2025-12-03 09:00:00',
    '2025-12-03 09:45:00',
    45,
    2.50,
    'Pagado',
    '2025-12-03 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC03-04',
    '2025-12-03 10:00:00',
    '2025-12-03 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-03 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC03-05',
    '2025-12-03 11:00:00',
    '2025-12-03 15:00:00',
    240,
    32.00,
    'Pagado',
    '2025-12-03 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC03-06',
    '2025-12-03 12:15:00',
    '2025-12-03 14:15:00',
    120,
    10.00,
    'Pagado',
    '2025-12-03 12:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC03-07',
    '2025-12-03 13:00:00',
    '2025-12-03 14:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-03 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC03-08',
    '2025-12-03 14:30:00',
    '2025-12-03 17:30:00',
    180,
    21.00,
    'Pagado',
    '2025-12-03 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC03-09',
    '2025-12-03 15:30:00',
    '2025-12-03 16:30:00',
    60,
    4.00,
    'Pagado',
    '2025-12-03 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC03-10',
    '2025-12-03 16:00:00',
    '2025-12-03 19:00:00',
    180,
    15.00,
    'Pagado',
    '2025-12-03 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC03-11',
    '2025-12-03 18:00:00',
    '2025-12-03 21:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-03 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC03-12',
    '2025-12-03 19:30:00',
    '2025-12-03 21:30:00',
    120,
    16.00,
    'Pagado',
    '2025-12-03 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC03-13',
    '2025-12-03 21:00:00',
    '2025-12-03 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-12-03 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- JUEVES 04 DIC (Tráfico ~12 tickets)
-- =============================================
(
    'TKT-DIC04-01',
    '2025-12-04 07:45:00',
    '2025-12-04 12:45:00',
    300,
    25.00,
    'Pagado',
    '2025-12-04 07:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC04-02',
    '2025-12-04 09:00:00',
    '2025-12-04 10:30:00',
    90,
    6.00,
    'Pagado',
    '2025-12-04 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC04-03',
    '2025-12-04 10:15:00',
    '2025-12-04 11:15:00',
    60,
    2.50,
    'Pagado',
    '2025-12-04 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC04-04',
    '2025-12-04 11:00:00',
    '2025-12-04 14:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-04 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC04-05',
    '2025-12-04 12:30:00',
    '2025-12-04 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-12-04 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC04-06',
    '2025-12-04 13:00:00',
    '2025-12-04 17:00:00',
    240,
    32.00,
    'Pagado',
    '2025-12-04 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC04-07',
    '2025-12-04 14:00:00',
    '2025-12-04 16:30:00',
    150,
    17.50,
    'Pagado',
    '2025-12-04 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC04-08',
    '2025-12-04 15:30:00',
    '2025-12-04 16:15:00',
    45,
    2.50,
    'Pagado',
    '2025-12-04 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC04-09',
    '2025-12-04 16:45:00',
    '2025-12-04 18:45:00',
    120,
    8.00,
    'Pagado',
    '2025-12-04 16:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC04-10',
    '2025-12-04 17:30:00',
    '2025-12-04 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-04 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC04-11',
    '2025-12-04 19:00:00',
    '2025-12-04 22:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-04 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC04-12',
    '2025-12-04 20:30:00',
    '2025-12-04 22:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-04 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote 3 (Dic 01-04) Insertado correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- VIERNES 05 DIC (Inicio Fin de Semana ~14 tickets)
-- =============================================
(
    'TKT-DIC05-01',
    '2025-12-05 08:00:00',
    '2025-12-05 13:00:00',
    300,
    25.00,
    'Pagado',
    '2025-12-05 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC05-02',
    '2025-12-05 09:30:00',
    '2025-12-05 10:30:00',
    60,
    4.00,
    'Pagado',
    '2025-12-05 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC05-03',
    '2025-12-05 10:00:00',
    '2025-12-05 11:30:00',
    90,
    10.50,
    'Pagado',
    '2025-12-05 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
), -- 1.5h * 7.00 = 10.50
(
    'TKT-DIC05-04',
    '2025-12-05 11:00:00',
    '2025-12-05 12:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-05 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC05-05',
    '2025-12-05 12:30:00',
    '2025-12-05 16:30:00',
    240,
    32.00,
    'Pagado',
    '2025-12-05 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC05-06',
    '2025-12-05 13:00:00',
    '2025-12-05 14:00:00',
    60,
    5.00,
    'Pagado',
    '2025-12-05 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC05-07',
    '2025-12-05 14:30:00',
    '2025-12-05 15:15:00',
    45,
    2.50,
    'Pagado',
    '2025-12-05 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC05-08',
    '2025-12-05 16:00:00',
    '2025-12-05 19:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-05 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC05-09',
    '2025-12-05 17:00:00',
    '2025-12-05 18:30:00',
    90,
    6.00,
    'Pagado',
    '2025-12-05 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC05-10',
    '2025-12-05 18:30:00',
    '2025-12-05 20:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-05 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC05-11',
    '2025-12-05 19:00:00',
    '2025-12-05 22:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-05 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC05-12',
    '2025-12-05 20:00:00',
    '2025-12-05 23:00:00',
    180,
    24.00,
    'Pagado',
    '2025-12-05 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC05-13',
    '2025-12-05 21:00:00',
    '2025-12-05 22:00:00',
    60,
    5.00,
    'Pagado',
    '2025-12-05 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC05-14',
    '2025-12-05 22:30:00',
    '2025-12-05 23:30:00',
    60,
    2.50,
    'Pagado',
    '2025-12-05 22:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- SABADO 06 DIC (Día Fuerte ~15 tickets)
-- =============================================
(
    'TKT-DIC06-01',
    '2025-12-06 09:00:00',
    '2025-12-06 14:00:00',
    300,
    25.00,
    'Pagado',
    '2025-12-06 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC06-02',
    '2025-12-06 10:00:00',
    '2025-12-06 12:00:00',
    120,
    8.00,
    'Pagado',
    '2025-12-06 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC06-03',
    '2025-12-06 10:30:00',
    '2025-12-06 13:30:00',
    180,
    21.00,
    'Pagado',
    '2025-12-06 10:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC06-04',
    '2025-12-06 11:15:00',
    '2025-12-06 12:00:00',
    45,
    2.50,
    'Pagado',
    '2025-12-06 11:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC06-05',
    '2025-12-06 12:00:00',
    '2025-12-06 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-12-06 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC06-06',
    '2025-12-06 13:00:00',
    '2025-12-06 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-12-06 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC06-07',
    '2025-12-06 14:00:00',
    '2025-12-06 17:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-06 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC06-08',
    '2025-12-06 15:00:00',
    '2025-12-06 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-06 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC06-09',
    '2025-12-06 16:00:00',
    '2025-12-06 18:00:00',
    120,
    8.00,
    'Pagado',
    '2025-12-06 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC06-10',
    '2025-12-06 17:00:00',
    '2025-12-06 19:30:00',
    150,
    12.50,
    'Pagado',
    '2025-12-06 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC06-11',
    '2025-12-06 18:00:00',
    '2025-12-06 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-12-06 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC06-12',
    '2025-12-06 19:00:00',
    '2025-12-06 20:30:00',
    90,
    7.50,
    'Pagado',
    '2025-12-06 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC06-13',
    '2025-12-06 20:00:00',
    '2025-12-06 22:00:00',
    120,
    16.00,
    'Pagado',
    '2025-12-06 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC06-14',
    '2025-12-06 21:00:00',
    '2025-12-06 22:30:00',
    90,
    10.50,
    'Pagado',
    '2025-12-06 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC06-15',
    '2025-12-06 22:00:00',
    '2025-12-06 23:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-06 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- DOMINGO 07 DIC (Día Tranquilo ~12 tickets)
-- =============================================
(
    'TKT-DIC07-01',
    '2025-12-07 09:00:00',
    '2025-12-07 11:00:00',
    120,
    10.00,
    'Pagado',
    '2025-12-07 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC07-02',
    '2025-12-07 10:00:00',
    '2025-12-07 13:00:00',
    180,
    12.00,
    'Pagado',
    '2025-12-07 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC07-03',
    '2025-12-07 11:00:00',
    '2025-12-07 12:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-07 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC07-04',
    '2025-12-07 11:30:00',
    '2025-12-07 13:30:00',
    120,
    14.00,
    'Pagado',
    '2025-12-07 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC07-05',
    '2025-12-07 12:30:00',
    '2025-12-07 15:30:00',
    180,
    24.00,
    'Pagado',
    '2025-12-07 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC07-06',
    '2025-12-07 13:00:00',
    '2025-12-07 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-12-07 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC07-07',
    '2025-12-07 14:00:00',
    '2025-12-07 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-12-07 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC07-08',
    '2025-12-07 15:00:00',
    '2025-12-07 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-12-07 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC07-09',
    '2025-12-07 16:30:00',
    '2025-12-07 18:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-07 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC07-10',
    '2025-12-07 17:30:00',
    '2025-12-07 18:30:00',
    60,
    4.00,
    'Pagado',
    '2025-12-07 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC07-11',
    '2025-12-07 19:00:00',
    '2025-12-07 20:30:00',
    90,
    10.50,
    'Pagado',
    '2025-12-07 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC07-12',
    '2025-12-07 21:00:00',
    '2025-12-07 22:00:00',
    60,
    5.00,
    'Pagado',
    '2025-12-07 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- LUNES 08 DIC (Final del Periodo ~13 tickets)
-- =============================================
(
    'TKT-DIC08-01',
    '2025-12-08 08:00:00',
    '2025-12-08 13:00:00',
    300,
    25.00,
    'Pagado',
    '2025-12-08 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC08-02',
    '2025-12-08 09:00:00',
    '2025-12-08 10:30:00',
    90,
    6.00,
    'Pagado',
    '2025-12-08 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC08-03',
    '2025-12-08 09:30:00',
    '2025-12-08 10:30:00',
    60,
    2.50,
    'Pagado',
    '2025-12-08 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC08-04',
    '2025-12-08 10:00:00',
    '2025-12-08 12:00:00',
    120,
    14.00,
    'Pagado',
    '2025-12-08 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC08-05',
    '2025-12-08 11:30:00',
    '2025-12-08 15:30:00',
    240,
    32.00,
    'Pagado',
    '2025-12-08 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-DIC08-06',
    '2025-12-08 12:15:00',
    '2025-12-08 13:15:00',
    60,
    5.00,
    'Pagado',
    '2025-12-08 12:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC08-07',
    '2025-12-08 13:30:00',
    '2025-12-08 14:15:00',
    45,
    2.50,
    'Pagado',
    '2025-12-08 13:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-DIC08-08',
    '2025-12-08 14:00:00',
    '2025-12-08 17:00:00',
    180,
    21.00,
    'Pagado',
    '2025-12-08 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC08-09',
    '2025-12-08 15:00:00',
    '2025-12-08 17:00:00',
    120,
    8.00,
    'Pagado',
    '2025-12-08 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-DIC08-10',
    '2025-12-08 16:30:00',
    '2025-12-08 18:30:00',
    120,
    10.00,
    'Pagado',
    '2025-12-08 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC08-11',
    '2025-12-08 18:00:00',
    '2025-12-08 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-12-08 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-DIC08-12',
    '2025-12-08 19:30:00',
    '2025-12-08 20:30:00',
    60,
    5.00,
    'Pagado',
    '2025-12-08 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-DIC08-13',
    '2025-12-08 21:00:00',
    '2025-12-08 23:00:00',
    120,
    16.00,
    'Pagado',
    '2025-12-08 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
);

SELECT '4to lote (Dic 05-08) Insertado Correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- SABADO 08 NOV (Fin de semana - ~13 tickets)
-- =============================================
(
    'TKT-NOV08-01',
    '2025-11-08 08:00:00',
    '2025-11-08 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-11-08 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
), -- 4h * 5.00
(
    'TKT-NOV08-02',
    '2025-11-08 09:30:00',
    '2025-11-08 11:00:00',
    90,
    6.00,
    'Pagado',
    '2025-11-08 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV08-03',
    '2025-11-08 10:00:00',
    '2025-11-08 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-08 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV08-04',
    '2025-11-08 11:00:00',
    '2025-11-08 11:45:00',
    45,
    2.50,
    'Pagado',
    '2025-11-08 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV08-05',
    '2025-11-08 12:00:00',
    '2025-11-08 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-08 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV08-06',
    '2025-11-08 13:15:00',
    '2025-11-08 15:15:00',
    120,
    10.00,
    'Pagado',
    '2025-11-08 13:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV08-07',
    '2025-11-08 14:00:00',
    '2025-11-08 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-08 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV08-08',
    '2025-11-08 15:30:00',
    '2025-11-08 16:15:00',
    45,
    2.50,
    'Pagado',
    '2025-11-08 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV08-09',
    '2025-11-08 16:00:00',
    '2025-11-08 18:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-08 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV08-10',
    '2025-11-08 17:30:00',
    '2025-11-08 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-08 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV08-11',
    '2025-11-08 18:00:00',
    '2025-11-08 21:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-08 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV08-12',
    '2025-11-08 20:00:00',
    '2025-11-08 22:00:00',
    120,
    16.00,
    'Pagado',
    '2025-11-08 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV08-13',
    '2025-11-08 21:00:00',
    '2025-11-08 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-08 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- DOMINGO 09 NOV (Día tranquilo ~10 tickets)
-- =============================================
(
    'TKT-NOV09-01',
    '2025-11-09 09:00:00',
    '2025-11-09 11:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-09 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV09-02',
    '2025-11-09 10:30:00',
    '2025-11-09 12:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-09 10:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV09-03',
    '2025-11-09 11:00:00',
    '2025-11-09 12:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-09 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV09-04',
    '2025-11-09 11:30:00',
    '2025-11-09 14:30:00',
    180,
    21.00,
    'Pagado',
    '2025-11-09 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV09-05',
    '2025-11-09 12:30:00',
    '2025-11-09 16:30:00',
    240,
    32.00,
    'Pagado',
    '2025-11-09 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV09-06',
    '2025-11-09 13:00:00',
    '2025-11-09 14:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-09 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV09-07',
    '2025-11-09 14:15:00',
    '2025-11-09 15:45:00',
    90,
    10.50,
    'Pagado',
    '2025-11-09 14:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV09-08',
    '2025-11-09 15:00:00',
    '2025-11-09 16:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-09 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV09-09',
    '2025-11-09 17:00:00',
    '2025-11-09 18:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-09 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV09-10',
    '2025-11-09 19:00:00',
    '2025-11-09 21:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-09 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),

-- =============================================
-- LUNES 10 NOV (Lunes laboral ~13 tickets)
-- =============================================
(
    'TKT-NOV10-01',
    '2025-11-10 07:30:00',
    '2025-11-10 13:30:00',
    360,
    30.00,
    'Pagado',
    '2025-11-10 07:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV10-02',
    '2025-11-10 08:30:00',
    '2025-11-10 09:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-10 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV10-03',
    '2025-11-10 09:00:00',
    '2025-11-10 11:00:00',
    120,
    5.00,
    'Pagado',
    '2025-11-10 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV10-04',
    '2025-11-10 10:15:00',
    '2025-11-10 12:15:00',
    120,
    14.00,
    'Pagado',
    '2025-11-10 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV10-05',
    '2025-11-10 11:00:00',
    '2025-11-10 14:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-10 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV10-06',
    '2025-11-10 12:30:00',
    '2025-11-10 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-10 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV10-07',
    '2025-11-10 13:45:00',
    '2025-11-10 15:45:00',
    120,
    14.00,
    'Pagado',
    '2025-11-10 13:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV10-08',
    '2025-11-10 14:30:00',
    '2025-11-10 15:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-10 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV10-09',
    '2025-11-10 15:30:00',
    '2025-11-10 16:30:00',
    60,
    2.50,
    'Pagado',
    '2025-11-10 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV10-10',
    '2025-11-10 16:30:00',
    '2025-11-10 18:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-10 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV10-11',
    '2025-11-10 17:00:00',
    '2025-11-10 19:30:00',
    150,
    12.50,
    'Pagado',
    '2025-11-10 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV10-12',
    '2025-11-10 18:00:00',
    '2025-11-10 20:00:00',
    120,
    16.00,
    'Pagado',
    '2025-11-10 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV10-13',
    '2025-11-10 20:00:00',
    '2025-11-10 21:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-10 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- MARTES 11 NOV (Tráfico Medio ~12 tickets)
-- =============================================
(
    'TKT-NOV11-01',
    '2025-11-11 08:00:00',
    '2025-11-11 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-11-11 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV11-02',
    '2025-11-11 09:15:00',
    '2025-11-11 10:45:00',
    90,
    6.00,
    'Pagado',
    '2025-11-11 09:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV11-03',
    '2025-11-11 10:00:00',
    '2025-11-11 12:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-11 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV11-04',
    '2025-11-11 11:30:00',
    '2025-11-11 12:30:00',
    60,
    2.50,
    'Pagado',
    '2025-11-11 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV11-05',
    '2025-11-11 12:30:00',
    '2025-11-11 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-11 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV11-06',
    '2025-11-11 13:00:00',
    '2025-11-11 16:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-11 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV11-07',
    '2025-11-11 14:30:00',
    '2025-11-11 16:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-11 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV11-08',
    '2025-11-11 15:30:00',
    '2025-11-11 17:00:00',
    90,
    3.75,
    'Pagado',
    '2025-11-11 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV11-09',
    '2025-11-11 17:00:00',
    '2025-11-11 19:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-11 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV11-10',
    '2025-11-11 18:00:00',
    '2025-11-11 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-11 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV11-11',
    '2025-11-11 19:30:00',
    '2025-11-11 20:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-11 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV11-12',
    '2025-11-11 21:00:00',
    '2025-11-11 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-11 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote 5 (Nov 08-11) Insertado Correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- MIERCOLES 12 NOV (Tráfico ~13 tickets)
-- =============================================
(
    'TKT-NOV12-01',
    '2025-11-12 07:45:00',
    '2025-11-12 11:45:00',
    240,
    20.00,
    'Pagado',
    '2025-11-12 07:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV12-02',
    '2025-11-12 08:30:00',
    '2025-11-12 09:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-12 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV12-03',
    '2025-11-12 09:15:00',
    '2025-11-12 11:15:00',
    120,
    5.00,
    'Pagado',
    '2025-11-12 09:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV12-04',
    '2025-11-12 10:00:00',
    '2025-11-12 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-12 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV12-05',
    '2025-11-12 11:30:00',
    '2025-11-12 14:30:00',
    180,
    24.00,
    'Pagado',
    '2025-11-12 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV12-06',
    '2025-11-12 12:45:00',
    '2025-11-12 13:45:00',
    60,
    5.00,
    'Pagado',
    '2025-11-12 12:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV12-07',
    '2025-11-12 14:00:00',
    '2025-11-12 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-12 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV12-08',
    '2025-11-12 15:00:00',
    '2025-11-12 16:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-12 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV12-09',
    '2025-11-12 16:15:00',
    '2025-11-12 18:15:00',
    120,
    8.00,
    'Pagado',
    '2025-11-12 16:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV12-10',
    '2025-11-12 17:30:00',
    '2025-11-12 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-12 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV12-11',
    '2025-11-12 18:00:00',
    '2025-11-12 21:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-12 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV12-12',
    '2025-11-12 19:30:00',
    '2025-11-12 21:30:00',
    120,
    16.00,
    'Pagado',
    '2025-11-12 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV12-13',
    '2025-11-12 20:30:00',
    '2025-11-12 22:00:00',
    90,
    7.50,
    'Pagado',
    '2025-11-12 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- JUEVES 13 NOV (Tráfico ~12 tickets)
-- =============================================
(
    'TKT-NOV13-01',
    '2025-11-13 08:15:00',
    '2025-11-13 13:15:00',
    300,
    25.00,
    'Pagado',
    '2025-11-13 08:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV13-02',
    '2025-11-13 09:00:00',
    '2025-11-13 10:30:00',
    90,
    6.00,
    'Pagado',
    '2025-11-13 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV13-03',
    '2025-11-13 10:15:00',
    '2025-11-13 11:15:00',
    60,
    2.50,
    'Pagado',
    '2025-11-13 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV13-04',
    '2025-11-13 11:00:00',
    '2025-11-13 14:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-13 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV13-05',
    '2025-11-13 12:30:00',
    '2025-11-13 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-13 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV13-06',
    '2025-11-13 13:45:00',
    '2025-11-13 16:45:00',
    180,
    24.00,
    'Pagado',
    '2025-11-13 13:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV13-07',
    '2025-11-13 14:30:00',
    '2025-11-13 16:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-13 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV13-08',
    '2025-11-13 15:30:00',
    '2025-11-13 17:00:00',
    90,
    3.75,
    'Pagado',
    '2025-11-13 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV13-09',
    '2025-11-13 16:30:00',
    '2025-11-13 18:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-13 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV13-10',
    '2025-11-13 17:45:00',
    '2025-11-13 19:45:00',
    120,
    10.00,
    'Pagado',
    '2025-11-13 17:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV13-11',
    '2025-11-13 19:00:00',
    '2025-11-13 22:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-13 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV13-12',
    '2025-11-13 20:30:00',
    '2025-11-13 21:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-13 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- VIERNES 14 NOV (Fin de semana comienza ~14 tickets)
-- =============================================
(
    'TKT-NOV14-01',
    '2025-11-14 08:00:00',
    '2025-11-14 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-11-14 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV14-02',
    '2025-11-14 09:30:00',
    '2025-11-14 10:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-14 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV14-03',
    '2025-11-14 10:00:00',
    '2025-11-14 11:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-14 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV14-04',
    '2025-11-14 11:00:00',
    '2025-11-14 12:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-14 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV14-05',
    '2025-11-14 12:30:00',
    '2025-11-14 16:30:00',
    240,
    32.00,
    'Pagado',
    '2025-11-14 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV14-06',
    '2025-11-14 13:00:00',
    '2025-11-14 14:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-14 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV14-07',
    '2025-11-14 14:15:00',
    '2025-11-14 16:15:00',
    120,
    14.00,
    'Pagado',
    '2025-11-14 14:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV14-08',
    '2025-11-14 15:00:00',
    '2025-11-14 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-14 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV14-09',
    '2025-11-14 16:30:00',
    '2025-11-14 18:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-14 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV14-10',
    '2025-11-14 17:30:00',
    '2025-11-14 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-14 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV14-11',
    '2025-11-14 18:30:00',
    '2025-11-14 21:30:00',
    180,
    21.00,
    'Pagado',
    '2025-11-14 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV14-12',
    '2025-11-14 20:00:00',
    '2025-11-14 23:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-14 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV14-13',
    '2025-11-14 21:00:00',
    '2025-11-14 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-14 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV14-14',
    '2025-11-14 22:00:00',
    '2025-11-14 23:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-14 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- SABADO 15 NOV (Compras y salidas ~15 tickets)
-- =============================================
(
    'TKT-NOV15-01',
    '2025-11-15 08:30:00',
    '2025-11-15 13:30:00',
    300,
    25.00,
    'Pagado',
    '2025-11-15 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV15-02',
    '2025-11-15 09:30:00',
    '2025-11-15 11:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-15 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV15-03',
    '2025-11-15 10:00:00',
    '2025-11-15 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-15 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV15-04',
    '2025-11-15 10:45:00',
    '2025-11-15 11:45:00',
    60,
    2.50,
    'Pagado',
    '2025-11-15 10:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV15-05',
    '2025-11-15 12:00:00',
    '2025-11-15 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-15 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV15-06',
    '2025-11-15 13:00:00',
    '2025-11-15 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-15 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV15-07',
    '2025-11-15 14:00:00',
    '2025-11-15 17:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-15 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV15-08',
    '2025-11-15 15:00:00',
    '2025-11-15 16:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-15 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV15-09',
    '2025-11-15 16:00:00',
    '2025-11-15 18:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-15 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV15-10',
    '2025-11-15 17:00:00',
    '2025-11-15 19:30:00',
    150,
    12.50,
    'Pagado',
    '2025-11-15 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV15-11',
    '2025-11-15 18:00:00',
    '2025-11-15 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-15 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV15-12',
    '2025-11-15 19:00:00',
    '2025-11-15 20:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-15 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV15-13',
    '2025-11-15 20:00:00',
    '2025-11-15 22:00:00',
    120,
    16.00,
    'Pagado',
    '2025-11-15 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV15-14',
    '2025-11-15 21:00:00',
    '2025-11-15 23:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-15 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV15-15',
    '2025-11-15 22:00:00',
    '2025-11-15 23:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-15 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
);

SELECT 'Lote 6 (Nov 12-15) Insertado Correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- DOMINGO 16 NOV (Día tranquilo ~11 tickets)
-- =============================================
(
    'TKT-NOV16-01',
    '2025-11-16 09:00:00',
    '2025-11-16 12:00:00',
    180,
    15.00,
    'Pagado',
    '2025-11-16 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV16-02',
    '2025-11-16 10:00:00',
    '2025-11-16 12:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-16 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV16-03',
    '2025-11-16 10:30:00',
    '2025-11-16 11:30:00',
    60,
    2.50,
    'Pagado',
    '2025-11-16 10:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV16-04',
    '2025-11-16 11:00:00',
    '2025-11-16 14:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-16 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV16-05',
    '2025-11-16 12:00:00',
    '2025-11-16 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-16 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV16-06',
    '2025-11-16 13:00:00',
    '2025-11-16 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-16 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV16-07',
    '2025-11-16 14:00:00',
    '2025-11-16 16:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-16 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV16-08',
    '2025-11-16 15:00:00',
    '2025-11-16 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-16 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV16-09',
    '2025-11-16 16:30:00',
    '2025-11-16 18:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-16 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV16-10',
    '2025-11-16 18:00:00',
    '2025-11-16 19:30:00',
    90,
    6.00,
    'Pagado',
    '2025-11-16 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
), -- 1.5h * 4 = 6.00
(
    'TKT-NOV16-11',
    '2025-11-16 19:30:00',
    '2025-11-16 21:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-16 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),

-- =============================================
-- LUNES 17 NOV (Inicio semana ~12 tickets)
-- =============================================
(
    'TKT-NOV17-01',
    '2025-11-17 07:30:00',
    '2025-11-17 12:30:00',
    300,
    25.00,
    'Pagado',
    '2025-11-17 07:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV17-02',
    '2025-11-17 08:45:00',
    '2025-11-17 09:45:00',
    60,
    4.00,
    'Pagado',
    '2025-11-17 08:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV17-03',
    '2025-11-17 09:15:00',
    '2025-11-17 11:15:00',
    120,
    5.00,
    'Pagado',
    '2025-11-17 09:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV17-04',
    '2025-11-17 10:00:00',
    '2025-11-17 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-17 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV17-05',
    '2025-11-17 11:30:00',
    '2025-11-17 14:30:00',
    180,
    24.00,
    'Pagado',
    '2025-11-17 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV17-06',
    '2025-11-17 13:00:00',
    '2025-11-17 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-17 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV17-07',
    '2025-11-17 14:15:00',
    '2025-11-17 15:45:00',
    90,
    10.50,
    'Pagado',
    '2025-11-17 14:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV17-08',
    '2025-11-17 15:30:00',
    '2025-11-17 16:30:00',
    60,
    2.50,
    'Pagado',
    '2025-11-17 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV17-09',
    '2025-11-17 16:30:00',
    '2025-11-17 18:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-17 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV17-10',
    '2025-11-17 17:30:00',
    '2025-11-17 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-17 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV17-11',
    '2025-11-17 19:00:00',
    '2025-11-17 21:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-17 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV17-12',
    '2025-11-17 20:30:00',
    '2025-11-17 22:30:00',
    120,
    16.00,
    'Pagado',
    '2025-11-17 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),

-- =============================================
-- MARTES 18 NOV (Tráfico Medio ~12 tickets)
-- =============================================
(
    'TKT-NOV18-01',
    '2025-11-18 08:00:00',
    '2025-11-18 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-11-18 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV18-02',
    '2025-11-18 09:30:00',
    '2025-11-18 11:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-18 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV18-03',
    '2025-11-18 10:00:00',
    '2025-11-18 12:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-18 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV18-04',
    '2025-11-18 11:15:00',
    '2025-11-18 12:15:00',
    60,
    2.50,
    'Pagado',
    '2025-11-18 11:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV18-05',
    '2025-11-18 12:30:00',
    '2025-11-18 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-18 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV18-06',
    '2025-11-18 13:00:00',
    '2025-11-18 16:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-18 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV18-07',
    '2025-11-18 14:30:00',
    '2025-11-18 16:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-18 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV18-08',
    '2025-11-18 15:30:00',
    '2025-11-18 17:00:00',
    90,
    3.75,
    'Pagado',
    '2025-11-18 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV18-09',
    '2025-11-18 17:00:00',
    '2025-11-18 19:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-18 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV18-10',
    '2025-11-18 18:00:00',
    '2025-11-18 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-18 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV18-11',
    '2025-11-18 19:30:00',
    '2025-11-18 20:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-18 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV18-12',
    '2025-11-18 21:00:00',
    '2025-11-18 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-18 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- MIERCOLES 19 NOV (Tráfico ~13 tickets)
-- =============================================
(
    'TKT-NOV19-01',
    '2025-11-19 07:45:00',
    '2025-11-19 11:45:00',
    240,
    20.00,
    'Pagado',
    '2025-11-19 07:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV19-02',
    '2025-11-19 08:30:00',
    '2025-11-19 09:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-19 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV19-03',
    '2025-11-19 09:15:00',
    '2025-11-19 11:15:00',
    120,
    5.00,
    'Pagado',
    '2025-11-19 09:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV19-04',
    '2025-11-19 10:00:00',
    '2025-11-19 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-19 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV19-05',
    '2025-11-19 11:30:00',
    '2025-11-19 14:30:00',
    180,
    24.00,
    'Pagado',
    '2025-11-19 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV19-06',
    '2025-11-19 12:45:00',
    '2025-11-19 13:45:00',
    60,
    5.00,
    'Pagado',
    '2025-11-19 12:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV19-07',
    '2025-11-19 14:00:00',
    '2025-11-19 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-19 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV19-08',
    '2025-11-19 15:00:00',
    '2025-11-19 16:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-19 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV19-09',
    '2025-11-19 16:15:00',
    '2025-11-19 18:15:00',
    120,
    8.00,
    'Pagado',
    '2025-11-19 16:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV19-10',
    '2025-11-19 17:30:00',
    '2025-11-19 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-19 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV19-11',
    '2025-11-19 18:00:00',
    '2025-11-19 21:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-19 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV19-12',
    '2025-11-19 19:30:00',
    '2025-11-19 21:30:00',
    120,
    16.00,
    'Pagado',
    '2025-11-19 19:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV19-13',
    '2025-11-19 20:30:00',
    '2025-11-19 22:00:00',
    90,
    7.50,
    'Pagado',
    '2025-11-19 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote 7 (Nov 16-19) Insertado Correctamente' AS Estado;

USE `parkingcontrol_db`;

INSERT INTO
    ticket (
        codigo_ticket,
        hora_entrada,
        hora_salida,
        tiempo_permanencia,
        monto_total,
        estado,
        fecha_emision,
        id_vehiculo,
        id_espacio,
        id_usuario_entrada,
        id_usuario_salida,
        id_tarifa
    )
VALUES

-- =============================================
-- JUEVES 20 NOV (Tráfico ~12 tickets)
-- =============================================
(
    'TKT-NOV20-01',
    '2025-11-20 08:15:00',
    '2025-11-20 13:15:00',
    300,
    25.00,
    'Pagado',
    '2025-11-20 08:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV20-02',
    '2025-11-20 09:00:00',
    '2025-11-20 10:30:00',
    90,
    6.00,
    'Pagado',
    '2025-11-20 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV20-03',
    '2025-11-20 10:15:00',
    '2025-11-20 11:15:00',
    60,
    2.50,
    'Pagado',
    '2025-11-20 10:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV20-04',
    '2025-11-20 11:00:00',
    '2025-11-20 14:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-20 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV20-05',
    '2025-11-20 12:30:00',
    '2025-11-20 13:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-20 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV20-06',
    '2025-11-20 13:45:00',
    '2025-11-20 16:45:00',
    180,
    24.00,
    'Pagado',
    '2025-11-20 13:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV20-07',
    '2025-11-20 14:30:00',
    '2025-11-20 16:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-20 14:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV20-08',
    '2025-11-20 15:30:00',
    '2025-11-20 17:00:00',
    90,
    3.75,
    'Pagado',
    '2025-11-20 15:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV20-09',
    '2025-11-20 16:30:00',
    '2025-11-20 18:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-20 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV20-10',
    '2025-11-20 17:45:00',
    '2025-11-20 19:45:00',
    120,
    10.00,
    'Pagado',
    '2025-11-20 17:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV20-11',
    '2025-11-20 19:00:00',
    '2025-11-20 22:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-20 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV20-12',
    '2025-11-20 20:30:00',
    '2025-11-20 21:30:00',
    60,
    5.00,
    'Pagado',
    '2025-11-20 20:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),

-- =============================================
-- VIERNES 21 NOV (Comienzo Fin de Semana ~14 tickets)
-- =============================================
(
    'TKT-NOV21-01',
    '2025-11-21 08:00:00',
    '2025-11-21 12:00:00',
    240,
    20.00,
    'Pagado',
    '2025-11-21 08:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV21-02',
    '2025-11-21 09:30:00',
    '2025-11-21 10:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-21 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV21-03',
    '2025-11-21 10:00:00',
    '2025-11-21 11:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-21 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV21-04',
    '2025-11-21 11:00:00',
    '2025-11-21 12:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-21 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV21-05',
    '2025-11-21 12:30:00',
    '2025-11-21 16:30:00',
    240,
    32.00,
    'Pagado',
    '2025-11-21 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV21-06',
    '2025-11-21 13:00:00',
    '2025-11-21 14:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-21 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV21-07',
    '2025-11-21 14:15:00',
    '2025-11-21 16:15:00',
    120,
    14.00,
    'Pagado',
    '2025-11-21 14:15:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV21-08',
    '2025-11-21 15:00:00',
    '2025-11-21 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-21 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV21-09',
    '2025-11-21 16:30:00',
    '2025-11-21 18:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-21 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV21-10',
    '2025-11-21 17:30:00',
    '2025-11-21 19:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-21 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV21-11',
    '2025-11-21 18:30:00',
    '2025-11-21 21:30:00',
    180,
    21.00,
    'Pagado',
    '2025-11-21 18:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV21-12',
    '2025-11-21 20:00:00',
    '2025-11-21 23:00:00',
    180,
    24.00,
    'Pagado',
    '2025-11-21 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV21-13',
    '2025-11-21 21:00:00',
    '2025-11-21 22:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-21 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV21-14',
    '2025-11-21 22:00:00',
    '2025-11-21 23:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-21 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- SABADO 22 NOV (Día Fuerte ~15 tickets)
-- =============================================
(
    'TKT-NOV22-01',
    '2025-11-22 08:30:00',
    '2025-11-22 13:30:00',
    300,
    25.00,
    'Pagado',
    '2025-11-22 08:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV22-02',
    '2025-11-22 09:30:00',
    '2025-11-22 11:30:00',
    120,
    8.00,
    'Pagado',
    '2025-11-22 09:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV22-03',
    '2025-11-22 10:00:00',
    '2025-11-22 13:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-22 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV22-04',
    '2025-11-22 10:45:00',
    '2025-11-22 11:45:00',
    60,
    2.50,
    'Pagado',
    '2025-11-22 10:45:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV22-05',
    '2025-11-22 12:00:00',
    '2025-11-22 16:00:00',
    240,
    32.00,
    'Pagado',
    '2025-11-22 12:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV22-06',
    '2025-11-22 13:00:00',
    '2025-11-22 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-22 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV22-07',
    '2025-11-22 14:00:00',
    '2025-11-22 17:00:00',
    180,
    21.00,
    'Pagado',
    '2025-11-22 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV22-08',
    '2025-11-22 15:00:00',
    '2025-11-22 16:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-22 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV22-09',
    '2025-11-22 16:00:00',
    '2025-11-22 18:00:00',
    120,
    8.00,
    'Pagado',
    '2025-11-22 16:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV22-10',
    '2025-11-22 17:00:00',
    '2025-11-22 19:30:00',
    150,
    12.50,
    'Pagado',
    '2025-11-22 17:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV22-11',
    '2025-11-22 18:00:00',
    '2025-11-22 20:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-22 18:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV22-12',
    '2025-11-22 19:00:00',
    '2025-11-22 20:30:00',
    90,
    7.50,
    'Pagado',
    '2025-11-22 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-08'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV22-13',
    '2025-11-22 20:00:00',
    '2025-11-22 22:00:00',
    120,
    16.00,
    'Pagado',
    '2025-11-22 20:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-04'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV22-14',
    '2025-11-22 21:00:00',
    '2025-11-22 23:00:00',
    120,
    14.00,
    'Pagado',
    '2025-11-22 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV22-15',
    '2025-11-22 22:00:00',
    '2025-11-22 23:30:00',
    90,
    3.75,
    'Pagado',
    '2025-11-22 22:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-08'
        LIMIT 1
    ),
    1,
    1, -- Moto
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),

-- =============================================
-- DOMINGO 23 NOV (Día tranquilo, conecta con Lote 1)
-- =============================================
(
    'TKT-NOV23-01',
    '2025-11-23 09:00:00',
    '2025-11-23 11:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-23 09:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV23-02',
    '2025-11-23 10:00:00',
    '2025-11-23 13:00:00',
    180,
    12.00,
    'Pagado',
    '2025-11-23 10:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV23-03',
    '2025-11-23 11:00:00',
    '2025-11-23 12:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-23 11:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'MTO-303'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-09'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV23-04',
    '2025-11-23 11:30:00',
    '2025-11-23 13:30:00',
    120,
    14.00,
    'Pagado',
    '2025-11-23 11:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV23-05',
    '2025-11-23 12:30:00',
    '2025-11-23 15:30:00',
    180,
    24.00,
    'Pagado',
    '2025-11-23 12:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CAM-505'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'D-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Camioneta'
        LIMIT 1
    )
),
(
    'TKT-NOV23-06',
    '2025-11-23 13:00:00',
    '2025-11-23 15:00:00',
    120,
    10.00,
    'Pagado',
    '2025-11-23 13:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV23-07',
    '2025-11-23 14:00:00',
    '2025-11-23 15:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-23 14:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'TUR-888'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-05'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV23-08',
    '2025-11-23 15:00:00',
    '2025-11-23 16:00:00',
    60,
    2.50,
    'Pagado',
    '2025-11-23 15:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'FAST-77'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-10'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Moto'
        LIMIT 1
    )
),
(
    'TKT-NOV23-09',
    '2025-11-23 16:30:00',
    '2025-11-23 18:30:00',
    120,
    10.00,
    'Pagado',
    '2025-11-23 16:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'XYZ-999'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-03'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
),
(
    'TKT-NOV23-10',
    '2025-11-23 17:30:00',
    '2025-11-23 18:30:00',
    60,
    4.00,
    'Pagado',
    '2025-11-23 17:30:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'CMP-404'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'B-01'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Compacto'
        LIMIT 1
    )
),
(
    'TKT-NOV23-11',
    '2025-11-23 19:00:00',
    '2025-11-23 20:30:00',
    90,
    10.50,
    'Pagado',
    '2025-11-23 19:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'SUV-202'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'C-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'SUV'
        LIMIT 1
    )
),
(
    'TKT-NOV23-12',
    '2025-11-23 21:00:00',
    '2025-11-23 22:00:00',
    60,
    5.00,
    'Pagado',
    '2025-11-23 21:00:00',
    (
        SELECT id_vehiculo
        FROM vehiculos
        WHERE
            placa = 'ABC-101'
    ),
    (
        SELECT id_espacio
        FROM espacio
        WHERE
            codigo = 'A-02'
        LIMIT 1
    ),
    1,
    1,
    (
        SELECT id_tarifa
        FROM tarifa
        WHERE
            tipo_vehiculo = 'Sedan'
        LIMIT 1
    )
);

SELECT 'Lote Final Histórico (Nov 20-23) Insertado Completamente' AS Estado;