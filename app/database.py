import sqlite3
from datetime import datetime

def init_db(db_path):
    """Инициализация базы данных и создание таблицы, если она не существует"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            method TEXT NOT NULL,
            path TEXT NOT NULL,
            status_code INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def log_request(db_path, method, path, status_code):
    """Логирование запроса в базу данных"""
    timestamp = datetime.now().isoformat()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO requests (timestamp, method, path, status_code)
        VALUES (?, ?, ?, ?)
    ''', (timestamp, method, path, status_code))
    conn.commit()
    conn.close()

def get_last_logs(db_path, limit=5):
    """Получение последних записей из логов"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT timestamp, method, path, status_code 
        FROM requests 
        ORDER BY id DESC 
        LIMIT ?
    ''', (limit,))
    rows = cursor.fetchall()
    conn.close()
    
    # Преобразуем результат в список словарей
    logs = []
    for row in rows:
        logs.append({
            "timestamp": row[0],
            "method": row[1],
            "path": row[2],
            "status_code": row[3]
        })
    return logs