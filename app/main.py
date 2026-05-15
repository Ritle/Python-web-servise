from fastapi import FastAPI, Request, Response
from .database import init_db, log_request, get_last_logs
import os

app = FastAPI()

# Получаем путь к БД из переменной окружения
DB_PATH = os.getenv("DB_PATH", "/data/requests.db")

@app.on_event("startup")
def startup_event():
    """Инициализация базы данных при старте приложения"""
    init_db(DB_PATH)

# Middleware для проверки разрешенных маршрутов и логирования
@app.middleware("http")
async def request_middleware(request: Request, call_next):
    # Проверяем, является ли запрос разрешенным
    allowed_routes = [
        ("/process", "POST"),
        ("/logs", "GET")
    ]
    
    # Убираем завершающий слеш из пути для единообразия
    path = request.url.path.rstrip('/') or '/'
    
    is_allowed = any(
        path == route[0] and request.method == route[1]
        for route in allowed_routes
    )
    
    if not is_allowed:
        # Если запрос не разрешен, сразу возвращаем 404
        response = Response(status_code=404, content="Not Found")
        status_code = 404
    else:
        # Если запрос разрешен, передаем его дальше
        response = await call_next(request)
        status_code = response.status_code
    
    # Логируем запрос
    log_request(DB_PATH, request.method, request.url.path, status_code)
    
    return response

@app.post("/process")
async def process():
    return {"status": "success"}

@app.get("/logs")
async def logs():
    return {"logs": get_last_logs(DB_PATH)}