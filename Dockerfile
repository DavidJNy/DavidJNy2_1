# Use a Node.js base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json .


# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY /src /app/
COPY /public /app/
COPY /server /app/

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the React app

CMD ["npm", "start"]