# 1. Add Node base image
FROM node:18-alpine

# 2. Create app directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install

# 4. Copy app source code
COPY . .

# 5. Build the app
RUN npm run build

# 6. Start Next.js app
EXPOSE 3000
CMD ["npm", "start"]
