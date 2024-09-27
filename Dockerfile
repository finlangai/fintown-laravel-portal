# Use a multi-stage build to reduce the final image size
FROM mcr.microsoft.com/devcontainers/php:1-8.2-bullseye AS build

# Set working directory
WORKDIR /app

# Copy composer.json and package.json first to leverage Docker cache
COPY composer.json composer.lock ./
COPY package.json yarn.lock ./

# Install Node.js 22, Yarn, and MongoDB extension
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && yes '' | pecl install mongodb && docker-php-ext-enable mongodb \
    && cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini 

# Copy the rest of the project
COPY . .

# Install dependencies
RUN yarn install --production \
    && composer install --optimize-autoloader --no-dev \
    && yarn apidoc && yarn build

# Final stage
FROM mcr.microsoft.com/devcontainers/php:1-8.2-bullseye

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Expose the port and start the application
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
