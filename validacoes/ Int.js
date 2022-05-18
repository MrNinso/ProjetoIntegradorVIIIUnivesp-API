global.Int = (valor, campo) => {
    if (isNaN(+valor)) {
        return { 
            errorId: "BCVINT001",
            descricao: `O campo ${campo} tem que ser um número inteiro` 
        }
    }

    if (Math.round(valor) !== +valor) {
        return { 
            errorId: "BCVINT002",
            descricao: `O campo ${campo} tem q ser um número inteiro` 
        }
    }

    return { continue: true }
}

module.exports = global.Int