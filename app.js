const cluster = require("node:cluster")
const main = async () => {
    if (cluster.isMaster) {
        console.log(`Iniciando Node CPU Cluster PID: ${process.pid}`)

        let totalCPUs = require("os").cpus().length

        for(let i = 0; i < totalCPUs; i++) {
            cluster.fork()
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} morreu com o codigo ${code}-${signal}`)
            console.log("Iniciando um novo worker")
            cluster.fork()
        })
    } else {
        const porta = 3050
        const express = require("express")
        const app = express()
        const router = await require("./routes/index")

        app.use(express.json())

        app.use("/api", router)

        app.listen(porta, () => {
            console.log(`Servidor rodando na porta ${porta}`)
        })
    }
}

main()
