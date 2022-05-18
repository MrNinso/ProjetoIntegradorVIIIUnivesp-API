global.Required = (valor, campo) => {
    if (valor === undefined) {
        return { 
            errorId: "BCVREQ001",
            descricao: `O campo ${campo} é obrigatório` 
        }
    }

    return { continue: true }
}

module.exports = global.Required