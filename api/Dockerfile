FROM python:3.9-slim

WORKDIR /app

# Устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем приложение
COPY ./app /app/app

# Создаем том для данных SQLite
VOLUME /data

# Задаем переменную окружения для пути к БД
ENV DB_PATH=/data/requests.db

# Запускаем приложение
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]