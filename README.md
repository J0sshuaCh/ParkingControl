# ParkingControl

ParkingControl es una aplicacion web full-stack para la gestion operativa de estacionamientos. El sistema permite controlar entradas y salidas de vehiculos, administrar espacios, emitir tickets, configurar tarifas, gestionar usuarios y consultar reportes financieros desde una interfaz administrativa.

El proyecto fue desarrollado como una solucion integral para centralizar la operacion diaria de un estacionamiento, reduciendo procesos manuales y manteniendo la logica transaccional principal en una base de datos MySQL mediante procedimientos almacenados.

## Descripcion del proyecto

ParkingControl cubre el flujo completo de atencion de un estacionamiento:

1. Un usuario autorizado inicia sesion en el sistema.
2. El dashboard muestra indicadores operativos y financieros.
3. El modulo de espacios permite visualizar disponibilidad, ocupacion y reservas.
4. Al ingresar un vehiculo, se registra su placa, tipo y espacio asignado.
5. El sistema emite un ticket de entrada asociado al vehiculo, usuario, tarifa y espacio.
6. Al finalizar la permanencia, se calcula el monto correspondiente y se registra el pago.
7. Los reportes permiten consultar ingresos, historial de tickets y datos utiles para la administracion.

La aplicacion esta pensada como una plataforma administrativa interna, con enfoque en claridad operativa, persistencia relacional y separacion de responsabilidades entre frontend, backend y base de datos.

## Caracteristicas principales

- Autenticacion de usuarios con roles administrativos.
- Mapa de espacios con estados `libre`, `ocupado` y `reservado`.
- Registro de ingreso de vehiculos por placa y tipo.
- Emision y administracion de tickets.
- Calculo de pagos segun tarifas configurables.
- Gestion de tarifas por tipo de vehiculo.
- Gestion de usuarios del sistema.
- Dashboard con resumen de ocupacion e ingresos.
- Reportes financieros e historial de operaciones.
- Base de datos MySQL con funciones y procedimientos almacenados.
- Entorno local reproducible con Docker Compose.

## Arquitectura

El proyecto esta organizado en tres capas principales:

- **Frontend:** aplicacion React construida con Vite. Consume la API REST del backend y presenta la interfaz administrativa.
- **Backend:** API desarrollada con Node.js y Express. Expone endpoints REST y coordina las operaciones contra MySQL.
- **Base de datos:** MySQL 8.0. Contiene tablas, relaciones, funciones y procedimientos almacenados para operaciones criticas del negocio.

Flujo general:

```text
Frontend React -> API REST Express -> MySQL 8.0
```

## Stack tecnologico

**Frontend**

- React
- Vite
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Axios
- Recharts
- XLSX

**Backend**

- Node.js
- Express
- MySQL2
- Dotenv
- CORS

**Base de datos**

- MySQL 8.0
- Stored Procedures
- SQL Functions

**Infraestructura y despliegue**

- Docker
- Docker Compose
- Railway para backend y base de datos
- Vercel u otro hosting estatico para frontend

## Estructura del proyecto

```text
ParkingControl/
├── backend/                 # API REST con Node.js y Express
├── frontend/                # Aplicacion React + Vite
├── database/                # Scripts SQL de estructura, funciones y datos
├── docker-compose.yml       # Entorno local completo
└── README.md
```

## Requisitos previos

Para ejecutar el proyecto localmente se recomienda tener instalado:

- Git
- Docker Desktop o Docker Engine con Docker Compose

Para ejecutar frontend y backend manualmente tambien se requiere:

- Node.js 20 o superior
- npm
- MySQL 8.0

## Ejecucion local con Docker

Esta es la forma recomendada para levantar el proyecto completo en local. Docker Compose crea los servicios de base de datos, backend y frontend, e inicializa MySQL con los scripts SQL del proyecto.

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd ParkingControl
```

2. Levantar los contenedores:

```bash
docker-compose up -d --build
```

3. Acceder a la aplicacion:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8800
Health:   http://localhost:8800/health
```

