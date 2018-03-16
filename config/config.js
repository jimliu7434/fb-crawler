module.exports = {
    fb: {
        options: {
            version: 'v2.12',
            accessToken: '',
        },
    },
    website: {
        port: 80,
    },
    mysql: {
        host: '127.0.0.1',
        user: 'root',       // 為了快速建置SQL環境，就不再多開帳號
        password: '123456', 
        options: {
            port: 3306,
            database: 'Friendship',
        },
        
    },
}