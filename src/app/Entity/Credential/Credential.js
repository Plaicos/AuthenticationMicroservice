module.exports = class Credential {
    constructor({ credential, DAO }) {
        this.user = require("./SubEntity/user")
        this.userValidator = require("./SubEntity/userValidator")
        this.Scope = require("./SubEntity/scope")
        this.level = require("./SubEntity/level")
        this.credential = credential
        this.DAO = DAO
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { credential, DAO } = this

            if (typeof credential !== "object") {
                throw Error("Credential must be an object")
            }

            try {
                let user = await this.user(credential.user, DAO)
                let scope = new this.Scope(credential.scope).build()
                let level = await this.level(credential.level, DAO)

                let newCredential = {
                    user,
                    scope,
                    level
                }
                resolve(newCredential)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { DAO, credential } = this
            let { user } = credential

            try {
                let credential = await DAO.System.get_credential(user)
                credential = await this.methods(credential)
                resolve(credential)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods(obj) {
        return new Promise(async (resolve, reject) => {
            obj.__proto__.delete = this.delete()
            resolve(obj)
        })
    }

    validate(credential, isConfig) {
        return new Promise(async (resolve, reject) => {
            let { DAO } = this

            try {
                if (isConfig && !credential.user) {

                }
                else {
                    await this.userValidator(credential.user, DAO)
                }
                new this.Scope(credential.scope).validate()
                await this.level(credential.level, DAO)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    delete() {
        let { DAO, credential } = this
        let { user } = credential
        return function (credential) {
            return new Promise(async (resolve, reject) => {
                try {
                    await DAO.System.deleteCredential(user)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }
}