La base de datos se inicializa automaticamente al crear el contenedor por primera vez. Si ya existe un volumen previo de MySQL, Docker no volvera a ejecutar los scripts de inicializacion.

## Credenciales de prueba

El entorno local incluye un usuario administrador inicial:

```text
Usuario: admin
Contrasena: admin
```

Estas credenciales son solo para desarrollo y demostracion.

## Modo de desarrollo

Tambien es posible trabajar con la base de datos y el backend en Docker, mientras el frontend se ejecuta localmente con Vite para tener recarga rapida.

1. Levantar base de datos y backend:

```bash
docker-compose up -d db backend
```

2. Entrar al frontend:

```bash
cd frontend
```

3. Instalar dependencias:

```bash
npm install
```

4. Crear archivo de entorno:

```bash
cp .env.example .env
```

5. Verificar que `frontend/.env` apunte al backend local:

```env
VITE_API_URL=http://localhost:8800
```

6. Ejecutar el frontend:

```bash
npm run dev
```

7. Abrir en el navegador:

```text
http://localhost:5173
```

## Variables de entorno

### Backend

El backend usa variables de entorno para conectarse a MySQL, configurar CORS y definir el puerto de ejecucion.

Archivo de referencia:

```text
backend/.env.example
```

Variables principales:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contrasena
DB_NAME=parkingcontrol_db
DB_PORT=3306
JWT_SECRET=una_clave_larga_y_segura
PORT=8800
CORS_ORIGIN=http://localhost:5173
```

Para Railway/MySQL administrado, el backend tambien soporta:

```env
MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=
```

Si se importa la base con el esquema incluido en este repositorio, se debe mantener:

```env
DB_NAME=parkingcontrol_db
```

### Frontend

Archivo de referencia:

```text
frontend/.env.example
```

Variable principal:

```env
VITE_API_URL=http://localhost:8800
```

## Base de datos

Los scripts SQL se encuentran en la carpeta `database/`.

Archivos principales:

- `parkingcontrol_db.sql`: crea el esquema, tablas y datos iniciales.
- `procesosyfunciones_parkingcontrol.sql`: crea funciones y procedimientos almacenados.
- `insercióntickets.sql`: agrega datos de prueba para reportes e historial.
- `README-railway.md`: instrucciones especificas para importar MySQL en Railway.

Orden recomendado de importacion manual:

```bash
database/parkingcontrol_db.sql
database/procesosyfunciones_parkingcontrol.sql
```

El archivo `insercióntickets.sql` es opcional y se recomienda solo para poblar datos de demostracion.

## Despliegue

El proyecto esta preparado para desplegarse separando responsabilidades:

- Backend y MySQL en Railway.
- Frontend en Vercel, Railway u otro servicio compatible con aplicaciones Vite.

Para el backend en Railway:

- Root Directory: `backend`
- Start Command: `npm start`
- Healthcheck recomendado: `/health`

Variables minimas del backend en produccion:

```env
MYSQLHOST=<valor-del-servicio-mysql>
MYSQLUSER=<valor-del-servicio-mysql>
MYSQLPASSWORD=<valor-del-servicio-mysql>
MYSQLPORT=<valor-del-servicio-mysql>
DB_NAME=parkingcontrol_db
JWT_SECRET=una_clave_larga_y_segura
CORS_ORIGIN=https://url-del-frontend
```

Variable del frontend en produccion:

```env
VITE_API_URL=https://url-del-backend
```

## Scripts utiles

### Backend

```bash
cd backend
npm install
npm run dev
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

## Estado del proyecto

ParkingControl es un proyecto full-stack funcional orientado a portfolio. Incluye una interfaz administrativa, API REST, persistencia relacional, procedimientos almacenados, entorno local dockerizado y configuracion preparada para despliegue cloud.
