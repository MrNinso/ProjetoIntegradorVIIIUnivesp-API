module.exports = () => {
    const lib = {
        glob: require('glob'),
        path: require('node:path'),
        fs: require('node:fs'),
    }

    lib.requireAsync = async (requirePath) => new Promise(async (resolve, reject) => {
        const promises = []
    
        lib.glob.sync(`${requirePath}/**/*.js`).forEach(file => {
            promises.push(
                (async () => {
                    return {
                        file,
                        name: lib.path.basename(file).replace('.js', ''),
                        exported: require(lib.path.resolve(file))
                    }
                })()
            )
        })

        return Promise.all(promises).then(resolve, reject)
    })

    lib.listFolders = (path) => {
        try {
            return lib.fs.readdirSync(path, { withFileTypes: true })
                .filter(f => f.isDirectory())
                .map(f => f.name)
        } catch (err) {
            return { error: err }
        }
    }

    return lib
}