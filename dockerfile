# Use the official Node.js image to build the app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the built app to the Nginx html directory
COPY --from=build /app/dist/finalfrontend /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
