FROM node:18.13.0

# Install dependencies in the root of the Container
WORKDIR /
COPY package*.json ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn install --immutable --immutable-cache --check-cache --log-level verbose

# Set working dir to /app
WORKDIR /app

# declarate the volume
VOLUME /app

EXPOSE 5000
