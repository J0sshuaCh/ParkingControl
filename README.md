# ParkingControl 🚗💨

**ParkingControl** es un sistema integral de gestión de estacionamientos diseñado para optimizar el control de entradas y salidas de vehículos, la administración de espacios y la facturación automática mediante tarifas configurables.

El proyecto implementa una arquitectura **Cliente-Servidor** moderna, separando la lógica de presentación (Frontend) de la lógica de negocio, la cual reside híbrida entre el Backend y la Base de Datos (mediante Procedimientos Almacenados).

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Pre-requisitos](#-pre-requisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
  - [1. Base de Datos](#1-base-de-datos)
  - [2. Backend (API)](#2-backend-api)
  - [3. Frontend (Cliente)](#3-frontend-cliente)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribución](#-contribución)

---

## 🚀 Características Principales

* **Gestión de Espacios:** Visualización en tiempo real del estado de los espacios (Libre, Ocupado, Reservado).
* **Control de Tickets:** Emisión de tickets de entrada con códigos únicos y cálculo automático de montos al momento de la salida.
* **Sistema de Tarifas:** Tarifas configurables por tipo de vehículo (Sedan, SUV, Moto, etc.).
* **Gestión de Usuarios y Roles:** Sistema de autenticación con roles definidos (Admin, Supervisor, Operador).
* **Seguridad:** Encriptación de contraseñas (SHA256) manejada directamente a nivel de base de datos.
* **Reportes:** Generación de reportes de ocupación e ingresos.

---

## 🛠 Tecnologías Utilizadas

### Frontend
* **React:** Biblioteca principal para la interfaz de usuario.
* **Vite:** Empaquetador de módulos rápido para el entorno de desarrollo.
* **Tailwind CSS:** Framework de estilos utilitarios.
* **Shadcn/ui:** Componentes de interfaz reutilizables y accesibles.

### Backend
* **Node.js & Express:** Servidor REST API.
* **MySQL2:** Driver optimizado para la conexión con la base de datos.
* **Nodemon:** Utilidad para el desarrollo ágil (hot-reload).

### Base de Datos
* **MySQL:** Motor de base de datos relacional.
* **Stored Procedures:** Lógica de negocio encapsulada en la BD para operaciones críticas (Pagos, Reservas, Auth).

---

## 🏗 Arquitectura del Proyecto

El sistema prioriza la integridad de datos delegando operaciones transaccionales complejas a la base de datos:

1.  **Frontend:** Consume la API REST y gestiona el estado de la UI.
2.  **Backend (Node/Express):** Actúa como middleware, recibiendo peticiones, validando datos básicos y ejecutando `CALL sp_nombre_procedimiento` hacia MySQL.
3.  **Database:** Ejecuta la lógica de negocio (cálculos, bloqueos, actualizaciones en cascada) asegurando consistencia ACID.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) (v18 o superior recomendado)
* [MySQL Server](https://dev.mysql.com/downloads/installer/) (v8.0 o superior)
* [Git](https://git-scm.com/)

---

## ⚙️ Instalación y Configuración

Sigue estos pasos en orden para levantar el proyecto localmente.

### 1. Base de Datos

1.  Accede a tu gestor de base de datos (ej. MySQL Workbench).
2.  Ejecuta el script de estructura y datos iniciales:
    * Archivo: `database/parkingcontrol_db.sql`
3.  Ejecuta el script de lógica de negocio (Procedimientos y Funciones):
    * Archivo: `database/procesosyfunciones_parkingcontrol.sql`

### 2. Backend (API)

Navega a la carpeta del servidor e instala las dependencias:

```bash
cd backend
npm install
```
Configura la conexión a la base de datos en src/database/connection.js 
(o crea un archivo .env basado en la configuración):
```
// Ejemplo de configuración esperada en connection.js
export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tu_password',
    database: 'parkingcontrol_db'
});
```
Inicia el servidor (correrá en el puerto 8800 por defecto):
```bash
npm start
# O para modo desarrollo
npm run dev
```
### 3. Frontend (Presentacion)
En una nueva terminal, navega a la carpeta del cliente:
```
cd frontend
npm install
```
Inicia la aplicación (correrá usualmente en el puerto 5173):
```
npm run dev
```
