FROM mcr.microsoft.com/devcontainers/php:1-8.2-bullseye

# Install Node.js 22 and Yarn
RUN sudo curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && sudo apt-get install -y nodejs 

# Install mongodb extension
RUN yes '' | pecl install mongodb && docker-php-ext-enable mongodb

RUN sudo cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini

# Append the MongoDB extension to php.ini
# RUN sudo echo "extension=mongodb" >> /usr/local/etc/php/php.ini

RUN yarn install --production

RUN composer install --optimize-autoloader --no-dev

RUN yarn apidoc && yarn build

# Set working directory
WORKDIR /app

# Copy the rest of the project
COPY . .