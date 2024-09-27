# Usar la imagen base de Nginx
FROM nginx:alpine

# Copiar solo la carpeta dist de la aplicación Angular al directorio predeterminado de Nginx
COPY /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
