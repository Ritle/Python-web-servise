FROM php:8.2-apache

# Устанавливаем необходимые расширения PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo mbstring exif pcntl bcmath gd \
    && pecl install redis \
    && docker-php-ext-enable redis

# Копируем все файлы в корневую директорию веб-сервера
COPY . /var/www/html/

# Устанавливаем правильные разрешения
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80