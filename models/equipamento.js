module.exports = {
    nome: [ Required, VarChar(255) ],
    ip: [ Required, Char(15) ],
    protocolo: [ Required, VarChar(255) ],
    logica_valores: [ Required, VarChar(255) ],
    token: [ Required, Char(100) ],
}