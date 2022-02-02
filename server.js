const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: "Minha primeira aplicação com Node.js"
    }));
}).listen(4001, () => console.log('Servidor rodando na porta 4001'))