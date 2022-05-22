module.exports = ({ createRouter, lib: { mysql, models } }) => {
    const router = createRouter()

    router.put('/', models.checkBody('equipamento'), async (req, res) => {
        req.body.tipo_equipamento = 'I'

        return mysql.safeExecProcecure('PUT_EQUIPAMENTO', req.body).then(
            r => res.status(200).json({}),
            error => res.status(500).json({ errID: 'BAC001', error })
        )
    })

    return router
}