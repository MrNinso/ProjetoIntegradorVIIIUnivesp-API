module.exports = ({ createRouter, lib: { mysql, models } }) => {
    const router = createRouter()

    router.put('/', models.checkBody('sensor'), (req, res) => {
        
    })

    return router
}