# Use the Nginx image based on Alpine Linux for a lightweight container
FROM nginx:alpine  

# Copy the built Angular application from the specified path to the Nginx HTML directory
COPY /app/dist/prueba-tecnica /usr/share/nginx/html  

# Expose port 80 to allow external access to the web server
EXPOSE 80  

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]  
