module.exports = {
    app: 'My App',
    port: 3000,
    env: 'dev',
    name: '',
    master: false,
    database: {
        mongodb: {
            host: 'localhost',
            database: 'myapp',
            user: 'root',
            pass: 'secret'
        }
    },
    users: [{
        name: 'john',
        email: 'john@example.com'
    }, {
        name: 'jane',
        email: 'jane@example.com'
    }]
};