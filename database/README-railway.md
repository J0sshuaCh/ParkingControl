# Importacion de MySQL en Railway

Este proyecto usa el esquema `parkingcontrol_db`. En Railway, el servicio MySQL puede crear una base por defecto con otro nombre, por ejemplo `railway`, pero los SQL de este proyecto crean y usan `parkingcontrol_db`.

## Orden de importacion

Importa estos archivos en orden:

```bash
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p < database/parkingcontrol_db.sql
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p < database/procesosyfunciones_parkingcontrol.sql
```

## Datos opcionales

`insercióntickets.sql` agrega historial de tickets de prueba para reportes y dashboards. Importalo solo si necesitas datos demo:

```bash
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p < database/insercióntickets.sql
```

No importes `llenarespacios.sql` en produccion. Ese archivo es una utilidad de pruebas: ocupa espacios temporalmente y luego contiene instrucciones de limpieza.

## Variables del backend

Como el esquema importado se llama `parkingcontrol_db`, configura el backend con:

```env
DB_NAME=parkingcontrol_db
```

Puedes seguir usando las demas variables de Railway para host, usuario, password y puerto:

```env
MYSQLHOST=<valor-de-railway>
MYSQLUSER=<valor-de-railway>
MYSQLPASSWORD=<valor-de-railway>
MYSQLPORT=<valor-de-railway>
```
