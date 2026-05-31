# ParkingControl 🚗

**ParkingControl** es un sistema integral de gestión de estacionamientos diseñado para optimizar el control de entradas y salidas de vehículos, la administración de espacios y la facturación automática mediante tarifas configurables.

Esta versión del proyecto está completamente **Dockerizada**, lo que permite desplegar todo el entorno (Base de Datos, Backend y Frontend) con un solo comando, garantizando que funcione en cualquier máquina sin configuraciones manuales complejas.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Pre-requisitos](#-pre-requisitos)
- [Despliegue Rápido con Docker (Recomendado)](#-despliegue-rápido-con-docker-recomendado)
- [Despliegue en Railway](#-despliegue-en-railway)
- [Entorno de Desarrollo (Híbrido)](#-entorno-de-desarrollo-híbrido)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Credenciales de Acceso](#-credenciales-de-acceso)

---

## 🚀 Características Principales

* **Gestión de Espacios:** Visualización en tiempo real del estado de los espacios (Libre, Ocupado, Reservado).
* **Control de Tickets:** Emisión de tickets de entrada con códigos únicos y cálculo automático de montos.
* **Sistema de Tarifas:** Configuración dinámica por tipo de vehículo (Sedan, SUV, Moto, etc.).
* **Gestión de Usuarios:** Sistema de autenticación con roles (Admin, Supervisor, Operador).
* **Seguridad:** Encriptación SHA256 manejada directamente por procedimientos almacenados en MySQL.
* **Reportes:** Dashboards de ocupación e ingresos históricos.

---

## 🛠 Tecnologías Utilizadas

* **Frontend:** React + Vite, Tailwind CSS, Shadcn/ui.
* **Backend:** Node.js + Express.
* **Base de Datos:** MySQL 8.0 (con Stored Procedures para lógica transaccional).
* **Infraestructura:** Docker & Docker Compose.

---

## 📋 Pre-requisitos

Para correr este proyecto solo necesitas tener instalado:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) o Docker Engine + Compose (Linux).
* [Git](https://git-scm.com/) (para clonar el repositorio).

---

## 🐳 Despliegue Rápido con Docker (Recomendado)

Sigue estos pasos para levantar el proyecto completo en menos de 2 minutos:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd ParkingControl
   ```

2. **Levantar los servicios:**
   ```bash
   docker-compose up -d --build
   ```

3. **¡Listo! Accede desde tu navegador:**
   * **Frontend:** [http://localhost:3000](http://localhost:3000)
   * **Backend API:** [http://localhost:8800](http://localhost:8800)

*Nota: La base de datos se inicializa automáticamente con tablas, funciones y datos de prueba al primer inicio.*

---

## 🚆 Despliegue en Railway

Railway puede alojar el backend y la base de datos MySQL. El frontend puede desplegarse aparte, por ejemplo en Vercel, usando la URL publica del backend como `VITE_API_URL`.

### 1. Crear la base de datos MySQL

1. En Railway, crea un nuevo proyecto.
2. Agrega un servicio de base de datos **MySQL**.
3. Railway generara variables como:
   ```env
   MYSQLHOST=
   MYSQLUSER=
   MYSQLPASSWORD=
   MYSQLDATABASE=
   MYSQLPORT=
   ```

### 2. Importar la base de datos

Railway no ejecuta automaticamente los scripts de `database/` como Docker Compose. Los SQL del proyecto crean y usan el esquema `parkingcontrol_db`, asi que importa estos archivos en orden:

```bash
database/parkingcontrol_db.sql
database/procesosyfunciones_parkingcontrol.sql
```

`database/insercióntickets.sql` contiene datos de tickets de prueba; importalo solo si quieres poblar historial inicial para reportes y dashboards.

No importes `database/llenarespacios.sql` en produccion. Es una utilidad de pruebas que ocupa espacios temporalmente y luego incluye instrucciones de limpieza.

### 3. Crear el servicio backend

1. Crea un servicio desde este repositorio.
2. Configura el **Root Directory** como:
   ```text
   backend
   ```
3. Usa el comando de inicio:
   ```bash
   npm start
   ```
4. El backend escuchara automaticamente en el puerto asignado por Railway mediante `PORT`.

### 4. Variables del backend

Configura estas variables en el servicio backend:

```env
MYSQLHOST=<valor-del-servicio-mysql>
MYSQLUSER=<valor-del-servicio-mysql>
MYSQLPASSWORD=<valor-del-servicio-mysql>
MYSQLPORT=<valor-del-servicio-mysql>
DB_NAME=parkingcontrol_db
JWT_SECRET=una_clave_larga_y_segura
CORS_ORIGIN=https://tu-frontend.vercel.app
```

`DB_NAME=parkingcontrol_db` es importante porque el esquema importado se crea con ese nombre, aunque Railway tambien exponga `MYSQLDATABASE` con otro valor.

Si tambien despliegas el frontend en Railway y quieres aceptar dominios `*.up.railway.app` como origen en produccion, agrega:

```env
ALLOW_RAILWAY_DOMAINS=true
```

### 5. Verificar despliegue

Cuando Railway termine el deploy, prueba:

```text
https://tu-backend.up.railway.app/health
```

Debe responder:

```json
{ "status": "ok" }
```

### 6. Conectar el frontend

En el frontend configura:

```env
VITE_API_URL=https://tu-backend.up.railway.app
```

### Checklist final

Antes de probar la aplicacion completa en produccion, confirma:

- El backend tiene **Root Directory** configurado como `backend`.
- El comando de inicio del backend es `npm start`.
- El servicio MySQL ya tiene importados `parkingcontrol_db.sql` y `procesosyfunciones_parkingcontrol.sql`.
- El backend tiene `DB_NAME=parkingcontrol_db`.
- El backend tiene `CORS_ORIGIN` con la URL exacta del frontend.
- El frontend tiene `VITE_API_URL` con la URL publica del backend.
- `https://tu-backend.up.railway.app/health` responde `{ "status": "ok" }`.
- El login con usuario `admin` y contraseña `admin` funciona despues de importar la base de datos.

---

## 💻 Entorno de Desarrollo (Híbrido)

Si eres desarrollador y quieres modificar el código con **Hot-Reload** instantáneo, te recomendamos este flujo:

1. **Mantén el motor corriendo en Docker** (solo BD y API):
   ```bash
   docker-compose up -d db backend
   ```

2. **Corre el Frontend localmente:**
   ```bash
   cd frontend
   cp .env.example .env  # O copiar manualmente el archivo
   npm install
   npm run dev
   ```
   *Acceso local: [http://localhost:5173](http://localhost:5173)*

> **Nota sobre Seguridad:** Los archivos `.env` reales están ignorados por Git. Si clonas el proyecto para desarrollo manual, asegúrate de crear tu propio `.env` basándote en los archivos `.env.example` de cada carpeta. Si usas **Docker**, no es necesario ya que las variables están pre-configuradas en el `docker-compose.yml`.

---

## 🏗 Arquitectura del Proyecto

El sistema utiliza una arquitectura **API-First** con delegación de lógica a la base de datos:

1. **Frontend:** Gestiona la experiencia de usuario y consume la API.
2. **Backend:** Middleware encargado de la orquestación y seguridad.
3. **Database:** Repositorio central que ejecuta la lógica de negocio pesada (cálculos de tiempo, validación de espacios) mediante **Procedimientos Almacenados**.

---

## 🔑 Credenciales de Acceso

El sistema viene pre-poblado con un usuario administrador:
* **Usuario:** `admin`
* **Contraseña:** `admin`

---
⭐ *Desarrollado para la gestión eficiente de estacionamientos modernos.*
