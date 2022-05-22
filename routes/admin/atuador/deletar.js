module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    router.delete('/:id', async (req, res) => {
        return mysql.safeExecProcecure('DELETE_EQUIPAMENTO', req.params).then(
            r => res.status(200).json({}),
            error => res.status(500).json({ errID: 'BAD001', error })
        )
    })

    return rotuer
}