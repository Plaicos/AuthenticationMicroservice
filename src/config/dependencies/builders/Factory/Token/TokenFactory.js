module.exports = class TokenFactory {
    constructor() {
        this.Token = require("./Token")
    }

    makeToken(user) {
        return new Promise(async (resolve, reject) => {
            let { Token } = this

            try {
                let token_data = {
                    user: user,
                    date: Date.now()
                }
                let token = await new Token().create(token_data)
                
                resolve(token)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}