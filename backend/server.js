const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'public')
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes if needed
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

// Use default router
server.use(router);

// Get port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`JSON Server is running on http://${HOST}:${PORT}`);
    console.log('Available endpoints:');
    console.log(`  GET    http://${HOST}:${PORT}/products`);
    console.log(`  GET    http://${HOST}:${PORT}/users`);
});