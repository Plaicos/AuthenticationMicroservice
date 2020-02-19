module.exports = class Factories {
    constructor() {
        this.Token = new (require("./Token/TokenFactory"))()
    }

    build() {
        return new Promise((resolve, reject) => {
            resolve({
                Token: this.Token
            })
        });
    }

}