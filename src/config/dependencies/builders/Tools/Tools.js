module.exports = class Tools {
    constructor() {
        this.Authenticator = new (require("./Authenticator/Authenticator"))()
    }

    build(){
        return this
    }

}