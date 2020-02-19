module.exports = (level, DAO) => {
    return new Promise(async (resolve, reject) => {
        try {
            let valid_levels = await DAO.System.get_levels()
            
            if (!level) {
                let erro = {
                    message: "LEVEL CANT BE NULL",
                    erro: 400
                }
                reject(erro)
                return
            }
            else if (typeof level !== "number") {
                let erro = {
                    message: "LEVEL MUST BE AN INTEGER NUMBER",
                    erro: 400
                }
                reject(erro)
                return
            }
            // else if (level < clearance.level) {
            //     let erro = {
            //         message: "YOU DONT HAVE CLEARANCE TO SET THAT ACCESS LEVEL",
            //         erro: 401
            //     }
            //     reject(erro)
            //     return
            // }
            else if (!valid_levels.includes(level)) {
                reject("THAT ACCESS LEVEL DOES NOT EXIST")
                return
            }
            resolve(level)
        }
        catch (erro) {
            reject(erro)
        }
    });
}