# Official Node.js runtime as a parent image
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all deps without running any npm scripts (so express comes in, but husky/prepare is skipped)
RUN npm ci --ignore-scripts

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 9000

# Default command
CMD ["node", "express.js"]
