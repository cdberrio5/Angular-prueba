# Use the official MySQL version 8 image as the base image
FROM mysql:8

# Copy the initialization SQL script into the Docker container.
# This script will be executed when the container is first run.
COPY init.sql /docker-entrypoint-initdb.d/

# Set the environment variable for the MySQL root password.
# This password is required to access the MySQL root account.
ENV MYSQL_ROOT_PASSWORD=root

# Set the environment variable to create a new database named 'Test'.
ENV MYSQL_DATABASE=Test

# Set the environment variable for a new user with limited access.
# This user will have access to the 'Test' database.
ENV MYSQL_USER=admin

# Set the password for the new user created above.
ENV MYSQL_PASSWORD=admin

# Expose port 3306 for MySQL to allow external connections.
# This is the default port used by MySQL.
EXPOSE 3306
