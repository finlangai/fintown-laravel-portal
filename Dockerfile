# First stage: Build with Node.js and Yarn
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install

# Copy the rest of the project
COPY . .

# Run the build script
RUN yarn build

# Second stage: PHP 8.2 Bullseye
FROM mcr.microsoft.com/devcontainers/php:1-8.2-bullseye

# Set working directory
WORKDIR /app

# Install MongoDB extension
RUN yes '' | pecl install mongodb && docker-php-ext-enable mongodb \
    && cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini \
    && echo "extension=mongodb" >> /usr/local/etc/php/php.ini

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Install Composer dependencies
RUN composer install --optimize-autoloader --no-dev \
    && php artisan l5-swagger:generate

# Expose the port and start the application
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
