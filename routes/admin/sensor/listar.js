module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    router.get('/:id?', async (req, res) => {
        let where = ""
        const params = []

        if (req.params.id) {
            where = `id = ? AND`
            params.push({ value: req.params.id })
        }

        where += "tipo_equipamento = 'O'"

        return mysql.selectAllWhere('Equipamentos', where, params).then(
            r => res.status(200).json(r),
            error => res.status(500).json({ errID: "BAL001", error })
        )
    })

    return rotuer
}