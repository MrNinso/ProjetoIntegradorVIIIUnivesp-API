module.exports = ({}) => {
    const lib = {}
 
    lib._validarCampo = async (valor, campo, pipeline) => {
        for (let i = 0; i < pipeline.length; i++) {
            const r = pipeline[i](valor, campo)

            if (r.errorId !== undefined) {
                return r
            }

            if (!r.continue) {
                return {}
            }
        }

        return {}
    }

    lib._loadModel = async (model) => {
        if (process.models === undefined) {
            process.models = new Object(null)
        }

        if (process.models[model] === undefined) {
            process.models[model] = require(`../models/${model}`)
        }
    }

    lib.validar = async (model, obj) => {
        await lib._loadModel(model)

        const m = process.models[model]
        const promises = []

        for (const campo in m) {
            promises.push(lib._validarCampo(obj[campo], campo, m[campo]))
        }

        return Promise.all(promises).then(result =>
            result.filter(v => v.errorId !== undefined)
        )
    }

    lib.filtrar = async (model, obj) => {
        await lib._loadModel(model)
        
        const m = process.models[model]

        const filtrado = new Object(null)

        for (const campo in m) {
            filtrado[campo] = obj[campo] ?? null
        }

        return filtrado
    }

    lib.checkBody = (model) => async (req, res, next) => {
        if (!req.body) {
            return res.status(400).json([{
                errorId: 'BLVA001',
                message: 'body is required'
            }])
        }

        const erros = await lib.validar(model, req.body)

        if (erros.length > 0) {
            return res.status(200).json(erros)
        }

        req.body = await lib.filtrar(model, req.body)

        return next()
    }

    return lib
}