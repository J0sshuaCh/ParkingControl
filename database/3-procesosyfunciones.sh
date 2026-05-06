#!/bin/bash
# Este script se ejecutará por el entrypoint de MySQL Docker para cargar funciones y procedimientos
# Espera hasta que el server acepte conexiones, luego importa el SQL de funciones

set -e

# Esperar que mysql esté listo
until mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -hlocalhost -e "select 1" parkingcontrol_db >/dev/null 2>&1; do
  echo "Esperando a que MySQL esté disponible..."
  sleep 2
done

# Ejecutar scripts de funciones y procedimientos
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" parkingcontrol_db < /docker-entrypoint-initdb.d/procesosyfunciones_parkingcontrol.sql

echo "Funciones y procedimientos importados correctamente."
