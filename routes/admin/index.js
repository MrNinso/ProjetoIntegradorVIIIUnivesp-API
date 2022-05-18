module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    router.use((req, res, next) => {
        // TODO :: validar a url de api
        console.log(req.url)
        next()
    })

    return router
}