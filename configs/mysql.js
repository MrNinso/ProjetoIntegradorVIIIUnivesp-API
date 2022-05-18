module.exports = {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "123",
    port: process.env.MYSQL_PORT ?? "3306",
    database: process.env.MYSQL_DATABASE ?? "ProjetoIntegradorVIII",
}