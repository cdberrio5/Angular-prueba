# Establece la imagen base de Node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usará la API
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
