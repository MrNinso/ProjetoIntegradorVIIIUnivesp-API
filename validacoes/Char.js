global.Char = (size) => (valor, campo) => {
    if (valor.length === size) {
        return { 
            errorId: "BCVCHAR001",
            descricao: `O campo ${campo} tem q ter ${size} caracteres` 
        }
    }

    return { continue: true }
}

module.exports = global.Char