# Establece la imagen base de Node para compilar Angular
FROM node:18 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build --prod

# Utiliza una imagen de servidor web para servir la aplicación Angular
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expone el puerto en el que NGINX servirá la app
EXPOSE 80

# Comando para correr NGINX
CMD ["nginx", "-g", "daemon off;"]
