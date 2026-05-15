from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db, log_request, get_last_logs
import os

app = FastAPI()

# Добавляем CORS middleware с расширенными настройками
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://test-as2.ams-dev.ru",
        "https://test-as2.ams-dev.ru"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Явно указываем методы
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400  # Кэширование preflight запросов на 24 часа
)

# Получаем путь к БД из переменной окружения
DB_PATH = os.getenv("DB_PATH", "/data/requests.db")

@app.on_event("startup")
def startup_event():
    """Инициализация базы данных при старте приложения"""
    init_db(DB_PATH)

# Явно обрабатываем OPTIONS запросы для всех путей
@app.options("/{path:path}")
async def options_handler(request: Request, path: str):
    response = Response()
    response.headers["Access-Control-Allow-Origin"] = "http://test-as2.ams-dev.ru"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"
    return response

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
    
    if not is_allowed and request.method != "OPTIONS":
        # Если запрос не разрешен и это не OPTIONS, возвращаем 404
        response = Response(status_code=404, content="Not Found")
        status_code = 404
    else:
        # Если запрос разрешен или это OPTIONS, передаем его дальше
        response = await call_next(request)
        status_code = response.status_code
    
    # Добавляем CORS заголовки ко всем ответам
    response.headers["Access-Control-Allow-Origin"] = "http://test-as2.ams-dev.ru"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    
    # Логируем запрос (кроме OPTIONS)
    if request.method != "OPTIONS":
        log_request(DB_PATH, request.method, request.url.path, status_code)
    
    return response

@app.post("/process")
async def process():
    return {"status": "success"}

@app.get("/logs")
async def logs():
    return {"logs": get_last_logs(DB_PATH)}