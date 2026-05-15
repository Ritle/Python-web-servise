FROM php:8.2-apache

# Устанавливаем curl для внешних запросов
RUN apt-get update && apt-get install -y curl

COPY index.php /var/www/html/