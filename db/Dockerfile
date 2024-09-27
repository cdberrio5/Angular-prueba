# Utiliza la imagen oficial de MySQL
FROM mysql:8

# Copia el script de inicialización de la base de datos
COPY init.sql /docker-entrypoint-initdb.d/

# Establece las variables de entorno para el contenedor
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=Test
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Exponer el puerto de MySQL
EXPOSE 3306
