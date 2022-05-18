module.exports = ({ createRouter, lib: { mysql, models } }) => {
    const router = createRouter()

    router.put('/', models.checkBody('atuador'), (req, res) => {
        
    })

    return router
}