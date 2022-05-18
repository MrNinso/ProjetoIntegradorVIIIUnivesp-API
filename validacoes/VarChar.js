global.VarChar = (size) => (valor, campo) => {
    if (valor.length > size) {
        return { 
            errorId: "BCVVARC001",
            descricao: `O campo ${campo} tem que menos de ${size} caracteres` 
        }
    }

    return { continue: true }
}

module.exports = global.VarChar