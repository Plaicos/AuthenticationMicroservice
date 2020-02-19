module.exports = class Token {
    constructor() {
        this.jwt = require("jsonwebtoken")
        this.options = require("./options")
    }

    read(token) {
        return new Promise((resolve, reject) => {
            let { options } = this
            this.jwt.verify(token, options.secret_key, options.options, (erro, token_data) => {
                if (erro) {
                    reject(erro)
                }
                resolve(token_data)
            })
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.jwt.sign(data, this.options.secret_key, this.options.options, (erro, token) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(token)
            })
        });
    }

}