module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UC = {
            System: new (require("../Use_Case/System/SysUseCases"))({ dependencies })
        }
    }

    create_credential() {
        var self = this
        return async function (call, callback) {
            let { UC } = self
            let credential = call.request

            try {
                await UC.System.create_credential(credential)
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
            let { UC } = self

            try {
                let token = await UC.System.generateToken(user)
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
            let { UC } = self

            try {
                let credential = await UC.System.authenticateToken(token)
                callback(null, credential.credential)
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
            let { UC } = self

            try {
                await UC.System.checkCredentialClearance(config, credential)
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
            let { UC } = self

            try {
                await UC.System.deleteCredential(user, credential)
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