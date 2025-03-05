const WebSocket = require('ws');

// Создайте сервер WebSocket на порту 5001
const server = new WebSocket.Server({ host: 'localhost', port: 5001 });

// Обработчик события подключения клиента
server.on('connection', (socket) => {
    console.log('Client connected');

    // Обработка входящих сообщений от клиента
    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Эхо (возврат) сообщения обратно клиенту
        socket.send(`Server received: ${message}`);
    });

    // Обработка закрытия соединения клиентом
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

// Вывод сообщения о запуске сервера
console.log('WebSocket server is running on ws://localhost:5001');