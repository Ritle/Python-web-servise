<!DOCTYPE html>
<html>
<head>
    <title>API Tester</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; }
        .form-group { margin-bottom: 15px; }
        input[type="text"] { padding: 8px; width: 300px; }
        button { padding: 8px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        .log-entry { padding: 10px; margin: 5px 0; background: #f5f5f5; border-left: 3px solid #2196F3; }
    </style>
</head>
<body>
    <h1>API Request Tester</h1>
    
    <div class="form-group">
        <h2>Send Request to /process</h2>
        <input type="text" id="dataInput" placeholder="Enter test data">
        <button onclick="sendRequest()">Send</button>
        <div id="response"></div>
    </div>

    <div>
        <h2>Last 5 Requests</h2>
        <div id="logs"></div>
    </div>

    <script>
        async function sendRequest() {
            const data = document.getElementById('dataInput').value;
            const responseDiv = document.getElementById('response');
            
            try {
                const response = await fetch('http://test-as1.ams-dev.ru/process', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data })
                });
                
                const result = await response.json();
                responseDiv.innerHTML = `
                    <div style="padding: 10px; background: #e8f5e9; margin-top: 10px;">
                        Status: ${response.status} | Response: ${JSON.stringify(result)}
                    </div>
                `;
                loadLogs(); // Обновляем логи после отправки
            } catch (error) {
                responseDiv.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
            }
        }

        function loadLogs() {
            fetch('http://test-as1.ams-dev.ru/logs')
                .then(res => res.json())
                .then(data => {
                    const logsDiv = document.getElementById('logs');
                    logsDiv.innerHTML = data.logs.map(log => 
                        `<div class="log-entry">
                            [${new Date(log.timestamp).toLocaleString()}] 
                            <strong>${log.method}</strong> ${log.path} 
                            <span style="color: ${log.status_code === 200 ? 'green' : 'red'}">
                                (${log.status_code})
                            </span>
                        </div>`
                    ).join('');
                });
        }

        // Загружаем логи при старте
        loadLogs();
    </script>
</body>
</html>