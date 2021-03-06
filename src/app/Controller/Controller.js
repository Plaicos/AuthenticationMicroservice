module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))({ dependencies })
    }

    create_credential() {
        var self = this
        return async function (call, callback) {
            let { UseCases } = self
            let credential = call.request

            try {
                await UseCases.create_credential(credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handle_error(callback, erro)
            }
        }
    }

    generateToken() {
        var self = this
        return async function (call, callback) {
            let user = call.request.user
            let { UseCases } = self

            try {
                let token = await UseCases.generateToken(user)
                let tokenResponse = {
                    token: token,
                    status: "ok"
                }
                callback(null, tokenResponse)
            }
            catch (erro) {
                self.handle_error(callback, erro)
            }
        }
    }

    authenticate() {
        var self = this
        return async function (call, callback) {
            let token = call.request.token
            let { UseCases } = self

            try {
                let credential = await UseCases.authenticateToken(token)
                callback(null, credential)
                console.log(credential)
            }
            catch (erro) {
                self.handle_error(callback, erro)
            }
        }
    }

    checkCredentialClearance() {
        var self = this
        return async function (call, callback) {
            let config = call.request.config
            let credential = call.request.credential
            let { UseCases } = self

            try {
                await UseCases.checkCredentialClearance(config, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handle_error(callback, erro)
            }
        }
    }

    deleteCredential() {
        var self = this
        return async function (call, callback) {
            let { user, credential } = call.request
            let { UseCases } = self

            try {
                await UseCases.deleteCredential(user, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handle_error(callback, erro)
            }
        }
    }

    handle_error(callback, erro) {
        console.log({ erro })
        callback(Error(erro), null)
    }
}