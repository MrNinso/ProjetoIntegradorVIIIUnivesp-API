module.exports = ({ createRouter, lib: { mysql, models } }) => {
    const router = createRouter()

    router.put('/', models.checkBody('equipamento'), (req, res) => {
        req.body.tipo_equipamento = 'O'

        return mysql.safeExecProcecure('PUT_EQUIPAMENTO', req.body).then(
            r => res.status(200).json({}),
            error => res.status(500).json({ errID: 'BSC001', error })
        )
    })

    return router
}