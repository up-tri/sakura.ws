/**
 * 桜の花びらWebSocketサーバーを実装
 * 
 * @since 2020.03.28
 * @author Kohei Seta <kohei.s@wannagrow.co.jp>
 */

/**
 * サーバーインスタンスの実装
 */
const Server = require('ws').Server;
const serverInstance = new Server({
  port: 5000
});

serverInstance.on('connection', (ws) => {
  // データ受信
  ws.on('message', (message) => {
    const json = JSON.parse(message)
    if (json.username && json.colorCode && json.size) {
      serverInstance.clients.forEach(client => {
        client.send(JSON.stringify({
          username: json.username,
          colorCode: json.colorCode,
          size: json.size,
        }))
      });
    }
  });
});