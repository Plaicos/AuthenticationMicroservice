module.exports = class SystemUseCases {
    constructor({ dependencies }) {
        let { DAO, Presenter, Tools, Factories } = dependencies
        this.DAO = DAO
        this.Presenter = Presenter
        this.Tools = Tools
        this.Factories = Factories
        this.entities = require("../../Entity/entities")
    }

    create_credential(credential) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO } = this

            try {
                credential = new entities.Credential({ credential, DAO })
                credential = await credential.build()
                await DAO.System.register_credential(credential)
                resolve(credential)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    get_credential(user) {
        return new Promise(async (resolve, reject) => {
            let { DAO } = this

            try {
                let credential = await DAO.System.get_credential(user)
                resolve(credential)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    authenticateToken(token) {
        return new Promise(async (resolve, reject) => {
            let { Tools } = this
            let { Authenticator } = Tools

            try {
                let tokenData = await Authenticator.authenticate(token)
                let credential = await this.get_credential(tokenData.user)
                let response = {
                    authenticated: true,
                    credential: credential
                }
                resolve(response)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    generateToken(user) {
        return new Promise(async (resolve, reject) => {
            let { Factories, DAO } = this
            let TokenFactory = Factories.Token

            if (!user || typeof user !== "string") {
                return reject("User must be a valid string")
            }

            try {
                if (!await DAO.System.check_user(user)) {
                    return reject(`User '${user}' does not exist`)
                }
                let token = await TokenFactory.makeToken(user)
                resolve(token)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    checkCredentialClearance(config, credential) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO } = this

            try {
                let Credential = new entities.Credential({ DAO })
                await Credential.validate(config, true)
                await Credential.validate(credential)
                //
                let cots = config.scope.third_party
                let crts = credential.scope.third_party

                if (config.level < credential.level) {
                    return reject("Unauthorized Request")
                }
                else if (config.scope.read && !credential.scope.read) {
                    return reject("Unauthorized Request")
                }
                else if (config.scope.write && !credential.scope.write) {
                    return reject("Unauthorized Request")
                }
                else if (cots.read && !crts.read) {
                    return reject("Unauthorized Request")
                }
                else if (cots.write && !crts.write) {
                    return reject("Unauthorized Request")
                }
                else {
                    resolve()
                }
            }
            catch (erro) {
                reject(erro)
            }
        });
    }
}