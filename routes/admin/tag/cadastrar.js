module.exports = ({ createRouter, lib: { mysql, models } }) => {
    const router = createRouter()

    router.put('/', models.checkBody('tag'), (req, res) => {
        
    })

    return router
}