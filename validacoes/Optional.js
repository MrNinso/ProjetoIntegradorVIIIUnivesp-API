global.Optional = (valor, campo) => {
    if (!valor) {
        return { continue: false }
    }

    return { continue: true }
}

module.exports = global.Optional