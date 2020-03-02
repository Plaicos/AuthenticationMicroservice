module.exports = class SystemDAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            credentials: this.db.collection("credentials"),
            levels: this.db.collection("levels")
        }
    }

    register_credential(credential) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(credential)
                await this.collections.credentials.insertOne(credential)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    get_credential(user) {
        return new Promise((resolve, reject) => {
            this.collections.credentials.find({ user: user }).project({ _id: 0 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(result[0])
                }
                else {
                    reject("That user has no credential !")
                }
            })
        });
    }

    deleteCredential(user) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.collections.credentials.remove({ user: user })
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    check_user(user) {
        return new Promise((resolve, reject) => {
            this.collections.credentials.find({ user: user }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        });
    }

    get_levels() {
        return new Promise((resolve, reject) => {
            this.collections.levels.find({}).project({ _id: 0 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                let response = []
                for (let i of result) {
                    response.push(i.level)
                }
                resolve(response)
            })
        });
    }
}