# Use the official Node.js 18 image as the base image
FROM node:18 

# Set the working directory inside the container to /app
WORKDIR /app 

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./ 

# Install the dependencies defined in package.json
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . . 

# Expose port 3000 to allow access to the application from outside the container
EXPOSE 3000 

# Define the command to run the application when the container starts
CMD ["npm", "start"] 
