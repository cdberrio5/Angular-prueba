FROM mysql:8

COPY init.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=Test
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

EXPOSE 3306