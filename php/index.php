<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Tester Pro - Расширенное тестирование</title>
    <link rel="stylesheet" href="php/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>
                <i class="fas fa-microchip"></i> API Tester Pro
                <span class="api-status status-ok">API доступен</span>
            </h1>
            <p class="subtitle">
                <span>Интерфейс для комплексного тестирования сервиса на <strong>test-as1.ams-dev.ru</strong></span>
                <span class="endpoint-tag">POST /process</span>
                <span class="endpoint-tag">GET /logs</span>
            </p>
        </header>
        
        <div class="grid">
            <div class="test-cases-sidebar">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <span class="card-icon"><i class="fas fa-list"></i></span>
                            Готовые тест-кейсы
                        </h2>
                        <span class="badge">12 сценариев</span>
                    </div>
                    
                    <div class="tab-navigation">
                        <div class="tab active" data-tab="core">Основные</div>
                        <div class="tab" data-tab="edge">Пограничные</div>
                        <div class="tab" data-tab="security">Безопасность</div>
                    </div>
                    
                    <div class="test-cases">
                        <!-- Основные тест-кейсы -->
                        <div class="tab-content active" id="tab-core">
                            <div class="test-case valid" data-case="valid-basic" data-tab="core">
                                <h4><i class="fas fa-check-circle"></i> Базовый валидный запрос</h4>
                                <p>Тест с минимальным набором корректных данных</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-core">Основной</span>
                            </div>
                            
                            <div class="test-case valid" data-case="valid-full" data-tab="core">
                                <h4><i class="fas fa-check-circle"></i> Полный валидный запрос</h4>
                                <p>Тест с расширенным набором данных и метаданными</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-core">Основной</span>
                            </div>
                            
                            <div class="test-case warning" data-case="404-get" data-tab="core">
                                <h4><i class="fas fa-exclamation-triangle"></i> GET к /process</h4>
                                <p>Проверка ограничения методов для /process</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-404">404 Not Found</span>
                                </div>
                                <span class="case-category category-core">Основной</span>
                            </div>
                            
                            <div class="test-case warning" data-case="404-post-logs" data-tab="core">
                                <h4><i class="fas fa-exclamation-triangle"></i> POST к /logs</h4>
                                <p>Проверка ограничения методов для /logs</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-404">404 Not Found</span>
                                </div>
                                <span class="case-category category-core">Основной</span>
                            </div>
                            
                            <div class="test-case warning" data-case="404-invalid" data-tab="core">
                                <h4><i class="fas fa-exclamation-triangle"></i> Запрос к несуществующему пути</h4>
                                <p>Проверка обработки произвольных путей</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-404">404 Not Found</span>
                                </div>
                                <span class="case-category category-core">Основной</span>
                            </div>
                        </div>
                        
                        <!-- Пограничные тест-кейсы -->
                        <div class="tab-content" id="tab-edge">
                            <div class="test-case valid" data-case="empty-json" data-tab="edge">
                                <h4><i class="fas fa-check-circle"></i> Пустой JSON объект</h4>
                                <p>Тест с пустым JSON телом {}</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-edge">Пограничный</span>
                            </div>
                            
                            <div class="test-case danger" data-case="invalid-json" data-tab="edge">
                                <h4><i class="fas fa-times-circle"></i> Невалидный JSON</h4>
                                <p>Тест с синтаксически некорректным JSON</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-422">422 Unprocessable Entity</span>
                                </div>
                                <span class="case-category category-edge">Пограничный</span>
                            </div>
                            
                            <div class="test-case warning" data-case="large-payload" data-tab="edge">
                                <h4><i class="fas fa-exclamation-triangle"></i> Большой объем данных</h4>
                                <p>Тест с большими данными (1MB+)</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-edge">Пограничный</span>
                            </div>
                            
                            <div class="test-case warning" data-case="special-chars" data-tab="edge">
                                <h4><i class="fas fa-exclamation-triangle"></i> Специальные символы</h4>
                                <p>Тест с Unicode и специальными символами</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-edge">Пограничный</span>
                            </div>
                        </div>
                        
                        <!-- Тест-кейсы безопасности -->
                        <div class="tab-content" id="tab-security">
                            <div class="test-case warning" data-case="xss-attempt" data-tab="security">
                                <h4><i class="fas fa-exclamation-triangle"></i> Попытка XSS</h4>
                                <p>Тест на уязвимость к XSS атакам</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-security">Безопасность</span>
                            </div>
                            
                            <div class="test-case warning" data-case="sql-injection" data-tab="security">
                                <h4><i class="fas fa-exclamation-triangle"></i> Попытка SQL-инъекции</h4>
                                <p>Тест на уязвимость к SQL-инъекциям</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-security">Безопасность</span>
                            </div>
                            
                            <div class="test-case warning" data-case="headers-test" data-tab="security">
                                <h4><i class="fas fa-exclamation-triangle"></i> Проверка заголовков</h4>
                                <p>Тест обработки дополнительных заголовков</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-security">Безопасность</span>
                            </div>
                            
                            <div class="test-case warning" data-case="rate-limit" data-tab="security">
                                <h4><i class="fas fa-exclamation-triangle"></i> Проверка ограничения запросов</h4>
                                <p>Тест на защиту от DDoS (10 запросов подряд)</p>
                                <div class="expected">
                                    <i class="fas fa-arrow-right"></i> 
                                    <span class="expected-status status-200">200 OK</span>
                                </div>
                                <span class="case-category category-security">Безопасность</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="test-case-details hidden" id="case-details">
                        <h5><i class="fas fa-info-circle"></i> Детали тест-кейса</h5>
                        <div id="case-description">Выберите тест-кейс для просмотра деталей</div>
                        
                        <h5 style="margin-top: 15px;"><i class="fas fa-cogs"></i> Параметры запроса</h5>
                        <div id="case-request">
                            <p>Метод: <span id="case-method">POST</span></p>
                            <p>Путь: <span id="case-path">/process</span></p>
                            <p>Тело запроса:</p>
                            <pre id="case-body">{"key": "value"}</pre>
                        </div>
                        
                        <div class="request-builder">
                            <h4><i class="fas fa-sliders-h"></i> Настройка запроса</h4>
                            <div class="builder-row">
                                <div>
                                    <label>HTTP Метод</label>
                                    <select id="builder-method">
                                        <option value="POST">POST</option>
                                        <option value="GET">GET</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Путь</label>
                                    <input type="text" id="builder-path" value="/process">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Тело запроса</label>
                                <textarea id="builder-body">{"test": "data"}</textarea>
                            </div>
                            <button id="apply-builder" class="btn btn-info btn-block">
                                <i class="fas fa-check"></i> Применить изменения
                            </button>
                        </div>
                    </div>
                    
                    <div class="metrics-panel">
                        <div class="metric-card">
                            <div><i class="fas fa-microchip"></i></div>
                            <div class="metric-value" id="total-requests">0</div>
                            <div class="metric-label">Всего запросов</div>
                        </div>
                        <div class="metric-card">
                            <div><i class="fas fa-check"></i></div>
                            <div class="metric-value" id="success-rate">100%</div>
                            <div class="metric-label">Успешных</div>
                        </div>
                        <div class="metric-card">
                            <div><i class="fas fa-bug"></i></div>
                            <div class="metric-value" id="error-rate">0%</div>
                            <div class="metric-label">Ошибок</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="main-content">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <span class="card-icon"><i class="fas fa-bolt"></i></span>
                            Консоль запросов
                        </h2>
                        <button id="sendRequestBtn" class="btn btn-success">
                            <i class="fas fa-paper-plane"></i> Отправить
                        </button>
                    </div>
                    
                    <div class="tab-navigation">
                        <div class="tab active" data-tab="process">/process</div>
                        <div class="tab" data-tab="404">404 Тестирование</div>
                        <div class="tab" data-tab="custom">Произвольный запрос</div>
                    </div>
                    
                    <!-- Вкладка /process -->
                    <div class="tab-content active" id="tab-process">
                        <div class="form-group">
                            <label>
                                Тело запроса (JSON)
                                <span class="label-help" title="Введите данные в формате JSON"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <textarea id="processData" placeholder='{"key": "value"}'>{"test": "data", "timestamp": "2026-05-15T14:30:00"}</textarea>
                        </div>
                        
                        <div class="response-section" id="processResponse" style="display: none;">
                            <div class="response-header">
                                <h3><i class="fas fa-server"></i> Ответ сервера</h3>
                                <span class="response-status status-200" id="processResponseStatus">200 OK</span>
                            </div>
                            <div class="json-preview" id="processResponseContent"></div>
                        </div>
                    </div>
                    
                    <!-- Вкладка 404 Тестирование -->
                    <div class="tab-content" id="tab-404">
                        <div class="form-group">
                            <label>
                                Путь для тестирования
                                <span class="label-help" title="Введите путь, который не существует в API"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <input type="text" id="invalidPath" value="/invalid-path" placeholder="Введите путь">
                        </div>
                        
                        <div class="form-group">
                            <label>
                                HTTP метод
                                <span class="label-help" title="Выберите метод, который не поддерживается для этого пути"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <select id="invalidMethod">
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>
                                <option value="OPTIONS">OPTIONS</option>
                            </select>
                        </div>
                        
                        <div class="response-section" id="404Response" style="display: none;">
                            <div class="response-header">
                                <h3><i class="fas fa-server"></i> Ответ сервера</h3>
                                <span class="response-status status-404" id="404ResponseStatus">404 Not Found</span>
                            </div>
                            <div class="json-preview" id="404ResponseContent"></div>
                        </div>
                    </div>
                    
                    <!-- Вкладка Произвольный запрос -->
                    <div class="tab-content" id="tab-custom">
                        <div class="form-group">
                            <label>
                                URL
                                <span class="label-help" title="Полный URL, включая домен"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <input type="text" id="customUrl" value="http://test-as1.ams-dev.ru/process" placeholder="Введите полный URL">
                        </div>
                        
                        <div class="form-group">
                            <label>
                                HTTP метод
                                <span class="label-help" title="Выберите HTTP метод"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <select id="customMethod">
                                <option value="GET">GET</option>
                                <option value="POST" selected>POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>
                                <option value="OPTIONS">OPTIONS</option>
                                <option value="HEAD">HEAD</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>
                                Заголовки
                                <span class="label-help" title="Дополнительные заголовки в формате JSON"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <textarea id="customHeaders" placeholder='{
    "Content-Type": "application/json"
}'>{
    "Content-Type": "application/json"
}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>
                                Тело запроса
                                <span class="label-help" title="Тело запроса в формате JSON"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <textarea id="customBody" placeholder='{"key": "value"}'></textarea>
                        </div>
                        
                        <div class="response-section" id="customResponse" style="display: none;">
                            <div class="response-header">
                                <h3><i class="fas fa-server"></i> Ответ сервера</h3>
                                <span class="response-status status-200" id="customResponseStatus">200 OK</span>
                            </div>
                            <div class="json-preview" id="customResponseContent"></div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <span class="card-icon"><i class="fas fa-history"></i></span>
                            Последние запросы
                        </h2>
                        <div>
                            <button id="refreshLogsBtn" class="btn" style="margin-right: 10px;">
                                <i class="fas fa-sync-alt"></i> Обновить
                            </button>
                            <button id="clearLogsBtn" class="btn btn-danger">
                                <i class="fas fa-trash-alt"></i> Очистить
                            </button>
                        </div>
                    </div>
                    
                    <div id="logsLoading" class="loading">
                        <div class="spinner"></div>
                        <p>Загрузка логов...</p>
                    </div>
                    
                    <div id="logsContainer">
                        <!-- Логи будут загружены здесь -->
                    </div>
                    
                    <div id="noLogs" class="hidden" style="text-align: center; padding: 20px; color: var(--gray);">
                        <i class="fas fa-inbox" style="font-size: 2em; margin-bottom: 15px; opacity: 0.5;"></i>
                        <p>Нет записей в логах. Отправьте первый запрос!</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <span class="card-icon"><i class="fas fa-shield-alt"></i></span>
                            Информация о сервисе
                        </h2>
                    </div>
                    
                    <div class="form-group">
                        <label>API Endpoint</label>
                        <input type="text" value="http://test-as1.ams-dev.ru" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Доступные эндпоинты</label>
                        <div>
                            <div style="display: flex; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
                                <span style="width: 70px; background: rgba(46, 204, 113, 0.1); color: var(--success); border-radius: 3px; padding: 4px 8px; margin-right: 12px; text-align: center;">GET</span>
                                <span style="flex: 1;">/logs</span>
                                <span style="background: rgba(46, 204, 113, 0.1); color: var(--success); border-radius: 3px; padding: 3px 10px; font-size: 0.9em;">Возвращает последние 5 запросов</span>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <span style="width: 70px; background: rgba(52, 152, 219, 0.1); color: var(--primary); border-radius: 3px; padding: 4px 8px; margin-right: 12px; text-align: center;">POST</span>
                                <span style="flex: 1;">/process</span>
                                <span style="background: rgba(52, 152, 219, 0.1); color: var(--primary); border-radius: 3px; padding: 3px 10px; font-size: 0.9em;">Обрабатывает входящие данные</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Статус сервиса</label>
                        <div id="serviceStatus" style="display: flex; align-items: center; padding: 10px 0;">
                            <div class="spinner" style="margin-right: 10px;"></div>
                            <span>Проверка статуса...</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Статистика</label>
                        <div class="metrics-panel">
                            <div class="metric-card">
                                <div><i class="fas fa-clock"></i></div>
                                <div class="metric-value" id="avg-response">0 ms</div>
                                <div class="metric-label">Среднее время ответа</div>
                            </div>
                            <div class="metric-card">
                                <div><i class="fas fa-database"></i></div>
                                <div class="metric-value" id="log-count">0</div>
                                <div class="metric-label">Записей в логах</div>
                            </div>
                            <div class="metric-card">
                                <div><i class="fas fa-history"></i></div>
                                <div class="metric-value" id="last-request">-</div>
                                <div class="metric-label">Последний запрос</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <footer>
            <p>API Tester Pro &copy; 2026 | Тестирование сервиса на test-as1.ams-dev.ru | Версия 2.1</p>
        </footer>
    </div>
    
    <div class="notification" id="notification">
        <i class="fas fa-bell"></i> <span id="notification-message">Уведомление</span>
    </div>

    <script src="php/js/script.js"></script>
</body>
</html>