document.addEventListener('DOMContentLoaded', function() {
    // Инициализация табов
    function initTabs() {
        // Табы тест-кейсов
        document.querySelectorAll('.tab-navigation .tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Скрываем все содержимое
                document.querySelectorAll('.test-cases .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Убираем активный класс со всех табов
                document.querySelectorAll('.tab-navigation .tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Добавляем активный класс текущему табу
                this.classList.add('active');
                
                // Показываем соответствующее содержимое
                const tabName = this.getAttribute('data-tab');
                document.getElementById(`tab-${tabName}`).classList.add('active');
            });
        });
        
        // Табы консоли запросов
        document.querySelectorAll('.tab-navigation .tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Скрываем все содержимое
                document.querySelectorAll('.main-content .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Убираем активный класс со всех табов
                document.querySelectorAll('.tab-navigation .tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Добавляем активный класс текущему табу
                this.classList.add('active');
                
                // Показываем соответствующее содержимое
                const tabName = this.getAttribute('data-tab');
                document.getElementById(`tab-${tabName}`).classList.add('active');
            });
        });
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Обработчики кнопок
        document.getElementById('sendRequestBtn').addEventListener('click', sendCurrentRequest);
        document.getElementById('refreshLogsBtn').addEventListener('click', loadLogs);
        document.getElementById('clearLogsBtn').addEventListener('click', clearLogs);
        document.getElementById('applyBuilder').addEventListener('click', applyBuilderChanges);
        
        // Обработчики тест-кейсов
        document.querySelectorAll('.test-case').forEach(item => {
            item.addEventListener('click', function() {
                const testCase = this.getAttribute('data-case');
                loadTestCase(testCase);
                
                // Удаляем активный класс со всех тест-кейсов
                document.querySelectorAll('.test-case').forEach(tc => {
                    tc.classList.remove('active');
                });
                
                // Добавляем активный класс текущему тест-кейсу
                this.classList.add('active');
                
                // Показываем детали тест-кейса
                showTestCaseDetails(testCase);
            });
        });
    }
    
    // Основные функции
    function checkApiStatus() {
        const statusElement = document.getElementById('serviceStatus');
        statusElement.innerHTML = '<div class="spinner" style="margin-right: 10px;"></div><span>Проверка статуса...</span>';
        
        fetch('http://test-as1.ams-dev.ru/logs')
            .then(response => {
                const apiStatus = document.querySelector('.api-status');
                if (response.ok) {
                    statusElement.innerHTML = '<span style="color: var(--success);">API работает нормально</span>';
                    apiStatus.className = 'api-status status-ok';
                    apiStatus.textContent = 'API доступен';
                } else {
                    statusElement.innerHTML = '<span style="color: var(--warning);">API отвечает, но с ошибкой</span>';
                    apiStatus.className = 'api-status status-warning';
                    apiStatus.textContent = 'API с проблемами';
                }
            })
            .catch(error => {
                const apiStatus = document.querySelector('.api-status');
                statusElement.innerHTML = '<span style="color: var(--danger);">API недоступен</span>';
                apiStatus.className = 'api-status status-error';
                apiStatus.textContent = 'API недоступен';
            });
    }
    
    function loadLogs() {
        const logsContainer = document.getElementById('logsContainer');
        const logsLoading = document.getElementById('logsLoading');
        const noLogs = document.getElementById('noLogs');
        
        logsContainer.style.display = 'none';
        logsLoading.style.display = 'block';
        noLogs.style.display = 'none';
        
        fetch('http://test-as1.ams-dev.ru/logs')
            .then(response => response.json())
            .then(data => {
                logsLoading.style.display = 'none';
                
                if (!data.logs || data.logs.length === 0) {
                    noLogs.style.display = 'block';
                    return;
                }
                
                let logsHTML = '';
                data.logs.forEach(log => {
                    const date = new Date(log.timestamp);
                    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    
                    let statusClass = 'status-200';
                    if (log.status_code === 404) statusClass = 'status-404';
                    else if (log.status_code >= 400) statusClass = 'status-other';
                    
                    let methodClass = 'method-GET';
                    if (log.method === 'POST') methodClass = 'method-POST';
                    
                    logsHTML += `
                        <div class="log-entry" data-timestamp="${log.timestamp}">
                            <div class="log-header">
                                <span class="${methodClass}">${log.method}</span>
                                <span class="log-timestamp">${formattedDate}</span>
                            </div>
                            <div class="log-path">${log.path}</div>
                            <span class="log-status ${statusClass}">${log.status_code}</span>
                        </div>
                    `;
                });
                
                logsContainer.innerHTML = logsHTML;
                logsContainer.style.display = 'block';
            })
            .catch(error => {
                logsLoading.style.display = 'none';
                noLogs.style.display = 'block';
                noLogs.innerHTML = `<p>Ошибка загрузки логов: ${error.message}</p>`;
            });
    }
    
    function clearLogs() {
        // В нашем случае мы не можем очистить логи через API
        alert('Очистка логов не поддерживается через API. Для очистки пересоздайте контейнер.');
    }
    
    function sendCurrentRequest() {
        // Определяем активную вкладку
        const activeTab = document.querySelector('.tab-navigation .tab.active');
        const tabName = activeTab.getAttribute('data-tab');
        
        switch(tabName) {
            case 'core':
                sendProcessRequest();
                break;
            case '404':
                send404Request();
                break;
            case 'custom':
                sendCustomRequest();
                break;
        }
    }
    
    function sendProcessRequest() {
        const btn = document.getElementById('sendRequestBtn');
        const originalText = btn.innerHTML;
        const spinner = `<div class="spinner" style="margin-right: 8px; width: 18px; height: 18px;"></div>`;
        btn.innerHTML = spinner + 'Отправка...';
        btn.disabled = true;
        
        // Получаем данные
        let jsonData;
        try {
            jsonData = JSON.parse(document.getElementById('processData').value);
        } catch (e) {
            alert('Невалидный JSON в поле данных');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }
        
        // Отправляем запрос
        fetch('http://test-as1.ams-dev.ru/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            // Показываем ответ
            const responseContent = document.getElementById('processResponseContent');
            response.text().then(text => {
                try {
                    responseContent.textContent = JSON.stringify(JSON.parse(text), null, 2);
                } catch (e) {
                    responseContent.textContent = text;
                }
                document.getElementById('processResponse').style.display = 'block';
            });
            
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Обновляем логи
            setTimeout(loadLogs, 500);
        })
        .catch(error => {
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            const responseContent = document.getElementById('processResponseContent');
            responseContent.textContent = 'Не удалось отправить запрос: ' + error.message;
            document.getElementById('processResponse').style.display = 'block';
        });
    }
    
    function send404Request() {
        const btn = document.getElementById('sendRequestBtn');
        const originalText = btn.innerHTML;
        const spinner = `<div class="spinner" style="margin-right: 8px; width: 18px; height: 18px;"></div>`;
        btn.innerHTML = spinner + 'Отправка...';
        btn.disabled = true;
        
        // Получаем данные
        const path = document.getElementById('invalidPath').value;
        const method = document.getElementById('invalidMethod').value;
        
        // Отправляем запрос
        fetch(`http://test-as1.ams-dev.ru${path}`, {
            method: method
        })
        .then(response => {
            // Показываем ответ
            const responseContent = document.getElementById('404ResponseContent');
            response.text().then(text => {
                try {
                    responseContent.textContent = JSON.stringify(JSON.parse(text), null, 2);
                } catch (e) {
                    responseContent.textContent = text;
                }
                document.getElementById('404Response').style.display = 'block';
            });
            
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Обновляем логи
            setTimeout(loadLogs, 500);
        })
        .catch(error => {
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            const responseContent = document.getElementById('404ResponseContent');
            responseContent.textContent = 'Не удалось отправить запрос: ' + error.message;
            document.getElementById('404Response').style.display = 'block';
        });
    }
    
    function sendCustomRequest() {
        const btn = document.getElementById('sendRequestBtn');
        const originalText = btn.innerHTML;
        const spinner = `<div class="spinner" style="margin-right: 8px; width: 18px; height: 18px;"></div>`;
        btn.innerHTML = spinner + 'Отправка...';
        btn.disabled = true;
        
        // Получаем данные
        const url = document.getElementById('customUrl').value;
        const method = document.getElementById('customMethod').value;
        
        let headers = {};
        try {
            headers = JSON.parse(document.getElementById('customHeaders').value);
        } catch (e) {
            alert('Невалидный JSON в заголовках');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }
        
        let body = null;
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            try {
                body = JSON.parse(document.getElementById('customBody').value);
            } catch (e) {
                alert('Невалидный JSON в теле запроса');
                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }
        }
        
        // Отправляем запрос
        fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        })
        .then(response => {
            // Показываем ответ
            const responseContent = document.getElementById('customResponseContent');
            response.text().then(text => {
                try {
                    responseContent.textContent = JSON.stringify(JSON.parse(text), null, 2);
                } catch (e) {
                    responseContent.textContent = text;
                }
                document.getElementById('customResponse').style.display = 'block';
            });
            
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Обновляем логи
            setTimeout(loadLogs, 500);
        })
        .catch(error => {
            // Скрываем лоадер
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            const responseContent = document.getElementById('customResponseContent');
            responseContent.textContent = 'Не удалось отправить запрос: ' + error.message;
            document.getElementById('customResponse').style.display = 'block';
        });
    }
    
    function loadTestCase(testCase) {
        switch(testCase) {
            case 'valid-basic':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "basic_data"
                }, null, 2);
                break;
                
            case 'valid-full':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "full_data",
                    timestamp: new Date().toISOString(),
                    metadata: {
                        source: "tester",
                        version: "2.1"
                    },
                    payload: {
                        items: [
                            {id: 1, value: "A"},
                            {id: 2, value: "B"},
                            {id: 3, value: "C"}
                        ]
                    }
                }, null, 2);
                break;
                
            case '404-get':
                activateTab('404');
                document.getElementById('invalidPath').value = '/process';
                document.getElementById('invalidMethod').value = 'GET';
                break;
                
            case '404-post-logs':
                activateTab('404');
                document.getElementById('invalidPath').value = '/logs';
                document.getElementById('invalidMethod').value = 'POST';
                break;
                
            case '404-invalid':
                activateTab('404');
                document.getElementById('invalidPath').value = '/non-existent-endpoint';
                document.getElementById('invalidMethod').value = 'GET';
                break;
                
            case 'empty-json':
                activateTab('process');
                document.getElementById('processData').value = '{}';
                break;
                
            case 'invalid-json':
                activateTab('process');
                document.getElementById('processData').value = '{ "invalid": json without quotes }';
                break;
                
            case 'large-payload':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "large_payload",
                    timestamp: new Date().toISOString(),
                    data: "A".repeat(1024 * 1024) // ~1MB
                }, null, 2);
                break;
                
            case 'special-chars':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "special_chars",
                    unicode: "Привет, 世界! 😃🚀",
                    special_chars: "!@#$%^&*()_+-=[]{}|;':\",./<>?"
                }, null, 2);
                break;
                
            case 'xss-attempt':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "xss_attempt",
                    payload: "<script>alert('XSS')</script>"
                }, null, 2);
                break;
                
            case 'sql-injection':
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "sql_injection",
                    payload: "'; DROP TABLE users; --"
                }, null, 2);
                break;
                
            case 'headers-test':
                activateTab('custom');
                document.getElementById('customUrl').value = 'http://test-as1.ams-dev.ru/process';
                document.getElementById('customMethod').value = 'POST';
                document.getElementById('customHeaders').value = JSON.stringify({
                    "Content-Type": "application/json",
                    "X-Test-Header": "test-value",
                    "Authorization": "Bearer test-token"
                }, null, 2);
                document.getElementById('customBody').value = JSON.stringify({
                    test: "headers_test"
                }, null, 2);
                break;
                
            case 'rate-limit':
                // Отправляем 10 запросов подряд
                activateTab('process');
                document.getElementById('processData').value = JSON.stringify({
                    test: "rate_limit_test",
                    sequence: 1
                }, null, 2);
                
                alert('Запуск теста ограничения запросов (10 запросов)');
                
                let count = 0;
                const total = 10;
                
                function sendNextRequest() {
                    if (count >= total) {
                        alert(`Тест ограничения запросов завершен. ${total} запросов отправлено.`);
                        loadLogs();
                        return;
                    }
                    
                    count++;
                    document.getElementById('processData').value = JSON.stringify({
                        test: "rate_limit_test",
                        sequence: count
                    }, null, 2);
                    
                    sendProcessRequest();
                    
                    // Отправляем следующий запрос через 100ms
                    setTimeout(sendNextRequest, 100);
                }
                
                // Начинаем с первого запроса
                setTimeout(sendNextRequest, 100);
                return;
        }
    }
    
    function activateTab(tabName) {
        // Деактивируем все табы консоли запросов
        document.querySelectorAll('.tab-navigation .tab').forEach(t => {
            t.classList.remove('active');
        });
        
        // Активируем нужный таб
        document.querySelector(`.tab-navigation .tab[data-tab="${tabName}"]`).classList.add('active');
        
        // Скрываем все содержимое
        document.querySelectorAll('.main-content .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Показываем нужное содержимое
        document.getElementById(`tab-${tabName}`).classList.add('active');
    }
    
    function showTestCaseDetails(testCase) {
        const details = document.getElementById('case-details');
        const description = document.getElementById('case-description');
        const method = document.getElementById('case-method');
        const path = document.getElementById('case-path');
        const body = document.getElementById('case-body');
        
        // Заполняем детали в зависимости от тест-кейса
        switch(testCase) {
            case 'valid-basic':
                description.textContent = 'Минимальный валидный запрос с базовыми данными. Проверяет корректную обработку простого JSON.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "basic_data"
}`;
                break;
                
            case 'valid-full':
                description.textContent = 'Расширенный валидный запрос с метаданными и вложенными структурами. Проверяет обработку сложных данных.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "full_data",
  "timestamp": "2026-05-15T14:30:00",
  "metadata": {
    "source": "tester",
    "version": "2.1"
  },
  "payload": {
    "items": [
      {"id": 1, "value": "A"},
      {"id": 2, "value": "B"},
      {"id": 3, "value": "C"}
    ]
  }
}`;
                break;
                
            case '404-get':
                description.textContent = 'Попытка выполнить GET запрос к эндпоинту, который поддерживает только POST. Проверяет ограничение HTTP методов.';
                method.textContent = 'GET';
                path.textContent = '/process';
                body.textContent = '// Тело не требуется для GET запроса';
                break;
                
            case '404-post-logs':
                description.textContent = 'Попытка выполнить POST запрос к эндпоинту, который поддерживает только GET. Проверяет ограничение HTTP методов.';
                method.textContent = 'POST';
                path.textContent = '/logs';
                body.textContent = `{
  "any": "data"
}`;
                break;
                
            case '404-invalid':
                description.textContent = 'Запрос к несуществующему эндпоинту. Проверяет обработку неизвестных путей.';
                method.textContent = 'GET';
                path.textContent = '/non-existent-endpoint';
                body.textContent = '// Тело не требуется для GET запроса';
                break;
                
            case 'empty-json':
                description.textContent = 'Запрос с пустым JSON объектом. Проверяет обработку минимально допустимых данных.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{}`;
                break;
                
            case 'invalid-json':
                description.textContent = 'Запрос с синтаксически невалидным JSON. Проверяет обработку ошибок парсинга.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{ "invalid": json without quotes }`;
                break;
                
            case 'large-payload':
                description.textContent = 'Запрос с большим объемом данных (~1MB). Проверяет обработку больших payload.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "large_payload",
  "timestamp": "2026-05-15T14:30:00",
  "data": "A".repeat(1024 * 1024) // ~1MB
}`;
                break;
                
            case 'special-chars':
                description.textContent = 'Запрос со специальными символами и Unicode. Проверяет обработку нестандартных символов.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "special_chars",
  "unicode": "Привет, 世界! 😃🚀",
  "special_chars": "!@#$%^&*()_+-=[]{}|;':\\",./<>?"
}`;
                break;
                
            case 'xss-attempt':
                description.textContent = 'Попытка XSS атаки. Проверяет обработку потенциально опасных данных.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "xss_attempt",
  "payload": "<script>alert('XSS')</script>"
}`;
                break;
                
            case 'sql-injection':
                description.textContent = 'Попытка SQL-инъекции. Проверяет обработку потенциально опасных данных.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "sql_injection",
  "payload": "'; DROP TABLE users; --"
}`;
                break;
                
            case 'headers-test':
                description.textContent = 'Запрос с дополнительными заголовками. Проверяет обработку кастомных заголовков.';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "headers_test"
}`;
                break;
                
            case 'rate-limit':
                description.textContent = 'Серия из 10 запросов подряд. Проверяет защиту от частых запросов (хотя в текущей реализации ограничения нет).';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{
  "test": "rate_limit_test",
  "sequence": 1
}`;
                break;
                
            default:
                description.textContent = 'Выберите тест-кейс для просмотра деталей';
                method.textContent = 'POST';
                path.textContent = '/process';
                body.textContent = `{"key": "value"}`;
        }
        
        // Обновляем значения в builder
        document.getElementById('builder-method').value = method.textContent;
        document.getElementById('builder-path').value = path.textContent;
        document.getElementById('builder-body').value = body.textContent;
        
        // Показываем детали
        details.classList.remove('hidden');
    }
    
    function applyBuilderChanges() {
        const method = document.getElementById('builder-method').value;
        const path = document.getElementById('builder-path').value;
        const body = document.getElementById('builder-body').value;
        
        // Определяем, какую вкладку активировать
        if (path === '/process' && method === 'POST') {
            activateTab('process');
            document.getElementById('processData').value = body;
        } else if (path === '/logs' && method === 'GET') {
            activateTab('custom');
            document.getElementById('customUrl').value = `http://test-as1.ams-dev.ru${path}`;
            document.getElementById('customMethod').value = method;
            document.getElementById('customBody').value = body;
        } else {
            activateTab('404');
            document.getElementById('invalidPath').value = path;
            document.getElementById('invalidMethod').value = method;
        }
        
        alert('Изменения применены к консоли запросов');
    }
    
    // Инициализация приложения
    initTabs();
    setupEventListeners();
    checkApiStatus();
    loadLogs();
});