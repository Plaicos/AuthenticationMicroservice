module.exports = (user, DAO) => {
    return new Promise(async (resolve, reject) => {
        if (!DAO) {
            reject("DAO IS MISSING")
        }
        if (!user || typeof user !== "string") {
            reject("User must be a valid String")
        }

        try {
            if (await DAO.System.check_user(user)) {
                reject("User already exists")
            }
            resolve(user)
        }
        catch (erro) {
            reject(erro)
        }
    });
}