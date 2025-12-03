# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3001

# Start the backend
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
