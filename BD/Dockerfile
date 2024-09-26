# Utiliza la imagen oficial de MySQL
FROM mysql:8

# Copia el script de inicialización de la base de datos
COPY init.sql /docker-entrypoint-initdb.d/

# Establece las variables de entorno para el contenedor
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=test
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

# Exponer el puerto de MySQL
EXPOSE 3306
