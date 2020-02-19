module.exports = class DAO {
    constructor() {
        this.Database = new (require("../Factory/Database/Database"))()
        console.log("constructor called")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let Database = this.Database
            let SysDAO = require("./System/SystemDAO")
            console.log(Database)
            try {
                await Database.initialize()
                let db = Database.export()
                //
                this.System = new SysDAO(db)
                let DAO = {
                    System: this.System
                }
                resolve(DAO)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }
}