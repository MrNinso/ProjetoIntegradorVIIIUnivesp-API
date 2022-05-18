module.exports = new Promise(async (resolve, reject) => {
    const requireFolder = require('../requireFolder')()
    
    const importsRequirePromises = [
        requireFolder.requireAsync('./validacoes'),
        requireFolder.requireAsync('./configs'),
        requireFolder.requireAsync('./libs'),
    ]

    const imports = await Promise.all(importsRequirePromises).then(
        (result) => {
            const imp = {}
            
            imp.createRouter = require('express').Router

            imp.validacao = new Object(null)
            for (const validacao of result[0]) {
                imp.validacao[validacao.name] = validacao.exported
            }

            imp.config = new Object(null)
            for (const config of result[1]) {
                imp.config[config.name] = config.exported
            }

            imp.lib = new Object(null)
            for (const lib of result[2]) {
                imp.lib[lib.name] = lib.exported(imp)
            }

            return imp
        }
    )

    const routes = requireFolder.listFolders(__dirname)

    if (routes.error !== undefined) {
        return reject(routes.error)
    }

    return Promise.all(routes.map(r => requireFolder.requireAsync(`./routes/${r}`))).then(async (result) => {
        const router = imports.createRouter()

        result.forEach(r => {
            r.forEach(route => {
                router.use(
                    route.file.slice(0, -3).replace('./routes', '').replace('/index', ''),
                    route.exported(imports)
                )
            })
        })

        return resolve(router)
    }).catch(reject)
})